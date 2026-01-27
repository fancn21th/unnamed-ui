/**
 * 能力等级枚举
 * 定义能力评估的四个等级
 */
export enum CapabilityLevel {
  /** 证据不足 */
  INSUFFICIENT = 0,
  /** 低 */
  LOW = 1,
  /** 中 */
  MEDIUM = 2,
  /** 高 */
  HIGH = 3,
}
/**
 * 能力等级标签映射
 */
export const CAPABILITY_LEVEL_LABELS = {
  [CapabilityLevel.INSUFFICIENT]: "证据不足",
  [CapabilityLevel.LOW]: "低",
  [CapabilityLevel.MEDIUM]: "中",
  [CapabilityLevel.HIGH]: "高",
};

/**
 * 候选人能力数据
 * 表示单个候选人在某个能力维度上的评分
 */
export interface CandidateCapability {
  /** 候选人名称 */
  candidateName: string;
  /** 能力等级 (0-3) */
  level: CapabilityLevel;
}

/**
 * 能力维度数据
 * 表示一个能力维度及其下所有候选人的评分
 */
export interface CapabilityData {
  /** 能力维度名称（如：技术能力、沟通能力等） */
  abilityName: string;
  /** 该能力维度下各候选人的能力数据 */
  candidates: CandidateCapability[];
}

/**
 * 单个柱状图组件 Props
 */
export interface CapabilityBarChartProps {
  /** 能力维度数据 */
  data: CapabilityData;
  /** 柱状图颜色数组 */
  colors: string[];
}
