#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.1.0
// Source: https://github.com/svjunic/css-cascade
var we=require("node:fs"),ve=require("node:util");var ee=require("node:fs"),te=require("node:url"),oe=require("playwright"),Ce={},ke=`/**
 * parse-cssom.js
 * \u30D6\u30E9\u30A6\u30B6\u306ECSSOM\u3092\u4F7F\u3063\u3066CSS\u30C6\u30AD\u30B9\u30C8\u3092\u4E2D\u9593\u30E2\u30C7\u30EB\u306B\u5909\u63DB\u3059\u308B\u3002
 * PostCSS\u975E\u4F9D\u5B58\u306E\u30D6\u30E9\u30A6\u30B6\u4E92\u63DB\u5B9F\u88C5\u3002
 *
 * \u51FA\u529B: Map<contextKey, Array<{selector, prop, value, important, layerRank}>>
 *   - contextKey: "base" | "@media <condition>" | "@supports <condition>" | "@container <query>" | "@font-face" | "@keyframes <name>"
 *
 * \u30D6\u30E9\u30A6\u30B6\u3068Playwright page.evaluate()\u306E\u4E21\u65B9\u3067\u52D5\u4F5C\u3059\u308B\u305F\u3081\u3001\u4ED6\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30D5\u30A1\u30A4\u30EB\u304B\u3089\u306Eimport\u306A\u3057\u3002
 */

// \u2500\u2500\u2500 normalize.js \u304B\u3089\u30A4\u30F3\u30E9\u30A4\u30F3\uFF08\u30D6\u30E9\u30A6\u30B6\u4E92\u63DB\u306E\u305F\u3081\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function _normalizeSelector(sel) {
  return sel
    .trim()
    .replace(/\\s+/g, ' ')
    .replace(/\\s*([>+~])\\s*/g, ' $1 ')
    .trim()
}

function _canonicalizeSelector(sel) {
  let s = _normalizeSelector(sel)
  s = s.replace(/\\[([^\\]]*)\\]/g, (_, inner) => {
    let t = inner.replace(/\\s*([~|^$*]?)\\s*=\\s*/g, '$1=')
    t = t.replace(/(['"])(.*?)\\1/g, '$2')
    return '[' + t.trim() + ']'
  })
  return s
}

// \u2500\u2500\u2500 \u5185\u90E8\u30D8\u30EB\u30D1\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

/**
 * @font-face \u306E style \u304B\u3089\u64EC\u4F3C\u30BB\u30EC\u30AF\u30BF\u30AD\u30FC\u3092\u751F\u6210\u3059\u308B\u3002
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
  return \`\${family}/\${weight}/\${styleVal}\`
}

/**
 * \u6761\u4EF6\u4ED8\u304D\u30B0\u30EB\u30FC\u30D7\u30EB\u30FC\u30EB\uFF08\u72EC\u7ACB\u3057\u305F\u30AB\u30B9\u30B1\u30FC\u30C9\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u3092\u4F5C\u308B @\u30EB\u30FC\u30EB\uFF09\u3002
 * parse.js \u306E CONDITIONAL_AT_RULES \u3068\u5BFE\u5FDC\u3059\u308B\u3002
 */
const _CONDITIONAL_AT_RULES = new Set(['media', 'supports', 'container'])

/**
 * conds \u306B\u6761\u4EF6\u30921\u3064\u8FFD\u52A0\u3057\u305F\u65B0\u3057\u3044 Map \u3092\u8FD4\u3059\uFF08\u5143\u306E conds \u306F\u5909\u66F4\u3057\u306A\u3044\uFF09\u3002
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
 * \u6761\u4EF6\u96C6\u5408\u304B\u3089\u6B63\u6E96\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30AD\u30FC\u3092\u751F\u6210\u3059\u308B\u3002parse.js \u306E\u540C\u540D\u95A2\u6570\u3068\u540C\u4E00\u30ED\u30B8\u30C3\u30AF\u3002
 */
function _contextKeyFromConditions(conds) {
  const parts = []
  for (const name of _CONDITIONAL_AT_RULES) {
    const list = conds.get(name)
    if (list && list.length) parts.push(\`@\${name} \${list.join(' and ')}\`)
  }
  return parts.length ? parts.join(' and ') : 'base'
}

/**
 * \u30AB\u30B9\u30B1\u30FC\u30C9\u30EC\u30A4\u30E4\u30FC (@layer) \u3092\u8003\u616E\u3057\u305F\u5BA3\u8A00\u306E\u512A\u5148\u9806\u4F4D (layerRank) \u3092\u8A08\u7B97\u3059\u308B\u3002
 * parse.js \u306E\u540C\u540D\u95A2\u6570\u3068\u540C\u4E00\u30ED\u30B8\u30C3\u30AF\u3002
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
  return parent ? \`\${parent}.\${name}\` : name
}

function _registerLayer(layerOrder, layerSet, name) {
  if (!layerSet.has(name)) {
    layerSet.add(name)
    layerOrder.push(name)
  }
}

/**
 * CSSStyleDeclaration.cssText\uFF08\u4F8B: "margin: 0px; color: red !important;"\uFF09\u3092
 * \u30D1\u30FC\u30B9\u3057\u3066 {prop, value, important} \u30BF\u30D7\u30EB\u306E\u914D\u5217\u3092\u8FD4\u3059\u3002
 * style.item(i) \u306F\u30B7\u30E7\u30FC\u30C8\u30CF\u30F3\u30C9\u3092\u5C55\u958B\u3059\u308B\u304C\u3001cssText \u306F\u30B7\u30E7\u30FC\u30C8\u30CF\u30F3\u30C9\u3092\u4FDD\u6301\u3059\u308B\u3002
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
 * selectorText \u3092\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB\u306E\u30AB\u30F3\u30DE\u3067\u5206\u5272\u3059\u308B\u3002
 * :is(.a, .b) \u306A\u3069\u306E\u5185\u5074\u306E\u30AB\u30F3\u30DE\u3067\u306F\u5206\u5272\u3057\u306A\u3044\u3002
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

// \u2500\u2500\u2500 CSSOM rule type guards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// typeof \u30AC\u30FC\u30C9\u3067\u672A\u5BFE\u5FDC\u30D6\u30E9\u30A6\u30B6\u3092\u5B89\u5168\u306B\u51E6\u7406\u3059\u308B

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

// \u2500\u2500\u2500 parseCss \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

/**
 * CSS \u30C6\u30AD\u30B9\u30C8\u3092\u30D1\u30FC\u30B9\u3057\u3066\u4E2D\u9593\u30E2\u30C7\u30EB\u3092\u8FD4\u3059\u3002
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layerRank: number}>>>}
 */
async function parseCss(cssText, options = {}) {
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
        // cssText \u3092\u4F7F\u3063\u3066\u30B7\u30E7\u30FC\u30C8\u30CF\u30F3\u30C9\u3092\u4FDD\u6301\u3057\u305F\u307E\u307E\u30D1\u30FC\u30B9\uFF08style.item(i) \u306F\u30B7\u30E7\u30FC\u30C8\u30CF\u30F3\u30C9\u3092\u5C55\u958B\u3059\u308B\uFF09
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
        // CSSContainerRule.containerName (\u540D\u524D) + containerQuery (\u6761\u4EF6) \u3092\u7D44\u307F\u5408\u308F\u305B\u308B
        const fullQuery = [rule.containerName, rule.containerQuery].filter(Boolean).join(' ').trim()
        const childConds = _appendCondition(conds, 'container', fullQuery)
        processRules(rule.cssRules, childConds, layer)
      } else if (_isLayerBlock(rule)) {
        // @layer name { ... } \u307E\u305F\u306F\u533F\u540D @layer { ... }
        const params = rule.name || ''
        const layerName = params
          ? _qualifyLayer(layer, params)
          : _qualifyLayer(layer, \`__anon\${anonCounter++}\`)
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
        const contextKey = \`@keyframes \${rule.name}\`
        for (const keyframe of rule.cssRules) {
          // Chrome \u306F 0%\u2192from, 100%\u2192to \u3092\u6B63\u898F\u5316\u3057\u306A\u3044\u306E\u3067\u624B\u52D5\u3067\u6B63\u898F\u5316\u3059\u308B
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

  // \u5168\u30EC\u30A4\u30E4\u30FC\u306E\u5BA3\u8A00\u9806\u304C\u78BA\u5B9A\u3057\u3066\u304B\u3089 layerRank \u3092\u8A08\u7B97\u3059\u308B
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

// \u2500\u2500\u2500 parseSelectorOrder \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

/**
 * CSS \u30C6\u30AD\u30B9\u30C8\u3092\u30D1\u30FC\u30B9\u3057\u3066\u3001\u5404\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u5185\u306E\u30BB\u30EC\u30AF\u30BF\u3092\u6700\u7D42\u51FA\u73FE\u9806\u3067\u8FD4\u3059\u3002
 * order-risk.js \u3067\u4F7F\u7528\u3059\u308B\u3002
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, string[]>>}
 */
async function parseSelectorOrder(cssText, options = {}) {
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
        // @layer block \u306A\u3069: \u89AA\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u306B\u5E73\u5766\u5316\uFF08\u9806\u5E8F\u3092\u4FDD\u6301\uFF09
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
`,M=null,A=null,L=null;async function ne(){return L||(L=(async()=>(M=await oe.chromium.launch({headless:!0}),A=await(await M.newContext()).newPage(),await A.addScriptTag({content:ke}),A))().catch(t=>{let e=M;throw L=null,M=null,A=null,e?.close().catch(()=>{}),t})),L}async function D(){M&&(await M.close(),M=null,A=null,L=null)}process.on("exit",()=>{M&&M.close().catch(()=>{})});async function se(){await D(),process.exit(0)}process.once("SIGTERM",se);process.once("SIGINT",se);async function P(t,e={}){let s=await(await ne()).evaluate(async([a,o])=>[...(await globalThis.parseCss(a,o)).entries()],[t,e]);return new Map(s)}async function W(t,e={}){let s=await(await ne()).evaluate(async([a,o])=>[...(await globalThis.parseSelectorOrder(a,o)).entries()],[t,e]);return new Map(s)}function V(t){let e=new Map;for(let[r,s]of t){e.has(r)||e.set(r,new Map);let a=e.get(r),o=new Map;for(let{selector:n,prop:i,value:l,important:p,layerRank:d}of s){let c=d??(p?1:0);a.has(n)||(a.set(n,new Map),o.set(n,new Map));let g=a.get(n),f=o.get(n),m=f.get(i);(m===void 0||c>=m)&&(g.set(i,{value:l,important:p}),f.set(i,c))}}return e}function Ee(t){let e=t.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function z(t){let e=t.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(r,s,a,o)=>s==="-"?` - 0.${o}`:`${s}${a}0.${o}`),e=e.replace(/([%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,r=>Ee(r)),e}function N(t,e,r={}){let s=new Map,a=new Set([...t.keys(),...e.keys()]),o=["base",...[...a].filter(n=>n!=="base").sort()];for(let n of o){if(!a.has(n))continue;let i=t.get(n)||new Map,l=e.get(n)||new Map,p=new Set([...i.keys(),...l.keys()]),d=new Map,c=0;for(let f of[...p].sort()){let m=i.get(f)||new Map,y=l.get(f)||new Map,$=new Set([...m.keys(),...y.keys()]),w=new Map,u=0;for(let v of[...$].sort()){let S=m.get(v),h=y.get(v),k;!S&&h?(k={status:"added",newValue:h.value,newImportant:h.important},u++):S&&!h?(k={status:"removed",oldValue:S.value,oldImportant:S.important},u++):(r.ignoreCosmetic?z(S.value)!==z(h.value):S.value!==h.value)||S.important!==h.important?(k={status:"changed",oldValue:S.value,oldImportant:S.important,newValue:h.value,newImportant:h.important},u++):k={status:"unchanged",value:h.value,important:h.important},w.set(v,k)}let b;i.has(f)?l.has(f)?u>0?b="changed":b="unchanged":b="removed":b="added",d.set(f,{status:b,changeCount:u,props:w}),c+=u}let g;t.has(n)?e.has(n)?c>0?g="changed":g="unchanged":g="removed":g="added",s.set(n,{status:g,changeCount:c,selectors:d})}return s}function B([t,e,r],[s,a,o]){return t>s||t===s&&e>a||t===s&&e===a&&r>o}function H(t,e){return B(t,e)?1:B(e,t)?-1:0}function Re(t){let e=[],r=0,s=0,a=0,o=null;for(let i=0;i<t.length;i++){let l=t[i];o?l===o&&(o=null):l==='"'||l==="'"?o=l:l==="("?r++:l===")"?r>0&&r--:l==="["?s++:l==="]"?s>0&&s--:l===","&&r===0&&s===0&&(e.push(t.slice(a,i).trim()),a=i+1)}let n=t.slice(a).trim();return n&&e.push(n),e}function Oe(t,e){let r=1,s=0,a=e,o=null;for(;a<t.length&&r>0;){let n=t[a];o?n===o&&(o=null):n==='"'||n==="'"?o=n:n==="["?s++:n==="]"?s>0&&s--:s===0&&n==="("?r++:s===0&&n===")"&&r--,a++}return r===0?a:null}function re(t,e,r){let s=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");s.lastIndex=0;let a="",o=0,n;for(;(n=s.exec(t))!==null;){let i=n.index+n[0].length,l=Oe(t,i);if(a+=t.slice(o,n.index),l===null){a+=t.slice(i),o=t.length;break}r(t,i,l,n),o=l,s.lastIndex=o}return a+t.slice(o)}function I(t,e=0){if(e>100)return[0,0,0];let r=0,s=0,a=0,o=t.replace(/\\./g,"x"),n=l=>{let p=[0,0,0];for(let d of Re(l)){let c=I(d,e+1);B(c,p)&&(p=c)}r+=p[0],s+=p[1],a+=p[2]};o=re(o,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(l,p,d,c)=>{let g=c.groups.name.toLowerCase(),f=l.slice(p,d-1).trim();if(g==="nth-child"||g==="nth-last-child"){let m=f.match(/\sof\b/i);m&&n(f.slice(m.index+m[0].length).trim()),s++}else g==="where"||(n(f),(g==="host"||g==="host-context")&&s++)}),o=re(o,/::(?:slotted|cue)\s*\(/gi,(l,p,d)=>{n(l.slice(p,d-1).trim()),a++}),o=o.replace(/::[\w-]+(\([^)]*\))?/g,()=>(a++,"")),o=o.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(a++,"")),o=o.replace(/\[[^\]]*\]/g,()=>(s++,"")),o=o.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(s++,"")),o=o.replace(/#[\w-]+/g,()=>(r++,"")),o=o.replace(/\.[\w-]+/g,()=>(s++,"")),o=o.replace(/\|\|/g," ").replace(/[>+~]/g," "),o=o.replace(/(?:[\w-]+|\*)?\|/g,"");let i=o.split(/\s+/).filter(l=>l&&l!=="*"&&/^[a-zA-Z][\w-]*/.test(l));return a+=i.length,[r,s,a]}function q(t,e){let[r,s,a]=I(t),[o,n,i]=I(e);return r===o&&s===n&&a===i}function _e(t,e){let r=new Set(t),s=new Set(e),a=t.filter(d=>s.has(d)),o=e.filter(d=>r.has(d)),n=new Map;for(let d=0;d<a.length;d++)n.set(a[d],o[d]);let i=[],l=0,p=new Set;for(let d of t){if(!s.has(d)){i.push({type:"deleted",oldSelector:d,newSelector:null});continue}let c=n.get(d);for(;l<e.length&&!r.has(e[l]);)i.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;if(d===c)i.push({type:"equal",oldSelector:d,newSelector:c});else{let g=[d,c].sort().join("\0");p.has(g)||(p.add(g),i.push({type:"moved",oldSelector:d,newSelector:c}))}l++}for(;l<e.length;)r.has(e[l])||i.push({type:"added",oldSelector:null,newSelector:e[l]}),l++;return i}function F(t,e,r,s,a,o,n){return!r&&!s?null:r?s?r.important!==s.important?r.important?t:e:a!==0?a>0?t:e:o>n?t:e:t:e}function U(t){let e="",r=0;for(let s of t){if(s==="("){r++;continue}if(s===")"){r--;continue}r===0&&(e+=s)}return e}function Me(t,e){let r=U(t),s=U(e);if(/[\s>+~]/.test(r)||/[\s>+~]/.test(s))return!0;function a(c){let g=U(c).replace(/:{1,2}[\w-]+/g,""),f=new Set,m=new Set,y=null;for(let w of g.matchAll(/#([\w-]+)/g))f.add(w[1]);for(let w of g.matchAll(/\.([\w-]+)/g))m.add(w[1]);let $=g.match(/^([a-zA-Z][\w-]*)/);return $&&(y=$[1]),{type:y,ids:f,classes:m}}let o=a(t),n=a(e);if(o.type&&n.type&&o.type!==n.type)return!1;let i=new Set([...o.ids,...o.classes]),l=new Set([...n.ids,...n.classes]);if(i.size===0||l.size===0)return!0;let p=[...i].every(c=>l.has(c)),d=[...l].every(c=>i.has(c));return p||d}function Pe(t,e,r,s,a){let o=t.oldSelector,n=t.newSelector;t.sameSpecificity=q(o,n),t.conflictingProps=[],t.hasOverlappingProps=!1;let i=e.indexOf(o),l=e.indexOf(n),p=r.indexOf(o),d=r.indexOf(n);if(i<0||l<0||p<0||d<0)return;let c=i<l,g=p<d;if(c===g||!Me(o,n))return;let f=H(I(o),I(n)),m=s.get(o)||new Map,y=s.get(n)||new Map,$=a.get(o)||new Map,w=a.get(n)||new Map;for(let[u,b]of $){let v=w.get(u);if(!v||(t.hasOverlappingProps=!0,b.value===v.value&&b.important===v.important))continue;let S=F(o,n,m.get(u),y.get(u),f,i,l),h=F(o,n,b,v,f,p,d);if(!h)continue;if(!S){let R=F(o,n,b,v,f,i,l);if(!R||R===h)continue;let _=a.get(R)?.get(u),O=a.get(h)?.get(u);if(!_||!O||_.value===O.value&&_.important===O.important)continue;t.conflictingProps.push({prop:u,oldEffective:null,newEffective:{value:O.value,important:O.important}});continue}let k=s.get(S)?.get(u),C=a.get(h)?.get(u);!k||!C||k.value===C.value&&k.important===C.important||t.conflictingProps.push({prop:u,oldEffective:{value:k.value,important:k.important},newEffective:{value:C.value,important:C.important}})}}async function X(t,e,r={},s=null,a={}){let o={semanticSelectors:r.semanticSelectors},n=s?.parseCss??P,i=s?.parseSelectorOrder??W,[l,p]=await Promise.all([i(t,o),i(e,o)]),[d,c]=await Promise.all([a.parsedOld??n(t,o),a.parsedNew??n(e,o)]),g=V(d),f=V(c),m=new Set([...l.keys(),...p.keys()]),y=["base",...[...m].filter(w=>w!=="base").sort()],$=[];for(let w of y){if(!m.has(w))continue;let u=l.get(w)||[],b=p.get(w)||[],v=_e(u,b),S=g.get(w)||new Map,h=f.get(w)||new Map;for(let C of v)C.type==="moved"&&Pe(C,u,b,S,h);let k=v.some(C=>C.type==="moved"&&C.conflictingProps?.length>0);v.some(C=>C.type!=="equal")&&$.push({contextKey:w,rows:v,hasWarning:k})}return $}var Ve=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-inline","padding-block"]],["margin",["margin-top","margin-right","margin-bottom","margin-left","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-inline","margin-block"]],["border",["border-top","border-right","border-bottom","border-left","border-width","border-style","border-color","border-top-width","border-top-style","border-top-color","border-right-width","border-right-style","border-right-color","border-bottom-width","border-bottom-style","border-bottom-color","border-left-width","border-left-style","border-left-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["border-inline",["border-inline-start","border-inline-end","border-inline-width","border-inline-style","border-inline-color"]],["border-block",["border-block-start","border-block-end","border-block-width","border-block-style","border-block-color"]],["background",["background-color","background-image","background-position","background-size","background-repeat","background-attachment","background-origin","background-clip"]],["font",["font-style","font-variant","font-weight","font-stretch","font-size","font-family","line-height"]],["flex",["flex-grow","flex-shrink","flex-basis"]],["flex-flow",["flex-direction","flex-wrap"]],["grid-column",["grid-column-start","grid-column-end"]],["grid-row",["grid-row-start","grid-row-end"]],["grid-template",["grid-template-rows","grid-template-columns","grid-template-areas"]],["transition",["transition-property","transition-duration","transition-timing-function","transition-delay"]],["animation",["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode","animation-play-state"]],["inset",["top","right","bottom","left"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["overflow",["overflow-x","overflow-y"]],["text-decoration",["text-decoration-line","text-decoration-style","text-decoration-color","text-decoration-thickness"]],["outline",["outline-width","outline-style","outline-color"]],["list-style",["list-style-type","list-style-position","list-style-image"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["mask",["mask-image","mask-position","mask-size","mask-repeat","mask-origin","mask-clip","mask-mode","mask-composite"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]);function ae(t){let e=new Map;for(let r=0;r<t.length;r++){let s=t[r];e.has(s.selector)||e.set(s.selector,[]),e.get(s.selector).push({...s,idx:r})}return e}function le(t,e,r){let s=null,a=null;for(let o of t)o.prop===e?(!s||o.layerRank>s.layerRank||o.layerRank===s.layerRank&&o.idx>s.idx)&&(s=o):o.prop===r&&(!a||o.layerRank>a.layerRank||o.layerRank===a.layerRank&&o.idx>a.idx)&&(a=o);return!s&&!a?null:s?a?s.layerRank!==a.layerRank?s.layerRank>a.layerRank?"shorthand":"longhand":s.idx>a.idx?"shorthand":"longhand":"shorthand":"longhand"}function K(t,e){return t.reduce((r,s)=>s.prop!==e?r:!r||s.layerRank>r.layerRank||s.layerRank===r.layerRank&&s.idx>r.idx?s:r,null)}async function G(t,e,r={},s=null){let a={semanticSelectors:r.semanticSelectors},o=s?.parseCss??P,n=typeof t=="string"?await o(t,a):t,i=typeof e=="string"?await o(e,a):e,l=new Set([...n.keys(),...i.keys()]),p=["base",...[...l].filter(f=>f!=="base").sort()],d=[],c=!1;for(let f of p){if(!l.has(f))continue;let m=n.get(f)??[],y=i.get(f)??[],$=ae(m),w=ae(y);for(let[u,b]of w){let v=$.get(u)??[],S=[],h=new Map;for(let[k,C]of Ve){let R=K(b,k);if(R)for(let _ of C){if(!b.some(T=>T.prop===_))continue;let O=h.get(_);(!O||R.layerRank>O.bestShorthandDecl.layerRank||R.layerRank===O.bestShorthandDecl.layerRank&&R.idx>O.bestShorthandDecl.idx)&&h.set(_,{shorthand:k,bestShorthandDecl:R})}}for(let[k,{shorthand:C,bestShorthandDecl:R}]of h){let _=le(v,C,k),O=le(b,C,k);if(_===O)continue;let T=O==="shorthand"?"A":"B";T==="A"&&(c=!0);let J=K(v,C),Z=K(b,k),Q=K(v,k);S.push({shorthand:C,longhand:k,oldWinner:_,newWinner:O,direction:T,oldShorthandValue:J?.value??null,oldLonghandValue:Q?.value??null,longhandValue:Z?.value??null,shorthandValue:R?.value??null,oldShorthandImportant:J?.important??!1,oldLonghandImportant:Q?.important??!1,shorthandImportant:R?.important??!1,longhandImportant:Z?.important??!1})}S.length>0&&d.push({contextKey:f,selector:u,conflicts:S})}}let g=new Map;for(let f of d)g.has(f.contextKey)||g.set(f.contextKey,{contextKey:f.contextKey,selectors:[]}),g.get(f.contextKey).selectors.push({selector:f.selector,conflicts:f.conflicts});return{hasWarning:c,risks:[...g.values()]}}var Ie=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left"]],["margin",["margin-top","margin-right","margin-bottom","margin-left"]],["inset",["top","right","bottom","left"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]),De=new Map([["overflow",["overflow-x","overflow-y"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]]]),Ae=new Set(["border","border-top","border-right","border-bottom","border-left","border-inline-start","border-inline-end","border-block-start","border-block-end","outline"]),Le=new Set(["none","hidden","dotted","dashed","solid","double","groove","ridge","inset","outset"]),We=new Set(["row","row-reverse","column","column-reverse"]),je=new Set(["nowrap","wrap","wrap-reverse"]);function j(t){let e=[],r=0,s=null,a=0,o=t.trim();for(let i=0;i<o.length;i++){let l=o[i];if(s)l===s&&(s=null);else if(l==='"'||l==="'")s=l;else if(l==="(")r++;else if(l===")")r>0&&r--;else if(/\s/.test(l)&&r===0){let p=o.slice(a,i);p&&e.push(p),a=i+1}}let n=o.slice(a);return n&&e.push(n),e}function ce(t,e,r){let s=Ie.get(t);if(s){let o=s.indexOf(e);if(o!==-1){let n=j(r);return(n.length===1?[n[0],n[0],n[0],n[0]]:n.length===2?[n[0],n[1],n[0],n[1]]:n.length===3?[n[0],n[1],n[2],n[1]]:[n[0],n[1],n[2],n[3]])[o]}}let a=De.get(t);if(a){let o=a.indexOf(e);if(o!==-1){let n=j(r);return n.length===1?n[0]:n[o]??n[0]}}if(Ae.has(t)){let o=j(r),n="medium",i="none",l="currentcolor";for(let p of o){let d=p.toLowerCase();Le.has(d)?i=p:/^(thin|medium|thick)$/i.test(p)||/^[0-9]/.test(p)||/^(calc|var|env|min|max|clamp)\(/i.test(p)?n=p:l=p}if(e.endsWith("-width"))return n;if(e.endsWith("-style"))return i;if(e.endsWith("-color"))return l}if(t==="flex"){let o=j(r),n=o[0]?.toLowerCase();if(n==="none"){if(e==="flex-grow"||e==="flex-shrink")return"0";if(e==="flex-basis")return"auto"}else if(n==="auto"){if(e==="flex-grow"||e==="flex-shrink")return"1";if(e==="flex-basis")return"auto"}else if(o.length===3){if(e==="flex-grow")return o[0];if(e==="flex-shrink")return o[1];if(e==="flex-basis")return o[2]}}if(t==="flex-flow")for(let o of j(r)){let n=o.toLowerCase();if(We.has(n)&&e==="flex-direction"||je.has(n)&&e==="flex-wrap")return o}return r}function Y(t,e){if(e?.risks?.length)for(let{contextKey:r,selectors:s}of e.risks){let a=t.get(r);if(a)for(let{selector:o,conflicts:n}of s){let i=a.selectors.get(o);if(!i)continue;let l=0;for(let{shorthand:p,longhand:d,oldWinner:c,newWinner:g,longhandValue:f,shorthandValue:m,oldShorthandValue:y,oldLonghandValue:$,oldShorthandImportant:w,oldLonghandImportant:u,shorthandImportant:b,longhandImportant:v}of n){let S=i.props.get(d);if(S&&S.status!=="unchanged")continue;let h=g==="longhand"?f:ce(p,d,m??""),k=g==="longhand"?v:b;if(c===null)i.props.set(d,{status:"added",newValue:h,newImportant:k});else{let C=c==="longhand"?$:ce(p,d,y??""),R=c==="longhand"?u:w;i.props.set(d,{status:"changed",oldValue:C,oldImportant:R,newValue:h,newImportant:k})}l++}l>0&&(i.changeCount+=l,i.status!=="added"&&i.status!=="removed"&&(i.status="changed"),a.changeCount+=l,a.status!=="added"&&a.status!=="removed"&&(a.status="changed"))}}}var ue=require("node:fs"),ge=require("node:url");function x(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ie(t,e){let{status:r}=e;function s(a){return a?' <span class="important">!important</span>':""}return r==="added"?`
      <div class="prop prop--added">
        <span class="prop-name">${x(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${x(e.newValue)}${s(e.newImportant)}</span>
        <span class="prop-badge badge--added">\u8FFD\u52A0</span>
      </div>`:r==="removed"?`
      <div class="prop prop--removed">
        <span class="prop-name">${x(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${x(e.oldValue)}${s(e.oldImportant)}</span>
        <span class="prop-badge badge--removed">\u524A\u9664</span>
      </div>`:r==="changed"?`
      <div class="prop prop--changed">
        <span class="prop-name">${x(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value prop-value--old">${x(e.oldValue)}${s(e.oldImportant)}</span>
        <span class="prop-arrow">\u2192</span>
        <span class="prop-value prop-value--new">${x(e.newValue)}${s(e.newImportant)}</span>
        <span class="prop-badge badge--changed">\u5909\u66F4</span>
      </div>`:`
    <div class="prop prop--unchanged">
      <span class="prop-name">${x(t)}</span>
      <span class="prop-colon">:</span>
      <span class="prop-value">${x(e.value)}${s(e.important)}</span>
    </div>`}function Te(t,e){let{props:r}=e,s=[],a=[];for(let[n,i]of r){let l=x(n);if(i.status==="unchanged"){let p=x(i.value)+(i.important?" !important":"");s.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${p}</span>;</div>`),a.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${p}</span>;</div>`)}else if(i.status==="added"){s.push('<div class="detail-line detail-line--empty"></div>');let p=x(i.newValue)+(i.newImportant?" !important":"");a.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${p}</span>;</div>`)}else if(i.status==="removed"){let p=x(i.oldValue)+(i.oldImportant?" !important":"");s.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${p}</span>;</div>`),a.push('<div class="detail-line detail-line--empty"></div>')}else{let p=x(i.oldValue)+(i.oldImportant?" !important":""),d=x(i.newValue)+(i.newImportant?" !important":"");s.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${p}</span>;</div>`),a.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${l}</span><span class="detail-colon">:</span> <span class="detail-val">${d}</span>;</div>`)}}let o=x(t);return`
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">\u65E7</div>
        <pre class="detail-block"><code>${o} {
${s.join(`
`)}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">\u65B0</div>
        <pre class="detail-block"><code>${o} {
${a.join(`
`)}}</code></pre>
      </div>
    </div>`}function ze(t,e,{highlightHtml:r,showUnchanged:s=!1,contextKey:a="",expanded:o=!1}={}){let{status:n,changeCount:i,props:l}=e,p=r||x(t),d={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[n],c={added:`+${[...l.values()].filter(u=>u.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...l.values()].filter(u=>u.status==="removed").length} \u524A\u9664`,changed:(()=>{let u=[...l.values()].filter(h=>h.status==="added").length,b=[...l.values()].filter(h=>h.status==="removed").length,v=[...l.values()].filter(h=>h.status==="changed").length,S=[];return u&&S.push(`+${u}`),b&&S.push(`\u2212${b}`),v&&S.push(`~${v}`),S.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[n],g=[...l.entries()].filter(([,u])=>u.status!=="unchanged"),f=[...l.entries()].filter(([,u])=>u.status==="unchanged"),m=[...g.map(([u,b])=>ie(u,b)),...s?f.map(([u,b])=>ie(u,b)):[]].join(""),y=f.length>0&&!s?`<button class="unchanged-toggle" data-selector="${x(t)}">
           \u5909\u66F4\u306A\u3057 ${f.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",$=o?Te(t,e):"",w=o?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${n}" data-selector="${x(t)}" data-context="${x(a)}"${w}>
      <div class="selector-header" role="button" tabindex="0" title="\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u65E7\u306E\u5168\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A">
        <code class="selector-name">${p}</code>
        <span class="selector-badge ${d}">${c}</span>
        <span class="selector-expand-icon">${o?"\u25B2":"\u25BC"}</span>
      </div>
      <div class="props-list">
        ${m||'<div class="no-props">\u30D7\u30ED\u30D1\u30C6\u30A3\u306A\u3057</div>'}
        ${y}
      </div>
      ${$}
    </div>`}function Ke(t,e,r,{showUnchanged:s=!1,expandedSelectors:a=new Set}={}){let{status:o,changeCount:n}=e,l=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":x(t),p={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[o],d=n>0?`<span class="context-badge ${p}">${n} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',c=r?r.map(({selector:f,positions:m})=>({selector:f,positions:m,selDiff:e.selectors.get(f)})).filter(f=>f.selDiff):[...e.selectors.entries()].map(([f,m])=>({selector:f,positions:new Set,selDiff:m}));if(c.length===0)return"";let g=c.map(({selector:f,positions:m,selDiff:y})=>ze(f,y,{highlightHtml:m.size>0?Ne(f,m):null,showUnchanged:s,contextKey:t,expanded:a.has(`${t}||${f}`)})).join("");return`
    <section class="context-section context-section--${o}">
      <div class="context-header">
        <span class="context-label">${l}</span>
        ${d}
      </div>
      <div class="context-selectors">
        ${g}
      </div>
    </section>`}function Ne(t,e){return[...t].map((r,s)=>{let a=x(r);return e.has(s)?`<mark class="fzf-match">${a}</mark>`:a}).join("")}function Be(t){let e=x(t.prop),r=t.oldEffective?x(t.oldEffective.value)+(t.oldEffective.important?" !important":""):'<span class="or-prop-absent">\u65E7 CSS \u672A\u5BA3\u8A00</span>',s=t.newEffective?x(t.newEffective.value)+(t.newEffective.important?" !important":""):'<span class="or-prop-absent">\u65B0 CSS \u672A\u5BA3\u8A00</span>';return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${r}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${s}</span></span>`}function He(t){let e=x(t.oldSelector),r=x(t.newSelector),s=t.conflictingProps&&t.conflictingProps.length>0,a=t.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',o=s?`<div class="or-conflicts">${t.conflictingProps.map(Be).join("")}</div>`:"";return`<tr class="${s?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${r}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${a}
      ${o}
    </td>
  </tr>`}function qe(t){return t.type==="equal"?`<tr class="or-row or-row--equal">
      <td class="or-cell or-cell--old"><code>${x(t.oldSelector)}</code></td>
      <td class="or-cell or-cell--new"><code>${x(t.newSelector)}</code></td>
      <td class="or-cell or-cell--status"></td>
    </tr>`:t.type==="deleted"?`<tr class="or-row or-row--deleted">
      <td class="or-cell or-cell--old"><code>${x(t.oldSelector)}</code></td>
      <td class="or-cell or-cell--new or-cell--empty"></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--deleted">\u524A\u9664</span></td>
    </tr>`:t.type==="added"?`<tr class="or-row or-row--added">
      <td class="or-cell or-cell--old or-cell--empty"></td>
      <td class="or-cell or-cell--new"><code>${x(t.newSelector)}</code></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--added">\u8FFD\u52A0</span></td>
    </tr>`:""}function Fe(t,e=!1){let{contextKey:r,rows:s,hasWarning:a}=t,o=r==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":x(r),n=s.filter(d=>d.type==="moved").length,i=n===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':a?`<span class="or-ctx-badge or-ctx-badge--warning">${n} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${n} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,l=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,p=s.map(d=>d.type==="moved"?He(d):qe(d)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${x(r)}" aria-expanded="${e}" role="button" tabindex="0">
      ${l}
      <span class="or-context-label">${o}</span>
      ${i}
    </div>
    <div class="or-table-wrap${e?"":" or-table-wrap--collapsed"}">
      <table class="or-table">
        <thead>
          <tr>
            <th class="or-th">\u65E7 CSS</th>
            <th class="or-th">\u65B0 CSS</th>
            <th class="or-th">\u72B6\u614B</th>
          </tr>
        </thead>
        <tbody>${p}</tbody>
      </table>
    </div>
  </div>`}function de(t,{activeContext:e="all",filterOrderRisk:r=!1,expandedContexts:s=new Set}={}){if(!t||t.length===0)return"";let a=r?t.filter(p=>p.hasWarning):t,o=e==="all"?a:a.filter(p=>p.contextKey===e);if(o.length===0)return"";let n=o.reduce((p,d)=>p+d.rows.filter(c=>c.type==="moved").length,0);if(n===0)return"";let i=o.some(p=>p.hasWarning),l=o.map(p=>Fe(p,s.has(p.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${i?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${n} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${n} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${l}
  </section>`}function pe(t){if(!t||!t.risks||t.risks.length===0)return"";let{risks:e,hasWarning:r}=t,s=e.reduce((o,n)=>o+n.selectors.reduce((i,l)=>i+l.conflicts.length,0),0);if(s===0)return"";let a=e.map(({contextKey:o,selectors:n})=>{let i=o==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":x(o),l=n.some(c=>c.conflicts.some(g=>g.direction==="A")),p=n.map(({selector:c,conflicts:g})=>{let f=g.map(({shorthand:m,longhand:y,direction:$,oldWinner:w,longhandValue:u,shorthandValue:b,oldShorthandValue:v})=>{let S=x(m),h=x(y),k=x(b??""),C=x(v??""),R=x(u??"");return $==="A"?`<div class="sr-conflict sr-conflict--risk">
            <span class="sr-badge sr-badge--risk">\u26A0 \u30EA\u30B9\u30AF</span>
            <code class="sr-longhand">${h}</code>
            <span class="sr-desc">\u304C <code>${S}: ${k}</code> \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: longhand \u304C\u6709\u52B9 \u2192 \u65B0: shorthand \u304C\u4E0A\u66F8\u304D\uFF09</span>
          </div>`:w===null?`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u65B0\u898F</span>
            <code class="sr-longhand">${h}</code>
            <span class="sr-desc">\uFF08\u65B0\u898F\u8FFD\u52A0: <code>${h}: ${R}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`:`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u89E3\u6D88</span>
            <code class="sr-longhand">${h}</code>
            <span class="sr-desc">\u306E shorthand \u4E0A\u66F8\u304D\u304C\u89E3\u6D88\uFF08\u65E7: <code>${S}: ${C}</code> \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: <code>${h}: ${R}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`}).join("");return`<div class="sr-selector">
        <code class="sr-selector-name">${x(c)}</code>
        <div class="sr-conflicts">${f}</div>
      </div>`}).join("");return`<div class="sr-context">
      <div class="sr-context-header">
        <span class="sr-context-label">${i}</span>
        ${l?'<span class="sr-ctx-badge sr-ctx-badge--warning">\u26A0 \u30EA\u30B9\u30AF\u3042\u308A</span>':'<span class="sr-ctx-badge sr-ctx-badge--ok">\u5909\u66F4\u306E\u307F</span>'}
      </div>
      <div class="sr-selectors">${p}</div>
    </div>`}).join("");return`<section class="shorthand-risks-section">
    <div class="shorthand-risks-header">
      <span class="shorthand-risks-title">Shorthand/Longhand \u7AF6\u5408</span>
      ${r?`<span class="shorthand-risks-count shorthand-risks-count--warning">\u26A0 ${s} \u4EF6\u306E\u7AF6\u5408\uFF08\u30EA\u30B9\u30AF\u3042\u308A\uFF09</span>`:`<span class="shorthand-risks-count shorthand-risks-count--ok">${s} \u4EF6\u306E\u7AF6\u5408\uFF08\u5909\u66F4\u306E\u307F\uFF09</span>`}
    </div>
    ${a}
  </section>`}function fe(t,e,{activeContext:r="all",showUnchanged:s=!1,expandedSelectors:a=new Set}={}){if(!t||t.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let o=null;if(e!==null){o=new Map;for(let i of e)o.has(i.contextKey)||o.set(i.contextKey,[]),o.get(i.contextKey).push({selector:i.selector,positions:i.positions||new Set})}let n="";for(let[i,l]of t){if(r!=="all"&&i!==r)continue;let p=o?o.get(i)||[]:null;o&&p.length===0||(n+=Ke(i,l,p,{showUnchanged:s,expandedSelectors:a}))}return n||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var Ye={};function Ue(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   CSS Diff App \u2014 \u30B9\u30BF\u30A4\u30EB
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* \u2500\u2500 \u30C7\u30B6\u30A4\u30F3\u30C8\u30FC\u30AF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-bg:          #f8fafc;
  --color-surface:     #ffffff;
  --color-border:      #e2e8f0;
  --color-text:        #1e293b;
  --color-text-muted:  #64748b;
  --color-text-code:   #334155;

  --color-added-bg:    #f0fdf4;
  --color-added-text:  #15803d;
  --color-added-border:#86efac;
  --color-added-badge: #22c55e;

  --color-removed-bg:   #fff1f2;
  --color-removed-text: #be123c;
  --color-removed-border:#fda4af;
  --color-removed-badge: #f43f5e;

  --color-changed-bg:   #fffbeb;
  --color-changed-text: #92400e;
  --color-changed-border:#fcd34d;
  --color-changed-badge: #f59e0b;

  --color-unchanged-bg:   #f8fafc;
  --color-unchanged-text: #94a3b8;
  --color-unchanged-border:#e2e8f0;

  --color-primary:     #6366f1;
  --color-primary-light: #e0e7ff;

  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg: 12px;

  --shadow-sm:  0 1px 2px rgba(0,0,0,.06);
  --shadow-md:  0 4px 12px rgba(0,0,0,.08);

  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SFMono-Regular', 'Cascadia Code', 'Consolas', 'Menlo', monospace;
}

/* \u2500\u2500 \u30D9\u30FC\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  font-size: 14px;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  line-height: 1.6;
}

/* \u2500\u2500 \u30D8\u30C3\u30C0\u30FC & \u30C9\u30ED\u30C3\u30D7\u30BE\u30FC\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 24px;
  position: relative;
}

.github-link {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.github-link:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
  background: var(--color-border);
}

.github-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.app-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.dropzones {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dropzones-arrow {
  font-size: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.dropzone {
  flex: 1;
  min-height: 80px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  padding: 16px;
  user-select: none;
}

.dropzone:hover,
.dropzone:focus-visible {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  outline: none;
}

.dropzone.dragover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone.loaded {
  border-style: solid;
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone-icon { font-size: 20px; }

.dropzone-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  word-break: break-all;
}

.dropzone-sub {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
}

/* \u2500\u2500 \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.controls-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 200px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0 10px;
}

.search-icon { font-size: 13px; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 7px 0;
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--color-text);
  outline: none;
}

.search-input::placeholder { color: var(--color-text-muted); }

.filter-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
}

.filter-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

/* \u2500\u2500 \u30B5\u30DE\u30EA\u30FC\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.summary-bar {
  padding: 8px 24px;
  font-size: 12px;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.sum-added   { color: var(--color-added-text); font-weight: 600; }
.sum-removed { color: var(--color-removed-text); font-weight: 600; }
.sum-changed { color: var(--color-changed-text); font-weight: 600; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BF\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-tabs {
  padding: 10px 24px 0;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.ctx-tab {
  padding: 5px 12px;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
  position: relative;
  bottom: -1px;
}

.ctx-tab:hover { color: var(--color-text); background: var(--color-surface); }

.ctx-tab.active {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
  border-bottom-color: var(--color-surface);
}

.ctx-tab--changed .ctx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-changed-badge);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--added .ctx-badge {
  background: var(--color-added-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--removed .ctx-badge {
  background: var(--color-removed-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

/* \u2500\u2500 \u7D50\u679C\u30A8\u30EA\u30A2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.results {
  padding: 16px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1400px;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: var(--color-text-muted);
}

.empty-state p { margin-bottom: 8px; }
.empty-sub { font-size: 12px; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.context-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.context-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.context-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}

.badge--added     { background: var(--color-added-bg); color: var(--color-added-text); border: 1px solid var(--color-added-border); }
.badge--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); border: 1px solid var(--color-removed-border); }
.badge--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); border: 1px solid var(--color-changed-border); }
.badge--unchanged { background: var(--color-unchanged-bg); color: var(--color-unchanged-text); border: 1px solid var(--color-unchanged-border); }

.context-selectors {
  display: flex;
  flex-direction: column;
}

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-card {
  border-bottom: 1px solid var(--color-border);
  padding: 10px 16px;
}

.selector-card:last-child { border-bottom: none; }

.selector-card--added .selector-header   { background: var(--color-added-bg); }
.selector-card--removed .selector-header { background: var(--color-removed-bg); }
.selector-card--changed .selector-header { background: var(--color-changed-bg); }
.selector-card--unchanged { opacity: .7; }

.selector-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: 6px;
  cursor: pointer;
  user-select: none;
}

.selector-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-code);
  flex: 1;
  word-break: break-all;
}

.selector-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* \u2500\u2500 fzf \u30CF\u30A4\u30E9\u30A4\u30C8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fzf-match {
  background: #fef08a;
  color: #78350f;
  border-radius: 2px;
  padding: 0 1px;
}

/* \u2500\u2500 \u30D7\u30ED\u30D1\u30C6\u30A3\u884C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.props-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 8px;
}

.prop {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 12px;
  flex-wrap: wrap;
}

.prop--added   { background: var(--color-added-bg); }
.prop--removed { background: var(--color-removed-bg); }
.prop--changed { background: var(--color-changed-bg); }
.prop--unchanged { color: var(--color-text-muted); }

.prop-name  { font-weight: 600; color: inherit; }
.prop-colon { color: var(--color-text-muted); }

.prop-value--old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.prop-value--new {
  color: var(--color-added-text);
  font-weight: 600;
}

.prop-arrow {
  font-size: 11px;
  color: var(--color-text-muted);
}

.prop-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 9999px;
  flex-shrink: 0;
  margin-left: auto;
}

.important {
  font-size: 10px;
  color: var(--color-removed-text);
  font-weight: 700;
}

.no-props {
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 2px 0;
}

/* \u2500\u2500 \u5909\u66F4\u306A\u3057\u5C55\u958B\u30DC\u30BF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.unchanged-toggle {
  margin-top: 4px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px dashed var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  transition: all .12s;
  align-self: flex-start;
}

.unchanged-toggle:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
}

/* \u2500\u2500 \u30AA\u30D7\u30B7\u30E7\u30F3 \u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.option-checks {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 6px;
  width: 100%;
}

.option-check-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  user-select: none;
}

.option-check-label input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.option-check-label:hover { color: var(--color-text); }

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u5C55\u958B\u30A2\u30A4\u30B3\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-expand-icon {
  font-size: 10px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: opacity .12s;
}

.selector-header:hover .selector-expand-icon {
  opacity: 0.8;
}

/* \u2500\u2500 \u65B0\u65E72\u30AB\u30E9\u30E0\u8A73\u7D30\u30D1\u30CD\u30EB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
}

.selector-detail-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.selector-detail-col-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.selector-detail-col--old .selector-detail-col-label { color: var(--color-removed-text); }
.selector-detail-col--new .selector-detail-col-label { color: var(--color-added-text); }

.detail-block {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.6;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
}

.detail-line {
  display: block;
  padding: 1px 4px;
  border-radius: 2px;
}

.detail-line--unchanged { color: var(--color-text-code); }
.detail-line--added     { background: var(--color-added-bg); color: var(--color-added-text); }
.detail-line--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); text-decoration: line-through; }
.detail-line--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); }
.detail-line--empty     { min-height: 1.6em; }

.detail-prop { font-weight: 600; }
.detail-colon { color: var(--color-text-muted); }
.detail-val { color: inherit; }

/* \u2500\u2500 \u30D5\u30A3\u30EB\u30BF\u30DC\u30BF\u30F3\uFF08\u8B66\u544A\u7528\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.filter-btn--warning { border-color: var(--color-changed-border); }
.filter-btn--warning:hover { border-color: var(--color-changed-badge); color: var(--color-changed-text); }
.filter-btn--warning.active {
  background: var(--color-changed-badge);
  border-color: var(--color-changed-badge);
  color: #fff;
}

/* \u2500\u2500 \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-warning-bg:     #fffbeb;
  --color-warning-border: #fcd34d;
  --color-warning-text:   #92400e;
  --color-warning-badge:  #f59e0b;
}

.order-risks-section {
  background: var(--color-surface);
  border: 2px solid var(--color-warning-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.order-risks-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--color-warning-bg);
  border-bottom: 1px solid var(--color-warning-border);
}

.order-risks-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-warning-text);
  flex: 1;
}

.order-risks-count {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}

.order-risks-count--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.order-risks-count--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

/* \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8 */
.or-context {
  border-bottom: 1px solid var(--color-border);
}

.or-context:last-child { border-bottom: none; }

.or-context-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;
}

.or-context-header:hover {
  background: var(--color-surface);
}

.or-toggle-icon {
  font-size: 9px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.or-table-wrap--collapsed {
  display: none;
}

.or-context-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.or-ctx-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 9999px;
}

.or-ctx-badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-ctx-badge--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

.or-ctx-badge--moved {
  background: var(--color-added-bg);
  color: var(--color-added-text);
  border: 1px solid var(--color-added-border);
}

/* \u30C6\u30FC\u30D6\u30EB */
.or-table-wrap {
  overflow-x: auto;
}

.or-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 11px;
}

.or-th {
  padding: 6px 12px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.or-cell {
  padding: 5px 12px;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-code);
}

.or-row:last-child .or-cell { border-bottom: none; }

.or-cell--old { width: 35%; }
.or-cell--new { width: 35%; }
.or-cell--status { width: 30%; }

.or-cell--empty { background: var(--color-bg); }

.or-cell code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-code);
  word-break: break-all;
}

/* \u884C\u306E\u30B9\u30BF\u30A4\u30EB */
.or-row--equal .or-cell { color: var(--color-text-muted); }
.or-row--equal .or-cell code { color: var(--color-text-muted); }

.or-row--deleted { background: var(--color-removed-bg); }
.or-row--deleted .or-cell code { color: var(--color-removed-text); }

.or-row--added { background: var(--color-added-bg); }
.or-row--added .or-cell code { color: var(--color-added-text); }

.or-row--moved { background: var(--color-warning-bg); }
.or-row--moved.or-row--conflict { background: #fef9c3; }
.or-row--moved .or-cell code { color: var(--color-warning-text); font-weight: 600; }

/* \u30D0\u30C3\u30B8 */
.or-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 9999px;
  white-space: nowrap;
}

.or-badge--moved {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-badge--deleted {
  background: var(--color-removed-bg);
  color: var(--color-removed-text);
  border: 1px solid var(--color-removed-border);
}

.or-badge--added {
  background: var(--color-added-bg);
  color: var(--color-added-text);
  border: 1px solid var(--color-added-border);
}

/* \u8A73\u7D30\u5EA6 */
.or-spec-same {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  margin-left: 4px;
}

.or-spec-diff {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
  margin-left: 4px;
}

/* \u7AF6\u5408\u30D7\u30ED\u30D1\u30C6\u30A3 */
.or-conflicts {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.or-conflict-prop {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 4px;
  padding: 2px 6px;
  color: #9a3412;
}

.or-prop-name { font-weight: 700; }

.or-prop-absent {
  color: var(--color-text-muted);
  font-style: italic;
}

.or-prop-old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.or-prop-new {
  color: var(--color-added-text);
  font-weight: 700;
}

.or-prop-arrow { color: var(--color-text-muted); font-size: 9px; }

/* \u2500\u2500 \u30EC\u30B9\u30DD\u30F3\u30B7\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 600px) {
  .dropzones { flex-direction: column; }
  .dropzones-arrow { transform: rotate(90deg); }
  .controls-bar { flex-direction: column; align-items: stretch; }
  .filter-buttons { justify-content: flex-start; }
  .selector-detail { grid-template-columns: 1fr; }
}
`}var Xe=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,Ge=`
<script>
document.addEventListener('DOMContentLoaded', () => {
  // \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.selector-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.selector-card')
      if (!card) return
      const expanded = card.getAttribute('data-expanded') === 'true'
      card.setAttribute('data-expanded', expanded ? 'false' : 'true')
      const icon = header.querySelector('.selector-expand-icon')
      if (icon) icon.textContent = expanded ? '\u25BC' : '\u25B2'
    })
  })

  // \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30D8\u30C3\u30C0\u30FC\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.or-context-header').forEach(header => {
    header.addEventListener('click', () => {
      const wrap = header.nextElementSibling
      if (!wrap) return
      const collapsed = wrap.classList.toggle('or-table-wrap--collapsed')
      const icon = header.querySelector('.or-toggle-icon')
      if (icon) icon.textContent = collapsed ? '\u25B6' : '\u25BC'
      header.setAttribute('aria-expanded', String(!collapsed))
    })
  })
})
</script>
`;function he(t,e,r){let s=Ue(),a=[],o=new Set;for(let[c,g]of t)for(let[f,m]of g.selectors)m.status!=="unchanged"&&(a.push({contextKey:c,selector:f,positions:new Set}),o.add(`${c}||${f}`));let n=a.length>0,i=e&&e.length>0,l=r&&r.risks&&r.risks.length>0,p=e?new Set(e.map(c=>c.contextKey)):new Set,d="";return n&&(d+=`<div class="diff-section">${fe(t,a,{expandedSelectors:o})}</div>`),i&&(d+=de(e,{expandedContexts:p})),l&&(d+=pe(r)),!n&&!i&&!l&&(d='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${s}</style>
  <style>${Xe}</style>
</head>
<body>
  <div id="app">${d}</div>
  ${Ge}
</body>
</html>`}var xe=`Usage: css-cascade <old.css> <new.css> [options]

Arguments:
  old.css    \u6BD4\u8F03\u5143 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9
  new.css    \u6BD4\u8F03\u5148 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9

Options:
  --format <text|json|html>               \u51FA\u529B\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8 (default: text)
  --filter <changed|added|removed|unchanged|all>
                                          \u30B9\u30C6\u30FC\u30BF\u30B9\u3067\u7D5E\u308A\u8FBC\u307F (default: changed)
  --order-risk                            \u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --shorthand-risk                        shorthand/longhand \u306E\u9806\u5E8F\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --ignore-cosmetic                       \u8868\u8A18\u63FA\u308C\u3092\u7121\u8996
  --semantic-selectors                    \u5C5E\u6027\u30BB\u30EC\u30AF\u30BF\u306E\u30AF\u30A9\u30FC\u30C8\u6709\u7121\u3092\u540C\u4E00\u8996
  --no-color                              ANSI \u30AB\u30E9\u30FC\u3092\u7121\u52B9\u5316
  -v, --version                           \u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8868\u793A
  -h, --help                              \u30D8\u30EB\u30D7\u3092\u8868\u793A

Exit codes:
  0  \u5DEE\u5206\u306A\u3057\u30FB\u9806\u5E8F\u5909\u66F4\u306A\u3057
  1  \u5DEE\u5206\u3042\u308A\u3001\u307E\u305F\u306F --order-risk \u6307\u5B9A\u6642\u306B\u9806\u5E8F\u5909\u66F4\u3042\u308A\uFF08\u30D7\u30ED\u30D1\u30C6\u30A3\u5DEE\u5206\u30BC\u30ED\u3067\u3082 exit 1\uFF09
  2  \u30A8\u30E9\u30FC`,ye;try{ye=(0,ve.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"shorthand-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(t){console.error(`Error: ${t.message}`),process.exit(2)}var{values:E,positionals:$e}=ye;E.version&&(console.log("1.1.0"),process.exit(0));E.help&&(console.log(xe),process.exit(0));$e.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error(xe),process.exit(2));var Je=new Set(["text","json","html"]);Je.has(E.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var Ze=new Set(["changed","added","removed","unchanged","all"]);Ze.has(E.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function Se(t){try{return(0,we.readFileSync)(t,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${t}": ${e.message}`),process.exit(2)}}var[Qe,et]=$e,me=Se(Qe),be=Se(et);async function tt(){let t,e=[],r={hasWarning:!1,risks:[]};try{let d={semanticSelectors:E["semantic-selectors"]},[c,g]=await Promise.all([P(me,d),P(be,d)]);t=N(V(c),V(g),{ignoreCosmetic:E["ignore-cosmetic"]}),E["order-risk"]&&(e=await X(me,be,{semanticSelectors:E["semantic-selectors"]},{parseCss:P,parseSelectorOrder:W},{parsedOld:c,parsedNew:g})),E["shorthand-risk"]&&(r=await G(c,g,{semanticSelectors:E["semantic-selectors"]}),Y(t,r))}catch(d){await D().catch(()=>{}),console.error(`Parse error: ${d.message}`),process.exit(2)}function s(d,c){return c==="all"?!0:c==="changed"?d!=="unchanged":d===c}function a(d){let c=0,g=0,f=0,m=0;for(let[,y]of d)for(let[,$]of y.selectors)for(let[,w]of $.props)w.status==="changed"?c++:w.status==="added"?g++:w.status==="removed"?f++:m++;return{changed:c,added:g,removed:f,unchanged:m}}let o=a(t),n=o.changed>0||o.added>0||o.removed>0,i=E["order-risk"]&&e.some(d=>d.hasWarning),l=E["shorthand-risk"]&&r.hasWarning,p=E.filter;if(E.format==="html"){let d=he(t,E["order-risk"]?e:null,E["shorthand-risk"]?r:null);process.stdout.write(d),await D(),process.exit(n||i||l?1:0)}if(E.format==="json"){let d=[];for(let[g,f]of t){let m=[];for(let[y,$]of f.selectors){let w=[];for(let[u,b]of $.props)s(b.status,p)&&w.push({prop:u,...b});w.length>0&&m.push({selector:y,status:$.status,changeCount:$.changeCount,props:w})}m.length>0&&d.push({key:g,status:f.status,changeCount:f.changeCount,selectors:m})}let c={version:1,summary:o,contexts:d};E["order-risk"]&&(c.orderRisks=e),E["shorthand-risk"]&&(c.shorthandRisks=r),console.log(JSON.stringify(c,null,2))}else{let d=!E["no-color"]&&!!process.stdout.isTTY,c={reset:d?"\x1B[0m":"",yellow:d?"\x1B[33m":"",green:d?"\x1B[32m":"",red:d?"\x1B[31m":"",cyan:d?"\x1B[36m":"",dim:d?"\x1B[2m":""};for(let[f,m]of t){let y=[];for(let[$,w]of m.selectors){let u=[];for(let[b,v]of w.props)s(v.status,p)&&(v.status==="changed"?u.push(`    ${c.yellow}~${c.reset} ${b}: ${v.oldValue} \u2192 ${v.newValue}`):v.status==="added"?u.push(`    ${c.green}+${c.reset} ${b}: ${v.newValue}`):v.status==="removed"?u.push(`    ${c.red}-${c.reset} ${b}: ${v.oldValue}`):u.push(`      ${b}: ${v.value}`));u.length>0&&(y.push(`  ${c.dim}${$}${c.reset}`),y.push(...u))}y.length>0&&(console.log(`
${c.cyan}[${f}]${c.reset}`),y.forEach($=>console.log($)))}let g=[];if(o.changed&&g.push(`${c.yellow}${o.changed} changed${c.reset}`),o.added&&g.push(`${c.green}${o.added} added${c.reset}`),o.removed&&g.push(`${c.red}${o.removed} removed${c.reset}`),(p==="all"||p==="unchanged")&&o.unchanged&&g.push(`${o.unchanged} unchanged`),console.log(`
Summary: ${g.length?g.join(", "):"no differences"}`),E["order-risk"]&&e.length>0){console.log(`
Order Risks:`);for(let{contextKey:f,rows:m}of e){let y=m.filter(u=>u.type!=="equal");if(y.length===0)continue;let $=Math.max(6,...y.map(u=>(u.oldSelector??"-").length)),w=Math.max(6,...y.map(u=>(u.newSelector??"-").length));console.log(`
${c.cyan}[${f}]${c.reset}`),console.log(`  ${"\u65E7 CSS".padEnd($)}  ${"\u65B0 CSS".padEnd(w)}  \u72B6\u614B`),console.log(`  ${"-".repeat($)}  ${"-".repeat(w)}  ------`);for(let u of y){let b=(u.oldSelector??"-").padEnd($),v=(u.newSelector??"-").padEnd(w);if(u.type==="moved"){let S=u.sameSpecificity?` ${c.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${c.reset}`:"";if(console.log(`  ${b}  ${v}  ${c.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${c.reset}${S}`),u.conflictingProps&&u.conflictingProps.length>0)for(let h of u.conflictingProps){let k=_=>_?.important?" !important":"",C=h.oldEffective?`${h.oldEffective.value}${k(h.oldEffective)}`:"\u65E7 CSS \u672A\u5BA3\u8A00",R=h.newEffective?`${h.newEffective.value}${k(h.newEffective)}`:"\u65B0 CSS \u672A\u5BA3\u8A00";console.log(`    ${c.dim}${h.prop}: ${C} \u2192 ${R}${c.reset}`)}}else u.type==="deleted"?console.log(`  ${b}  ${"-".padEnd(w)}  ${c.red}- \u524A\u9664${c.reset}`):u.type==="added"&&console.log(`  ${"-".padEnd($)}  ${v}  ${c.green}+ \u8FFD\u52A0${c.reset}`)}}}if(E["shorthand-risk"]&&r.risks.length>0){console.log(`
Shorthand Risks:`);for(let{contextKey:f,selectors:m}of r.risks){console.log(`
${c.cyan}[${f}]${c.reset}`);for(let{selector:y,conflicts:$}of m){console.log(`  ${c.dim}${y}${c.reset}`);for(let w of $){let{shorthand:u,longhand:b,direction:v,oldWinner:S,longhandValue:h,shorthandValue:k,oldLonghandValue:C,oldShorthandValue:R}=w;console.log(v==="A"?`    ${c.yellow}\u26A0 ${b}: shorthand \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: ${b}:${C??""} \u304C\u6709\u52B9 \u2192 \u65B0: ${u}:${k??""} \u306B\u4E0A\u66F8\u304D\uFF09${c.reset}`:S===null?`    ${c.green}\u2197 ${b}: \u65B0\u898F\uFF08longhand \u304C\u6709\u52B9: ${b}:${h??""}\uFF09${c.reset}`:`    ${c.green}\u2197 ${b}: shorthand \u4E0A\u66F8\u304D\u89E3\u6D88\uFF08\u65E7: ${u}:${R??""} \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: ${b}:${h??""} \u304C\u6709\u52B9\uFF09${c.reset}`)}}}}}await D(),process.exit(n||i||l?1:0)}tt().catch(async t=>{console.error(t.message||String(t));try{await D()}catch{}process.exit(1)});
