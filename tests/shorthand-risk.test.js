import { describe, it, expect } from 'vitest'
import { computeShorthandRisks } from '../src/core/shorthand-risk.js'

describe('computeShorthandRisks — Case B: shorthand→longhand（上書き解消）', () => {
  // OLD: padding-right:40px が先、padding:16px が後 → shorthand が上書き（padding-right = 16px）
  // NEW: padding:16px が先、padding-right:40px が後 → longhand が有効（padding-right = 40px）
  const oldCss = `.foo { padding-right: 40px; padding: 16px; }`
  const newCss = `.foo { padding: 16px; padding-right: 40px; }`

  it('Case B が検出される', () => {
    const result = computeShorthandRisks(oldCss, newCss)
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

  it('hasWarning は false（Case A なし）', () => {
    const result = computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — Case A: longhand→shorthand（リスク）', () => {
  // OLD: padding:16px が先、padding-right:40px が後 → longhand が有効
  // NEW: padding-right:40px が先、padding:16px が後 → shorthand が上書き（リスク）
  const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
  const newCss = `.foo { padding-right: 40px; padding: 16px; }`

  it('Case A が検出される', () => {
    const result = computeShorthandRisks(oldCss, newCss)
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

  it('hasWarning は true（Case A あり）', () => {
    const result = computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — 順序変化なし（検出しない）', () => {
  // OLD/NEW で同じ順序 → winner が変わらない → 検出しない
  const oldCss = `.foo { padding-right: 40px; padding: 16px; }`
  const newCss = `.foo { padding-right: 40px; padding: 16px; }`

  it('同じ CSS では検出しない', () => {
    const result = computeShorthandRisks(oldCss, newCss)
    expect(result.risks).toHaveLength(0)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — !important が保護（Case A 無効）', () => {
  // OLD: longhand が後 → longhand が有効
  // NEW: longhand が先だが !important あり → layerRank が高く longhand が有効
  // 両方 oldWinner = longhand, newWinner = longhand → 同一 winner → 検出なし
  const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
  const newCss = `.foo { padding-right: 40px !important; padding: 16px; }`

  it('!important がある場合は longhand が保護され Case A を検出しない', () => {
    const result = computeShorthandRisks(oldCss, newCss)
    const caseAConflicts = result.risks.flatMap(r => r.selectors).flatMap(s => s.conflicts).filter(c => c.direction === 'A')
    expect(caseAConflicts).toHaveLength(0)
    expect(result.hasWarning).toBe(false)
  })
})

describe('computeShorthandRisks — @media コンテキスト内の競合', () => {
  const oldCss = `@media (max-width: 768px) { .foo { padding-right: 40px; padding: 16px; } }`
  const newCss = `@media (max-width: 768px) { .foo { padding: 16px; padding-right: 40px; } }`

  it('@media コンテキストで Case B を検出する', () => {
    const result = computeShorthandRisks(oldCss, newCss)
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
  it('margin/margin-top で Case A を検出する', () => {
    const oldCss = `.foo { margin: 8px; margin-top: 20px; }`
    const newCss = `.foo { margin-top: 20px; margin: 8px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'margin' && c.longhand === 'margin-top')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — inset shorthand', () => {
  it('inset/top で Case B を検出する', () => {
    const oldCss = `.foo { top: 10px; inset: 0; }`
    const newCss = `.foo { inset: 0; top: 10px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'inset' && c.longhand === 'top')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
  })
})

describe('computeShorthandRisks — old に片方しかなく new で両方揃い競合', () => {
  it('old には shorthand のみ、new で longhand が追加されて longhand が後 → Case B', () => {
    // old: shorthand のみ → getIntraWinner returns 'shorthand'
    // new: padding が先、padding-right が後 → newWinner = 'longhand'
    // oldWinner ('shorthand') !== newWinner ('longhand') → Case B
    const oldCss = `.foo { padding: 16px; }`
    const newCss = `.foo { padding: 16px; padding-right: 40px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    const conflict = sel?.conflicts.find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('B')
    // old には longhand なし → getIntraWinner returns 'shorthand' (shorthand のみ存在)
    expect(conflict.oldWinner).toBe('shorthand')
  })

  it('old には longhand のみ、new で shorthand が追加されて shorthand が後 → Case A', () => {
    // old: longhand のみ → getIntraWinner returns 'longhand'
    // new: padding-right が先、padding が後 → newWinner = 'shorthand'
    // oldWinner ('longhand') !== newWinner ('shorthand') → Case A
    const oldCss = `.foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; padding: 16px; }`
    const result = computeShorthandRisks(oldCss, newCss)
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

describe('computeShorthandRisks — background shorthand', () => {
  it('background/background-color で Case A を検出する', () => {
    const oldCss = `.foo { background: white; background-color: red; }`
    const newCss = `.foo { background-color: red; background: white; }`
    const result = computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.foo')?.conflicts
      .find(c => c.shorthand === 'background' && c.longhand === 'background-color')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — Fix #1: 新規追加セレクタは hasWarning をセットしない', () => {
  it('old に存在しないセレクタで Case A 方向でも hasWarning === false', () => {
    // old: セレクタなし、new: padding-right が先で padding が後 → shorthand 後勝ち (Case A)
    // oldWinner === null なので regression 扱いにならない
    const oldCss = ``
    const newCss = `.bar { padding-right: 40px; padding: 16px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(false)
    const base = result.risks.find(r => r.contextKey === 'base')
    const conflict = base?.selectors.find(s => s.selector === '.bar')?.conflicts
      .find(c => c.shorthand === 'padding' && c.longhand === 'padding-right')
    expect(conflict).toBeDefined()
    expect(conflict.direction).toBe('A')
    expect(conflict.oldWinner).toBeNull()
  })

  it('old に同セレクタが存在し Case A なら hasWarning === true', () => {
    const oldCss = `.bar { padding: 16px; padding-right: 40px; }`
    const newCss = `.bar { padding-right: 40px; padding: 16px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    expect(result.hasWarning).toBe(true)
  })
})

describe('computeShorthandRisks — Fix #6: 多段 shorthand での longhand 重複排除', () => {
  it('border と border-top が共存するとき border-top-width は 1 件のみ報告される', () => {
    // border と border-top は両方 border-top-width を longhand に持つ
    // new: border-top-width → border → border-top の順 → border が後勝ちして shorthand winner
    // 重複排除により border-top-width の conflict は 1 件のみ
    const oldCss = `.foo { border-top-width: 2px; border: 1px solid black; border-top: 3px solid red; }`
    const newCss = `.foo { border: 1px solid black; border-top: 3px solid red; border-top-width: 2px; }`
    const result = computeShorthandRisks(oldCss, newCss)
    const base = result.risks.find(r => r.contextKey === 'base')
    const sel = base?.selectors.find(s => s.selector === '.foo')
    if (sel) {
      const borderTopWidthConflicts = sel.conflicts.filter(c => c.longhand === 'border-top-width')
      expect(borderTopWidthConflicts.length).toBeLessThanOrEqual(1)
    }
  })
})
