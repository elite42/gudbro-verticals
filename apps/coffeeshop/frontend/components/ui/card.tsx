import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

/**
 * Card Variants
 *
 * Provides consistent card styling across the application
 */
const cardVariants = cva(
  // Base classes
  "rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        // Default - Basic card
        default:
          "bg-theme-bg-secondary border border-theme-border-light",

        // Elevated - Card with shadow (modals, dropdowns)
        elevated:
          "bg-theme-bg-elevated shadow-lg border border-theme-border-light",

        // Interactive - Clickable cards with hover effect
        interactive:
          "bg-theme-bg-secondary border border-theme-border-medium hover:shadow-md hover:border-theme-border-heavy cursor-pointer active:scale-[0.98]",

        // Selected - For selected state (payment methods, options)
        selected:
          "bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 shadow-md",

        // Ghost - Minimal card, just slight background
        ghost:
          "bg-theme-bg-tertiary border-none",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

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
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

// Sub-components for semantic markup
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold text-theme-text-primary", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-theme-text-secondary", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
