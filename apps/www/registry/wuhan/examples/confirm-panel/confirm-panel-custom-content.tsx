"use client";

import { ConfirmPanel } from "@/registry/wuhan/composed/confirm-panel/confirm-panel";

export default function ConfirmPanelCustomContent() {
  return (
    <ConfirmPanel
      title="数据导出"
      confirmButtonText="开始导出"
      contentClassName="p-4 bg-[var(--Page-bg-page-secondary)] rounded-lg"
      onConfirm={() => console.log("开始导出")}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--Text-text-secondary)]">
            数据范围
          </span>
          <span className="text-sm text-[var(--Text-text-primary)] font-medium">
            最近30天
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--Text-text-secondary)]">
            文件格式
          </span>
          <span className="text-sm text-[var(--Text-text-primary)] font-medium">
            Excel (.xlsx)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--Text-text-secondary)]">
            预计大小
          </span>
          <span className="text-sm text-[var(--Text-text-primary)] font-medium">
            约 2.5 MB
          </span>
        </div>
      </div>
    </ConfirmPanel>
  );
}
