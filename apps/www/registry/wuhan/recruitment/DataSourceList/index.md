---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】DataSourceList 数据源列表

数据源选择列表组件，支持全选和单选。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { DataSourceList, type DataSourceItem } from './';

export default () => {
  const dataSources: DataSourceGroup[] = [
    {
      groupName: '临时上传',
      dataSources: [
        {
          id: '11',
          fileName: '张怡-简历',
          fileType: 'word',
          updateTime: '09:30',
        },
        {
          id: '12',
          fileName: 'AI产品经理_岗位招聘',
          fileType: 'pdf',
          updateTime: '09:30',
        },
      ],
    },
    {
      groupName: '企业知识',
      dataSources: [],
    },
    {
      groupName: '联网搜索',
      dataSources: [
        {
          id: '31',
          fileName: 'SWW1',
          fileType: 'pdf',
          updateTime: '09:30',
        },
        {
          id: '32',
          fileName: 'SWW2',
          fileType: 'pdf',
          updateTime: '09:30',
        },
      ],
    },
  ];

  /**
   * 选中状态变化回调
   */
  const handleChange = (selectedIds: string[]) => {
    console.log('选中的数据源:', selectedIds);
  };

  /**
   * 删除回调
   */
  const onDelete = (id: string) => {
    console.log('删除的数据源ID:', id);
  };

  /**
   * 重命名回调
   */
  const onRename = (data: { id: string; newName: string }, close: () => void) => {
    console.log('重命名的数据源ID:', data?.id, '新名称:', data?.newName);
    close();
  };

  return (
    <div style={{ width: 240, paddingLeft: 16, paddingRight: 16 }}>
      <DataSourceList dataSources={dataSources} onChange={handleChange} onDeleteConfirm={onDelete} onRenameConfirm={onRename} />
    </div>
  );
};
```

## API

| 参数            | 说明               | 类型                                    | 默认值           |
| --------------- | ------------------ | --------------------------------------- | ---------------- |
| dataSources     | 数据源列表（必传） | `DataSourceItem[]`                      | -                |
| selectedIds     | 选中的数据源ID列表 | `string[]`                              | -                |
| disabled        | 是否禁用           | `boolean`                               | `false`          |
| updateTimeLabel | 更新时间标签       | `string`                                | `'更新时间：'`   |
| selectAllText   | 全选文本           | `string`                                | `'选择所有来源'` |
| showSelectAll   | 是否显示全选       | `boolean`                               | `true`           |
| className       | 自定义类名         | `string`                                | -                |
| onChange        | 选中状态变化回调   | `(selectedIds: string[]) => void`       | -                |
| onDeleteConfirm | 删除确认回调       | `(id: string) => void`                  | -                |
| onRenameConfirm | 重命名确认回调     | `(id: string, newName: string) => void` | -                |

### DataSourceItem 数据源项类型

```ts
interface DataSourceItem {
  /** 数据源来源ID */
  id: string | number;
  /** 文件名称 */
  fileName?: string;
  /** 文件类型 */
  fileType?: string;
  /** 更新时间 */
  updateTime?: string;
}
```
