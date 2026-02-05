# 组件创建 CLI 工具使用指南

## 概述

为了简化组件开发流程，我们提供了 `component:create` CLI 工具，可以一键创建完整的组件结构，包括：

- ✅ Primitive 原语组件
- ✅ Composed 组合组件
- ✅ Example 示例代码
- ✅ Documentation 文档页面
- ✅ 自动注册到 _registry.ts

## 快速开始

### 1. 运行 CLI 工具

在项目根目录或 `apps/www` 目录下运行：

```bash
pnpm component:create
```

### 2. 按照提示填写信息

工具会依次询问以下信息：

```
? 组件名称 (kebab-case): my-panel
? 组件标题: My Panel  
? 组件描述: A custom panel component for displaying content
? 创建哪些类型? (使用空格键选择，回车确认)
  ◉ Primitive (原语)
  ◉ Composed (组合)
  ◉ Example (示例)
  ◉ Documentation (文档)
```

### 3. 查看生成结果

工具会自动创建以下文件：

```
✅ 组件 my-panel 创建成功！

   ✅ Primitive: registry/wuhan/blocks/my-panel/my-panel-01.tsx
   ✅ Composed: registry/wuhan/composed/my-panel/my-panel.tsx
   ✅ Example: registry/wuhan/examples/my-panel/my-panel-demo.tsx
   ✅ Documentation: content/docs/blocks/my-panel.mdx
   
   📝 已注册到 blocks/_registry.ts
   📝 已注册到 composed/_registry.ts
   📝 已注册到 examples/_registry.ts

📝 下一步：
1. 编辑组件代码
2. 运行 pnpm registry:build 构建注册表
3. 访问 http://localhost:3000/docs/blocks/my-panel
```

## 生成的文件结构

### Primitive 原语组件

位置：`registry/wuhan/blocks/{name}/{name}-01.tsx`

包含以下基础组件：
- `{Name}ContainerPrimitive` - 容器组件
- `{Name}HeaderPrimitive` - 头部组件
- `{Name}TitlePrimitive` - 标题组件
- `{Name}ContentPrimitive` - 内容组件

```tsx
// registry/wuhan/blocks/my-panel/my-panel-01.tsx
export const MyPanelContainerPrimitive = React.forwardRef<...>(...)
export const MyPanelHeaderPrimitive = React.forwardRef<...>(...)
export const MyPanelTitlePrimitive = React.forwardRef<...>(...)
export const MyPanelContentPrimitive = React.forwardRef<...>(...)
```

### Composed 组合组件

位置：`registry/wuhan/composed/{name}/{name}.tsx`

基于原语组件封装的高级组件，提供简化的 API：

```tsx
// registry/wuhan/composed/my-panel/my-panel.tsx
export interface MyPanelProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function MyPanel({ title, children, className }: MyPanelProps) {
  // 使用原语组件构建
}
```

### Example 示例代码

位置：`registry/wuhan/examples/{name}/{name}-demo.tsx`

展示组件基础用法的示例：

```tsx
// registry/wuhan/examples/my-panel/my-panel-demo.tsx
export default function MyPanelDemo() {
  return (
    <MyPanel>
      <p>这是一个示例内容。</p>
    </MyPanel>
  )
}
```

### Documentation 文档页面

位置：`content/docs/blocks/{name}.mdx`

包含完整的组件文档：
- 组件概述和特性
- 快速开始示例
- 安装方法（CLI 和手动）
- 代码演示
- API 文档
- 使用场景
- 最佳实践

## 自动注册

工具会自动将组件注册到对应的 `_registry.ts` 文件：

### Blocks Registry

```typescript
// registry/wuhan/blocks/_registry.ts
{
  name: "my-panel-01",
  type: "registry:block",
  title: "My Panel",
  description: "A custom panel component for displaying content",
  registryDependencies: ["style"],
  files: [
    {
      path: "blocks/my-panel/my-panel-01.tsx",
      type: "registry:component",
      target: "components/wuhan/blocks/my-panel-01.tsx",
    },
  ],
}
```

### Composed Registry

```typescript
// registry/wuhan/composed/_registry.ts
{
  name: "my-panel",
  type: "registry:block",
  title: "My Panel",
  description: "A custom panel component for displaying content",
  registryDependencies: ["my-panel-01"],
  files: [
    {
      path: "composed/my-panel/my-panel.tsx",
      type: "registry:component",
      target: "components/wuhan/composed/my-panel.tsx",
    },
  ],
}
```

### Examples Registry

```typescript
// registry/wuhan/examples/_registry.ts
{
  name: "my-panel-demo",
  type: "registry:example",
  registryDependencies: ["my-panel"],
  files: [
    {
      path: "examples/my-panel/my-panel-demo.tsx",
      type: "registry:example",
    },
  ],
}
```

## 后续开发步骤

### 1. 编辑组件代码

根据实际需求修改生成的代码：

- **Primitive 组件**：添加更多基础元素和样式
- **Composed 组件**：添加业务逻辑和高级功能
- **Example**：创建更多示例展示不同用法

### 2. 添加更多示例

