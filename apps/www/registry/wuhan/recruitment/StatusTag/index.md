---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】StatusTag 状态标签

用于显示状态信息的标签组件，支持自定义样式。内置常用状态配置，开箱即用。

## 特性

✅ 内置预设状态（pending、confirmed）  
✅ 支持通过 status 快速使用  
✅ 支持自定义背景色和文本颜色  
✅ 支持自定义样式和类名  
✅ 可复用性强

## 代码演示

### 使用预设状态（推荐）

```tsx
import React from 'react';
import StatusTag from './';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <StatusTag status="pending" />
      <StatusTag status="confirmed" />
    </div>
  );
};
```

### 覆盖预设状态的文本

```tsx
import React from 'react';
import StatusTag from './';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <StatusTag status="pending" text="等待中" />
      <StatusTag status="confirmed" text="完成" />
    </div>
  );
};
```

### 完全自定义

```tsx
import React from 'react';
import StatusTag from './';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <StatusTag 
        text="进行中" 
        backgroundColor="#fff3e0" 
        color="#ff9800" 
      />
      <StatusTag 
        text="已完成" 
        backgroundColor="#e8f5e9" 
        color="#4caf50" 
      />
      <StatusTag 
        text="已拒绝" 
        backgroundColor="#ffebee" 
        color="#f44336" 
      />
    </div>
  );
};
```

### 自定义样式

```tsx
import React from 'react';
import StatusTag from './';

export default () => {
  return (
    <div>
      <StatusTag 
        text="自定义标签" 
        style={{
          backgroundColor: '#1890ff',
          color: '#fff',
          fontWeight: 500,
        }}
      />
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 状态类型（使用预设配置） | `'pending' \| 'confirmed'` | - |
| text | 标签文本（优先级高于 status） | `string` | - |
| backgroundColor | 背景色（优先级高于 status） | `string` | - |
| color | 文本颜色（优先级高于 status） | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| className | 自定义类名 | `string` | - |

## 预设状态配置

| 状态 | 文本 | 背景色 | 文本颜色 |
| --- | --- | --- | --- |
| pending | 待确认 | #FFFFFF | #666473 |
| confirmed | 已确认 | #E2F8EC | #06BA7E |

## 使用说明

1. **推荐用法**：使用 `status` 属性，自动应用预设的文本和颜色
2. **覆盖文本**：传入 `status` 和 `text`，使用预设颜色但自定义文本
3. **完全自定义**：传入 `text`、`backgroundColor`、`color`，不使用预设

## 默认样式

- height: 30px
- border-radius: 8px
- padding: 4px 8px
- font-weight: 400
- font-size: 14px
- line-height: 22px
- text-align: center

