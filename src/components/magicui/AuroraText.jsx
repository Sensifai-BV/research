import React, { memo } from "react";
import { cn } from "../../lib/utils";

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#4f46e5", "#0284c7", "#ec4899", "#6366f1"],
    speed = 1,
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={cn("relative inline-block", className)}>
        <span className="sr-only">{children}</span>
        <span
          className="animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
