---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】CandidateReport 候选人报告

候选人综合评估报告组件，包含基本画像、核心能力评估、风险与不确定性、成本与性价比评估四个主要模块。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import CandidateReport, { type CandidateReportSource } from './';

export default () => {
  const source: CandidateReportSource = {
    basicProfile: {
      name: '张三',
      avatar: 'https://example.com/avatar.jpg', // 可选
      status: {
        text: '已通过二面',
        color: 'green',
      },
      gender: '男',
      age: 28,
      workExperience: 5,
      education: '本科',
      salaryExpectation: '20-30K',
      position: 'AI产品经理',
      experienceDetails: [
        '张三具备约 6 年互联网产品相关经验，近 3 年主要担任 B 端产品经理角色，负责业务系统类产品。',
        '其项目经历主要集中在内部管理系统与业务支撑平台建设，覆盖需求分析、方案设计及落地推进等环节，与岗位 JD 中的业务型产品职责相关。',
      ],
    },
    coreAbilityAssessment: {
      dimensions: [
        { name: '技术能力', score: 85 },
        { name: '沟通能力', score: 90 },
        { name: '项目管理', score: 80 },
        { name: '业务理解', score: 88 },
        { name: '创新能力', score: 75 },
      ],
      matchConclusion: '基本匹配',
      matchNote: '在当前以快速补位、业务推进为导向的招聘目标下可接受',
      description:
        '在当前招聘目标以"尽快补位、支撑业务推进"为优先的前提下，用人主管更看重业务理解与执行推进能力。候选人在业务拆解和跨团队协作方面表现稳定，能够满足岗位的核心短期诉求。尽管在复杂系统方法论与长期规划能力上存在不足，但结合用人主管对"接受广而不深、不接受长期培养"的偏好，该短板在当前阶段可被接受。',
    },
    riskAndUncertainty: {
      risks: [
        {
          id: 'risk-1',
          number: 1,
          iconType: 'number',
          title: '系统性方法论能力不足风险',
          description:
            '岗位 JD 明确要求具备复杂系统设计与方法论沉淀能力，但候选人在多轮面试中更多体现为经验驱动型判断，缺乏体系化表达，可能影响中长期产品演进质量。',
          interviewerComment: {
            name: '李四',
            comment: '对复杂系统的理解偏功能层面，方法论表达不够系统',
          },
        },
        {
          id: 'risk-2',
          iconType: 'warning',
          title: '风险等级判断',
          riskLevel: '中',
          riskLevelType: 'medium',
          description:
            '在当前招聘目标以"快速补位、业务推进"为优先的前提下，该风险阶段性可接受，但不适合承担长期架构型职责。',
        },
      ],
      uncertainties: [
        {
          id: 'uncertainty-1',
          number: 1,
          title: '跨团队协作中的冲突解决能力待验证',
          description:
            '候选人在简历与面试中主要体现了内部协作经验，但对涉及多方利益博弈或强冲突场景的处理能力尚未充分展现。',
          reason: '面试重点聚焦于业务理解与方案设计，对复杂人际关系处理与冲突化解能力的追问不足',
          impact:
            '若实际工作中频繁遭遇跨部门资源争夺或优先级冲突，候选人可能在推动落地时遇到阻力，影响项目进度',
        },
        {
          id: 'uncertainty-2',
          number: 2,
          title: '技术深度理解对产品决策的影响未知',
          description:
            'JD 要求候选人需具备一定技术理解力以支撑 AI 产品决策，但面试中对候选人技术背景与学习能力的评估相对有限。',
          reason: '候选人过往经历以业务类产品为主，技术型产品经验较少，且面试未深入考察其技术学习曲线',
          impact: '如果岗位实际需要频繁与算法团队对接或评估技术方案可行性，候选人可能需要较长适应期',
        },
      ],
    },
    costBenefitAssessment: {
      overallRating: '中等偏高',
      overallDescription:
        '在当前"快速补位、短期见效"的招聘导向下，候选人性价比相对合理，建议在明确短期预期的前提下录用。',
      recommendations: [
        '明确候选人入职后的短期目标（如 3-6 个月内的关键交付），避免对其长期规划能力抱有过高期待',
        '在试用期内重点观察其业务理解速度与跨团队协作效果，及时给予反馈与支持',
      ],
      positionSalaryRange: '20-30K',
      expectedSalary: '25K',
      costPressure: '期望薪资处于岗位区间中位，成本压力适中',
      hiddenCosts: '若候选人在复杂系统方法论与技术理解上的短板影响项目进度，可能需要额外的培训成本或团队支持',
      shortTermValue: '候选人在业务拆解与执行推进方面表现稳定，能够快速上手并支撑业务落地，符合短期补位需求',
      recruitmentGoalSupport: '高度契合当前"快速补位、业务推进"的招聘目标，但不适合承担长期架构型职责',
    },
  };

  return <CandidateReport source={source} />;
};
```

## API

### CandidateReport

| 参数      | 说明           | 类型                      | 默认值 |
| --------- | -------------- | ------------------------- | ------ |
| source    | 数据源（必传） | `CandidateReportSource`   | -      |
| className | 自定义类名     | `string`                  | -      |
| onClose   | 关闭回调       | `() => void`              | -      |

## 类型定义

### CandidateReportSource

候选人报告完整数据源

```ts
interface CandidateReportSource {
  /** 基本画像数据 */
  basicProfile: BasicProfileData;
  /** 核心能力评估数据 */
  coreAbilityAssessment: CoreAbilityAssessmentData;
  /** 风险与不确定性数据 */
  riskAndUncertainty: RiskAndUncertaintyData;
  /** 成本与性价比评估数据 */
  costBenefitAssessment: CostBenefitAssessmentData;
}
```

### BasicProfileData

基本画像数据

```ts
interface BasicProfileData {
  /** 候选人姓名 */
  name: string;
  /** 头像URL（可选，如果不提供则显示默认头像） */
  avatar?: string;
  /** 状态标签（如"已通过二面"） */
  status?: {
    text: string;
    color?: string;
  };
  /** 性别 */
  gender: string;
  /** 年龄 */
  age: number;
  /** 工作经验（年） */
  workExperience: number;
  /** 学历 */
  education: string;
  /** 薪资期望 */
  salaryExpectation: string;
  /** 当前/目标职位 */
  position: string;
  /** 详细经验描述列表 */
  experienceDetails: string[];
}
```

### CoreAbilityAssessmentData

核心能力评估数据

```ts
interface CoreAbilityAssessmentData {
  /** 能力维度数据（5个维度） */
  dimensions: AbilityDimension[];
  /** 匹配度结论（如"基本匹配"） */
  matchConclusion: string;
  /** 匹配度说明（括号内的说明） */
  matchNote?: string;
  /** 详细评估描述 */
  description: string;
}

