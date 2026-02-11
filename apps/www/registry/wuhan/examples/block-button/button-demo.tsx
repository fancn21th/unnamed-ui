"use client";

import React, { useState } from "react";
import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import {
  Send,
  Download,
  ArrowRight,
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Home,
  User,
  Star,
  Heart,
  Mail,
  Search,
  Bell,
  PlusCircle,
  MinusCircle,
  Check,
  X,
} from "lucide-react";

// 可选图标列表
const ICONS = {
  none: null,
  Send,
  Download,
  ArrowRight,
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Home,
  User,
  Star,
  Heart,
  Mail,
  Search,
  Bell,
  PlusCircle,
  MinusCircle,
  Check,
  X,
};

const VARIANTS = [
  { value: "solid", label: "实心" },
  { value: "text", label: "文字" },
  { value: "outline", label: "边框" },
  { value: "link", label: "链接" },
];

const COLORS = [
  { value: "primary", label: "主色" },
  { value: "secondary", label: "次要" },
  { value: "danger", label: "危险" },
];

const SIZES = [
  { value: "sm", label: "小" },
  { value: "md", label: "中" },
  { value: "lg", label: "大" },
];

const ICON_OPTIONS = Object.keys(ICONS).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
}));

export default function ButtonDemo() {
  // 按钮配置状态
  const [config, setConfig] = useState({
    variant: "solid",
    color: "primary",
    size: "md",
    disabled: false,
    loading: false,
    block: false,
    icon: "none",
    iconRight: "none",
    text: "按钮",
  });

  const updateConfig = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const SelectedIcon = ICONS[config.icon as keyof typeof ICONS];
  const SelectedIconRight = ICONS[config.iconRight as keyof typeof ICONS];

  // 生成代码
  const generateCode = () => {
    const props = [];
    if (config.variant !== "solid") props.push(`variant="${config.variant}"`);
    if (config.color !== "primary") props.push(`color="${config.color}"`);
    if (config.size !== "md") props.push(`size="${config.size}"`);
    if (config.disabled) props.push("disabled");
    if (config.loading) props.push("loading");
    if (config.block) props.push("block");
    if (config.icon !== "none") props.push(`icon={${config.icon}}`);
    if (config.iconRight !== "none")
      props.push(`iconRight={${config.iconRight}}`);

    const propsString = props.length > 0 ? "\n  " + props.join("\n  ") : "";
    return `<Button${propsString}>\n  ${config.text}\n</Button>`;
  };

  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Button 组件</h1>
          <p className="text-gray-600">配置按钮属性，预览即时更新</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 配置面板 */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              按钮配置
            </h2>

            {/* 变体类型 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                按钮类型
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VARIANTS.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => updateConfig("variant", v.value)}
                    className={`px-3 py-2 text-sm rounded-md border transition-all ${
                      config.variant === v.value
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 颜色 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                颜色
              </label>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => updateConfig("color", c.value)}
                    className={`flex-1 px-3 py-2 text-sm rounded-md border transition-all ${
                      config.color === c.value
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 尺寸 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                尺寸
              </label>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateConfig("size", s.value)}
                    className={`flex-1 px-3 py-2 text-sm rounded-md border transition-all ${
                      config.size === s.value
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 图标配置 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                左侧图标
              </label>
              <select
                value={config.icon}
                onChange={(e) => updateConfig("icon", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                右侧图标
              </label>
              <select
                value={config.iconRight}
                onChange={(e) => updateConfig("iconRight", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 按钮文字 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                按钮文字
              </label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => updateConfig("text", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入按钮文字"
              />
            </div>

            {/* 开关选项 */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                选项
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.disabled}
                    onChange={(e) => updateConfig("disabled", e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">禁用</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.loading}
                    onChange={(e) => updateConfig("loading", e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">加载中</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.block}
                    onChange={(e) => updateConfig("block", e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">全宽</span>
                </label>
              </div>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 主要预览 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">预览</h2>

              <div
                className={`flex ${
                  config.block ? "flex-col" : "flex-row"
                } items-center justify-center gap-6 min-h-[140px]`}
              >
                <Button
                  variant={
                    config.variant as "solid" | "text" | "outline" | "link"
                  }
                  color={config.color as "primary" | "secondary" | "danger"}
                  size={config.size as "sm" | "md" | "lg"}
                  disabled={config.disabled}
                  loading={config.loading}
                  block={config.block}
                  icon={
                    config.icon !== "none"
                      ? (SelectedIcon as React.ComponentType<
                          React.SVGProps<SVGSVGElement>
                        >)
                      : undefined
                  }
                  iconRight={
                    config.iconRight !== "none"
                      ? (SelectedIconRight as React.ComponentType<
                          React.SVGProps<SVGSVGElement>
                        >)
                      : undefined
                  }
                >
                  {config.text}
                </Button>
              </div>
            </div>

            {/* 代码展示 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setShowCode(!showCode)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">代码</span>
                <span className="text-sm text-gray-500">
                  {showCode ? "收起" : "展开"}
                </span>
              </button>

              {showCode && (
                <pre className="p-6 text-sm overflow-x-auto bg-gray-900 text-gray-100">
                  <code>{generateCode()}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
