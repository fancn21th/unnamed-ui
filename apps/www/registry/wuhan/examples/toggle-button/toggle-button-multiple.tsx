"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 多选模式示例
 */
export default function ToggleButtonMultiple() {
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = [
    { id: "tech", label: "科技" },
    { id: "sports", label: "体育" },
    { id: "music", label: "音乐" },
    { id: "travel", label: "旅行" },
    { id: "food", label: "美食" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">选择你的兴趣（可多选）</div>
        <ToggleButton
          options={interestOptions}
          values={interests}
          onValuesChange={setInterests}
          multiple
          variant="default"
        />
      </div>
      {interests.length > 0 && (
        <div className="text-sm text-muted-foreground">
          已选择：
          {interests
            .map((id) => interestOptions.find((opt) => opt.id === id)?.label)
            .join("、")}
        </div>
      )}
    </div>
  );
}
