"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { MoreHorizontal, File as FileIcon, LoaderCircle } from "lucide-react";
import {
  CheckboxRootPrimitive,
  CheckboxIndicatorPrimitive,
} from "@/registry/wuhan/blocks/checkbox/checkbox-01";

// ==================== 类型定义 ====================

/**
 * 文件卡片状态类型
 * @public
 *
 * @example
 * ```tsx
 * // 基本状态
 * type Status1 = "loading" | "error";
 *
 * // 扩展状态
 * type Status2 = "loading" | "error" | "uploading" | "warning" | "success";
 * ```
 */
export type FileCardStatus =
  | "loading"
  | "error"
  | "uploading"
  | "warning"
  | "success";

/**
 * 有效的文件卡片状态列表
 * @internal
 */
const VALID_FILE_CARD_STATUSES: readonly FileCardStatus[] = [
  "loading",
  "error",
  "uploading",
  "warning",
  "success",
] as const;

/**
 * 解析状态，处理 undefined/null/无效值情况
 * @param status - 输入的状态值
 * @returns 有效的 FileCardStatus
 * @internal
 */
const resolveStatus = (
  status: FileCardStatus | undefined | null,
): FileCardStatus => {
  if (
    status !== undefined &&
    status !== null &&
    VALID_FILE_CARD_STATUSES.includes(status as FileCardStatus)
  ) {
    return status as FileCardStatus;
  }
  // 默认状态
  return "loading";
};

/**
 * 检查是否是有效的 React 节点
 * @internal
 */
const isValidIcon = (icon: React.ReactNode): icon is React.ReactElement => {
  return icon !== null && icon !== undefined && icon !== false;
};

/**
 * 文件卡片容器原语属性
 * @public
 */
export interface FileCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用（禁用时不可交互） */
  disabled?: boolean;
}

/**
 * 文件图标原语属性
 * @public
 */
export interface FileCardFileIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 文件图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * 状态图标原语属性
 * @public
 */
export interface FileCardStatusIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 状态图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * 文件信息原语属性
 * @public
 */
export interface FileCardInfoPrimitiveProps {
  /** 文件标题 */
  title?: React.ReactNode;
  /** 文件日期 */
  date?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * 操作菜单项属性
 * @public
 */
export interface FileCardActionMenuItemProps {
  /** 唯一标识（必填，用于列表识别和事件处理） */
  key: string;
  /** 显示文本 */
  label: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 危险操作样式 */
  danger?: boolean;
}

/**
 * 操作按钮原语属性
 * @public
 */
export interface FileCardActionPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 按钮图标 */
  icon?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮的 aria-label */
  "aria-label"?: string;
}

/**
 * 操作弹出菜单原语属性
 * @public
 */
export interface FileCardActionPopoverPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 菜单项 */
  items?: FileCardActionMenuItemProps[];
  /** 是否打开 */
  open?: boolean;
  /** 打开状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 触发器图标 */
  triggerIcon?: React.ReactNode;
  /** 触发器是否禁用 */
  disabled?: boolean;
  /** 触发器的 aria-label */
  "aria-label"?: string;
}

/**
 * 文件卡片完整原语属性
 * @public
 *
 * @example
 * ```tsx
 * <FileCardPrimitive
 *   id="file-1"
 *   title="项目文档.pdf"
 *   date="2024-01-15"
 *   selected={true}
 *   onSelectChange={(selected, id) => console.log(selected, id)}
 *   actionMenuItems={[
 *     { key: 'download', label: '下载' },
 *     { key: 'delete', label: '删除', danger: true },
 *   ]}
 * />
 * ```
 */
