import Latex from "@ant-design/x-markdown/plugins/Latex";
import type XMarkdown from "@ant-design/x-markdown";
import { findFirstForbiddenCharIndex } from "./utils";

export type MarkdownConfig = NonNullable<
  React.ComponentProps<typeof XMarkdown>["config"]
>;

export const markdownConfig: MarkdownConfig = {
  hooks: {
    preprocess(markdown: string) {
      // 临时标记双波浪号
      const placeholder = "\u0000TILDE_PAIR\u0000";
      let processed = markdown.replace(/~~/g, placeholder);
      processed = processed.replace(/~/g, "&#126;");
      processed = processed.replace(new RegExp(placeholder, "g"), "~~");
      // think标签处理
      processed = processed.replace(/(<think>)/g, "\n\n$1\n");
      processed = processed.replace(/(<\/think>)/g, "\n$1\n\n");
      return processed;
    },
  },
  extensions: [...Latex()],
  renderer: {
    link(token) {
      // 标准 Markdown 链接格式：[文本](URL)
      const markdownLinkRegex = /\[[^\]]+\]\([^\s()<>]+(?:\([^\s()<>]*\))?\)/;
      // 如果不是标准 Markdown 链接格式（即纯 URL），需要处理后续的中文/标点
      if (!markdownLinkRegex.test(token.raw)) {
        const firstForbiddenCharIndex = findFirstForbiddenCharIndex(token.href);
        // 如果发现禁止字符，截断链接
        if (firstForbiddenCharIndex > 0) {
          const validHref = token.href.slice(0, firstForbiddenCharIndex);
          const remainingText = token.href.slice(firstForbiddenCharIndex);
          return `<a href="${validHref}" target="_blank">${validHref}</a>${remainingText}`;
        }
      }
      return `<a href="${token.href}" target="_blank">${token?.text || token.href}</a>`;
    },
  },
  // // 自定义token
  // walkTokens(tokens) {},
};
