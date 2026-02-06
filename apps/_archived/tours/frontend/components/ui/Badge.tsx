'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════════════════
   BADGE COMPONENT

   Compact labels for categories, status, and metadata.
   Uses the tropical adventure color palette.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface BadgeProps {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  className,
  children,
}: BadgeProps) {
  const baseStyles = cn(
    'inline-flex items-center gap-1.5 font-medium',
    'rounded-full transition-colors'
  );

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-light text-primary',
    secondary: 'bg-secondary-light text-secondary',
    accent: 'bg-accent-light text-accent-foreground',
    success: 'bg-success-light text-success-foreground',
    warning: 'bg-warning-light text-warning-foreground',
    error: 'bg-error-light text-error-foreground',
    outline: 'bg-transparent border-2 border-current text-foreground-muted',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {icon && iconPosition === 'left' && <span className="-ml-0.5 flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="-mr-0.5 flex-shrink-0">{icon}</span>}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SPECIALIZED BADGES
   ───────────────────────────────────────────────────────────────────── */

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="success"
      size="sm"
      icon={
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      className={className}
    >
      Verified
    </Badge>
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: 'day_tour' | 'transport' | 'experience' | 'multi_day';
  className?: string;
}) {
  const config = {
    day_tour: { label: 'Day Tour', variant: 'primary' as const, icon: '🏍️' },
    transport: { label: 'Transport', variant: 'secondary' as const, icon: '🚗' },
    experience: { label: 'Experience', variant: 'accent' as const, icon: '🎨' },
    multi_day: { label: 'Multi-Day', variant: 'primary' as const, icon: '📅' },
  };

  const { label, variant, icon } = config[category];

  return (
    <Badge variant={variant} size="sm" icon={<span>{icon}</span>} className={className}>
      {label}
    </Badge>
  );
}

export function RatingBadge({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount: number;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <svg className="text-accent h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="text-foreground font-semibold">{rating.toFixed(1)}</span>
      <span className="text-foreground-muted">({reviewCount})</span>
    </span>
  );
}
