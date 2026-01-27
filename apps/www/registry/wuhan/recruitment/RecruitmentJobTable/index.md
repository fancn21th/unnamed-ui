---
group:
  title: 招聘组件
  order: 2
---

# 【待联调】RecruitmentJobTable 招聘岗位表格

招聘岗位选择表格组件，支持通过 Radio 单选行数据，并通过确认按钮获取选中的数据。

## 功能特性

- ✅ **单选行**：通过 Radio 单选某一行数据
- ✅ **自动序号**：第二列自动生成序号
- ✅ **链接列**：招聘需求和关联岗位支持链接点击
- ✅ **确认按钮**：表格右下角提供确认按钮，获取选中数据
- ✅ **状态保持**：支持受控模式，页面刷新后可恢复状态
- ✅ **确认锁定**：点击确认后自动禁用 Radio 并隐藏按钮
- ✅ **类型安全**：完整的 TypeScript 类型定义
- ✅ **灵活扩展**：支持自定义列配置

## 代码演示

### 基础用法

最简单的使用方式，传入数据源即可展示表格。

```tsx
import React from 'react';
import RecruitmentJobTable from './';
import { message } from 'antd';

export default () => {
  const dataSource = [
    {
      requirementId: 1,
      name: 'AI产品经理',
      requirementStatus: '10',
      relationJobs: ['高级产品经理'],
    },
    {
      requirementId: 2,
      name: '前端开发工程师',
      requirementStatus: '20',
      relationJobs: ['React 开发'],
    },
    {
      requirementId: 3,
      name: '后端开发工程师',
      requirementStatus: '30',
      relationJobs: ['Java 高级工程师'],
    },
  ];

  const handleConfirm = selected => {
    if (!selected) {
      message.warning('请先选择一行数据');
      return;
    }
    message.success(`已选择：${selected.name}`);
    console.log('选中的数据：', selected);
  };

  return <RecruitmentJobTable job_title={'高级AI产品经理'} dataSource={dataSource} onConfirm={handleConfirm} />;
};
```

### 受控模式 - 状态保持（推荐）

使用受控模式实现页面刷新后的状态保持，选中和确认状态由外部管理。

```tsx
import React, { useState, useEffect } from 'react';
import RecruitmentJobTable from './';
import { message } from 'antd';

export default () => {
  // 从 localStorage 或服务端恢复状态
  const [selectedId, setSelectedId] = useState<string | number | null>(() => {
    const saved = localStorage.getItem('selectedJobId');
    return saved ? JSON.parse(saved) : null;
  });

  const [confirmed, setConfirmed] = useState<boolean>(() => {
    const saved = localStorage.getItem('jobConfirmed');
    return saved ? JSON.parse(saved) : false;
  });

  const dataSource = [
    {
      requirementId: 1,
      name: 'AI产品经理',
      requirementStatus: '50',
      relationJobs: ['高级产品经理'],
    },
    {
      requirementId: 2,
      name: '前端开发工程师',
      requirementStatus: '60',
      relationJobs: ['React 开发'],
    },
  ];

  // 保存选中状态
  useEffect(() => {
    if (selectedId !== null) {
      localStorage.setItem('selectedJobId', JSON.stringify(selectedId));
    }
  }, [selectedId]);

  // 保存确认状态
  useEffect(() => {
    localStorage.setItem('jobConfirmed', JSON.stringify(confirmed));
  }, [confirmed]);

  const handleConfirm = selected => {
    if (!selected) {
      message.warning('请先选择一行数据');
      return;
    }

    // 调用服务端 API
    // await api.submitRecruitmentJob(selected);

    message.success(`已确认选择：${selected.name}`);
    setConfirmed(true); // 确认后锁定状态
  };

  return (
    <RecruitmentJobTable dataSource={dataSource} value={selectedId} onChange={setSelectedId} confirmed={confirmed} onConfirm={handleConfirm} job_title="" />
  );
};
```

### 自定义列配置

完全自定义列的配置，满足特殊业务需求。

```tsx
import React, { useState } from 'react';
import RecruitmentJobTable from './';
import { Tag, Radio, Typography } from 'antd';
import type { ColumnsType, RadioChangeEvent } from 'antd';
import type { RecruitmentJobData } from './';

const { Link } = Typography;

export default () => {
  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(null);

  const dataSource = [
    {
      requirementId: 1,
      name: 'AI产品经理',
      requirementStatus: '进行中',
      relationJobs: '高级产品经理',
      priority: 'high',
      deadline: '2026-02-01',
    },
  ];

  const customColumns: ColumnsType<RecruitmentJobData> = [
    {
      title: '选择',
      key: 'radio',
      width: 60,
      align: 'center',
      render: (_, record) => (
        <Radio
          value={record.requirementId}
          checked={selectedRowKey === record.requirementId}
          onChange={(e: RadioChangeEvent) => setSelectedRowKey(e.target.value)}
        />
      ),
    },
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: '招聘需求',
      dataIndex: 'name',
      key: 'name',
      render: text => <Link>{text}</Link>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      align: 'center',
      render: (priority: string) => <Tag color={priority === 'high' ? 'red' : 'default'}>{priority === 'high' ? '高' : '中'}</Tag>,
    },
    {
      title: '截止日期',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      align: 'center',
    },
  ];

  return <RecruitmentJobTable dataSource={dataSource} columns={customColumns} onConfirm={selected => console.log('选中：', selected)} />;
};
```

