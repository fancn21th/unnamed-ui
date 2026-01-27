import React from "react";
import { type MatchDetailItem } from "../../index";
import MatchItem from "./MatchItem";
import { StyledMatchDetailsSection } from "./style";

export interface MatchDetailsSectionProps {
  matchDetails: MatchDetailItem[];
}

const MatchDetailsSection: React.FC<MatchDetailsSectionProps> = ({
  matchDetails,
}) => {
  return (
    <StyledMatchDetailsSection>
      {matchDetails.map((item, index) => (
        <MatchItem
          key={index}
          type={item.type}
          percentage={item.percentage}
          description={item.description}
        />
      ))}
    </StyledMatchDetailsSection>
  );
};

export default MatchDetailsSection;
