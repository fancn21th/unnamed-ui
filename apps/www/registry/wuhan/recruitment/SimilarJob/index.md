---
group:
  title: 招聘组件
title: 【待联调】SimilarJob 相似职位参考
order: 10
---

# SimilarJob

相似职位描述（JD）参考组件。用于展示与当前职位相似的其他职位信息，帮助招聘方快速参考同类岗位的描述模板。

## 何时使用

- 在创建新职位描述时，需要参考同类职位的书写方式
- 展示历史职位或竞品职位信息作为参考模板
- 帮助 HR 快速定位职位描述的标准格式

## 代码演示

### 基础用法

基本的相似职位展示，默认提供两条示例数据。

```tsx
import React from 'react';
import SimilarJob from '@/components/recruitment/SimilarJob';

export default () => {
  return <SimilarJob />;
};
```

### 自定义职位列表

传入自定义的职位数据列表。

```tsx
import React from 'react';
import SimilarJob from '@/components/recruitment/SimilarJob';

export default () => {
  const customJobs = [
    {
      label: '相似JD参考 1',
      title: 'React 高级开发工程师',
      desc: '负责公司核心产品的前端架构设计与开发，要求精通 React 生态系统，有大型项目架构经验，能够带领团队进行技术攻坚。',
    },
    {
      label: '相似JD参考 2',
      title: 'TypeScript 全栈工程师',
      desc: '使用 TypeScript 进行全栈开发，熟悉 Node.js、React、GraphQL 等技术栈，有微服务架构经验优先。',
    },
    {
      label: '相似JD参考 3',
      title: 'Web3 前端开发工程师',
      desc: '负责 Web3 应用的前端开发，要求熟悉区块链交互、钱包连接、智能合约调用等，有 DApp 开发经验者优先。',
    },
  ];

  return <SimilarJob jdList={customJobs} />;
};
```

## API

### SimilarJobProps

| 属性   | 说明         | 类型                                                     | 默认值       | 必填  |
| ------ | ------------ | -------------------------------------------------------- | ------------ | ----- |
| jdList | 职位列表数据 | `Array<{ label: string; title: string; desc: string; }>` | 默认示例数据 | false |

### JD 项数据结构

| 字段  | 说明     | 类型     | 示例                  |
| ----- | -------- | -------- | --------------------- |
| label | 标签文本 | `string` | `'相似JD参考 1'`      |
| title | 职位标题 | `string` | `'前端开发工程师'`    |
| desc  | 职位描述 | `string` | `'负责公司前端项...'` |

## 设计说明

### 交互特性

- **全屏展开**：每个职位卡片右上角的全屏图标支持扩展查看完整内容（待实现）
- **视觉层次**：使用标签、标题、描述三级信息层次，确保信息清晰易读
- **卡片布局**：采用卡片式设计，各职位信息独立呈现，便于快速浏览对比

### 样式规范

- 使用 `styled-components` 进行样式管理
- 卡片间距保持一致，提供良好的视觉节奏
- 全屏图标使用项目统一的图标系统 `@/icons`
