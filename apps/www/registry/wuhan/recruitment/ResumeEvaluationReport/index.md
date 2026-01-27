---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】ResumeEvaluationReport 简历评估报告

简历评估报告组件，展示候选人的综合匹配度、优势、不足等信息。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import ResumeEvaluationReport, { type ResumeEvaluationReportSource } from './';

export default () => {
  const reportSource: ResumeEvaluationReportSource = {
    candidateName: '张三',
    overallMatch: {
      stars: 4,
      percentage: 85,
      conclusion: 'recommended',
      description: '应聘者具备相关经验，符合岗位核心要求。',
    },
    matchDetails: [
      {
        type: 'skill',
        percentage: 90,
        description: '技能匹配度高，掌握所需技术栈。',
      },
      {
        type: 'experience',
        percentage: 85,
        description: '工作经验丰富，有相关项目经历。',
      },
    ],
  };

  return <ResumeEvaluationReport source={reportSource} />;
};
```

### 完整示例

```tsx
import React, { useState } from 'react';
import ResumeEvaluationReport, { type ResumeEvaluationReportSource } from './';

export default () => {
  const [visible, setVisible] = useState(true);

  const reportSource: ResumeEvaluationReportSource = {
    candidateName: '刘刚',
    overallMatch: {
      stars: 4,
      percentage: 85,
      conclusion: 'recommended',
      description: '应聘者具备计算机背景及丰富的AI产品设计经验,精通原型设计与敏捷开发工具,符合需求分析师岗位的核心要求。',
    },
    matchDetails: [
      {
        type: 'skill',
        percentage: 90,
        description: '精通原型设计、敏捷开发工具,直接覆盖岗位"需求梳理、原型输出、跨团队协作"的核心履职要求,无技能盲区。',
      },
      {
        type: 'experience',
        percentage: 85,
        description: '丰富的AI产品设计经验,与需求分析师岗(尤其若涉及AI业务场景)的行业经验需求高度匹配,可快速衔接业务逻辑。',
      },
      {
        type: 'professional',
        percentage: 80,
        description: '计算机背景提供了技术逻辑理解能力,为需求分析中"衔接业务与开发、规避技术实现风险"提供理论支撑,无基础短板。',
      },
    ],
    strengths: [
      '教育背景符合(硕士),大厂工作经历符合(xxx科技公司),熟练掌握产品经理知识',
    ],
    weaknesses: [
      '候选人虽然有1年工作经验和硕士学历,但他的工作经历并未符合要求中的"在知名互联网大厂工作过"这一条件。此外,虽然候选人提到自己能运用至少一款主流前端框架。但并未指出具体是哪些框架。因此,综合以上两点,我们认为该拨选入的简历不符合AI产品经理的职位评估要求,',
    ],
    riskPoints: [
      '本科教育经历未填写;',
      '24年中途有空白期',
    ],
    interviewSuggestions: [
      '复杂业务场景下的技术选型与权衡;',
      '对历史项目中性能或稳定性问题的处理方式',
    ],
  };

  if (!visible) {
    return null;
  }

  return (
    <ResumeEvaluationReport 
      source={reportSource} 
      onClose={() => setVisible(false)}
    />
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| source | 数据源（必传） | `ResumeEvaluationReportSource` | - |
| onClose | 关闭回调 | `() => void` | - |
| labels | 可配置文本标签 | `object` | - |
| showStrengths | 是否显示优势 | `boolean` | `true` |
| showWeaknesses | 是否显示不足 | `boolean` | `true` |
| showRiskPoints | 是否显示风险点 | `boolean` | `true` |
| showInterviewSuggestions | 是否显示面试建议 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |

### 类型定义

```ts
type EvaluationConclusion = 'recommended' | 'not-recommended' | 'pending';
type MatchType = 'skill' | 'experience' | 'professional';

interface ResumeEvaluationReportSource {
  candidateName: string;
  overallMatch: {
    stars: number;
    percentage: number;
    conclusion: EvaluationConclusion;
    description: string;
  };
  matchDetails: MatchDetailItem[];
  strengths?: string[];
  weaknesses?: string[];
  riskPoints?: string[];
  interviewSuggestions?: string[];
}
```
