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
  - GitHub Actionsでビルドする
  - GitHub Releaseを作成する
  - 配布zipを作成する

## 推奨同梱文書の例

| 条件 | 推奨同梱文書 |
|---|---|
| すべて | `reference/guide_context.md` |
| PowerShell / C# / 非Web系 | `reference/11_non_web_tool_patterns.md` |
| C# WinForms / WPF | `reference/11_non_web_tool_patterns.md` |
| Office操作 / Office変換あり | `reference/12_office_interop_checklist.md` |
| GitHub Actionsでビルドする | `reference/14_github_actions_build_release.md` |
| GitHub Releaseを作成する | `reference/14_github_actions_build_release.md` |
| 配布zipを作成する | `reference/14_github_actions_build_release.md` |

## 注意

- 推奨同梱文書は補助であり、最終判断は利用者が行う。
- Office Interop、AD操作、ファイル更新、個人情報取扱い、GitHub Actions / Releaseなどは実行環境や業務ルールに依存する。
- 判断に迷う場合は、追加ガイドを同梱するか、作業前に確認する。

## 原本リンクと取得URL

- 画面の候補名（`reference/...`）は利用先での同梱配置名。実在する推奨文書には、このリポジトリ上の原本（GitHub blob）への「原本を開く」リンクを付ける。
- 外部参照方式・MCP Fetch方式の生成プロンプトには、原本のraw URLを含める。同梱方式のプロンプトには外部URLを含めない。
- 配置名と原本パスの対応は `app.js` の `sourcePaths` で管理する。対応は `reference/guide_context.md` → `exports/guide_context.md`、`reference/11_...` → `guides/11_...`、`reference/12_...` → `guides/12_...`。
- 実体のない将来候補にはリンクを付けない。URLを推測生成しない。
