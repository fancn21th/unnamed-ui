---
group:
  title: 招聘组件
  order: 3
---

# 【待联调】PersonnelRecommend 人员推荐列表

展示候选人推荐信息列表组件，用于呈现招聘系统中的候选人推荐结果及优先级建议。

## 功能特性

- ✅ **推荐分级**：支持"优先选择"、"备选"、"不建议"三种推荐级别
- ✅ **信息展示**：展示候选人名称和推荐理由描述
- ✅ **序号标识**：提供独特的序号样式，清晰标识排序
- ✅ **颜色区分**：不同推荐级别使用不同颜色标签，视觉区分明显
- ✅ **交互支持**：支持候选人名称点击事件回调
- ✅ **灵活配置**：支持显示/隐藏序号
- ✅ **类型安全**：完整的 TypeScript 类型定义

## 组件设计

### 视觉结构

每个推荐项包含两行：

**第一行**：

- **序号**：16x16px 圆形，蓝色渐变背景 (#0597FF)，内嵌阴影效果
- **候选人名字**：居中显示，可点击交互
- **推荐标签**：右侧对齐，颜色标识推荐级别

**第二行**：

- **推荐描述**：灰色文字 (#71717D)，说明推荐理由

### 推荐标签

| 标签         | 文案     | 背景色  | 文字颜色 | 适用场景           |
| ------------ | -------- | ------- | -------- | ------------------ |
| **优先选择** | 优先选择 | #06BA7E | 白色     | 强烈推荐，优先考虑 |
| **备选**     | 备选     | #1890FF | 白色     | 可以考虑，备用选项 |
| **不建议**   | 不建议   | #FF494F | 白色     | 不推荐录用         |

## 代码演示

### 基础用法

传入推荐数据数组即可展示列表。

```tsx
import React from 'react';
import PersonnelRecommend from './';
import { RecommendType } from './types';
export default () => {
  const recommendList = [
    {
      candidateName: '张三',
      recommendType: RecommendType.PRIORITY,
      description: '技术能力突出，项目经验丰富，沟通能力强，强烈推荐优先录用。',
    },
    {
      candidateName: '李四',
      recommendType: RecommendType.ALTERNATIVE,
      description: '技术基础扎实，但项目经验略显不足，可作为备选考虑。',
    },
    {
      candidateName: '王五',
      recommendType: RecommendType.NOT_RECOMMENDED,
      description: '技术能力与岗位要求存在较大差距，不建议录用。',
    },
  ];

  return <PersonnelRecommend recommendList={recommendList} />;
};
```

### 隐藏序号

通过 `showRank={false}` 隐藏序号。

```tsx
import React from 'react';
import PersonnelRecommend from './';
import { RecommendType } from './types';

export default () => {
  const recommendList = [
    {
      candidateName: '张三',
      recommendType: RecommendType.PRIORITY,
      description: '技术能力优秀，强烈推荐。',
    },
    {
      candidateName: '李四',
      recommendType: RecommendType.ALTERNATIVE,
      description: '基础扎实，可作为备选。',
    },
  ];

  return <PersonnelRecommend recommendList={recommendList} showRank={false} />;
};
```

### 完整场景示例

综合展示推荐列表的完整场景。

```tsx
import React from 'react';
import PersonnelRecommend from './';
import { RecommendType } from './types';
import { message } from 'antd';

export default () => {
  const recommendList = [
    {
      candidateId: 'candidate_001',
      candidateName: '张三',
      recommendType: RecommendType.PRIORITY,
      description:
        '候选人张三在前端开发领域有 8 年工作经验，精通 React、Vue 等主流框架，曾主导多个大型项目开发。技术能力突出，代码质量高，沟通协作能力强。面试表现优异，与团队文化契合度高。强烈建议优先录用。',
    },
    {
      candidateId: 'candidate_002',
      candidateName: '李四',
      recommendType: RecommendType.PRIORITY,
      description:
        '候选人李四具有 6 年前端开发经验，技术基础扎实，对新技术有较强的学习能力。项目经验丰富，曾参与多个中大型电商平台开发。性格沉稳，工作态度认真。综合评估优秀，建议优先考虑。',
    },
    {
      candidateId: 'candidate_003',
      candidateName: '王五',
      recommendType: RecommendType.ALTERNATIVE,
      description:
        '候选人王五有 4 年前端开发经验，技术能力中等，对 React 生态有一定了解。项目经验相对较少，但学习意愿强烈，发展潜力不错。可作为备选候选人考虑，建议进一步评估。',
    },
    {
      candidateId: 'candidate_004',
      candidateName: '赵六',
      recommendType: RecommendType.ALTERNATIVE,
      description: '候选人赵六有 3 年工作经验，基础知识掌握尚可，但在实际项目经验和技术深度上与岗位要求存在一定差距。如其他候选人未能录用，可作为备选方案。',
    },
    {
      candidateId: 'candidate_005',
      candidateName: '孙七',
      recommendType: RecommendType.NOT_RECOMMENDED,
      description:
        '候选人孙七虽有 2 年开发经验，但技术能力与岗位要求差距较大，缺乏独立项目经验，代码质量有待提升。面试表现一般，沟通能力不足。综合评估不符合岗位要求，不建议录用。',
    },
  ];

  const handleCandidateClick = (item, index) => {
    message.success(`正在查看候选人：${item.candidateName} 的详细信息`);
    // 实际场景中可以跳转到候选人详情页
    console.log('候选人详情：', item);
  };

  return <PersonnelRecommend description="产品经理岗位候选人推荐列表（共 5 人）" recommendList={recommendList} onCandidateClick={handleCandidateClick} />;
};
```

### 不同推荐类型分布

展示不同推荐级别的候选人分布。

```tsx
import React from 'react';
import PersonnelRecommend from './';
import { RecommendType } from './types';

export default () => {
  const recommendList = [
    {
      candidateName: '张三',
      recommendType: RecommendType.PRIORITY,
      description: '技术能力优秀，项目经验丰富，强烈推荐。',
    },
    {
      candidateName: '李四',
      recommendType: RecommendType.PRIORITY,
      description: '综合素质突出，与岗位匹配度高。',
    },
    {
      candidateName: '王五',
      recommendType: RecommendType.PRIORITY,
      description: '技术深度和广度均达到岗位要求。',
    },
    {
      candidateName: '赵六',
      recommendType: RecommendType.ALTERNATIVE,
      description: '基础扎实，但项目经验略显不足。',
    },
    {
      candidateName: '孙七',
      recommendType: RecommendType.ALTERNATIVE,
      description: '符合基本要求，可作为备选考虑。',
    },
    {
      candidateName: '周八',
      recommendType: RecommendType.NOT_RECOMMENDED,
      description: '技术能力与岗位要求存在较大差距。',
    },
  ];

  return <PersonnelRecommend description="本次招聘共筛选 6 位候选人：3 位优先选择，2 位备选，1 位不建议" recommendList={recommendList} />;
};
```

## API

### PersonnelRecommend Props

| 参数             | 说明                 | 类型                                                    | 默认值 | 必填 |
| ---------------- | -------------------- | ------------------------------------------------------- | ------ | ---- |
| description      | 描述文本             | `string`                                                | -      | 否   |
| recommendList    | 人员推荐数据数组     | `PersonnelRecommendItem[]`                              | -      | 是   |
| onCandidateClick | 点击候选人名称的回调 | `(item: PersonnelRecommendItem, index: number) => void` | -      | 否   |
| showRank         | 是否显示序号         | `boolean`                                               | `true` | 否   |

### PersonnelRecommendItem 接口

人员推荐项数据结构。

```typescript
interface PersonnelRecommendItem {
  /** 候选人名称 */
  candidateName: string;
  /** 推荐类型 */
  recommendType: RecommendType;
  /** 推荐描述/理由 */
  description: string;
  /** 候选人 ID（可选，用于点击等交互） */
  candidateId?: string;
  /** 支持额外的自定义字段 */
  [key: string]: any;
}
```

### RecommendType 枚举

推荐类型枚举，定义三种推荐级别。

```typescript
enum RecommendType {
  /** 优先选择 */
  PRIORITY = 'priority',
  /** 备选 */
  ALTERNATIVE = 'alternative',
  /** 不建议 */
  NOT_RECOMMENDED = 'notRecommended',
}
```

## 注意事项

- 推荐类型必须使用 `RecommendType` 枚举值
- 推荐列表不应为空，至少包含一个候选人
- 描述文字颜色 (#71717D) 确保与背景有足够对比度
- 候选人名称过长时自动省略，通过 title 属性显示完整名称
- 序号从 1 开始计数，符合用户习惯
- 如果不需要序号，可以通过 `showRank={false}` 隐藏
