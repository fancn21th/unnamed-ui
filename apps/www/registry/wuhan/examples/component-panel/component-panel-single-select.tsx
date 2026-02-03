"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";

export default function ComponentPanelSingleSelect() {
  const [selected, setSelected] = React.useState<string[]>(["comp1"]);

  const categories = [
    {
      value: "framework",
      label: "框架",
      options: [
        {
          value: "react",
          label: "React",
          tooltip: "用于构建用户界面的 JavaScript 库",
        },
        { value: "vue", label: "Vue", tooltip: "渐进式 JavaScript 框架" },
        { value: "angular", label: "Angular", tooltip: "企业级前端框架" },
        { value: "svelte", label: "Svelte", tooltip: "编译型前端框架" },
      ],
    },
    {
      value: "backend",
      label: "后端",
      options: [
        { value: "node", label: "Node.js", tooltip: "JavaScript 运行时" },
        { value: "python", label: "Python", tooltip: "通用编程语言" },
        { value: "go", label: "Go", tooltip: "高效的并发编程语言" },
        { value: "java", label: "Java", tooltip: "面向对象的编程语言" },
      ],
    },
    {
      value: "database",
      label: "数据库",
      options: [
        {
          value: "postgres",
          label: "PostgreSQL",
          tooltip: "强大的开源关系数据库",
        },
        { value: "mysql", label: "MySQL", tooltip: "流行的关系数据库" },
        { value: "mongodb", label: "MongoDB", tooltip: "文档型 NoSQL 数据库" },
        { value: "redis", label: "Redis", tooltip: "内存数据结构存储" },
      ],
    },
  ];

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="text-sm text-muted-foreground">
        当前选择: {selected[0] || "无"}
      </div>

      <ComponentPanel
        categories={categories}
        value={selected}
        onChange={setSelected}
        multiple={false}
        defaultActiveTab="framework"
      />
    </div>
  );
}
