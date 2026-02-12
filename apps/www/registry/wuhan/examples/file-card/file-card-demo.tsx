"use client";

import * as React from "react";
import {
  FileCardPrimitive,
  FileCardContainerPrimitive,
  FileCardFileIconPrimitive,
  FileCardStatusIconPrimitive,
  FileCardInfoPrimitive,
  FileCardActionPrimitive,
  FileCardActionPopoverPrimitive,
  FileCardActionMenuItemProps,
  FileCardErrorIcon,
} from "@/registry/wuhan/blocks/file-card/file-card-01";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  MoreHorizontal,
  Download,
  Trash2,
  Eye,
  Copy,
} from "lucide-react";

/**
 * File Card 示例数据
 */
const fileExamples = [
  {
    id: "1",
    title: "项目需求文档.pdf",
    date: "2024-01-15 10:30",
    fileIcon: <FileText className="w-6 h-6 text-[var(--text-brand)]" />,
  },
  {
    id: "2",
    title: "设计稿.png",
    date: "2024-01-14 15:20",
    fileIcon: <FileImage className="w-6 h-6 text-[var(--text-success)]" />,
  },
  {
    id: "3",
    title: "数据统计表.xlsx",
    date: "2024-01-13 09:45",
    fileIcon: (
      <FileSpreadsheet className="w-6 h-6 text-[var(--text-warning)]" />
    ),
  },
] as const;

// 默认操作菜单项
const defaultActionMenuItems: FileCardActionMenuItemProps[] = [
  {
    key: "preview",
    label: "预览",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    key: "download",
    label: "下载",
    icon: <Download className="w-4 h-4" />,
  },
  {
    key: "copy",
    label: "复制链接",
    icon: <Copy className="w-4 h-4" />,
  },
  {
    key: "delete",
    label: "删除",
    icon: <Trash2 className="w-4 h-4" />,
    danger: true,
  },
];

export default function FileCardDemo() {
  const [selectedFiles, setSelectedFiles] = React.useState<Set<string>>(
    new Set(),
  );

  const toggleSelect = React.useCallback((id: string) => {
    setSelectedFiles((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const handleMenuAction = React.useCallback(
    (action: string, fileId: string) => {
      console.log(`Action: ${action}, FileId: ${fileId}`);
    },
    [],
  );

  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-4">
      {/* 标题 */}
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        File Card 组件示例
      </h2>

      {/* 带操作菜单的文件卡片 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          带操作菜单的文件卡片
        </h3>
        {fileExamples.map((file) => (
          <FileCardPrimitive
            key={file.id}
            id={file.id}
            title={file.title}
            date={file.date}
            fileIcon={file.fileIcon}
            selected={selectedFiles.has(file.id)}
            actionMenuItems={defaultActionMenuItems.map((item) => ({
              ...item,
              onClick: () => handleMenuAction(item.key ?? "", file.id),
            }))}
            onSelectChange={() => toggleSelect(file.id)}
          />
        ))}
      </div>

      {/* 不同状态展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          不同状态
        </h3>
        <FileCardPrimitive
          id="status-loading"
          title="加载中的文件.pdf"
          date="2024-01-15 10:30"
          fileIcon={<FileText className="w-6 h-6 text-[var(--text-brand)]" />}
          status="loading"
          actionMenuItems={defaultActionMenuItems}
        />
        <FileCardPrimitive
          id="status-error"
          title="失败文件.jpg"
          date="2024-01-14 15:20"
          fileIcon={<FileImage className="w-6 h-6 text-[var(--text-brand)]" />}
          status="error"
          actionMenuItems={defaultActionMenuItems}
        />
      </div>

      {/* 选中状态展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          选中状态
        </h3>
        <FileCardPrimitive
          id="selected-demo"
          title="已选中的文件.pdf"
          date="2024-01-15 10:30"
          selected={true}
          actionMenuItems={defaultActionMenuItems}
          onSelectChange={(checked) => console.log("Selected:", checked)}
        />
      </div>

      {/* 禁用状态展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          禁用状态
        </h3>
        <FileCardPrimitive
          id="disabled-demo"
          title="禁用的文件.pdf"
          date="2024-01-15 10:30"
          disabled={true}
          actionMenuItems={defaultActionMenuItems}
        />
      </div>

      {/* 无操作菜单的卡片 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          简单操作按钮
        </h3>
        <FileCardPrimitive
          id="simple-action"
          title="简单操作.pdf"
          date="2024-01-15 10:30"
          onActionClick={() => console.log("Action clicked")}
        />
      </div>

      {/* 原语组件展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          原语组件组合
        </h3>
        <FileCardContainerPrimitive>
          <FileCardFileIconPrimitive
            icon={<FileText className="w-6 h-6 text-[var(--text-brand)]" />}
          />
          <FileCardInfoPrimitive title="使用原语组件" date="2024-01-15 10:30" />
          <FileCardActionPopoverPrimitive
            items={[
              {
                key: "action1",
                label: "操作1",
                icon: <Download className="w-4 h-4" />,
              },
              { key: "action2", label: "操作2", danger: true },
            ]}
          />
        </FileCardContainerPrimitive>
      </div>
    </div>
  );
}
