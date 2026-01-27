---
group:
  title: 公共组件
  order: 3
---

# 【待联调】ActionDropdown 操作下拉菜单

操作下拉菜单组件，基于 Ant Design Dropdown 封装，内置删除操作项，固定使用 MoreIcon 作为触发器。

## 何时使用

- 需要在表格、卡片等列表项中提供操作菜单时
- 需要快速添加带删除功能的操作菜单时
- 希望统一操作菜单视觉样式时

## 代码演示

### 基本用法

最简单的用法，包含编辑和删除操作。

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { EditIcon } from '@/icons';
import { message } from 'antd';

export default () => {
  const items = [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditIcon />,
    },
  ];

  const handleMenuClick = info => {
    if (info.key === 'edit') {
      message.success('编辑操作');
    }
  };

  const handleDelete = () => {
    message.success('已删除');
  };

  return <ActionDropdown items={items} showDelete onDelete={handleDelete} onMenuClick={handleMenuClick} />;
};
```

### 不显示删除项

通过 `showDelete={false}` 或不传该属性，可以隐藏删除项。

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { EditIcon, CopyIcon } from '@/icons';
import { message } from 'antd';

export default () => {
  const items = [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditIcon />,
    },
    {
      key: 'copy',
      label: '复制',
      icon: <CopyIcon />,
    },
  ];

  const handleMenuClick = info => {
    message.info(`点击了：${info.key}`);
  };

  return <ActionDropdown items={items} onMenuClick={handleMenuClick} />;
};
```

### 自定义删除文本

通过 `deleteText` 属性可以自定义删除项的文本。

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { message } from 'antd';

export default () => {
  const handleDelete = () => {
    message.warning('移除成功');
  };

  return <ActionDropdown showDelete deleteText="移除" onDelete={handleDelete} />;
};
```

### 仅删除项

不传 `items` 属性，仅显示删除项。

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { message } from 'antd';

export default () => {
  const handleDelete = () => {
    message.success('删除成功');
  };

  return <ActionDropdown showDelete onDelete={handleDelete} />;
};
```

### 更多菜单项

支持任意多个菜单项，删除项始终在最后，并自动添加分割线。

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { EditIcon, CopyIcon, DownloadIcon } from '@/icons';
import { message } from 'antd';

export default () => {
  const items = [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditIcon />,
    },
    {
      key: 'copy',
      label: '复制',
      icon: <CopyIcon />,
    },
    {
      key: 'download',
      label: '下载',
      icon: <DownloadIcon />,
    },
  ];

  const handleMenuClick = info => {
    message.info(`执行操作：${info.key}`);
  };

  return <ActionDropdown items={items} showDelete onMenuClick={handleMenuClick} />;
};
```

### 删除确认弹窗与 onDelete

组件内置删除确认弹窗（DeleteConfirmModal），无需自行实现二次确认。只需传递 `onDelete` 属性即可：

```tsx
import React from 'react';
import ActionDropdown from '@/components/recruitment/ActionDropdown';
import { EditIcon } from '@/icons';
import { message } from 'antd';

export default () => {
  const items = [{ key: 'edit', label: '编辑', icon: <EditIcon /> }];
  return (
    <ActionDropdown
      items={items}
      showDelete
      onDelete={() => message.success('已确认删除')}
      onMenuClick={info => {
        if (info.key === 'edit') message.info('编辑');
      }}
    />
  );
};
```

> 删除项点击后会弹出确认弹窗，确认后自动调用 `onDelete`，无需手动处理 Modal。

## API

### ActionDropdown

| 参数        | 说明                                                      | 类型                      | 默认值      |
| ----------- | --------------------------------------------------------- | ------------------------- | ----------- |
| items       | 自定义菜单项                                              | `MenuProps['items']`      | `[]`        |
| showDelete  | 是否显示删除项                                            | `boolean`                 | `false`     |
| deleteText  | 删除项文本                                                | `string`                  | `'删除'`    |
| onMenuClick | 菜单项点击回调（不含删除项，删除由 onDelete 处理）        | `MenuProps['onClick']`    | -           |
| onDelete    | 删除确认后回调（已内置确认弹窗，点击删除项自动弹出确认）  | `() => void`              | -           |
| trigger     | 触发下拉的行为                                            | `Array<'click'\|'hover'>` | `['click']` |
| ...其他属性 | 继承 Ant Design Dropdown 的所有属性（除 menu）            | `DropdownProps`           | -           |

### 注意事项

1. **固定触发器**：组件内部固定使用 `MoreIcon` 作为触发器，无法自定义 children
2. **删除操作接管**：组件内部已接管删除操作，点击删除项会自动弹出确认弹窗，确认后调用 `onDelete`。**不要**在 `onMenuClick` 中处理 `info.key === 'delete'` 的逻辑
3. **样式定制**：通过修改 `styles.ts` 中的 `StyledDropdownWrapper` 来自定义菜单样式
4. **分割线**：当 `showDelete={true}` 且存在其他菜单项时，会自动在删除项前添加分割线

## 设计指引

### 视觉规范

- 删除项使用红色（`#f04438`）图标和 danger 类型
- 触发器使用 MoreIcon（三个点）图标
- 菜单项支持图标 + 文本的组合

### 交互规范

- 默认使用 click 触发（可通过 trigger 属性修改）
- 删除操作建议配合二次确认弹窗使用
- 菜单项点击后菜单自动关闭

<!-- ### 最佳实践

```tsx
// 推荐：配合 Modal 进行删除确认
const handleMenuClick = (info) => {
  if (info.key === 'delete') {
    Modal.confirm({
      title: '确认删除',
      content: '删除后无法恢复，确定要删除吗？',
      onOk: () => {
        // 执行删除逻辑
      },
    });
  }
};

<ActionDropdown
  items={menuItems}
  showDelete
  onMenuClick={handleMenuClick}
/>
``` -->
