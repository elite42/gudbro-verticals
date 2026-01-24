/**
 * Connected Components
 *
 * Componenti v2 collegati ai servizi v1 con logica tier-aware.
 * Usare questi componenti nelle route pages per avere:
 * - Dati reali da cart-store, favorites-store, menu-service
 * - Feature gating automatico basato sul tier attivo
 * - Persistenza localStorage
 */

export { ConnectedMenuPage } from './ConnectedMenuPage';
export { ConnectedHomePage } from './ConnectedHomePage';
export { ConnectedCartPage } from './ConnectedCartPage';
export { ConnectedFavoritesPage } from './ConnectedFavoritesPage';
export { ConnectedOrderHistoryPage } from './ConnectedOrderHistoryPage';
