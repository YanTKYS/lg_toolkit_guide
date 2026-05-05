(function () {
  "use strict";

  const featureList = [
    "Office Word / Excel / Outlookを操作する",
    "Office文書を変換する",
    "Active Directoryを操作する",
    "ファイルを一括処理する",
    "CSVを扱う",
    "PDFを扱う",
    "クリップボードを使う",
    "印刷を行う",
    "個人情報を含む可能性があるデータを扱う",
    "実ファイルを作成・更新する"
  ];

  const fields = {
    toolName: id("toolName"),
    repoName: id("repoName"),
    purpose: id("purpose"),
    users: id("users"),
    extra: id("extra"),
    impl: id("impl"),
    refMode: id("refMode"),
    phase: id("phase"),
    output: id("output"),
    status: id("status"),
    recommended: id("recommended"),
    future: id("future"),
    features: id("features")
  };

  featureList.forEach(function (value) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    label.append(checkbox, document.createTextNode(" " + value));
    fields.features.appendChild(label);
  });

  id("generateBtn").addEventListener("click", function () {
    renderCandidates();
    fields.output.value = buildPrompt();
    setStatus("プロンプトを生成しました。");
  });

  id("clearBtn").addEventListener("click", function () {
    [
      fields.toolName,
      fields.repoName,
      fields.purpose,
      fields.users,
      fields.extra,
      fields.output
    ].forEach(function (element) {
      element.value = "";
    });
    fields.impl.selectedIndex = 0;
    fields.refMode.selectedIndex = 0;
    fields.phase.selectedIndex = 0;
    fields.features.querySelectorAll("input").forEach(function (checkbox) {
      checkbox.checked = false;
    });
    renderCandidates();
    setStatus("入力をクリアしました。");
  });

  id("copyBtn").addEventListener("click", copyOutput);
  [fields.impl, fields.refMode].forEach(function (element) {
    element.addEventListener("change", renderCandidates);
  });

  renderCandidates();

  function id(name) {
    return document.getElementById(name);
  }

  function checkedFeatures() {
    return Array.from(fields.features.querySelectorAll("input:checked")).map(function (input) {
      return input.value;
    });
  }

  function candidates() {
    const recommended = new Set(["reference/guide_context.md"]);
    const future = [];
    const impl = fields.impl.value;
    const features = checkedFeatures();

    if (["PowerShellスクリプト", "C# Console", "C# WinForms", "C# WPF"].includes(impl)) {
      recommended.add("reference/11_non_web_tool_patterns.md");
    }
    if (features.includes("Office Word / Excel / Outlookを操作する") || features.includes("Office文書を変換する")) {
      recommended.add("reference/12_office_interop_checklist.md");
    }
    if (features.includes("Active Directoryを操作する")) {
      future.push("reference/13_ad_operation_checklist.md");
    }
    if (features.includes("PDFを扱う")) {
      future.push("reference/14_document_conversion_checklist.md");
    }
    if (features.includes("個人情報を含む可能性があるデータを扱う")) {
      future.push("個人情報取扱い強化ガイド");
    }
    if (features.includes("実ファイルを作成・更新する")) {
      future.push("ファイル操作安全チェックリスト");
    }

    return { recommended: Array.from(recommended), future: future };
  }

  function renderCandidates() {
    const result = candidates();
    fields.recommended.innerHTML = "";
    result.recommended.forEach(function (text) {
      appendLi(fields.recommended, text);
    });

    fields.future.innerHTML = "";
    if (result.future.length === 0) {
      appendLi(fields.future, "（該当なし）");
    } else {
      result.future.forEach(function (text) {
        appendLi(fields.future, text);
      });
    }
  }

  function appendLi(list, text) {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  }

  function referenceText() {
    const mode = fields.refMode.value;
    const refs = candidates().recommended;

    if (mode === "reference/guide_context.md 同梱方式") {
      return [
        "このリポジトリ内の同梱ガイドを開発ガイドとして参照してください。",
        "",
        "外部URL、GitHub Pages、raw.githubusercontent.com、GitHubリポジトリURL、MCP Fetch は使用しないでください。",
        "",
        "同梱されている文書のみを参照してください。",
        "必要な追加ガイドが同梱されていないと判断した場合は、推測で進めず、追加同梱を依頼してください。",
        "",
        "参照対象:",
        ...refs.map(function (ref) { return "- " + ref; })
      ].join("\n");
    }

    if (mode === "GitHub Pages / raw 参照方式") {
      return [
        "以下の順で開発ガイドを参照してください。",
        "",
        "1. GitHub Pages",
        "https://yantkys.github.io/lg_toolkit_guide/",
        "",
        "2. raw.githubusercontent.com",
        "https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md",
        "",
        "どちらも参照できない場合は、実装を開始せず、参照できない理由を報告してください。"
      ].join("\n");
    }

    if (mode === "MCP Fetch利用") {
      return [
        "MCP Fetchが利用可能な場合は、GitHub Pagesまたはraw URLをfetchツールで取得してください。",
        "",
        "取得できない場合は、実装を開始せず、参照できない理由を報告してください。",
        "",
        "MCP Fetchを使う場合でも、庁内URL、内部IP、認証付きページ、個人情報を含むページを取得対象にしないでください。"
      ].join("\n");
    }

    return [
      "まず、利用可能なガイド参照方式を確認してください。",
      "",
      "可能であれば、対象リポジトリ内に reference/guide_context.md を同梱する方式を優先してください。",
      "外部参照を使う場合は、GitHub Pages、raw、MCP Fetchの順に確認してください。",
      "いずれも参照できない場合は、実装を開始せず、ガイド本文の提示または同梱を依頼してください。"
    ].join("\n");
  }

  function phaseText() {
    const phase = fields.phase.value;
    const map = {
      "設計文書のみ作成": "今回は実装ファイルを作成せず、まず設計文書、README案、テスト観点、運用引継ぎ、必要な手順書の作成に留めてください。",
      "設計文書と実装を作成": "ガイドに従って、必要な設計文書、README、テスト文書、手順書、開発報告書を作成してください。\nその後、実装ファイルを作成してください。",
      "既存ツールをレビュー": "既存ツールを、ガイドの方針に照らしてレビューしてください。\n不足している文書、実装上のリスク、外部依存、個人情報取扱い、ファイル操作、整形状態、テスト不足を確認してください。",
      "リリース前文書を整備": "既存実装を大きく変更せず、リリース前に必要なREADME、リリース前チェックリスト、テストシナリオ、運用引継ぎ文書、各種手順書を整備してください。",
      "既存ツールをガイド準拠に補完": "既存の設計・実装を活かしながら、ガイドに照らして不足している文書、実装上の注意、整形、確認事項を補完してください。\n既存実装の目的は大きく変更しないでください。"
    };
    return map[phase] || "";
  }

  function valueOrPlaceholder(element) {
    return element.value.trim() || "（未入力）";
  }

  function buildPrompt() {
    const result = candidates();
    return [
      "以下の条件で作業してください。",
      "",
      "## ガイド参照指示",
      referenceText(),
      "",
      "## 基本情報",
      "- ツール名: " + valueOrPlaceholder(fields.toolName),
      "- 対象リポジトリ名: " + valueOrPlaceholder(fields.repoName),
      "- 目的: " + valueOrPlaceholder(fields.purpose),
      "- 想定利用者: " + valueOrPlaceholder(fields.users),
      "- 実装方式: " + fields.impl.value,
      "- 作成フェーズ: " + fields.phase.value,
      "- 利用機能: " + (checkedFeatures().join(" / ") || "（なし）"),
      "- 推奨同梱文書: " + result.recommended.join(" / "),
      "- 追加要件: " + valueOrPlaceholder(fields.extra),
      "",
      "## 作成フェーズ別の指示",
      phaseText(),
      "",
      "## 作業後の報告項目",
      "- 参照したガイドファイルまたはURL",
      "- 作成したファイル",
      "- 更新したファイル",
      "- 実装した機能",
      "- 整形確認結果",
      "- ビルド確認結果または未確認理由",
      "- 外部依存の有無",
      "- 外部通信の有無",
      "- 個人情報保存・送信・ログ出力の有無",
      "- 判断しづらかった点",
      "- lg_toolkit_guide 側へフィードバックすべき改善点"
    ].join("\n");
  }

  async function copyOutput() {
    const text = fields.output.value;
    if (!text) {
      setStatus("先にプロンプトを生成してください。");
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setStatus("コピーしました。");
        return;
      }
    } catch (_error) {
      // Fallback below.
    }

    const tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(tmp);
    setStatus(copied ? "コピーしました（フォールバック）。" : "コピーに失敗しました。手動でコピーしてください。");
  }

  function setStatus(message) {
    fields.status.textContent = message;
  }
})();
