"use client";

import * as React from "react";
import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";

export default function ThinkingStepItemWithAttachments() {
  return (
    <div className="w-full max-w-2xl">
      {/* 带文件附件的子步骤 */}
      <ThinkingStepItem
        status="success"
        title="处理附件文件"
        items={[
          {
            content: "已成功解析以下文件：",
            files: [
              { icon: "📄", name: "resume.pdf" },
              { icon: "📄", name: "cover-letter.docx" },
              { icon: "📊", name: "portfolio.xlsx" },
              { icon: "🖼️", name: "certificate.jpg" },
              { icon: "📄", name: "reference-letter.pdf" },
            ],
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
