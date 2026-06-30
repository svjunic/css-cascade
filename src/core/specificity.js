/**
 * specificity.js
 * CSS セレクタの詳細度 (specificity) を計算するユーティリティ。
 *
 * 返り値: [a, b, c]
 *   a = ID セレクタ (#id) の数
 *   b = クラス (.class)、属性 ([attr])、擬似クラス (:hover) の数
 *   c = 要素名 (div)、擬似要素 (::before) の数
 */

/**
 * セレクタの詳細度を [a, b, c] タプルで返す。
 * ネストした :not() 等の内側の詳細度は簡略化して扱う。
 * @param {string} selector
 * @returns {[number, number, number]}
 */
function splitTopLevelCommas(str) {
  const parts = []
  let depth = 0, start = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') depth++
    else if (str[i] === ')') depth--
    else if (str[i] === ',' && depth === 0) {
      parts.push(str.slice(start, i).trim())
      start = i + 1
    }
  }
  const last = str.slice(start).trim()
  if (last) parts.push(last)
  return parts
}

export function computeSpecificity(selector) {
  let s = selector
  let a = 0, b = 0, c = 0

  // 擬似要素 ::xxx を除去してカウント
  s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return '' })

  // 属性セレクタ [...] を除去してカウント
  s = s.replace(/\[[^\]]*\]/g, () => { b++; return '' })

  // :not() は引数の詳細度を引き継ぐ（CSS Selectors Level 3/4）。:not() 自体は b++ しない
  // CSS Selectors Level 4: カンマ区切りの引数リストは最大詳細度を採用する
  // ネストした括弧 (:not(:nth-child(2n)) 等) に対応するため (?:[^()]*|\([^)]*\))* を使う
  s = s.replace(/:not\(\s*((?:[^()]*|\([^)]*\))*)\s*\)/gi, (_, inner) => {
    // トップレベルのカンマのみで分割（括弧内のカンマは無視）
    const args = splitTopLevelCommas(inner)
    let maxA = 0, maxB = 0, maxC = 0
    for (const arg of args) {
      const [ia, ib, ic] = computeSpecificity(arg)
      if (ia > maxA || (ia === maxA && ib > maxB) || (ia === maxA && ib === maxB && ic > maxC)) {
        maxA = ia; maxB = ib; maxC = ic
      }
    }
    a += maxA; b += maxB; c += maxC
    return ''
  })

  // 擬似クラス :xxx を除去してカウント（関数形式も含む）
  s = s.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g, () => { b++; return '' })

  // ID セレクタ #xxx を除去してカウント
  s = s.replace(/#[\w-]+/g, () => { a++; return '' })

  // クラスセレクタ .xxx を除去してカウント
  s = s.replace(/\.[\w-]+/g, () => { b++; return '' })

  // コンビネータを除去
  s = s.replace(/[>+~]/g, ' ')

  // 残った要素名（* を除く）をカウント
  const elements = s.split(/\s+/).filter(t => t && t !== '*' && /^[a-zA-Z][\w-]*/.test(t))
  c += elements.length

  return [a, b, c]
}

/**
 * 2 つのセレクタが同じ詳細度かどうかを返す。
 * @param {string} sA
 * @param {string} sB
 * @returns {boolean}
 */
export function sameSpecificity(sA, sB) {
  const [a1, b1, c1] = computeSpecificity(sA)
  const [a2, b2, c2] = computeSpecificity(sB)
  return a1 === a2 && b1 === b2 && c1 === c2
}
