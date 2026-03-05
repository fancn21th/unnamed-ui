"use client";

/**
 * 文件列表原语（带折叠/展开）
 * @module thinking-step-item/file-list-chip
 */

import { CircleAlert, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import {
  DEFAULT_FILE_LIST_LABELS,
  type ThinkingStepItemFileStatus,
  type ThinkingStepItemFileListLabels,
} from "./types";

const BOX_BORDER = "box-border [&>*]:box-border";

export interface ThinkingStepItemFileListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  files?: Array<{
    icon?: React.ReactNode;
    status?: ThinkingStepItemFileStatus;
    name: string;
    id?: string;
  }>;
  defaultVisibleCount?: number;
  labels?: ThinkingStepItemFileListLabels;
}

export interface ThinkingStepItemFileItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  status?: ThinkingStepItemFileStatus;
  name: string;
}

export interface ThinkingStepItemExpandButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  expanded?: boolean;
  onToggle?: () => void;
}

function useCollapsibleFileList(
  files: ThinkingStepItemFileListPrimitiveProps["files"],
  defaultVisibleCount: number,
) {
  const [expanded, setExpanded] = React.useState(false);
  const [needsToggle, setNeedsToggle] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(() =>
    Math.min(files?.length ?? 0, defaultVisibleCount),
  );
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const prevWidthRef = React.useRef<number | null>(null);
  const listId = React.useId();

  const getRowCount = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el) return 0;
    const children = Array.from(el.children) as HTMLElement[];
    const tops = new Set(children.map((c) => c.offsetTop));
    return tops.size;
  }, []);

  React.useLayoutEffect(() => {
    if (expanded) return;
    setNeedsToggle(false);
    setVisibleCount(files?.length ?? 0);
  }, [expanded, files?.length]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    if (needsToggle) return;
    if (visibleCount !== (files?.length ?? 0)) return;

    const rowCount = getRowCount();
    if (rowCount > 2) {
      setNeedsToggle(true);
      setVisibleCount(files?.length ?? 0);
    }
  }, [expanded, files?.length, getRowCount, needsToggle, visibleCount]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    if (!needsToggle) return;

    const el = wrapRef.current;
    if (!el) return;

    prevWidthRef.current = Math.round(el.getBoundingClientRect().width);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextWidth = Math.round(entry.contentRect.width);
      const prevWidth = prevWidthRef.current;
      if (prevWidth !== null && nextWidth === prevWidth) return;

      prevWidthRef.current = nextWidth;
      setNeedsToggle(false);
      setVisibleCount(files?.length ?? 0);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [expanded, files?.length, needsToggle]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    if (!needsToggle) return;
    if (visibleCount <= 0) return;

    const rowCount = getRowCount();
    if (rowCount <= 2) return;

    setVisibleCount((c) => Math.max(0, c - 1));
  }, [expanded, getRowCount, needsToggle, visibleCount]);

  const resolvedVisibleCount = expanded
    ? (files?.length ?? 0)
    : Math.max(0, visibleCount);
  const visibleFiles = (files ?? []).slice(0, resolvedVisibleCount);

  return {
    listId,
    wrapRef,
    visibleFiles,
    expanded,
    setExpanded,
    needsToggle,
  };
}

export const ThinkingStepItemFileListPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemFileListPrimitiveProps
>(
  (
    { files = [], defaultVisibleCount = 6, labels, className, ...props },
    ref,
  ) => {
    const {
      listId,
      wrapRef,
      visibleFiles,
      expanded,
      setExpanded,
      needsToggle,
    } = useCollapsibleFileList(files, defaultVisibleCount);
    const resolvedLabels = { ...DEFAULT_FILE_LIST_LABELS, ...labels };

    return (
      <div
        ref={ref}
        className={cn(
          BOX_BORDER,
          "flex flex-col",
          "gap-[var(--Gap-gap-xs)]",
          className,
        )}
        {...props}
      >
        <div
          ref={wrapRef}
          id={listId}
          className={cn("flex flex-wrap", "gap-[var(--Gap-gap-xs)]")}
        >
          {visibleFiles.map((file, index) => (
            <ThinkingStepItemFileItemPrimitive
              key={file.id ?? `${file.name}-${index}`}
              icon={file.icon}
              status={file.status}
              name={file.name}
            />
          ))}
          {needsToggle && (
            <ThinkingStepItemExpandButtonPrimitive
              expanded={expanded}
              aria-controls={listId}
              onToggle={() => setExpanded((v) => !v)}
            >
              {expanded
                ? resolvedLabels.collapseFiles
                : resolvedLabels.expandFiles}
            </ThinkingStepItemExpandButtonPrimitive>
          )}
        </div>
      </div>
    );
  },
);
ThinkingStepItemFileListPrimitive.displayName =
  "ThinkingStepItemFileListPrimitive";

