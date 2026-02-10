"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressLineDemo() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="mb-3 text-sm font-medium">基础线性进度条</h3>
        <Progress percent={30} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同状态</h3>
        <div className="space-y-3">
          <Progress percent={30} status="normal" />
          <Progress percent={50} status="success" />
          <Progress percent={70} status="exception" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义颜色</h3>
        <div className="space-y-3">
          <Progress percent={50} strokeColor="#52c41a" />
          <Progress percent={70} strokeColor="#1890ff" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">渐变色</h3>
        <Progress
          percent={60}
          strokeColor={{ from: "#108ee9", to: "#87d068" }}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">隐藏进度文字</h3>
        <Progress percent={50} showInfo={false} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义宽度</h3>
        <div className="space-y-3">
          <Progress percent={50} strokeWidth={4} />
          <Progress percent={50} strokeWidth={12} />
          <Progress percent={50} strokeWidth={20} />
        </div>
      </div>
    </div>
  );
}
