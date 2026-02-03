"use client";

import { ExecutionResult } from "@/registry/wuhan/composed/execution-result/execution-result";

export default function ExecutionResultWithTools() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      <ExecutionResult
        defaultOpen
        title="已执行完成，调用4个工具"
        items={[
          {
            status: "success",
            title: "调用",
            toolName: "search_engine",
            imageSrc: "https://picsum.photos/seed/search/16/16",
            imageAlt: "Search engine icon",
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify(
                  {
                    query: "人工智能发展趋势",
                    language: "zh-CN",
                    maxResults: 10,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    query: "人工智能发展趋势",
                    language: "zh-CN",
                    maxResults: 10,
                  },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 search_engine",
                content: JSON.stringify(
                  {
                    results: [
                      "AI在医疗领域的应用",
                      "大语言模型的最新进展",
                      "AI与自动驾驶技术",
                    ],
                    totalCount: 125,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    results: [
                      "AI在医疗领域的应用",
                      "大语言模型的最新进展",
                      "AI与自动驾驶技术",
                    ],
                    totalCount: 125,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "调用",
            toolName: "calculator",
            imageSrc: "https://picsum.photos/seed/calc/16/16",
            imageAlt: "Calculator icon",
            defaultOpen: true,
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify(
                  {
                    expression: "(123 + 456) * 2",
                    precision: 2,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    expression: "(123 + 456) * 2",
                    precision: 2,
                  },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 calculator",
                content: JSON.stringify(
                  {
                    result: 1158,
                    formula: "(123 + 456) * 2 = 1158",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    result: 1158,
                    formula: "(123 + 456) * 2 = 1158",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "调用",
            toolName: "weather_api",
            imageSrc: "https://picsum.photos/seed/weather/16/16",
            imageAlt: "Weather API icon",
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify(
                  {
                    city: "北京",
                    days: 7,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    city: "北京",
                    days: 7,
                  },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 weather_api",
                content: JSON.stringify(
                  {
                    city: "北京",
                    temperature: 15,
                    condition: "晴",
                    forecast: ["晴", "多云", "雨"],
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    city: "北京",
                    temperature: 15,
                    condition: "晴",
                    forecast: ["晴", "多云", "雨"],
                  },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "调用",
            toolName: "database_query",
            imageSrc: "https://picsum.photos/seed/db/16/16",
            imageAlt: "Database icon",
            sections: [
              {
                title: "请求来自 system",
                content: JSON.stringify(
                  {
                    table: "users",
                    filter: { status: "active" },
                    limit: 100,
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    table: "users",
                    filter: { status: "active" },
                    limit: 100,
                  },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 database_query",
                content: JSON.stringify(
                  {
                    count: 87,
                    rows: ["user1", "user2", "user3"],
                    executionTime: "12ms",
                  },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  {
                    count: 87,
                    rows: ["user1", "user2", "user3"],
                    executionTime: "12ms",
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
