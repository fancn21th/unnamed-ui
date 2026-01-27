---
nav:
  title: Markdown
  order: 2
title: Markdown Viewer
description: 支持流式渲染的 Markdown 组件
---

支持流式输出的 Markdown 渲染组件。

## 演示

````tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Markdown from '@/components/Chat/Markdown';
import styled from 'styled-components';

const StyledStreamingDemo = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;

  .demo-toolbar {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 9;
    background: rgba(255, 255, 255, 0.95);
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);

    .status-text {
      font-size: 12px;
      color: #666;
      margin-left: 8px;
    }
  }

  .demo-content {
    padding: 24px;
    padding-top: 64px;
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;

    .empty-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;
      color: #999;
      font-size: 14px;
    }
  }
`;

const sampleMarkdown = `这是一篇为你准备的关于 **2026年 AI 趋势深度分析** 的文章草稿。<sup>1<sup>

考虑到当前的时间节点（2026年初），这篇文章的视角设定为：从“震撼”走向“实用”，从“对话”走向“行动”。这篇文章的视角设定为：**从“震撼”走向“实用”，从“对话”走向“行动”**。

-----

# 2026 AI 趋势深度展望：从“生成内容”到“解决问题”的范式转移

> 这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容

如果说 2023 年是 AI 的“觉醒元年”，2024-2025 年是“百模大战”的爆发期，那么**2026 年将被定义为“落地与行动”的一年**。

| 表头 | 表头 | 表头 |
| ----- | ----- | ----- |
| 表格内容| 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 |

在这个阶段，企业和用户不再满足于 AI 能写诗或画图，焦点已经彻底转移到 **ROI（投资回报率）、自主代理（Agents）以及物理世界的融合**。以下是定义 2026 年 AI 格局的五大核心趋势。

-----

## 1.智能体(AgenticAl):从Chatbot到Copilot再到Coworker

这是2026年最显著的转变。过去的Al是基于"提示词-回复"的被动协交互,而现在的AI正进化为能够**自主规划、
使用工具并完成复杂任务**的智能体。

- **趋势特征**: AI不再只是聊天框里的对话者,它们开始拥有"手脚"。你列如,你不再问AI"怎么定机票",而是告
诉它"帮我定一张周五去东京的票,价格在3000以内",Al会自主调用用API、比价、填写信息并完成支付。
  - **趋势特征**: 手机、PC和汽车将标配高性能的NPU。用户的个人数报(如聊天记录、相册、健康数据)可
  以在本地被AI处理,无需上传云端。
  - **市场格局**: 厂商们致力于在3B-7B参数规模下,压榨出媲美过去GPT-3.5水平的能力。
  - **核心价值**: 隐私即服务(Privacyas a Service)。本地Al让用户收于把私密信息交给AI助理。
- **技术支撑**: LAM(LargeAction Models,大型动作模型)的成熟,便使得模型能够理解并操作软件界面
(IU)。
- **商业影响**: 软件形态将发生重构。SaaS软件将不再是给人用用的,而是给AI用的。企业内部将出现"数字化员
工",自动处理报销、初级代码审查和客户售后。

| 表头 | 表头 | 表头 | 表头 | 表头 |
| ----- | ----- | ----- | ----- | ----- |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |

表格说明/注释

## 2.推理能力与"慢思考"(System2Thinking)

早期的LLM(大语言模型)更像是"快思考"(直觉反应,容易产生幻觉)。2026年的模型架构更加注重**逻辑
推理链(Chain of Thought)** 的内化。

