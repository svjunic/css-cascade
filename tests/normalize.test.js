import { describe, it, expect } from 'vitest'
import {
  normalizeSelector,
  normalizeMediaCondition,
  canonicalizeValue,
  canonicalizeSelector,
} from '../src/core/normalize.js'

// ─── normalizeSelector ────────────────────────────────────────────────────────

describe('normalizeSelector', () => {
  it('前後の空白をトリムする', () => {
    expect(normalizeSelector('  .a  ')).toBe('.a')
  })

  it('連続空白を1スペースに圧縮する', () => {
    expect(normalizeSelector('.a  .b')).toBe('.a .b')
  })

  it('コンビネータ > の周辺空白を正規化する', () => {
    expect(normalizeSelector('div>p')).toBe('div > p')
    expect(normalizeSelector('div >p')).toBe('div > p')
    expect(normalizeSelector('div> p')).toBe('div > p')
    expect(normalizeSelector('div > p')).toBe('div > p')
  })

  it('コンビネータ + の周辺空白を正規化する', () => {
    expect(normalizeSelector('div+p')).toBe('div + p')
    expect(normalizeSelector('div + p')).toBe('div + p')
  })

  it('コンビネータ ~ の周辺空白を正規化する', () => {
    expect(normalizeSelector('div~p')).toBe('div ~ p')
    expect(normalizeSelector('div ~ p')).toBe('div ~ p')
  })

  it('複合セレクタの空白を正規化する', () => {
    expect(normalizeSelector('.a  >  .b  +  .c')).toBe('.a > .b + .c')
  })
})

// ─── normalizeMediaCondition ──────────────────────────────────────────────────

describe('normalizeMediaCondition', () => {
  it('コロン前後のスペースを統一する', () => {
    expect(normalizeMediaCondition('max-width:768px')).toBe('max-width: 768px')
    expect(normalizeMediaCondition('max-width :768px')).toBe('max-width: 768px')
    expect(normalizeMediaCondition('max-width : 768px')).toBe('max-width: 768px')
  })

  it('and キーワード前後のスペースを統一する', () => {
    expect(normalizeMediaCondition('(a)and(b)')).toBe('(a) and (b)')
    expect(normalizeMediaCondition('(a) and (b)')).toBe('(a) and (b)')
    expect(normalizeMediaCondition('(a)AND(b)')).toBe('(a) AND (b)')
  })

  it('or キーワード前後のスペースを統一する', () => {
    expect(normalizeMediaCondition('(a)or(b)')).toBe('(a) or (b)')
  })

  it('not キーワード前後のスペースを統一する', () => {
    expect(normalizeMediaCondition('not(print)')).toBe('not (print)')
  })

  it('複合条件のコロンと and を同時に正規化する', () => {
    expect(normalizeMediaCondition('(min-width:521px)and(max-width:960px)'))
      .toBe('(min-width: 521px) and (max-width: 960px)')
  })

  it('前後の空白をトリムする', () => {
    expect(normalizeMediaCondition('  screen  ')).toBe('screen')
  })

  it('url() 内のコロンはコロン正規化の対象外になる', () => {
    const result = normalizeMediaCondition('(background: url(https://example.com))')
    expect(result).toContain('https://example.com')
    expect(result).not.toContain('https: //example.com')
  })
})

// ─── canonicalizeValue ────────────────────────────────────────────────────────

describe('canonicalizeValue', () => {
  it('シングルクォートを除去する', () => {
    expect(canonicalizeValue("'serif'")).toBe('serif')
  })

  it('ダブルクォートを除去する', () => {
    expect(canonicalizeValue('"serif"')).toBe('serif')
  })

  it('カンマ周辺の空白を除去する', () => {
    expect(canonicalizeValue('a, b')).toBe('a,b')
    expect(canonicalizeValue('a , b')).toBe('a,b')
    expect(canonicalizeValue('a,b')).toBe('a,b')
  })

  it('先頭ゼロを補完する (.2em → 0.2em)', () => {
    expect(canonicalizeValue('.2em')).toBe('0.2em')
  })

  it('負の先頭ゼロを補完する (-.2em → -0.2em)', () => {
    expect(canonicalizeValue('-.2em')).toBe('-0.2em')
  })

  it('calc 内の先頭ゼロを補完して * / スペースを除去する', () => {
    expect(canonicalizeValue('calc(1 * .2em)')).toBe('calc(1*0.2em)')
  })

  it('calc 内の負の先頭ゼロを補完する', () => {
    expect(canonicalizeValue('calc(1 * -.2em)')).toBe('calc(1*-0.2em)')
  })

  it('* / 周辺の空白を除去する', () => {
    expect(canonicalizeValue('a * b')).toBe('a*b')
    expect(canonicalizeValue('a / b')).toBe('a/b')
  })

  it('16進カラー3桁を6桁に展開して小文字化する', () => {
    expect(canonicalizeValue('#FFF')).toBe('#ffffff')
    expect(canonicalizeValue('#fff')).toBe('#ffffff')
    expect(canonicalizeValue('#abc')).toBe('#aabbcc')
  })

  it('16進カラー4桁（#rgba）を8桁に展開して小文字化する', () => {
    expect(canonicalizeValue('#ffff')).toBe('#ffffffff')
    expect(canonicalizeValue('#FFFF')).toBe('#ffffffff')
  })

  it('16進カラー6桁を小文字化する（展開しない）', () => {
    expect(canonicalizeValue('#AABBCC')).toBe('#aabbcc')
    expect(canonicalizeValue('#aabbcc')).toBe('#aabbcc')
  })

  it('複数値プロパティのカンマとクォートを同時に正規化する', () => {
    expect(canonicalizeValue("'Noto Sans JP', sans-serif")).toBe('Noto Sans JP,sans-serif')
  })
})

