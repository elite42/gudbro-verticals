/**
 * V2 Popular Page Route (Server Component)
 *
 * Mostra i 12 prodotti più popolari.
 * Usa lo stesso pattern di /v2/menu/page.tsx.
 *
 * @route /v2/menu/popular
 */

import { getMenuProductsRaw } from '@/app/actions';
import V2PopularClient from './V2PopularClient';

export const metadata = {
  title: 'Popular Items - Menu',
  description: 'Our most popular items',
};

export default async function V2PopularPage() {
  // Fetch all menu items
  const menuItems = await getMenuProductsRaw();

  return <V2PopularClient initialMenuItems={menuItems} />;
}
