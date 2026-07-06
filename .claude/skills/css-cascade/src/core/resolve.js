/**
 * resolve.js
 * 中間モデルに「カスケードレイヤー + 後勝ち + !important」ルールを適用し、
 * セレクタごとの最終有効プロパティ集合を算出する。
 *
 * 入力: Map<contextKey, Array<{selector, prop, value, important, layerRank}>>
 * 出力: Map<contextKey, Map<selector, Map<prop, {value: string, important: boolean}>>>
 *
 * 勝者判定: 各 (context, selector, prop) について layerRank が最大の宣言が勝つ。
 *   layerRank が同順位の場合はソース順（後勝ち）で決着する。
 *   layerRank は parse.js が @layer と !important を織り込んで算出済み
 *   （レイヤーなし CSS では 通常=0 / !important=1 となり、従来の後勝ち + !important ガードと一致）。
 */

/**
 * @param {Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layerRank?: number}>>} parsed
 * @returns {Map<string, Map<string, Map<string, {value: string, important: boolean}>>>}
 */
export function resolve(parsed) {
  /** @type {Map<string, Map<string, Map<string, {value: string, important: boolean}>>>} */
  const result = new Map()

  for (const [contextKey, entries] of parsed) {
    if (!result.has(contextKey)) result.set(contextKey, new Map())
    const ctxMap = result.get(contextKey)

    // selector → Map<prop, layerRank>: 勝者判定用。出力には含めない。
    const rankMap = new Map()

    for (const { selector, prop, value, important, layerRank } of entries) {
      // layerRank 未設定の入力（防御的）は従来相当の 通常=0 / !important=1 にフォールバック
      const rank = layerRank ?? (important ? 1 : 0)

      if (!ctxMap.has(selector)) {
        ctxMap.set(selector, new Map())
        rankMap.set(selector, new Map())
      }
      const propMap = ctxMap.get(selector)
      const selRanks = rankMap.get(selector)

      const existingRank = selRanks.get(prop)
      // 初回、より強いレイヤー、または同順位（後勝ち）のとき上書きする
      if (existingRank === undefined || rank >= existingRank) {
        propMap.set(prop, { value, important })
        selRanks.set(prop, rank)
      }
    }
  }

  return result
}
