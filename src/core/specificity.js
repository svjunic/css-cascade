/**
 * specificity.js
 * CSS セレクタの詳細度 (specificity) を計算するユーティリティ。
 *
 * 返り値: [a, b, c]
 *   a = ID セレクタ (#id) の数
 *   b = クラス (.class)、属性 ([attr])、擬似クラス (:hover) の数
 *   c = 要素名 (div)、擬似要素 (::before) の数
 */

function isHigherSpec([a1, b1, c1], [a2, b2, c2]) {
  return a1 > a2 || (a1 === a2 && b1 > b2) || (a1 === a2 && b1 === b2 && c1 > c2)
}

/**
 * 2 つの詳細度タプルを比較する。
 * @param {[number, number, number]} specA
 * @param {[number, number, number]} specB
 * @returns {number}  specA > specB なら 1、specA < specB なら -1、等しければ 0
 */
export function compareSpecificity(specA, specB) {
  if (isHigherSpec(specA, specB)) return 1
  if (isHigherSpec(specB, specA)) return -1
  return 0
}

// トップレベル（括弧・角括弧・引用符の外側）のカンマでセレクタリストを分割する。
// 属性セレクタ [attr="a,b"] や :is(.a, .b) の内側のカンマでは分割しない。
// 呼び出し前に computeSpecificity がエスケープ（\x）を除去済みのため、引用符判定は単純比較でよい。
function splitTopLevelCommas(str) {
  const parts = []
  let parenDepth = 0, bracketDepth = 0, start = 0, quote = null
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (quote) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '(') {
      parenDepth++
    } else if (ch === ')') {
      if (parenDepth > 0) parenDepth-- // 不正な余分な ) で負にしない
    } else if (ch === '[') {
      bracketDepth++
    } else if (ch === ']') {
      if (bracketDepth > 0) bracketDepth--
    } else if (ch === ',' && parenDepth === 0 && bracketDepth === 0) {
      parts.push(str.slice(start, i).trim())
      start = i + 1
    }
  }
  const last = str.slice(start).trim()
  if (last) parts.push(last)
  return parts
}

// start（開き括弧の直後）に対応する閉じ括弧の「次」のインデックスを返す。
// 引用符内・属性セレクタ [...] 内の括弧は無視する（splitTopLevelCommas と対称）。括弧未閉なら null。
function findMatchingParen(s, start) {
  let depth = 1, bracketDepth = 0, i = start, quote = null
  while (i < s.length && depth > 0) {
    const ch = s[i]
    if (quote) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '[') {
      bracketDepth++
    } else if (ch === ']') {
      if (bracketDepth > 0) bracketDepth--
    } else if (bracketDepth === 0 && ch === '(') {
      depth++
    } else if (bracketDepth === 0 && ch === ')') {
      depth--
    }
    i++
  }
  return depth === 0 ? i : null
}

// 正規表現で擬似クラスブロックをスキャンし、onMatch を呼んだ後にブロックを除去した文字列を返す。
function stripPseudoBlocks(s, regex, onMatch) {
  // lastIndex ベースで走査するため g/y フラグが必須。無ければ g を付けた複製を使う
  // （複製なら lastIndex 書き換えが呼び出し側の正規表現に影響しない）。
  const re = regex.global || regex.sticky ? regex : new RegExp(regex.source, regex.flags + 'g')
  re.lastIndex = 0
  let kept = '', pos = 0, m
  while ((m = re.exec(s)) !== null) {
    const innerStart = m.index + m[0].length
    const end = findMatchingParen(s, innerStart)
    kept += s.slice(pos, m.index)
    if (end === null) {
      // 括弧未閉: ":name(" プレフィックスだけ捨て、中身は raw のまま残す。
      // 後段の汎用パスが :is/:not 等を余計な擬似クラスとして二重カウントするのを防ぎつつ、
      // 内側セレクタの詳細度は取りこぼさない（過少・過剰いずれも回避）。
      kept += s.slice(innerStart)
      pos = s.length
      break
    }
    onMatch(s, innerStart, end, m)
    pos = end
    re.lastIndex = pos
  }
  return kept + s.slice(pos)
}

/**
 * セレクタの詳細度を [a, b, c] タプルで返す。
 * ネストした :not() 等の内側の詳細度は簡略化して扱う。
 * @param {string} selector
 * @param {number} [_depth=0]
 * @returns {[number, number, number]}
 */
