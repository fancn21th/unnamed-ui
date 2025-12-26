"use client";

import * as React from "react";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { Clock, Pin, Trash2, Ellipsis, Copy } from "lucide-react";

function HoverMorePopover({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const closeTimer = React.useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => onOpenChange(false), 120);
  };

  React.useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <span
          className="inline-flex items-center"
          onMouseEnter={() => {
            clearCloseTimer();
            onOpenChange(true);
          }}
          onMouseLeave={() => {
            scheduleClose();
          }}
        >
          {children}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={8}
          onMouseEnter={() => {
            clearCloseTimer();
            onOpenChange(true);
          }}
          onMouseLeave={() => {
            scheduleClose();
          }}
          className={cn(
            "z-50",
            "min-w-[160px]",
            "rounded-[var(--radius-lg)]",
            "border border-[var(--border-neutral)]",
            "bg-[var(--bg-container)]",
            "shadow-[var(--shadow-basic)]",
            "p-[var(--padding-com-sm)]",
          )}
        >
          <div className="flex flex-col">
            <button
              type="button"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--bg-neutral-light)]"
            >
              <Pin className="size-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] text-[var(--font-size-1)] leading-[var(--line-height-1)]">
                Pin
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--bg-neutral-light)]"
            >
              <Copy className="size-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] text-[var(--font-size-1)] leading-[var(--line-height-1)]">
                Duplicate
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--bg-neutral-light)]"
            >
              <Trash2 className="size-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] text-[var(--font-size-1)] leading-[var(--line-height-1)]">
                Delete
              </span>
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default function HistoryItemDemo() {
  const [moreOpen1, setMoreOpen1] = React.useState(false);
  const [moreOpen2, setMoreOpen2] = React.useState(false);

  return (
    <div className="flex flex-col gap-[var(--gap-md)]">
      <HistoryItemPrimitive
        data-active={moreOpen1 ? "true" : undefined}
        aria-label="Default history item"
      >
        <HistoryItemTitlePrimitive>默认历史记录项</HistoryItemTitlePrimitive>
        <HistoryItemTrailingPrimitive>
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <HoverMorePopover open={moreOpen1} onOpenChange={setMoreOpen1}>
              <span className="inline-flex items-center" aria-label="More">
                <Ellipsis className="size-4" />
              </span>
            </HoverMorePopover>
          </div>
        </HistoryItemTrailingPrimitive>
      </HistoryItemPrimitive>

      <HistoryItemPrimitive
        data-selected="true"
        aria-label="Selected history item"
      >
        <HistoryItemTitlePrimitive>
          选中状态历史记录项
        </HistoryItemTitlePrimitive>
        <HistoryItemTrailingPrimitive>
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <Clock className="size-4" />
          </div>
        </HistoryItemTrailingPrimitive>
      </HistoryItemPrimitive>

      <HistoryItemPrimitive
        data-active={moreOpen2 ? "true" : undefined}
        aria-label="History item with hover actions"
      >
        <HistoryItemTitlePrimitive>
          Hover 展示操作：删除 + 更多(popover)
        </HistoryItemTitlePrimitive>
        <HistoryItemHoverTrailingPrimitive>
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <HoverMorePopover open={moreOpen2} onOpenChange={setMoreOpen2}>
              <span className="inline-flex items-center" aria-label="More">
                <Ellipsis className="size-4" />
              </span>
            </HoverMorePopover>
          </div>
        </HistoryItemHoverTrailingPrimitive>
      </HistoryItemPrimitive>
    </div>
  );
}
