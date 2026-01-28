---
title: 组件开发指南
description: 深入理解组件库的架构设计、原语概念和开发最佳实践
---

# 组件库架构分析与入门指南

本指南帮助你深入理解这个组件系统的设计理念和开发方法。

## 🎯 核心设计理念

这个组件库采用了**三层架构设计**，从底层到高层分别是：

### 1️⃣ UI 层 (`registry/wuhan/ui/`)
基础 UI 组件，基于 Radix UI 原语构建，提供最基础的交互能力。

### 2️⃣ Blocks 层 (`registry/wuhan/blocks/`)
业务组件块，采用**原语（Primitives）+ 业务组件**的分层设计。

### 3️⃣ Examples 层 (`registry/wuhan/examples/`)
组合示例，展示如何使用 blocks 构建完整的业务场景。

---

## 🔑 什么是"原语"（Primitives）？

**原语（Primitives）是组件设计中的关键概念**，让我们详细了解：

### 概念定义
```
原语 = 只提供样式和基础结构，不包含业务逻辑的组件
```

### 为什么需要原语？

1. **完全的可定制性**：用户可以自由组合，不受业务逻辑限制
2. **样式与逻辑分离**：样式稳定，业务逻辑灵活变化
3. **渐进式使用**：简单场景用高层组件，复杂场景用原语

### 实际例子对比

以 Message 组件为例，让我们看看两层设计：

**原语层（纯样式）**：
```tsx
// MessageAIPrimitive - 只提供样式，无状态逻辑
<MessageAIPrimitive feedback={<CustomFeedback />}>
  {content}
</MessageAIPrimitive>
```

**业务组件层（包含逻辑）**：
```tsx
// AIMessage - 包含 status 状态逻辑
<AIMessage 
  status="generating"  // 自动处理生成中状态
  errorMessage="生成失败"  // 自动处理错误状态
>
  {content}
</AIMessage>
```

---

## 📁 目录结构深度解析

完整的目录结构示例：

```
registry/wuhan/
├── ui/                          # 基础 UI 组件
│   ├── button.tsx              # 基于 Radix Slot 的按钮
│   ├── textarea.tsx            # 基础文本域
│   └── tooltip.tsx             # 基于 Radix Tooltip
│
├── blocks/                      # 业务组件块
│   ├── message/
│   │   └── message-01.tsx      # 包含原语 + 业务组件
│   ├── sender/
│   │   └── sender-01.tsx       # 发送器组件
│   └── _registry.ts            # blocks 注册配置
│
└── examples/                    # 使用示例
    ├── message/
    │   ├── message-demo.tsx           # 基础演示
    │   ├── message-composed-demo.tsx  # 组合演示
    │   └── message-with-avatar-header.tsx
    └── _registry.ts            # examples 注册配置
```

---

## 💡 核心设计模式详解

### 模式 1️⃣：原语 + 业务组件分层

以 `message-01.tsx` 为例，完整架构如下：

```tsx
// ==================== 第一层：状态原语 ====================
// 用于构建特定状态的 UI（如加载、错误）

const LoadingDots = React.forwardRef<...>((props, ref) => {
  // 只负责渲染三个跳动的点
  return <div>...</div>
});

const MessageGeneratingPrimitive = React.forwardRef<...>((props, ref) => {
  // 只负责渲染"生成中"的 UI 结构
  return (
    <div>
      {indicator}  {/* 接受任何加载指示器 */}
      {text}       {/* 接受任何提示文本 */}
    </div>
  );
});

// ==================== 第二层：样式原语 ====================
// 只提供外观样式，不处理状态

const MessageAIPrimitive = React.forwardRef<...>((props, ref) => {
  return (
    <div className="样式类...">
      {children}      {/* 完全由用户控制内容 */}
      {feedback}      {/* 完全由用户控制反馈区 */}
    </div>
  );
});

const MessageUserPrimitive = React.forwardRef<...>((props, ref) => {
  // 类似 MessageAIPrimitive，但样式不同
});

// ==================== 第三层：业务组件 ====================
// 封装常见业务逻辑（如状态处理）

const AIMessage = React.forwardRef<...>((props, ref) => {
  const { status, errorMessage, generatingContent, children } = props;
  
  // 根据 status 自动决定显示什么内容
  const content = React.useMemo(() => {
    if (status === "generating") return generatingContent;
    if (status === "failed") return errorMessage;
    return children;
  }, [status, ...]);
  
  // 内部使用原语
  return (
    <MessageAIPrimitive aria-live={...}>
      {content}
    </MessageAIPrimitive>
  );
});
```

**为什么这样设计？**

- 简单场景：直接用 `AIMessage`，自动处理状态
- 复杂场景：用 `MessageAIPrimitive`，完全自定义
- 极致定制：用 `MessageGeneratingPrimitive` 等小原语自己组合

