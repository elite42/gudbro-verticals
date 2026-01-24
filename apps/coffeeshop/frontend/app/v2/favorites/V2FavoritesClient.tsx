'use client';

/**
 * V2 Favorites Client Component
 *
 * Client component per la pagina preferiti v2.
 * Riceve i dati dal Server Component e li passa a ConnectedFavoritesPage.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect, useMemo } from 'react';
import { ConnectedFavoritesPage } from '@/components/v2/connected';
import { NormalizedProduct } from '@/lib/menu-service';
import { useTranslation } from '@/lib/use-translation';

interface V2FavoritesClientProps {
  initialMenuItems: NormalizedProduct[];
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

export default function V2FavoritesClient({ initialMenuItems }: V2FavoritesClientProps) {
  const { language } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === 'home') {
      window.location.href = '/v2';
    } else if (pageId === 'menu') {
      window.location.href = '/v2/menu';
    } else if (pageId === 'cart') {
      window.location.href = '/v2/cart';
    } else if (pageId === 'orders') {
      window.location.href = '/v2/orders';
    } else if (pageId === 'account') {
      window.location.href = '/v2/account';
    }
  };

  // Convert and localize items
  const v2MenuItems = useMemo(() => {
    return initialMenuItems.map((item) => ({
      id: item.id,
      name: getLocalizedText(item.nameMulti as Record<string, string>, item.name, language),
      description: getLocalizedText(
        item.descriptionMulti as Record<string, string>,
        item.description,
        language
      ),
      price: item.price,
      originalPrice: undefined,
      image: item.image || '',
      category: item.category || 'other',
      isNew: item.isNew,
      isPopular: false,
      isBestSeller: false,
      isVegan: item.dietary?.includes('vegan') ?? false,
      isVegetarian: item.dietary?.includes('vegetarian') ?? false,
      isGlutenFree: item.dietary?.includes('gluten-free') ?? false,
      isSpicy: (item.spiceLevel ?? 0) >= 2,
      prepTime: item.prepTime,
      calories: item.calories,
      likesCount: 0,
    }));
  }, [initialMenuItems, language]);

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ConnectedFavoritesPage
        menuItems={v2MenuItems}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onNavigate={handleNavigate}
        activePage="favorites"
      />
    </div>
  );
}
