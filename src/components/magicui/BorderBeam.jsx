import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function BorderBeam({
  className,
  size = 120,
  delay = 0,
  duration = 6,
  colorFrom = "#6366f1",
  colorTo = "#ec4899",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
      style={{
        borderWidth: `${borderWidth}px`,
        maskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square rounded-full blur-[1px]",
          className
        )}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
}
