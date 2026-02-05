"use client";

import { useState } from "react";
import { RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioGroupControlled() {
  const [value, setValue] = useState<string>("react");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={value}
        onChange={setValue}
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ]}
      />
      <div className="text-sm text-gray-500">已选择: {value}</div>
    </div>
  );
}
