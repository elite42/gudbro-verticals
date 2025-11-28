import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export interface SpicyLevelProps {
  level: 0 | 1 | 2 | 3 | 4 | 5
  variant?: 'chili' | 'flame'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * SpicyLevel Component
 *
 * Displays a visual indicator of spiciness level using chili peppers or flames.
 *
 * @example
 * <SpicyLevel level={3} variant="chili" />
 * <SpicyLevel level={5} variant="flame" size="lg" />
 * <SpicyLevel level={0} /> // Shows "Not Spicy"
 */
export function SpicyLevel({
  level,
  variant = 'chili',
  size = 'md',
  className,
}: SpicyLevelProps) {
  const icon = variant === 'chili' ? '🌶️' : '🔥'

  const sizeClasses = {
    sm: 'text-xs gap-0.5',
    md: 'text-sm gap-1',
    lg: 'text-base gap-1.5',
  }

  // If level is 0, show "Not Spicy" indicator
  if (level === 0) {
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium text-gray-500 dark:text-gray-400',
          sizeClasses[size],
          className
        )}
        aria-label="Not spicy"
      >
        <span className="opacity-50">🌶️</span>
        <span className="text-xs">Not Spicy</span>
      </span>
    )
  }

  // Render filled and unfilled icons for levels 1-5
  const filledIcons = Array(level).fill(icon)
  const unfilledIcons = Array(5 - level).fill(icon)

  return (
    <span
      className={cn(
        'inline-flex items-center',
        sizeClasses[size],
        className
      )}
      aria-label={`Spicy level ${level} out of 5`}
      title={`Spicy level ${level} out of 5`}
    >
      {/* Filled icons */}
      {filledIcons.map((_, index) => (
        <span key={`filled-${index}`} className="text-red-500 dark:text-red-400">
          {icon}
        </span>
      ))}

      {/* Unfilled icons (grayed out) */}
      {unfilledIcons.map((_, index) => (
        <span key={`unfilled-${index}`} className="opacity-20 text-gray-400 dark:text-gray-600">
          {icon}
        </span>
      ))}
    </span>
  )
}
