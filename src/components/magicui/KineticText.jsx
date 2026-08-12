import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function KineticText({
  text = "Research",
  className,
}) {
  const characters = Array.from(text);

  return (
    <span className={cn("inline-flex tracking-[-5%] [font-optical-sizing:auto] text-zinc-950 dark:text-zinc-50 cursor-default select-none", className)}>
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          className="inline-block font-extrabold text-zinc-950 dark:text-zinc-50 transition-all duration-300"
          initial={{ fontWeight: 800 }}
          whileHover={{
            fontWeight: 900,
            scale: 1.05,
            y: -2,
            transition: { duration: 0.15, ease: "easeOut" },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
