"use client";

import * as React from "react";
import { Index } from "@/registry/__index__";
import { type Style } from "@/registry/styles";
import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { cn } from "@/lib/utils";

// 错误边界组件
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component preview error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-muted-foreground text-xs text-center py-4">
            Preview unavailable
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// 为需要 props 的组件提供默认值
function ComponentWrapper({ Component, name }: { Component: React.ComponentType<any>; name: string }) {
  // 使用错误边界包装组件渲染
  try {
    return <Component />;
  } catch (error) {
    console.warn(`Component ${name} failed to render:`, error);
    return (
      <div className="text-muted-foreground text-xs text-center py-4">
        Component requires props
      </div>
    );
  }
}

export function ComponentPreviewClient({
  name,
  styleName = "wuhan",
  type,
  className,
  align = "center",
  hideCode = true,
  chromeLessOnMobile = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
  styleName?: Style["name"];
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
  type?: "block" | "component" | "example";
  chromeLessOnMobile?: boolean;
}) {
  const Component = Index[styleName]?.[name]?.component;

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${styleName}/${name}`} className="size-full" />
        </div>
      </div>
    );
  }

  return (
    <ComponentErrorBoundary
      fallback={
        <div className="text-muted-foreground text-xs text-center py-4">
          Preview unavailable for {name}
        </div>
      }
    >
      <div
        className={cn(
          "preview flex w-full justify-center overflow-hidden",
          align === "center" && "items-center",
          align === "end" && "items-end",
          align === "start" && "items-start",
          chromeLessOnMobile ? "p-4" : "p-6"
        )}
      >
        <ComponentWrapper Component={Component} name={name} />
      </div>
    </ComponentErrorBoundary>
  );
}

