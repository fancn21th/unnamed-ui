---
group:
  title: 招聘组件
  order: 1
---

# 【开发中】RecruitmentActivityOverview 招聘活动概览

招聘活动概览组件，用于展示招聘活动的整体情况，包括简介、岗位招聘目标和候选人数据概览。

## 代码演示

### 基础用法

```tsx
import { useState } from 'react';
import { RecruitmentActivityOverview } from './';

export default () => {
  const [selectedPosition, setSelectedPosition] = useState('all');
  const dataSource = {
    introductionData: {
      goalDescription: '本次招聘活动需要在 年底前 ，招聘 1 个AI产品经理，2 个前端开发工程师。',
      completedText: '1 个前端开发工程师 的招聘。',
      analysisLink: 'https://www.bing.com',
      progress: 45,
      status: 'hasRisk',
      riskWarning: '在当前招聘节奏与条件下，按期完成招聘目标的确定性不足，若不进行调整，存在较高延期或失败概率。',
    },
    positionGoalList: [
      {
        id: '1',
        name: 'AI 产品经理',
        description: '年底前，以快速补位为目标，优先选择具备业务理解与推进能力的 “AI产品经理” ，允许技术深度阶段性不足，但不接受稳定性或协作风险。',
      },
      {
        id: '2',
        name: '前端开发工程师',
        description: '年底前，在严格控制成本的前提下招聘前端开发工程师，优先满足业务落地能力，对非核心能力保持弹性，但不接受明显能力断层。',
      },
    ],
    processStatisticList: [
      {
        stage: "resumeScreening",
        pending: 10,
        passed: 30,
        rejected: 60
        // 简历初筛无「进行中」「已接受/拒绝」「到岗/未到岗」字段，故不配置
      },
      {
        stage: "firstInterview",
        inProgress: 6,
        pending: 10,
        passed: 10,
        rejected: 4
        // 面试阶段无「已接受/拒绝」「到岗/未到岗」字段，故不配置
      },
      {
        stage: "secondInterview",
        inProgress: 2,
        pending: 3,
        passed: 4,
        rejected: 1
      },
      {
        stage: "thirdInterview",
        inProgress: 0,
        pending: 0,
        passed: 2,
        rejected: 1
      },
      {
        stage: "fourthInterview",
        inProgress: 0,
        pending: 0,
        passed: 2,
        rejected: 0
      },
      {
        stage: "offer",
        inProgress: 1,
        accepted: 0,
        declined: 0
        // Offer环节无「待确认」「通过/淘汰」「到岗/未到岗」字段，故不配置
      },
      {
        stage: "officialHired",
        onBoard: 1,
        notOnBoard: 0
        // 正式录用阶段无「进行中」「待确认」「通过/淘汰」「已接受/拒绝」字段，故不配置
      }
    ],
    totalCandidates: 100,
    candidateList: [
      {
        id: '1',
        name: '张三',
      },
      {
        id: '2',
        name: '李四',
      }
    ]
  };
  const positionOptions = [
    {
      label: '全部岗位',
      value: 'all',
    },
    {
      label: 'AI 产品经理',
      value: '1',
    },
  ];
  return (
    <RecruitmentActivityOverview
      dataSource={dataSource}
      style={{ width: '568px', border: '1px solid rgba(5, 5, 5, 0.06)' }}
      positionOptions={positionOptions}
      selectedPositionValue={selectedPosition}
      onPositionChange={value => setSelectedPosition(value)}
    />
  );
};
```

### RecruitmentActivityOverview

| 参数                  | 说明                 | 类型                              | 默认值 |
| --------------------- | -------------------- | --------------------------------- | ------ |
| className             | 自定义类名           | `string`                          | -      |
| style                 | 自定义样式           | `CSSProperties`                   | -      |
| positionOptions       | 岗位选项             | `PositionOption[]`                | -      |
| selectedPositionValue | 选中的岗位值         | `string`                          | -      |
| dataSource            | 招聘活动概览数据     | `RecruitmentActivityOverviewData` | -      |
| onPositionChange      | 岗位选项改变回调     | `(value: string) => void`         | -      |
| onDetailAnalysisClick | 详细分析链接点击回调 | `(value: string) => void`         | -      |
| onViewSwitch          | 查看切换回调         | `(value: string) => void`         | -      |
| onClose               | 关闭回调             | `() => void`                      | -      |
