import { Timeline } from "antd";
import styled from "styled-components";

export const StyledStepContainer = styled.div`
  max-width: 800px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledTitle = styled.div`
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  color: #141414;
`;

export const StyledArrowIcon = styled.div`
  color: #999;
  font-size: 18px;

  &::before {
    content: "→";
  }
`;

export const StyledDescription = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

export const StyledContent = styled.div`
  font-size: 12px;
  color: #717680;
  line-height: 20px;
  padding-left: 8px;
  /* border-left: 2px solid #e5e7eb; */
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledItem = styled.div``;

export const StyledItemTitle = styled.span`
  font-size: 12px;
  color: #414651;
  line-height: 20px;
  margin-right: 4px;
  gap: 8px;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  background: #f3f4f6;
`;

export const StyledItemContent = styled.span`
  font-size: 12px;
  color: #717680;
  line-height: 20px;
`;

export const StyledTimeline = styled(Timeline)`
  .item-icon {
    border: none;
    width: 4px;
    height: 4px;
    background-color: #aaa8b3 !important;
    /* margin-top: 10px; */
  }
  .item-rail {
    margin: 0 !important;
    left: 1px !important;
    top: 16px !important;
    bottom: -4px !important;
  }
  .item-content,
  .item-root {
    line-height: 1 !important;
    /* padding: 0 !important; */
  }
`;
