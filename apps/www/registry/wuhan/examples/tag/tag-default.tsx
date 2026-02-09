"use client";

import { Tag } from "@/registry/wuhan/composed/tag/tag";

export default function TagDefault() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Default 变体:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="default" theme="brand">
            品牌
          </Tag>
          <Tag variant="default" theme="success">
            成功
          </Tag>
          <Tag variant="default" theme="warning">
            警告
          </Tag>
          <Tag variant="default" theme="error">
            错误
          </Tag>
          <Tag variant="default" theme="neutral">
            中性
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Solid 变体:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="solid" theme="brand">
            品牌
          </Tag>
          <Tag variant="solid" theme="success">
            成功
          </Tag>
          <Tag variant="solid" theme="warning">
            警告
          </Tag>
          <Tag variant="solid" theme="error">
            错误
          </Tag>
          <Tag variant="solid" theme="neutral">
            中性
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Outline 变体:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="outline" theme="brand">
            品牌
          </Tag>
          <Tag variant="outline" theme="success">
            成功
          </Tag>
          <Tag variant="outline" theme="warning">
            警告
          </Tag>
          <Tag variant="outline" theme="error">
            错误
          </Tag>
          <Tag variant="outline" theme="neutral">
            中性
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Filled 变体:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="filled" theme="brand">
            品牌
          </Tag>
          <Tag variant="filled" theme="success">
            成功
          </Tag>
          <Tag variant="filled" theme="warning">
            警告
          </Tag>
          <Tag variant="filled" theme="error">
            错误
          </Tag>
          <Tag variant="filled" theme="neutral">
            中性
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Filled-outline 变体:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag variant="filled-outline" theme="brand">
            品牌
          </Tag>
          <Tag variant="filled-outline" theme="success">
            成功
          </Tag>
          <Tag variant="filled-outline" theme="warning">
            警告
          </Tag>
          <Tag variant="filled-outline" theme="error">
            错误
          </Tag>
          <Tag variant="filled-outline" theme="neutral">
            中性
          </Tag>
        </div>
      </div>
    </div>
  );
}
