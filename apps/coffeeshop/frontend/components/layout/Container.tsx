'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: ReactNode;
  /**
   * Maximum width constraint
   * - 'sm': max-w-screen-sm (640px)
   * - 'md': max-w-screen-md (768px)
   * - 'lg': max-w-screen-lg (1024px)
   * - 'xl': max-w-screen-xl (1280px) - Default
   * - '2xl': max-w-screen-2xl (1536px)
   * - 'full': w-full (no max-width)
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Additional CSS classes */
  className?: string;
  /** Padding on x-axis - responsive by default */
  padding?: 'none' | 'sm' | 'default' | 'lg';
  /** Center the container */
  centered?: boolean;
  /** HTML element to render */
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-2 sm:px-4',
  default: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-8 lg:px-12',
};

/**
 * Responsive container component with max-width constraints
 *
 * Usage:
 * ```tsx
 * <Container maxWidth="xl" padding="default">
 *   <YourContent />
 * </Container>
 * ```
 */
export function Container({
  children,
  maxWidth = 'xl',
  className,
  padding = 'default',
  centered = true,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Page container with responsive padding and proper spacing for bottom nav
 *
 * Usage:
 * ```tsx
 * <PageContainer hasBottomNav>
 *   <YourPageContent />
 * </PageContainer>
 * ```
 */
interface PageContainerProps extends ContainerProps {
  /** Add bottom padding for mobile bottom nav (default: true) */
  hasBottomNav?: boolean;
  /** Background color class */
  bgColor?: string;
}

export function PageContainer({
  children,
  hasBottomNav = true,
  bgColor = 'bg-theme-bg-secondary',
  className,
  ...props
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-screen',
        bgColor,
        // Bottom padding: more on mobile (for bottom nav), less on desktop (no bottom nav)
        hasBottomNav && 'pb-28 lg:pb-8',
        className
      )}
    >
      <Container {...props}>{children}</Container>
    </main>
  );
}
