import { RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioGroupOptions() {
  return (
    <RadioGroup
      defaultValue="apple"
      options={[
        { label: "苹果", value: "apple" },
        { label: "橙子", value: "orange" },
        { label: "香蕉", value: "banana" },
        { label: "西瓜（禁用）", value: "watermelon", disabled: true },
      ]}
    />
  );
}
