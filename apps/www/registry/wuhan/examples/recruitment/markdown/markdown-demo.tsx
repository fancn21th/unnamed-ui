"use client";

import React, { useState } from "react";
import Markdown from "../../../recruitment/Markdown";

export default function MarkdownDemo() {
  const [content] = useState(`# Markdown 示例

## 基础功能

这是一个支持流式渲染的 Markdown 组件。

### 文本格式

- **粗体文本**
- *斜体文本*
- ~~删除线~~

### 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 列表

1. 第一项
2. 第二项
3. 第三项

### 表格

| 姓名 | 年龄 | 职位 |
|------|------|------|
| 张三 | 28   | 工程师 |
| 李四 | 32   | 设计师 |

### 链接

[访问示例链接](https://example.com)
`);

  return <Markdown content={content} />;
}
