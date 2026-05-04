# prompts/README.md

## 1. prompts 配下の目的

`prompts` は、Vibe-codingでAIに**そのまま投入できる実行用プロンプト集**です。  
`guides` で定めた方針・ルール・テンプレートを、実際の依頼文に落とし込む役割を持ちます。

## 2. guides との違い

- `guides`: 基準文書（方針、設計、チェックリスト、運用テンプレート）
- `prompts`: 実行文書（AIへ投げる具体的な依頼文）

`guides` は「何を守るか」、`prompts` は「どう依頼するか」を担います。

## 3. 使い方

1. 先に `guides/00_policy.md` と `guides/01_ai_coding_rules.md` を確認する。
2. 目的に合うプロンプトを `prompts/manuals` から選ぶ。
3. ツール名、対象読者、入力/出力、運用条件などの空欄を埋める。
4. AIに投入し、生成された手順書を `guides/05` と `guides/08` 観点で確認する。

## 4. prompts/manuals 配下のファイル

- `01_create_admin_manual.md`  
  管理者（情報政策課、DX担当、管理者、開発保守担当）向け手順書作成プロンプト。

- `02_create_operator_manual.md`  
  所管部署・運用担当部署向け手順書作成プロンプト。

- `03_create_user_manual.md`  
  一般職員向け利用手順書作成プロンプト。

- `04_review_manuals.md`  
  上記3種類の手順書を責任分界・読者適合・方針整合でレビューするプロンプト。

## 5. プロンプトを使う前に読むべき guides

最低限:

- `guides/00_policy.md`
- `guides/01_ai_coding_rules.md`

用途に応じて参照:

- `guides/03_security_privacy_rules.md`
- `guides/04_ui_ux_rules.md`
- `guides/05_release_checklist.md`
- `guides/06_readme_template.md`
- `guides/08_test_scenarios_template.md`
- `guides/09_operation_handover_template.md`

## 6. プロンプト利用時の注意

- 外部通信前提、クラウド依存、外部CDN利用を指示しない。
- 個人情報の保存・ログ出力・外部送信を許容しない。
- 元ファイル上書きや削除など破壊的処理を標準手順にしない。
- できること/できないこと、責任分界、問い合わせ先を明記する。
- 管理者向け・運用向け・利用者向けの読者を混在させない。

## 7. 今後の拡張方針

- 業務カテゴリ別（CSV処理、帳票補助、文書整形など）の手順書作成プロンプト追加
- 手順書の差分更新（版更新）専用プロンプト追加
- 障害報告書、更新通知文、庁内周知文の作成プロンプト追加


## 8. prompts/development 配下のファイル

- `development/01_start_new_tool_from_docs.md`  
  新規ツール開始時に、実装前ドキュメントを先に作るためのプロンプト。

- `development/02_review_generated_tool.md`  
  生成済みツールの方針適合・安全性・文書充足をレビューするプロンプト。

- `development/03_prepare_release_documents.md`  
  配布前にREADME/チェックリスト/手順書を整備・差分確認するプロンプト。


## 9. GitHub URLを直接読めない場合

Vibe-coding実行環境で外部GitHubへ接続できない場合は、次を実施する。

1. `exports/guide_context.md` をAIへ直接提示する。  
2. 必要に応じて、対象タスクに関係する `guides/` と `prompts/` の該当部分を追記する。  
3. ガイド本文未参照のまま推測で進めず、追加コンテキスト提供を依頼する。


## 10. URL参照方式と同梱方式の違い

| 方式 | 概要 | 利点 | 注意点 |
|---|---|---|---|
| URL参照方式 | GitHub上の `lg_toolkit_guide` を直接参照する | 常に最新状態を参照しやすい | 環境制限でアクセス不可になる場合がある |
| 同梱方式 | `exports/guide_context.md` を対象リポジトリの `reference/guide_context.md` に配置して参照する | ネットワーク制限下でも確実に参照できる | 版更新時にコピー元との差分確認が必要 |

推奨: URL参照不可の環境では、同梱方式を標準運用にする。


## 11. 参照テスト時の判定ルール

- URL参照が成功した場合: そのまま `guides/` と `prompts/` を参照して進める。
- URL参照が `403` の場合: `exports/guide_context.md` を提示または同梱して進める。
- リポジトリがスコープ外の場合: 同梱方式を標準とし、必要文書を個別提示する。
- いずれの場合も、ガイド未参照で実装開始しない。


## 12. GitHub Pages / raw / 同梱 の使い分け

| 参照方式 | URL/配置 | 向いている状況 | 注意点 |
|---|---|---|---|
| GitHub Pages | `https://yantkys.github.io/lg_toolkit_guide/` | Webページとして導線付きで参照したい | 環境によって403になる場合がある |
| raw参照 | `https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md` | 最小ガイド本文を直接取得したい | セッションによってrawが遮断される場合がある |
| 同梱参照 | `reference/guide_context.md` | 参照制限がある環境で最も確実に使いたい | コピー元との差分管理が必要 |
| MCP Fetch参照 | Fetch MCP Server経由でPages/rawを取得 | WebFetch失敗時の補助手段として試せる | 必ず成功するわけではなく、MCP可否・経路・設定に依存 |

推奨: Pages → raw → （必要時）MCP Fetch → 同梱の順で確認し、最終的には同梱方式を標準運用にする。
