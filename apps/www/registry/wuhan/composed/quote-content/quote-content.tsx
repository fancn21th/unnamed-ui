"use client";

import * as React from "react";
import { CornerDownLeft, X } from "lucide-react";
import {
  QuoteContent,
  QuoteContentLeading,
  QuoteContentContent,
  QuoteContentText,
  QuoteContentCloseButton,
} from "@/registry/wuhan/blocks/quote-content/quote-content-01";

/**
 * @public
 */
export interface QuoteContentProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  className?: string;
}

/**
 * @public
 */
export const QuoteContentComposed = React.forwardRef<
  HTMLDivElement,
  QuoteContentProps
>(({ content, icon, onClose, closeIcon, className }, ref) => {
  const resolvedIcon = icon ?? <CornerDownLeft className="w-4 h-4" />;
  const resolvedCloseIcon = closeIcon ?? <X className="w-4 h-4" />;
  const isText = typeof content === "string" || typeof content === "number";

  return (
    <QuoteContent ref={ref} className={className}>
      <QuoteContentLeading>{resolvedIcon}</QuoteContentLeading>
      <QuoteContentContent>
        {isText ? <QuoteContentText>{content}</QuoteContentText> : content}
      </QuoteContentContent>
      {onClose && (
        <QuoteContentCloseButton
          aria-label="Close quote"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          {resolvedCloseIcon}
        </QuoteContentCloseButton>
      )}
    </QuoteContent>
  );
});
QuoteContentComposed.displayName = "QuoteContentComposed";
