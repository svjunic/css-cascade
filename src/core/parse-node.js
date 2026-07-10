/**
 * parse-node.js
 * Node.js 環境向けの CSS パーサー。
 * Playwright を使って実ブラウザ (Chromium) で parse-cssom.js を実行し、
 * 結果を Node.js の Map に変換して返す。
 *
 * CLI と Skill から使用する。GitHub Pages では parse-cssom.js を直接使う。
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

// parse-cssom.js のソースを取得する。
// バンドル時は __CSSOM_SOURCE__ として埋め込まれる（esbuild define）。
// 直接 ESM 実行時はファイルシステムから読み込む。
/* eslint-disable no-undef */
const _cssomSource = (() => {
  if (typeof __CSSOM_SOURCE__ !== 'undefined') return __CSSOM_SOURCE__
  return readFileSync(
    fileURLToPath(new URL('./parse-cssom.js', import.meta.url)),
    'utf8',
  ).replace(/^export /gm, '')
})()

// ─── ブラウザシングルトン ─────────────────────────────────────────────────────

let _browser = null
let _page = null

async function _getPage() {
  if (_page) return _page
  _browser = await chromium.launch({ headless: true })
  const context = await _browser.newContext()
  _page = await context.newPage()
  await _page.addScriptTag({ content: _cssomSource })
  return _page
}

/**
 * Playwright ブラウザを閉じる。
 * プロセス終了時や明示的なクリーンアップ時に呼び出す。
 */
export async function closeBrowser() {
  if (_browser) {
    await _browser.close()
    _browser = null
    _page = null
  }
}

// プロセス終了時にブラウザを自動クリーンアップ
process.on('exit', () => {
  if (_browser) _browser.close()
})

// ─── parseCss ─────────────────────────────────────────────────────────────────

/**
 * CSS テキストをパースして中間モデルを返す。
 * parse-cssom.js と同じシグネチャ・出力形式。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, Array<{selector: string, prop: string, value: string, important: boolean, layerRank: number}>>>}
 */
export async function parseCss(cssText, options = {}) {
  const page = await _getPage()
  const entries = await page.evaluate(
    async ([css, opts]) => {
      // globalThis 経由で参照することで minify 時のリネームを防ぐ
      const mapResult = await globalThis['parseCss'](css, opts)
      return [...mapResult.entries()]
    },
    [cssText, options],
  )
  return new Map(entries)
}

// ─── parseSelectorOrder ────────────────────────────────────────────────────────

/**
 * CSS テキストをパースして各コンテキストのセレクタ順を返す。
 * parse-cssom.js と同じシグネチャ・出力形式。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Promise<Map<string, string[]>>}
 */
export async function parseSelectorOrder(cssText, options = {}) {
  const page = await _getPage()
  const entries = await page.evaluate(
    async ([css, opts]) => {
      const mapResult = await globalThis['parseSelectorOrder'](css, opts)
      return [...mapResult.entries()]
    },
    [cssText, options],
  )
  return new Map(entries)
}
