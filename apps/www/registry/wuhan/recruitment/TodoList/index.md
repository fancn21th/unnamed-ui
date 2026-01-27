---
group:
  title: 思维链组件
  order: 2
---

# 【待联调】TodoList 待办事项列表

简单的待办事项展示列表组件。

## 代码演示

### 基础用法

只读模式下的待办事项列表展示。

```tsx
import React, { useState } from 'react';
import TodoList from './TodoList.tsx';

export default () => {
  const [dataSource] = useState([
    { id: 'todo_001', content: '整理本周工作总结并提交', order: 1 },
    { id: 'todo_002', content: '给客户发送项目进度确认邮件', order: 2 },
    { id: 'todo_003', content: '补充VSCode插件使用文档', order: 3 },
  ]);

  return <TodoList dataSource={dataSource} title="我的待办" status="pending" editable={false} onItemsChange={() => {}} onConfirmExecute={() => {}} />;
};
```

### 可编辑模式

启用编辑功能，支持拖拽排序和修改待办事项。

```tsx
import React, { useState } from 'react';
import { message } from 'antd';
import TodoList from './TodoList.tsx';

export default () => {
  const [dataSource, setDataSource] = useState([
    { id: 'todo_001', content: '检查服务器SSH密钥配置是否生效', order: 1 },
    { id: 'todo_002', content: '优化显示器显示缩放比例设置', order: 2 },
    { id: 'todo_003', content: '测试新写的待办列表功能逻辑', order: 3 },
    { id: 'todo_004', content: '更新项目依赖到最新稳定版本', order: 4 },
  ]);

  const handleItemsChange = newItems => {
    setDataSource(newItems);
  };

  const handleConfirmExecute = () => {
    message.success('开始执行待办事项！');
  };

  return (
    <TodoList
      dataSource={dataSource}
      title="开发任务清单"
      status="pending"
      editable={true}
      onItemsChange={handleItemsChange}
      onConfirmExecute={handleConfirmExecute}
    />
  );
};
```

### 已完成状态

展示已完成的待办事项列表。

```tsx
import React, { useState } from 'react';
import TodoList from './TodoList.tsx';

export default () => {
  const [dataSource] = useState([
    { id: 'todo_001', content: '完成登录页面UI设计', order: 1 },
    { id: 'todo_002', content: '实现用户认证功能', order: 2 },
    { id: 'todo_003', content: '编写单元测试用例', order: 3 },
  ]);

  return <TodoList dataSource={dataSource} title="已完成任务" status="confirmed" editable={false} onItemsChange={() => {}} onConfirmExecute={() => {}} />;
};
```

## API

### TodoListProps

| 参数             | 说明                         | 类型                          | 默认值   | 必填 |
| ---------------- | ---------------------------- | ----------------------------- | -------- | ---- |
| dataSource       | 待办事项数据源               | `TodoItem[]`                  | -        | 是   |
| title            | 列表标题                     | `string`                      | 待办清单 | 否   |
| status           | 待办事项状态                 | `'pending' \| 'confirmed'`    | -        | 是   |
| editable         | 是否启用编辑功能             | `boolean`                     | `false`  | 否   |
| onItemsChange    | 待办事项列表变化时的回调函数 | `(items: TodoItem[]) => void` | -        | 是   |
| onConfirmExecute | 确认执行操作的回调函数       | `() => void`                  | -        | 是   |

### TodoItem

| 参数    | 说明         | 类型     | 必填 |
| ------- | ------------ | -------- | ---- |
| id      | 唯一标识符   | `string` | 是   |
| content | 待办事项内容 | `string` | 是   |
| order   | 排序顺序     | `number` | 是   |

## 特性

- ✅ **双模式展示** - 支持只读模式和可编辑模式，灵活切换
- 🎯 **拖拽排序** - 在编辑模式下，通过拖拽图标可调整待办事项顺序
- 🔄 **状态管理** - 支持待办（pending）和已完成（completed）两种状态
- 🛡️ **权限控制** - 通过 `editable` 和 `status` 组合控制编辑功能的可用性
- 🎨 **一致样式** - 基于主题系统，保持视觉风格统一
- 📝 **自定义标题** - 支持自定义列表标题，默认为"待办清单"
