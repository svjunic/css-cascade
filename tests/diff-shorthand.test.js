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
