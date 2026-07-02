import { describe, it, expect } from 'vitest'
import { parseCss } from '../src/core/parse.js'
import { resolve } from '../src/core/resolve.js'
import { diff } from '../src/core/diff.js'

/** CSS 文字列2つを受け取り diff 結果を返すヘルパー */
function diffCss(oldCss, newCss, diffOptions = {}, parseOptions = {}) {
  return diff(resolve(parseCss(oldCss, parseOptions)), resolve(parseCss(newCss, parseOptions)), diffOptions)
}

function getSelectorDiff(diffResult, contextKey, selector) {
  return diffResult.get(contextKey)?.selectors?.get(selector)
}

function getPropDiff(diffResult, contextKey, selector, prop) {
  return getSelectorDiff(diffResult, contextKey, selector)?.props?.get(prop)
}

describe('diff: 変更なし', () => {
  it('同一 CSS は全プロパティが unchanged', () => {
    const css = `.a { color: red; margin: 0; }`
    const result = diffCss(css, css)
    const prop = getPropDiff(result, 'base', '.a', 'color')
    expect(prop?.status).toBe('unchanged')
    expect(prop?.value).toBe('red')
  })

  it('整形違いだけ（改行・スペース）は差分なしになる', () => {
    const old = `.a { color: red; font-size: 16px; }`
    const next = `.a{color:red;font-size:16px;}`
    const result = diffCss(old, next)
    const sel = getSelectorDiff(result, 'base', '.a')
    expect(sel?.status).toBe('unchanged')
    expect(sel?.changeCount).toBe(0)
  })

  it('コンテキスト全体が変更なしなら changeCount が 0', () => {
    const css = `.a { color: red; }`
    const result = diffCss(css, css)
    expect(result.get('base')?.changeCount).toBe(0)
    expect(result.get('base')?.status).toBe('unchanged')
  })
})

describe('diff: プロパティの追加・削除・変更', () => {
  it('新しいプロパティが追加される', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red; margin: 0; }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, 'base', '.a', 'margin')
    expect(prop?.status).toBe('added')
    expect(prop?.newValue).toBe('0')
  })

  it('プロパティが削除される', () => {
    const old = `.a { color: red; margin: 0; }`
    const next = `.a { color: red; }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, 'base', '.a', 'margin')
    expect(prop?.status).toBe('removed')
    expect(prop?.oldValue).toBe('0')
  })

  it('プロパティ値が変更される', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: blue; }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, 'base', '.a', 'color')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('red')
    expect(prop?.newValue).toBe('blue')
  })

  it('!important が付与された場合に changed になる', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red !important; }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, 'base', '.a', 'color')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldImportant).toBe(false)
    expect(prop?.newImportant).toBe(true)
  })
})

describe('diff: セレクタの追加・削除', () => {
  it('セレクタ全体が新規追加される', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red; } .b { color: blue; }`
    const result = diffCss(old, next)
    const sel = getSelectorDiff(result, 'base', '.b')
    expect(sel?.status).toBe('added')
  })

  it('セレクタ全体が削除される', () => {
    const old = `.a { color: red; } .b { color: blue; }`
    const next = `.a { color: red; }`
    const result = diffCss(old, next)
    const sel = getSelectorDiff(result, 'base', '.b')
    expect(sel?.status).toBe('removed')
  })
})

