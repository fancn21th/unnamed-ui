"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressDemo() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          线性进度条
        </h3>
        <Progress percent={30} />
        <Progress percent={50} status="success" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          圆形进度条
        </h3>
        <div className="flex gap-4 flex-wrap">
          <Progress type="circle" percent={30} />
          <Progress type="circle" percent={50} status="success" />
          <Progress type="circle" percent={70} status="exception" />
          <Progress type="circle" percent={100} />
        </div>
      </div>
    </div>
  );
}
