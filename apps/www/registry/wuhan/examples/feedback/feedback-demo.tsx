"use client";

import * as React from "react";
import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";

export default function FeedbackDemo() {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");

  const feedbackOptions = [
    { id: "harmful", label: "有害/不安全" },
    { id: "false", label: "信息虚假" },
    { id: "inappropriate", label: "内容不当" },
    { id: "other", label: "其他" },
  ];

  const handleSubmit = () => {
    console.log("提交反馈:", {
      option: selectedOption,
      input: inputValue,
    });
    // 这里可以添加提交逻辑
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)] mb-4">
          反馈组件示例
        </h3>
        <FeedbackComposed
          title="有什么问题?"
          options={feedbackOptions}
          selectedId={selectedOption}
          onSelect={setSelectedOption}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onClose={() => console.log("关闭")}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
