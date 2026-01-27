---
group:
  title: 招聘组件
  order: 3
---

# 【待联调】CandidatesTable 候选人信息表格

竖向表格展示候选人详细信息，第一列为字段名（表头），后续列为各候选人的对应值，支持多个候选人横向对比。

## 功能特性

- ✅ **竖向布局**：第一列为表头，后续列为各候选人的数据值
- ✅ **多候选人对比**：支持同时展示多个候选人，方便横向对比
- ✅ **信息展示**：展示候选人的姓名、年龄、工作年限、学历等关键信息
- ✅ **报告查看**：提供查看候选人综合评估报告的入口（Button）
- ✅ **事件回调**：支持自定义查看报告的回调事件，包含候选人索引
- ✅ **类型安全**：完整的 TypeScript 类型定义
- ✅ **样式统一**：与 RecruitmentJobTable 保持一致的视觉风格

## 代码演示

### 基础用法

传入候选人数据数组即可展示竖向表格。

```tsx
import React from 'react';
import CandidatesTable from './';
import { message } from 'antd';

export default () => {
  const candidateData = [
    {
      name: '张三',
      age: 28,
      totalWorkYears: 5,
      relatedWorkYears: 3,
      highestEducation: '本科',
      graduatedSchool: '北京大学',
      expectedSalary: '20-25K',
      reportId: 'report_001',
    },
    {
      name: '李四',
      age: 32,
      totalWorkYears: 8,
      relatedWorkYears: 6,
      highestEducation: '硕士',
      graduatedSchool: '清华大学',
      expectedSalary: '30-35K',
      reportId: 'report_002',
    },
    {
      name: '王五',
      age: 26,
      totalWorkYears: 3,
      relatedWorkYears: 2,
      highestEducation: '本科',
      graduatedSchool: '复旦大学',
      expectedSalary: '15-20K',
      reportId: 'report_003',
    },
    {
      name: '刘六',
      age: 33,
      totalWorkYears: 10,
      relatedWorkYears: 8,
      highestEducation: '本科',
      graduatedSchool: '德克萨斯州立大学',
      expectedSalary: '40-50K',
      reportId: 'report_004',
    },
  ];

  const handleViewReport = (reportId, candidateData, index) => {
    message.success(`查看候选人 ${candidateData.name} 的评估报告，报告 ID: ${reportId}，索引: ${index}`);
    console.log('候选人数据:', candidateData);
  };

  return <CandidatesTable candidateData={candidateData} onViewReport={handleViewReport} />;
};
```

## API

### CandidatesTable Props

| 参数                   | 说明                   | 类型                                                         | 默认值   | 必填 |
| ---------------------- | ---------------------- | ------------------------------------------------------------ | -------- | ---- |
| `candidateData`        | 候选人数据对象         | `CandidateData`                                              | -        | ✅   |
| `description`          | 表格描述文本           | `string`                                                     | -        | -    |
| `onViewReport`         | 点击查看报告按钮的回调 | `(reportId?: string, candidateData?: CandidateData) => void` | -        | -    |
| `viewReportButtonText` | 查看报告按钮的文案     | `string`                                                     | `'查看'` | -    |

### CandidateData 接口

| 字段               | 说明                         | 类型     | 必填 |
| ------------------ | ---------------------------- | -------- | ---- |
| `name`             | 候选人名称                   | `string` | ✅   |
| `age`              | 年龄                         | `number` | ✅   |
| `totalWorkYears`   | 总工作年限（单位：年）       | `number` | ✅   |
| `relatedWorkYears` | 相关岗位年限（单位：年）     | `number` | ✅   |
| `highestEducation` | 最高学历                     | `string` | ✅   |
| `graduatedSchool`  | 毕业院校                     | `string` | ✅   |
| `expectedSalary`   | 期望薪资                     | `string` | ✅   |
| `reportId`         | 候选人综合评估报告 ID 或标识 | `string` | -    |

## 设计思路

### 竖向表格实现原理

与传统的横向表格不同，竖向表格将字段名作为第一列，字段值作为第二列。实现关键点：

1. **数据转换**：将 `CandidateData` 对象转换为 `{ label, value }[]` 数组，每个对象代表表格的一行
2. **列配置**：只需要两列配置 `label` 和 `value`
3. **隐藏表头**：设置 `showHeader={false}`，因为第一列本身就充当了表头的作用
4. **样式定制**：为第一列（`.vertical-table-header`）应用表头样式（背景色、加粗等）

## 注意事项

1. **数据完整性**：确保 `candidateData` 包含所有必填字段，否则表格可能显示不完整
2. **年限单位**：工作年限会自动加上"年"的后缀，传入时只需要数字即可
3. **回调处理**：`onViewReport` 回调会传递 `reportId` 和完整的 `candidateData`，方便在回调中使用
4. **按钮交互**：查看报告按钮使用 `type="text"` 样式，与表格整体风格保持一致

## 类型定义

```typescript[];
  onViewReport?: (reportId?: string, candidateData?: CandidateData, index?: number
  name: string;
  age: number;
  totalWorkYears: number;
  relatedWorkYears: number;
  highestEducation: string;
  graduatedSchool: string;
  expectedSalary: string;
  reportId?: string;
  [key: string]: any;
}

interface CandidatesTableProps {
  description?: string;
  candidateData: CandidateData;
  onViewReport?: (reportId?: string, candidateData?: CandidateData) => void;
  viewReportButtonText?: string;
}
```

```

```
