/** 候选人信息展示 - 竖向表格展示候选人详细信息 */
import React from "react";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StyledTable, StyledTableContainer, StyledDescription } from "./style";

/**
 * 候选人数据接口
 * 定义候选人信息的结构
 */
export interface CandidateData {
  /** 候选人名称 */
  name: string;
  /** 年龄 */
  age: number;
  /** 总工作年限（单位：年） */
  totalWorkYears: number;
  /** 相关岗位年限（单位：年） */
  relatedWorkYears: number;
  /** 最高学历 */
  highestEducation: string;
  /** 毕业院校 */
  graduatedSchool: string;
  /** 期望薪资 */
  expectedSalary: string;
  /** 候选人综合评估报告 ID 或标识（用于触发查看） */
  reportId?: string;
  /** 支持额外的自定义字段 */
  [key: string]: any;
}

/**
 * 组件 Props 接口
 */
export interface CandidatesTableProps {
  /** table 描述 */
  description?: string;
  /** 候选人数据数组（支持多个候选人横向对比） */
  candidateData: CandidateData[];
  /** 点击查看候选人综合评估报告的回调 */
  onViewReport?: (
    reportId?: string,
    candidateData?: CandidateData,
    index?: number,
  ) => void;
  /** 自定义查看报告按钮文案 */
  viewReportButtonText?: string;
}

/**
 * CandidatesTable 候选人信息表格组件
 *
 * 竖向表格展示候选人详细信息，第一列为表头，后续列为各候选人的对应值
 *
 * @description
 * 该组件通过将表头字段转换为表格的行数据来实现竖向布局，支持多个候选人横向对比。
 * 每一行的第一列是字段名（表头），后续列是各候选人的字段值。
 *
 * 实现原理：
 * - dataSource 不是业务数据数组，而是 { label, candidate0, candidate1, ... } 的数组
 * - 每个对象代表表格的一行（一个字段）
 * - label 列作为"表头"，candidateN 列作为第 N 个候选人的"数据值"
 * - 动态生成列配置，第一列固定为 label，后续列根据候选人数量动态生成
 */
export const CandidatesTable: React.FC<CandidatesTableProps> = ({
  description = "候选人基础情况：",
  candidateData,
  onViewReport,
  viewReportButtonText = "查看",
}) => {
  const safeCandidateData = Array.isArray(candidateData) ? candidateData : [];
  console.log("safeCandidateData===>", safeCandidateData);
  /**
   * 检查值是否为有效的数字
   * 用于处理 age、totalWorkYears 和 relatedWorkYears 等字段
   * 如果值不是有效数字（包括字符串、null、undefined 等），返回 '-'
   *
   * @param value - 待检查的值
   * @returns 有效数字或 '-'
   */
  const formatNumberValue = (value: any): number | string => {
    // 检查是否为数字类型且不是 NaN
    if (typeof value === "number" && !isNaN(value)) {
      return value;
    }
    // 尝试转换字符串为数字
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      // 检查是否成功转换为有效数字
      if (!isNaN(parsed) && isFinite(parsed)) {
        return parsed;
      }
    }
    // 无效值返回 '-'
    return "-";
  };

  /**
   * 竖向表格数据源
   * 将候选人数据数组转换为 { label, candidate0, candidate1, ... } 的行数据格式
   *
   * @description
   * 实现多候选人竖向表格的关键：
   * - 每一行代表一个字段（如"候选人名称"）
   * - label：字段名（充当表头）
   * - candidateN：第 N 个候选人的字段值
   */
  const verticalDataSource = [
    {
      key: "name",
      label: "候选人",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          acc[`candidate${index}`] = candidate.name;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "age",
      label: "年龄",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          const ageValue = formatNumberValue(candidate.age);
          acc[`candidate${index}`] = ageValue;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "totalWorkYears",
      label: "总工作年限",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          const yearsValue = formatNumberValue(candidate.totalWorkYears);
          acc[`candidate${index}`] =
            yearsValue === "-" ? "-" : `${yearsValue} 年`;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "relatedWorkYears",
      label: "相关岗位年限",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          const yearsValue = formatNumberValue(candidate.relatedWorkYears);
          acc[`candidate${index}`] =
            yearsValue === "-" ? "-" : `${yearsValue} 年`;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "highestEducation",
      label: "最高学历",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          acc[`candidate${index}`] = candidate.highestEducation;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "graduatedSchool",
      label: "毕业院校",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          acc[`candidate${index}`] = candidate.graduatedSchool;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "expectedSalary",
      label: "期望薪资",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          acc[`candidate${index}`] = candidate.expectedSalary;
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
    {
      key: "report",
      label: "候选人综合评估报告",
      ...safeCandidateData.reduce(
        (acc, candidate, index) => {
          acc[`candidate${index}`] = (
            <Button
              type="link"
              onClick={() =>
                onViewReport?.(candidate.reportId, candidate, index)
              }
            >
              {viewReportButtonText}
            </Button>
          );
          return acc;
        },
        {} as Record<string, any>,
      ),
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      width: 200,
      align: "center",
      fixed: "left",
      // 将 label 列样式化为表头样式
      className: "vertical-table-header",
    },
    // 动态生成候选人列
    ...safeCandidateData.map((candidate, index) => ({
      dataIndex: `candidate${index}`,
      key: `candidate${index}`,
      align: "center" as const,
    })),
  ];

  console.log("verticalDataSource===>", verticalDataSource);
  return (
    <>
      <StyledDescription>{description}</StyledDescription>
      <StyledTableContainer>
        <StyledTable
          columns={columns}
          dataSource={verticalDataSource}
          pagination={false}
          rowKey="key"
          bordered
          size="small"
          showHeader={false}
          scroll={{ x: "max-content" }}
        />
      </StyledTableContainer>
    </>
  );
};

export default CandidatesTable;
