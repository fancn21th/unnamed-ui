# Registry 新增组件指南

## 一、组件目录结构

```
apps/www/registry/wuhan/
├── ui/                    # 基础 UI 原子组件（Button, Dialog, Select...）
├── blocks/                # 块组件 - 基础样式+结构（button-01, sender-01...）
├── composed/              # 组合组件 - 完整功能（完整版 button）
├── examples/              # 组件演示示例
├── recruitment/            # 业务组件（CandidatesTable, JobCard...）
└── registry.ts            # 注册入口
```

## 二、新增组件步骤

### 步骤 1：创建组件文件

根据类型选择目录，创建 `组件名-序号.tsx`：

**Block 组件示例：**
```tsx:apps/www/registry/wuhan/blocks/my-component/my-component-01.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type MyComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  // 组件 Props
};

export const MyComponent01 = React.forwardRef<
  HTMLDivElement,
  MyComponentProps
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props} />
  );
});

MyComponent01.displayName = "MyComponent01";
```

### 步骤 2：注册组件

在对应目录的 `_registry.ts` 中添加：

```typescript:apps/www/registry/wuhan/blocks/_registry.ts
{
  name: "my-component-01",
  type: "registry:block",
  title: "My Component",
  description: "组件简短描述",
  registryDependencies: ["style", "button"],  // 依赖的组件名
  files: [
    {
      path: "blocks/my-component/my-component-01.tsx",
      type: "registry:component",
      target: "components/wuhan/blocks/my-component-01.tsx",
    },
  ],
}
```

### 步骤 3：运行构建脚本

```bash
npx tsx scripts/build-registry.ts
```

> 此命令会自动更新 `__index__.tsx` 注册表

### 步骤 4：添加文档（可选）

```yaml:apps/www/content/docs/blocks/my-component.mdx
---
title: My Component
description: 组件中文描述
author: YourName
---

<ComponentPreview name="my-component-demo" className="mb-4" />

## 使用

```tsx
import { MyComponent01 } from "@/registry/wuhan/blocks/my-component";
```
```

---

## 三、组件命名规范

| 类型 | 命名格式 | 示例 |
|------|----------|------|
| UI 组件 | `component.tsx` | `button.tsx` |
| Block 组件 | `component-01.tsx` | `button-01.tsx` |
| 变体 | `component-02.tsx` | `prompt-02.tsx` |
| 组合组件 | `component.tsx` | `button.tsx` |
| 示例 | `component-demo.tsx` | `button-demo.tsx` |

---

## 四、依赖声明

在 registry 注册时使用：

```typescript
// 依赖本组件库的组件
registryDependencies: ["style", "button", "dialog"]

// 依赖外部 npm 包
dependencies: ["lucide-react", "@radix-ui/react-dialog"]
```

---

## 五、注册表结构说明

```typescript
{
  name: "组件唯一标识符",        // 必须唯一
  type: "registry:block",       // ui | block | composed
  title: "组件显示名称",
  description: "组件简短描述",
  registryDependencies: [],       // 依赖的本组件库组件
  dependencies: [],              // 依赖的外部 npm 包
  files: [
    {
      path: "blocks/组件名/文件名.tsx",  // 相对于 wuhan/
      type: "registry:component",
      target: "components/wuhan/blocks/文件名.tsx",  // 安装目标路径
    },
  ],
}
```

---

## 六、快速参考

| 操作 | 位置 |
|------|------|
| 添加 UI 组件 | `ui/component.tsx` + `ui/_registry.ts` |
| 添加 Block 组件 | `blocks/component-01.tsx` + `blocks/_registry.ts` |
| 添加组合组件 | `composed/component.tsx` + `composed/_registry.ts` |
| 添加示例 | `examples/component-demo.tsx` + `examples/_registry.ts` |
| 添加业务组件 | `recruitment/Component/` + `recruitment/_registry.ts` |
| 全局注册表 | `registry.ts`（自动生成，无需手动修改） |

