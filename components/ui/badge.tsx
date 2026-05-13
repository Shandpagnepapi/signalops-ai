import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-xl border px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#328BFF]/24 bg-primary/15 text-[#D7E8FF]",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-white/14 bg-white/[0.035] text-[#D7E2F7]",
        success: "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
        warning: "border-amber-300/25 bg-amber-400/12 text-amber-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
