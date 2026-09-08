# lg_toolkit_guide

閉域または庁内ネットワークで使う小規模な内部業務支援ツールを、Vibe-codingで安全かつ実用的に開発するためのガイド集です。

このリポジトリはアプリ本体や共通コードの置き場ではありません。恒久的な開発ルール、テンプレート、チェックリスト、薄い実行プロンプトを管理します。

## リポジトリの役割分担

- **lg_toolkit_guide**: ガイド、文書テンプレート、プロンプト、ガイド利用の補助ツール
- [**lg_toolkit**](https://github.com/YanTKYS/lg_toolkit): 再利用可能なコード部品
- **個別ツールリポジトリ**: 各内部ツールの実装と案件固有文書

`lg_toolkit_guide` 内に `common/` や共通ライブラリは設けません。本リポジトリ内の実装は、[プロンプトビルダー](https://yantkys.github.io/lg_toolkit_guide/tools/prompt-builder/) などガイド利用の補助ツールに限定します。

## 対象

- JavaScriptによる小規模な静的Webツール
- PowerShellによるファイル・CSV・Office・配布補助
- C#によるGUIやexe配布の内部ツール

基幹システム、公式記録の管理、法令判断や最終業務判断の自動化は対象外です。

## 最短の使い方

1. `guides/00_policy.md` と `guides/01_ai_coding_rules.md` をAIに参照させる。
2. `guides/07_prompt_template.md` を基に、案件固有の目的、対象、要件、制約、今回の作業を書く。
3. 用途に必要な追加ガイドだけを参照させる。
4. 調査、実施、確認、テスト、文書整合、報告まで一連の作業として依頼する。

プロンプトへ閉域や標準成果物などの共通ルールを毎回再掲しません。開発で恒久的な不足が判明したら、プロンプトではなくガイドを更新します。

GitHubを直接参照できない環境では、`exports/guide_context.md` を対象リポジトリの `reference/guide_context.md` として同梱してください。

## ガイド一覧

### 常に参照

- `guides/00_policy.md`: 全体方針、役割分担、完結性、簡素化
- `guides/01_ai_coding_rules.md`: AIの実装・確認・報告ルール

### 必要に応じて参照

- `guides/02_tool_design_template.md`: 設計
- `guides/03_security_privacy_rules.md`: セキュリティ・個人情報
- `guides/04_ui_ux_rules.md`: 一般職員が迷わないUI/UX
- `guides/05_release_checklist.md`: 配布前確認
- `guides/06_readme_template.md`: 現行仕様としてのREADME
- `guides/07_prompt_template.md`: 薄い案件プロンプト
- `guides/08_test_scenarios_template.md`: テスト記録
- `guides/09_operation_handover_template.md`: 運用引継ぎ
- `guides/10_reference_methods.md`: 参照方式
- `guides/11_non_web_tool_patterns.md`: 非Webツール
- `guides/12_office_interop_checklist.md`: Office Interop実機確認
- `guides/13_policy_deviation_review.md`: 第三者AIレビュー、変更申請、判断ログ
- `guides/14_github_actions_build_release.md`: 配布物向けActions / Release（全ツール必須ではない）

## 文書運用の要点

- READMEは現在の利用者が必要とする現行情報を中心にし、更新履歴はrelease notes等へ分離します。
- 「できないこと」や既知の制限は網羅せず、利用・保守判断に必要なものだけ記載します。
- 成果物は規模、段階、配布・引継ぎの必要性に応じて選び、空の文書を機械的に増やしません。
- `exports/guide_context.md` は詳細集ではなく、開始時の最小ガードレールです。個別技術は追加ガイドへ委ねます。

## prompts と補助ツール

`prompts/` はガイドを再掲する場所ではなく、案件固有情報を入力して作業を開始するための実行用プロンプトです。第三者AIレビュー、変更申請、判断ログのプロンプトは現在の役割を維持します。

- [prompts/README.md](prompts/README.md)
- [プロンプトビルダー](https://yantkys.github.io/lg_toolkit_guide/tools/prompt-builder/)
- [Markdownプロンプト → HTML/XML風変換](https://yantkys.github.io/lg_toolkit_guide/tools/prompt-html-converter/)

## GitHub Pages

- 公開入口: https://yantkys.github.io/lg_toolkit_guide/
- 最小ガードレール（raw）: https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md

Pagesやrawを参照できない場合は同梱方式へ切り替え、必要な追加ガイドだけを提示します。ガイドが読めない状態で推測実装を始めません。
