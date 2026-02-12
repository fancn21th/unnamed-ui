"use client";

import { ReportCard } from "@/registry/wuhan/composed/report-card/report-card";

export default function ReportCardBasicDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <ReportCard title="候选人评估报告" description="更新时间：08-04 13:56" />
    </div>
  );
}
