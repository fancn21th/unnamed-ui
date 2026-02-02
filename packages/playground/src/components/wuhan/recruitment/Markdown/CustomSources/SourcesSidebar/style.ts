import styled, { css } from "styled-components";

// 多行文本溢出显示省略号
const multiLineEllipsis = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledSourcesSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  width: 400px;
  background: var(--bg-container);
`;

export const StyledSourcesSidebarTabs = styled.div`
  display: flex;
  align-items: center;
  padding-left: var(--padding-com-md);
  padding-right: var(--padding-com-md);
  border-bottom: 1px solid var(--divider-neutral-basic);
  gap: var(--gap-md);
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
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--bg-neutral-light-active);
    color: var(--text-primary);
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
  padding: var(--padding-com-sm) 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family-cn);
  font-size: var(--font-size-2);
  font-weight: 400;
  color: ${(props) =>
    props.$active ? "var(--text-brand)" : "var(--text-secondary)"};
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
      props.$active ? "var(--text-brand)" : "transparent"};
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: ${(props) =>
      props.$active ? "var(--text-brand)" : "var(--text-primary)"};
  }
`;

export const StyledSourcesSidebarList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--padding-com-md);
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
`;

export const StyledSourcesListItem = styled.div`
  width: 100%;
  background: var(--bg-container);
  border-radius: var(--radius-xl);
  padding: var(--padding-com-md);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--bg-container-secondary);
  }
`;

export const StyledSourcesListItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
`;

export const StyledSourcesListItemNumber = styled.span`
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
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  padding-right: var(--padding-com-xs);
  padding-left: var(--padding-com-xs);
  user-select: none;
  /* 内部来源未选中样式 */
  background: var(--bg-neutral-light-hover);
  color: var(--text-primary);
  flex-shrink: 0;
`;

export const StyledSourcesListItemSiteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
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
    border-radius: var(--radius-circle);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StyledSourcesListItemSiteName = styled.div`
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

export const StyledSourcesListItemTitle = styled.div`
  font-family: var(--font-family-cn);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--margin-com-xs);
  ${multiLineEllipsis(2)};
`;

export const StyledSourcesListItemDescription = styled.div`
  font-family: var(--font-family-cn);
  font-size: var(--font-size-1);
  line-height: var(--line-height-2);
  font-weight: 400;
  color: var(--text-secondary);
  ${multiLineEllipsis(3)};
`;
