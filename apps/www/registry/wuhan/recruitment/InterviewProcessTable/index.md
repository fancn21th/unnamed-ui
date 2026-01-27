---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】InterviewProcessTable 面试流程表格

用于展示候选人简历评估信息的表格组件，支持自定义列配置和数据类型。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import InterviewProcessTable from './';

export default () => {
  const dataSource = [
    {
      num: 1,
      name: '张三',
      result: '值得进入下一轮',
      matchDegree: '85%',
      resumeReport: 'report1',
    },
    {
      num: 2,
      name: '李四',
      result: '不建议进入下一轮',
      matchDegree: '60%',
      resumeReport: 'report2',
    },
  ];

  return <InterviewProcessTable title="面试简历：AI产品经理" dataSource={dataSource} />;
};
```

### 自定义列配置

```tsx
import React from 'react';
import InterviewProcessTable from './';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CandidateData } from './';

const { Link } = Typography;

export default () => {
  const dataSource = [
    {
      num: 1,
      name: '张三',
      result: '值得进入下一轮',
      matchDegree: '85%',
      resumeReport: 'report1',
      customField: '自定义内容',
    },
  ];

  const customColumns: ColumnsType<CandidateData> = [
    {
      title: '测试',
      children: [
        {
          title: '序号',
          dataIndex: 'num',
          key: 'num',
          width: 80,
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
      ],
    },

    {
      title: '评估结果',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => <Link onClick={() => console.log(record)}>查看详情</Link>,
    },
  ];

  return <InterviewProcessTable dataSource={dataSource} columns={customColumns} />;
};
```

## API

| 参数       | 说明               | 类型             | 默认值                   |
| ---------- | ------------------ | ---------------- | ------------------------ |
| title      | 表格标题           | `string`         | `'面试简历：AI产品经理'` |
| dataSource | 表格数据源（必传） | `T[]`            | -                        |
| columns    | 自定义列配置       | `ColumnsType<T>` | 默认列配置               |

## 类型定义

### CandidateData

```ts
interface CandidateData {
  num: number; // 序号
  name: string; // 候选人姓名
  result: string; // 简历评估结论
  matchDegree: string; // 综合匹配度
  resumeReport?: string; // 简历评估报告
  [key: string]: any; // 支持自定义字段
}
```

### ResumeTableProps

```ts
interface ResumeTableProps<T = CandidateData> {
  title?: string; // 表格标题
  dataSource: T[]; // 数据源
  columns?: ColumnsType<T>; // 自定义列配置
}
```

## 默认列配置

组件提供了默认的列配置，包括：

- **候选人信息**
  - 序号
  - 候选人姓名
- **简历初筛阶段**
  - 简历评估结论（带颜色高亮）
  - 综合匹配度
  - 简历评估报告（预览链接）

## 注意事项

1. 组件支持泛型，可以传入自定义的数据类型
2. 自定义数据类型需要继承 `CandidateData` 接口
3. 如果不传 `columns` 参数，将使用默认列配置
4. 表格默认使用 `num` 字段作为 `rowKey`
5. 评估结论中包含"值得"或"进入"关键词时会显示为绿色
