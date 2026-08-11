import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  suffix = "",
  ...props
}) {
  const ref = useRef(null);
  const targetVal = Number(value) || 0;
  const motionValue = useMotionValue(direction === "down" ? targetVal : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    let timer = null;
    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : targetVal);
      }, delay * 1000);
    }
    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, [motionValue, isInView, delay, targetVal, direction, startValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
        ref.current.textContent = `${formatted}${suffix}`;
      }
    });
  }, [springValue, decimalPlaces, suffix]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block font-extrabold tracking-tight tabular-nums",
        className
      )}
      {...props}
    >
      {targetVal || startValue}{suffix}
    </span>
  );
}
