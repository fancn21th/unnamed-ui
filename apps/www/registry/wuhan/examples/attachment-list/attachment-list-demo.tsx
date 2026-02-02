"use client";

import { useMemo, useState } from "react";
import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";
import { FileText } from "lucide-react";

type DemoAttachment = {
  key: string;
  filename?: string;
  ext?: string;
  sizeLabel?: string;
  kind?: "image" | "file";
  loading?: boolean;
  previewUrl?: string;
};

export default function AttachmentListDemo() {
  const initial = useMemo<DemoAttachment[]>(
    () => [
      {
        key: "img-1",
        kind: "image",
        previewUrl: "https://placehold.co/400x300",
        filename: "image.png",
      },
      {
        key: "img-2",
        kind: "image",
        previewUrl: "https://placehold.co/420x320",
        filename: "photo.jpg",
      },
      {
        key: "img-uploading",
        kind: "image",
        previewUrl: "https://placehold.co/360x260",
        filename: "uploading.jpg",
        loading: true,
      },
      {
        key: "doc-1",
        kind: "file",
        filename: "需求文档.pdf",
        ext: "PDF",
        sizeLabel: "1.2MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        key: "doc-2",
        kind: "file",
        filename: "会议纪要.docx",
        ext: "DOCX",
        sizeLabel: "92KB",
        loading: true,
      },
      {
        key: "doc-3",
        kind: "file",
        filename: "产品设计稿.fig",
        ext: "FIG",
        sizeLabel: "3.5MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        key: "doc-4",
        kind: "file",
        filename: "用户调研报告.xlsx",
        ext: "XLSX",
        sizeLabel: "856KB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        key: "img-3",
        kind: "image",
        previewUrl: "https://placehold.co/380x280",
        filename: "screenshot.png",
      },
      {
        key: "doc-5",
        kind: "file",
        filename: "技术方案.md",
        ext: "MD",
        sizeLabel: "45KB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    [],
  );

  const [items, setItems] = useState<DemoAttachment[]>(initial);

  return (
    <div className="w-full max-w-2xl space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button
          type="button"
          className="rounded-md border px-2 py-1 hover:bg-muted"
          onClick={() => setItems([])}
        >
          清空列表
        </button>
        <button
          type="button"
          className="rounded-md border px-2 py-1 hover:bg-muted"
          onClick={() => setItems(initial)}
        >
          重置数据
        </button>
      </div>
      <AttachmentListComposed
        className="w-full"
        attachments={items}
        attachmentAdapter={(item) => ({
          id: item.key,
          name: item.filename,
          fileType: item.ext,
          fileSize: item.sizeLabel,
          isImage: item.kind === "image",
          loading: item.loading,
          thumbnail: item.previewUrl,
          previewUrl: item.previewUrl,
          url: item.url,
          icon:
            item.kind === "image" ? undefined : <FileText className="size-4" />,
        })}
        previewEnabled
        onRemove={(id) =>
          setItems((prev) => prev.filter((item) => item.key !== id))
        }
        renderEmpty={() => (
          <div className="text-xs text-muted-foreground">
            暂无附件，点击上方“重置数据”恢复示例。
          </div>
        )}
      />
    </div>
  );
}
