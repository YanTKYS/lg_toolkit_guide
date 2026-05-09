# Markdownプロンプト → HTML/XML風プロンプト変換ツール

Markdown形式のプロンプトを、HTML/XML風の構造化プロンプトへ機械的に変換する補助ページです。

GitHub Pages想定URL:

- `https://yantkys.github.io/lg_toolkit_guide/tools/prompt-html-converter/`

## 目的

- 既存のMarkdownプロンプトを、構造が見えやすいHTML/XML風表現へ変換する。
- プロンプトの目的、前提、制約、作業内容、報告事項などをタグ単位で整理しやすくする。
- 生成AI APIや外部サービスを使わず、静的ファイルだけで動作する補助ツールとして提供する。

## 構成

```text
tools/prompt-html-converter/
  index.html
  app.js
  style.css
  README.md
```

## 変換方式

### 汎用section形式

Markdownの見出しを、次のような汎用セクションへ変換します。

```xml
<prompt>
  <section name="目的">
    <p>本文</p>
  </section>
</prompt>
```

### 専用タグ形式

よく使う見出しは、専用タグへ変換します。

| Markdown見出し | 変換後タグ |
|---|---|
| 目的 | `purpose` |
| 背景 | `background` |
| 前提 | `assumptions` |
| 制約 | `constraints` |
| 重要な制約 | `critical_constraints` |
| 作業内容 | `tasks` |
| 出力形式 | `output_format` |
| 作業後の報告 | `report` |
| 注意事項 | `notes` |

対応していない見出しは、汎用section形式へ変換します。

## 主な変換ルール

- `#`、`##`、`###` の見出しをセクションとして扱う。
- 箇条書き `-` は `<item>` に変換する。
- 番号付きリストは `<step>` に変換する。
- コードブロックは `<code_block>` に変換する。
- 通常文は `<p>` に変換する。
- 変換結果は、改行とインデントを付けて出力する。

## 注意事項

- このツールは、MarkdownプロンプトをHTML/XML風の構造に機械的に変換する補助ツールです。
- 変換後のプロンプトが必ず高性能になることを保証するものではありません。
- 生成結果は利用者が確認し、必要に応じて修正してください。
- 個人情報、機微情報、非公開の内部情報は入力しないでください。

## セキュリティ・外部依存

- 生成AI APIは使用しません。
- 外部APIは使用しません。
- 外部CDNは使用しません。
- npm、ビルドツール、フレームワークは使用しません。
- localStorage、sessionStorage、IndexedDB等に入力内容を保存しません。
- 入力内容はブラウザ内でのみ処理し、外部送信しません。
