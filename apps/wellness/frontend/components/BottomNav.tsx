'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Home',
      isActive: pathname === '/'
    },
    {
      href: '/services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: 'Servizi',
      isActive: pathname?.startsWith('/services')
    },
    {
      href: '/packages',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      label: 'Pacchetti',
      isActive: pathname?.startsWith('/packages'),
      isCenter: true
    },
    {
      href: '/promotions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      label: 'Promo',
      isActive: pathname === '/promotions'
    },
    {
      href: '/search',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: 'Search',
      isActive: pathname === '/search'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-end justify-around h-20 px-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              flex flex-col items-center justify-center flex-1
              ${item.isCenter ? 'relative -top-4' : 'pb-2'}
            `}
          >
            <div
              className={`
                flex flex-col items-center justify-center
                ${item.isCenter
                  ? 'w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform hover:scale-110 transition-all'
                  : `${item.isActive ? 'text-pink-600' : 'text-gray-600'} hover:text-pink-500 transition-colors`
                }
              `}
            >
              {item.icon}
              {!item.isCenter && (
                <span className={`text-xs mt-1 font-medium ${item.isActive ? 'text-pink-600' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              )}
              {item.isCenter && (
                <span className="text-xs font-semibold mt-0.5">{item.label}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