export function computeSpecificity(selector, _depth = 0) {
  if (_depth > 100) return [0, 0, 0]
  let a = 0, b = 0, c = 0

  // CSS エスケープ（\: \. \[ など）を 1 文字の識別子文字へ無害化する。以降のカウント用
  // 正規表現・括弧/引用符走査はエスケープ非対応でよくなる（例: .md\:flex を 1 クラスとして数える）。
  let s = selector.replace(/\\./g, 'x')

  // 引数セレクタリスト（トップレベルのカンマ区切り）の MAX 詳細度を a/b/c に加算する。
  const addArgMaxSpec = (argList) => {
    let maxSpec = [0, 0, 0]
    for (const arg of splitTopLevelCommas(argList)) {
      const spec = computeSpecificity(arg, _depth + 1)
      if (isHigherSpec(spec, maxSpec)) maxSpec = spec
    }
    a += maxSpec[0]; b += maxSpec[1]; c += maxSpec[2]
  }

  // 引数付き擬似要素 ::slotted()・::cue() は擬似要素自体 (c) に加え、引数セレクタの詳細度を加算する。
  // 通常の ::xxx ストリップより先に処理し、引数を取りこぼさない。
  s = stripPseudoBlocks(s, /::(?:slotted|cue)\s*\(/gi, (str, innerStart, end) => {
    addArgMaxSpec(str.slice(innerStart, end - 1).trim())
    c++ // 擬似要素自体
  })

  // 擬似要素 ::xxx を除去してカウント（引数付きは上で処理済み）
  s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return '' })

  // レガシー単一コロン擬似要素 :before/:after/:first-line/:first-letter は擬似要素 (c) として数える。
  // 後段の汎用擬似クラスパス（b++）より先に処理する（:: 形式と詳細度を一致させる）。
  s = s.replace(/:(?:before|after|first-line|first-letter)(?![\w-])/gi, () => { c++; return '' })

  // 関数形式の擬似クラスを 1 パスで処理する。左から順に最も外側のブロックだけを扱い、
  // その中身の詳細度は再帰 (computeSpecificity) に委ねる。1 パスにすることで
  // :is(:nth-child(2n), .b) のように入れ子になった :nth-child が、外側パスと
  // 再帰の両方で二重加算されるのを防ぐ（外側パスはブロックを丸ごとスキップするため
  // 中身の :nth-child を再走査しない）。
  //   - :nth-child / :nth-last-child … 擬似クラス自体を b++ し、"of S" があれば S の MAX 詳細度を加算
  //   - :not / :is / :has / :matches … 引数の MAX 詳細度のみ引き継ぐ（CSS Selectors Level 4）
  //   - :host / :host-context        … 引数の MAX 詳細度 ＋ 擬似クラス自体 b++（CSS Scoping Level 1）
  //   - :where                       … 常に詳細度 0（何も加算しない）
  // 括弧の深さは findMatchingParen が手動追跡するため任意の深さのネストに対応する。
  s = stripPseudoBlocks(
    s,
    /:(?<name>nth-child|nth-last-child|not|is|has|matches|where|host-context|host)\s*\(/gi,
    (str, innerStart, end, m) => {
      const name = m.groups.name.toLowerCase()
      const inner = str.slice(innerStart, end - 1).trim()
      if (name === 'nth-child' || name === 'nth-last-child') {
        // "of" は An+B と S を区切る空白区切りのキーワード。\bof\b だと .foo-of-bar 等の
        // クラス名内の of を誤検出するため、直前の空白を必須にする（S の先頭側は境界で判定）。
        const ofMatch = inner.match(/\sof\b/i)
        if (ofMatch) addArgMaxSpec(inner.slice(ofMatch.index + ofMatch[0].length).trim())
        b++ // :nth-child() 自体は擬似クラス
      } else if (name === 'where') {
        // 何も加算しない
      } else {
        addArgMaxSpec(inner)
        if (name === 'host' || name === 'host-context') b++ // :host()/:host-context() 自体は擬似クラス
      }
    }
  )

  // 属性セレクタ [...] を除去してカウント。
  // 関数形式擬似クラスの 1 パス処理の後に行うことで、擬似クラス内部の属性セレクタの二重カウントを防ぐ
  s = s.replace(/\[[^\]]*\]/g, () => { b++; return '' })

  // 擬似クラス :xxx を除去してカウント（関数形式も含む）
  s = s.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g, () => { b++; return '' })

  // ID セレクタ #xxx を除去してカウント
  s = s.replace(/#[\w-]+/g, () => { a++; return '' })

  // クラスセレクタ .xxx を除去してカウント
  s = s.replace(/\.[\w-]+/g, () => { b++; return '' })

  // コンビネータを除去（列結合子 || も含む）
  s = s.replace(/\|\|/g, ' ').replace(/[>+~]/g, ' ')

  // 名前空間接頭辞 (ns| ・ *| ・ |) を除去し、要素名か * だけを残す。
  // これにより *|div → div（要素として計上）、svg|* → *（ユニバーサルで非計上）となる。
  s = s.replace(/(?:[\w-]+|\*)?\|/g, '')

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
