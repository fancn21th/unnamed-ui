"use client";

import React from "react";
import { StyledResumeEvaluationReport } from "./style";
import ReportHeader from "./components/ReportHeader";
import OverallMatchSection from "./components/OverallMatchSection";
import MatchDetailsSection from "./components/MatchDetailsSection";
import ListSection from "./components/ListSection";

export type EvaluationConclusion =
  | "recommended"
  | "not-recommended"
  | "pending";

export type MatchType = "skill" | "experience" | "professional";

export interface MatchDetailItem {
  type: MatchType;
  percentage: number;
  description: string;
}

export interface ResumeEvaluationReportSource {
  /** 候选人姓名 */
  candidateName: string;
  /** 综合匹配度 */
  overallMatch: {
    stars: number;
    percentage: number;
    conclusion: EvaluationConclusion;
    description: string;
  };
  /** 匹配度详情（数组形式） */
  matchDetails: MatchDetailItem[];
  /** 优势列表 */
  strengths?: string[];
  /** 不足列表 */
  weaknesses?: string[];
  /** 风险点列表 */
  riskPoints?: string[];
  /** 面试建议列表 */
  interviewSuggestions?: string[];
}

export interface ResumeEvaluationReportProps {
  className?: string;
  /** 数据源（必传） */
  source: ResumeEvaluationReportSource;
  /** 关闭回调 */
  onClose?: () => void;
  /** 可配置文本标签 */
  labels?: {
    overallMatch?: string;
    strengths?: string;
    weaknesses?: string;
    riskPoints?: string;
    interviewSuggestions?: string;
  };
  /** 是否显示优势，默认为 true */
  showStrengths?: boolean;
  /** 是否显示不足，默认为 true */
  showWeaknesses?: boolean;
  /** 是否显示风险点，默认为 true */
  showRiskPoints?: boolean;
  /** 是否显示面试建议，默认为 true */
  showInterviewSuggestions?: boolean;
}

const ResumeEvaluationReport: React.FC<ResumeEvaluationReportProps> = ({
  className,
  source,
  onClose,
  labels = {},
  showStrengths = true,
  showWeaknesses = true,
  showRiskPoints = true,
  showInterviewSuggestions = true,
}) => {
  const {
    candidateName,
    overallMatch,
    matchDetails,
    strengths = [],
    weaknesses = [],
    riskPoints = [],
    interviewSuggestions = [],
  } = source;

  const {
    overallMatch: overallMatchLabel = "综合匹配度",
    strengths: strengthsLabel = "优势",
    weaknesses: weaknessesLabel = "不足",
    riskPoints: riskPointsLabel = "风险点",
    interviewSuggestions: interviewSuggestionsLabel = "面试建议方向",
  } = labels;

  return (
    <StyledResumeEvaluationReport className={className}>
      <ReportHeader candidateName={candidateName} onClose={onClose} />

      <OverallMatchSection
        stars={overallMatch.stars}
        percentage={overallMatch.percentage}
        conclusion={overallMatch.conclusion}
        description={overallMatch.description}
        overallMatchLabel={overallMatchLabel}
      />

      <MatchDetailsSection matchDetails={matchDetails} />

      {showStrengths && strengths.length > 0 && (
        <ListSection
          variant="strengths"
          title={strengthsLabel}
          items={strengths}
        />
      )}

      {showWeaknesses && weaknesses.length > 0 && (
        <ListSection
          variant="weaknesses"
          title={weaknessesLabel}
          items={weaknesses}
        />
      )}

      {showRiskPoints && riskPoints.length > 0 && (
        <ListSection
          variant="riskPoints"
          title={riskPointsLabel}
          items={riskPoints}
          showNumbers
        />
      )}

      {showInterviewSuggestions && interviewSuggestions.length > 0 && (
        <ListSection
          variant="interviewSuggestions"
          title={interviewSuggestionsLabel}
          items={interviewSuggestions}
          showNumbers
        />
      )}
    </StyledResumeEvaluationReport>
  );
};

export default ResumeEvaluationReport;
