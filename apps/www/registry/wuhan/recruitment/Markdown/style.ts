import styled from "styled-components";
import { XMarkdown } from "@ant-design/x-markdown";
import { cssVar } from "../utils/cssVar";

export const StyledMarkdownWrapper = styled(XMarkdown)`
  /* Layout: container should fill available width */
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;

  /* Typography: headings */
  h1 {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size-heading-1", { prefix: "ant" })};
    line-height: ${cssVar("line-height-heading-1", { prefix: "ant" })};
    font-weight: 600;
    margin-top: ${cssVar("margin-com-2xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  h2 {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size-heading-2", { prefix: "ant" })};
    line-height: ${cssVar("line-height-heading-2", { prefix: "ant" })};
    font-weight: 600;
    margin-top: ${cssVar("margin-com-2xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  h3 {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size-heading-3", { prefix: "ant" })};
    line-height: ${cssVar("line-height-heading-3", { prefix: "ant" })};
    font-weight: 600;
    margin-top: ${cssVar("margin-com-2xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  /* Typography: paragraph */
  p {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size", { prefix: "ant" })};
    line-height: ${cssVar("line-height", { prefix: "ant" })};
    font-weight: 400;
    margin-top: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  /* Blockquote: left bar + tertiary text */
  blockquote {
    font-family: ${cssVar("font-family", { prefix: "ant" })} !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: ${cssVar("font-size-3", { prefix: "ant" })} !important;
    line-height: ${cssVar("line-height-4", { prefix: "ant" })} !important;
    letter-spacing: 0 !important;
    color: ${cssVar("color-text-tertiary", { prefix: "ant" })} !important;
    border-left: 2px solid ${cssVar("color-fill-tertiary", { prefix: "ant" })} !important;
    margin: 0 !important;
    padding-left: ${cssVar("padding-com-lg", { prefix: "ant" })} !important;
  }

  /* Lists: spacing + nested bullets */
  ul,
  ol {
    margin-left: ${cssVar("margin-xs", { prefix: "ant" })} !important;
    margin-top: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  /* 2nd-level ul bullets */
  ul ul li {
    list-style-type: circle !important;
  }

  /* 3rd-level ul bullets */
  ul ul ul li {
    list-style-type: square !important;
  }

  /* List item */
  li {
    font-size: ${cssVar("font-size", { prefix: "ant" })};
    line-height: ${cssVar("line-height-4", { prefix: "ant" })};
    font-weight: 400;
    margin-top: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-md", { prefix: "ant" })} !important;
  }

  /* Tables: basic typography */
  table {
    shadow: inherit !important;
    border-radius: inherit !important;
  }
  /* Table header */
  th {
    color: ${cssVar("color-text-base", { prefix: "ant" })} !important;
    font-family: ${cssVar("font-family", { prefix: "ant" })} !important;
    font-weight: 600 !important;
    font-size: ${cssVar("font-size-sm", { prefix: "ant" })} !important;
    line-height: ${cssVar("line-height-sm", { prefix: "ant" })} !important;
    background: ${cssVar("color-bg-container-neutral-light", {
      prefix: "ant",
    })} !important;
    padding: ${cssVar("padding-com-lg", { prefix: "ant" })} !important;
  }

  /* Table cell */
  td {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size-sm", { prefix: "ant" })} !important;
    line-height: ${cssVar("line-height-sm", { prefix: "ant" })} !important;
    font-weight: 400;
    background-color: ${cssVar("color-bg-container", {
      prefix: "ant",
    })} !important;
    color: ${cssVar("color-text", { prefix: "ant" })} !important;
  }

  /* Table caption */
  caption {
    font-family: ${cssVar("font-family", { prefix: "ant" })};
    font-size: ${cssVar("font-size-xs", { prefix: "ant" })};
    line-height: ${cssVar("line-height-xs", { prefix: "ant" })};
    font-weight: 400;
  }

  .ant-codeHighlighter {
    font-size: ${cssVar("font-size-xs", { prefix: "ant" })} !important;
    line-height: ${cssVar("line-height-xs", { prefix: "ant" })} !important;
    border-radius: ${cssVar("border-radius-lg", { prefix: "ant" })} !important;
    padding-top: ${cssVar("padding-com-md", { prefix: "ant" })} !important;
    padding-right: ${cssVar("padding-com-md", { prefix: "ant" })} !important;
    padding-bottom: ${cssVar("padding-com-md", { prefix: "ant" })} !important;
    padding-left: ${cssVar("padding-com-md", { prefix: "ant" })} !important;
    background-color: ${cssVar("color-bg-container-neutral-light", {
      prefix: "ant",
    })} !important;
  }
  .ant-codeHighlighter-header {
    padding: 0;
    background: transparent !important;
  }
  .ant-codeHighlighter-code {
    padding: 0;
    border: none !important;
    background: transparent !important;
  }
  /* Hide built-in copy button (we use custom hover toolbar) */
  .ant-codeHighlighter-header button,
  .ant-codeHighlighter button {
    display: none !important;
  }
  .ant-codeHighlighter-header pre,
  .ant-codeHighlighter-code pre {
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }
  .ant-codeHighlighter-header pre code,
  .ant-codeHighlighter-code pre code {
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }
  .ant-codeHighlighter .ant-codeHighlighter-header-title {
    font-family: ${cssVar("font-family-code", { prefix: "ant" })}!important;
    font-weight: 400;
    font-size: ${cssVar("font-size-xs", { prefix: "ant" })}!important;
  }

  /* Inline code */
  code {
    font-family: 'Menlo, SFMono-Regular, Consolas, "Liberation Mono", monospace';
    font-size: ${cssVar("font-size-xs", { prefix: "ant" })}!important;
    line-height: ${cssVar("line-height-xs", { prefix: "ant" })}!important;
    font-weight: 400;
    margin-top: ${cssVar("margin-com-xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-xl", { prefix: "ant" })} !important;
  }

  /* Code block (note: further overridden by StyledCodeScroll) */
  pre {
    max-width: 100% !important;
    overflow-x: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    margin-top: ${cssVar("margin-com-xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-xl", { prefix: "ant" })} !important;
  }

  pre code {
    max-width: 100% !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }

  /* Tables: layout reset for generic markdown tables */
  table {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border: none !important;
    border-collapse: collapse !important;
    table-layout: auto !important;
    box-sizing: border-box !important;
    display: table !important;
  }

  /* Tables: ensure internal elements occupy full width */
  table thead,
  table tbody,
  table tfoot {
    width: 100% !important;
    display: table-row-group !important;
  }

  table tr {
    width: 100% !important;
    display: table-row !important;
  }

  /* 确保表格列占满宽度 */
  table colgroup,
  table col {
    width: auto !important;
  }

  /* Tables: only keep bottom border */
  table th,
  table td {
    border: none !important;
    border-bottom: 1px solid ${cssVar("color-border", { prefix: "ant" })} !important;
    padding: ${cssVar("padding-com-lg", { prefix: "ant" })} !important;
    box-sizing: border-box !important;
  }

  /* Tables: remove bottom border for last row */
  table tr:last-child td {
    border-bottom: none !important;
  }

  /* Tables: keep left/right padding for edge columns */
  table th:first-child,
  table td:first-child {
    padding-left: ${cssVar("padding-com-lg", { prefix: "ant" })} !important;
  }

  table th:last-child,
  table td:last-child {
    padding-right: ${cssVar("padding-com-lg", { prefix: "ant" })} !important;
  }

  /* Divider */
  hr {
    margin-top: ${cssVar("margin-com-2xl", { prefix: "ant" })} !important;
    margin-bottom: ${cssVar("margin-com-2xl", { prefix: "ant" })} !important;
    border: none !important;
    border-top: 1px solid ${cssVar("color-border-secondary", { prefix: "ant" })} !important;
    background: none !important;
    height: 0 !important;
  }

  /* Antd table wrapper: force full width */
  .ant-table-wrapper,
  .table {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    box-sizing: border-box !important;
    display: block !important;
  }

  /* Ensure direct table parent doesn't shrink */
  * > table {
    width: 100% !important;
    max-width: 100% !important;
  }
  .anticon-copy {
    display: none !important;
  }

  /* Mermaid */
  .ant-mermaid {
    padding: ${cssVar("padding-com-md", { prefix: "ant" })} !important;
  }

  /* Sources 引用样式 */
  .ant-sources-title-wrapper {
    height: 16px !important;
    min-width: 16px !important;
    border-radius: ${cssVar("border-radius-circle", {
      prefix: "ant",
    })} !important;
    box-sizing: border-box;
    opacity: 1 !important;
    padding-right: ${cssVar("padding-com-xs", { prefix: "ant" })}!important;
    padding-left: ${cssVar("padding-com-xs", { prefix: "ant" })}!important;
    gap: ${cssVar("size-sm", { prefix: "ant" })} !important;
    background: ${cssVar("container-bg-container-placeholder", {
      prefix: "ant",
    })} !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: ${cssVar("font-family", { prefix: "ant" })} !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: ${cssVar("font-size-xs", { prefix: "ant" })} !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    vertical-align: middle !important;
    color: ${cssVar("color-text", {
      prefix: "ant",
      fallback: "#403f4d",
    })} !important;
  }
`;
