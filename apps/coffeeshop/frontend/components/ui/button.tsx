import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * Button Variants using Class Variance Authority (cva)
 *
 * Provides a consistent, type-safe way to manage button styles
 * Benefits:
 * - Single source of truth for all button styles
 * - TypeScript autocomplete for variants
 * - Easy to modify all buttons of a specific type
 */
const buttonVariants = cva(
  // Base classes - always applied
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary - Main CTA buttons (uses brand color)
        primary:
          'bg-theme-brand-primary hover:bg-theme-brand-primary-hover text-white shadow-lg active:scale-[0.98]',

        // Secondary - Less prominent actions
        secondary:
          'bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary border-theme-border-medium border-2 active:scale-[0.98]',

        // Danger - Destructive actions (delete, remove)
        danger:
          'bg-theme-interactive-danger hover:bg-theme-interactive-danger-hover text-white shadow-md active:scale-[0.98]',

        // Ghost - Minimal styling, subtle hover
        ghost: 'hover:bg-theme-bg-tertiary text-theme-text-primary',

        // Link - Looks like a text link
        link: 'text-theme-brand-primary hover:text-theme-brand-primary-hover underline-offset-4 hover:underline',

        // Outline - Bordered button
        outline:
          'border-theme-brand-primary text-theme-brand-primary hover:bg-theme-brand-primary border-2 hover:text-white active:scale-[0.98]',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm',
        md: 'h-11 px-5 py-3 text-base',
        lg: 'h-14 px-6 py-4 text-lg',
        xl: 'h-16 px-8 py-5 text-xl', // Extra large for hero CTAs
        icon: 'h-10 w-10', // For icon-only buttons
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button Component
 *
 * @example
 * // Primary button (default)
 * <Button>Click me</Button>
 *
 * // Secondary button
 * <Button variant="secondary">Cancel</Button>
 *
 * // Danger button with large size
 * <Button variant="danger" size="lg">Delete</Button>
 *
 * // Ghost button (minimal)
 * <Button variant="ghost">Close</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
