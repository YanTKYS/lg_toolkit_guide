(function () {
  "use strict";

  const fields = {
    toolName: document.getElementById("toolName"),
    repoName: document.getElementById("repoName"),
    purpose: document.getElementById("purpose"),
    users: document.getElementById("users"),
    implementationType: document.getElementById("implementationType"),
    referenceType: document.getElementById("referenceType"),
    phase: document.getElementById("phase"),
    extraRequirements: document.getElementById("extraRequirements"),
    output: document.getElementById("output"),
    status: document.getElementById("status")
  };

  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");

  function getReferenceInstruction(referenceType) {
    if (referenceType === "reference/guide_context.md 同梱方式") {
      return [
        "このリポジトリ内の `reference/guide_context.md` のみを開発ガイドとして参照してください。",
        "外部URL、GitHub Pages、raw.githubusercontent.com、GitHubリポジトリURL、MCP Fetch は使用しないでください。"
      ].join("\n");
    }

    if (referenceType === "GitHub Pages / raw 参照方式") {
      return [
        "以下の順で開発ガイドを参照してください。",
        "1. GitHub Pages",
        "https://yantkys.github.io/lg_toolkit_guide/",
        "2. raw.githubusercontent.com",
        "https://raw.githubusercontent.com/YanTKYS/lg_toolkit_guide/main/exports/guide_context.md",
        "どちらも参照できない場合は、実装を開始せず、参照できない理由を報告してください。"
      ].join("\n");
    }

    if (referenceType === "MCP Fetch利用") {
      return [
        "MCP Fetchが利用可能な場合は、GitHub Pagesまたはraw URLをfetchツールで取得してください。",
        "取得できない場合は、実装を開始せず、参照できない理由を報告してください。"
      ].join("\n");
    }

    return "参照方式が未定です。作業開始前に guide の参照方式を明確化してください。";
  }

  function buildPrompt() {
    const toolName = fields.toolName.value.trim() || "（未入力）";
    const repoName = fields.repoName.value.trim() || "（未入力）";
    const purpose = fields.purpose.value.trim() || "（未入力）";
    const users = fields.users.value.trim() || "（未入力）";
    const impl = fields.implementationType.value;
    const ref = fields.referenceType.value;
    const phase = fields.phase.value;
    const extra = fields.extraRequirements.value.trim() || "（なし）";

    const referenceInstruction = getReferenceInstruction(ref);

    return [
      "以下の条件で作業してください。",
      "",
      "## ガイド参照指示",
      referenceInstruction,
      "",
      "## 基本情報",
      `- ツール名: ${toolName}`,
      `- 対象リポジトリ名: ${repoName}`,
      `- 目的: ${purpose}`,
      `- 想定利用者: ${users}`,
      `- 実装方式: ${impl}`,
      `- 作成フェーズ: ${phase}`,
      `- 追加要件: ${extra}`,
      "",
      "## 共通制約",
      "- lg_toolkit_guide の方針に従うこと。",
      "- 外部依存を追加しないこと。",
      "- 個人情報を保存・送信・ログ出力しないこと。",
      "- Markdown とコードは raw表示でも読みやすいように改行・インデントすること。",
      "",
      "## 作業後の報告項目",
      "1. 参照したガイド方式と参照元",
      "2. 作成/更新したファイル",
      "3. 実装または作業内容の要約",
      "4. 整形確認結果（Markdown / HTML / CSS / JavaScript）",
      "5. 判断しづらかった点",
      "6. 今回あえて変更しなかったもの"
    ].join("\n");
  }

  function setStatus(message) {
    fields.status.textContent = message;
  }

  generateBtn.addEventListener("click", function () {
    fields.output.value = buildPrompt();
    setStatus("プロンプトを生成しました。");
  });

  copyBtn.addEventListener("click", async function () {
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
    tmp.setAttribute("readonly", "");
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(tmp);

    if (copied) {
      setStatus("コピーしました（フォールバック）。");
    } else {
      setStatus("コピーに失敗しました。手動でコピーしてください。");
    }
  });

  clearBtn.addEventListener("click", function () {
    Object.keys(fields).forEach(function (key) {
      if (fields[key] && "value" in fields[key] && key !== "status") {
        fields[key].value = "";
      }
    });
    fields.implementationType.selectedIndex = 0;
    fields.referenceType.selectedIndex = 0;
    fields.phase.selectedIndex = 0;
    setStatus("入力内容をクリアしました。");
  });
})();
