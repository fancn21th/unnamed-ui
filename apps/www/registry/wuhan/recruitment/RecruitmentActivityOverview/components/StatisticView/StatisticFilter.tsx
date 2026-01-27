// 统计筛选组件 - 用于招聘活动统计视图中的数据筛选
import { useState } from "react";
import { Flex, Select } from "antd";
import { ArrowDownIcon } from "../../../icons";
import type { FilterStatisticViewProps } from "../../types"; // 引入筛选统计视图属性类型
import { transformToFilterItemData, type FilterItemData } from "./utils"; // 引入数据转换工具函数
import { StyledFilterContainer, StyledFilterItem } from "./styles"; // 引入样式组件

// 定义筛选状态接口
interface FilterState {
  stageValue: string | null; // 阶段值
  statusValue: string | number | undefined; // 状态值
}

/**
 * 招聘活动统计筛选组件
 * 显示各阶段的候选人统计数据，并支持按阶段和状态进行筛选
 */
export function StatisticFilter(props: FilterStatisticViewProps) {
  const { processStatisticList, totalCandidates } = props;

  // 将原始数据转换为筛选项数据格式
  const filteredData = transformToFilterItemData(
    processStatisticList,
    totalCandidates,
  );

  // 初始化筛选状态
  const [filterState, setFilterState] = useState<FilterState>({
    stageValue: null,
    statusValue: undefined,
  });

  /**
   * 点击筛选项处理函数
   * @param key - 阶段值
   * @param defaultStatusValue - 默认状态值
   */
  const onClickFilterItem = (
    key: string,
    defaultStatusValue?: string | number,
  ) => {
    setFilterState({
      stageValue: key,
      statusValue: defaultStatusValue,
    });
    console.log("Filter selected:", {
      stageValue: key,
      statusValue: defaultStatusValue,
    });
  };

  /**
   * 状态选择变化处理函数
   * @param value - 新的状态值
   * @param stageValue - 当前阶段值
   */
  const onStatusChange = (value: string | number, stageValue: string) => {
    setFilterState((prev) => ({
      ...prev,
      stageValue,
      statusValue: value,
    }));
    console.log("onStatusChange changed:", { stageValue, statusValue: value });
  };

  /**
   * 渲染状态选择下拉框
   * @param data - 筛选项数据
   * @returns JSX元素或null
   */
  const renderSelect = (data: FilterItemData) => {
    // 如果没有状态选项，则返回null
    if (!data.statusOptions) return null;

    // 获取默认值（取第一个状态选项的值）
    const defaultValue =
      data.statusOptions.length > 0 ? data.statusOptions[0].value : undefined;

    return (
      <Flex
        align="center"
        className="status-select-container"
        onClick={(e) => e.stopPropagation()}
      >
        <Select
          options={data.statusOptions} // 下拉选项列表
          // 根据当前选中阶段确定显示的值：如果是当前选中阶段则显示对应状态值，否则显示默认值
          value={
            filterState.stageValue === data.stageValue
              ? filterState.statusValue
              : defaultValue
          }
          classNames={{ root: "status-select" }} // 自定义类名
          suffixIcon={<ArrowDownIcon style={{ transform: "rotate(180deg)" }} />} // 自定义下拉箭头图标
          onChange={(value) => onStatusChange(value, data.stageValue!)} // 值改变时的回调
          popupMatchSelectWidth={120} // 下拉框宽度
        />
      </Flex>
    );
  };

  return (
    <StyledFilterContainer>
      {/* 遍历筛选数据并渲染每个筛选项 */}
      {filteredData?.map((item) => {
        // 获取默认状态值（取第一个状态选项的值）
        const defaultStatusValue = item.statusOptions?.[0]?.value;

        return (
          <StyledFilterItem
            key={item.stageValue}
            vertical // 垂直布局
            gap={4} // 间距为4
            $active={filterState.stageValue === item.stageValue} // 根据是否为当前选中阶段设置激活状态样式
            onClick={() =>
              onClickFilterItem(item.stageValue!, defaultStatusValue)
            } // 点击处理函数
          >
            {/* 渲染阶段标签 */}
            <div className="label">{item.stageLabel}</div>

            {/* 渲染计数和状态选择器 */}
            <Flex gap={8} align="center">
              {/* 渲染候选人数量 */}
              <div className="count">{item.count ?? 0}</div>

              {/* 渲染状态选择下拉框 */}
              {renderSelect(item)}
            </Flex>
          </StyledFilterItem>
        );
      })}
    </StyledFilterContainer>
  );
}
