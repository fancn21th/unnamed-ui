"use client";

import * as React from "react";
import {
  PageHeader,
  PageHeaderButtonGroup,
  PageHeaderUser,
} from "@/registry/wuhan/composed/page-header/page-header";
import {
  PageHeaderPrimitive,
  PageHeaderLeftPrimitive,
  PageHeaderLogoPrimitive,
  PageHeaderTitlePrimitive,
  PageHeaderRightPrimitive,
  PageHeaderButtonGroupPrimitive,
  PageHeaderButton,
  PageHeaderUserPrimitive,
} from "@/registry/wuhan/blocks/page-header/page-header-01";
import { Settings, Bell, Search, HelpCircle } from "lucide-react";

export default function PageHeaderDemo() {
  return (
    <div className="w-full space-y-8">
      {/* 示例 1：最简用法 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          最简用法
        </h3>
        <PageHeader logo={<Settings />} title="页面标题" />
      </div>

      {/* 示例 2：带用户 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          带用户信息
        </h3>
        <PageHeader
          logo={<Settings />}
          title="页面标题"
          actions={<PageHeaderUser name="张三" />}
        />
      </div>

      {/* 示例 3：带按钮 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          带操作按钮
        </h3>
        <PageHeader
          logo={<Settings />}
          title="页面标题"
          actions={
            <PageHeaderButtonGroup>
              <PageHeaderButton variant="outline">分享</PageHeaderButton>
              <PageHeaderButton variant="solid" color="primary">
                新建
              </PageHeaderButton>
            </PageHeaderButtonGroup>
          }
        />
      </div>

      {/* 示例 4：完整用法 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          完整用法
        </h3>
        <PageHeader
          logo={
            <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
          }
          title="智能助手"
          actions={
            <>
              <PageHeaderButtonGroup>
                <PageHeaderButton variant="outline">历史</PageHeaderButton>
                <PageHeaderButton variant="solid" color="primary">
                  新建对话
                </PageHeaderButton>
              </PageHeaderButtonGroup>
              <PageHeaderUser
                name="张三"
                avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              />
            </>
          }
        />
      </div>

      {/* 原语组件示例 */}
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          原语组件组合（完全自定义）
        </h3>
        <PageHeaderPrimitive className="bg-[var(--bg-container)]">
          <PageHeaderLeftPrimitive>
            <PageHeaderLogoPrimitive>
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg">
                <span className="text-white font-bold text-xs">原</span>
              </div>
            </PageHeaderLogoPrimitive>
            <PageHeaderTitlePrimitive>自定义组合</PageHeaderTitlePrimitive>
          </PageHeaderLeftPrimitive>
          <PageHeaderRightPrimitive>
            <PageHeaderButtonGroupPrimitive>
              <PageHeaderButton variant="text">编辑</PageHeaderButton>
              <PageHeaderButton variant="outline">分享</PageHeaderButton>
              <PageHeaderButton variant="solid" color="primary">
                提交
              </PageHeaderButton>
            </PageHeaderButtonGroupPrimitive>
            <PageHeaderUserPrimitive name="用户" avatarSize={32} />
          </PageHeaderRightPrimitive>
        </PageHeaderPrimitive>
      </div>
    </div>
  );
}
