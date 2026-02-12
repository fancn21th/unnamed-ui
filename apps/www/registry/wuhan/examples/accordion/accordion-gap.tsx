"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionGapDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-8">
      {/* gap-0 (无间距) */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-[var(--text-primary)]">
          无间距 (gap-0)
        </h3>
        <Accordion type="single" collapsible gap="gap-0">
          <AccordionItem
            value="item-1"
            trigger="项目一"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                内容一
              </div>
            }
          />
          <AccordionItem
            value="item-2"
            trigger="项目二"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                内容二
              </div>
            }
          />
        </Accordion>
      </div>

      {/* gap-4 (中等间距) */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-[var(--text-primary)]">
          中等间距 (gap-4)
        </h3>
        <Accordion type="single" collapsible gap="gap-4">
          <AccordionItem
            value="item-1"
            trigger="项目一"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                内容一
              </div>
            }
          />
          <AccordionItem
            value="item-2"
            trigger="项目二"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                内容二
              </div>
            }
          />
        </Accordion>
      </div>
    </div>
  );
}
