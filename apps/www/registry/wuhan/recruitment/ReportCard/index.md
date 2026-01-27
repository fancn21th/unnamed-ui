---
nav:
  title: 组件
  order: 1
group:
  title: 招聘组件
  order: 1
---

# 【待联调】ReportCard 报告卡片

通用的报告卡片组件，支持灵活的数据配置，适用于各种报告展示场景。

## 代码演示

### 基础卡片

只包含标题和更新时间的简洁卡片。

```tsx
import React from 'react';
import ReportCard from './';
import { FileTextOutlined } from '@ant-design/icons';

export default () => (
  <ReportCard
    icon={<FileTextOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
    title="候选人评估报告"
    updateTime="更新时间：08-04 13:56"
  />
);
```

### 带详情的卡片

包含底部详情区域的完整卡片。

```tsx
import React from 'react';
import ReportCard from './';
import { UserOutlined } from '@ant-design/icons';

export default () => (
  <ReportCard
    icon={<UserOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
    title="张三的简历评估"
    updateTime="更新时间：19:12"
    details={[
      { label: '应聘岗位：', value: 'AI产品经理' },
      { label: '综合匹配度：', value: '85%' },
      { label: '评估结论：', value: '推荐进入面试' },
    ]}
  />
);
```

### 自定义图标

可以传入自定义的图标组件或元素。

```tsx
import React from 'react';
import ReportCard from './';

// 自定义文档图标组件
const DocumentIcon = () => (
  <div style={{ 
    width: 24, 
    height: 30, 
    background: '#EAE5FF', 
    borderRadius: 4,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{ width: 16, height: 2, background: '#7B61FF', borderRadius: 9999, position: 'absolute', top: 8 }} />
    <div style={{ width: 16, height: 2, background: '#7B61FF', borderRadius: 9999, position: 'absolute', top: 14 }} />
    <div style={{ width: 8, height: 2, background: '#7B61FF', borderRadius: 9999, position: 'absolute', top: 20 }} />
  </div>
);

export default () => (
  <ReportCard
    icon={<DocumentIcon />}
    title="技术评估报告"
    updateTime="更新时间：2026-01-16 10:30"
    details={[
      { label: '技术能力：', value: '优秀' },
      { label: '项目经验：', value: '5年' },
      { label: '推荐等级：', value: 'A+' },
    ]}
  />
);
```

### 完整示例 - 招聘场景

```tsx
import React from 'react';
import ReportCard from './';
import { Space, Tag } from 'antd';
import { FileTextOutlined, UserOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

export default () => (
  <Space direction="vertical" size={16}>
    {/* 简历筛选卡片 */}
    <ReportCard
      icon={<FileTextOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
      title="李四 - 前端开发工程师"
      updateTime="更新时间：08-04 13:56"
      details={[
        { label: '应聘岗位：', value: '高级前端开发工程师' },
        { label: '综合匹配度：', value: <><Tag color="success">92%</Tag></> },
        { label: '评估结论：', value: <><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />强烈推荐</> },
      ]}
    />

    {/* 面试评估卡片 */}
    <ReportCard
      icon={<UserOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
      title="王五 - 产品经理"
      updateTime="更新时间：08-04 14:20"
      details={[
        { label: '应聘岗位：', value: 'AI产品经理' },
        { label: '综合匹配度：', value: <><Tag color="warning">75%</Tag></> },
        { label: '评估结论：', value: <><ClockCircleOutlined style={{ color: '#faad14', marginRight: 4 }} />待进一步评估</> },
      ]}
    />

    {/* 风险提示卡片 */}
    <ReportCard
      icon={<ExclamationCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />}
      title="赵六 - 数据分析师"
      updateTime="更新时间：08-04 15:00"
      details={[
        { label: '应聘岗位：', value: '高级数据分析师' },
        { label: '综合匹配度：', value: <><Tag color="error">58%</Tag></> },
        { label: '评估结论：', value: <><ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />不建议录用</> },
      ]}
    />
  </Space>
);
```

### 可点击卡片

