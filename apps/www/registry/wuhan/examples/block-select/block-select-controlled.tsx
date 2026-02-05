"use client";

import { useState } from "react";
import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectControlled() {
  const [value, setValue] = useState("apple");

  return (
    <div className="flex flex-col gap-4">
      <BlockSelect
        value={value}
        onValueChange={(val) => setValue(val as string)}
        options={[
          { label: "苹果", value: "apple" },
          { label: "香蕉", value: "banana" },
          { label: "橙子", value: "orange" },
        ]}
        placeholder="选择水果"
      />
      <div className="text-sm text-gray-500">当前选中: {value}</div>
    </div>
  );
}
