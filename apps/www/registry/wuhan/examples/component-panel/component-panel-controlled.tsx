"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";
import { Button } from "@/registry/wuhan/ui/button";

export default function ComponentPanelControlled() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    "comp1",
    "comp3",
  ]);

  const categories = [
    {
      value: "all",
      label: "全部",
      options: [
        { value: "comp1", label: "组件1" },
        { value: "comp2", label: "组件2" },
        { value: "comp3", label: "组件3" },
        { value: "comp4", label: "组件4" },
        { value: "comp5", label: "组件5" },
        { value: "comp6", label: "组件6" },
      ],
    },
    {
      value: "tools",
      label: "工具",
      options: [
        { value: "tool1", label: "工具1" },
        { value: "tool2", label: "工具2" },
        { value: "tool3", label: "工具3" },
      ],
    },
  ];

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedValues([])}
        >
          清空选择
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setSelectedValues([
              "comp1",
              "comp2",
              "comp3",
              "comp4",
              "comp5",
              "comp6",
              "tool1",
              "tool2",
              "tool3",
            ])
          }
        >
          全选
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedValues(["comp1", "tool1"])}
        >
          重置
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        已选择 {selectedValues.length} 项: {selectedValues.join(", ")}
      </div>

      <ComponentPanel
        categories={categories}
        value={selectedValues}
        onChange={setSelectedValues}
      />
    </div>
  );
}