---

### 模式 2️⃣：基于 Radix UI 的增强

以 `button.tsx` 为例：

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// 使用 CVA 管理变体样式
const buttonVariants = cva(
  "基础样式...",
  {
    variants: {
      variant: {
        default: "bg-primary...",
        destructive: "bg-destructive...",
        outline: "border...",
        // ...更多变体
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
  }
);

function Button({ asChild, variant, size, ...props }) {
  // asChild: Radix 的关键特性
  // true 时，Button 不渲染 <button>，而是把样式应用到子元素
  const Comp = asChild ? Slot : "button";
  
  return <Comp className={buttonVariants({ variant, size })} {...props} />;
}
```

**关键概念：Slot 模式**

```tsx
// 不使用 asChild：渲染真实 button
<Button>点击</Button>
// 输出：<button>点击</button>

// 使用 asChild：样式应用到子元素
<Button asChild>
  <a href="/link">点击</a>
</Button>
// 输出：<a href="/link" class="button样式">点击</a>
```

这允许你在保持样式的同时改变底层元素！

---

### 模式 3️⃣：组合模式（Composition）

以 `message-composed-demo.tsx` 为例：

```tsx
// ==================== 定义业务类型 ====================
interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
  feedback?: MessageFeedback;
}

// ==================== 构建小的组合单元 ====================
function FeedbackButtons({ feedback }: FeedbackButtonsProps) {
  return (
    <div className="flex items-center">
      {feedback.onCopy && (
        <Button variant="ghost" size="icon" onClick={feedback.onCopy}>
          <Copy />
        </Button>
      )}
    </div>
  );
}

// ==================== 构建消息渲染器 ====================
function MessageItemRenderer({ message }: MessageItemRendererProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="group/message">
          <UserMessage>{message.content}</UserMessage>
          {/* hover 时显示反馈 */}
          <div className="opacity-0 group-hover/message:opacity-100">
            <FeedbackButtons feedback={message.feedback} />
          </div>
        </div>
      </div>
    );
  }
  
  return <AIMessage>...</AIMessage>;
}

