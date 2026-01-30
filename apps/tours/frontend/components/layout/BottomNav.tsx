'use client';

import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════════════════
   BOTTOM NAVIGATION

   Fixed bottom tab bar with centered bento menu.
   5 elements: Home, Map, Bento Menu, Saved, Profile
   Icons only (no labels) - larger icons with scale effect on selection
   ═══════════════════════════════════════════════════════════════════════════ */

interface BottomNavProps {
  activeTab: 'home' | 'map' | 'deals' | 'profile';
  onTabChange: (tab: 'home' | 'map' | 'deals' | 'profile') => void;
  onMenuClick?: () => void;
  isDark?: boolean;
}

export function BottomNav({ activeTab, onTabChange, onMenuClick, isDark = false }: BottomNavProps) {
  return (
    <nav
      className={cn(
        'pb-safe-bottom fixed bottom-0 left-0 right-0 z-50',
        isDark
          ? 'border-t border-white/5 bg-gray-900/95 backdrop-blur-xl'
          : 'border-t border-gray-100 bg-white/95 backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-4">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            'transition-all duration-200',
            activeTab === 'home'
              ? 'text-accent scale-110'
              : isDark
                ? 'text-gray-500 hover:text-gray-400'
                : 'text-gray-400 hover:text-gray-500'
          )}
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill={activeTab === 'home' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={activeTab === 'home' ? 0 : 1.5}
          >
            {activeTab === 'home' ? (
              <>
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.03-.028.061-.056.091-.086L12 5.43z" />
              </>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            )}
          </svg>
        </button>

        {/* Map */}
        <button
          onClick={() => onTabChange('map')}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            'transition-all duration-200',
            activeTab === 'map'
              ? 'text-accent scale-110'
              : isDark
                ? 'text-gray-500 hover:text-gray-400'
                : 'text-gray-400 hover:text-gray-500'
          )}
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill={activeTab === 'map' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={activeTab === 'map' ? 0 : 1.5}
          >
            {activeTab === 'map' ? (
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </>
            )}
          </svg>
        </button>

        {/* Center Bento Menu */}
        <button
          onClick={onMenuClick}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            'transition-all duration-200',
            'hover:scale-105 active:scale-95',
            isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'
          )}
        >
          {/* Bento grid icon - 9 dots */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={cn('h-1.5 w-1.5 rounded-full', isDark ? 'bg-gray-500' : 'bg-gray-400')}
              />
            ))}
          </div>
        </button>

        {/* Deals/Promozioni - Gift icon */}
        <button
          onClick={() => onTabChange('deals')}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            'transition-all duration-200',
            activeTab === 'deals'
              ? 'text-accent scale-110'
              : isDark
                ? 'text-gray-500 hover:text-gray-400'
                : 'text-gray-400 hover:text-gray-500'
          )}
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill={activeTab === 'deals' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={activeTab === 'deals' ? 0 : 1.5}
          >
            {activeTab === 'deals' ? (
              <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.193c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6a2.25 2.25 0 002.25-2.25v-6.75h-8.25z" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            )}
          </svg>
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            'transition-all duration-200',
            activeTab === 'profile'
              ? 'text-accent scale-110'
              : isDark
                ? 'text-gray-500 hover:text-gray-400'
                : 'text-gray-400 hover:text-gray-500'
          )}
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill={activeTab === 'profile' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={activeTab === 'profile' ? 0 : 1.5}
          >
            {activeTab === 'profile' ? (
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
