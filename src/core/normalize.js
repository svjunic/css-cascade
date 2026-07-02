/**
 * normalize.js
 * CSS テキストの正規化ユーティリティ。
 * 意味を変えない範囲の空白・表記揺れを吸収し、
 * 整形済み vs ミニファイ の差が比較結果に影響しないようにする。
 */

/**
 * セレクタ文字列を正規化する。
 * - 前後の空白をトリム
 * - 連続空白を1スペースに圧縮
 * - コンビネータ（> + ~）周辺の空白を正規化
 */
export function normalizeSelector(sel) {
  return sel
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([>+~])\s*/g, ' $1 ')
    .trim()
}

/**
 * 条件付き @ルール（@media / @supports / @container）の条件文字列を正規化する。
 * いずれも「括弧付き条件 + 論理演算子」という同形式のため共通処理でよい。
 * - 前後の空白をトリム
 * - 連続空白を1スペースに圧縮
 * - 括弧と論理演算子（and / or / not / only）の周辺空白を正規化
 *   例: "(min-width:521px)and(max-width:960px)"
 *       → "(min-width: 521px) and (max-width: 960px)"
 */
export function normalizeMediaCondition(condition) {
  // url() および selector() 内のコンテンツをコロン正規化の対象外にするため一時退避する
  const slots = []

  // url() 保護: quoted string を含む完全な CSS トークン規則で抽出する。
  // 単純な [^)]* では url("it's (fine)") のように quoted string 内に ')' と
  // 別種クォートが混在する場合に誤マッチするため、quoted branch を個別に処理している。
  let s = condition.replace(/url\((?:[^)"'\\]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)/gi, m => {
    slots.push(m)
    return '\x00' + (slots.length - 1) + '\x00'
  })

  // selector() 保護: @supports selector() の引数はセレクタ文字列のため
  // 擬似クラスのコロンや not/only を正規化してはいけない。
  // ネスト括弧（:not(.foo) 等）を含むため深さカウントで閉じ括弧を探す。
  let out = ''
  let i = 0
  while (i < s.length) {
    if (s[i] !== 's' && s[i] !== 'S') { out += s[i++]; continue }
    const m = s.slice(i).match(/^selector\s*\(/i)
    if (m) {
      let depth = 1, j = i + m[0].length, quote = null, bracketDepth = 0
      while (j < s.length && depth > 0) {
        const ch = s[j]
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
        j++
      }
      slots.push(s.slice(i, j))
      out += '\x00' + (slots.length - 1) + '\x00'
      i = j
    } else {
      out += s[i++]
    }
  }
  s = out

  const normalized = s
    .trim()
    // コロン前後のスペースを正規化: "max-width:960px" / "max-width :960px" → "max-width: 960px"
    .replace(/\s*:\s*/g, ': ')
    // 連続空白を1つに圧縮
    .replace(/\s+/g, ' ')
    // prefix 型の論理演算子と条件の間を統一: "not(print)" → "not (print)"
    .replace(/\b(not|only)\s*\(/gi, '$1 (')
    // 括弧と論理演算子の間のスペースを統一（前後に1つ）
    .replace(/\)\s*(and|or|not|only)\s*\(/gi, ') $1 (')
    // 末尾クリーンアップ
    .trim()
    .replace(/\s+/g, ' ')
  // url() / selector() を元に戻す
  return normalized.replace(/\x00(\d+)\x00/g, (_, i) => slots[+i])
}

/**
 * プロパティ値を正規化する。
 * - 前後の空白をトリムのみ
 * - 色の短縮や単位の変換等は行わない（過剰正規化で実際の差分を消さないため）
 */
export function normalizeValue(value) {
  return value.trim()
}

/**
 * 16進カラー文字列を正規化する（内部ヘルパ）。
 * - 小文字化
 * - 3桁 → 6桁 (#abc → #aabbcc)
 * - 4桁 → 8桁 (#abcd → #aabbccdd)
 */
function normalizeHex(hex) {
  const h = hex.toLowerCase()
  if (h.length === 4) {
    // #rgb → #rrggbb
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]
  }
  if (h.length === 5) {
    // #rgba → #rrggbbaa
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3] + h[4] + h[4]
  }
  return h
}

/**
 * 比較判定専用の値正規化（表記揺れを吸収する）。
 * 表示には使わず、diff の変更判定のみに使用する。
 *
 * 正規化の内容:
 * 1. 前後の空白をトリム、連続空白を1スペースに
 * 2. クォートを除去 ('a' → a, "a" → a)
 * 3. カンマ周辺の空白を除去
 * 4. 先頭ゼロを補完 (.2em → 0.2em) — * / 空白除去より先に行い calc(1 * -.2em) を正しく処理
 *    ※ ) + - も前置文字として扱い calc(max(1em,2em)+.5rem) も補完
 * 5. * / 周辺の空白を除去 (a * b → a*b)  ※ + - は calc の意味が変わるため触れない
 * 6. 16進カラーを正規化 (#FFF → #ffffff)
 */
export function canonicalizeValue(value) {
  let v = value.trim().replace(/\s+/g, ' ')
  // クォート除去
  v = v.replace(/['"]/g, '')
  // カンマ周辺の空白を除去 (a, b → a,b)  ※多値プロパティ・font-family・transition等の表記揺れ吸収
  v = v.replace(/\s*,\s*/g, ',')
  // 先頭ゼロ補完: 数値の前に空白・カンマ・括弧・*/+-演算子・閉じ括弧がある場合、または行頭（符号も考慮）
  // ※ */空白除去より先に実行することで calc(1 * -.2em) の "-" 前のスペースを利用できる
  // ※ )+-を含めることで calc(max(1em,2em)+.5rem) や calc(max(1em,2em)-.5rem) も補完できる
  v = v.replace(/(^|[\s,(*\/+)\-])([+-]?)\.(\d)/g, (_, pre, sign, digit) => {
    // pre が減算演算子 '-' のとき: calc(a-.5em) → calc(a - 0.5em) とスペースを補完し
    // calc(a - .5em) と同じ正規形にする（sign は空になる）
    if (pre === '-') return ` - 0.${digit}`
    return `${pre}${sign}0.${digit}`
  })
  // calc(a-0.5em) → calc(a - 0.5em): バイナリマイナスのスペース補完
  // calc(a-.5em) は上のステップで calc(a - 0.5em) になるため、正規形を一致させる
  v = v.replace(/([\d%\)])-(\d)/g, '$1 - $2')
  // * / 周辺の空白を除去
  v = v.replace(/\s*([*/])\s*/g, '$1')
  // 16進カラー正規化
  v = v.replace(/#[0-9a-fA-F]{3,8}\b/g, m => normalizeHex(m))
  return v
}

/**
 * セレクタ文字列を意味レベルで正規化する（表記揺れを吸収する）。
 * 比較判定・キー集約専用。表示には使わない。
 *
 * normalizeSelector の正規化に加えて:
 * - 属性セレクタ内のクォートを除去 ([class*='list'] → [class*=list])
 * - 属性セレクタ内の = 系演算子前後の空白を除去
 */
export function canonicalizeSelector(sel) {
  let s = normalizeSelector(sel)
  // 属性セレクタ内を正規化
  s = s.replace(/\[([^\]]*)\]/g, (_, inner) => {
    let t = inner.replace(/\s*([~|^$*]?)\s*=\s*/g, '$1=') // = 系演算子の前後空白除去
    t = t.replace(/(['"])(.*?)\1/g, '$2')             // クォート除去
    return '[' + t.trim() + ']'
  })
  return s
}
