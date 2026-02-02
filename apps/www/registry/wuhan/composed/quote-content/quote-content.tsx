"use client";

import * as React from "react";
import { CornerDownRight, X } from "lucide-react";
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
export interface QuoteContentData {
  content: React.ReactNode;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

export type QuoteContentAdapter<TQuote> = (quote: TQuote) => QuoteContentData;

export interface QuoteContentRenderContext<TQuote> {
  quote?: TQuote;
  content: React.ReactNode;
  isText: boolean;
  icon: React.ReactNode;
  closeIcon: React.ReactNode;
  onClose?: () => void;
}

export interface QuoteContentProps<TQuote = unknown> {
  content?: React.ReactNode;
  quote?: TQuote;
  quoteAdapter?: QuoteContentAdapter<TQuote>;
  icon?: React.ReactNode;
  onClose?: () => void;
  onCloseQuote?: (quote: TQuote) => void;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  renderQuote?: (context: QuoteContentRenderContext<TQuote>) => React.ReactNode;
  renderLeading?: (
    context: QuoteContentRenderContext<TQuote>,
  ) => React.ReactNode;
  renderContent?: (
    context: QuoteContentRenderContext<TQuote>,
  ) => React.ReactNode;
  renderClose?: (context: QuoteContentRenderContext<TQuote>) => React.ReactNode;
  className?: string;
}

/**
 * @public
 */
function QuoteContentComposedInner<TQuote = unknown>(
  {
    content,
    quote,
    quoteAdapter,
    icon,
    onClose,
    onCloseQuote,
    closeIcon,
    closable,
    renderQuote,
    renderLeading,
    renderContent,
    renderClose,
    className,
  }: QuoteContentProps<TQuote>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const resolvedData =
    quote && quoteAdapter
      ? quoteAdapter(quote)
      : quote
        ? { content: quote as React.ReactNode }
        : { content };
  const resolvedContent = resolvedData.content ?? content;
  const resolvedIcon = resolvedData.icon ?? icon ?? (
    <CornerDownRight className="w-4 h-4" />
  );
  const resolvedCloseIcon = resolvedData.closeIcon ?? closeIcon ?? (
    <X className="w-4 h-4" />
  );
  const isText =
    typeof resolvedContent === "string" || typeof resolvedContent === "number";
  const handleClose = () => {
    onClose?.();
    if (quote !== undefined) {
      onCloseQuote?.(quote);
    }
  };
  const canShowClose =
    (closable ?? true) &&
    (Boolean(onClose || onCloseQuote) || Boolean(renderClose));
  const context: QuoteContentRenderContext<TQuote> = {
    quote,
    content: resolvedContent,
    isText,
    icon: resolvedIcon,
    closeIcon: resolvedCloseIcon,
    onClose: canShowClose ? handleClose : undefined,
  };

  if (renderQuote) {
    return <>{renderQuote(context)}</>;
  }

  return (
    <QuoteContent ref={ref} className={className}>
      {renderLeading?.(context) ?? (
        <QuoteContentLeading>{resolvedIcon}</QuoteContentLeading>
      )}
      {renderContent?.(context) ?? (
        <QuoteContentContent>
          {isText ? (
            <QuoteContentText>{resolvedContent}</QuoteContentText>
          ) : (
            resolvedContent
          )}
        </QuoteContentContent>
      )}
      {canShowClose &&
        (renderClose?.(context) ?? (
          <QuoteContentCloseButton
            aria-label="Close quote"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            {resolvedCloseIcon}
          </QuoteContentCloseButton>
        ))}
    </QuoteContent>
  );
}
QuoteContentComposedInner.displayName = "QuoteContentComposed";

export const QuoteContentComposed = React.forwardRef(
  QuoteContentComposedInner,
) as <TQuote = unknown>(
  props: QuoteContentProps<TQuote> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;
