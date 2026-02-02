"use client";

import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

export default function StatusTagCustom() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">进行中:</span>
        <StatusTag
          text="进行中"
          bgColor="bg-purple-50"
          textColor="text-purple-700"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">已归档:</span>
        <StatusTag
          text="已归档"
          bgColor="bg-gray-100"
          textColor="text-gray-600"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">VIP:</span>
        <StatusTag
          text="VIP"
          bgColor="bg-gradient-to-r from-amber-50 to-orange-50"
          textColor="text-orange-700"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">热门:</span>
        <StatusTag text="热门" bgColor="bg-rose-50" textColor="text-rose-700" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">已售罄:</span>
        <StatusTag
          text="已售罄"
          bgColor="bg-slate-100"
          textColor="text-slate-500"
        />
      </div>
    </div>
  );
}
