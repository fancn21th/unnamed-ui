"use client";
/**
 * ActionDropdown - 操作下拉菜单组件
 * 基于 Ant Design Dropdown 封装，内置删除操作项
 */

import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DeleteIcon, MoreIcon } from "../icons";
import { StyledDropdownWrapper } from "./styles";
import type { ActionDropdownProps } from "./types";
import DeleteConfirmModal from "../DeleteConfirmModal";
import React, { useState, useCallback } from "react";

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  items = [],
  showDelete = false,
  deleteText = "删除",
  onMenuClick,
  onDelete,
  trigger = ["click"],
  ...restProps
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 菜单点击事件
  const handleMenuClick: MenuProps["onClick"] = useCallback(
    (info: any) => {
      if (info.key === "delete") {
        setDeleteModalOpen(true);
      } else {
        onMenuClick?.(info);
      }
    },
    [onMenuClick],
  );

  // 构建完整的菜单项列表
  const menuItems: MenuProps["items"] = showDelete
    ? [
        ...(items || []),
        {
          key: "delete",
          label: <span style={{ color: "#f04438" }}>{deleteText}</span>,
          icon: <DeleteIcon style={{ color: "#f04438" }} />,
        },
      ]
    : items;

  // 删除确认回调
  const handleDeleteConfirm = useCallback(() => {
    setDeleteModalOpen(false);
    onDelete?.();
  }, [onDelete]);

  // 阻止事件冒泡
  const onClickMore = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <StyledDropdownWrapper>
      <Dropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          classNames: {
            popup: "popup",
          },
        }}
        trigger={trigger}
        {...restProps}
      >
        <MoreIcon style={{ cursor: "pointer" }} onClick={onClickMore} />
      </Dropdown>
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </StyledDropdownWrapper>
  );
};

export default ActionDropdown;
