import type {
  ComponentPanelCategory,
  ComponentPanelOption,
} from "./component-panel-types";

/**
 * 从分类列表中提取所有选项
 * @param categories 分类列表
 * @returns 所有选项的数组
 * @public
 */
export function getAllOptions(
  categories: ComponentPanelCategory[],
): ComponentPanelOption[] {
  return categories.flatMap((category) => category.options);
}

/**
 * 根据值获取选项
 * @param categories 分类列表
 * @param value 选项值
 * @returns 对应的选项或 undefined
 * @public
 */
export function getOptionByValueFromCategory(
  categories: ComponentPanelCategory[],
  value: string,
): ComponentPanelOption | undefined {
  for (const category of categories) {
    const option = category.options.find((opt) => opt.value === value);
    if (option) return option;
  }
  return undefined;
}

/**
 * 根据值数组获取选项数组
 * @param categories 分类列表
 * @param values 选项值数组
 * @returns 对应的选项数组
 * @public
 */
export function getOptionsByValuesFromCategory(
  categories: ComponentPanelCategory[],
  values: string[],
): ComponentPanelOption[] {
  return values
    .map((value) => getOptionByValueFromCategory(categories, value))
    .filter((opt): opt is ComponentPanelOption => opt !== undefined);
}
