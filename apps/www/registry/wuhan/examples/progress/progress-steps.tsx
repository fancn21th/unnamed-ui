"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressStepsDemo() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="mb-3 text-sm font-medium">步进进度条</h3>
        <Progress percent={50} steps={5} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同步数</h3>
        <div className="space-y-3">
          <Progress percent={60} steps={3} />
          <Progress percent={60} steps={5} />
          <Progress percent={60} steps={10} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">彩色步进</h3>
        <Progress
          percent={60}
          steps={5}
          strokeColor={["#1890ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"]}
        />
      </div>
    </div>
  );
}
