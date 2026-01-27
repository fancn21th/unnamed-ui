---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】Sender 发送器

带数据源计数的输入发送组件。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import Sender from './';

export default () => {
  const handleSubmit = (value: string) => {
    console.log('发送内容:', value);
  };

  return <Sender onSubmit={handleSubmit} />;
};
```

### 带数据源计数

```tsx
import React from 'react';
import Sender from './';

export default () => {
  return (
    <Sender
      placeholder="请输入消息"
      dataSourceCount={3}
      onSubmit={(value) => console.log(value)}
    />
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 输入框占位符 | `string` | `'请输入'` |
| value | 输入框值（受控） | `string` | - |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSubmit | 发送按钮点击回调 | `(value: string) => void` | - |
| dataSourceCount | 数据源数量 | `number` | `0` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否显示加载状态 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
