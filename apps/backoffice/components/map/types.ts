/**
 * Map Types
 *
 * Shared types for SmartMap feature.
 * Separated from hooks to allow server-side usage.
 */

// Entity types for map markers
export type EntityType = 'customer' | 'competitor' | 'partner' | 'lead';

export interface BaseEntity {
  id: string;
  type: EntityType;
  lat: number;
  lng: number;
  name: string;
  distance_m?: number;
}

export interface CustomerEntity extends BaseEntity {
  type: 'customer';
  email?: string;
  phone?: string;
  tier: string;
  points_balance: number;
  lifetime_points: number;
  wallet_balance_cents: number;
  last_order_at?: string;
  total_spent_cents: number;
  order_count: number;
  status: 'active' | 'at_risk' | 'churned';
  is_resident?: boolean;
  profile_completion_pct: number;
}

export interface CompetitorEntity extends BaseEntity {
  type: 'competitor';
  address?: string;
  price_range?: string;
  cuisine_type?: string;
  rating?: number;
  review_count?: number;
}

export interface PartnerEntity extends BaseEntity {
  type: 'partner' | 'lead';
  partner_type: 'accommodation' | 'office' | 'tour_operator' | 'other';
  status: 'active' | 'pending' | 'inactive' | 'lead';
  vouchers_used?: number;
  vouchers_issued?: number;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export type MapEntity = CustomerEntity | CompetitorEntity | PartnerEntity;

export interface MapStats {
  totalCustomers: number;
  activeCustomers: number;
  atRiskCustomers: number;
  churnedCustomers: number;
  totalCompetitors: number;
  totalPartners: number;
  totalLeads: number;
  revenueInRadius: number;
  avgOrderValue: number;
}

export interface MapData {
  center: {
    lat: number;
    lng: number;
    name: string;
  };
  entities: {
    customers: CustomerEntity[];
    competitors: CompetitorEntity[];
    partners: PartnerEntity[];
    leads: PartnerEntity[];
  };
  stats: MapStats;
}

/**
 * Calculate customer status based on last order date
 */
export function calculateCustomerStatus(
  lastOrderAt: string | null
): 'active' | 'at_risk' | 'churned' {
  if (!lastOrderAt) return 'churned';

  const daysSinceOrder = Math.floor(
    (Date.now() - new Date(lastOrderAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceOrder <= 30) return 'active';
  if (daysSinceOrder <= 90) return 'at_risk';
  return 'churned';
}
