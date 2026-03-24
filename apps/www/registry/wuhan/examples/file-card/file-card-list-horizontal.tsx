"use client";

import { FileCardList } from "@/registry/wuhan/composed/file-card/file-card";
import { FileText, Image as ImageIcon, FileCode, Video } from "lucide-react";

export default function FileCardListHorizontal() {
  const files = [
    {
      id: "1",
      title: "文档.pdf",
      date: "2024-01-15",
      fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "2",
      title: "图片.png",
      date: "2024-01-14",
      fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
    },
    {
      id: "3",
      title: "代码.tsx",
      date: "2024-01-13",
      fileIcon: <FileCode className="w-6 h-6 text-purple-500" />,
    },
    {
      id: "4",
      title: "视频.mp4",
      date: "2024-01-12",
      fileIcon: <Video className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <FileCardList
      title="横向布局文件列表"
      files={files}
      layout="horizontal"
      spacing={12}
    />
  );
}
