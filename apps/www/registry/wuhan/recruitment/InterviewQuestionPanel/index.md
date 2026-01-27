---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】InterviewQuestionPanel 面试题面板

面试题展示面板，包含题目类型、能力标签和追问方向。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import InterviewQuestionPanel, { type InterviewQuestionPanelSource } from './';

export default () => {
  const source: InterviewQuestionPanelSource = {
    title: '面试题_第一轮面试_张三',
    questions: [
      {
        id: '1',
        type: '经验深挖',
        queryId: 'query001',
        abilityTags: [
          { label: '项目管理' },
          { label: '团队协作' },
        ],
        context: '基于候选人提到的AI产品项目经验',
        followUpQuestions: [
          { content: '项目中遇到的最大挑战是什么？' },
          { content: '如何协调不同团队的需求？' },
        ],
      },
    ],
  };

  return <InterviewQuestionPanel source={source} />;
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| source | 数据源（必传） | `InterviewQuestionPanelSource` | - |
| onClose | 关闭回调 | `() => void` | - |
| onQuestionClick | 点击题目项回调 | `(item: InterviewQuestionItem) => void` | - |
| className | 自定义类名 | `string` | - |

### 类型定义

```ts
interface InterviewQuestionItem {
  id: string;
  type: string;
  queryId?: string;
  abilityTags: AbilityTag[];
  context?: string;
  followUpQuestions: FollowUpQuestion[];
}
```