// ==================== 构建完整列表 ====================
export function ComposedMessageList({ messages }: Props) {
  return (
    <div>
      {messages.map(message => (
        <MessageItemRenderer key={message.id} message={message} />
      ))}
    </div>
  );
}
```

**组合的层次**：
1. 原子组件：`AIMessage`, `UserMessage`, `Button`
2. 分子组件：`FeedbackButtons`, `MessageItemRenderer`
3. 有机组件：`ComposedMessageList`

---

## 🛠️ 注册系统（Registry）

### 三个注册文件的作用

**1. `ui/_registry.ts`** - UI 组件注册
```typescript
export const ui: Registry["items"] = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],  // NPM 依赖
    files: [{
      path: "ui/button.tsx",
      type: "registry:ui",
      target: "components/ui/button.tsx",   // 安装目标路径
    }],
  },
];
```

**2. `blocks/_registry.ts`** - 业务组件注册
```typescript
export const blocks: Registry["items"] = [
  {
    name: "message-01",
    type: "registry:block",
    registryDependencies: ["style", "button"],  // 内部组件依赖
    files: [{
      path: "blocks/message/message-01.tsx",
      target: "components/wuhan/blocks/message-01.tsx",
    }],
  },
];
```

**3. `examples/_registry.ts`** - 示例注册
```typescript
export const examples: Registry["items"] = [
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: ["message-01"],  // 依赖 block
    files: [{
      path: "examples/message/message-demo.tsx",
      target: "components/wuhan/examples/message-demo.tsx",
    }],
  },
];
```

---

## 🎨 关键技术栈

### 1. CVA (Class Variance Authority)
管理组件变体的工具：

```tsx
const buttonVariants = cva(
  "base-classes",  // 基础样式
  {
    variants: {
      variant: { default: "...", destructive: "..." },
      size: { sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

// 使用
<Button variant="destructive" size="lg" />
```

### 2. Radix UI Primitives
提供无样式的可访问性组件：

```tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Radix 提供功能，你提供样式
<TooltipPrimitive.Root>
  <TooltipPrimitive.Trigger />
  <TooltipPrimitive.Content className="你的样式" />
</TooltipPrimitive.Root>
```

### 3. CSS 变量系统
使用设计令牌（Design Tokens）：

```tsx
className="
  text-[var(--text-primary)]
  bg-[var(--bg-container)]
  rounded-[var(--radius-xl)]
  p-[var(--padding-com-lg)]
"
```

---

## 📝 开发新组件的步骤

### Step 1: 规划组件层次

假设你要开发一个"卡片"组件，先规划：

```
Card
├── CardPrimitive           (原语 - 只有样式)
├── CardHeaderPrimitive     (原语 - 头部样式)
├── CardContentPrimitive    (原语 - 内容样式)
└── Card                    (业务组件 - 可选的业务逻辑)
```

### Step 2: 创建文件

```bash
# 创建 block 文件
apps/www/registry/wuhan/blocks/card/card-01.tsx
```

### Step 3: 编写原语组件

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================
interface CardPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// ==================== 样式原语层 ====================
export const CardPrimitive = React.forwardRef<HTMLDivElement, CardPrimitiveProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)]",
          "border",
          "border-[var(--border-neutral)]",
          "bg-[var(--bg-container)]",
          "shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
CardPrimitive.displayName = "CardPrimitive";

export const CardHeaderPrimitive = React.forwardRef<HTMLDivElement, CardPrimitiveProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-[var(--padding-com-lg)]",
          "border-b",
          "border-[var(--border-neutral)]",
          className
        )}
        {...props}
      />
    );
  }
);
CardHeaderPrimitive.displayName = "CardHeaderPrimitive";

export const CardContentPrimitive = React.forwardRef<HTMLDivElement, CardPrimitiveProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-[var(--padding-com-lg)]", className)}
        {...props}
      />
    );
  }
);
CardContentPrimitive.displayName = "CardContentPrimitive";

// ==================== 业务组件层（可选）====================
// 如果有特定业务逻辑，可以添加
interface CardProps extends CardPrimitiveProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ header, footer, children, ...props }, ref) => {
    return (
      <CardPrimitive ref={ref} {...props}>
        {header && <CardHeaderPrimitive>{header}</CardHeaderPrimitive>}
        <CardContentPrimitive>{children}</CardContentPrimitive>
        {footer && <div className="p-[var(--padding-com-lg)]">{footer}</div>}
      </CardPrimitive>
    );
  }
);
Card.displayName = "Card";
```

### Step 4: 注册组件

在 `blocks/_registry.ts` 中添加：

```typescript
{
  name: "card-01",
  type: "registry:block",
  title: "Card",
  description: "A flexible card component with header and content",
  registryDependencies: ["style"],
  files: [{
    path: "blocks/card/card-01.tsx",
    type: "registry:component",
    target: "components/wuhan/blocks/card-01.tsx",
  }],
}
```

### Step 5: 创建示例

在 `examples/card/card-demo.tsx`:

```tsx
"use client";

import {
  Card,
  CardPrimitive,
  CardHeaderPrimitive,
  CardContentPrimitive,
} from "@/registry/wuhan/blocks/card/card-01";

export default function CardDemo() {
  return (
    <div className="space-y-4">
      {/* 使用业务组件 - 简单 */}
      <Card header={<h3>标题</h3>}>
        内容区域
      </Card>
      
      {/* 使用原语 - 完全自定义 */}
      <CardPrimitive>
        <CardHeaderPrimitive>
          <div className="flex justify-between">
            <h3>自定义标题</h3>
            <button>操作</button>
          </div>
        </CardHeaderPrimitive>
        <CardContentPrimitive>
          完全自定义的内容
        </CardContentPrimitive>
      </CardPrimitive>
    </div>
  );
}
```

### Step 6: 注册示例

在 `examples/_registry.ts` 中添加：

```typescript
{
  name: "card-demo",
  type: "registry:example",
  registryDependencies: ["card-01"],
  files: [{
    path: "examples/card/card-demo.tsx",
    type: "registry:example",
    target: "components/wuhan/examples/card-demo.tsx",
  }],
}
```

### Step 7: 创建文档（MDX）

在 `content/docs/blocks/card.mdx` 创建组件文档：

```mdx
---
title: Card
description: A flexible card component with header and content
author: AF
---

<ComponentPreview
  name="card-demo"
  description="Card with default layout"
  className="mb-4"
/>

Card 组件提供了用于展示卡片内容的基础样式原语，适用于各种内容展示场景。

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

\`\`\`bash
npx shadcn@latest add http://localhost:3000/r/wuhan/card-01.json
\`\`\`

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource
  name="card-demo"
  title="registry/wuhan/examples/card/card-demo.tsx"
/>

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Examples

### Default

基础卡片示例。

<ComponentPreview
  name="card-demo"
  description="Default card"
  className="mb-4"
/>
```

### Step 8: 构建注册表

运行构建命令生成 JSON 配置：

```bash
cd apps/www
pnpm registry:build
```

这个命令会：
- 生成所有组件的 JSON 配置文件
- 格式化代码
- 更新注册表索引

---

## 🚀 快速创建组件脚本

为了简化创建流程，我们提供了自动化脚本。参见下方的"自动化工具"章节。

---

## ✅ 最佳实践检查清单

开发新组件时，确保：

- [ ] **原语与业务分离**：原语只管样式，业务组件管逻辑
- [ ] **使用 CSS 变量**：所有颜色、间距用 `var(--token-name)`
- [ ] **使用 forwardRef**：支持 ref 传递
- [ ] **添加 displayName**：方便调试
- [ ] **导出类型**：TypeScript 类型定义导出
- [ ] **添加注释**：用 JSDoc 注释公开的 API
- [ ] **无障碍支持**：添加合适的 ARIA 属性
- [ ] **响应式设计**：考虑不同屏幕尺寸
- [ ] **注册到 registry**：在 `_registry.ts` 中注册
- [ ] **提供示例**：至少一个基础示例

---

## 🎓 学习路径建议

### 第一周：熟悉现有组件
- 阅读 `button.tsx`、`tooltip.tsx`（简单 UI）
- 阅读 `message-01.tsx`（原语模式）
- 运行示例，理解组合

### 第二周：实践小组件
- 仿照 `toggle-button-01.tsx` 开发类似组件
- 创建自己的示例
- 理解 CVA 和 cn 工具

### 第三周：开发复杂组件
- 参考 `sender-01.tsx` 的多组件组合
- 实现状态管理
- 完善可访问性

---

## 🔍 常见问题

### Q: 什么时候用原语，什么时候用业务组件？
- 需要完全控制时用原语
- 常见场景用业务组件
- 两者可以混用！

### Q: 为什么要用 CSS 变量而不是 Tailwind 类？
- 支持主题切换
- 设计令牌统一
- 运行时可修改

### Q: `cn` 工具是什么？
```typescript
import { cn } from "@/lib/utils";

// 合并类名，后面的覆盖前面的
cn("text-red-500", "text-blue-500") // "text-blue-500"

// 条件类名
cn("base", condition && "conditional")
```

---

## 🎯 总结

这个组件库采用了**高度解耦、渐进增强**的设计哲学：

- 通过**原语**提供最大的灵活性
- 通过**业务组件**提供便捷性
- 通过**示例**展示最佳实践

你可以从简单的组件开始，逐步理解这种设计模式的优势。记住：**组件不是一次性写完的，而是随着需求不断演进的**。

---

## 🤖 自动化工具

### 快速创建组件脚本

我们提供了自动化脚本 `scripts/create-component.mts`，可以一键创建完整的组件结构。

#### 使用方法

```bash
cd apps/www
pnpm tsx scripts/create-component.mts
```

脚本会提示你输入：
1. **组件文件夹名**（kebab-case）：例如 `my-button`、`user-card`
2. **组件名称**（PascalCase）：例如 `MyButton`、`UserCard`

#### 自动生成的文件

脚本会自动创建以下文件和结构：

```
registry/wuhan/
├── blocks/
│   └── my-button/
│       └── my-button-01.tsx        # 组件实现（含模板代码）
├── examples/
│   └── my-button/
│       └── my-button-demo.tsx      # 示例代码
content/docs/blocks/
└── my-button.mdx                   # 组件文档
```

并自动：
- ✅ 在 `blocks/_registry.ts` 中注册组件
- ✅ 在 `examples/_registry.ts` 中注册示例
- ✅ 运行 `pnpm registry:build` 构建注册表

#### 示例

```bash
$ pnpm tsx scripts/create-component.mts

? 组件文件夹名 (kebab-case): user-profile
? 组件名称 (PascalCase): UserProfile

✅ 创建组件文件: blocks/user-profile/user-profile-01.tsx
✅ 创建示例文件: examples/user-profile/user-profile-demo.tsx
✅ 创建文档文件: content/docs/blocks/user-profile.mdx
✅ 注册组件到 blocks/_registry.ts
✅ 注册示例到 examples/_registry.ts
🏗️  运行 registry:build...
✅ 组件创建完成！

下一步：
1. 编辑 blocks/user-profile/user-profile-01.tsx 实现组件
2. 编辑 examples/user-profile/user-profile-demo.tsx 完善示例
3. 编辑 content/docs/blocks/user-profile.mdx 补充文档
4. 运行 pnpm dev 查看效果
```

#### 生成的组件模板

组件文件会包含完整的模板结构：

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

interface UserProfilePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// ==================== 样式原语层 ====================

export const UserProfilePrimitive = React.forwardRef<
  HTMLDivElement,
  UserProfilePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)]",
        "border",
        "border-[var(--border-neutral)]",
        "p-[var(--padding-com-lg)]",
        className
      )}
      {...props}
    />
  );
});
UserProfilePrimitive.displayName = "UserProfilePrimitive";

// ==================== 业务组件层（可选）====================

export const UserProfile = UserProfilePrimitive;
```

这样你就可以直接在模板基础上开发，而不用从零开始！

祝你开发顺利！🚀
