import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(135deg,#328BFF,#2563EB_46%,#6F4DFF)] text-primary-foreground shadow-lg shadow-blue-950/25 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-blue-950/30",
        secondary: "bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-[#dfe9ff]",
        outline: "border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/8",
        ghost: "text-[#D7E2F7] hover:bg-white/6 hover:text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-red-500"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-5 text-base sm:px-6",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
