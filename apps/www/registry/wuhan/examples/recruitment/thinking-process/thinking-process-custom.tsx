"use client";

import * as React from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  ThinkingStepPrimitive,
  ThinkingStepHeaderPrimitive,
  ThinkingStepContentPrimitive,
  ThinkingStatusLabelPrimitive,
  ThinkingTimeLabelPrimitive,
  ThinkingIconContainerPrimitive,
  ThinkingCollapseArrowPrimitive,
} from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";

export default function ThinkingProcessCustom() {
  return (
    <div className="w-full h-full max-w-2xl">
      {/* 使用原语构建，自定义图标，在 Content 中渲染多步骤列表 */}
      <ThinkingStepPrimitive status="completed" defaultOpen>
        <ThinkingStepHeaderPrimitive
          trailing={
            <ThinkingCollapseArrowPrimitive>
              <ChevronDown className="size-4" />
            </ThinkingCollapseArrowPrimitive>
          }
        >
          <ThinkingIconContainerPrimitive status="completed">
            <Sparkles className="size-4" />
          </ThinkingIconContainerPrimitive>
          <ThinkingStatusLabelPrimitive status="completed">
            分析完成
          </ThinkingStatusLabelPrimitive>
          <ThinkingTimeLabelPrimitive>30s</ThinkingTimeLabelPrimitive>
        </ThinkingStepHeaderPrimitive>
        {/* 在 Content 中渲染复杂内容（如多步骤列表） */}
        <ThinkingStepContentPrimitive>
          <div className="space-y-3">
            <p className="text-[var(--text-primary)]">
              已成功完成简历分析流程：
            </p>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-success)]">✓</span>
                <span>步骤 1: 解析简历信息 (5s)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-success)]">✓</span>
                <span>步骤 2: 分析岗位匹配度 (12s)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-success)]">✓</span>
                <span>步骤 3: 生成面试问题 (13s)</span>
              </div>
            </div>
          </div>
        </ThinkingStepContentPrimitive>
      </ThinkingStepPrimitive>
    </div>
  );
}
