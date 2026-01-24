'use client';

/**
 * ConnectedFavoritesPage
 *
 * FavoritesPage v2 connesso ai servizi v1:
 * - favorites-store per i preferiti
 * - menu-service per i prodotti
 * - cart-store per aggiungere al carrello
 */

import { useState, useEffect, useCallback } from 'react';
import { FavoritesPage } from '../FavoritesPage';
import { favoritesStore } from '@/lib/favorites-store';
import { cartStore } from '@/lib/cart-store';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
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

interface ConnectedFavoritesPageProps {
  /** Menu items from ROOTS data */
  menuItems: MenuItem[];
  /** Current theme */
  isDark: boolean;
  /** Theme toggle handler */
  onThemeToggle: () => void;
  /** Price formatter */
  formatPrice?: (price: number) => string;
  /** Navigation handler */
  onNavigate?: (pageId: string) => void;
  /** Active page */
  activePage?: string;
}

export function ConnectedFavoritesPage({
  menuItems,
  isDark,
  onThemeToggle,
  formatPrice,
  onNavigate,
  activePage = 'favorites',
}: ConnectedFavoritesPageProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load favorites and cart count
  useEffect(() => {
    const loadData = () => {
      const favData = favoritesStore.get();
      setFavorites(favData.favoriteIds);

      const cart = cartStore.get();
      setCartCount(cart.items.reduce((sum, item) => sum + item.quantity, 0));
    };

    loadData();

    // Listen for updates
    const handleFavUpdate = () => loadData();
    const handleCartUpdate = () => {
      const cart = cartStore.get();
      setCartCount(cart.items.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener('favorites-updated', handleFavUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('favorites-updated', handleFavUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  // Toggle favorite
  const handleFavoriteToggle = useCallback((id: string) => {
    favoritesStore.toggle(id);
    const favData = favoritesStore.get();
    setFavorites(favData.favoriteIds);
  }, []);

  // Add to cart
  const handleAddToCart = useCallback(
    (productId: string, quantity: number) => {
      const product = menuItems.find((p) => p.id === productId);
      if (!product) return;

      // Call cartStore.add with 3 arguments: dish, quantity, extras
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
        quantity,
        []
      );

      const cart = cartStore.get();
      setCartCount(cart.items.reduce((sum, item) => sum + item.quantity, 0));
    },
    [menuItems]
  );

  return (
    <FavoritesPage
      menuItems={menuItems}
      favorites={favorites}
      onFavoriteToggle={handleFavoriteToggle}
      onAddToCart={handleAddToCart}
      onThemeToggle={onThemeToggle}
      isDark={isDark}
      cartCount={cartCount}
      formatPrice={formatPrice}
      activePage={activePage}
      onNavigate={onNavigate}
    />
  );
}

export default ConnectedFavoritesPage;