\`\`\`bash
echo "Hello, World!"
\`\`\`

- **趋势特征**:模型在回答复杂数学,编程或逻辑问题时,会花费更多时间进行"内心独白"和自我纠错,从而大
幅降低错误率

- **应用场景**:这使得Al终于可以涉足医疗诊断辅助、复杂法律合同审查、科学研究等对准确性要求极高的领
域,而不仅仅是生成营销文案。

-----

## 行业启示:我们该如何应对?

**对于企业(ToBusiness)**:
- **告别"拿着锤子找钉子"**:停止单纯为了用AI而用AI。重点应放在重塑工作流(Workflow)上。
- **建立私有知识库**:通用大模型大家都一样,企业的护城河在于私有数据+RAG(检索增强生成)的深度结合。

\`\`\`bash
echo "Hello, World!"
\`\`\`

**对于个人(Tolndividual)**:
- **不仅是Prompt Engineer,更是Al Manager**:随着Al变得更自主,未来的核心技能不是"怎么写提示词",
而是"怎么拆解任务、评估AI的产出、并管理多个AI智能体协作"。
- **回归"人"的特质**:既然Al能处理逻辑和执行,情感共情、审美判断、战略决策这些人类特质将变得前所未有
的昂贵。

-----

## 结语

> 2026 年，AI 祛魅了。它不再是科幻小说里的魔法，而是像电力和互联网一样的基础设施。对于也是身处这一变革中的我们来说，最大的风险不是 AI 会取代人类，而是我们还在用旧地图寻找新大陆。

2026年,Al祛魅了。它不再是科幻小说里的魔法,而是像电力和互联网一样的基础设施。对于也是身处这一变革
中的我们来说,最大的风险不是AI会取代人类,而是我们还在用月旧地图寻找新大陆。
`;

export default () => {
  const [content, setContent] = useState<string>(sampleMarkdown);
  const [status, setStatus] = useState<'loading' | 'updating' | 'success'>('success');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  const clearStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    currentIndexRef.current = 0;
  }, []);

  const startStreaming = useCallback(() => {
    clearStreaming();
    setContent('');
    setStatus('loading');
    currentIndexRef.current = 0;

    intervalRef.current = setInterval(() => {
      const currentIndex = currentIndexRef.current;
      const fullText = sampleMarkdown;

      if (currentIndex < fullText.length) {
        const newContent = fullText.slice(0, currentIndex + 1);
        setContent(newContent);
        setStatus('updating');
        currentIndexRef.current = currentIndex + 1;
      } else {
        clearStreaming();
        setStatus('success');
      }
    }, 0);
  }, [clearStreaming]);

  useEffect(() => {
    return () => {
      clearStreaming();
    };
  }, [clearStreaming]);

  useEffect(() => {
    if (content && (status === 'updating' || status === 'loading')) {
      scrollToBottom();
    }
  }, [content, status, scrollToBottom]);

  return (
    <StyledStreamingDemo>
      <div className="demo-toolbar">
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={startStreaming}
            loading={status === 'loading' || status === 'updating'}
            disabled={status === 'loading' || status === 'updating'}
          >
            重新渲染
          </Button>

        </Space>
      </div>
      <div className="demo-content" ref={contentRef}>
        {content ? (
          <Markdown content={content} status={status} />
        ) : (
          <div className="empty-placeholder">
            <p>点击右上角"重新渲染"按钮开始流式输出演示</p>
          </div>
        )}
      </div>
    </StyledStreamingDemo>
  );
};
````

### 用户输入演示

支持用户输入 Markdown 内容并实时渲染：

````tsx
import React, { useState } from 'react';
import { Input, Space, Card, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Markdown from '@/components/Chat/Markdown';
import styled from 'styled-components';

const { TextArea } = Input;
const { Title } = Typography;

const StyledInputDemo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .input-section {
    .input-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: #666;
      font-size: 14px;
    }

    .ant-input {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
      font-size: 13px;
      line-height: 1.6;
    }
  }

  .preview-section {
    .preview-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: #666;
      font-size: 14px;
    }

    .preview-content {
      min-height: 300px;
      max-height: 600px;
      overflow-y: auto;
      padding: 16px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      background: #ffffff;
    }

    .empty-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;
      color: #999;
      font-size: 14px;
    }
  }
`;

const defaultMarkdown = `# Markdown 编辑器演示

在这里输入 **Markdown** 内容，右侧会实时显示渲染效果。

## 支持的功能

