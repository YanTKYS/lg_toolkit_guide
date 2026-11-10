# Prompt Builder 設計メモ（推奨同梱文書の表示）

## 目的

プロンプトビルダーで、入力条件に応じた「推奨同梱文書」を補助表示する。推薦するのは、`main` にコミット済みの実在文書だけとする。

## 入力項目（推薦に関係するもの）

- 実装方式: 静的Webツール / PowerShellスクリプト / C# Console / C# WinForms / C# WPF / 未定
- 利用機能（複数選択）: Office Word / Excel / Outlookを操作する、Office文書を変換する、Active Directoryを操作する、ファイルを一括処理する、CSVを扱う、PDFを扱う、クリップボードを使う、印刷を行う、個人情報を含む可能性があるデータを扱う、実ファイルを作成・更新する
- 参照方式: 同梱方式 / GitHub Pages / raw 参照方式 / MCP Fetch利用 / 未定

## 推薦条件と文書

| 条件 | 同梱配置名 | 原本（このリポジトリ） |
|---|---|---|
| 常に | `reference/guide_context.md` | `exports/guide_context.md` |
| 個人情報を含む可能性があるデータを扱う / 実ファイルを作成・更新する | `reference/03_security_privacy_rules.md` | `guides/03_security_privacy_rules.md` |
| 実装方式が PowerShell / C# Console / WinForms / WPF | `reference/11_non_web_tool_patterns.md` | `guides/11_non_web_tool_patterns.md` |
| Office操作 / Office変換 | `reference/12_office_interop_checklist.md` | `guides/12_office_interop_checklist.md` |

- 配置名と原本パスの対応は `app.js` の `sourcePaths` で管理する。文書を追加する場合は、`guides/` 等に実ファイルがあることを確認してから登録し、`candidates()` に条件を追加する。
- Active Directory操作、PDF処理には専用ガイドがないため、文書を推薦しない。専門的な仕様や安全策は推測で補わず、環境・業務ルールに従って作業前に確認する。
- `guides/14_github_actions_build_release.md` は、現行の入力項目にGitHub Actions / Release / zip関連の選択肢がないため、推薦対象にしていない。

## 原本リンクと取得URL

- 画面の候補名（`reference/...`）は利用先での同梱配置名。推薦した文書には、このリポジトリ上の原本（GitHub blob）への「原本を開く」リンクを付ける。ページ表示時や生成時に外部通信は行わない。
- GitHub Pages / raw 参照方式、MCP Fetch利用、未定の生成プロンプトには、推薦した文書のraw URLを含める。同梱方式のプロンプトには外部URLを含めない。
- どの方式でも、文書を実際に取得・参照できたことを確認してから利用する。取得できない場合は推測で実装しない。

## 注意

- 推奨同梱文書は補助であり、最終判断は利用者が行う。
- Office Interop、AD操作、ファイル更新、個人情報取扱いなどは実行環境や業務ルールに依存する。判断に迷う場合は、作業前に確認する。
