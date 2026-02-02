import { useCallback } from "react";
import mitt, { type Emitter, type EventType } from "mitt";
import type { ReactNode } from "react";

/**
 * 侧边栏面板配置类型
 */

export interface PanelConfig {
  id: string;
  component: ReactNode | ((params?: Record<string, any>) => ReactNode);
  width?: number;
  duration?: number;
}

export const PanelType = {
  SOURCE: "source",
  CANVAS: "canvas",
} as const;

export type PanelTypeValue = (typeof PanelType)[keyof typeof PanelType];

// 右侧侧边栏面板事件数据类型
export interface PanelEventData {
  // 打开指定面板(传 null 关闭所有面板)
  panelId: PanelTypeValue | null;
  params?: {
    messageId?: string; // 数据来源需要的消息ID
    [key: string]: any;
  };
}
type AppEvents = {
  "history:refresh": string; // 刷新历史记录
  "history:switch": void; // 切换历史记录
  "history:chatList": string; // 聊天列表更新
  "input:retry": string; // 输入重试
  "source:search": string; // 数据来源
  "panel:open": PanelEventData; // 打开面板
  "faq:scroll": void; // FAQ 滚动
  "canvas:stream": string; // Canvas 流式输出内容 FIXME 数据不应该使用eventBus传递
  "sources:open": {
    sources: Array<{
      key: number;
      title: string;
      content: string;
      url?: string;
      favicon?: string;
      sourceType?: "internal" | "external";
      domain?: string;
      sourceName?: string;
    }>;
    activeKey?: number;
  }; // 打开数据来源侧边栏，activeKey 为当前选中的来源 key
};
const eventBus = mitt<AppEvents>();
/**
 * 创建一个发射事件的 Hook
 */
export const createEmitHook = <T extends Record<EventType, unknown>>(
  eventBus: Emitter<T>,
) => {
  return function useEmit() {
    return useCallback(<K extends keyof T>(eventName: K, data?: T[K]) => {
      eventBus.emit(eventName, data as T[K]);
    }, []);
  };
};

export const useEmitEvent = createEmitHook(eventBus);
