---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】JobCard 职位卡片

显示职位信息的卡片组件，包含副标题、主标题和描述。支持展开/收起功能。

## 特性

✅ 支持展开/收起描述文本  
✅ 支持自定义展开图标  
✅ 支持点击事件回调  
✅ 支持控制描述文本显示行数  
✅ 响应式设计，支持 hover 效果  

## 代码演示

### 基础用法

```tsx
import React from 'react';
import JobCard from './';

export default () => <JobCard />;
```

### 自定义内容

```tsx
import React from 'react';
import JobCard from './';

export default () => (
  <JobCard
    subtitle="2026年1月14日发布"
    title="资深后端工程师"
    description="负责后端服务开发，熟悉微服务架构，精通 Java/Go 等语言。需要具备良好的系统设计能力和团队协作精神。"
  />
);
```

### 展开/收起功能

```tsx
import React from 'react';
import JobCard from './';

export default () => (
  <JobCard
    subtitle="相似JD参考"
    title="高级前端工程师"
    description="负责公司核心产品的前端开发工作，要求熟练掌握 React、TypeScript 等技术栈，具备良好的代码规范和团队协作能力。需要参与技术方案设计，优化前端性能，提升用户体验。"
    expandable={true}
    defaultExpanded={false}
    descriptionMaxLines={2}
  />
);
```

### 自定义事件处理

```tsx
import React from 'react';
import JobCard from './';

export default () => {
  const handleSubtitleClick = () => {
    console.log('副标题被点击');
  };

  const handleCardClick = () => {
    console.log('卡片被点击');
  };

  return (
    <JobCard
      subtitle="相似JD参考"
      title="高级前端工程师"
      description="负责公司核心产品的前端开发工作"
      onSubtitleClick={handleSubtitleClick}
      onClick={handleCardClick}
    />
  );
};
```

### 隐藏描述文本

```tsx
import React from 'react';
import JobCard from './';

export default () => (
  <JobCard
    subtitle="相似JD参考"
    title="高级前端工程师"
    description="负责公司核心产品的前端开发工作"
    showDescription={false}
  />
);
```

## API

### JobCardProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| subtitle | 副标题文本 | `string` | `'相似JD参考'` |
| title | 主标题文本 | `string` | `'高级前端工程师'` |
| description | 描述文本 | `string` | - |
| expandable | 是否可展开/收起 | `boolean` | `false` |
| defaultExpanded | 默认是否展开 | `boolean` | `false` |
| onSubtitleClick | 副标题点击事件 | `() => void` | - |
| onClick | 卡片点击事件 | `() => void` | - |
| expandIcon | 自定义展开图标 | `React.ReactNode` | - |
| className | 自定义样式类名 | `string` | - |
| showDescription | 是否显示描述文本 | `boolean` | `true` |
| descriptionMaxLines | 描述文本最大显示行数 | `number` | `2` |
