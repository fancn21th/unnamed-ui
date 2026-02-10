"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressCircleDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">基础圆形进度条</h3>
        <Progress type="circle" percent={75} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同状态</h3>
        <div className="flex gap-4 flex-wrap">
          <Progress type="circle" percent={30} status="normal" />
          <Progress type="circle" percent={50} status="success" />
          <Progress type="circle" percent={70} status="exception" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义颜色</h3>
        <div className="flex gap-4 flex-wrap">
          <Progress type="circle" percent={75} strokeColor="#52c41a" />
          <Progress type="circle" percent={75} strokeColor="#1890ff" />
          <Progress type="circle" percent={75} strokeColor="#eb2f96" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">渐变色</h3>
        <Progress
          type="circle"
          percent={90}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同尺寸</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Progress type="circle" percent={75} width={80} />
          <Progress type="circle" percent={75} width={120} />
          <Progress type="circle" percent={75} width={160} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义线宽</h3>
        <div className="flex gap-4 flex-wrap">
          <Progress type="circle" percent={75} strokeWidth={4} />
          <Progress type="circle" percent={75} strokeWidth={8} />
          <Progress type="circle" percent={75} strokeWidth={12} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">隐藏进度文字</h3>
        <Progress type="circle" percent={75} showInfo={false} />
      </div>
    </div>
  );
}
