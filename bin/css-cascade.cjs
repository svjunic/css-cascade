#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v1.1.0
// Source: https://github.com/svjunic/css-cascade
var ve=require("node:fs"),we=require("node:util");var Q=require("node:fs"),ee=require("node:url"),te=require("playwright"),Ee={},Ce=`/**
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
`,V=null,D=null,z=null;async function ne(){return z||(z=(async()=>(V=await te.chromium.launch({headless:!0}),D=await(await V.newContext()).newPage(),await D.addScriptTag({content:Ce}),D))()),z}async function L(){V&&(await V.close(),V=null,D=null,z=null)}process.on("exit",()=>{V&&V.close()});async function oe(){await L(),process.exit(0)}process.once("SIGTERM",oe);process.once("SIGINT",oe);async function M(t,e={}){let o=await(await ne()).evaluate(async([r,n])=>[...(await globalThis.parseCss(r,n)).entries()],[t,e]);return new Map(o)}async function A(t,e={}){let o=await(await ne()).evaluate(async([r,n])=>[...(await globalThis.parseSelectorOrder(r,n)).entries()],[t,e]);return new Map(o)}function I(t){let e=new Map;for(let[a,o]of t){e.has(a)||e.set(a,new Map);let r=e.get(a),n=new Map;for(let{selector:s,prop:c,value:i,important:u,layerRank:d}of o){let l=d??(u?1:0);r.has(s)||(r.set(s,new Map),n.set(s,new Map));let g=r.get(s),f=n.get(s),b=f.get(c);(b===void 0||l>=b)&&(g.set(c,{value:i,important:u}),f.set(c,l))}}return e}function Oe(t){let e=t.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function K(t){let e=t.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g,(a,o,r,n)=>o==="-"?` - 0.${n}`:`${o}${r}0.${n}`),e=e.replace(/([%\)])-(\d)/g,"$1 - $2"),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,a=>Oe(a)),e}function N(t,e,a={}){let o=new Map,r=new Set([...t.keys(),...e.keys()]),n=["base",...[...r].filter(s=>s!=="base").sort()];for(let s of n){if(!r.has(s))continue;let c=t.get(s)||new Map,i=e.get(s)||new Map,u=new Set([...c.keys(),...i.keys()]),d=new Map,l=0;for(let f of[...u].sort()){let b=c.get(f)||new Map,y=i.get(f)||new Map,w=new Set([...b.keys(),...y.keys()]),k=new Map,p=0;for(let $ of[...w].sort()){let S=b.get($),m=y.get($),x;!S&&m?(x={status:"added",newValue:m.value,newImportant:m.important},p++):S&&!m?(x={status:"removed",oldValue:S.value,oldImportant:S.important},p++):(a.ignoreCosmetic?K(S.value)!==K(m.value):S.value!==m.value)||S.important!==m.important?(x={status:"changed",oldValue:S.value,oldImportant:S.important,newValue:m.value,newImportant:m.important},p++):x={status:"unchanged",value:m.value,important:m.important},k.set($,x)}let h;c.has(f)?i.has(f)?p>0?h="changed":h="unchanged":h="removed":h="added",d.set(f,{status:h,changeCount:p,props:k}),l+=p}let g;t.has(s)?e.has(s)?l>0?g="changed":g="unchanged":g="removed":g="added",o.set(s,{status:g,changeCount:l,selectors:d})}return o}function B([t,e,a],[o,r,n]){return t>o||t===o&&e>r||t===o&&e===r&&a>n}function q(t,e){return B(t,e)?1:B(e,t)?-1:0}function Re(t){let e=[],a=0,o=0,r=0,n=null;for(let c=0;c<t.length;c++){let i=t[c];n?i===n&&(n=null):i==='"'||i==="'"?n=i:i==="("?a++:i===")"?a>0&&a--:i==="["?o++:i==="]"?o>0&&o--:i===","&&a===0&&o===0&&(e.push(t.slice(r,c).trim()),r=c+1)}let s=t.slice(r).trim();return s&&e.push(s),e}function Me(t,e){let a=1,o=0,r=e,n=null;for(;r<t.length&&a>0;){let s=t[r];n?s===n&&(n=null):s==='"'||s==="'"?n=s:s==="["?o++:s==="]"?o>0&&o--:o===0&&s==="("?a++:o===0&&s===")"&&a--,r++}return a===0?r:null}function se(t,e,a){let o=e.global||e.sticky?e:new RegExp(e.source,e.flags+"g");o.lastIndex=0;let r="",n=0,s;for(;(s=o.exec(t))!==null;){let c=s.index+s[0].length,i=Me(t,c);if(r+=t.slice(n,s.index),i===null){r+=t.slice(c),n=t.length;break}a(t,c,i,s),n=i,o.lastIndex=n}return r+t.slice(n)}function j(t,e=0){if(e>100)return[0,0,0];let a=0,o=0,r=0,n=t.replace(/\\./g,"x"),s=i=>{let u=[0,0,0];for(let d of Re(i)){let l=j(d,e+1);B(l,u)&&(u=l)}a+=u[0],o+=u[1],r+=u[2]};n=se(n,/:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,(i,u,d,l)=>{let g=l.groups.name.toLowerCase(),f=i.slice(u,d-1).trim();if(g==="nth-child"||g==="nth-last-child"){let b=f.match(/\sof\b/i);b&&s(f.slice(b.index+b[0].length).trim()),o++}else g==="where"||(s(f),(g==="host"||g==="host-context")&&o++)}),n=se(n,/::(?:slotted|cue)\s*\(/gi,(i,u,d)=>{s(i.slice(u,d-1).trim()),r++}),n=n.replace(/::[\w-]+(\([^)]*\))?/g,()=>(r++,"")),n=n.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi,()=>(r++,"")),n=n.replace(/\[[^\]]*\]/g,()=>(o++,"")),n=n.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(o++,"")),n=n.replace(/#[\w-]+/g,()=>(a++,"")),n=n.replace(/\.[\w-]+/g,()=>(o++,"")),n=n.replace(/\|\|/g," ").replace(/[>+~]/g," "),n=n.replace(/(?:[\w-]+|\*)?\|/g,"");let c=n.split(/\s+/).filter(i=>i&&i!=="*"&&/^[a-zA-Z][\w-]*/.test(i));return r+=c.length,[a,o,r]}function F(t,e){let[a,o,r]=j(t),[n,s,c]=j(e);return a===n&&o===s&&r===c}function _e(t,e){let a=new Set(t),o=new Set(e),r=t.filter(d=>o.has(d)),n=e.filter(d=>a.has(d)),s=new Map;for(let d=0;d<r.length;d++)s.set(r[d],n[d]);let c=[],i=0,u=new Set;for(let d of t){if(!o.has(d)){c.push({type:"deleted",oldSelector:d,newSelector:null});continue}let l=s.get(d);for(;i<e.length&&!a.has(e[i]);)c.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;if(d===l)c.push({type:"equal",oldSelector:d,newSelector:l});else{let g=[d,l].sort().join("\0");u.has(g)||(u.add(g),c.push({type:"moved",oldSelector:d,newSelector:l}))}i++}for(;i<e.length;)a.has(e[i])||c.push({type:"added",oldSelector:null,newSelector:e[i]}),i++;return c}function U(t,e,a,o,r,n,s){return!a&&!o?null:a?o?a.important!==o.important?a.important?t:e:r!==0?r>0?t:e:n>s?t:e:t:e}function Pe(t,e,a,o,r){let n=t.oldSelector,s=t.newSelector;t.sameSpecificity=F(n,s),t.conflictingProps=[],t.hasOverlappingProps=!1;let c=e.indexOf(n),i=e.indexOf(s),u=a.indexOf(n),d=a.indexOf(s);if(c<0||i<0||u<0||d<0)return;let l=c<i,g=u<d;if(l===g)return;let f=q(j(n),j(s)),b=o.get(n)||new Map,y=o.get(s)||new Map,w=r.get(n)||new Map,k=r.get(s)||new Map;for(let[p,h]of w){let $=k.get(p);if(!$||(t.hasOverlappingProps=!0,h.value===$.value&&h.important===$.important))continue;let S=U(n,s,b.get(p),y.get(p),f,c,i),m=U(n,s,h,$,f,u,d);if(!m)continue;if(!S){let O=U(n,s,h,$,f,c,i);if(!O||O===m)continue;let _=r.get(O)?.get(p),P=r.get(m)?.get(p);if(!_||!P||_.value===P.value&&_.important===P.important)continue;t.conflictingProps.push({prop:p,oldEffective:null,newEffective:{value:P.value,important:P.important}});continue}let x=o.get(S)?.get(p),E=r.get(m)?.get(p);!x||!E||x.value===E.value&&x.important===E.important||t.conflictingProps.push({prop:p,oldEffective:{value:x.value,important:x.important},newEffective:{value:E.value,important:E.important}})}}async function X(t,e,a={},o=null){let r={semanticSelectors:a.semanticSelectors},n=o?.parseCss??M,s=o?.parseSelectorOrder??A,[c,i,u,d]=await Promise.all([s(t,r),s(e,r),n(t,r),n(e,r)]),l=I(u),g=I(d),f=new Set([...c.keys(),...i.keys()]),b=["base",...[...f].filter(w=>w!=="base").sort()],y=[];for(let w of b){if(!f.has(w))continue;let k=c.get(w)||[],p=i.get(w)||[],h=_e(k,p),$=l.get(w)||new Map,S=g.get(w)||new Map;for(let x of h)x.type==="moved"&&Pe(x,k,p,$,S);let m=h.some(x=>x.type==="moved"&&x.hasOverlappingProps);h.some(x=>x.type!=="equal")&&y.push({contextKey:w,rows:h,hasWarning:m})}return y}var Ve=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left","padding-inline-start","padding-inline-end","padding-block-start","padding-block-end","padding-inline","padding-block"]],["margin",["margin-top","margin-right","margin-bottom","margin-left","margin-inline-start","margin-inline-end","margin-block-start","margin-block-end","margin-inline","margin-block"]],["border",["border-top","border-right","border-bottom","border-left","border-width","border-style","border-color","border-top-width","border-top-style","border-top-color","border-right-width","border-right-style","border-right-color","border-bottom-width","border-bottom-style","border-bottom-color","border-left-width","border-left-style","border-left-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["border-inline",["border-inline-start","border-inline-end","border-inline-width","border-inline-style","border-inline-color"]],["border-block",["border-block-start","border-block-end","border-block-width","border-block-style","border-block-color"]],["background",["background-color","background-image","background-position","background-size","background-repeat","background-attachment","background-origin","background-clip"]],["font",["font-style","font-variant","font-weight","font-stretch","font-size","font-family","line-height"]],["flex",["flex-grow","flex-shrink","flex-basis"]],["flex-flow",["flex-direction","flex-wrap"]],["grid-column",["grid-column-start","grid-column-end"]],["grid-row",["grid-row-start","grid-row-end"]],["grid-template",["grid-template-rows","grid-template-columns","grid-template-areas"]],["transition",["transition-property","transition-duration","transition-timing-function","transition-delay"]],["animation",["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode","animation-play-state"]],["inset",["top","right","bottom","left","inset-inline-start","inset-inline-end","inset-block-start","inset-block-end","inset-inline","inset-block"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["overflow",["overflow-x","overflow-y"]],["text-decoration",["text-decoration-line","text-decoration-style","text-decoration-color","text-decoration-thickness"]],["outline",["outline-width","outline-style","outline-color"]],["list-style",["list-style-type","list-style-position","list-style-image"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["mask",["mask-image","mask-position","mask-size","mask-repeat","mask-origin","mask-clip","mask-mode","mask-composite"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]);function re(t){let e=new Map;for(let a=0;a<t.length;a++){let o=t[a];e.has(o.selector)||e.set(o.selector,[]),e.get(o.selector).push({...o,idx:a})}return e}function ae(t,e,a){let o=null,r=null;for(let n of t)n.prop===e?(!o||n.layerRank>o.layerRank||n.layerRank===o.layerRank&&n.idx>o.idx)&&(o=n):n.prop===a&&(!r||n.layerRank>r.layerRank||n.layerRank===r.layerRank&&n.idx>r.idx)&&(r=n);return!o&&!r?null:o?r?o.layerRank!==r.layerRank?o.layerRank>r.layerRank?"shorthand":"longhand":o.idx>r.idx?"shorthand":"longhand":"shorthand":"longhand"}function W(t,e){return t.reduce((a,o)=>o.prop!==e?a:!a||o.layerRank>a.layerRank||o.layerRank===a.layerRank&&o.idx>a.idx?o:a,null)}async function G(t,e,a={},o=null){let r={semanticSelectors:a.semanticSelectors},n=o?.parseCss??M,s=typeof t=="string"?await n(t,r):t,c=typeof e=="string"?await n(e,r):e,i=new Set([...s.keys(),...c.keys()]),u=["base",...[...i].filter(f=>f!=="base").sort()],d=[],l=!1;for(let f of u){if(!i.has(f))continue;let b=s.get(f)??[],y=c.get(f)??[],w=re(b),k=re(y);for(let[p,h]of k){let $=w.get(p)??[],S=[],m=new Set;for(let[x,E]of Ve){if(!h.some(R=>R.prop===x))continue;let _=W(h,x),P=W($,x);for(let R of E){if(!h.some(ke=>ke.prop===R)||m.has(R))continue;let Y=ae($,x,R),H=ae(h,x,R);if(Y===H)continue;let T;H==="shorthand"?(T="A",l=!0):T="B";let J=W(h,R),Z=W($,R);m.add(R),S.push({shorthand:x,longhand:R,oldWinner:Y,newWinner:H,direction:T,oldShorthandValue:P?.value??null,oldLonghandValue:Z?.value??null,longhandValue:J?.value??null,shorthandValue:_?.value??null,oldShorthandImportant:P?.important??!1,oldLonghandImportant:Z?.important??!1,shorthandImportant:_?.important??!1,longhandImportant:J?.important??!1})}}S.length>0&&d.push({contextKey:f,selector:p,conflicts:S})}}let g=new Map;for(let f of d)g.has(f.contextKey)||g.set(f.contextKey,{contextKey:f.contextKey,selectors:[]}),g.get(f.contextKey).selectors.push({selector:f.selector,conflicts:f.conflicts});return{hasWarning:l,risks:[...g.values()]}}var Ie=new Map([["padding",["padding-top","padding-right","padding-bottom","padding-left"]],["margin",["margin-top","margin-right","margin-bottom","margin-left"]],["inset",["top","right","bottom","left"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["scroll-margin",["scroll-margin-top","scroll-margin-right","scroll-margin-bottom","scroll-margin-left"]],["scroll-padding",["scroll-padding-top","scroll-padding-right","scroll-padding-bottom","scroll-padding-left"]]]),je=new Map([["overflow",["overflow-x","overflow-y"]],["gap",["row-gap","column-gap"]],["place-items",["align-items","justify-items"]],["place-content",["align-content","justify-content"]],["place-self",["align-self","justify-self"]],["padding-inline",["padding-inline-start","padding-inline-end"]],["padding-block",["padding-block-start","padding-block-end"]],["margin-inline",["margin-inline-start","margin-inline-end"]],["margin-block",["margin-block-start","margin-block-end"]],["inset-inline",["inset-inline-start","inset-inline-end"]],["inset-block",["inset-block-start","inset-block-end"]]]);function le(t,e,a){let o=Ie.get(t);if(o){let n=o.indexOf(e);if(n!==-1){let s=a.trim().split(/\s+/);return(s.length===1?[s[0],s[0],s[0],s[0]]:s.length===2?[s[0],s[1],s[0],s[1]]:s.length===3?[s[0],s[1],s[2],s[1]]:[s[0],s[1],s[2],s[3]])[n]}}let r=je.get(t);if(r){let n=r.indexOf(e);if(n!==-1){let s=a.trim().split(/\s+/);return s.length===1?s[0]:s[n]??s[0]}}return a}function ce(t,e){if(e?.risks?.length)for(let{contextKey:a,selectors:o}of e.risks){let r=t.get(a);if(r)for(let{selector:n,conflicts:s}of o){let c=r.selectors.get(n);if(!c)continue;let i=0;for(let{shorthand:u,longhand:d,oldWinner:l,newWinner:g,longhandValue:f,shorthandValue:b,oldShorthandValue:y,oldLonghandValue:w,oldShorthandImportant:k,oldLonghandImportant:p,shorthandImportant:h,longhandImportant:$}of s){let S=c.props.get(d);if(S&&S.status!=="unchanged")continue;let m=g==="longhand"?f:le(u,d,b??""),x=g==="longhand"?$:h;if(l===null)c.props.set(d,{status:"added",newValue:m,newImportant:x});else{let E=l==="longhand"?w:le(u,d,y??""),O=l==="longhand"?p:k;c.props.set(d,{status:"changed",oldValue:E,oldImportant:O,newValue:m,newImportant:x})}i++}i>0&&(c.changeCount+=i,c.status!=="added"&&c.status!=="removed"&&(c.status="changed"),r.changeCount+=i,r.status!=="added"&&r.status!=="removed"&&(r.status="changed"))}}}var ue=require("node:fs"),ge=require("node:url");function v(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ie(t,e){let{status:a}=e;function o(r){return r?' <span class="important">!important</span>':""}return a==="added"?`
      <div class="prop prop--added">
        <span class="prop-name">${v(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${v(e.newValue)}${o(e.newImportant)}</span>
        <span class="prop-badge badge--added">\u8FFD\u52A0</span>
      </div>`:a==="removed"?`
      <div class="prop prop--removed">
        <span class="prop-name">${v(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${v(e.oldValue)}${o(e.oldImportant)}</span>
        <span class="prop-badge badge--removed">\u524A\u9664</span>
      </div>`:a==="changed"?`
      <div class="prop prop--changed">
        <span class="prop-name">${v(t)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value prop-value--old">${v(e.oldValue)}${o(e.oldImportant)}</span>
        <span class="prop-arrow">\u2192</span>
        <span class="prop-value prop-value--new">${v(e.newValue)}${o(e.newImportant)}</span>
        <span class="prop-badge badge--changed">\u5909\u66F4</span>
      </div>`:`
    <div class="prop prop--unchanged">
      <span class="prop-name">${v(t)}</span>
      <span class="prop-colon">:</span>
      <span class="prop-value">${v(e.value)}${o(e.important)}</span>
    </div>`}function Le(t,e){let{props:a}=e,o=[],r=[];for(let[s,c]of a){let i=v(s);if(c.status==="unchanged"){let u=v(c.value)+(c.important?" !important":"");o.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(c.status==="added"){o.push('<div class="detail-line detail-line--empty"></div>');let u=v(c.newValue)+(c.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(c.status==="removed"){let u=v(c.oldValue)+(c.oldImportant?" !important":"");o.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),r.push('<div class="detail-line detail-line--empty"></div>')}else{let u=v(c.oldValue)+(c.oldImportant?" !important":""),d=v(c.newValue)+(c.newImportant?" !important":"");o.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${i}</span><span class="detail-colon">:</span> <span class="detail-val">${d}</span>;</div>`)}}let n=v(t);return`
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">\u65E7</div>
        <pre class="detail-block"><code>${n} {
${o.join(`
`)}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">\u65B0</div>
        <pre class="detail-block"><code>${n} {
${r.join(`
`)}}</code></pre>
      </div>
    </div>`}function Ae(t,e,{highlightHtml:a,showUnchanged:o=!1,contextKey:r="",expanded:n=!1}={}){let{status:s,changeCount:c,props:i}=e,u=a||v(t),d={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[s],l={added:`+${[...i.values()].filter(p=>p.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...i.values()].filter(p=>p.status==="removed").length} \u524A\u9664`,changed:(()=>{let p=[...i.values()].filter(m=>m.status==="added").length,h=[...i.values()].filter(m=>m.status==="removed").length,$=[...i.values()].filter(m=>m.status==="changed").length,S=[];return p&&S.push(`+${p}`),h&&S.push(`\u2212${h}`),$&&S.push(`~${$}`),S.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[s],g=[...i.entries()].filter(([,p])=>p.status!=="unchanged"),f=[...i.entries()].filter(([,p])=>p.status==="unchanged"),b=[...g.map(([p,h])=>ie(p,h)),...o?f.map(([p,h])=>ie(p,h)):[]].join(""),y=f.length>0&&!o?`<button class="unchanged-toggle" data-selector="${v(t)}">
           \u5909\u66F4\u306A\u3057 ${f.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",w=n?Le(t,e):"",k=n?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${s}" data-selector="${v(t)}" data-context="${v(r)}"${k}>
      <div class="selector-header" role="button" tabindex="0" title="\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u65E7\u306E\u5168\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A">
        <code class="selector-name">${u}</code>
        <span class="selector-badge ${d}">${l}</span>
        <span class="selector-expand-icon">${n?"\u25B2":"\u25BC"}</span>
      </div>
      <div class="props-list">
        ${b||'<div class="no-props">\u30D7\u30ED\u30D1\u30C6\u30A3\u306A\u3057</div>'}
        ${y}
      </div>
      ${w}
    </div>`}function De(t,e,a,{showUnchanged:o=!1,expandedSelectors:r=new Set}={}){let{status:n,changeCount:s}=e,i=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":v(t),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[n],d=s>0?`<span class="context-badge ${u}">${s} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',l=a?a.map(({selector:f,positions:b})=>({selector:f,positions:b,selDiff:e.selectors.get(f)})).filter(f=>f.selDiff):[...e.selectors.entries()].map(([f,b])=>({selector:f,positions:new Set,selDiff:b}));if(l.length===0)return"";let g=l.map(({selector:f,positions:b,selDiff:y})=>Ae(f,y,{highlightHtml:b.size>0?ze(f,b):null,showUnchanged:o,contextKey:t,expanded:r.has(`${t}||${f}`)})).join("");return`
    <section class="context-section context-section--${n}">
      <div class="context-header">
        <span class="context-label">${i}</span>
        ${d}
      </div>
      <div class="context-selectors">
        ${g}
      </div>
    </section>`}function ze(t,e){return[...t].map((a,o)=>{let r=v(a);return e.has(o)?`<mark class="fzf-match">${r}</mark>`:r}).join("")}function Ke(t){let e=v(t.prop),a=t.oldEffective?v(t.oldEffective.value)+(t.oldEffective.important?" !important":""):'<span class="or-prop-absent">\u65E7 CSS \u672A\u5BA3\u8A00</span>',o=t.newEffective?v(t.newEffective.value)+(t.newEffective.important?" !important":""):'<span class="or-prop-absent">\u65B0 CSS \u672A\u5BA3\u8A00</span>';return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${a}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${o}</span></span>`}function We(t){let e=v(t.oldSelector),a=v(t.newSelector),o=t.conflictingProps&&t.conflictingProps.length>0,r=t.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',n=o?`<div class="or-conflicts">${t.conflictingProps.map(Ke).join("")}</div>`:"";return`<tr class="${o?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${a}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${r}
      ${n}
    </td>
  </tr>`}function He(t){return t.type==="equal"?`<tr class="or-row or-row--equal">
      <td class="or-cell or-cell--old"><code>${v(t.oldSelector)}</code></td>
      <td class="or-cell or-cell--new"><code>${v(t.newSelector)}</code></td>
      <td class="or-cell or-cell--status"></td>
    </tr>`:t.type==="deleted"?`<tr class="or-row or-row--deleted">
      <td class="or-cell or-cell--old"><code>${v(t.oldSelector)}</code></td>
      <td class="or-cell or-cell--new or-cell--empty"></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--deleted">\u524A\u9664</span></td>
    </tr>`:t.type==="added"?`<tr class="or-row or-row--added">
      <td class="or-cell or-cell--old or-cell--empty"></td>
      <td class="or-cell or-cell--new"><code>${v(t.newSelector)}</code></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--added">\u8FFD\u52A0</span></td>
    </tr>`:""}function Te(t,e=!1){let{contextKey:a,rows:o,hasWarning:r}=t,n=a==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":v(a),s=o.filter(d=>d.type==="moved").length,c=s===0?'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>':r?`<span class="or-ctx-badge or-ctx-badge--warning">${s} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="or-ctx-badge or-ctx-badge--moved">${s} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`,i=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,u=o.map(d=>d.type==="moved"?We(d):He(d)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${v(a)}" aria-expanded="${e}" role="button" tabindex="0">
      ${i}
      <span class="or-context-label">${n}</span>
      ${c}
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
        <tbody>${u}</tbody>
      </table>
    </div>
  </div>`}function de(t,{activeContext:e="all",filterOrderRisk:a=!1,expandedContexts:o=new Set}={}){if(!t||t.length===0)return"";let r=a?t.filter(u=>u.hasWarning):t,n=e==="all"?r:r.filter(u=>u.contextKey===e);if(n.length===0)return"";let s=n.reduce((u,d)=>u+d.rows.filter(l=>l.type==="moved").length,0);if(s===0)return"";let c=n.some(u=>u.hasWarning),i=n.map(u=>Te(u,o.has(u.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${c?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${s} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:`<span class="order-risks-count order-risks-count--ok">${s} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4\uFF08\u30EA\u30B9\u30AF\u306A\u3057\uFF09</span>`}
    </div>
    ${i}
  </section>`}function pe(t){if(!t||!t.risks||t.risks.length===0)return"";let{risks:e,hasWarning:a}=t,o=e.reduce((n,s)=>n+s.selectors.reduce((c,i)=>c+i.conflicts.length,0),0);if(o===0)return"";let r=e.map(({contextKey:n,selectors:s})=>{let c=n==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":v(n),i=s.some(l=>l.conflicts.some(g=>g.direction==="A")),u=s.map(({selector:l,conflicts:g})=>{let f=g.map(({shorthand:b,longhand:y,direction:w,oldWinner:k,longhandValue:p,shorthandValue:h,oldShorthandValue:$})=>{let S=v(b),m=v(y),x=v(h??""),E=v($??""),O=v(p??"");return w==="A"?`<div class="sr-conflict sr-conflict--risk">
            <span class="sr-badge sr-badge--risk">\u26A0 \u30EA\u30B9\u30AF</span>
            <code class="sr-longhand">${m}</code>
            <span class="sr-desc">\u304C <code>${S}: ${x}</code> \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: longhand \u304C\u6709\u52B9 \u2192 \u65B0: shorthand \u304C\u4E0A\u66F8\u304D\uFF09</span>
          </div>`:k===null?`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u65B0\u898F</span>
            <code class="sr-longhand">${m}</code>
            <span class="sr-desc">\uFF08\u65B0\u898F\u8FFD\u52A0: <code>${m}: ${O}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`:`<div class="sr-conflict sr-conflict--resolved">
            <span class="sr-badge sr-badge--resolved">\u2197 \u89E3\u6D88</span>
            <code class="sr-longhand">${m}</code>
            <span class="sr-desc">\u306E shorthand \u4E0A\u66F8\u304D\u304C\u89E3\u6D88\uFF08\u65E7: <code>${S}: ${E}</code> \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: <code>${m}: ${O}</code> \u304C\u6709\u52B9\uFF09</span>
          </div>`}).join("");return`<div class="sr-selector">
        <code class="sr-selector-name">${v(l)}</code>
        <div class="sr-conflicts">${f}</div>
      </div>`}).join("");return`<div class="sr-context">
      <div class="sr-context-header">
        <span class="sr-context-label">${c}</span>
        ${i?'<span class="sr-ctx-badge sr-ctx-badge--warning">\u26A0 \u30EA\u30B9\u30AF\u3042\u308A</span>':'<span class="sr-ctx-badge sr-ctx-badge--ok">\u5909\u66F4\u306E\u307F</span>'}
      </div>
      <div class="sr-selectors">${u}</div>
    </div>`}).join("");return`<section class="shorthand-risks-section">
    <div class="shorthand-risks-header">
      <span class="shorthand-risks-title">Shorthand/Longhand \u7AF6\u5408</span>
      ${a?`<span class="shorthand-risks-count shorthand-risks-count--warning">\u26A0 ${o} \u4EF6\u306E\u7AF6\u5408\uFF08\u30EA\u30B9\u30AF\u3042\u308A\uFF09</span>`:`<span class="shorthand-risks-count shorthand-risks-count--ok">${o} \u4EF6\u306E\u7AF6\u5408\uFF08\u5909\u66F4\u306E\u307F\uFF09</span>`}
    </div>
    ${r}
  </section>`}function fe(t,e,{activeContext:a="all",showUnchanged:o=!1,expandedSelectors:r=new Set}={}){if(!t||t.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let n=null;if(e!==null){n=new Map;for(let c of e)n.has(c.contextKey)||n.set(c.contextKey,[]),n.get(c.contextKey).push({selector:c.selector,positions:c.positions||new Set})}let s="";for(let[c,i]of t){if(a!=="all"&&c!==a)continue;let u=n?n.get(c)||[]:null;n&&u.length===0||(s+=De(c,i,u,{showUnchanged:o,expandedSelectors:r}))}return s||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var Fe={};function Ne(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`}var Be=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,qe=`
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
`;function he(t,e,a){let o=Ne(),r=[],n=new Set;for(let[l,g]of t)for(let[f,b]of g.selectors)b.status!=="unchanged"&&(r.push({contextKey:l,selector:f,positions:new Set}),n.add(`${l}||${f}`));let s=r.length>0,c=e&&e.length>0,i=a&&a.risks&&a.risks.length>0,u=e?new Set(e.map(l=>l.contextKey)):new Set,d="";return s&&(d+=`<div class="diff-section">${fe(t,r,{expandedSelectors:n})}</div>`),c&&(d+=de(e,{expandedContexts:u})),i&&(d+=pe(a)),!s&&!c&&!i&&(d='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${o}</style>
  <style>${Be}</style>
</head>
<body>
  <div id="app">${d}</div>
  ${qe}
</body>
</html>`}var $e=`Usage: css-cascade <old.css> <new.css> [options]

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
  2  \u30A8\u30E9\u30FC`,xe;try{xe=(0,we.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"shorthand-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(t){console.error(`Error: ${t.message}`),process.exit(2)}var{values:C,positionals:ye}=xe;C.version&&(console.log("1.1.0"),process.exit(0));C.help&&(console.log($e),process.exit(0));ye.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error($e),process.exit(2));var Ue=new Set(["text","json","html"]);Ue.has(C.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var Xe=new Set(["changed","added","removed","unchanged","all"]);Xe.has(C.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function Se(t){try{return(0,ve.readFileSync)(t,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${t}": ${e.message}`),process.exit(2)}}var[Ge,Ye]=ye,me=Se(Ge),be=Se(Ye);async function Je(){let t,e=[],a={hasWarning:!1,risks:[]};try{let d={semanticSelectors:C["semantic-selectors"]},[l,g]=await Promise.all([M(me,d),M(be,d)]);t=N(I(l),I(g),{ignoreCosmetic:C["ignore-cosmetic"]}),C["order-risk"]&&(e=await X(me,be,{semanticSelectors:C["semantic-selectors"]},{parseCss:M,parseSelectorOrder:A})),C["shorthand-risk"]&&(a=await G(l,g,{semanticSelectors:C["semantic-selectors"]}),ce(t,a))}catch(d){await L().catch(()=>{}),console.error(`Parse error: ${d.message}`),process.exit(2)}function o(d,l){return l==="all"?!0:l==="changed"?d!=="unchanged":d===l}function r(d){let l=0,g=0,f=0,b=0;for(let[,y]of d)for(let[,w]of y.selectors)for(let[,k]of w.props)k.status==="changed"?l++:k.status==="added"?g++:k.status==="removed"?f++:b++;return{changed:l,added:g,removed:f,unchanged:b}}let n=r(t),s=n.changed>0||n.added>0||n.removed>0,c=C["order-risk"]&&e.some(d=>d.hasWarning),i=C["shorthand-risk"]&&a.hasWarning,u=C.filter;if(C.format==="html"){let d=he(t,C["order-risk"]?e:null,C["shorthand-risk"]?a:null);process.stdout.write(d),await L(),process.exit(s||c||i?1:0)}if(C.format==="json"){let d=[];for(let[g,f]of t){let b=[];for(let[y,w]of f.selectors){let k=[];for(let[p,h]of w.props)o(h.status,u)&&k.push({prop:p,...h});k.length>0&&b.push({selector:y,status:w.status,changeCount:w.changeCount,props:k})}b.length>0&&d.push({key:g,status:f.status,changeCount:f.changeCount,selectors:b})}let l={version:1,summary:n,contexts:d};C["order-risk"]&&(l.orderRisks=e),C["shorthand-risk"]&&(l.shorthandRisks=a),console.log(JSON.stringify(l,null,2))}else{let d=!C["no-color"]&&!!process.stdout.isTTY,l={reset:d?"\x1B[0m":"",yellow:d?"\x1B[33m":"",green:d?"\x1B[32m":"",red:d?"\x1B[31m":"",cyan:d?"\x1B[36m":"",dim:d?"\x1B[2m":""};for(let[f,b]of t){let y=[];for(let[w,k]of b.selectors){let p=[];for(let[h,$]of k.props)o($.status,u)&&($.status==="changed"?p.push(`    ${l.yellow}~${l.reset} ${h}: ${$.oldValue} \u2192 ${$.newValue}`):$.status==="added"?p.push(`    ${l.green}+${l.reset} ${h}: ${$.newValue}`):$.status==="removed"?p.push(`    ${l.red}-${l.reset} ${h}: ${$.oldValue}`):p.push(`      ${h}: ${$.value}`));p.length>0&&(y.push(`  ${l.dim}${w}${l.reset}`),y.push(...p))}y.length>0&&(console.log(`
${l.cyan}[${f}]${l.reset}`),y.forEach(w=>console.log(w)))}let g=[];if(n.changed&&g.push(`${l.yellow}${n.changed} changed${l.reset}`),n.added&&g.push(`${l.green}${n.added} added${l.reset}`),n.removed&&g.push(`${l.red}${n.removed} removed${l.reset}`),(u==="all"||u==="unchanged")&&n.unchanged&&g.push(`${n.unchanged} unchanged`),console.log(`
Summary: ${g.length?g.join(", "):"no differences"}`),C["order-risk"]&&e.length>0){console.log(`
Order Risks:`);for(let{contextKey:f,rows:b}of e){let y=b.filter(p=>p.type!=="equal");if(y.length===0)continue;let w=Math.max(6,...y.map(p=>(p.oldSelector??"-").length)),k=Math.max(6,...y.map(p=>(p.newSelector??"-").length));console.log(`
${l.cyan}[${f}]${l.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(w)}  ${"\u65B0 CSS".padEnd(k)}  \u72B6\u614B`),console.log(`  ${"-".repeat(w)}  ${"-".repeat(k)}  ------`);for(let p of y){let h=(p.oldSelector??"-").padEnd(w),$=(p.newSelector??"-").padEnd(k);if(p.type==="moved"){let S=p.sameSpecificity?` ${l.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${l.reset}`:"";if(console.log(`  ${h}  ${$}  ${l.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${l.reset}${S}`),p.conflictingProps&&p.conflictingProps.length>0)for(let m of p.conflictingProps){let x=_=>_?.important?" !important":"",E=m.oldEffective?`${m.oldEffective.value}${x(m.oldEffective)}`:"\u65E7 CSS \u672A\u5BA3\u8A00",O=m.newEffective?`${m.newEffective.value}${x(m.newEffective)}`:"\u65B0 CSS \u672A\u5BA3\u8A00";console.log(`    ${l.dim}${m.prop}: ${E} \u2192 ${O}${l.reset}`)}}else p.type==="deleted"?console.log(`  ${h}  ${"-".padEnd(k)}  ${l.red}- \u524A\u9664${l.reset}`):p.type==="added"&&console.log(`  ${"-".padEnd(w)}  ${$}  ${l.green}+ \u8FFD\u52A0${l.reset}`)}}}if(C["shorthand-risk"]&&a.risks.length>0){console.log(`
Shorthand Risks:`);for(let{contextKey:f,selectors:b}of a.risks){console.log(`
${l.cyan}[${f}]${l.reset}`);for(let{selector:y,conflicts:w}of b){console.log(`  ${l.dim}${y}${l.reset}`);for(let k of w){let{shorthand:p,longhand:h,direction:$,oldWinner:S,longhandValue:m,shorthandValue:x,oldLonghandValue:E,oldShorthandValue:O}=k;console.log($==="A"?`    ${l.yellow}\u26A0 ${h}: shorthand \u306B\u4E0A\u66F8\u304D\u3055\u308C\u305F\uFF08\u65E7: ${h}:${E??""} \u304C\u6709\u52B9 \u2192 \u65B0: ${p}:${x??""} \u306B\u4E0A\u66F8\u304D\uFF09${l.reset}`:S===null?`    ${l.green}\u2197 ${h}: \u65B0\u898F\uFF08longhand \u304C\u6709\u52B9: ${h}:${m??""}\uFF09${l.reset}`:`    ${l.green}\u2197 ${h}: shorthand \u4E0A\u66F8\u304D\u89E3\u6D88\uFF08\u65E7: ${p}:${O??""} \u306B\u4E0A\u66F8\u304D \u2192 \u65B0: ${h}:${m??""} \u304C\u6709\u52B9\uFF09${l.reset}`)}}}}}await L(),process.exit(s||c||i?1:0)}Je();
