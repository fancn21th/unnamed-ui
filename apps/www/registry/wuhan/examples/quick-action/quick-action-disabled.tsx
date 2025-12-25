"use client";

import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Sparkles } from "lucide-react";

export default function QuickActionDisabled() {
  return (
    <QuickActionGroup>
      <QuickActionButton onClick={() => alert("这个按钮是可用的")}>
        <QuickActionIcon>
          <Sparkles className="size-4" />
        </QuickActionIcon>
        <span>可用的按钮</span>
      </QuickActionButton>
      <QuickActionButton disabled>
        <QuickActionIcon>
          <Sparkles className="size-4" />
        </QuickActionIcon>
        <span>禁用的按钮</span>
      </QuickActionButton>
      <QuickActionButton disabled>无图标的禁用按钮</QuickActionButton>
    </QuickActionGroup>
  );
}
