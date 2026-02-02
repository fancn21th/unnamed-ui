"use client";

import * as React from "react";
import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";
import { AlertTriangle, Flag, MessageSquareWarning, Ban } from "lucide-react";

export default function FeedbackReport() {
  const [isReported, setIsReported] = React.useState(false);

  const reportOptions = [
    {
      id: "harmful",
      label: (
        <span className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          有害/不安全
        </span>
      ),
    },
    {
      id: "false-info",
      label: (
        <span className="flex items-center gap-1.5">
          <Flag className="w-4 h-4" />
          虚假信息
        </span>
      ),
    },
    {
      id: "spam",
      label: (
        <span className="flex items-center gap-1.5">
          <Ban className="w-4 h-4" />
          垃圾内容
        </span>
      ),
    },
    {
      id: "inappropriate",
      label: (
        <span className="flex items-center gap-1.5">
          <MessageSquareWarning className="w-4 h-4" />
          内容不当
        </span>
      ),
    },
  ];

  const handleSubmit = (data: { selectedId: string; inputValue: string }) => {
    console.log("举报内容:", data);
    setIsReported(true);
  };

  const handleClose = () => {
    console.log("取消举报");
    setIsReported(false);
  };

  if (isReported) {
    return (
      <div className="w-full max-w-md p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Flag className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-base font-medium text-green-900">举报已提交</h3>
          <p className="text-sm text-green-700">
            感谢您的举报，我们会尽快审核处理。
          </p>
          <button
            onClick={() => setIsReported(false)}
            className="mt-2 text-sm text-green-600 hover:text-green-700 underline"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          内容举报场景
        </h3>
        <FeedbackComposed
          title="举报此内容"
          options={reportOptions}
          placeholder="请详细说明举报理由（必填）..."
          submitLabel="提交举报"
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </div>

      <div className="text-xs text-[var(--text-tertiary)] p-3 bg-[var(--bg-tertiary)] rounded">
        <p>💡 提示：举报信息将严格保密，我们会在24小时内处理。</p>
      </div>
    </div>
  );
}
