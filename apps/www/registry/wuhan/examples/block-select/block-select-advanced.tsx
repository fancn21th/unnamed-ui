import {
  BlockSelect,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectItem,
} from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectAdvanced() {
  return (
    <BlockSelect placeholder="选择选项">
      <SelectGroup>
        <SelectLabel>水果</SelectLabel>
        <SelectItem value="apple">苹果</SelectItem>
        <SelectItem value="banana">香蕉</SelectItem>
        <SelectItem value="orange">橙子</SelectItem>
      </SelectGroup>

      <SelectSeparator />

      <SelectGroup>
        <SelectLabel>蔬菜</SelectLabel>
        <SelectItem value="carrot">胡萝卜</SelectItem>
        <SelectItem value="potato">土豆</SelectItem>
        <SelectItem value="tomato">西红柿</SelectItem>
      </SelectGroup>
    </BlockSelect>
  );
}
