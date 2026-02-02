'use client';

/**
 * V2 Popular Client Component
 *
 * Client component per la pagina prodotti popolari v2.
 * Mostra i 12 prodotti più popolari (basato su likesCount).
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Fire, ArrowLeft } from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { ProductCard } from '@/components/v2/ProductCard';
import { ProductBottomSheet } from '@/components/v2/ProductBottomSheet';
import { NormalizedProduct } from '@/lib/menu-service';
import { useTranslation } from '@/lib/use-translation';
import { cartStore } from '@/lib/cart-store';
import { favoritesStore } from '@/lib/favorites-store';
import { useTierFeature } from '@/lib/hooks/useTierFeature';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

interface V2PopularClientProps {
  initialMenuItems: NormalizedProduct[];
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  prepTime?: number;
  calories?: number;
  likesCount?: number;
}

// Helper: Get localized text from multilingual object
function getLocalizedText(
  multi: Record<string, string> | undefined,
  fallback: string,
  lang: string
): string {
  if (!multi) return fallback;
  return multi[lang] || multi.en || fallback;
}

function formatPrice(price: number): string {
  if (price >= 1000) {
    return `${Math.round(price / 1000)}K`;
  }
  return `${price}`;
}

export default function V2PopularClient({ initialMenuItems }: V2PopularClientProps) {
  const router = useRouter();
  const { language } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Tier check
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  // Sync cart count
  useEffect(() => {
    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  // Sync favorites
  useEffect(() => {
    const updateFavorites = () => setFavorites(favoritesStore.get().favoriteIds);
    updateFavorites();
    window.addEventListener('favorites-updated', updateFavorites);
    return () => window.removeEventListener('favorites-updated', updateFavorites);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    switch (pageId) {
      case 'home':
        router.push('/v2');
        break;
      case 'menu':
        router.push('/v2/menu');
        break;
      case 'cart':
        router.push('/v2/cart');
        break;
      case 'favorites':
        router.push('/v2/favorites');
        break;
      case 'orders':
        router.push('/v2/orders');
        break;
      case 'account':
        router.push('/v2/account');
        break;
    }
  };

  const handleFavoriteToggle = (id: string) => {
    favoritesStore.toggle(id);
  };

  const handleProductClick = (product: MenuItem) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (productId: string) => {
    if (!cartEnabled) return;

    const product = popularItems.find((item) => item.id === productId);
    if (!product) return;

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
  };

  const handleAddToCartFromSheet = (
    productId: string,
    quantity: number,
    extras: { id: string; name: string; price: number }[]
  ) => {
    if (!selectedProduct || !cartEnabled) return;

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
  };

  // Convert and get top 12 popular items
  const popularItems = useMemo(() => {
    const converted = initialMenuItems.map((item) => ({
      id: item.id,
      name: getLocalizedText(item.nameMulti as Record<string, string>, item.name, language),
      description: getLocalizedText(
        item.descriptionMulti as Record<string, string>,
        item.description,
        language
      ),
      price: item.price,
      image: item.image || '',
      category: item.category || 'other',
      isNew: item.isNew,
      isVegan: item.dietary?.includes('vegan') ?? false,
      isVegetarian: item.dietary?.includes('vegetarian') ?? false,
      isGlutenFree: item.dietary?.includes('gluten-free') ?? false,
      isSpicy: (item.spiceLevel ?? 0) >= 2,
      prepTime: item.prepTime,
      calories: item.calories,
      likesCount: 0, // TODO: Get from analytics when available
    }));

    // Sort by likesCount (descending) and take top 12
    return converted
      .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      .slice(0, 12);
  }, [initialMenuItems, language]);

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading popular items...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'} className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
      />

      {/* Page Header */}
      <div
        className="px-4 py-4"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <button
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: 'var(--status-error)', color: 'white' }}
          >
            <Fire size={24} weight="fill" />
          </div>
          <div>
            <h1
              className="font-display text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Popular Items
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Our most loved dishes
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="safe-area-bottom container-app py-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
            >
              <ProductCard
                {...item}
                isFavorite={favorites.includes(item.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onClick={() => handleProductClick(item)}
                onAddToCart={cartEnabled ? handleAddToCart : undefined}
                formatPrice={formatPrice}
              />
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav cartCount={cartCount} activePage="menu" onNavigate={handleNavigate} />

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
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
    </div>
  );
}