## API

### RecruitmentJobTableProps

| 参数               | 说明                                      | 类型                                             | 默认值   | 必填 |
| ------------------ | ----------------------------------------- | ------------------------------------------------ | -------- | ---- |
| job_title          | 表格描述文案                              | `string`                                         | -        | ✅   |
| dataSource         | 表格数据源                                | `T[]`                                            | -        | ✅   |
| value              | 当前选中的行 ID（受控模式，用于状态保持） | `string \| number \| null`                       | -        | -    |
| onChange           | 选中行变化时的回调（受控模式）            | `(selectedId: string \| number \| null) => void` | -        | -    |
| confirmed          | 是否已确认（确认后禁用 Radio 并隐藏按钮） | `boolean`                                        | `false`  | -    |
| columns            | 自定义列配置（不传则使用默认 5 列）       | `ColumnsType<T>`                                 | -        | -    |
| showConfirmButton  | 是否显示确认按钮                          | `boolean`                                        | `true`   | -    |
| confirmButtonText  | 确认按钮文案                              | `string`                                         | `'确认'` | -    |
| onConfirm          | 点击确认按钮的回调，参数为当前选中的数据  | `(selectedData: T \| null) => void`              | -        | -    |
| onRequirementClick | 点击招聘需求链接的回调                    | `(record: T) => void`                            | -        | -    |
| onPositionClick    | 点击关联岗位链接的回调                    | `(record: T) => void`                            | -        | -    |
| radioColumnWidth   | Radio 列宽度                              | `number`                                         | `60`     | -    |
| indexColumnWidth   | 序号列宽度                                | `number`                                         | `80`     | -    |

### RecruitmentJobData

表格数据项的接口定义。

| 字段              | 说明                      | 类型               | 必填 |
| ----------------- | ------------------------- | ------------------ | ---- |
| requirementId     | 岗位唯一标识，作为 rowKey | `string \| number` | ✅   |
| name              | 招聘需求名称              | `string`           | ✅   |
| requirementLink   | 招聘需求详情链接          | `string`           | -    |
| requirementStatus | 需求状态                  | `number`           | ✅   |
| relationJobs      | 关联岗位名称              | `string`           | ✅   |
| positionLink      | 关联岗位详情链接          | `string`           | -    |

## 设计说明

### 列结构

| 列序 | 列名     | 说明                               | 宽度   |
| ---- | -------- | ---------------------------------- | ------ |
| 1    | 选择     | Radio 单选框，用于选择某一行       | 60px   |
| 2    | 序号     | 自动生成的行序号                   | 80px   |
| 3    | 招聘需求 | 显示需求名称，可点击链接跳转       | 自适应 |
| 4    | 需求状态 | 显示需求当前状态                   | 120px  |
| 5    | 关联岗位 | 显示关联的岗位名称，可点击链接跳转 | 自适应 |

### 交互逻辑

1. **单选行**：点击 Radio 选中某一行，再次点击其他行时会取消之前的选择
2. **确认与锁定**：
   - 未选择任何行时点击确认，回调参数为 `null`
   - 已选择行时点击确认，回调参数为该行的完整数据对象
   - 确认后（`confirmed=true`），Radio 自动禁用，确认按钮自动隐藏
3. **状态保持**：
   - 使用受控模式（`value` + `onChange` + `confirmed`）可实现页面刷新后状态恢复
   - 建议配合 localStorage、Redux 或服务端状态管理
4. **链接列**：
   - 如果数据项包含 `requirementLink` 或 `positionLink`，则自动渲染为可点击的链接
   - 如果提供了 `onRequirementClick` 或 `onPositionClick` 回调，点击时会触发回调而非跳转

## 注意事项

1. ⚠️ 数据源中的每一项**必须**包含唯一的 `requirementId` 字段，用作 `rowKey`
2. ⚠️ **推荐使用受控模式**：传入 `value`、`onChange` 和 `confirmed` 实现状态保持
3. ⚠️ 确认后的状态管理：`onConfirm` 回调中应设置 `confirmed=true`，以触发锁定效果
4. ⚠️ 如果需要链接功能，建议同时提供 `xxxLink` 和 `onXxxClick` 回调，以便实现自定义跳转逻辑
5. ⚠️ 自定义列配置时，需要自行实现 Radio 的状态管理（参考示例）
