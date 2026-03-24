"use client";

import * as React from "react";
import {
  DynamicForm,
  type FormSchema,
  type CustomFieldComponentProps,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { cn } from "@/lib/utils";

/**
 * 复杂自定义组件示例：地址选择器
 * 包含省份和城市两个输入框
 * 展示如何在一个自定义组件中管理多个输入字段
 */
interface AddressValue {
  province?: string;
  city?: string;
}

function AddressSelector({
  value,
  onChange,
  disabled,
  error,
}: CustomFieldComponentProps) {
  const addressValue = (value as AddressValue) || {};

  // 省份和城市数据
  const provinces = [
    { name: "广东省", cities: ["广州市", "深圳市", "珠海市", "东莞市"] },
    { name: "浙江省", cities: ["杭州市", "宁波市", "温州市", "绍兴市"] },
    { name: "江苏省", cities: ["南京市", "苏州市", "无锡市", "常州市"] },
    { name: "上海市", cities: ["黄浦区", "徐汇区", "长宁区", "静安区"] },
    { name: "北京市", cities: ["东城区", "西城区", "朝阳区", "海淀区"] },
  ];

  const [selectedProvince, setSelectedProvince] = React.useState<string>(
    addressValue.province || "",
  );
  const [selectedCity, setSelectedCity] = React.useState<string>(
    addressValue.city || "",
  );

  // 当省份或城市改变时，更新表单值
  React.useEffect(() => {
    onChange({
      province: selectedProvince,
      city: selectedCity,
    });
  }, [selectedProvince, selectedCity, onChange]);

  // 当省份改变时，重置城市
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity("");
  };

  const currentProvince = provinces.find((p) => p.name === selectedProvince);
  const cities = currentProvince ? currentProvince.cities : [];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* 省份选择 */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">省份</label>
          <select
            value={selectedProvince}
            onChange={(e) => handleProvinceChange(e.target.value)}
            disabled={disabled}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
            )}
          >
            <option value="">请选择省份</option>
            {provinces.map((province) => (
              <option key={province.name} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* 城市选择 */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">城市</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={disabled || !selectedProvince}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
            )}
          >
            <option value="">请选择城市</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 显示当前选择 */}
      {selectedProvince && selectedCity && (
        <div className="text-sm text-muted-foreground">
          已选择：{selectedProvince} / {selectedCity}
        </div>
      )}
    </div>
  );
}

/**
 * 自定义价格范围输入组件
 * 包含最小值和最大值两个数字输入框
 */
interface PriceRangeValue {
  min?: number;
  max?: number;
}

function PriceRangeInput({
  value,
  onChange,
  disabled,
  error,
  field: _field,
}: CustomFieldComponentProps) {
  const rangeValue = (value as PriceRangeValue) || {};
  const [minValue, setMinValue] = React.useState<number | "">(
    rangeValue.min ?? "",
  );
  const [maxValue, setMaxValue] = React.useState<number | "">(
    rangeValue.max ?? "",
  );

  // 当 min 或 max 改变时，更新表单值
  React.useEffect(() => {
    onChange({
      min: minValue === "" ? undefined : minValue,
      max: maxValue === "" ? undefined : maxValue,
    });
  }, [minValue, maxValue, onChange]);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">最小值</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ¥
            </span>
            <input
              type="number"
              value={minValue}
              onChange={(e) =>
                setMinValue(e.target.value === "" ? "" : Number(e.target.value))
              }
              disabled={disabled}
              placeholder="0"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent pl-7 pr-3 py-1 text-sm shadow-sm transition-colors",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-destructive",
              )}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">最大值</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ¥
            </span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) =>
                setMaxValue(e.target.value === "" ? "" : Number(e.target.value))
              }
              disabled={disabled}
              placeholder="不限"
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent pl-7 pr-3 py-1 text-sm shadow-sm transition-colors",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-destructive",
              )}
            />
          </div>
        </div>
      </div>

      {/* 验证提示 */}
      {minValue !== "" && maxValue !== "" && minValue > maxValue && (
        <p className="text-sm text-destructive">最小值不能大于最大值</p>
      )}

      {/* 显示当前范围 */}
      {(minValue !== "" || maxValue !== "") && (
        <div className="text-sm text-muted-foreground">
          价格范围：
          {minValue !== "" ? `¥${minValue}` : "不限"} -{" "}
          {maxValue !== "" ? `¥${maxValue}` : "不限"}
        </div>
      )}
    </div>
  );
}

/**
 * 自定义颜色选择器组件
 * 必须实现 value 和 onChange 属性
 */
function ColorPicker({
  value,
  onChange,
  disabled,
  error,
}: CustomFieldComponentProps) {
  const colors = [
    { name: "红色", value: "#ef4444" },
    { name: "橙色", value: "#f97316" },
    { name: "黄色", value: "#eab308" },
    { name: "绿色", value: "#22c55e" },
    { name: "蓝色", value: "#3b82f6" },
    { name: "紫色", value: "#a855f7" },
    { name: "粉色", value: "#ec4899" },
    { name: "灰色", value: "#6b7280" },
  ];

  const currentValue = value as string | undefined;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(color.value)}
            className={cn(
              "h-12 rounded-md border-2 transition-all hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              currentValue === color.value
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-transparent",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-destructive",
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      {currentValue && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div
            className="h-4 w-4 rounded border"
            style={{ backgroundColor: currentValue }}
          />
          <span>{currentValue}</span>
        </div>
      )}
    </div>
  );
}

const schema: FormSchema = {
  title: "商品信息表单",
  description: "展示多个自定义组件的使用",
  fields: [
    {
      name: "productName",
      label: "商品名称",
      type: "input",
      required: true,
      placeholder: "请输入商品名称",
    },
    {
      name: "address",
      label: "发货地址",
      type: "input", // type 可以是任意值，因为使用了 component
      required: true,
      component: AddressSelector,
      description: "选择省份和城市（两个输入框组成的自定义组件）",
      defaultValue: {},
    },
    {
      name: "priceRange",
      label: "价格范围",
      type: "input",
      component: PriceRangeInput,
      description: "设置商品的价格区间（包含最小值和最大值）",
      defaultValue: {},
    },
    {
      name: "color",
      label: "主题颜色",
      type: "input",
      component: ColorPicker,
      description: "选择商品的主题颜色",
    },
    {
      name: "category",
      label: "商品分类",
      type: "select",
      required: true,
      options: [
        { value: "electronics", label: "电子产品" },
        { value: "clothing", label: "服装" },
        { value: "food", label: "食品" },
        { value: "books", label: "图书" },
      ],
    },
    {
      name: "description",
      label: "商品描述",
      type: "textarea",
      placeholder: "请输入商品描述...",
    },
  ],
};

export default function DynamicFormCustomComponent() {
  return (
    <DynamicForm
      schema={schema}
      onFinish={(values) => {
        console.log("提交的数据:", values);
        alert(JSON.stringify(values, null, 2));
      }}
    />
  );
}
