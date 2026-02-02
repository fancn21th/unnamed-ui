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
  url?: string;
};

export default function AttachmentListPreview() {
  const initial = useMemo<DemoAttachment[]>(
    () => [
      {
        key: "img-1",
        kind: "image",
        previewUrl: "https://placehold.co/520x360",
        filename: "preview.png",
      },
      {
        key: "doc-1",
        kind: "file",
        filename: "spec.pdf",
        ext: "PDF",
        sizeLabel: "1.2MB",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        key: "img-2",
        kind: "image",
        previewUrl: "https://placehold.co/480x320",
        filename: "screenshot.jpg",
      },
    ],
    [],
  );
  const [items, setItems] = useState<DemoAttachment[]>(initial);

  return (
    <div className="w-full max-w-2xl space-y-2">
      <div className="text-xs text-muted-foreground">
        点击卡片可预览图片或文件（内置弹层）
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
      />
    </div>
  );
}