describe('diff: @media コンテキスト', () => {
  it('@media 内の変更は @media コンテキストに記録され base に影響しない', () => {
    const old = `.a { color: red; } @media (max-width: 768px) { .a { color: blue; } }`
    const next = `.a { color: red; } @media (max-width: 768px) { .a { color: green; } }`
    const result = diffCss(old, next)

    // base は変更なし
    expect(result.get('base')?.status).toBe('unchanged')

    // @media は変更あり
    const mediaProp = getPropDiff(result, '@media (max-width: 768px)', '.a', 'color')
    expect(mediaProp?.status).toBe('changed')
    expect(mediaProp?.oldValue).toBe('blue')
    expect(mediaProp?.newValue).toBe('green')
  })

  it('@media ブロックが丸ごと追加される場合は added ステータス', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red; } @media print { .a { display: none; } }`
    const result = diffCss(old, next)
    expect(result.get('@media print')?.status).toBe('added')
  })

  it('ネストした @media の親条件が変わった場合は適用範囲の変更として検出する', () => {
    const old = `
      @media (min-width: 600px) {
        @media (hover: hover) {
          .btn { color: red; }
        }
      }
    `
    const next = `
      @media (hover: hover) {
        .btn { color: red; }
      }
    `
    const result = diffCss(old, next)

    const oldContext = '@media (min-width: 600px) and (hover: hover)'
    const newContext = '@media (hover: hover)'

    expect(getPropDiff(result, oldContext, '.btn', 'color')?.status).toBe('removed')
    expect(getPropDiff(result, newContext, '.btn', 'color')?.status).toBe('added')
    expect(result.get(newContext)?.status).toBe('added')
  })
})

describe('diff: 条件付き at-rule コンテキスト', () => {
  it('@supports 内から base へ移動した宣言を適用範囲の変更として検出する', () => {
    const old = `
      @supports (display: grid) {
        .btn { display: grid; }
      }
    `
    const next = `.btn { display: grid; }`
    const result = diffCss(old, next)

    expect(getPropDiff(result, '@supports (display: grid)', '.btn', 'display')?.status).toBe('removed')
    expect(getPropDiff(result, 'base', '.btn', 'display')?.status).toBe('added')
    expect(result.get('base')?.status).toBe('added')
  })

  it('@container 内から base へ移動した宣言を適用範囲の変更として検出する', () => {
    const old = `
      @container card (min-width: 320px) {
        .btn { padding: 12px; }
      }
    `
    const next = `.btn { padding: 12px; }`
    const result = diffCss(old, next)

    expect(getPropDiff(result, '@container card (min-width: 320px)', '.btn', 'padding')?.status).toBe('removed')
    expect(getPropDiff(result, 'base', '.btn', 'padding')?.status).toBe('added')
  })
})

describe('diff: @font-face と @keyframes', () => {
  it('@font-face の src 変更は font face キー配下の changed として検出する', () => {
    const old = `
      @font-face {
        font-family: "Inter";
        font-weight: 400;
        src: url(old.woff2);
      }
    `
    const next = `
      @font-face {
        font-family: "Inter";
        font-weight: 400;
        src: url(new.woff2);
      }
    `
    const result = diffCss(old, next)
    const prop = getPropDiff(result, '@font-face', 'Inter/400/normal', 'src')

    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('url(old.woff2)')
    expect(prop?.newValue).toBe('url(new.woff2)')
  })

  it('@keyframes の stop 内プロパティ変更は animation context 内で検出する', () => {
    const old = `@keyframes fade { from { opacity: 0; } to { opacity: 1; } }`
    const next = `@keyframes fade { from { opacity: 0; } to { opacity: .8; } }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, '@keyframes fade', 'to', 'opacity')

    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('1')
    expect(prop?.newValue).toBe('.8')
  })

  it('@-webkit-keyframes と @keyframes の vendor 差だけでは context 追加削除にならない', () => {
    const old = `@-webkit-keyframes spin { to { transform: rotate(360deg); } }`
    const next = `@keyframes spin { to { transform: rotate(360deg); } }`
    const result = diffCss(old, next)

    expect(result.get('@keyframes spin')?.status).toBe('unchanged')
    expect(result.has('@-webkit-keyframes spin')).toBe(false)
  })
})

describe('diff: 後勝ちルールが正しく適用された上での比較', () => {
  it('重複定義があっても最終値で比較される', () => {
    // old: 後勝ちで color: green
    const old = `.a { color: red; color: green; }`
    // new: 後勝ちで color: green
    const next = `.a { color: blue; color: green; }`
    const result = diffCss(old, next)
    // 最終値は同じ green → unchanged
    const prop = getPropDiff(result, 'base', '.a', 'color')
    expect(prop?.status).toBe('unchanged')
    expect(prop?.value).toBe('green')
  })

  it('!important 上書き後の最終値で比較される', () => {
    const old = `.a { color: red !important; color: blue; }` // red が残る
    const next = `.a { color: red !important; }`              // red が残る
    const result = diffCss(old, next)
    const prop = getPropDiff(result, 'base', '.a', 'color')
    expect(prop?.status).toBe('unchanged')
  })
})

describe('diff: グループセレクタの分解を通じた比較', () => {
  it('グループセレクタが分解されて個別に比較される', () => {
    const old = `.a, .b { color: red; }`
    const next = `.a, .b { color: blue; }`
    const result = diffCss(old, next)
    expect(getPropDiff(result, 'base', '.a', 'color')?.status).toBe('changed')
    expect(getPropDiff(result, 'base', '.b', 'color')?.status).toBe('changed')
  })
})

