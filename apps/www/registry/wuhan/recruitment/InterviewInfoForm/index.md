---
group:
  title: 思维链组件
  order: 2
---

# 【待联调】InterviewInfoForm 灵活表单组件

基于字段配置的灵活表单组件，支持动态字段、自定义渲染、字段排序等功能。

## 特性

✅ **基于字段配置，高度灵活** - 通过配置驱动，无需修改组件代码即可实现各种表单场景  
✅ **支持多种字段类型** - radio、input、textarea、checkbox、upload、select（待实现）  
✅ **完整的文件上传功能** - 支持文件类型、大小、数量校验，自定义上传接口  
✅ **性能优化** - 使用 React Hooks（useMemo、useCallback）优化渲染性能  
✅ **样式系统** - 完全基于 styled-components，无内联样式，易于定制  
✅ **类型安全** - 完整的 TypeScript 类型定义  
✅ **可访问性支持** - 内置 ARIA 属性，支持无障碍访问  
✅ **状态管理** - 支持编辑/只读模式切换，状态同步机制  
✅ **自定义渲染** - 支持字段级别的自定义渲染函数  
✅ **字段验证** - 支持字段级别的验证规则和必填校验  

## 代码演示

### 基础用法

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'timeRange',
      label: '你关注的时间范围是多久？',
      type: 'radio',
      required: true,
      options: [
        { label: '短期1-2年', value: 'short' },
        { label: '中期3-5年', value: 'medium' },
        { label: '长期5-10年', value: 'long' },
      ],
      radioColumns: 3,
    },
    {
      name: 'aiTech',
      label: '你更关注哪些 AI 技术方向？',
      type: 'checkbox',
      required: true,
      options: [
        { label: '大模型', value: 'llm' },
        { label: '多模态', value: 'multimodal' },
        { label: '生成式AI', value: 'generative' },
        { label: 'AGI', value: 'agi' },
      ],
      radioColumns: 4,
    },
    {
      name: 'perspective',
      label: '你是从什么角度关注这些趋势？',
      type: 'input',
      required: true,
    },
    {
      name: 'industry',
      label: '你是从什么行业关注这些趋势？',
      type: 'input',
      required: true,
    },
    {
      name: 'files',
      label: '你有需要补充上传的文件吗？',
      type: 'upload',
    },
  ];

  return (
    <InterviewInfoForm
      title="补充确认信息"
      fields={fields}
      onSubmit={values => {
        console.log('表单提交:', values);
      }}
    />
  );
};
```

### 自定义字段顺序

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      required: true,
      order: 1, // 控制字段顺序
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'input',
      required: true,
      order: 2,
      rules: [
        { required: true, message: '请输入邮箱' },
        { type: 'email' as const, message: '请输入有效的邮箱地址' },
      ],
    },
    {
      name: 'department',
      label: '部门',
      type: 'radio',
      order: 3,
      options: [
        { label: '技术部', value: 'tech' },
        { label: '产品部', value: 'product' },
        { label: '设计部', value: 'design' },
      ],
      radioColumns: 3,
    },
  ];

  return (
    <InterviewInfoForm
      title="员工信息表单"
      fields={fields}
      showFieldOrder={true}
      requiredMarkPosition="after"
      onSubmit={values => {
        console.log('表单提交:', values);
      }}
    />
  );
};
```

### 动态显示/隐藏字段

```tsx
import React, { useState } from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const [showExtra, setShowExtra] = useState(false);

  const fields: FormFieldConfig[] = [
    {
      name: 'basic',
      label: '基础信息',
      type: 'input',
      required: true,
    },
    {
      name: 'extra',
      label: '额外信息',
      type: 'input',
      visible: showExtra, // 动态控制显示
    },
  ];

  return (
    <div>
      <button onClick={() => setShowExtra(!showExtra)}>切换额外字段</button>
      <InterviewInfoForm
        fields={fields}
        onSubmit={values => {
          console.log('表单提交:', values);
        }}
      />
    </div>
  );
};
```

