# prompts

`prompts/` は、ガイドをAIへ再掲するためではなく、案件固有の依頼を組み立てるための薄い実行用プロンプト集です。

## guidesとの役割分担

- `guides/`: 案件をまたいで守る恒久的な方針、品質基準、テンプレート
- `prompts/`: 今回の目的、対象、要件、制約、作業、完了条件

共通ルールが不足した場合は、各プロンプトへの追記ではなくガイドの更新を検討します。

## 使い方

1. `guides/00_policy.md` と `guides/01_ai_coding_rules.md` を参照可能にする。
2. 目的に合うプロンプトを選び、案件固有欄を埋める。
3. UI、テスト、README、Office、Releaseなど、該当する追加ガイドだけを指定する。
4. 実施可能な範囲は、調査から実施、確認、テスト、文書整合、報告まで依頼する。

参照制限がある場合は `exports/guide_context.md` を `reference/guide_context.md` として同梱します。

## development

- `01_start_new_tool_from_docs.md`: 新規作成・PoC
- `02_review_generated_tool.md`: 既存ツールのレビューと必要な修正
- `03_prepare_release_documents.md`: 配布前文書の整合

## manuals

- `01_create_admin_manual.md`: 管理・保守担当向け
- `02_create_operator_manual.md`: 運用担当部署向け
- `03_create_user_manual.md`: 一般利用者向け
- `04_review_manuals.md`: 読者別手順書の整合レビュー

手順書は案件に必要な種類だけを作成・更新します。利用者が実際に必要とする情報を中心にし、非対応事項を網羅しません。

## review

- `01_third_party_review.md`: 実装AIの提案や逸脱の第三者レビュー
- `02_policy_deviation_request.md`: 大きな方針変更の申請
- `03_create_decision_log.md`: ユーザーの最終判断の記録

実装AIの反論は一律に拒否せず、ユーザーの考慮不足の補完、一般論・過剰設計への逸脱、実装しやすい方向への逃避のどれかを確認します。最終判断はユーザーが行います。
