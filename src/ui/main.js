/**
 * main.js
 * アプリケーションのエントリーポイント。
 * 状態管理・イベント結線・描画の調整を担う。
 */

import { parseCss } from '../core/parse-cssom.js'
import { resolve } from '../core/resolve.js'
import { diff } from '../core/diff.js'
import { computeOrderRisks } from '../core/order-risk.js'
import { computeShorthandRisks } from '../core/shorthand-risk.js'
import { applyShorthandRisksToDiff } from '../core/index.js'
import { initDropzone, updateDropzoneState } from './dropzone.js'
import { createSearchIndex, search } from './fuzzy.js'
import { renderDiff, summarizeDiff, renderOrderRisks, renderShorthandRisks, esc } from './render.js'

// ─── 状態 ─────────────────────────────────────────────────────────────────
const state = {
  oldCss: '',
  newCss: '',
  oldFileName: null,
  newFileName: null,
  diffResult: null,
  parseError: null,  // CSS パースエラー時のメッセージ（null=正常）
  allItems: [],      // [{contextKey, selector}]
  fzfInstance: null,
  query: '',
  filter: 'changed',  // 'all' | 'changed' | 'added' | 'removed' | 'unchanged'
  // 注: index.html の data-filter="changed" に active クラスと同期している
  activeContext: 'all',
  showUnchanged: false,
  // 表記揺れ・セレクタ等価オプション
  ignoreCosmetic: false,
  semanticSelectors: false,
  // 出現順リスク
  orderRisks: [],
  shorthandRisks: null,
  // 出現順リスクセクションで展開中のコンテキスト: Set<contextKey>
  expandedOrderRiskContexts: new Set(),
  // クリックで展開中のセレクタ: Set<"contextKey||selector">
  expandedSelectors: new Set(),
}

// ─── DOM 参照 ─────────────────────────────────────────────────────────────
const oldDropEl    = document.getElementById('old-drop')
const newDropEl    = document.getElementById('new-drop')
const searchEl     = document.getElementById('search')
const resultsEl    = document.getElementById('results')
const summaryEl    = document.getElementById('summary')
const contextTabsEl = document.getElementById('context-tabs')
const filterBtnsEl = document.getElementById('filter-buttons')
const optIgnoreCosmeticEl    = document.getElementById('opt-ignore-cosmetic')
const optSemanticSelectorsEl = document.getElementById('opt-semantic-selectors')

// ─── コア処理 ─────────────────────────────────────────────────────────────

let _diffGeneration = 0

async function runDiff() {
  if (!state.oldCss || !state.newCss) return
  const gen = ++_diffGeneration

  const parseOpts = { semanticSelectors: state.semanticSelectors }
  let diffResult, orderRisks, shorthandRisks
  try {
    const [parsedOld, parsedNew] = await Promise.all([
      parseCss(state.oldCss, parseOpts),
      parseCss(state.newCss, parseOpts),
    ])
    const resolvedOld = resolve(parsedOld)
    const resolvedNew = resolve(parsedNew)
    diffResult = diff(resolvedOld, resolvedNew, { ignoreCosmetic: state.ignoreCosmetic })
    shorthandRisks = await computeShorthandRisks(parsedOld, parsedNew, parseOpts)
    applyShorthandRisksToDiff(diffResult, shorthandRisks)
    orderRisks = await computeOrderRisks(state.oldCss, state.newCss, parseOpts, null, { parsedOld, parsedNew })
  } catch (err) {
    if (gen !== _diffGeneration) return
    // CSS パースエラー: 例外を握りつぶさずユーザーに表示する
    state.parseError = err.message
    state.diffResult = null
    state.orderRisks = []
    state.shorthandRisks = null
    state.allItems = []
    state.fzfInstance = null
    updateContextTabs()
    updateSummary()
    renderResults()
    return
  }

  if (gen !== _diffGeneration) return

  state.diffResult = diffResult
  state.orderRisks = orderRisks
  state.shorthandRisks = shorthandRisks
  state.parseError = null
  state.expandedOrderRiskContexts = new Set(
    state.orderRisks.filter(r => r.hasWarning).map(r => r.contextKey)
  )

  // 検索インデックスを再構築
  state.allItems = []
  for (const [contextKey, ctxDiff] of state.diffResult) {
    for (const [selector, selDiff] of ctxDiff.selectors) {
      state.allItems.push({ contextKey, selector, status: selDiff.status })
    }
  }
  state.fzfInstance = createSearchIndex(state.allItems, item => item.selector)

  updateContextTabs()
  updateSummary()
  renderResults()
}

