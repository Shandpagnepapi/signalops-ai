import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-2xl border border-white/12 bg-[#0B1024]/74 px-3 py-3 text-sm text-white placeholder:text-[#D7E2F7]/38 shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4DFF]/55 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
