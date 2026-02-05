"use client";

import * as React from "react";
import { SelectCard } from "@/registry/wuhan/composed/select-card/select-card";
import { LayoutDashboard, Bot, Workflow, Puzzle } from "lucide-react";

export default function SelectCardDemo() {
  const [selected, setSelected] = React.useState<string[]>(["dashboard"]);

  const options = [
    {
      value: "dashboard",
      label: "仪表盘",
      icon: <LayoutDashboard className="w-6 h-6 text-[var(--text-brand)]" />,
      tooltip: "数据可视化与分析",
    },
    {
      value: "agent",
      label: "智能体",
      icon: <Bot className="w-6 h-6 text-[var(--text-brand)]" />,
      tooltip: "AI 智能对话助手",
    },
    {
      value: "workflow",
      label: "工作流",
      icon: <Workflow className="w-6 h-6 text-[var(--text-brand)]" />,
      tooltip: "自动化流程编排",
    },
    {
      value: "plugin",
      label: "插件",
      icon: <Puzzle className="w-6 h-6 text-[var(--text-brand)]" />,
      tooltip: "扩展功能集成",
    },
  ];

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div
      className="w-full max-w-4xl"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "var(--gap-lg)",
      }}
    >
      {options.map((option) => (
        <SelectCard
          key={option.value}
          option={option}
          selected={selected.includes(option.value)}
          onClick={() => handleToggle(option.value)}
        />
      ))}
    </div>
  );
}
