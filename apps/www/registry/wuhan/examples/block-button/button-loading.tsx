"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import { useState } from "react";

export default function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="solid"
        color="primary"
        loading={loading}
        onClick={handleClick}
      >
        {loading ? "加载中..." : "点击加载"}
      </Button>
    </div>
  );
}
