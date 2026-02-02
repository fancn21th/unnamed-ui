"use client";

import * as React from "react";
import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";

export default function FeedbackControlled() {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const feedbackOptions = [
    { id: "bug", label: "Bug 报告" },
    { id: "feature", label: "功能建议" },
    { id: "question", label: "使用问题" },
    { id: "other", label: "其他" },
  ];

  const handleSubmit = (data: { selectedId: string; inputValue: string }) => {
    console.log("提交反馈:", data);
    setSubmitted(true);

    // 模拟提交成功后重置
    setTimeout(() => {
      setSelectedOption("");
      setInputValue("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          受控模式反馈表单
        </h3>
        {submitted ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            提交成功！感谢您的反馈。
          </div>
        ) : (
          <FeedbackComposed
            title="反馈问题"
            options={feedbackOptions}
            selectedId={selectedOption}
            onSelect={setSelectedOption}
            inputValue={inputValue}
            onInputChange={setInputValue}
            placeholder="请详细描述您遇到的问题..."
            submitLabel="提交反馈"
            onSubmit={handleSubmit}
            onClose={() => console.log("关闭反馈")}
          />
        )}
      </div>

      {/* 显示当前状态 */}
      <div className="text-xs text-[var(--text-tertiary)] space-y-1">
        <div>当前选择: {selectedOption || "无"}</div>
        <div>输入内容: {inputValue || "空"}</div>
      </div>
    </div>
  );
}
