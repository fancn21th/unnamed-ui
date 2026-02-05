import { CheckboxGroup } from "@/registry/wuhan/composed/checkbox/checkbox";

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup
      defaultValue={["apple", "orange"]}
      options={[
        { label: "苹果", value: "apple" },
        { label: "橙子", value: "orange" },
        { label: "香蕉", value: "banana" },
        { label: "西瓜", value: "watermelon" },
      ]}
    />
  );
}
