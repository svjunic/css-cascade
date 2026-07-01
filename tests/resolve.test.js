import { describe, it, expect } from 'vitest'
import { parseCss } from '../src/core/parse.js'
import { resolve } from '../src/core/resolve.js'

/** 解決済み結果から特定セレクタのプロパティMapを取り出すヘルパー */
function getProps(resolved, contextKey, selector) {
  return resolved.get(contextKey)?.get(selector) || new Map()
}

describe('resolve: 基本的な後勝ちルール', () => {
  it('同一プロパティが2回定義された場合、後の値が勝つ', () => {
    const css = `.a { color: red; color: blue; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: false })
  })

  it('複数の別ルールにまたがる同一セレクタも後勝ちで集約される', () => {
    const css = `.a { color: red; } .a { color: blue; margin: 0; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: false })
    expect(props.get('margin')).toEqual({ value: '0', important: false })
  })

  it('異なるプロパティはすべて保持される', () => {
    const css = `.a { color: red; font-size: 16px; margin: 0; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.size).toBe(3)
    expect(props.get('color')?.value).toBe('red')
    expect(props.get('font-size')?.value).toBe('16px')
    expect(props.get('margin')?.value).toBe('0')
  })
})

describe('resolve: !important ルール', () => {
  it('!important は通常値を上書きし、その後の通常値で上書きされない', () => {
    const css = `.a { color: red !important; color: blue; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'red', important: true })
  })

  it('!important 同士は後勝ちになる', () => {
    const css = `.a { color: red !important; color: blue !important; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: true })
  })

  it('通常値 → !important → 通常値 の順では !important が残る', () => {
    const css = `.a { color: red; color: green !important; color: blue; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'green', important: true })
  })

  it('別ルールで !important が定義された後、通常値で上書きされない', () => {
    const css = `.a { color: red !important; } .a { color: blue; }`
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'red', important: true })
  })
})

describe('resolve: グループセレクタの分解', () => {
  it('.a, .b は独立したセレクタとして扱われる', () => {
    const css = `.a, .b { color: red; }`
    const resolved = resolve(parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('red')
    expect(getProps(resolved, 'base', '.b').get('color')?.value).toBe('red')
  })

  it('グループセレクタ内で各セレクタが個別に後勝ちルールに従う', () => {
    const css = `.a, .b { color: red; } .a { color: blue; }`
    const resolved = resolve(parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('blue')
    expect(getProps(resolved, 'base', '.b').get('color')?.value).toBe('red')
  })
})

describe('resolve: @media コンテキストの分離', () => {
  it('@media 内のルールは独立コンテキストに入り base と混ざらない', () => {
    const css = `
      .a { color: blue; }
      @media (max-width: 768px) { .a { color: red; } }
    `
    const resolved = resolve(parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('blue')
    expect(getProps(resolved, '@media (max-width: 768px)', '.a').get('color')?.value).toBe('red')
  })

  it('同条件の @media が複数あれば同一コンテキストに統合される', () => {
    const css = `
      @media (min-width: 1024px) { .a { color: red; } }
      @media (min-width: 1024px) { .a { margin: 0; color: blue; } }
    `
    const resolved = resolve(parseCss(css))
    const props = getProps(resolved, '@media (min-width: 1024px)', '.a')
    expect(props.get('color')?.value).toBe('blue')
    expect(props.get('margin')?.value).toBe('0')
  })

  it('ネストした @media は親子条件を結合したコンテキストに入る', () => {
    const css = `
      @media (min-width: 600px) {
        @media (hover: hover) {
          .a { color: red; }
        }
      }
    `
    const resolved = resolve(parseCss(css))

    expect(getProps(resolved, '@media (min-width: 600px) and (hover: hover)', '.a').get('color')?.value).toBe('red')
    expect(getProps(resolved, '@media (hover: hover)', '.a').size).toBe(0)
    expect(getProps(resolved, 'base', '.a').size).toBe(0)
  })
})

describe('resolve: 条件付き at-rule コンテキストの分離', () => {
  it('@supports 内のルールは独立コンテキストに入り base と混ざらない', () => {
    const css = `
      .a { display: block; }
      @supports (display: grid) { .a { display: grid; } }
    `
    const resolved = resolve(parseCss(css))

    expect(getProps(resolved, 'base', '.a').get('display')?.value).toBe('block')
    expect(getProps(resolved, '@supports (display: grid)', '.a').get('display')?.value).toBe('grid')
  })

  it('@container 内のルールは独立コンテキストに入り base と混ざらない', () => {
    const css = `
      .card { padding: 8px; }
      @container card (min-width: 320px) { .card { padding: 12px; } }
    `
    const resolved = resolve(parseCss(css))

    expect(getProps(resolved, 'base', '.card').get('padding')?.value).toBe('8px')
    expect(getProps(resolved, '@container card (min-width: 320px)', '.card').get('padding')?.value).toBe('12px')
  })

  it('異種 at-rule のネストは順序に依存しない同一コンテキストに集約される', () => {
    // @media 内 @supports と @supports 内 @media は論理 AND として等価なので
    // 同じコンテキストキーに集約される（ネスト順序に依存しない）。
    const mediaOuter = `@media (min-width: 600px) { @supports (display: grid) { .a { color: red; } } }`
    const supportsOuter = `@supports (display: grid) { @media (min-width: 600px) { .a { color: red; } } }`

    const keyMediaOuter = [...resolve(parseCss(mediaOuter)).keys()]
    const keySupportsOuter = [...resolve(parseCss(supportsOuter)).keys()]

    expect(keyMediaOuter).toEqual(keySupportsOuter)
    expect(keyMediaOuter).toEqual(['@media (min-width: 600px) and @supports (display: grid)'])
  })
})

describe('resolve: セレクタ正規化', () => {
  it('余分な空白があるセレクタは正規化後に同一として集約される', () => {
    const css = `.a  .b { color: red; } .a .b { color: blue; }`
    const resolved = resolve(parseCss(css))
    // 正規化後どちらも '.a .b'
    const props = getProps(resolved, 'base', '.a .b')
    expect(props.get('color')?.value).toBe('blue')
  })
})
