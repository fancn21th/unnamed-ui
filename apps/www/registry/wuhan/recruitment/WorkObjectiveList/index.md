---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】WorkObjectiveList 工作目标列表

展示工作目标及其完成进度的列表组件。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import WorkObjectiveList, { type WorkObjectiveListSource } from './';

export default () => {
  const source: WorkObjectiveListSource = {
    title: '工作目标',
    items: [
      {
        id: '1',
        title: '完成产品原型设计',
        progress: 80,
      },
      {
        id: '2',
        title: '编写技术文档',
        progress: 60,
      },
      {
        id: '3',
        title: '代码审查',
        progress: 100,
      },
    ],
  };

  return <WorkObjectiveList source={source} />;
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| source | 数据源（必传） | `WorkObjectiveListSource` | - |
| onItemClick | 点击列表项回调 | `(item: WorkObjectiveItem) => void` | - |
| className | 自定义类名 | `string` | - |

### 类型定义

```ts
interface WorkObjectiveItem {
  id: string;
  title: string;
  progress: number; // 0-100
  customIcon?: React.ReactNode;
}

interface WorkObjectiveListSource {
  title?: string;
  items: WorkObjectiveItem[];
}
```
