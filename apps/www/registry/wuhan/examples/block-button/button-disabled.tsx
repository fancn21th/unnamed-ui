"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";

export default function ButtonDisabledDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="solid" color="primary" disabled>
        禁用实心
      </Button>
      <Button variant="outline" color="primary" disabled>
        禁用边框
      </Button>
      <Button variant="text" color="primary" disabled>
        禁用文字
      </Button>
    </div>
  );
}
