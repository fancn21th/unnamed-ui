"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressDefault() {
  return (
    <div className="space-y-6 w-full">
      <Progress percent={30} />
    </div>
  );
}
