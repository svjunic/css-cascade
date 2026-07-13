# css-cascade

CSS の変更内容を構造レベルで比較するツールです。単純な文字列差分ではなく、**同一セレクタ内で最終的に有効になるプロパティ**を算出したうえで新旧を比較します。

## ドキュメント

- [CLI / ライブラリ](README/cli.md) — インストール・コマンドオプション・JS API
- [GitHub Pages（ブラウザ版）](README/github-pages.md) — ブラウザで使う方法・ローカル開発
- [Claude Code スキル](README/skill.md) — `/css-cascade` コマンドの概要・セットアップ・検証の観点

## 特徴

### CSS 構造を理解した比較

単純な文字列差分ではなく、ブラウザと同じカスケードルールを適用した**最終値**で比較します。

- **後勝ちルール** — `.a { color: red; color: green; }` は `green` だけを有効値として比較
- **`!important` 優先** — `!important` の付与・削除も変更として検出
- **グループセレクタの展開** — `.a, .b { }` は `.a` と `.b` それぞれに展開して比較

### コンテキスト別の差分表示

- **`@media`** — メディアクエリごとに差分を分離して表示
- **`@font-face` / `@keyframes`** — フォントやアニメーションの差分にも対応

### 絞り込みと検索

- **ファジー検索** — セレクタ名でインクリメンタル絞り込み
- **ステータスフィルタ** — 追加 / 削除 / 変更 / 変更なし で絞り込み
- **⚠️ 順序警告フィルタ** — 出現順が変わったセレクタのみ表示

### セレクタ出現順の変更検知

CSS カスケードでは、同じ詳細度（specificity）を持つ複数のセレクタが同一エレメントにマッチするとき、**出現順が後のルールが優先**されます。DOM を使わずに、セレクタの相対的な出現順が変わったことを検知して警告します。

#### 検知パターン

| パターン | 旧 CSS | 新 CSS | 警告 |
|---|---|---|---|
| **単純な並び替え** | A→B→C→D | A→C→B→D | B と C の行に ⚠️ |
| **削除のみ（残りは順序維持）** | A→B→C→D | A→C→D | B を削除行として表示（⚠️ なし） |
| **追加のみ（既存は順序維持）** | A→B→C | A→X→B→C | X を追加行として表示（⚠️ なし） |
| **削除＋並び替え** | A→B→C→D | A→D→C | B 削除（⚠️ なし）＋ C と D は ⚠️ |

⚠️ 行のうち、**同一詳細度**かつ**競合プロパティ**（同じプロパティを異なる値で定義）がある場合は、より強い警告を表示します。

### shorthand / longhand 競合リスクの検出

同一セレクタ内で `padding` と `padding-top` のように **shorthand と longhand が混在**するとき、
後勝ちルールで一方が上書きされるリスクを検出して警告します。

- `margin` / `margin-top` / `margin-inline` など物理・論理プロパティを横断して検出
- 新しく追加されたセレクタへの誤警告は除外

### 比較オプション

- **表記揺れを無視** — `calc(x * 2)` と `calc(x*2)` のような書き方の違いを同一視（`#FFF` = `#ffffff`、先頭ゼロ省略、クォートの有無なども対象）
- **属性セレクタの等価** — `[class*='list']` と `[class*=list]` を同一セレクタとして扱う

---

## ディレクトリ構成

```
css-cascade/
├── data/
│   ├── old/module.css      # 比較元（初期ロード用）
│   └── new/module.css      # 比較先（初期ロード用）
├── src/
│   ├── core/
│   │   ├── parse-cssom.js  # CSS → 中間モデル（ブラウザ CSSStyleSheet API 使用）
│   │   ├── parse-node.js   # Node.js 環境向け Playwright Chromium ブリッジ
│   │   ├── resolve.js      # 後勝ちルール適用 → 最終プロパティ集合
│   │   ├── diff.js         # 新旧の最終プロパティ集合を比較
│   │   ├── apply-risks.js  # shorthand リスクを diff に適用
│   │   ├── order-risk.js   # セレクタ出現順の変更リスク検出
│   │   ├── shorthand-risk.js # shorthand / longhand 競合リスク検出
│   │   ├── specificity.js  # 詳細度（specificity）計算
│   │   ├── normalize.js    # セレクタ・値の正規化ユーティリティ
│   │   ├── index.js        # コア API エクスポート（ブラウザ・CLI 共通）
│   │   └── index.node.js   # Node.js 版公開 API
│   ├── reporters/
│   │   └── html.js         # HTML レポート生成（--format html）
│   ├── styles.css           # ブラウザ版スタイル
│   └── ui/
│       ├── main.js         # エントリーポイント・状態管理
│       ├── render.js       # 差分結果の HTML 生成
│       ├── dropzone.js     # ファイルドロップ UI
│       └── fuzzy.js        # fzf によるファジー検索
├── tests/
│   ├── diff.test.js
│   ├── diff-shorthand.test.js
│   ├── resolve.test.js
│   ├── order-risk.test.js
│   ├── shorthand-risk.test.js
│   ├── specificity.test.js
│   ├── normalize.test.js
│   ├── layer.test.js
│   ├── cli.test.js
│   └── artifacts.test.js
└── index.html
```

## 比較ロジック

```
CSS テキスト
    │
    ▼
parseCss()   ブラウザ CSSStyleSheet API（ブラウザ環境）または
             Playwright Chromium ブリッジ（Node.js 環境）でパースし、
             コンテキスト（base / @media 等）×
             セレクタ×プロパティの宣言リストに変換
    │
    ▼
resolve()    後勝ちルールと !important を適用し、
             各セレクタの最終有効プロパティ集合を算出
    │
    ▼
diff()       新旧の最終プロパティ集合をセレクタ・プロパティ単位で比較し、
             added / removed / changed / unchanged のステータスを付与
```

## 技術スタック

### インターフェース別チェック内容・技術一覧

| インターフェース | チェック内容 | CSS パース方法 | 主な依存 |
|---|---|---|---|
| CLI | diff + order-risk + shorthand-risk（フラグ指定） | Playwright 経由で Chromium の CSSOM を呼び出し | `playwright` |
| スキル | CLI と同等（git diff で変更ファイルを自動検出） | 同上 | `playwright` |
| ブラウザ（GitHub Pages） | diff + order-risk + shorthand-risk（常時実行） | ブラウザ CSSOM を直接利用 | `fzf`（検索）|

### 独自実装と既知のリスク

| モジュール | 実装方式 | リスク |
|---|---|---|
| `specificity.js` | `:is()` / `:has()` 等の詳細度を独自計算 | CSS Selectors Lv4 仕様変更で誤判定の可能性 |
| `parse-cssom.js` `_parseCssTextDecls()` | `cssText` を手動パース（shorthand 保持のため） | Chromium バージョンアップで書式変化の可能性 |
| `normalize.js` `normalizeMediaCondition()` | スロット退避で括弧・クォートをネスト処理 | 深いネスト（`calc()` inside `@supports`）で誤正規化の可能性 |
| `order-risk.js` `buildOrderRows()` | 位置ベースのセレクタアライメント（LCS 未使用） | 巡回移動パターンで誤ペアが生成される可能性 |
| `shorthand-risk.js` `SHORTHAND_MAP` | ショートハンド展開テーブルを手動定義 | 新 CSS プロパティ追加時に漏れる可能性 |
