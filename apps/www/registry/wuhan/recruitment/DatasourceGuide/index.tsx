"use client";

import React from "react";
import { StyledDatasourceGuide } from "./style";
import { FileIcon } from "../icons";

interface DatasourceGuideProps {
  onOpenLink?: () => void;
}

const DatasourceGuide: React.FC<DatasourceGuideProps> = ({ onOpenLink }) => {
  return (
    <StyledDatasourceGuide gap={6} align="flex-start">
      <div className="icon">
        <FileIcon style={{ fontSize: 16 }} />
      </div>
      <div className="desc">
        <a onClick={onOpenLink}>支持多数据来源～ </a>
        企业知识库同步、联网搜索、临时文件上传
      </div>
    </StyledDatasourceGuide>
  );
};
export default DatasourceGuide;
