import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures that Select Items always have non-empty values
 * @param value The value to check
 * @param fallback The fallback value to use if value is empty
 * @returns A non-empty value
 */
export function ensureNonEmptyValue(value: string | null | undefined, fallback = "unassigned"): string {
  return value === "" || value === null || value === undefined ? fallback : value
}
