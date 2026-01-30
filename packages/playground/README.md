# 验证设计系统组件库

## 前置准备

### 配置路径 Alias

1. tsconfig.json 或者 tsconfig.app.json

```json
{
  "compilerOptions": {
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

2. vite

```ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```
