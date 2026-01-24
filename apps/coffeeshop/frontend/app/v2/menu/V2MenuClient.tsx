'use client';

/**
 * V2 Menu Client Component
 *
 * Client component per la pagina menu v2.
 * Riceve i dati dal Server Component e li passa a ConnectedMenuPage.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect, useMemo } from 'react';
import { ConnectedMenuPage } from '@/components/v2/connected';
import { NormalizedProduct } from '@/lib/menu-service';
import { useTranslation } from '@/lib/use-translation';

interface V2MenuClientProps {
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

export default function V2MenuClient({ initialMenuItems }: V2MenuClientProps) {
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
    } else if (pageId === 'cart') {
      window.location.href = '/v2/cart';
    } else if (pageId === 'favorites') {
      window.location.href = '/v2/favorites';
    } else if (pageId === 'orders') {
      window.location.href = '/v2/orders';
    } else if (pageId === 'account') {
      window.location.href = '/v2/account';
    }
  };

  // Localize and convert menu items to v2 format
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

  // Extract unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(initialMenuItems.map((item) => item.category).filter(Boolean));
    return Array.from(categorySet).map((cat) => ({
      id: cat as string,
      name: (cat as string).charAt(0).toUpperCase() + (cat as string).slice(1).replace(/-/g, ' '),
    }));
  }, [initialMenuItems]);

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ConnectedMenuPage
        menuItems={v2MenuItems}
        categories={categories}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        activePage="menu"
        onNavigate={handleNavigate}
      />
    </div>
  );
}
