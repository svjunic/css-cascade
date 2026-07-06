---
name: css-cascade
description: テストが書けない大規模CSSにおいて、変更によるカスケードリスク（セレクタの競合・順序変更による意図しない上書き）を検出するスキル。「/css-cascade」「CSSのカスケードリスクを確認して」「CSSの変更影響を確認して」「CSS変更でカスケードが壊れていないか確認して」などのフレーズが出た時に使用。プロジェクト内のスクリプトを使ってCSSの意味的差分を確認する（社内・開発環境向け）。
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
---

# CSS カスケードリスク確認スキル（スクリプト版）

プロジェクト内の `bin/css-cascade.src.js` を使い、CSSカスケードルールを踏まえた意味的差分で変更を検証するスキル。テキスト差分ではなく**セレクタ単位**で比較し、そのセレクタが最終適用する値（同一セレクタ内の後勝ちルール・`!important`・`@layer` カスケードレイヤー順を考慮）の変化を検出できる。加えて、**同一詳細度セレクタの順序入れ替えによる限定的なカスケード競合リスク**も検出する。

> **スコープの注意**: 比較単位はセレクタごとの最終適用値です。異なるセレクタが同一DOM要素に適用された場合のオーバーラップ（セレクタ間の詳細度競合・DOM構造を跨いだ実効値）は解決しません。例: `.btn { color: red }` に `.btn.primary { color: blue }` を追加した変更は「`.btn.primary` セレクタの追加」として報告されます（`.btn.primary` 要素での実効値変化は直接表現されません）。

## 前提条件

- Node.js 18.3.0 以上
- postcss は初回実行時にスキルディレクトリへ自動インストールされる（npm ci）

> `<SKILL_DIR>` = このスキルが読み込まれた際に表示される `Base directory for this skill:` のパス。以降の手順でも同様に使用すること。

## 実行手順

### Step 1: postcss をスキルディレクトリにインストールする（初回のみ）

```bash
if [ ! -d "<SKILL_DIR>/node_modules/postcss" ]; then
  echo "postcss をインストールしています（初回のみ）..."
  npm ci --prefix <SKILL_DIR>
fi
```

`<SKILL_DIR>/node_modules/postcss` が存在しない場合は `npm ci` でインストールしてから Step 2 へ進む。`node_modules` が存在する場合はスキップする。

### Step 2: 変更されたCSSファイルを検出する

```bash
git diff --name-only HEAD -- '*.css'
```

検出対象は `.css` ファイルのみです（SCSS/SASS ソースファイルは対象外）。コンパイル後の CSS ファイルを検証してください。

変更ファイルが0件の場合は「検証対象なし（未コミットのCSS変更がありません）」と報告して終了。

> 変更ファイルが1件以上あった場合は、必ず Step 3 のスクリプトを実行すること。
> git diff のテキスト差分だけで変更内容を判断しないこと。

### Step 3: HTMLレポートを生成し、意味的差分を取得する

#### Step 3a: 各ファイルのHTMLレポートを生成する

変更された各ファイルを個別に比較し、HTMLレポートを `css-cascade-report/YYYYMMDD-HHMMSS/` にタイムスタンプ付きサブディレクトリで出力する。
セレクタ順序の変更も検出するため `--order-risk` を常に付与する。

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
REPORT_DIR="css-cascade-report/$TIMESTAMP"
[ -d "$REPORT_DIR" ] && echo "EXISTS:$REPORT_DIR" || echo "OK:$REPORT_DIR"
```

`EXISTS:...` が出力された場合は、**AskUserQuestion ツール**で確認する：
- 質問: 「以下のディレクトリが既に存在します。続行すると内容が上書きされます。続行してよいですか？（対象: $REPORT_DIR）」
- 選択肢: 「続行する（上書きOK）」 / 「キャンセルする」

「キャンセルする」が選択された場合はスキルの実行を中止する。

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
REPORT_DIR="css-cascade-report/$TIMESTAMP"
mkdir -p "$REPORT_DIR"
WORK_DIR=$(mktemp -d)

while IFS= read -r -d '' filepath; do
  SLUG="$(printf '%s' "$filepath" | tr '/ ' '__')"
  OLD="$WORK_DIR/old-${SLUG}.css"
  git show "HEAD:$filepath" > "$OLD" 2>/dev/null || : > "$OLD"
  OUTPUT_HTML="$REPORT_DIR/${SLUG}.html"
  node "<SKILL_DIR>/bin/css-cascade.src.js" \
    "$OLD" "$filepath" \
    --format html --order-risk > "$OUTPUT_HTML" 2>&1 || true
  echo "HTMLレポート: file://$(pwd)/$OUTPUT_HTML"
done < <(git diff --name-only -z HEAD -- '*.css' | sort -z)

rm -rf "$WORK_DIR"
```

#### Step 3b: 各ファイルを並列で比較してClaudeが読むための意味的差分を取得する

各ファイルを並列処理し、終了後にソート順で結合して出力する。

