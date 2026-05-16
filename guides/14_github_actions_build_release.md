# 14_github_actions_build_release.md - GitHub Actionsビルド・リリース方針

## 1. この文書の目的

この文書は、C# WinFormsなどの配布物を作る内部ツールで、GitHub Actionsによる通常ビルドとリリースビルドの標準方針を整理するための任意ガイドです。

`lg_toolkit_guide` 全体をCI/CD前提にするものではありません。配布zip、GitHub Release、release note管理が必要な個別ツールで、必要に応じて参照してください。

目的:

- C# WinFormsなどの配布物を作る内部ツールで、ビルドとリリースビルドの標準方針を整理する。
- `main` ブランチへのマージ後に通常ビルドを行う。
- 手動実行でリリースビルドを行う。
- release noteからtitleとnoteを取得してGitHub Releaseに反映する。
- 配布zipの命名と構成を標準化する。

## 2. 適用範囲

このガイドを使う対象:

- C# WinFormsなど、実行ファイルや付随ファイルを配布する内部ツール。
- `dotnet publish` の出力を利用者向けzipとして配布するツール。
- GitHub Releaseに配布zipを添付して管理するツール。
- リリースごとに `docs/release-note.md` を管理したいツール。

このガイドを必須にしない対象:

- HTML / CSS / JavaScriptのみでGitHub Pagesや庁内Webサーバに配置する小規模ツール。
- PowerShellスクリプトなど、単体ファイル配布でGitHub Releaseを使わないツール。
- 試作段階で配布zipやRelease管理が不要なツール。

## 3. 通常ビルド方針

通常ビルドは、リポジトリの `main` ブランチに取り込まれた内容が最低限ビルドできることを確認するためのものです。

方針:

- `main` ブランチへのpushをトリガーにする。
- PRブランチでは実行しない。
- 実務上はPR merge後の `main` 更新で動く想定にする。
- `main` への直接pushを防ぎたい場合は、GitHubのブランチ保護で制御する。
- `workflow_dispatch` により手動実行も可能にする。

最小例:

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

補足:

- PR作成時にビルドを必須にしたい場合は、個別ツールの運用方針として別途検討する。
- 閉域向け内部ツールでは、CIでの確認だけでなく、実行端末やOffice環境などの実機確認を省略しない。

## 4. リリースビルド方針

リリースビルドは、利用者へ配布するzipとGitHub Releaseを作成または更新するためのものです。

方針:

- `workflow_dispatch` により手動実行する。
- `version` を入力として受け取る。
- 同一バージョンで再実行できるようにする。
- 既存Releaseがある場合は、title、body、assetsを更新する方式を検討する。
- release noteは `docs/release-note.md` から取得する。
- 該当バージョンが見つからない場合は失敗させる。

最小例:

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        description: "Release version, for example v1.0.0"
        required: true
        type: string
```

運用上の注意:

- `version` は `v1.0.0` のように `v` 付きで統一する。
- 同一バージョンで再実行する場合、古いzipを削除して新しいzipに差し替えるか、既存Releaseのassetを上書きする方針を明記する。
- 既存Releaseを更新する場合でも、利用者に配布済みのバイナリとの差異が分かるようにrelease noteを更新する。
- 該当バージョンのrelease noteがない状態でReleaseを作らない。

## 5. `docs/release-note.md` の標準形式

release noteは、機械的にtitleと本文を取り出せる形式にします。

標準形式:

```md
# Release Notes

## v1.0.0

title: 初回安定版

### Notes

- 初回リリース
- MarkdownからWordへの変換に対応
```

ルール:

- バージョン見出しは `## vX.Y.Z` とする。
- title行は `title: ...` とする。
- `### Notes` 以下をリリース本文とする。
- 同じバージョンを複数記載しない。
- 該当バージョンがない場合、release buildは失敗する。
- `title:` がない場合、release buildは失敗させるか、明示的な既定値を使う方針を個別ツールで決める。
- Notes本文が空の場合、release buildは失敗させることを推奨する。

複数バージョンを管理する例:

```md
# Release Notes

## v1.1.0

title: Word変換設定の改善

### Notes

- 変換オプションを追加
- エラー表示を改善

## v1.0.0

title: 初回安定版

### Notes

- 初回リリース
```

## 6. 配布zip方針

Source code以外に出力する配布物は、利用者向けのzipにまとめます。

方針:

