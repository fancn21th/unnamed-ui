"use client";

import { useMemo, useState } from "react";
import {
  AttachmentCard,
  AttachmentList,
} from "@/registry/wuhan/blocks/attachment-list/attachment-list-01";
import { FileText, X } from "lucide-react";

type DemoAttachment = {
  id: string;
  name?: string;
  fileType?: string;
  fileSize?: string;
  isImage?: boolean;
  loading?: boolean;
};

export default function AttachmentListDemo() {
  const initial = useMemo<DemoAttachment[]>(
    () => [
      {
        id: "img-1",
        isImage: true,
        name: "image.png",
      },
      {
        id: "img-uploading",
        isImage: true,
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
      <AttachmentList className="max-w-full" bordered>
        {items.map((item) => (
          <AttachmentCard
            key={item.id}
            variant="outline"
            size="sm"
            isImage={item.isImage}
            loading={item.loading}
            icon={
              item.isImage ? (
                <div className="w-full h-full bg-[var(--bg-neutral-light-hover)] flex items-center justify-center">
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    IMG
                  </span>
                </div>
              ) : (
                <FileText className="size-4" />
              )
            }
            name={item.name}
            fileType={item.fileType}
            fileSize={item.fileSize}
            deleteIcon={<X className="w-3 h-3 text-[var(--text-tertiary)]" />}
            onDelete={() =>
              setItems((prev) => prev.filter((x) => x.id !== item.id))
            }
            onClick={() => {}}
          />
        ))}
      </AttachmentList>
    </div>
  );
}
