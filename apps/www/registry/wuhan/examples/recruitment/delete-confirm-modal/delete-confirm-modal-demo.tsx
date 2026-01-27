"use client";

import React, { useState } from "react";
import { Button } from "antd";
import DeleteConfirmModal from "../../../recruitment/DeleteConfirmModal";

export default function DeleteConfirmModalDemo() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("确认删除");
    setOpen(false);
  };

  return (
    <>
      <Button danger onClick={() => setOpen(true)}>
        删除文档
      </Button>
      <DeleteConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
