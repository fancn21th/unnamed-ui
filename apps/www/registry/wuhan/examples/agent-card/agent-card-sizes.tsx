"use client";

import { AgentCardPrimitive } from "@/registry/wuhan/blocks/agent-card/agent-card-01";

export default function AgentCardSizesDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          小尺寸 (sm)
        </h3>
        <AgentCardPrimitive
          title="小型 Agent"
          description="sm 尺寸"
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          中尺寸 (md)
        </h3>
        <AgentCardPrimitive
          title="中型 Agent"
          description="md 尺寸（默认）"
          size="md"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          大尺寸 (lg)
        </h3>
        <AgentCardPrimitive
          title="大型 Agent"
          description="lg 尺寸"
          size="lg"
        />
      </div>
    </div>
  );
}
