import React from "react";
import { cn } from "../../lib/utils";

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 6,
  maxBlur = 12,
  className,
  ...props
}) {
  const isBottom = direction === "bottom";

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-20 h-16",
        isBottom ? "bottom-0 bg-gradient-to-t from-zinc-50 to-transparent" : "top-0 bg-gradient-to-b from-zinc-50 to-transparent",
        className
      )}
      {...props}
    />
  );
}
