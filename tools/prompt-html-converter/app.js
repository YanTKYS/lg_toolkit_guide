(function () {
  "use strict";

  const headingTagMap = {
    "目的": "purpose",
    "背景": "background",
    "前提": "assumptions",
    "制約": "constraints",
    "重要な制約": "critical_constraints",
    "作業内容": "tasks",
    "出力形式": "output_format",
    "作業後の報告": "report",
    "注意事項": "notes"
  };

  const sampleMarkdown = [
    "# 目的",
    "Markdown形式の依頼文を、構造化されたプロンプトへ変換する。",
    "",
    "## 前提",
    "- 生成AI APIは使用しない",
    "- 入力内容を保存しない",
    "- GitHub Pagesで静的に動作する",
    "",
    "## 重要な制約",
    "1. 外部APIを使用しない",
    "2. 外部CDNを使用しない",
    "3. 個人情報を入力しない",
    "",
    "## 作業内容",
    "通常文は段落として変換する。",
    "",
    "```text",
    "ここはコードブロックとして扱う。",
    "```",
    "",
    "## 作業後の報告",
    "- 作成したファイル",
    "- 変換方式",
    "- 未確認事項"
  ].join("\n");

  const fields = {
    mode: id("mode"),
    input: id("input"),
    output: id("output"),
    status: id("status")
  };

  id("convertBtn").addEventListener("click", function () {
    convertAndRender();
  });

  id("sampleBtn").addEventListener("click", function () {
    fields.input.value = sampleMarkdown;
    convertAndRender("サンプルを挿入して変換しました。");
  });

  id("copyBtn").addEventListener("click", copyOutput);

  id("clearBtn").addEventListener("click", function () {
    fields.input.value = "";
    fields.output.value = "";
    setStatus("入力と出力をクリアしました。");
  });

  function id(name) {
    return document.getElementById(name);
  }

  function convertAndRender(message) {
    const markdown = fields.input.value;

    if (!markdown.trim()) {
      fields.output.value = "";
      setStatus("Markdownプロンプトを入力してください。");
      return;
    }

    fields.output.value = convertMarkdown(markdown, fields.mode.value);
    setStatus(message || "変換しました。");
  }

  function convertMarkdown(markdown, mode) {
    const lines = markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    const result = ["<prompt>"];
    let currentSection = null;
    let inCodeBlock = false;
    let codeFence = "";
    let codeLines = [];

    lines.forEach(function (line) {
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      const codeFenceMatch = line.match(/^```(.*)$/);

      if (codeFenceMatch) {
        if (inCodeBlock) {
          appendCodeBlock(result, codeLines, codeFence);
          inCodeBlock = false;
          codeFence = "";
          codeLines = [];
        } else {
          inCodeBlock = true;
          codeFence = codeFenceMatch[1].trim();
          codeLines = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (heading) {
        closeSection(result, currentSection);
        currentSection = sectionForHeading(heading[2].trim(), mode);
        openSection(result, currentSection);
        return;
      }

      if (!line.trim()) {
        return;
      }

      appendContentLine(result, line);
    });

    if (inCodeBlock) {
      appendCodeBlock(result, codeLines, codeFence);
    }

    closeSection(result, currentSection);
    result.push("</prompt>");
    return result.join("\n");
  }

  function sectionForHeading(headingText, mode) {
    if (mode === "dedicated" && headingTagMap[headingText]) {
      return { type: "tag", tagName: headingTagMap[headingText] };
    }

    return { type: "section", name: headingText };
  }

  function openSection(result, section) {
    if (section.type === "tag") {
      result.push("  <" + section.tagName + ">");
      return;
    }

    result.push("  <section name=\"" + escapeAttribute(section.name) + "\">");
  }

  function closeSection(result, section) {
    if (!section) {
      return;
    }

    if (section.type === "tag") {
      result.push("  </" + section.tagName + ">");
      return;
    }

    result.push("  </section>");
  }

  function appendContentLine(result, line) {
    const unordered = line.match(/^\s*-\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);

    if (unordered) {
      result.push("    <item>" + escapeText(unordered[1].trim()) + "</item>");
      return;
    }

    if (ordered) {
      result.push("    <step>" + escapeText(ordered[1].trim()) + "</step>");
      return;
    }

    result.push("    <p>" + escapeText(line.trim()) + "</p>");
  }

  function appendCodeBlock(result, lines, language) {
    const languageAttribute = language ? " language=\"" + escapeAttribute(language) + "\"" : "";
    result.push("    <code_block" + languageAttribute + ">");
    lines.forEach(function (codeLine) {
      result.push("      " + escapeText(codeLine));
    });
    result.push("    </code_block>");
  }

  function escapeText(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttribute(value) {
    return escapeText(value).replace(/"/g, "&quot;");
  }

  async function copyOutput() {
    const text = fields.output.value;

    if (!text) {
      setStatus("先に変換してください。");
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

    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.style.position = "fixed";
    temporary.style.left = "-9999px";
    document.body.appendChild(temporary);
    temporary.focus();
    temporary.select();
    document.execCommand("copy");
    document.body.removeChild(temporary);
    setStatus("コピーしました。");
  }

  function setStatus(message) {
    fields.status.textContent = message;
  }
}());
