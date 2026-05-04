# lg_toolkit_guide

閉域または庁内ネットワーク環境で使う「小規模な内部業務支援ツール」を、Vibe-codingで安全・継続的に作るための**ドキュメント基盤**です。

> このリポジトリは、アプリ本体のコード集ではありません。  
> AIに毎回渡す共通前提、設計テンプレート、チェックリスト、引継ぎ資料を整備することが目的です。

## 1. このリポジトリでできること（最初に読む）

- 閉域環境前提の開発ルールを統一できる
- 個人情報保護・外部依存回避・元ファイル保護の観点を標準化できる
- ツール設計〜実装依頼〜テスト〜配布判定〜運用引継ぎまでをテンプレート化できる
- 担当者が変わっても、同じ基準で開発・運用しやすくなる

## 2. 対象とするツール

- JavaScript: IIS等に配置してブラウザ利用する小規模Webツール
- PowerShell: ファイル整理、CSV処理、Office補助、配布補助
- C#: GUIツール、exe配布、長期利用する内部ツール

## 3. 対象外

- 基幹システムの代替
- 公式記録の保存・管理システム
- 法令判断や最終業務判断の自動化
- インターネット接続やクラウド依存を前提とする仕組み

## 4. 重要方針（コードを先に作り込まない）

現時点では、次を**作成しません**。

- 共通ライブラリ（JavaScript / PowerShell / C#）
- サンプルアプリ
- CI設定、ビルド設定、パッケージ管理設定

先にドキュメント基盤を固め、同じ処理が複数回出現した段階で最小単位の共通化を検討します。

## 5. Vibe-coding開始時の最短手順（5分版）

1. `docs/00_policy.md` と `docs/01_ai_coding_rules.md` をAIに読み込ませる。  
2. `docs/07_prompt_template.md` の「新規ツール作成依頼」または「既存ツール修正依頼」をコピーする。  
3. 依頼文に「対象業務」「入力」「出力」「対象外」を埋めて実装依頼する。  
4. 実装後、`docs/05_release_checklist.md` と `docs/08_test_scenarios_template.md` で確認する。  
5. `docs/06_readme_template.md` と `docs/09_operation_handover_template.md` を埋めて配布準備する。

## 6. docsの使い分け

### 6.1 最低限読むもの

- `docs/00_policy.md`（全体方針）
- `docs/01_ai_coding_rules.md`（AI実装ルール）

### 6.2 設計時に使うもの

- `docs/02_tool_design_template.md`（設計ひな型）
- `docs/03_security_privacy_rules.md`（個人情報・ファイル安全）
- `docs/04_ui_ux_rules.md`（職員向けUI/UX）
- `docs/07_prompt_template.md`（AI依頼文テンプレート）

### 6.3 配布前に使うもの

- `docs/05_release_checklist.md`（配布可否チェック）
- `docs/08_test_scenarios_template.md`（正常/異常/再実行等の確認）
- `docs/06_readme_template.md`（利用者向けREADME整備）

### 6.4 運用引継ぎ時に使うもの

- `docs/09_operation_handover_template.md`（部署間移管・異動時の引継ぎ）
- `docs/06_readme_template.md`（操作説明・制約・問い合わせ先）

## 7. 最初の実証用ツールを作るときの推奨手順

1. **題材を小さく選ぶ**  
   例: CSV整形、日付変換、定型文生成など「1画面/1機能」で完結するテーマにする。
2. **設計を先に固定する**  
   `docs/02_tool_design_template.md` を埋め、対象外機能を明記する。
3. **安全条件を先に宣言する**  
   個人情報非保存、外部通信なし、元ファイル上書きなしを依頼文に明記する。
4. **AIへ最小実装を依頼する**  
   `docs/07_prompt_template.md` を使い、過剰機能を避ける。
5. **配布前確認を実施する**  
   `docs/05` と `docs/08` で正常系・異常系・再実行系を確認する。
6. **説明と引継ぎ資料を残す**  
   `docs/06` と `docs/09` を埋め、担当変更に備える。

## 8. 推奨する標準フロー

1. 業務課題を短く定義する
2. `docs/02` で設計する
3. `docs/07` で実装依頼する
4. `docs/03` `docs/04` で実装内容を点検する
5. `docs/05` `docs/08` で配布可否を判定する
6. `docs/06` `docs/09` で利用説明と引継ぎを整える

## 9. 注意事項

- 個人情報を保存・送信・ログ出力しない設計を原則とする
- 元ファイルの上書きや削除など、破壊的処理は原則避ける
- ツール出力は補助情報であり、最終判断は利用者・所管部署が行う
- 追加インストールや管理者権限を当然の前提にしない

## 10. 今後の拡張予定

- よく使う業務カテゴリ別の設計例（CSV、日付計算、帳票補助など）
- 言語別の詳細テストデータ作成例（JavaScript / PowerShell / C#）
- 部署内配布手順テンプレート
- 変更管理・版管理の運用テンプレート


## 11. prompts配下（AI実行用プロンプト）

- `prompts/` は、`docs` を実務で使うための「AI投入用プロンプト集」です。
- 手順書作成やレビューを行う際は、`prompts/README.md` と `prompts/manuals/` を使用してください。
- `prompts/development/` には、新規開発開始・生成物レビュー・配布前文書整備のプロンプトを配置します。
- 使う前に、必ず `docs/00_policy.md` と `docs/01_ai_coding_rules.md` を確認してください。


## 12. examples配下（ドキュメント記入例）

- `examples/` は、`docs` と `prompts` を使って実際にどう記入するかを示すサンプル文書集です。
- 実装コードは含まず、設計書・README・チェックリスト・手順書の記入例のみを扱います。


## 13. Vibe-coding時の参照方法（GitHub URLを直接読めない場合）

Vibe-coding実行環境によっては、外部GitHubへのアクセスが制限され、`git clone` やURL参照に失敗する場合があります（例: `CONNECT tunnel failed, response 403`）。

その場合は、次の順で対応してください。

1. `exports/guide_context.md` をプロンプトに貼り付けて参照させる。  
2. 可能であれば `exports/guide_context.md` を対象リポジトリの `reference/guide_context.md` としてコピーして同梱する。  
3. さらに必要な場合は `docs/` と `prompts/` の必要箇所を抜粋して追加提示する。  
4. ガイド本文が参照できない状態で推測実装は行わず、最小ガイド提示を優先する。

推奨運用:

- 通常時: `README.md` → `docs/` → `prompts/` → `examples/` の順で参照。
- 参照不能時: `exports/guide_context.md` を起点にし、足りない情報だけ追加提示。


## 14. GitHub Pagesでの参照

本リポジトリは、GitHub Pagesを有効化すると次のURLで参照できます。

- 想定URL: `https://yantkys.github.io/lg_toolkit_guide/`

> 注意: 上記URLが実際に有効かどうかは、GitHub側でPages設定（公開元: `main` ブランチ / `/ (root)`）を有効化した後に確認が必要です。

Pagesの入口は `index.md` です。
