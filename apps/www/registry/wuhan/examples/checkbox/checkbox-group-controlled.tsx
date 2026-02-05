"use client";

import { CheckboxGroup } from "@/registry/wuhan/composed/checkbox/checkbox";
import { useState } from "react";

export default function CheckboxGroupControlled() {
  const [value, setValue] = useState<string[]>(["react"]);

  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup
        value={value}
        onChange={setValue}
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ]}
      />
      <div className="text-sm text-muted-foreground">
        已选择: {value.join(", ") || "无"}
      </div>
    </div>
  );
}
