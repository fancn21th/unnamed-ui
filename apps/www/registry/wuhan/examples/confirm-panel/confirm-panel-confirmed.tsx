"use client";

import { ConfirmPanel } from "@/registry/wuhan/composed/confirm-panel/confirm-panel";

export default function ConfirmPanelConfirmed() {
  return (
    <ConfirmPanel
      title="提交审批"
      status="confirmed"
      onConfirm={() => console.log("已确认")}
    >
      <div className="space-y-2">
        <p className="text-sm text-[var(--Text-text-secondary)]">
          以下信息已确认并提交：
        </p>
        <ul className="text-sm text-[var(--Text-text-tertiary)] list-disc list-inside space-y-1">
          <li>申请人：张三</li>
          <li>申请时间：2024-02-04</li>
          <li>申请类型：请假</li>
          <li>确认时间：2024-02-04 14:30</li>
        </ul>
      </div>
    </ConfirmPanel>
  );
}
