"use client";

import { ReportCard } from "@/registry/wuhan/composed/report-card/report-card";
import { MoreVertical } from "lucide-react";

export default function ReportCardStatusDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <ReportCard
        title="已发布报告"
        description="该报告已发布到团队"
        action={
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--bg-success-light)] text-[var(--text-success)]">
              已发布
            </span>
            <button className="p-1 rounded-md bg-[var(--bg-neutral-light-hover)] cursor-pointer">
              <MoreVertical className="size-4 text-[var(--text-secondary)]" />
            </button>
          </div>
        }
      />
    </div>
  );
}
