import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectDemo() {
  return (
    <BlockSelect
      options={[
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "橙子", value: "orange" },
        { label: "西瓜", value: "watermelon" },
      ]}
      placeholder="选择水果"
    />
  );
}
