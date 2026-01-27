---
group:
  title: 招聘组件
  order: 3
---

# ConfirmJDForm 职位需求确认表单

基于字段配置的动态表单组件，用于职位需求信息的录入和确认。支持多种字段类型，界面简洁清晰，标签带序号且独占一行，输入控件独占一行。

## 组件特点

- **动态表单生成** - 基于 `fields` 配置自动生成表单字段，无需手写大量重复代码
- **多种字段类型** - 支持文本输入（input）、下拉选择（select）、日期选择（datePicker）、数字输入（inputNumber）四种常用类型
- **清晰的布局** - Label 带序号（1. 2. 3.）且独占一行，输入控件独占一行，视觉层次分明
- **完整的验证** - 基于 Ant Design Form 验证机制，支持自定义验证规则
- **外部控制** - 支持传入外部 Form 实例，方便在父组件中控制表单行为
- **无障碍支持** - 添加 ARIA 属性，提升可访问性

## 代码演示

### 外部控制表单

传入外部 Form 实例，实现父组件对表单的完全控制。

```tsx
import React, { useRef } from 'react';
import { Form, Button, message } from 'antd';
import { ConfirmJDForm } from '@/components';
import type { FormFieldConfig } from '@/components';
import type { FormInstance } from 'antd';

export default () => {
  const formRef = useRef<FormInstance>(null);

  const fields: FormFieldConfig[] = [
    {
      name: 'jobTitle',
      type: 'input',
      label: '岗位名称',
      rules: [{ required: true, message: '请输入岗位名称' }],
    },
    {
      name: 'department',
      type: 'input',
      label: '所属部门',
    },
    {
      name: 'headcount',
      type: 'inputNumber',
      label: '招聘人数',
      min: 1,
    },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    message.success('表单提交成功！');
    console.log('表单数据:', values);
  };

  const handleReset = () => {
    formRef.current?.resetFields();
    message.info('表单已重置');
  };

  const handleFillData = () => {
    formRef.current?.setFieldsValue({
      jobTitle: 'UI/UX设计师',
      department: '设计部',
      headcount: 2,
    });
    message.success('数据已填充');
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={handleFillData} style={{ marginRight: 8 }}>
          填充数据
        </Button>
        <Button onClick={handleReset}>重置表单</Button>
      </div>
      <ConfirmJDForm form={formRef.current!} fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};
```

### 完整场景示例

综合展示多种字段类型的职位信息确认表单。

