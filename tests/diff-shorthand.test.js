import { describe, it, expect } from 'vitest'
import { diffCss, applyShorthandRisksToDiff } from '../src/core/index.js'
import { computeShorthandRisks } from '../src/core/shorthand-risk.js'

function applyAndGetProp(oldCss, newCss, selector, prop) {
  const result = diffCss(oldCss, newCss)
  const risks = computeShorthandRisks(oldCss, newCss)
  applyShorthandRisksToDiff(result, risks)
  return result.get('base')?.selectors.get(selector)?.props.get(prop)
}

describe('applyShorthandRisksToDiff — 基本動作', () => {
  it('longhand 有効（old）→ shorthand 有効（new）で longhand が changed に昇格する', () => {
    // old: padding が先、padding-right が後 → longhand が有効（40px）
    // new: padding-right が先、padding が後 → shorthand が上書き（16px）
    const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; padding: 16px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('shorthand 有効（old）→ longhand 有効（new）で longhand が changed に昇格する', () => {
    // old: padding-right が先、padding が後 → shorthand が上書き（16px）
    // new: padding が先、padding-right が後 → longhand が有効（40px）
    const oldCss = `.foo { padding-right: 40px; padding: 16px; }`
    const newCss = `.foo { padding: 16px; padding-right: 40px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('16px')
    expect(prop?.newValue).toBe('40px')
  })

  it('変化がない場合（同じ順序）は unchanged のまま', () => {
    const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
    const newCss = `.foo { padding: 16px; padding-right: 40px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('unchanged')
  })

  it('shorthandRisks が空の場合は何もしない', () => {
    const result = diffCss('.foo { color: red; }', '.foo { color: blue; }')
    applyShorthandRisksToDiff(result, { risks: [] })
    const prop = result.get('base')?.selectors.get('.foo')?.props.get('color')
    expect(prop?.status).toBe('changed')
  })
})

describe('applyShorthandRisksToDiff — .mogeta2-* 相当ケース', () => {
  it('.mogeta2-1: padding + padding-right 順序入れ替え → padding-right が changed', () => {
    // old: padding: 16px; padding-right: 40px; → longhand 有効 (40px)
    // new: padding-right: 40px; padding: 16px; → shorthand 上書き (16px)
    const oldCss = `.mogeta2-1 { padding: 16px; padding-right: 40px; }`
    const newCss = `.mogeta2-1 { padding-right: 40px; padding: 16px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.mogeta2-1', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('.mogeta2-2: padding + padding-inline-end 順序入れ替え → padding-inline-end が changed', () => {
    const oldCss = `.mogeta2-2 { padding: 16px; padding-inline-end: 40px; }`
    const newCss = `.mogeta2-2 { padding-inline-end: 40px; padding: 16px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.mogeta2-2', 'padding-inline-end')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('.mogeta2-3: padding + 複数 longhand 順序入れ替え → padding-left/padding-right が changed', () => {
    const oldCss = `.mogeta2-3 { padding: 16px; padding-left: 20px; padding-right: 40px; }`
    const newCss = `.mogeta2-3 { padding-left: 20px; padding-right: 40px; padding: 16px; }`
    const result = diffCss(oldCss, newCss)
    const risks = computeShorthandRisks(oldCss, newCss)
    applyShorthandRisksToDiff(result, risks)
    const sel = result.get('base')?.selectors.get('.mogeta2-3')
    const left = sel?.props.get('padding-left')
    const right = sel?.props.get('padding-right')
    expect(left?.status).toBe('changed')
    expect(left?.oldValue).toBe('20px')
    expect(left?.newValue).toBe('16px')
    expect(right?.status).toBe('changed')
    expect(right?.oldValue).toBe('40px')
    expect(right?.newValue).toBe('16px')
  })

  it('.mogeta2-4: padding + padding-inline-start/end 順序入れ替え → 両 longhand が changed', () => {
    const oldCss = `.mogeta2-4 { padding: 16px; padding-inline-start: 20px; padding-inline-end: 40px; }`
    const newCss = `.mogeta2-4 { padding-inline-start: 20px; padding-inline-end: 40px; padding: 16px; }`
    const result = diffCss(oldCss, newCss)
    const risks = computeShorthandRisks(oldCss, newCss)
    applyShorthandRisksToDiff(result, risks)
    const sel = result.get('base')?.selectors.get('.mogeta2-4')
    expect(sel?.props.get('padding-inline-start')?.status).toBe('changed')
    expect(sel?.props.get('padding-inline-end')?.status).toBe('changed')
  })
})

describe('applyShorthandRisksToDiff — changeCount/status の更新', () => {
  it('昇格後に selector.status と ctx.status が changed になる', () => {
    const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; padding: 16px; }`
    const result = diffCss(oldCss, newCss)
    const risks = computeShorthandRisks(oldCss, newCss)

    const selBefore = result.get('base')?.selectors.get('.foo')
    expect(selBefore?.status).toBe('unchanged')

    applyShorthandRisksToDiff(result, risks)

    const ctx = result.get('base')
    const sel = ctx?.selectors.get('.foo')
    expect(sel?.status).toBe('changed')
    expect(sel?.changeCount).toBeGreaterThan(0)
    expect(ctx?.status).toBe('changed')
    expect(ctx?.changeCount).toBeGreaterThan(0)
  })
})

describe('applyShorthandRisksToDiff — 既存の changed は上書きしない', () => {
  it('値も変わった prop は shorthand risk で上書きされない', () => {
    // padding-right の値が old/new で異なる → diff が先に changed を付ける
    const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
    const newCss = `.foo { padding-right: 99px; padding: 16px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    // diff が検出した changed (40px→99px) が保持される
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('99px')
  })
})

describe('applyShorthandRisksToDiff — Fix #3: oldValue は old CSS の実効値を参照する', () => {
  it('old shorthand 値と new shorthand 値が異なる場合、oldValue が old の shorthand 値になる', () => {
    // old: padding-right → padding:8px → shorthand 後勝ち (8px)
    // new: padding-right → padding:16px → shorthand 後勝ち (16px)
    // → winner は両方 shorthand で同一 → conflict なし
    // 別ケース: old shorthand が先で new shorthand が後
    // old: padding:8px, padding-right:40px が後 → longhand 有効 (40px)
    // new: padding-right:40px, padding:20px が後 → shorthand 後勝ち (20px)
    // oldWinner=longhand, newWinner=shorthand (A) → oldValue=40px (old の longhand 値), newValue=20px
    const oldCss = `.foo { padding: 8px; padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; padding: 20px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('20px')
  })

  it('old shorthand 値が old の実効値として使われる（shorthand が old で後勝ち）', () => {
    // old: padding-right:40px → padding:8px → shorthand 後勝ち (8px)
    // new: padding:8px → padding-right:40px → longhand 後勝ち (40px)
    // oldWinner=shorthand, newWinner=longhand (B) → oldValue=8px (old shorthand), newValue=40px
    const oldCss = `.foo { padding-right: 40px; padding: 8px; }`
    const newCss = `.foo { padding: 8px; padding-right: 40px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('8px')
    expect(prop?.newValue).toBe('40px')
  })
})

describe('applyShorthandRisksToDiff — Fix #2: ガード削除で winner 変化を正確に昇格する', () => {
  it('padding shorthand 値が同じでも winner 変化があれば changed に昇格する', () => {
    // old: padding:16px → padding-right:16px → longhand 後勝ち (同値だが longhand が有効)
    // new: padding-right:16px → padding:16px → shorthand 後勝ち (同値だが shorthand が有効)
    // oldEffective === newEffective (どちらも 16px) だがガードを削除したので昇格する
    const oldCss = `.foo { padding: 16px; padding-right: 16px; }`
    const newCss = `.foo { padding-right: 16px; padding: 16px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('16px')
    expect(prop?.newValue).toBe('16px')
  })
})

describe('applyShorthandRisksToDiff — Fix #5: important フラグが正しく設定される', () => {
  it('new で shorthand が !important → newImportant === true', () => {
    // old: padding:16px → padding-right:40px → longhand 後勝ち
    // new: padding-right:40px → padding:16px !important → !important により shorthand が勝つ
    const oldCss = `.foo { padding: 16px; padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; padding: 16px !important; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.newImportant).toBe(true)
    expect(prop?.oldImportant).toBe(false)
  })

  it('old で shorthand が !important → oldImportant === true', () => {
    // old: padding-right:40px → padding:16px !important → shorthand が勝つ (important)
    // new: padding:16px → padding-right:40px → longhand 後勝ち
    const oldCss = `.foo { padding-right: 40px; padding: 16px !important; }`
    const newCss = `.foo { padding: 16px; padding-right: 40px; }`
    const prop = applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldImportant).toBe(true)
    expect(prop?.newImportant).toBe(false)
  })
})