describe('diff: ignoreCosmetic — 表記揺れを無視した比較', () => {
  it('calc 内の * 周辺スペース違いは unchanged になる', () => {
    const old = `.a { letter-spacing: calc(2.01em + var(--x) * 5); }`
    const next = `.a { letter-spacing: calc(2.01em + var(--x)*5); }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'letter-spacing')?.status).toBe('unchanged')
  })

  it('ignoreCosmetic OFF では calc 内の * スペース違いは changed になる', () => {
    const old = `.a { letter-spacing: calc(2.01em + var(--x) * 5); }`
    const next = `.a { letter-spacing: calc(2.01em + var(--x)*5); }`
    const result = diffCss(old, next)
    expect(getPropDiff(result, 'base', '.a', 'letter-spacing')?.status).toBe('changed')
  })

  it('先頭ゼロ省略 (.2em vs 0.2em) は unchanged になる', () => {
    const old = `.a { margin: 0.2em; }`
    const next = `.a { margin: .2em; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('負の先頭ゼロ省略 (-.2em vs -0.2em) は unchanged になる', () => {
    const old = `.a { margin: -0.2em; }`
    const next = `.a { margin: -.2em; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('calc 内の負の先頭ゼロ省略 (-.5em) は unchanged になる', () => {
    const old = `.a { margin: calc(-0.5em + 1px); }`
    const next = `.a { margin: calc(-.5em + 1px); }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('calc 内で * の後に来る先頭ゼロ省略 (calc(1 * .5em)) は unchanged になる', () => {
    const old = `.a { margin: calc(1 * 0.5em); }`
    const next = `.a { margin: calc(1 * .5em); }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('calc 内で * の後に来る負の先頭ゼロ省略 (calc(1 * -.5em)) は unchanged になる', () => {
    const old = `.a { margin: calc(1 * -0.5em); }`
    const next = `.a { margin: calc(1 * -.5em); }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('16進カラーの大文字小文字・短縮形は unchanged になる', () => {
    const old = `.a { color: #FFF; }`
    const next = `.a { color: #ffffff; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'color')?.status).toBe('unchanged')
  })

  it('クォートの有無は unchanged になる', () => {
    const old = `.a { font-family: 'sans-serif'; }`
    const next = `.a { font-family: sans-serif; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'font-family')?.status).toBe('unchanged')
  })

  it('!important の有無は ignoreCosmetic に関わらず changed になる', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red !important; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'color')?.status).toBe('changed')
  })

  it('カンマ後のスペース有無の違いは unchanged になる', () => {
    // 例1: transition でカンマ後スペースあり vs なし
    const old = `.a { transition: color 0.2s, border-color 0.2s; }`
    const next = `.a { transition: color 0.2s,border-color 0.2s; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'transition')?.status).toBe('unchanged')
  })

  it('シングルとダブルクォート + カンマスペース違いは unchanged になる', () => {
    // 例2: font-family のクォート種別とカンマ後スペース
    const old = `.a { font-family: 'Noto Sans JP', sans-serif; }`
    const next = `.a { font-family: "Noto Sans JP",sans-serif; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'font-family')?.status).toBe('unchanged')
  })

  it('先頭ゼロ省略をショートハンドで使っても unchanged になる', () => {
    // 例3: margin の値の先頭ゼロ省略
    const old = `.a { margin: 0 0.2em; }`
    const next = `.a { margin: 0 .2em; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('calc 内の + 直後の先頭ゼロ省略は unchanged になる', () => {
    const old = `.a { margin: calc(max(1em, 2em) + 0.5rem); }`
    const next = `.a { margin: calc(max(1em,2em) + .5rem); }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'margin')?.status).toBe('unchanged')
  })

  it('4桁 hex alpha の短縮形は 8桁へ正規化され unchanged になる', () => {
    const old = `.a { color: #0f08; }`
    const next = `.a { color: #00ff0088; }`
    const result = diffCss(old, next, { ignoreCosmetic: true })
    expect(getPropDiff(result, 'base', '.a', 'color')?.status).toBe('unchanged')
  })
})

