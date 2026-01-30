"use client";

import * as React from "react";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";

/**
 * @public
 */
export interface HistoryItemProps {
  title: React.ReactNode;
  trailing?: React.ReactNode;
  hoverTrailing?: React.ReactNode;
  selected?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * @public
 */
export const HistoryItem = React.forwardRef<
  HTMLButtonElement,
  HistoryItemProps
>(
  (
    { title, trailing, hoverTrailing, selected, active, onClick, className },
    ref,
  ) => {
    return (
      <HistoryItemPrimitive
        ref={ref}
        className={className}
        data-selected={selected ? "true" : undefined}
        data-active={active ? "true" : undefined}
        aria-selected={selected}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        <HistoryItemTitlePrimitive>{title}</HistoryItemTitlePrimitive>
        {trailing && (
          <HistoryItemTrailingPrimitive>
            {trailing}
          </HistoryItemTrailingPrimitive>
        )}
        {hoverTrailing && (
          <HistoryItemHoverTrailingPrimitive>
            {hoverTrailing}
          </HistoryItemHoverTrailingPrimitive>
        )}
      </HistoryItemPrimitive>
    );
  },
);
HistoryItem.displayName = "HistoryItem";
