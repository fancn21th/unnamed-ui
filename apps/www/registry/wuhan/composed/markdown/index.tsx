"use client";

import type {
  MarkdownComponents,
  MarkdownPluginContext,
  MarkdownProps,
} from "./declaration";
import { markdownConfig } from "./config";
// import CustomSource from '@/components/Chat/CustomSource';
import CustomSources from "@/registry/wuhan/composed/custom-sources/custom-sources";
import { lazy, Suspense, useDeferredValue } from "react";
import {
  ImageSkeleton,
  IncompleteLink,
  TableSkeleton,
  HtmlSkeleton,
  IncompleteEmphasis,
  Code,
  Table,
} from "./components";
import { StyledMarkdownWrapper } from "./style";
import "@ant-design/x-markdown/themes/light.css";
import { useCallback } from "react";
const GptVis = lazy(() =>
  import("./components/GptVis").then((mod) => ({ default: mod.GptVis })),
);

const ThinkComponent = lazy(() =>
  import("./components/ThinkComponent").then((mod) => ({
    default: mod.ThinkComponent,
  })),
);
// import '@ant-design/x-markdown/themes/dark.css';

const Markdown: React.FC<MarkdownProps> = ({
  content,
  status,
  messageId,
  sources,
  onOpenSidebar,
  preset = "default",
  renderPlugins,
  components,
  config,
  ...props
}) => {
  /**
   * content 使用 useDeferredValue 进行性能优化
   * 尤其是开启了enableAnimation时 content更新频率极高时会导致React堆栈溢出
   * 避免在内容频繁更新时导致的卡顿
   * **/
  const deferredValue = useDeferredValue(content);
  const CustomSourcesCb = useCallback(
    // @ts-ignore
    (props) => (
      <CustomSources
        messageId={messageId}
        sources={sources}
        onOpenSidebar={onOpenSidebar}
        {...props}
      />
    ),
    [messageId, sources, onOpenSidebar],
  );
  const baseComponents: MarkdownComponents =
    preset === "minimal"
      ? {
          code: Code,
          table: Table,
        }
      : {
          code: Code,
          think: ThinkComponent,
          "gpt-vis": GptVis,
          sup: CustomSourcesCb,
          table: Table,
          "incomplete-image": ImageSkeleton,
          "incomplete-link": IncompleteLink,
          "incomplete-table": TableSkeleton,
          "incomplete-html": HtmlSkeleton,
          "incomplete-emphasis": IncompleteEmphasis,
        };

  const mergedComponents = {
    ...baseComponents,
    ...(components ?? {}),
  } as MarkdownComponents;

  const resolvedSupComponent = useCallback(
    // @ts-ignore
    (props) => {
      const userSup = mergedComponents.sup;
      if (typeof userSup === "function") {
        const Sup = userSup as any;
        return (
          <Sup
            messageId={messageId}
            sources={sources}
            onOpenSidebar={onOpenSidebar}
            {...props}
          />
        );
      }
      if (typeof userSup === "string") {
        const Tag = userSup as any;
        return <Tag {...props} />;
      }
      return (
        <CustomSources
          messageId={messageId}
          sources={sources}
          onOpenSidebar={onOpenSidebar}
          {...props}
        />
      );
    },
    [mergedComponents.sup, messageId, sources, onOpenSidebar],
  );

  const pluginContext = (renderPlugins ?? []).reduce<MarkdownPluginContext>(
    (acc, plugin) => {
      const next = (plugin(acc) ?? {}) as Partial<MarkdownPluginContext>;
      if (!next) {
        return acc;
      }
      return {
        components: next.components ?? acc.components,
        config: next.config ?? acc.config,
      };
    },
    {
      components: {
        ...mergedComponents,
        sup: resolvedSupComponent,
      },
      config: config ?? markdownConfig,
    },
  );
  const resolvedParagraphTag =
    props.paragraphTag ?? (preset === "block" ? "div" : "p");
  return (
    <Suspense fallback={<div></div>}>
      <StyledMarkdownWrapper
        content={deferredValue as string}
        paragraphTag={resolvedParagraphTag}
        config={pluginContext.config}
        components={pluginContext.components}
        streaming={{
          hasNextChunk: status === "updating",
          enableAnimation: true,
        }}
        {...props}
      />
    </Suspense>
  );
};

export default Markdown;

// ```dynamic-form
// schema: {...}
// ```

// <dynamic-form schema="..."></dynamic-form>
// <html-renderer content="..."></html-renderer>
