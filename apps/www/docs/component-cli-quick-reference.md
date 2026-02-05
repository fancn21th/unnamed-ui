# 组件 CLI 工具快速参考

## 一键创建组件

```bash
pnpm component:create
```

## 交互式提示

```
? 组件名称 (kebab-case): my-component
? 组件标题: My Component
? 组件描述: A description of the component
? 创建哪些类型?
  ◉ Primitive (原语)
  ◉ Composed (组合)
  ◉ Example (示例)
  ◉ Documentation (文档)
```

## 生成的文件

| 类型 | 路径 | 自动注册 |
|------|------|---------|
| Primitive | `registry/wuhan/blocks/{name}/{name}-01.tsx` | `blocks/_registry.ts` |
| Composed | `registry/wuhan/composed/{name}/{name}.tsx` | `composed/_registry.ts` |
| Example | `registry/wuhan/examples/{name}/{name}-demo.tsx` | `examples/_registry.ts` |
| Documentation | `content/docs/blocks/{name}.mdx` | - |

## 后续步骤

```bash
# 1. 编辑生成的代码
# 2. 构建注册表
pnpm registry:build

# 3. 启动开发服务器
pnpm dev

# 4. 访问文档
# http://localhost:3000/docs/blocks/{name}
```

## 命名规范

- ✅ kebab-case: `my-component`, `status-tag`
- ❌ PascalCase: `MyComponent`
- ❌ snake_case: `my_component`

## 效率对比

| 方式 | 时间 | 文件数 | 注册数 |
|------|------|--------|--------|
| **手动** | 20-30分钟 | 5+ 个文件 | 3 个 registry |
| **CLI 工具** | **1 分钟** | **一键创建** | **自动注册** |

## 常见问题

**Q: 只想创建部分文件怎么办？**  
A: 在交互提示中用空格键取消选择不需要的类型。

**Q: 组件不显示怎么办？**  
A: 运行 `pnpm registry:build` 并重启开发服务器。

**Q: 如何自定义模板？**  
A: 编辑 `scripts/create-component.mts` 中的模板字符串。

---

详细文档：[component-cli-guide.md](./component-cli-guide.md)
