/**
 * V2 Home Page Route (Server Component)
 *
 * Fetcha i dati del menu da Supabase e li passa al Client Component.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { getMenuProductsRaw } from '@/app/actions';
import V2HomeClient from './V2HomeClient';

export default async function V2HomePage() {
  // Fetch menu items with multilingual fields for client-side language switching
  const menuItems = await getMenuProductsRaw();

  return <V2HomeClient initialMenuItems={menuItems} />;
}
