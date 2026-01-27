"use client";

import React from "react";
import { DataSourceList } from "../../../recruitment/DataSourceList";

export default function DataSourceListDemo() {
  const dataSources = [
    {
      groupName: "临时上传",
      dataSources: [
        {
          id: "11",
          fileName: "张怡-简历",
          fileType: "word",
          updateTime: "09:30",
        },
        {
          id: "12",
          fileName: "AI产品经理_岗位招聘",
          fileType: "pdf",
          updateTime: "09:30",
        },
      ],
    },
    {
      groupName: "企业知识",
      dataSources: [],
    },
    {
      groupName: "联网搜索",
      dataSources: [
        {
          id: "31",
          fileName: "SWW1",
          fileType: "pdf",
          updateTime: "09:30",
        },
        {
          id: "32",
          fileName: "SWW2",
          fileType: "pdf",
          updateTime: "09:30",
        },
      ],
    },
  ];

  return <DataSourceList dataSources={dataSources} />;
}
