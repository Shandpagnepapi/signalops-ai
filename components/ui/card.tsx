import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/12 bg-white/[0.065] text-card-foreground shadow-xl shadow-black/18 backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5 p-5 sm:p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-normal", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
}
