"use client";

import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";

// block / prompt-01
export function Prompt() {
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md">
      <Textarea
        placeholder="Type your message here."
        className="border-0 resize-none"
      />
      <Button className="self-end">Submit</Button>
    </div>
  );
}