export const ThinkingStepItemFileItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemFileItemPrimitiveProps
>(({ icon, status = "ready", name, className, ...props }, ref) => {
  const statusIconMap: Record<
    ThinkingStepItemFileStatus,
    { node: React.ReactNode; className: string } | null
  > = {
    loading: {
      node: <Loader2 className="size-4 animate-spin" />,
      className: "text-[var(--Text-text-brand)]",
    },
    error: {
      node: <CircleAlert className="size-4" />,
      className: "text-[var(--Text-text-error)]",
    },
    ready: null,
  };

  const statusIcon = statusIconMap[status];

  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "inline-flex items-center",
        "gap-[var(--Gap-gap-xs)]",
        "h-6",
        "rounded-[var(--radius-circle)]",
        "pt-[var(--Padding-padding-com-2xs)]",
        "pr-[var(--Padding-padding-com-sm)]",
        "pb-[var(--Padding-padding-com-2xs)]",
        "pl-[var(--Padding-padding-com-sm)]",
        "bg-[var(--Container-bg-container)]",
        "border border-[var(--Border-border-neutral)]",
        "hover:bg-[var(--Container-bg-neutral-light)]",
        className,
      )}
      {...props}
    >
      <div className="size-4 flex-shrink-0 inline-flex items-center justify-center">
        {statusIcon ? (
          <div
            className={cn(
              "flex items-center justify-center",
              statusIcon.className,
            )}
          >
            {statusIcon.node}
          </div>
        ) : icon ? (
          <span className="text-sm leading-none">{icon}</span>
        ) : (
          <div className="w-full h-full bg-[var(--Container-bg-neutral-light)] rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--Text-text-placeholder)] rounded" />
          </div>
        )}
      </div>
      <span
        className={cn(
          "font-[var(--font-family-CN)]",
          "font-size-1",
          "leading-[var(--line-height-1)]",
          "font-normal",
          "text-[var(--Text-text-secondary)]",
        )}
      >
        {name}
      </span>
    </div>
  );
});
ThinkingStepItemFileItemPrimitive.displayName =
  "ThinkingStepItemFileItemPrimitive";

export const ThinkingStepItemExpandButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ThinkingStepItemExpandButtonPrimitiveProps
>(({ expanded = false, onToggle, children, className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="unstyled"
    size="unstyled"
    type="button"
    onClick={onToggle}
    aria-expanded={expanded}
    className={cn(
      BOX_BORDER,
      "h-6",
      "flex items-center justify-center",
      "gap-[var(--Gap-gap-xs)]",
      "rounded-full",
      "pt-[var(--Padding-padding-com-2xs)]",
      "pr-[var(--Padding-padding-com-md)]",
      "pb-[var(--Padding-padding-com-2xs)]",
      "pl-[var(--Padding-padding-com-md)]",
      "bg-[var(--Container-bg-container)]",
      "border border-[var(--Border-border-neutral)]",
      "font-[var(--font-family-CN)]",
      "font-size-1",
      "leading-[var(--line-height-1)]",
      "font-normal",
      "text-[var(--Text-text-primary)]",
      "cursor-pointer",
      "transition-colors",
      "hover:bg-[var(--Container-bg-neutral-light-hover)]",
      className,
    )}
    {...props}
  >
    {children}
  </Button>
));
ThinkingStepItemExpandButtonPrimitive.displayName =
  "ThinkingStepItemExpandButtonPrimitive";
