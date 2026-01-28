# Thinking Process 思考过程

多阶段思考过程组件，用于展示 AI 思考的多个步骤，支持不同状态和时间显示。

## 特性

- ✅ **多状态支持**：pending（待处理）、thinking（思考中）、completed（已完成）
- ✅ **时间显示**：支持显示每个步骤的耗时
- ✅ **可折叠**：每个步骤都可以展开/收起
- ✅ **原语化设计**：完全可定制的原语组件
- ✅ **动画效果**：思考中状态带有脉冲动画
- ✅ **持久化提示**：支持显示后台处理提示

## 快速开始

### 基础用法

```tsx
import {
  ThinkingProcessContainerPrimitive,
  ThinkingStep,
} from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";

export default function Example() {
  return (
    <ThinkingProcessContainerPrimitive>
      <ThinkingStep
        status="thinking"
        title="思考中..."
        duration={14}
        content="正在分析问题..."
        defaultOpen
      />
    </ThinkingProcessContainerPrimitive>
  );
}
```

### 多步骤流程

```tsx
<ThinkingProcessContainerPrimitive>
  <ThinkingStep
    status="completed"
    title="分析问题"
    duration={5}
    content="问题分析完成"
  />
  
  <ThinkingStep
    status="thinking"
    title="生成方案"
    duration={12}
    content="正在生成解决方案..."
    defaultOpen
  />
  
  <ThinkingStep
    status="pending"
    title="评估结果"
    content="将评估方案的可行性"
  />
</ThinkingProcessContainerPrimitive>
```

### 带持久化提示

```tsx
<ThinkingPersistHintPrimitive>
  处理将需要几分钟，即使您离开页面也会继续进行
</ThinkingPersistHintPrimitive>

<ThinkingProcessContainerPrimitive>
  {/* 步骤 */}
</ThinkingProcessContainerPrimitive>
```

## API

### ThinkingStep

高级业务组件，封装了常用功能。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `status` | `'pending' \| 'thinking' \| 'completed'` | `'pending'` | 步骤状态 |
| `title` | `React.ReactNode` | - | 步骤标题（必填） |
| `content` | `React.ReactNode` | - | 步骤内容 |
| `duration` | `number` | - | 耗时（秒） |
| `icon` | `React.ReactNode` | - | 自定义图标 |
| `arrowIcon` | `React.ReactNode` | - | 自定义箭头图标 |
| `defaultOpen` | `boolean` | `false` | 是否默认展开 |
| `open` | `boolean` | - | 控制展开状态 |
| `onOpenChange` | `(open: boolean) => void` | - | 展开状态变化回调 |

### 原语组件

#### ThinkingProcessContainerPrimitive
容器组件，包裹所有步骤。

#### ThinkingStepPrimitive
单个步骤的容器。

#### ThinkingStepHeaderPrimitive
步骤头部，可点击展开/收起。

#### ThinkingStepContentPrimitive
步骤内容区域，带有左侧竖线装饰。

#### ThinkingStatusLabelPrimitive
状态标签，根据状态显示不同颜色。

#### ThinkingTimeLabelPrimitive
时间标签。

#### ThinkingIconContainerPrimitive
图标容器，根据状态显示不同颜色。

#### ThinkingLoadingDotsPrimitive
加载动画点。

#### ThinkingPersistHintPrimitive
持久化提示组件。

## 原语用法

如果需要完全自定义，可以使用原语组件：

```tsx
import {
  ThinkingStepPrimitive,
  ThinkingStepHeaderPrimitive,
  ThinkingStepContentPrimitive,
  ThinkingStatusLabelPrimitive,
  ThinkingIconContainerPrimitive,
  // ... 其他原语
} from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";

<ThinkingStepPrimitive status="thinking" defaultOpen>
  <ThinkingStepHeaderPrimitive>
    <ThinkingIconContainerPrimitive status="thinking">
      <YourIcon />
    </ThinkingIconContainerPrimitive>
    <ThinkingStatusLabelPrimitive status="thinking">
      自定义标题
    </ThinkingStatusLabelPrimitive>
  </ThinkingStepHeaderPrimitive>
  <ThinkingStepContentPrimitive>
    自定义内容
  </ThinkingStepContentPrimitive>
</ThinkingStepPrimitive>
```

## 样式定制

组件使用 CSS 变量，可以通过覆盖变量来定制样式：

- `--bg-layout`: 背景色
- `--bg-brand`: 品牌色
- `--text-primary`: 主文本色
- `--text-secondary`: 次要文本色
- `--text-tertiary`: 三级文本色
- `--text-success`: 成功状态色
- `--gap-xs/sm/md/lg`: 间距
- `--radius-lg`: 圆角大小

## 示例

查看更多示例：

- [基础示例](../examples/recruitment/thinking-process/thinking-process-demo.tsx)
- [简单用法](../examples/recruitment/thinking-process/thinking-process-simple.tsx)
- [多步骤](../examples/recruitment/thinking-process/thinking-process-multi-steps.tsx)
- [原语用法](../examples/recruitment/thinking-process/thinking-process-primitives.tsx)
