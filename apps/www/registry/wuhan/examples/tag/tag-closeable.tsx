"use client";

import { Tag } from "@/registry/wuhan/composed/tag/tag";

export default function TagCloseable() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          可关闭标签:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="filled" theme="brand" closeable>
            React
          </Tag>
          <Tag variant="filled" theme="success" closeable>
            TypeScript
          </Tag>
          <Tag variant="filled" theme="warning" closeable>
            JavaScript
          </Tag>
          <Tag variant="filled" theme="error" closeable>
            CSS
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          带回调的可关闭标签:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag
            variant="outline"
            theme="brand"
            closeable
            onClose={() => console.log("已关闭标签")}
          >
            点击 X 查看控制台
          </Tag>
        </div>
      </div>
    </div>
  );
}