可以手动创建更多示例文件：

```bash
# 创建新示例
touch registry/wuhan/examples/my-panel/my-panel-with-footer.tsx
```

然后手动注册到 `examples/_registry.ts`。

### 3. 更新依赖关系

如果组件依赖其他组件，更新 `registryDependencies`：

```typescript
{
  name: "my-panel",
  registryDependencies: ["my-panel-01", "button", "status-tag"], // 添加依赖
}
```

### 4. 构建注册表

修改代码后，运行构建命令：

```bash
pnpm registry:build
```

### 5. 查看效果

启动开发服务器：

```bash
pnpm dev
```

访问文档页面：`http://localhost:3000/docs/blocks/my-panel`

## 选择性创建

如果只需要创建部分文件，可以在工具提示时取消选择不需要的类型：

```
? 创建哪些类型? (使用空格键选择，回车确认)
  ◉ Primitive (原语)      ← 选中
  ◉ Composed (组合)        ← 选中
  ◯ Example (示例)         ← 未选中
  ◯ Documentation (文档)   ← 未选中
```

这样只会创建 Primitive 和 Composed 组件，不会创建示例和文档。

## 命名规范

### 组件名称（kebab-case）

- ✅ `my-panel`
- ✅ `status-tag`
- ✅ `confirm-panel`
- ❌ `MyPanel`（应该用 kebab-case）
- ❌ `my_panel`（应该用 - 而不是 _）

### 文件命名

- Primitive：`{name}-01.tsx`（例如：`my-panel-01.tsx`）
- Composed：`{name}.tsx`（例如：`my-panel.tsx`）
- Example：`{name}-demo.tsx`（例如：`my-panel-demo.tsx`）

### 组件命名（PascalCase）

工具会自动将 kebab-case 转换为 PascalCase：

- `my-panel` → `MyPanel`
- `status-tag` → `StatusTag`
- `confirm-panel` → `ConfirmPanel`

## 最佳实践

### 1. 先规划再创建

在运行工具前，先规划好：
- 组件的功能和 API
- 需要哪些原语组件
- 有哪些使用场景

### 2. 分步骤开发

建议的开发流程：

1. 创建组件框架（使用 CLI）
2. 完善 Primitive 原语组件
3. 实现 Composed 组合组件
4. 添加多个示例
5. 完善文档
6. 构建并测试

### 3. 保持一致性

参考现有组件的代码风格和文档格式：
- 参考 `confirm-panel` 了解组件结构
- 参考 `status-tag.mdx` 了解文档格式
- 参考 `task-list` 了解复杂组件实现

### 4. 及时更新依赖

当添加新功能时，及时更新 `registryDependencies`，确保 CLI 安装时能正确安装所有依赖。

### 5. 文档先行

先写好文档，明确 API 设计，再实现代码。这样可以：
- 提前发现 API 设计问题
- 确保文档和代码一致
- 提供更好的开发体验

## 故障排除

### 问题：组件名称验证失败

```
? 组件名称 (kebab-case): MyPanel
✖ 请使用 kebab-case
```

**解决**：使用小写字母和连字符，例如 `my-panel`。

### 问题：注册表构建失败

```
❌ Registry validation failed
```

**解决**：
1. 检查 `_registry.ts` 语法是否正确
2. 检查文件路径是否存在
3. 运行 `pnpm registry:build` 查看详细错误

### 问题：组件在页面上不显示

**可能原因**：
1. 忘记运行 `pnpm registry:build`
2. 文件路径不正确
3. `_registry.ts` 注册信息有误

**解决**：
1. 运行 `pnpm registry:build`
2. 检查文件路径和注册信息
3. 清空缓存重新启动：`rm -rf .next && pnpm dev`

## 高级用法

### 自定义模板

如果需要自定义生成的代码模板，可以修改 `scripts/create-component.mts` 中的模板字符串。

### 批量创建

可以创建脚本批量创建多个组件：

```typescript
// scripts/batch-create.mts
const components = [
  { name: "panel-a", title: "Panel A", description: "..." },
  { name: "panel-b", title: "Panel B", description: "..." },
]

for (const comp of components) {
  // 调用创建函数
}
```

### 自动化工作流

结合 Git hooks 实现自动化：

```bash
# .husky/pre-commit
pnpm registry:build
git add registry/__index__.tsx
```

## 总结

使用 `component:create` CLI 工具可以：

- ⚡ **节省时间**：自动创建 4 类文件，自动注册 3 个 registry
- 🎯 **减少错误**：统一的文件结构和命名规范
- 📚 **完整文档**：自动生成标准化的文档模板
- 🔄 **提高效率**：专注于组件逻辑而非样板代码

**之前**：需要手动创建 5+ 个文件，手动编辑 3 个 `_registry.ts`，耗时 20-30 分钟

**现在**：运行一个命令，回答几个问题，1 分钟完成所有样板代码

---

**相关文档**：
- [组件开发指南](./component-development-guide.md)
- [Composed 架构审计](./composed-architecture-audit.md)
- [Primitive 设计指南](./primitive-design-guide.md)
