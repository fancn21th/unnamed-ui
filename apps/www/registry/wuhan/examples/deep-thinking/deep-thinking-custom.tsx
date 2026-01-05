"use client";

import { ChevronDown, Brain } from "lucide-react";
import {
  DeepThinkingContainerPrimitive,
  DeepThinkingHeaderPrimitive,
  DeepThinkingIconPrimitive,
  DeepThinkingTitlePrimitive,
  DeepThinkingContentPrimitive,
  DeepThinkingArrowPrimitive,
} from "@/registry/wuhan/blocks/deep-thinking/deep-thinking-01";

export default function DeepThinkingCustom() {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <DeepThinkingContainerPrimitive defaultOpen>
        <DeepThinkingHeaderPrimitive
          arrow={
            <DeepThinkingArrowPrimitive>
              <ChevronDown className="size-4" />
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            <Brain className="size-4 text-purple-500" />
            <DeepThinkingTitlePrimitive>
              自定义标题：深度分析完成
            </DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        <DeepThinkingContentPrimitive>
          这是一个使用自定义图标和标题的深度思考组件。你可以完全控制显示的内容、图标、样式等，原语组件只提供基础的样式框架。
        </DeepThinkingContentPrimitive>
      </DeepThinkingContainerPrimitive>

      {/* 完全自定义样式 */}
      <DeepThinkingContainerPrimitive>
        <DeepThinkingHeaderPrimitive
          className="bg-blue-50 dark:bg-blue-900/20"
          arrow={
            <DeepThinkingArrowPrimitive>
              <ChevronDown className="size-4 text-blue-600" />
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            <Brain className="size-4 text-blue-600" />
            <DeepThinkingTitlePrimitive className="text-blue-600">
              自定义颜色主题
            </DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        <DeepThinkingContentPrimitive className="bg-blue-50/50 dark:bg-blue-900/10">
          通过原语组件，你可以完全自定义样式，包括背景色、文字颜色等，满足各种设计需求。
        </DeepThinkingContentPrimitive>
      </DeepThinkingContainerPrimitive>
    </div>
  );
}
