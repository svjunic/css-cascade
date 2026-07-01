import { parseCss, parseSelectorOrder } from './parse.js'
import { resolve } from './resolve.js'
import { sameSpecificity, computeSpecificity, compareSpecificity } from './specificity.js'

/**
 * old/new のセレクタリストを比較し表示用の行を返す。
 *
 * アプローチ: 位置ベースのアラインメント
 *   両方に存在するセレクタを各リストから抽出し、
 *   同じインデックス同士をペアリングする。
 *   - oldCommon[i] === newCommon[i] → equal
 *   - oldCommon[i] !== newCommon[i] → moved（相対順序が変わった）
 */
function buildOrderRows(oldList, newList) {
  const oldSet = new Set(oldList)
  const newSet = new Set(newList)

  const oldCommon = oldList.filter(s => newSet.has(s))
  const newCommon = newList.filter(s => oldSet.has(s))

  // 位置ベースのペアリング: oldCommon[i] → newCommon[i]
  const pairing = new Map()
  for (let i = 0; i < oldCommon.length; i++) {
    pairing.set(oldCommon[i], newCommon[i])
  }

  const rows = []
  let ni = 0

  for (const oldSel of oldList) {
    if (!newSet.has(oldSel)) {
      rows.push({ type: 'deleted', oldSelector: oldSel, newSelector: null })
      continue
    }

    const pairedNew = pairing.get(oldSel)

    // pairedNew より前に来る new 専用セレクタを added 行として挿入
    // pairedNew ∈ oldSet のため !oldSet.has() が false になった時点で必ず pairedNew を指す
    while (ni < newList.length && !oldSet.has(newList[ni])) {
      rows.push({ type: 'added', oldSelector: null, newSelector: newList[ni] })
      ni++
    }

    rows.push(
      oldSel === pairedNew
        ? { type: 'equal', oldSelector: oldSel, newSelector: pairedNew }
        : { type: 'moved', oldSelector: oldSel, newSelector: pairedNew },
    )
    ni++ // pairedNew を消費
  }

  // 末尾の追加専用セレクタ
  while (ni < newList.length) {
    if (!oldSet.has(newList[ni])) {
      rows.push({ type: 'added', oldSelector: null, newSelector: newList[ni] })
    }
    ni++
  }

  return rows
}

/**
 * 2 セレクタ間で、あるプロパティの勝者セレクタを決定する。
 * カスケードの優先度に従い importance → 詳細度 → ソース順（後勝ち）で判定する。
 * 一方しか宣言していない場合はそのセレクタが勝つ。
 *
 * @param {string} selA
 * @param {string} selX
 * @param {{value: string, important: boolean}|undefined} entryA  selA の当該 prop（未宣言なら undefined）
 * @param {{value: string, important: boolean}|undefined} entryX  selX の当該 prop
 * @param {number} specCmp  compareSpecificity(spec(selA), spec(selX))
 * @param {number} posA  selA のソース位置
 * @param {number} posX  selX のソース位置
 * @returns {string|null} 勝者セレクタ名。両者とも未宣言なら null。
 */
function pickWinner(selA, selX, entryA, entryX, specCmp, posA, posX) {
  if (!entryA && !entryX) return null
  if (!entryA) return selX
  if (!entryX) return selA
  // 1. !important 有無
  if (entryA.important !== entryX.important) return entryA.important ? selA : selX
  // 2. 詳細度（高いほうが勝つ）
  if (specCmp !== 0) return specCmp > 0 ? selA : selX
  // 3. ソース順（後に出現したほうが勝つ）
  return posA > posX ? selA : selX
}

function annotateMovedRow(row, oldList, newList, oldCtxProps, newCtxProps) {
  const selA = row.oldSelector
  const selX = row.newSelector
  row.sameSpecificity = sameSpecificity(selA, selX)
  row.conflictingProps = []

  const oldPosA = oldList.indexOf(selA)
  const oldPosX = oldList.indexOf(selX)
  const newPosA = newList.indexOf(selA)
  const newPosX = newList.indexOf(selX)

  if (oldPosA < 0 || oldPosX < 0 || newPosA < 0 || newPosX < 0) return

  // セレクタ文字列は old/new で同一なので詳細度比較は 1 度で足りる
  const specCmp = compareSpecificity(computeSpecificity(selA), computeSpecificity(selX))

  const oldA = oldCtxProps.get(selA) || new Map()
  const oldX = oldCtxProps.get(selX) || new Map()
  const newA = newCtxProps.get(selA) || new Map()
  const newX = newCtxProps.get(selX) || new Map()

  // 候補: 新 CSS で両セレクタが宣言し、かつ値（または !important）が異なるプロパティ
  for (const [prop, entryNewA] of newA) {
    const entryNewX = newX.get(prop)
    if (!entryNewX) continue
    if (entryNewA.value === entryNewX.value && entryNewA.important === entryNewX.important) continue

    // 旧・新それぞれの並び順で勝者を判定する。
    // 詳細度が異なる場合は順序に関わらず同じセレクタが勝つため、有効値は変わらない＝誤検出しない。
    const oldWinner = pickWinner(selA, selX, oldA.get(prop), oldX.get(prop), specCmp, oldPosA, oldPosX)
    const newWinner = pickWinner(selA, selX, entryNewA, entryNewX, specCmp, newPosA, newPosX)
    if (!oldWinner || !newWinner) continue

    const oldEff = oldCtxProps.get(oldWinner)?.get(prop)
    const newEff = newCtxProps.get(newWinner)?.get(prop)
    if (!oldEff || !newEff) continue

    // 有効値が実際に変化する場合のみ競合として報告する
    if (oldEff.value === newEff.value && oldEff.important === newEff.important) continue

    row.conflictingProps.push({
      prop,
      oldEffective: { value: oldEff.value, important: oldEff.important },
      newEffective: { value: newEff.value, important: newEff.important },
    })
  }
}

export function computeOrderRisks(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }

  const oldOrder = parseSelectorOrder(oldCss, parseOpts)
  const newOrder = parseSelectorOrder(newCss, parseOpts)
  const resolvedOld = resolve(parseCss(oldCss, parseOpts))
  const resolvedNew = resolve(parseCss(newCss, parseOpts))

  const allContexts = new Set([...oldOrder.keys(), ...newOrder.keys()])
  const sortedContexts = ['base', ...[...allContexts].filter(k => k !== 'base').sort()]
  const results = []

  for (const contextKey of sortedContexts) {
    if (!allContexts.has(contextKey)) continue

    const oldList = oldOrder.get(contextKey) || []
    const newList = newOrder.get(contextKey) || []

    const rows = buildOrderRows(oldList, newList)

    const oldCtxProps = resolvedOld.get(contextKey) || new Map()
    const newCtxProps = resolvedNew.get(contextKey) || new Map()

    for (const row of rows) {
      if (row.type === 'moved') {
        annotateMovedRow(row, oldList, newList, oldCtxProps, newCtxProps)
      }
    }

    const hasWarning = rows.some(r => r.type === 'moved')

    if (rows.some(r => r.type !== 'equal')) {
      results.push({ contextKey, rows, hasWarning })
    }
  }

  return results
}
