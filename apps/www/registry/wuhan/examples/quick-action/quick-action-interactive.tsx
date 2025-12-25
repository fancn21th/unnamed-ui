"use client";

import * as React from "react";
import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Sparkles, FileText, Lightbulb } from "lucide-react";

export default function QuickActionInteractive() {
  const [selectedAction, setSelectedAction] = React.useState<string>("");

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <QuickActionGroup>
        <QuickActionButton
          onClick={() => handleActionClick("帮我总结一下这段内容")}
        >
          <QuickActionIcon>
            <Sparkles className="size-4" />
          </QuickActionIcon>
          <span>帮我总结一下这段内容</span>
        </QuickActionButton>
        <QuickActionButton
          onClick={() => handleActionClick("给我列一个学习计划")}
        >
          <QuickActionIcon>
            <FileText className="size-4" />
          </QuickActionIcon>
          <span>给我列一个学习计划</span>
        </QuickActionButton>
        <QuickActionButton
          onClick={() => handleActionClick("解释一下这个概念")}
        >
          <QuickActionIcon>
            <Lightbulb className="size-4" />
          </QuickActionIcon>
          <span>解释一下这个概念</span>
        </QuickActionButton>
      </QuickActionGroup>

      {selectedAction && (
        <div className="p-4 rounded-lg bg-[var(--bg-neutral-light)] text-[var(--text-primary)] text-sm">
          <p className="font-medium mb-1">已选择操作：</p>
          <p>{selectedAction}</p>
        </div>
      )}
    </div>
  );
}
