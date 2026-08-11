import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SparklesText({
  text,
  sparklesCount = 6,
  colors = { first: "#93d500", second: "#6366f1" },
  className,
  ...props
}) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      return Array.from({ length: sparklesCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 10,
        color: i % 2 === 0 ? colors.first : colors.second,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2, // Slow show as requested
      }));
    };
    setSparkles(generateSparkles());
  }, [sparklesCount, colors.first, colors.second]);

  return (
    <span className={cn("relative inline-block font-extrabold", className)} {...props}>
      {sparkles.map((sparkle) => (
        <motion.svg
          key={sparkle.id}
          className="pointer-events-none absolute z-20"
          style={{
            top: `${sparkle.y}%`,
            left: `${sparkle.x}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
          viewBox="0 0 160 160"
          fill="none"
        >
          <path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={sparkle.color}
          />
        </motion.svg>
      ))}
      <span className="relative z-10">{text}</span>
    </span>
  );
}
