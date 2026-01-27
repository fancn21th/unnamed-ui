import React from "react";
import {
  StyledListSection,
  StyledListTitle,
  StyledListContent,
  StyledListItem,
  StyledListItemNumber,
  StyledListItemContent,
} from "./style";

export type ListVariant =
  | "strengths"
  | "weaknesses"
  | "riskPoints"
  | "interviewSuggestions";

export interface ListSectionProps {
  variant: ListVariant;
  title: string;
  items: string[];
  showNumbers?: boolean;
}

const ListSection: React.FC<ListSectionProps> = ({
  variant,
  title,
  items,
  showNumbers = false,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <StyledListSection $variant={variant}>
      <StyledListTitle $variant={variant}>{title}</StyledListTitle>
      <StyledListContent>
        {items.map((content, index) => (
          <StyledListItem key={index}>
            {showNumbers && (
              <StyledListItemNumber>{index + 1}.</StyledListItemNumber>
            )}
            <StyledListItemContent>{content}</StyledListItemContent>
          </StyledListItem>
        ))}
      </StyledListContent>
    </StyledListSection>
  );
};

export default ListSection;
