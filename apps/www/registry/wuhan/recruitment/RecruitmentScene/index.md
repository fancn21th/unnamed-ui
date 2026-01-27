---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】RecruitmentScene 招聘场景

招聘高频场景卡片列表。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import RecruitmentScene from './';

export default () => <RecruitmentScene />;
```

## API

| 参数   | 说明     | 类型                                                  | 默认值 |
| ------ | -------- | ----------------------------------------------------- | ------ |
| scenes | 卡片内容 | `{ title: string; icon: string; bgColor: string; }[]` | -      |

## 特性

- 支持多个筛选分组
- 卡片悬浮效果
- 点击卡片触发选择
