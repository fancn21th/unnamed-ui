import styled from "styled-components";
import { type ListVariant } from "./index";

const getListSectionBorderColor = (variant?: ListVariant) => {
  switch (variant) {
    case "strengths":
      return "#e5fff0";
    case "weaknesses":
      return "#ffe5e3";
    case "riskPoints":
      return "#fff3c1";
    case "interviewSuggestions":
      return "#e9eaeb";
    default:
      return "#e5e5e5";
  }
};

const getListTitleColor = (variant?: ListVariant) => {
  switch (variant) {
    case "strengths":
      return "#008428";
    case "weaknesses":
      return "#a23300";
    case "riskPoints":
      return "#e37318";
    case "interviewSuggestions":
      return "#717680";
    default:
      return "#333333";
  }
};

export const StyledListSection = styled.div<{ $variant?: ListVariant }>`
  padding: 16px;
  border: 1px solid ${({ $variant }) => getListSectionBorderColor($variant)};
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(36, 18, 200, 0.07);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledListTitle = styled.div<{ $variant?: ListVariant }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $variant }) => getListTitleColor($variant)};
`;

export const StyledListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
`;

export const StyledListItemNumber = styled.span`
  flex-shrink: 0;
  color: #999999;
`;

export const StyledListItemContent = styled.span`
  flex: 1;
`;
