import { describe, it, expect } from 'vitest'
import { computeOrderRisks } from '../src/core/order-risk.js'
import { computeSpecificity, sameSpecificity } from '../src/core/specificity.js'
import { parseSelectorOrder } from '../src/core/parse-cssom.js'
import { renderOrderRisks } from '../src/ui/render.js'

// ─── specificity ──────────────────────────────────────────────────────────

describe('computeSpecificity', () => {
  it('クラスセレクタ (0,1,0)', () => {
    expect(computeSpecificity('.foo')).toEqual([0, 1, 0])
  })
  it('要素 + クラス (0,1,1)', () => {
    expect(computeSpecificity('div.foo')).toEqual([0, 1, 1])
  })
  it('ID セレクタ (1,0,0)', () => {
    expect(computeSpecificity('#id')).toEqual([1, 0, 0])
  })
  it('要素名のみ (0,0,1)', () => {
    expect(computeSpecificity('div')).toEqual([0, 0, 1])
  })
  it('属性セレクタ (0,1,0)', () => {
    expect(computeSpecificity('[type=text]')).toEqual([0, 1, 0])
  })
  it('擬似クラス (0,1,0)', () => {
    expect(computeSpecificity(':hover')).toEqual([0, 1, 0])
  })
  it('擬似要素 (0,0,1)', () => {
    expect(computeSpecificity('::before')).toEqual([0, 0, 1])
  })
  it('複合セレクタ (1,2,1)', () => {
    expect(computeSpecificity('#main .nav:hover div')).toEqual([1, 2, 1])
  })
  it('ユニバーサルセレクタ * は 0', () => {
    expect(computeSpecificity('*')).toEqual([0, 0, 0])
  })

  it(':not() 単一引数の詳細度を引き継ぐ', () => {
    expect(computeSpecificity(':not(.a)')).toEqual([0, 1, 0])
  })
  it(':not() カンマ区切り複数引数は最大値を採用する (CSS L4)', () => {
    expect(computeSpecificity(':not(.a, .b)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':not(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not() 内の括弧ありセレクタ (:is()) でカンマを誤分割しない', () => {
    expect(computeSpecificity(':not(:is(.a, .b))')).toEqual([0, 1, 0])
  })
  it(':not() 内の括弧ありセレクタ (:nth-child()) でカンマを誤分割しない', () => {
    // :nth-child 自体の b=1 + of S 部分の max(.a,.b)=1 → 合計 [0,2,0] が仕様に準拠
    expect(computeSpecificity(':not(:nth-child(2n of .a, .b))')).toEqual([0, 2, 0])
  })

  it(':is() は引数の最大詳細度を引き継ぐ (CSS L4)', () => {
    expect(computeSpecificity(':is(#id)')).toEqual([1, 0, 0])
    expect(computeSpecificity(':is(.foo)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':is(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not(:is(#id)) は [1,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(#id))')).toEqual([1, 0, 0])
  })
  it(':where() は常に詳細度 0', () => {
    expect(computeSpecificity(':where(.foo)')).toEqual([0, 0, 0])
    expect(computeSpecificity(':where(#id)')).toEqual([0, 0, 0])
  })
  it(':not(:is(:where(.a,.b))) は二重ネストで [0,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(:where(.a,.b)))')).toEqual([0, 0, 0])
  })
  it(':is(.a:not(:nth-child(2))) は二重ネストで [0,2,0] を返す', () => {
    expect(computeSpecificity(':is(.a:not(:nth-child(2)))')).toEqual([0, 2, 0])
  })
  it(':has() は引数の最大詳細度を引き継ぐ', () => {
    expect(computeSpecificity('.card:has(#featured, img.hero)')).toEqual([1, 1, 0])
  })
  it(':host() は自身の擬似クラスと引数詳細度を加算する', () => {
    expect(computeSpecificity(':host(.active)')).toEqual([0, 2, 0])
  })
  it('::slotted() は擬似要素自身と引数詳細度を加算する', () => {
    expect(computeSpecificity('::slotted(.item)')).toEqual([0, 1, 1])
  })
  it('エスケープされた Tailwind 風クラスは 1 クラスとして数える', () => {
    expect(computeSpecificity('.md\\:hover\\:text-red-500:hover')).toEqual([0, 2, 0])
  })
  it('名前空間つき要素セレクタは要素として数える', () => {
    expect(computeSpecificity('svg|a.icon')).toEqual([0, 1, 1])
  })
})

describe('sameSpecificity', () => {
  it('同じクラスセレクタ同士', () => {
    expect(sameSpecificity('.a', '.b')).toBe(true)
  })
  it('クラスと要素は異なる', () => {
    expect(sameSpecificity('.a', 'div')).toBe(false)
  })
  it('ID とクラスは異なる', () => {
    expect(sameSpecificity('#id', '.cls')).toBe(false)
  })
})

// ─── parseSelectorOrder ───────────────────────────────────────────────────

describe('parseSelectorOrder', () => {
  it('単純なセレクタリストを返す', async () => {
    const css = '.a { color: red; } .b { color: blue; } .c { color: green; }'
    const order = await parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('グループセレクタを展開する', async () => {
    const css = '.a, .b { color: red; } .c { color: blue; }'
    const order = await parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('@media 内のセレクタを別コンテキストで返す', async () => {
    const css = '.a { color: red; } @media (max-width: 768px) { .b { color: blue; } }'
    const order = await parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a'])
    expect(order.get('@media (max-width: 768px)')).toEqual(['.b'])
  })

  it('ネストした @media は親子条件を結合したコンテキストで返す', async () => {
    const css = `
      @media (min-width: 600px) {
        @media (hover: hover) {
          .a { color: red; }
        }
      }
    `
    const order = await parseSelectorOrder(css)

    expect(order.get('@media (min-width: 600px) and (hover: hover)')).toEqual(['.a'])
    expect(order.has('@media (hover: hover)')).toBe(false)
  })

  it('@supports 内のセレクタを base ではなく @supports コンテキストで返す', async () => {
    const css = '.a { display: block; } @supports (display: grid) { .a { display: grid; } }'
    const order = await parseSelectorOrder(css)

    expect(order.get('base')).toEqual(['.a'])
    expect(order.get('@supports (display: grid)')).toEqual(['.a'])
  })

  it('@container 内のセレクタを base ではなく @container コンテキストで返す', async () => {
    const css = '.card { padding: 8px; } @container card (min-width: 320px) { .card { padding: 12px; } }'
    const order = await parseSelectorOrder(css)

    expect(order.get('base')).toEqual(['.card'])
    expect(order.get('@container card (min-width: 320px)')).toEqual(['.card'])
  })

  it('同じセレクタが複数回登場した場合は最終出現位置を使う', async () => {
    // .a が最後に出現 → 順序は .b, .a
    const css = '.a { color: red; } .b { color: blue; } .a { margin: 0; }'
    const order = await parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.b', '.a'])
  })
})

// ─── computeOrderRisks ────────────────────────────────────────────────────

describe('computeOrderRisks — パターン1: 単純スワップ', () => {
  const old = `
    .s1 { color: red; }
    .s2 { color: red; }
    .s3 { color: blue; font-weight: bold; }
    .s4 { color: red; }
    .s5 { color: green; font-weight: normal; }
    .s6 { color: red; }
  `
  const newCss = `
    .s1 { color: red; }
    .s2 { color: red; }
    .s5 { color: green; font-weight: normal; }
    .s4 { color: red; }
    .s3 { color: blue; font-weight: bold; }
    .s6 { color: red; }
  `

  it('base コンテキストで moved 行が検知される', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    // .s3 と .s5 は独立クラスで構造的オーバーラップなし → 競合なし → hasWarning=false
    expect(base.hasWarning).toBe(false)
    const moved = base.rows.filter(r => r.type === 'moved')
    // 対称スワップは重複排除により1ペアとして報告される
    expect(moved).toHaveLength(1)
  })

  it('moved 行が (.s3, .s5) のペアになる', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    const selPairs = moved.map(r => [r.oldSelector, r.newSelector])
    // 対称スワップは old 側の出現順が先のほうのペアが報告される
    expect(selPairs).toContainEqual(['.s3', '.s5'])
  })

  it('moved 行は同一詳細度フラグが true', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    moved.forEach(row => expect(row.sameSpecificity).toBe(true))
  })
})

describe('computeOrderRisks — パターン2: 削除後に順序維持', () => {
  const old = `
    .s1 { color: red; }
    .s2 { color: blue; }
    .s3 { color: green; }
    .s4 { color: red; }
  `
  const newCss = `
    .s1 { color: red; }
    .s3 { color: green; }
    .s4 { color: red; }
  `

  it('moved 行が 0 件', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(false)
    expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(0)
  })

  it('.s2 が deleted 行として現れる', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const deleted = base.rows.filter(r => r.type === 'deleted')
    expect(deleted.map(r => r.oldSelector)).toContain('.s2')
  })
})

describe('computeOrderRisks — パターン3: 挿入のみ', () => {
  const old = `
    .s1 { color: red; }
    .s3 { color: green; }
  `
  const newCss = `
    .s1 { color: red; }
    .s2 { color: blue; }
    .s3 { color: green; }
  `

  it('moved 行が 0 件', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // 変更なし (追加のみ) の場合、base コンテキストは結果に含まれる（added 行あり）
    if (base) {
      expect(base.hasWarning).toBe(false)
      expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(0)
    }
  })
})

describe('computeOrderRisks — 変更なし', () => {
  const css = `
    .a { color: red; }
    .b { color: blue; }
    .c { color: green; }
  `

  it('結果が空配列', async () => {
    const risks = await computeOrderRisks(css, css)
    expect(risks).toHaveLength(0)
  })
})

describe('computeOrderRisks — 同値スワップ（競合なし）', () => {
  const old = `
    .a { color: red; }
    .b { color: red; }
  `
  const newCss = `
    .b { color: red; }
    .a { color: red; }
  `

  it('moved 行はあるが conflictingProps が空かつ hasWarning が false', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    // .a と .b は独立クラス（構造的オーバーラップなし）→ hasWarning=false
    expect(base.hasWarning).toBe(false)
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })
})

describe('computeOrderRisks — 詳細度が異なるスワップ', () => {
  const old = `
    div.a { color: red; }
    .b { color: blue; }
  `
  const newCss = `
    .b { color: blue; }
    div.a { color: red; }
  `

  it('moved 行が 2 件かつ sameSpecificity が false', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.sameSpecificity).toBe(false))
  })
})

