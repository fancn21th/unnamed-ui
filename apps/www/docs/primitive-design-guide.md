---
title: 原语设计与 Figma 拆分指南
description: 如何设计原语组件以及从 Figma 设计稿拆分组件的实战指南
---

# 原语设计与 Figma 拆分指南

## 📐 原语层的规范标准

### 核心原则

**是的，你的理解完全正确！原语 = 样式 + 结构，不包含业务逻辑。**

### 1️⃣ 原语必须遵循的规范

#### ✅ 应该做的事

1. **只提供样式和结构**
   ```tsx
   // ✅ 好的原语 - 只有样式
   export const CardPrimitive = React.forwardRef<HTMLDivElement, CardProps>(
     ({ className, ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn(
             "rounded-[var(--radius-lg)]",
             "border border-[var(--border-neutral)]",
             "p-[var(--padding-com-lg)]",
             className
           )}
           {...props}
         />
       );
     }
   );
   ```

2. **使用 CSS 变量（Design Tokens）**
   ```tsx
   // ✅ 使用 CSS 变量，支持主题切换
   "bg-[var(--bg-container)]"
   "text-[var(--text-primary)]"
   "rounded-[var(--radius-lg)]"
   
   // ❌ 不要硬编码颜色
   "bg-white"
   "text-gray-900"
   "rounded-lg"
   ```

3. **完全可控，通过 props 控制一切**
   ```tsx
   // ✅ 接受任何内容
   <CardPrimitive>
     {children}  {/* 用户完全控制内容 */}
   </CardPrimitive>
   
   // ✅ 样式可覆盖
   <CardPrimitive className="custom-styles">
   ```

4. **使用 forwardRef**
   ```tsx
   // ✅ 支持 ref 传递
   export const CardPrimitive = React.forwardRef<HTMLDivElement, CardProps>(
     (props, ref) => {
       return <div ref={ref} {...props} />;
     }
   );
   ```

5. **保持原子性和可组合性**
   ```tsx
   // ✅ 小而专注的原语
   <CardPrimitive>
     <CardHeaderPrimitive>标题</CardHeaderPrimitive>
     <CardContentPrimitive>内容</CardContentPrimitive>
   </CardPrimitive>
   ```

#### ❌ 不应该做的事

1. **不要包含业务逻辑**
   ```tsx
   // ❌ 错误 - 原语不应该有业务逻辑
   export const CardPrimitive = ({ data }) => {
     const [isOpen, setIsOpen] = useState(false);  // ❌ 状态管理
     
     useEffect(() => {  // ❌ 副作用
       fetchData();
     }, []);
     
     return <div onClick={() => setIsOpen(!isOpen)}>  // ❌ 事件处理逻辑
   };
   ```

2. **不要做数据获取或处理**
   ```tsx
   // ❌ 错误 - 不要在原语中获取数据
   const CardPrimitive = () => {
     const { data } = useFetch('/api/cards');  // ❌
     return <div>{data.map(...)}</div>;
   };
   ```

3. **不要强制内容结构**
   ```tsx
   // ❌ 错误 - 强制了内部结构
   const CardPrimitive = ({ title, content }) => {
     return (
       <div>
         <h3>{title}</h3>  {/* ❌ 强制使用 h3 */}
         <p>{content}</p>  {/* ❌ 强制使用 p */}
       </div>
     );
   };
   
   // ✅ 正确 - 让用户控制
   const CardPrimitive = ({ children }) => {
     return <div>{children}</div>;
   };
   ```

4. **不要依赖特定的数据格式**
   ```tsx
   // ❌ 错误 - 依赖特定数据结构
   interface CardProps {
     user: { name: string; avatar: string };  // ❌ 业务数据
   }
   
   // ✅ 正确 - 只接受 React 节点
   interface CardProps {
     children?: React.ReactNode;
   }
   ```

---

## 🎨 从 Figma 拆分原语的方法

### 步骤 1️⃣：识别视觉层次

打开 Figma 设计稿，分析组件的层次结构。

#### 示例：消息卡片

```
┌─────────────────────────────────────┐
│  [Avatar]  用户名              [···] │  ← Header
├─────────────────────────────────────┤
│  这是一条消息内容                      │  ← Content
│  可以有多行文本                        │
├─────────────────────────────────────┤
│  [👍]  [💬]  [↗️]                   │  ← Actions
└─────────────────────────────────────┘
```

