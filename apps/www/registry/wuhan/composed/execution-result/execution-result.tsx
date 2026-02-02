"use client";

import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  XCircle,
  Circle,
} from "lucide-react";
import * as React from "react";
import {
  ExecutionResultContainerPrimitive,
  ExecutionResultTitlePrimitive,
  ExecutionResultContentPrimitive,
  ExecutionResultItemPrimitive,
  ExecutionResultItemHeaderPrimitive,
  ExecutionResultItemIconPrimitive,
  ExecutionResultItemTitlePrimitive,
  ExecutionResultItemImagePrimitive,
  ExecutionResultItemToolNamePrimitive,
  ExecutionResultItemContentPrimitive,
  ExecutionResultSectionPrimitive,
  ExecutionResultArrowPrimitive,
} from "@/registry/wuhan/blocks/execution-result/execution-result-01";

/**
 * 执行结果状态类型
 * @public
 */
export type ExecutionResultStatus = "success" | "error" | "loading" | "idle";

/**
 * 执行结果区块配置
 * 用于配置单个执行项中的请求/响应等区块信息
 * @public
 */
export interface ExecutionResultSection {
  /** 区块标题（如"请求来自 xxx"、"响应来自 xxx"） */
  title?: React.ReactNode;
  /** 区块内容 */
  content?: React.ReactNode;
  /** 复制按钮要复制的文本内容 */
  copyText?: string;
  /** 是否显示复制图标 */
  showCopyIcon?: boolean;
  /** 自定义复制回调函数 */
  onCopy?: () => void;
}

/**
 * 执行结果列表项配置
 * 表示单个执行项（如API调用、函数执行等）
 * @public
 */
export interface ExecutionResultItem {
  /** 列表项唯一标识 */
  key?: React.Key;
  /** 执行状态：success（成功）、error（失败）、loading（执行中）、idle（待执行） */
  status?: ExecutionResultStatus;
  /** 列表项标题 */
  title?: React.ReactNode;
  /** 工具/函数名称 */
  toolName?: React.ReactNode;
  /** 工具图标图片地址 */
  imageSrc?: string;
  /** 工具图标图片 alt 文本 */
  imageAlt?: string;
  /** 是否默认展开详情 */
  defaultOpen?: boolean;
  /** 区块列表（请求、响应等） */
  sections?: ExecutionResultSection[];
}

/**
 * 执行结果组件属性
 * @public
 */
export interface ExecutionResultProps {
  /** 整体标题（如"已执行完成，调用3个组件"） */
  title?: React.ReactNode;
  /** 执行结果列表项 */
  items?: ExecutionResultItem[];
  /** 非受控模式下的默认展开状态 */
  defaultOpen?: boolean;
  /** 受控模式下的展开状态 */
  open?: boolean;
  /** 展开状态变化回调函数 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义展开/收起箭头图标 */
  arrowIcon?: React.ReactNode;
}

/** 状态对应的默认图标映射 */
const statusIconMap: Record<ExecutionResultStatus, React.ReactNode> = {
  success: <CheckCircle2 className="size-4 text-[var(--text-success)]" />,
  error: <XCircle className="size-4 text-[var(--text-error)]" />,
  loading: <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />,
  idle: <Circle className="size-4 text-[var(--text-tertiary)]" />,
};
/** 默认箭头图标 */
const defaultArrow = <ChevronDown className="size-4" />;

