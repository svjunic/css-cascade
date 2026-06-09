/**
 * fuzzy.js
 * fzf ライブラリのラッパー。
 * セレクタのライブ絞り込みとマッチ文字ハイライトを提供する。
 */

import { Fzf } from 'fzf'

/**
 * 検索インデックスを作成する。
 *
 * @template T
 * @param {T[]} items - 検索対象の配列
 * @param {(item: T) => string} selectorFn - 各アイテムから検索文字列を抽出する関数
 * @returns {Fzf<T[]>}
 */
export function createSearchIndex(items, selectorFn) {
  return new Fzf(items, {
    selector: selectorFn,
    limit: Infinity,
    fuzzy: 'v2',
  })
}

/**
 * クエリで検索し、マッチしたアイテムとそのハイライト位置を返す。
 *
 * @template T
 * @param {Fzf<T[]>} fzfInstance
 * @param {string} query
 * @returns {Array<{item: T, positions: ReadonlySet<number>}>}
 */
export function search(fzfInstance, query) {
  const results = fzfInstance.find(query)
  return results.map(r => ({ item: r.item, positions: r.positions }))
}

/**
 * テキストを HTML にエスケープしつつ、マッチ位置に <mark> タグを挿入する。
 *
 * @param {string} text
 * @param {ReadonlySet<number>} positions
 * @returns {string} HTML 文字列
 */
export function highlightText(text, positions) {
  if (!positions || positions.size === 0) return escapeHtml(text)

  return [...text]
    .map((char, i) => {
      const escaped = escapeHtml(char)
      return positions.has(i) ? `<mark class="fzf-match">${escaped}</mark>` : escaped
    })
    .join('')
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
