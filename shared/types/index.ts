/**
 * @gudbro/types
 * Shared TypeScript types for GUDBRO ecosystem
 */

// Re-export Supabase generated types
export * from './supabase';

// Re-export custom types
export * from './custom';

// Re-export domain types (Order, MerchantCharge, and related sub-types)
// Note: MenuItem and MenuCategory are defined in custom.ts and re-exported via domain.ts
export {
  type OrderStatus,
  type OrderItemStatus,
  type OrderItem,
  type Order,
  type ChargeType,
  type ChargeAmountType,
  type ChargeDisplayMode,
  type ChargeCalculationBase,
  type ChargeAppliesTo,
  type MerchantCharge,
} from './domain';