/**
 * 执行结果组件
 *
 * 用于展示函数调用、API 请求等执行结果，支持成功、失败、执行中等多种状态。
 * 每个执行项可包含多个区块（如请求、响应），支持展开/收起和一键复制。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <ExecutionResult
 *   title="已执行完成，调用2个组件"
 *   items={[
 *     {
 *       status: "success",
 *       title: "调用成功 search_api",
 *       sections: [
 *         { title: "请求", content: "...", copyText: "..." },
 *         { title: "响应", content: "...", copyText: "..." }
 *       ]
 *     }
 *   ]}
 * />
 *
 * // 受控模式
 * const [open, setOpen] = useState(false);
 * <ExecutionResult
 *   title="执行结果"
 *   items={items}
 *   open={open}
 *   onOpenChange={setOpen}
 * />
 *
 * // 带工具图标
 * <ExecutionResult
 *   items={[
 *     {
 *       status: "success",
 *       title: "调用",
 *       toolName: "search_api",
 *       imageSrc: "/icons/search.png",
 *       sections: [...]
 *     }
 *   ]}
 * />
 * ```
 *
 * @public
 */
export const ExecutionResult = React.forwardRef<
  HTMLDivElement,
  ExecutionResultProps
>(
  (
    { title, items = [], defaultOpen = false, open, onOpenChange, arrowIcon },
    ref,
  ) => {
    return (
      <ExecutionResultContainerPrimitive
        ref={ref}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        {/* 整体标题（如果提供） */}
        {title && (
          <ExecutionResultTitlePrimitive
            arrow={
              <ExecutionResultArrowPrimitive>
                {arrowIcon || defaultArrow}
              </ExecutionResultArrowPrimitive>
            }
          >
            {title}
          </ExecutionResultTitlePrimitive>
        )}
        {/* 执行结果列表项 */}
        {items.length > 0 && (
          <ExecutionResultContentPrimitive>
            {items.map((item, index) => {
              // 解析状态，默认为 success
              const resolvedStatus = item.status ?? "success";
              const sections = item.sections ?? [];
              return (
                <ExecutionResultItemPrimitive
                  key={item.key ?? index}
                  defaultOpen={item.defaultOpen}
                >
                  {/* 列表项头部 */}
                  <ExecutionResultItemHeaderPrimitive
                    arrow={
                      <ExecutionResultArrowPrimitive>
                        {arrowIcon || defaultArrow}
                      </ExecutionResultArrowPrimitive>
                    }
                  >
                    {/* 状态图标 */}
                    <ExecutionResultItemIconPrimitive
                      aria-label={`Status: ${resolvedStatus}`}
                    >
                      {statusIconMap[resolvedStatus]}
                    </ExecutionResultItemIconPrimitive>
                    {/* 标题 */}
                    {item.title && (
                      <ExecutionResultItemTitlePrimitive>
                        {item.title}
                      </ExecutionResultItemTitlePrimitive>
                    )}
                    {/* 工具图标 */}
                    {item.imageSrc && (
                      <ExecutionResultItemImagePrimitive
                        src={item.imageSrc}
                        alt={item.imageAlt}
                      />
                    )}
                    {/* 工具名称 */}
                    {item.toolName && (
                      <ExecutionResultItemToolNamePrimitive>
                        {item.toolName}
                      </ExecutionResultItemToolNamePrimitive>
                    )}
                  </ExecutionResultItemHeaderPrimitive>
                  {/* 区块列表（请求、响应等） */}
                  {sections.length > 0 && (
                    <ExecutionResultItemContentPrimitive>
                      {sections.map((section, sectionIndex) => {
                        // 处理复制功能：优先使用自定义回调，否则使用 copyText
                        const handleCopy =
                          section.onCopy ??
                          (section.copyText
                            ? () =>
                                navigator.clipboard.writeText(section.copyText!)
                            : undefined);
                        return (
                          <ExecutionResultSectionPrimitive
                            key={`${index}-${sectionIndex}`}
                            title={section.title}
                            showCopyIcon={section.showCopyIcon}
                            onCopy={handleCopy}
                          >
                            {section.content}
                          </ExecutionResultSectionPrimitive>
                        );
                      })}
                    </ExecutionResultItemContentPrimitive>
                  )}
                </ExecutionResultItemPrimitive>
              );
            })}
          </ExecutionResultContentPrimitive>
        )}
      </ExecutionResultContainerPrimitive>
    );
  },
);
ExecutionResult.displayName = "ExecutionResult";
