'use client';

/**
 * V2 Home Client Component
 *
 * Client component per la home page v2.
 * Riceve i dati dal Server Component e li passa a ConnectedHomePage.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect, useMemo } from 'react';
import { ConnectedHomePage } from '@/components/v2/connected';
import { NormalizedProduct } from '@/lib/menu-service';
import { useTranslation } from '@/lib/use-translation';

interface V2HomeClientProps {
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

export default function V2HomeClient({ initialMenuItems }: V2HomeClientProps) {
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
    if (pageId === 'menu') {
      window.location.href = '/v2/menu';
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

  // Convert and localize items
  const { popularItems, newItems } = useMemo(() => {
    const isVegan = (item: NormalizedProduct) => item.dietary?.includes('vegan') ?? false;

    const convertItem = (item: NormalizedProduct, isPopular = false, isNew = false) => ({
      id: item.id,
      name: getLocalizedText(item.nameMulti as Record<string, string>, item.name, language),
      description: getLocalizedText(
        item.descriptionMulti as Record<string, string>,
        item.description,
        language
      ),
      price: item.price,
      image: item.image || '',
      category: item.category,
      isNew: isNew || item.isNew,
      isPopular,
      isVegan: isVegan(item),
      prepTime: item.prepTime,
    });

    // Popular: first 6 items from coffee, smoothie, dessert categories or new items
    const popular = initialMenuItems
      .filter(
        (item) => item.isNew || ['coffee', 'smoothie', 'dessert'].includes(item.category || '')
      )
      .slice(0, 6)
      .map((item) => convertItem(item, true, item.isNew));

    // New: items marked as new
    const newOnes = initialMenuItems
      .filter((item) => item.isNew)
      .slice(0, 6)
      .map((item) => convertItem(item, false, true));

    return { popularItems: popular, newItems: newOnes };
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
      <ConnectedHomePage
        popularItems={popularItems}
        newItems={newItems}
        openingHours={{
          today: '7:00 AM - 9:00 PM',
          isOpen: true,
        }}
        heroImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop"
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        activePage="home"
        onNavigate={handleNavigate}
      />
    </div>
  );
}
