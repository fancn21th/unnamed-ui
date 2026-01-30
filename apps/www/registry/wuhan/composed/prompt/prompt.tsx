"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import {
  PromptButton as PromptButtonHorizontal,
  PromptGroup as PromptGroupHorizontal,
} from "@/registry/wuhan/blocks/prompt/prompt-01";
import {
  PromptButton as PromptButtonVertical,
  PromptGroup as PromptGroupVertical,
} from "@/registry/wuhan/blocks/prompt/prompt-02";

/**
 * @public
 */
export type PromptVariant = "horizontal" | "vertical";

/**
 * @public
 */
export interface PromptGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PromptVariant;
  children: React.ReactNode;
}

/**
 * @public
 */
export interface PromptButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  variant?: PromptVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * @public
 */
export interface PromptItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * @public
 */
export interface PromptPanelProps {
  variant?: PromptVariant;
  items: PromptItem[];
  className?: string;
}

/**
 * @public
 */
export const PromptGroup = React.forwardRef<HTMLDivElement, PromptGroupProps>(
  ({ variant = "horizontal", children, ...props }, ref) => {
    const ariaLabel = props["aria-label"] ?? "Prompt suggestions";
    if (variant === "vertical") {
      return (
        <PromptGroupVertical ref={ref} aria-label={ariaLabel} {...props}>
          {children}
        </PromptGroupVertical>
      );
    }
    return (
      <PromptGroupHorizontal ref={ref} aria-label={ariaLabel} {...props}>
        {children}
      </PromptGroupHorizontal>
    );
  },
);
PromptGroup.displayName = "PromptGroup";

/**
 * @public
 */
export const PromptButton = React.forwardRef<
  HTMLButtonElement,
  PromptButtonProps
>(({ variant = "horizontal", icon, children, ...props }, ref) => {
  if (variant === "vertical") {
    return (
      <PromptButtonVertical
        ref={ref}
        icon={icon ?? <Sparkles className="size-4" />}
        {...props}
      >
        {children}
      </PromptButtonVertical>
    );
  }
  return (
    <PromptButtonHorizontal ref={ref} icon={icon} {...props}>
      {children}
    </PromptButtonHorizontal>
  );
});
PromptButton.displayName = "PromptButton";

/**
 * @public
 */
export const PromptPanel = React.forwardRef<HTMLDivElement, PromptPanelProps>(
  ({ variant = "horizontal", items, className }, ref) => {
    return (
      <div ref={ref}>
        <PromptGroup variant={variant} className={className}>
          {items.map((item) => (
            <PromptButton
              key={item.id}
              variant={variant}
              icon={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </PromptButton>
          ))}
        </PromptGroup>
      </div>
    );
  },
);
PromptPanel.displayName = "PromptPanel";
