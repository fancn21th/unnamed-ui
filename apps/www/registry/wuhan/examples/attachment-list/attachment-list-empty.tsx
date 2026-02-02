"use client";

import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";

export default function AttachmentListEmpty() {
  return (
    <div className="w-full max-w-2xl">
      <AttachmentListComposed
        items={[]}
        renderEmpty={() => (
          <div className="text-xs text-muted-foreground">
            暂无附件，先上传一份文件吧。
          </div>
        )}
      />
    </div>
  );
}