describe('computeOrderRisks — 詳細度が異なるスワップは競合を誤検出しない', () => {
  // .a（低詳細度）と #x（高詳細度）を並べ替えても、常に #x が勝つため有効値は変わらない。
  const old = `
    .a { color: red; }
    #x { color: blue; }
  `
  const newCss = `
    #x { color: blue; }
    .a { color: red; }
  `

  it('moved 行はあるが conflictingProps は空（ID セレクタが順序に関係なく勝つ）', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })

  it('独立クラスのスワップは同一詳細度・異なる値でも構造的オーバーラップなしで競合を検出しない', async () => {
    const oldEq = `.a { color: red; } .b { color: blue; }`
    const newEq = `.b { color: blue; } .a { color: red; }`
    const risks = await computeOrderRisks(oldEq, newEq)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    // .a と .b は独立クラス（構造的オーバーラップなし）→ 競合は検出されない
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })
})

describe('computeOrderRisks — @media 内のスワップ', () => {
  // コンビネータセレクタ（同一詳細度・異なる値）でコンテキスト検出と競合検出を確認する
  const old = `
    @media (max-width: 768px) {
      .section .item { color: red; }
      .card .item { color: blue; }
    }
  `
  const newCss = `
    @media (max-width: 768px) {
      .card .item { color: blue; }
      .section .item { color: red; }
    }
  `

  it('@media コンテキストで moved 行を検知する', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const media = risks.find(r => r.contextKey === '@media (max-width: 768px)')
    expect(media).toBeDefined()
    expect(media.hasWarning).toBe(true)
  })
})

