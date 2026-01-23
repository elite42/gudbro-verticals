'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';

/**
 * Staff PWA Layout
 *
 * Mobile-first layout for staff members with bottom navigation
 * Optimized for quick access to requests and table management
 */
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/staff');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { href: '/staff', label: 'Home', icon: '🏠', exact: true },
    { href: '/staff/requests', label: 'Richieste', icon: '🔔', exact: false },
    { href: '/staff/scan', label: 'Scan', icon: '📷', exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-900">
          ⚠️ Sei offline - Le modifiche saranno sincronizzate quando torni online
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">👨‍🍳</span>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs capitalize text-gray-400">{user.role}</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-gray-300 hover:bg-gray-700"
          >
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors ${
                isActive(item.href, item.exact)
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom bg-gray-900" />
      </nav>
    </div>
  );
}
