import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-gray-50/50',
        card: 'border-gray-200 bg-white shadow-sm',
        minimal: 'border-transparent bg-transparent',
      },
      size: {
        default: 'px-8 py-12',
        sm: 'px-6 py-8',
        lg: 'px-12 py-16',
        full: 'min-h-[400px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

/**
 * EmptyState component for displaying helpful messages when lists/tables are empty
 *
 * @example
 * <EmptyState
 *   icon={<Package className="h-12 w-12" />}
 *   title="No products yet"
 *   description="Add your first product to start building your menu"
 *   action={{ label: "Add Product", href: "/products/new" }}
 * />
 */
function EmptyState({
  className,
  variant,
  size,
  icon,
  title,
  description,
  action,
  secondaryAction,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ variant, size, className }))} {...props}>
      {/* Icon */}
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      {description && <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action &&
            (action.href ? (
              <Button asChild>
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button onClick={action.onClick}>{action.label}</Button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <Button variant="outline" asChild>
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states for common use cases
const EMPTY_STATE_PRESETS = {
  orders: {
    icon: '📋',
    title: 'No orders yet',
    description: 'Orders will appear here when customers place them through your digital menu.',
  },
  products: {
    icon: '📦',
    title: 'No products yet',
    description: 'Add your first product to start building your menu.',
    action: { label: 'Add Product', href: '/menu' },
  },
  qrCodes: {
    icon: '📱',
    title: 'No QR codes yet',
    description: 'Create your first QR code to share your digital menu with customers.',
    action: { label: 'Create QR Code', href: '/qr-codes/new' },
  },
  team: {
    icon: '👥',
    title: 'No team members yet',
    description: 'Invite team members to help manage your business.',
    action: { label: 'Invite Member', href: '/team/invite' },
  },
  analytics: {
    icon: '📊',
    title: 'No data yet',
    description: 'Analytics will appear here once customers start scanning your QR codes.',
  },
  search: {
    icon: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
  },
  events: {
    icon: '🎉',
    title: 'No events yet',
    description: 'Create events to promote special occasions at your venue.',
    action: { label: 'Create Event', href: '/marketing/events/new' },
  },
  feedback: {
    icon: '💬',
    title: 'No feedback yet',
    description: 'Customer feedback will appear here after they submit reviews.',
  },
} as const;

export { EmptyState, emptyStateVariants, EMPTY_STATE_PRESETS };
