"use client";

import { ReportCard } from "@/registry/wuhan/composed/report-card/report-card";

export default function ReportCardHiddenActionDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <ReportCard
        title="只读报告"
        description="不可进行任何操作"
        showAction={false}
      />
    </div>
  );
}
