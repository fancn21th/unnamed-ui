"use client";

import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

export default function StatusTagMixed() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">订单待确认:</span>
        <StatusTag status="pending" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">支付成功:</span>
        <StatusTag status="success" text="支付成功" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">审核通过:</span>
        <StatusTag status="confirmed" text="审核通过" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">发货中:</span>
        <StatusTag
          status="info"
          text="发货中"
          bgColor="bg-cyan-50"
          textColor="text-cyan-700"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">配送失败:</span>
        <StatusTag status="error" text="配送失败" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">即将过期:</span>
        <StatusTag status="warning" text="即将过期" />
      </div>
    </div>
  );
}
