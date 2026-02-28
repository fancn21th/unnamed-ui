"use client";

import { ConfirmPanel } from "@/registry/wuhan/composed/confirm-panel/confirm-panel";

export default function ConfirmPanelPending() {
  return (
    <ConfirmPanel
      title="提交审批"
      status="pending"
      confirmButtonText="提交"
      onConfirm={() => console.log("提交审批")}
    >
      <div className="space-y-2">
        <p className="text-sm text-[var(--Text-text-secondary)]">
          请确认以下信息无误后提交：
        </p>
        <ul className="text-sm text-[var(--Text-text-tertiary)] list-disc list-inside space-y-1">
          <li>申请人：张三</li>
          <li>申请时间：2024-02-04</li>
          <li>申请类型：请假</li>
        </ul>
      </div>
    </ConfirmPanel>
  );
}
