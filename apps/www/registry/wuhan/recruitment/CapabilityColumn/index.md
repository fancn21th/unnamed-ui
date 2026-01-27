---
group:
  title: 招聘组件
  order: 3
---

# 【待联调】CapabilityColumn 能力对比柱状图

展示候选人能力维度对比分析的柱状图列表组件，通过多个柱状图直观对比候选人在不同能力维度上的表现。

## 组件架构

该组件采用两层结构：

1. **CapabilityBarChart**：单个能力维度柱状图组件
   - 展示某一能力维度下所有候选人的对比
   - 包含纵轴（能力等级）、横轴（候选人名称）、柱状图主体
   - 支持网格线辅助对齐

2. **CapabilityColumn**：柱状图列表组件
   - 管理多个柱状图的展示
   - 提供统一的容器和描述文本
   - 采用响应式 Grid 布局

## 代码演示

### 基础用法

传入能力维度数据数组即可展示柱状图列表。

```tsx
import React from 'react';
import CapabilityColumn from './';
import { CapabilityLevel } from './types';
export default () => {
  const capabilities = [
    {
      abilityName: '技术能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: '沟通能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
      ],
    },
    {
      abilityName: '领导力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.LOW },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
      ],
    },
  ];

  return <CapabilityColumn capabilities={capabilities} />;
};
```

### 带描述文本

添加描述文本说明柱状图用途。

```tsx
import React from 'react';
import CapabilityColumn from './';
import { CapabilityLevel } from './types';

export default () => {
  const capabilities = [
    {
      abilityName: '技术能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: '沟通能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
      ],
    },
  ];

  return <CapabilityColumn description="候选人能力维度对比分析" capabilities={capabilities} />;
};
```

### 多候选人对比

支持展示多个候选人的能力对比。

```tsx
import React from 'react';
import CapabilityColumn from './';
import { CapabilityLevel } from './types';
export default () => {
  const capabilities = [
    {
      abilityName: '技术能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.HIGH },
        { candidateName: '赵六', level: CapabilityLevel.LOW },
      ],
    },
    {
      abilityName: '沟通能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
        { candidateName: '赵六', level: CapabilityLevel.INSUFFICIENT },
      ],
    },
    {
      abilityName: '问题解决能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
        { candidateName: '赵六', level: CapabilityLevel.LOW },
      ],
    },
  ];

  return <CapabilityColumn description="四位候选人能力维度综合对比" capabilities={capabilities} />;
};
```

### 自定义柱状图颜色

可以自定义柱状图颜色数组。

```tsx
import React from 'react';
import CapabilityColumn from './';
import { CapabilityLevel } from './types';
export default () => {
  const capabilities = [
    {
      abilityName: '技术能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.HIGH },
      ],
    },
    {
      abilityName: '业务理解',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
      ],
    },
  ];

  // 自定义颜色：蓝色、紫色、绿色
  const customColors = ['#3B82F6', '#A855F7', '#10B981'];

  return <CapabilityColumn description="自定义颜色的能力对比" capabilities={capabilities} colors={customColors} />;
};
```

### 完整场景示例

综合展示多个能力维度的候选人对比。

```tsx
import React from 'react';
import CapabilityColumn from './';
import { CapabilityLevel } from './types';
export default () => {
  const capabilities = [
    {
      abilityName: '技术能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.HIGH },
      ],
    },
    {
      abilityName: '沟通能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: '团队协作',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: '问题解决',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.HIGH },
      ],
    },
    {
      abilityName: '学习能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.MEDIUM },
        { candidateName: '李四', level: CapabilityLevel.HIGH },
        { candidateName: '王五', level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: '抗压能力',
      candidates: [
        { candidateName: '张三', level: CapabilityLevel.HIGH },
        { candidateName: '李四', level: CapabilityLevel.MEDIUM },
        { candidateName: '王五', level: CapabilityLevel.LOW },
      ],
    },
  ];

  return <CapabilityColumn description="产品经理岗位候选人综合能力对比分析" capabilities={capabilities} />;
};
```

## API

### CapabilityColumn Props

| 参数         | 说明                 | 类型               | 默认值                        | 必填 |
| ------------ | -------------------- | ------------------ | ----------------------------- | ---- |
| description  | 描述文本             | `string`           | -                             | 否   |
| capabilities | 能力维度数据数组     | `CapabilityData[]` | -                             | 是   |
| colors       | 自定义柱状图颜色数组 | `string[]`         | `['#7078F8', '#BC68FF', ...]` | 否   |

### CapabilityData 接口

能力维度数据结构。

```typescript
interface CapabilityData {
  /** 能力维度名称（如：技术能力、沟通能力等） */
  abilityName: string;
  /** 该能力维度下各候选人的能力数据 */
  candidates: CandidateCapability[];
}
```

### CandidateCapability 接口

候选人能力数据结构。

```typescript
interface CandidateCapability {
  /** 候选人名称 */
  candidateName: string;
  /** 能力等级 (0-3) */
  level: CapabilityLevel;
}
```

### CapabilityLevel 枚举

能力等级枚举，定义四个评估等级。

```typescript
enum CapabilityLevel {
  /** 证据不足 */
  INSUFFICIENT = 0,
  /** 低 */
  LOW = 1,
  /** 中 */
  MEDIUM = 2,
  /** 高 */
  HIGH = 3,
}
```

## 设计说明

### 数据结构设计

组件采用分层的数据结构设计：

1. **能力维度层**（CapabilityData）：每个对象代表一个能力维度（如"技术能力"），包含维度名称和候选人数据列表
2. **候选人层**（CandidateCapability）：每个对象代表某个候选人在该能力维度上的评分

这种设计的优势：

- **清晰的层次结构**：能力维度和候选人分层管理，易于理解
- **便于扩展**：可轻松添加新的能力维度或候选人
- **数据一致性**：同一能力维度下的候选人顺序和数量保持一致，便于对比

### 颜色设计

默认提供 6 种柱状图颜色：

- 主色 1：`#7078F8`（蓝紫色） - 按需求设定
- 主色 2：`#BC68FF`（亮紫色） - 按需求设定
- 扩展色：`#10B981`（绿色）、`#F59E0B`（橙色）、`#EF4444`（红色）、`#8B5CF6`（紫色）

颜色循环使用，支持任意数量的候选人。

### 视觉设计

- **网格线**：添加水平网格线辅助对齐，提升可读性
- **柱状图圆角**：顶部圆角设计，美观且现代
- **最小高度**：即使"证据不足"等级也有最小高度（12.5%），确保可见性
- **悬停效果**：鼠标悬停时柱状图透明度变化，提供交互反馈
- **Tooltip**：使用原生 title 属性显示详细信息

### 响应式设计

采用 CSS Grid 布局实现响应式：

- `grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))`
- 每个柱状图最小宽度 400px
- 自动适配不同屏幕尺寸

### 可访问性

- 所有文本元素具有适当的颜色对比度
- 柱状图提供 title 属性，鼠标悬停时显示完整信息
- 候选人名称过长时自动省略并显示完整 title

## 注意事项

- 所有能力维度下的候选人数量应保持一致
- 候选人顺序应在所有能力维度中保持一致
- 能力等级必须使用 `CapabilityLevel` 枚举值（0-3）
- 自定义颜色数组长度无限制，会自动循环使用
- 组件内部已处理空数据情况，但建议上层保证数据完整性
