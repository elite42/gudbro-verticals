'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SelectionsSidebar } from './SelectionsSidebar';
import { ProductBottomSheet } from './ProductBottomSheet';
import { MoreMenuModal } from './MoreMenuModal';
import { selectionsStore } from '../lib/selections-store';
import { cartStore } from '../lib/cart-store';
import { DishItem, Extra } from './DishCard';

export function BottomNavLocal() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSelectionsSidebar, setShowSelectionsSidebar] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [selectionsCount, setSelectionsCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DishItem | null>(null);

  // Client-side flag
  useEffect(() => {
    setIsClient(true);
    setSelectionsCount(selectionsStore.getCount());
    setCartCount(cartStore.count());
  }, []);

  // Listen for selections changes
  useEffect(() => {
    const handleSelectionsUpdate = () => {
      setSelectionsCount(selectionsStore.getCount());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      return () => window.removeEventListener('selections-updated', handleSelectionsUpdate);
    }
  }, []);

  // Listen for cart changes
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartStore.count());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', handleCartUpdate);
      return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is near bottom of page (within 100px)
      const isNearBottom = windowHeight + currentScrollY >= documentHeight - 100;

      // Show nav when:
      // 1. Scrolling up
      // 2. At top of page (< 50px)
      // 3. Near bottom of page
      if (currentScrollY < lastScrollY || currentScrollY < 50 || isNearBottom) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down (but not near bottom)
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Navigation items: Home, Menu, More (central), Order, Account
  const navItems = [
    {
      href: '/',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Home',
      type: 'link' as const
    },
    {
      href: '/menu',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Menu',
      type: 'link' as const
    },
    {
      action: 'more',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      label: 'More',
      type: 'action' as const,
      isCenter: true
    },
    {
      action: 'selections',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'Order',
      type: 'action' as const,
      badge: selectionsCount
    },
    {
      href: '/account',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Account',
      type: 'link' as const
    }
  ];

  const isModalOpen = showSelectionsSidebar || showMoreMenu;

  return (
    <React.Fragment>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed bottom-0 left-0 right-0 w-full bg-theme-bg-elevated border-t-2 border-theme-bg-tertiary shadow-lg z-[9999] transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible && !isModalOpen ? 'translateY(0)' : 'translateY(100%)'
        }}
      >
        <div className="flex items-center justify-around h-20 px-2 max-w-screen-xl mx-auto">
          {navItems.map((item, index) => {
            const isLink = item.type === 'link';
            const isActive = isLink && 'href' in item && (
              pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href))
            );
            const isCenter = 'isCenter' in item && item.isCenter;

            // Center "More" button - special styling
            if (isCenter) {
              return (
                <button
                  key={index}
                  onClick={() => setShowMoreMenu(true)}
                  className="flex items-center justify-center flex-1 h-full"
                  aria-label="Open more options menu"
                >
                  <div className="flex flex-col items-center justify-center relative w-full h-full">
                    <div className="w-14 h-14 bg-theme-brand-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                </button>
              );
            }

            // Action buttons (Order)
            if (!isLink && 'action' in item) {
              const badge = 'badge' in item ? item.badge : undefined;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (item.action === 'selections') {
                      setShowSelectionsSidebar(true);
                    }
                  }}
                  className="flex items-center justify-center flex-1 h-full"
                  aria-label={badge && badge > 0 ? `View order list, ${badge} item${badge !== 1 ? 's' : ''} saved` : 'View order list'}
                >
                  <div className="flex flex-col items-center justify-center relative w-full h-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-theme-text-secondary hover:bg-theme-bg-tertiary relative">
                      <span aria-hidden="true">{item.icon}</span>
                      {typeof badge === 'number' && badge > 0 && (
                        <div
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {badge}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            }

            // Regular navigation links
            return (
              <Link
                key={index}
                href={'href' in item ? item.href : '/'}
                className="flex items-center justify-center flex-1 h-full"
                aria-label={`Go to ${item.label} page`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex flex-col items-center justify-center relative w-full h-full">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 relative ${
                      isActive
                        ? 'w-14 h-14 bg-theme-brand-primary text-white shadow-lg'
                        : 'w-12 h-12 text-theme-text-secondary hover:bg-theme-bg-tertiary'
                    }`}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More Menu Modal */}
      <MoreMenuModal
        isOpen={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
      />

      {/* Selections Sidebar */}
      <SelectionsSidebar
        isOpen={showSelectionsSidebar}
        onClose={() => setShowSelectionsSidebar(false)}
        onEditProduct={(dish) => setSelectedProduct(dish)}
      />

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          dish={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(dish: DishItem, quantity: number, extras: Extra[]) => {
            console.log('Updated product in cart');
          }}
        />
      )}
    </React.Fragment>
  );
}
