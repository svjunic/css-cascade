import { describe, it, expect } from 'vitest'
import { parseCss } from '../src/core/parse-cssom.js'
import { resolve } from '../src/core/resolve.js'

/** 解決済み結果から特定セレクタのプロパティMapを取り出すヘルパー */
function getProps(resolved, contextKey, selector) {
  return resolved.get(contextKey)?.get(selector) || new Map()
}

describe('resolve: 基本的な後勝ちルール', () => {
  it('同一プロパティが2回定義された場合、後の値が勝つ', async () => {
    const css = `.a { color: red; color: blue; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: false })
  })

  it('複数の別ルールにまたがる同一セレクタも後勝ちで集約される', async () => {
    const css = `.a { color: red; } .a { color: blue; margin: 0; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: false })
    expect(props.get('margin')).toEqual({ value: '0px', important: false })
  })

  it('異なるプロパティはすべて保持される', async () => {
    const css = `.a { color: red; font-size: 16px; margin: 0; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.size).toBe(3)
    expect(props.get('color')?.value).toBe('red')
    expect(props.get('font-size')?.value).toBe('16px')
    expect(props.get('margin')?.value).toBe('0px')
  })
})

describe('resolve: !important ルール', () => {
  it('!important は通常値を上書きし、その後の通常値で上書きされない', async () => {
    const css = `.a { color: red !important; color: blue; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'red', important: true })
  })

  it('!important 同士は後勝ちになる', async () => {
    const css = `.a { color: red !important; color: blue !important; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'blue', important: true })
  })

  it('通常値 → !important → 通常値 の順では !important が残る', async () => {
    const css = `.a { color: red; color: green !important; color: blue; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'green', important: true })
  })

  it('別ルールで !important が定義された後、通常値で上書きされない', async () => {
    const css = `.a { color: red !important; } .a { color: blue; }`
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, 'base', '.a')
    expect(props.get('color')).toEqual({ value: 'red', important: true })
  })
})

