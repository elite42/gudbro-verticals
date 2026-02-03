'use client';

/**
 * ConnectedMenuPage
 *
 * Collega MenuPage v2 ai servizi v1 (cart-store, favorites-store, menu-service)
 * e applica la logica tier-aware.
 */

import { useState, useEffect, useCallback } from 'react';
import { MenuPage } from '../MenuPage';
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
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  prepTime?: number;
  calories?: number;
  likesCount?: number;
}

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface ConnectedMenuPageProps {
  /** Menu items from Supabase/API */
  menuItems: MenuItem[];
  /** Categories */
  categories: Category[];
  /** Merchant config overrides */
  merchantName?: string;
  merchantLogo?: string;
  /** Theme state */
  isDark: boolean;
  onThemeToggle: () => void;
  /** Navigation for demo mode */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  /** Initial category to display */
  initialCategory?: string;
}

/**
 * Format price in VND
 */
function formatPrice(price: number): string {
  // Format as Vietnamese Dong
  if (price >= 1000) {
    return `${Math.round(price / 1000)}K`;
  }
  return `${price}`;
}

export function ConnectedMenuPage({
  menuItems,
  categories,
  merchantName = coffeeshopConfig.business.name,
  merchantLogo = coffeeshopConfig.business.logo,
  isDark,
  onThemeToggle,
  activePage,
  onNavigate,
  initialCategory,
}: ConnectedMenuPageProps) {
  // State
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Tier check
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');

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

  // Handlers
  const handleFavoriteToggle = useCallback((id: string) => {
    favoritesStore.toggle(id);
  }, []);

  const handleProductClick = useCallback((product: MenuItem) => {
    setSelectedProduct(product);
  }, []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      if (!cartEnabled) return;

      const product = menuItems.find((item) => item.id === productId);
      if (!product) return;

      // Quick add with no extras
      cartStore.add(
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          isVegan: product.isVegan,
          isVegetarian: product.isVegetarian,
          isGlutenFree: product.isGlutenFree,
          isSpicy: product.isSpicy,
        } as any,
        1,
        []
      );
    },
    [menuItems, cartEnabled]
  );

  const handleCloseBottomSheet = useCallback(() => {
    setSelectedProduct(null);
  }, []);

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
          isVegetarian: selectedProduct.isVegetarian,
          isGlutenFree: selectedProduct.isGlutenFree,
          isSpicy: selectedProduct.isSpicy,
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
      <MenuPage
        merchantName={merchantName}
        merchantLogo={merchantLogo}
        menuItems={menuItems}
        categories={categories}
        onProductClick={handleProductClick}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
        cartCount={cartCount}
        formatPrice={formatPrice}
        favorites={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        onAddToCart={cartEnabled ? handleAddToCart : undefined}
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
            isVegetarian: selectedProduct.isVegetarian,
            isGlutenFree: selectedProduct.isGlutenFree,
            isSpicy: selectedProduct.isSpicy,
            prepTime: selectedProduct.prepTime,
            calories: selectedProduct.calories,
          }}
          onAddToCart={cartEnabled ? handleAddToCartFromSheet : undefined}
          formatPrice={formatPrice}
          isFavorite={favorites.includes(selectedProduct.id)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </>
  );
}

export default ConnectedMenuPage;
