/**
 * 招聘活动概览组件属性类型定义
 */
export interface RecruitmentActivityOverviewProps {
  /** 样式类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 岗位列表 */
  positionOptions: Position[];
  /** 当前选中的岗位 */
  selectedPositionValue?: string | number;
  /** 招聘活动概览数据 */
  dataSource?: RecruitmentActivityOverviewData;
  /** 岗位切换回调 */
  onPositionChange?: (value: string | number) => void;
  /** 详细分析链接点击回调 */
  onDetailAnalysisClick?: () => void;
  /** 跳转视图切换回调 */
  onViewSwitch?: (mode: RecruitmentActivityOverviewViewMode) => void;
  /** 关闭回调 */
  onClose?: () => void;
}

/**
 * 招聘活动概览视图模式类型定义
 */
export type RecruitmentActivityOverviewViewMode = "statistic" | "filter";

/**
 * 招聘活动概览头部属性类型定义
 */
export type RecruitmentActivityOverviewHeaderProps = Pick<
  RecruitmentActivityOverviewProps,
  "selectedPositionValue" | "positionOptions" | "onPositionChange" | "onClose"
>;

/**
 * 招聘活动概览介绍属性类型定义
 */
export type RecruitmentActivityOverviewIntroductionProps = Pick<
  RecruitmentActivityOverviewProps,
  "dataSource" | "onDetailAnalysisClick"
>;

/**
 * 招聘活动概览目标列表属性类型定义
 */
export type RecruitmentActivityOverviewGoalListProps = Pick<
  RecruitmentActivityOverviewProps,
  "dataSource"
>;

/**
 * 招聘活动概览统计视图属性类型定义
 */
export type RecruitmentActivityOverviewStatisticViewProps = Pick<
  RecruitmentActivityOverviewProps,
  "dataSource" | "onViewSwitch"
>;

/**
 * 招聘活动概览数据
 */
interface RecruitmentActivityOverviewData {
  /** 招聘目标数据 */
  introductionData: IntroductionData;
  /** 岗位招聘目标列表 */
  positionGoalList: PositionGoalItem[];
  /** 招聘流程各阶段统计项 */
  processStatisticList: RecruitmentProcessStatisticItem[];
  /** 候选人总人数 */
  totalCandidates: number;
  /** 候选人列表 */
  candidateList: CandidateListItem[];
}

/** 岗位列表项 */
interface Position {
  /** 岗位名称 */
  label: string;
  /** 岗位id */
  value: string | number;
}

/**
 * 招聘目标数据
 */
interface IntroductionData {
  /** 招聘目标描述 */
  goalDescription: string;
  /** 当前已完成文本 */
  completedText: string;
  /** 分析链接 */
  analysisLink: string;
  /** 任务进度百分比 */
  progress: number;
  /** 任务状态 */
  status?: string;
  /** 风险警告文本 */
  riskWarning?: string;
}

/**
 * 岗位招聘目标项
 */
interface PositionGoalItem {
  id: string | number;
  /** 岗位名称 */
  name: string;
  /** 招聘目标描述 */
  description: string;
}

//#region 招聘统计数据类型

/**
 * 招聘流程各阶段统计项
 */
export interface RecruitmentProcessStatisticItem {
  /** 阶段名称 */
  stage: string;
  /** 进行中数量 */
  inProgress?: number;
  /** 待确认数量 */
  pending?: number;
  /** 通过数量 */
  passed?: number;
  /** 淘汰数量 */
  rejected?: number;
  /** 已接受数量 */
  accepted?: number;
  /** 已拒绝数量 */
  declined?: number;
  /** 已到岗数量 */
  onBoard?: number;
  /** 未到岗数量 */
  notOnBoard?: number;
}

/**
 * 候选人列表项类型
 * TODO: 后续根据需求补充字段
 */
export interface CandidateListItem {
  /** 候选人id */
  id: string | number;
  /** 候选人姓名 */
  name: string;
}

/**
 * 网格统计视图属性类型定义
 */
export interface GridStatisticViewProps {
  /** 招聘流程各阶段统计项 */
  processStatisticList: RecruitmentProcessStatisticItem[];
}

/**
 * 过滤统计视图属性类型定义
 */
export interface FilterStatisticViewProps {
  /** 招聘流程各阶段统计项 */
  processStatisticList: RecruitmentProcessStatisticItem[];
  /** 候选人总人数 */
  totalCandidates: number;
}

/**
 * 筛选表属性类型定义
 */
export interface FilterTableProps {
  /** 筛选表数据源 */
  dataSource?: CandidateListItem[];
}
