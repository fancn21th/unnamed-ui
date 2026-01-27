---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】ChatRadio 聊天单选

使用 Antd 实现的单选组件，包含标题、描述和选项列表。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import ChatRadio from './';

export default () => <ChatRadio />;
```

### 自定义选项

```tsx
import React from 'react';
import ChatRadio from './';

export default () => (
  <ChatRadio
    title="选择面试方式"
    description="请选择您希望的面试方式"
    options={[
      { label: '现场面试', value: 'onsite' },
      { label: '视频面试', value: 'video' },
      { label: '电话面试', value: 'phone' },
    ]}
    defaultValue="video"
  />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `'请选择您的偏好设置'` |
| description | 描述文本 | `string` | `'选择最符合您需求的选项'` |
| options | 选项列表 | `Array<{ label: string; value: string \| number }>` | 默认4个选项 |
| defaultValue | 默认选中值 | `string \| number` | `1` |
