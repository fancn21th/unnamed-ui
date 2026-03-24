import nextConfig from "eslint-config-next";
import unusedImports from "eslint-plugin-unused-imports";

/**
 * Next.js 官方 ESLint 扁平配置（含 React / Hooks / a11y / TypeScript 等）。
 * 与 Biome 并存：Biome 负责格式化与部分规则，ESLint 负责 Next 生态与类型相关检查。
 *
 * `registry/**` 会作为组件库被外部（如 Vite）引用，在此目录内收紧「未使用导入/变量」，
 * 避免 TS noUnusedLocals 在消费端才暴露问题。
 *
 * @see https://nextjs.org/docs/app/api-reference/config/eslint
 */
export default [
  ...nextConfig,
  {
    ignores: [
      ".source/**",
      "coverage/**",
      "**/*.mdx",
    ],
  },
  {
    files: ["registry/**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // 交给 unused-imports，避免与 @typescript-eslint/no-unused-vars 重复或漏报 import
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // 组件库原语刻意使用原生 img（兼容 Vite/非 Next 消费端），与 next/image 解耦
      "@next/next/no-img-element": "off",
    },
  },
];
