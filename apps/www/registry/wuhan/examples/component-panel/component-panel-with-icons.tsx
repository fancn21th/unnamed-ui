"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";
import {
  Package,
  Wrench,
  Workflow,
  Zap,
  Database,
  Code,
  Terminal,
  Box,
} from "lucide-react";

export default function ComponentPanelWithIcons() {
  const categories = [
    {
      value: "components",
      label: "组件",
      options: [
        { value: "button", label: "Button", icon: <Box className="size-4" /> },
        {
          value: "input",
          label: "Input",
          icon: <Terminal className="size-4" />,
        },
        { value: "select", label: "Select", icon: <Code className="size-4" /> },
        {
          value: "table",
          label: "Table",
          icon: <Database className="size-4" />,
        },
      ],
    },
    {
      value: "tools",
      label: "工具",
      options: [
        {
          value: "builder",
          label: "Builder",
          icon: <Wrench className="size-4" />,
        },
        {
          value: "packager",
          label: "Packager",
          icon: <Package className="size-4" />,
        },
        {
          value: "optimizer",
          label: "Optimizer",
          icon: <Zap className="size-4" />,
        },
      ],
    },
    {
      value: "workflows",
      label: "工作流",
      options: [
        { value: "ci", label: "CI/CD", icon: <Workflow className="size-4" /> },
        { value: "deploy", label: "Deploy", icon: <Zap className="size-4" /> },
        { value: "test", label: "Test", icon: <Code className="size-4" /> },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <ComponentPanel
        categories={categories}
        defaultValue={["button", "input", "builder"]}
      />
    </div>
  );
}
