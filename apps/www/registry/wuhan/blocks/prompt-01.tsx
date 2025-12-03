"use client";

import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";

export function Prompt() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="Type your message here." />
      <Button>Submit</Button>
    </div>
  );
}
