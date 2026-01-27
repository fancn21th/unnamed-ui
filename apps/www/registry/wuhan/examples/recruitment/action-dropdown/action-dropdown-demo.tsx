"use client";

import React from "react";
import ActionDropdown from "../../../recruitment/ActionDropdown";
import { message } from "antd";

export default function ActionDropdownDemo() {
  const items = [
    {
      key: "edit",
      label: "编辑",
    },
  ];

  const handleMenuClick = (info: any) => {
    if (info.key === "edit") {
      message.success("编辑操作");
    }
  };

  const handleDelete = () => {
    message.success("已删除");
  };

  return (
    <ActionDropdown
      items={items}
      showDelete
      onDelete={handleDelete}
      onMenuClick={handleMenuClick}
    />
  );
}
