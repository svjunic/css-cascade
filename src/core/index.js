import { parseCss } from './parse.js'
import { resolve } from './resolve.js'
import { diff } from './diff.js'

// box-4 shorthand の物理的 longhand: [top, right, bottom, left] 順
const BOX4_MAP = new Map([
  ['padding',        ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']],
  ['margin',         ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']],
  ['inset',          ['top', 'right', 'bottom', 'left']],
  ['border-width',   ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']],
  ['border-style',   ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style']],
  ['border-color',   ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']],
  ['border-radius',  ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius']],
  ['scroll-margin',  ['scroll-margin-top', 'scroll-margin-right', 'scroll-margin-bottom', 'scroll-margin-left']],
  ['scroll-padding', ['scroll-padding-top', 'scroll-padding-right', 'scroll-padding-bottom', 'scroll-padding-left']],
])

// 2値 shorthand の longhand: [first, second] 順
const BOX2_MAP = new Map([
  ['overflow',      ['overflow-x', 'overflow-y']],
  ['gap',           ['row-gap', 'column-gap']],
  ['place-items',   ['align-items', 'justify-items']],
  ['place-content', ['align-content', 'justify-content']],
  ['place-self',    ['align-self', 'justify-self']],
])

// マルチ値 shorthand の値を longhand 用のコンポーネント値に展開する。
// box-4: 1値→全同, 2値→[a,b,a,b], 3値→[a,b,c,b], 4値→[a,b,c,d]
// box-2: 1値→全同, 2値→[a,b]
// 不明な shorthand はフォールバックで value をそのまま返す。
function resolveShorthandComponent(shorthand, longhand, value) {
  const box4 = BOX4_MAP.get(shorthand)
  if (box4) {
    const idx = box4.indexOf(longhand)
    if (idx !== -1) {
      const p = value.trim().split(/\s+/)
      const expanded =
        p.length === 1 ? [p[0], p[0], p[0], p[0]] :
        p.length === 2 ? [p[0], p[1], p[0], p[1]] :
        p.length === 3 ? [p[0], p[1], p[2], p[1]] :
                         [p[0], p[1], p[2], p[3]]
      return expanded[idx]
    }
  }
  const box2 = BOX2_MAP.get(shorthand)
  if (box2) {
    const idx = box2.indexOf(longhand)
    if (idx !== -1) {
      const p = value.trim().split(/\s+/)
      return p.length === 1 ? p[0] : (p[idx] ?? p[0])
    }
  }
  return value
}

export { parseCss }
export { parseSelectorOrder } from './parse.js'
export { resolve }
export { diff }
export {
  normalizeSelector,
  normalizeMediaCondition,
  normalizeValue,
  canonicalizeValue,
  canonicalizeSelector,
} from './normalize.js'
export { computeSpecificity, sameSpecificity, compareSpecificity } from './specificity.js'
export { computeOrderRisks } from './order-risk.js'
export { computeShorthandRisks } from './shorthand-risk.js'

/**
 * shorthand/longhand の勝者が変化した longhand を diff 結果で 'changed' に昇格させる。
 * resolve.js が宣言値ベースで比較するため検出できない実効値変化を補完する。
 */
export function applyShorthandRisksToDiff(diffResult, shorthandRisks) {
  if (!shorthandRisks?.risks?.length) return

  for (const { contextKey, selectors } of shorthandRisks.risks) {
    const ctx = diffResult.get(contextKey)
    if (!ctx) continue

    for (const { selector, conflicts } of selectors) {
      const sel = ctx.selectors.get(selector)
      if (!sel) continue

      let addedChanges = 0
      for (const {
        shorthand, longhand, oldWinner, newWinner,
        longhandValue, shorthandValue,
        oldShorthandValue, oldLonghandValue,
        oldShorthandImportant, oldLonghandImportant,
        shorthandImportant, longhandImportant,
      } of conflicts) {
        const oldEffective = oldWinner === 'longhand' ? oldLonghandValue : resolveShorthandComponent(shorthand, longhand, oldShorthandValue ?? '')
        const newEffective = newWinner === 'longhand' ? longhandValue    : resolveShorthandComponent(shorthand, longhand, shorthandValue ?? '')

        const propEntry = sel.props.get(longhand)
        if (!propEntry || propEntry.status !== 'unchanged') continue

        const oldImportant = oldWinner === 'longhand' ? oldLonghandImportant : oldShorthandImportant
        const newImportant = newWinner === 'longhand' ? longhandImportant    : shorthandImportant
        sel.props.set(longhand, {
          status: 'changed',
          oldValue: oldEffective,
          oldImportant,
          newValue: newEffective,
          newImportant,
        })
        addedChanges++
      }

      if (addedChanges > 0) {
        sel.changeCount += addedChanges
        if (sel.status !== 'added' && sel.status !== 'removed') sel.status = 'changed'
        ctx.changeCount += addedChanges
        if (ctx.status !== 'added' && ctx.status !== 'removed') ctx.status = 'changed'
      }
    }
  }
}

/**
 * CSS テキスト2つを受け取り、構造的差分を返す高レベル API。
 * @param {string} oldCss
 * @param {string} newCss
 * @param {{ ignoreCosmetic?: boolean, semanticSelectors?: boolean }} [options]
 * @returns {Map}
 */
export function diffCss(oldCss, newCss, options = {}) {
  return diff(
    resolve(parseCss(oldCss, { semanticSelectors: options.semanticSelectors })),
    resolve(parseCss(newCss, { semanticSelectors: options.semanticSelectors })),
    { ignoreCosmetic: options.ignoreCosmetic },
  )
}
