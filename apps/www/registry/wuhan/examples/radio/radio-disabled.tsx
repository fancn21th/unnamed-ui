import { Radio, RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-sm font-medium mb-3">禁用整个组</div>
        <RadioGroup defaultValue="option1" disabled>
          <Radio value="option1" id="disabled-group-1">
            选项 1
          </Radio>
          <Radio value="option2" id="disabled-group-2">
            选项 2
          </Radio>
          <Radio value="option3" id="disabled-group-3">
            选项 3
          </Radio>
        </RadioGroup>
      </div>

      <div>
        <div className="text-sm font-medium mb-3">禁用单个选项</div>
        <RadioGroup defaultValue="option1">
          <Radio value="option1" id="disabled-item-1">
            选项 1
          </Radio>
          <Radio value="option2" id="disabled-item-2" disabled>
            选项 2（禁用）
          </Radio>
          <Radio value="option3" id="disabled-item-3">
            选项 3
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
