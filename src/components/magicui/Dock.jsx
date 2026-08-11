import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export function Dock({
  className,
  children,
  magnification = 60,
  distance = 140,
  ...props
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "supports-backdrop-blur:bg-white/20 mx-auto flex h-14 items-end gap-3 rounded-2xl border border-zinc-200/80 bg-white/70 px-4 pb-2.5 backdrop-blur-md shadow-sm w-fit",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            mouseX,
            magnification,
            distance,
          });
        }
        return child;
      })}
    </motion.div>
  );
}

export function DockIcon({
  size = 40,
  magnification = 60,
  distance = 140,
  mouseX,
  className,
  children,
  href,
  title,
  target = "_blank",
  ...props
}) {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        "relative flex items-center justify-center rounded-full border border-zinc-200/80 bg-white shadow-2xs transition-colors hover:border-[#93d500] hover:bg-zinc-50 group cursor-pointer",
        className
      )}
      {...props}
    >
      {children}

      {/* Tooltip on hover */}
      {title && (
        <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-950 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
          {title}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel="noreferrer" title={title}>
        {content}
      </a>
    );
  }

  return content;
}
