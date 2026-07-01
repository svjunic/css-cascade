/**
 * parse.js
 * PostCSS を使って CSS テキストを中間モデルに変換する。
 *
 * 出力: Map<contextKey, Array<{selector, prop, value, important, layerRank}>>
 *   - contextKey: "base" | "@media <condition>" | "@font-face" | "@keyframes <name>"
 *   - グループセレクタ (.a, .b) は個別セレクタに分解して配布
 *   - ソース順を保持（後勝ちルール適用のため）
 *   - layerRank: @layer のカスケード優先度（大きいほど強い。resolve.js で勝者決定に使用）
 */

import postcss from 'postcss'
import { normalizeSelector, normalizeMediaCondition, normalizeValue, canonicalizeSelector } from './normalize.js'

/**
 * @font-face ブロックのプロパティ群から擬似セレクタキーを生成する。
 * (font-family, font-weight, font-style) の複合キーで区別する。
 */
function getFontFaceKey(declarations) {
  const parts = {}
  for (const decl of declarations) {
    const p = decl.prop.toLowerCase()
    if (p === 'font-family' || p === 'font-weight' || p === 'font-style') {
      parts[p] = normalizeValue(decl.value).replace(/['"]/g, '')
    }
  }
  const family = parts['font-family'] || 'unknown'
  const weight = parts['font-weight'] || 'normal'
  const style = parts['font-style'] || 'normal'
  return `${family}/${weight}/${style}`
}

/**
 * @keyframes / @-webkit-keyframes のベンダープレフィックスを除去して
 * 統一した contextKey を返す。
 */
function normalizeKeyframesName(atRuleName, params) {
  return `@keyframes ${params.trim()}`
}

/**
 * カスケードレイヤー (@layer) を考慮した宣言の優先順位 (layerRank) を計算する。
 * 数値が大きいほど勝つ。同順位はソース順（後勝ち）で決着する（resolve.js 側で処理）。
 *
 * CSS Cascade Level 5 準拠:
 *   - 通常宣言: 先に宣言されたレイヤーほど弱く、後のレイヤーほど強い。非レイヤー宣言が最強。
 *   - !important: 上記が逆転する（先のレイヤーほど強く、非レイヤー !important が最弱）。
 *   - !important 宣言はすべての通常宣言に勝つ。
 *
 * @param {string|null} layerName  レイヤー修飾名（非レイヤーは null）
 * @param {boolean} important
 * @param {Map<string, number>} layerIndex  レイヤー名 → 宣言順インデックス (0..L-1)
 * @param {number} L  レイヤー総数
 * @returns {number}
 */
function computeLayerRank(layerName, important, layerIndex, L) {
  const idx = layerName == null ? null : (layerIndex.get(layerName) ?? null)
  const layered = idx != null
  if (!important) {
    // 0..L-1（レイヤー）／ L（非レイヤー = 最強）
    return layered ? idx : L
  }
  // !important はレイヤー順を逆転させ、かつ全 important > 全 normal とする
  const IMPORTANT_BASE = L + 1
  return IMPORTANT_BASE + (layered ? (L - idx) : 0)
}

/**
 * CSS テキストをパースして、各コンテキスト内のセレクタを最終出現順で返す。
 * セレクタが複数回登場する場合は最後の出現位置を採用する（カスケード的に最後が有効なため）。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Map<string, string[]>}  Map<contextKey, 出現順のセレクタ配列>
 */
export function parseSelectorOrder(cssText, options = {}) {
  const posMap = new Map() // contextKey → Map<selector, lastPosition>
  let counter = 0

  function ensureCtx(key) {
    if (!posMap.has(key)) posMap.set(key, new Map())
    return posMap.get(key)
  }

  function addSel(contextKey, selector) {
    ensureCtx(contextKey).set(selector, counter++)
  }

  const normSel = options.semanticSelectors ? canonicalizeSelector : normalizeSelector

  function processRule(rule, contextKey) {
    for (const sel of rule.selectors.map(s => normSel(s))) {
      addSel(contextKey, sel)
    }
  }

  function processAtRule(atRule, parentContextKey) {
    const name = atRule.name.toLowerCase()
    if (name === 'media') {
      const condition = normalizeMediaCondition(atRule.params)
      const contextKey = `@media ${condition}`
      ensureCtx(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') processRule(node, contextKey)
        else if (node.type === 'atrule') processAtRule(node, contextKey)
      })
    } else if (name === 'font-face' || name === 'keyframes' || name === '-webkit-keyframes' || name === 'charset' || name === 'import' || name === 'namespace') {
      // cascade ordering に関係しないコンテキストはスキップ
    } else {
      if (atRule.nodes) {
        atRule.each(node => {
          if (node.type === 'rule') processRule(node, parentContextKey)
          else if (node.type === 'atrule') processAtRule(node, parentContextKey)
        })
      }
    }
  }

  // パースエラーは握りつぶさず呼び出し元へ伝播させる（CLI は exit 2 とする）。
  const root = postcss.parse(cssText, { from: undefined })

  ensureCtx('base')
  root.each(node => {
    if (node.type === 'rule') processRule(node, 'base')
    else if (node.type === 'atrule') processAtRule(node, 'base')
  })

  const result = new Map()
  for (const [contextKey, selectorPos] of posMap) {
    result.set(
      contextKey,
      [...selectorPos.entries()].sort((a, b) => a[1] - b[1]).map(e => e[0]),
    )
  }
  return result
}

/**
 * CSS テキストをパースして中間モデルを返す。
 *
 * @param {string} cssText - CSS 文字列
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layerRank: number}>>}
 */
export function parseCss(cssText, options = {}) {
  /** @type {Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layer?: string|null, layerRank?: number}>>} */
  const result = new Map()

  function ensureContext(key) {
    if (!result.has(key)) result.set(key, [])
    return result.get(key)
  }

  // ── カスケードレイヤー (@layer) 追跡 ──────────────────────────────────────
  // レイヤーは別コンテキストにしない（同一要素で他レイヤー／非レイヤー宣言とカスケードするため）。
  // 宣言順のレイヤー名リストを document 全体で1つ保持し、後段で layerRank に変換する。
  const layerOrder = []       // 宣言順のレイヤー修飾名（重複排除）
  const layerSet = new Set()
  let anonCounter = 0         // 匿名レイヤー用の一意カウンタ

  function registerLayer(name) {
    if (!layerSet.has(name)) {
      layerSet.add(name)
      layerOrder.push(name)
    }
  }

  // 親レイヤー配下のネストレイヤーを修飾名 (a.b) にする。
  function qualifyLayer(parent, name) {
    return parent ? `${parent}.${name}` : name
  }

  function addDecl(contextKey, selector, decl, layer) {
    ensureContext(contextKey).push({
      selector,
      prop: decl.prop.toLowerCase(),
      value: normalizeValue(decl.value),
      important: decl.important || false,
      layer, // 後段で layerRank に変換して削除する
    })
  }

  const normSel = options.semanticSelectors ? canonicalizeSelector : normalizeSelector

  /** 通常の Rule ノードを処理する */
  function processRule(rule, contextKey, layer) {
    // グループセレクタを個別セレクタに分解
    const selectors = rule.selectors.map(s => normSel(s))
    for (const sel of selectors) {
      rule.each(node => {
        if (node.type === 'decl') {
          addDecl(contextKey, sel, node, layer)
        }
      })
    }
  }

  /** AtRule ノードを再帰的に処理する */
  function processAtRule(atRule, parentContextKey, layer) {
    const name = atRule.name.toLowerCase()

    if (name === 'media') {
      // @media: 条件ごとに独立コンテキスト（レイヤーはそのまま引き継ぐ）
      const condition = normalizeMediaCondition(atRule.params)
      const contextKey = `@media ${condition}`
      ensureContext(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') {
          processRule(node, contextKey, layer)
        } else if (node.type === 'atrule') {
          // ネストした @media や @supports、@layer 等
          processAtRule(node, contextKey, layer)
        }
      })
    } else if (name === 'layer') {
      // @layer: レイヤー順を記録し、子ルールは親コンテキストにレイヤー名付きで平坦化する
      const params = atRule.params.trim()
      if (atRule.nodes) {
        // ブロック形式: @layer name { ... } / 匿名 @layer { ... }
        // （ブロック形式の名前は単一。@layer a, b { } は不正なため考慮しない）
        const layerName = params
          ? qualifyLayer(layer, params)
          : qualifyLayer(layer, `__anon${anonCounter++}`)
        registerLayer(layerName)
        atRule.each(node => {
          if (node.type === 'rule') {
            processRule(node, parentContextKey, layerName)
          } else if (node.type === 'atrule') {
            processAtRule(node, parentContextKey, layerName)
          }
        })
      } else {
        // ステートメント形式: @layer a, b, c;（レイヤー順の宣言のみ）
        for (const nm of params.split(',')) {
          const trimmed = nm.trim()
          if (trimmed) registerLayer(qualifyLayer(layer, trimmed))
        }
      }
    } else if (name === 'font-face') {
      // @font-face: (family/weight/style) を擬似セレクタとして使う
      const contextKey = '@font-face'
      ensureContext(contextKey)

      // font-face key を決めるために宣言を2回読む（1回目はキー収集用）
      const decls = []
      atRule.each(node => {
        if (node.type === 'decl') decls.push(node)
      })
      const sel = getFontFaceKey(decls)

      for (const decl of decls) {
        addDecl(contextKey, sel, decl, layer)
      }
    } else if (name === 'keyframes' || name === '-webkit-keyframes') {
      // @keyframes: アニメーション名ごとにコンテキスト、ストップを擬似セレクタに
      const contextKey = normalizeKeyframesName(name, atRule.params)
      ensureContext(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') {
          // キーフレームのストップ (0%, 100%, from, to など) を selector として扱う
          const stops = node.selectors.map(s => s.trim()).join(', ')
          node.each(decl => {
            if (decl.type === 'decl') {
              addDecl(contextKey, stops, decl, layer)
            }
          })
        }
      })
    } else if (name === 'charset' || name === 'import' || name === 'namespace') {
      // skip
    } else {
      // 未知の @ルール（@supports 等）: 子ルールがあれば親コンテキストに処理
      if (atRule.nodes) {
        atRule.each(node => {
          if (node.type === 'rule') {
            processRule(node, parentContextKey, layer)
          } else if (node.type === 'atrule') {
            processAtRule(node, parentContextKey, layer)
          }
        })
      }
    }
  }

  // パースエラーは握りつぶさず呼び出し元へ伝播させる（CLI は exit 2 とする）。
  const root = postcss.parse(cssText, { from: undefined })

  // base コンテキストを最初に確保してキー順を安定させる
  ensureContext('base')

  root.each(node => {
    if (node.type === 'rule') {
      processRule(node, 'base', null)
    } else if (node.type === 'atrule') {
      processAtRule(node, 'base', null)
    }
  })

  // 全レイヤーの宣言順が確定してから、各宣言を数値 layerRank に変換する。
  // （一時的な layer 名フィールドは削除し、出力形状を従来どおりに保つ）
  const layerIndex = new Map()
  layerOrder.forEach((nm, i) => layerIndex.set(nm, i))
  const L = layerOrder.length
  for (const entries of result.values()) {
    for (const entry of entries) {
      entry.layerRank = computeLayerRank(entry.layer, entry.important, layerIndex, L)
      delete entry.layer
    }
  }

  return result
}
