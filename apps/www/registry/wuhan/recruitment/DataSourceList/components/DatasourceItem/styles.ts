import styled from "styled-components";

export const StyledDatasourceItemWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  .item-checkbox-icon {
    align-self: baseline;
  }
`;
export const StyledDatasourceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const StyledDatasourceItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledDatasourceItemTitle = styled.div`
  overflow: hidden;
  color: #252b37;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  flex: 1;
`;

export const StyledDatasourceItemFooter = styled.div`
  color: #9e9faa;
  text-align: justify;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
`;
// export const StyledDatasourceItemAction = styled.div`
//   display: flex;
//   padding: 4px 8px;
//   align-items: center;
//   gap: 8px;
//   .action-name {
//     color: #181d27;
//     font-size: 14px;
//     line-height: 24px;
//     letter-spacing: 0;
//     &.danger {
//       color: #f04438;
//     }
//   }
// `;
