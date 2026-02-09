"use client";

import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function BlockInputRounded() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">常规圆角:</span>
        <BlockInput placeholder="常规圆角输入框" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">全圆角:</span>
        <BlockInput placeholder="全圆角输入框" fullRounded />
      </div>
    </div>
  );
}
