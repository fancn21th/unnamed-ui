import styled, { css } from "styled-components";

// 多行文本溢出显示省略号
const multiLineEllipsis = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledCustomSourcesWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

interface StyledSourceMarkerProps {
  $isExternal?: boolean;
  $isSelected?: boolean;
}

export const StyledSourceMarker = styled.span<StyledSourceMarkerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  box-sizing: border-box;
  border-radius: var(--radius-circle);
  font-family: var(--font-family-cn);
  font-weight: 400;
  font-size: var(--font-size-1);
  /* 使用与 height 相同的 line-height，确保文本在容器内垂直居中 */
  line-height: 16px;
  letter-spacing: 0;
  text-align: center;
  /* 重置 sup 标签的默认样式，使用 baseline 对齐 */
  vertical-align: baseline;
  /* 重置 sup 标签的默认位置偏移 */
  position: relative;
  top: 0;
  padding-right: var(--padding-com-xs);
  padding-left: var(--padding-com-xs);
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  /* 微调垂直位置：向上调整以与文本中线对齐 */
  transform: translateY(-0.05em);

  /* 内部来源 - 未选中 */
  ${(props) =>
    !props.$isExternal &&
    !props.$isSelected &&
    css`
      background: var(--bg-neutral-light-hover);
      color: var(--text-primary);
    `}

  /* 内部来源 - 选中 */
  ${(props) =>
    !props.$isExternal &&
    props.$isSelected &&
    css`
      background: var(--bg-neutral);
      color: var(--text-inverse);
    `}

  /* 外部来源 - 未选中 */
  ${(props) =>
    props.$isExternal &&
    !props.$isSelected &&
    css`
      background: var(--bg-brand-light-hover);
      color: var(--text-brand);
    `}

  /* 外部来源 - 选中 */
  ${(props) =>
    props.$isExternal &&
    props.$isSelected &&
    css`
      background: var(--bg-brand);
      color: var(--text-inverse);
    `}

  /* 默认状态（如果没有指定 props，使用内部来源未选中样式） */
  ${(props) =>
    props.$isExternal === undefined &&
    props.$isSelected === undefined &&
    css`
      background: var(--bg-neutral-light-hover);
      color: var(--text-primary);
    `}
`;

export const StyledSourceCard = styled.div`
  position: fixed;
  z-index: 1000;
  width: 320px;
  max-width: calc(100vw - 32px);
  background: var(--bg-container);
  border: 1px solid var(--border-neutral);
  border-radius: var(--radius-lg);
  padding: var(--padding-com-md);
  box-sizing: border-box;
  cursor: pointer;
  animation: fadeIn 0.2s ease-in-out;
  box-shadow: var(--shadow-medium);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    box-shadow: var(--shadow-high);
  }
`;

export const StyledSourceCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--margin-com-xs);
  gap: var(--gap-sm);
`;

export const StyledSourceCardContent = styled.div`
  width: 320px;
  max-width: calc(100vw - 32px);
  background: var(--bg-container);
  border-radius: var(--radius-xl);
  padding: var(--padding-com-md);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
`;

export const StyledSourceCardSiteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  flex: 1;
  min-width: 0;
`;

export const StyledSourceCardLogo = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: var(--radius-circle);
  }
`;

export const StyledSourceCardSiteName = styled.div`
  font-family: var(--font-family-cn);
  font-size: var(--font-size-1);
  line-height: var(--line-height-2);
  font-weight: 400;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

export const StyledSourceCardAction = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  cursor: pointer;
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--bg-neutral-light-active);
  }
`;

export const StyledSourceCardTitle = styled.div`
  font-family: var(--font-family-cn);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--margin-com-xs);
  ${multiLineEllipsis(2)};
`;

export const StyledSourceCardDescription = styled.div`
  font-family: var(--font-family-cn);
  font-size: var(--font-size-1);
  line-height: var(--line-height-2);
  font-weight: 400;
  color: var(--text-secondary);
  ${multiLineEllipsis(3)};
`;
