import type { ReactNode } from "react";

/**
 * 选项配置
 * 基础选项数据结构，使用标准的 value/label 格式
 * @public
 */
export interface ComponentPanelOption {
  /** 选项的唯一值 */
  value: string;
  /** 选项的显示文本 */
  label: ReactNode;
  /** 选项图标 */
  icon?: ReactNode;
  /** 选项提示信息 */
  tooltip?: ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

/**
 * 选项卡配置
 * 定义一个选项卡分类及其下的所有选项
 * @public
 */
export interface ComponentPanelCategory {
  /** 选项卡的唯一值 */
  value: string;
  /** 选项卡的显示文本 */
  label: ReactNode;
  /** 该分类下的选项列表 */
  options: ComponentPanelOption[];
  /** 是否禁用该选项卡 */
  disabled?: boolean;
}
