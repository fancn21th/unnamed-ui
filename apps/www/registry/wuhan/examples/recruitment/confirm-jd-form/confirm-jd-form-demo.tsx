"use client";

import React from "react";
import ConfirmJDForm from "../../../recruitment/ConfirmJDForm";

export default function ConfirmJDFormDemo() {
  const fields = [
    {
      type: "input" as const,
      name: "jobTitle",
      label: "职位名称",
      required: true,
    },
    {
      type: "select" as const,
      name: "department",
      label: "所属部门",
      required: true,
      options: [
        { label: "技术部", value: "tech" },
        { label: "产品部", value: "product" },
      ],
    },
  ];

  const handleSubmit = (values: any) => {
    console.log("提交的数据:", values);
  };

  return <ConfirmJDForm fields={fields} onSubmit={handleSubmit} />;
}
