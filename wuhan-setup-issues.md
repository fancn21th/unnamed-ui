# Wuhan 组件安装问题记录（shadcn CLI）

## 文档结构
本文件用于持续记录安装过程中出现的问题与解决方案，后续新增问题请按「问题条目」模板追加。

## 环境信息
- 目录：`D:/test/unnamed-ui/packages/playground`（Vite）
- 相关命令：
  - `pnpm dlx shadcn@latest add http://localhost:3000/registry/wuhan/sidebar.json`
  - `pnpm dlx shadcn@latest add http://localhost:3000/r/wuhan/sidebar.json`

## 问题列表（索引）
1. Q1：未检测到 Tailwind CSS 配置
2. Q2：未检测到 import alias（tsconfig）
3. Q3：组件样式未生效（缺少 token 引入）
4. Q4：依赖缺失（@radix-ui/react-slot）

---

## Q1：未检测到 Tailwind CSS 配置
### 现象
- 报错：`No Tailwind CSS configuration found at D:\test\unnamed-ui\packages\playground.`

### 解决方案
1. 安装依赖：
   - `pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/postcss`
2. 初始化配置：
   - `pnpm exec tailwindcss init -p`
   - 若出现 `ERR_PNPM_DLX_NO_BIN`：
     - `pnpm dlx tailwindcss@3.4.17 init -p`
3. 更新 `tailwind.config.js`（或 `.cjs`）：
   ```js
   export default {
     content: [
       "./index.html",
       "./src/**/*.{ts,tsx,js,jsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```
4. 更新 `packages/playground/postcss.config.js`（Tailwind v4 必需）：
   ```js
   export default {
     plugins: {
       "@tailwindcss/postcss": {},
       autoprefixer: {},
     },
   };
   ```
5. 在 `src/index.css` 中添加：
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
6. 若有 dev server，重启一次。

### 验证方式
- 重新执行 `shadcn add`，Tailwind 校验通过（显示 `Validating Tailwind CSS config. Found v4.`）。
- Vite 不再抛出 PostCSS 错误。

---

## Q2：未检测到 import alias（tsconfig）
### 现象
- 报错：`No import alias found in your tsconfig.json file.`

### 解决方案
1. 在 `packages/playground/tsconfig.json` 添加（关键点：根 `tsconfig.json` 也要有 alias）：
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```
2. 在 `packages/playground/vite.config.ts` 添加对应 alias：
   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import path from "node:path";

   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   });
   ```
3. 重启 dev server，然后重新执行 `shadcn add`。

### 验证方式
- 补充根 `tsconfig.json` 的 alias 后，`Validating import alias` 通过，`shadcn add` 正常继续。

---

## Q3：组件样式未生效（缺少 token 引入）
### 现象
- 组件样式未生效（样式变量缺失）。

### 解决方案
- 执行命令引入 token：
  - `npx shadcn@latest add http://localhost:3000/r/wuhan/style.json`

### 验证方式
- 重新加载页面后，组件样式正常生效。

---

## Q4：依赖缺失（@radix-ui/react-slot）
### 现象
- 报错：`Failed to resolve import "@radix-ui/react-slot" from "src/components/wuhan/blocks/history-item-01.tsx".`

### 解决方案
- 安装缺失依赖：
  - `pnpm add @radix-ui/react-slot`

### 验证方式
- 重新启动/刷新 Vite，页面不再报该 import 错误。

---

## 问题条目模板（后续追加用）
```
## Qx：问题标题
### 现象
- 报错：<错误信息>
- 触发条件：<命令/操作>

### 解决方案
1. <步骤 1>
2. <步骤 2>

### 验证方式
- <验证步骤/结果>
```
