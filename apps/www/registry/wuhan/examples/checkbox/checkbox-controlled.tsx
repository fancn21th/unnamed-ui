"use client";

import { Checkbox } from "@/registry/wuhan/composed/checkbox/checkbox";
import { useState } from "react";

export default function CheckboxControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        受控复选框
      </Checkbox>
      <div className="text-sm text-muted-foreground">
        当前状态: {checked ? "已选中" : "未选中"}
      </div>
    </div>
  );
}