### 自定义渲染

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'customField',
      label: '自定义字段',
      type: 'input',
      render: (field, form) => {
        return (
          <div>
            <input
              type="text"
              placeholder="自定义输入框"
              onChange={e => {
                form.setFieldValue(field.name, e.target.value);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <InterviewInfoForm
      fields={fields}
      onSubmit={values => {
        console.log('表单提交:', values);
      }}
    />
  );
};
```

### 自定义必填标记位置

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      required: true,
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'input',
      required: true,
    },
  ];

  return (
    <InterviewInfoForm
      title="用户信息表单"
      fields={fields}
      requiredMarkPosition="before" // 'before' | 'after'，默认 'after'
      requiredMarkColor="#ff4d4f" // 自定义颜色
      showFieldOrder={false} // 隐藏字段序号
      onSubmit={values => {
        console.log('表单提交:', values);
      }}
    />
  );
};
```

### 文件上传

组件内置完整的文件上传功能，支持文件类型、大小、数量校验。

#### 本地上传（默认）

如果不提供 `customRequest`，组件会自动使用本地上传功能，上传时按钮会显示 loading 状态并禁用。

**文件校验：**
- 文件类型校验：根据 `accept` 配置自动校验文件扩展名
- 文件大小校验：根据 `maxSize` 配置校验文件大小（MB）
- 文件数量校验：根据 `maxCount` 配置限制上传文件数量
- 校验失败时会显示友好的错误提示

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'resume',
      label: '上传简历',
      type: 'upload',
      required: true,
      accept: '.pdf,.doc,.docx',
      maxSize: 10, // MB
      maxCount: 1,
      // 不提供 customRequest，使用本地上传
    },
  ];

  return (
    <InterviewInfoForm
      title="简历上传"
      fields={fields}
      onSubmit={values => {
        console.log('表单提交:', values);
        // values.resume 是文件列表
      }}
    />
  );
};
```

#### 自定义上传接口

如果需要使用自定义的上传接口，可以提供 `customRequest` 函数。

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'resume',
      label: '上传简历',
      type: 'upload',
      required: true,
      accept: '.pdf,.doc,.docx',
      maxSize: 10, // MB
      maxCount: 1,
      customRequest: async (options) => {
        const { file, onSuccess, onError, onProgress } = options;
        // 自定义上传逻辑
        try {
          // 模拟上传进度
          const formData = new FormData();
          formData.append('file', file as File);
          
          // 执行上传操作
          // const result = await uploadFile(formData, {
          //   onUploadProgress: (progressEvent) => {
          //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          //     onProgress?.({ percent });
          //   },
          // });
          // onSuccess(result);
        } catch (error) {
          onError(error as Error);
        }
      },
    },
  ];

  return (
    <InterviewInfoForm
      title="简历上传"
      fields={fields}
      onSubmit={values => {
        console.log('表单提交:', values);
        // values.resume 是文件列表
      }}
    />
  );
};
```

### 文件上传校验

