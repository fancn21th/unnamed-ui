"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 反馈场景示例
 */
export default function ToggleButtonFeedback() {
  const [feedback, setFeedback] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const feedbackOptions = [
    { id: "harmful", label: "有害/不安全" },
    { id: "false", label: "信息虚假" },
    { id: "inappropriate", label: "内容不当" },
    { id: "unhelpful", label: "无用信息" },
    { id: "other", label: "其他问题" },
  ];

  const handleSubmit = () => {
    if (feedback) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFeedback(undefined);
      }, 2000);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <div className="text-sm font-medium">这个回答有什么问题？</div>
        <ToggleButton
          options={feedbackOptions}
          value={feedback}
          onChange={setFeedback}
          variant="default"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!feedback || submitted}
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitted ? "已提交" : "提交反馈"}
      </button>
    </div>
  );
}
