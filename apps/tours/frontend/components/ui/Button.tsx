'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════════════════════════
   BUTTON COMPONENT

   A polymorphic button with multiple variants designed for the Tours vertical.
   Supports adventure-themed styling with smooth animations.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const baseStyles = cn(
      // Base
      'relative inline-flex items-center justify-center gap-2',
      'font-semibold transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'active:scale-[0.98]',
      // Full width
      fullWidth && 'w-full'
    )

    const variantStyles = {
      primary: cn(
        'bg-gradient-to-r from-primary to-[hsl(24,85%,55%)]',
        'text-white rounded-xl',
        'shadow-lg shadow-orange-500/25',
        'hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02]',
        'focus-visible:ring-primary'
      ),
      secondary: cn(
        'bg-secondary text-white rounded-xl',
        'shadow-md shadow-green-900/20',
        'hover:bg-secondary-hover hover:shadow-lg',
        'focus-visible:ring-secondary'
      ),
      ghost: cn(
        'text-foreground-muted rounded-lg',
        'hover:bg-black/5 hover:text-foreground',
        'focus-visible:ring-foreground-muted'
      ),
      outline: cn(
        'border-2 border-border rounded-xl',
        'text-foreground bg-transparent',
        'hover:border-primary hover:text-primary',
        'focus-visible:ring-primary'
      ),
      danger: cn(
        'bg-error text-white rounded-xl',
        'shadow-md shadow-red-500/20',
        'hover:bg-red-600 hover:shadow-lg',
        'focus-visible:ring-error'
      ),
    }

    const sizeStyles = {
      sm: 'text-sm px-3 py-2 min-h-[36px]',
      md: 'text-base px-5 py-2.5 min-h-[44px]',
      lg: 'text-lg px-6 py-3 min-h-[52px]',
      xl: 'text-xl px-8 py-4 min-h-[60px]',
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="absolute animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Content */}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            loading && 'invisible'
          )}
        >
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>

        {/* Shine effect overlay for primary */}
        {variant === 'primary' && (
          <span
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button }
