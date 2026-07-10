import { describe, it, expect } from 'vitest'
import { diffCss, applyShorthandRisksToDiff } from '../src/core/index.js'
import { computeShorthandRisks } from '../src/core/shorthand-risk.js'

async function applyAndGetProp(oldCss, newCss, selector, prop) {
  const [result, risks] = await Promise.all([
    diffCss(oldCss, newCss),
    computeShorthandRisks(oldCss, newCss),
  ])
  applyShorthandRisksToDiff(result, risks)
  return result.get('base')?.selectors.get(selector)?.props.get(prop)
}

describe('applyShorthandRisksToDiff — 基本動作', () => {
  it('longhand 有効（old）→ shorthand 有効（new）で longhand が changed に昇格する', async () => {
    // old: padding が前のルール、padding-right が後のルール → longhand が有効（40px）
    // new: padding-right が前のルール、padding が後のルール → shorthand が上書き（16px）
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('shorthand 有効（old）→ longhand 有効（new）で longhand が changed に昇格する', async () => {
    // old: padding-right が前のルール、padding が後のルール → shorthand が上書き（16px）
    // new: padding が前のルール、padding-right が後のルール → longhand が有効（40px）
    const oldCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const newCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('16px')
    expect(prop?.newValue).toBe('40px')
  })

  it('変化がない場合（同じ順序）は changed に昇格しない', async () => {
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const [result, risks] = await Promise.all([
      diffCss(oldCss, newCss),
      computeShorthandRisks(oldCss, newCss),
    ])
    applyShorthandRisksToDiff(result, risks)
    const sel = result.get('base')?.selectors.get('.foo')
    // 同一 CSS なのでリスクなし → selector は unchanged のまま
    expect(sel?.status).toBe('unchanged')
  })

  it('shorthandRisks が空の場合は何もしない', async () => {
    const result = await diffCss('.foo { color: red; }', '.foo { color: blue; }')
    applyShorthandRisksToDiff(result, { risks: [] })
    const prop = result.get('base')?.selectors.get('.foo')?.props.get('color')
    expect(prop?.status).toBe('changed')
  })
})

describe('applyShorthandRisksToDiff — .mogeta2-* 相当ケース', () => {
  it('.mogeta2-1: padding + padding-right 順序入れ替え → padding-right が changed', async () => {
    // old: padding:16px が前のルール、padding-right:40px が後のルール → longhand 有効 (40px)
    // new: padding-right:40px が前のルール、padding:16px が後のルール → shorthand 上書き (16px)
    const oldCss = `.mogeta2-1 { padding: 16px; } .mogeta2-1 { padding-right: 40px; }`
    const newCss = `.mogeta2-1 { padding-right: 40px; } .mogeta2-1 { padding: 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.mogeta2-1', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('.mogeta2-2: padding + padding-inline-end 順序入れ替え → padding-inline-end が changed', async () => {
    const oldCss = `.mogeta2-2 { padding: 16px; } .mogeta2-2 { padding-inline-end: 40px; }`
    const newCss = `.mogeta2-2 { padding-inline-end: 40px; } .mogeta2-2 { padding: 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.mogeta2-2', 'padding-inline-end')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('16px')
  })

  it('.mogeta2-3: padding + 複数 longhand 順序入れ替え → padding-left/padding-right が changed', async () => {
    // old: padding → padding-left → padding-right の順 → longhand 後勝ち
    // new: padding-left → padding-right → padding の順 → shorthand 後勝ち
    const oldCss = `.mogeta2-3 { padding: 16px; } .mogeta2-3 { padding-left: 20px; } .mogeta2-3 { padding-right: 40px; }`
    const newCss = `.mogeta2-3 { padding-left: 20px; } .mogeta2-3 { padding-right: 40px; } .mogeta2-3 { padding: 16px; }`
    const [result, risks] = await Promise.all([
      diffCss(oldCss, newCss),
      computeShorthandRisks(oldCss, newCss),
    ])
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

  it('.mogeta2-4: padding + padding-inline-start/end 順序入れ替え → 両 longhand が changed', async () => {
    const oldCss = `.mogeta2-4 { padding: 16px; } .mogeta2-4 { padding-inline-start: 20px; } .mogeta2-4 { padding-inline-end: 40px; }`
    const newCss = `.mogeta2-4 { padding-inline-start: 20px; } .mogeta2-4 { padding-inline-end: 40px; } .mogeta2-4 { padding: 16px; }`
    const [result, risks] = await Promise.all([
      diffCss(oldCss, newCss),
      computeShorthandRisks(oldCss, newCss),
    ])
    applyShorthandRisksToDiff(result, risks)
    const sel = result.get('base')?.selectors.get('.mogeta2-4')
    expect(sel?.props.get('padding-inline-start')?.status).toBe('changed')
    expect(sel?.props.get('padding-inline-end')?.status).toBe('changed')
  })
})

describe('applyShorthandRisksToDiff — changeCount/status の更新', () => {
  it('昇格後に selector.status と ctx.status が changed になる', async () => {
    // old: longhand 後勝ち → new: shorthand 後勝ち → Case A 検出 → 昇格
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const [result, risks] = await Promise.all([
      diffCss(oldCss, newCss),
      computeShorthandRisks(oldCss, newCss),
    ])

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
  it('padding-right が diff で changed の場合、shorthand risk 昇格で上書きしない', async () => {
    // old: padding:8px が前のルール、padding-right:40px が後のルール → longhand 後勝ち (40px)
    // new: padding-right:99px が前のルール、padding:16px が後のルール → shorthand 後勝ち (Case A)
    // diff: padding-right が 40px→99px で already changed
    // applyShorthandRisksToDiff は status !== 'unchanged' をスキップ → newValue は 99px のまま
    const oldCss = `.foo { padding: 8px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 99px; } .foo { padding: 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('99px')  // 既存 changed を上書きしない
  })
})

describe('applyShorthandRisksToDiff — Fix #3: oldValue は old CSS の実効値を参照する', () => {
  it('old shorthand 値と new shorthand 値が異なる場合、oldValue が old の shorthand 値になる', async () => {
    // old: padding:8px が前のルール、padding-right:40px が後のルール → longhand 後勝ち (40px)
    // new: padding-right:40px が前のルール、padding:20px が後のルール → shorthand 後勝ち (Case A)
    // → oldValue=40px (old の longhand 値), newValue=20px (new shorthand コンポーネント)
    const oldCss = `.foo { padding: 8px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 20px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('40px')
    expect(prop?.newValue).toBe('20px')
  })

  it('old shorthand 値が old の実効値として使われる（shorthand が old で後勝ち）', async () => {
    // old: padding-right:40px が前のルール、padding:8px が後のルール → shorthand 後勝ち (8px)
    // new: padding:8px が前のルール、padding-right:40px が後のルール → longhand 後勝ち (Case B)
    // → oldValue=8px (old shorthand コンポーネント), newValue=40px (new longhand 値)
    const oldCss = `.foo { padding-right: 40px; } .foo { padding: 8px; }`
    const newCss = `.foo { padding: 8px; } .foo { padding-right: 40px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('8px')
    expect(prop?.newValue).toBe('40px')
  })
})

describe('applyShorthandRisksToDiff — Fix #2: ガード削除で winner 変化を正確に昇格する', () => {
  it('padding shorthand 値が同じでも winner 変化があれば changed に昇格する', async () => {
    // old: padding:16px が前のルール、padding-right:16px が後のルール → longhand 後勝ち (同値だが longhand が有効)
    // new: padding-right:16px が前のルール、padding:16px が後のルール → shorthand 後勝ち (Case A)
    // oldEffective === newEffective (どちらも 16px) だがガード削除済みなので昇格する
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 16px; }`
    const newCss = `.foo { padding-right: 16px; } .foo { padding: 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('16px')
    expect(prop?.newValue).toBe('16px')
  })
})

describe('applyShorthandRisksToDiff — Fix #5: important フラグが正しく設定される', () => {
  it('new で shorthand が !important → newImportant === true', async () => {
    // old: padding が前のルール、padding-right が後のルール → longhand 後勝ち (layerRank=0, idx=1)
    // new: padding-right が前のルール、padding !important が後のルール → !important により shorthand が勝つ (layerRank=1)
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px !important; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.newImportant).toBe(true)
    expect(prop?.oldImportant).toBe(false)
  })

  it('old で shorthand が !important → oldImportant === true', async () => {
    // old: padding-right が前のルール、padding !important が後のルール → shorthand が勝つ (layerRank=1)
    // new: padding が前のルール、padding-right が後のルール → longhand 後勝ち (Case B)
    const oldCss = `.foo { padding-right: 40px; } .foo { padding: 16px !important; }`
    const newCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldImportant).toBe(true)
    expect(prop?.newImportant).toBe(false)
  })
})

describe('applyShorthandRisksToDiff — Finding 1: マルチ値 shorthand のコンポーネント展開', () => {
  it('padding: 10px 5px 8px 3px で padding-left の newValue === 3px', async () => {
    // old: padding が前のルール、padding-left が後のルール → longhand 後勝ち (7px)
    // new: padding-left が前のルール、padding が後のルール → shorthand 後勝ち → 展開して left = 3px
    const oldCss = `.foo { padding: 10px 5px 8px 3px; } .foo { padding-left: 7px; }`
    const newCss = `.foo { padding-left: 7px; } .foo { padding: 10px 5px 8px 3px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-left')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('7px')
    expect(prop?.newValue).toBe('3px')
  })

  it('padding: 10px 5px 8px 3px で padding-right の newValue === 5px', async () => {
    // old: padding が前のルール、padding-right が後のルール → longhand 後勝ち (99px)
    // new: padding-right が前のルール、padding が後のルール → shorthand 後勝ち → 展開して right = 5px
    const oldCss = `.foo { padding: 10px 5px 8px 3px; } .foo { padding-right: 99px; }`
    const newCss = `.foo { padding-right: 99px; } .foo { padding: 10px 5px 8px 3px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('99px')
    expect(prop?.newValue).toBe('5px')
  })
})

describe('applyShorthandRisksToDiff — Fix 4: oldWinner === null は status: added になる', () => {
  it('旧CSSにショートハンドもロングハンドもない場合は status: added になる', async () => {
    // 旧: .foo { color: red } (padding 関連なし)
    // 新: .foo { padding-top: 5px } .foo { padding: 10px } (shorthand 後勝ち)
    const oldCss = `.foo { color: red; }`
    const newCss = `.foo { color: red; } .foo { padding-top: 5px; } .foo { padding: 10px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-top')
    expect(prop?.status).toBe('added')
    expect(prop?.oldValue).toBeUndefined()
    // diffCss が explicit 宣言 padding-top:5px を 'added' として検出するため、
    // applyShorthandRisksToDiff はそれをスキップし newValue は 5px のまま
    expect(prop?.newValue).toBe('5px')
  })
})

describe('applyShorthandRisksToDiff — Fix 5: BOX2_MAP 論理プロパティ系展開', () => {
  it('padding-inline: 10px 20px で padding-inline-start の newValue === 10px', async () => {
    // old: padding-inline が前のルール、padding-inline-start が後のルール → longhand 後勝ち
    // new: padding-inline-start が前のルール、padding-inline が後のルール → shorthand 後勝ち → start = 10px
    const oldCss = `.foo { padding-inline: 10px 20px; } .foo { padding-inline-start: 30px; }`
    const newCss = `.foo { padding-inline-start: 30px; } .foo { padding-inline: 10px 20px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-inline-start')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('30px')
    expect(prop?.newValue).toBe('10px')
  })

  it('padding-inline: 10px 20px で padding-inline-end の newValue === 20px', async () => {
    const oldCss = `.foo { padding-inline: 10px 20px; } .foo { padding-inline-end: 30px; }`
    const newCss = `.foo { padding-inline-end: 30px; } .foo { padding-inline: 10px 20px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-inline-end')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('30px')
    expect(prop?.newValue).toBe('20px')
  })
})

describe('applyShorthandRisksToDiff — Finding 7: ctx.status は added/removed を上書きしない', () => {
  it('ctx.status が added のとき shorthand risk 適用後も added のまま', async () => {
    const oldCss = `.foo { padding: 16px; } .foo { padding-right: 40px; }`
    const newCss = `.foo { padding-right: 40px; } .foo { padding: 16px; }`
    const [result, risks] = await Promise.all([
      diffCss(oldCss, newCss),
      computeShorthandRisks(oldCss, newCss),
    ])
    const ctx = result.get('base')
    ctx.status = 'added'
    applyShorthandRisksToDiff(result, risks)
    expect(ctx.status).toBe('added')
  })
})

describe('Fix #1: splitTokens — calc() 内スペースを区切らない', () => {
  it('padding: calc(10px + 2em) 20px 30px 40px で padding-right === 20px', async () => {
    const oldCss = `.foo { padding: calc(10px + 2em) 20px 30px 40px; } .foo { padding-right: 99px; }`
    const newCss = `.foo { padding-right: 99px; } .foo { padding: calc(10px + 2em) 20px 30px 40px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'padding-right')
    expect(prop?.status).toBe('changed')
    expect(prop?.newValue).toBe('20px')
  })

  it('gap: calc(var(--x) + 4px) 16px で row-gap === calc(var(--x) + 4px)', async () => {
    const oldCss = `.foo { gap: calc(var(--x) + 4px) 16px; } .foo { row-gap: 99px; }`
    const newCss = `.foo { row-gap: 99px; } .foo { gap: calc(var(--x) + 4px) 16px; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'row-gap')
    expect(prop?.status).toBe('changed')
    expect(prop?.newValue).toBe('calc(var(--x) + 4px)')
  })
})

describe('Fix #5: border/flex/flex-flow shorthand 展開', () => {
  it('border-top: 3px solid red で border-top-width === 3px', async () => {
    const oldCss = `.foo { border-top: 3px solid red; } .foo { border-top-width: 1px; }`
    const newCss = `.foo { border-top-width: 1px; } .foo { border-top: 3px solid red; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'border-top-width')
    expect(prop?.status).toBe('changed')
    expect(prop?.newValue).toBe('3px')
  })

  it('flex: 1 1 auto で flex-basis === auto', async () => {
    const oldCss = `.foo { flex: 1 1 auto; } .foo { flex-basis: 200px; }`
    const newCss = `.foo { flex-basis: 200px; } .foo { flex: 1 1 auto; }`
    const prop = await applyAndGetProp(oldCss, newCss, '.foo', 'flex-basis')
    expect(prop?.status).toBe('changed')
    expect(prop?.newValue).toBe('auto')
  })
})
