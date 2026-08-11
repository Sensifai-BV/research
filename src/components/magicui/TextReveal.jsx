import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function TextReveal({
  text = "Research, to reality.",
  className,
  delay = 0.2,
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.h2
      className={cn(
        "inline-flex flex-wrap gap-x-3 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight",
        className
      )}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block bg-gradient-to-r from-[#93d500] via-indigo-600 to-sky-600 bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
