"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FileCardPrimitive,
  FileCardContainerPrimitive,
  FileCardFileIconPrimitive,
  FileCardStatusIconPrimitive,
  FileCardInfoPrimitive,
  FileCardActionPrimitive,
  FileCardActionPopoverPrimitive,
  FileCardErrorIcon,
  FileCardActionMenuItemProps,
  isValidIcon,
  type FileCardStatus,
} from "@/registry/wuhan/blocks/file-card/file-card-01";
import { MoreHorizontal } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * 文件项类型
 * @public
 *
 * @example
 * ```tsx
 * const file: FileItem = {
 *   id: "1",
 *   title: "项目文档.pdf",
 *   date: "2024-01-15",
 *   fileIcon: <FileIcon className="w-6 h-6" />,
 *   status: "loading",
 * };
 * ```
 */
export interface FileItem {
  /** 唯一标识符 */
  id: string;
  /** 文件标题 */
  title: string;
  /** 文件日期 */
  date?: React.ReactNode;
  /** 文件图标（与 status 互斥） */
  fileIcon?: React.ReactNode;
  /** 状态（loading/error/uploading/warning/success），有值时显示状态图标 */
  status?: FileCardStatus;
  /** 操作菜单项 */
  actionMenuItems?: FileCardActionMenuItemProps[];
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * FileCard 组合组件属性
 * @public
 */
export interface FileCardComposedProps {
  /** 唯一标识符 */
  id: string;
  /** 文件标题 */
  title?: React.ReactNode;
  /** 文件日期 */
  date?: React.ReactNode;
  /** 文件图标（与 status 互斥） */
  fileIcon?: React.ReactNode;
  /** 状态（loading/error/uploading/warning/success），有值时显示状态图标 */
  status?: FileCardStatus;
  /** 选中状态 */
  selected?: boolean;
  /** 操作菜单项 */
  actionMenuItems?: FileCardActionMenuItemProps[];
  /** 是否禁用（禁用时不可交互） */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id: string) => void;
  /** 操作按钮点击回调 */
  onActionClick?: (id: string) => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * FileCardList 组合组件属性
 * @public
 */
export interface FileCardListProps {
  /** 标题 */
  title?: string;
  /** 文件列表数据 */
  files?: FileItem[];
  /** 选中状态 */
  selectedIds?: Set<string> | string[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectionChange?: (selectedIds: Set<string>) => void;
  /** 全选/取消全选回调 */
  onSelectAll?: (select: boolean) => void;
  /** 操作按钮点击回调 */
  onActionClick?: (id: string) => void;
  /** 自定义类名 */
  className?: string;
}

// ==================== 工具函数 ====================

/**
 * 根据状态获取图标
 * @public
 *
 * @example
 * ```tsx
 * const icon = getStatusIcon("loading");
 * const errorIcon = getStatusIcon("error");
 * ```
 */
export function getStatusIcon(status: FileCardStatus): React.ReactNode {
  switch (status) {
    case "loading":
      return (
        <svg
          className="w-6 h-6 animate-spin text-[var(--text-brand)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label="加载中"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    case "error":
      return <FileCardErrorIcon className="w-6 h-6 text-[var(--text-error)]" />;
    case "uploading":
      return (
        <svg
          className="w-6 h-6 animate-pulse text-[var(--text-brand)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label="上传中"
        >
          <path
            fill="currentColor"
            d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-4v4H8v-4H4zm4-8v2h8V8l4 4-4 4v-2H8v-4h4z"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          className="w-6 h-6 text-[var(--text-warning)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="img"
          aria-label="警告"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "success":
      return (
        <svg
          className="w-6 h-6 text-[var(--text-success)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="img"
          aria-label="成功"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
}

// ==================== 主组件：FileCard ====================

/**
 * FileCard 组合组件
 * 提供完整的文件卡片功能，包含 checkbox、图标、标题、日期和操作按钮/菜单
 *
 * @example
 * ```tsx
 * <FileCard
 *   id="file-1"
 *   title="项目文档.pdf"
 *   date="2024-01-15"
 * />
 * ```
 *
 * @public
 */

/**
 * 比较函数：判断 FileCardComposedProps 是否变化
 * @internal
 */
const FileCardCompare = (
  prevProps: FileCardComposedProps,
  nextProps: FileCardComposedProps,
): boolean => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.selected === nextProps.selected &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.title === nextProps.title &&
    prevProps.date === nextProps.date &&
    prevProps.status === nextProps.status &&
    prevProps.fileIcon === nextProps.fileIcon &&
    prevProps.className === nextProps.className
  );
};

export const FileCard = React.memo(
  React.forwardRef<HTMLDivElement, FileCardComposedProps>((props, ref) => {
    const {
      id,
      title,
      date,
      fileIcon,
      status,
      selected = false,
      actionMenuItems,
      disabled = false,
      onSelectChange,
      onActionClick,
      className,
    } = props;

    // 选中状态变化回调
    const handleSelectChange = React.useCallback(
      (checked: boolean) => {
        onSelectChange?.(checked === true, id);
      },
      [id, onSelectChange],
    );

    // 操作按钮点击回调
    const handleActionClick = React.useCallback(() => {
      onActionClick?.(id);
    }, [id, onActionClick]);

    return (
      <FileCardPrimitive
        ref={ref}
        id={id}
        title={title}
        date={date}
        fileIcon={fileIcon}
        status={status}
        selected={selected}
        actionMenuItems={actionMenuItems}
        disabled={disabled}
        onSelectChange={handleSelectChange}
        onActionClick={handleActionClick}
        className={className}
      />
    );
  }),
);
FileCard.displayName = "FileCard";

// ==================== FileCardList 组件 ====================

/**
 * FileCardList 组件属性
 * @public
 */
interface FileCardListComponentProps extends FileCardListProps {
  /** 是否支持多选 */
  multiSelect?: boolean;
}

/**
 * FileCardList 组合组件
 * 展示多个文件卡片列表，支持选中状态管理
 *
 * @example
 * ```tsx
 * const files = [
 *   { id: "1", title: "文档.pdf", date: "2024-01-15" },
 *   { id: "2", title: "图片.png", date: "2024-01-14" },
 * ];
 *
 * <FileCardList title="我的文件" files={files} />
 * ```
 *
 * @public
 */

/**
 * 比较函数：判断 FileCardListComponentProps 是否变化
 * @internal
 */
const FileCardListCompare = (
  prevProps: FileCardListComponentProps,
  nextProps: FileCardListComponentProps,
): boolean => {
  // 比较基本属性
  if (
    prevProps.title !== nextProps.title ||
    prevProps.disabled !== nextProps.disabled ||
    prevProps.multiSelect !== nextProps.multiSelect ||
    prevProps.className !== nextProps.className
  ) {
    return false;
  }

  // 比较 files 数组
  const prevFiles = prevProps.files || [];
  const nextFiles = nextProps.files || [];

  if (prevFiles.length !== nextFiles.length) {
    return false;
  }

  for (let i = 0; i < prevFiles.length; i++) {
    const prevFile = prevFiles[i];
    const nextFile = nextFiles[i];

    if (
      prevFile.id !== nextFile.id ||
      prevFile.title !== nextFile.title ||
      prevFile.date !== nextFile.date ||
      prevFile.status !== nextFile.status ||
      prevFile.disabled !== nextFile.disabled
    ) {
      return false;
    }
  }

  // 比较 selectedIds（简化比较）
  const prevSelected = prevProps.selectedIds;
  const nextSelected = nextProps.selectedIds;

  if (prevSelected === nextSelected) {
    return true;
  }

  if (
    prevSelected instanceof Set &&
    nextSelected instanceof Set &&
    prevSelected.size === nextSelected.size
  ) {
    return true;
  }

  if (
    Array.isArray(prevSelected) &&
    Array.isArray(nextSelected) &&
    prevSelected.length === nextSelected.length
  ) {
    return true;
  }

  return false;
};

export const FileCardList = React.memo(
  React.forwardRef<HTMLDivElement, FileCardListComponentProps>((props, ref) => {
    const {
      title = "文件列表",
      files = [],
      selectedIds = [],
      disabled = false,
      onSelectionChange,
      onSelectAll,
      onActionClick,
      multiSelect = true,
      className,
    } = props;

    // 转换为 Set 以便操作
    const selectedSet = React.useMemo(() => {
      if (selectedIds instanceof Set) return selectedIds;
      return new Set(selectedIds);
    }, [selectedIds]);

    // 处理选中状态变化
    const handleSelectChange = React.useCallback(
      (id: string, checked: boolean) => {
        const newSelected = new Set(selectedSet);
        if (checked) {
          newSelected.add(id);
        } else {
          newSelected.delete(id);
        }
        onSelectionChange?.(newSelected);
      },
      [selectedSet, onSelectionChange],
    );

    // 处理全选/取消全选
    const handleSelectAll = React.useCallback(
      (checked: boolean) => {
        if (checked) {
          const allIds = new Set(files.map((f) => f.id));
          onSelectionChange?.(allIds);
        } else {
          onSelectionChange?.(new Set());
        }
        onSelectAll?.(checked);
      },
      [files, onSelectionChange, onSelectAll],
    );

    // 检查是否全选
    const allSelected = files.length > 0 && selectedSet.size === files.length;

    // 计算选中的数量
    const selectedCount = selectedSet.size;

    return (
      <div ref={ref} className={className}>
        {title && (
          <div className="flex items-center justify-between mb-[var(--margin-com-md)]">
            <h3
              className={cn(
                "font-[var(--font-family-cn)]",
                "font-[var(--font-weight-600)]",
                "font-size-3",
                "leading-[var(--line-height-3)]",
                "text-[var(--text-primary)]",
              )}
            >
              {title}
              {multiSelect && selectedCount > 0 && (
                <span
                  className={cn(
                    "ml-2",
                    "text-sm",
                    "text-[var(--text-tertiary)]",
                  )}
                >
                  ({selectedCount}/{files.length})
                </span>
              )}
            </h3>
            {multiSelect && files.length > 0 && !disabled && (
              <button
                type="button"
                className={cn(
                  "text-sm",
                  "text-[var(--text-brand)]",
                  "hover:underline",
                  "appearance-none",
                  "border-0",
                  "bg-transparent",
                  "p-0",
                  "cursor-pointer",
                )}
                onClick={() => handleSelectAll(!allSelected)}
              >
                {allSelected ? "取消全选" : "全选"}
              </button>
            )}
          </div>
        )}

        {/* 空状态 */}
        {files.length === 0 && (
          <div
            className={cn(
              "flex items-center justify-center",
              "p-8",
              "text-[var(--text-tertiary)]",
              "rounded-[var(--radius-xl)]",
              "bg-[var(--bg-page)]",
            )}
          >
            暂无文件
          </div>
        )}

        {/* 文件列表 */}
        {files.length > 0 && (
          <div
            className={cn("flex flex-col gap-[var(--gap-sm)]")}
            role="list"
            aria-label={typeof title === "string" ? title : "文件列表"}
          >
            {files.map((file) => (
              <FileCard
                key={file.id}
                id={file.id}
                title={file.title}
                date={file.date}
                fileIcon={file.fileIcon}
                status={file.status}
                actionMenuItems={file.actionMenuItems}
                selected={selectedSet.has(file.id)}
                disabled={disabled || file.disabled}
                onSelectChange={(checked) =>
                  handleSelectChange(file.id, checked)
                }
                onActionClick={() => onActionClick?.(file.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }),
);
FileCardList.displayName = "FileCardList";

// ==================== 状态图标导出 ====================

export { FileCardErrorIcon };

// ==================== 类型导出（仅内部使用）====================

// 注意：FileItem, FileCardStatus, FileCardActionMenuItemProps 仅在 composed 组件内部使用
