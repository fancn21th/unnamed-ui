"use client";

import { TripleSplitPane } from "@/registry/wuhan/composed/split-pane/triple-split-pane";

export default function SplitPanePopoverDemo() {
  return (
    <div className="space-y-8">
      {/* 基础 Popover 示例 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          左侧展开按钮 Popover 功能
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          当左侧面板收起时，鼠标悬浮在中间面板的展开按钮上会显示 Popover
        </p>
        <TripleSplitPane
          className="h-[500px] w-full bg-[var(--bg-neutral-light)] gap-[6px] p-3"
          left={{
            title: "左侧面板",
            width: "220px",
            collapsedWidth: "0px",
            defaultCollapsed: true,
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  左侧面板内容（默认收起）
                </p>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">导航菜单</p>
                </div>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">文件树</p>
                </div>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">项目结构</p>
                </div>
              </div>
            ),
          }}
          center={{
            title: "主内容区",
            minWidth: "280px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  这是中间面板的主内容区域
                </p>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">主要内容 A</p>
                </div>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">主要内容 B</p>
                </div>
              </div>
            ),
          }}
          right={{
            title: "右侧面板",
            width: "220px",
            collapsedWidth: "0px",
            minWidth: "180px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  右侧面板内容
                </p>
                <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                  <p className="text-xs">属性面板</p>
                </div>
              </div>
            ),
          }}
          leftPopover={{
            enabled: true,
            width: "240px",
            height: "300px",
            content: (
              <div className="p-4 space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  快速导航
                </h4>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-[var(--bg-item-hover)] rounded cursor-pointer transition-colors">
                    <p className="text-xs text-[var(--text-secondary)]">
                      📁 项目文件
                    </p>
                  </div>
                  <div className="p-2 hover:bg-[var(--bg-item-hover)] rounded cursor-pointer transition-colors">
                    <p className="text-xs text-[var(--text-secondary)]">
                      🔍 搜索
                    </p>
                  </div>
                  <div className="p-2 hover:bg-[var(--bg-item-hover)] rounded cursor-pointer transition-colors">
                    <p className="text-xs text-[var(--text-secondary)]">
                      ⚙️ 设置
                    </p>
                  </div>
                  <div className="p-2 hover:bg-[var(--bg-item-hover)] rounded cursor-pointer transition-colors">
                    <p className="text-xs text-[var(--text-secondary)]">
                      📊 数据统计
                    </p>
                  </div>
                  <div className="p-2 hover:bg-[var(--bg-item-hover)] rounded cursor-pointer transition-colors">
                    <p className="text-xs text-[var(--text-secondary)]">
                      🔔 通知中心
                    </p>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </div>

      {/* alwaysOpen 开发者模式示例 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          开发者模式：alwaysOpen
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          设置{" "}
          <code className="text-xs bg-[var(--bg-neutral)] px-1 py-0.5 rounded">
            alwaysOpen: true
          </code>{" "}
          后，Popover 将始终显示，方便开发时调试样式
        </p>
        <TripleSplitPane
          className="h-[400px] w-full bg-[var(--bg-neutral-light)] gap-[6px] p-3"
          left={{
            title: "左侧面板",
            width: "220px",
            collapsedWidth: "0px",
            defaultCollapsed: true,
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  左侧面板内容
                </p>
              </div>
            ),
          }}
          center={{
            title: "主内容区",
            minWidth: "280px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  中间面板内容
                </p>
              </div>
            ),
          }}
          right={{
            title: "右侦面板",
            width: "220px",
            collapsedWidth: "0px",
            minWidth: "180px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  右侧面板内容
                </p>
              </div>
            ),
          }}
          leftPopover={{
            enabled: true,
            alwaysOpen: true,
            width: "200px",
            height: "250px",
            content: (
              <div className="p-4 space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  调试模式
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  这个 Popover 将始终显示，方便开发时调试样式
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-[var(--bg-item-hover)] rounded">
                    <p className="text-xs text-[var(--text-secondary)]">
                      调试项 1
                    </p>
                  </div>
                  <div className="p-2 bg-[var(--bg-item-hover)] rounded">
                    <p className="text-xs text-[var(--text-secondary)]">
                      调试项 2
                    </p>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
