import * as React from "react";

/**
 * 从 React 节点中递归提取文本内容
 */
export function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  if (React.isValidElement(node)) {
    const props = node.props as {
      children?: React.ReactNode;
      dangerouslySetInnerHTML?: { __html: string };
    };
    // 检查是否有 dangerouslySetInnerHTML（代码高亮后的 HTML）
    if (props?.dangerouslySetInnerHTML?.__html) {
      // 从 HTML 中提取文本（移除 HTML 标签）
      const html = props.dangerouslySetInnerHTML.__html;
      return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
    }
    return props?.children ? extractTextFromNode(props.children) : "";
  }
  return "";
}

/**
 * 包管理器命令映射配置
 */
const PACKAGE_MANAGER_MAPPINGS = [
  {
    pattern: /^npm install/,
    commands: {
      npm: (cmd: string) => cmd,
      yarn: (cmd: string) => cmd.replace("npm install", "yarn add"),
      pnpm: (cmd: string) => cmd.replace("npm install", "pnpm add"),
      bun: (cmd: string) => cmd.replace("npm install", "bun add"),
    },
  },
  {
    pattern: /^npx create-/,
    commands: {
      npm: (cmd: string) => cmd,
      yarn: (cmd: string) => cmd.replace("npx create-", "yarn create "),
      pnpm: (cmd: string) => cmd.replace("npx create-", "pnpm create "),
      bun: (cmd: string) => cmd.replace("npx", "bunx --bun"),
    },
  },
  {
    pattern: /^npm create/,
    commands: {
      npm: (cmd: string) => cmd,
      yarn: (cmd: string) => cmd.replace("npm create", "yarn create"),
      pnpm: (cmd: string) => cmd.replace("npm create", "pnpm create"),
      bun: (cmd: string) => cmd.replace("npm create", "bun create"),
    },
  },
  {
    pattern: /^npx/,
    commands: {
      npm: (cmd: string) => cmd,
      yarn: (cmd: string) => cmd.replace("npx", "yarn"),
      pnpm: (cmd: string) => cmd.replace("npx", "pnpm dlx"),
      bun: (cmd: string) => cmd.replace("npx", "bunx --bun"),
    },
  },
  {
    pattern: /^npm run/,
    commands: {
      npm: (cmd: string) => cmd,
      yarn: (cmd: string) => cmd.replace("npm run", "yarn"),
      pnpm: (cmd: string) => cmd.replace("npm run", "pnpm"),
      bun: (cmd: string) => cmd.replace("npm run", "bun"),
    },
  },
] as const;

export type PackageManagerCommands = {
  npm: string;
  yarn: string;
  pnpm: string;
  bun: string;
};

/**
 * 检测代码内容是否是 npm 命令，并生成对应的包管理器命令
 */
export function detectNpmCommand(
  codeContent: string | null | undefined
): PackageManagerCommands | null {
  if (!codeContent) return null;

  const trimmed = codeContent.trim();

  for (const mapping of PACKAGE_MANAGER_MAPPINGS) {
    if (mapping.pattern.test(trimmed)) {
      return {
        npm: mapping.commands.npm(trimmed),
        yarn: mapping.commands.yarn(trimmed),
        pnpm: mapping.commands.pnpm(trimmed),
        bun: mapping.commands.bun(trimmed),
      };
    }
  }

  return null;
}

