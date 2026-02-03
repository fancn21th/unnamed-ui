import styled from "styled-components";
import { XMarkdown } from "@ant-design/x-markdown";

export const StyledMarkdownWrapper = styled(XMarkdown)`
  /* Layout: container should fill available width */
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;

  /* Typography: headings */
  h1 {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-5);
    line-height: var(--line-height-5);
    font-weight: 600;
    margin-top: var(--margin-com-2xl) !important;
    margin-bottom: var(--margin-com-md) !important;
  }

  h2 {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-4);
    line-height: var(--line-height-4);
    font-weight: 600;
    margin-top: var(--margin-com-2xl) !important;
    margin-bottom: var(--margin-com-md) !important;
  }

  h3 {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-3);
    line-height: var(--line-height-4);
    font-weight: 600;
    margin-top: var(--margin-com-2xl) !important;
    margin-bottom: var(--margin-com-md) !important;
  }

  /* Typography: paragraph */
  p {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-3);
    line-height: var(--line-height-4);
    font-weight: 400;
    margin-top: var(--margin-com-md) !important;
    margin-bottom: var(--margin-com-md) !important;
  }

  /* Blockquote: left bar + tertiary text */
  blockquote {
    font-family: var(--font-family-cn) !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: var(--font-size-3) !important;
    line-height: var(--line-height-4) !important;
    letter-spacing: 0 !important;
    color: var(--text-tertiary) !important;
    border-left: 2px solid var(--bg-neutral-light-active) !important;
    margin: 0 !important;
    padding-left: var(--padding-com-lg) !important;
  }

  /* Lists: spacing + nested bullets */
  ul,
  ol {
    margin-left: var(--margin-com-xs) !important;
    margin-top: var(--margin-com-md) !important;
    margin-bottom: var(--margin-com-md) !important;
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
    font-size: var(--font-size-3);
    line-height: var(--line-height-4);
    font-weight: 400;
    margin-top: var(--margin-com-md) !important;
    margin-bottom: var(--margin-com-md) !important;
  }

  /* Tables: basic typography */
  table {
    shadow: inherit !important;
    border-radius: inherit !important;
  }
  /* Table header */
  th {
    color: var(--text-title) !important;
    font-family: var(--font-family-cn) !important;
    font-weight: 600 !important;
    font-size: var(--font-size-2) !important;
    line-height: var(--line-height-2) !important;
    background: var(--bg-neutral-light) !important;
    padding: var(--padding-com-lg) !important;
  }

  /* Table cell */
  td {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-2) !important;
    line-height: var(--line-height-2) !important;
    font-weight: 400;
    background-color: var(--bg-container) !important;
    color: var(--text-primary) !important;
  }

  /* Table caption */
  caption {
    font-family: var(--font-family-cn);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
    font-weight: 400;
  }

  .ant-codeHighlighter {
    font-size: var(--font-size-1) !important;
    line-height: var(--line-height-1) !important;
    border-radius: var(--radius-lg) !important;
    padding-top: var(--padding-com-md) !important;
    padding-right: var(--padding-com-md) !important;
    padding-bottom: var(--padding-com-md) !important;
    padding-left: var(--padding-com-md) !important;
    background-color: var(--bg-neutral-light) !important;
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
    font-family: var(--font-mono) !important;
    font-weight: 400;
    font-size: var(--font-size-1) !important;
  }

  /* Inline code */
  code {
    font-family: var(--font-mono);
    font-size: var(--font-size-1) !important;
    line-height: var(--line-height-1) !important;
    font-weight: 400;
    margin-top: var(--margin-com-xl) !important;
    margin-bottom: var(--margin-com-xl) !important;
  }

  /* Code block (note: further overridden by StyledCodeScroll) */
  pre {
    max-width: 100% !important;
    overflow-x: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    margin-top: var(--margin-com-xl) !important;
    margin-bottom: var(--margin-com-xl) !important;
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
    border-bottom: 1px solid var(--border-neutral) !important;
    padding: var(--padding-com-lg) !important;
    box-sizing: border-box !important;
  }

  /* Tables: remove bottom border for last row */
  table tr:last-child td {
    border-bottom: none !important;
  }

  /* Tables: keep left/right padding for edge columns */
  table th:first-child,
  table td:first-child {
    padding-left: var(--padding-com-lg) !important;
  }

  table th:last-child,
  table td:last-child {
    padding-right: var(--padding-com-lg) !important;
  }

  /* Divider */
  hr {
    margin-top: var(--margin-com-2xl) !important;
    margin-bottom: var(--margin-com-2xl) !important;
    border: none !important;
    border-top: 1px solid var(--divider-neutral-basic) !important;
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
    padding: var(--padding-com-md) !important;
  }

  /* Sources 引用样式 */
  .ant-sources-title-wrapper {
    height: 16px !important;
    min-width: 16px !important;
    border-radius: var(--radius-circle) !important;
    box-sizing: border-box;
    opacity: 1 !important;
    padding-right: var(--padding-com-xs) !important;
    padding-left: var(--padding-com-xs) !important;
    gap: var(--gap-sm) !important;
    background: var(--bg-container-disable) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: var(--font-family-cn) !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: var(--font-size-1) !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    vertical-align: middle !important;
    color: var(--text-primary, #403f4d) !important;
  }
`;
