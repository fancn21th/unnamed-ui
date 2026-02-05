import { RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioVertical() {
  return (
    <RadioGroup
      defaultValue="1"
      orientation="vertical"
      options={["选项 1", "选项 2", "选项 3"]}
    />
  );
}
