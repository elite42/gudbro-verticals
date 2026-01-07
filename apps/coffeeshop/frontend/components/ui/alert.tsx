import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * Alert Variants
 *
 * Provides consistent alert/notification styling across the application
 */
const alertVariants = cva(
  // Base classes
  'relative w-full rounded-xl p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        // Default - Neutral information
        default:
          'bg-theme-bg-secondary border-theme-border-medium text-theme-text-primary border-2',

        // Info - Blue informational alert
        info: 'border-2 border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',

        // Success - Green success alert
        success:
          'border-2 border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',

        // Warning - Yellow/Orange warning alert
        warning:
          'border-2 border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',

        // Error/Danger - Red error alert
        error:
          'border-2 border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',

        // Danger - Alias for error (for semantic clarity)
        danger:
          'border-2 border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

/**
 * Alert Component
 *
 * @example
 * // Info alert
 * <Alert variant="info">
 *   <AlertTitle>Informazione</AlertTitle>
 *   <AlertDescription>Il tuo ordine è stato ricevuto.</AlertDescription>
 * </Alert>
 *
 * // Success alert
 * <Alert variant="success">
 *   <AlertTitle>Successo!</AlertTitle>
 *   <AlertDescription>Pagamento completato con successo.</AlertDescription>
 * </Alert>
 *
 * // Warning alert
 * <Alert variant="warning">
 *   <AlertTitle>Attenzione</AlertTitle>
 *   <AlertDescription>Alcuni piatti potrebbero richiedere più tempo.</AlertDescription>
 * </Alert>
 *
 * // Error alert
 * <Alert variant="error">
 *   <AlertTitle>Errore</AlertTitle>
 *   <AlertDescription>Si è verificato un errore durante l'elaborazione.</AlertDescription>
 * </Alert>
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);
Alert.displayName = 'Alert';

/**
 * Alert Title Component
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 text-base font-bold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description Component
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm opacity-90 [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
