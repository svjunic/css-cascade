/**
 * parse-cssom.js
 * ブラウザのCSSOMを使ってCSSテキストを中間モデルに変換する。
 * PostCSS非依存のブラウザ互換実装。
 *
 * 出力: Map<contextKey, Array<{selector, prop, value, important, layerRank}>>
 *   - contextKey: "base" | "@media <condition>" | "@supports <condition>" | "@container <query>" | "@font-face" | "@keyframes <name>"
 *
 * ブラウザとPlaywright page.evaluate()の両方で動作するため、他のプロジェクトファイルからのimportなし。
 */

// ─── normalize.js からインライン（ブラウザ互換のため）────────────────────────

function _normalizeSelector(sel) {
  return sel
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([>+~])\s*/g, ' $1 ')
    .trim()
}

function _canonicalizeSelector(sel) {
  let s = _normalizeSelector(sel)
  s = s.replace(/\[([^\]]*)\]/g, (_, inner) => {
    let t = inner.replace(/\s*([~|^$*]?)\s*=\s*/g, '$1=')
    t = t.replace(/(['"])(.*?)\1/g, '$2')
    return '[' + t.trim() + ']'
  })
  return s
}

// ─── 内部ヘルパー ─────────────────────────────────────────────────────────────

/**
 * @font-face の style から擬似セレクタキーを生成する。
 */
function _getFontFaceKey(style) {
  const parts = {}
  for (let i = 0; i < style.length; i++) {
    const p = style.item(i).toLowerCase()
    if (p === 'font-family' || p === 'font-weight' || p === 'font-style') {
      parts[p] = style.getPropertyValue(p).replace(/['"]/g, '').trim()
    }
  }
  const family = (parts['font-family'] || 'unknown').toLowerCase()
  const weight = (parts['font-weight'] || 'normal').toLowerCase()
  const styleVal = (parts['font-style'] || 'normal').toLowerCase()
  return `${family}/${weight}/${styleVal}`
}

/**
 * 条件付きグループルール（独立したカスケードコンテキストを作る @ルール）。
 * parse.js の CONDITIONAL_AT_RULES と対応する。
 */
const _CONDITIONAL_AT_RULES = new Set(['media', 'supports', 'container'])

/**
 * conds に条件を1つ追加した新しい Map を返す（元の conds は変更しない）。
 */
function _appendCondition(conds, name, condition) {
  if (!condition) return conds
  const next = new Map()
  for (const [k, v] of conds) next.set(k, v.slice())
  const list = next.get(name)
  if (list) list.push(condition)
  else next.set(name, [condition])
  return next
}

/**
 * 条件集合から正準コンテキストキーを生成する。parse.js の同名関数と同一ロジック。
 */
function _contextKeyFromConditions(conds) {
  const parts = []
  for (const name of _CONDITIONAL_AT_RULES) {
    const list = conds.get(name)
    if (list && list.length) parts.push(`@${name} ${list.join(' and ')}`)
  }
  return parts.length ? parts.join(' and ') : 'base'
}

/**
 * カスケードレイヤー (@layer) を考慮した宣言の優先順位 (layerRank) を計算する。
 * parse.js の同名関数と同一ロジック。
 */
function _computeLayerRank(layerName, important, layerIndex, L) {
  const idx = layerName == null ? null : (layerIndex.get(layerName) ?? null)
  const layered = idx != null
  if (!important) {
    return layered ? idx : L
  }
  const IMPORTANT_BASE = L + 1
  return IMPORTANT_BASE + (layered ? (L - idx) : 0)
}

function _qualifyLayer(parent, name) {
  return parent ? `${parent}.${name}` : name
}

function _registerLayer(layerOrder, layerSet, name) {
  if (!layerSet.has(name)) {
    layerSet.add(name)
    layerOrder.push(name)
  }
}

/**
 * CSSStyleDeclaration.cssText（例: "margin: 0px; color: red !important;"）を
 * パースして {prop, value, important} タプルの配列を返す。
 * style.item(i) はショートハンドを展開するが、cssText はショートハンドを保持する。
 */
function _parseCssTextDecls(cssText) {
  const decls = []
  let i = 0, n = cssText.length, depth = 0, quote = null, tokenStart = 0
  while (i <= n) {
    const ch = i < n ? cssText[i] : ';'
    if (quote) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '(') {
      depth++
    } else if (ch === ')') {
      if (depth > 0) depth--
    } else if (ch === ';' && depth === 0) {
      const token = cssText.slice(tokenStart, i).trim()
      if (token) {
        const colon = token.indexOf(':')
        if (colon > 0) {
          const prop = token.slice(0, colon).trim().toLowerCase()
          let value = token.slice(colon + 1).trim()
          let important = false
          if (value.endsWith('!important')) {
            important = true
            value = value.slice(0, -'!important'.length).trim()
          }
          if (prop) decls.push({ prop, value, important })
        }
      }
      tokenStart = i + 1
    }
    i++
  }
  return decls
}

/**
 * selectorText をトップレベルのカンマで分割する。
 * :is(.a, .b) などの内側のカンマでは分割しない。
 */
function _splitSelectors(selectorText) {
  const parts = []
  let depth = 0, bracketDepth = 0, start = 0, quote = null
  for (let i = 0; i < selectorText.length; i++) {
    const ch = selectorText[i]
    if (quote) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '(') {
      depth++
    } else if (ch === ')') {
      if (depth > 0) depth--
    } else if (ch === '[') {
      bracketDepth++
    } else if (ch === ']') {
      if (bracketDepth > 0) bracketDepth--
    } else if (ch === ',' && depth === 0 && bracketDepth === 0) {
      parts.push(selectorText.slice(start, i).trim())
      start = i + 1
    }
  }
  const last = selectorText.slice(start).trim()
  if (last) parts.push(last)
  return parts
}

// ─── CSSOM rule type guards ────────────────────────────────────────────────────
// typeof ガードで未対応ブラウザを安全に処理する

const _isMedia = typeof CSSMediaRule !== 'undefined'
  ? (r) => r instanceof CSSMediaRule : () => false
const _isSupports = typeof CSSSupportsRule !== 'undefined'
  ? (r) => r instanceof CSSSupportsRule : () => false
const _isContainer = typeof CSSContainerRule !== 'undefined'
  ? (r) => r instanceof CSSContainerRule : () => false
const _isLayerBlock = typeof CSSLayerBlockRule !== 'undefined'
  ? (r) => r instanceof CSSLayerBlockRule : () => false
const _isLayerStmt = typeof CSSLayerStatementRule !== 'undefined'
  ? (r) => r instanceof CSSLayerStatementRule : () => false
const _isFontFace = typeof CSSFontFaceRule !== 'undefined'
  ? (r) => r instanceof CSSFontFaceRule : () => false
const _isKeyframes = typeof CSSKeyframesRule !== 'undefined'
  ? (r) => r instanceof CSSKeyframesRule : () => false

// ─── parseCss ─────────────────────────────────────────────────────────────────

/**
 * CSS テキストをパースして中間モデルを返す。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layerRank: number}>>>}
 */
export async function parseCss(cssText, options = {}) {
  const result = new Map()
  const layerOrder = []
  const layerSet = new Set()
  let anonCounter = 0

  function ensureContext(key) {
    if (!result.has(key)) result.set(key, [])
    return result.get(key)
  }

  function addDecl(contextKey, selector, prop, value, important, layer) {
    ensureContext(contextKey).push({ selector, prop, value, important, layer })
  }

  const normSel = options.semanticSelectors ? _canonicalizeSelector : _normalizeSelector

  function processRules(cssRules, conds, layer) {
    for (const rule of cssRules) {
      if (rule instanceof CSSStyleRule) {
        const ctxKey = _contextKeyFromConditions(conds)
        const selectors = _splitSelectors(rule.selectorText).map(s => normSel(s))
        // cssText を使ってショートハンドを保持したままパース（style.item(i) はショートハンドを展開する）
        const decls = _parseCssTextDecls(rule.style.cssText)
        for (const sel of selectors) {
          for (const { prop, value, important } of decls) {
            addDecl(ctxKey, sel, prop, value, important, layer)
          }
        }
      } else if (_isMedia(rule)) {
        const childConds = _appendCondition(conds, 'media', rule.conditionText.trim())
        processRules(rule.cssRules, childConds, layer)
      } else if (_isSupports(rule)) {
        const childConds = _appendCondition(conds, 'supports', rule.conditionText.trim())
        processRules(rule.cssRules, childConds, layer)
      } else if (_isContainer(rule)) {
        // CSSContainerRule.containerName (名前) + containerQuery (条件) を組み合わせる
        const fullQuery = [rule.containerName, rule.containerQuery].filter(Boolean).join(' ').trim()
        const childConds = _appendCondition(conds, 'container', fullQuery)
        processRules(rule.cssRules, childConds, layer)
      } else if (_isLayerBlock(rule)) {
        // @layer name { ... } または匿名 @layer { ... }
        const params = rule.name || ''
        const layerName = params
          ? _qualifyLayer(layer, params)
          : _qualifyLayer(layer, `__anon${anonCounter++}`)
        _registerLayer(layerOrder, layerSet, layerName)
        processRules(rule.cssRules, conds, layerName)
      } else if (_isLayerStmt(rule)) {
        // @layer a, b, c;
        for (const nm of rule.nameList) {
          if (nm) _registerLayer(layerOrder, layerSet, _qualifyLayer(layer, nm))
        }
      } else if (_isFontFace(rule)) {
        const contextKey = '@font-face'
        const style = rule.style
        const sel = _getFontFaceKey(style)
        for (const { prop, value, important } of _parseCssTextDecls(style.cssText)) {
          addDecl(contextKey, sel, prop, value, important, layer)
        }
      } else if (_isKeyframes(rule)) {
        const contextKey = `@keyframes ${rule.name}`
        for (const keyframe of rule.cssRules) {
          // Chrome は 0%→from, 100%→to を正規化しないので手動で正規化する
          const stops = keyframe.keyText.split(',').map(k => {
            const t = k.trim()
            return t === '0%' ? 'from' : t === '100%' ? 'to' : t
          }).join(', ')
          for (const { prop, value, important } of _parseCssTextDecls(keyframe.style.cssText)) {
            addDecl(contextKey, stops, prop, value, important, layer)
          }
        }
      }
      // @charset, @import, @namespace: skip
    }
  }

  const sheet = new CSSStyleSheet()
  await sheet.replace(cssText)
  processRules(sheet.cssRules, new Map(), null)

  // 全レイヤーの宣言順が確定してから layerRank を計算する
  const layerIndex = new Map()
  layerOrder.forEach((nm, i) => layerIndex.set(nm, i))
  const L = layerOrder.length
  for (const entries of result.values()) {
    for (const entry of entries) {
      entry.layerRank = _computeLayerRank(entry.layer, entry.important, layerIndex, L)
      delete entry.layer
    }
  }

  return result
}

// ─── parseSelectorOrder ────────────────────────────────────────────────────────

/**
 * CSS テキストをパースして、各コンテキスト内のセレクタを最終出現順で返す。
 * order-risk.js で使用する。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, string[]>>}
 */
export async function parseSelectorOrder(cssText, options = {}) {
  const posMap = new Map()
  let counter = 0

  function ensureCtx(key) {
    if (!posMap.has(key)) posMap.set(key, new Map())
    return posMap.get(key)
  }

  function addSel(contextKey, selector) {
    ensureCtx(contextKey).set(selector, counter++)
  }

  const normSel = options.semanticSelectors ? _canonicalizeSelector : _normalizeSelector

  function processRules(cssRules, conds) {
    for (const rule of cssRules) {
      if (rule instanceof CSSStyleRule) {
        const ctxKey = _contextKeyFromConditions(conds)
        for (const sel of _splitSelectors(rule.selectorText).map(s => normSel(s))) {
          addSel(ctxKey, sel)
        }
      } else if (_isMedia(rule)) {
        const childConds = _appendCondition(conds, 'media', rule.conditionText.trim())
        processRules(rule.cssRules, childConds)
      } else if (_isSupports(rule)) {
        const childConds = _appendCondition(conds, 'supports', rule.conditionText.trim())
        processRules(rule.cssRules, childConds)
      } else if (_isContainer(rule)) {
        const fullQuery = [rule.containerName, rule.containerQuery].filter(Boolean).join(' ').trim()
        const childConds = _appendCondition(conds, 'container', fullQuery)
        processRules(rule.cssRules, childConds)
      } else if (rule.cssRules) {
        // @layer block など: 親コンテキストに平坦化（順序を保持）
        processRules(rule.cssRules, conds)
      }
    }
  }

  const sheet = new CSSStyleSheet()
  await sheet.replace(cssText)
  processRules(sheet.cssRules, new Map())

  const result = new Map()
  for (const [contextKey, selectorPos] of posMap) {
    result.set(
      contextKey,
      [...selectorPos.entries()].sort((a, b) => a[1] - b[1]).map(e => e[0]),
    )
  }
  return result
}
