import React, { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";
import { ShineBorder } from "./ShineBorder";

export function MagicCard({
  children,
  className,
  contentClassName,
  gradientSize = 260,
  gradientColor = "rgba(147, 213, 0, 0.07)",
  gradientFrom = "#93d500",
  gradientTo = "#6366f1",
  mode = "gradient",
  glowFrom = "#93d500",
  glowTo = "#0284c7",
  glowAngle = 90,
  glowSize = 400,
  glowBlur = 50,
  glowOpacity = 0.6,
  shine = false,
  shineColor = ["#93d500", "#6366f1", "#0284c7"],
  ...props
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const reset = useCallback(() => {
    if (mode === "orb") {
      orbVisible.set(0);
      return;
    }
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mode, gradientSize, mouseX, mouseY, orbVisible]);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      if (mode === "orb") {
        orbVisible.set(glowOpacity);
      }
    },
    [mouseX, mouseY, mode, orbVisible, glowOpacity]
  );

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 shadow-xs dark:shadow-none transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={() => {
        if (mode === "orb") orbVisible.set(glowOpacity);
      }}
      style={{
        background: useMotionTemplate`
          linear-gradient(var(--magic-card-bg, #ffffff) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--magic-card-border, rgba(228, 228, 231, 0.8)) 100%
          ) border-box
        `,
      }}
      {...props}
    >
      {shine && <ShineBorder borderWidth={1.5} shineColor={shineColor} duration={10} className="z-10" />}

      <div className="absolute inset-px z-10 rounded-[inherit] bg-white dark:bg-zinc-950" />

      {mode === "gradient" && (
        <motion.div
          className="pointer-events-none absolute inset-px z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
          }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-20"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
            willChange: "transform, opacity",
          }}
        />
      )}

      <div className={cn("relative z-30 flex flex-col justify-between h-full w-full", contentClassName)}>{children}</div>
    </motion.div>
  );
}
