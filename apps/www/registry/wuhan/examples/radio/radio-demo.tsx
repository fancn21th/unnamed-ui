import { Radio, RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioDemo() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="option1">
        <Radio value="option1" id="option1">
          选项 1
        </Radio>
        <Radio value="option2" id="option2">
          选项 2
        </Radio>
        <Radio value="option3" id="option3" disabled>
          选项 3（禁用）
        </Radio>
      </RadioGroup>
    </div>
  );
}
