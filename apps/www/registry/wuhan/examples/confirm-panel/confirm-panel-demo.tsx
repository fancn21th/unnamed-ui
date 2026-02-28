"use client";

import { ConfirmPanel } from "@/registry/wuhan/composed/confirm-panel/confirm-panel";

export default function ConfirmPanelDemo() {
  return (
    <ConfirmPanel title="删除确认" onConfirm={() => console.log("确认删除")}>
      <p className="text-sm text-[var(--Text-text-secondary)]">
        确定要删除这条记录吗？此操作无法撤销。
      </p>
    </ConfirmPanel>
  );
}
