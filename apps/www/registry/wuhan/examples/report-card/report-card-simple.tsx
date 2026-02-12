"use client";

import { ReportCard } from "@/registry/wuhan/composed/report-card/report-card";

export default function ReportCardSimpleDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <ReportCard
        title="候选人评估报告"
        description="更新时间：08-04 13:56"
        onEdit={() => console.log("编辑")}
        onDelete={() => console.log("删除")}
        onDuplicate={() => console.log("复制")}
      />
    </div>
  );
}
