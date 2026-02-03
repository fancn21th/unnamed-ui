"use client";

import React, { useMemo, useState } from "react";
import { CloseOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  SourcesSidebarWrapper,
  SourcesSidebarTabs,
  SourcesSidebarClose,
  SourcesSidebarTab,
  SourcesSidebarList,
  SourcesSidebarListItem,
  SourcesSidebarListItemHeader,
  SourcesSidebarListItemNumber,
  SourcesSidebarListItemSiteInfo,
  SourcesSidebarListItemLogo,
  SourcesSidebarListItemSiteName,
  SourcesSidebarListItemTitle,
  SourcesSidebarListItemDescription,
} from "@/registry/wuhan/blocks/sources-sidebar/sources-sidebar-01";
import { isExternalSource, type SourceItem } from "../custom-sources/utils";

export interface SourcesSidebarProps {
  sources: SourceItem[];
  onClose?: () => void;
  onItemClick?: (source: SourceItem) => void;
  initialTab?: "external" | "internal";
}

const resolveDefaultTab = (sources: SourceItem[]) => {
  const hasExternal = sources.some((source) => isExternalSource(source));
  return hasExternal ? "external" : "internal";
};

const SourcesSidebar: React.FC<SourcesSidebarProps> = ({
  sources,
  onClose,
  onItemClick,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<"external" | "internal">(
    initialTab ?? resolveDefaultTab(sources),
  );

  const filteredSources = useMemo(() => {
    return sources.filter((source) => {
      const isExternal = isExternalSource(source);
      return activeTab === "external" ? isExternal : !isExternal;
    });
  }, [sources, activeTab]);

  const handleItemClick = (source: SourceItem) => {
    if (onItemClick) {
      onItemClick(source);
      return;
    }
    if (source.url && typeof window !== "undefined") {
      window.open(source.url, "_blank");
    }
  };

  return (
    <SourcesSidebarWrapper>
      <SourcesSidebarTabs>
        <SourcesSidebarTab
          $active={activeTab === "external"}
          onClick={() => setActiveTab("external")}
        >
          外部来源
        </SourcesSidebarTab>
        <SourcesSidebarTab
          $active={activeTab === "internal"}
          onClick={() => setActiveTab("internal")}
        >
          内部来源
        </SourcesSidebarTab>
        <SourcesSidebarClose onClick={onClose} aria-label="关闭">
          <CloseOutlined />
        </SourcesSidebarClose>
      </SourcesSidebarTabs>

      <SourcesSidebarList>
        {filteredSources.map((source) => (
          <SourcesSidebarListItem
            key={source.key}
            onClick={() => handleItemClick(source)}
          >
            <SourcesSidebarListItemHeader>
              <SourcesSidebarListItemNumber>
                {source.key}
              </SourcesSidebarListItemNumber>
              <SourcesSidebarListItemSiteInfo>
                <SourcesSidebarListItemLogo>
                  {source.favicon ? (
                    <img src={source.favicon} alt={source.domain || ""} />
                  ) : (
                    <GlobalOutlined />
                  )}
                </SourcesSidebarListItemLogo>
                <SourcesSidebarListItemSiteName>
                  {source.sourceName || source.domain || "未知来源"}
                </SourcesSidebarListItemSiteName>
              </SourcesSidebarListItemSiteInfo>
            </SourcesSidebarListItemHeader>

            <SourcesSidebarListItemTitle>
              {source.title}
            </SourcesSidebarListItemTitle>

            {source.content && (
              <SourcesSidebarListItemDescription>
                {source.content}
              </SourcesSidebarListItemDescription>
            )}
          </SourcesSidebarListItem>
        ))}
      </SourcesSidebarList>
    </SourcesSidebarWrapper>
  );
};

export default SourcesSidebar;
