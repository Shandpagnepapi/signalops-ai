import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/12 bg-[#17122d]/74 px-3 py-2 text-sm text-white placeholder:text-[#ead0df]/38 shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb36d]/55 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
