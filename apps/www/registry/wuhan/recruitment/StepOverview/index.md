---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】StepOverview 步骤总览

显示当前进度的步骤总览组件，支持传入步骤数组自动渲染，支持展开/收起查看步骤详情。

## 代码演示

### 基础用法（传入步骤数组）

```tsx
import React from 'react';
import StepOverview from './';

export default () => {
  const steps = [
    { id: 1, title: '简历筛选', status: 'completed' },
    { id: 2, title: '初试', status: 'completed' },
    { id: 3, title: '复试', status: 'processing' },
    { id: 4, title: '终试', status: 'waiting' },
  ];

  return <StepOverview title="招聘流程" steps={steps} />;
};
```

### 带描述信息

```tsx
import React from 'react';
import StepOverview from './';

export default () => {
  const steps = [
    {
      id: 1,
      title: '简历筛选',
      description: '筛选符合条件的候选人简历',
      status: 'completed',
    },
    {
      id: 2,
      title: '初试',
      description: '进行初步面试评估',
      status: 'processing',
    },
    {
      id: 3,
      title: '复试',
      description: '进行深度技术面试',
      status: 'waiting',
    },
  ];

  return <StepOverview title="招聘流程" steps={steps} defaultExpanded />;
};
```

### 受控模式

```tsx
import React, { useState } from 'react';
import StepOverview from './';

export default () => {
  const [expanded, setExpanded] = useState(false);
  const steps = [
    { id: 1, title: '步骤1', status: 'completed' },
    { id: 2, title: '步骤2', status: 'processing' },
    { id: 3, title: '步骤3', status: 'waiting' },
  ];

  return (
    <StepOverview
      title="项目流程"
      steps={steps}
      expanded={expanded}
      onToggle={setExpanded}
      onStepClick={(step, index) => {
        console.log('点击步骤:', step, index);
      }}
    />
  );
};
```

### 指定当前步骤

```tsx
import React from 'react';
import StepOverview from './';

export default () => {
  const steps = [
    { id: 1, title: '步骤1', status: 'completed' },
    { id: 2, title: '步骤2', status: 'completed' },
    { id: 3, title: '步骤3', status: 'processing' },
    { id: 4, title: '步骤4', status: 'waiting' },
  ];

  // 指定当前步骤索引（从0开始）
  return <StepOverview title="项目流程" steps={steps} currentIndex={2} />;
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 流程标题 | `string` | `'项目开发流程'` |
| steps | 步骤数组 | `StepItem[]` | `[]` |
| currentIndex | 当前步骤索引（从0开始，不提供则自动计算） | `number` | - |
| defaultExpanded | 默认是否展开 | `boolean` | `false` |
| expanded | 是否展开（受控模式） | `boolean` | - |
| onToggle | 展开/收起回调 | `(expanded: boolean) => void` | - |
| onStepClick | 步骤点击回调 | `(step: StepItem, index: number) => void` | - |

### StepItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 步骤ID（可选） | `string \| number` | - |
| title | 步骤标题 | `string` | - |
| description | 步骤描述 | `string` | - |
| content | 步骤内容 | `string` | - |
| status | 步骤状态 | `'waiting' \| 'processing' \| 'completed' \| 'error'` | `'processing'` |

### 步骤状态说明

- `waiting`: 等待中（灰色圆圈）
- `processing`: 进行中（蓝色三层圆动画）
- `completed`: 已完成（绿色对勾）
- `error`: 错误/失败（红色感叹号）
