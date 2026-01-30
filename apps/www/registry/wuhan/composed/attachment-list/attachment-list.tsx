"use client";

import * as React from "react";
import { FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AttachmentCard,
  AttachmentCardContent,
  AttachmentCardDeleteButton,
  AttachmentCardLeading,
  AttachmentCardMeta,
  AttachmentCardTitle,
  AttachmentList,
  AttachmentLoadingIndicator,
} from "@/registry/wuhan/blocks/attachment-list/attachment-list-01";

/**
 * @public
 */
export interface AttachmentItem {
  id: string;
  name?: string;
  fileType?: string;
  fileSize?: string;
  thumbnail?: string;
  loading?: boolean;
  isImage?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * @public
 */
export interface AttachmentListProps {
  items: AttachmentItem[];
  className?: string;
  onRemove?: (id: string) => void;
  onItemClick?: (item: AttachmentItem) => void;
  onItemSelect?: (item: AttachmentItem) => void;
}

/**
 * @public
 */
export const AttachmentListComposed = React.forwardRef<
  HTMLDivElement,
  AttachmentListProps
>(({ items, className, onRemove, onItemClick, onItemSelect }, ref) => {
  if (items.length === 0) return null;

  return (
    <div ref={ref}>
      <AttachmentList className={className}>
        {items.map((item) => {
          const isImage = item.isImage ?? !!item.thumbnail;
          const meta =
            item.fileType && item.fileSize
              ? `${item.fileType}·${item.fileSize}`
              : item.fileSize || item.fileType;
          const icon = item.icon ?? <FileText className="size-4" />;
          const handleClick =
            item.onClick ??
            (() => {
              onItemClick?.(item);
              onItemSelect?.(item);
            });

          return (
            <AttachmentCard
              key={item.id}
              variant="outline"
              size="sm"
              aria-label={item.name ?? "Attachment"}
              className={cn(
                "h-14",
                "flex items-center",
                isImage
                  ? "w-14 p-0 bg-transparent bg-[var(--bg-neutral-light)]"
                  : "max-w-[200px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
              )}
              onClick={handleClick}
            >
              <AttachmentCardLeading
                className={cn(
                  isImage
                    ? "w-full h-full rounded-[var(--radius-xl)] overflow-hidden"
                    : "rounded-[var(--radius-lg)] bg-[var(--bg-container)] w-10 h-10",
                )}
              >
                {item.loading ? (
                  <AttachmentLoadingIndicator className="bg-transparent" />
                ) : item.thumbnail ? (
                  <img
                    className="w-full h-full object-cover"
                    src={item.thumbnail}
                    alt={item.name ?? "Attachment"}
                  />
                ) : (
                  icon
                )}
              </AttachmentCardLeading>

              {!isImage && (
                <AttachmentCardContent>
                  {item.name && (
                    <AttachmentCardTitle>{item.name}</AttachmentCardTitle>
                  )}
                  {meta && <AttachmentCardMeta>{meta}</AttachmentCardMeta>}
                </AttachmentCardContent>
              )}

              {onRemove && (
                <AttachmentCardDeleteButton
                  aria-label="Delete attachment"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                >
                  <X className="w-3 h-3 text-[var(--text-tertiary)]" />
                </AttachmentCardDeleteButton>
              )}
            </AttachmentCard>
          );
        })}
      </AttachmentList>
    </div>
  );
});
AttachmentListComposed.displayName = "AttachmentListComposed";

export type { AttachmentListProps as ComposedAttachmentListProps };
