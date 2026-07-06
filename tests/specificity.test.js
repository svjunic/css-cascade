import { describe, it, expect } from 'vitest'
import { computeSpecificity, sameSpecificity } from '../src/core/specificity.js'

// ─── computeSpecificity ───────────────────────────────────────────────────────

describe('computeSpecificity: 基本セレクタ', () => {
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
  it('複数擬似クラスは積算される (0,2,0)', () => {
    expect(computeSpecificity(':hover:focus')).toEqual([0, 2, 0])
  })
})

describe('computeSpecificity: レガシー擬似要素（単一コロン）', () => {
  it(':before は擬似要素として c++ (0,0,1)', () => {
    expect(computeSpecificity(':before')).toEqual([0, 0, 1])
  })
  it(':after は擬似要素として c++ (0,0,1)', () => {
    expect(computeSpecificity(':after')).toEqual([0, 0, 1])
  })
  it(':first-line は擬似要素として c++ (0,0,1)', () => {
    expect(computeSpecificity(':first-line')).toEqual([0, 0, 1])
  })
  it(':first-letter は擬似要素として c++ (0,0,1)', () => {
    expect(computeSpecificity(':first-letter')).toEqual([0, 0, 1])
  })
})

describe('computeSpecificity: :not() (CSS Selectors L4)', () => {
  it(':not() 単一引数の詳細度を引き継ぐ', () => {
    expect(computeSpecificity(':not(.a)')).toEqual([0, 1, 0])
  })
  it(':not() カンマ区切り複数引数は最大値を採用する', () => {
    expect(computeSpecificity(':not(.a, .b)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':not(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not() 内の括弧ありセレクタ (:is()) でカンマを誤分割しない', () => {
    expect(computeSpecificity(':not(:is(.a, .b))')).toEqual([0, 1, 0])
  })
  it(':not() 内の括弧ありセレクタ (:nth-child()) でカンマを誤分割しない', () => {
    expect(computeSpecificity(':not(:nth-child(2n of .a, .b))')).toEqual([0, 2, 0])
  })
})

describe('computeSpecificity: :is() / :matches() (CSS Selectors L4)', () => {
  it(':is() は引数の最大詳細度を引き継ぐ', () => {
    expect(computeSpecificity(':is(#id)')).toEqual([1, 0, 0])
    expect(computeSpecificity(':is(.foo)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':is(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not(:is(#id)) は [1,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(#id))')).toEqual([1, 0, 0])
  })
  it(':matches() は :is() と同じ詳細度を返す（旧エイリアス）', () => {
    expect(computeSpecificity(':matches(.foo)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':matches(#id)')).toEqual([1, 0, 0])
  })
})

describe('computeSpecificity: :where()', () => {
  it(':where() は常に詳細度 0', () => {
    expect(computeSpecificity(':where(.foo)')).toEqual([0, 0, 0])
    expect(computeSpecificity(':where(#id)')).toEqual([0, 0, 0])
  })
  it(':not(:is(:where(.a,.b))) は二重ネストで [0,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(:where(.a,.b)))')).toEqual([0, 0, 0])
  })
})

describe('computeSpecificity: :has() (CSS Selectors L4)', () => {
  it(':has() は引数の最大詳細度を引き継ぐ', () => {
    expect(computeSpecificity(':has(.foo)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':has(#id)')).toEqual([1, 0, 0])
  })
  it(':has() の複数引数は最大値を採用する', () => {
    expect(computeSpecificity(':has(.a, #id)')).toEqual([1, 0, 0])
  })
})

describe('computeSpecificity: :nth-child() / :nth-last-child()', () => {
  it(':nth-child() は b++ (0,1,0)', () => {
    expect(computeSpecificity(':nth-child(2)')).toEqual([0, 1, 0])
  })
  it(':nth-child(An+B of S) は b++ + S の MAX 詳細度 (0,2,0)', () => {
    expect(computeSpecificity(':nth-child(2n of .foo)')).toEqual([0, 2, 0])
  })
  it(':nth-last-child() は :nth-child と対称 (0,1,0)', () => {
    expect(computeSpecificity(':nth-last-child(2)')).toEqual([0, 1, 0])
  })
  it(':nth-last-child(An+B of S) は b++ + S の MAX 詳細度 (0,2,0)', () => {
    expect(computeSpecificity(':nth-last-child(2n of .foo)')).toEqual([0, 2, 0])
  })
  it(':is(.a:not(:nth-child(2))) は二重ネストで [0,2,0] を返す', () => {
    expect(computeSpecificity(':is(.a:not(:nth-child(2)))')).toEqual([0, 2, 0])
  })
})

describe('computeSpecificity: :host() / :host-context() (CSS Scoping L1)', () => {
  it(':host() は自身の b++ + 引数の MAX 詳細度 (0,2,0)', () => {
    expect(computeSpecificity(':host(.foo)')).toEqual([0, 2, 0])
  })
  it(':host-context() は自身の b++ + 引数の MAX 詳細度 (0,2,0)', () => {
    expect(computeSpecificity(':host-context(.foo)')).toEqual([0, 2, 0])
  })
  it(':host(#id) は自身 b++ + #id a++ = (1,1,0)', () => {
    expect(computeSpecificity(':host(#id)')).toEqual([1, 1, 0])
  })
})

describe('computeSpecificity: ::slotted() / ::cue()', () => {
  it('::slotted(.foo) は擬似要素 c++ + 引数 .foo b++ = (0,1,1)', () => {
    expect(computeSpecificity('::slotted(.foo)')).toEqual([0, 1, 1])
  })
  it('::cue(.foo) は擬似要素 c++ + 引数 .foo b++ = (0,1,1)', () => {
    expect(computeSpecificity('::cue(.foo)')).toEqual([0, 1, 1])
  })
  it('::slotted(#id) は擬似要素 c++ + 引数 #id a++ = (1,0,1)', () => {
    expect(computeSpecificity('::slotted(#id)')).toEqual([1, 0, 1])
  })
})

describe('computeSpecificity: ::part() (CSS Shadow Parts L1)', () => {
  it('::part(foo) は擬似要素 c++ のみ (part 引数は詳細度に寄与しない)', () => {
    expect(computeSpecificity('::part(foo)')).toEqual([0, 0, 1])
  })
  it('::part(foo bar) も c++ のみ', () => {
    expect(computeSpecificity('::part(foo bar)')).toEqual([0, 0, 1])
  })
})

describe('computeSpecificity: CSS エスケープ', () => {
  it('.md\\:flex は1クラスとして b++ (0,1,0)', () => {
    expect(computeSpecificity('.md\\:flex')).toEqual([0, 1, 0])
  })
  it('.sm\\:hover\\:text-red は1クラスとして b++ (0,1,0)', () => {
    expect(computeSpecificity('.sm\\:hover\\:text-red')).toEqual([0, 1, 0])
  })
})

// ─── sameSpecificity ──────────────────────────────────────────────────────────

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

// ─── バグ検出テスト ────────────────────────────────────────────────────────────

describe('computeSpecificity: :is() 内の擬似要素 [バグ]', () => {
  it(':is(::before, div) は [0,0,1] — ::before と div の最大値', () => {
    // Bug-2 (CONFIRMED): line 140 の /::[\w-]+.../g が s 全体を走査するため
    // :is() の引数抽出（line 156）より先に ::before を外側で c++ してしまう
    // 現状: [0,0,2] を返す
    expect(computeSpecificity(':is(::before, div)')).toEqual([0, 0, 1])
  })

  it(':is(::slotted(.foo), div) は [0,1,1]', () => {
    // Bug-10 (PLAUSIBLE): ::slotted も同様に :is() 処理前に外側で b++ と c++ される
    // 現状: [0,1,2] を返す
    expect(computeSpecificity(':is(::slotted(.foo), div)')).toEqual([0, 1, 1])
  })
})
