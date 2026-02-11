"use client";

import * as React from "react";
import {
  Upload,
  type UploadFile,
} from "@/registry/wuhan/composed/upload/upload";

export default function UploadControlled() {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    console.log("Removing file:", file.name);
  };

  const handleClear = () => {
    setFileList([]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <Upload
        fileList={fileList}
        multiple
        onChange={handleChange}
        onRemove={handleRemove}
      />

      <div className="flex items-center gap-4 text-sm">
        <span className="text-[var(--text-tertiary)]">
          已选择 {fileList.length} 个文件
        </span>
        {fileList.length > 0 && (
          <button
            onClick={handleClear}
            className="text-[var(--text-brand)] hover:underline"
          >
            清空列表
          </button>
        )}
      </div>
    </div>
  );
}
