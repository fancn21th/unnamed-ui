---
group:
  title: 招聘组件
  order: 1
---

# 【待联调】RepeatFileModal 重复文件提示对话框

当上传文件时检测到重复文件，使用此组件提示用户并让用户选择处理方式。与 ResourceUpload 组件配合使用。

## 代码演示

### 基础用法

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import RepeatFileModal from './';
import type { DuplicateFileInfo } from './';

export default () => {
  const [visible, setVisible] = useState(false);
  const [files] = useState<DuplicateFileInfo[]>([
    { fileName: '招聘计划.pdf', reason: 'MD5 冲突' },
    { fileName: '面试题库.docx', reason: '文件名已存在' },
    { fileName: '简历模板.doc' },
  ]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        显示重复文件提示
      </Button>
      <RepeatFileModal
        open={visible}
        files={files}
        onCancel={() => {
          console.log('取消上传');
          setVisible(false);
        }}
        onSkip={() => {
          console.log('跳过重复文件');
          setVisible(false);
        }}
      />
    </>
  );
};
```

### 与 ResourceUpload 联合使用

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import ResourceUpload, { DuplicateFilesError } from '../ResourceUpload';
import RepeatFileModal from './';
import type { DuplicateFileInfo } from './';

export default () => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [repeatModalVisible, setRepeatModalVisible] = useState(false);
  const [duplicateFiles, setDuplicateFiles] = useState<DuplicateFileInfo[]>([]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // 模拟后端返回重复文件
    const response = await uploadAPI(formData);

    // 后端返回重复文件时，抛出标准化错误
    if (response.duplicates && response.duplicates.length > 0) {
      throw new DuplicateFilesError(response.duplicates);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setUploadVisible(true)}>
        上传文件
      </Button>

      <ResourceUpload
        visible={uploadVisible}
        onClose={() => setUploadVisible(false)}
        onUpload={handleUpload}
        onDuplicateDetected={duplicates => {
          setDuplicateFiles(duplicates);
          setRepeatModalVisible(true);
        }}
      />

      <RepeatFileModal
        open={repeatModalVisible}
        files={duplicateFiles}
        onCancel={() => {
          setRepeatModalVisible(false);
          setUploadVisible(false);
          setDuplicateFiles([]);
        }}
        onSkip={() => {
          setRepeatModalVisible(false);
          setDuplicateFiles([]);
        }}
      />
    </>
  );
};
```

## API

### RepeatFileModal Props

| 参数     | 说明                       | 类型                | 默认值 |
| -------- | -------------------------- | ------------------- | ------ |
| open     | 控制 Modal 的显示状态      | boolean             | -      |
| files    | 重复的文件列表             | DuplicateFileInfo[] | -      |
| onCancel | 点击"取消上传"时的回调函数 | () => void          | -      |
| onSkip   | 点击"跳过"时的回调函数     | () => void          | -      |

### DuplicateFileInfo 接口

| 参数     | 说明                                         | 类型   | 默认值 |
| -------- | -------------------------------------------- | ------ | ------ |
| fileName | 文件名称                                     | string | -      |
| reason   | 重复原因（可选，如：MD5 冲突、文件名已存在） | string | -      |

## 特性

- **清晰的提示信息**：明确告知用户发现了重复文件
- **详细的文件列表**：展示所有重复文件的文件名和重复原因
- **友好的交互选项**：
  - 取消上传：放弃本次上传操作
  - 跳过：跳过重复的文件，继续处理其他文件
- **滚动优化**：文件列表超过 300px 时自动显示滚动条
- **样式统一**：与项目其他 Modal 组件保持一致的视觉风格

## 设计规范

该组件严格遵循以下设计规范：

- **视觉层级**：标题 16px/500，内容 14px
- **间距系统**：整体 padding 20px 24px，保持与其他 Modal 一致
- **颜色规范**：使用 CSS 变量适配主题系统
- **文件列表样式**：灰色背景，清晰的分割线，优化的滚动条

## 使用场景

适用于文件上传时的重复检测场景：

- 知识库文档上传
- 简历批量上传
- 资料库管理
- 其他需要防止重复文件的场景

## 与 ResourceUpload 的协作机制

1. **错误传递**：ResourceUpload 通过 `DuplicateFilesError` 传递重复文件信息
2. **回调触发**：ResourceUpload 捕获错误后调用 `onDuplicateDetected` 回调
3. **状态管理**：父组件负责管理两个 Modal 的显示状态和数据流转
4. **用户决策**：RepeatFileModal 提供用户决策选项，结果通过回调通知父组件

## 注意事项

1. 必须与 ResourceUpload 配合使用，确保错误类型为 `DuplicateFilesError`
2. `onCancel` 通常需要同时关闭 RepeatFileModal 和 ResourceUpload
3. `onSkip` 只关闭 RepeatFileModal，允许用户继续上传其他文件
4. 文件列表建议不超过 50 个，避免性能问题
