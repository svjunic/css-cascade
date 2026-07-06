/**
 * parse.js
 * PostCSS を使って CSS テキストを中間モデルに変換する。
 *
 * 出力: Map<contextKey, Array<{selector, prop, value, important, layerRank}>>
 *   - contextKey: "base" | "@media <condition>" | "@supports <condition>" | "@container <condition>" | "@font-face" | "@keyframes <name>"
 *     （@media/@supports/@container のネストは条件を "and" で結合したキーになる）
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
  const family = (parts['font-family'] || 'unknown').toLowerCase()
  const weight = (parts['font-weight'] || 'normal').toLowerCase()
  const style = (parts['font-style'] || 'normal').toLowerCase()
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
 * 条件付きグループルール（それぞれ独立したカスケードコンテキストを作る @ルール）。
 * @media / @supports / @container は条件ごとに別コンテキストへ分離する。
 */
const CONDITIONAL_AT_RULES = new Set(['media', 'supports', 'container'])

// 条件集合 (conds) は Map<name, string[]>。name は media/supports/container で、
// 値はその種別でネストされた条件の並び。ネストを降りるたび appendCondition で
// 複製・追記し、contextKeyFromConditions で正準コンテキストキーへ変換する。

/**
 * conds に条件を1つ追加した新しい Map を返す（元の conds は変更しない）。
 * 正規化後に空となる条件（例: 条件を持たない不正な @media）はコンテキストを
 * 分ける意味がないため無視する。
 *
 * @param {Map<string, string[]>} conds
 * @param {string} name  @ルール名（小文字。media/supports/container）
 * @param {string} condition  正規化済み条件文字列
 * @returns {Map<string, string[]>}
 */
function appendCondition(conds, name, condition) {
  if (!condition) return conds
  const next = new Map()
  for (const [k, v] of conds) next.set(k, v.slice())
  const list = next.get(name)
  if (list) list.push(condition)
  else next.set(name, [condition])
  return next
}

/**
 * 条件集合から正準コンテキストキーを生成する。
 *
 * 種別間（@media / @supports / @container）は CONDITIONAL_AT_RULES の定義順に
 * 固定して連結する。どの種別が外側に来るかは論理 AND として等価な no-op のため、
 * ネスト順序に依存しないキーにして偽陽性（コンテキストの追加/削除誤検出）を防ぐ。
 *
 * 一方、同種別内の複数条件は「ネスト出現順（外側→内側）」を保持する。これは
 * 単一の複合条件 `@media (a) and (b)` の記述順と一致させ、かつ意味的差分ツールが
 * 著者の記述順を尊重するため。ネスト `@media(a){@media(b)}` と複合
 * `@media (a) and (b)` は同一キーに集約される。
 *   - 条件なし                  → "base"
 *   - @media(a) のみ            → "@media a"
 *   - @media(a) 内 @media(b)     → "@media a and b"
 *   - @media(a) 内 @supports(b)  → "@media a and @supports b"（種別ネスト順は不問で同一）
 *
 * @param {Map<string, string[]>} conds
 * @returns {string}
 */
function contextKeyFromConditions(conds) {
  const parts = []
  for (const name of CONDITIONAL_AT_RULES) {
    const list = conds.get(name)
    if (list && list.length) parts.push(`@${name} ${list.join(' and ')}`)
  }
  return parts.length ? parts.join(' and ') : 'base'
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

  function processAtRule(atRule, conds) {
    const name = atRule.name.toLowerCase()
    if (CONDITIONAL_AT_RULES.has(name)) {
      // @media / @supports / @container: 条件ごとに独立コンテキスト。
      // ネスト条件を蓄積する。コンテキストは addSel 側で遅延生成する。
      const childConds = appendCondition(conds, name, normalizeMediaCondition(atRule.params))
      const childKey = contextKeyFromConditions(childConds)
      atRule.each(node => {
        if (node.type === 'rule') processRule(node, childKey)
        else if (node.type === 'atrule') processAtRule(node, childConds)
      })
    } else if (name === 'font-face' || name === 'keyframes' || name === '-webkit-keyframes' || name === 'charset' || name === 'import' || name === 'namespace') {
      // cascade ordering に関係しないコンテキストはスキップ
    } else {
      // @layer などその他の @ルール: 子ルールを親コンテキストに平坦化する（順序を保持）
      if (atRule.nodes) {
        const ctxKey = contextKeyFromConditions(conds)
        atRule.each(node => {
          if (node.type === 'rule') processRule(node, ctxKey)
          else if (node.type === 'atrule') processAtRule(node, conds)
        })
      }
    }
  }

  // パースエラーは握りつぶさず呼び出し元へ伝播させる（CLI は exit 2 とする）。
  const root = postcss.parse(cssText, { from: undefined })

  // 各コンテキストは addSel 側で遅延生成する（空コンテキストは作らない）。
  const baseConds = new Map()
  root.each(node => {
    if (node.type === 'rule') processRule(node, 'base')
    else if (node.type === 'atrule') processAtRule(node, baseConds)
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
  function processAtRule(atRule, conds, layer) {
    const name = atRule.name.toLowerCase()

    if (CONDITIONAL_AT_RULES.has(name)) {
      // @media / @supports / @container: 条件ごとに独立コンテキスト（レイヤーはそのまま引き継ぐ）。
      // ネスト条件を蓄積する。コンテキストは addDecl 側で遅延生成する。
      const childConds = appendCondition(conds, name, normalizeMediaCondition(atRule.params))
      const childKey = contextKeyFromConditions(childConds)
      atRule.each(node => {
        if (node.type === 'rule') {
          processRule(node, childKey, layer)
        } else if (node.type === 'atrule') {
          // ネストした @media / @supports / @container や @layer 等
          processAtRule(node, childConds, layer)
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
        const ctxKeyForLayer = contextKeyFromConditions(conds)
        atRule.each(node => {
          if (node.type === 'rule') {
            processRule(node, ctxKeyForLayer, layerName)
          } else if (node.type === 'atrule') {
            processAtRule(node, conds, layerName)
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
      // ensureContext は addDecl 内で呼ばれるため明示的な呼び出しは不要

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
      // ensureContext は addDecl 内で呼ばれるため明示的な呼び出しは不要
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
      // その他の @ルール（@scope 等）: 子ルールがあれば親コンテキストに平坦化する
      if (atRule.nodes) {
        const ctxKey = contextKeyFromConditions(conds)
        atRule.each(node => {
          if (node.type === 'rule') {
            processRule(node, ctxKey, layer)
          } else if (node.type === 'atrule') {
            processAtRule(node, conds, layer)
          }
        })
      }
    }
  }

  // パースエラーは握りつぶさず呼び出し元へ伝播させる（CLI は exit 2 とする）。
  const root = postcss.parse(cssText, { from: undefined })

  // 各コンテキストは addDecl 側で遅延生成する（宣言のない空コンテキストは作らない）。
  const baseConds = new Map()
  root.each(node => {
    if (node.type === 'rule') {
      processRule(node, 'base', null)
    } else if (node.type === 'atrule') {
      processAtRule(node, baseConds, null)
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
