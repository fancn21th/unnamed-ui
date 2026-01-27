import type { ColumnsType } from "antd/es/table";

/**
 * 招聘需求状态枚举
 * 用于将数字状态码映射为可读文本
 */
export enum RequirementStatusEnum {
  /** 草稿 */
  DRAFT = 10,
  /** 审批中 */
  APPROVING = 20,
  /** 审批未通过 */
  APPROVAL_REJECTED = 30,
  /** 进行中 */
  IN_PROGRESS = 40,
  /** 已关闭 */
  CLOSED = 50,
  /** 已完成 */
  COMPLETED = 60,
  /** 已暂停 */
  PAUSED = 70,
  /** 审批已终止 */
  APPROVAL_TERMINATED = 80,
}

/**
 * 状态映射表
 * 将数字状态码转换为可读的中文描述
 */
export const REQUIREMENT_STATUS_MAP: Record<number, string> = {
  [RequirementStatusEnum.DRAFT]: "草稿",
  [RequirementStatusEnum.APPROVING]: "审批中",
  [RequirementStatusEnum.APPROVAL_REJECTED]: "审批未通过",
  [RequirementStatusEnum.IN_PROGRESS]: "进行中",
  [RequirementStatusEnum.CLOSED]: "已关闭",
  [RequirementStatusEnum.COMPLETED]: "已完成",
  [RequirementStatusEnum.PAUSED]: "已暂停",
  [RequirementStatusEnum.APPROVAL_TERMINATED]: "审批已终止",
};

/**
 * 状态映射表
 * 将数字状态码转换为可读的中文描述
 */

/**
 * 招聘岗位数据接口
 * 定义表格每一行数据的结构
 */
export interface RecruitmentJobData {
  /** 岗位唯一标识，作为 rowKey */
  requirementId: string | number;
  /** 招聘需求名称 */
  name: string;
  /** 招聘需求详情链接 */
  requirementLink?: string;
  /** 需求状态，枚举值：10=草稿 20=审批中 30=审批未通过 40=进行中 50=已关闭 60=已完成 70=已暂停 80=审批已终止 */
  requirementStatus: number;
  /** 关联岗位名称数组 */
  relationJobs: string[];
  /** 关联岗位详情链接 */
  positionLink?: string;
  /** 支持额外的自定义字段 */
  [key: string]: any;
}

/**
 * 组件 Props 接口
 * @template T - 数据类型，继承自 RecruitmentJobData
 */
export interface RecruitmentJobTableProps<T = RecruitmentJobData> {
  /** table 描述 */
  job_title: string;
  /** 表格数据源 */
  dataSource: T[];
  /** 当前选中的行 ID（受控模式，用于状态保持） */
  value?: string | number | null;
  /** 选中行变化时的回调（受控模式） */
  onChange?: (selectedId: string | number | null) => void;
  /** 是否已确认（确认后禁用 Radio 并隐藏按钮） */
  confirmed?: boolean;
  /** 自定义列配置，不传则使用默认列 */
  columns?: ColumnsType<T>;
  /** 是否显示确认按钮 */
  showConfirmButton?: boolean;
  /** 确认按钮文案 */
  confirmButtonText?: string;
  /** 点击确认按钮的回调，参数为当前选中的数据 */
  onConfirm?: (selectedData: T | null) => void;
  /** 点击招聘需求链接的回调 */
  onRequirementClick?: (record: T) => void;
  /** 点击关联岗位链接的回调 */
  onPositionClick?: (record: T) => void;
  /** Radio 列宽度 */
  radioColumnWidth?: number;
  /** 序号列宽度 */
  indexColumnWidth?: number;
}
