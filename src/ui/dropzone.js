/**
 * dropzone.js
 * ドラッグ&ドロップおよびクリックによる CSS ファイル読み込みコンポーネント。
 */

/**
 * ドロップゾーンを初期化する。
 *
 * @param {HTMLElement} el - ドロップゾーン要素
 * @param {(text: string, fileName: string) => void} onLoad - CSS テキストと
 *   ファイル名を受け取るコールバック
 */
export function initDropzone(el, onLoad) {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '.css'
  fileInput.style.display = 'none'
  el.appendChild(fileInput)

  function readFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => {
      onLoad(e.target.result, file.name)
    }
    reader.readAsText(file, 'UTF-8')
  }

  // クリックでファイル選択
  el.addEventListener('click', () => fileInput.click())
  fileInput.addEventListener('change', () => {
    if (fileInput.files?.[0]) {
      readFile(fileInput.files[0])
      fileInput.value = '' // 同じファイルを再選択できるようリセット
    }
  })

  // ドラッグ&ドロップ
  el.addEventListener('dragover', e => {
    e.preventDefault()
    el.classList.add('dragover')
  })

  el.addEventListener('dragleave', e => {
    // 子要素へのホバーは無視
    if (!el.contains(e.relatedTarget)) {
      el.classList.remove('dragover')
    }
  })

  el.addEventListener('drop', e => {
    e.preventDefault()
    el.classList.remove('dragover')
    const file = e.dataTransfer?.files?.[0]
    if (file) readFile(file)
  })
}

/**
 * ドロップゾーンの表示状態を更新する。
 *
 * @param {HTMLElement} el
 * @param {{ fileName: string|null, lineCount?: number }} state
 */
export function updateDropzoneState(el, { fileName, lineCount } = {}) {
  const labelEl = el.querySelector('.dropzone-label')
  const subEl = el.querySelector('.dropzone-sub')

  if (fileName) {
    el.classList.add('loaded')
    if (labelEl) labelEl.textContent = fileName
    if (subEl) subEl.textContent = lineCount != null ? `${lineCount.toLocaleString()} 行` : ''
  } else {
    el.classList.remove('loaded')
    if (labelEl) labelEl.textContent = el.dataset.defaultLabel || 'CSS をドロップ'
    if (subEl) subEl.textContent = 'またはクリックして選択'
  }
}
