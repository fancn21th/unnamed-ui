"use client";

/** 补充信息 - 补充招聘岗位选择并将数据给服务端 */
import React, { useState } from "react";
import { Typography, Radio, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RadioChangeEvent } from "antd";
import type { RecruitmentJobData, RecruitmentJobTableProps } from "./types";
import { REQUIREMENT_STATUS_MAP } from "./types";
import {
  StyledTable,
  StyledTableContainer,
  StyledButtonWrapper,
  StyledRecruitmentJobTable,
  StyledDescription,
} from "./style";

const { Link } = Typography;

/**
 * RecruitmentJobTable 招聘岗位表格组件
 *
 * 用于展示招聘岗位列表，支持单选并确认选择
 */
export const RecruitmentJobTable = <
  T extends RecruitmentJobData = RecruitmentJobData,
>({
  dataSource,
  columns,
  value,
  onChange,
  confirmed = false,
  showConfirmButton = true,
  confirmButtonText = "确认",
  onConfirm,
  onRequirementClick,
  onPositionClick,
  radioColumnWidth = 60,
  indexColumnWidth = 80,
  job_title,
}: RecruitmentJobTableProps<T>) => {
  // 当前选中的行 ID（内部状态，仅在非受控模式下使用）
  const [internalSelectedRowKey, setInternalSelectedRowKey] = useState<
    string | number | null
  >(null);

  // 使用受控模式或非受控模式
  const selectedRowKey = value !== undefined ? value : internalSelectedRowKey;
  const setSelectedRowKey = onChange || setInternalSelectedRowKey;

  /**
   * 处理 Radio 选择变化
   * @param e - Radio change event
   */
  const handleRadioChange = (e: RadioChangeEvent) => {
    // 如果已确认，则不允许修改选择
    if (confirmed) return;

    setSelectedRowKey(e.target.value);
  };

  /**
   * 处理确认按钮点击
   * 将当前选中的完整数据通过回调传递出去
   */
  const handleConfirm = () => {
    if (!selectedRowKey) {
      // 未选择任何行时，传递 null
      onConfirm?.(null);
      return;
    }

    // 从 dataSource 中找到选中的数据行
    const selectedData = dataSource.find(
      (item) => item.requirementId === selectedRowKey,
    );
    onConfirm?.(selectedData || null);
  };

  /**
   * 默认列配置
   */
  const defaultColumns: ColumnsType<T> = [
    {
      title: "",
      key: "radio",
      width: radioColumnWidth,
      align: "center",
      fixed: "left",
      render: (_, record) => (
        <Radio
          value={record.requirementId}
          checked={selectedRowKey === record.requirementId}
          onChange={handleRadioChange}
          disabled={confirmed}
        />
      ),
    },
    {
      title: "序号",
      key: "index",
      width: indexColumnWidth,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "招聘需求",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string, record) => {
        // 如果提供了 requirementLink 或者 onRequirementClick，则渲染为链接
        if (record.requirementLink || onRequirementClick) {
          return (
            <Link
              href={record.requirementLink}
              onClick={(e) => {
                // 如果提供了 onRequirementClick 回调，则阻止默认行为并触发回调
                if (onRequirementClick) {
                  e.preventDefault();
                  onRequirementClick(record);
                }
              }}
            >
              {text}
            </Link>
          );
        }
        return text;
      },
    },
    {
      title: "需求状态",
      dataIndex: "requirementStatus",
      key: "requirementStatus",
      width: 120,
      align: "center",
      render: (status: number) =>
        REQUIREMENT_STATUS_MAP[status] || `未知状态(${status})`,
    },
    {
      title: "关联岗位",
      dataIndex: "relationJobs",
      key: "relationJobs",
      align: "center",
      render: (jobs: string[], record) => {
        // 如果没有关联岗位，显示占位符
        if (!jobs || jobs.length === 0) {
          return "-";
        }
        // 将数组用中文顿号连接
        const jobsText = jobs.join("、");

        // 如果提供了 positionLink 或者 onPositionClick，则渲染为链接
        if (record.positionLink || onPositionClick) {
          return (
            <Link
              href={record.positionLink}
              onClick={(e) => {
                // 如果提供了 onPositionClick 回调，则阻止默认行为并触发回调
                if (onPositionClick) {
                  e.preventDefault();
                  onPositionClick(record);
                }
              }}
            >
              {jobsText}
            </Link>
          );
        }
        return jobsText;
      },
    },
  ];

  return (
    <StyledRecruitmentJobTable>
      {job_title && (
        <StyledDescription>
          请您确认当前想要招聘的 {job_title} 指的是哪一个？
        </StyledDescription>
      )}

      <StyledTableContainer>
        <StyledTable
          columns={columns || defaultColumns}
          dataSource={dataSource}
          pagination={false}
          rowKey="requirementId"
          bordered
          size="middle"
        />
      </StyledTableContainer>

      {/* 确认按钮，固定在表格右下角，确认后隐藏 */}
      {showConfirmButton && !confirmed && (
        <StyledButtonWrapper>
          <Space>
            <Button type="primary" onClick={handleConfirm}>
              {confirmButtonText}
            </Button>
          </Space>
        </StyledButtonWrapper>
      )}
    </StyledRecruitmentJobTable>
  );
};

export default RecruitmentJobTable;
