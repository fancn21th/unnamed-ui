"use client";

import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function BlockInputMultiline() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          多行输入（3行）:
        </span>
        <BlockInput multiline rows={3} placeholder="请输入多行文本..." />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          多行输入（5行）:
        </span>
        <BlockInput multiline rows={5} placeholder="请输入更多内容..." />
      </div>
    </div>
  );
}
