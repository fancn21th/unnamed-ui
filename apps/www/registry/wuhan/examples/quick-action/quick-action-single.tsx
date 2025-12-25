"use client";

import {
  QuickActionButton,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Sparkles } from "lucide-react";

export default function QuickActionSingle() {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <QuickActionButton onClick={() => alert("单个按钮点击")}>
        <QuickActionIcon>
          <Sparkles className="size-4" />
        </QuickActionIcon>
        <span>这是一个单独的快速操作按钮</span>
      </QuickActionButton>

      <QuickActionButton onClick={() => alert("无图标按钮点击")}>
        无图标的快速操作按钮
      </QuickActionButton>
    </div>
  );
}
