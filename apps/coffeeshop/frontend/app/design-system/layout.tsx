'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const navigation = [
  {
    name: 'Overview',
    href: '/design-system',
    icon: '🏠',
  },
  {
    name: 'Brand',
    href: '/design-system/brand',
    icon: '🎨',
    description: 'Colors, Typography, Spacing',
  },
  {
    name: 'Components',
    href: '/design-system/components',
    icon: '🧩',
    description: 'UI Component Library',
  },
  {
    name: 'Safety System',
    href: '/design-system/safety',
    icon: '🛡️',
    description: 'Allergen & Diet Filters',
  },
  {
    name: 'Product Library',
    href: '/design-system/products',
    icon: '🍽️',
    description: 'Menu Items Database',
  },
  {
    name: 'Product Images',
    href: '/design-system/images',
    icon: '📸',
    description: 'Upload & Manage Photos',
  },
];

const adminTools = [
  {
    name: 'Tier Tester',
    href: '/admin/tier-tester',
    icon: '👑',
    description: 'Test SaaS Subscription Tiers',
  },
  {
    name: 'Savings Calculator',
    href: '/savings-calculator.html',
    icon: '💰',
    description: 'Calculate Annual Savings',
    external: true,
  },
];

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Force light mode colors for Design System */}
      <style jsx global>{`
        [class*="bg-theme-bg"] {
          background-color: white !important;
        }
        [class*="text-theme-text"] {
          color: #111827 !important; /* gray-900 */
        }
        [class*="border-theme-border"] {
          border-color: #e5e7eb !important; /* gray-200 */
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">GUDBRO Design System</h1>
                <p className="text-xs md:text-sm text-gray-500 mt-1 hidden sm:block">Internal Hub · Product Library · Brand Guidelines</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-xs md:text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <span className="hidden sm:inline">←</span>
              <span className="hidden md:inline">Back to App</span>
              <span className="md:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky top-[73px] left-0 z-40 lg:z-10",
          "w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)]",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 text-gray-900",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            {/* Design System Navigation */}
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#cd0931]/10 text-[#cd0931] font-medium border-l-4 border-[#cd0931]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-0.5 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Admin Tools Section */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="px-4 pb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Admin Tools
                </span>
              </div>
              {adminTools.map((item) => {
                const isActive = pathname === item.href;
                const isExternal = (item as any).external;

                const linkContent = (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-0.5 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                );

                const linkClasses = cn(
                  'block px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-purple-100 text-purple-700 font-medium border-l-4 border-purple-600'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                );

                if (isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsSidebarOpen(false)}
                      className={linkClasses}
                    >
                      {linkContent}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={linkClasses}
                  >
                    {linkContent}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500">
              <div className="font-medium text-gray-700 mb-1">Version</div>
              <div>Design System v1.0</div>
              <div className="mt-2">Updated: Nov 23, 2025</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
