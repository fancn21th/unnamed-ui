"use client";

import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function BlockInputStates() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">默认状态:</span>
        <BlockInput placeholder="默认输入框" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          危险状态（错误）:
        </span>
        <BlockInput placeholder="错误输入框" danger />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">禁用状态:</span>
        <BlockInput placeholder="禁用输入框" disabled value="无法编辑" />
      </div>
    </div>
  );
}
