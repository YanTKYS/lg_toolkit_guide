# 01_start_new_tool_from_docs.md

以下の条件で、新しい内部ツール開発の**初期ドキュメント作成**を行ってください。  
この段階では、いきなり実装に進まず、まず設計と運用文書を作成してください。

## 前提（必須参照）

次の文書を必ず参照してから作業してください。

- `docs/00_policy.md`
- `docs/01_ai_coding_rules.md`
- `docs/02_tool_design_template.md`
- `docs/03_security_privacy_rules.md`
- `docs/04_ui_ux_rules.md`
- `docs/05_release_checklist.md`
- `docs/06_readme_template.md`
- `docs/07_prompt_template.md`
- `docs/08_test_scenarios_template.md`
- `docs/09_operation_handover_template.md`
- `examples/01_filename_sanitizer/`

## 目的

- 閉域自治体向け内部ツールとして、方針違反のない開発を開始する。
- 実装前に必要ドキュメントを先に揃え、関係者承認後に実装へ進む。

## 作成する成果物（実装前）

1. ツール設計書
2. README
3. リリース前チェックリスト
4. テストシナリオ
5. 運用引継ぎメモ
6. 必要に応じた管理者向け / 運用担当部署向け / 利用者向け手順書
7. 実装方針（採用技術、非採用技術、段階的実装計画）

## 進め方

1. まず業務課題と対象利用者を確認する。
2. 参照文書と `examples/01_filename_sanitizer/` を見て、同程度の粒度で文書案を作る。
3. 文書案の末尾に「承認依頼事項（確認してほしい点）」を付ける。
4. **利用者の承認を得るまでは実装に進まない**。

## 入力情報（この下を埋めて使用）

- ツール名:
- 対象業務:
- 対象利用者:
- 使用言語（JavaScript / PowerShell / C#）:
- 入力データ:
- 出力データ:
- できること:
- できないこと:
- 注意したい点:

## 出力形式

- 見出し付きMarkdown
- 箇条書き・表・チェックリストを適切に使う
- 文書全体を1行に圧縮しない
- 最後に「実装に進んでよいか（承認待ち）」を明記する