export interface FileCardPrimitiveProps {
  /** 唯一标识（必填，用于列表中的识别和事件回调） */
  id: string;
  /** 文件标题 */
  title?: React.ReactNode;
  /** 文件日期 */
  date?: React.ReactNode;
  /** 文件图标（与 status 互斥，有 status 时优先显示状态图标） */
  fileIcon?: React.ReactNode;
  /** 状态（loading/error/uploading/warning/success），有值时显示状态图标，否则显示文件图标 */
  status?: FileCardStatus;
  /** 选中状态 */
  selected?: boolean;
  /** 是否禁用（禁用时不可交互） */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id: string) => void;
  /** 操作按钮点击回调 */
  onActionClick?: (id: string) => void;
  /** 操作菜单项 */
  actionMenuItems?: FileCardActionMenuItemProps[];
  /** 容器点击回调 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== 容器类原语 ====================

/**
 * 文件卡片容器原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardContainerPrimitive selected>
 *   <FileCardFileIconPrimitive />
 *   <FileCardInfoPrimitive title="文件.pdf" date="2024-01-15" />
 * </FileCardContainerPrimitive>
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardContainerPrimitiveCompare = (
  prevProps: FileCardContainerPrimitiveProps,
  nextProps: FileCardContainerPrimitiveProps,
): boolean => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.className === nextProps.className &&
    prevProps.children === nextProps.children
  );
};

export const FileCardContainerPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardContainerPrimitiveProps>(
    (
      { children, selected, disabled = false, className, onClick, ...props },
      ref,
    ) => {
      const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 禁用状态下不触发点击
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      };

      return (
        <div
          ref={ref}
          role="listitem"
          aria-selected={selected}
          aria-disabled={disabled}
          className={cn(
            // 基础布局 - 响应式最小宽度
            "min-w-[180px] sm:min-w-[200px]",
            "flex flex-row",
            "items-center",
            "gap-[var(--gap-md)]",
            "rounded-[var(--radius-xl)]",
            "p-[var(--padding-com-md)]",
            "transition-all duration-200",
            // 交互状态
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            // hover 状态（非禁用）
            !disabled && "hover:bg-[var(--bg-neutral-light)]",
            // selected 状态
            selected && "bg-[var(--bg-brand-light)]",
            // 焦点状态（非禁用）
            !disabled &&
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            // 分组，用于子元素 hover 状态
            "group",
            className,
          )}
          onClick={handleClick}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            // 禁用状态下不响应键盘事件
            if (disabled) return;
            // 支持 Enter 和 Space 触发行点击
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              // 触发父容器的点击事件
              e.currentTarget.click();
            }
          }}
          {...props}
        >
          {children}
        </div>
      );
    },
  ),
);
FileCardContainerPrimitive.displayName = "FileCardContainerPrimitive";

// ==================== 图标类原语 ====================

/**
 * 文件图标原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardFileIconPrimitive icon={<FileIcon className="w-6 h-6" />} />
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardFileIconPrimitiveCompare = (
  prevProps: FileCardFileIconPrimitiveProps,
  nextProps: FileCardFileIconPrimitiveProps,
): boolean => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.className === nextProps.className
  );
};

export const FileCardFileIconPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardFileIconPrimitiveProps>(
    ({ icon, className, ...props }, ref) => {
      // 安全渲染图标
      const renderIcon = () => {
        if (!isValidIcon(icon)) {
          return <FileIcon className="w-6 h-6 text-[var(--text-secondary)]" />;
        }
        return React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
              size: 24,
            })
          : icon;
      };

      return (
        <div
          ref={ref}
          className={cn(
            "w-10 h-10",
            "flex items-center justify-center",
            "rounded-[var(--radius-lg)]",
            "bg-[var(--bg-neutral-light)]",
            "flex-shrink-0",
            "overflow-hidden",
            className,
          )}
          aria-hidden="true"
          {...props}
        >
          {renderIcon()}
        </div>
      );
    },
  ),
);
FileCardFileIconPrimitive.displayName = "FileCardFileIconPrimitive";

/**
 * 状态图标原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardStatusIconPrimitive icon={<CheckCircle className="w-6 h-6" />} />
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardStatusIconPrimitiveCompare = (
  prevProps: FileCardStatusIconPrimitiveProps,
  nextProps: FileCardStatusIconPrimitiveProps,
): boolean => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.className === nextProps.className
  );
};

export const FileCardStatusIconPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardStatusIconPrimitiveProps>(
    ({ icon, className, ...props }, ref) => {
      // 安全渲染图标
      const renderIcon = () => {
        if (!isValidIcon(icon)) {
          return null;
        }
        return React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
              size: 24,
            })
          : icon;
      };

      return (
        <div
          ref={ref}
          className={cn(
            "w-10 h-10",
            "flex items-center justify-center",
            "rounded-[var(--radius-lg)]",
            "bg-[var(--bg-container-placeholder)]",
            "flex-shrink-0",
            "overflow-hidden",
            className,
          )}
          aria-hidden="true"
          {...props}
        >
          {renderIcon()}
        </div>
      );
    },
  ),
);
FileCardStatusIconPrimitive.displayName = "FileCardStatusIconPrimitive";

// ==================== 信息类原语 ====================

/**
 * 文件信息原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardInfoPrimitive title="文件.pdf" date="2024-01-15" />
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardInfoPrimitiveCompare = (
  prevProps: FileCardInfoPrimitiveProps,
  nextProps: FileCardInfoPrimitiveProps,
): boolean => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.date === nextProps.date &&
    prevProps.className === nextProps.className
  );
};

export const FileCardInfoPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardInfoPrimitiveProps>(
    ({ title, date, className, ...props }, ref) => {
      // 检查是否至少有一个内容
      const hasContent = isValidIcon(title) || isValidIcon(date);

      if (!hasContent) {
        return (
          <div
            ref={ref}
            className={cn("flex-1 min-w-0", className)}
            aria-hidden="true"
            {...props}
          />
        );
      }

      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col flex-1 min-w-0 gap-[var(--gap-xs)]",
            className,
          )}
          {...props}
        >
          {/* 文件标题 */}
          {isValidIcon(title) && (
            <span
              className={cn(
                "font-[var(--font-family-cn)]",
                "font-[var(--font-weight-400)]",
                "font-size-2",
                "leading-[var(--line-height-2)]",
                "text-[var(--text-primary)]",
                "truncate",
              )}
            >
              {title}
            </span>
          )}

          {/* 文件日期 */}
          {isValidIcon(date) && (
            <span
              className={cn(
                "font-[var(--font-family-cn)]",
                "font-[var(--font-weight-400)]",
                "font-size-1",
                "leading-[var(--line-height-1)]",
                "text-[var(--text-tertiary)]",
                "truncate",
              )}
            >
              {date}
            </span>
          )}
        </div>
      );
    },
  ),
);
FileCardInfoPrimitive.displayName = "FileCardInfoPrimitive";

