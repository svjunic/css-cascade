import { describe, it, expect } from 'vitest'
import { computeOrderRisks } from '../src/core/order-risk.js'
import { computeSpecificity, sameSpecificity } from '../src/core/specificity.js'
import { parseSelectorOrder } from '../src/core/parse.js'

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
  it('単純なセレクタリストを返す', () => {
    const css = '.a { color: red; } .b { color: blue; } .c { color: green; }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('グループセレクタを展開する', () => {
    const css = '.a, .b { color: red; } .c { color: blue; }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('@media 内のセレクタを別コンテキストで返す', () => {
    const css = '.a { color: red; } @media (max-width: 768px) { .b { color: blue; } }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a'])
    expect(order.get('@media (max-width: 768px)')).toEqual(['.b'])
  })

  it('ネストした @media は親子条件を結合したコンテキストで返す', () => {
    const css = `
      @media (min-width: 600px) {
        @media (hover: hover) {
          .a { color: red; }
        }
      }
    `
    const order = parseSelectorOrder(css)

    expect(order.get('@media (min-width: 600px) and (hover: hover)')).toEqual(['.a'])
    expect(order.has('@media (hover: hover)')).toBe(false)
  })

  it('@supports 内のセレクタを base ではなく @supports コンテキストで返す', () => {
    const css = '.a { display: block; } @supports (display: grid) { .a { display: grid; } }'
    const order = parseSelectorOrder(css)

    expect(order.get('base')).toEqual(['.a'])
    expect(order.get('@supports (display: grid)')).toEqual(['.a'])
  })

  it('@container 内のセレクタを base ではなく @container コンテキストで返す', () => {
    const css = '.card { padding: 8px; } @container card (min-width: 320px) { .card { padding: 12px; } }'
    const order = parseSelectorOrder(css)

    expect(order.get('base')).toEqual(['.card'])
    expect(order.get('@container card (min-width: 320px)')).toEqual(['.card'])
  })

  it('同じセレクタが複数回登場した場合は最終出現位置を使う', () => {
    // .a が最後に出現 → 順序は .b, .a
    const css = '.a { color: red; } .b { color: blue; } .a { margin: 0; }'
    const order = parseSelectorOrder(css)
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

  it('base コンテキストで moved 行が 2 件検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved).toHaveLength(2)
  })

  it('moved 行が (.s3, .s5) と (.s5, .s3) のペアになる', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    const selPairs = moved.map(r => [r.oldSelector, r.newSelector])
    expect(selPairs).toContainEqual(['.s3', '.s5'])
    expect(selPairs).toContainEqual(['.s5', '.s3'])
  })

  it('競合プロパティ (color, font-weight) が検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const movedRow = base.rows.find(r => r.type === 'moved' && r.oldSelector === '.s3')
    expect(movedRow.conflictingProps.length).toBeGreaterThan(0)
    const propNames = movedRow.conflictingProps.map(p => p.prop)
    expect(propNames).toContain('color')
    expect(propNames).toContain('font-weight')
  })

  it('moved 行は同一詳細度フラグが true', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('moved 行が 0 件', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(false)
    expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(0)
  })

  it('.s2 が deleted 行として現れる', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('moved 行が 0 件', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('結果が空配列', () => {
    const risks = computeOrderRisks(css, css)
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

  it('moved 行はあるが conflictingProps が空', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)
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

  it('moved 行が 2 件かつ sameSpecificity が false', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('moved 行はあるが conflictingProps は空（ID セレクタが順序に関係なく勝つ）', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })

  it('同一詳細度で値が異なるスワップは従来どおり競合を検出する', () => {
    const oldEq = `.a { color: red; } .b { color: blue; }`
    const newEq = `.b { color: blue; } .a { color: red; }`
    const risks = computeOrderRisks(oldEq, newEq)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    // 同一詳細度で値が異なるスワップでは、両方向の moved 行が競合を検出する
    expect(moved.every(row => row.conflictingProps.length > 0)).toBe(true)
  })
})

describe('computeOrderRisks — @media 内のスワップ', () => {
  const old = `
    @media (max-width: 768px) {
      .a { color: red; }
      .b { color: blue; }
    }
  `
  const newCss = `
    @media (max-width: 768px) {
      .b { color: blue; }
      .a { color: red; }
    }
  `

  it('@media コンテキストで moved 行を検知する', () => {
    const risks = computeOrderRisks(old, newCss)
    const media = risks.find(r => r.contextKey === '@media (max-width: 768px)')
    expect(media).toBeDefined()
    expect(media.hasWarning).toBe(true)
  })
})

describe('computeOrderRisks — semanticSelectors と importance/specificity', () => {
  it('semanticSelectors ON では属性セレクタのクォート差だけで moved を出さない', () => {
    const old = `.a [class*='list'] { color: red; } .b { color: blue; }`
    const newCss = `.a [class*=list] { color: red; } .b { color: blue; }`
    const risks = computeOrderRisks(old, newCss, { semanticSelectors: true })
    expect(risks).toHaveLength(0)
  })

  it('同一詳細度でも !important の勝者が変わらない順序変更は conflictingProps を出さない', () => {
    const old = `.a { color: red !important; } .b { color: blue; }`
    const newCss = `.b { color: blue; } .a { color: red !important; }`
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')

    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })

  it(':where() で詳細度が下がるセレクタは通常クラスとの順序変更を詳細度差として扱う', () => {
    const old = `:where(.a) { color: red; } .b { color: blue; }`
    const newCss = `.b { color: blue; } :where(.a) { color: red; }`
    const risks = computeOrderRisks(old, newCss)
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

  it('.mogeta2-1 と .mogeta2-1--moge-ta のスワップが検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)

    const moved = base.rows.filter(r => r.type === 'moved')
    const involvedSelectors = moved.flatMap(r => [r.oldSelector, r.newSelector])
    expect(involvedSelectors).toContain('.mogeta2-1')
    expect(involvedSelectors).toContain('.mogeta2-1--moge-ta')
  })

  it('.mogeta2-1 と .mogeta2-1-other は同値なので conflictingProps なし', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('moved 行が検知される（.a の移動）', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)
    expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(3)
  })

  it('相対順が不変の (.b,.c) ペアは conflictingProps が空', () => {
    const risks = computeOrderRisks(old, newCss)
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

  it('.a 絡みの反転ペア (.a,.b) は値が異なるため競合を検出する（ガードを正しくすり抜ける）', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // (.a,.b) は old/new で相対順が逆転した反転ペア。
    // .a=color:red / .b=color:blue で値が異なるため、順序依存の競合として報告される。
    const abPair = base.rows
      .filter(r => r.type === 'moved')
      .find(r =>
        (r.oldSelector === '.a' && r.newSelector === '.b') ||
        (r.oldSelector === '.b' && r.newSelector === '.a'),
      )
    expect(abPair).toBeDefined()
    expect(abPair.conflictingProps.length).toBeGreaterThan(0)
    expect(abPair.conflictingProps.map(p => p.prop)).toContain('color')
  })
})

describe('computeOrderRisks — @supports 内のスワップ', () => {
  const old = `
    @supports (display: grid) {
      .a { color: red; }
      .b { color: blue; }
    }
  `
  const newCss = `
    @supports (display: grid) {
      .b { color: blue; }
      .a { color: red; }
    }
  `

  it('@supports コンテキストで moved 行を検知する', () => {
    const risks = computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@supports (display: grid)')
    expect(ctx).toBeDefined()
    expect(ctx.hasWarning).toBe(true)
    expect(ctx.rows.filter(r => r.type === 'moved').length).toBeGreaterThan(0)
  })

  it('@supports 内のスワップで競合プロパティが検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@supports (display: grid)')
    const moved = ctx.rows.filter(r => r.type === 'moved')
    const hasConflict = moved.some(r => r.conflictingProps.length > 0)
    expect(hasConflict).toBe(true)
  })
})

describe('computeOrderRisks — @container 内のスワップ', () => {
  const old = `
    @container card (min-width: 320px) {
      .a { color: red; }
      .b { color: blue; }
    }
  `
  const newCss = `
    @container card (min-width: 320px) {
      .b { color: blue; }
      .a { color: red; }
    }
  `

  it('@container コンテキストで moved 行を検知する', () => {
    const risks = computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@container card (min-width: 320px)')
    expect(ctx).toBeDefined()
    expect(ctx.hasWarning).toBe(true)
    expect(ctx.rows.filter(r => r.type === 'moved').length).toBeGreaterThan(0)
  })

  it('@container 内のスワップで競合プロパティが検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const ctx = risks.find(r => r.contextKey === '@container card (min-width: 320px)')
    const moved = ctx.rows.filter(r => r.type === 'moved')
    const hasConflict = moved.some(r => r.conflictingProps.length > 0)
    expect(hasConflict).toBe(true)
  })
})

