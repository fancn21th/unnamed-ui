"use client";

import { Upload } from "@/registry/wuhan/composed/upload/upload";

export default function UploadRestrictions() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">只允许上传图片</h3>
        <p className="mb-3 text-xs text-[var(--text-tertiary)]">
          accept="image/*"
        </p>
        <Upload accept="image/*" buttonText="选择图片" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">文件大小限制（2MB）</h3>
        <p className="mb-3 text-xs text-[var(--text-tertiary)]">maxSize=2MB</p>
        <Upload
          multiple
          maxSize={2 * 1024 * 1024}
          buttonText="选择文件（≤2MB）"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">最多上传 3 个文件</h3>
        <p className="mb-3 text-xs text-[var(--text-tertiary)]">maxCount=3</p>
        <Upload multiple maxCount={3} buttonText="选择文件（最多3个）" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">
          只允许上传 PDF 和 Word 文档
        </h3>
        <p className="mb-3 text-xs text-[var(--text-tertiary)]">
          accept=".pdf,.doc,.docx"
        </p>
        <Upload accept=".pdf,.doc,.docx" buttonText="选择文档" />
      </div>
    </div>
  );
}
