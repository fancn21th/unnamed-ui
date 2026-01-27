/**
 * ActionDropdown 类型定义
 */

import type { DropdownProps, MenuProps } from "antd";

/**
 * ActionDropdown 组件属性
 */
export interface ActionDropdownProps extends Omit<DropdownProps, "menu"> {
  /** 自定义菜单项 */
  items?: MenuProps["items"];
  /** 是否显示删除项 */
  showDelete?: boolean;
  /** 删除项文本 */
  deleteText?: string;
  /** 菜单点击回调 */
  onMenuClick?: MenuProps["onClick"];
  /** 删除确认后回调 */
  onDelete?: () => void;
}
