import { parseCss, parseSelectorOrder } from './parse-cssom.js'
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
  // インデックス一致でペアリングするため、巡回移動では意味的に無関係なペアが生成される場合がある。
  // annotateMovedRow の相対順反転ガードがこれらの偽ペアを除外する。
  // 根治は LCS ベースのペアリングに再設計する別タスクとして追跡中。
  const pairing = new Map()
  for (let i = 0; i < oldCommon.length; i++) {
    pairing.set(oldCommon[i], newCommon[i])
  }

  const rows = []
  let ni = 0
  // 対称スワップ（A→B かつ B→A）で同じペアの moved 行が2つ生成されるのを防ぐ。
  // 正規化したペアキーを追跡し、逆方向の行はスキップする（ni は消費する）。
  const seenMovedPairs = new Set()

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

    if (oldSel === pairedNew) {
      rows.push({ type: 'equal', oldSelector: oldSel, newSelector: pairedNew })
    } else {
      const pairKey = [oldSel, pairedNew].sort().join('\x00')
      if (!seenMovedPairs.has(pairKey)) {
        seenMovedPairs.add(pairKey)
        rows.push({ type: 'moved', oldSelector: oldSel, newSelector: pairedNew })
      }
      // 逆方向の行はスキップ（ni は消費する）
    }
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
  row.hasOverlappingProps = false

  const oldPosA = oldList.indexOf(selA)
  const oldPosX = oldList.indexOf(selX)
  const newPosA = newList.indexOf(selA)
  const newPosX = newList.indexOf(selX)

  if (oldPosA < 0 || oldPosX < 0 || newPosA < 0 || newPosX < 0) return

  // 相対順が変わっていないペアは順序起因の競合を生まないためスキップ。
  // ペアリングのインデックス一致由来の偽ペア（巡回移動で実際には反転していない組合せ）を除外する。
  const oldAbeforeX = oldPosA < oldPosX
  const newAbeforeX = newPosA < newPosX
  if (oldAbeforeX === newAbeforeX) return

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
    // 両セレクタが同プロパティを宣言している（値が同じでも hasOverlappingProps=true）
    row.hasOverlappingProps = true
    if (entryNewA.value === entryNewX.value && entryNewA.important === entryNewX.important) continue

    // 旧・新それぞれの並び順で勝者を判定する。
    // 詳細度が異なる場合は順序に関わらず同じセレクタが勝つため、有効値は変わらない＝誤検出しない。
    const oldWinner = pickWinner(selA, selX, oldA.get(prop), oldX.get(prop), specCmp, oldPosA, oldPosX)
    const newWinner = pickWinner(selA, selX, entryNewA, entryNewX, specCmp, newPosA, newPosX)
    if (!newWinner) continue

    if (!oldWinner) {
      // 旧 CSS では両セレクタともこのプロパティを宣言していなかった（新規追加）。
      // 旧ソース順で新プロパティを適用した場合の代替勝者と、実際の新勝者を比較し、
      // 順序変更によって有効値が変わる場合のみ競合として報告する。
      const altWinner = pickWinner(selA, selX, entryNewA, entryNewX, specCmp, oldPosA, oldPosX)
      if (!altWinner || altWinner === newWinner) continue
      const altEff = newCtxProps.get(altWinner)?.get(prop)
      const newEff = newCtxProps.get(newWinner)?.get(prop)
      if (!altEff || !newEff) continue
      if (altEff.value === newEff.value && altEff.important === newEff.important) continue
      row.conflictingProps.push({
        prop,
        oldEffective: null,
        newEffective: { value: newEff.value, important: newEff.important },
      })
      continue
    }

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

export async function computeOrderRisks(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }

  const [oldOrder, newOrder, parsedOld, parsedNew] = await Promise.all([
    parseSelectorOrder(oldCss, parseOpts),
    parseSelectorOrder(newCss, parseOpts),
    parseCss(oldCss, parseOpts),
    parseCss(newCss, parseOpts),
  ])
  const resolvedOld = resolve(parsedOld)
  const resolvedNew = resolve(parsedNew)

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

    // 共通プロパティを持つ moved 行がある場合のみ warning（無関係プロパティのスワップは除外）
    const hasWarning = rows.some(r => r.type === 'moved' && r.hasOverlappingProps)

    if (rows.some(r => r.type !== 'equal')) {
      results.push({ contextKey, rows, hasWarning })
    }
  }

  return results
}
