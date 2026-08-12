import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'default', className, ...props }) {
  const baseStyles = 'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-tight transition-colors focus:outline-none max-w-full whitespace-normal text-left';

  const variants = {
    default: 'border-zinc-950 dark:border-zinc-50 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-2xs dark:shadow-none',
    secondary: 'border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200/80',
    outline: 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300',
    indigo: 'border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300',
    published: 'border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
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
