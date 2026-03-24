"use client";

import { FileCardList } from "@/registry/wuhan/composed/file-card/file-card";
import { FileText, Image as ImageIcon, FileCode } from "lucide-react";

export default function FileCardListCustomSpacing() {
  const files = [
    {
      id: "1",
      title: "文档A.pdf",
      date: "2024-01-15",
      fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "2",
      title: "图片B.png",
      date: "2024-01-14",
      fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
    },
    {
      id: "3",
      title: "代码C.tsx",
      date: "2024-01-13",
      fileIcon: <FileCode className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-8">
      <FileCardList
        title="紧凑间距 (8px)"
        files={files}
        layout="vertical"
        spacing={8}
      />

      <FileCardList
        title="宽松间距 (32px)"
        files={files}
        layout="vertical"
        spacing={32}
      />
    </div>
  );
}
