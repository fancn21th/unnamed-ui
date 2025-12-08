import * as React from "react";
import { CodeBlockCommand } from "@/components/code-block-command";
import { extractTextFromNode, detectNpmCommand } from "@/lib/code-utils";

export function MDXPre(props: React.ComponentProps<"pre">) {
  const { children, className, ...restProps } = props;
  
  // 从 pre 的 children（code 元素）中提取代码内容
  const codeContent = extractTextFromNode(children);
  
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

  // 默认的 pre 组件
  return (
    <pre className={className} {...restProps}>
      {children}
    </pre>
  );
}

