"use client";

import * as React from "react";
import { SelectCard } from "@/registry/wuhan/composed/select-card/select-card";

export default function SelectCardSingle() {
  const [selected, setSelected] = React.useState<string>("medium");

  const options = [
    { value: "small", label: "S 小" },
    { value: "medium", label: "M 中" },
    { value: "large", label: "L 大" },
    { value: "xlarge", label: "XL 超大" },
  ];

  return (
    <div
      className="w-full max-w-2xl"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "var(--gap-lg)",
      }}
    >
      {options.map((option) => (
        <SelectCard
          key={option.value}
          option={option}
          selected={selected === option.value}
          onClick={() => setSelected(option.value)}
        />
      ))}
    </div>
  );
}
