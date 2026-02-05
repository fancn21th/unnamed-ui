"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioControlled() {
  const [value, setValue] = useState("option1");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={value} onChange={setValue}>
        <Radio value="option1" id="controlled-1">
          选项 1
        </Radio>
        <Radio value="option2" id="controlled-2">
          选项 2
        </Radio>
        <Radio value="option3" id="controlled-3">
          选项 3
        </Radio>
      </RadioGroup>
      <div className="text-sm text-gray-500">当前选中: {value}</div>
    </div>
  );
}