```tsx
import React from 'react';
import { message } from 'antd';
import { ConfirmJDForm } from '@/components';
import type { FormFieldConfig } from '@/components';

export default () => {
  const fields: FormFieldConfig[] = [
    {
      name: 'name',
      type: 'input',
      label: '岗位名称',
      placeholder: '请输入岗位名称',
      initialValue: '',
      rules: [
        {
          required: true,
          message: '请输入岗位名称！',
        },
      ],
      disabled: false,
    },
    {
      name: 'requirementStatus',
      type: 'select',
      label: '需求状态',
      placeholder: '请选择需求状态',
      options: [
        { label: '草稿', value: 10 },
        { label: '审批中', value: 20 },
        { label: '审批未通过', value: 30 },
        { label: '进行中', value: 40 },
        { label: '已关闭', value: 50 },
        { label: '已完成', value: 60 },
        { label: '已暂停', value: 70 },
        { label: '审批已终止', value: 80 },
      ],
      initialValue: 10,
      rules: [
        {
          required: true,
          message: '请选择需求状态！',
        },
      ],
      disabled: false,
    },
    {
      name: 'requirementType',
      type: 'select',
      label: '需求类型',
      placeholder: '请选择需求类型',
      options: [
        { label: '新增', value: 1 },
        { label: '顶替', value: 2 },
        { label: '储备', value: 3 },
      ],
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择需求类型！',
        },
      ],
      disabled: false,
    },
    {
      name: 'createDate',
      type: 'datePicker',
      label: '需求提出时间',
      placeholder: '请选择需求提出时间',
      initialValue: '2026-01-23',
      rules: [
        {
          required: true,
          message: '请选择需求提出时间！',
        },
      ],
      disabled: false,
      format: 'YYYY-MM-DD',
    },
    {
      name: 'arivalTime',
      type: 'datePicker',
      label: '期望到岗时间',
      placeholder: '请选择期望到岗时间',
      initialValue: '',
      rules: [
        {
          required: true,
          message: '请选择期望到岗时间！',
        },
      ],
      disabled: false,
      format: 'YYYY-MM-DD',
    },
    {
      name: 'salaryType',
      type: 'select',
      label: '薪资类型',
      placeholder: '请选择薪资类型',
      options: [
        { label: '年薪', value: 4 },
        { label: '月薪', value: 1 },
        { label: '日薪', value: 2 },
        { label: '时薪', value: 3 },
      ],
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择薪资类型！',
        },
      ],
      disabled: false,
    },
    {
      name: 'minSalary',
      type: 'inputNumber',
      label: '最低薪资',
      placeholder: '请输入最低薪资',
      initialValue: null,
      rules: [
        {
          required: true,
          message: '请输入最低薪资！',
        },
      ],
      disabled: false,
      min: 0,
      step: 1,
      precision: 2,
    },
    {
      name: 'maxSalary',
      type: 'inputNumber',
      label: '最高薪资',
      placeholder: '请输入最高薪资',
      initialValue: null,
      rules: [
        {
          required: true,
          message: '请输入最高薪资！',
        },
      ],
      disabled: false,
      min: 0,
      step: 1,
      precision: 2,
    },
    {
      name: 'headCount',
      type: 'inputNumber',
      label: '招聘人数',
      placeholder: '请输入招聘人数',
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入招聘人数！',
        },
      ],
      disabled: false,
      min: 1,
      step: 1,
      precision: 0,
    },
    {
      name: 'orgId',
      type: 'select',
      label: '部门ID',
      placeholder: '请选择部门',
      options: [{ label: '1884853', value: 1884853 }],
      initialValue: 1884853,
      rules: [
        {
          required: true,
          message: '请选择部门！',
        },
      ],
      disabled: false,
    },
    {
      name: 'kind',
      type: 'select',
      label: '工作性质',
      placeholder: '请选择工作性质',
      options: [
        { label: '全职', value: 1 },
        { label: '兼职', value: 2 },
        { label: '实习', value: 3 },
        { label: '其他', value: 4 },
      ],
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择工作性质！',
        },
      ],
      disabled: false,
    },
    {
      name: 'category',
      type: 'select',
      label: '招聘类别',
      placeholder: '请选择招聘类别',
      options: [
        { label: '社会招聘', value: 1 },
        { label: '校园招聘', value: 2 },
        { label: '实习生招聘', value: 3 },
        { label: 'AI专项招聘', value: 4 },
      ],
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择招聘类别！',
        },
      ],
      disabled: false,
    },
    {
      name: 'locId',
      type: 'select',
      label: '工作地点',
      placeholder: '请选择工作地点',
      mode: 'multiple',
      options: [
        { label: '北京', value: '201' },
        { label: '上海', value: '202' },
        { label: '深圳', value: '203' },
        { label: '杭州', value: '204' },
      ],
      initialValue: [],
      rules: [
        {
          required: true,
          message: '请选择工作地点！',
        },
      ],
      disabled: false,
    },
    {
      name: 'hrDutyUser',
      type: 'select',
      label: '招聘负责人',
      placeholder: '请选择招聘负责人',
      options: [{ label: '707953721', value: 707953721 }],
      initialValue: 707953721,
      rules: [
        {
          required: true,
          message: '请选择招聘负责人！',
        },
      ],
      disabled: false,
    },
    {
      name: 'createBy',
      type: 'select',
      label: '创建人',
      placeholder: '请选择创建人',
      options: [{ label: '707953721', value: 707953721 }],
      initialValue: 707953721,
      rules: [
        {
          required: true,
          message: '请选择创建人！',
        },
      ],
      disabled: false,
    },
    {
      name: 'status',
      type: 'select',
      label: '职位状态',
      placeholder: '请选择职位状态',
      options: [
        { label: '招聘中', value: 1 },
        { label: '已暂停', value: 0 },
        { label: '已结束', value: 2 },
        { label: '已取消', value: 3 },
        { label: '待处理', value: 6 },
        { label: '处理中', value: 7 },
      ],
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择职位状态！',
        },
      ],
      disabled: false,
    },
  ];

  const handleSubmit = async (values: Record<string, any>) => {
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success('职位信息提交成功！');
    console.log('完整表单数据:', values);
  };

  return <ConfirmJDForm title="补充职位信息" fields={fields} onSubmit={handleSubmit} submitButtonText="提交职位信息" />;
};
```

## API

### ConfirmJDFormProps

