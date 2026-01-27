---
group:
  title: 公共组件
  order: 3
---

# 【已完成】 报告模块容器

用于展示报告中某一部分的内容的容器

## 何时使用

- 当需要展示报告内容时

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { ReportSection } from './';

export default () => {
  return (
    <ReportSection title="标题">
      <div>内容</div>
    </ReportSection>
  );
};
```

### 设置背景颜色
```tsx
import React from 'react';
import { ReportSection } from './';

export default () => {
  return (
    <ReportSection title="标题" style={{ backgroundColor: '#EFEEFE' }}>
      <div>内容</div>
    </ReportSection>
  );
};
```


### 显示额外信息

```tsx
import React from 'react';
import { ReportSection } from './';

export default () => {
  return (
    <ReportSection title="标题" extra={<div>额外信息</div>}>
      <div>内容</div>
    </ReportSection>
  );
};
```

## API

| 参数      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| title     | 标题   | `ReactNode`     | -      |
| extra     | 额外信息   | `ReactNode`     | -      |
| className | 自定义类名 | `string`        | -      |
| style     | 自定义样式 | `CSSProperties` | -      |
| children  | 内容   | `ReactNode`     | -      |