**拆分思路：**
```tsx
<MessageCardPrimitive>              {/* 容器原语 */}
  <MessageHeaderPrimitive>          {/* 头部原语 */}
    <AvatarPrimitive />
    <UserNamePrimitive />
    <ActionMenuPrimitive />
  </MessageHeaderPrimitive>
  
  <MessageContentPrimitive>         {/* 内容原语 */}
    {children}
  </MessageContentPrimitive>
  
  <MessageActionsPrimitive>         {/* 操作栏原语 */}
    {actions}
  </MessageActionsPrimitive>
</MessageCardPrimitive>
```

**实际代码实现：**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

interface MessageHeaderPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 头部内容（如头像、用户名、时间等）
   */
  children?: React.ReactNode;
}

interface MessageContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 消息内容
   */
  children?: React.ReactNode;
}

interface MessageActionsPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 操作按钮（如点赞、评论、分享等）
   */
  children?: React.ReactNode;
}

interface MessageCardPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
}

// ==================== 原语实现 ====================

/**
 * 消息头部原语
 * 只提供布局样式，不包含任何业务逻辑
 */
export const MessageHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageHeaderPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Flexbox 布局
        "flex items-center justify-between",
        // 间距
        "gap-[var(--gap-md)]",
        "p-[var(--padding-com-md)]",
        // 边框
        "border-b border-[var(--border-neutral)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MessageHeaderPrimitive.displayName = "MessageHeaderPrimitive";

/**
 * 消息内容原语
 * 只提供内容区域的样式
 */
export const MessageContentPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageContentPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // 间距
        "p-[var(--padding-com-lg)]",
        // 文本样式
        "text-[var(--text-primary)]",
        "leading-[var(--line-height-2)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MessageContentPrimitive.displayName = "MessageContentPrimitive";

/**
 * 消息操作栏原语
 * 只提供操作按钮的布局样式
 */
export const MessageActionsPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageActionsPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Flexbox 布局
        "flex items-center gap-[var(--gap-sm)]",
        // 间距
        "px-[var(--padding-com-lg)]",
        "pb-[var(--padding-com-md)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MessageActionsPrimitive.displayName = "MessageActionsPrimitive";

/**
 * 消息卡片容器原语
 * 提供卡片的整体样式
 */
export const MessageCardPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageCardPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // 容器样式
        "w-full",
        // 边框和圆角
        "border border-[var(--border-neutral)]",
        "rounded-[var(--radius-xl)]",
        // 背景
        "bg-[var(--bg-container)]",
        // 阴影
        "shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MessageCardPrimitive.displayName = "MessageCardPrimitive";

// ==================== 导出 ====================

export type {
  MessageHeaderPrimitiveProps,
  MessageContentPrimitiveProps,
  MessageActionsPrimitiveProps,
  MessageCardPrimitiveProps,
};
```

**使用示例：**

```tsx
import {
  MessageCardPrimitive,
  MessageHeaderPrimitive,
  MessageContentPrimitive,
  MessageActionsPrimitive,
} from "@/components/primitives/message-card";

// 方式 1: 完全自定义组合
export function CustomMessageCard() {
  return (
    <MessageCardPrimitive>
      <MessageHeaderPrimitive>
        <div className="flex items-center gap-2">
          <img src="/avatar.jpg" className="size-8 rounded-full" />
          <span className="font-medium">用户名</span>
          <span className="text-xs text-[var(--text-secondary)]">2分钟前</span>
        </div>
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ···
        </button>
      </MessageHeaderPrimitive>
      
      <MessageContentPrimitive>
        这是一条消息内容，可以包含文本、图片、链接等任何内容。
      </MessageContentPrimitive>
      
      <MessageActionsPrimitive>
        <button>👍 12</button>
        <button>💬 5</button>
        <button>↗️ 分享</button>
      </MessageActionsPrimitive>
    </MessageCardPrimitive>
  );
}

// 方式 2: 只使用部分原语
export function SimpleMessageCard() {
  return (
    <MessageCardPrimitive>
      <MessageHeaderPrimitive>
        <h3>标题</h3>
      </MessageHeaderPrimitive>
      <MessageContentPrimitive>
        只有标题和内容，没有操作栏
      </MessageContentPrimitive>
    </MessageCardPrimitive>
  );
}

