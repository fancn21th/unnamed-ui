"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="solid" color="primary">
        实心按钮
      </Button>
      <Button variant="text" color="primary">
        文字按钮
      </Button>
      <Button variant="outline" color="primary">
        边框按钮
      </Button>
      <Button variant="link" color="primary">
        链接按钮
      </Button>
    </div>
  );
}
