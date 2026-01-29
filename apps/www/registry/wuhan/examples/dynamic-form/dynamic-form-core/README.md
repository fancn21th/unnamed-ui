# DynamicForm 动态表单组件

基于 Schema 配置的动态表单解决方案，支持多种表单控件、表单验证、只读模式等功能。

## 📚 文档

所有文档已整理到 `docs` 目录，按照推荐阅读顺序编号：

1️⃣ **[快速开始](./docs/01-快速开始.md)** - 5 分钟上手  
2️⃣ **[完整文档](./docs/02-完整文档.md)** - 详细 API 文档  
3️⃣ **[实现总结](./docs/03-实现总结.md)** - 技术实现细节  
4️⃣ **[项目交付](./docs/04-项目交付.md)** - 交付清单和功能列表  
5️⃣ **[需求检查](./docs/05-需求检查.md)** - 需求完成情况

**完整导航**：查看 [docs/README.md](./docs/README.md)

## 🚀 快速开始

```tsx
import { DynamicForm, type FormSchema } from "./dynamic-form-core";

const schema: FormSchema = {
  title: "用户信息",
  fields: [
    { name: "username", label: "用户名", type: "input", required: true },
    { name: "email", label: "邮箱", type: "input" },
  ],
};

function App() {
  return (
    <DynamicForm
      schema={schema}
      onFinish={(values) => console.log(values)}
    />
  );
}
```

## ✨ 核心特性

- ✅ **8 种表单控件**：input、textarea、select、radio、checkbox、switch、slider、number
- ✅ **Zod 验证**：强大的表单验证能力
- ✅ **只读模式**：支持表单数据的只读展示
- ✅ **实例方法**：类似 Ant Design 的 API 设计
- ✅ **TypeScript**：完整的类型定义
- ✅ **AI 集成**：完美适配 AI 对话场景

## 📂 文件结构

```
dynamic-form-core/
├── types.ts              # 类型定义
├── schema-utils.ts       # Schema 工具函数
├── FormItem.tsx          # 表单项组件
├── DynamicForm.tsx       # 主表单组件
├── index.ts              # 导出入口
├── example.tsx           # 使用示例
├── README.md             # 本文件
└── docs/                 # 文档目录
    ├── README.md         # 文档导航
    ├── 01-快速开始.md
    ├── 02-完整文档.md
    ├── 03-实现总结.md
    ├── 04-项目交付.md
    └── 05-需求检查.md
```

## 🎯 使用场景

- **AI 对话**：根据 AI 返回的配置动态生成表单
- **动态配置**：后台配置化的表单生成
- **数据录入**：快速构建各类数据录入表单
- **表单预览**：只读模式展示已填写的表单数据

## 🛠️ 技术栈

- React 18+
- react-hook-form - 表单管理
- @hookform/resolvers - 验证器集成
- zod - Schema 验证
- TypeScript - 类型安全
- shadcn/ui - UI 组件库

## 📦 安装依赖

```bash
pnpm install react-hook-form @hookform/resolvers zod
```

## 💡 示例代码

查看 [example.tsx](./example.tsx) 获取完整的使用示例，包括：
- 基础表单
- 带验证的表单
- 实例方法调用
- 只读模式展示

## 📖 更多信息

- **API 文档**：[docs/02-完整文档.md](./docs/02-完整文档.md)
- **实现原理**：[docs/03-实现总结.md](./docs/03-实现总结.md)
- **问题排查**：文档中的"故障排除"章节

---

**开发状态**：✅ 已完成  
**最后更新**：2026年1月29日
