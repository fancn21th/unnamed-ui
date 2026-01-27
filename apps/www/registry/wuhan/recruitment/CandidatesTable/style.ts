import { Table } from "antd";
import styled from "styled-components";

/**
 * 描述文本样式
 */
export const StyledDescription = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #252b37;
  margin-bottom: 12px;
`;

/**
 * 表格容器样式
 * 提供统一的表格外层包裹器，设置基础样式和圆角
 */
export const StyledTableContainer = styled.div`
  background: #fff;
  overflow: hidden;
`;

export const StyledTable = styled(Table)`
  .ant-table-container {
    border-radius: 0px;
  }
  .ant-table {
    font-size: 12px;
  }

  .ant-table-thead > tr > th {
    background: #f9fafb;
    font-weight: 500;
  }
  .ant-table-cell {
    font-size: 12px;
  }

  /* 第一列（label 列）样式 - 充当竖向表格的表头 */
  .ant-table-tbody > tr > td.vertical-table-header {
    background: #f9fafb;
    font-weight: 500;
    color: #344054;
  }

  .ant-btn {
    padding: 0;
    height: auto;
    font-size: 12px;
  }
` as typeof Table;
