import {
  DynamicFormLayoutPrimitive,
  DynamicFormHeaderPrimitive,
  DynamicFormTitlePrimitive,
  DynamicFormBodyLayout,
  DynamicFormFooterPrimitive,
} from "@/registry/wuhan/blocks/dynamic-form/dynamic-form-01";

export default function DynamicFormDemo() {
  return (
    <DynamicFormLayoutPrimitive>
      <DynamicFormHeaderPrimitive>
        <DynamicFormTitlePrimitive>用户干预信息</DynamicFormTitlePrimitive>
        <button className="text-sm text-blue-600 hover:underline h-[30px]">
          添加任务
        </button>
      </DynamicFormHeaderPrimitive>
      {/* 在此处添加动态表单的内容 */}
      <DynamicFormBodyLayout>
        {/* 表单项可以放在这里 */}
      </DynamicFormBodyLayout>
      <DynamicFormFooterPrimitive>
        <button className="px-4 py-2 border border-gray-300 rounded-md">
          重置
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          提交
        </button>
      </DynamicFormFooterPrimitive>
    </DynamicFormLayoutPrimitive>
  );
}