describe('computeOrderRisks — semanticSelectors と importance/specificity', () => {
  it('semanticSelectors ON では属性セレクタのクォート差だけで moved を出さない', async () => {
    const old = `.a [class*='list'] { color: red; } .b { color: blue; }`
    const newCss = `.a [class*=list] { color: red; } .b { color: blue; }`
    const risks = await computeOrderRisks(old, newCss, { semanticSelectors: true })
    expect(risks).toHaveLength(0)
  })

  it('同一詳細度でも !important の勝者が変わらない順序変更は conflictingProps を出さない', async () => {
    const old = `.a { color: red !important; } .b { color: blue; }`
    const newCss = `.b { color: blue; } .a { color: red !important; }`
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')

    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })

  it(':where() で詳細度が下がるセレクタは通常クラスとの順序変更を詳細度差として扱う', async () => {
    const old = `:where(.a) { color: red; } .b { color: blue; }`
    const newCss = `.b { color: blue; } :where(.a) { color: red; }`
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')

    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => {
      expect(row.sameSpecificity).toBe(false)
      expect(row.conflictingProps).toHaveLength(0)
    })
  })
})

describe('computeOrderRisks — 既存サンプルデータ (.mogeta2-*)', () => {
  const old = `
    .mogeta2-1--moge-ta { color: blue; }
    .mogeta2-1-other    { color: red; }
    .mogeta2-1          { color: red; }
  `
  const newCss = `
    .mogeta2-1          { color: red; }
    .mogeta2-1--moge-ta { color: blue; }
    .mogeta2-1-other    { color: red; }
  `

  it('.mogeta2-1 と .mogeta2-1--moge-ta のスワップが検知される', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    // 各セレクタは独立クラス（構造的オーバーラップなし）→ 競合なし → hasWarning=false
    expect(base.hasWarning).toBe(false)

    const moved = base.rows.filter(r => r.type === 'moved')
    const involvedSelectors = moved.flatMap(r => [r.oldSelector, r.newSelector])
    expect(involvedSelectors).toContain('.mogeta2-1')
    expect(involvedSelectors).toContain('.mogeta2-1--moge-ta')
  })

  it('.mogeta2-1 と .mogeta2-1-other は同値なので conflictingProps なし', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // .mogeta2-1 と .mogeta2-1-other は共に color:red なので競合なし
    const movedPairs = base.rows
      .filter(r => r.type === 'moved')
      .filter(r =>
        (r.oldSelector === '.mogeta2-1' && r.newSelector === '.mogeta2-1-other') ||
        (r.oldSelector === '.mogeta2-1-other' && r.newSelector === '.mogeta2-1'),
      )
    movedPairs.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })
})

