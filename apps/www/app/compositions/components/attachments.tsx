"use client";

import * as React from "react";
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
import { cn } from "@/lib/utils";
import { FileText, X } from "lucide-react";
import type { ComposerAttachment } from "../hooks/use-composer-attachments";

export type ChatAttachmentMeta = {
  id: string;
  name: string;
  fileType?: string;
  fileSize?: string;
  isImage?: boolean;
  thumbnail?: string; // runtime only (objectURL)
};

function attachmentMetaText(a: {
  fileType?: string;
  fileSize?: string;
}): string | undefined {
  if (a.fileType && a.fileSize) return `${a.fileType}·${a.fileSize}`;
  return a.fileSize || a.fileType;
}

export function ComposerAttachmentStrip({
  attachments,
  onRemove,
}: {
  attachments: ComposerAttachment[];
  onRemove: (id: string) => void;
}) {
  if (attachments.length === 0) return null;

  return (
    <div className="w-full max-w-full">
      <AttachmentList className="max-w-full">
        {attachments.map((a) => {
          const meta = attachmentMetaText(a);
          return (
            <AttachmentCard
              key={a.id}
              variant="outline"
              size="sm"
              className={cn(
                "h-14",
                "flex items-center",
                a.isImage
                  ? "w-14 p-0 bg-transparent bg-[var(--bg-neutral-light)]"
                  : "max-w-[240px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
              )}
              onClick={() => {}}
            >
              <AttachmentCardLeading
                className={cn(
                  a.isImage
                    ? "w-full h-full rounded-xl overflow-hidden"
                    : "rounded-lg bg-[var(--bg-container)] w-10 h-10",
                )}
              >
                {a.loading ? (
                  <AttachmentLoadingIndicator className="bg-transparent" />
                ) : a.isImage && a.thumbnail ? (
                  <img
                    className="w-full h-full object-cover"
                    src={a.thumbnail}
                    alt={a.name}
                  />
                ) : (
                  <FileText className="size-4" />
                )}
              </AttachmentCardLeading>

              {!a.isImage && (
                <AttachmentCardContent>
                  <AttachmentCardTitle title={a.name}>{a.name}</AttachmentCardTitle>
                  {meta && <AttachmentCardMeta>{meta}</AttachmentCardMeta>}
                </AttachmentCardContent>
              )}

              <AttachmentCardDeleteButton
                aria-label="Delete attachment"
                className="opacity-100 pointer-events-auto"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(a.id);
                }}
              >
                <X className="w-3 h-3 text-[var(--text-tertiary)]" />
              </AttachmentCardDeleteButton>
            </AttachmentCard>
          );
        })}
      </AttachmentList>
    </div>
  );
}

export function MessageAttachments({
  attachments,
  onRemove,
}: {
  attachments: ChatAttachmentMeta[] | undefined;
  onRemove?: (id: string) => void;
}) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((a) => {
        const meta = attachmentMetaText(a);
        return (
          <AttachmentCard
            key={a.id}
            variant="outline"
            size="sm"
            className={cn(
              "h-14",
              "flex items-center",
              a.isImage
                ? "w-14 p-0 bg-transparent bg-[var(--bg-neutral-light)]"
                : "max-w-[240px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
            )}
          >
            <AttachmentCardLeading
              className={cn(
                a.isImage
                  ? "w-full h-full rounded-xl overflow-hidden"
                  : "rounded-lg bg-[var(--bg-container)] w-10 h-10",
              )}
            >
              {a.isImage && a.thumbnail ? (
                <img className="w-full h-full object-cover" src={a.thumbnail} alt={a.name} />
              ) : (
                <FileText className="size-4" />
              )}
            </AttachmentCardLeading>

            {!a.isImage && (
              <AttachmentCardContent>
                <AttachmentCardTitle title={a.name}>{a.name}</AttachmentCardTitle>
                {meta && <AttachmentCardMeta>{meta}</AttachmentCardMeta>}
              </AttachmentCardContent>
            )}

            {onRemove && (
              <AttachmentCardDeleteButton
                aria-label="Delete attachment"
                className="opacity-100 pointer-events-auto"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(a.id);
                }}
              >
                <X className="w-3 h-3 text-[var(--text-tertiary)]" />
              </AttachmentCardDeleteButton>
            )}
          </AttachmentCard>
        );
      })}
    </div>
  );
}

export function toChatAttachmentMeta(a: ComposerAttachment): ChatAttachmentMeta {
  return {
    id: a.id,
    name: a.name,
    fileType: a.fileType,
    fileSize: a.fileSize,
    isImage: a.isImage,
    thumbnail: a.thumbnail,
  };
}


