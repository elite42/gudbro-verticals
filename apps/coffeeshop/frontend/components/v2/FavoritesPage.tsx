'use client';

/**
 * FavoritesPage v2
 *
 * Pagina preferiti utente con design system v2.
 * Mostra i prodotti salvati nei preferiti con opzioni per
 * aggiungere al carrello o rimuovere dai preferiti.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HeartBreak, ShoppingBag, Trash, ForkKnife } from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ProductCard } from './ProductCard';
import { ProductBottomSheet } from './ProductBottomSheet';
import { TierGate } from './TierGate';
import { useTierFeature } from '@/lib/hooks/useTierFeature';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

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

interface FavoritesPageProps {
  /** All menu items (to filter favorites from) */
  menuItems: MenuItem[];
  /** List of favorite product IDs */
  favorites: string[];
  /** Callback when favorite is toggled */
  onFavoriteToggle: (id: string) => void;
  /** Callback when product is added to cart */
  onAddToCart?: (productId: string, quantity: number) => void;
  /** Theme toggle handler */
  onThemeToggle: () => void;
  /** Current theme */
  isDark: boolean;
  /** Cart item count for badge */
  cartCount?: number;
  /** Price formatter function */
  formatPrice?: (price: number) => string;
  /** Navigation for demo mode */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

export function FavoritesPage({
  menuItems,
  favorites,
  onFavoriteToggle,
  onAddToCart,
  onThemeToggle,
  isDark,
  cartCount = 0,
  formatPrice = (p) => `${p.toLocaleString()} VND`,
  activePage,
  onNavigate,
}: FavoritesPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');

  // Get favorite items
  const favoriteItems = menuItems.filter((item) => favorites.includes(item.id));

  const handleRemove = useCallback(
    (id: string) => {
      setRemovingId(id);
      // Small delay for animation
      setTimeout(() => {
        onFavoriteToggle(id);
        setRemovingId(null);
      }, 300);
    },
    [onFavoriteToggle]
  );

  const handleAddToCart = useCallback(
    (id: string) => {
      if (onAddToCart && cartEnabled) {
        onAddToCart(id, 1);
      }
    },
    [onAddToCart, cartEnabled]
  );

  const handleProductClick = useCallback((product: MenuItem) => {
    setSelectedProduct(product);
  }, []);

  const handleAddFromSheet = useCallback(
    (productId: string, quantity: number) => {
      if (onAddToCart && cartEnabled) {
        onAddToCart(productId, quantity);
        setSelectedProduct(null);
      }
    },
    [onAddToCart, cartEnabled]
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-24 pt-4">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            I tuoi preferiti
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {favoriteItems.length > 0
              ? `${favoriteItems.length} ${favoriteItems.length === 1 ? 'piatto salvato' : 'piatti salvati'}`
              : 'Nessun preferito ancora'}
          </p>
        </div>

        {/* Empty State */}
        {favoriteItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div
              className="mb-4 flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <Heart size={48} weight="duotone" style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h2
              className="font-display text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Nessun preferito
            </h2>
            <p className="mt-2 max-w-xs text-sm" style={{ color: 'var(--text-secondary)' }}>
              Tocca il cuore sui piatti che ami per salvarli qui
            </p>
            <button
              onClick={() => onNavigate?.('menu')}
              className="mt-6 flex items-center gap-2 rounded-xl px-6 py-3 font-medium"
              style={{ background: 'var(--brand-warm)', color: 'white' }}
            >
              <ForkKnife size={20} />
              Sfoglia il menu
            </button>
          </motion.div>
        )}

        {/* Favorites Grid */}
        {favoriteItems.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {favoriteItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  animate={{
                    opacity: removingId === item.id ? 0.5 : 1,
                    scale: removingId === item.id ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="card flex gap-4 p-4"
                >
                  {/* Image */}
                  <div
                    className="h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="cursor-pointer" onClick={() => handleProductClick(item)}>
                      <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p
                          className="mt-0.5 line-clamp-1 text-sm"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span
                        className="font-display font-semibold"
                        style={{ color: 'var(--brand-warm)' }}
                      >
                        {formatPrice(item.price)}
                      </span>

                      <div className="flex gap-2">
                        {/* Remove from favorites */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                          style={{
                            background: 'var(--status-error-bg)',
                            color: 'var(--status-error)',
                          }}
                        >
                          <HeartBreak size={18} weight="fill" />
                        </button>

                        {/* Add to cart */}
                        <TierGate feature="enableCart" fallback="hide">
                          <button
                            onClick={() => handleAddToCart(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                            style={{
                              background: 'var(--brand-warm)',
                              color: 'white',
                            }}
                          >
                            <ShoppingBag size={18} weight="fill" />
                          </button>
                        </TierGate>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Clear All Button */}
        {favoriteItems.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={() => favorites.forEach((id) => onFavoriteToggle(id))}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              <Trash size={16} />
              Rimuovi tutti
            </button>
          </motion.div>
        )}
      </main>

      <BottomNav cartCount={cartCount} activePage={activePage} onNavigate={onNavigate} />

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          product={{
            ...selectedProduct,
            allergens: [],
            extras: [],
          }}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddFromSheet}
          formatPrice={formatPrice}
          isFavorite={favorites.includes(selectedProduct.id)}
          onFavoriteToggle={() => onFavoriteToggle(selectedProduct.id)}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
