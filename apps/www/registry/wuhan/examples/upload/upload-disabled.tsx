"use client";

import { Upload } from "@/registry/wuhan/composed/upload/upload";

export default function UploadDisabled() {
  return (
    <div className="w-full max-w-md">
      <Upload disabled buttonText="上传已禁用" />
    </div>
  );
}