describe('diff: semanticSelectors — 属性セレクタのクォート等価', () => {
  it('クォートありとなしの属性セレクタが同一セレクタに集約される', () => {
    const old = `.a [class*='list'] { color: red; }`
    const next = `.a [class*=list] { color: red; }`
    const result = diffCss(old, next, {}, { semanticSelectors: true })
    // canonical 形 (.a [class*=list]) で unchanged
    const sel = result.get('base')?.selectors?.get('.a [class*=list]')
    expect(sel?.status).toBe('unchanged')
  })

  it('semanticSelectors OFF では別セレクタとして扱われる', () => {
    const old = `.a [class*='list'] { color: red; }`
    const next = `.a [class*=list] { color: red; }`
    const result = diffCss(old, next)
    // old 側のキーは ".a [class*='list']"（正規化済みだがクォートあり）
    // new 側のキーは ".a [class*=list]"
    const selectors = [...(result.get('base')?.selectors?.keys() ?? [])]
    // 2つのセレクタが別々に存在し、片方が removed、片方が added
    expect(selectors.length).toBe(2)
  })

  it('orlfr-article の実例: クォートありとなしが同一に集約される', () => {
    const old = `.orlfr-article ol:not([class*='list']):not([class*='faq-']) { margin: 0; }`
    const next = `.orlfr-article ol:not([class*=list]):not([class*=faq-]) { margin: 0; }`
    const result = diffCss(old, next, {}, { semanticSelectors: true })
    const ctxSelectors = result.get('base')?.selectors
    const anyChanged = [...(ctxSelectors?.values() ?? [])].some(s => s.status !== 'unchanged')
    expect(anyChanged).toBe(false)
  })
})

describe('diff: スコープ — セレクタ単位の比較（異なるセレクタの DOM オーバーラップは解決しない）', () => {
  // ツールの比較単位は「セレクタごとの最終適用値」であり、
  // 異なるセレクタが同一 DOM 要素に当たった場合のオーバーラップ解決は行わない。
  // .btn に .btn.primary を追加した場合、.btn.primary の適用要素での実効値は変化するが、
  // ツールはこれを「.btn.primary セレクタの追加」として報告する（スコープどおりの挙動）。
  it('.btn に .btn.primary を追加した変更は .btn.primary セレクタの追加として報告される', () => {
    const old = `.btn { color: red; }`
    const next = `.btn { color: red; } .btn.primary { color: blue; }`
    const result = diffCss(old, next)

    // .btn は変更なし（同一セレクタとして比較される）
    expect(getSelectorDiff(result, 'base', '.btn')?.status).toBe('unchanged')

    // .btn.primary は新規追加セレクタとして報告される
    const btnPrimary = getSelectorDiff(result, 'base', '.btn.primary')
    expect(btnPrimary?.status).toBe('added')
    expect(getPropDiff(result, 'base', '.btn.primary', 'color')?.newValue).toBe('blue')
  })

  it('DOM 上 .btn.primary 要素の実効値変化は「セレクタ追加」としてのみ表現される', () => {
    // .btn.primary 要素は old では .btn が color:red を適用、new では .btn.primary(詳細度高)が color:blue を上書きする。
    // ツールは「.btn セレクタの値変更」ではなく「.btn.primary の追加」として報告し、
    // DOM 上の最終適用値変化を直接表現しない（これはスコープ外の挙動であり、仕様どおり）。
    const old = `.btn { color: red; }`
    const next = `.btn { color: red; } .btn.primary { color: blue; }`
    const result = diffCss(old, next)

    // .btn の color は unchanged のまま（DOM オーバーラップを解決しない）
    expect(getPropDiff(result, 'base', '.btn', 'color')?.status).toBe('unchanged')
  })
})

describe('diff: @supports の url() 正規化', () => {
  it('url() 内のコロン（https://）はコロン正規化で破壊されない', () => {
    const css = `@supports (background: url(https://example.com)) { .a { color: red; } }`
    const result = diffCss(css, css)
    const ctxKey = '@supports (background: url(https://example.com))'
    expect(result.get(ctxKey)?.status).toBe('unchanged')
  })

  it('url() 内に括弧を含む quoted URL はコロン正規化で破壊されない', () => {
    const css = `@supports (background: url("(test)")) { .a { color: red; } }`
    const result = diffCss(css, css)
    const ctxKey = '@supports (background: url("(test)"))'
    expect(result.get(ctxKey)?.status).toBe('unchanged')
  })
})

