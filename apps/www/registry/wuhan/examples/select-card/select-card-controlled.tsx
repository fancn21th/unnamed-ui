"use client";

import * as React from "react";
import { SelectCard } from "@/registry/wuhan/composed/select-card/select-card";
import { Button } from "@/registry/wuhan/ui/button";
import { Plus, Minus, Star, Heart, Lightbulb, Zap } from "lucide-react";

export default function SelectCardControlled() {
  const options = [
    {
      value: "add",
      label: "添加",
      icon: <Plus className="w-6 h-6" />,
    },
    {
      value: "remove",
      label: "移除",
      icon: <Minus className="w-6 h-6" />,
    },
    {
      value: "favorite",
      label: "收藏",
      icon: <Star className="w-6 h-6" />,
    },
    {
      value: "like",
      label: "喜欢",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      value: "idea",
      label: "灵感",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      value: "power",
      label: "能量",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    "add",
    "favorite",
  ]);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "var(--gap-lg)",
        }}
      >
        {options.map((option) => (
          <SelectCard
            key={option.value}
            option={option}
            selected={selectedValues.includes(option.value)}
            onClick={() => handleToggle(option.value)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setSelectedValues([])}
          variant="outline"
          size="sm"
        >
          清空
        </Button>
        <Button
          onClick={() => setSelectedValues(options.map((o) => o.value))}
          variant="outline"
          size="sm"
        >
          全选
        </Button>
        <span className="text-sm text-[var(--text-secondary)] self-center">
          已选择: {selectedValues.length} 项
        </span>
      </div>
    </div>
  );
}
