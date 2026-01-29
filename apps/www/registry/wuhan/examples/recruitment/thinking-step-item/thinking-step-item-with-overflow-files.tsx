"use client";

import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";

export default function ThinkingStepItemWithOverflowFiles() {
  return (
    // 使用较窄的宽度，确保文件项会换行，触发“超过两排显示更多”的行为
    <div className="w-full max-w-md">
      <ThinkingStepItem
        status="success"
        title="处理附件文件（超出两排）"
        items={[
          {
            key: "overflow-files",
            content: "文件较多，默认只展示两排，超过两排会出现“查看更多”。",
            files: [
              { icon: "📄", name: "resume.pdf" },
              { icon: "📄", name: "cover-letter.docx" },
              { icon: "📊", name: "portfolio.xlsx" },
              { icon: "🖼️", name: "certificate.jpg" },
              { icon: "📄", name: "reference-letter.pdf" },
              { status: "loading", name: "uploading-attachments.zip" },
              { icon: "🧾", name: "invoice-2025-12.pdf" },
              { icon: "📎", name: "attachments.zip" },
              { icon: "📄", name: "work-history.pdf" },
              { icon: "📄", name: "education.docx" },
              { icon: "📄", name: "skills.txt" },
              { icon: "📄", name: "awards.pdf" },
              { icon: "📄", name: "projects.md" },
              { icon: "📄", name: "notes.txt" },
              { icon: "📄", name: "more-files.pdf" },
            ],
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
