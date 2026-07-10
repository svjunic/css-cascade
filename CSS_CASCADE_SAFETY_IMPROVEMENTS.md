# CSS Cascade 安全性向上の改修計画

## 目的

このツールは、ブラウザ上の完全な動作保証ではなく、テストが十分でない案件において CSS 変更の見落としを減らし、追加確認が必要な箇所を特定するための静的解析ツールと位置づける。

特にスキルから利用する場合、解析結果を「安全の証明」ではなく「確認対象を絞り込むための判断材料」として扱う。

---

## P0：誤った安全判定を防ぐ

### 1. 解析結果に信頼度を追加する

JSON 出力に解析の確実性を表す情報を追加する。

```json
{
  "analysis": {
    "confidence": "high",
    "complete": true,
    "warnings": [],
    "unsupportedFeatures": []
  }
}
```

想定する値：

- `high`: 対応済み構文だけで構成されている
- `medium`: ヒューリスティックな解析を含む
- `low`: 未対応・不確実な構文が存在する

受け入れ条件：

- 未対応構文があれば `complete: false` になる
- スキルが `confidence` と `complete` を参照して判断できる
- `no differences` と `analysis complete` を区別できる

### 2. 未対応構文を黙って処理しない

少なくとも次の構文を検出する。

- CSS Nesting
- `@scope`
- nested cascade layer
- `var()` を含む宣言
- `@property`
- `@starting-style`
- `revert` / `revert-layer`
- CSS-wide keywords
- logical/physical property の競合
- 未知の block at-rule

未対応時は、誤った結果を返す代わりに警告する。

```json
{
  "code": "UNSUPPORTED_CSS_NESTING",
  "severity": "warning",
  "context": ".card",
  "message": "Nested rule の実効値は解析されていません"
}
```

受け入れ条件：

- 未対応構文の存在箇所を可能な限り行・列付きで返す
- text、JSON、HTML の全形式で警告を確認できる
- JSON では安定した機械可読コードを使用する
- strict mode では終了コードを非ゼロにできる

### 3. 終了コードを細分化する

差分と解析不完全を区別する。

| 終了コード | 意味 |
|---:|---|
| `0` | 差分なし、解析完了 |
| `1` | 差分またはリスクあり |
| `2` | 入力・パース・実行エラー |
| `3` | 解析不完全、未対応構文あり |

互換性を維持する場合は、`--strict` 指定時だけ `3` を使用する。

受け入れ条件：

- 「差分なしだが未対応構文あり」が `0` にならない
- スキルから終了コードだけでも次の行動を選択できる
- README に CI・スキル用途の扱いを記載する

---

## P1：主要な誤検出・見逃しを減らす

### 4. shorthand を標準解析経路へ統合する

現状、ライブラリと Web UI は shorthand risk の補正を標準で適用していない。

対象：

- `diffCss()`
- CLI
- Web UI
- HTML reporter
- JSON reporter

改修方針：

- 可能な shorthand は longhand に展開してから解決する
- 実効値の変更と、宣言の勝者だけの変更を分離する
- winner が変わっても値が同じ場合は通常の `changed` にしない

```json
{
  "status": "unchanged",
  "risks": [
    {
      "type": "declaration-source-changed",
      "property": "padding-right"
    }
  ]
}
```

受け入れ条件：

- `padding` と `padding-right` の順序変更を全エントリーポイントで同じように検出する
- 実効値が同じなら値変更として数えない
- shorthand の追加・削除による longhand の reset を検出する
- 未対応 shorthand は警告する

### 5. cascade layer を階層構造として扱う

現在の一次元 `layerRank` では nested layer の優先順位を正しく表せない。

改修方針：

- layer を `['reset', 'type']` のようなパスで保持する
- root layer の順序を最優先する
- 同じ親の中だけで sublayer の順序を比較する
- `!important` の layer 順逆転も階層単位で処理する

受け入れ条件：

```css
@layer reset, components;

@layer reset {
  @layer type {
    .x { color: red; }
  }
}

@layer components {
  .x { color: blue; }
}
```

