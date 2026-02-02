import { memo, useEffect, useState } from "react";
import { type ComponentProps } from "@ant-design/x-markdown";
import { Popover } from "antd";
import { GlobalOutlined, PlusOutlined } from "@ant-design/icons";
// import { useEmitEvent } from '@/common/mitt';
// import { chatDataSource } from '@/api/chat';
import { useEmitEvent } from "../utils/tools";
import {
  StyledCustomSourcesWrapper,
  StyledSourceMarker,
  StyledSourceCardContent,
  StyledSourceCardHeader,
  StyledSourceCardSiteInfo,
  StyledSourceCardLogo,
  StyledSourceCardSiteName,
  StyledSourceCardAction,
  StyledSourceCardTitle,
  StyledSourceCardDescription,
} from "./style";

interface SourceItem {
  key: number;
  title: string;
  content: string;
  url?: string; // 可选，内部来源可能没有url
  favicon?: string; // 可选
  sourceType?: "internal" | "external"; // 明确标识来源类型
  domain?: string; // 来源域名，用于判断
  sourceName?: string; // 来源名称，如"电子创新网"、"IBM"等
}

interface CustomSourcesProps extends ComponentProps {
  messageId?: string;
}

const CustomSources: React.FC<CustomSourcesProps> = ({
  messageId,
  ...props
}) => {
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);
  const emitEvent = useEmitEvent();

  /**
   * 判断是否为外部来源
   * 判断逻辑：
   * 1. 如果明确指定了 sourceType，优先使用该字段
   * 2. 如果有 url，检查是否为外部域名（与当前域名不同）
   * 3. 如果没有 url，默认为内部来源
   */
  const isExternalSource = (source: SourceItem): boolean => {
    // 优先使用明确指定的 sourceType
    if (source.sourceType) {
      return source.sourceType === "external";
    }

    // 如果没有 url，默认为内部来源
    if (!source.url) {
      return false;
    }

    try {
      const urlObj = new URL(source.url);
      const currentHost = window.location.hostname;
      const sourceHost = urlObj.hostname;

      // 如果是相对路径或同域名，视为内部来源
      if (!sourceHost || sourceHost === currentHost) {
        return false;
      }

      // 检查是否为内部域名（可以根据实际需求配置）
      const internalDomains = [
        currentHost,
        "localhost",
        "127.0.0.1",
        // 可以添加更多内部域名
      ];

      // 如果域名在内部域名列表中，视为内部来源
      if (internalDomains.some((domain) => sourceHost.includes(domain))) {
        return false;
      }

      // 其他情况视为外部来源
      return true;
    } catch {
      // URL 解析失败，可能是相对路径，视为内部来源
      return false;
    }
  };

  // 获取数据来源
  useEffect(() => {
    // TODO: 接口请求暂时注释，使用虚拟数据
    // if (messageId) {
    //   chatDataSource(messageId)
    //     .then(response => {
    //       if (response?.data) {
    //         const transformedSources: SourceItem[] = response.data.map((item: any, index: number) => ({
    //           key: index + 1,
    //           title: item.title || '',
    //           content: item.content || '',
    //           url: item.url || '',
    //           favicon: item.favicon || '',
    //           sourceType: item.sourceType || undefined,
    //           domain: item.domain || undefined,
    //         }));
    //         setSources(transformedSources);
    //       }
    //     })
    //     .catch(error => {
    //       console.error('获取数据来源失败:', error);
    //       setSources([]);
    //     });
    // }

    // 虚拟数据用于测试 - 包含内部来源和外部来源的完整示例
    const mockSources: SourceItem[] = [
      // 内部来源示例（1-5）
      {
        key: 1,
        title: "内部知识库 - AI技术发展趋势",
        content:
          "根据公司内部知识库的数据分析，2026年人工智能技术将从技术狂热走向深度融合的新阶段。随着核心技术瓶颈的逐步突破、产业生态的日益成熟以及全球治理框架的初步构建，人工智能正在重塑全球经济格局。",
        sourceType: "internal",
        domain: "internal.knowledge.base",
      },
      {
        key: 2,
        title: "内部文档 - 产品设计规范",
        content:
          "本产品设计规范文档详细说明了用户界面设计原则、交互流程和视觉规范。所有设计都应遵循一致性、可用性和美观性的基本原则，确保用户体验的连贯性和专业性。",
        sourceType: "internal",
        // 内部文档可能没有外部url
      },
      {
        key: 3,
        title: "内部数据库 - 用户行为分析",
        content:
          "基于公司内部数据库的用户行为分析报告显示，用户在使用AI助手时最关注的功能包括：智能问答、文档生成、代码辅助等。这些数据为产品优化提供了重要参考。",
        sourceType: "internal",
        url: "/internal/reports/user-behavior-2026",
        domain: "internal.database",
      },
      {
        key: 4,
        title: "内部知识库 - 技术架构文档",
        content:
          "系统采用微服务架构，主要包含API网关、业务服务层、数据存储层等核心模块。各模块之间通过消息队列进行异步通信，确保系统的高可用性和可扩展性。",
        sourceType: "internal",
        url: "/docs/architecture",
      },
      {
        key: 5,
        title: "内部培训材料 - AI应用指南",
        content:
          "本指南介绍了如何在实际业务场景中应用AI技术，包括需求分析、技术选型、实施步骤和效果评估等关键环节。适用于产品经理、开发人员和业务人员参考。",
        sourceType: "internal",
        url: "/training/ai-guide",
      },
      // 外部来源示例（6-11）
      {
        key: 6,
        title: "全球人工智能技术产业发展趋势 (2026年)",
        content:
          "2026年，人工智能(AI)的发展将从技术狂热走向深度融合的新阶段。随着核心技术瓶颈的逐步突破、产业生态的日益成熟以及全球治理框架的初步构建，人工智能正在重塑全球经济格局，成为推动数字化转型的核心引擎。",
        url: "https://example.com/article1",
        favicon: "https://www.google.com/s2/favicons?domain=example.com&sz=16",
        sourceType: "external",
        domain: "example.com",
        sourceName: "电子创新网",
      },
      {
        key: 7,
        title: "2025年的AI 趋势:回顾与展望",
        content:
          "AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。随着模型变得能力更强、用途更广、效率更高,它们所赋能的 AI 应用正在改变各行各业的工作方式。",
        url: "https://www.ibm.com/ai-trends",
        favicon: "https://www.google.com/s2/favicons?domain=ibm.com&sz=16",
        sourceType: "external",
        domain: "ibm.com",
        sourceName: "IBM",
      },
      {
        key: 8,
        title: "全球人工智能技术产业发展趋势 (2026年)",
        content:
          "2026年，人工智能(AI)的发展将从技术狂热走向深度融合的新阶段。随着核心技术瓶颈的逐步突破、产业生态的日益成熟以及全球治理框架的初步构建，人工智能正在重塑全球经济格局。",
        url: "https://example.com/article2",
        favicon: "https://www.google.com/s2/favicons?domain=example.com&sz=16",
        sourceType: "external",
        domain: "example.com",
        sourceName: "电子创新网",
      },
      {
        key: 9,
        title: "2025年的AI 趋势:回顾与展望",
        content:
          "AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。随着模型变得能力更强、用途更广、效率更高,它们所赋能的 AI 应用正在改变各行各业的工作方式。",
        url: "https://www.ibm.com/ai-trends-2",
        favicon: "https://www.google.com/s2/favicons?domain=ibm.com&sz=16",
        sourceType: "external",
        domain: "ibm.com",
        sourceName: "IBM",
      },
      {
        key: 10,
        title: "Physical AI: robotics are poised to revolutionise business",
        content:
          "Please use the sharing tools found via the share button at the top or side of articles. Copying articles to share with others is a breach of FT.com T&Cs and Copyright Policy.",
        url: "https://example.com/article3",
        favicon: "https://www.google.com/s2/favicons?domain=example.com&sz=16",
        sourceType: "external",
        domain: "example.com",
        sourceName: "电子创新网",
      },
      {
        key: 11,
        title: "2025年的AI 趋势:回顾与展望",
        content:
          "AI 的发展趋势不仅来自AI 模型与算法本身的进步,更源于生成式 AI 能力所应用的、不断扩展的用例范围。随着模型变得能力更强、用途更广、效率更高,它们所赋能的 AI 应用正在改变各行各业的工作方式。",
        url: "https://www.ibm.com/ai-trends-3",
        favicon: "https://www.google.com/s2/favicons?domain=ibm.com&sz=16",
        sourceType: "external",
        domain: "ibm.com",
        sourceName: "IBM",
      },
    ];
    setSources(mockSources);
  }, [messageId]);

  // 解析 activeKey
  const activeKey = parseInt(`${props?.children}` || "0", 10);
  const activeSource = sources.find((item) => item.key === activeKey);

  // 判断是否为外部来源（使用改进的判断逻辑）
  const isExternal = activeSource ? isExternalSource(activeSource) : false;
  // 判断是否选中（hover 时视为选中）
  const isSelected = hoveredKey === activeKey;

  if (!activeSource) {
    return (
      <StyledSourceMarker
        className="custom-sources-marker"
        $isExternal={false}
        $isSelected={false}
      >
        {activeKey}
      </StyledSourceMarker>
    );
  }

  const handleCardClick = () => {
    if (activeSource.url) {
      window.open(activeSource.url, "_blank");
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 可以添加更多操作，比如收藏、分享等
    console.log("Action clicked for source:", activeSource.key);
  };

  const handleMarkerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 触发打开数据来源侧边栏事件，传递当前选中的 key
    emitEvent("sources:open", { sources, activeKey });
  };

  // Popover 内容
  const popoverContent = (
    <StyledSourceCardContent onClick={handleCardClick}>
      {/* 卡片头部：logo + 名称 + 操作 */}
      <StyledSourceCardHeader>
        <StyledSourceCardSiteInfo>
          <StyledSourceCardLogo>
            <GlobalOutlined />
          </StyledSourceCardLogo>
          <StyledSourceCardSiteName>
            {activeSource.title}
          </StyledSourceCardSiteName>
        </StyledSourceCardSiteInfo>
        <StyledSourceCardAction onClick={handleActionClick}>
          <PlusOutlined />
        </StyledSourceCardAction>
      </StyledSourceCardHeader>
      {/* 标题 - 最多2行 */}
      <StyledSourceCardTitle>{activeSource.title}</StyledSourceCardTitle>
      {/* 内容 - 最多3行 */}
      {activeSource.content && (
        <StyledSourceCardDescription>
          {activeSource.content}
        </StyledSourceCardDescription>
      )}
    </StyledSourceCardContent>
  );

  return (
    <StyledCustomSourcesWrapper className="custom-sources-wrapper">
      <Popover
        content={popoverContent}
        trigger="hover"
        placement="top"
        overlayStyle={{ padding: 0 }}
        overlayInnerStyle={{ padding: 0 }}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
        onOpenChange={(open) => {
          setHoveredKey(open ? activeKey : null);
        }}
      >
        <StyledSourceMarker
          className="custom-sources-marker"
          $isExternal={isExternal}
          $isSelected={isSelected}
          onClick={handleMarkerClick}
        >
          {activeKey}
        </StyledSourceMarker>
      </Popover>
    </StyledCustomSourcesWrapper>
  );
};

export default memo(CustomSources);