// ─── canonicalizeSelector ─────────────────────────────────────────────────────

describe('canonicalizeSelector', () => {
  it('属性セレクタ内のシングルクォートを除去する', () => {
    expect(canonicalizeSelector("[class*='list']")).toBe('[class*=list]')
  })

  it('属性セレクタ内のダブルクォートを除去する', () => {
    expect(canonicalizeSelector('[class*="list"]')).toBe('[class*=list]')
  })

  it('属性セレクタ内の演算子前後の空白を除去する', () => {
    expect(canonicalizeSelector("[data-value = 'foo']")).toBe('[data-value=foo]')
    expect(canonicalizeSelector('[data-value ~= foo]')).toBe('[data-value~=foo]')
  })

  it('クォートなしの属性セレクタはそのまま', () => {
    expect(canonicalizeSelector('[class*=list]')).toBe('[class*=list]')
  })

  it('normalizeSelector の正規化も適用される', () => {
    expect(canonicalizeSelector('div  > .a  [class*="list"]')).toBe('div > .a [class*=list]')
  })

  it(':not() 内の属性セレクタのクォートも除去される', () => {
    expect(canonicalizeSelector(":not([class*='list'])")).toBe(':not([class*=list])')
  })
})

// ─── バグ検出テスト ────────────────────────────────────────────────────────────

describe('normalizeMediaCondition: @supports selector() 引数保護 [バグ]', () => {
  it('selector() 内の擬似クラスコロンを変換しない', () => {
    // Bug-1 (CONFIRMED): line 44 の /\s*:\s*/g が a:not(.foo) の : を '：' に変換し
    // line 48 の \b(not|only)\s*\( が :n の境界で発火して not( → not ( になる
    // 現状: 'selector(a: not (.foo))' に破壊される
    expect(normalizeMediaCondition('selector(a:not(.foo))')).toBe('selector(a:not(.foo))')
  })

  it('selector() 内の :checked 等の擬似クラスを変換しない', () => {
    // 現状: 'selector(input: checked)' になる
    expect(normalizeMediaCondition('selector(input:checked)')).toBe('selector(input:checked)')
  })

  it('@supports カスタムプロパティ値内の not() は変換しない', () => {
    // Bug-8 (CONFIRMED): \b(not|only)\s*\( が (--x: not(a)) の値部分の not( にマッチし
    // (--x: not (a)) に変換してしまう
    expect(normalizeMediaCondition('(--x: not(a))')).toBe('(--x: not(a))')
  })

  it('@supports カスタムプロパティ値に url() と not() が共存する場合 NUL バイトが残らない', () => {
    // Bug-9 (CONFIRMED): url() スロット済みマーカーを含む valuePart が二重スロットされ
    // 単一パス復元では内部の \x00N\x00 が展開されず NUL バイトが混入する
    const result = normalizeMediaCondition('(--x: url(a.png) not(b))')
    expect(result).toBe('(--x: url(a.png) not(b))')
    expect(result).not.toContain('\x00')
  })

  it('( の直後に空白があるフィーチャクエリでも not() を保護する', () => {
    // Bug-10: propMatch が先頭空白を考慮しないためスロット保護が効かない
    expect(normalizeMediaCondition('( --x: not(a) )')).toBe('( --x: not(a) )')
  })
})

describe('canonicalizeValue: calc マイナス空白の一貫性 [バグ]', () => {
  it('calc(a-.5em) と calc(a - .5em) は同じ正規形になる', () => {
    // Bug-7 (CONFIRMED): '-' が pre にマッチするか ' ' が pre にマッチするかで
    // それぞれ 'calc(a-0.5em)' と 'calc(a - 0.5em)' になり正規形が異なる
    expect(canonicalizeValue('calc(a-.5em)')).toBe(canonicalizeValue('calc(a - .5em)'))
  })
})
