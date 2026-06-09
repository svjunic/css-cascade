/**
 * render.js
 * diff 結果を HTML 文字列に変換するレンダラー。
 * フレームワーク非依存のピュアな関数群。
 */

/** HTML 特殊文字をエスケープ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * プロパティ1行の HTML を生成する。
 *
 * @param {string} prop
 * @param {{ status, oldValue?, newValue?, value?, oldImportant?, newImportant?, important? }} propDiff
 * @returns {string}
 */
function renderProp(prop, propDiff) {
  const { status } = propDiff

  function imp(flag) {
    return flag ? ' <span class="important">!important</span>' : ''
  }

  if (status === 'added') {
    return `
      <div class="prop prop--added">
        <span class="prop-name">${esc(prop)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${esc(propDiff.newValue)}${imp(propDiff.newImportant)}</span>
        <span class="prop-badge badge--added">追加</span>
      </div>`
  }

  if (status === 'removed') {
    return `
      <div class="prop prop--removed">
        <span class="prop-name">${esc(prop)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${esc(propDiff.oldValue)}${imp(propDiff.oldImportant)}</span>
        <span class="prop-badge badge--removed">削除</span>
      </div>`
  }

  if (status === 'changed') {
    return `
      <div class="prop prop--changed">
        <span class="prop-name">${esc(prop)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value prop-value--old">${esc(propDiff.oldValue)}${imp(propDiff.oldImportant)}</span>
        <span class="prop-arrow">→</span>
        <span class="prop-value prop-value--new">${esc(propDiff.newValue)}${imp(propDiff.newImportant)}</span>
        <span class="prop-badge badge--changed">変更</span>
      </div>`
  }

  // unchanged
  return `
    <div class="prop prop--unchanged">
      <span class="prop-name">${esc(prop)}</span>
      <span class="prop-colon">:</span>
      <span class="prop-value">${esc(propDiff.value)}${imp(propDiff.important)}</span>
    </div>`
}

/**
 * セレクタの新旧全プロパティを左右2カラムで表示する詳細パネルを生成する。
 *
 * @param {string} selector
 * @param {{ status, props: Map }} selDiff
 * @returns {string}
 */
function renderSelectorDetail(selector, selDiff) {
  const { props } = selDiff

  const oldLines = []
  const newLines = []

  for (const [prop, pd] of props) {
    const propEsc = esc(prop)
    if (pd.status === 'unchanged') {
      const valEsc = esc(pd.value) + (pd.important ? ' !important' : '')
      oldLines.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${valEsc}</span>;</div>`)
      newLines.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${valEsc}</span>;</div>`)
    } else if (pd.status === 'added') {
      oldLines.push(`<div class="detail-line detail-line--empty"></div>`)
      const valEsc = esc(pd.newValue) + (pd.newImportant ? ' !important' : '')
      newLines.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${valEsc}</span>;</div>`)
    } else if (pd.status === 'removed') {
      const valEsc = esc(pd.oldValue) + (pd.oldImportant ? ' !important' : '')
      oldLines.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${valEsc}</span>;</div>`)
      newLines.push(`<div class="detail-line detail-line--empty"></div>`)
    } else {
      // changed
      const oldValEsc = esc(pd.oldValue) + (pd.oldImportant ? ' !important' : '')
      const newValEsc = esc(pd.newValue) + (pd.newImportant ? ' !important' : '')
      oldLines.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${oldValEsc}</span>;</div>`)
      newLines.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${propEsc}</span><span class="detail-colon">:</span> <span class="detail-val">${newValEsc}</span>;</div>`)
    }
  }

  const selEsc = esc(selector)
  return `
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">旧</div>
        <pre class="detail-block"><code>${selEsc} {
${oldLines.join('\n')}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">新</div>
        <pre class="detail-block"><code>${selEsc} {
${newLines.join('\n')}}</code></pre>
      </div>
    </div>`
}

