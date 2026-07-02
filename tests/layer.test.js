import { describe, it, expect } from 'vitest'
import { parseCss } from '../src/core/parse.js'
import { resolve } from '../src/core/resolve.js'
import { diffCss } from '../src/core/index.js'

/** 解決済み結果から特定セレクタ・プロパティの有効値を取り出す */
function eff(css, contextKey, selector, prop) {
  return resolve(parseCss(css)).get(contextKey)?.get(selector)?.get(prop)
}

function propDiff(oldCss, newCss, contextKey, selector, prop) {
  return diffCss(oldCss, newCss).get(contextKey)?.selectors?.get(selector)?.props?.get(prop)
}

describe('@layer: レイヤー順のカスケード', () => {
  it('後に宣言されたレイヤーが通常宣言で勝つ (@layer base, theme;)', () => {
    const css = `
      @layer base, theme;
      @layer theme { .a { color: blue; } }
      @layer base { .a { color: red; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'blue', important: false })
  })

  it('非レイヤーの通常宣言はすべてのレイヤーに勝つ', () => {
    const css = `
      @layer base, theme;
      .a { color: green; }
      @layer theme { .a { color: blue; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'green', important: false })
  })

  it('!important はレイヤー順を逆転させ、先に宣言されたレイヤーが勝つ', () => {
    const css = `
      @layer base, theme;
      @layer base { .a { color: red !important; } }
      @layer theme { .a { color: blue !important; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'red', important: true })
  })

  it('レイヤー内の !important は非レイヤーの通常宣言に勝つ', () => {
    const css = `
      @layer base;
      .a { color: green; }
      @layer base { .a { color: red !important; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'red', important: true })
  })

  it('物理的な記述順が同じでも、宣言レイヤー順で勝者が決まる', () => {
    // 物理順: theme ブロックが先、base ブロックが後（従来の後勝ちなら base=red）
    // だがレイヤー順は base, theme なので theme=blue が勝つ
    const css = `
      @layer base, theme;
      @layer theme { .a { color: blue; } }
      @layer base { .a { color: red; } }
    `
    expect(eff(css, 'base', '.a', 'color')?.value).toBe('blue')
  })
})

describe('@layer: レイヤー順のみの変更を有効値差分として検出する', () => {
  const base = `
    @layer theme { .a { color: blue; } }
    @layer base { .a { color: red; } }
  `
  const oldCss = `@layer base, theme;\n${base}`
  const newCss = `@layer theme, base;\n${base}`

  it('@layer 宣言順を反転すると .a の color が changed になる (blue → red)', () => {
    const prop = propDiff(oldCss, newCss, 'base', '.a', 'color')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('blue')
    expect(prop?.newValue).toBe('red')
  })

  it('!important のレイヤー順反転も有効値差分として検出する', () => {
    const body = `
      @layer base { .a { color: red !important; } }
      @layer theme { .a { color: blue !important; } }
    `
    const oldImp = `@layer base, theme;\n${body}`   // base が勝つ → red
    const newImp = `@layer theme, base;\n${body}`   // theme が勝つ → blue
    const prop = propDiff(oldImp, newImp, 'base', '.a', 'color')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('red')
    expect(prop?.newValue).toBe('blue')
  })
})

describe('@layer: 匿名レイヤーの順序', () => {
  it('後に宣言された匿名レイヤーが勝つ', () => {
    // 匿名レイヤーはそれぞれ別の優先度を持ち、後に宣言されたほうが強い
    const css = `
      @layer { .a { color: red; } }
      @layer { .a { color: blue; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'blue', important: false })
  })

  it('匿名レイヤーより非レイヤー通常宣言が勝つ', () => {
    const css = `
      @layer { .a { color: red; } }
      .a { color: green; }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'green', important: false })
  })
})

describe('@layer: 宣言文なし（暗黙の登録順）', () => {
  it('ステートメントなし: ブロックの出現順が登録順となり後が勝つ', () => {
    // @layer A, B; がない場合、ブロックの初出順がレイヤー順になる
    // theme が先 (rank 0)、base が後 (rank 1) → base が勝つ
    const css = `
      @layer theme { .a { color: blue; } }
      @layer base { .a { color: red; } }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'red', important: false })
  })

  it('同名レイヤーは最初の出現でのみ登録順が決まる（二度目以降は追記）', () => {
    // @layer base → rank 0、@layer theme → rank 1
    // base ブロックが複数あっても rank は変わらない
    const css = `
      @layer base { .a { color: red; } }
      @layer theme { .a { color: blue; } }
      @layer base { .a { color: green; } }
    `
    // theme (rank 1) が base (rank 0) に勝つ → blue
    // base の 2 回目のブロックはレイヤー rank が 0 のまま
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'blue', important: false })
  })
})

describe('@layer: @media 内の @layer', () => {
  it('@media 内の @layer ルールが @media コンテキストでカスケードされる', () => {
    const css = `
      @media (min-width: 600px) {
        @layer base { .a { color: red; } }
        @layer theme { .a { color: blue; } }
      }
    `
    // base が先登録 (rank 0)、theme が後登録 (rank 1) → @media コンテキストで theme が勝つ
    expect(eff(css, '@media (min-width: 600px)', '.a', 'color'))
      .toEqual({ value: 'blue', important: false })
  })

  it('@media コンテキストの @layer は base コンテキストに影響しない', () => {
    const css = `
      .a { color: green; }
      @media (min-width: 600px) {
        @layer base { .a { color: red; } }
        @layer theme { .a { color: blue; } }
      }
    `
    // base コンテキストは非レイヤーの .a { color: green; } のみ
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'green', important: false })
  })
})

describe('@layer: ネストレイヤー（サブレイヤー）', () => {
  it('@layer 内の @layer は "parent.child" の修飾名で登録される', () => {
    // base.typography (rank 1) は base (rank 0) に勝つ
    const css = `
      @layer base {
        .a { color: red; }
        @layer typography { .a { color: green; } }
      }
    `
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'green', important: false })
  })

  it('親レイヤーとサブレイヤーは独立した優先度を持つ', () => {
    // @layer base, base.utilities; なら base(0) < base.utilities(1) < 非レイヤー
    const css = `
      @layer base, base.utilities;
      @layer base.utilities { .a { color: blue; } }
      @layer base { .a { color: red; } }
      .a { color: green; }
    `
    // 非レイヤー green が最強
    expect(eff(css, 'base', '.a', 'color')).toEqual({ value: 'green', important: false })
  })
})
