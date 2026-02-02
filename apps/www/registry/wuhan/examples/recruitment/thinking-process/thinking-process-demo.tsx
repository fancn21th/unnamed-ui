"use client";

import { BookOpen } from "lucide-react";
import { ThinkingLoadingDotsPrimitive } from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";
import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process";
import type { ThinkingStepItemProps } from "@/registry/wuhan/composed/thinking-step-item/thinking-step-item";

export default function ThinkingProcessDemo() {
  const subSteps = [
    {
      status: "success",
      title: "明确研究目标与边界",
      items: [
        {
          content: "明确研究目标与边界，我将调用知识和搜索工具。",
          toolCall: {
            icon: <BookOpen className="size-4" />,
            title: "调取知识",
            content: "我正在调取知识库资料",
          },
          files: [
            { icon: "📄", name: "AI发展趋势.pdf" },
            { icon: "📄", name: "AI发展历史.doc" },
          ],
        },
      ],
      defaultOpen: true,
    },
    {
      status: "loading",
      title: "对比岗位与简历关键信息",
      items: [{ content: "正在抽取关键技能并计算匹配度..." }],
      defaultOpen: true,
    },
    {
      status: "success",
      title: "生成结论与问题清单",
      items: [{ content: "已生成 10 个面试问题，并输出风险点说明。" }],
      defaultOpen: true,
    },
  ] satisfies ThinkingStepItemProps[];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-2xl">
      {/* 思考中状态 - 不显示时间，标题闪烁 */}
      <ThinkingStep
        status="thinking"
        title="思考中..."
        content="思考中生成的内容"
      />

      {/* 已完成状态 - 显示时间 */}
      <ThinkingStep
        status="completed"
        title="思考完成"
        duration={14}
        content="用户想要了解AI发展的趋势。这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。"
      />

      {/* 已完成状态 - 使用 contentBlocks 穿插渲染（文字 + 子步骤 + 文字） */}
      <ThinkingStep
        status="completed"
        title="思考完成（contentBlocks）"
        duration={30}
        contentBlocks={[
          {
            type: "text",
            key: "intro",
            content: "下面是本次分析的关键子步骤（可与文字穿插渲染）：",
          },
          { type: "subSteps", key: "steps", steps: subSteps },
          {
            type: "text",
            key: "outro",
            content: "以上步骤完成后，已生成最终结论与问题清单。",
          },
          { type: "node", key: "node", node: <h1>自定义组件</h1> },
        ]}
      />

      {/* 长耗时提示 - 默认收起，点击可展开看到提示 */}
      <ThinkingStep status="thinking" title="搜索中..." longRunning />

      {/* 已取消状态 - 默认展开且会自动追加一个“已取消”子步骤 */}
      <ThinkingStep
        status="cancelled"
        title="已取消"
        contentBlocks={[{ type: "subSteps", key: "steps", steps: subSteps }]}
      />

      {/* 思考中状态 - 自定义图标（loading dots） */}
      <ThinkingStep
        status="thinking"
        title="思考中（自定义图标）"
        icon={<ThinkingLoadingDotsPrimitive />}
        content="正在汇总候选人的关键信息与风险点..."
      />
    </div>
  );
}