// ==================== 操作按钮原语 ====================

/**
 * 操作按钮原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardActionPrimitive
 *   icon={<MoreHorizontal className="w-4 h-4" />}
 *   onClick={() => handleAction(id)}
 * />
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardActionPrimitiveCompare = (
  prevProps: FileCardActionPrimitiveProps,
  nextProps: FileCardActionPrimitiveProps,
): boolean => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.className === nextProps.className &&
    prevProps["aria-label"] === nextProps["aria-label"]
  );
};

export const FileCardActionPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardActionPrimitiveProps>(
    (
      {
        icon,
        onClick,
        disabled = false,
        "aria-label": ariaLabel = "操作",
        className,
        ...props
      },
      ref,
    ) => {
      const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 禁用状态下不触发点击
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.();
      };

      // 渲染图标
      const renderIcon = () => {
        if (!isValidIcon(icon)) {
          return (
            <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
          );
        }

        return React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
              size: 16,
            })
          : icon;
      };

      return (
        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          className={cn(
            "w-6 h-6",
            "flex items-center justify-center",
            "rounded-[var(--radius-md)]",
            "p-[var(--gap-xs)]",
            "transition-all duration-200",
            "flex-shrink-0",
            // 基础背景 - hover 卡片时显示
            "bg-[var(--bg-neutral-light-hover)]",
            // 默认隐藏
            "opacity-0",
            // hover 卡片时显示
            "group-hover/file-card:opacity-100",
            // hover 时颜色加深
            "group-hover/file-card:hover:bg-[var(--bg-neutral-light)]",
            // 禁用状态
            disabled && "cursor-not-allowed opacity-50",
            // 焦点状态（非禁用）
            !disabled &&
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
            className,
          )}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          {...props}
        >
          {renderIcon()}
        </div>
      );
    },
  ),
);
FileCardActionPrimitive.displayName = "FileCardActionPrimitive";

// ==================== 操作弹出菜单原语 ====================

/**
 * 操作弹出菜单原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardActionPopoverPrimitive
 *   items={[
 *     { key: 'download', label: '下载', icon: <DownloadIcon /> },
 *     { key: 'delete', label: '删除', icon: <DeleteIcon />, danger: true },
 *   ]}
 *   onOpenChange={(open) => setOpen(open)}
 * />
 * ```
 */

