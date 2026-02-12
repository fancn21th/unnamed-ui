"use client";

import { AgentCardList } from "@/registry/wuhan/composed/agent-card/agent-card";

export default function AgentCardListDemo() {
  const agents = [
    {
      id: "1",
      title: "智能写作助手",
      description: "正在分析文档结构",
    },
    {
      id: "2",
      title: "数据分析师",
      description: "正在处理数据报表",
    },
    {
      id: "3",
      title: "翻译官",
      description: "多语言翻译",
    },
    {
      id: "4",
      title: "代码审查员",
      description: "正在审查代码",
    },
  ];

  return (
    <div className="w-full max-w-[650px]">
      <AgentCardList title="我的 Agent" agents={agents} size="md" />
    </div>
  );
}
