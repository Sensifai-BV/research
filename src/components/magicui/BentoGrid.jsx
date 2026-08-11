import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

export function BentoGrid({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
  ...props
}) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6",
        "border border-zinc-200/80 shadow-xs transition-all duration-300 hover:shadow-md hover:border-zinc-300",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity">
        {background}
      </div>

      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-2">
        {Icon && <Icon className="h-10 w-10 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />}
        <h3 className="text-lg font-bold text-zinc-950 mt-2">{name}</h3>
        <p className="max-w-md text-xs text-zinc-500 leading-relaxed">{description}</p>
        {children}
      </div>

      {cta && href && (
        <div className="pointer-events-auto z-10 flex w-full items-center pt-4">
          <a
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {cta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      )}
    </div>
  );
}
