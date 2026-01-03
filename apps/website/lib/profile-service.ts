/**
 * Unified Profile Service
 *
 * Handles user profile data across all roles (consumer, merchant, admin)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Tenant {
  roleId: string;
  tenantId?: string;
  tenantType?: string;
  permissions: Record<string, boolean>;
  isActive: boolean;
  isPrimary: boolean;
  joinedAt: string;
}

export interface UnifiedProfile {
  // Account info
  accountId: string;
  authId?: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  locale: string;
  timezone: string;
  accountCreatedAt: string;
  lastLoginAt?: string;

  // Loyalty
  totalPoints: number;
  loyaltyTier: string;

  // Role flags
  isConsumer: boolean;
  isMerchant: boolean;
  isAdmin: boolean;
  isContributor: boolean;

  // Tenants (for merchants)
  tenants: Tenant[];
}

export interface ProfileUpdateData {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  locale?: string;
  timezone?: string;
}

/**
 * Get unified profile for an account
 */
export async function getUnifiedProfile(accountId: string): Promise<UnifiedProfile | null> {
  const { data, error } = await supabase.rpc('get_unified_profile', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[ProfileService] Get profile error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const row = data[0];

  return {
    accountId: row.account_id,
    authId: row.auth_id,
    email: row.email,
    displayName: row.display_name,
    firstName: row.first_name,
    lastName: row.last_name,
    avatarUrl: row.avatar_url,
    phone: row.phone,
    locale: row.locale || 'it',
    timezone: row.timezone || 'Europe/Rome',
    accountCreatedAt: row.account_created_at,
    lastLoginAt: row.last_login_at,
    totalPoints: row.total_points || 0,
    loyaltyTier: row.loyalty_tier || 'bronze',
    isConsumer: row.is_consumer,
    isMerchant: row.is_merchant,
    isAdmin: row.is_admin,
    isContributor: row.is_contributor,
    tenants: row.tenants || [],
  };
}

/**
 * Get account ID from Supabase auth ID
 */
export async function getAccountByAuthId(authId: string): Promise<string | null> {
  const { data, error } = await supabase.rpc('get_account_by_auth_id', {
    p_auth_id: authId,
  });

  if (error) {
    console.error('[ProfileService] Get account error:', error);
    return null;
  }

  return data;
}

/**
 * Update profile information
 */
export async function updateProfile(
  accountId: string,
  updates: ProfileUpdateData
): Promise<boolean> {
  const { data, error } = await supabase.rpc('update_profile', {
    p_account_id: accountId,
    p_display_name: updates.displayName || null,
    p_first_name: updates.firstName || null,
    p_last_name: updates.lastName || null,
    p_avatar_url: updates.avatarUrl || null,
    p_phone: updates.phone || null,
    p_locale: updates.locale || null,
    p_timezone: updates.timezone || null,
  });

  if (error) {
    console.error('[ProfileService] Update profile error:', error);
    return false;
  }

  return data === true;
}

/**
 * Set primary role for user
 */
export async function setPrimaryRole(
  accountId: string,
  roleId: string
): Promise<boolean> {
  const { data, error } = await supabase.rpc('set_primary_role', {
    p_account_id: accountId,
    p_role_id: roleId,
  });

  if (error) {
    console.error('[ProfileService] Set primary role error:', error);
    return false;
  }

  return data === true;
}

/**
 * Record user login
 */
export async function recordLogin(accountId: string): Promise<void> {
  await supabase.rpc('record_login', {
    p_account_id: accountId,
  });
}

/**
 * Get user roles
 */
export async function getUserRoles(accountId: string): Promise<Tenant[]> {
  const { data, error } = await supabase.rpc('get_user_roles', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[ProfileService] Get roles error:', error);
    return [];
  }

  return (data || []).map((r: any) => ({
    roleId: r.role_id,
    tenantId: r.tenant_id,
    tenantType: r.tenant_type,
    permissions: r.permissions || {},
    isActive: r.is_active,
    isPrimary: r.is_primary,
    joinedAt: r.created_at,
  }));
}

/**
 * Dietary preference options
 */
export const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetariano', icon: '🥬' },
  { id: 'vegan', label: 'Vegano', icon: '🌱' },
  { id: 'pescatarian', label: 'Pescetariano', icon: '🐟' },
  { id: 'gluten_free', label: 'Senza Glutine', icon: '🌾' },
  { id: 'dairy_free', label: 'Senza Latticini', icon: '🥛' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'paleo', label: 'Paleo', icon: '🍖' },
  { id: 'halal', label: 'Halal', icon: '☪️' },
  { id: 'kosher', label: 'Kosher', icon: '✡️' },
];

/**
 * Allergen options
 */
export const ALLERGEN_OPTIONS = [
  { id: 'gluten', label: 'Glutine', icon: '🌾' },
  { id: 'dairy', label: 'Latticini', icon: '🧀' },
  { id: 'eggs', label: 'Uova', icon: '🥚' },
  { id: 'nuts', label: 'Frutta a guscio', icon: '🥜' },
  { id: 'peanuts', label: 'Arachidi', icon: '🥜' },
  { id: 'soy', label: 'Soia', icon: '🫘' },
  { id: 'fish', label: 'Pesce', icon: '🐟' },
  { id: 'shellfish', label: 'Crostacei', icon: '🦐' },
  { id: 'sesame', label: 'Sesamo', icon: '🌰' },
  { id: 'celery', label: 'Sedano', icon: '🥬' },
  { id: 'mustard', label: 'Senape', icon: '🟡' },
  { id: 'sulfites', label: 'Solfiti', icon: '🍷' },
];

/**
 * Locale options
 */
export const LOCALE_OPTIONS = [
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

/**
 * Timezone options (common European)
 */
export const TIMEZONE_OPTIONS = [
  { id: 'Europe/Rome', label: 'Roma (CET)' },
  { id: 'Europe/London', label: 'Londra (GMT)' },
  { id: 'Europe/Paris', label: 'Parigi (CET)' },
  { id: 'Europe/Berlin', label: 'Berlino (CET)' },
  { id: 'Europe/Madrid', label: 'Madrid (CET)' },
  { id: 'America/New_York', label: 'New York (EST)' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
];
