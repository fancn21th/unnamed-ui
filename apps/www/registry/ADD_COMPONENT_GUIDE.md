# Registry 新增组件指南

## 一、组件目录结构

```
apps/www/registry/wuhan/
├── ui/                    # 基础 UI 原子组件（Button, Dialog, Select...）
├── blocks/                # 块组件 - 基础样式+结构（button-01, sender-01...）
├── composed/              # 组合组件 - 完整功能（完整版 button）
├── examples/              # 组件演示示例
├── recruitment/           # 业务组件（CandidatesTable, JobCard...）
└── registry.ts            # 注册入口（自动生成）
```

---

## 二、组件类型说明

| 类型 | 说明 | 文件命名 | 注册类型 |
|------|------|----------|----------|
| **UI 组件** | 基础原子组件（Button、Input等） | `button.tsx` | `registry:ui` |
| **Block 组件** | 基础样式+结构的块组件 | `component-01.tsx` | `registry:block` |
| **Composed 组件** | 组合完整功能的组件 | `component.tsx` | `registry:block` |
| **Example 示例** | 组件演示和使用示例 | `component-demo.tsx` | `registry:example` |

---

## 三、新增 Block 组件步骤

### 步骤 1：创建 Block 组件文件

在 `blocks/` 目录下创建组件文件夹和文件：

```
blocks/my-component/
└── my-component-01.tsx
```

**Block 组件模板：**

```tsx:apps/www/registry/wuhan/blocks/my-component/my-component-01.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SomeIcon } from "lucide-react";

// 盒子边框模型
const BOX_BORDER = "box-border [&>*]:box-border";

// ==================== 类型定义 ====================

/**
 * MyComponent 语义状态
 * @public
 */
type MyComponentSemanticStatus =
  | "pending"   // 待处理
  | "in_progress" // 进行中
  | "completed"; // 已完成

/**
 * MyComponent 原语属性
 * @public
 */
interface MyComponentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  // 属性定义
  children?: React.ReactNode;
}

// ==================== 原语组件 ====================

/**
 * MyComponent 容器原语
 * @public
 */
export const MyComponentPrimitive = React.forwardRef<
  HTMLDivElement,
  MyComponentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        "p-[var(--padding-com-lg)]",
        "flex items-center",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MyComponentPrimitive.displayName = "MyComponentPrimitive";

/**
 * 完整 MyComponent 原语
 * @public
 */
export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentPrimitiveProps & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    status?: MyComponentSemanticStatus;
  }
>(({ title, description, status = "pending", className, ...props }, ref) => {
  return (
    <MyComponentPrimitive ref={ref} className={className} {...props}>
      {/* 组件内容 */}
    </MyComponentPrimitive>
  );
});
MyComponent.displayName = "MyComponent";

// ==================== 类型导出 ====================

export type { MyComponentSemanticStatus, MyComponentPrimitiveProps };
```

### 步骤 2：注册 Block 组件

在 `blocks/_registry.ts` 中添加注册信息：

```typescript:apps/www/registry/wuhan/blocks/_registry.ts
{
  name: "my-component-01",
  type: "registry:block",
  title: "My Component",
  description: "组件简短描述",
  dependencies: ["lucide-react"],  // 外部 npm 包依赖（可选）
  registryDependencies: ["style"], // 本组件库依赖
  files: [
    {
      path: "blocks/my-component/my-component-01.tsx",
      type: "registry:component",
      target: "components/wuhan/blocks/my-component-01.tsx",
    },
  ],
}
```

---

## 四、新增 Composed 组件步骤

Composed 组件是 Block 组件的封装，提供更完整的功能。

### 步骤 1：创建 Composed 组件文件

在 `composed/` 目录下创建组件文件夹：

```
composed/my-component/
└── my-component.tsx
```

**Composed 组件模板：**

```tsx:apps/www/registry/wuhan/composed/my-component/my-component.tsx
"use client";

import * as React from "react";
import {
  MyComponentPrimitive,
  type MyComponentSemanticStatus,
} from "@/registry/wuhan/blocks/my-component/my-component-01";

// ==================== 类型定义 ====================

/**
 * MyComponent 组合组件属性
 * @public
 */
export interface MyComponentComposedProps {
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 状态 */
  status?: MyComponentSemanticStatus;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件 ====================

/**
 * MyComponent 组合组件
 * 提供完整功能的组件封装
 *
 * @example
 * ```tsx
 * <MyComponent
 *   title="组件标题"
 *   description="组件描述"
 *   status="in_progress"
 * />
 * ```
 *
 * @public
 */
export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentComposedProps
>((props, ref) => {
  const {
    title = "默认标题",
    description,
    status = "pending",
    size = "md",
    className,
  } = props;

  return (
    <MyComponentPrimitive
      ref={ref}
      title={title}
      description={description}
      status={status}
      className={className}
    />
  );
});
MyComponent.displayName = "MyComponent";

// ==================== 类型导出 ====================

export type { MyComponentComposedProps };
```

