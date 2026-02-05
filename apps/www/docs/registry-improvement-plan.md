# 组件开发流程改进方案

## 问题分析

### 当前痛点

1. **新增组件成本高**
   - 需要在 5 个位置创建文件
   - 需要手动编辑 3 个 `_registry.ts` 文件
   - 容易遗漏或出错

2. **构建流程繁琐**
   - 每次修改都要运行 `pnpm registry:build`
   - 构建时间较长

3. **依赖关系维护复杂**
   - 手动维护 `registryDependencies`
   - 容易出现无效引用
   - 心智负担重

## 已实现的改进（阶段一）

### ✅ 1. CLI 工具自动创建组件

**实现文件**：`scripts/create-component.mts`

**功能**：
- 交互式创建组件
- 自动生成 4 类文件（Primitive、Composed、Example、Documentation）
- 自动注册到 3 个 `_registry.ts`
- 统一的代码模板和命名规范

**使用方法**：
```bash
pnpm component:create
```

**效果对比**：
- **之前**：手动创建 5+ 文件，编辑 3 个 registry，耗时 20-30 分钟
- **现在**：一个命令，1 分钟完成所有样板代码

### 📦 安装的依赖

```json
{
  "devDependencies": {
    "prompts": "^2.4.2",
    "@types/prompts": "^2.4.9"
  }
}
```

### 📁 创建的文档

1. `docs/component-cli-guide.md` - 详细使用指南
2. `docs/component-cli-quick-reference.md` - 快速参考

## 后续改进方案（可选）

### 阶段二：自动监听与构建

#### 2.1 添加文件监听

```json
{
  "scripts": {
    "dev:watch": "concurrently \"pnpm dev\" \"pnpm registry:watch\"",
    "registry:watch": "nodemon --watch registry/wuhan --ext ts,tsx --exec \"pnpm registry:build\""
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "concurrently": "^8.0.0"
  }
}
```

**效果**：自动监听 registry 文件变化，无需手动运行构建命令

#### 2.2 优化构建速度

**方案**：
- 增量构建：只构建修改的文件
- 并行构建：使用 worker 线程
- 缓存优化：缓存未修改的组件

**预期效果**：
- 首次构建：~10s
- 增量构建：~2s

### 阶段三：智能依赖分析

#### 3.1 自动检测依赖

创建 `scripts/analyze-dependencies.mts`：

```typescript
// 分析组件文件中的 import 语句
// 自动推断 registryDependencies
// 生成或更新 _registry.ts
```

**效果**：
- 自动检测组件依赖
- 避免遗漏依赖
- 减少手动维护

#### 3.2 依赖冲突检测

```typescript
// 检测循环依赖
// 检测缺失依赖
// 检测未使用的依赖
```

**效果**：
- 提前发现依赖问题
- 保证 CLI 安装正常工作

### 阶段四：动态 Registry（长期）

#### 4.1 开发环境使用动态加载

```typescript
// app/api/registry/[...path]/route.ts
export async function GET(request: Request, { params }) {
  // 动态扫描组件文件
  // 实时生成 registry
  // 无需构建步骤
}
```

**效果**：
- 开发时零构建
- 即时生效
- 更快的开发迭代

#### 4.2 生产环境使用静态构建

```json
{
  "scripts": {
    "dev": "next dev",  // 动态 registry
    "build": "pnpm registry:build && next build"  // 静态构建
  }
}
```

**效果**：
- 开发体验好
- 生产性能优

## 渐进式实施计划

### ✅ 第一周（已完成）
- [x] CLI 工具创建组件
- [x] 自动注册到 registry
- [x] 编写使用文档

### 第二周（可选）
- [ ] 添加文件监听
- [ ] 优化构建速度
- [ ] 创建更多组件模板

### 第三周（可选）
- [ ] 依赖分析工具
- [ ] 依赖冲突检测
- [ ] 完善错误提示

### 未来（可选）
- [ ] 动态 registry（开发环境）
- [ ] VSCode 扩展集成
- [ ] 可视化组件管理界面

## 投入产出分析

### 阶段一：CLI 工具（已完成）
- **投入**：2 小时
- **产出**：节省 90% 创建时间
- **ROI**：⭐⭐⭐⭐⭐

### 阶段二：自动监听
- **投入**：2-4 小时
- **产出**：节省 50% 构建等待时间
- **ROI**：⭐⭐⭐⭐

### 阶段三：依赖分析
- **投入**：4-8 小时
- **产出**：减少 80% 依赖错误
- **ROI**：⭐⭐⭐

### 阶段四：动态 Registry
- **投入**：2-3 天
- **产出**：开发体验大幅提升
- **ROI**：⭐⭐⭐

## 使用示例

### 创建新组件

```bash
# 1. 运行 CLI 工具
pnpm component:create

# 2. 填写信息
? 组件名称: data-table
? 组件标题: Data Table
? 组件描述: A powerful data table component
? 创建哪些类型? (全选)

# 3. 自动生成
✅ Primitive: registry/wuhan/blocks/data-table/data-table-01.tsx
✅ Composed: registry/wuhan/composed/data-table/data-table.tsx
✅ Example: registry/wuhan/examples/data-table/data-table-demo.tsx
✅ Documentation: content/docs/blocks/data-table.mdx

# 4. 编辑代码
# 根据需求修改生成的代码

# 5. 构建
pnpm registry:build

# 6. 查看效果
pnpm dev
# 访问 http://localhost:3000/docs/blocks/data-table
```

### 只创建部分文件

```bash
pnpm component:create

? 组件名称: simple-card
? 组件标题: Simple Card
? 组件描述: A simple card component
? 创建哪些类型?
  ◉ Primitive (原语)
  ◯ Composed (组合)      ← 不需要
  ◯ Example (示例)        ← 不需要
  ◯ Documentation (文档)  ← 不需要
```

## 最佳实践建议

### 1. 使用 CLI 工具创建框架
- 所有新组件都使用 CLI 工具创建
- 保证代码结构一致
- 减少人为错误

### 2. 及时更新依赖
- 添加新功能时及时更新 `registryDependencies`
- 使用 `pnpm registry:build` 验证

### 3. 保持文档同步
- 代码修改后及时更新文档
- 参考现有组件的文档格式

### 4. 模块化开发
- Primitive 组件保持简单
- Composed 组件封装业务逻辑
- Example 展示各种用法

### 5. 定期检查
- 运行构建检查错误
- 检查依赖关系
- 更新文档

## 总结

### 当前状态
✅ **已解决问题 1**：通过 CLI 工具大幅降低创建成本  
⏳ **问题 2**：需要手动构建（可通过阶段二改进）  
⏳ **问题 3**：依赖维护仍需手动（可通过阶段三改进）

### 建议
1. **立即使用**阶段一的 CLI 工具，体验效率提升
2. **评估需求**，决定是否实施阶段二、三、四
3. **收集反馈**，持续优化工具和流程

### 优先级
- 🔥 **高优先级**：阶段一 CLI 工具（已完成）
- 🌟 **中优先级**：阶段二自动监听（建议实施）
- 💡 **低优先级**：阶段三依赖分析（可选）
- 🚀 **未来优化**：阶段四动态 Registry（长期目标）

---

**相关文档**：
- [CLI 工具使用指南](./component-cli-guide.md)
- [CLI 工具快速参考](./component-cli-quick-reference.md)
