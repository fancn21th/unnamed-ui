"use client";

import { Upload } from "@/registry/wuhan/composed/upload/upload";

export default function UploadDemo() {
  const handleSelect = (files: File[]) => {
    console.log("Selected files:", files);
  };

  const handleChange = (fileList: any[]) => {
    console.log("File list changed:", fileList);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">单文件上传</h3>
        <Upload
          buttonText="选择文件"
          onSelect={handleSelect}
          onChange={handleChange}
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">多文件上传</h3>
        <Upload
          multiple
          buttonText="选择多个文件"
          onSelect={handleSelect}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