describe('computeOrderRisks — 相対順不変ペアの偽陽性抑制（A,B,C,D → B,C,A,D）', () => {
  // .a が後方へ移動。.b/.c の相対順は変わらない。
  // index ペアリングは (.a,.b)(.b,.c)(.c,.a) となるが、(.b,.c) は old/new ともに b<c で反転なし。
  // 相対順反転ガードにより (.b,.c) の conflictingProps は空になるべきである。
  const old = `
    .a { color: red; }
    .b { color: blue; }
    .c { color: green; font-weight: bold; }
    .d { color: red; }
  `
  const newCss = `
    .b { color: blue; }
    .c { color: green; font-weight: bold; }
    .a { color: red; }
    .d { color: red; }
  `

  it('moved 行が検知される（.a の移動）', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    // .a/.b/.c はすべて独立クラス（構造的オーバーラップなし）→ 競合なし → hasWarning=false
    expect(base.hasWarning).toBe(false)
    expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(3)
  })

  it('相対順が不変の (.b,.c) ペアは conflictingProps が空', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const bcPairs = base.rows
      .filter(r => r.type === 'moved')
      .filter(r =>
        (r.oldSelector === '.b' && r.newSelector === '.c') ||
        (r.oldSelector === '.c' && r.newSelector === '.b'),
      )
    // (.b,.c) ペアは old/new ともに b が c より前 → 反転なし → conflictingProps は空
    bcPairs.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })

  it('.a と .b は独立クラスのため構造的オーバーラップなしで競合を検出しない', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // (.a,.b) は相対順が逆転しているが、独立クラス（構造的オーバーラップなし）のため競合なし
    const abPair = base.rows
      .filter(r => r.type === 'moved')
      .find(r =>
        (r.oldSelector === '.a' && r.newSelector === '.b') ||
        (r.oldSelector === '.b' && r.newSelector === '.a'),
      )
    expect(abPair).toBeDefined()
    expect(abPair.conflictingProps).toHaveLength(0)
  })
})

