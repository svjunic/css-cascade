import { parseCss } from './parse.js'
import { resolve } from './resolve.js'
import { diff } from './diff.js'

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
      for (const { longhand, oldWinner, newWinner, longhandValue, shorthandValue } of conflicts) {
        if (oldWinner === newWinner) continue
        const oldEffective = oldWinner === 'longhand' ? longhandValue : shorthandValue
        const newEffective = newWinner === 'longhand' ? longhandValue : shorthandValue
        if (oldEffective === newEffective) continue

        const propEntry = sel.props.get(longhand)
        if (!propEntry || propEntry.status !== 'unchanged') continue

        sel.props.set(longhand, {
          status: 'changed',
          oldValue: oldEffective,
          oldImportant: propEntry.important,
          newValue: newEffective,
          newImportant: propEntry.important,
        })
        addedChanges++
      }

      if (addedChanges > 0) {
        sel.changeCount += addedChanges
        sel.status = 'changed'
        ctx.changeCount += addedChanges
        ctx.status = 'changed'
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
