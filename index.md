# lg_toolkit_guide（GitHub Pages入口）

このページは、`lg_toolkit_guide` をVibe-coding環境から参照しやすくするための入口です。  
リポジトリURLを直接読めない環境でも、Webページとして主要文書へ到達できるように構成しています。

---

## 1. このサイトの目的

- 閉域自治体向け内部ツール開発ガイドを、Webから参照しやすくする。
- docs / prompts / examples / exports への導線を1ページに集約する。
- URL参照不可時の代替手順を明確にする。

## 2. lg_toolkit_guide の概要

`lg_toolkit_guide` は、閉域または庁内ネットワークで利用する小規模内部ツールを、Vibe-codingで安全・継続的に開発するためのドキュメント基盤です。

- `docs/`: 方針・ルール・テンプレート・チェックリスト
- `prompts/`: AIへ投入する実行用プロンプト
- `examples/`: 望ましい記入例
- `exports/`: 参照制限環境向け最小ガイド

## 3. Vibe-coding時の参照方法

1. まず `docs/00_policy.md` と `docs/01_ai_coding_rules.md` を読む。
2. 次に目的に応じて `docs/` と `prompts/` を参照する。
3. 新規開発は `prompts/development/01_start_new_tool_from_docs.md` を起点にする。
4. 配布前はチェックリストとテストシナリオを埋める。

## 4. GitHubリポジトリを直接読めない場合の代替手段

- 代替手段A: `exports/guide_context.md` をプロンプトへ貼り付ける。
- 代替手段B: 対象リポジトリに `reference/guide_context.md` として同梱する。
- 代替手段C: 必要な `docs/` / `prompts/` の抜粋だけ追加提示する。

## 5. exports/guide_context.md

- 最小ガイド: [exports/guide_context.md](./exports/guide_context.md)

## 6. docs 配下の主要文書

- [docs/00_policy.md](./docs/00_policy.md)
- [docs/01_ai_coding_rules.md](./docs/01_ai_coding_rules.md)
- [docs/02_tool_design_template.md](./docs/02_tool_design_template.md)
- [docs/05_release_checklist.md](./docs/05_release_checklist.md)
- [docs/06_readme_template.md](./docs/06_readme_template.md)
- [docs/08_test_scenarios_template.md](./docs/08_test_scenarios_template.md)
- [docs/09_operation_handover_template.md](./docs/09_operation_handover_template.md)

## 7. prompts 配下の主要プロンプト

- [prompts/README.md](./prompts/README.md)
- [prompts/development/01_start_new_tool_from_docs.md](./prompts/development/01_start_new_tool_from_docs.md)
- [prompts/development/02_review_generated_tool.md](./prompts/development/02_review_generated_tool.md)
- [prompts/development/03_prepare_release_documents.md](./prompts/development/03_prepare_release_documents.md)
- [prompts/manuals/01_create_admin_manual.md](./prompts/manuals/01_create_admin_manual.md)
- [prompts/manuals/02_create_operator_manual.md](./prompts/manuals/02_create_operator_manual.md)
- [prompts/manuals/03_create_user_manual.md](./prompts/manuals/03_create_user_manual.md)
- [prompts/manuals/04_review_manuals.md](./prompts/manuals/04_review_manuals.md)

## 8. examples 配下の記入例

- [examples/01_filename_sanitizer/tool_design.md](./examples/01_filename_sanitizer/tool_design.md)
- [examples/01_filename_sanitizer/readme.md](./examples/01_filename_sanitizer/readme.md)
- [examples/01_filename_sanitizer/release_checklist.md](./examples/01_filename_sanitizer/release_checklist.md)
- [examples/01_filename_sanitizer/test_scenarios.md](./examples/01_filename_sanitizer/test_scenarios.md)
- [examples/01_filename_sanitizer/operation_handover.md](./examples/01_filename_sanitizer/operation_handover.md)
- [examples/01_filename_sanitizer/admin_manual.md](./examples/01_filename_sanitizer/admin_manual.md)
- [examples/01_filename_sanitizer/operator_manual.md](./examples/01_filename_sanitizer/operator_manual.md)
- [examples/01_filename_sanitizer/user_manual.md](./examples/01_filename_sanitizer/user_manual.md)

## 9. 別リポジトリで使う場合の推奨手順

1. `exports/guide_context.md` を `reference/guide_context.md` としてコピー。
2. Vibe-coding開始時に `reference/guide_context.md` を参照させる。
3. 必要に応じて `docs/` と `prompts/` の関連文書を追加提示。
4. 実装前に設計・README・チェック・テスト・引継ぎ文書を先に作る。

## 10. 注意事項

- このサイトは参照入口であり、アプリ実装コードは提供しません。
- 外部CDN、外部API、外部フォントは使用していません。
- 最終的な業務判断・記録確定は所管部署と利用者が行ってください。
