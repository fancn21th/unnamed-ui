"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionControlledDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-[650px] space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--text-secondary)]">
          当前展开: <span className="font-medium">{value || "无"}</span>
        </span>
        <button
          className="px-3 py-1.5 text-sm bg-[var(--bg-brand)] text-white rounded-[var(--radius-md)] hover:opacity-90"
          onClick={() => setValue("")}
        >
          收起全部
        </button>
      </div>
      <Accordion
        type="single"
        value={value}
        onValueChange={(val) => setValue(val)}
      >
        <AccordionItem
          value="item-1"
          trigger="项目一"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目一的内容
            </div>
          }
        />
        <AccordionItem
          value="item-2"
          trigger="项目二"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目二的内容
            </div>
          }
        />
        <AccordionItem
          value="item-3"
          trigger="项目三"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目三的内容
            </div>
          }
        />
      </Accordion>
    </div>
  );
}
