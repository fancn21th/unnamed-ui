import styled from "styled-components";

/**
 * Markdown 表格（Web Chat）：
 * - 横向溢出滚动；纵向最多约显示表头+5行
 * - sticky 表头 + sticky 首列；hover 显示工具栏
 */
export const StyledMarkdownTableWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: var(--margin-com-xl) !important;
  margin-bottom: var(--margin-com-xl) !important;

  border-top: 1px solid var(--border-neutral);
  border-bottom: 1px solid var(--border-neutral);
  background: var(--bg-container);

  &:hover .md-table-toolbar {
    opacity: 1;
    pointer-events: auto;
  }
`;

/** 表格滚动容器：scrollbars 都在这里 */
export const StyledMarkdownTableScroll = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  box-sizing: border-box;

  /* 约显示：表头 + 5 行（不含表头） */
  max-height: 282px;
`;

export const StyledMarkdownTable = styled.table`
  /* 让横向滚动条只出现在 wrapper 上 */
  width: max-content !important;
  min-width: 100% !important;
  max-width: none !important;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  box-sizing: border-box;

  th,
  td {
    padding: var(--padding-com-sm) var(--padding-com-xl);
    border-right: 1px solid var(--divider-neutral-basic);
    border-bottom: 1px solid var(--divider-neutral-basic);
    white-space: nowrap;
    text-align: left;
    background: inherit;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--bg-neutral-light);
    font-weight: 600;
  }

  /* 第一列固定 */
  th:first-child,
  td:first-child {
    position: sticky;
    left: 0;
    /* 提高层级，避免阴影被后面的单元格盖住 */
    z-index: 4;
    /* 固定列需要自己有背景，否则会透出后面的列 */
    background: var(--bg-container);
  }

  thead th:first-child {
    z-index: 5;
    background: var(--bg-neutral-light);
  }

  /* 斑马纹时首列背景跟随行背景 */
  tbody tr:nth-child(even) td:first-child {
    background: var(--bg-neutral-light);
  }

  /* 固定首列右侧阴影：用 ::after 画在最上层 */
  th:first-child::after,
  td:first-child::after {
    content: "";
    position: absolute;
    top: 0;
    right: -1px;
    width: 10px;
    height: 100%;
    pointer-events: none;
    z-index: 6;
    box-shadow: none;
  }

  /* 仅横向溢出时显示固定首列阴影 */
  ${StyledMarkdownTableScroll}[data-x-overflow='true'] & {
    th:first-child::after,
    td:first-child::after {
      box-shadow: 10px 0px 10px 0px rgba(0, 0, 0, 0.09);
    }
  }

  tbody tr {
    background: var(--bg-container);
    transition: background-color 0.2s ease;
  }

  tbody tr:nth-child(even) {
    background: var(--bg-neutral-light);
  }

  tbody tr:hover {
    background: var(--bg-container-secondary);
  }

  tbody tr:nth-child(even):hover {
    background: var(--bg-neutral-light-hover);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

/** hover 工具栏（下载/复制） */
export const StyledCodeToolbar = styled.div`
  position: absolute;
  top: var(--padding-com-md);
  right: var(--padding-com-md);
  height: 28px;
  display: flex;
  align-items: center;
  gap: var(--gap-2xs);
  padding: var(--padding-com-2xs);

  background: var(--bg-container);
  border: 1px solid var(--border-neutral);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-basic);

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  /* 高于 sticky 表头/首列等（避免被覆盖） */
  z-index: 9;
`;

export const StyledCodeToolButton = styled.button`
  width: 24px;
  height: 24px;
  padding: var(--padding-com-xs);
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--bg-neutral-light-active);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
