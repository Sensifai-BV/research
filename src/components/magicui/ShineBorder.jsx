import React from "react";
import { cn } from "../../lib/utils";

export function ShineBorder({
  borderWidth = 1.5,
  duration = 14,
  shineColor = ["#6366f1", "#0284c7", "#ec4899"],
  className,
  style,
  children,
  ...props
}) {
  const colors = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

  return (
    <div
      style={{
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
        backgroundSize: "300% 300%",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "var(--border-width)",
        ...style,
      }}
      className={cn(
        "animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        className
      )}
      {...props}
    />
  );
}
