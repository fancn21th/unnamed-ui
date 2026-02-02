"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 紧凑样式示例（用于 sender 组件等场景）
 */
export default function ToggleButtonCompact() {
  const [modes, setModes] = useState<string[]>([]);

  const modeOptions = [
    { id: "web-search", label: "联网搜索" },
    { id: "deep-think", label: "深度思考" },
  ];

  return (
    <div className="space-y-4">
      <ToggleButton
        options={modeOptions}
        values={modes}
        onValuesChange={setModes}
        multiple
        variant="compact"
      />
      {modes.length > 0 && (
        <div className="text-sm text-muted-foreground">
          已启用模式：
          {modes
            .map((id) => modeOptions.find((opt) => opt.id === id)?.label)
            .join("、")}
        </div>
      )}
    </div>
  );
}
