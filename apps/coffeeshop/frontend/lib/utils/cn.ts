import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-blue-500")
 * cn("px-2", className) // Merge with external className
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
