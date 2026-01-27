import React, { useState, useMemo } from "react";
import { CloseOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  StyledSourcesSidebar,
  StyledSourcesSidebarClose,
  StyledSourcesSidebarTabs,
  StyledSourcesTab,
  StyledSourcesSidebarList,
  StyledSourcesListItem,
  StyledSourcesListItemHeader,
  StyledSourcesListItemNumber,
  StyledSourcesListItemSiteInfo,
  StyledSourcesListItemLogo,
  StyledSourcesListItemSiteName,
  StyledSourcesListItemTitle,
  StyledSourcesListItemDescription,
} from "./style";

export interface SourceItem {
  key: number;
  title: string;
  content: string;
  url?: string;
  favicon?: string;
  sourceType?: "internal" | "external";
  domain?: string;
  sourceName?: string; // 来源名称，如"电子创新网"、"IBM"等
}

interface SourcesSidebarProps {
  sources: SourceItem[];
  onClose?: () => void;
  onItemClick?: (source: SourceItem) => void;
}

const SourcesSidebar: React.FC<SourcesSidebarProps> = ({
  sources,
  onClose,
  onItemClick,
}) => {
  /**
   * 判断是否为外部来源
   */
  const isExternalSource = (source: SourceItem): boolean => {
    if (source.sourceType) {
      return source.sourceType === "external";
    }
    if (!source.url) {
      return false;
    }
    try {
      const urlObj = new URL(source.url);
      const currentHost = window.location.hostname;
      const sourceHost = urlObj.hostname;
      if (!sourceHost || sourceHost === currentHost) {
        return false;
      }
      const internalDomains = [currentHost, "localhost", "127.0.0.1"];
      if (internalDomains.some((domain) => sourceHost.includes(domain))) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const [activeTab, setActiveTab] = useState<"external" | "internal">(() => {
    // 默认显示外部来源，如果有数据的话
    const hasExternal = sources.some((s) => isExternalSource(s));
    return hasExternal ? "external" : "internal";
  });

  // 根据当前 tab 过滤数据源
  const filteredSources = useMemo(() => {
    return sources.filter((source) => {
      const isExternal = isExternalSource(source);
      return activeTab === "external" ? isExternal : !isExternal;
    });
  }, [sources, activeTab]);

  const handleItemClick = (source: SourceItem) => {
    if (onItemClick) {
      onItemClick(source);
    } else if (source.url) {
      window.open(source.url, "_blank");
    }
  };

  return (
    <StyledSourcesSidebar>
      {/* Tab 栏和关闭按钮 */}
      <StyledSourcesSidebarTabs>
        <StyledSourcesTab
          $active={activeTab === "external"}
          onClick={() => setActiveTab("external")}
        >
          外部来源
        </StyledSourcesTab>
        <StyledSourcesTab
          $active={activeTab === "internal"}
          onClick={() => setActiveTab("internal")}
        >
          内部来源
        </StyledSourcesTab>
        <StyledSourcesSidebarClose onClick={onClose} aria-label="关闭">
          <CloseOutlined />
        </StyledSourcesSidebarClose>
      </StyledSourcesSidebarTabs>

      {/* 列表 */}
      <StyledSourcesSidebarList>
        {filteredSources.map((source) => (
          <StyledSourcesListItem
            key={source.key}
            onClick={() => handleItemClick(source)}
          >
            {/* 列表项头部：序号 + logo + 站点名称 */}
            <StyledSourcesListItemHeader>
              <StyledSourcesListItemNumber>
                {source.key}
              </StyledSourcesListItemNumber>
              <StyledSourcesListItemSiteInfo>
                <StyledSourcesListItemLogo>
                  {source.favicon ? (
                    <img src={source.favicon} alt={source.domain || ""} />
                  ) : (
                    <GlobalOutlined />
                  )}
                </StyledSourcesListItemLogo>
                <StyledSourcesListItemSiteName>
                  {source.sourceName || source.domain || "未知来源"}
                </StyledSourcesListItemSiteName>
              </StyledSourcesListItemSiteInfo>
            </StyledSourcesListItemHeader>

            {/* 标题 */}
            <StyledSourcesListItemTitle>
              {source.title}
            </StyledSourcesListItemTitle>

            {/* 描述 */}
            {source.content && (
              <StyledSourcesListItemDescription>
                {source.content}
              </StyledSourcesListItemDescription>
            )}
          </StyledSourcesListItem>
        ))}
      </StyledSourcesSidebarList>
    </StyledSourcesSidebar>
  );
};

export default SourcesSidebar;
