'use client';

/**
 * ConnectedHomePage
 *
 * Collega HomePage v2 ai servizi v1 (cart-store, loyalty-service, engagement-store)
 * e applica la logica tier-aware.
 */

import { useState, useEffect, useCallback } from 'react';
import { HomePage } from '../HomePage';
import { ProductBottomSheet } from '../ProductBottomSheet';
import { cartStore } from '@/lib/cart-store';
import { favoritesStore } from '@/lib/favorites-store';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { useTierFeature } from '@/lib/hooks/useTierFeature';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  prepTime?: number;
}

interface ConnectedHomePageProps {
  /** Popular menu items */
  popularItems: MenuItem[];
  /** New menu items */
  newItems: MenuItem[];
  /** Opening hours */
  openingHours?: {
    today: string;
    isOpen: boolean;
  };
  /** Hero image URL */
  heroImage?: string;
  /** Theme state */
  isDark: boolean;
  onThemeToggle: () => void;
  /** Navigation for demo mode */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

/**
 * Format price in VND
 */
function formatPrice(price: number): string {
  if (price >= 1000) {
    return `${Math.round(price / 1000)}K`;
  }
  return `${price}`;
}

export function ConnectedHomePage({
  popularItems,
  newItems,
  openingHours,
  heroImage,
  isDark,
  onThemeToggle,
  activePage,
  onNavigate,
}: ConnectedHomePageProps) {
  // State
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  // Tier checks
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');
  const { isEnabled: engagementEnabled } = useTierFeature('enableEngagementSystem');

  // Sync cart count from store
  useEffect(() => {
    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();

    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  // Sync favorites from store
  useEffect(() => {
    const updateFavorites = () => setFavorites(favoritesStore.get().favoriteIds);
    updateFavorites();

    window.addEventListener('favorites-updated', updateFavorites);
    return () => window.removeEventListener('favorites-updated', updateFavorites);
  }, []);

  // Load check-in status (simulated - in production from loyalty-service)
  useEffect(() => {
    // In production, this would fetch from loyalty-service
    const checkedIn = localStorage.getItem('roots-checkin-today') === 'true';
    setIsCheckedIn(checkedIn);

    // Simulated points
    const points = parseInt(localStorage.getItem('roots-loyalty-points') || '0', 10);
    setUserPoints(points);
  }, []);

  // Handlers
  const handleProductClick = useCallback((product: MenuItem) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleCheckIn = useCallback(() => {
    if (!engagementEnabled) return;

    // Simulated check-in - in production, call engagement-store or API
    setIsCheckedIn(true);
    setUserPoints((prev) => prev + 5);
    localStorage.setItem('roots-checkin-today', 'true');
    localStorage.setItem('roots-loyalty-points', String(userPoints + 5));
  }, [engagementEnabled, userPoints]);

  const handleAddToCartFromSheet = useCallback(
    (
      productId: string,
      quantity: number,
      extras: { id: string; name: string; price: number }[]
    ) => {
      if (!selectedProduct || !cartEnabled) return;

      // Convert v2 extras to v1 format (add 'type' field required by cart-store)
      const cartExtras = extras.map((e) => ({
        ...e,
        type: 'addon' as const,
      }));

      cartStore.add(
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          image: selectedProduct.image,
          isVegan: selectedProduct.isVegan,
        } as any,
        quantity,
        cartExtras
      );

      setSelectedProduct(null);
    },
    [selectedProduct, cartEnabled]
  );

  return (
    <>
      <HomePage
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        tagline={coffeeshopConfig.business.tagline}
        heroImage={heroImage}
        popularItems={popularItems}
        newItems={newItems}
        openingHours={openingHours}
        wifiPassword={coffeeshopConfig.wifi.enabled ? coffeeshopConfig.wifi.password : undefined}
        address={coffeeshopConfig.location.address}
        phone={coffeeshopConfig.contact.phone}
        onProductClick={handleProductClick}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
        cartCount={cartCount}
        formatPrice={formatPrice}
        userPoints={userPoints}
        isCheckedIn={isCheckedIn}
        onCheckIn={engagementEnabled ? handleCheckIn : undefined}
        activePage={activePage}
        onNavigate={onNavigate}
      />

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          isOpen={!!selectedProduct}
          onClose={handleCloseBottomSheet}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            image: selectedProduct.image,
            isVegan: selectedProduct.isVegan,
            prepTime: selectedProduct.prepTime,
          }}
          onAddToCart={cartEnabled ? handleAddToCartFromSheet : undefined}
          formatPrice={formatPrice}
          isFavorite={favorites.includes(selectedProduct.id)}
          onFavoriteToggle={(id) => favoritesStore.toggle(id)}
        />
      )}
    </>
  );
}

export default ConnectedHomePage;
