"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";

export default function ButtonColorsDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="solid" color="primary">
        主色
      </Button>
      <Button variant="solid" color="secondary">
        次要色
      </Button>
      <Button variant="solid" color="danger">
        危险
      </Button>
    </div>
  );
}
