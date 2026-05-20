// ============================================================================
// CN UTILITY - Tailwind CSS class name utility
// ============================================================================

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx — resolves conflicts safely.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
