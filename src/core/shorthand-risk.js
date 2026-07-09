import { parseCss } from './parse.js'

const SHORTHAND_MAP = new Map([
  ['padding',         ['padding-top', 'padding-right', 'padding-bottom', 'padding-left',
                       'padding-inline-start', 'padding-inline-end',
                       'padding-block-start', 'padding-block-end',
                       'padding-inline', 'padding-block']],
  ['margin',          ['margin-top', 'margin-right', 'margin-bottom', 'margin-left',
                       'margin-inline-start', 'margin-inline-end',
                       'margin-block-start', 'margin-block-end',
                       'margin-inline', 'margin-block']],
  ['border',          ['border-top', 'border-right', 'border-bottom', 'border-left',
                       'border-width', 'border-style', 'border-color',
                       'border-top-width', 'border-top-style', 'border-top-color',
                       'border-right-width', 'border-right-style', 'border-right-color',
                       'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
                       'border-left-width', 'border-left-style', 'border-left-color']],
  ['border-top',      ['border-top-width', 'border-top-style', 'border-top-color']],
  ['border-right',    ['border-right-width', 'border-right-style', 'border-right-color']],
  ['border-bottom',   ['border-bottom-width', 'border-bottom-style', 'border-bottom-color']],
  ['border-left',     ['border-left-width', 'border-left-style', 'border-left-color']],
  ['border-width',    ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']],
  ['border-style',    ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style']],
  ['border-color',    ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']],
  ['border-radius',   ['border-top-left-radius', 'border-top-right-radius',
                       'border-bottom-right-radius', 'border-bottom-left-radius']],
  ['border-inline',   ['border-inline-start', 'border-inline-end',
                       'border-inline-width', 'border-inline-style', 'border-inline-color']],
  ['border-block',    ['border-block-start', 'border-block-end',
                       'border-block-width', 'border-block-style', 'border-block-color']],
  ['background',      ['background-color', 'background-image', 'background-position',
                       'background-size', 'background-repeat', 'background-attachment',
                       'background-origin', 'background-clip']],
  ['font',            ['font-style', 'font-variant', 'font-weight', 'font-stretch',
                       'font-size', 'font-family', 'line-height']],
  ['flex',            ['flex-grow', 'flex-shrink', 'flex-basis']],
  ['flex-flow',       ['flex-direction', 'flex-wrap']],
  ['grid-column',     ['grid-column-start', 'grid-column-end']],
  ['grid-row',        ['grid-row-start', 'grid-row-end']],
  ['grid-template',   ['grid-template-rows', 'grid-template-columns', 'grid-template-areas']],
  ['transition',      ['transition-property', 'transition-duration',
                       'transition-timing-function', 'transition-delay']],
  ['animation',       ['animation-name', 'animation-duration', 'animation-timing-function',
                       'animation-delay', 'animation-iteration-count', 'animation-direction',
                       'animation-fill-mode', 'animation-play-state']],
  ['inset',           ['top', 'right', 'bottom', 'left',
                       'inset-inline-start', 'inset-inline-end',
                       'inset-block-start', 'inset-block-end',
                       'inset-inline', 'inset-block']],
  ['inset-inline',    ['inset-inline-start', 'inset-inline-end']],
  ['inset-block',     ['inset-block-start', 'inset-block-end']],
  ['padding-inline',  ['padding-inline-start', 'padding-inline-end']],
  ['padding-block',   ['padding-block-start', 'padding-block-end']],
  ['margin-inline',   ['margin-inline-start', 'margin-inline-end']],
  ['margin-block',    ['margin-block-start', 'margin-block-end']],
  ['overflow',        ['overflow-x', 'overflow-y']],
  ['text-decoration', ['text-decoration-line', 'text-decoration-style',
                       'text-decoration-color', 'text-decoration-thickness']],
  ['outline',         ['outline-width', 'outline-style', 'outline-color']],
  ['list-style',      ['list-style-type', 'list-style-position', 'list-style-image']],
  ['gap',             ['row-gap', 'column-gap']],
  ['place-items',     ['align-items', 'justify-items']],
  ['place-content',   ['align-content', 'justify-content']],
  ['place-self',      ['align-self', 'justify-self']],
  ['mask',            ['mask-image', 'mask-position', 'mask-size', 'mask-repeat',
                       'mask-origin', 'mask-clip', 'mask-mode', 'mask-composite']],
  ['scroll-margin',   ['scroll-margin-top', 'scroll-margin-right', 'scroll-margin-bottom', 'scroll-margin-left']],
  ['scroll-padding',  ['scroll-padding-top', 'scroll-padding-right', 'scroll-padding-bottom', 'scroll-padding-left']],
])

function groupBySelector(entries) {
  const map = new Map()
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i]
    if (!map.has(e.selector)) map.set(e.selector, [])
    map.get(e.selector).push({ ...e, idx: i })
  }
  return map
}

// layerRank 降順 → 同順なら idx（source order）降順で、shorthand/longhand どちらが後勝ちか返す。
// 返り値: 'shorthand' | 'longhand' | null (どちらも存在しない場合)
function getIntraWinner(decls, shorthand, longhand) {
  let bestShorthand = null
  let bestLonghand = null

  for (const d of decls) {
    if (d.prop === shorthand) {
      if (!bestShorthand || d.layerRank > bestShorthand.layerRank ||
          (d.layerRank === bestShorthand.layerRank && d.idx > bestShorthand.idx)) {
        bestShorthand = d
      }
    } else if (d.prop === longhand) {
      if (!bestLonghand || d.layerRank > bestLonghand.layerRank ||
          (d.layerRank === bestLonghand.layerRank && d.idx > bestLonghand.idx)) {
        bestLonghand = d
      }
    }
  }

  if (!bestShorthand && !bestLonghand) return null
  if (!bestShorthand) return 'longhand'
  if (!bestLonghand) return 'shorthand'

  if (bestShorthand.layerRank !== bestLonghand.layerRank) {
    return bestShorthand.layerRank > bestLonghand.layerRank ? 'shorthand' : 'longhand'
  }
  return bestShorthand.idx > bestLonghand.idx ? 'shorthand' : 'longhand'
}

export function computeShorthandRisks(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }
  const parsedOld = parseCss(oldCss, parseOpts)
  const parsedNew = parseCss(newCss, parseOpts)

  const allContexts = new Set([...parsedOld.keys(), ...parsedNew.keys()])
  const sortedContexts = ['base', ...[...allContexts].filter(k => k !== 'base').sort()]

  const risksBySelector = []
  let hasWarning = false

  for (const contextKey of sortedContexts) {
    if (!allContexts.has(contextKey)) continue

    const oldEntries = parsedOld.get(contextKey) ?? []
    const newEntries = parsedNew.get(contextKey) ?? []

    const oldBySel = groupBySelector(oldEntries)
    const newBySel = groupBySelector(newEntries)

    for (const [selector, newDecls] of newBySel) {
      const oldDecls = oldBySel.get(selector) ?? []
      const conflicts = []

      for (const [shorthand, longhands] of SHORTHAND_MAP) {
        const newHasShorthand = newDecls.some(d => d.prop === shorthand)
        if (!newHasShorthand) continue

        for (const longhand of longhands) {
          const newHasLonghand = newDecls.some(d => d.prop === longhand)
          if (!newHasLonghand) continue

          const oldWinner = getIntraWinner(oldDecls, shorthand, longhand)
          const newWinner = getIntraWinner(newDecls, shorthand, longhand)

          if (oldWinner === newWinner) continue

          let direction
          if (newWinner === 'shorthand') {
            direction = 'A'
            hasWarning = true
          } else {
            direction = 'B'
          }

          // 表示用の値: layerRank が最も高い宣言（同順なら最後の宣言）の value を使う
          const bestShorthandDecl = newDecls.reduce((best, d) => {
            if (d.prop !== shorthand) return best
            if (!best) return d
            if (d.layerRank > best.layerRank) return d
            if (d.layerRank === best.layerRank && d.idx > best.idx) return d
            return best
          }, null)
          const bestLonghandDecl = newDecls.reduce((best, d) => {
            if (d.prop !== longhand) return best
            if (!best) return d
            if (d.layerRank > best.layerRank) return d
            if (d.layerRank === best.layerRank && d.idx > best.idx) return d
            return best
          }, null)

          conflicts.push({
            shorthand,
            longhand,
            oldWinner,
            newWinner,
            direction,
            longhandValue: bestLonghandDecl?.value ?? null,
            shorthandValue: bestShorthandDecl?.value ?? null,
          })
        }
      }

      if (conflicts.length > 0) {
        risksBySelector.push({ contextKey, selector, conflicts })
      }
    }
  }

  const risksMap = new Map()
  for (const item of risksBySelector) {
    if (!risksMap.has(item.contextKey)) {
      risksMap.set(item.contextKey, { contextKey: item.contextKey, selectors: [] })
    }
    risksMap.get(item.contextKey).selectors.push({ selector: item.selector, conflicts: item.conflicts })
  }

  return {
    hasWarning,
    risks: [...risksMap.values()],
  }
}