### 步骤 2：注册 Composed 组件

在 `composed/_registry.ts` 中添加注册信息：

```typescript:apps/www/registry/wuhan/composed/_registry.ts
{
  name: "my-component",
  type: "registry:block",
  title: "My Component",
  description: "组合组件的完整描述",
  dependencies: ["lucide-react"],       // 外部 npm 包依赖
  registryDependencies: ["my-component-01"], // Block 组件依赖
  files: [
    {
      path: "composed/my-component/my-component.tsx",
      type: "registry:component",
      target: "components/wuhan/composed/my-component.tsx",
    },
  ],
}
```

---

## 五、新增 Example 示例步骤

Example 用于展示组件的多种用法和交互效果。

### 步骤 1：创建 Example 文件

在 `examples/` 目录下创建组件文件夹：

```
examples/my-component/
└── my-component-demo.tsx
```

**Example 组件模板：**

```tsx:apps/www/registry/wuhan/examples/my-component/my-component-demo.tsx
"use client";

import { useState } from "react";
import {
  MyComponent,
  type MyComponentComposedProps,
} from "@/registry/wuhan/composed/my-component/my-component";

export default function MyComponentDemo() {
  // 状态管理
  const [status, setStatus] = useState<MyComponentComposedProps["status"]>("pending");

  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-4">
      {/* 不同状态展示 */}
      <MyComponent title="标题一" description="描述文本" status="pending" />
      <MyComponent title="标题二" description="描述文本" status="in_progress" />
      <MyComponent title="标题三" description="描述文本" status="completed" />

      {/* 交互式演示 */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          交互式演示
        </h3>
        <MyComponent
          title="交互式组件"
          description="点击按钮更新状态"
          status={status}
        />
        <div className="flex gap-2 mt-3">
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-brand)] text-white rounded-[var(--radius-md)]"
            onClick={() => setStatus("pending")}
          >
            待处理
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-[var(--bg-success)] text-white rounded-[var(--radius-md)]"
            onClick={() => setStatus("completed")}
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 步骤 2：注册 Example

在 `examples/_registry.ts` 中添加注册信息：

```typescript:apps/www/registry/wuhan/examples/_registry.ts
{
  name: "my-component-demo",
  type: "registry:example",
  registryDependencies: ["my-component"],  // 依赖的 Composed 组件
  files: [
    {
      path: "examples/my-component/my-component-demo.tsx",
      type: "registry:example",
      target: "components/wuhan/examples/my-component-demo.tsx",
    },
  ],
}
```

---

## 六、添加文档（可选但推荐）

在 `apps/www/content/docs/blocks/` 目录下创建文档：

```yaml:apps/www/content/docs/blocks/my-component.mdx
---
title: My Component
description: 组件的中文描述
author: YourName
---

<ComponentPreview name="my-component-demo" className="mb-4" />

组件的功能描述和使用说明。

## 特性

- 特性一
- 特性二
- 特性三

## 使用

```tsx
import { MyComponent } from "@/registry/wuhan/composed/my-component/my-component";

<MyComponent
  title="标题"
  description="描述"
  status="in_progress"
/>
```

## API

### MyComponent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"标题"` | 标题 |
| `status` | `"pending" \| "in_progress" \| "completed"` | `"pending"` | 状态 |

