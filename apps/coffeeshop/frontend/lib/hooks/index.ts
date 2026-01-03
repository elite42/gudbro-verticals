/**
 * Custom Hooks
 *
 * Reusable hooks for the coffeeshop PWA:
 *
 * Menu Hooks:
 * - useMenuFilters: Category, menu type, and preferences filtering
 * - useMenuStores: Favorites, selections, and table context subscriptions
 * - useMenuUI: Modal, sidebar, and overlay state management
 * - useMenuTranslations: Fetch translated menu items from Supabase
 *
 * i18n Hooks:
 * - useDirection: RTL/LTR text direction based on language
 */

export { useMenuFilters } from './useMenuFilters';
export type { UseMenuFiltersOptions, UseMenuFiltersResult } from './useMenuFilters';

export { useMenuStores } from './useMenuStores';
export type { UseMenuStoresResult } from './useMenuStores';

export { useMenuUI } from './useMenuUI';
export type { UseMenuUIResult } from './useMenuUI';

export { useDirection, isRTLLanguage, getLanguageDirection } from './useDirection';
export type { Direction, UseDirectionResult } from './useDirection';

export { useMenuTranslations, useTranslatedMenuItem } from './useMenuTranslations';

export { usePreferenceSync } from './usePreferenceSync';
export type { UsePreferenceSyncResult } from './usePreferenceSync';
