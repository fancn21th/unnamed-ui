import React from "react";
import { type MenuProps } from "antd";
import { EditIcon, FeatherIcon } from "../icons";
import { StyledWorkResultList, StyledWorkResultItem } from "./style";
import { ActionDropdown } from "../ActionDropdown";

export type WorkResultIconType =
  | "document"
  | "chart"
  | "presentation"
  | "custom";

export interface WorkResultItem {
  id: string;
  /** 标题 */
  title: string;
  /** 来源数量 */
  sourceCount: number;
  /** 更新时间（相对时间，如"1分钟前"、"3天前"） */
  updateTime: string;
  /** 图标类型 */
  iconType?: WorkResultIconType;
  /** 自定义图标（如果提供则优先使用） */
  customIcon?: React.ReactNode;
}

export interface WorkResultListSource {
  /** 列表标题，默认为"工作结果" */
  title?: string;
  /** 工作结果列表数据 */
  items: WorkResultItem[];
}

export interface WorkResultListProps {
  className?: string;
  /** 数据源（必传） */
  source: WorkResultListSource;
  /** 来源标签文本，默认为"来源" */
  sourceLabel?: string;
  /** 点击列表项回调 */
  onItemClick?: (item: WorkResultItem) => void;
  /** 点击更多操作回调 */
  onMoreClick?: (item: WorkResultItem, event: React.MouseEvent) => void;
  /** 是否显示更多操作按钮，默认为 true */
  showMoreAction?: boolean;
}

// 默认图标组件
const getDefaultIcon = (
  type: WorkResultIconType = "document",
): React.ReactNode => {
  return <FeatherIcon color={"#4765FF"} />;
};

// 工作结果列表项组件（单独导出）
export const WorkResultItemComponent: React.FC<{
  item: WorkResultItem;
  sourceLabel?: string;
  showMoreAction?: boolean;
  onItemClick?: (item: WorkResultItem) => void;
  onMoreClick?: (item: WorkResultItem, event: React.MouseEvent) => void;
}> = ({
  item,
  sourceLabel = "来源",
  showMoreAction = true,
  onItemClick,
  onMoreClick,
}) => {
  const icon = item.customIcon || getDefaultIcon(item.iconType);

  const handleItemClick = () => {
    onItemClick?.(item);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreClick?.(item, e);
  };

  return (
    <StyledWorkResultItem onClick={handleItemClick}>
      <div className="item-content">
        <div className="item-header">
          <div className="item-icon">{icon}</div>
          <div className="item-title">{item.title}</div>
        </div>
        <div className="item-meta">更新时间：{item.updateTime}</div>
      </div>
      {showMoreAction && (
        // <Popover className="item-more" content="更多操作" trigger="click">
        //   <EllipsisOutlined />
        // </Popover>
        <WorkResultItemDropdown />
      )}
    </StyledWorkResultItem>
  );
};

// 工作结果列表组件
const WorkResultList: React.FC<WorkResultListProps> = ({
  className,
  source,
  sourceLabel = "来源",
  onItemClick,
  onMoreClick,
  showMoreAction = true,
}) => {
  const { title = "工作结果", items } = source;

  return (
    <StyledWorkResultList className={className}>
      {title && <div className="list-title">{title}</div>}
      <div className="list-content">
        {items.map((item) => (
          <WorkResultItemComponent
            key={item.id}
            item={item}
            sourceLabel={sourceLabel}
            showMoreAction={showMoreAction}
            onItemClick={onItemClick}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    </StyledWorkResultList>
  );
};

export default WorkResultList;

/**
 * 工作结果列表项操作下拉菜单组件
 */
function WorkResultItemDropdown() {
  const items: MenuProps["items"] = [
    {
      key: "Rename",
      label: "重命名",
      icon: <EditIcon />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    if (info.key === "Rename") {
      console.log("重命名");
    }
  };

  const onDelete = () => {
    console.log("删除");
  };

  return (
    <ActionDropdown
      items={items}
      showDelete
      onMenuClick={handleMenuClick}
      onDelete={onDelete}
    />
  );
}