/**
 * 比较函数：判断 props 是否变化
 * @internal
 */
const FileCardActionPopoverPrimitiveCompare = (
  prevProps: FileCardActionPopoverPrimitiveProps,
  nextProps: FileCardActionPopoverPrimitiveProps,
): boolean => {
  // 比较 items 数组
  const prevItems = prevProps.items || [];
  const nextItems = nextProps.items || [];

  if (prevItems.length !== nextItems.length) {
    return false;
  }

  for (let i = 0; i < prevItems.length; i++) {
    const prevItem = prevItems[i];
    const nextItem = nextItems[i];

    if (
      prevItem.key !== nextItem.key ||
      prevItem.label !== nextItem.label ||
      prevItem.disabled !== nextItem.disabled ||
      prevItem.danger !== nextItem.danger ||
      prevItem.className !== nextItem.className
    ) {
      return false;
    }
  }

  return (
    prevProps.open === nextProps.open &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.className === nextProps.className &&
    prevProps.triggerIcon === nextProps.triggerIcon
  );
};

export const FileCardActionPopoverPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardActionPopoverPrimitiveProps>(
    (
      {
        items = [],
        open,
        onOpenChange,
        triggerIcon,
        disabled = false,
        "aria-label": ariaLabel = "操作菜单",
        className,
      },
      ref,
    ) => {
      const isControlled = open !== undefined;
      const [localOpen, setLocalOpen] = React.useState(false);
      const openValue = isControlled ? open : localOpen;

      const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
          if (!isControlled) {
            setLocalOpen(newOpen);
          }
          onOpenChange?.(newOpen);
        },
        [isControlled, onOpenChange],
      );

      // 渲染菜单项
      const renderMenuItems = React.useCallback(() => {
        if (items.length === 0) {
          return null;
        }

        return items.map((item, index) => {
          const handleItemClick = () => {
            if (item.disabled) return;
            item.onClick?.();
            // 点击菜单项后关闭菜单
            handleOpenChange(false);
          };

          return (
            <div
              key={item.key ?? index}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled}
              className={cn(
                // 基础布局
                "flex items-center",
                "gap-[var(--gap-sm)]",
                "px-3",
                "py-2",
                "rounded-[var(--radius-md)]",
                "cursor-pointer",
                // 文字样式
                "font-[var(--font-family-cn)]",
                "font-[var(--font-weight-400)]",
                "font-size-2",
                "leading-[var(--line-height-2)]",
                // 交互状态
                item.disabled
                  ? "text-[var(--text-tertiary)] cursor-not-allowed opacity-50"
                  : "text-[var(--text-primary)] hover:bg-[var(--bg-neutral-light)]",
                // 危险操作样式
                item.danger && !item.disabled && "text-[var(--text-error)]",
                item.className,
              )}
              onClick={handleItemClick}
              onKeyDown={(e) => {
                if (item.disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick();
                }
              }}
            >
              {/* 图标 */}
              {isValidIcon(item.icon) && (
                <span
                  className={cn(
                    "flex-shrink-0",
                    "w-4 h-4",
                    item.danger && !item.disabled
                      ? "text-[var(--text-error)]"
                      : "text-[var(--text-secondary)]",
                  )}
                >
                  {React.isValidElement(item.icon)
                    ? React.cloneElement(
                        item.icon as React.ReactElement<{ size?: number }>,
                        { size: 16 },
                      )
                    : item.icon}
                </span>
              )}
              {/* 文本 */}
              <span className="flex-1">{item.label}</span>
            </div>
          );
        });
      }, [items, handleOpenChange]);

      return (
        <PopoverPrimitive.Root open={openValue} onOpenChange={handleOpenChange}>
          <PopoverPrimitive.Trigger asChild>
            <div
              ref={ref}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={ariaLabel}
              aria-disabled={disabled}
              className={cn(
                "w-6 h-6",
                "flex items-center justify-center",
                "rounded-[var(--radius-md)]",
                "p-[var(--gap-xs)]",
                "transition-all duration-200",
                "flex-shrink-0",
                // 基础背景 - hover 卡片时显示
                "bg-[var(--bg-neutral-light-hover)]",
                // 默认隐藏
                "opacity-0",
                // hover 卡片时显示
                "group-hover/file-card:opacity-100",
                // 禁用状态
                disabled && "cursor-not-allowed opacity-50",
                // 焦点状态（非禁用）
                !disabled &&
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                className,
              )}
              onMouseEnter={() => !disabled && handleOpenChange(true)}
              onMouseLeave={() => handleOpenChange(false)}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenChange(!openValue);
                }
              }}
            >
              {isValidIcon(triggerIcon) ? (
                React.cloneElement(
                  triggerIcon as React.ReactElement<{ size?: number }>,
                  { size: 16 },
                )
              ) : (
                <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
              )}
            </div>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Content
            className={cn(
              "z-50",
              "min-w-[120px]",
              "rounded-[var(--radius-lg)]",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "shadow-lg",
              "p-1",
              // 动画
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            )}
            sideOffset={4}
            align="end"
            onMouseEnter={() => handleOpenChange(true)}
            onMouseLeave={() => handleOpenChange(false)}
          >
            <div
              role="menu"
              className={cn("flex flex-col gap-[var(--gap-xs)]")}
            >
              {renderMenuItems()}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      );
    },
  ),
);
FileCardActionPopoverPrimitive.displayName = "FileCardActionPopoverPrimitive";

