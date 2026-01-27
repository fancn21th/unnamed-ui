"use client";

import React from "react";
import { StyledCandidateReport } from "./style";
import BasicProfile from "./components/BasicProfile";
import CoreAbilityAssessment from "./components/CoreAbilityAssessment";
import RiskAndUncertainty from "./components/RiskAndUncertainty";
import CostBenefitAssessment from "./components/CostBenefitAssessment";

export interface BasicProfileData {
  /** 候选人姓名 */
  name: string;
  /** 头像URL（可选，如果不提供则显示默认头像） */
  avatar?: string;
  /** 状态标签（如"已通过二面"） */
  status?: {
    text: string;
    color?: string;
  };
  /** 性别 */
  gender: string;
  /** 年龄 */
  age: number;
  /** 工作经验（年） */
  workExperience: number;
  /** 学历 */
  education: string;
  /** 薪资期望 */
  salaryExpectation: string;
  /** 当前/目标职位 */
  position: string;
  /** 详细经验描述列表 */
  experienceDetails: string[];
}

export interface AbilityDimension {
  /** 能力维度名称 */
  name: string;
  /** 分数（0-100） */
  score: number;
}

export interface CoreAbilityAssessmentData {
  /** 能力维度数据（5个维度） */
  dimensions: AbilityDimension[];
  /** 匹配度结论（如"基本匹配"） */
  matchConclusion: string;
  /** 匹配度说明（括号内的说明） */
  matchNote?: string;
  /** 详细评估描述 */
  description: string;
}

export interface RiskItem {
  id?: string;
  /** 序号（仅当 iconType 为 'number' 时使用） */
  number?: number;
  /** 风险标题 */
  title: string;
  /** 风险描述 */
  description: string;
  /** 面试官评论（可选） */
  interviewerComment?: {
    name: string;
    comment: string;
  };
  /** 图标类型 */
  iconType: "number" | "warning";
  /** 风险等级（仅当 iconType 为 'warning' 时使用） */
  riskLevel?: string;
  /** 风险等级类型（用于样式，如'高'、'中'、'低'） */
  riskLevelType?: "high" | "medium" | "low";
}

export interface UncertaintyItem {
  id?: string;
  /** 序号 */
  number: number;
  /** 不确定性标题 */
  title: string;
  /** 不确定性描述 */
  description: string;
  /** 产生原因 */
  reason?: string;
  /** 潜在影响 */
  impact?: string;
}

export interface RiskAndUncertaintyData {
  /** 已识别风险列表 */
  risks: RiskItem[];
  /** 不确定性因素列表 */
  uncertainties: UncertaintyItem[];
}

export interface CostBenefitAssessmentData {
  /** 综合性价比评级（如"中等偏高"） */
  overallRating: string;
  /** 综合性价比描述 */
  overallDescription: string;
  /** 决策建议列表 */
  recommendations: string[];
  /** 岗位薪资区间（如"3000~5000"） */
  positionSalaryRange: string;
  /** 期望薪资（如"8000"） */
  expectedSalary: string;
  /** 成本压力描述 */
  costPressure?: string;
  /** 隐性成本描述 */
  hiddenCosts?: string;
  /** 短期可交付价值描述 */
  shortTermValue?: string;
  /** 对招聘目标的支持度描述 */
  recruitmentGoalSupport?: string;
}

export interface CandidateReportSource {
  /** 基本画像数据 */
  basicProfile: BasicProfileData;
  /** 核心能力评估数据 */
  coreAbilityAssessment: CoreAbilityAssessmentData;
  /** 风险与不确定性数据 */
  riskAndUncertainty: RiskAndUncertaintyData;
  /** 成本与性价比评估数据 */
  costBenefitAssessment: CostBenefitAssessmentData;
}

export interface CandidateReportProps {
  className?: string;
  /** 数据源（必传） */
  source: CandidateReportSource;
  /** 关闭回调 */
  onClose?: () => void;
}

// 候选人报告组件
const CandidateReport: React.FC<CandidateReportProps> = ({
  className,
  source,
}) => {
  const {
    basicProfile,
    coreAbilityAssessment,
    riskAndUncertainty,
    costBenefitAssessment,
  } = source;

  return (
    <StyledCandidateReport className={className}>
      {/* 基本画像 */}
      <BasicProfile data={basicProfile} />

      {/* 核心能力评估 */}
      <CoreAbilityAssessment data={coreAbilityAssessment} />

      {/* 风险与不确定性 */}
      <RiskAndUncertainty data={riskAndUncertainty} />

      {/* 成本与性价比评估 */}
      <CostBenefitAssessment data={costBenefitAssessment} />
    </StyledCandidateReport>
  );
};

export default CandidateReport;