// ─── フィルタリング ────────────────────────────────────────────────────────

function getFilteredItems() {
  if (!state.diffResult) return []

  let items

  // fzf 絞り込み
  if (state.query.trim() && state.fzfInstance) {
    const results = search(state.fzfInstance, state.query)
    items = results.map(r => ({
      ...r.item,
      positions: r.positions,
    }))
  } else {
    items = state.allItems.map(item => ({ ...item, positions: new Set() }))
  }

  // ステータスフィルタ
  if (state.filter === 'order-risk') {
    // 出現順警告に関連するセレクタのみ表示
    const warnedSelectors = new Set()
    for (const ctxResult of state.orderRisks) {
      for (const row of ctxResult.rows) {
        if (row.type === 'moved') {
          if (row.oldSelector) warnedSelectors.add(`${ctxResult.contextKey}::${row.oldSelector}`)
          if (row.newSelector) warnedSelectors.add(`${ctxResult.contextKey}::${row.newSelector}`)
        }
      }
    }
    items = items.filter(item => warnedSelectors.has(`${item.contextKey}::${item.selector}`))
  } else if (state.filter !== 'all') {
    items = items.filter(item => {
      if (state.filter === 'changed') {
        return item.status === 'changed' || item.status === 'added' || item.status === 'removed'
      }
      return item.status === state.filter
    })
  }

  return items
}

// ─── 描画 ─────────────────────────────────────────────────────────────────

function renderResults() {
  if (state.parseError) {
    resultsEl.innerHTML = `<div class="empty-state">
      <p>CSS の解析に失敗しました。</p>
      <p class="empty-sub">${esc(state.parseError)}</p>
    </div>`
    return
  }
  if (!state.diffResult) {
    resultsEl.innerHTML = `<div class="empty-state">
      <p>旧・新の CSS ファイルをドロップしてください。</p>
      <p class="empty-sub">ドロップゾーンにファイルをドラッグ&ドロップ、またはクリックして選択できます。</p>
    </div>`
    return
  }

  const filteredItems = getFilteredItems()
  const isOrderRiskFilter = state.filter === 'order-risk'

  const orderRisksHtml = renderOrderRisks(state.orderRisks, {
    activeContext: state.activeContext,
    filterOrderRisk: isOrderRiskFilter,
    expandedContexts: state.expandedOrderRiskContexts,
  })

  const shorthandRisksHtml = renderShorthandRisks(state.shorthandRisks)

  const diffHtml = renderDiff(state.diffResult, filteredItems, {
    activeContext: state.activeContext,
    showUnchanged: state.showUnchanged,
    expandedSelectors: state.expandedSelectors,
  })

  resultsEl.innerHTML = orderRisksHtml + shorthandRisksHtml + diffHtml

  // 出現順リスクのコンテキストヘッダーをクリックで開閉
  resultsEl.querySelectorAll('.or-context-header[data-or-ctx-key]').forEach(header => {
    const toggle = () => {
      const key = header.dataset.orCtxKey
      if (state.expandedOrderRiskContexts.has(key)) {
        state.expandedOrderRiskContexts.delete(key)
      } else {
        state.expandedOrderRiskContexts.add(key)
      }
      renderResults()
    }
    header.addEventListener('click', toggle)
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    })
  })

  // 「変更なしを表示」ボタンのイベントを設定
  resultsEl.querySelectorAll('.unchanged-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      state.showUnchanged = !state.showUnchanged
      renderResults()
    })
  })

  // セレクタヘッダーのクリックで新旧全文パネルをトグル
  resultsEl.querySelectorAll('.selector-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.selector-card')
      if (!card) return
      const sel = card.dataset.selector
      const ctx = card.dataset.context
      const key = `${ctx}||${sel}`
      if (state.expandedSelectors.has(key)) {
        state.expandedSelectors.delete(key)
      } else {
        state.expandedSelectors.add(key)
      }
      renderResults()
    })
    // キーボードアクセシビリティ（Enter / Space）
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        header.click()
      }
    })
  })
}