// ==================== 完整 FileCard 原语 ====================

/**
 * 文件卡片完整原语
 * @public
 *
 * @example
 * ```tsx
 * <FileCardPrimitive
 *   id="file-1"
 *   title="项目文档.pdf"
 *   date="2024-01-15"
 *   selected={true}
 *   onSelectChange={(selected, id) => console.log(selected, id)}
 *   actionMenuItems={[
 *     { key: 'download', label: '下载' },
 *     { key: 'delete', label: '删除', danger: true },
 *   ]}
 * />
 * ```
 */

/**
 * 比较函数：判断 FileCardPrimitiveProps 是否变化
 * @internal
 */
const FileCardPrimitiveCompare = (
  prevProps: FileCardPrimitiveProps,
  nextProps: FileCardPrimitiveProps,
): boolean => {
  // 比较基本属性
  if (
    prevProps.id !== nextProps.id ||
    prevProps.selected !== nextProps.selected ||
    prevProps.disabled !== nextProps.disabled ||
    prevProps.className !== nextProps.className ||
    prevProps.title !== nextProps.title ||
    prevProps.date !== nextProps.date ||
    prevProps.status !== nextProps.status ||
    prevProps.fileIcon !== nextProps.fileIcon
  ) {
    return false;
  }

  // 比较 actionMenuItems 数组
  const prevItems = prevProps.actionMenuItems || [];
  const nextItems = nextProps.actionMenuItems || [];

  if (prevItems.length !== nextItems.length) {
    return false;
  }

  for (let i = 0; i < prevItems.length; i++) {
    const prevItem = prevItems[i];
    const nextItem = nextItems[i];

    if (
      prevItem.key !== nextItem.key ||
      prevItem.label !== nextItem.label ||
      prevItem.disabled !== nextItem.disabled ||
      prevItem.danger !== nextItem.danger ||
      prevItem.className !== nextItem.className
    ) {
      return false;
    }
  }

  return true;
};

