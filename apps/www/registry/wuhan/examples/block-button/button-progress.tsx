"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import { useState } from "react";

export default function ButtonProgressDemo() {
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        color="primary"
        progress={progress < 100}
        progressValue={progress}
        onClick={handleClick}
      >
        {progress === 0
          ? "开始上传"
          : progress < 100
            ? `上传中 ${progress}%`
            : "完成"}
      </Button>
    </div>
  );
}
