"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 默认单选示例
 */
export default function ToggleButtonDefault() {
  const [selected, setSelected] = useState<string | undefined>();

  const options = [
    { id: "harmful", label: "有害/不安全" },
    { id: "false", label: "信息虚假" },
    { id: "inappropriate", label: "内容不当" },
  ];

  return (
    <div className="space-y-4">
      <ToggleButton
        options={options}
        value={selected}
        onChange={setSelected}
        variant="default"
      />
      {selected && (
        <div className="text-sm text-muted-foreground">
          当前选择：{options.find((opt) => opt.id === selected)?.label}
        </div>
      )}
    </div>
  );
}
