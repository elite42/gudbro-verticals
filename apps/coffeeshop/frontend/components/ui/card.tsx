import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * Card Variants
 *
 * Provides consistent card styling across the application
 */
const cardVariants = cva(
  // Base classes
  'rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        // Default - Basic card
        default: 'bg-theme-bg-secondary border-theme-border-light border',

        // Elevated - Card with shadow (modals, dropdowns)
        elevated: 'bg-theme-bg-elevated border-theme-border-light border shadow-lg',

        // Interactive - Clickable cards with hover effect
        interactive:
          'bg-theme-bg-secondary border-theme-border-medium hover:border-theme-border-heavy cursor-pointer border hover:shadow-md active:scale-[0.98]',

        // Selected - For selected state (payment methods, options)
        selected: 'border-2 border-blue-500 bg-blue-50 shadow-md dark:bg-blue-950',

        // Ghost - Minimal card, just slight background
        ghost: 'bg-theme-bg-tertiary border-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8', // Extra large for hero sections
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

/**
 * Card Component
 *
 * @example
 * // Basic card
 * <Card>Content here</Card>
 *
 * // Elevated card (for modals)
 * <Card variant="elevated" padding="lg">Modal content</Card>
 *
 * // Interactive card (clickable)
 * <Card variant="interactive" onClick={handleClick}>
 *   Click me
 * </Card>
 *
 * // Selected state
 * <Card variant={isSelected ? "selected" : "interactive"}>
 *   Payment method
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ variant, padding, className }))} {...props} />
    );
  }
);
Card.displayName = 'Card';

// Sub-components for semantic markup
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-theme-text-primary text-2xl font-bold', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-theme-text-secondary text-sm', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
