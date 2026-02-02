'use client';

/**
 * V2 Category Client Component
 *
 * Client component per la pagina categoria v2.
 * Riceve i dati dal Server Component e li passa a ConnectedMenuPage
 * con la categoria pre-selezionata.
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectedMenuPage } from '@/components/v2/connected';
import { NormalizedProduct } from '@/lib/menu-service';
import { useTranslation } from '@/lib/use-translation';

interface V2CategoryClientProps {
  initialMenuItems: NormalizedProduct[];
  categoryId: string;
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

export default function V2CategoryClient({ initialMenuItems, categoryId }: V2CategoryClientProps) {
  const router = useRouter();
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

  // Localize and convert ALL menu items to v2 format (filtering done by MenuPage via initialCategory)
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

  // Extract unique categories for tabs
  const categories = useMemo(() => {
    const categorySet = new Set(initialMenuItems.map((item) => item.category).filter(Boolean));
    return Array.from(categorySet).map((cat) => ({
      id: cat as string,
      name: (cat as string).charAt(0).toUpperCase() + (cat as string).slice(1).replace(/-/g, ' '),
    }));
  }, [initialMenuItems]);

  // Category display name
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ');

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading {categoryName}...</div>
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
        initialCategory={categoryId}
      />
    </div>
  );
}