组件内置完整的文件校验功能，会在上传前自动校验文件类型、大小和数量。

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'resume',
      label: '上传简历',
      type: 'upload',
      required: true,
      accept: '.pdf,.doc,.docx', // 只接受 PDF 和 Word 文档
      maxSize: 10, // 最大 10MB
      maxCount: 3, // 最多上传 3 个文件
      // 校验失败时会自动显示错误提示
    },
  ];

  return (
    <InterviewInfoForm
      title="简历上传"
      fields={fields}
      onSubmit={values => {
        console.log('表单提交:', values);
      }}
    />
  );
};
```

**校验规则：**
- 文件类型：根据文件扩展名校验，不匹配时提示支持的文件类型
- 文件大小：超过限制时显示当前文件大小和限制大小
- 文件数量：超过限制时提示最大文件数量

### 状态管理

组件支持状态管理，可以自动切换编辑/只读模式。

```tsx
import React, { useState } from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const [status, setStatus] = useState<'pending' | 'confirmed'>('pending');
  const [formData, setFormData] = useState<any>(null);

  const fields: FormFieldConfig[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      required: true,
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'input',
      required: true,
    },
  ];

  const handleSubmit = (values: any) => {
    setFormData(values);
    setStatus('confirmed'); // 提交后自动切换为已确认状态
  };

  return (
    <InterviewInfoForm
      title="用户信息"
      fields={fields}
      status={status} // 控制表单状态
      initialValues={formData} // 显示提交后的数据
      onSubmit={handleSubmit}
    />
  );
};
```

**状态说明：**
- `pending`: 待确认状态，表单可编辑，显示"待确认"标签
- `confirmed`: 已确认状态，表单自动切换为只读模式，显示"已确认"标签
- 如果未设置 `readOnly`，组件会根据 `status` 自动计算只读模式

### 只读模式

只读模式用于展示提交后的数据，普通字段显示为纯文本，上传文件保持文件项样式。

```tsx
import React from 'react';
import InterviewInfoForm, { FormFieldConfig } from './';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'interviewMethod',
      label: '面试方式',
      type: 'radio',
      required: true,
      options: [
        { label: '现场面试', value: 'onsite' },
        { label: '视频面试', value: 'video' },
        { label: '电话面试', value: 'phone' },
      ],
    },
    {
      name: 'interviewLocation',
      label: '面试地点',
      type: 'input',
      required: true,
    },
    {
      name: 'resume',
      label: '简历',
      type: 'upload',
      required: true,
    },
  ];

  // 提交后的数据
  const submittedData = {
    interviewMethod: 'video',
    interviewLocation: '线上会议室',
    resume: [
      {
        uid: '1',
        name: 'resume.pdf',
        status: 'done',
      },
    ],
  };

  return (
    <InterviewInfoForm
      readOnly={true}
      title="提交信息"
      fields={fields}
      initialValues={submittedData}
    />
  );
};
```

## API

### InterviewInfoFormProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 字段配置列表（必传） | `FormFieldConfig[]` | - |
| title | 表单标题 | `string` | `'补充确认信息'` |
| onSubmit | 表单提交回调 | `(values: Record<string, any>) => void` | - |
| initialValues | 表单初始值 | `Record<string, any>` | - |
| submitButtonText | 确认按钮文本 | `string` | `'确认'` |
| showSubmitButton | 是否显示确认按钮 | `boolean` | `true` |
| submitButtonRender | 自定义确认按钮渲染 | `(onSubmit: () => void) => React.ReactNode` | - |
| requiredMarkPosition | 必填标记位置 | `'before' \| 'after'` | `'after'` |
| requiredMarkColor | 必填标记颜色 | `string` | `'#ff4d4f'` |
| showFieldOrder | 是否显示字段序号 | `boolean` | `true` |
| readOnly | 是否只读模式（用于展示提交后的数据） | `boolean` | `false` |
| status | 表单状态 | `'pending' \| 'confirmed'` | - |
| formProps | Form 组件的其他属性 | `Omit<FormProps, 'form' \| 'layout' \| 'initialValues' \| 'onFinish'>` | - |
| className | 自定义类名 | `string` | - |

**状态说明：**
- `pending`: 待确认状态，表单可编辑
- `confirmed`: 已确认状态，表单自动切换为只读模式（如果未显式设置 `readOnly`）

### FormFieldConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名称（对应表单值的 key） | `string` | - |
| label | 字段标签 | `string` | - |
| type | 字段类型 | `'radio' \| 'input' \| 'textarea' \| 'upload' \| 'select' \| 'checkbox'` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 验证规则 | `Rule[]` | - |
| placeholder | 占位符 | `string` | - |
| order | 字段顺序（用于自定义排序） | `number` | - |
| visible | 是否显示 | `boolean` | `true` |
| className | 自定义样式类名 | `string` | - |
| options | Radio/Select/Checkbox 选项列表 | `OptionItem[]` | - |
| radioColumns | Radio 组件的列数 | `number` | `3` |
| accept | Upload 组件接受的文件类型 | `string` | - |
| maxSize | Upload 组件最大文件大小（MB） | `number` | - |
| maxCount | Upload 组件最大文件数量 | `number` | - |
| customRequest | Upload 组件的自定义上传行为 | `UploadProps['customRequest']` | - |
| uploadProps | Upload 组件的其他属性 | `Omit<UploadProps, 'accept' \| 'maxCount' \| 'customRequest' \| 'fileList' \| 'onChange'>` | - |
| render | 自定义渲染函数 | `(field: FormFieldConfig, form: FormInstance) => React.ReactNode` | - |

### OptionItem

```ts
interface OptionItem {
  label: string;
  value: string;
}
```

## 字段类型说明

### radio
单选按钮组，支持自定义列数（`radioColumns`）。

### input
文本输入框。

### textarea
多行文本输入框。

### upload
文件上传组件，支持自定义文件类型、大小限制和数量限制。

**特性：**
- ✅ 上传时按钮会显示 loading 状态并自动禁用，防止重复点击
- ✅ 如果不提供 `customRequest`，会使用本地上传功能（模拟上传过程）
- ✅ 文件列表自定义渲染，支持文件图标显示
- ✅ 完整的文件校验：类型、大小、数量
- ✅ 校验失败时显示友好的错误提示
- ✅ 支持文件删除功能
- ✅ 只读模式下仅显示文件列表，不显示上传按钮

```ts
// 本地上传示例（不提供 customRequest）
const uploadField: FormFieldConfig = {
  name: 'resume',
  label: '上传简历',
  type: 'upload',
  required: true,
  accept: '.pdf,.doc,.docx',
  maxSize: 10, // MB
  maxCount: 1,
  // 不提供 customRequest，使用本地上传
};

