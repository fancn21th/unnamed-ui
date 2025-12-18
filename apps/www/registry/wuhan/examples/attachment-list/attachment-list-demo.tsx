"use client";

import { useMemo, useState } from "react";
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

type DemoAttachment = {
  id: string;
  name?: string;
  fileType?: string;
  fileSize?: string;
  isImage?: boolean;
  loading?: boolean;
  thumbnail?: string;
};

export default function AttachmentListDemo() {
  const initial = useMemo<DemoAttachment[]>(
    () => [
      {
        id: "img-1",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "image.png",
      },
      {
        id: "img-uploading",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "uploading.jpg",
        loading: true,
      },
      {
        id: "doc-1",
        name: "需求文档.pdf",
        fileType: "PDF",
        fileSize: "1.2MB",
      },
      {
        id: "doc-2",
        name: "会议纪要.docx",
        fileType: "DOCX",
        fileSize: "92KB",
        loading: true,
      },
    ],
    [],
  );

  const [items, setItems] = useState<DemoAttachment[]>(initial);

  return (
    <div className="w-full max-w-full">
      <AttachmentList className="max-w-full">
        {items.map((item) => {
          const meta =
            item.fileType && item.fileSize
              ? `${item.fileType}·${item.fileSize}`
              : item.fileSize || item.fileType;

          return (
            <AttachmentCard
              key={item.id}
              variant="outline"
              size="sm"
              className={cn(
                "h-14",
                "flex items-center",
                item.isImage
                  ? "w-14 p-0 bg-transparent bg-[var(--bg-neutral-light)]"
                  : "max-w-[200px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
              )}
              onClick={() => {}}
            >
              <AttachmentCardLeading
                className={cn(
                  item.isImage
                    ? "w-full h-full rounded-xl overflow-hidden "
                    : "rounded-lg bg-[var(--bg-container)] w-10 h-10",
                )}
              >
                {item.loading ? (
                  <AttachmentLoadingIndicator className="bg-transparent" />
                ) : item.isImage ? (
                  <img
                    className="w-full h-full object-cover"
                    src={item.thumbnail}
                    alt={item.name}
                  />
                ) : (
                  <FileText className="size-4" />
                )}
              </AttachmentCardLeading>

              {!item.isImage && (
                <AttachmentCardContent>
                  {item.name && (
                    <AttachmentCardTitle title={item.name}>
                      {item.name}
                    </AttachmentCardTitle>
                  )}
                  {meta && <AttachmentCardMeta>{meta}</AttachmentCardMeta>}
                </AttachmentCardContent>
              )}

              <AttachmentCardDeleteButton
                aria-label="Delete attachment"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setItems((prev) => prev.filter((x) => x.id !== item.id));
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
