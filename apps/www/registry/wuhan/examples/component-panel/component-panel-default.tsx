"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";

export default function ComponentPanelDefault() {
  const categories = [
    {
      value: "all",
      label: "全部",
      options: [
        { value: "comp1", label: "组件1", tooltip: "这是组件1的说明" },
        { value: "comp2", label: "组件2", tooltip: "这是组件2的说明" },
        { value: "comp3", label: "组件3", tooltip: "这是组件3的说明" },
        { value: "comp4", label: "组件4", tooltip: "这是组件4的说明" },
        { value: "comp5", label: "组件5", tooltip: "这是组件5的说明" },
        { value: "comp6", label: "组件6", tooltip: "这是组件6的说明" },
        { value: "comp7", label: "组件7", tooltip: "这是组件7的说明" },
        { value: "comp8", label: "组件8", tooltip: "这是组件8的说明" },
      ],
    },
    {
      value: "mcp",
      label: "MCP",
      options: [
        { value: "mcp1", label: "MCP组件1", tooltip: "MCP组件1" },
        { value: "mcp2", label: "MCP组件2", tooltip: "MCP组件2" },
        { value: "mcp3", label: "MCP组件3", tooltip: "MCP组件3" },
        { value: "mcp4", label: "MCP组件4", tooltip: "MCP组件4" },
      ],
    },
    {
      value: "tool",
      label: "工具",
      options: [
        { value: "tool1", label: "工具1", tooltip: "工具1说明" },
        { value: "tool2", label: "工具2", tooltip: "工具2说明" },
        { value: "tool3", label: "工具3", tooltip: "工具3说明" },
        { value: "tool4", label: "工具4", tooltip: "工具4说明" },
        { value: "tool5", label: "工具5", tooltip: "工具5说明" },
      ],
    },
    {
      value: "workflow",
      label: "工作流",
      options: [
        { value: "wf1", label: "工作流1", tooltip: "工作流1" },
        { value: "wf2", label: "工作流2", tooltip: "工作流2" },
        { value: "wf3", label: "工作流3", tooltip: "工作流3" },
        { value: "wf4", label: "工作流4", tooltip: "工作流4" },
        { value: "wf5", label: "工作流5", tooltip: "工作流5" },
        { value: "wf6", label: "工作流6", tooltip: "工作流6" },
      ],
    },
  ];

  return (
    <div className="w-full h-full max-w-4xl">
      <ComponentPanel
        categories={categories}
        defaultValue={["comp1", "comp3", "mcp1", "tool1", "wf1"]}
        defaultActiveTab="all"
        onChange={(values) => {
          console.log("选中的值:", values);
        }}
      />
    </div>
  );
}