// 自定义上传接口示例
const uploadFieldWithCustomRequest: FormFieldConfig = {
  name: 'resume',
  label: '上传简历',
  type: 'upload',
  required: true,
  accept: '.pdf,.doc,.docx',
  maxSize: 10, // MB
  maxCount: 1,
  customRequest: async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    // 自定义上传逻辑
    // 执行上传操作...
  },
};
```

### select
下拉选择框（待实现）。

### checkbox
多选框，支持自定义列数（`radioColumns`），样式与 Radio 组保持一致。

## 样式定制

组件完全基于 **styled-components** 构建，所有样式都在 `style.ts` 中统一管理，无内联样式。

### 样式类名

组件使用 CSS 类名前缀来应用样式：
- Radio 组：`radio-group-{fieldName}`
- Radio 项：`radio-item-{fieldName}`
- Checkbox 组：`checkbox-group-{fieldName}`
- Checkbox 项：`checkbox-item-{fieldName}`
- Input：`input-{fieldName}`
- Textarea：`textarea-{fieldName}`
- Upload：`upload-{fieldName}`
- Upload 按钮：`upload-button-{fieldName}`
- Upload 文件项：`upload-file-item-{fieldName}`
- 只读值：`readonly-value-{fieldName}`

### 自定义样式

可以通过以下方式自定义样式：

1. **通过 className 覆盖**：
```ts
<InterviewInfoForm
  fields={[
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      className: 'custom-input-class', // 自定义类名
    },
  ]}
/>
```

2. **通过 styled-components 扩展**：
```ts
import styled from 'styled-components';
import { StyledInterviewInfoForm } from './style';

const CustomForm = styled(StyledInterviewInfoForm)`
  background: #ffffff;
  border: 1px solid #e5e7eb;
`;
```

### 导出的 Styled Components

组件导出了以下 styled-components，可以直接使用或扩展：

- `StyledInterviewInfoForm` - 表单容器
- `StyledInterviewInfoFormTitle` - 表单标题
- `StyledRequiredMark` - 必填标记（支持动态颜色）
- `StyledEmptyValue` - 空值显示
- `StyledRadioGroup` - Radio 组容器
- `StyledRadioGroupContainer` - Radio 组网格容器（支持动态列数）
- `StyledCheckboxGroup` - Checkbox 组容器
- `StyledCheckboxGroupContainer` - Checkbox 组网格容器（支持动态列数）
- `StyledFileIcon` - 文件图标容器（支持动态字体大小）

## 性能优化

组件内置了多项性能优化：

1. **useMemo 缓存计算结果**
   - 字段排序和过滤
   - 状态配置计算
   - 文件列表过滤

2. **useCallback 缓存回调函数**
   - 表单提交处理
   - 字段渲染函数
   - 文件上传处理

3. **组件拆分**
   - `UploadField` 独立组件，避免不必要的重新渲染
   - 工具函数独立文件，便于代码复用

## 类型导出

组件导出了完整的 TypeScript 类型定义：

```ts
import InterviewInfoForm, {
  type InterviewInfoFormProps,
  type FormFieldConfig,
  type OptionItem,
  type FieldType,
  type FormStatus,
  type FormValues,
  type SubmitHandler,
} from './';
```

## 最佳实践

1. **字段配置**：使用 `order` 属性控制字段顺序，使用 `visible` 属性控制显示/隐藏
2. **文件上传**：始终配置 `accept`、`maxSize`、`maxCount` 以确保文件校验
3. **状态管理**：使用 `status` 属性管理表单状态，组件会自动处理只读模式切换
4. **自定义渲染**：对于复杂字段，使用 `render` 函数进行自定义渲染
5. **样式定制**：优先使用 styled-components 扩展样式，避免内联样式