describe('computeOrderRisks — @supports 内のスワップ', () => {
  // コンビネータセレクタ（同一詳細度・異なる値）でコンテキスト検出と競合検出を確認する
  const old = `
    @supports (display: grid) {
      .section .item { color: red; }
      .card .item { color: blue; }
    }
  `
  const newCss = `
    @supports (display: grid) {
      .card .item { color: blue; }
      .section .item { color: red; }
    }
  `

  it('@supports コンテキストで moved 行を検知する', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@supports (display: grid)')
    expect(ctx).toBeDefined()
    expect(ctx.hasWarning).toBe(true)
    expect(ctx.rows.filter(r => r.type === 'moved').length).toBeGreaterThan(0)
  })

  it('@supports 内のスワップで競合プロパティが検知される', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@supports (display: grid)')
    const moved = ctx.rows.filter(r => r.type === 'moved')
    const hasConflict = moved.some(r => r.conflictingProps.length > 0)
    expect(hasConflict).toBe(true)
  })
})

describe('computeOrderRisks — @container 内のスワップ', () => {
  // コンビネータセレクタ（同一詳細度・異なる値）でコンテキスト検出と競合検出を確認する
  const old = `
    @container card (min-width: 320px) {
      .section .item { color: red; }
      .card .item { color: blue; }
    }
  `
  const newCss = `
    @container card (min-width: 320px) {
      .card .item { color: blue; }
      .section .item { color: red; }
    }
  `

  it('@container コンテキストで moved 行を検知する', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@container card (min-width: 320px)')
    expect(ctx).toBeDefined()
    expect(ctx.hasWarning).toBe(true)
    expect(ctx.rows.filter(r => r.type === 'moved').length).toBeGreaterThan(0)
  })

  it('@container 内のスワップで競合プロパティが検知される', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@container card (min-width: 320px)')
    const moved = ctx.rows.filter(r => r.type === 'moved')
    const hasConflict = moved.some(r => r.conflictingProps.length > 0)
    expect(hasConflict).toBe(true)
  })
})

describe('computeOrderRisks — !important 同士のスワップ', () => {
  // コンビネータセレクタで両者 !important かつ同一詳細度のスワップを検証する。
  // old: .card .item が後 → .card .item が勝ち (blue)
  // new: .section .item が後 → .section .item が勝ち (red)
  // → 有効値が変わるので conflictingProps に color が含まれる。
  const old = `
    .section .item { color: red !important; }
    .card .item { color: blue !important; }
  `
  const newCss = `
    .card .item { color: blue !important; }
    .section .item { color: red !important; }
  `

  it('両者 !important かつ値が異なるスワップでは競合を検出する', async () => {
    const risks = await computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    const hasConflict = moved.some(r => r.conflictingProps.some(p => p.prop === 'color'))
    expect(hasConflict).toBe(true)
  })
})

// ─── バグ検出テスト ────────────────────────────────────────────────────────────

