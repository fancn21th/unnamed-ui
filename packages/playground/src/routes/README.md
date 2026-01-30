# Routes 路由配置

这个文件夹统一管理所有路由配置。

## 如何添加新页面

只需要在 `index.tsx` 中添加新的路由配置即可，无需在多个地方修改。

### 示例

```tsx
import { NewPage } from '@/pages/NewPage';

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Hello World',
    element: <HelloWorld />,
  },
  {
    path: '/new-page',
    label: '新页面',
    element: <NewPage />,
  },
  // 添加更多路由...
];
```

### RouteConfig 配置项

- `path`: 路由路径
- `label`: 在侧边栏显示的标签
- `element`: 页面组件
- `hidden`: (可选) 设为 `true` 可隐藏在侧边栏中
- `icon`: (可选) 图标 (预留字段)

### 注意事项

1. 所有路由都会自动添加到侧边导航栏
2. 如果不想在导航栏显示，设置 `hidden: true`
3. 路由配置会同时用于 `App.tsx` 和 `Layout.tsx`
