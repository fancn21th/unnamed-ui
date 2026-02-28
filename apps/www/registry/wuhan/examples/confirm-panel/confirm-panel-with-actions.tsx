"use client";

import { ConfirmPanel } from "@/registry/wuhan/composed/confirm-panel/confirm-panel";
import { Button } from "@/registry/wuhan/ui/button";

export default function ConfirmPanelWithActions() {
  return (
    <ConfirmPanel
      title="发布文章"
      status="pending"
      confirmButtonText="立即发布"
      actions={[
        <Button key="draft" variant="outline">
          保存草稿
        </Button>,
        <Button key="preview" variant="ghost">
          预览
        </Button>,
      ]}
      onConfirm={() => console.log("发布文章")}
    >
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-[var(--Text-text-primary)] mb-1">
            文章标题
          </h4>
          <p className="text-sm text-[var(--Text-text-secondary)]">
            如何使用 React 构建现代化应用
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[var(--Text-text-primary)] mb-1">
            发布设置
          </h4>
          <ul className="text-sm text-[var(--Text-text-tertiary)] list-disc list-inside space-y-1">
            <li>分类：技术博客</li>
            <li>标签：React, JavaScript, 前端</li>
            <li>可见性：公开</li>
          </ul>
        </div>
      </div>
    </ConfirmPanel>
  );
}