// 方式 3: 自定义样式覆盖
export function ColorfulMessageCard() {
  return (
    <MessageCardPrimitive className="border-blue-500 bg-blue-50">
      <MessageHeaderPrimitive className="bg-blue-100">
        <span>自定义颜色的头部</span>
      </MessageHeaderPrimitive>
      <MessageContentPrimitive>
        内容区域
      </MessageContentPrimitive>
    </MessageCardPrimitive>
  );
}
```

**关键点说明：**

1. **只有样式，没有逻辑** - 每个原语只负责布局和样式
2. **完全可控** - 通过 `children` 让用户控制内容
3. **样式可覆盖** - 通过 `className` prop 允许自定义样式
4. **使用 CSS 变量** - 所有颜色、间距都用设计令牌
5. **支持 ref** - 使用 `forwardRef` 传递 ref
6. **导出类型** - 方便 TypeScript 使用

### 步骤 2️⃣：识别可复用的部分

在 Figma 中，找出在多个地方使用的相同设计元素。

#### 检查清单：

- [ ] **颜色和间距** - 是否使用了设计系统的 tokens？
- [ ] **圆角** - 不同元素的圆角是否一致？
- [ ] **阴影** - 是否有标准的阴影层级？
- [ ] **字体** - 标题、正文、辅助文本的字体规范？
- [ ] **图标尺寸** - 图标是否有统一的尺寸规范？

#### 示例：按钮组件

```
Figma 中的按钮变体：
- Primary Button (蓝色背景)
- Secondary Button (白色背景，蓝色边框)
- Danger Button (红色背景)
- Ghost Button (无背景)
- Large / Medium / Small 尺寸
```

**拆分为原语：**
```tsx
// 不要为每个变体创建单独的原语
// ❌ PrimaryButtonPrimitive, SecondaryButtonPrimitive...

// ✅ 使用一个原语 + variant props
const ButtonPrimitive = cva(
  "base-styles",
  {
    variants: {
      variant: {
        primary: "bg-[var(--bg-brand)]",
        secondary: "border border-[var(--border-brand)]",
        danger: "bg-[var(--bg-error)]",
        ghost: "hover:bg-[var(--bg-hover)]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
      }
    }
  }
);
```

### 步骤 3️⃣：分离容器和内容

#### 原则：容器管样式，内容由用户控制

```
Figma 设计：
┌────────────────────────┐
│ 📄 文档标题.pdf        │
│ 2.3 MB · PDF          │
│ [下载] [删除]          │
└────────────────────────┘
```

**错误的拆分：**
```tsx
// ❌ 把内容写死在原语里
const FileCardPrimitive = ({ fileName, fileSize, fileType }) => {
  return (
    <div className="card">
      <div>{fileName}</div>
      <div>{fileSize} · {fileType}</div>
      <div>
        <button>下载</button>
        <button>删除</button>
      </div>
    </div>
  );
};
```

**正确的拆分：**
```tsx
// ✅ 容器原语 - 只管样式
const FileCardPrimitive = ({ children, className }) => {
  return (
    <div className={cn("p-4 border rounded-lg", className)}>
      {children}
    </div>
  );
};

// ✅ 子原语 - 各司其职
const FileCardMediaPrimitive = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
};

const FileCardInfoPrimitive = ({ children, className }) => {
  return (
    <div className={cn("text-sm text-[var(--text-secondary)]", className)}>
      {children}
    </div>
  );
};

const FileCardActionsPrimitive = ({ children, className }) => {
  return (
    <div className={cn("flex gap-2 mt-2", className)}>
      {children}
    </div>
  );
};

// 使用时由用户组合
<FileCardPrimitive>
  <FileCardMediaPrimitive>
    <FileIcon />
    <span>文档标题.pdf</span>
  </FileCardMediaPrimitive>
  <FileCardInfoPrimitive>
    2.3 MB · PDF
  </FileCardInfoPrimitive>
  <FileCardActionsPrimitive>
    <Button>下载</Button>
    <Button>删除</Button>
  </FileCardActionsPrimitive>
