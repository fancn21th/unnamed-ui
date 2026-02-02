"use client";

import { useMemo, useState } from "react";
import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";
import { FileText } from "lucide-react";

export default function AttachmentListCustomRender() {
  const initialItems = useMemo(
    () => [
      {
        id: "img-1",
        name: "design.png",
        thumbnail: "https://placehold.co/56x56",
        isImage: true,
      },
      {
        id: "doc-1",
        name: "spec.pdf",
        fileType: "PDF",
        fileSize: "1.2MB",
      },
      {
        id: "doc-2",
        name: "roadmap.xlsx",
        fileType: "XLSX",
        fileSize: "856KB",
      },
    ],
    [],
  );
  const [items, setItems] = useState(initialItems);

  return (
    <div className="w-full max-w-2xl space-y-2">
      <div className="text-xs text-muted-foreground">
        自定义 Meta 与删除按钮样式
      </div>
      <AttachmentListComposed
        className="w-full"
        items={items.map((item) => ({
          ...item,
          icon: item.isImage ? undefined : <FileText className="size-4" />,
        }))}
        onRemove={(id) =>
          setItems((prev) => prev.filter((item) => item.id !== id))
        }
        renderMeta={({ meta }) => (
          <span className="text-[11px] text-slate-500">{meta}</span>
        )}
        renderDelete={({ onRemove }) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove?.();
            }}
            className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] text-slate-500 shadow-sm hover:bg-slate-50 cursor-pointer"
            aria-label="Delete attachment"
          >
            ×
          </button>
        )}
      />
    </div>
  );
}