describe('computeOrderRisks — !important 同士のスワップ', () => {
  // 両方が !important の場合、後勝ちが適用される。
  // old: .b が後 → .b が勝ち (blue)
  // new: .a が後 → .a が勝ち (red)
  // → 有効値が変わるので conflictingProps に color が含まれる。
  const old = `
    .a { color: red !important; }
    .b { color: blue !important; }
  `
  const newCss = `
    .b { color: blue !important; }
    .a { color: red !important; }
  `

  it('両者 !important かつ値が異なるスワップでは競合を検出する', () => {
    const risks = computeOrderRisks(old, newCss)
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
  it('共通プロパティを持たないセレクタのスワップは hasWarning: false', () => {
    // Bug-3 (CONFIRMED): hasWarning は rows.some(r => r.type === 'moved') だけで判定しており
    // conflictingProps が空でも true になる
    const oldCss = `.layout { display: flex; } .color { color: red; }`
    const newCss = `.color { color: red; } .layout { display: flex; }`
    const risks = computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    expect(ctx?.hasWarning).toBe(false)
  })
})

describe('computeOrderRisks: 競合重複報告 [バグ]', () => {
  it('.foo↔.bar スワップで color 競合は1件のみ報告される', () => {
    // Bug-4 (CONFIRMED): pairing が {.foo→.bar, .bar→.foo} の2行を生成し
    // annotateMovedRow が両行で同じ color 競合を push する
    const oldCss = `.foo { color: red; } .bar { color: blue; }`
    const newCss = `.bar { color: blue; } .foo { color: red; }`
    const risks = computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    const colorConflicts = ctx?.rows?.flatMap(r => r.conflictingProps ?? []).filter(c => c.prop === 'color')
    expect(colorConflicts?.length).toBe(1)
  })
})

describe('computeOrderRisks: 新規プロパティ競合の見逃し [バグ]', () => {
  it('両セレクタが新規に同プロパティを宣言しつつ順序スワップした場合に競合を検出する', () => {
    // Bug-5 (CONFIRMED): pickWinner は oldA か oldX のどちらかが undefined のとき null を返し
    // if (!oldWinner || !newWinner) continue でスキップされるため検出されない
    const oldCss = `.a { font-size: 1em; } .b { margin: 0; }`
    const newCss = `.b { margin: 0; color: blue; } .a { font-size: 1em; color: red; }`
    const risks = computeOrderRisks(oldCss, newCss)
    const ctx = risks.find(r => r.contextKey === 'base')
    const movedRow = ctx?.rows?.find(r => r.type === 'moved')
    expect(movedRow?.conflictingProps?.some(c => c.prop === 'color')).toBe(true)
  })
})
