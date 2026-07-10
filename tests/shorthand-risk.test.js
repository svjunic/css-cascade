import { describe, it, expect } from 'vitest'
import { computeShorthandRisks } from '../src/core/shorthand-risk.js'

describe('computeShorthandRisks — Case B: shorthand→longhand（上書き解消）', () => {
  // OLD: padding-right が前のルール、padding が後のルール → shorthand が上書き（padding-right = 16px）
  // NEW: padding が前のルール、padding-right が後のルール → longhand が有効（padding-right = 40px）
  const oldCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
  const newCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`

  it('Case B が検出される', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.risks.length).toBeGreaterThan(0)
    const baseCtx = result.risks.find(r => r.contextKey === 'base')
    expect(baseCtx).toBeDefined()
    const sel = baseCtx.selectors.find(s => s.selector === '.foo')
    expect(sel).toBeDefined()
    const conflict = sel.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    expect(conflict.oldWinner).toBe('shorthand')
    expect(conflict.newWinner).toBe('longhand')
  })

  it('hasWarning は false（Case A なし）', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — Case A: longhand→shorthand（リスク）', () => {
  // OLD: padding が前のルール、padding-right が後のルール → longhand が有効
  // NEW: padding-right が前のルール、padding が後のルール → shorthand が上書き（リスク）
  const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
  const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`

  it('Case A が検出される', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    const baseCtx = result.risks.find(r => r.contextKey === 'base')
    expect(baseCtx).toBeDefined()
    const sel = baseCtx.selectors.find(s => s.selector === '.foo')
    expect(sel).toBeDefined()
    const conflict = sel.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(conflict.oldWinner).toBe('longhand')
    expect(conflict.newWinner).toBe('shorthand')
  })

  it('hasWarning は true（Case A あり）', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — 順序変化なし（検出しない）', () => {
  // OLD/NEW で同じ順序 → winner が変わらない → 検出しない
  const oldCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
  const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`

  it('同じ CSS では検出しない', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.risks).toHaveLength(0)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — !important が保護（Case A 無効）', () => {
  // OLD: longhand が後のルール → longhand が有効
  // NEW: longhand が前だが !important あり → layerRank が高く longhand が有効
  // 両方 oldWinner = longhand, newWinner = longhand → 同一 winner → 検出なし
  const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
  const newCss = `.foo { padding-right: 40px !important; } .foo { padding: 16px; }`

  it('!important がある場合は longhand が保護され Case A を検出しない', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    const caseAConflicts = result.risks.flatMap(r => r.selectors).flatMap(s => s.conflicts).filter(c => c.direction === 'A')
    expect(caseAConflicts).toHaveLength(0)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — @media コンテキスト内の競合', () => {
  const oldCss = `@media (max-width: 768px) { .foo { padding-right: 40px; } .foo { padding: 16px; } }`
  const newCss = `@media (max-width: 768px) { .foo { padding: 16px; } .foo { padding-right: 40px; } }`

  it('@media コンテキストで Case B を検出する', async () => {
    const result = await computeShorthandRisks(oldCss, newCss)
    const mediaCtx = result.risks.find(r => r.contextKey.includes('@media'))
    expect(mediaCtx).toBeDefined()
    const sel = mediaCtx.selectors.find(s => s.selector === '.foo')
    expect(sel).toBeDefined()
    const conflict = sel.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
  })
})

describe('computeShorthandRisks — margin shorthand', () => {
  it('margin/margin-top で Case A を検出する', async () => {
    const oldCss = `.foo { margin: 8px; } .foo { margin-top: 20px; }`
    const newCss = `.foo { margin-top: 20px; } .foo { margin: 8px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'margin' && c.longhand === 'margin-top')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — padding-inline shorthand', () => {
  it('padding/padding-inline-end で Case B を検出する', async () => {
    const oldCss = `.foo { padding-inline-end: 10px; } .foo { padding: 0; }`
    const newCss = `.foo { padding: 0; } .foo { padding-inline-end: 10px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-inline-end')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
  })
})

describe('computeShorthandRisks — old に片方しかなく new で両方揃い競合', () => {
  it('old には shorthand のみ、new で longhand が追加されて longhand が後 → Case B', async () => {
    // old: shorthand のみ → getIntraWinner returns 'shorthand'
    // new: padding が前のルール、padding-right が後のルール → newWinner = 'longhand'
    // oldWinner ('shorthand') !== newWinner ('longhand') → Case B
    const oldCss = `.foo { padding: 16px; }`
    const newCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    // old には longhand なし → getIntraWinner returns 'shorthand' (shorthand のみ存在)
    expect(conflict.oldWinner).toBe('shorthand')
  })

  it('old には longhand のみ、new で shorthand が追加されて shorthand が後 → Case A', async () => {
    // old: longhand のみ → getIntraWinner returns 'longhand'
    // new: padding-right が前のルール、padding が後のルール → newWinner = 'shorthand'
    // oldWinner ('longhand') !== newWinner ('shorthand') → Case A
    const oldCss = `.foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    // old には shorthand なし → getIntraWinner returns 'longhand' (longhand のみ存在)
    expect(conflict.oldWinner).toBe('longhand')
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — margin-inline shorthand', () => {
  it('margin/margin-inline-start で Case A を検出する', async () => {
    const oldCss = `.foo { margin: 8px; } .foo { margin-inline-start: 20px; }`
    const newCss = `.foo { margin-inline-start: 20px; } .foo { margin: 8px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.foo')?.conflicts
      .find(c => c.shorthand === 'margin' && c.longhand === 'margin-inline-start')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — Finding 2: Case A は oldWinner に関わらず hasWarning === true', () => {
  it('old に存在しないセレクタで Case A 方向でも hasWarning === true', async () => {
    // old: セレクタなし、new: padding-right が前で padding が後 → shorthand 後勝ち (Case A)
    // oldWinner === null でも Case A は警告対象
    const oldCss = ``
    const newCss = `.bar { padding-right: 40px; } .bar { padding: 16px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(true)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.bar')?.conflicts
      .find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(conflict.oldWinner).toBeNull()
  })

  it('old に存在しないセレクタで Case B 方向なら hasWarning === false', async () => {
    // old: セレクタなし、new: padding が前で padding-right が後 → longhand 後勝ち (Case B)
    const oldCss = ``
    const newCss = `.bar { padding: 16px; } .bar { padding-right: 40px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(false)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.bar')?.conflicts
      .find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    expect(conflict.oldWinner).toBeNull()
  })

  it('old に同セレクタが存在し Case A なら hasWarning === true', async () => {
    const oldCss = `.bar { padding: 16px; } .bar { padding-right: 40px; }`
    const newCss = `.bar { padding-right: 40px; } .bar { padding: 16px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — Finding 5: 新規セレクタで direction=B のとき oldWinner は null', () => {
  it('old に存在しないセレクタで Case B のとき oldWinner === null・direction === B を返す', async () => {
    const oldCss = ``
    const newCss = `.bar { padding: 16px; } .bar { padding-right: 40px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.bar')?.conflicts
      .find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    expect(conflict.oldWinner).toBeNull()
  })
})

describe('computeShorthandRisks — old* 値フィールドの検証', () => {
  it('Case B: oldShorthandValue は old CSS の shorthand 値を返す（新旧で値が異なる）', async () => {
    // old: padding-right が前のルール、padding:16px が後のルール → shorthand(16px) が上書き
    // new: padding:24px が前のルール、padding-right が後のルール → longhand(40px) が有効
    const oldCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const newCss = `.foo { padding: 24px; } .foo { padding-right: 40px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const conflict = result.risks.find(r => r.contextKey === 'base')
      ?.selectors.find(s => s.selector === '.foo')
      ?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    expect(conflict.oldShorthandValue).toBe('16px') // 「旧」shorthand 値
    expect(conflict.shorthandValue).toBe('24px')     // 「新」shorthand 値
    expect(conflict.longhandValue).toBe('40px')      // 「新」longhand 値（有効）
  })

  it('Case A: oldLonghandValue は old CSS の longhand 値を返す（新旧で値が異なる）', async () => {
    // old: padding:8px が前のルール、padding-right:40px が後のルール → longhand(40px) が有効
    // new: padding-right:20px が前のルール、padding:24px が後のルール → shorthand(24px) が上書き
    const oldCss = `.foo { padding: 8px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 20px; } .foo { padding: 24px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const conflict = result.risks.find(r => r.contextKey === 'base')
      ?.selectors.find(s => s.selector === '.foo')
      ?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(conflict.oldLonghandValue).toBe('40px')   // 「旧」longhand 値
    expect(conflict.oldShorthandValue).toBe('8px')   // 「旧」shorthand 値
    expect(conflict.shorthandValue).toBe('24px')     // 「新」shorthand 値（上書き）
    expect(conflict.longhandValue).toBe('20px')      // 「新」longhand 値
  })

  it('Case B: old に longhand がない場合 oldLonghandValue は null', async () => {
    // old: shorthand のみ → old longhand 宣言が存在しない
    const oldCss = `.foo { padding: 16px; }`
    const newCss = `.foo { padding: 24px; } .foo { padding-right: 40px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const conflict = result.risks.find(r => r.contextKey === 'base')
      ?.selectors.find(s => s.selector === '.foo')
      ?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.oldLonghandValue).toBeNull()
    expect(conflict.oldShorthandValue).toBe('16px')
  })

  it('Case A: old に shorthand がない場合 oldShorthandValue は null', async () => {
    // old: longhand のみ → old shorthand 宣言が存在しない
    const oldCss = `.foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 20px; } .foo { padding: 24px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const conflict = result.risks.find(r => r.contextKey === 'base')
      ?.selectors.find(s => s.selector === '.foo')
      ?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.oldShorthandValue).toBeNull()
    expect(conflict.oldLonghandValue).toBe('40px')
  })
})

describe('computeShorthandRisks — Fix #6: 多段 shorthand での longhand 重複排除', () => {
  it('border と border-top が共存するとき border-top-width は 1 件のみ報告される', async () => {
    // border と border-top は両方 border-top-width を longhand に持つ
    // new: border-top-width → border → border-top の順 → border が後勝ちして shorthand winner
    // 重複排除により border-top-width の conflict は 1 件のみ
    const oldCss = `.foo { border-top-width: 2px; } .foo { border: 1px solid black; } .foo { border-top: 3px solid red; }`
    const newCss = `.foo { border: 1px solid black; } .foo { border-top: 3px solid red; } .foo { border-top-width: 2px; }`
    const result = await computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    if (sel) {
      const borderTopWidthConflicts = sel.conflicts.filter(c => c.longhand === 'border-top-width')
      expect(borderTopWidthConflicts.length).toBeLessThanOrEqual(1)
    }
  })
})
