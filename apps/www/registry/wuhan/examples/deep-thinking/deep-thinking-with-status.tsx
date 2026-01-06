"use client";

import { ChevronDown, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import {
  DeepThinkingContainerPrimitive,
  DeepThinkingHeaderPrimitive,
  DeepThinkingIconPrimitive,
  DeepThinkingTitlePrimitive,
  DeepThinkingContentPrimitive,
  DeepThinkingArrowPrimitive,
} from "@/registry/wuhan/blocks/deep-thinking/deep-thinking-01";

export default function DeepThinkingWithStatus() {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      {/* 思考中 */}
      <DeepThinkingContainerPrimitive defaultOpen>
        <DeepThinkingHeaderPrimitive
          arrow={
            <DeepThinkingArrowPrimitive>
              <ChevronDown className="size-4" />
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            <Sparkles className="size-4 text-[var(--text-brand)]" />
            <DeepThinkingTitlePrimitive className="text-[var(--text-secondary)]">
              深度思考中
            </DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        <DeepThinkingContentPrimitive>
          用户想要了解维度来源的相关信息。这是一个比较开放的问题，需要我从多个角度来思考和组织信息。应该包含定义、常见来源、获取方法等方面的内容，并尽量提供清晰和有用的语言来表达。
        </DeepThinkingContentPrimitive>
      </DeepThinkingContainerPrimitive>

      {/* 已完成 */}
      <DeepThinkingContainerPrimitive>
        <DeepThinkingHeaderPrimitive
          arrow={
            <DeepThinkingArrowPrimitive>
              <ChevronDown className="size-4" />
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            <Sparkles className="size-4 text-[var(--text-brand)]" />
            <DeepThinkingTitlePrimitive>
              已完成思考(用时5秒)
            </DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        <DeepThinkingContentPrimitive>
          已完成对问题的深度分析，考虑了用户的需求和上下文，准备提供详细的回复。
        </DeepThinkingContentPrimitive>
      </DeepThinkingContainerPrimitive>

      {/* 失败 */}
      <DeepThinkingContainerPrimitive>
        <DeepThinkingHeaderPrimitive
          arrow={
            <DeepThinkingArrowPrimitive>
              <ChevronDown className="size-4" />
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            <Sparkles className="size-4 text-[var(--text-brand)]" />
            <DeepThinkingTitlePrimitive>思考失败</DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        <DeepThinkingContentPrimitive>
          思考过程中遇到了问题，无法继续分析。请稍后再试。
        </DeepThinkingContentPrimitive>
      </DeepThinkingContainerPrimitive>
    </div>
  );
}
