'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PaymentMethodModal } from './PaymentMethodModal';
import { CallStaffModal } from './CallStaffModal';
import { SelectionsSidebar } from './SelectionsSidebar';
import { ProductBottomSheet } from './ProductBottomSheet';
import { selectionsStore } from '../lib/selections-store';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { DishItem, Extra } from './DishCard';

export function BottomNavLocal() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCallStaffModal, setShowCallStaffModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSelectionsSidebar, setShowSelectionsSidebar] = useState(false);
  const [selectionsCount, setSelectionsCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DishItem | null>(null);

  // Client-side flag
  useEffect(() => {
    setIsClient(true);
    setSelectionsCount(selectionsStore.getCount());
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

  // Build nav items dynamically based on feature flags
  const allNavItems = [
    {
      href: '/',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Home',
      enabled: true
    },
    {
      href: '/offers',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      label: 'Offers',
      enabled: true
    },
    {
      href: '/menu',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Menu',
      enabled: true
    },
    {
      action: 'staff',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      label: 'Staff',
      enabled: true
    },
    {
      action: 'selections',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      label: 'List',
      enabled: true
    }
  ];

  // Filter nav items based on feature flags
  const navItems = allNavItems.filter(item => item.enabled);

  return (
    <React.Fragment>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed bottom-0 left-0 right-0 w-full bg-theme-bg-elevated border-t-2 border-theme-bg-tertiary shadow-lg z-[9999] transition-transform duration-300 ease-in-out"
        style={{
          transform: isVisible && !showCallStaffModal && !showPaymentModal && !showSelectionsSidebar ? 'translateY(0)' : 'translateY(100%)'
        }}
      >
        <div className="flex items-center justify-around h-20 px-4 max-w-screen-xl mx-auto">
          {navItems.map((item, index) => {
            // Check if this is a modal action or navigation link
            const isModalAction = 'action' in item;
            const itemHref = 'href' in item ? item.href : undefined;
            const isActive = !isModalAction && itemHref && (pathname === itemHref ||
              (itemHref !== '/' && pathname?.startsWith(itemHref)));

            // For Staff action button (opens modal)
            if (isModalAction && item.action === 'staff') {
              return (
                <button
                  key={index}
                  onClick={() => setShowCallStaffModal(true)}
                  className="flex items-center justify-center flex-1 h-full"
                  aria-label="Call staff for assistance"
                >
                  <div className="flex flex-col items-center justify-center relative w-full h-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-theme-text-secondary hover:bg-theme-bg-tertiary">
                      <span aria-hidden="true">{item.icon}</span>
                    </div>
                  </div>
                </button>
              );
            }

            // For Selections action button (opens sidebar)
            if (isModalAction && item.action === 'selections') {
              return (
                <button
                  key={index}
                  onClick={() => setShowSelectionsSidebar(true)}
                  className="flex items-center justify-center flex-1 h-full"
                  aria-label={selectionsCount > 0 ? `View selections list, ${selectionsCount} item${selectionsCount !== 1 ? 's' : ''} saved` : 'View selections list'}
                >
                  <div className="flex flex-col items-center justify-center relative w-full h-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 text-theme-text-secondary hover:bg-theme-bg-tertiary relative">
                      <span aria-hidden="true">{item.icon}</span>
                      {selectionsCount > 0 && (
                        <div
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {selectionsCount}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            }

            // For regular navigation links
            return (
              <Link
                key={index}
                href={itemHref || '/'}
                className="flex items-center justify-center flex-1 h-full"
                aria-label={`Go to ${item.label} page`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex flex-col items-center justify-center relative w-full h-full">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-14 h-14 bg-theme-brand-primary text-white shadow-lg'
                        : 'w-12 h-12 text-theme-text-secondary'
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

      {/* Call Staff Modal */}
      <CallStaffModal
        isOpen={showCallStaffModal}
        onClose={() => setShowCallStaffModal(false)}
        onConfirm={(reason, quickOption) => {
          console.log('Staff call reason:', reason, 'Quick option:', quickOption);
          // TODO: Send staff call request to backend
        }}
      />

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={(method) => {
          console.log('Payment method selected:', method);
          // TODO: Send payment request to backend
        }}
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
            console.log('⚠️ Cart is disabled for TIER 1');
          }}
        />
      )}
    </React.Fragment>
  );
}