// ... 更多文档内容
```

---

## 七、运行构建脚本

完成以上步骤后，运行构建脚本：

```bash
npx tsx scripts/build-registry.ts
```

此命令会自动更新 `__index__.tsx` 注册表。

---

## 八、组件命名规范

| 类型 | 命名格式 | 示例 | 文件路径 |
|------|----------|------|----------|
| UI 组件 | `component.tsx` | `button.tsx` | `ui/button.tsx` |
| Block 组件 | `component-01.tsx` | `button-01.tsx` | `blocks/button/button-01.tsx` |
| Block 变体 | `component-02.tsx` | `prompt-02.tsx` | `blocks/prompt/prompt-02.tsx` |
| Composed 组件 | `component.tsx` | `button.tsx` | `composed/button/button.tsx` |
| Example 示例 | `component-demo.tsx` | `button-demo.tsx` | `examples/button/button-demo.tsx` |

---

## 九、依赖声明

### registryDependencies（组件库内部依赖）

```typescript
// 依赖本组件库的组件
registryDependencies: ["style", "button", "dialog"]
```

### dependencies（外部 npm 包依赖）

```typescript
// 依赖外部 npm 包
dependencies: ["lucide-react", "@radix-ui/react-dialog"]
```

---

## 十、注册表结构说明

### Block/Composed 注册

```typescript
{
  name: "组件唯一标识符",        // 必须唯一
  type: "registry:block",        // ui | block | registry:example
  title: "组件显示名称",
  description: "组件简短描述",
  dependencies: [],             // 外部 npm 包依赖（可选）
  registryDependencies: [],     // 依赖的本组件库组件
  files: [
    {
      path: "blocks/组件名/文件名.tsx",  // 相对于 wuhan/
      type: "registry:component",
      target: "components/wuhan/blocks/文件名.tsx",  // 安装目标路径
    },
  ],
}
```

### Example 注册

```typescript
{
  name: "示例名称",              // 如 "my-component-demo"
  type: "registry:example",
  registryDependencies: ["my-component"],  // 依赖的组件
  files: [
    {
      path: "examples/组件名/示例名.tsx",
      type: "registry:example",
      target: "components/wuhan/examples/示例名.tsx",
    },
  ],
}
```

---

## 十一、快速参考表

| 操作 | 位置 | 注册表文件 |
|------|------|-----------|
| 添加 UI 组件 | `ui/component.tsx` | `ui/_registry.ts` |
| 添加 Block 组件 | `blocks/component-01.tsx` | `blocks/_registry.ts` |
| 添加组合组件 | `composed/component.tsx` | `composed/_registry.ts` |
| 添加示例 | `examples/component-demo.tsx` | `examples/_registry.ts` |
| 添加业务组件 | `recruitment/Component/` | `recruitment/_registry.ts` |
| 全局注册 | 自动生成 | `registry.ts` |

---

## 十二、最佳实践

### 1. 原语组件设计

- **单一职责**：每个原语组件只做一件事
- **可组合**：原语组件可以相互嵌套组合
- **可定制**：支持通过 props 和 className 定制

### 2. 命名规范

- 使用语义化状态名称（`pending`, `in_progress`, `completed`）
- 组件名使用 PascalCase
- 文件名使用 kebab-case

### 3. 类型定义

- 导出所有公共类型
- 使用 JSDoc 注释说明用途
- 保持类型简单易懂

### 4. 样式使用

- 使用 CSS 变量：`var(--bg-container)`, `var(--text-primary)` 等
- 使用 Tailwind 类：`rounded-[var(--radius-md)]`
- 避免硬编码颜色值

### 5. 可访问性

- 支持键盘导航
- 使用语义化 HTML
- 添加必要的 aria 属性

---

## 十三、常见问题

### Q: 如何添加新的 CSS 变量？

在 `style/globals.css` 的 `:root` 中添加变量：

```css
:root {
  --custom-color: #123456;
}
```

### Q: 如何支持深色模式？

在 `style/globals.css` 的 `.dark` 中添加对应的变量：

```css
.dark {
  --custom-color: #654321;
}
```

### Q: 如何添加动画效果？

使用 `tw-animate-css` 提供的类：

```tsx
className="animate-in fade-in zoom-in-95"
```

### Q: 如何调试注册的组件？

运行：

```bash
npx tsx scripts/build-registry.ts --verbose
```

---

## 十四、文件模板

### Block 组件完整模板

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SomeIcon } from "lucide-react";

const BOX_BORDER = "box-border [&>*]:box-border";

/**
 * 状态类型
 */
type Status = "pending" | "in_progress" | "completed";

/**
 * 容器原语
 */
export const ComponentPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ComponentPrimitive.displayName = "ComponentPrimitive";

/**
 * 完整组件
 */
export const Component = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: React.ReactNode;
    status?: Status;
  }
>(({ title, status = "pending", children, className, ...props }, ref) => {
  return (
    <ComponentPrimitive ref={ref} className={className} {...props}>
      {title && <span>{title}</span>}
      {children}
    </ComponentPrimitive>
  );
});
Component.displayName = "Component";

export type { Status };
```

### Composed 组件完整模板

```tsx
"use client";

import * as React from "react";
import {
  ComponentPrimitive,
  type Status,
} from "@/registry/wuhan/blocks/component/component-01";

export interface ComponentProps {
  title?: string;
  status?: Status;
  className?: string;
}

export const Component = React.forwardRef<
  HTMLDivElement,
  ComponentProps
>((props, ref) => {
  const { title = "标题", status = "pending", className } = props;

  return (
    <ComponentPrimitive ref={ref} title={title} status={status} className={className} />
  );
});
Component.displayName = "Component";

export type { ComponentProps };
```
