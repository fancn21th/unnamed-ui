"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
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
              <span className="text-[var(--text-primary)] font-size-1 leading-[var(--line-height-1)]">
                Pin
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--bg-neutral-light)]"
            >
              <Copy className="size-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-size-1 leading-[var(--line-height-1)]">
                Duplicate
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--bg-neutral-light)]"
            >
              <Trash2 className="size-4 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-size-1 leading-[var(--line-height-1)]">
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
      <HistoryItem
        active={moreOpen1}
        title="默认历史记录项"
        trailing={
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <HoverMorePopover open={moreOpen1} onOpenChange={setMoreOpen1}>
              <span className="inline-flex items-center" aria-label="More">
                <Ellipsis className="size-4" />
              </span>
            </HoverMorePopover>
          </div>
        }
      />

      <HistoryItem
        selected
        title="选中状态历史记录项"
        trailing={
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <Clock className="size-4" />
          </div>
        }
      />

      <HistoryItem
        active={moreOpen2}
        title="Hover 展示操作：删除 + 更多(popover)"
        hoverTrailing={
          <div className="inline-flex items-center gap-[var(--gap-xs)]">
            <HoverMorePopover open={moreOpen2} onOpenChange={setMoreOpen2}>
              <span className="inline-flex items-center" aria-label="More">
                <Ellipsis className="size-4" />
              </span>
            </HoverMorePopover>
          </div>
        }
      />
    </div>
  );
}
