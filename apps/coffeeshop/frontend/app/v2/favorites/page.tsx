/**
 * V2 Favorites Page Route (Server Component)
 *
 * Fetcha i dati del menu da Supabase e li passa al Client Component.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { getMenuProductsRaw } from '@/app/actions';
import V2FavoritesClient from './V2FavoritesClient';

export default async function V2FavoritesPage() {
  // Fetch menu items with multilingual fields for client-side language switching
  const menuItems = await getMenuProductsRaw();

  return <V2FavoritesClient initialMenuItems={menuItems} />;
}
