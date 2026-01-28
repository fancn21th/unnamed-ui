"use client";

import * as React from "react";
import {
  ThinkingStepPrimitive,
  ThinkingStepHeaderPrimitive,
  ThinkingStepHintPrimitive,
  ThinkingStepContentPrimitive,
  ThinkingStatusLabelPrimitive,
  ThinkingTimeLabelPrimitive,
  ThinkingCollapseArrowPrimitive,
} from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";
import { ChevronDown } from "lucide-react";

export default function ThinkingProcessWithHint() {
  return (
    <div className="w-full h-full max-w-2xl space-y-4">
      {/* 思考中 - 无内容输出，使用 Hint */}
      <ThinkingStepPrimitive status="thinking" defaultOpen>
        <ThinkingStepHeaderPrimitive
          trailing={
            <ThinkingCollapseArrowPrimitive>
              <ChevronDown className="size-4" />
            </ThinkingCollapseArrowPrimitive>
          }
        >
          <ThinkingStatusLabelPrimitive status="thinking">
            思考中...
          </ThinkingStatusLabelPrimitive>
        </ThinkingStepHeaderPrimitive>
        <ThinkingStepHintPrimitive>
          处理将需要几分钟，即使您离开页面也会继续进行
        </ThinkingStepHintPrimitive>
      </ThinkingStepPrimitive>

      {/* 已完成 - 有内容输出，使用 Content */}
      <ThinkingStepPrimitive status="completed" defaultOpen>
        <ThinkingStepHeaderPrimitive
          trailing={
            <ThinkingCollapseArrowPrimitive>
              <ChevronDown className="size-4" />
            </ThinkingCollapseArrowPrimitive>
          }
        >
          <ThinkingStatusLabelPrimitive status="completed">
            思考完成
          </ThinkingStatusLabelPrimitive>
          <ThinkingTimeLabelPrimitive>14s</ThinkingTimeLabelPrimitive>
        </ThinkingStepHeaderPrimitive>
        <ThinkingStepContentPrimitive>
          用户想要了解AI发展的趋势。这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。
        </ThinkingStepContentPrimitive>
      </ThinkingStepPrimitive>
    </div>
  );
}
