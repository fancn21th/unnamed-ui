"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";

export default function ButtonBlockDemo() {
  return (
    <div className="space-y-3">
      <Button variant="solid" color="primary" block>
        全宽按钮
      </Button>
    </div>
  );
}
