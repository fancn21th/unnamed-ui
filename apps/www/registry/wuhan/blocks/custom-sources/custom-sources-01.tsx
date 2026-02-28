"use client";

import styled, { css } from "styled-components";

// 多行文本溢出显示省略号
const multiLineEllipsis = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CustomSourcesWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

export interface CustomSourcesMarkerProps {
  $isExternal?: boolean;
  $isSelected?: boolean;
}

export const CustomSourcesMarker = styled.span<CustomSourcesMarkerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  box-sizing: border-box;
  border-radius: var(--radius-circle);
  font-family: var(--font-family-CN);
  font-weight: 400;
  font-size: var(--font-size-1);
  line-height: 16px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: baseline;
  position: relative;
  top: 0;
  padding-right: var(--Padding-padding-com-xs);
  padding-left: var(--Padding-padding-com-xs);
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  transform: translateY(-0.05em);

  ${(props) =>
    !props.$isExternal &&
    !props.$isSelected &&
    css`
      background: var(--Container-bg-neutral-light-hover);
      color: var(--Text-text-primary);
    `}

  ${(props) =>
    !props.$isExternal &&
    props.$isSelected &&
    css`
      background: var(--Container-bg-neutral);
      color: var(--Text-text-inverse);
    `}

  ${(props) =>
    props.$isExternal &&
    !props.$isSelected &&
    css`
      background: var(--Container-bg-brand-light-hover);
      color: var(--Text-text-brand);
    `}

  ${(props) =>
    props.$isExternal &&
    props.$isSelected &&
    css`
      background: var(--Container-bg-brand);
      color: var(--Text-text-inverse);
    `}

  ${(props) =>
    props.$isExternal === undefined &&
    props.$isSelected === undefined &&
    css`
      background: var(--Container-bg-neutral-light-hover);
      color: var(--Text-text-primary);
    `}
`;

export const CustomSourcesCardContent = styled.div`
  width: 320px;
  max-width: calc(100vw - 32px);
  background: var(--Container-bg-container);
  border-radius: var(--radius-xl);
  padding: var(--Padding-padding-com-md);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--Gap-gap-xs);
`;

export const CustomSourcesCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--Margin-margin-com-xs);
  gap: var(--Gap-gap-sm);
`;

export const CustomSourcesCardSiteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--Gap-gap-xs);
  flex: 1;
  min-width: 0;
`;

export const CustomSourcesCardLogo = styled.div`
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

export const CustomSourcesCardSiteName = styled.div`
  font-family: var(--font-family-CN);
  font-size: var(--font-size-1);
  line-height: var(--line-height-2);
  font-weight: 400;
  color: var(--Text-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

export const CustomSourcesCardAction = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  cursor: pointer;
  flex-shrink: 0;
  color: var(--Text-text-secondary);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--Container-bg-neutral-light-active);
  }
`;

export const CustomSourcesCardTitle = styled.div`
  font-family: var(--font-family-CN);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  font-weight: 600;
  color: var(--Text-text-primary);
  margin-bottom: var(--Margin-margin-com-xs);
  ${multiLineEllipsis(2)};
`;

export const CustomSourcesCardDescription = styled.div`
  font-family: var(--font-family-CN);
  font-size: var(--font-size-1);
  line-height: var(--line-height-2);
  font-weight: 400;
  color: var(--Text-text-secondary);
  ${multiLineEllipsis(3)};
`;
