import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'default', className, ...props }) {
  const baseStyles = 'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-tight transition-colors focus:outline-none shrink-0';

  const variants = {
    default: 'border-zinc-950 bg-zinc-950 text-white shadow-2xs',
    secondary: 'border-zinc-200 bg-zinc-100 text-zinc-800 hover:bg-zinc-200/80',
    outline: 'border-zinc-200 bg-white text-zinc-700',
    indigo: 'border-indigo-200/80 bg-indigo-50 text-indigo-700',
    published: 'border-emerald-200/80 bg-emerald-50 text-emerald-800 font-semibold'
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
