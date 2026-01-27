"use client";

import { useState } from "react";
import { Button, Checkbox, Input } from "antd";
import type { MenuProps } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { EditIcon } from "../../../icons";
import ActionDropdown from "../../../ActionDropdown";
import BaseModal from "../../../BaseModal";
import type { DatasourceItemProps } from "../../types";
import {
  StyledDatasourceItemWrapper,
  StyledDatasourceItem,
  StyledDatasourceItemHeader,
  StyledDatasourceItemFooter,
  StyledDatasourceItemTitle,
} from "./styles";
import { FileTypeIcon } from "../FileTypeIcon";

export function DatasourceItem(props: DatasourceItemProps) {
  const {
    dataSourceItem,
    updateTimeLabel,
    checked = false,
    disabled = false,
    onChange,
    onDeleteConfirm,
    onRenameConfirm,
  } = props;
  // 重命名弹窗状态
  const [open, setOpen] = useState(false);
  // 当前数据源名称
  const [currentDatasourceName, setCurrentDatasourceName] = useState("");

  const items: MenuProps["items"] = [
    {
      key: "Rename",
      label: "重命名",
      icon: <EditIcon />,
    },
  ];

  /**
   * 勾选框状态变化回调
   */
  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    onChange?.(e.target.checked);
  };

  /**
   * 重命名输入框变化回调
   */
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDatasourceName(e.target.value);
  };

  /**
   * 菜单点击回调
   */
  const onMenuClick: MenuProps["onClick"] = (info) => {
    if (info.key === "Rename") {
      setOpen(true);
      setCurrentDatasourceName(dataSourceItem.fileName || "");
    }
  };

  /**
   * 重命名模态框关闭回调
   */
  const onCloseRenameModal = () => {
    setOpen(false);
  };

  /**
   * 删除确认回调
   */
  const onConfirmDelete = () => {
    onDeleteConfirm?.(dataSourceItem.id);
  };

  /**
   * 重命名确认回调
   */
  const onConfirmRename = () => {
    onRenameConfirm?.(
      { id: dataSourceItem.id, newName: currentDatasourceName },
      onCloseRenameModal,
    );
  };

  return (
    <StyledDatasourceItemWrapper>
      <Checkbox
        classNames={{ icon: "item-checkbox-icon" }}
        checked={checked}
        disabled={disabled}
        onChange={onCheckboxChange}
      />
      <StyledDatasourceItem>
        <StyledDatasourceItemHeader>
          <FileTypeIcon type={dataSourceItem.fileType} />
          <StyledDatasourceItemTitle>
            {dataSourceItem.fileName}
          </StyledDatasourceItemTitle>
          <ActionDropdown
            items={items}
            showDelete
            onMenuClick={onMenuClick}
            onDelete={onConfirmDelete}
          />
        </StyledDatasourceItemHeader>
        <StyledDatasourceItemFooter>{`${updateTimeLabel}：${dataSourceItem.updateTime}`}</StyledDatasourceItemFooter>
      </StyledDatasourceItem>
      <BaseModal
        title="文档重命名"
        open={open}
        onCancel={onCloseRenameModal}
        closable
        width={416}
        centered
        footer={
          <>
            <Button onClick={onCloseRenameModal}>取消</Button>
            <Button type="primary" onClick={onConfirmRename}>
              确定
            </Button>
          </>
        }
      >
        <Input
          className="modal-input"
          placeholder="请输入文档名称"
          value={currentDatasourceName}
          onChange={onNameChange}
        />
      </BaseModal>
    </StyledDatasourceItemWrapper>
  );
}
