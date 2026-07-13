import { parseCss, parseSelectorOrder, closeBrowser } from './parse-node.js'
import { resolve } from './resolve.js'
import { diff } from './diff.js'

export { parseCss, parseSelectorOrder, closeBrowser, resolve, diff }
export {
  normalizeSelector, normalizeMediaCondition, normalizeValue,
  canonicalizeValue, canonicalizeSelector,
} from './normalize.js'
export { computeSpecificity, sameSpecificity, compareSpecificity } from './specificity.js'
export { computeOrderRisks } from './order-risk.js'
export { computeShorthandRisks } from './shorthand-risk.js'
export { applyShorthandRisksToDiff } from './apply-risks.js'

export async function diffCss(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }
  const [parsedOld, parsedNew] = await Promise.all([
    parseCss(oldCss, parseOpts),
    parseCss(newCss, parseOpts),
  ])
  return diff(resolve(parsedOld), resolve(parsedNew), { ignoreCosmetic: options.ignoreCosmetic })
}
