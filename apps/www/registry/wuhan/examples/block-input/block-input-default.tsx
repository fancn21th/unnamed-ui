"use client";

import { Search, User } from "lucide-react";
import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function BlockInputDefault() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          基础输入框:
        </span>
        <BlockInput placeholder="请输入内容..." />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          带前缀图标:
        </span>
        <BlockInput
          placeholder="搜索..."
          prefix={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          带后缀图标:
        </span>
        <BlockInput
          placeholder="输入用户名..."
          suffix={<User className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          前后缀图标:
        </span>
        <BlockInput
          placeholder="搜索用户..."
          prefix={<Search className="h-4 w-4" />}
          suffix={<User className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
