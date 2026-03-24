"use client";

import {
  FileCard,
  FileCardList,
} from "@/registry/wuhan/composed/file-card/file-card";
import { FileText, Image as ImageIcon, FileCode, Video } from "lucide-react";

export default function FileCardBordered() {
  const files = [
    {
      id: "1",
      title: "项目文档.pdf",
      date: "2024-01-15",
      fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "2",
      title: "设计稿.png",
      date: "2024-01-14",
      fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
    },
    {
      id: "3",
      title: "源代码.tsx",
      date: "2024-01-13",
      fileIcon: <FileCode className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* 单个文件卡片 - 有边框 */}
      <div>
        <h3 className="text-sm font-medium mb-4">单个文件卡片（有边框）</h3>
        <FileCard
          id="single-1"
          title="带边框的文件卡片.pdf"
          date="2024-01-15"
          fileIcon={<FileText className="w-6 h-6 text-blue-500" />}
          bordered
        />
      </div>

      {/* 文件列表 - 有边框 */}
      <div>
        <h3 className="text-sm font-medium mb-4">文件列表（有边框）</h3>
        <FileCardList
          title="带边框的文件列表"
          files={files}
          bordered
          layout="vertical"
        />
      </div>

      {/* 横向布局 - 有边框 */}
      <div>
        <h3 className="text-sm font-medium mb-4">横向布局（有边框）</h3>
        <FileCardList
          title="横向布局"
          files={[
            {
              id: "h1",
              title: "文档.pdf",
              date: "2024-01-15",
              fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
            },
            {
              id: "h2",
              title: "图片.png",
              date: "2024-01-14",
              fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
            },
            {
              id: "h3",
              title: "视频.mp4",
              date: "2024-01-13",
              fileIcon: <Video className="w-6 h-6 text-red-500" />,
            },
          ]}
          bordered
          layout="horizontal"
          spacing={12}
        />
      </div>
    </div>
  );
}
