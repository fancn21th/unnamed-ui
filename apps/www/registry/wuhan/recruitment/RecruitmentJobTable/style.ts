import { Table } from "antd";
import styled from "styled-components";

export const StyledRecruitmentJobTable = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

export const StyledDescription = styled.div`
  font-size: 14px;
  color: #141414;
  margin-bottom: 8px;
`;

export const StyledTableContainer = styled.div`
  margin-bottom: 16px;
  background: #fff;
  overflow: hidden;
`;

export const StyledTable = styled(Table)`
  .ant-table {
    font-size: 14px;
  }

  /* 表头样式 */
  .ant-table-thead > tr > th {
    background: #f9fafb;
    font-weight: 500;
  }

  /* 表格单元格样式 */
  .ant-table-tbody > tr > td {
    padding: 12px 16px;
  }

  /* Radio 居中对齐 */
  .ant-radio-wrapper {
    display: inline-flex;
    align-items: center;
  }

  /* 链接样式优化 */
  .ant-typography a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
` as typeof Table;

/**
 * 按钮容器样式
 * 将按钮固定在表格右下角
 */
export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
