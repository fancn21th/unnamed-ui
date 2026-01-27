import styled from "styled-components";
import { cssVar, multiLineEllipsis } from "../../utils/cssVar";
// import { cssVar, multiLineEllipsis } from '@scaffold/ui';

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
  border-radius: ${cssVar("border-radius-circle", { prefix: "ant" })};
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-weight: 400;
  font-size: ${cssVar("font-size-xs", { prefix: "ant" })};
  /* 使用与 height 相同的 line-height，确保文本在容器内垂直居中 */
  line-height: 16px;
  letter-spacing: 0;
  text-align: center;
  /* 重置 sup 标签的默认样式，使用 baseline 对齐 */
  vertical-align: baseline;
  /* 重置 sup 标签的默认位置偏移 */
  position: relative;
  top: 0;
  padding-right: ${cssVar("padding-com-xs", { prefix: "ant" })};
  padding-left: ${cssVar("padding-com-xs", { prefix: "ant" })};
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
    `
    background: ${cssVar("container-bg-neutral-light-hover", { prefix: "ant", fallback: "#E8E7ED" })};
    color: ${cssVar("color-text", { prefix: "ant", fallback: "#403F4D" })};
  `}

  /* 内部来源 - 选中 */
  ${(props) =>
    !props.$isExternal &&
    props.$isSelected &&
    `
    background: ${cssVar("container-bg-neutral", { prefix: "ant", fallback: "#403F4D" })};
    color: ${cssVar("text-inverse", { prefix: "ant", fallback: "#FFFFFF" })};
  `}

  /* 外部来源 - 未选中 */
  ${(props) =>
    props.$isExternal &&
    !props.$isSelected &&
    `
    background: ${cssVar("container-bg-brand-light-hover", { prefix: "ant", fallback: "#DFE9FF" })};
    color: ${cssVar("text-brand", { prefix: "ant", fallback: "#4A56FF" })};
  `}

  /* 外部来源 - 选中 */
  ${(props) =>
    props.$isExternal &&
    props.$isSelected &&
    `
    background: ${cssVar("container-bg-brand", { prefix: "ant", fallback: "#4A56FF" })};
    color: ${cssVar("text-inverse", { prefix: "ant", fallback: "#FFFFFF" })};
  `}

  /* 默认状态（如果没有指定 props，使用内部来源未选中样式） */
  ${(props) =>
    props.$isExternal === undefined &&
    props.$isSelected === undefined &&
    `
    background: ${cssVar("container-bg-neutral-light-hover", { prefix: "ant", fallback: "#E8E7ED" })};
    color: ${cssVar("color-text", { prefix: "ant", fallback: "#403F4D" })};
  `}
`;

export const StyledSourceCard = styled.div`
  position: fixed;
  z-index: 1000;
  width: 320px;
  max-width: calc(100vw - 32px);
  background: ${cssVar("color-bg-container", { prefix: "ant" })};
  border: 1px solid ${cssVar("color-border", { prefix: "ant" })};
  border-radius: ${cssVar("radius-lg", { prefix: "ant" })};
  box-shadow: ${cssVar("box-shadow-secondary", { prefix: "ant" })};
  padding: ${cssVar("padding-md", { prefix: "ant" })};
  box-sizing: border-box;
  cursor: pointer;
  animation: fadeIn 0.2s ease-in-out;
  box-shadow:
    0 9 28 8 rgba(0, 0, 0, 0.05),
    0 6 16 0 rgba(0, 0, 0, 0.08),
    0 3 6 -4px rgba(0, 0, 0, 0.12);

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
    box-shadow: ${cssVar("box-shadow-tertiary", { prefix: "ant" })};
  }
`;

export const StyledSourceCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${cssVar("margin-xs", { prefix: "ant" })};
  gap: ${cssVar("size-sm", { prefix: "ant" })};
`;

export const StyledSourceCardContent = styled.div`
  width: 320px;
  max-width: calc(100vw - 32px);
  background: ${cssVar("color-bg-container", { prefix: "ant" })};
  border-radius: ${cssVar("radius-xl", { prefix: "ant" })};
  padding: ${cssVar("padding-com-md", { prefix: "ant" })};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${cssVar("gap-xs", { prefix: "ant" })};
`;

export const StyledSourceCardSiteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar("size-xs", { prefix: "ant" })};
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
    border-radius: ${cssVar("border-radius-circle", { prefix: "ant" })};
  }
`;

export const StyledSourceCardSiteName = styled.div`
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-xs", { prefix: "ant" })};
  line-height: ${cssVar("line-height-2", { prefix: "ant" })};
  font-weight: 400;
  color: ${cssVar("color-text-secondary", { prefix: "ant" })};
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
  border-radius: ${cssVar("border-radius", { prefix: "ant" })};
  cursor: pointer;
  flex-shrink: 0;
  color: ${cssVar("color-text-secondary", { prefix: "ant" })};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${cssVar("color-fill-tertiary", { prefix: "ant" })};
  }
`;

export const StyledSourceCardTitle = styled.div`
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-sm", { prefix: "ant" })};
  line-height: ${cssVar("line-height-2", { prefix: "ant" })};
  font-weight: 600;
  color: ${cssVar("color-text", { prefix: "ant" })};
  margin-bottom: ${cssVar("margin-xs", { prefix: "ant" })};
  ${multiLineEllipsis(2)};
`;

export const StyledSourceCardDescription = styled.div`
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-xs", { prefix: "ant" })};
  line-height: ${cssVar("line-height-2", { prefix: "ant" })};
  font-weight: 400;
  color: ${cssVar("color-text-secondary", { prefix: "ant" })};
  ${multiLineEllipsis(3)};
`;
