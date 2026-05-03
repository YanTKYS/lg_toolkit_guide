# lg_toolkit_guide

閉域または庁内ネットワーク環境で利用する、小規模な内部業務支援ツールを安定的に開発するためのドキュメント基盤リポジトリです。

## 1. リポジトリの目的

このリポジトリは、特定アプリの完成を目的とするものではなく、Vibe-coding時に毎回参照する「共通前提」「開発ガードレール」「設計テンプレート」「チェックリスト」を整備することを目的とします。

特に以下を重視します。

- 閉域環境で成立する設計
- 外部依存の抑制
- 個人情報保護
- 説明責任（README・注意文・チェック記録）
- 保守範囲の明確化

## 2. 対象とするツール

- JavaScript: IIS等に配置してブラウザ利用する小規模Webツール
- PowerShell: ファイル整理、CSV処理、Office補助、配布補助
- C#: GUIツール、exe配布、長期利用する内部ツール

## 3. 対象外

- 基幹システムの代替
- 公式記録の保存・管理システム
- 法令判断や最終業務判断の自動化
- インターネット接続やクラウド依存を前提とする仕組み

## 4. docs配下の文書

- `docs/00_policy.md`  
  全体方針、対象範囲、対象外、技術選定の原則。

- `docs/01_ai_coding_rules.md`  
  AIに守らせる実装ルール、禁止事項、言語別ルール。

- `docs/02_tool_design_template.md`  
  個別ツールを設計する際の基本テンプレート。

- `docs/03_security_privacy_rules.md`  
  セキュリティ・個人情報保護・ファイル取扱いルール。

- `docs/04_ui_ux_rules.md`  
  職員向け内部ツールのUI/UX標準。

- `docs/05_release_checklist.md`  
  配布前・利用開始前の実務チェックリスト。

- `docs/06_readme_template.md`  
  各ツールREADMEの標準テンプレート。

- `docs/07_prompt_template.md`  
  Vibe-coding依頼時に使う用途別プロンプトテンプレート。

- `docs/08_test_scenarios_template.md`  
  配布前の正常系・異常系・再実行系を確認するテストシナリオテンプレート。

- `docs/09_operation_handover_template.md`  
  部署間移管・異動時に使う運用引継ぎテンプレート。

## 5. Vibe-codingでの使い方

1. まず `docs/00_policy.md` と `docs/01_ai_coding_rules.md` をAIに必ず読ませる。  
2. 次に、用途に応じて `docs/02`〜`docs/09` を追加で読ませる。  
3. 新規作成・修正・レビューの依頼は `docs/07_prompt_template.md` をひな型にする。  
4. 実装後は `docs/05_release_checklist.md` で確認する。  
5. READMEは `docs/06_readme_template.md` で作成・更新する。

## 6. 推奨する開発の流れ

1. 業務課題を短く定義する。
2. `docs/02_tool_design_template.md` で設計を作る。
3. `docs/07_prompt_template.md` でAIへ実装依頼する。
4. `docs/03_security_privacy_rules.md` と `docs/04_ui_ux_rules.md` で設計・実装を点検する。
5. `docs/05_release_checklist.md` で配布可否を判定する。
6. `docs/06_readme_template.md` で利用者向け説明を整える。
7. `docs/08_test_scenarios_template.md` と `docs/09_operation_handover_template.md` で配布前確認と引継ぎ準備を完了する。

## 7. 共通部品化は後回しにする方針

本リポジトリでは、最初からライブラリ化・フレームワーク化を進めません。

同じ処理が複数回出現し、保守上の利点が明確になってから、最小単位で共通部品化を検討します。

## 8. 注意事項

- 個人情報を保存・送信・ログ出力しない設計を原則とする。
- 元ファイルの上書きや削除など、破壊的処理は原則避ける。
- ツール出力は補助情報であり、最終判断は利用者・所管部署が行う。
- 追加インストールや管理者権限を当然の前提にしない。

## 9. 今後の拡張予定

- よく使う業務カテゴリ別の設計例（CSV、日付計算、帳票補助など）
- 言語別の詳細テストデータ作成例（JavaScript / PowerShell / C#）
- 部署内配布手順テンプレート
- 変更管理・版管理の運用テンプレート