export const FileCardPrimitive = React.memo(
  React.forwardRef<HTMLDivElement, FileCardPrimitiveProps>(
    (
      {
        id,
        title,
        date,
        fileIcon,
        status,
        selected = false,
        disabled = false,
        onSelectChange,
        onActionClick,
        actionMenuItems,
        className,
        style,
        onClick,
        ...props
      },
      ref,
    ) => {
      // 解析状态
      const resolvedStatus = React.useMemo(
        () => resolveStatus(status),
        [status],
      );
      const hasStatus = status !== undefined;

      // 状态图标映射
      const statusIconMap: Record<FileCardStatus, React.ReactNode> = {
        loading: (
          <LoaderCircle
            className="w-6 h-6 animate-spin text-[var(--text-brand)]"
            aria-label="加载中"
          />
        ),
        error: (
          <FileCardErrorIcon className="w-6 h-6 text-[var(--text-error)]" />
        ),
        uploading: (
          <LoaderCircle
            className="w-6 h-6 animate-pulse text-[var(--text-brand)]"
            aria-label="上传中"
          />
        ),
        warning: (
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
        ),
        success: (
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
        ),
      };

      // 确定显示哪个图标（状态图标优先）
      const displayIcon = hasStatus ? (
        <FileCardStatusIconPrimitive icon={statusIconMap[resolvedStatus]} />
      ) : (
        isValidIcon(fileIcon) && <FileCardFileIconPrimitive icon={fileIcon} />
      );

      // 处理 checkbox 变化
      const handleCheckboxChange = React.useCallback(
        (checked: boolean) => {
          if (disabled) return;
          onSelectChange?.(checked === true, id);
        },
        [disabled, id, onSelectChange],
      );

      // 处理操作按钮点击
      const handleActionClick = React.useCallback(() => {
        if (disabled) return;
        onActionClick?.(id);
      }, [disabled, id, onActionClick]);

      // 处理容器点击
      const handleContainerClick = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        },
        [disabled, onClick],
      );

      // 是否有操作菜单
      const hasActionMenu = actionMenuItems && actionMenuItems.length > 0;

      // 本地管理 popover 状态
      const [popoverOpen, setPopoverOpen] = React.useState(false);

      return (
        <FileCardContainerPrimitive
          ref={ref}
          selected={selected}
          disabled={disabled}
          className={cn("group/file-card", className)}
          style={style}
          onClick={handleContainerClick}
          aria-label={typeof title === "string" ? title : "文件卡片"}
          {...props}
        >
          {/* Checkbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            role="checkbox"
            aria-checked={selected}
            aria-disabled={disabled}
            className={cn(
              "flex-shrink-0",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <CheckboxRootPrimitive
              checked={selected}
              disabled={disabled}
              onCheckedChange={handleCheckboxChange}
            >
              <CheckboxIndicatorPrimitive />
            </CheckboxRootPrimitive>
          </div>

          {/* 图标（状态图标和文件图标互斥） */}
          {displayIcon}

          {/* 文件信息 */}
          <FileCardInfoPrimitive title={title} date={date} />

          {/* 操作按钮或操作弹出菜单 */}
          {hasActionMenu ? (
            <FileCardActionPopoverPrimitive
              items={actionMenuItems}
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
              disabled={disabled}
              aria-label={`操作: ${typeof title === "string" ? title : ""}`}
            />
          ) : (
            <FileCardActionPrimitive
              onClick={handleActionClick}
              disabled={disabled}
              aria-label={`操作: ${typeof title === "string" ? title : ""}`}
            />
          )}
        </FileCardContainerPrimitive>
      );
    },
  ),
);
FileCardPrimitive.displayName = "FileCardPrimitive";

// ==================== 默认状态图标 ====================

/**
 * 错误状态图标
 * @public
 *
 * @example
 * ```tsx
 * <FileCardErrorIcon className="w-6 h-6 text-[var(--text-error)]" />
 * ```
 */
export const FileCardErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img"
    aria-label="错误"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// ==================== 工具函数导出 ====================

export { resolveStatus, isValidIcon };
