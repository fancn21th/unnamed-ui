/**
 * 数据源列表组件属性
 */
export interface DataSourceListProps {
  /** 样式类名 */
  className?: string;
  /** 样式 */
  styles?: React.CSSProperties;
  /** 数据源列表（必传） */
  dataSources: DataSourceGroup[];
  /** 默认选中的数据源ID列表 */
  defaultSelectedIds?: (string | number)[];
  /** 选中的数据源ID列表 */
  selectedIds?: (string | number)[];
  /** 是否禁用，默认为 false */
  disabled?: boolean;
  /** 更新时间标签文本，默认为"更新时间：" */
  updateTimeLabel?: string;
  /** 全选文本，默认为"选择所有来源" */
  selectAllLabel?: string;
  /** 是否显示全选选项，默认为 true */
  showSelectAll?: boolean;
  /** 选中状态变化回调 */
  onChange?: (selectedIds: (string | number)[]) => void;
  /** 删除确认回调 */
  onDeleteConfirm?: (id: string | number) => void;
  /** 重命名确认回调 */
  onRenameConfirm?: (
    data: { id: string | number; newName: string },
    close: () => void,
  ) => void;
}

/**
 * 数据源项组件属性
 */
export interface DatasourceItemProps extends Pick<
  DataSourceListProps,
  "updateTimeLabel" | "disabled" | "onDeleteConfirm" | "onRenameConfirm"
> {
  /** 数据源项 */
  dataSourceItem: DataSourceItem;
  /** 是否选中 */
  checked?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
}

/**
 * 数据源项类型
 */
export interface DataSourceItem {
  /** 数据源来源ID */
  id: string | number;
  /** 文件名称 */
  fileName?: string;
  /** 文件类型 */
  fileType?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 数据源分组类型
 */
export interface DataSourceGroup {
  /** 分组名称 */
  groupName: string;
  /** 数据源列表 */
  dataSources: DataSourceItem[];
}