| 参数             | 说明             | 类型                                                     | 默认值     | 必填 |
| ---------------- | ---------------- | -------------------------------------------------------- | ---------- | ---- |
| className        | 自定义类名       | `string`                                                 | -          | 否   |
| title            | 表单标题         | `string`                                                 | `补充信息` | 否   |
| fields           | 字段配置数组     | `FormFieldConfig[]`                                      | `[]`       | 是   |
| onSubmit         | 表单提交回调函数 | `(values: Record<string, any>) => void \| Promise<void>` | -          | 否   |
| submitButtonText | 提交按钮文本     | `string`                                                 | `确认`     | 否   |
| form             | 外部 Form 实例   | `FormInstance`                                           | -          | 否   |

### FormFieldConfig

| 参数         | 说明                                   | 类型                                                   | 默认值       | 必填 |
| ------------ | -------------------------------------- | ------------------------------------------------------ | ------------ | ---- |
| name         | 字段名称（唯一标识）                   | `string`                                               | -            | 是   |
| type         | 字段类型                               | `'input' \| 'select' \| 'datePicker' \| 'inputNumber'` | -            | 是   |
| label        | 字段标签（会自动添加序号）             | `string`                                               | -            | 是   |
| placeholder  | 输入提示文本                           | `string`                                               | -            | 否   |
| initialValue | 初始值                                 | `any`                                                  | -            | 否   |
| rules        | 验证规则（Ant Design Form.Item rules） | `Rule[]`                                               | -            | 否   |
| disabled     | 是否禁用                               | `boolean`                                              | -            | 否   |
| options      | 选项列表（select 类型必需）            | `OptionItem[]`                                         | -            | 否   |
| mode         | Select 模式：单选或多选                | `'multiple' \| 'tags'`                                 | -            | 否   |
| format       | 日期格式（datePicker 类型使用）        | `string`                                               | `YYYY-MM-DD` | 否   |
| min          | 最小值（inputNumber 类型使用）         | `number`                                               | `0`          | 否   |
| max          | 最大值（inputNumber 类型使用）         | `number`                                               | -            | 否   |
| step         | 步长（inputNumber 类型使用）           | `number`                                               | `1`          | 否   |
| precision    | 小数精度（inputNumber 类型使用）       | `number`                                               | `0`          | 否   |

### OptionItem

| 参数  | 说明     | 类型               | 必填 |
| ----- | -------- | ------------------ | ---- |
| label | 显示文本 | `string`           | 是   |
| value | 选项值   | `string \| number` | 是   |

### FieldType

支持的字段类型：

- `'input'` - 单行文本输入框
- `'select'` - 下拉选择框（支持单选和多选）
- `'datePicker'` - 日期选择器
- `'inputNumber'` - 数字输入框

## 特性

- ✅ **动态配置** - 通过 JSON 配置快速生成复杂表单，避免重复代码
- 🎯 **类型安全** - 完整的 TypeScript 类型定义，IDE 友好
- 🔄 **数据处理** - 自动处理日期格式化、初始值转换等常见场景
- 🛡️ **表单验证** - 基于 Ant Design 强大的表单验证机制
- 🎨 **一致样式** - 统一的布局风格，Label 带序号，界面清晰
- 📝 **无障碍** - ARIA 属性支持，提升可访问性
- 🔌 **外部控制** - 支持传入外部 Form 实例，灵活控制表单行为

## 注意事项

1. **Select 字段必须提供 options**  
   当字段类型为 `select` 时，必须配置 `options` 数组，否则会在控制台输出警告并不渲染该字段。

2. **日期格式自动转换**  
   DatePicker 字段的 `initialValue` 应为日期字符串或 Date 对象，提交时会自动格式化为配置的 `format` 格式字符串（默认 `YYYY-MM-DD`）。

3. **验证规则兼容 Ant Design**  
   `rules` 属性直接传递给 `Form.Item`，完全兼容 Ant Design 的验证规则写法。

4. **外部 Form 实例的使用**  
   如果传入 `form` 属性，组件会使用外部 Form 实例，此时父组件可通过 `form.setFieldsValue()`、`form.resetFields()` 等方法控制表单。

5. **异步提交处理**  
   `onSubmit` 回调支持返回 Promise，可以在回调中执行异步操作（如 API 请求），组件会等待 Promise 完成。

6. **序号自动添加**  
   Label 的序号由组件自动添加，配置时无需在 `label` 中包含序号前缀。
