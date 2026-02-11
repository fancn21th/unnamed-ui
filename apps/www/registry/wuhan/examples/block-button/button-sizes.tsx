"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";

export default function ButtonSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm" color="primary">
        小按钮
      </Button>
      <Button size="md" color="primary">
        中按钮
      </Button>
      <Button size="lg" color="primary">
        大按钮
      </Button>
    </div>
  );
}
