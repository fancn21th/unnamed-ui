"use client";

import * as React from "react";
import {
  QuickActionButton as QuickActionButtonPrimitive,
  QuickActionGroup as QuickActionGroupPrimitive,
  QuickActionIcon as QuickActionIconPrimitive,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";

/**
 * @public
 */
export interface QuickActionItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * @public
 */
export interface QuickActionPanelProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: QuickActionItem[];
  className?: string;
}

/**
 * @public
 */
export const QuickActionGroup = QuickActionGroupPrimitive;
/**
 * @public
 */
export const QuickActionButton = QuickActionButtonPrimitive;
/**
 * @public
 */
export const QuickActionIcon = QuickActionIconPrimitive;

/**
 * @public
 */
export const QuickActionPanel = React.forwardRef<
  HTMLDivElement,
  QuickActionPanelProps
>(({ title, description, items, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {(title || description) && (
        <div className="text-center mb-6">
          {title && (
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}
      <QuickActionGroup aria-label="Quick actions">
        {items.map((item) => (
          <QuickActionButton key={item.id} onClick={item.onClick}>
            {item.icon && <QuickActionIcon>{item.icon}</QuickActionIcon>}
            <span>{item.label}</span>
          </QuickActionButton>
        ))}
      </QuickActionGroup>
    </div>
  );
});
QuickActionPanel.displayName = "QuickActionPanel";
