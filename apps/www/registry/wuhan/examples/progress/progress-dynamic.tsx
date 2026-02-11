"use client";

import { useState } from "react";
import { Progress } from "@/registry/wuhan/composed/progress/progress";
import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import { Minus, Plus } from "lucide-react";

export default function ProgressDynamicDemo() {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent((prev) => Math.min(prev + 10, 100));
  };

  const decrease = () => {
    setPercent((prev) => Math.max(prev - 10, 0));
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="mb-3 text-sm font-medium">动态进度条</h3>
        <div className="space-y-4">
          <Progress percent={percent} />
          <div className="flex gap-2">
            <Button onClick={decrease}>减少</Button>
            <Button onClick={increase}>增加</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">动态圆形进度条</h3>
        <div className="space-y-4">
          <Progress type="circle" percent={percent} />
          <div className="flex gap-2">
            <Button onClick={decrease}>减少</Button>
            <Button onClick={increase}>增加</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