- Source code以外に出力する配布物はzipにまとめる。
- zip名は `[リポジトリ名]_[バージョン].zip` とする。
- 例: `md2doc_v1.0.0.zip`
- ユーザーが使いやすい構成にする。
- 実行ファイルはzip直下に置くことを検討する。
- dllやruntimeconfigなどの付随ファイルは `bin/` 配下にまとめることを検討する。
- READMEや利用手順を同梱することを検討する。
- 実際の.NET publish出力に応じて調整する。

構成例:

```text
md2doc_v1.0.0.zip
  md2doc.exe
  bin/
    *.dll
    *.deps.json
    *.runtimeconfig.json
  README.txt
```

補足:

- .NETのsingle-file publishを使う場合は、zip直下の構成が変わる可能性がある。
- 利用者が最初に実行すべきファイルをREADMEやzip内ファイル名で分かりやすく示す。
- 生成物に不要な中間ファイル、ログ、個人情報、開発者端末固有のパスを含めない。

## 7. Node.js 24対応

GitHub Actionsで利用するJavaScript Actionは、GitHub側のNode.jsランタイム更新の影響を受けます。

方針:

- GitHub Actionsで利用するactionsは、可能な限りNode 24対応版を使う。
- Node.js 20非推奨警告が出る場合がある。
- 必要に応じてワークフローの `env` に `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` を設定する。
- ただし、この設定で警告が完全に消えることを保証しない。
- 警告が残る場合は、利用しているActionのバージョン更新を確認する。

例:

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

補足:

- `actions/checkout`、`actions/setup-dotnet`、`actions/upload-artifact` などは、利用時点の最新版またはNode 24対応版を確認する。
- 警告を無視してよいかは、個別ツールの保守方針とGitHub Actionsのサポート状況を確認して判断する。

## 8. permissions

GitHub Releaseを作成・更新する場合は、GitHub ActionsにRelease更新権限が必要です。

例:

```yaml
permissions:
  contents: write
```

補足:

- 通常ビルドだけでReleaseを作成しないworkflowでは、より狭い権限にできるか検討する。
- Release作成・更新を行うjobだけに必要権限を付与する構成も検討する。

## 9. C# WinForms向けの最小フロー例

C# WinFormsツールでは、次の流れを基本にします。

- `dotnet restore`
- `dotnet build`
- `dotnet publish`
- publish出力を配布用フォルダへ整理
- zip作成
- artifactアップロード
- release作成または更新

最小サンプル:

```yaml
name: release-build

on:
  workflow_dispatch:
    inputs:
      version:
        description: "Release version, for example v1.0.0"
        required: true
        type: string

permissions:
  contents: write

env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

jobs:
  release-build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: "8.0.x"
      - run: dotnet restore
      - run: dotnet build --configuration Release --no-restore
      - run: dotnet publish src/YourApp/YourApp.csproj --configuration Release --output publish
      - name: Prepare distribution folder
        run: |
          New-Item -ItemType Directory -Force dist/bin
          Copy-Item publish/YourApp.exe dist/YourApp.exe
          Copy-Item publish/*.dll dist/bin/ -ErrorAction SilentlyContinue
          Copy-Item publish/*.json dist/bin/ -ErrorAction SilentlyContinue
      - name: Create zip
        run: Compress-Archive -Path dist/* -DestinationPath "YourRepo_${{ inputs.version }}.zip" -Force
```

注意:

- 上記は汎用サンプルであり、完全なworkflowではありません。
- 実際のプロジェクト名、Target Framework、Runtime Identifier、self-contained設定、single-file設定、zip構成は個別ツールで調整する。
- release noteの抽出、artifactアップロード、Release作成・更新処理は、利用するActionやスクリプトに合わせて個別に実装する。
- GitHub Actionsの成功だけで、利用端末での動作確認が完了した扱いにしない。

## 10. 作業報告に含める項目

GitHub Actions / Releaseを導入した個別ツールでは、作業報告に次を含めます。

- 通常ビルドのトリガー。
- リリースビルドの手動実行方法。
- `version` 入力の形式。
- `docs/release-note.md` の該当バージョン有無。
- Release title / body の取得方法。
- 同一バージョン再実行時の更新方針。
- 配布zip名と構成。
- GitHub ActionsのNode.js警告への対応状況。
- Release作成・更新に必要なpermissions。
- 今回あえて自動化しなかった作業。
