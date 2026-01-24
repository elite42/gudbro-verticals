/**
 * V2 Menu Page Route (Server Component)
 *
 * Fetcha i dati del menu da Supabase e li passa al Client Component.
 * Usa lo stesso pattern di /menu/page.tsx per consistenza.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { getMenuProductsRaw } from '@/app/actions';
import V2MenuClient from './V2MenuClient';

export default async function V2MenuPage() {
  // Fetch menu items with multilingual fields for client-side language switching
  const menuItems = await getMenuProductsRaw();

  return <V2MenuClient initialMenuItems={menuItems} />;
}
