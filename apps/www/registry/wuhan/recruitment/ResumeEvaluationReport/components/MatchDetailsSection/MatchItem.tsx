import React from "react";
import { type ProgressProps } from "antd";
import { type MatchType } from "../../index";
import {
  StyledMatchItem,
  StyledMatchItemHeader,
  StyledMatchItemTitle,
  StyledMatchItemPercentage,
  StyledProgress,
  StyledMatchItemDescription,
} from "./style";

const matchTypeTitleMap: Record<MatchType, string> = {
  skill: "技能匹配度",
  experience: "经验匹配度",
  professional: "专业匹配度",
};

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#59A5FC",
  "50%": "#6155F5",
  "100%": "#DD72F2",
};

export interface MatchItemProps {
  type: MatchType;
  percentage: number;
  description: string;
}

const MatchItem: React.FC<MatchItemProps> = ({
  type,
  percentage,
  description,
}) => {
  return (
    <StyledMatchItem>
      <StyledMatchItemHeader>
        <StyledMatchItemTitle>{matchTypeTitleMap[type]}</StyledMatchItemTitle>
        <StyledMatchItemPercentage>{percentage}%</StyledMatchItemPercentage>
      </StyledMatchItemHeader>
      <StyledProgress
        percent={percentage}
        strokeWidth={12}
        strokeColor={conicColors}
        showInfo={false}
      />
      <StyledMatchItemDescription>{description}</StyledMatchItemDescription>
    </StyledMatchItem>
  );
};

export default MatchItem;
