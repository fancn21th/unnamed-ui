"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import Markdown from "@/registry/wuhan/composed/markdown";
import styled from "styled-components";

const StyledStreamingDemo = styled.div`
  position: relative;
  height: 100%;
  .demo-toolbar {
    position: absolute;
    top: var(--padding-com-md);
    right: var(--padding-com-md);
    z-index: 9;
    background: rgba(255, 255, 255, 0.95);
    padding: var(--padding-com-xs) var(--padding-com-md);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-basic);
    backdrop-filter: blur(8px);

    .status-text {
      font-size: var(--font-size-1);
      color: var(--text-secondary);
      margin-left: var(--margin-com-xs);
    }
  }

  .demo-content {
    padding: var(--padding-com-2xl);
    padding-top: 64px;
    height: 100%;
    overflow-y: auto;

    .empty-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;
      color: var(--text-tertiary);
      font-size: var(--font-size-2);
    }
  }
`;

const sampleMarkdown = `这是一篇为你准备的关于 **2026年 AI 趋势深度分析** 的文章草稿。<sup>1</sup>

考虑到当前的时间节点（2026年初），这篇文章的视角设定为：从"震撼"走向"实用"，从"对话"走向"行动"。这篇文章的视角设定为：**从"震撼"走向"实用"，从"对话"走向"行动"**。

-----

# 2026 AI 趋势深度展望：从"生成内容"到"解决问题"的范式转移

> 这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容这是引用块内容

如果说 2023 年是 AI 的"觉醒元年"，2024-2025 年是"百模大战"的爆发期，那么**2026 年将被定义为"落地与行动"的一年**。

| 表头 | 表头 | 表头 |
| ----- | ----- | ----- |
| 表格内容| 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 |

在这个阶段，企业和用户不再满足于 AI 能写诗或画图，焦点已经彻底转移到 **ROI（投资回报率）、自主代理（Agents）以及物理世界的融合**。以下是定义 2026 年 AI 格局的五大核心趋势。

-----

## 1. 智能体(Agentic AI): 从 Chatbot 到 Copilot 再到 Coworker

这是2026年最显著的转变。过去的AI是基于"提示词-回复"的被动交互，而现在的AI正进化为能够**自主规划、使用工具并完成复杂任务**的智能体。

- **趋势特征**: AI不再只是聊天框里的对话者，它们开始拥有"手脚"。例如，你不再问AI"怎么定机票"，而是告诉它"帮我定一张周五去东京的票，价格在3000以内"，AI会自主调用API、比价、填写信息并完成支付。
  - **趋势特征**: 手机、PC和汽车将标配高性能的NPU。用户的个人数据(如聊天记录、相册、健康数据)可以在本地被AI处理，无需上传云端。
  - **市场格局**: 厂商们致力于在3B-7B参数规模下，压榨出媲美过去GPT-3.5水平的能力。
  - **核心价值**: 隐私即服务(Privacy as a Service)。本地AI让用户敢于把私密信息交给AI助理。
- **技术支撑**: LAM(Large Action Models，大型动作模型)的成熟，使得模型能够理解并操作软件界面(UI)。
- **商业影响**: 软件形态将发生重构。SaaS软件将不再是给人用的，而是给AI用的。企业内部将出现"数字化员工"，自动处理报销、初级代码审查和客户售后。

| 表头 | 表头 | 表头 | 表头 | 表头 |
| ----- | ----- | ----- | ----- | ----- |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |
| 表格内容| 表格内容 | 表格内容 | 表格内容 | 表格内容 |

表格说明/注释

## 2. 推理能力与"慢思考"(System 2 Thinking)

早期的LLM(大语言模型)更像是"快思考"(直觉反应，容易产生幻觉)。2026年的模型架构更加注重**逻辑推理链(Chain of Thought)** 的内化。

\`\`\`bash
echo "Hello, World!"
\`\`\`

- **趋势特征**: 模型在回答复杂数学、编程或逻辑问题时，会花费更多时间进行"内心独白"和自我纠错，从而大幅降低错误率

- **应用场景**: 这使得AI终于可以涉足医疗诊断辅助、复杂法律合同审查、科学研究等对准确性要求极高的领域，而不仅仅是生成营销文案。

-----

## 行业启示: 我们该如何应对?

**对于企业(To Business)**:
- **告别"拿着锤子找钉子"**: 停止单纯为了用AI而用AI。重点应放在重塑工作流(Workflow)上。
- **建立私有知识库**: 通用大模型大家都一样，企业的护城河在于私有数据+RAG(检索增强生成)的深度结合。

\`\`\`bash
echo "Hello, World!"
\`\`\`

**对于个人(To Individual)**:
- **不仅是 Prompt Engineer，更是 AI Manager**: 随着AI变得更自主，未来的核心技能不是"怎么写提示词"，而是"怎么拆解任务、评估AI的产出、并管理多个AI智能体协作"。
- **回归"人"的特质**: 既然AI能处理逻辑和执行，情感共情、审美判断、战略决策这些人类特质将变得前所未有的昂贵。

-----

## 结语

> 2026 年，AI 祛魅了。它不再是科幻小说里的魔法，而是像电力和互联网一样的基础设施。对于也是身处这一变革中的我们来说，最大的风险不是 AI 会取代人类，而是我们还在用旧地图寻找新大陆。

2026年，AI祛魅了。它不再是科幻小说里的魔法，而是像电力和互联网一样的基础设施。对于也是身处这一变革中的我们来说，最大的风险不是AI会取代人类，而是我们还在用旧地图寻找新大陆。
`;

export default function MarkdownDemo() {
  const [content, setContent] = useState<string>(sampleMarkdown);
  const [status, setStatus] = useState<"loading" | "updating" | "success">(
    "success",
  );
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
    setContent("");
    setStatus("loading");
    currentIndexRef.current = 0;

    intervalRef.current = setInterval(() => {
      const currentIndex = currentIndexRef.current;
      const fullText = sampleMarkdown;

      if (currentIndex < fullText.length) {
        const newContent = fullText.slice(0, currentIndex + 1);
        setContent(newContent);
        setStatus("updating");
        currentIndexRef.current = currentIndex + 1;
      } else {
        clearStreaming();
        setStatus("success");
      }
    }, 10);
  }, [clearStreaming]);

  useEffect(() => {
    return () => {
      clearStreaming();
    };
  }, [clearStreaming]);

  useEffect(() => {
    if (content && (status === "updating" || status === "loading")) {
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
            loading={status === "loading" || status === "updating"}
            disabled={status === "loading" || status === "updating"}
          >
            重新渲染
          </Button>
          {status && (
            <span className="status-text">
              {status === "loading"
                ? "加载中..."
                : status === "updating"
                  ? "更新中..."
                  : "已完成"}
            </span>
          )}
        </Space>
      </div>
      <div className="demo-content" ref={contentRef}>
        {content ? (
          <Markdown content={content} status={status} />
        ) : (
          <div className="empty-placeholder">
            <p>点击右上角\"重新渲染\"按钮开始流式输出演示</p>
          </div>
        )}
      </div>
    </StyledStreamingDemo>
  );
}
