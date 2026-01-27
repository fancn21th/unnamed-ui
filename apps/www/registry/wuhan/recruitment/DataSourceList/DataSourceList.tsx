"use client";

import { Checkbox } from "antd";
import { DatasourceItem } from "./components";
import type { DataSourceListProps, DataSourceItem } from "./types";
import {
  StyledDataSourceList,
  StyledDataSourceGroupItemHeader,
  StyledDataSourceGroupName,
} from "./styles";
import { useDataSourceListViewModel } from "./view-model";

export default function DataSourceList(props: DataSourceListProps) {
  const {
    className = "",
    styles = {},
    dataSources = [],
    defaultSelectedIds = [],
    selectedIds,
    disabled = false,
    updateTimeLabel = "更新时间",
    selectAllLabel = "选择所有来源",
    showSelectAll = true,
    onChange,
    onDeleteConfirm = () => {},
    onRenameConfirm = () => {},
  } = props;

  // 使用 ViewModel 管理状态和逻辑
  const {
    currentSelectedIds,
    isAllSelected,
    isIndeterminate,
    onSelectAllChange,
    onItemChange,
  } = useDataSourceListViewModel({
    dataSources,
    defaultSelectedIds,
    selectedIds,
    onChange,
  });

  const renderDataSourceList = () => {
    return dataSources?.map((group, groupIndex) => {
      const { groupName, dataSources } = group;
      return (
        <div key={`group-${groupIndex}`}>
          <StyledDataSourceGroupItemHeader>
            <StyledDataSourceGroupName>{groupName}</StyledDataSourceGroupName>
          </StyledDataSourceGroupItemHeader>
          {dataSources.map((dataSource: DataSourceItem) => (
            <DatasourceItem
              key={dataSource.id}
              dataSourceItem={dataSource}
              updateTimeLabel={updateTimeLabel}
              checked={currentSelectedIds.includes(dataSource.id)}
              disabled={disabled}
              onChange={(checked) => onItemChange(dataSource.id, checked)}
              onDeleteConfirm={onDeleteConfirm}
              onRenameConfirm={onRenameConfirm}
            />
          ))}
        </div>
      );
    });
  };

  return (
    <StyledDataSourceList className={className} style={styles}>
      {showSelectAll && (
        <Checkbox
          className="select-all-checkbox"
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          disabled={disabled}
          onChange={onSelectAllChange}
        >
          {selectAllLabel}
        </Checkbox>
      )}
      {renderDataSourceList()}
    </StyledDataSourceList>
  );
}
