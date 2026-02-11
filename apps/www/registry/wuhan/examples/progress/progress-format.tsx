"use client";

import { Progress } from "@/registry/wuhan/composed/progress/progress";

export default function ProgressFormatDemo() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="mb-3 text-sm font-medium">自定义文字格式</h3>
        <Progress percent={75} format={(percent) => `${percent} Days`} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义内容</h3>
        <div className="space-y-3">
          <Progress percent={100} format={() => "Done"} status="success" />
          <Progress percent={70} format={(percent) => `${percent}% 已完成`} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">圆形进度条自定义格式</h3>
        <div className="flex gap-4 flex-wrap">
          <Progress
            type="circle"
            percent={75}
            format={(percent) => `${percent}天`}
          />
          <Progress
            type="circle"
            percent={100}
            format={() => "✓"}
            status="success"
          />
        </div>
      </div>
    </div>
  );
}
