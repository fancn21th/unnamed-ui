"use client";

import { FileCardList } from "@/registry/wuhan/composed/file-card/file-card";
import { FileText, Image as ImageIcon, FileCode } from "lucide-react";

export default function FileCardListVertical() {
  const files = [
    {
      id: "1",
      title: "需求文档.pdf",
      date: "2024-01-15",
      fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "2",
      title: "UI设计.png",
      date: "2024-01-14",
      fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
    },
    {
      id: "3",
      title: "实现代码.tsx",
      date: "2024-01-13",
      fileIcon: <FileCode className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <FileCardList
      title="纵向布局文件列表"
      files={files}
      layout="vertical"
      spacing={20}
    />
  );
}
