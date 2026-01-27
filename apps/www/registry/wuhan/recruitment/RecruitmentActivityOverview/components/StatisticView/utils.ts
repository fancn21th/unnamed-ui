import type { RecruitmentProcessStatisticItem } from "../../types";

// ==================== 常量定义 ====================

/**
 * 招聘阶段标签映射表
 */
const STAGE_LABEL_MAP: Record<string, string> = {
  resumeScreening: "简历初筛",
  firstInterview: "一面",
  secondInterview: "二面",
  thirdInterview: "三面",
  fourthInterview: "四面",
  offer: "Offer环节",
  officialHired: "正式录用",
};

/**
 * 候选人状态标签映射表
 */
const STATUS_LABEL_MAP: Record<string, string> = {
  inProgress: "进行中",
  pending: "待确认",
  passed: "通过",
  rejected: "淘汰",
  accepted: "已接受",
  declined: "已拒绝",
  onBoard: "已到岗",
  notOnBoard: "未到岗",
};

/**
 * 状态排序顺序
 */
const STATUS_SORT_ORDER = Object.keys(STATUS_LABEL_MAP);

/**
 * 全部筛选项的值
 */
const ALL_FILTER_VALUE = "all";

// ==================== 类型定义 ====================

/**
 * 表格行数据
 */
export interface GridRowData {
  key: string;
  label: string;
  value: number;
}

/**
 * 筛选项数据
 */
export interface FilterItemData {
  stageLabel: string;
  stageValue?: string;
  count?: number;
  statusOptions?: StatusOption[];
}

/**
 * 状态选项
 */
export interface StatusOption {
  key: string;
  label: string;
  value: string;
}

// ==================== 工具函数 ====================

/**
 * 获取阶段标签
 * @param stageKey 阶段键名
 * @returns 阶段标签，如果找不到则返回原键名
 */
export function getStageLabel(stageKey: string): string {
  return STAGE_LABEL_MAP[stageKey] || stageKey;
}

/**
 * 获取状态标签
 * @param statusKey 状态键名
 * @returns 状态标签，如果找不到则返回原键名
 */
function getStatusLabel(statusKey: string): string {
  return STATUS_LABEL_MAP[statusKey] || statusKey;
}

/**
 * 按预定义顺序排序状态数组
 * @param statusKeys 待排序的状态键名数组
 * @returns 排序后的数组
 */
function sortStatusKeys(statusKeys: string[]): string[] {
  return [...statusKeys].sort((a, b) => {
    const indexA = STATUS_SORT_ORDER.indexOf(a);
    const indexB = STATUS_SORT_ORDER.indexOf(b);

    // 不在排序列表中的排到最后
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

/**
 * 将状态键名转换为状态选项数组
 * @param statusKeys 状态键名数组
 * @returns 状态选项数组
 */
function transformToStatusOptions(statusKeys: string[]): StatusOption[] {
  return statusKeys.map((key) => ({
    key,
    label: getStatusLabel(key),
    value: key,
  }));
}

// ==================== 数据转换函数 ====================

/**
 * 将招聘流程统计项转换为表格数据
 * @param statisticItem 统计项数据（不包含stage字段）
 * @returns 表格行数据数组
 */
export function transformToGridData(
  statisticItem: Omit<RecruitmentProcessStatisticItem, "stage">,
): GridRowData[] {
  // 获取状态键，排除stage字段
  const statusKeys = Object.keys(statisticItem).filter(
    (key) => key !== "stage",
  );
  // 排序状态键
  const sortedStatusKeys = sortStatusKeys(statusKeys);
  // 构建表格行数据
  return sortedStatusKeys.map((key) => ({
    key,
    label: STATUS_LABEL_MAP[key] || key,
    value: (statisticItem[key as keyof typeof statisticItem] as number) || 0,
  }));
}

/**
 * 将招聘流程统计数据转换为筛选项数据
 * @param statisticList 统计数据列表
 * @param totalCandidates 候选人总数
 * @returns 筛选项数据数组
 */
export function transformToFilterItemData(
  statisticList: RecruitmentProcessStatisticItem[],
  totalCandidates: number,
): FilterItemData[] {
  // 构建全部筛选项
  const allFilterItem: FilterItemData = {
    stageLabel: "全部",
    stageValue: ALL_FILTER_VALUE,
    count: totalCandidates,
  };
  // 构建各阶段筛选项
  const stageFilterItems = statisticList.map((item) => {
    const { stage, ...statusData } = item;
    // 获取状态键
    const statusKeys = Object.keys(statusData);
    // 排序状态键
    const sortedStatusKeys = sortStatusKeys(statusKeys);

    return {
      stageLabel: getStageLabel(stage),
      stageValue: stage,
      statusOptions: transformToStatusOptions(sortedStatusKeys),
    };
  });

  return [allFilterItem, ...stageFilterItems];
}
