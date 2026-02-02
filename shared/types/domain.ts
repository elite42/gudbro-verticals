/**
 * Domain Types
 *
 * Consolidated domain types used across multiple GUDBRO verticals.
 * These replace locally-defined duplicates in individual apps.
 *
 * - MenuItem: Already defined in custom.ts, re-exported here for discoverability
 * - Order: Generalized from waiter, coffeeshop, and backoffice implementations
 * - MerchantCharge: Consolidated from backoffice ChargesManager and coffeeshop useMerchantCharges
 */

// Re-export MenuItem and MenuCategory from custom.ts (single source of truth)
export type { MenuItem, MenuCategory } from './custom';

// ============================================================================
// Order Types
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'served'
  | 'completed'
  | 'cancelled';

export type OrderItemStatus = 'pending' | 'preparing' | 'ready' | 'served';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  modifiers?: string[];
  image?: string;
  status: OrderItemStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  customerName?: string;
  tableNumber?: string;
  consumptionType?: 'dine-in' | 'takeaway';
  serviceType?: 'table-service' | 'counter-pickup' | 'takeaway';
}

// ============================================================================
// Merchant Charge Types
// ============================================================================

export type ChargeType = 'tax' | 'fee' | 'tip_preset';

export type ChargeAmountType = 'percentage' | 'fixed' | 'per_person';

export type ChargeDisplayMode = 'inclusive' | 'exclusive';

export type ChargeCalculationBase = 'subtotal' | 'after_taxes' | 'after_fees';

export type ChargeAppliesTo = 'all' | 'food' | 'beverage' | 'alcohol' | 'dine_in' | 'takeaway';

export interface MerchantCharge {
  id: string;
  merchant_id: string;
  charge_type: ChargeType;
  name: string;
  description?: string;
  amount_type: ChargeAmountType;
  percentage?: number;
  fixed_amount?: number;
  display_mode: ChargeDisplayMode;
  show_breakdown: boolean;
  show_in_menu: boolean;
  calculation_base: ChargeCalculationBase;
  applies_to: ChargeAppliesTo;
  min_order_amount?: number;
  max_charge_amount?: number;
  sort_order: number;
  is_enabled: boolean;
  is_default: boolean;
  legal_reference?: string;
}
