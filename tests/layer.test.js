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
