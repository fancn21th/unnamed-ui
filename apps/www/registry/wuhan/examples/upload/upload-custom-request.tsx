"use client";

import {
  Upload,
  type UploadFile,
} from "@/registry/wuhan/composed/upload/upload";

export default function UploadCustomRequest() {
  // 模拟上传请求
  const handleUpload = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 模拟随机成功/失败
        if (Math.random() > 0.3) {
          resolve({
            url: `https://example.com/files/${file.name}`,
            id: Math.random().toString(36).substr(2, 9),
          });
        } else {
          reject(new Error("网络错误，上传失败"));
        }
      }, 2000);
    });
  };

  const handleChange = (fileList: UploadFile[]) => {
    console.log("Current file list:", fileList);
  };

  return (
    <div className="w-full max-w-md">
      <Upload
        multiple
        buttonText="上传到服务器"
        customRequest={handleUpload}
        onChange={handleChange}
      />
    </div>
  );
}
