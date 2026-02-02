'use client';

/**
 * Dashboard Layout
 *
 * Protected layout with:
 * - Header with user info
 * - Bottom navigation
 * - Offline banner
 * - Main content area with bottom padding for nav
 */

import { useAuth } from '@/components/providers/AuthProvider';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { OfflineBanner } from '@/components/layout/OfflineBanner';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { RealtimeProvider } from '@/components/providers/RealtimeProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CircleNotch } from '@phosphor-icons/react';

// Map pathname to header title
const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/requests': 'Richieste',
  '/scan': 'Scan QR',
  '/orders': 'Ordini',
  '/tables': 'Tavoli',
  '/menu': 'Menu',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg-primary">
        <div className="text-center">
          <CircleNotch size={48} weight="bold" className="animate-spin text-theme-brand-primary mx-auto" />
          <p className="mt-4 text-theme-text-secondary">Caricamento...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  const title = pageTitles[pathname] || 'GudBro Waiter';

  return (
    <div className="min-h-screen bg-theme-bg-secondary">
      {/* Offline banner */}
      <OfflineBanner />

      {/* Header */}
      <Header title={title} />

      {/* Main content */}
      <main className="pb-20">
        <ErrorBoundary>
          <RealtimeProvider>
            {children}
          </RealtimeProvider>
        </ErrorBoundary>
      </main>

      {/* Bottom navigation */}
      <BottomNav requestCount={0} />
    </div>
  );
}
