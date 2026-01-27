import { Table } from "antd";
import styled from "styled-components";

export const StyledTableContainer = styled.div`
  margin: 16px 0;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`;

export const StyledTable = styled(Table)`
  width: 100%;
  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 500;
  }

  .ant-table-tbody > tr > td {
    padding: 12px 16px;
  }
` as typeof Table;
