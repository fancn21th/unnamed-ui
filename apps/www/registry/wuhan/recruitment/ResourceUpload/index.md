---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】ResourceUpload 资源上传

带弹窗的资源上传组件，支持点击和拖拽上传。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import ResourceUpload from './';

export default () => <ResourceUpload />;
```

### 外部控制弹窗

```tsx
import React, { useState } from 'react';
import ResourceUpload from './';
import { Button } from 'antd';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        打开上传
      </Button>
      <ResourceUpload visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};
```

## API

| 参数    | 说明                     | 类型         | 默认值 |
| ------- | ------------------------ | ------------ | ------ |
| visible | 弹窗显示状态（外部控制） | `boolean`    | -      |
| onClose | 关闭弹窗回调             | `() => void` | -      |
