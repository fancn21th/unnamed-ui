"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import {
  TaskCard,
  type TaskCardItem,
} from "@/registry/wuhan/composed/task-card/task-card";

const initialItems: TaskCardItem[] = [
  { id: "1", text: "简历筛选", status: "completed" },
  { id: "2", text: "初试", status: "completed" },
  { id: "3", text: "复试", status: "running" },
  { id: "4", text: "终面", status: "pending" },
  { id: "5", text: "发放 Offer", status: "pending" },
];

// 根据状态获取图标
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="size-4 text-[var(--text-success)]" />;
    case "running":
      return (
        <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />
      );
    case "pending":
    default:
      return <Circle className="size-4 text-[var(--text-tertiary)]" />;
  }
};

// 根据状态获取图标
const getStatusIconForStep = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="size-4 text-[var(--text-success)]" />;
    case "running":
      return (
        <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />
      );
    case "pending":
    default:
      return <Circle className="size-4 text-[var(--text-tertiary)]" />;
  }
};

export default function TaskCardDemo() {
  const [items, setItems] = useState<TaskCardItem[]>(initialItems);
  const [isOpen, setIsOpen] = useState(false);

  // 获取当前进行中的步骤
  const currentItem =
    items.find((item) => item.status === "running") ||
    items.find((item) => item.status === "pending");

  // 当前步骤的图标和文本
  const currentStepIcon = currentItem
    ? getStatusIcon(currentItem.status)
    : null;
  const currentStepText = currentItem?.text || "暂无任务";

  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-4">
      <TaskCard
        title="招聘流程"
        stepText={currentStepText}
        stepIcon={currentStepIcon}
        items={items}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
