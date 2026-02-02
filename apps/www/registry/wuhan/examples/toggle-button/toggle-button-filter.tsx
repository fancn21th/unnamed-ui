"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 筛选器示例
 */
export default function ToggleButtonFilter() {
  const [categories, setCategories] = useState<string[]>(["all"]);

  const categoryOptions = [
    { id: "all", label: "全部" },
    { id: "tech", label: "科技" },
    { id: "design", label: "设计" },
    { id: "business", label: "商业" },
    { id: "lifestyle", label: "生活" },
  ];

  // 处理全部选项的特殊逻辑
  const handleCategoryChange = (newValues: string[]) => {
    // 如果选择了 "全部"，则清空其他选项
    if (newValues.includes("all") && !categories.includes("all")) {
      setCategories(["all"]);
    }
    // 如果有其他选项被选中，则移除 "全部"
    else if (newValues.length > 1 && newValues.includes("all")) {
      setCategories(newValues.filter((id) => id !== "all"));
    }
    // 如果取消所有选项，默认选中 "全部"
    else if (newValues.length === 0) {
      setCategories(["all"]);
    } else {
      setCategories(newValues);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">选择类别</div>
        <ToggleButton
          options={categoryOptions}
          values={categories}
          onValuesChange={handleCategoryChange}
          multiple
          variant="default"
        />
      </div>
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="text-sm text-muted-foreground">
          {categories.includes("all") ? (
            <span>显示所有类别的内容</span>
          ) : (
            <span>
              显示以下类别的内容：
              {categories
                .map(
                  (id) => categoryOptions.find((opt) => opt.id === id)?.label,
                )
                .join("、")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
