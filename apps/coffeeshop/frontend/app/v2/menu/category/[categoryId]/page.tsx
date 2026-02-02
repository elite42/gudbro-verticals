/**
 * V2 Category Page Route (Server Component)
 *
 * Mostra prodotti filtrati per categoria specifica.
 * Usa lo stesso pattern di /v2/menu/page.tsx.
 *
 * @route /v2/menu/category/[categoryId]
 */

import { getMenuProductsRaw } from '@/app/actions';
import V2CategoryClient from './V2CategoryClient';

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ');

  return {
    title: `${categoryName} - Menu`,
    description: `Browse our ${categoryName} selection`,
  };
}

export default async function V2CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  // Fetch all menu items - filtering done client-side for consistency with MenuPage
  const menuItems = await getMenuProductsRaw();

  return <V2CategoryClient initialMenuItems={menuItems} categoryId={categoryId} />;
}
