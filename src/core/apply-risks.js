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
  ['overflow',       ['overflow-x', 'overflow-y']],
  ['gap',            ['row-gap', 'column-gap']],
  ['place-items',    ['align-items', 'justify-items']],
  ['place-content',  ['align-content', 'justify-content']],
  ['place-self',     ['align-self', 'justify-self']],
  ['padding-inline', ['padding-inline-start', 'padding-inline-end']],
  ['padding-block',  ['padding-block-start', 'padding-block-end']],
  ['margin-inline',  ['margin-inline-start', 'margin-inline-end']],
  ['margin-block',   ['margin-block-start', 'margin-block-end']],
  ['inset-inline',   ['inset-inline-start', 'inset-inline-end']],
  ['inset-block',    ['inset-block-start', 'inset-block-end']],
])

const BORDER_SIDE_SET = new Set([
  'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-inline-start', 'border-inline-end',
  'border-block-start', 'border-block-end', 'outline',
])
const BORDER_STYLE_KW = new Set([
  'none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset',
])
const FLEX_DIRECTION_KW = new Set(['row','row-reverse','column','column-reverse'])
const FLEX_WRAP_KW      = new Set(['nowrap','wrap','wrap-reverse'])

// CSS 値をトークン分割する（括弧・クォート内のスペースは区切らない）
function splitTokens(value) {
  const tokens = []
  let depth = 0, quote = null, start = 0
  const s = value.trim()
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (quote) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '(') {
      depth++
    } else if (ch === ')') {
      if (depth > 0) depth--
    } else if (/\s/.test(ch) && depth === 0) {
      const tok = s.slice(start, i)
      if (tok) tokens.push(tok)
      start = i + 1
    }
  }
  const last = s.slice(start)
  if (last) tokens.push(last)
  return tokens
}

// マルチ値 shorthand の値を longhand 用のコンポーネント値に展開する。
// box-4: 1値→全同, 2値→[a,b,a,b], 3値→[a,b,c,b], 4値→[a,b,c,d]
// box-2: 1値→全同, 2値→[a,b]
// 不明な shorthand はフォールバックで value をそのまま返す。
function resolveShorthandComponent(shorthand, longhand, value) {
  const box4 = BOX4_MAP.get(shorthand)
  if (box4) {
    const idx = box4.indexOf(longhand)
    if (idx !== -1) {
      const p = splitTokens(value)
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
      const p = splitTokens(value)
      return p.length === 1 ? p[0] : (p[idx] ?? p[0])
    }
  }

  if (BORDER_SIDE_SET.has(shorthand)) {
    const tokens = splitTokens(value)
    let width = 'medium', style = 'none', color = 'currentcolor'
    for (const t of tokens) {
      const tl = t.toLowerCase()
      if (BORDER_STYLE_KW.has(tl)) style = t
      else if (/^(thin|medium|thick)$/i.test(t) || /^[0-9]/.test(t) ||
               /^(calc|var|env|min|max|clamp)\(/i.test(t)) width = t
      else color = t
    }
    if (longhand.endsWith('-width')) return width
    if (longhand.endsWith('-style')) return style
    if (longhand.endsWith('-color')) return color
  }

  if (shorthand === 'flex') {
    const tokens = splitTokens(value)
    const tl0 = tokens[0]?.toLowerCase()
    if (tl0 === 'none') {
      if (longhand === 'flex-grow')   return '0'
      if (longhand === 'flex-shrink') return '0'
      if (longhand === 'flex-basis')  return 'auto'
    } else if (tl0 === 'auto') {
      if (longhand === 'flex-grow')   return '1'
      if (longhand === 'flex-shrink') return '1'
      if (longhand === 'flex-basis')  return 'auto'
    } else if (tokens.length === 3) {
      if (longhand === 'flex-grow')   return tokens[0]
      if (longhand === 'flex-shrink') return tokens[1]
      if (longhand === 'flex-basis')  return tokens[2]
    }
  }

  if (shorthand === 'flex-flow') {
    for (const t of splitTokens(value)) {
      const tl = t.toLowerCase()
      if (FLEX_DIRECTION_KW.has(tl) && longhand === 'flex-direction') return t
      if (FLEX_WRAP_KW.has(tl)      && longhand === 'flex-wrap')      return t
    }
  }

  // 物理ショートハンド（padding/margin 等）→ 論理ロングハンド（padding-inline-start 等）は
  // writing-mode 依存のため静的展開不可。フォールバックでショートハンド値全体を返す。
  return value
}

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
        const propEntry = sel.props.get(longhand)
        // changed/removed/added は上書きしない。undefined と unchanged のみ処理する。
        // CSSOM はショートハンドとロングハンドを合成するため、競合時は longhand が diff に現れない
        // (undefined になる) ケースが多い。そのため undefined も昇格対象とする。
        if (propEntry && propEntry.status !== 'unchanged') continue

        const newEffective = newWinner === 'longhand' ? longhandValue    : resolveShorthandComponent(shorthand, longhand, shorthandValue ?? '')
        const newImportant = newWinner === 'longhand' ? longhandImportant    : shorthandImportant

        if (oldWinner === null) {
          sel.props.set(longhand, {
            status: 'added',
            newValue: newEffective,
            newImportant,
          })
        } else {
          const oldEffective = oldWinner === 'longhand' ? oldLonghandValue : resolveShorthandComponent(shorthand, longhand, oldShorthandValue ?? '')
          const oldImportant = oldWinner === 'longhand' ? oldLonghandImportant : oldShorthandImportant
          sel.props.set(longhand, {
            status: 'changed',
            oldValue: oldEffective,
            oldImportant,
            newValue: newEffective,
            newImportant,
          })
        }
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
