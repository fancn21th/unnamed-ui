"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";

export default function ComponentPanelTabControlled() {
  const [activeTab, setActiveTab] = React.useState("dev");
  const [selected, setSelected] = React.useState<string[]>(["vscode"]);

  const categories = [
    {
      value: "dev",
      label: "开发工具",
      options: [
        { value: "vscode", label: "VS Code" },
        { value: "webstorm", label: "WebStorm" },
        { value: "sublime", label: "Sublime Text" },
      ],
    },
    {
      value: "design",
      label: "设计工具",
      options: [
        { value: "figma", label: "Figma" },
        { value: "sketch", label: "Sketch" },
        { value: "adobe", label: "Adobe XD" },
      ],
    },
    {
      value: "productivity",
      label: "生产力",
      options: [
        { value: "notion", label: "Notion" },
        { value: "slack", label: "Slack" },
        { value: "trello", label: "Trello" },
      ],
    },
  ];

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="flex gap-2">
        <button
          className="px-3 py-1.5 text-sm rounded border"
          onClick={() => setActiveTab("dev")}
          disabled={activeTab === "dev"}
        >
          切换到开发工具
        </button>
        <button
          className="px-3 py-1.5 text-sm rounded border"
          onClick={() => setActiveTab("design")}
          disabled={activeTab === "design"}
        >
          切换到设计工具
        </button>
        <button
          className="px-3 py-1.5 text-sm rounded border"
          onClick={() => setActiveTab("productivity")}
          disabled={activeTab === "productivity"}
        >
          切换到生产力
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        当前选项卡: {activeTab}
      </div>

      <ComponentPanel
        categories={categories}
        value={selected}
        onChange={setSelected}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