- **粗体文本**
- *斜体文本*
- \`代码块\`
- [链接](https://example.com)
- 列表项
- 表格
- 等等...

> 这是第一行引用

> 这是第二行引用

> 第一层引用
> > 第二层引用
> > > 第三层引用

> 这是一个引用块
> 
> - 可以包含列表
> - 也可以包含**粗体**和*斜体*
>

#### 图表示例

\`\`\` mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Database
    
    Client->>Server: POST /api/data
    Server->>Database: INSERT record
    Database-->>Server: Success
    Server-->>Client: 201 Created
\`\`\`

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 表格示例

| 功能 | 状态 | 说明 |
| :--- | :--- | :--- |
| 标题 | ✅ | 支持多级标题 |
| 列表 | ✅ | 有序和无序列表 |
| 代码 | ✅ | 语法高亮 |
| 表格 | ✅ | Markdown 表格 |

> 提示：尝试修改左侧的内容，看看右侧的实时渲染效果！
`;

export default () => {
  const [content, setContent] = useState<string>(defaultMarkdown);

  return (
    <StyledInputDemo>
      <Card>
        <div className="input-section">
          <div className="input-header">
            <EditOutlined />
            <span>输入 Markdown 内容</span>
          </div>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在这里输入 Markdown 内容..."
            rows={15}
            style={{ resize: 'vertical' }}
          />
        </div>
      </Card>

      <Card>
        <div className="preview-section">
          <div className="preview-header">
            <span>📄</span>
            <span>实时预览</span>
          </div>
          <div className="preview-content">
            {content.trim() ? (
              <Markdown content={content} status="success" />
            ) : (
              <div className="empty-placeholder">
                <p>在左侧输入框中输入 Markdown 内容，这里会显示渲染效果</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </StyledInputDemo>
  );
};
````

### 数据来源标记演示

在 Markdown 内容中使用 `<sup>` 标签展示数据来源标记，支持内部来源和外部来源两种类型。点击 Markdown 下方的"引用来源"按钮可以打开侧边栏查看所有数据来源列表：

````tsx
import React, { useState, useMemo } from 'react';
import { Card, Typography, Button } from 'antd';
import { BookOutlined, GlobalOutlined } from '@ant-design/icons';
import { cssVar } from '@scaffold/ui';
import Markdown from '@/components/Chat/Markdown';
import SourcesSidebar, { type SourceItem } from '@/components/Chat/Markdown/CustomSources/SourcesSidebar';
import { useEmitEvent } from '@/common/mitt';
import styled from 'styled-components';

const { Text } = Typography;

const StyledSourceMarkerDemo = styled.div`
  width: 100%;
  display: flex;
  gap: 0;
  position: relative;
`;

const StyledContentWrapper = styled.div<{ $sidebarOpen: boolean }>`
  flex: 1;
  min-width: 0;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;

  .ant-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .demo-content {
    padding: 24px;
    min-height: 300px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background: #ffffff;
    flex: 1;
    overflow-y: auto;
  }
`;

const StyledSidebarWrapper = styled.div<{ $open: boolean }>`
  width: ${props => (props.$open ? '400px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease;
  border-left: ${props => (props.$open ? '1px solid #e8e8e8' : 'none')};
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const sampleMarkdownWithSources = `# AI 技术发展趋势分析

人工智能技术在 2026 年迎来了重要的发展节点<sup>1</sup>。从技术层面看，大模型、多模态 AI、边缘计算等前沿技术将实现更大突破<sup>2</sup>。

## 核心技术突破

### 1. 大语言模型的发展

大语言模型（LLM）在过去几年中取得了显著进展<sup>3</sup>。从 GPT-3 到 GPT-4，模型的参数规模和能力都在不断提升<sup>4</sup>。

### 2. 多模态 AI 的融合

多模态 AI 能够同时处理文本、图像、音频等多种类型的数据<sup>5</sup>。这种能力使得 AI 系统能够更好地理解现实世界<sup>6</sup>。

## 应用场景

- **医疗健康**：AI 在医学影像诊断、药物研发等领域发挥重要作用<sup>7</sup>
- **教育培训**：个性化学习路径和智能辅导系统<sup>8</sup>
- **金融服务**：风险评估、欺诈检测、智能投顾等应用<sup>9</sup>

## 未来展望

随着技术的不断成熟，AI 将在更多领域实现规模化落地<sup>10</sup>。企业和个人都需要适应这一变革，掌握 AI 工具的使用方法<sup>11</sup>。

> 提示：将鼠标悬停在数据来源标记上（如 <sup>1</sup>），可以查看详细的数据来源信息。点击下方的"引用来源"按钮可以打开侧边栏查看所有数据来源列表。内部来源和外部来源会有不同的颜色标识。
`;

// 模拟数据来源列表
const mockSources: SourceItem[] = [
  {
    key: 1,
    title: '内部知识库 - AI技术发展趋势',
    content: '根据公司内部知识库的数据分析，2026年人工智能技术将从技术狂热走向深度融合的新阶段。',
    sourceType: 'internal',
    domain: 'internal.knowledge.base',
  },
  {
    key: 2,
    title: '内部文档 - 产品设计规范',
    content: '本产品设计规范文档详细说明了用户界面设计原则、交互流程和视觉规范。',
    sourceType: 'internal',
  },
  {
    key: 3,
    title: '内部数据库 - 用户行为分析',
    content: '基于公司内部数据库的用户行为分析报告显示，用户在使用AI助手时最关注的功能包括：智能问答、文档生成、代码辅助等。',
    sourceType: 'internal',
    url: '/internal/reports/user-behavior-2026',
    domain: 'internal.database',
  },
  {
    key: 4,
    title: '内部知识库 - 技术架构文档',
    content: '系统采用微服务架构，主要包含API网关、业务服务层、数据存储层等核心模块。',
    sourceType: 'internal',
    url: '/docs/architecture',
  },
  {
    key: 5,
    title: '内部培训材料 - AI应用指南',
    content: '本指南介绍了如何在实际业务场景中应用AI技术，包括需求分析、技术选型、实施步骤和效果评估等关键环节。',
    sourceType: 'internal',
    url: '/training/ai-guide',
  },
  {
    key: 6,
    title: '全球人工智能技术产业发展趋势 (2026年)',
    content: '2026年，人工智能(AI)的发展将从技术狂热走向深度融合的新阶段。',
    url: 'https://example.com/article1',
    favicon: 'https://www.google.com/s2/favicons?domain=example.com&sz=16',
    sourceType: 'external',
    domain: 'example.com',
    sourceName: '电子创新网',
  },
  {
    key: 7,
    title: '2025年的AI 趋势:回顾与展望',
    content: 'AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。',
    url: 'https://www.ibm.com/ai-trends',
    favicon: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=16',
    sourceType: 'external',
    domain: 'ibm.com',
    sourceName: 'IBM',
  },
  {
    key: 8,
    title: '全球人工智能技术产业发展趋势 (2026年)',
    content: '2026年，人工智能(AI)的发展将从技术狂热走向深度融合的新阶段。',
    url: 'https://example.com/article2',
    favicon: 'https://www.google.com/s2/favicons?domain=example.com&sz=16',
    sourceType: 'external',
    domain: 'example.com',
    sourceName: '电子创新网',
  },
  {
    key: 9,
    title: '2025年的AI 趋势:回顾与展望',
    content: 'AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。',
    url: 'https://www.ibm.com/ai-trends-2',
    favicon: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=16',
    sourceType: 'external',
    domain: 'ibm.com',
    sourceName: 'IBM',
  },
  {
    key: 10,
    title: 'Physical AI: robotics are poised to revolutionise business',
    content: 'Please use the sharing tools found via the share button at the top or side of articles.',
    url: 'https://example.com/article3',
    favicon: 'https://www.google.com/s2/favicons?domain=example.com&sz=16',
    sourceType: 'external',
    domain: 'example.com',
    sourceName: '电子创新网',
  },
  {
    key: 11,
    title: '2025年的AI 趋势:回顾与展望',
    content: 'AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。',
    url: 'https://www.ibm.com/ai-trends-3',
    favicon: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=16',
    sourceType: 'external',
    domain: 'ibm.com',
    sourceName: 'IBM',
  },
];

const StyledSourcesButton = styled(Button)`
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('gap-md', { prefix: 'ant' })};
  height: ${cssVar('control-height', { prefix: 'ant' })};
  padding-top: ${cssVar('gap-xs', { prefix: 'ant' })};
  padding-right: ${cssVar('padding-com-xl', { prefix: 'ant' })};
  padding-bottom: ${cssVar('gap-xs', { prefix: 'ant' })};
  padding-left: ${cssVar('padding-com-xl', { prefix: 'ant' })};
  border-radius: ${cssVar('radius-md', { prefix: 'ant' })};
  border: 1px solid ${cssVar('color-border', { prefix: 'ant' })};
  background: ${cssVar('color-bg-container', { prefix: 'ant' })};
  color: ${cssVar('color-text-secondary', { prefix: 'ant' })};
  font-size: ${cssVar('font-size-sm', { prefix: 'ant' })};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${cssVar('color-border-secondary', { prefix: 'ant' })};
    color: ${cssVar('color-text', { prefix: 'ant' })};
    background: ${cssVar('color-fill-quaternary', { prefix: 'ant' })};
  }

  .anticon {
    font-size: ${cssVar('font-size-sm', { prefix: 'ant' })};
  }
