"use client";

import * as React from "react";
import {
  IconButton,
  type IconButtonProps,
} from "@/registry/wuhan/composed/icon-button/icon-button";
import {
  Plus,
  Minus,
  Trash2,
  Edit2,
  Settings,
  Copy,
  Check,
  MoreHorizontal,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Search,
  RefreshCw,
  Download,
  Upload,
  FolderPlus,
  FilePlus,
} from "lucide-react";

// ==================== 演示组件 ====================

export default function IconButtonDemo() {
  // 状态管理
  const [loadingStates, setLoadingStates] = React.useState<
    Record<string, boolean>
  >({});
  const [copied, setCopied] = React.useState<string | null>(null);

  // 模拟加载状态切换
  const toggleLoading = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 模拟复制功能
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto p-6 space-y-8">
      {/* 标题区域 */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Icon Button
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          带 Tooltip 功能的图标按钮组件，支持多种变体、颜色、尺寸和加载状态。
        </p>
      </div>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          基础用法
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            不带 tooltip 的图标按钮：
          </p>
          <div className="flex flex-wrap gap-3">
            <IconButton variant="solid" color="primary">
              <Plus className="size-4" />
            </IconButton>
            <IconButton variant="solid" color="primary">
              <Minus className="size-4" />
            </IconButton>
            <IconButton variant="light" color="primary">
              <Settings className="size-4" />
            </IconButton>
            <IconButton variant="outline" color="secondary">
              <Download className="size-4" />
            </IconButton>
            <IconButton variant="ghost" color="primary">
              <MoreHorizontal className="size-4" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 带 Tooltip 的图标按钮 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          带 Tooltip 的图标按钮
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            悬停查看 tooltip 提示：
          </p>
          <div className="flex flex-wrap gap-3">
            <IconButton tooltip="添加新内容" variant="solid" color="primary">
              <Plus className="size-4" />
            </IconButton>
            <IconButton tooltip="删除" variant="outline" color="danger">
              <Trash2 className="size-4" />
            </IconButton>
            <IconButton tooltip="编辑" variant="ghost" color="primary">
              <Edit2 className="size-4" />
            </IconButton>
            <IconButton tooltip="复制" variant="outline" color="secondary">
              {copied === "copy" ? (
                <Check className="size-4 text-[var(--text-success)]" />
              ) : (
                <Copy
                  className="size-4"
                  onClick={() => handleCopy("copy", "copy")}
                />
              )}
            </IconButton>
            <IconButton tooltip="刷新" variant="solid" color="secondary">
              <RefreshCw className="size-4" />
            </IconButton>
            <IconButton tooltip="设置" variant="light" color="primary">
              <Settings className="size-4" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 变体展示 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          变体展示
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-6">
          {/* Solid 变体 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Solid (实心)
            </h3>
            <div className="flex flex-wrap gap-3">
              <IconButton tooltip="主色" variant="solid" color="primary">
                <Plus className="size-4" />
              </IconButton>
              <IconButton tooltip="次要色" variant="solid" color="secondary">
                <Settings className="size-4" />
              </IconButton>
              <IconButton tooltip="危险色" variant="solid" color="danger">
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Light 变体 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Light (浅色 - 有边框)
            </h3>
            <div className="flex flex-wrap gap-3">
              <IconButton tooltip="主色" variant="light" color="primary">
                <Plus className="size-4" />
              </IconButton>
              <IconButton tooltip="次要色" variant="light" color="secondary">
                <Settings className="size-4" />
              </IconButton>
              <IconButton tooltip="危险色" variant="light" color="danger">
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Light 无边框变体 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Light (浅色 - 无边框)
            </h3>
            <div className="flex flex-wrap gap-3">
              <IconButton
                tooltip="主色"
                variant="light"
                color="primary"
                borderless
              >
                <Plus className="size-4" />
              </IconButton>
              <IconButton
                tooltip="次要色"
                variant="light"
                color="secondary"
                borderless
              >
                <Settings className="size-4" />
              </IconButton>
              <IconButton
                tooltip="危险色"
                variant="light"
                color="danger"
                borderless
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Outline 变体 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Outline (边框)
            </h3>
            <div className="flex flex-wrap gap-3">
              <IconButton tooltip="主色" variant="outline" color="primary">
                <Plus className="size-4" />
              </IconButton>
              <IconButton tooltip="次要色" variant="outline" color="secondary">
                <Settings className="size-4" />
              </IconButton>
              <IconButton tooltip="危险色" variant="outline" color="danger">
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Ghost 变体 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              Ghost (幽灵)
            </h3>
            <div className="flex flex-wrap gap-3">
              <IconButton tooltip="主色" variant="ghost" color="primary">
                <Plus className="size-4" />
              </IconButton>
              <IconButton tooltip="次要色" variant="ghost" color="secondary">
                <Settings className="size-4" />
              </IconButton>
              <IconButton tooltip="危险色" variant="ghost" color="danger">
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </section>

      {/* 尺寸展示 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          尺寸展示
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <IconButton
              tooltip="超小 (24px)"
              size="sm"
              variant="solid"
              color="primary"
            >
              <Plus className="size-3.5" />
            </IconButton>
            <IconButton
              tooltip="小 (32px)"
              size="md"
              variant="solid"
              color="primary"
            >
              <Plus className="size-4" />
            </IconButton>
            <IconButton
              tooltip="中 (36px)"
              size="lg"
              variant="solid"
              color="primary"
            >
              <Plus className="size-4.5" />
            </IconButton>
            <IconButton
              tooltip="大 (40px)"
              size="xl"
              variant="solid"
              color="primary"
            >
              <Plus className="size-5" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* Tooltip 位置 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          Tooltip 位置
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <div className="flex flex-wrap gap-4">
            <IconButton
              tooltip="上边"
              tooltipSide="top"
              variant="outline"
              color="secondary"
            >
              <ChevronUp className="size-4" />
            </IconButton>
            <IconButton
              tooltip="下边"
              tooltipSide="bottom"
              variant="outline"
              color="secondary"
            >
              <ChevronDown className="size-4" />
            </IconButton>
            <IconButton
              tooltip="左边"
              tooltipSide="left"
              variant="outline"
              color="secondary"
            >
              <ChevronLeft className="size-4" />
            </IconButton>
            <IconButton
              tooltip="右边"
              tooltipSide="right"
              variant="outline"
              color="secondary"
            >
              <ChevronRight className="size-4" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 加载状态 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          加载状态
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <div className="flex flex-wrap gap-4">
            <IconButton
              tooltip="下载中..."
              loading={loadingStates["load1"]}
              variant="solid"
              color="primary"
              onClick={() => toggleLoading("load1")}
            >
              <Download className="size-4" />
            </IconButton>
            <IconButton
              tooltip="上传中..."
              loading={loadingStates["load2"]}
              variant="light"
              color="primary"
              onClick={() => toggleLoading("load2")}
            >
              <Upload className="size-4" />
            </IconButton>
            <IconButton
              tooltip="刷新中..."
              loading={loadingStates["load3"]}
              variant="ghost"
              color="primary"
              onClick={() => toggleLoading("load3")}
            >
              <RefreshCw className="size-4" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          禁用状态
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          <div className="flex flex-wrap gap-4">
            <IconButton tooltip="禁用" disabled variant="solid" color="primary">
              <Plus className="size-4" />
            </IconButton>
            <IconButton tooltip="禁用" disabled variant="light" color="primary">
              <Settings className="size-4" />
            </IconButton>
            <IconButton
              tooltip="禁用"
              disabled
              variant="outline"
              color="secondary"
            >
              <Download className="size-4" />
            </IconButton>
            <IconButton tooltip="禁用" disabled variant="ghost" color="danger">
              <Trash2 className="size-4" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 实际应用场景 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          实际应用场景
        </h2>
        <div className="p-6 bg-[var(--bg-container)] rounded-[var(--radius-lg)] border border-[var(--border-neutral)] space-y-4">
          {/* 工具栏场景 */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              工具栏按钮组（Ghost 变体）
            </h3>
            <div className="flex items-center gap-1 p-2 bg-[var(--bg-surface)] rounded-[var(--radius-md)] border border-[var(--border-neutral)]">
              <IconButton
                tooltip="添加文件夹"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <FolderPlus className="size-4" />
              </IconButton>
              <IconButton
                tooltip="添加文件"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <FilePlus className="size-4" />
              </IconButton>
              <IconButton
                tooltip="编辑"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <Edit2 className="size-4" />
              </IconButton>
              <IconButton
                tooltip="删除"
                variant="ghost"
                color="danger"
                size="sm"
              >
                <Trash2 className="size-4" />
              </IconButton>
              <div className="w-px h-6 bg-[var(--border-neutral)] mx-2" />
              <IconButton
                tooltip="搜索"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <Search className="size-4" />
              </IconButton>
              <IconButton
                tooltip="刷新"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <RefreshCw className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Light 工具栏场景 */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              工具栏按钮组（Light 变体）
            </h3>
            <div className="flex items-center gap-2 p-3 bg-[var(--bg-surface)] rounded-[var(--radius-md)] border border-[var(--border-neutral)]">
              <IconButton
                tooltip="刷新"
                variant="light"
                color="primary"
                size="sm"
              >
                <RefreshCw className="size-4" />
              </IconButton>
              <IconButton
                tooltip="设置"
                variant="light"
                color="primary"
                size="sm"
              >
                <Settings className="size-4" />
              </IconButton>
              <IconButton
                tooltip="下载"
                variant="light"
                color="primary"
                borderless
                size="sm"
              >
                <Download className="size-4" />
              </IconButton>
              <IconButton
                tooltip="上传"
                variant="light"
                color="primary"
                borderless
                size="sm"
              >
                <Upload className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* 更多操作场景 */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">
              卡片操作按钮
            </h3>
            <div className="flex items-center gap-2 p-4 bg-[var(--bg-surface)] rounded-[var(--radius-md)] border border-[var(--border-neutral)]">
              <span className="text-sm text-[var(--text-secondary)] flex-1">
                项目名称
              </span>
              <IconButton
                tooltip="编辑"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <Edit2 className="size-4" />
              </IconButton>
              <IconButton
                tooltip="更多"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <MoreVertical className="size-4" />
              </IconButton>
              <IconButton
                tooltip="关闭"
                variant="ghost"
                color="secondary"
                size="sm"
              >
                <X className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
