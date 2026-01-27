---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】WorkResultList 工作结果列表

展示工作结果列表的组件，支持多种图标类型和更多操作。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import WorkResultList, { type WorkResultListSource } from './';

export default () => {
  const source: WorkResultListSource = {
    title: '工作结果',
    items: [
      {
        id: '1',
        title: '项目报告文档',
        sourceCount: 3,
        updateTime: '1分钟前',
        iconType: 'document',
      },
      {
        id: '2',
        title: '数据分析图表',
        sourceCount: 5,
        updateTime: '2小时前',
        iconType: 'chart',
      },
    ],
  };

  return <WorkResultList source={source} />;
};
```

## API

| 参数           | 说明                 | 类型                             | 默认值   |
| -------------- | -------------------- | -------------------------------- | -------- |
| source         | 数据源（必传）       | `WorkResultListSource`           | -        |
| sourceLabel    | 来源标签文本         | `string`                         | `'来源'` |
| onItemClick    | 点击列表项回调       | `(item: WorkResultItem) => void` | -        |
| onMoreClick    | 点击更多操作回调     | `(item, event) => void`          | -        |
| showMoreAction | 是否显示更多操作按钮 | `boolean`                        | `true`   |
| className      | 自定义类名           | `string`                         | -        |

### 类型定义

```ts
type WorkResultIconType = 'document' | 'chart' | 'presentation' | 'custom';

interface WorkResultItem {
  id: string;
  title: string;
  sourceCount: number;
  updateTime: string;
  iconType?: WorkResultIconType;
  customIcon?: React.ReactNode;
}
```
