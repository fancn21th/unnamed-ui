import React from "react";
import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StyledTable, StyledTableContainer } from "./styles";

const { Text, Link } = Typography;

// 表格数据接口
export interface CandidateData {
  num: number;
  name?: string;
  result?: string;
  matchDegree?: string;
  resumeReport?: string;
  [key: string]: any; // 支持自定义字段
}

// 组件 Props 接口
export interface ResumeTableProps<T = CandidateData> {
  title?: string;
  dataSource: T[];
  columns?: ColumnsType<T>;
}

/**
 * 招聘候选人表格组件
 * 用于展示候选人简历评估信息
 */
export const InterviewProcessTable = <T extends CandidateData = CandidateData>({
  title = "面试简历：AI产品经理",
  dataSource,
  columns,
}: ResumeTableProps<T>) => {
  const defaultColumns: ColumnsType<T> = [
    {
      title: "候选人",
      children: [
        {
          title: "序号",
          dataIndex: "num",
          key: "num",
          width: 80,
          align: "center",
          hidden: true,
        },
        {
          title: "候选人姓名",
          dataIndex: "name",
          key: "name",
          width: 120,
          align: "center",
        },
      ],
    },
    {
      title: "简历初筛阶段",
      children: [
        {
          title: "简历评估结论",
          dataIndex: "result",
          key: "result",
          align: "center",
          render: (text: string) => {
            const isPositive = text?.includes("值得") || text?.includes("进入");
            return (
              <Text style={{ color: isPositive ? "#52c41a" : undefined }}>
                {text}
              </Text>
            );
          },
        },
        {
          title: "综合匹配度",
          dataIndex: "matchDegree",
          key: "matchDegree",
          width: 120,
          align: "center",
        },
        {
          title: "简历评估报告",
          dataIndex: "resumeReport",
          key: "resumeReport",
          width: 120,
          align: "center",
          render: (value, record) => (
            <Link onClick={() => console.log(value, record)}>预览</Link>
          ),
        },
      ],
    },
  ];

  return (
    <StyledTableContainer>
      <StyledTable
        columns={columns || defaultColumns}
        dataSource={dataSource}
        pagination={false}
        rowKey={
          (columns || defaultColumns) && (columns || defaultColumns)[0]
            ? ((columns || defaultColumns)[0].key as string) || "num"
            : "num"
        }
        bordered
        size="middle"
        title={() => <div>{title}</div>}
      />
    </StyledTableContainer>
  );
};

export default InterviewProcessTable;
