# 10_reference_methods.md - 参照方式整理

## 1. この文書の目的

Vibe-coding環境によって、GitHubリポジトリURL、GitHub Pages、raw.githubusercontent.com、MCP Fetch、同梱ファイルの参照可否が異なるため、複数の参照方法を整理する。

## 2. 推奨参照順

確実性を重視する場合は、以下の順を推奨する。

1. 対象リポジトリ内に `reference/guide_context.md` として同梱する方式
2. GitHub Pagesを参照する方式
3. raw.githubusercontent.com の guide_context.md を参照する方式
4. MCP FetchでGitHub Pagesまたはraw URLを取得する方式
5. GitHubリポジトリURLを直接参照する方式

補足:

- 通常の事前確認では、GitHub Pages または raw URL を先に試してよい。
- 確実に作業させたい場合は、同梱方式を推奨する。

## 3. GitHub Pages方式

- 人間にもAIにも読みやすいWeb入口
- URL例: `https://yantkys.github.io/lg_toolkit_guide/`
- WebFetchや通常のWeb参照で読める場合がある
- ただし403になる環境もある

## 4. raw.githubusercontent.com方式

- `guide_context.md` を生Markdownとして直接読ませる方式
- URL例: `https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md`
- HTML装飾がなく、AIに読ませやすい
- ただし raw.githubusercontent.com も403になる環境がある

## 5. reference/guide_context.md 同梱方式

- 対象リポジトリ内に `guide_context.md` をコピーする方式
- 外部Webアクセスが不要
- 最も確実
- ClaudeCodeや外部参照不可の環境でも使いやすい
- 配置例:

```text
reference/guide_context.md
```

同梱方式の運用注意:

- 同梱方式では、`reference/guide_context.md` のみで開発判断する場合がある。
- その場合、成果物の省略を避ける。
- 標準構成と標準成果物名を維持する。
  - 標準構成例: `README.md` / `docs/` / `manuals/` / `src/` / （必要時）`reference/`
  - 標準成果物名: `docs/tool_design.md`、`docs/release_checklist.md`、`docs/test_scenarios.md`、`docs/operation_handover.md`、`manuals/admin_manual.md`、`manuals/operator_manual.md`、`manuals/user_manual.md`
- 外部参照を禁止する比較テストでは、本文中の外部URLを追加参照しない。
- 参照できない詳細情報は、推測で補完せず「判断しづらかった点」として報告する。

## 6. MCP Fetch方式

- MCP対応ツールでFetch MCP Serverを使い、GitHub Pagesまたはraw URLを取得する方式
- WebFetchが403でも、MCP Fetchで取得できる可能性がある
- ただし必ず成功するわけではない
- MCPサーバーの利用可否、ネットワーク経路、ツール設定に依存する
- MCP Fetchは、GitHub Pagesやraw URLを取得するための補助手段であり、同梱方式の代替ではない

## 7. ツール別の整理

| ツール | MCP利用の見込み | 推奨参照方式 | 備考 |
|---|---|---|---|
| Claude Code | MCP対応あり | raw / MCP Fetch / 同梱 | WebFetchが403の場合はMCP Fetchまたは同梱 |
| Codex | MCP対応環境あり | Pages / raw / MCP Fetch / 同梱 | セッションにより外部参照が不安定なため同梱が安全 |
| Qwen Code / Qwen Coder | MCP対応あり | Pages / raw / MCP Fetch / 同梱 | Pages/raw参照実績あり |
| その他MCP対応ツール | ツール依存 | MCP Fetch / 同梱 | 設定可否を確認 |

> 注意: 各ツールの対応状況は変わる可能性があるため、断定せず利用環境で確認する。

## 8. MCP Fetch導入例

一般例:

```bash
pip install mcp-server-fetch
```

または

```bash
uvx mcp-server-fetch
```

設定例はツールごとに異なるため、各ツールの公式ドキュメントを確認すること。

Claude Code向けの参考例:

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```

> 注意: 実際の設定ファイル場所・形式はツールやバージョンで異なる。

## 9. MCP Fetch利用時の注意

- 庁内URL、内部IP、認証付きページ、個人情報を含むページをFetch対象にしない
- 取得対象は原則として以下に限定する
  - `https://yantkys.github.io/lg_toolkit_guide/`
  - `https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md`
- MCP Fetchは内部ネットワーク情報を取得できる場合があるため、取り扱いに注意する
- 取得に失敗した場合は推測で実装を進めない
- 最終的には `reference/guide_context.md` の同梱方式が最も確実

## 10. 参照確認プロンプト例

```text
まず、以下の順で開発ガイドを参照できるか確認してください。

1. GitHub Pages
https://yantkys.github.io/lg_toolkit_guide/

2. raw.githubusercontent.com
https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md

3. MCP Fetch
MCP Fetchが利用可能な場合は、上記いずれかのURLをfetchツールで取得してください。

いずれかを参照できた場合は、guide_context の内容を要約してください。

いずれも参照できない場合は、実装を開始せず、参照できない理由を報告してください。
その場合は、対象リポジトリ内の reference/guide_context.md として同梱する方式に切り替えます。
```

## 11. 実装依頼プロンプト例

```text
以下のいずれかの方法で開発ガイドを参照してください。

1. GitHub Pages
https://yantkys.github.io/lg_toolkit_guide/

2. raw.githubusercontent.com
https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md

3. MCP Fetch
MCP Fetchが利用可能な場合は、上記いずれかのURLをfetchツールで取得してください。

4. 同梱ファイル
このリポジトリ内の reference/guide_context.md

いずれか参照できる方を開発ガイドとして使用してください。
どれも参照できない場合は、実装を開始せず、参照できない理由を報告してください。

新規ツール「ファイル名安全化ツール」を作成してください。

目的は、Windowsでファイル名に使用できない文字を含む文字列を、安全なファイル名候補に変換することです。

想定利用者は一般職員です。

ガイドに従って、まず必要な設計文書、README、テスト文書、手順書を作成してください。
その後、HTML / CSS / JavaScript の静的Webツールとして実装してください。

作業後、以下を報告してください。

1. 参照できたガイドの方式とURLまたはファイルパス
2. 参照したガイド内容の要約
3. 作成したファイル
4. 実装した機能
5. ガイドだけでは判断しづらかった点
6. lg_toolkit_guide 側へフィードバックすべき改善点
```