上記で通常宣言は `blue`、`!important` の条件に応じて規格どおりの結果になる。

### 6. CSS Nesting を処理または明示的に拒否する

短期対応：

- nested rule を検出して解析不完全とする
- 親 selector と位置情報を警告に含める

中期対応：

- nested selector を正規の selector に展開する
- `&`、implicit nesting、selector list を扱う
- nesting による specificity を規格どおり計算する

受け入れ条件：

```css
.card {
  color: red;

  &:hover {
    color: blue;
  }
}
```

`&:hover` の変更が無視されない。

### 7. `@scope` を base context に平坦化しない

短期対応：

- `@scope` を未対応として警告する
- scoped declaration を base の勝者にしない

中期対応：

- scope root と scope limit を context に保持する
- scoped rule と非 scoped rule を別々に比較する
- scoping proximity を扱えない場合は confidence を下げる

受け入れ条件：

- scope 外の要素にも scoped declaration が適用されるような報告をしない
- scope 条件を JSON/HTML 出力から確認できる

### 8. custom property の影響を伝播する

完全な `var()` 解決は DOM・継承関係が必要なため、段階的に対応する。

短期対応：

- custom property が変更されたら、その変数を参照する宣言を `affected` として報告する

```json
{
  "property": "color",
  "status": "possibly-changed",
  "value": "var(--theme-color)",
  "dependencies": ["--theme-color"]
}
```

中期対応：

- 同一 selector・同一 context 内の単純な `var()` を解決する
- fallback を扱う
- 依存関係を再帰的に追跡する
- 循環参照を検出する

受け入れ条件：

```css
.x {
  --theme-color: red;
  color: var(--theme-color);
}
```

`--theme-color` の変更時に `color` が unchanged とだけ表示されない。

---

## P2：ヒューリスティック解析を安全側にする

### 9. cosmetic normalization をトークン単位にする

現在の正規表現ベースの正規化は、色以外の `#ABC` や引用符まで変更する可能性がある。

危険例：

```css
filter: url(#ABC);
filter: url(#abc);
```

改修方針：

- CSS value tokenizer/parser を使用する
- `url()`、文字列、custom property の中身を保護する
- 色として確定できるトークンだけ正規化する
- 判断できない値は差分を残す

受け入れ条件：

- URL fragment の大文字・小文字を同一視しない
- 文字列と identifier を同一視しない
- custom property のトークン列を勝手に変更しない

### 10. order risk を「確定差分」と分離する

DOM がなければ、2つの selector が同一要素にマッチするか確定できない。

改修方針：

- `diff` と `risk` を別カテゴリーにする
- risk に確度を持たせる
- layer、importance、specificity をすべて考慮する
- selector の同時マッチ可能性を判定できない場合は `possible` とする

```json
{
  "type": "selector-order",
  "confidence": "possible",
  "selectors": [".button", ".primary"],
  "properties": ["color"]
}
```

受け入れ条件：

- order risk だけで「実効値変更が確定」と表現しない
- スキルが risk の確度を読み取れる
- layer が異なる selector を単純な source order だけで判定しない

### 11. logical property と physical property を区別する

次の関係は writing mode や direction に依存する。

```css
padding-right: 10px;
padding-inline-end: 20px;
```

改修方針：

- logical property を physical shorthand の固定 longhand として扱わない
- `direction` / `writing-mode` 不明時は競合可能性として報告する
- ブラウザ環境を与えられる場合だけ physical side に解決する

受け入れ条件：

- `padding` が無条件に `padding-inline-end` の shorthand と判定されない
- writing mode 依存の結果に uncertainty が付く

---

## P3：スキル利用を強化する

### 12. スキル向け JSON 契約を定義する

JSON Schema または TypeScript 型として公開する。

```ts
interface CssCascadeReport {
  version: number;
  summary: DiffSummary;
  analysis: {
    complete: boolean;
    confidence: 'high' | 'medium' | 'low';
    warnings: AnalysisWarning[];
    unsupportedFeatures: UnsupportedFeature[];
  };
  contexts: ContextDiff[];
  risks: Risk[];
}
```

