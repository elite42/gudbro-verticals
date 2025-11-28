import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

/**
 * Input Variants
 *
 * Provides consistent input styling across the application
 */
const inputVariants = cva(
  // Base classes
  "w-full rounded-xl transition-all duration-200 outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Default - Standard input
        default:
          "bg-theme-bg-secondary border-2 border-theme-border-light text-theme-text-primary placeholder:text-theme-text-secondary focus:border-theme-brand-primary focus:ring-theme-brand-primary/20",

        // Error - Validation error state
        error:
          "bg-theme-bg-secondary border-2 border-red-500 text-theme-text-primary placeholder:text-theme-text-secondary focus:border-red-500 focus:ring-red-500/20",

        // Success - Validation success state
        success:
          "bg-theme-bg-secondary border-2 border-green-500 text-theme-text-primary placeholder:text-theme-text-secondary focus:border-green-500 focus:ring-green-500/20",

        // Ghost - Minimal input (for inline editing)
        ghost:
          "bg-transparent border-2 border-transparent text-theme-text-primary placeholder:text-theme-text-secondary hover:border-theme-border-light focus:border-theme-brand-primary focus:ring-theme-brand-primary/20",
      },
      inputSize: {
        sm: "px-3 py-2 text-sm h-9",
        md: "px-4 py-3 text-base h-11",
        lg: "px-5 py-4 text-lg h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: string
}

/**
 * Input Component
 *
 * @example
 * // Standard input
 * <Input placeholder="Enter your name" />
 *
 * // Input with error
 * <Input variant="error" error="Email is required" />
 *
 * // Input with success
 * <Input variant="success" />
 *
 * // Large input
 * <Input inputSize="lg" placeholder="Search..." />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            inputVariants({ variant: error ? "error" : variant, inputSize, className })
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

/**
 * Textarea Component
 *
 * @example
 * // Standard textarea
 * <Textarea placeholder="Enter your message" rows={4} />
 *
 * // Textarea with error
 * <Textarea variant="error" error="Message is required" />
 */
const textareaVariants = cva(
  "w-full rounded-xl transition-all duration-200 outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed resize-none",
  {
    variants: {
      variant: {
        default:
          "bg-theme-bg-secondary border-2 border-theme-border-light text-theme-text-primary placeholder:text-theme-text-secondary focus:border-theme-brand-primary focus:ring-theme-brand-primary/20",
        error:
          "bg-theme-bg-secondary border-2 border-red-500 text-theme-text-primary placeholder:text-theme-text-secondary focus:border-red-500 focus:ring-red-500/20",
        success:
          "bg-theme-bg-secondary border-2 border-green-500 text-theme-text-primary placeholder:text-theme-text-secondary focus:border-green-500 focus:ring-green-500/20",
      },
      textareaSize: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            textareaVariants({ variant: error ? "error" : variant, textareaSize, className })
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Input, Textarea, inputVariants, textareaVariants }
