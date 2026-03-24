# www

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Recruitment Components (Temporary)

临时添加的 recruitment 组件，后续需要删除。

### 删除步骤：

1. **删除文件夹和文档**
```bash
rm -rf registry/wuhan/recruitment
rm -rf registry/wuhan/examples/recruitment
rm -rf content/docs/recruitment
```

2. **在 `registry/wuhan/registry.ts` 中删除**
   - 删除导入：`import { recruitmentBlocks } from "./recruitment/_registry";`
   - 删除合并：`...recruitmentBlocks, // Recruitment blocks - easy to remove`

3. **在 `registry/wuhan/examples/_registry.ts` 中删除**
   - 删除整个 `const recruitmentExamples` 数组（约 290 行）
   - 删除合并：`...recruitmentExamples, // Recruitment examples - easy to remove`

4. **在 `content/docs/meta.json` 中删除**
   - 删除 pages 数组中的 `"recruitment"`

5. **删除依赖（在 `package.json` 中）**
```bash
pnpm remove @dnd-kit/core @dnd-kit/modifiers @dnd-kit/sortable @dnd-kit/utilities @ant-design/icons @ant-design/x @ant-design/x-markdown @antv/gpt-vis antd styled-components dayjs mitt
```

6. **重新构建 registry**
```bash
pnpm registry:build
```

### 新增的依赖（用于 recruitment 组件）：

- `@dnd-kit/core`: ^6.3.1 - 拖拽核心库
- `@dnd-kit/modifiers`: ^9.0.0 - 拖拽修饰符
- `@dnd-kit/sortable`: ^10.0.0 - 拖拽排序
- `@dnd-kit/utilities`: ^3.2.2 - 拖拽工具函数
- `@ant-design/icons`: ^6.1.0 - Ant Design 图标
- `@ant-design/x`: ^2.2.0 - Ant Design X 组件库
- `@ant-design/x-markdown`: ^2.2.0 - Ant Design X Markdown 组件
- `@antv/gpt-vis`: ^0.5.14 - GPT 可视化组件
- `antd`: ^6.2.1 - Ant Design UI 组件库
- `styled-components`: ^6.3.8 - CSS-in-JS 样式库
- `dayjs`: ^1.11.19 - 日期处理库
- `mitt`: ^3.0.1 - 事件总线库

## 代码检查（Lint / 类型）

组件库源码在 **`registry/`**（对外注册给其它项目用），日常门禁只扫这里即可；全站检查用单独命令。

**一般只记这一条：**

```bash
pnpm check
```

等价于：仅对 **`registry/`** 跑 ESLint（Next / React / TS 规则）。

| 命令 | 说明 |
|------|------|
| **`pnpm check`** | **仅 `registry/` ESLint**（推荐：组件库门禁） |
| `pnpm lint:eslint:full` | 对整个 `apps/www` 跑 ESLint（需要时再开） |
| `pnpm typecheck` | 全项目 `tsc --noEmit`（不限于 registry） |
| `pnpm lint` | Biome（全项目） |
| `pnpm check:all` | Biome + 全站 ESLint + typecheck（最重） |

在仓库根目录：

```bash
pnpm check:www
```

**注意：** `registry` 目录在 **`apps/www/registry`**。若在仓库根目录直接执行 `pnpm exec eslint registry`，会找不到路径。请要么 **先 `cd apps/www`**，要么用上面的 `pnpm check:www`，或根目录：

```bash
pnpm lint:eslint:fix:www   # 仅 registry，自动 fix（改文件，提交前看 diff）
```

在 **`apps/www`** 内可选：

```bash
pnpm lint:eslint:fix
```

ESLint 配置见 `apps/www/eslint.config.mjs`（`eslint-config-next` 扁平配置）。  
对 **`registry/**`** 额外启用 `eslint-plugin-unused-imports`：未使用的 import / 变量会报 **error**（更接近 Vite/严格 TS 消费侧体验）。

输出太多时，可写入文件：`pnpm check 2>&1 \| tee registry-lint.txt`。

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
