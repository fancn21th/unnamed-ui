---
group:
  title: 思维链组件
  order: 2
---

# 【待联调】StepDetail 步骤详情

展示步骤详细信息的组件，包含标题、描述和内容项列表。支持展开/收起功能。

## 特性

✅ 支持展开/收起查看详情  
✅ 支持多个内容项展示  
✅ 支持受控和非受控模式  
✅ 支持自定义描述和内容项  
✅ 支持隐藏标题栏（不传递 title 时）  

## 代码演示

### 基础用法

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail 
    title="完成项目初始化"
  />
);
```

### 自定义内容项

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail
    title="创建招聘需求：调用北森平台接口，完成招聘需求的创建，并记录招聘需求"
    items={[
      { title: '关键信息提取', content: '从上下文及记忆中，获取创建招聘需求必要的信息，已提取 所需岗位、需求部门、需求申请人、需求提出时间、需求人数、工作地点等关键槽位。' },
      { title: '性能优化', content: '评估代码性能并进行优化建议' },
      { title: '安全漏洞', content: '扫描潜在的安全风险点' },
    ]}
  />
);
```

### 展开/收起功能

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail
    title="完成项目初始化"
    description="在这个阶段，我们需要安装必要的依赖包，配置开发环境。"
    items={[
      { title: '阶段判断', content: '用户当前属于招聘需求准备阶段' },
      { title: '下一步', content: '准备发布招聘需求' },
    ]}
    expandable={true}
    defaultExpanded={false}
  />
);
```

### 受控模式

```tsx
import React, { useState } from 'react';
import StepDetail from './';

export default () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <StepDetail
      title="完成项目初始化"
      description="在这个阶段，我们需要安装必要的依赖包，配置开发环境。"
      items={[
        { title: '阶段判断', content: '用户当前属于招聘需求准备阶段' },
      ]}
      expanded={expanded}
      onToggle={setExpanded}
    />
  );
};
```

### 仅显示描述

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail
    title="完成项目初始化"
    description="在这个阶段，我们需要安装必要的依赖包，配置开发环境，并确保所有团队成员都能够正常运行项目。"
    items={[]}
  />
);
```

### 禁用展开/收起

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail
    title="完成项目初始化"
    description="固定显示的内容"
    items={[
      { title: '阶段判断', content: '用户当前属于招聘需求准备阶段' },
    ]}
    expandable={false}
  />
);
```

### 无标题模式

不传递 `title` 时，将隐藏标题栏（包括图标、标题和展开/收起按钮），仅显示内容区域。

```tsx
import React from 'react';
import StepDetail from './';

export default () => (
  <StepDetail
    items={[
      { title: '关键信息', content: '已提取必要的信息' },
      { title: '下一步操作', content: '准备进入下一阶段' },
    ]}
  />
);
```

## API

### StepDetailProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题，不传则隐藏标题栏 | `string` | - |
| description | 步骤描述 | `string` | - |
| items | 步骤内容项列表 | `StepDetailItem[]` | `[{ title: '阶段判断', content: '用户当前属于招聘需求准备阶段' }]` |
| expandable | 是否可展开/收起（仅在有标题时生效） | `boolean` | `true` |
| defaultExpanded | 默认是否展开 | `boolean` | `true` |
| expanded | 是否展开（受控模式） | `boolean` | - |
| onToggle | 展开/收起回调 | `(expanded: boolean) => void` | - |

### StepDetailItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 项目标题 | `string` | - |
| content | 项目内容 | `string` | - |