interface AbilityDimension {
  /** 能力维度名称 */
  name: string;
  /** 分数（0-100） */
  score: number;
}
```

### RiskAndUncertaintyData

风险与不确定性数据

```ts
interface RiskAndUncertaintyData {
  /** 已识别风险列表 */
  risks: RiskItem[];
  /** 不确定性因素列表 */
  uncertainties: UncertaintyItem[];
}

interface RiskItem {
  /** 唯一标识（可选） */
  id?: string;
  /** 序号（仅当 iconType 为 'number' 时使用） */
  number?: number;
  /** 风险标题 */
  title: string;
  /** 风险描述 */
  description: string;
  /** 面试官评论（可选） */
  interviewerComment?: {
    name: string;
    comment: string;
  };
  /** 图标类型 */
  iconType: 'number' | 'warning';
  /** 风险等级（仅当 iconType 为 'warning' 时使用） */
  riskLevel?: string;
  /** 风险等级类型（用于样式，如'高'、'中'、'低'） */
  riskLevelType?: 'high' | 'medium' | 'low';
}

interface UncertaintyItem {
  /** 唯一标识（可选） */
  id?: string;
  /** 序号 */
  number: number;
  /** 不确定性标题 */
  title: string;
  /** 不确定性描述 */
  description: string;
  /** 产生原因 */
  reason?: string;
  /** 潜在影响 */
  impact?: string;
}
```

### CostBenefitAssessmentData

成本与性价比评估数据

```ts
interface CostBenefitAssessmentData {
  /** 综合性价比评级（如"中等偏高"） */
  overallRating: string;
  /** 综合性价比描述 */
  overallDescription: string;
  /** 决策建议列表 */
  recommendations: string[];
  /** 岗位薪资区间（如"20-30K"） */
  positionSalaryRange: string;
  /** 期望薪资（如"25K"） */
  expectedSalary: string;
  /** 成本压力描述 */
  costPressure?: string;
  /** 隐性成本描述 */
  hiddenCosts?: string;
  /** 短期可交付价值描述 */
  shortTermValue?: string;
  /** 对招聘目标的支持度描述 */
  recruitmentGoalSupport?: string;
}
```

## 组件结构

CandidateReport 组件由四个主要子组件构成：

1. **BasicProfile（基本画像）**：展示候选人的基本信息和经验概况
2. **CoreAbilityAssessment（核心能力评估）**：包含能力雷达图和匹配度评估
3. **RiskAndUncertainty（风险与不确定性）**：展示已识别的风险和不确定性因素
4. **CostBenefitAssessment（成本与性价比评估）**：评估综合性价比、成本和价值

## 样式说明

组件采用 Styled-Components 实现，主要颜色方案：

- 基本画像：浅绿色背景 `#F0F7F6`
- 核心能力评估：浅绿色背景 `#F0F7F6`
- 风险与不确定性：浅蓝色背景 `#EDF4FF`
- 成本与性价比：浅紫色背景 `#EFEEFE`
- 主题色：紫色 `#6155F5`
