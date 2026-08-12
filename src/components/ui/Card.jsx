import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ className, ...props }) {
  return (
    <div
      className={twMerge(
        clsx('rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-2xs dark:shadow-none transition-all hover:border-zinc-300 dark:hover:border-zinc-700', className)
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={twMerge(clsx('flex flex-col space-y-1.5 p-6', className))}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={twMerge(
        clsx('text-xl font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-100', className)
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={twMerge(clsx('text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2', className))}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={twMerge(clsx('p-6 pt-0', className))} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={twMerge(clsx('flex items-center p-6 pt-0', className))}
      {...props}
    />
  );
}
