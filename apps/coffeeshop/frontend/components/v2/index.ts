/**
 * GUDBRO Digital Menu - Design System v2
 *
 * "Organic Minimal" Design
 * - Warm neutrals (stone palette)
 * - Fraunces display font + DM Sans body
 * - Light & Dark themes
 * - Food-friendly colors
 *
 * Components:
 * - Layout: Header, BottomNav
 * - Navigation: CategoryTabs, CategoryGrid
 * - Content: ProductCard, ProductBottomSheet, AllergenLegend
 * - Cart & Checkout: LoyaltyRedeemCard, PaymentMethodSelector, VoucherInput
 * - Pages: HomePage, MenuPage, CartPage, OrderConfirmation
 */

// Layout
export { Header } from './Header';
export { BottomNav } from './BottomNav';

// Navigation
export { CategoryTabs } from './CategoryTabs';
export { CategoryGrid } from './CategoryGrid';

// Content
export { AllergenLegend } from './AllergenLegend';
export { ProductCard } from './ProductCard';
export { ProductBottomSheet } from './ProductBottomSheet';

// Cart & Checkout
export { LoyaltyRedeemCard } from './LoyaltyRedeemCard';
export { PaymentMethodSelector } from './PaymentMethodSelector';
export { VoucherInput } from './VoucherInput';

// Differentiators (GUDBRO unique features)
export { AllergenFilter } from './AllergenFilter';
export { LanguageSelector } from './LanguageSelector';

// Tier System (Feature Gating)
export { TierGate, TierGateInline, useTierGate } from './TierGate';
export { UpgradePrompt, UpgradeBadge } from './UpgradePrompt';
export type { TierGateProps } from './TierGate';
export type { UpgradePromptProps, UpgradePromptVariant } from './UpgradePrompt';

// Pages
export { HomePage } from './HomePage';
export { MenuPage } from './MenuPage';
export { CartPage } from './CartPage';
export { OrderConfirmation } from './OrderConfirmation';
export { AccountPage } from './AccountPage';
export { FavoritesPage } from './FavoritesPage';
export { OrderHistoryPage } from './OrderHistoryPage';

// Auth & Welcome
export { AuthModal } from './AuthModal';
export { WelcomeModal } from './WelcomeModal';

// Context & Navigation
export { TableContextBanner } from './TableContextBanner';
export { SearchOverlay } from './SearchOverlay';

// Layout
export { DesktopMenuLayout } from './DesktopMenuLayout';

// Connected Components (v2 + v1 services integration)
export {
  ConnectedMenuPage,
  ConnectedHomePage,
  ConnectedCartPage,
  ConnectedFavoritesPage,
  ConnectedOrderHistoryPage,
} from './connected';
