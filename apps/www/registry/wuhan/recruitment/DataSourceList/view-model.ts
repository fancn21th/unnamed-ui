/**
 * DataSourceList 视图模型
 * 管理数据源列表的状态和业务逻辑
 */

import { useState, useMemo } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { DataSourceGroup } from "./types";

export interface UseDataSourceListViewModelProps {
  /** 数据源列表 */
  dataSources: DataSourceGroup[];
  /** 默认选中的 ID 列表（非受控） */
  defaultSelectedIds?: (string | number)[];
  /** 选中的 ID 列表（受控） */
  selectedIds?: (string | number)[];
  /** 选中状态变化回调 */
  onChange?: (selectedIds: (string | number)[]) => void;
}

export interface DataSourceListViewModel {
  /** 当前选中的 ID 列表 */
  currentSelectedIds: (string | number)[];
  /** 所有数据源的 ID 列表 */
  allDataSourceIds: (string | number)[];
  /** 是否全选 */
  isAllSelected: boolean;
  /** 是否部分选中（半选状态） */
  isIndeterminate: boolean;
  /** 全选/取消全选处理 */
  onSelectAllChange: (e: CheckboxChangeEvent) => void;
  /** 单个项目选中/取消选中处理 */
  onItemChange: (id: string | number, checked: boolean) => void;
}

/**
 * DataSourceList 视图模型 Hook
 */
export function useDataSourceListViewModel(
  props: UseDataSourceListViewModelProps,
): DataSourceListViewModel {
  const { dataSources, defaultSelectedIds = [], selectedIds, onChange } = props;

  // 内部状态（非受控模式）
  const [internalSelectedIds, setInternalSelectedIds] =
    useState<(string | number)[]>(defaultSelectedIds);

  // 判断是否为受控组件
  const isControlled = selectedIds !== undefined;

  // 当前选中的 IDs（受控 or 非受控）
  const currentSelectedIds = isControlled ? selectedIds : internalSelectedIds;

  /**
   * 获取所有数据源的 ID 列表
   */
  const allDataSourceIds = useMemo(() => {
    return dataSources.flatMap((group) =>
      group.dataSources.map((item) => item.id),
    );
  }, [dataSources]);

  /**
   * 是否全选
   */
  const isAllSelected = useMemo(() => {
    return (
      allDataSourceIds.length > 0 &&
      allDataSourceIds.every((id) => currentSelectedIds.includes(id))
    );
  }, [allDataSourceIds, currentSelectedIds]);

  /**
   * 是否部分选中
   */
  const isIndeterminate = useMemo(() => {
    const selectedCount = allDataSourceIds.filter((id) =>
      currentSelectedIds.includes(id),
    ).length;
    return selectedCount > 0 && selectedCount < allDataSourceIds.length;
  }, [allDataSourceIds, currentSelectedIds]);

  /**
   * 更新选中状态
   */
  const onUpdateSelectedIds = (newSelectedIds: (string | number)[]) => {
    // 非受控模式：更新内部状态
    if (!isControlled) {
      setInternalSelectedIds(newSelectedIds);
    }

    // 触发 onChange 回调
    onChange?.(newSelectedIds);
  };

  /**
   * 全选/取消全选处理
   */
  const onSelectAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const newSelectedIds = checked ? allDataSourceIds : [];
    onUpdateSelectedIds(newSelectedIds);
  };

  /**
   * 单个项目选中/取消选中处理
   */
  const onItemChange = (id: string | number, checked: boolean) => {
    const newSelectedIds = checked
      ? [...currentSelectedIds, id]
      : currentSelectedIds.filter((selectedId) => selectedId !== id);
    onUpdateSelectedIds(newSelectedIds);
  };

  return {
    currentSelectedIds,
    allDataSourceIds,
    isAllSelected,
    isIndeterminate,
    onSelectAllChange,
    onItemChange,
  };
}