describe('resolve: グループセレクタの分解', () => {
  it('.a, .b は独立したセレクタとして扱われる', async () => {
    const css = `.a, .b { color: red; }`
    const resolved = resolve(await parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('red')
    expect(getProps(resolved, 'base', '.b').get('color')?.value).toBe('red')
  })

  it('グループセレクタ内で各セレクタが個別に後勝ちルールに従う', async () => {
    const css = `.a, .b { color: red; } .a { color: blue; }`
    const resolved = resolve(await parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('blue')
    expect(getProps(resolved, 'base', '.b').get('color')?.value).toBe('red')
  })
})

describe('resolve: @media コンテキストの分離', () => {
  it('@media 内のルールは独立コンテキストに入り base と混ざらない', async () => {
    const css = `
      .a { color: blue; }
      @media (max-width: 768px) { .a { color: red; } }
    `
    const resolved = resolve(await parseCss(css))
    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('blue')
    expect(getProps(resolved, '@media (max-width: 768px)', '.a').get('color')?.value).toBe('red')
  })

  it('同条件の @media が複数あれば同一コンテキストに統合される', async () => {
    const css = `
      @media (min-width: 1024px) { .a { color: red; } }
      @media (min-width: 1024px) { .a { margin: 0; color: blue; } }
    `
    const resolved = resolve(await parseCss(css))
    const props = getProps(resolved, '@media (min-width: 1024px)', '.a')
    expect(props.get('color')?.value).toBe('blue')
    expect(props.get('margin')?.value).toBe('0px')
  })

  it('ネストした @media は親子条件を結合したコンテキストに入る', async () => {
    const css = `
      @media (min-width: 600px) {
        @media (hover: hover) {
          .a { color: red; }
        }
      }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, '@media (min-width: 600px) and (hover: hover)', '.a').get('color')?.value).toBe('red')
    expect(getProps(resolved, '@media (hover: hover)', '.a').size).toBe(0)
    expect(getProps(resolved, 'base', '.a').size).toBe(0)
  })
})

describe('resolve: 条件付き at-rule コンテキストの分離', () => {
  it('@supports 内のルールは独立コンテキストに入り base と混ざらない', async () => {
    const css = `
      .a { display: block; }
      @supports (display: grid) { .a { display: grid; } }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, 'base', '.a').get('display')?.value).toBe('block')
    expect(getProps(resolved, '@supports (display: grid)', '.a').get('display')?.value).toBe('grid')
  })

  it('@container 内のルールは独立コンテキストに入り base と混ざらない', async () => {
    const css = `
      .card { padding: 8px; }
      @container card (min-width: 320px) { .card { padding: 12px; } }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, 'base', '.card').get('padding')?.value).toBe('8px')
    expect(getProps(resolved, '@container card (min-width: 320px)', '.card').get('padding')?.value).toBe('12px')
  })

  it('異種 at-rule のネストは順序に依存しない同一コンテキストに集約される', async () => {
    // @media 内 @supports と @supports 内 @media は論理 AND として等価なので
    // 同じコンテキストキーに集約される（ネスト順序に依存しない）。
    const mediaOuter = `@media (min-width: 600px) { @supports (display: grid) { .a { color: red; } } }`
    const supportsOuter = `@supports (display: grid) { @media (min-width: 600px) { .a { color: red; } } }`

    const keyMediaOuter = [...resolve(await parseCss(mediaOuter)).keys()]
    const keySupportsOuter = [...resolve(await parseCss(supportsOuter)).keys()]

    expect(keyMediaOuter).toEqual(keySupportsOuter)
    expect(keyMediaOuter).toEqual(['@media (min-width: 600px) and @supports (display: grid)'])
  })
})

describe('resolve: @font-face と @keyframes', () => {
  it('@font-face は family/weight/style の複合キーで別 font を区別する', async () => {
    const css = `
      @font-face {
        font-family: "Inter";
        font-weight: 400;
        src: url(inter-regular.woff2);
      }
      @font-face {
        font-family: "Inter";
        font-weight: 700;
        src: url(inter-bold.woff2);
      }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, '@font-face', 'inter/400/normal').get('src')?.value).toBe('url("inter-regular.woff2")')
    expect(getProps(resolved, '@font-face', 'inter/700/normal').get('src')?.value).toBe('url("inter-bold.woff2")')
  })

  it('@font-face の同一 family/weight/style は後勝ちで解決される', async () => {
    const css = `
      @font-face {
        font-family: "Inter";
        font-weight: 400;
        src: url(old.woff2);
      }
      @font-face {
        font-family: "Inter";
        font-weight: 400;
        src: url(new.woff2);
      }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, '@font-face', 'inter/400/normal').get('src')?.value).toBe('url("new.woff2")')
  })

  it('@keyframes は animation name ごとのコンテキストで stop を疑似セレクタとして扱う', async () => {
    const css = `
      @keyframes fade {
        from { opacity: 0; }
        50%, 75% { opacity: .5; }
        to { opacity: 1; }
      }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, '@keyframes fade', 'from').get('opacity')?.value).toBe('0')
    expect(getProps(resolved, '@keyframes fade', '50%, 75%').get('opacity')?.value).toBe('0.5')
    expect(getProps(resolved, '@keyframes fade', 'to').get('opacity')?.value).toBe('1')
  })

  it('@-webkit-keyframes は @keyframes と同一コンテキストへ正規化される', async () => {
    const css = `
      @-webkit-keyframes spin { to { transform: rotate(180deg); } }
      @keyframes spin { to { transform: rotate(360deg); } }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, '@keyframes spin', 'to').get('transform')?.value).toBe('rotate(360deg)')
    expect(resolved.has('@-webkit-keyframes spin')).toBe(false)
  })
})

describe('resolve: @layer と条件付き at-rule の組み合わせ', () => {
  it('@media 内でもレイヤー順は同一コンテキスト内の勝者判定にだけ効く', async () => {
    const css = `
      @layer base, theme;
      @media (min-width: 600px) {
        @layer theme { .a { color: blue; } }
        @layer base { .a { color: red; } }
      }
      .a { color: green; }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, 'base', '.a').get('color')?.value).toBe('green')
    expect(getProps(resolved, '@media (min-width: 600px)', '.a').get('color')?.value).toBe('blue')
  })

  it('@supports 内の !important layer 順反転は base へ漏れない', async () => {
    const css = `
      @layer reset, components;
      .a { color: green; }
      @supports (display: grid) {
        @layer reset { .a { color: red !important; } }
        @layer components { .a { color: blue !important; } }
      }
    `
    const resolved = resolve(await parseCss(css))

    expect(getProps(resolved, 'base', '.a').get('color')).toEqual({ value: 'green', important: false })
    expect(getProps(resolved, '@supports (display: grid)', '.a').get('color')).toEqual({ value: 'red', important: true })
  })
})

describe('resolve: セレクタ正規化', () => {
  it('余分な空白があるセレクタは正規化後に同一として集約される', async () => {
    const css = `.a  .b { color: red; } .a .b { color: blue; }`
    const resolved = resolve(await parseCss(css))
    // 正規化後どちらも '.a .b'
    const props = getProps(resolved, 'base', '.a .b')
    expect(props.get('color')?.value).toBe('blue')
  })
})