```bash
WORK_DIR=$(mktemp -d)

while IFS= read -r -d '' filepath; do
  (
    SLUG="$(printf '%s' "$filepath" | tr '/ ' '__')"
    OLD="$WORK_DIR/old-${SLUG}.css"
    OUT="$WORK_DIR/out-${SLUG}.txt"
    git show "HEAD:$filepath" > "$OLD" 2>/dev/null || : > "$OLD"
    echo "=== $filepath ===" > "$OUT"
    node "<SKILL_DIR>/bin/css-cascade.src.js" "$OLD" "$filepath" \
      --format json --order-risk --filter all >> "$OUT" 2>&1
    echo $? > "$WORK_DIR/exit-${SLUG}.code"
  ) &
done < <(git diff --name-only -z HEAD -- '*.css' | sort -z)

wait

OVERALL_EXIT=0
while IFS= read -r -d '' filepath; do
  SLUG="$(printf '%s' "$filepath" | tr '/ ' '__')"
  cat "$WORK_DIR/out-${SLUG}.txt"
  FILE_EXIT=$(cat "$WORK_DIR/exit-${SLUG}.code" 2>/dev/null || echo 0)
  [ "$FILE_EXIT" -gt "$OVERALL_EXIT" ] && OVERALL_EXIT=$FILE_EXIT
done < <(git diff --name-only -z HEAD -- '*.css' | sort -z)

echo "CLEANUP_DIR=$WORK_DIR"
exit $OVERALL_EXIT
```

上記コマンドの出力から `CLEANUP_DIR` の値（一時ディレクトリのパス）を取得する。

一時ディレクトリを削除する前に、**AskUserQuestion ツール**で確認する：
- 質問: 「以下の一時ディレクトリを削除します。続行してよいですか？（対象: <CLEANUP_DIR の値>）」
- 選択肢: 「削除する」 / 「キャンセルする」

「キャンセルする」が選択された場合は削除をスキップする。「削除する」が選択された場合は以下を実行する（`<CLEANUP_DIR の値>` には取得した実際のパスを代入する）：

```bash
rm -rf "<CLEANUP_DIR の値>"
```

終了コードの意味（`OVERALL_EXIT` = 全ファイル中の最大値）：

- `0` → 差分なし・順序変更リスクなし（全ファイル）
- `1` → 差分あり、または順序変更リスクあり（いずれか1ファイル以上）
- `2` → エラー（ファイル読み込み失敗・CSSパースエラー）

### Step 4: 結果を解釈・報告する

Step 3b の出力は `=== filepath ===` セパレータで区切られたファイルごとの JSON ブロックになっている。各ファイルの `summary` と `contexts` を読み取り、ファイルごとに報告する。
**HTMLレポートのパスを必ず表示すること。**

**JSON 出力の構造（Step 3b の各ブロックの形式）：**

```json
{
  "version": 1,
  "summary": { "changed": 2, "added": 1, "removed": 0, "unchanged": 14 },
  "contexts": [
    {
      "key": "@media screen",
      "status": "changed",
      "changeCount": 3,
      "selectors": [
        {
          "selector": ".foo .bar",
          "status": "changed",
          "changeCount": 2,
          "props": [
            { "prop": "color",   "status": "changed",  "oldValue": "red",  "newValue": "blue" },
            { "prop": "display", "status": "added",                         "newValue": "flex" },
            { "prop": "margin",  "status": "removed",  "oldValue": "8px"                      }
          ]
        }
      ]
    }
  ],
  "orderRisks": [
    {
      "contextKey": "base",
      "hasWarning": true,
      "rows": [
        {
          "type": "moved",
          "oldSelector": ".foo",
          "newSelector": ".foo",
          "sameSpecificity": true,
          "conflictingProps": [
            {
              "prop": "color",
              "oldEffective": { "value": "red", "important": false },
              "newEffective": { "value": "blue", "important": false }
            }
          ]
        }
      ]
    }
  ]
}
```

フィールドの意味：
- `contexts[].key`: コンテキスト識別子（`@media screen` / `root` など）
- `contexts[].selectors[].props[].status`: `"changed"` / `"added"` / `"removed"` のいずれか
- `props[].oldValue`: 変更前の値（`status` が `changed` または `removed` の場合のみ存在）
- `props[].newValue`: 変更後の値（`status` が `changed` または `added` の場合のみ存在）
- `orderRisks[].contextKey`: リスクが発生するコンテキスト（`"base"` / `"@media screen"` など）
- `orderRisks[].rows[].type`: 変更種別（`"moved"` / `"added"` / `"deleted"` / `"equal"`）
- `orderRisks[].rows[].oldSelector` / `newSelector`: 移動前後のセレクタ
- `orderRisks[].rows[].sameSpecificity`: 詳細度が同一かどうか（true のとき順序が効く）
- `orderRisks[].rows[].conflictingProps[].prop`: 競合プロパティ名
- `orderRisks[].rows[].conflictingProps[].oldEffective` / `newEffective`: 変更前後の適用値と `!important` フラグ

