import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * Badge Variants
 *
 * Provides consistent badge/tag styling across the application
 * Enhanced with glassmorphism effects from Antigravity Google
 */
const badgeVariants = cva(
  // Base classes
  'inline-flex cursor-default items-center justify-center rounded-full font-semibold transition-all duration-200 hover:scale-105',
  {
    variants: {
      variant: {
        // Default - Neutral badge
        default: 'bg-theme-bg-tertiary text-theme-text-primary border-theme-border-medium border',

        // Primary - Brand color badge
        primary: 'bg-theme-brand-primary text-white',

        // Success - Green badge (completed, available, etc.)
        success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',

        // Warning - Yellow/Orange badge (pending, attention)
        warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',

        // Error/Danger - Red badge (error, unavailable, etc.)
        error: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',

        // Danger - Alias for error (for semantic clarity)
        danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',

        // Secondary - Muted badge for less prominent info
        secondary:
          'bg-theme-bg-secondary text-theme-text-secondary border-theme-border-light border',

        // Info - Blue badge (info, new, etc.)
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',

        // Outline - Border only
        outline: 'border-theme-brand-primary text-theme-brand-primary border-2 bg-transparent',

        // Ghost - Minimal badge
        ghost: 'text-theme-text-secondary hover:bg-theme-bg-tertiary',

        // Glassmorphism - Premium frosted glass effect (from Antigravity)
        glassmorphism:
          'border border-white/40 bg-white/60 text-gray-900 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/90',
      },
      size: {
        sm: 'gap-1 px-2 py-0.5 text-xs',
        md: 'gap-1.5 px-3 py-1 text-sm',
        lg: 'gap-2 px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * @example
 * // Status badges
 * <Badge variant="success">Disponibile</Badge>
 * <Badge variant="warning">In Preparazione</Badge>
 * <Badge variant="error">Esaurito</Badge>
 *
 * // Info badge
 * <Badge variant="info">Nuovo</Badge>
 *
 * // Size variants
 * <Badge size="sm">Piccolo</Badge>
 * <Badge size="lg">Grande</Badge>
 *
 * // Primary badge
 * <Badge variant="primary">In Evidenza</Badge>
 *
 * // Outline badge
 * <Badge variant="outline">Vegetariano</Badge>
 *
 * // Glassmorphism badge (premium frosted glass effect)
 * <Badge variant="glassmorphism">Premium</Badge>
 *
 * // With emoji icon
 * <Badge variant="glassmorphism">🌾 Gluten</Badge>
 * <Badge variant="success">🥗 Vegetarian</Badge>
 * <Badge variant="info">🔥 340 kcal</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
