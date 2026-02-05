import { Checkbox } from "@/registry/wuhan/composed/checkbox/checkbox";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox>默认复选框</Checkbox>
      <Checkbox defaultChecked>默认选中</Checkbox>
      <Checkbox disabled>禁用状态</Checkbox>
      <Checkbox disabled defaultChecked>
        禁用选中
      </Checkbox>
    </div>
  );
}
