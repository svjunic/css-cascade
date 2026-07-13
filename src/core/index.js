import { parseCss } from './parse-cssom.js'
import { resolve } from './resolve.js'
import { diff } from './diff.js'

export { parseCss }
export { parseSelectorOrder } from './parse-cssom.js'
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
export { applyShorthandRisksToDiff } from './apply-risks.js'

/**
 * CSS テキスト2つを受け取り、構造的差分を返す高レベル API。
 * @param {string} oldCss
 * @param {string} newCss
 * @param {{ ignoreCosmetic?: boolean, semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map>}
 */
export async function diffCss(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }
  const [parsedOld, parsedNew] = await Promise.all([
    parseCss(oldCss, parseOpts),
    parseCss(newCss, parseOpts),
  ])
  return diff(
    resolve(parsedOld),
    resolve(parsedNew),
    { ignoreCosmetic: options.ignoreCosmetic },
  )
}
