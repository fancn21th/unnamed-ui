import React from "react";
import { type EvaluationConclusion } from "../../index";
import {
  StyledOverallMatchSection,
  StyledStarsContainer,
  StyledMatchLabel,
  StyledRate,
  StyledMatchInfoRow,
  StyledPercentageContainer,
  StyledPercentageLabel,
  StyledPercentageValue,
  StyledConclusion,
  StyledConclusionLabel,
  StyledConclusionText,
  StyledDescription,
} from "./style";

const conclusionTextMap: Record<EvaluationConclusion, string> = {
  recommended: "推荐进入面试",
  "not-recommended": "不推荐",
  pending: "待评估",
};

export interface OverallMatchSectionProps {
  stars: number;
  percentage: number;
  conclusion: EvaluationConclusion;
  description: string;
  overallMatchLabel?: string;
}

const OverallMatchSection: React.FC<OverallMatchSectionProps> = ({
  stars,
  percentage,
  conclusion,
  description,
  overallMatchLabel = "综合匹配度",
}) => {
  const conclusionText = conclusionTextMap[conclusion];
  const isRecommended = conclusion === "recommended";

  return (
    <StyledOverallMatchSection>
      <StyledStarsContainer>
        <StyledMatchLabel>匹配度</StyledMatchLabel>
        <StyledRate disabled value={stars} />
      </StyledStarsContainer>
      <StyledMatchInfoRow>
        <StyledPercentageContainer>
          <StyledPercentageLabel>{overallMatchLabel}：</StyledPercentageLabel>
          <StyledPercentageValue>{percentage}%</StyledPercentageValue>
        </StyledPercentageContainer>
        <StyledConclusion $isRecommended={isRecommended}>
          <StyledConclusionLabel>评估结论：</StyledConclusionLabel>
          <StyledConclusionText $isRecommended={isRecommended}>
            {conclusionText}
          </StyledConclusionText>
        </StyledConclusion>
      </StyledMatchInfoRow>
      <StyledDescription>{description}</StyledDescription>
    </StyledOverallMatchSection>
  );
};

export default OverallMatchSection;
