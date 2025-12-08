import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CodeTabs, TabsList, TabsTrigger, TabsContent } from "@/components/code-tabs";
import { Steps, Step } from "@/components/steps";
import { MDXPre } from "@/components/mdx-pre";
import { MDXCode } from "@/components/mdx-code";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ComponentPreview,
    ComponentSource,
    CodeTabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Steps,
    Step,
    pre: MDXPre,
    code: MDXCode,
  };
}
