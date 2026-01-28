"use client";

import * as React from "react";
import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";

export default function ThinkingStepItemDefault() {
  return (
    <div className="w-full max-w-2xl">
      {/* 默认用法 - 成功状态 */}
      <ThinkingStepItem
        status="success"
        title="解析简历信息"
        items={[
          {
            content:
              "成功提取了候选人的基本信息、工作经历、教育背景和技能列表。",
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
