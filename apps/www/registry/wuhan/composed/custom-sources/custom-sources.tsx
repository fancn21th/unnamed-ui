"use client";

import { memo, useMemo, useState } from "react";
import { type ComponentProps } from "@ant-design/x-markdown";
import { Popover } from "antd";
import { GlobalOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CustomSourcesWrapper,
  CustomSourcesMarker,
  CustomSourcesCardContent,
  CustomSourcesCardHeader,
  CustomSourcesCardSiteInfo,
  CustomSourcesCardLogo,
  CustomSourcesCardSiteName,
  CustomSourcesCardAction,
  CustomSourcesCardTitle,
  CustomSourcesCardDescription,
} from "@/registry/wuhan/blocks/custom-sources/custom-sources-01";
import { isExternalSource, type SourceItem } from "./utils";

export interface CustomSourcesProps extends ComponentProps {
  messageId?: string;
  sources?: SourceItem[];
  activeKey?: number;
  onOpenSidebar?: (payload: {
    sources: SourceItem[];
    activeKey?: number;
  }) => void;
}

const parseActiveKey = (children: ComponentProps["children"]) => {
  const raw = typeof children === "string" ? children : String(children ?? "");
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const CustomSources: React.FC<CustomSourcesProps> = ({
  messageId,
  sources = [],
  activeKey,
  onOpenSidebar,
  ...props
}) => {
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);

  const resolvedActiveKey = useMemo(() => {
    if (activeKey !== undefined) {
      return activeKey;
    }
    return parseActiveKey(props?.children);
  }, [activeKey, props?.children]);

  const activeSource = useMemo(() => {
    return sources.find((item) => item.key === resolvedActiveKey);
  }, [sources, resolvedActiveKey]);

  const isExternal = activeSource ? isExternalSource(activeSource) : false;
  const isSelected = hoveredKey === resolvedActiveKey;

  if (!activeSource) {
    return (
      <CustomSourcesMarker
        className="custom-sources-marker"
        $isExternal={false}
        $isSelected={false}
      >
        {resolvedActiveKey}
      </CustomSourcesMarker>
    );
  }

  const handleCardClick = () => {
    if (activeSource.url && typeof window !== "undefined") {
      window.open(activeSource.url, "_blank");
    }
  };

  const handleActionClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleMarkerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onOpenSidebar?.({ sources, activeKey: resolvedActiveKey });
  };

  const popoverContent = (
    <CustomSourcesCardContent onClick={handleCardClick}>
      <CustomSourcesCardHeader>
        <CustomSourcesCardSiteInfo>
          <CustomSourcesCardLogo>
            <GlobalOutlined />
          </CustomSourcesCardLogo>
          <CustomSourcesCardSiteName>
            {activeSource.title}
          </CustomSourcesCardSiteName>
        </CustomSourcesCardSiteInfo>
        <CustomSourcesCardAction onClick={handleActionClick}>
          <PlusOutlined />
        </CustomSourcesCardAction>
      </CustomSourcesCardHeader>
      <CustomSourcesCardTitle>{activeSource.title}</CustomSourcesCardTitle>
      {activeSource.content && (
        <CustomSourcesCardDescription>
          {activeSource.content}
        </CustomSourcesCardDescription>
      )}
    </CustomSourcesCardContent>
  );

  return (
    <CustomSourcesWrapper className="custom-sources-wrapper">
      <Popover
        content={popoverContent}
        trigger="hover"
        placement="top"
        overlayStyle={{ padding: 0 }}
        styles={{ container: { padding: 0 } }}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
        onOpenChange={(open) => {
          setHoveredKey(open ? resolvedActiveKey : null);
        }}
      >
        <CustomSourcesMarker
          className="custom-sources-marker"
          $isExternal={isExternal}
          $isSelected={isSelected}
          onClick={handleMarkerClick}
        >
          {resolvedActiveKey}
        </CustomSourcesMarker>
      </Popover>
    </CustomSourcesWrapper>
  );
};

export default memo(CustomSources);
