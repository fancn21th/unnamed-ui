"use client";

import * as React from "react";
import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";
import { ThumbsUp, ThumbsDown, Meh, Star } from "lucide-react";

export default function FeedbackCustomOptions() {
  const handleSubmit = (data: { selectedId: string; inputValue: string }) => {
    console.log("满意度调查:", data);
  };

  // 自定义选项，包含图标和文本
  const satisfactionOptions = [
    {
      id: "very-satisfied",
      label: (
        <span className="flex items-center gap-1.5">
          <Star className="w-4 h-4" />
          非常满意
        </span>
      ),
    },
    {
      id: "satisfied",
      label: (
        <span className="flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4" />
          满意
        </span>
      ),
    },
    {
      id: "neutral",
      label: (
        <span className="flex items-center gap-1.5">
          <Meh className="w-4 h-4" />
          一般
        </span>
      ),
    },
    {
      id: "dissatisfied",
      label: (
        <span className="flex items-center gap-1.5">
          <ThumbsDown className="w-4 h-4" />
          不满意
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          自定义选项（带图标）
        </h3>
        <FeedbackComposed
          title="对我们的服务满意吗？"
          options={satisfactionOptions}
          defaultSelectedId=""
          placeholder="请告诉我们您的想法和建议..."
          submitLabel="提交评价"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