/**
 * セレクタカードの HTML を生成する。
 *
 * @param {string} selector
 * @param {{ status, changeCount, props: Map }} selDiff
 * @param {{ highlightHtml?: string, showUnchanged?: boolean, contextKey?: string, expanded?: boolean }} options
 * @returns {string}
 */
function renderSelector(selector, selDiff, { highlightHtml, showUnchanged = false, contextKey = '', expanded = false } = {}) {
  const { status, changeCount, props } = selDiff
  const selectorHtml = highlightHtml || esc(selector)

  const badgeClass = {
    added: 'badge--added',
    removed: 'badge--removed',
    changed: 'badge--changed',
    unchanged: 'badge--unchanged',
  }[status]

  const badgeLabel = {
    added: `+${[...props.values()].filter(p => p.status === 'added').length} 追加`,
    removed: `−${[...props.values()].filter(p => p.status === 'removed').length} 削除`,
    changed: (() => {
      const a = [...props.values()].filter(p => p.status === 'added').length
      const r = [...props.values()].filter(p => p.status === 'removed').length
      const c = [...props.values()].filter(p => p.status === 'changed').length
      const parts = []
      if (a) parts.push(`+${a}`)
      if (r) parts.push(`−${r}`)
      if (c) parts.push(`~${c}`)
      return parts.join(' ')
    })(),
    unchanged: '変更なし',
  }[status]

  // プロパティ表示: unchanged プロパティはデフォルトでは折りたたむ
  const changedProps = [...props.entries()].filter(([, p]) => p.status !== 'unchanged')
  const unchangedProps = [...props.entries()].filter(([, p]) => p.status === 'unchanged')

  const propsHtml = [
    ...changedProps.map(([p, d]) => renderProp(p, d)),
    ...(showUnchanged ? unchangedProps.map(([p, d]) => renderProp(p, d)) : []),
  ].join('')

  const unchangedToggle =
    unchangedProps.length > 0 && !showUnchanged
      ? `<button class="unchanged-toggle" data-selector="${esc(selector)}">
           変更なし ${unchangedProps.length} 件を表示
         </button>`
      : ''

  const detailHtml = expanded ? renderSelectorDetail(selector, selDiff) : ''
  const expandedAttr = expanded ? ' data-expanded="true"' : ''

  return `
    <div class="selector-card selector-card--${status}" data-selector="${esc(selector)}" data-context="${esc(contextKey)}"${expandedAttr}>
      <div class="selector-header" role="button" tabindex="0" title="クリックで新旧の全プロパティを表示">
        <code class="selector-name">${selectorHtml}</code>
        <span class="selector-badge ${badgeClass}">${badgeLabel}</span>
        <span class="selector-expand-icon">${expanded ? '▲' : '▼'}</span>
      </div>
      <div class="props-list">
        ${propsHtml || '<div class="no-props">プロパティなし</div>'}
        ${unchangedToggle}
      </div>
      ${detailHtml}
    </div>`
}

/**
 * コンテキストセクションの HTML を生成する。
 *
 * @param {string} contextKey
 * @param {{ status, changeCount, selectors: Map }} ctxDiff
 * @param {Array<{selector: string, positions: ReadonlySet<number>}>|null} filteredSelectors
 *   null = 絞り込みなし（全件表示）
 * @param {{ showUnchanged?: boolean, expandedSelectors?: Set<string> }} options
 * @returns {string}
 */
