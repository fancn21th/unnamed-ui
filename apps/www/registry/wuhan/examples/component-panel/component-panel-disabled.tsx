"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";

export default function ComponentPanelDisabled() {
  const categories = [
    {
      value: "available",
      label: "可用功能",
      options: [
        { value: "feature1", label: "功能 1" },
        { value: "feature2", label: "功能 2" },
        { value: "feature3", label: "功能 3" },
        {
          value: "feature4",
          label: "功能 4",
          disabled: true,
          tooltip: "此功能暂不可用",
        },
      ],
    },
    {
      value: "premium",
      label: "高级功能",
      disabled: true,
      options: [
        { value: "premium1", label: "高级功能 1" },
        { value: "premium2", label: "高级功能 2" },
        { value: "premium3", label: "高级功能 3" },
      ],
    },
    {
      value: "experimental",
      label: "实验性功能",
      options: [
        { value: "exp1", label: "实验功能 1" },
        {
          value: "exp2",
          label: "实验功能 2",
          disabled: true,
          tooltip: "开发中",
        },
        { value: "exp3", label: "实验功能 3" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <ComponentPanel
        categories={categories}
        defaultValue={["feature1", "feature2"]}
      />
    </div>
  );
}
