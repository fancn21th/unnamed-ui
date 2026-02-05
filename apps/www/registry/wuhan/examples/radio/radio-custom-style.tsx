import { Radio, RadioGroup } from "@/registry/wuhan/composed/radio/radio";

export default function RadioCustomStyle() {
  return (
    <RadioGroup defaultValue="option1">
      <Radio
        value="option1"
        id="custom-1"
        classNames={{
          root: "h-5 w-5 border-2",
          label: "text-base font-semibold",
        }}
        styles={{
          wrapper: { padding: "8px" },
        }}
      >
        自定义样式 1
      </Radio>
      <Radio
        value="option2"
        id="custom-2"
        classNames={{
          wrapper: "bg-gray-50 p-3 rounded",
        }}
      >
        自定义样式 2
      </Radio>
    </RadioGroup>
  );
}
