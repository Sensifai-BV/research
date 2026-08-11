import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md';

  const variants = {
    default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 shadow-sm',
    outline: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 shadow-2xs',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
    link: 'text-zinc-900 underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8 text-base',
    icon: 'h-9 w-9'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
}