受け入れ条件：

- schema version を持つ
- breaking change 時の移行方針がある
- CLI、ライブラリ、スキルで同じ構造を使う
- warning code と risk type が文書化されている

### 13. スキルの判断規則を明文化する

スキルは次のように判断する。

```text
1. complete=false の場合、安全とは判定しない
2. unsupportedFeatures がある場合、該当 CSS と関連コンポーネントを確認する
3. high severity risk がある場合、ブラウザ確認を要求する
4. no differences かつ complete=true の場合のみ「静的解析範囲で差分なし」と報告する
5. 最終的な安全保証とは表現しない
```

推奨する出力表現：

> 静的解析で明確な差分は検出されませんでした。ただし、これはブラウザ上の表示不変を保証するものではありません。

### 14. 解析結果から確認チェックリストを生成する

スキルが次の追加確認を提案できるようにする。

- 影響する selector
- 関連する custom property
- 該当する media/container 条件
- order risk の相手 selector
- shorthand で影響する longhand
- ブラウザ確認が必要な viewport
- 関連 HTML/JSX/Vue template の検索候補

---

## テスト戦略

### 15. 規格準拠ケースをテーブル化する

最低限、次のカテゴリーを独立した fixture として持つ。

- source order
- `!important`
- cascade layer
- nested layer
- shorthand/longhand
- custom property
- CSS Nesting
- `@scope`
- CSS-wide keywords
- logical properties
- media/supports/container
- invalid declaration
- cosmetic normalization

各 fixture は以下を持つ。

```text
old.css
new.css
expected.json
expected-analysis.json
```

### 16. 実ブラウザとの differential test を追加する

静的解析結果を、Chromium の `getComputedStyle()` と比較する。対象は小さな HTML fixture に限定する。

```html
<div class="scope">
  <div id="target" class="x"></div>
</div>
```

比較対象：

- color
- margin/padding
- border
- font
- display
- custom property 経由の値
- layer
- nesting
- scope

完全一致を要求できないケースは、少なくとも静的解析が「安全」と誤判定しないことを検証する。

### 17. false negative を最重要テストとする

安全支援ツールでは、見逃しを優先して防ぐ。

優先順位：

1. 実効値が変わったのに `no differences`
2. 解析不能なのに `complete: true`
3. 実効値不変なのに `changed`
4. 表示・メッセージの軽微な差

---

## ドキュメント修正

### 18. README の表現を実装範囲に合わせる

変更前：

> ブラウザと同じカスケードルールを適用した最終値で比較します。

変更案：

> CSS を構造的に解析し、対応範囲内で selector ごとの宣言競合を解決して比較します。DOM、継承、実行時条件を含むブラウザの computed style を完全に再現するものではありません。未対応または不確実な構文は警告として報告します。

### 19. 保証範囲を一覧化する

README に次の表を追加する。

| 機能 | 対応状況 | 結果の扱い |
|---|---|---|
| 同一 selector 内の source order | 対応 | 確定 |
| `!important` | 対応 | 確定 |
| 基本的な cascade layer | 対応 | 確定 |
| nested layer | 未対応 | 警告 |
| shorthand | 部分対応 | risk |
| custom property | 影響追跡のみ | possible |
| CSS Nesting | 未対応 | 警告 |
| `@scope` | 未対応 | 警告 |
| 継承 | 未対応 | DOM確認 |
| computed style | 未対応 | ブラウザ確認 |

---

## 推奨実装順

1. `warnings` / `unsupportedFeatures` / `complete` の追加
2. 未対応構文の検出
3. strict mode と終了コード
4. shorthand の全エントリーポイント統合
5. 値変更と risk の分離
6. nested layer の修正
7. cosmetic normalization の安全化
8. custom property の依存関係追跡
9. CSS Nesting 対応
10. `@scope` 対応
11. ブラウザ differential test

この順序なら、解析能力を増やす前に「分からないものを分からないと報告する」安全性を確保できる。
