"use client";

import * as React from "react";
import {
  ToggleButtonPrimitive,
  ToggleButtonGroupPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";
import { Brain, Zap, Sparkles } from "lucide-react";

export default function ToggleButtonDemo() {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [selectedModes, setSelectedModes] = React.useState<string[]>([]);

  const feedbackOptions = [
    { id: "harmful", label: "有害/不安全" },
    { id: "false", label: "信息虚假" },
    { id: "inappropriate", label: "内容不当" },
    { id: "other", label: "其他" },
  ];

  const modeOptions = [
    { id: "web-search", label: "联网搜索" },
    { id: "deep-think", label: "深度思考" },
    { id: "creative", label: "创意模式" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* 默认样式示例（用于反馈组件等场景） */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          默认样式（Default Variant）
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              单个按钮示例
            </p>
            <div className="flex flex-wrap gap-2">
              <ToggleButtonPrimitive>未选中</ToggleButtonPrimitive>
              <ToggleButtonPrimitive selected>已选中</ToggleButtonPrimitive>
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              单选按钮组示例（反馈组件场景）
            </p>
            <ToggleButtonGroupPrimitive
              options={feedbackOptions}
              selectedId={selectedOption}
              onOptionChange={setSelectedOption}
              variant="default"
            />
          </div>
        </div>
      </div>

      {/* 紧凑样式示例（用于sender组件等场景） */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          紧凑样式（Compact Variant）
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              单个按钮示例（带图标）
            </p>
            <div className="flex flex-wrap gap-2">
              <ToggleButtonPrimitive variant="compact">
                <Brain className="size-4" />
                未选中
              </ToggleButtonPrimitive>
              <ToggleButtonPrimitive variant="compact" selected>
                <Zap className="size-4" />
                已选中
              </ToggleButtonPrimitive>
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              多选按钮组示例（Sender组件场景）
            </p>
            <ToggleButtonGroupPrimitive
              options={modeOptions.map((opt) => ({
                id: opt.id,
                label: (
                  <>
                    {opt.id === "web-search" && <Brain className="size-4" />}
                    {opt.id === "deep-think" && <Zap className="size-4" />}
                    {opt.id === "creative" && <Sparkles className="size-4" />}
                    {opt.label}
                  </>
                ),
              }))}
              selectedIds={selectedModes}
              multiple
              onOptionsChange={setSelectedModes}
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* 使用场景示例 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          使用场景示例
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              反馈组件中的使用
            </p>
            <div className="p-4 bg-[var(--bg-page-secondary)] rounded-lg">
              <ToggleButtonGroupPrimitive
                options={feedbackOptions}
                selectedId={selectedOption}
                onOptionChange={setSelectedOption}
                variant="default"
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">
              Sender组件中的使用
            </p>
            <div className="p-4 bg-[var(--bg-page-secondary)] rounded-lg">
              <ToggleButtonGroupPrimitive
                options={modeOptions.map((opt) => ({
                  id: opt.id,
                  label: (
                    <>
                      {opt.id === "web-search" && <Brain className="size-4" />}
                      {opt.id === "deep-think" && <Zap className="size-4" />}
                      {opt.id === "creative" && <Sparkles className="size-4" />}
                      {opt.label}
                    </>
                  ),
                }))}
                selectedIds={selectedModes}
                multiple
                onOptionsChange={setSelectedModes}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
