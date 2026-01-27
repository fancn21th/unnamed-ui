import React from "react";
import { Progress } from "antd";
import { StyledWorkObjectiveList, StyledWorkObjectiveItem } from "./style";
import { RectangleEditIcon } from "../icons";

export interface WorkObjectiveItem {
  id: string;
  /** 任务标题 */
  title: string;
  /** 进度百分比（0-100） */
  progress: number;
  /** 自定义图标（如果提供则优先使用） */
  customIcon?: React.ReactNode;
}

export interface WorkObjectiveListSource {
  /** 列表标题，默认为"工作目标" */
  title?: string;
  /** 工作目标列表数据 */
  items: WorkObjectiveItem[];
}

export interface WorkObjectiveListProps {
  className?: string;
  /** 数据源（必传） */
  source: WorkObjectiveListSource;
  /** 点击列表项回调 */
  onItemClick?: (item: WorkObjectiveItem) => void;
}

// 默认图标组件
const getDefaultIcon = (): React.ReactNode => {
  return (
    <div className="default-icon">
      <RectangleEditIcon style={{ fontSize: 16 }} />
    </div>
  );
};

// 工作目标列表项组件（单独导出）
export const WorkObjectiveItemComponent: React.FC<{
  item: WorkObjectiveItem;
  onItemClick?: (item: WorkObjectiveItem) => void;
}> = ({ item, onItemClick }) => {
  const icon = item.customIcon || getDefaultIcon();

  const handleItemClick = () => {
    onItemClick?.(item);
  };

  return (
    <StyledWorkObjectiveItem onClick={handleItemClick}>
      <div className="item-content">
        <div className="item-icon">{icon}</div>
        <div className="item-title">{item.title}</div>
      </div>
      <div className="item-progress">
        <Progress
          type="circle"
          percent={item.progress}
          size={48}
          strokeWidth={8}
          strokeColor="#7B61FF"
          format={(percent) => `${percent}%`}
          showInfo={true}
        />
      </div>
    </StyledWorkObjectiveItem>
  );
};

// 工作目标列表组件
const WorkObjectiveList: React.FC<WorkObjectiveListProps> = ({
  className,
  source,
  onItemClick,
}) => {
  const { title = "工作目标", items } = source;

  return (
    <StyledWorkObjectiveList className={className}>
      <div className="list-header">
        {title && <div className="list-title">{title}</div>}
      </div>
      <div className="list-content">
        {items.map((item) => (
          <WorkObjectiveItemComponent
            key={item.id}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </StyledWorkObjectiveList>
  );
};

export default WorkObjectiveList;