添加点击事件，使卡片可交互。

```tsx
import React from 'react';
import ReportCard from './';
import { FileTextOutlined } from '@ant-design/icons';
import { message } from 'antd';

export default () => {
  const handleClick = () => {
    message.info('查看报告详情');
  };

  return (
    <ReportCard
      icon={<FileTextOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
      title="点击查看完整报告"
      updateTime="更新时间：刚刚"
      details={[
        { label: '报告类型：', value: '候选人评估' },
        { label: '状态：', value: '已完成' },
      ]}
      onClick={handleClick}
    />
  );
};
```

### 加载状态

使用 `loading` 属性显示加载状态，内部使用 antd 的 Spin 组件实现加载指示器。

```tsx
import React from 'react';
import ReportCard from './';
import { Space, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

export default () => {
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // 模拟加载
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <Space direction="vertical" size={16}>
      <Button type="primary" onClick={handleGenerate} loading={loading}>
        生成报告
      </Button>
      
      <ReportCard
        icon={<FileTextOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
        title={loading ? '正在生成报告...' : '候选人评估报告'}
        updateTime="更新时间：08-04 13:56"
        loading={loading}
      />
      
      <ReportCard
        icon={<FileTextOutlined style={{ fontSize: 24, color: '#7B61FF' }} />}
        title="持续加载中"
        loading={true}
      />
    </Space>
  );
};
```

## API

### ReportCard

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| icon | 自定义图标，可以是 ReactNode | `ReactNode` | - | 否 |
| title | 卡片标题 | `string` | - | 是 |
| updateTime | 更新时间 | `string` | - | 否 |
| details | 底部详情列表，传入则显示详情区域 | `DetailItem[]` | - | 否 |
| loading | 加载状态，使用 antd Spin 组件展示 | `boolean` | `false` | 否 |
| style | 自定义样式 | `CSSProperties` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| onClick | 点击事件 | `() => void` | - | 否 |

### DetailItem

| 参数 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 详情项标签 | `string` | 是 |
| value | 详情项值，支持字符串或 ReactNode | `string \| ReactNode` | 是 |

## 设计规范

- **正常状态**：
  - 卡片宽度：固定 352px
  - 基础卡片高度：80px（最小高度）
  - 带详情卡片高度：172px（最小高度）
  - 背景：linear-gradient(90deg, #F6F5FF 0%, #FFFFFF 100%)

- **加载状态** (`loading={true}`):
  - 卡片宽度：固定 280px
  - 背景透明度：rgba(246, 245, 255, 0.4) → rgba(255, 255, 255, 0.4)
  - 图标透明度：0.4
  - 标题透明度：0.3
  - 更新时间：隐藏
  - 垂直根据 `loading` 状态自动调整（正常：352px，加载：280px）
- 标题过长时自动显示省略号
- details 为空或不传时，卡片自动调整为基础样式（80px 高度）
- 详情项的 value 支持传入 ReactNode，可以自定义样式（如 Tag、Icon 等）
- 添加 onClick 时，卡片会显示 pointer 光标并有 hover 效果
- `loading={true}` 时：
  - 更新时间自动隐藏
  - 图标和标题显示半透明效果
  - 卡片内容垂直居中对齐
  - 适合在报告生成过程中使用
  - 图标尺寸：36x36px，圆角 8px
  - 内边距：16px
  - 元素间距：16px（头部与详情区）/ 10px（仅头部）

## 注意事项

- 卡片宽度根据 `loading` 状态自动调整（正常：352px，加载：280px）
- 标题过长时自动显示省略号
- details 为空或不传时，卡片自动调整为基础样式（80px 高度）
- 详情项的 value 支持传入 ReactNode，可以自定义样式（如 Tag、Icon 等）
- 添加 onClick 时，卡片会显示 pointer 光标并有 hover 效果
- `loading={true}` 时：
  - 使用 antd 的 Spin 组件展示加载指示器
  - 更新时间自动隐藏
  - 图标和标题显示半透明效果
  - 卡片内容垂直居中对齐
  - 适合在报告生成过程中使用