</FileCardPrimitive>
```

### 步骤 4️⃣：考虑状态变化

在 Figma 中查看组件的所有状态。

#### 常见状态：
- Default（默认）
- Hover（悬停）
- Active（激活）
- Disabled（禁用）
- Loading（加载中）
- Error（错误）
- Empty（空状态）

#### 示例：输入框状态

```
Figma 中的输入框状态：
- Default: 灰色边框
- Focus: 蓝色边框 + 阴影
- Error: 红色边框
- Disabled: 灰色背景
```

**拆分原语：**
```tsx
// ✅ 通过 data 属性和 CSS 处理状态
const InputPrimitive = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-error={error}  // 使用 data 属性标记状态
        className={cn(
          // 默认样式
          "border border-[var(--border-neutral)]",
          "focus:border-[var(--border-brand)]",
          "focus:ring-2 focus:ring-[var(--ring-brand)]",
          
          // 错误状态 - 通过 data 属性切换
          "data-[error=true]:border-[var(--border-error)]",
          "data-[error=true]:ring-[var(--ring-error)]",
          
          // 禁用状态 - 使用原生 :disabled
          "disabled:bg-[var(--bg-disabled)]",
          "disabled:cursor-not-allowed",
          
          className
        )}
        {...props}
      />
    );
  }
);
```

### 步骤 5️⃣：考虑响应式和适配性

检查 Figma 中的不同屏幕尺寸设计。

#### 示例：卡片网格

```
Desktop (1440px):
[Card] [Card] [Card] [Card]  ← 4列

Tablet (768px):
[Card] [Card]                ← 2列

Mobile (375px):
[Card]                       ← 1列
```

**原语设计：**
```tsx
// ✅ 原语不应该包含布局逻辑
// 布局由父容器控制

// 卡片原语 - 只管自己的样式
const CardPrimitive = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full",  // 填满父容器
        "p-4",
        "border",
        className
      )}
      {...props}
    />
  );
};

// 布局由使用者控制
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <CardPrimitive>...</CardPrimitive>
  <CardPrimitive>...</CardPrimitive>
  <CardPrimitive>...</CardPrimitive>
</div>
```

---

## 🛠️ 实战案例：从 Figma 到原语

### 案例：聊天消息组件

#### Figma 设计稿分析

```
┌─────────────────────────────────────────┐
│ [👤] AI Assistant            [⋯]       │  ← Header
├─────────────────────────────────────────┤
│ 你好！我是 AI 助手，有什么可以帮你的吗？  │  ← Content
│                                         │
│ ⏺⏺⏺                                    │  ← Loading (状态)
├─────────────────────────────────────────┤
│ [👍] [👎] [📋复制]                      │  ← Feedback
└─────────────────────────────────────────┘

状态：
- 生成中：显示 ⏺⏺⏺ 动画
- 成功：显示内容 + 反馈按钮
- 失败：显示错误信息 + 重试按钮
```

#### 第 1 步：拆分结构层次

```tsx
// 层次 1: 容器原语
MessageAIPrimitive
  ├─ 层次 2: 内容区
  └─ 层次 3: 反馈区

// 状态原语（独立）
LoadingDots
MessageGeneratingPrimitive
MessageFailedPrimitive
```

#### 第 2 步：编写容器原语（只管样式）

```tsx
// ==================== 样式原语层 ====================

const MessageAIPrimitive = React.forwardRef<
  HTMLDivElement,
  MessagePrimitiveProps
>(({ children, feedback, className, ...props }, ref) => {
  return (
    <div className="w-full" ref={ref} {...props}>
      {/* 内容区 - 样式固定，内容可变 */}
      <div
        className={cn(
          "w-full",
          "pt-[var(--gap-md)]",
          "pr-[var(--gap-lg)]",
          "pb-[var(--gap-md)]",
          "pl-[var(--gap-lg)]",
          "rounded-[var(--radius-xl)]",
          "font-[var(--font-family-cn)]",
          "text-[var(--text-primary)]",
          className
        )}
      >
        {children}  {/* 用户完全控制内容 */}
      </div>
      
      {/* 反馈区 - 可选 */}
      {feedback && (
        <div className="mt-[var(--gap-md)]">
          {feedback}  {/* 用户完全控制反馈内容 */}
        </div>
      )}
    </div>
  );
});
```

#### 第 3 步：编写状态原语（可复用的状态展示）

```tsx
// 加载动画原语 - 最小单元
const LoadingDots = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-1", className)} {...props}>
        <div className="w-1 h-1 rounded-full bg-[var(--bg-brand)] animate-bounce" 
             style={{ animationDelay: "0s" }} />
        <div className="w-1 h-1 rounded-full bg-[var(--bg-brand)] animate-bounce" 
             style={{ animationDelay: "0.2s" }} />
        <div className="w-1 h-1 rounded-full bg-[var(--bg-brand)] animate-bounce" 
             style={{ animationDelay: "0.4s" }} />
      </div>
    );
  }
);

