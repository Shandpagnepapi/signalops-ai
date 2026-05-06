import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-blue-100",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-slate-200",
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
