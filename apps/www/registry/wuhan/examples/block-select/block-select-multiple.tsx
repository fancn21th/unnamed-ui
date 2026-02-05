"use client";

import { useState } from "react";
import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectMultiple() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <BlockSelect
        multiple
        open={open}
        onOpenChange={setOpen}
        value={values}
        onValueChange={(val) => setValues(val as string[])}
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ]}
        placeholder="选择框架"
      />
      <div className="text-sm text-gray-500">
        已选择: {values.join(", ") || "无"}
      </div>
    </div>
  );
}
