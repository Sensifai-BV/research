import React from "react";
import { cn } from "../../lib/utils";

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 120,
  ...props
}) {
  return (
    <span
      style={{
        "--shiny-width": `${shimmerWidth}px`,
      }}
      className={cn(
        "inline-block bg-gradient-to-r from-transparent via-zinc-950 via-50% to-transparent bg-no-repeat bg-clip-text text-transparent animate-shiny-text font-bold",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
