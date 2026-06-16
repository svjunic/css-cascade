---
name: css-verify-npm
description: SASSやCSSを修正した後に最終的なスタイル変更が想定通りか検証するスキル。「CSS確認して」「スタイル変更を検証して」「/css-verify」「css変更を確認」「CSSの差分を見せて」などのフレーズが出た時に使用。@svjunic/css-diffをnpm経由で取得してCSSの意味的差分を確認する（公開・汎用向け）。
allowed-tools:
  - Bash
  - Read
---

# CSS 差分検証スキル（npm版）

`@svjunic/css-diff` を `npx` 経由で実行し、CSSカスケードルールを踏まえた意味的差分で変更を検証するスキル。テキスト差分ではなく「最終的に有効なプロパティ値」レベルで比較するため、後勝ちルールや `!important` の影響も正確に把握できる。

## 前提条件

- Node.js 18.3.0 以上
- スキルディレクトリで `npm ci` を実行済みであること（初回セットアップ）

```bash
cd .claude/skills/css-verify-npm && npm ci
```

## 実行手順

### Step 1: 変更されたCSS/SCSS/SASSファイルを検出する

```bash
git diff --name-only HEAD -- '*.css' '*.scss' '*.sass'
```

変更ファイルが0件の場合は「検証対象なし（未コミットのCSS変更がありません）」と報告して終了。

### Step 2: ファイルごとに意味的差分を取得する

変更されたファイルそれぞれに対して以下を実行する。

```bash
# git HEADの旧バージョンを一時ファイルに書き出す
# 新規追加ファイルの場合（git showがエラーになる場合）は空ファイルで代替
git show HEAD:<filepath> > /tmp/css-verify-old.css 2>/dev/null || echo "" > /tmp/css-verify-old.css

# 意味的差分を JSON で取得（--filter all で全ステータスを取得）
npx --yes @svjunic/css-diff /tmp/css-verify-old.css <filepath> --format json --filter all
```

終了コードの意味：

- `0` → 差分なし
- `1` → 差分あり（JSON出力を解析する）
- `2` → エラー（ファイル読み込み失敗・CSSパースエラー）

### Step 3: 結果を解釈・報告する

JSON出力の `summary` と `contexts` を読み取り、以下の観点でレポートする。

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

## PostToolUse Hook（自動検証）

CSS/SCSS/SASSファイルの編集後に自動で差分検証を走らせることができる。

### セットアップ

**Step 1: スキルディレクトリでパッケージをインストールする**

```bash
cd .claude/skills/css-verify-npm && npm ci
```

`package-lock.json` のバージョンを厳密に使用するため、`npm install` ではなく `npm ci` を使う。

**Step 2: `.claude/settings.local.json` にhookを追加する**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node ${CLAUDE_PROJECT_DIR}/.claude/skills/css-verify-npm/hooks/posttooluse.js",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**Step 3: セッションを再起動する**（hookはセッション再起動で有効になる）

### hookの動作

- CSSファイル以外の変更: 何も出力しない（サイレント）
- CSS変更なし（HEADと同一）: 何も出力しない
- CSS変更あり: `[css-verify] ファイル名: N 変更 — 意図した変更か確認してください。` をClaudeに通知

## エラー対処

| エラー                               | 原因                     | 対処                                             |
| ------------------------------------ | ------------------------ | ------------------------------------------------ |
| `Exit code 2`                        | CSSパースエラー          | ファイルの構文エラーを確認                       |
| `@svjunic/css-diff が見つかりません` | パッケージ未インストール | `npm install @svjunic/css-diff` を実行           |
| git showがエラー                     | 新規追加ファイル         | 空ファイルを旧バージョンとして使用（Step 2参照） |
