---
group:
  title: 公共组件
  order: 3
---

# 【待联调】 DeleteConfirmModal 删除确认对话框

用于确认删除操作的模态对话框组件，符合用户体验最佳实践，提供清晰的删除警告和后果说明。

## 代码演示

### 基础用法

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import DeleteConfirmModal from './';

export default () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log('确认删除');
    setOpen(false);
  };

  return (
    <>
      <Button danger onClick={() => setOpen(true)}>
        删除文档
      </Button>
      <DeleteConfirmModal open={open} onClose={() => setOpen(false)} onConfirm={handleConfirm} />
    </>
  );
};
```

## API

| 参数      | 说明                   | 类型       | 默认值 |
| --------- | ---------------------- | ---------- | ------ |
| open      | 控制对话框的显示状态   | boolean    | -      |
| onClose   | 关闭对话框时的回调函数 | () => void | -      |
| onConfirm | 确认删除时的回调函数   | () => void | -      |

## 特性

- 清晰的删除警告标题："确认移除吗？"
- 明确的后果说明：文档不可恢复
- 显著的"删除"按钮（danger 类型）突出警告
- 居中显示，宽度 416px
- 支持 ESC 键关闭和点击遮罩关闭
- 精确的间距控制：padding 20px 24px，内容上下 padding 24px

## 设计规范

该组件严格遵循以下设计规范：

- **视觉层级**：标题 16px/500，内容 14px
- **间距系统**：整体 padding 20px 24px，内容区域上下 24px
- **颜色规范**：使用 CSS 变量适配主题系统
- **交互反馈**：删除按钮使用 danger 类型，视觉上强调危险操作

## 使用场景

适用于需要二次确认的删除操作场景：

- 文档删除
- 数据移除
- 记录清除
- 其他不可逆操作的确认

## 注意事项

1. 删除操作不可逆，务必在 `onConfirm` 回调中执行实际的删除逻辑
2. 建议在 `onConfirm` 执行成功后调用 `onClose` 关闭对话框
3. 如果删除操作是异步的，建议在按钮上添加 loading 状态
