"use client";

import * as React from "react";
import { useState } from "react";
import {
  GoalCardPrimitive,
  GoalCardContainerPrimitive,
  GoalCardHeaderPrimitive,
  GoalCardProgressPrimitive,
  GoalCardAiIcon,
  type GoalCardSemanticStatus,
} from "@/registry/wuhan/blocks/goal-card/goal-card-01";

/**
 * Goal Card 示例数据
 *
 * 状态颜色规则：
 * - in_progress（进行中）：品牌色 + 百分比
 * - completed（完成）：绿色 + 100% + 对号
 * - failed（失败）：错误色 + 100% + 叉号
 */
const goalExamples = [
  // 进行中 - 品牌色
  {
    title: "阅读《设计心理学》",
    description: "第 1 章：可供性",
    progress: 25,
    status: "in_progress" as const,
  },
  {
    title: "阅读《设计心理学》",
    description: "第 3 章：可供性",
    progress: 50,
    status: "in_progress" as const,
  },
  {
    title: "阅读《设计心理学》",
    description: "第 5 章：可供性",
    progress: 75,
    status: "in_progress" as const,
  },
  // 完成 - 绿色 + 对号
  {
    title: "阅读《设计心理学》",
    description: "全书完成",
    progress: 100,
    status: "completed" as const,
  },
] as const;

/**
 * 失败状态示例 - 进度条填满 + 错误色 + 叉号
 */
const failedExamples = [
  {
    title: "每日健身目标",
    description: "本周健身计划",
    progress: 100,
    status: "failed" as const,
  },
] as const;

export default function GoalCardDemo() {
  // 使用 useState 来演示交互式更新
  const [progress, setProgress] = useState(25);
  const [interactiveStatus, setInteractiveStatus] =
    useState<GoalCardSemanticStatus>("in_progress");

  // 手动设置状态
  const setCompleted = () => {
    setProgress(100);
    setInteractiveStatus("completed");
  };

  const setFailed = () => {
    setProgress(100);
    setInteractiveStatus("failed");
  };

  const updateProgress = (delta: number) => {
    const newProgress = Math.min(100, Math.max(0, progress + delta));
    setProgress(newProgress);
    // 如果还没完成，保持进行中状态
    if (newProgress < 100) {
      setInteractiveStatus("in_progress");
    } else if (interactiveStatus !== "failed") {
      setInteractiveStatus("completed");
    }
  };

  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-4">
      {/* 标题 */}
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        Goal Card 组件示例
      </h2>

      {/* 进行中状态 - 品牌色 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          进行中（品牌色）
        </h3>
        {goalExamples
          .filter((g) => g.status === "in_progress")
          .map((goal, index) => (
            <GoalCardPrimitive
              key={index}
              title={goal.title}
              description={goal.description}
              progress={goal.progress}
              status={goal.status}
              size="md"
            />
          ))}
      </div>

      {/* 完成状态 - 绿色 + 对号 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          完成（绿色 + 对号）
        </h3>
        {goalExamples
          .filter((g) => g.status === "completed")
          .map((goal, index) => (
            <GoalCardPrimitive
              key={index}
              title={goal.title}
              description={goal.description}
              progress={goal.progress}
              status={goal.status}
              size="md"
            />
          ))}
      </div>

      {/* 失败状态 - 红色 + 叉号 + 进度条填满 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          失败（错误色 + 叉号 + 进度条填满）
        </h3>
        {failedExamples.map((goal, index) => (
          <GoalCardPrimitive
            key={`failed-${index}`}
            title={goal.title}
            description={goal.description}
            progress={goal.progress}
            status={goal.status}
            size="md"
          />
        ))}
      </div>

      {/* 交互式演示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          交互式演示
        </h3>
        <GoalCardPrimitive
          title="交互式目标卡片"
          description="点击按钮切换状态"
          progress={progress}
          status={interactiveStatus}
          size="md"
        />
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-brand)] text-white rounded-[var(--radius-md)] hover:bg-[var(--bg-brand-hover)] transition-colors"
            onClick={() => updateProgress(10)}
          >
            +10%
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-neutral-light)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--bg-neutral-light-active)] transition-colors"
            onClick={() => updateProgress(-10)}
          >
            -10%
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-success)] text-white rounded-[var(--radius-md)] hover:bg-[var(--bg-success-hover)] transition-colors"
            onClick={setCompleted}
          >
            完成
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-error)] text-white rounded-[var(--radius-md)] hover:bg-[var(--bg-error-hover)] transition-colors"
            onClick={setFailed}
          >
            失败
          </button>
        </div>
      </div>

      {/* 不同尺寸展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          不同尺寸
        </h3>
        <GoalCardPrimitive
          title="小型卡片"
          description="小尺寸 - 50%"
          progress={50}
          status="in_progress"
          size="sm"
        />
        <GoalCardPrimitive
          title="中型卡片"
          description="中尺寸（默认）- 50%"
          progress={50}
          status="in_progress"
          size="md"
        />
        <GoalCardPrimitive
          title="大型卡片"
          description="大尺寸 - 50%"
          progress={50}
          status="in_progress"
          size="lg"
        />
      </div>
    </div>
  );
}
