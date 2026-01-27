import styled from "styled-components";

export const StyledJobCardContainer = styled.div`
  max-height: 132px;
  gap: 10px;
  border-radius: 12px;
  padding: 12px;
  background: #f9fafb;
  opacity: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

export const StyledSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0;
  color: #71717d;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledTitle = styled.div`
  font-weight: 500;
  color: #27272a;
  font-size: 14px;
  line-height: 22px;
`;

export const StyledDescription = styled.div<{
  $expanded?: boolean;
  $maxLines?: number;
  $expandable?: boolean;
}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #999;
  ${(props) =>
    props.$expandable && !props.$expanded
      ? `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${props.$maxLines || 2};
    -webkit-box-orient: vertical;
  `
      : `
    overflow: visible;
    display: block;
  `}
  transition: all 0.3s ease;
`;
