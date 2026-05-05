# Prompt Builder 設計メモ（同梱ガイド候補表示）

## 目的

プロンプトビルダーで、入力条件に応じた「推奨同梱文書」を補助表示する。

## 想定入力

- 実装方式
  - 静的Web
  - PowerShell
  - C# Console
  - C# WinForms
  - C# WPF
  - 未定
- 利用機能
  - Office Word / Excel / Outlookを操作する
  - Office文書を変換する
  - Active Directoryを操作する
  - ファイルを一括処理する
  - CSVを扱う
  - PDFを扱う
  - クリップボードを使う
  - 印刷を行う

## 推奨同梱文書の例

| 条件 | 推奨同梱文書 |
|---|---|
| すべて | `reference/guide_context.md` |
| PowerShell / C# / 非Web系 | `reference/11_non_web_tool_patterns.md` |
| C# WinForms / WPF | `reference/11_non_web_tool_patterns.md` |
| Office操作 / Office変換あり | `reference/12_office_interop_checklist.md` |

## 注意

- 推奨同梱文書は補助であり、最終判断は利用者が行う。
- Office Interop、AD操作、ファイル更新、個人情報取扱いなどは実行環境や業務ルールに依存する。
- 判断に迷う場合は、追加ガイドを同梱するか、作業前に確認する。
