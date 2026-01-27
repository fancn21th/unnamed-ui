---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】Thinking 深度思考

一个带有思考状态展示的折叠面板组件，用于展示 AI 的思考过程和结果。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import Thinking from './';

export default () => <Thinking status="start" content="正在分析候选人的简历..." />;
```

### 思考中状态

```tsx
import React from 'react';
import Thinking from './';

export default () => (
  <Thinking
    status="start"
    content="在面对复杂的问题时，深度思考能够帮助我们理清思路，找到最佳解决方案。通过系统化的分析和多角度的审视，我们可以更全面地理解问题的本质，从而做出更明智的决策。"
  />
);
```

### 思考完成状态

```tsx
import React from 'react';
import Thinking from './';

export default () => (
  <Thinking status="end" content="根据候选人的技能和经验，推荐以下面试问题：1. 请介绍您最近完成的一个项目... 2. 您如何处理团队协作中的冲突..." />
);
```

## API

| 参数    | 说明     | 类型               | 默认值       |
| ------- | -------- | ------------------ | ------------ |
| status  | 当前状态 | `'start' \| 'end'` | `'start'`    |
| content | 思考内容 | `string`           | 默认提示文本 |

## 特性

- 支持思考中和思考完成两种状态
- 带有图标和状态文本
- 可折叠的面板展示
- 默认展开显示内容
- 渐变色标题样式
