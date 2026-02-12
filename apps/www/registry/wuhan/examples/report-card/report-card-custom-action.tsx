"use client";

import { ReportCard } from "@/registry/wuhan/composed/report-card/report-card";
import { Star, Download } from "lucide-react";

export default function ReportCardCustomActionDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <ReportCard
        title="数据分析报告"
        description="包含本月所有数据统计信息"
        action={
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md bg-[var(--bg-neutral-light-hover)] cursor-pointer">
              <Star className="size-4 text-[var(--text-warning)]" />
            </button>
            <button className="p-1.5 rounded-md bg-[var(--bg-neutral-light-hover)] cursor-pointer">
              <Download className="size-4 text-[var(--text-secondary)]" />
            </button>
          </div>
        }
      />
    </div>
  );
}
