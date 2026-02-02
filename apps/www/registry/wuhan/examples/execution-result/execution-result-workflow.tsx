"use client";

import { ExecutionResult } from "@/registry/wuhan/composed/execution-result/execution-result";

export default function ExecutionResultWorkflow() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 工作流执行结果 */}
      <ExecutionResult
        defaultOpen
        title="数据处理工作流 - 已完成"
        items={[
          {
            status: "success",
            title: "步骤1: 数据采集",
            sections: [
              {
                title: "数据源",
                content: JSON.stringify(
                  {
                    source: "MySQL Database",
                    table: "raw_data",
                    timestamp: "2024-02-02 10:00:00",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    source: "MySQL Database",
                    table: "raw_data",
                    timestamp: "2024-02-02 10:00:00",
                  },
                  null,
                  2,
                ),
              },
              {
                title: "采集结果",
                content: JSON.stringify(
                  {
                    totalRecords: 10000,
                    validRecords: 9856,
                    invalidRecords: 144,
                    duration: "2.3s",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    totalRecords: 10000,
                    validRecords: 9856,
                    invalidRecords: 144,
                    duration: "2.3s",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "步骤2: 数据清洗",
            defaultOpen: true,
            sections: [
              {
                title: "清洗规则",
                content: JSON.stringify(
                  {
                    removeNulls: true,
                    removeDuplicates: true,
                    normalizeFields: ["email", "phone"],
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    removeNulls: true,
                    removeDuplicates: true,
                    normalizeFields: ["email", "phone"],
                  },
                  null,
                  2,
                ),
              },
              {
                title: "清洗结果",
                content: JSON.stringify(
                  {
                    inputRecords: 9856,
                    outputRecords: 9234,
                    removedNulls: 234,
                    removedDuplicates: 388,
                    duration: "1.8s",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    inputRecords: 9856,
                    outputRecords: 9234,
                    removedNulls: 234,
                    removedDuplicates: 388,
                    duration: "1.8s",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "步骤3: 数据转换",
            sections: [
              {
                title: "转换配置",
                content: JSON.stringify(
                  {
                    format: "JSON",
                    encoding: "UTF-8",
                    compression: "gzip",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    format: "JSON",
                    encoding: "UTF-8",
                    compression: "gzip",
                  },
                  null,
                  2,
                ),
              },
              {
                title: "转换结果",
                content: JSON.stringify(
                  {
                    records: 9234,
                    outputSize: "1.2 MB",
                    compressionRatio: "75%",
                    duration: "0.9s",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    records: 9234,
                    outputSize: "1.2 MB",
                    compressionRatio: "75%",
                    duration: "0.9s",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "步骤4: 数据存储",
            sections: [
              {
                title: "存储目标",
                content: JSON.stringify(
                  {
                    destination: "AWS S3",
                    bucket: "processed-data",
                    path: "/2024/02/02/data.json.gz",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    destination: "AWS S3",
                    bucket: "processed-data",
                    path: "/2024/02/02/data.json.gz",
                  },
                  null,
                  2,
                ),
              },
              {
                title: "存储结果",
                content: JSON.stringify(
                  {
                    status: "success",
                    fileUrl: "s3://processed-data/2024/02/02/data.json.gz",
                    uploadDuration: "1.5s",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    status: "success",
                    fileUrl: "s3://processed-data/2024/02/02/data.json.gz",
                    uploadDuration: "1.5s",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        ]}
      />

      {/* 部分失败的工作流 */}
      <ExecutionResult
        defaultOpen
        title="API 批量调用 - 部分失败"
        items={[
          {
            status: "success",
            title: "批次1: 用户信息获取 (100/100)",
            sections: [
              {
                title: "执行摘要",
                content: "成功获取100个用户的详细信息",
                showCopyIcon: false,
              },
            ],
          },
          {
            status: "error",
            title: "批次2: 订单数据同步 (45/100)",
            defaultOpen: true,
            sections: [
              {
                title: "错误详情",
                content: JSON.stringify(
                  {
                    error: "Rate limit exceeded",
                    code: 429,
                    retryAfter: 60,
                    failedRequests: 55,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    error: "Rate limit exceeded",
                    code: 429,
                    retryAfter: 60,
                    failedRequests: 55,
                  },
                  null,
                  2,
                ),
              },
              {
                title: "建议",
                content: "请等待60秒后重试失败的请求，或考虑降低请求频率",
                showCopyIcon: false,
              },
            ],
          },
          {
            status: "idle",
            title: "批次3: 库存更新 (等待中)",
            sections: [
              {
                title: "状态",
                content: "等待批次2完成后执行",
                showCopyIcon: false,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
