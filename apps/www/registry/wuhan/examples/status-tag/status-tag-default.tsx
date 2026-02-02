"use client";

import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

export default function StatusTagDefault() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">待确认:</span>
        <StatusTag status="pending" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">已确认:</span>
        <StatusTag status="confirmed" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">成功:</span>
        <StatusTag status="success" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">失败:</span>
        <StatusTag status="error" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">警告:</span>
        <StatusTag status="warning" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-20">提示:</span>
        <StatusTag status="info" />
      </div>
    </div>
  );
}
