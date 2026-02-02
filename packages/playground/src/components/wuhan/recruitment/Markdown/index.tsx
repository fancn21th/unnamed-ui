"use client";

import type { MarkdownProps } from "./declaration";
import { markdownConfig } from "./config";
// import CustomSource from '@/components/Chat/CustomSource';
import CustomSources from "./CustomSources";
import { lazy, Suspense, useDeferredValue } from "react";
import {
  ImageSkeleton,
  IncompleteLink,
  TableSkeleton,
  HtmlSkeleton,
  IncompleteEmphasis,
} from "./components";
import { StyledMarkdownWrapper } from "./style";
import "@ant-design/x-markdown/themes/light.css";
import { useCallback } from "react";
import type { ComponentProps } from "@ant-design/x-markdown";
import Code from "./Code";
import Table from "./Table";
import { DynamicForm } from "./components/DynamicForm";
import { ThinkingStep } from "../../composed/thinking-process";
const GptVis = lazy(() =>
  import("./components/GptVis").then((mod) => ({ default: mod.GptVis })),
);
const DynamicTable = lazy(() =>
  import("./components/DynamicTable").then((mod) => ({
    default: mod.DynamicTable,
  })),
);
const ThinkComponent = lazy(() =>
  import("./components/ThinkComponent").then((mod) => ({
    default: mod.ThinkComponent,
  })),
);
// import '@ant-design/x-markdown/themes/dark.css';

const ThinkingStepAdapter: React.FC<ComponentProps> = (props) => {
  const rawTitle =
    (props as Record<string, unknown>).title ??
    (props as Record<string, unknown>)["data-title"];
  const title =
    typeof rawTitle === "string" || typeof rawTitle === "number"
      ? rawTitle
      : "思考过程";
  return <ThinkingStep title={title} />;
};

const Markdown: React.FC<MarkdownProps> = ({
  content,
  status,
  messageId,
  ...props
}) => {
  /**
   * content 使用 useDeferredValue 进行性能优化
   * 尤其是开启了enableAnimation时 content更新频率极高时会导致React堆栈溢出
   * 避免在内容频繁更新时导致的卡顿
   * **/
  const deferredValue = useDeferredValue(content);
  const CustomSourcesCb = useCallback(
    (props: ComponentProps) => (
      <CustomSources messageId={messageId} {...props} />
    ),
    [messageId],
  );
  return (
    <Suspense fallback={<div></div>}>
      <StyledMarkdownWrapper
        content={deferredValue as string}
        // paragraphTag="div"
        config={markdownConfig}
        components={{
          code: Code,
          "dynamic-form": DynamicForm,
          "dynamic-table": DynamicTable,
          think: ThinkComponent,
          "gpt-vis": GptVis,
          // 'custom-source': CustomSourceCb,
          // 'custom-sources': CustomSourcesCb,
          sup: CustomSourcesCb,
          table: Table,
          "thinking-step": ThinkingStepAdapter,
          "incomplete-image": ImageSkeleton,
          "incomplete-link": IncompleteLink,
          "incomplete-table": TableSkeleton,
          "incomplete-html": HtmlSkeleton,
          "incomplete-emphasis": IncompleteEmphasis,
        }}
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
