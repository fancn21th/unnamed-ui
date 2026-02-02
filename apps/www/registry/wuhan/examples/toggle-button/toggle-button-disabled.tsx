"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 禁用状态示例
 */
export default function ToggleButtonDisabled() {
  const [selected, setSelected] = useState<string | undefined>();

  const options = [
    { id: "option1", label: "可选项 1" },
    { id: "option2", label: "可选项 2" },
    { id: "option3", label: "禁用项", disabled: true },
    { id: "option4", label: "可选项 4" },
  ];

  return (
    <div className="space-y-4">
      <ToggleButton options={options} value={selected} onChange={setSelected} />
      {selected && (
        <div className="text-sm text-muted-foreground">
          当前选择：{options.find((opt) => opt.id === selected)?.label}
        </div>
      )}
    </div>
  );
}
