"use client";

import * as React from "react";
import {
  FeedbackContainerPrimitive,
  FeedbackHeaderPrimitive,
  FeedbackInputContainerPrimitive,
  FeedbackInputPrimitive,
  FeedbackSubmitButtonPrimitive,
} from "@/registry/wuhan/blocks/feedback/feedback-01";
import { ToggleButtonGroupPrimitive } from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";

export default function FeedbackDemo() {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");

  const feedbackOptions = [
    { id: "harmful", label: "有害/不安全" },
    { id: "false", label: "信息虚假" },
    { id: "inappropriate", label: "内容不当" },
    { id: "other", label: "其他" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交反馈:", {
      option: selectedOption,
      input: inputValue,
    });
    // 这里可以添加提交逻辑
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          反馈组件示例
        </h3>
        <form onSubmit={handleSubmit}>
          <FeedbackContainerPrimitive onClose={() => console.log("关闭")}>
            <FeedbackHeaderPrimitive
              title="有什么问题?"
              onClose={() => console.log("关闭")}
            />

            <ToggleButtonGroupPrimitive
              options={feedbackOptions}
              selectedId={selectedOption}
              onOptionChange={setSelectedOption}
              variant="default"
            />

            <FeedbackInputContainerPrimitive>
              <FeedbackInputPrimitive
                placeholder="请输入详细描述..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FeedbackInputContainerPrimitive>

            <div>
              <FeedbackSubmitButtonPrimitive>
                提交
              </FeedbackSubmitButtonPrimitive>
            </div>
          </FeedbackContainerPrimitive>
        </form>
      </div>
    </div>
  );
}