// 生成中状态原语 - 组合小原语
const MessageGeneratingPrimitive = React.forwardRef<
  HTMLDivElement,
  { indicator?: ReactNode; text?: ReactNode }
>(({ indicator, text, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
      {indicator}  {/* 可以传入 LoadingDots 或其他 */}
      {text && <span className="text-[var(--text-secondary)]">{text}</span>}
    </div>
  );
});
```

#### 第 4 步：编写业务组件（包含逻辑）

```tsx
// ==================== 业务组件层 ====================

interface AIMessageProps {
  children?: ReactNode;
  status?: "idle" | "generating" | "failed";
  errorMessage?: ReactNode;
  generatingContent?: ReactNode;
  feedback?: ReactNode;
}

const AIMessage = React.forwardRef<HTMLDivElement, AIMessageProps>(
  ({ children, status = "idle", errorMessage, generatingContent, feedback, ...props }, ref) => {
    // 业务逻辑：根据状态决定显示什么
    const content = React.useMemo(() => {
      if (status === "generating") {
        return generatingContent ?? (
          <MessageGeneratingPrimitive 
            indicator={<LoadingDots />} 
            text="生成中..." 
          />
        );
      }
      if (status === "failed") {
        return errorMessage ?? "生成失败，请重试";
      }
      return children;
    }, [status, generatingContent, errorMessage, children]);

    // 使用原语，只传样式和内容
    return (
      <MessageAIPrimitive ref={ref} feedback={feedback} {...props}>
        {content}
      </MessageAIPrimitive>
    );
  }
);
```

#### 第 5 步：使用（三种方式）

```tsx
// 方式 1: 使用业务组件（简单场景）
<AIMessage status="generating" />
<AIMessage status="failed" errorMessage="网络错误" />
<AIMessage feedback={<FeedbackButtons />}>
  消息内容
</AIMessage>

// 方式 2: 使用原语（需要完全控制）
<MessageAIPrimitive feedback={<CustomFeedback />}>
  <CustomContent />
</MessageAIPrimitive>

// 方式 3: 使用小原语自己组合（极致定制）
<MessageAIPrimitive>
  <MessageGeneratingPrimitive 
    indicator={<CustomSpinner />} 
    text="AI 正在思考..." 
  />
</MessageAIPrimitive>
```

---

## 📋 拆分检查清单

从 Figma 拆分组件时，确保：

### 结构拆分
- [ ] 识别了所有视觉层次（容器、头部、内容、底部）
- [ ] 每个原语职责单一（一个原语只做一件事）
- [ ] 原语之间可以自由组合
- [ ] 没有强制内部结构

### 样式处理
- [ ] 所有颜色使用 CSS 变量（`var(--token-name)`）
- [ ] 所有间距使用设计令牌
- [ ] 所有圆角使用设计令牌
- [ ] 字体样式使用设计令牌

### 状态处理
- [ ] 识别了所有状态（hover、active、disabled、loading、error）
- [ ] 状态通过 props 或 data 属性控制
- [ ] 状态样式使用 CSS 伪类或 data 属性选择器

### 响应式
- [ ] 原语本身不包含断点逻辑
- [ ] 使用相对单位（w-full、flex、grid）
- [ ] 布局由父容器控制

### 可访问性
- [ ] 添加了合适的 ARIA 属性
- [ ] 使用语义化 HTML
- [ ] 支持键盘导航
- [ ] 有合适的 focus 样式

### TypeScript
- [ ] 所有 props 都有类型定义
- [ ] 导出了类型定义
- [ ] 使用 forwardRef 并正确标注泛型

### 文档
- [ ] 添加了 JSDoc 注释
- [ ] 说明了使用场景
- [ ] 有使用示例

---

## 🎯 总结

### 原语设计的黄金法则

1. **原语 = 样式 + 结构**，不包含业务逻辑
2. **使用 CSS 变量**，不硬编码颜色和尺寸
3. **完全可控**，通过 props 控制一切
4. **原子性**，每个原语做好一件事
5. **可组合**，小原语可以组成大原语

### Figma 拆分的核心思路

1. **看层次** - 从外到内，从大到小
2. **找复用** - 相同的视觉元素提取为原语
3. **分容器** - 容器管样式，内容由用户控制
4. **识别状态** - 每个状态都要考虑
5. **保持灵活** - 不要过度设计，保持简单

记住：**好的原语应该像乐高积木，可以自由组合成任何形状！** 🎨
