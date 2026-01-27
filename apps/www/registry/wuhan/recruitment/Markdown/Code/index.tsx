import type { ComponentProps } from "react";
import { CodeHighlighter, Mermaid } from "@ant-design/x";
import { CopyIcon, DownloadIcon } from "../../icons";
import {
  StyledCodeBlock,
  StyledCodeScroll,
  StyledCodeToolbar,
  StyledCodeToolButton,
} from "./style";

export const Code: React.FC<ComponentProps<"code">> = (props) => {
  const { className, children } = props;
  const lang = className?.match(/language-([^\s]+)/)?.[1] || "";

  if (typeof children !== "string") return null;
  if (lang === "mermaid") return <Mermaid>{children}</Mermaid>;

  // x-markdown 的 code 组件同时用于 inline / block，inline 时一般没有 className
  const isInline = (props as any)?.inline;
  if (isInline || !className) {
    return <code className={className}>{children}</code>;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      // fallback（避免无权限时完全失效）
      const textarea = document.createElement("textarea");
      textarea.value = children;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleDownload = () => {
    const normalize = (s: string) => s.trim().toLowerCase();
    const langToExt: Record<string, string> = {
      javascript: "js",
      js: "js",
      typescript: "ts",
      ts: "ts",
      tsx: "tsx",
      jsx: "jsx",
      json: "json",
      yaml: "yml",
      yml: "yml",
      markdown: "md",
      md: "md",
      html: "html",
      css: "css",
      scss: "scss",
      less: "less",
      xml: "xml",
      sql: "sql",
      python: "py",
      py: "py",
      java: "java",
      kotlin: "kt",
      kt: "kt",
      go: "go",
      rust: "rs",
      rs: "rs",
      c: "c",
      cpp: "cpp",
      cxx: "cpp",
      "c++": "cpp",
      csharp: "cs",
      "c#": "cs",
      php: "php",
      ruby: "rb",
      rb: "rb",
      shell: "sh",
      bash: "sh",
      sh: "sh",
      powershell: "ps1",
      ps1: "ps1",
      dockerfile: "Dockerfile",
      makefile: "Makefile",
      text: "txt",
      plaintext: "txt",
      txt: "txt",
    };

    const normalizedLang = normalize(lang);
    const mapped = langToExt[normalizedLang];
    const ext = mapped || (normalizedLang ? normalizedLang : "txt");
    const blob = new Blob([children], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // 特殊：Dockerfile / Makefile 这类无后缀文件名
    a.download =
      ext === "Dockerfile" || ext === "Makefile" ? ext : `code.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <StyledCodeBlock>
      <StyledCodeToolbar className="md-code-toolbar">
        <StyledCodeToolButton
          type="button"
          aria-label="下载"
          title="下载"
          onClick={handleDownload}
        >
          <DownloadIcon />
        </StyledCodeToolButton>
        <StyledCodeToolButton
          type="button"
          aria-label="复制"
          title="复制"
          onClick={handleCopy}
        >
          <CopyIcon />
        </StyledCodeToolButton>
      </StyledCodeToolbar>

      <StyledCodeScroll>
        <CodeHighlighter lang={lang}>{children}</CodeHighlighter>
      </StyledCodeScroll>
    </StyledCodeBlock>
  );
};

export default Code;
