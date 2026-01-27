---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】MessageBubble 消息气泡

使用 Antd X 的消息气泡组件，支持打字机效果和操作按钮。

## 代码演示

### AI消息

AI消息没有背景色，padding为0。

```tsx
import React from 'react';
import MessageBubble from './';

export default () => <MessageBubble role="assistant" content="这是AI的消息内容" />;
```

### 用户消息

用户消息背景色为 #E8EAFF。

```tsx
import React from 'react';
import MessageBubble from './';

export default () => <MessageBubble role="user" content="这是用户的消息内容" />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| role | 消息角色 | `'user' \| 'assistant'` | `'assistant'` |
| placement | 消息位置 | `'start' \| 'end'` | 根据 role 自动设置 |
| content | 消息内容 | `string` | - |

## 特性

- 支持打字机效果
- 带有复制和重试操作
- 显示时间戳
- 用户头像
- AI消息无背景色，用户消息背景色为 #E8EAFF
