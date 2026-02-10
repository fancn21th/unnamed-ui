"use client";

import { useState } from "react";
import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectMultiple() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const [openDisabled, setOpenDisabled] = useState(false);
  const [valuesDisabled, setValuesDisabled] = useState<string[]>([
    "react",
    "vue",
    "angular",
    "svelte",
  ]);

  return (
    <div className="flex flex-col gap-8">
      {/* 普通多选 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          普通多选
        </h3>
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
        <div className="text-sm text-[var(--text-secondary)]">
          已选择: {values.join(", ") || "无"}
        </div>
      </div>

      {/* 禁用多选 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          禁用状态
        </h3>
        <BlockSelect
          multiple
          disabled
          open={openDisabled}
          onOpenChange={setOpenDisabled}
          value={valuesDisabled}
          onValueChange={(val) => setValuesDisabled(val as string[])}
          options={[
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ]}
          placeholder="选择框架"
        />
        <div className="text-sm text-[var(--text-secondary)]">
          已选择: {valuesDisabled.join(", ")}
        </div>
      </div>
    </div>
  );
}
