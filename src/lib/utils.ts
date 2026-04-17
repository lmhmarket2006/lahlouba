import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDurationMinutes(words: number) {
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}