describe('diff: CSS カスタムプロパティ (--var)', () => {
  it('カスタムプロパティの追加が検出される', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red; --my-color: blue; }`
    const result = diffCss(old, next)
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.status).toBe('added')
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.newValue).toBe('blue')
  })

  it('カスタムプロパティの値変更が changed として検出される', () => {
    const old = `.a { --my-color: red; }`
    const next = `.a { --my-color: blue; }`
    const result = diffCss(old, next)
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.status).toBe('changed')
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.oldValue).toBe('red')
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.newValue).toBe('blue')
  })

  it('カスタムプロパティの削除が removed として検出される', () => {
    const old = `.a { --my-color: red; color: var(--my-color); }`
    const next = `.a { color: var(--my-color); }`
    const result = diffCss(old, next)
    expect(getPropDiff(result, 'base', '.a', '--my-color')?.status).toBe('removed')
  })

  it('カスタムプロパティが変わらなければ unchanged', () => {
    const css = `.a { --spacing: 8px; }`
    const result = diffCss(css, css)
    expect(getPropDiff(result, 'base', '.a', '--spacing')?.status).toBe('unchanged')
  })
})

describe('diff: @font-face', () => {
  it('@font-face の src 変更が changed として検出される', () => {
    const old = `@font-face { font-family: 'Roboto'; font-weight: 400; src: url(roboto.woff2); }`
    const next = `@font-face { font-family: 'Roboto'; font-weight: 400; src: url(roboto-v2.woff2); }`
    const result = diffCss(old, next)
    // セレクタキーは getFontFaceKey により "Roboto/400/normal" の形式
    const prop = getPropDiff(result, '@font-face', 'Roboto/400/normal', 'src')
    expect(prop?.status).toBe('changed')
  })

  it('新しいウェイトの @font-face 追加が added として検出される', () => {
    const old = `@font-face { font-family: 'Roboto'; font-weight: 400; src: url(roboto.woff2); }`
    const next = `
      @font-face { font-family: 'Roboto'; font-weight: 400; src: url(roboto.woff2); }
      @font-face { font-family: 'Roboto'; font-weight: 700; src: url(roboto-bold.woff2); }
    `
    const result = diffCss(old, next)
    expect(getSelectorDiff(result, '@font-face', 'Roboto/700/normal')?.status).toBe('added')
  })

  it('@font-face が削除されると removed になる', () => {
    const old = `@font-face { font-family: 'Roboto'; font-weight: 400; src: url(roboto.woff2); }`
    const next = ``
    const result = diffCss(old, next)
    expect(getSelectorDiff(result, '@font-face', 'Roboto/400/normal')?.status).toBe('removed')
  })
})

describe('diff: @keyframes', () => {
  it('@keyframes のプロパティ変更が changed として検出される', () => {
    const old = `@keyframes fade { from { opacity: 1; } to { opacity: 0; } }`
    const next = `@keyframes fade { from { opacity: 1; } to { opacity: 0.5; } }`
    const result = diffCss(old, next)
    const prop = getPropDiff(result, '@keyframes fade', 'to', 'opacity')
    expect(prop?.status).toBe('changed')
    expect(prop?.oldValue).toBe('0')
    expect(prop?.newValue).toBe('0.5')
  })

  it('@keyframes の追加が added コンテキストとして検出される', () => {
    const old = `.a { color: red; }`
    const next = `.a { color: red; } @keyframes slide { from { transform: translateX(0); } to { transform: translateX(100px); } }`
    const result = diffCss(old, next)
    expect(result.get('@keyframes slide')?.status).toBe('added')
  })

  it('@keyframes の削除が removed コンテキストとして検出される', () => {
    const old = `@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`
    const next = ``
    const result = diffCss(old, next)
    expect(result.get('@keyframes pulse')?.status).toBe('removed')
  })

  it('@keyframes の変更は同名の @keyframes コンテキスト内で記録される', () => {
    const old = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
    const next = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(180deg); } }`
    const result = diffCss(old, next)
    expect(result.get('@keyframes spin')?.changeCount).toBeGreaterThan(0)
  })
})

// ─── バグ検出テスト ────────────────────────────────────────────────────────────

describe('diff: @font-face font-family 大文字小文字 [バグ]', () => {
  it('font-family の大小文字差異は @font-face 内で removed+added でなく changed として扱う', () => {
    // Bug-6 (CONFIRMED): getFontFaceKey が font-family 値を小文字化しないため
    // @font-face コンテキスト内のセレクタキーが 'Roboto/400/normal' と 'roboto/400/normal' に
    // 分かれ、同一フォントが removed + added として誤報告される
    // CSS Fonts spec は font-family 名を大文字小文字不問で扱う
    const oldCss = `@font-face { font-family: 'Roboto'; src: url(a.woff); font-weight: 400; }`
    const newCss = `@font-face { font-family: 'roboto'; src: url(b.woff); font-weight: 400; }`
    const result = diffCss(oldCss, newCss)
    const ctx = result.get('@font-face')
    const selectors = [...(ctx?.selectors?.entries() ?? [])]
    const addedSels   = selectors.filter(([, v]) => v.status === 'added')
    const removedSels = selectors.filter(([, v]) => v.status === 'removed')
    // 同一フォントとして認識されるなら added/removed のセレクタペアが生じてはならない
    expect(addedSels.length).toBe(0)
    expect(removedSels.length).toBe(0)
  })
})
