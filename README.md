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

1. `guides/00_policy.md` と `guides/01_ai_coding_rules.md` をAIに読み込ませる。  
2. `guides/07_prompt_template.md` の「新規ツール作成依頼」または「既存ツール修正依頼」をコピーする。  
3. 依頼文に「対象業務」「入力」「出力」「対象外」を埋めて実装依頼する。  
4. 実装後、`guides/05_release_checklist.md` と `guides/08_test_scenarios_template.md` で確認する。  
5. `guides/06_readme_template.md` と `guides/09_operation_handover_template.md` を埋めて配布準備する。

## 6. guidesの使い分け

### 6.1 最低限読むもの

- `guides/00_policy.md`（全体方針）
- `guides/01_ai_coding_rules.md`（AI実装ルール）

### 6.2 設計時に使うもの

- `guides/02_tool_design_template.md`（設計ひな型）
- `guides/03_security_privacy_rules.md`（個人情報・ファイル安全）
- `guides/04_ui_ux_rules.md`（職員向けUI/UX）
- `guides/07_prompt_template.md`（AI依頼文テンプレート）

### 6.3 配布前に使うもの

- `guides/05_release_checklist.md`（配布可否チェック）
- `guides/08_test_scenarios_template.md`（正常/異常/再実行等の確認）
- `guides/06_readme_template.md`（利用者向けREADME整備）

### 6.4 運用引継ぎ時に使うもの

- `guides/09_operation_handover_template.md`（部署間移管・異動時の引継ぎ）
- `guides/06_readme_template.md`（操作説明・制約・問い合わせ先）

## 7. 最初の実証用ツールを作るときの推奨手順

1. **題材を小さく選ぶ**  
   例: CSV整形、日付変換、定型文生成など「1画面/1機能」で完結するテーマにする。
2. **設計を先に固定する**  
   `guides/02_tool_design_template.md` を埋め、対象外機能を明記する。
3. **安全条件を先に宣言する**  
   個人情報非保存、外部通信なし、元ファイル上書きなしを依頼文に明記する。
4. **AIへ最小実装を依頼する**  
   `guides/07_prompt_template.md` を使い、過剰機能を避ける。
5. **配布前確認を実施する**  
   `guides/05` と `guides/08` で正常系・異常系・再実行系を確認する。
6. **説明と引継ぎ資料を残す**  
   `guides/06` と `guides/09` を埋め、担当変更に備える。

## 8. 推奨する標準フロー

1. 業務課題を短く定義する
2. `guides/02` で設計する
3. `guides/07` で実装依頼する
4. `guides/03` `guides/04` で実装内容を点検する
5. `guides/05` `guides/08` で配布可否を判定する
6. `guides/06` `guides/09` で利用説明と引継ぎを整える

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

- `prompts/` は、`guides` を実務で使うための「AI投入用プロンプト集」です。
- 手順書作成やレビューを行う際は、`prompts/README.md` と `prompts/manuals/` を使用してください。
- `prompts/development/` には、新規開発開始・生成物レビュー・配布前文書整備のプロンプトを配置します。
- GitHub Pages上の補助ページとして、プロンプトビルダー（`tools/prompt-builder/`）を利用できます。  
  `https://yantkys.github.io/lg_toolkit_guide/tools/prompt-builder/`
- 使う前に、必ず `guides/00_policy.md` と `guides/01_ai_coding_rules.md` を確認してください。


## 12. examples配下（ドキュメント記入例）

- `examples/` は、`guides` と `prompts` を使って実際にどう記入するかを示すサンプル文書集です。
- 実装コードは含まず、設計書・README・チェックリスト・手順書の記入例のみを扱います。

- `examples/01_filename_sanitizer`: 初期の記入例
- `examples/02_filename_sanitizer_context_result`: `reference/guide_context.md` 単体参照で生成した実証成功例
- 詳細: `examples/README.md`


## 13. Vibe-coding時の参照方法（GitHub URLを直接読めない場合）

Vibe-coding実行環境によっては、外部GitHubへのアクセスが制限され、`git clone` やURL参照に失敗する場合があります（例: `CONNECT tunnel failed, response 403`）。

その場合は、次の順で対応してください。

1. `exports/guide_context.md` をプロンプトに貼り付けて参照させる。  
2. 可能であれば `exports/guide_context.md` を対象リポジトリの `reference/guide_context.md` としてコピーして同梱する。  
3. さらに必要な場合は `guides/` と `prompts/` の必要箇所を抜粋して追加提示する。  
4. ガイド本文が参照できない状態で推測実装は行わず、最小ガイド提示を優先する。

補足:

- `exports/guide_context.md` は、同梱方式でも使えるように標準成果物名と標準構成を含む。
- 標準成果物には、ルート直下の `development_report.md` も含む。
- 作成先ツールでは、作業後にMarkdownとコード（HTML/CSS/JS）の整形状態を実確認する。
- `lg_toolkit_guide` 本体の中核ガイド文書は `guides/` に置く。
- 実ツール側では、設計・チェック・引継ぎ文書置き場として `docs/` を使用してよい。

推奨運用:

- 通常時: `README.md` → `guides/` → `prompts/` → `examples/` の順で参照。
- 参照不能時: `exports/guide_context.md` を起点にし、足りない情報だけ追加提示。

### 13.1 推奨参照順（Vibe-coding時）

次の順で参照可否を確認してください。

1. GitHub Pages  
   `https://yantkys.github.io/lg_toolkit_guide/`
2. raw.githubusercontent.com  
   `https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md`
3. 対象リポジトリ内に同梱した `reference/guide_context.md`
4. MCP FetchでGitHub Pagesまたはraw URLを取得
5. GitHubリポジトリURL  
   `https://github.com/YanTKYS/lg_toolkit_guide`

> 実務上もっとも確実なのは、対象リポジトリへ `reference/guide_context.md` を同梱する方式です。

### 13.2 参照確認プロンプト例

```text
まず、以下の順で開発ガイドを参照できるか確認してください。

1. GitHub Pages
https://yantkys.github.io/lg_toolkit_guide/

2. raw.githubusercontent.com
https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md

3. MCP Fetch
MCP Fetchが利用可能な場合は、上記いずれかのURLをfetchツールで取得してください。

いずれかを参照できた場合は、guide_context の内容を要約してください。

どちらも参照できない場合は、実装を開始せず、参照できない理由を報告してください。
その場合は、対象リポジトリ内の reference/guide_context.md として同梱する方式に切り替えます。
```



## 14. GitHub Pagesでの参照

本リポジトリは、GitHub Pagesで次のURLから参照できます。

- 公開URL: `https://yantkys.github.io/lg_toolkit_guide/`

Pagesの入口文書は `index.md` です。

### 14.1 参照可否は実行環境ごとに異なる

同じURLでも、Vibe-coding実行環境により結果が異なる場合があります（閲覧可 / 403 / スコープ外）。  
そのため、次の優先順で運用してください。

1. GitHub Pages URL を試す。  
2. 失敗時は `exports/guide_context.md` を対象リポジトリへ `reference/guide_context.md` として同梱する。  
3. さらに不足する場合は、必要な `guides/` と `prompts/` の該当部分のみ追加提示する。  
4. ガイド未参照状態では実装を開始しない。
