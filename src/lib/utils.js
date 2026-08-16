import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getTagSlug(tag) {
  if (!tag) return '';
  return encodeURIComponent(tag.toLowerCase().trim().replace(/\s+/g, '-'));
}

