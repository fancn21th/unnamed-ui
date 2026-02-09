"use client";

import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function BlockInputDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <BlockInput placeholder="试试输入点什么..." />
    </div>
  );
}
