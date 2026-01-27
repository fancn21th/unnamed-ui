import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  StyledReportHeader,
  StyledCandidateName,
  StyledCloseButton,
} from "./style";

export interface ReportHeaderProps {
  candidateName: string;
  onClose?: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  candidateName,
  onClose,
}) => {
  return (
    <StyledReportHeader>
      <StyledCandidateName>{candidateName}</StyledCandidateName>
      {onClose && (
        <StyledCloseButton
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      )}
    </StyledReportHeader>
  );
};

export default ReportHeader;