**大量変更時（ファイル全体で `changed + added + removed` 合計が 50 件超）:** `summary` のみ報告し、「変更件数が多いため詳細はHTMLレポートを参照してください」と案内する。

**変更の確認ポイント：**

- `changed` プロパティ: 変更前の値 (`oldValue`) → 変更後の値 (`newValue`) を表示
- `added` プロパティ: 意図的な追加か、想定外の副作用かを確認
- `removed` プロパティ: 意図的な削除か確認
- `@media` コンテキスト: メディアクエリ内の変更も見落とさない

**順序変更の報告（プロパティ変更がゼロでも必ず確認）：**

JSON の `orderRisks` フィールドを確認する。`hasWarning: true` のエントリがあれば順序変更あり。
`rows[].conflictingProps` が存在するエントリはカスケード競合（後勝ちルールで適用値が変わる）を意味するため特に注意して報告する。
競合プロパティは `rows[].conflictingProps[].prop` で確認し、`oldEffective` / `newEffective` で変更前後の適用値を確認する。

```
⚠️ **順序変更が検出されました**
セレクタの並び順が変更されています。想定通りの変更か確認してください。

HTMLレポートで詳細を確認してください:
→ css-cascade-report/docs--common.css.html
```

**エージェントとしての判断：**

このスキルの目的は「**同一セレクタ内**でのプロパティ値変化、および**同一詳細度セレクタの順序入れ替えによる限定的なカスケード競合リスク**を検出すること」である。異なるセレクタが同一DOM要素に当たる場合のオーバーラップ解決はスコープ外であるため、その点を過大報告しないよう注意すること。

- プロパティ変更あり → 変更内容が「意図した変更の直接的な結果」か「同一セレクタ内での副作用」かを区別して報告。HTMLレポートも案内する
- プロパティ変更ゼロ・順序変更あり → `⚠️ **順序変更が検出されました**` と警告し、HTMLレポートへ誘導する
- 差分なし（exit code 0）かつ順序変更なし → 問題なしと報告

**出力フォーマット：**

全ファイルの結果をサマリーテーブルにまとめ、⚠️ のファイルのみ変更詳細を展開する。

```markdown
| 判定 | ファイル | changed | added | removed | 順序変更 | その他 | レポート |
|------|---------|---------|-------|---------|---------|--------|---------|
| ✅ | common.css | 0 | 0 | 0 | なし | | - |
| ⚠️ | main.css | 2 | 1 | 0 | あり (color, bg) | | [main--css.html](file:///abs/path/css-cascade-report/main--css.html) |
| ❌ | broken.css | - | - | - | - | CSSパースエラー | - |
```

列の定義：
- **判定**: `✅`（問題なし）/ `⚠️`（変更あり または 順序変更あり）/ `❌`（エラー）
- **順序変更**: `orderRisks` に `hasWarning: true` があれば「あり」＋`conflictingProps` を併記
- **その他**: エラーメッセージ、標準外プロパティの警告など
- **レポート**: Step 3a が出力した `file://` URL を `[filename](url)` 形式の markdown リンクにして記載。Claude Code UI でクリックするとブラウザで開ける。エラー時は `-`

⚠️ のファイルがある場合、テーブルの後に変更詳細を展開する：

```markdown
#### main.css の変更詳細
- `@media screen` › `.foo .bar`
  - `color`: `red` → `blue`
  - `display`: （追加）`flex`
```

大量変更時（50 件超）はテーブルのサマリーのみ掲載し、詳細はレポートへ誘導する。

**プロパティ名の検証：**

差分の全コンテキストに含まれるすべての `prop` 値（`added`・`changed`・`removed` のすべてのステータスが対象）を確認し、以下の条件をすべて満たすものを「標準外プロパティ」としてフラグを立てる：

1. `--` で始まるCSSカスタムプロパティでないこと（例: `--primary-color` は除外）
2. `-webkit-`・`-moz-`・`-ms-`・`-o-` などのベンダープレフィックスで始まらないこと
3. 標準のCSSプロパティとして認識できないこと（Claudeの知識で判断）

標準外プロパティが見つかった場合は以下の形式で報告する：

```
⚠️ **標準外のプロパティ名が含まれています**
以下のプロパティはCSSの標準プロパティではありません。タイポの可能性があります：
- `disyplay`（`display` の間違いでしょうか？）
```

- 候補が推測できる場合はサジェストする
- 推測が難しい場合は「標準CSSプロパティではありません」とだけ伝える

## エラー対処

| エラー                    | 原因                          | 対処                                                            |
| ------------------------- | ----------------------------- | --------------------------------------------------------------- |
| `Cannot find module`      | postcss 未インストール        | Step 1 の `npm ci --prefix <SKILL_DIR>` を手動実行する |
| `Exit code 2`             | CSSパースエラー               | ファイルの構文エラーを確認                                      |
| git showがエラー          | 新規追加ファイル              | 空ファイルを旧バージョンとして使用（Step 3参照）               |
