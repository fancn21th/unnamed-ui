"use client";

import { AgentCardPrimitive } from "@/registry/wuhan/blocks/agent-card/agent-card-01";

export default function AgentCardCustomStyleDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <AgentCardPrimitive
        title="自定义背景"
        description="使用自定义样式的 Agent 卡片"
        className="bg-blue-50 hover:bg-blue-100"
      />
      <AgentCardPrimitive
        title="紫色主题"
        description="紫色背景的 Agent 卡片"
        className="bg-purple-50 hover:bg-purple-100"
      />
      <AgentCardPrimitive
        title="绿色主题"
        description="绿色背景的 Agent 卡片"
        className="bg-green-50 hover:bg-green-100"
      />
    </div>
  );
}
