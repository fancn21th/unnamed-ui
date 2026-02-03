import type React from "react";
import {
  type ComponentProps,
  type XMarkdownProps,
} from "@ant-design/x-markdown";
import type { MarkdownConfig } from "./config";
import type { SourceItem } from "../custom-sources/utils";

export type MarkdownPreset = "default" | "minimal" | "block";

export type MarkdownComponents = NonNullable<XMarkdownProps["components"]>;

export interface MarkdownPluginContext {
  components: MarkdownComponents;
  config: MarkdownConfig;
}

export type MarkdownPlugin = (
  context: MarkdownPluginContext,
) => Partial<MarkdownPluginContext> | void;

export interface MarkdownProps extends XMarkdownProps {
  // status?: 'pending' | 'streaming' | 'success' | 'error' | 'abort';
  status?: "local" | "loading" | "updating" | "success" | "error" | "abort";
  messageId?: string;
  sources?: SourceItem[];
  onOpenSidebar?: (payload: {
    sources: SourceItem[];
    activeKey?: number;
  }) => void;
  preset?: MarkdownPreset;
  renderPlugins?: MarkdownPlugin[];
  [props: string]: any;
}
