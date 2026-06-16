---
name: css-verify
description: SASSやCSSを修正した後に最終的なスタイル変更が想定通りか検証するスキル。「CSS確認して」「スタイル変更を検証して」「/css-verify」「css変更を確認」「CSSの差分を見せて」などのフレーズが出た時に使用。プロジェクト内のスクリプトを使ってCSSの意味的差分を確認する（社内・開発環境向け）。
allowed-tools:
  - Bash
  - Read
---

# CSS 差分検証スキル（スクリプト版）

プロジェクト内の `bin/css-diff.js` を使い、CSSカスケードルールを踏まえた意味的差分で変更を検証するスキル。テキスト差分ではなく「最終的に有効なプロパティ値」レベルで比較するため、後勝ちルールや `!important` の影響も正確に把握できる。

## 前提条件

- Node.js 18.3.0 以上

> `<SKILL_DIR>` = このスキルが読み込まれた際に表示される `Base directory for this skill:` のパス。以降の手順でも同様に使用すること。

## 実行手順

### Step 1: 変更されたCSS/SCSS/SASSファイルを検出する

```bash
git diff --name-only HEAD -- '*.css' '*.scss' '*.sass'
```

変更ファイルが0件の場合は「検証対象なし（未コミットのCSS変更がありません）」と報告して終了。

### Step 2: 全変更ファイルを連結して意味的差分を取得する

変更されたファイルをすべて連結して1回だけ比較する（ファイルをまたぐセレクタ順序変化も検出するため）。

```bash
# 連結ファイルを初期化
> /tmp/css-verify-old-full.css
> /tmp/css-verify-new-full.css

# 変更ファイルをアルファベット順で連結（順序を old/new で揃えるため）
for filepath in $(git diff --name-only HEAD -- '*.css' '*.scss' '*.sass' | sort); do
  git show HEAD:${filepath} >> /tmp/css-verify-old-full.css 2>/dev/null || true
  printf "\n" >> /tmp/css-verify-old-full.css
  cat ${filepath} >> /tmp/css-verify-new-full.css
  printf "\n" >> /tmp/css-verify-new-full.css
done

# 大容量ファイル対応: 200KB超の場合は変更差分のみに絞る
COMBINED_SIZE=$(wc -c < /tmp/css-verify-new-full.css)
FILTER_OPT="--filter all"
if [ "$COMBINED_SIZE" -gt 204800 ]; then
  FILTER_OPT="--filter changed"
fi

# 全体ソースで1回だけ比較（--order-risk でファイル間の順序変更も検出）
node <SKILL_DIR>/bin/css-diff.cjs /tmp/css-verify-old-full.css /tmp/css-verify-new-full.css \
  --format json $FILTER_OPT --order-risk
```

終了コードの意味：

- `0` → 差分なし
- `1` → 差分あり（JSON出力を解析する）
- `2` → エラー（ファイル読み込み失敗・CSSパースエラー）

### Step 3: 結果を解釈・報告する

JSON出力の `summary` と `contexts` を読み取り、以下の観点でレポートする。

**大量変更時（`changed + added + removed` 合計が 50 件超）:** `summary` と `orderRisks` のみ報告し、`contexts` の詳細は省略して「変更件数が多いため詳細は省略、直接ファイルを確認してください」と案内する。

**変更の確認ポイント：**

- `changed` プロパティ: 変更前の値 (`oldValue`) → 変更後の値 (`newValue`) を表示
- `added` プロパティ: 意図的な追加か、想定外の副作用かを確認
- `removed` プロパティ: 意図的な削除か確認
- `@media` コンテキスト: メディアクエリ内の変更も見落とさない
- `orderRisks`（`--order-risk` 使用時）: セレクタ出現順の変更リスクを警告

**エージェントとしての判断：**
想定した変更と一致しているか評価し、以下を明示する。

- 意図通りの変更 → 確認済みとして報告
- 想定外の変更 → 警告として報告し、意図的なものか確認を促す
- 変更なし → 問題なしと報告

## オプションの活用

状況に応じて追加オプションを付与する：

| オプション             | 用途                                             |
| ---------------------- | ------------------------------------------------ |
| `--order-risk`         | セレクタ出現順が逆転して影響が変わるリスクを検出 |
| `--ignore-cosmetic`    | `#fff` と `#ffffff` など表記揺れを無視           |
| `--semantic-selectors` | `[attr="val"]` と `[attr='val']` を同一視        |
| `--filter changed`     | 変更されたプロパティのみ表示（デフォルト動作）   |

## 出力例（テキスト形式）

```
[base]
  .btn-primary
    ~ color: #fff → #ffffff  （表記揺れのみ）
    ~ background-color: blue → #0066cc  （実質変更あり）

[@media (max-width: 768px)]
  .container
    + padding: 0 1rem  （追加）

Summary: 1 changed, 1 added
```

## エラー対処

| エラー               | 原因                          | 対処                                             |
| -------------------- | ----------------------------- | ------------------------------------------------ |
| `Exit code 2`        | CSSパースエラー               | ファイルの構文エラーを確認                       |
| `Cannot find module` | bin/css-diff.jsが見つからない | `npm ci` をスキルディレクトリで実行したか確認   |
| git showがエラー     | 新規追加ファイル              | 空ファイルを旧バージョンとして使用（Step 2参照） |
