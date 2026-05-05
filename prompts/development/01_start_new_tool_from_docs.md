# 01_start_new_tool_from_docs.md

以下の条件で、新しい内部ツール開発の**初期ドキュメント作成**を行ってください。  
この段階では、いきなり実装に進まず、まず設計と運用文書を作成してください。

## 前提（必須参照）

次の文書を必ず参照してから作業してください。

- `guides/00_policy.md`
- `guides/01_ai_coding_rules.md`
- `guides/02_tool_design_template.md`
- `guides/03_security_privacy_rules.md`
- `guides/04_ui_ux_rules.md`
- `guides/05_release_checklist.md`
- `guides/06_readme_template.md`
- `guides/07_prompt_template.md`
- `guides/08_test_scenarios_template.md`
- `guides/09_operation_handover_template.md`
- `examples/01_filename_sanitizer/`

## 最小依頼プロンプト

以下の4点だけを個別案件情報として指定し、残りは本リポジトリの方針に従って判断すること。

- 作成するリポジトリ名
- ツール名
- ツールの目的
- 想定利用者・利用場面


## ガイドを参照できない場合の対応

Vibe-coding実行環境で本リポジトリのGitHub URLを直接読めない場合（例: `CONNECT tunnel failed, response 403`）は、以下の手順で進めること。

1. まず GitHub Pages を確認する（`https://yantkys.github.io/lg_toolkit_guide/`）。  
2. Pagesが読めない場合は raw を確認する（`https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md`）。  
3. rawも読めない場合でMCP Fetchが使えるなら、MCP FetchでPagesまたはraw取得を試す。  
4. MCP Fetchでも読めない場合は、`reference/guide_context.md` として同梱を依頼し、内容を必ず参照する。  
5. そのうえで不足情報があれば、`guides/` や `prompts/` の必要部分のみ追加提示を依頼する。  
6. ガイド未参照状態では、実装を開始しない（推測実装禁止）。

## 目的

- 閉域自治体向け内部ツールとして、方針違反のない開発を開始する。
- 実装前に必要ドキュメントを先に揃え、関係者承認後に実装へ進む。

## 作成する成果物（実装前）

1. ツール設計書
2. README
3. リリース前チェックリスト
4. テストシナリオ
5. 運用引継ぎメモ
6. 管理者向け / 運用担当部署向け / 利用者向け手順書（3種類すべて）
7. 実装方針（採用技術、非採用技術、段階的実装計画）

## 作成先ツールリポジトリの標準構成例

以下を標準構成として扱うこと。

```text
README.md
development_report.md

docs/
  tool_design.md
  release_checklist.md
  test_scenarios.md
  operation_handover.md

manuals/
  admin_manual.md
  operator_manual.md
  user_manual.md

src/
  （実装方式に応じたファイルを配置）

reference/
  guide_context.md
```

補足:

- `reference/guide_context.md` は同梱方式で進める場合のみ配置する。
- URL参照方式（Pages/raw）で進める場合は、`reference/guide_context.md` は必須ではない。

## 標準成果物ファイル名（原則）

```text
README.md
development_report.md
docs/tool_design.md
docs/release_checklist.md
docs/test_scenarios.md
docs/operation_handover.md
manuals/admin_manual.md
manuals/operator_manual.md
manuals/user_manual.md
src/（実装方式に応じた実装ファイル）
```

- `docs/design.md`、`docs/checklist.md`、`docs/test.md` などの短縮名は原則使わない。
- `manuals/operator_manual.md` は省略しない（所管部署・運用担当部署・一次対応者向け）。
- 開発報告書はルート直下の `development_report.md` に作成し、同一リポジトリ内に複数作成しない。
- 実装ファイルは実装方式に応じて `src/` 配下に配置する。

実装方式別の `src/` 構成例:

```text
静的Webツール:
  src/
    index.html
    script.js
    style.css

PowerShellツール:
  src/
    main.ps1

C# WinFormsツール:
  src/
    <ProjectName>/
      <ProjectName>.csproj
      Program.cs
      MainForm.cs
      必要に応じてその他クラス
```

Office Interopを使う場合の追記先:

- README（Office依存、上書き確認、ログ保存禁止）
- `manuals/admin_manual.md`（Office前提環境、障害時対応）
- `docs/operation_handover.md`（プロセス残存時の一次確認、相談先）
- C# / WinForms / Office Interop系ツールでは、Web標準構成ではなく非Web向け標準構成を使う。
- Office Interopを利用する場合は、`guides/12_office_interop_checklist.md` の観点を設計・テスト・手順書へ反映する。
- guide_context同梱方式の場合でも、Office Interop系ツールの実機確認項目を省略しない。

## guide_contextのみ参照する比較テスト時の追加ルール

- `reference/guide_context.md` のみ参照する指定がある場合、外部URLや追加参照先を見に行かない。
- その場合でも、標準構成と標準成果物名を維持する。
- 判断材料が足りない場合は推測で省略せず、「判断しづらかった点」として報告する。

追加ガイド同梱方式（必要時）:

```text
このリポジトリ内の以下の文書を開発ガイドとして参照してください。

- reference/guide_context.md
- reference/11_non_web_tool_patterns.md
- reference/12_office_interop_checklist.md

同梱されている文書のみを参照してください。
外部URLは参照しないでください。

必要な追加ガイドが同梱されていないと判断した場合は、推測で進めず、追加同梱を依頼してください。
```

## 整形状態の実確認（作業完了前に必須）

- Markdown成果物と `src/index.html` / `src/script.js` / `src/style.css` は、作業完了前に実ファイルを開いて整形状態を確認する。
- 「整形した」と自己申告するだけで終わらせず、実際の表示状態を確認してから報告する。
- 可能であれば、`wc -l` 相当の確認を実施する。

確認コマンド例（可能な場合）:

```bash
wc -l README.md docs/*.md manuals/*.md development_report.md
wc -l src/*.html src/*.css src/*.js
```

- `wc` が使えない環境では、同等の確認（raw表示相当での目視確認）でよい。
- 行数が極端に少ないMarkdownやコードファイル（目安: 3〜5行程度）は整形不備を疑い、再整形する。

## 進め方

1. まず業務課題と対象利用者を確認する。
2. 参照文書と `examples/01_filename_sanitizer/` を見て、同程度の粒度で文書案を作る。
3. 文書案の末尾に「承認依頼事項（確認してほしい点）」を付ける。
4. **利用者の承認を得るまでは実装に進まない**。

## 入力情報（この下を埋めて使用）

### 最小入力（必須）

- 作成するリポジトリ名:
- ツール名:
- ツールの目的:
- 想定利用者・利用場面:

### 追加入力（任意）

- 対象業務:
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
- raw表示でも読みやすいMarkdownにする
- 表はMarkdown表として整形する
- チェックリストは `- [ ]` 形式で記載する
- 上記Markdown品質条件を、作成先の `README.md`、`docs/*.md`、`manuals/*.md`、`reference/guide_context.md`、報告書にも適用する
- Markdown成果物は作成後にraw表示相当で自己点検し、1行または数行への圧縮がないことを確認する
- `src/index.html`、`src/script.js`、`src/style.css` は保守性のため改行・インデントする
- `src/script.js` や `src/style.css` を1行化しない
- 最後に「実装に進んでよいか（承認待ち）」を明記する

## 作業報告に必ず含める項目

- 整形確認結果（Markdown / HTML / CSS / JavaScript）
- 実施した確認方法（`wc -l` または同等確認）
- 整形再実施の有無と理由（該当時）
