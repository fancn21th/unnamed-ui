import { Checkbox } from "@/registry/wuhan/composed/checkbox/checkbox";

export default function CheckboxIndeterminate() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox indeterminate>半选状态</Checkbox>
      <Checkbox indeterminate disabled>
        禁用半选状态
      </Checkbox>
    </div>
  );
}
