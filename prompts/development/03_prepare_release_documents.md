# 03_prepare_release_documents.md

以下の条件で、配布・利用開始前の**リリース用ドキュメント整備**を行ってください。

## 前提（必須参照）

- `guides/05_release_checklist.md`
- `guides/06_readme_template.md`
- `guides/08_test_scenarios_template.md`
- `guides/09_operation_handover_template.md`
- `prompts/manuals/01_create_admin_manual.md`
- `prompts/manuals/02_create_operator_manual.md`
- `prompts/manuals/03_create_user_manual.md`
- `examples/01_filename_sanitizer/`

## 作成または更新する文書

- README
- release_checklist
- test_scenarios
- operation_handover
- admin_manual
- operator_manual
- user_manual

## 実施内容

1. 既存文書がある場合は、先に差分確認を行う。
2. 変更理由を簡潔に示したうえで更新する。
3. 未記入項目（空欄、未確認、担当未設定）を洗い出す。
4. 配布判定に必要な不足情報を一覧化する。

## 入力情報（この下を埋めて使用）

- ツール名:
- 現在バージョン:
- 対象利用部署:
- 配布予定日:
- 既存文書の有無:
- 未確定事項:

## 出力形式

- 「更新した文書」「新規作成した文書」を分けて提示
- 各文書の差分要約（3〜5行）
- 未対応事項チェックリスト（`- [ ]` 形式）
- 最後に「配布開始可否」と「残課題」を明記

## Markdown品質ルール

- 見出し、本文、箇条書き、表、チェックボックスを適切に改行する。
- 文書全体を1行に圧縮しない。
- 表はMarkdown表として整形する。