function renderContext(contextKey, ctxDiff, filteredSelectors, { showUnchanged = false, expandedSelectors = new Set() } = {}) {
  const { status, changeCount } = ctxDiff
  const isBase = contextKey === 'base'

  const contextLabel = isBase ? 'トップレベル (base)' : esc(contextKey)
  const contextBadgeClass = {
    added: 'badge--added',
    removed: 'badge--removed',
    changed: 'badge--changed',
    unchanged: 'badge--unchanged',
  }[status]

  const badge =
    changeCount > 0
      ? `<span class="context-badge ${contextBadgeClass}">${changeCount} 件の変更</span>`
      : `<span class="context-badge badge--unchanged">変更なし</span>`

  // 表示するセレクタを決定
  const selectorEntries = filteredSelectors
    ? filteredSelectors.map(({ selector, positions }) => ({
        selector,
        positions,
        selDiff: ctxDiff.selectors.get(selector),
      })).filter(e => e.selDiff)
    : [...ctxDiff.selectors.entries()].map(([selector, selDiff]) => ({
        selector,
        positions: new Set(),
        selDiff,
      }))

  if (selectorEntries.length === 0) return ''

  const selectorsHtml = selectorEntries
    .map(({ selector, positions, selDiff }) =>
      renderSelector(selector, selDiff, {
        highlightHtml: positions.size > 0 ? highlightPositions(selector, positions) : null,
        showUnchanged,
        contextKey,
        expanded: expandedSelectors.has(`${contextKey}||${selector}`),
      })
    )
    .join('')

  return `
    <section class="context-section context-section--${status}">
      <div class="context-header">
        <span class="context-label">${contextLabel}</span>
        ${badge}
      </div>
      <div class="context-selectors">
        ${selectorsHtml}
      </div>
    </section>`
}

/** fzf マッチ位置を HTML マークアップに変換 */
function highlightPositions(text, positions) {
  return [...text]
    .map((char, i) => {
      const escaped = esc(char)
      return positions.has(i) ? `<mark class="fzf-match">${escaped}</mark>` : escaped
    })
    .join('')
}

/**
 * 差分結果全体を HTML 文字列として返す。
 *
 * @param {Map} diffResult - diff() の出力
 * @param {Array<{contextKey, selector, status, positions}>} filteredItems
 *   絞り込み済みのアイテムリスト。null なら全件表示。
 * @param {{ activeContext?: string, showUnchanged?: boolean, expandedSelectors?: Set<string> }} options
 * @returns {string}
 */
export function renderDiff(diffResult, filteredItems, { activeContext = 'all', showUnchanged = false, expandedSelectors = new Set() } = {}) {
  if (!diffResult || diffResult.size === 0) {
    return `<div class="empty-state">CSS を読み込んでください。</div>`
  }

  // filteredItems を contextKey でグループ化
  let filteredByContext = null
  if (filteredItems !== null) {
    filteredByContext = new Map()
    for (const item of filteredItems) {
      if (!filteredByContext.has(item.contextKey)) {
        filteredByContext.set(item.contextKey, [])
      }
      filteredByContext.get(item.contextKey).push({
        selector: item.selector,
        positions: item.positions || new Set(),
      })
    }
  }

  let html = ''
  for (const [ctxKey, ctxDiff] of diffResult) {
    // コンテキストフィルタ
    if (activeContext !== 'all' && ctxKey !== activeContext) continue

    const fsForCtx = filteredByContext ? (filteredByContext.get(ctxKey) || []) : null

    // filteredByContext がある場合: 該当コンテキストのアイテムがなければスキップ
    if (filteredByContext && fsForCtx.length === 0) continue

    html += renderContext(ctxKey, ctxDiff, fsForCtx, { showUnchanged, expandedSelectors })
  }

  return html || `<div class="empty-state">条件に一致するセレクタがありません。</div>`
}

/**
 * 差分サマリーテキストを返す。
 *
 * @param {Map} diffResult
 * @returns {{ total: number, added: number, removed: number, changed: number, unchanged: number }}
 */
export function summarizeDiff(diffResult) {
  let added = 0, removed = 0, changed = 0, unchanged = 0

  for (const ctxDiff of diffResult.values()) {
    for (const selDiff of ctxDiff.selectors.values()) {
      const s = selDiff.status
      if (s === 'added') added++
      else if (s === 'removed') removed++
      else if (s === 'changed') changed++
      else unchanged++
    }
  }

  return { total: added + removed + changed + unchanged, added, removed, changed, unchanged }
}