function updateSummary() {
  if (state.parseError) {
    summaryEl.textContent = 'パースエラー'
    return
  }
  if (!state.diffResult) {
    summaryEl.textContent = ''
    return
  }

  const { total, added, removed, changed, unchanged } = summarizeDiff(state.diffResult)
  const parts = []
  if (added > 0)     parts.push(`<span class="sum-added">+${added} 追加</span>`)
  if (removed > 0)   parts.push(`<span class="sum-removed">−${removed} 削除</span>`)
  if (changed > 0)   parts.push(`<span class="sum-changed">~${changed} 変更</span>`)
  if (unchanged > 0) parts.push(`<span class="sum-unchanged">${unchanged} 変更なし</span>`)
  summaryEl.innerHTML = `セレクタ ${total} 件  ${parts.join('  ')}`
}

function updateContextTabs() {
  if (!state.diffResult) {
    contextTabsEl.innerHTML = ''
    return
  }

  const buttons = [`<button class="ctx-tab ${state.activeContext === 'all' ? 'active' : ''}" data-ctx="all">すべて</button>`]

  for (const [ctxKey, ctxDiff] of state.diffResult) {
    const label = ctxKey === 'base' ? 'base' : ctxKey
    const badge = ctxDiff.changeCount > 0
      ? `<span class="ctx-badge">${ctxDiff.changeCount}</span>`
      : ''
    const isActive = state.activeContext === ctxKey
    buttons.push(`<button class="ctx-tab ${isActive ? 'active' : ''} ctx-tab--${ctxDiff.status}" data-ctx="${esc(ctxKey)}">${esc(label)}${badge}</button>`)
  }

  contextTabsEl.innerHTML = buttons.join('')

  contextTabsEl.querySelectorAll('.ctx-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeContext = btn.dataset.ctx
      contextTabsEl.querySelectorAll('.ctx-tab').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      renderResults()
    })
  })
}

// ─── イベント ─────────────────────────────────────────────────────────────

// ドロップゾーン
initDropzone(oldDropEl, (text, fileName) => {
  state.oldCss = text
  state.oldFileName = fileName
  updateDropzoneState(oldDropEl, {
    fileName,
    lineCount: text.split('\n').length,
  })
  runDiff()
})

initDropzone(newDropEl, (text, fileName) => {
  state.newCss = text
  state.newFileName = fileName
  updateDropzoneState(newDropEl, {
    fileName,
    lineCount: text.split('\n').length,
  })
  runDiff()
})

// 検索
searchEl.addEventListener('input', () => {
  state.query = searchEl.value
  renderResults()
})

// フィルタボタン
filterBtnsEl.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter
    filterBtnsEl.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    renderResults()
  })
})

// オプション チェックボックス
optIgnoreCosmeticEl?.addEventListener('change', () => {
  state.ignoreCosmetic = optIgnoreCosmeticEl.checked
  runDiff()
})

optSemanticSelectorsEl?.addEventListener('change', () => {
  state.semanticSelectors = optSemanticSelectorsEl.checked
  runDiff()
})

// ─── 初期ロード ───────────────────────────────────────────────────────────
// リポジトリの old/new ディレクトリから初期ファイルを自動ロード（存在する場合のみ）
async function loadInitialFiles() {
  try {
    const [oldRes, newRes] = await Promise.all([
      fetch('/api/css/old'),
      fetch('/api/css/new'),
    ])

    if (oldRes.ok && newRes.ok) {
      const [oldText, newText] = await Promise.all([oldRes.text(), newRes.text()])

      state.oldCss = oldText
      state.oldFileName = 'data/old/module.css'
      updateDropzoneState(oldDropEl, {
        fileName: 'data/old/module.css',
        lineCount: oldText.split('\n').length,
      })

      state.newCss = newText
      state.newFileName = 'data/new/module.css'
      updateDropzoneState(newDropEl, {
        fileName: 'data/new/module.css',
        lineCount: newText.split('\n').length,
      })

      await runDiff()
    }
  } catch {
    // 初期ファイルが取得できない場合は無視
  }
}

loadInitialFiles()