describe('computeOrderRisks: hasWarning 偽陽性 [バグ]', () => {
  it('共通プロパティを持たないセレクタのスワップは hasWarning: false', async () => {
    // Bug-3 (CONFIRMED): hasWarning は rows.some(r => r.type === 'moved') だけで判定しており
    // conflictingProps が空でも true になる
    const oldCss = `.layout { display: flex; } .color { color: red; }`
    const newCss = `.color { color: red; } .layout { display: flex; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    expect(ctx?.hasWarning).toBe(false)
  })
})

describe('computeOrderRisks: 競合重複報告 [バグ]', () => {
  it('コンビネータセレクタのスワップで color 競合は1件のみ報告される', async () => {
    // Bug-4 (CONFIRMED): seenMovedPairs で対称スワップの重複を排除済み。
    // コンビネータセレクタ（保守的 hasStructuralOverlap=true）で競合が正しく1件のみ報告されることを確認。
    const oldCss = `.section .item { color: red; } .card .item { color: blue; }`
    const newCss = `.card .item { color: blue; } .section .item { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    const colorConflicts = ctx?.rows?.flatMap(r => r.conflictingProps ?? []).filter(c => c.prop === 'color')
    expect(colorConflicts?.length).toBe(1)
  })
})

describe('computeOrderRisks: 新規プロパティ競合の見逃し [バグ]', () => {
  it('両セレクタが新規に同プロパティを宣言しつつ順序スワップした場合に競合を検出する', async () => {
    // Bug-5 (CONFIRMED): 旧 CSS で両セレクタが prop を宣言していない (oldWinner=null) ケース。
    // コンビネータセレクタ (hasStructuralOverlap=true) を使い、新規追加 color の競合を検出する。
    const oldCss = `.section .item { font-size: 1em; } .card .item { margin: 0; }`
    const newCss = `.card .item { margin: 0; color: blue; } .section .item { font-size: 1em; color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    const movedRow = ctx?.rows?.find(r => r.type === 'moved')
    expect(movedRow?.conflictingProps?.some(c => c.prop === 'color')).toBe(true)
  })
})

// ─── renderOrderRisks ─────────────────────────────────────────────────────────

describe('renderOrderRisks — R-1: hasWarning=false でも moved があればセクションを表示', () => {
  it('共通プロパティなしスワップは hasWarning=false だがセクションが返る', async () => {
    const oldCss = `.layout { display: flex; } .color { color: red; }`
    const newCss = `.color { color: red; } .layout { display: flex; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    // hasWarning=false のコンテキストのみ → totalWarnings=0 だが moved 行は存在する
    expect(risks[0]?.hasWarning).toBe(false)
    const html = renderOrderRisks(risks)
    expect(html).not.toBe('')
    expect(html).toContain('order-risks-section')
  })

  it('moved 行が 0 件のとき空文字列を返す', async () => {
    const css = `.a { color: red; } .b { color: blue; } .c { color: green; }`
    const risks = await computeOrderRisks(css, css)
    expect(renderOrderRisks(risks)).toBe('')
  })
})

describe('renderOrderRisks — R-2: ヘッダーバッジはコンテキスト数でなく moved ペア数', () => {
  it('1 コンテキストに 2 ペアの moved 行があるとき "2 件" と表示する', async () => {
    // .a↔.b と .c↔.d の 2 ペアスワップ → 1 コンテキスト, 2 moved ペア
    const oldCss = `.a { color: red; } .b { color: blue; } .c { font-size: 1em; } .d { font-size: 2em; }`
    const newCss = `.b { color: blue; } .a { color: red; } .d { font-size: 2em; } .c { font-size: 1em; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base?.rows.filter(r => r.type === 'moved').length).toBe(2)
    const html = renderOrderRisks(risks)
    // ヘッダーバッジは "2 件の順序変更"（コンテキスト数 1 ではなくペア数 2）
    expect(html).toContain('2 件の順序変更')
  })
})

describe('renderOrderRisks — R-3: コンテキストバッジは moved 行がある場合「順序変更なし」と表示しない', () => {
  it('hasWarning=false でも moved 行があれば「N 件の順序変更（リスクなし）」バッジを表示する', async () => {
    const oldCss = `.layout { display: flex; } .color { color: red; }`
    const newCss = `.color { color: red; } .layout { display: flex; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    expect(risks[0]?.hasWarning).toBe(false)
    const html = renderOrderRisks(risks)
    expect(html).not.toContain('順序変更なし')
    expect(html).toContain('件の順序変更（リスクなし）')
  })

  it('moved 行が存在しないコンテキストには「順序変更なし」バッジを表示する', async () => {
    // base: .b が削除のみ（moved なし）→ "順序変更なし" バッジ
    // @media: .x↔.y スワップ（moved あり）→ セクション全体が表示される
    const oldCss = `
      .a { color: red; } .b { color: blue; }
      @media (max-width: 768px) { .x { color: red; } .y { color: blue; } }
    `
    const newCss = `
      .a { color: red; }
      @media (max-width: 768px) { .y { color: blue; } .x { color: red; } }
    `
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base?.rows.filter(r => r.type === 'moved').length).toBe(0)
    const html = renderOrderRisks(risks)
    expect(html).toContain('順序変更なし')
  })
})

// ─── hasStructuralOverlap のテスト ─────────────────────────────────────────────

describe('computeOrderRisks — hasStructuralOverlap: サブセット関係のセレクタ', () => {
  it('.foo と .foo.active — 構造的オーバーラップあり（サブセット）だが詳細度差で競合なし', async () => {
    const oldCss = `.foo { color: red; } .foo.active { color: blue; }`
    const newCss = `.foo.active { color: blue; } .foo { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base?.rows.filter(r => r.type === 'moved')
    // hasStructuralOverlap=true で分析が進むが、.foo.active が詳細度で常に勝つため競合なし
    expect(moved?.length).toBeGreaterThan(0)
    moved?.forEach(r => expect(r.conflictingProps).toHaveLength(0))
    expect(base?.hasWarning).toBe(false)
  })

  it('a と a:hover — 構造的オーバーラップあり（同一タイプ）だが詳細度差で競合なし', async () => {
    const oldCss = `a { color: red; } a:hover { color: blue; }`
    const newCss = `a:hover { color: blue; } a { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base?.rows.filter(r => r.type === 'moved')
    // hasStructuralOverlap=true で分析が進むが、a:hover が詳細度で常に勝つため競合なし
    expect(moved?.length).toBeGreaterThan(0)
    moved?.forEach(r => expect(r.conflictingProps).toHaveLength(0))
    expect(base?.hasWarning).toBe(false)
  })
})

describe('computeOrderRisks — hasStructuralOverlap: コンビネータは保守的に true', () => {
  it('.header .btn と .footer .btn — コンビネータで保守的 true → 同一詳細度なら競合を検出する', async () => {
    const oldCss = `.header .btn { color: red; } .footer .btn { color: blue; }`
    const newCss = `.footer .btn { color: blue; } .header .btn { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base?.rows.filter(r => r.type === 'moved')
    expect(moved?.length).toBeGreaterThan(0)
    // コンビネータ → 保守的 hasStructuralOverlap=true、同一詳細度で異なる値 → 競合検出
    expect(moved?.some(r => r.conflictingProps.some(p => p.prop === 'color'))).toBe(true)
    expect(base?.hasWarning).toBe(true)
  })
})

describe('computeOrderRisks — hasStructuralOverlap: 独立クラスは false', () => {
  it('.mogeta3-1 と .mogeta3-1--moge-ta — 独立クラス名でオーバーラップなし → 競合なし', async () => {
    const oldCss = `.mogeta3-1 { color: red; } .mogeta3-1--moge-ta { color: blue; }`
    const newCss = `.mogeta3-1--moge-ta { color: blue; } .mogeta3-1 { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base?.hasWarning).toBe(false)
    base?.rows.filter(r => r.type === 'moved').forEach(r =>
      expect(r.conflictingProps).toHaveLength(0)
    )
  })

  it('.order-p1-alpha と .order-p1-beta — 独立クラス名でオーバーラップなし → 競合なし', async () => {
    const oldCss = `.order-p1-alpha { color: red; } .order-p1-beta { color: blue; }`
    const newCss = `.order-p1-beta { color: blue; } .order-p1-alpha { color: red; }`
    const risks = await computeOrderRisks(oldCss, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base?.hasWarning).toBe(false)
    base?.rows.filter(r => r.type === 'moved').forEach(r =>
      expect(r.conflictingProps).toHaveLength(0)
    )
  })
})
