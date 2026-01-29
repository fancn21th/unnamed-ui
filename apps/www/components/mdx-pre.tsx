import * as React from "react";
import { CodeBlockCommand } from "@/components/code-block-command";
import { CopyButton } from "@/components/copy-button";
import { extractTextFromNode, detectNpmCommand } from "@/lib/code-utils";
import { highlightCode } from "@/lib/highlight-code";

function extractLanguageFromClassName(className?: string) {
  if (!className) return undefined;
  const match =
    className.match(/language-([A-Za-z0-9_-]+)/) ??
    className.match(/lang-([A-Za-z0-9_-]+)/);
  return match?.[1];
}

function findFirstClassName(node: React.ReactNode): string | undefined {
  if (!node || typeof node === "string" || typeof node === "number") return undefined;
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findFirstClassName(item);
      if (found) return found;
    }
    return undefined;
  }
  if (React.isValidElement(node)) {
    const props = node.props as { className?: string; children?: React.ReactNode };
    if (props.className) return props.className;
    return props.children ? findFirstClassName(props.children) : undefined;
  }
  return undefined;
}

function findRawCodeFromNode(node: React.ReactNode): string | undefined {
  if (!node || typeof node === "string" || typeof node === "number") return undefined;
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findRawCodeFromNode(item);
      if (found) return found;
    }
    return undefined;
  }
  if (React.isValidElement(node)) {
    const props = node.props as {
      __raw__?: string;
      children?: React.ReactNode;
    };
    if (props.__raw__) return props.__raw__;
    return props.children ? findRawCodeFromNode(props.children) : undefined;
  }
  return undefined;
}

function stripEmbeddedLineNumbers(code: string) {
  const lines = code.split("\n");
  const numbered = lines
    .map((line) => {
      const match =
        line.match(/^\s*(\d+)\s*\|\s+(.*)$/) ??
        line.match(/^\s*(\d+)\s+(.*)$/);
      return match
        ? { raw: line, num: Number(match[1]), content: match[2] }
        : null;
    })
    .filter((item) => item !== null) as Array<{
    raw: string;
    num: number;
    content: string;
  }>;

  if (numbered.length < 2) return code;

  const nonEmptyCount = lines.filter((line) => line.trim().length > 0).length;
  const ratio = numbered.length / Math.max(1, nonEmptyCount);

  const base = numbered[0].num;
  const isSequential = numbered.every((item, index) => item.num === base + index);
  const isIncreasing = numbered.every(
    (item, index) => index === 0 || item.num > numbered[index - 1].num
  );

  if (!isSequential && !isIncreasing && ratio < 0.5) return code;

  const stripped = lines.map((line) => {
    const match =
      line.match(/^\s*(\d+)\s*\|\s+(.*)$/) ??
      line.match(/^\s*(\d+)\s+(.*)$/);
    return match ? match[2] : line;
  });

  return stripped.join("\n");
}

export async function MDXPre(props: React.ComponentProps<"pre">) {
  const { children, className, ...restProps } = props;

  // 从 pre 的 children（code 元素）中提取代码内容
  const rawContent = findRawCodeFromNode(children);
  const codeContent = rawContent ?? extractTextFromNode(children);

  // 检测是否是 npm 命令
  const commands = detectNpmCommand(codeContent);

  if (commands) {
    // 如果是 npm 命令，返回 CodeBlockCommand 组件
    return (
      <CodeBlockCommand
        __npm__={commands.npm}
        __yarn__={commands.yarn}
        __pnpm__={commands.pnpm}
        __bun__={commands.bun}
      />
    );
  }

  const language =
    extractLanguageFromClassName(className) ??
    extractLanguageFromClassName(findFirstClassName(children)) ??
    "tsx";

  const normalizedCode = stripEmbeddedLineNumbers(codeContent);
  const highlightedCode = await highlightCode(normalizedCode, language);

  return (
    <figure
      data-rehype-pretty-code-figure=""
      data-mdx-pre=""
      className={className}
      {...restProps}
    >
      <CopyButton value={normalizedCode} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}

