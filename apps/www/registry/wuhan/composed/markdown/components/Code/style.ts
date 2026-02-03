import styled from "styled-components";

/** 代码块外层容器：hover 显示工具栏 */
export const StyledCodeBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &:hover .md-code-toolbar {
    opacity: 1;
    pointer-events: auto;
  }
`;

/** 代码滚动容器：把横/纵向滚动统一收敛到这里 */
export const StyledCodeScroll = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: 320px;
  overflow: auto;
  box-sizing: border-box;
  border-radius: var(--radius-lg) !important;
  background-color: var(--bg-neutral-light) !important;
  /* 覆盖 Markdown 全局 pre-wrap，确保横向滚动条生效 */
  pre,
  pre code {
    white-space: pre !important;
    word-wrap: normal !important;
  }

  /* 关键：把内部滚动从 pre / ant-codeHighlighter "夺回"到这个容器 */
  .ant-codeHighlighter,
  .ant-codeHighlighter-code,
  pre {
    overflow: visible !important;
  }

  /* 让 pre 的宽度随内容增长，从而触发本容器横向滚动条 */
  pre {
    display: inline-block !important;
    min-width: 100%;
    width: max-content;
    max-width: none !important;
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