`;

export default () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const emitEvent = useEmitEvent();

  const handleOpenSources = () => {
    emitEvent('sources:open', { sources: mockSources });
    setSidebarOpen(true);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleItemClick = (source: SourceItem) => {
    if (source.url) {
      window.open(source.url, '_blank');
    }
  };

  return (
    <StyledSourceMarkerDemo>
      <StyledContentWrapper $sidebarOpen={sidebarOpen}>
        <Card>
          <div style={{ marginBottom: 16 }}>
            <Text strong style={{ fontSize: 16 }}>
              数据来源标记示例
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 14 }}>
              在 Markdown 中使用 <code>{'<sup>数字</sup>'}</code> 标签来标记数据来源。
              <br />
              • 内部来源：灰色背景，深色文字（hover 时显示 hover 样式）
              <br />
              • 外部来源：蓝色背景，蓝色文字（hover 时显示 hover 样式）
              <br />
              • 点击下方的"引用来源"按钮可以打开侧边栏查看所有数据来源列表，侧边栏会在 Markdown 旁边显示并挤压其宽度
              <br />
              • 侧边栏的关闭按钮和 tab 在同一行，关闭按钮位于最右侧
              <br />
              • 列表项没有选中状态，只有 hover 样式
            </Text>
          </div>
          <div className="demo-content">
            <Markdown content={sampleMarkdownWithSources} status="success" />
            <StyledSourcesButton onClick={handleOpenSources}>
              引用来源
              <BookOutlined />
              <GlobalOutlined />
            </StyledSourcesButton>
          </div>
        </Card>
      </StyledContentWrapper>

      {/* 数据来源侧边栏 */}
      <StyledSidebarWrapper $open={sidebarOpen}>
        {sidebarOpen && (
          <SourcesSidebar sources={mockSources} onClose={handleClose} onItemClick={handleItemClick} />
        )}
      </StyledSidebarWrapper>
    </StyledSourceMarkerDemo>
  );
};
````

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :----- | :--- |
| `content` | `string` | `''` | Markdown 内容 |
| `status` | `'loading' \| 'updating' \| 'success'` | `'success'` | 渲染状态 |

## 用法

```tsx
import React, { useState } from 'react';
import Markdown from '@/components/Chat/Markdown';

// 静态渲染
export default () => (
  <Markdown content="# 标题\n\n内容" status="success" />
);

// 流式输出
export default () => {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'loading' | 'updating' | 'success'>('loading');

  // 更新内容时设置 status='updating'
  const handleUpdate = (newContent: string) => {
    setContent(newContent);
    setStatus('updating');
  };

  // 完成后设置 status='success'
  const handleComplete = () => {
    setStatus('success');
  };

  return <Markdown content={content} status={status} />;
};
```
