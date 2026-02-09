"use client";

import { Tag } from "@/registry/wuhan/composed/tag/tag";

export default function TagDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="filled" theme="brand">
        品牌标签
      </Tag>
      <Tag variant="outline" theme="success">
        成功
      </Tag>
      <Tag variant="solid" theme="error">
        错误
      </Tag>
    </div>
  );
}
