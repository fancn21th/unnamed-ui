import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectFullRounded() {
  return (
    <BlockSelect
      fullRounded
      options={[
        { label: "苹果", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "橙子", value: "orange" },
      ]}
      placeholder="圆角 100%"
    />
  );
}
