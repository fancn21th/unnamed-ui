import styled from "styled-components";
import { cssVar, multiLineEllipsis } from "../../../utils/cssVar";

export const StyledSourcesSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  width: 400px;
  background: ${cssVar("color-bg-container", { prefix: "ant" })};
`;

export const StyledSourcesSidebarTabs = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${cssVar("padding-md", { prefix: "ant" })};
  padding-right: ${cssVar("padding-md", { prefix: "ant" })};
  border-bottom: 1px solid
    ${cssVar("color-border-secondary", { prefix: "ant" })};
  gap: ${cssVar("size-md", { prefix: "ant" })};
`;

export const StyledSourcesSidebarClose = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  margin-left: auto;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${cssVar("border-radius", { prefix: "ant" })};
  color: ${cssVar("color-text-secondary", { prefix: "ant" })};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${cssVar("color-fill-tertiary", { prefix: "ant" })};
    color: ${cssVar("color-text", { prefix: "ant" })};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface StyledSourcesTabProps {
  $active?: boolean;
}

export const StyledSourcesTab = styled.button<StyledSourcesTabProps>`
  padding: ${cssVar("padding-sm", { prefix: "ant" })} 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-sm", { prefix: "ant" })};
  font-weight: 400;
  color: ${(props) =>
    props.$active
      ? cssVar("text-brand", { prefix: "ant", fallback: "#4A56FF" })
      : cssVar("color-text-secondary", { prefix: "ant" })};
  position: relative;
  transition: color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) =>
      props.$active
        ? cssVar("text-brand", { prefix: "ant", fallback: "#4A56FF" })
        : "transparent"};
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: ${(props) =>
      props.$active
        ? cssVar("text-brand", { prefix: "ant", fallback: "#4A56FF" })
        : cssVar("color-text", { prefix: "ant" })};
  }
`;

export const StyledSourcesSidebarList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${cssVar("padding-md", { prefix: "ant" })};
  display: flex;
  flex-direction: column;
  gap: ${cssVar("gap-md", { prefix: "ant" })};
`;

export const StyledSourcesListItem = styled.div`
  width: 100%;
  background: ${cssVar("color-bg-container", { prefix: "ant" })};
  border-radius: ${cssVar("radius-xl", { prefix: "ant" })};
  padding: ${cssVar("padding-com-md", { prefix: "ant" })};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${cssVar("gap-xs", { prefix: "ant" })};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${cssVar("color-fill-quaternary", {
      prefix: "ant",
      fallback: "#fafafa",
    })};
  }
`;

export const StyledSourcesListItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar("size-xs", { prefix: "ant" })};
`;

export const StyledSourcesListItemNumber = styled.span`
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
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  padding-right: ${cssVar("padding-com-xs", { prefix: "ant" })};
  padding-left: ${cssVar("padding-com-xs", { prefix: "ant" })};
  user-select: none;
  /* 内部来源未选中样式 */
  background: ${cssVar("container-bg-neutral-light-hover", {
    prefix: "ant",
    fallback: "#E8E7ED",
  })};
  color: ${cssVar("color-text", { prefix: "ant", fallback: "#403F4D" })};
  flex-shrink: 0;
`;

export const StyledSourcesListItemSiteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar("size-xs", { prefix: "ant" })};
  flex: 1;
  min-width: 0;
`;

export const StyledSourcesListItemLogo = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
    border-radius: ${cssVar("border-radius-circle", { prefix: "ant" })};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StyledSourcesListItemSiteName = styled.div`
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

export const StyledSourcesListItemTitle = styled.div`
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-sm", { prefix: "ant" })};
  line-height: ${cssVar("line-height-2", { prefix: "ant" })};
  font-weight: 600;
  color: ${cssVar("color-text", { prefix: "ant" })};
  margin-bottom: ${cssVar("margin-xs", { prefix: "ant" })};
  ${multiLineEllipsis(2)};
`;

export const StyledSourcesListItemDescription = styled.div`
  font-family: ${cssVar("font-family", { prefix: "ant" })};
  font-size: ${cssVar("font-size-xs", { prefix: "ant" })};
  line-height: ${cssVar("line-height-2", { prefix: "ant" })};
  font-weight: 400;
  color: ${cssVar("color-text-secondary", { prefix: "ant" })};
  ${multiLineEllipsis(3)};
`;
