"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { FileText, X } from "lucide-react";
import { cn, unstyledButtonClassName } from "@/lib/utils";
import {
  AttachmentCard,
  AttachmentCardContent,
  AttachmentCardDeleteButton,
  AttachmentCardLeading,
  AttachmentCardMeta,
  AttachmentCardTitle,
  AttachmentList,
  AttachmentLoadingIndicator,
} from "@/components/wuhan/blocks/attachment-list-01";

/**
 * @public
 */
export interface AttachmentItem {
  id: string;
  name?: string;
  fileType?: string;
  fileSize?: string;
  thumbnail?: string;
  previewUrl?: string;
  url?: string;
  loading?: boolean;
  isImage?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export type AttachmentAdapter<TAttachment> = (
  attachment: TAttachment,
) => AttachmentItem;

export interface AttachmentRenderContext {
  item: AttachmentItem;
  index: number;
  isImage: boolean;
  meta?: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  onRemove?: () => void;
  onSelect?: () => void;
  onPreview?: () => void;
  previewable: boolean;
}

/**
 * @public
 */
export interface AttachmentListProps<TAttachment = AttachmentItem> {
  items?: AttachmentItem[];
  attachments?: TAttachment[];
  attachmentAdapter?: AttachmentAdapter<TAttachment>;
  className?: string;
  onRemove?: (id: string, item?: AttachmentItem) => void;
  onItemClick?: (item: AttachmentItem) => void;
  onItemSelect?: (item: AttachmentItem) => void;
  getItemMeta?: (item: AttachmentItem) => React.ReactNode;
  getItemIsImage?: (item: AttachmentItem) => boolean;
  getItemIcon?: (item: AttachmentItem) => React.ReactNode;
  getItemPreviewable?: (item: AttachmentItem) => boolean;
  renderItem?: (context: AttachmentRenderContext) => React.ReactNode;
  renderLeading?: (context: AttachmentRenderContext) => React.ReactNode;
  renderContent?: (context: AttachmentRenderContext) => React.ReactNode;
  renderMeta?: (context: AttachmentRenderContext) => React.ReactNode;
  renderThumbnail?: (context: AttachmentRenderContext) => React.ReactNode;
  renderDelete?: (context: AttachmentRenderContext) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  previewEnabled?: boolean;
  previewOnClick?: boolean;
  previewItem?: AttachmentItem | null;
  onPreviewChange?: (item: AttachmentItem | null) => void;
  renderPreview?: (item: AttachmentItem) => React.ReactNode;
  renderPreviewTitle?: (item: AttachmentItem) => React.ReactNode;
}

/**
 * @public
 */
export const AttachmentListComposed = React.forwardRef<
  HTMLDivElement,
  AttachmentListProps
>(
  (
    {
      items,
      attachments,
      attachmentAdapter,
      className,
      onRemove,
      onItemClick,
      onItemSelect,
      getItemMeta,
      getItemIsImage,
      getItemIcon,
      getItemPreviewable,
      renderItem,
      renderLeading,
      renderContent,
      renderMeta,
      renderThumbnail,
      renderDelete,
      renderEmpty,
      previewEnabled = false,
      previewOnClick = true,
      previewItem,
      onPreviewChange,
      renderPreview,
      renderPreviewTitle,
    },
    ref,
  ) => {
    const [internalPreviewItem, setInternalPreviewItem] =
      React.useState<AttachmentItem | null>(null);
    const resolvedAdapter =
      (attachmentAdapter as AttachmentAdapter<AttachmentItem>) ??
      ((attachment) => attachment as AttachmentItem);
    const resolvedItems =
      items ?? (attachments ? attachments.map(resolvedAdapter) : []);
    const currentPreviewItem = previewItem ?? internalPreviewItem;
    const setPreviewItem = onPreviewChange ?? setInternalPreviewItem;
    const canUseDom = typeof document !== "undefined";

    if (resolvedItems.length === 0) {
      return renderEmpty ? <>{renderEmpty()}</> : null;
    }

    const closePreview = () => setPreviewItem(null);
    const previewNode =
      previewEnabled && currentPreviewItem && canUseDom
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Attachment preview"
              onClick={closePreview}
            >
              <div
                className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white p-4 shadow-lg"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className={cn(
                    unstyledButtonClassName,
                    "absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:bg-slate-100",
                  )}
                  aria-label="Close preview"
                  onClick={closePreview}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mb-3 text-sm font-semibold text-slate-900">
                  {renderPreviewTitle?.(currentPreviewItem) ??
                    currentPreviewItem.name ??
                    "Attachment preview"}
                </div>
                {renderPreview?.(currentPreviewItem) ??
                  (() => {
                    const previewImage =
                      currentPreviewItem.previewUrl ??
                      currentPreviewItem.thumbnail;
                    if (previewImage) {
                      return (
                        <img
                          className="max-h-[70vh] w-full rounded-md object-contain"
                          src={previewImage}
                          alt={currentPreviewItem.name ?? "Attachment preview"}
                        />
                      );
                    }
                    if (currentPreviewItem.url) {
                      return (
                        <iframe
                          title={
                            currentPreviewItem.name ?? "Attachment preview"
                          }
                          src={currentPreviewItem.url}
                          className="h-[70vh] w-full rounded-md border"
                        />
                      );
                    }
                    return (
                      <div className="flex h-[40vh] items-center justify-center rounded-md border border-dashed text-sm text-slate-500">
                        暂无可用预览
                      </div>
                    );
                  })()}
              </div>
            </div>,
            document.body,
          )
        : null;

    return (
      <>
        <div ref={ref}>
          <AttachmentList className={className}>
            {resolvedItems.map((item, index) => {
              const isImage =
                getItemIsImage?.(item) ?? item.isImage ?? !!item.thumbnail;
              const isPreviewable =
                getItemPreviewable?.(item) ??
                Boolean(item.previewUrl || item.thumbnail || item.url);
              const meta =
                getItemMeta?.(item) ??
                (item.fileType && item.fileSize
                  ? `${item.fileType}·${item.fileSize}`
                  : item.fileSize || item.fileType);
              const icon = getItemIcon?.(item) ?? item.icon ?? (
                <FileText className="size-4" />
              );
              const handlePreview = () => {
                if (!previewEnabled || !isPreviewable || item.loading) return;
                setPreviewItem(item);
              };
              const handleClick = () => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  onItemClick?.(item);
                  onItemSelect?.(item);
                }
                if (previewOnClick) {
                  handlePreview();
                }
              };
              const handleRemove = onRemove
                ? () => onRemove(item.id, item)
                : undefined;
              const handleSelect = () => onItemSelect?.(item);
              const context: AttachmentRenderContext = {
                item,
                index,
                isImage,
                meta,
                icon,
                onClick: handleClick,
                onRemove: handleRemove,
                onSelect: handleSelect,
                onPreview: handlePreview,
                previewable: isPreviewable,
              };

              if (renderItem) {
                return (
                  <React.Fragment key={item.id}>
                    {renderItem(context)}
                  </React.Fragment>
                );
              }

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
                    {renderLeading?.(context) ??
                      (item.loading ? (
                        <AttachmentLoadingIndicator className="bg-transparent" />
                      ) : item.thumbnail ? (
                        (renderThumbnail?.(context) ?? (
                          <img
                            className="w-full h-full object-cover"
                            src={item.thumbnail}
                            alt={item.name ?? "Attachment"}
                          />
                        ))
                      ) : (
                        icon
                      ))}
                  </AttachmentCardLeading>

                  {!isImage &&
                    (renderContent?.(context) ?? (
                      <AttachmentCardContent>
                        {item.name && (
                          <AttachmentCardTitle>{item.name}</AttachmentCardTitle>
                        )}
                        {meta &&
                          (renderMeta?.(context) ?? (
                            <AttachmentCardMeta>{meta}</AttachmentCardMeta>
                          ))}
                      </AttachmentCardContent>
                    ))}

                {renderDelete?.(context) ??
                  (onRemove && (
                    <AttachmentCardDeleteButton
                      aria-label="Delete attachment"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id, item);
                      }}
                    >
                      <X className="w-3 h-3 text-[var(--text-tertiary)]" />
                    </AttachmentCardDeleteButton>
                  ))}
                </AttachmentCard>
              );
            })}
          </AttachmentList>
        </div>
        {previewNode}
      </>
    );
  },
);
AttachmentListComposed.displayName = "AttachmentListComposed";

export type { AttachmentListProps as ComposedAttachmentListProps };
