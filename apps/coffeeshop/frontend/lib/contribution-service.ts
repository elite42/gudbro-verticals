/**
 * Contribution Service
 *
 * P5 Phase 2.5: User-Generated Ingredients
 *
 * Features:
 * - Submit ingredient contributions
 * - Track contribution status
 * - View contribution history
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { getCurrentSession } from './auth-service';

// Types
export interface IngredientContribution {
  id: string;
  ingredientName: string;
  ingredientNameLocal?: string;
  category?: string;
  submittedJson: IngredientData;
  sourcePhotos: string[];
  sourceType: 'manual' | 'photo_ai' | 'barcode' | 'import';
  status: ContributionStatus;
  pointsAwarded: number;
  reviewerNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface IngredientData {
  name: string;
  nameLocal?: string;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
  dietary?: string[];
  origin?: string;
  description?: string;
  category?: string;
  subcategory?: string;
}

export type ContributionStatus = 'pending' | 'in_review' | 'approved' | 'merged' | 'rejected' | 'duplicate';

export interface ContributionStats {
  totalSubmissions: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  totalPointsEarned: number;
}

/**
 * Submit a new ingredient contribution
 */
export async function submitIngredientContribution(
  ingredientName: string,
  data: IngredientData,
  options?: {
    category?: string;
    sourcePhotos?: string[];
    sourceType?: 'manual' | 'photo_ai' | 'barcode';
    locale?: string;
  }
): Promise<{ success: boolean; contributionId?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const session = await getCurrentSession();
  if (!session?.user) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // Get account ID
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) {
      return { success: false, error: 'Account not found' };
    }

    // Submit via RPC
    const { data: contributionId, error } = await supabase.rpc('submit_ingredient_contribution', {
      p_account_id: account.id,
      p_ingredient_name: ingredientName,
      p_submitted_json: data,
      p_category: options?.category || null,
      p_source_photos: options?.sourcePhotos || [],
      p_source_type: options?.sourceType || 'manual',
      p_locale: options?.locale || 'en',
    });

    if (error) {
      console.error('[ContributionService] Submit error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, contributionId };
  } catch (err) {
    console.error('[ContributionService] Unexpected error:', err);
    return { success: false, error: 'Failed to submit contribution' };
  }
}

/**
 * Get user's contribution history
 */
export async function getMyContributions(): Promise<IngredientContribution[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const session = await getCurrentSession();
  if (!session?.user) return [];

  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return [];

    const { data, error } = await supabase
      .from('ingredient_contributions')
      .select('*')
      .eq('account_id', account.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[ContributionService] Fetch error:', error);
      return [];
    }

    return data.map((c) => ({
      id: c.id,
      ingredientName: c.ingredient_name,
      ingredientNameLocal: c.ingredient_name_local,
      category: c.category,
      submittedJson: c.submitted_json as IngredientData,
      sourcePhotos: c.source_photos || [],
      sourceType: c.source_type,
      status: c.status as ContributionStatus,
      pointsAwarded: c.points_awarded,
      reviewerNotes: c.reviewer_notes,
      rejectionReason: c.rejection_reason,
      createdAt: c.created_at,
      reviewedAt: c.reviewed_at,
    }));
  } catch (err) {
    console.error('[ContributionService] Unexpected error:', err);
    return [];
  }
}

/**
 * Get contribution statistics for current user
 */
export async function getContributionStats(): Promise<ContributionStats | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const session = await getCurrentSession();
  if (!session?.user) return null;

  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return null;

    const { data, error } = await supabase
      .from('v_contributor_stats')
      .select('*')
      .eq('account_id', account.id)
      .single();

    if (error) {
      // View might not exist or no data
      return {
        totalSubmissions: 0,
        approvedCount: 0,
        pendingCount: 0,
        rejectedCount: 0,
        totalPointsEarned: 0,
      };
    }

    return {
      totalSubmissions: data.total_submissions || 0,
      approvedCount: data.approved_count || 0,
      pendingCount: data.pending_count || 0,
      rejectedCount: data.rejected_count || 0,
      totalPointsEarned: data.total_points_from_contributions || 0,
    };
  } catch (err) {
    console.error('[ContributionService] Unexpected error:', err);
    return null;
  }
}

/**
 * Get status badge color
 */
export function getStatusColor(status: ContributionStatus): string {
  const colors: Record<ContributionStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    merged: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    duplicate: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get status display text
 */
export function getStatusText(status: ContributionStatus): string {
  const texts: Record<ContributionStatus, string> = {
    pending: 'Pending Review',
    in_review: 'In Review',
    approved: 'Approved',
    merged: 'Merged',
    rejected: 'Rejected',
    duplicate: 'Duplicate',
  };
  return texts[status] || status;
}

/**
 * Common ingredient categories
 */
export const INGREDIENT_CATEGORIES = [
  'vegetables',
  'fruits',
  'meat',
  'poultry',
  'seafood',
  'dairy',
  'grains',
  'legumes',
  'nuts_seeds',
  'herbs',
  'spices',
  'oils_fats',
  'sweeteners',
  'condiments',
  'beverages',
  'other',
];

/**
 * Common allergens
 */
export const COMMON_ALLERGENS = [
  'gluten',
  'milk',
  'eggs',
  'fish',
  'crustaceans',
  'molluscs',
  'peanuts',
  'nuts',
  'soya',
  'celery',
  'mustard',
  'sesame',
  'sulphites',
  'lupin',
];

/**
 * Common dietary tags
 */
export const DIETARY_TAGS = [
  'vegan',
  'vegetarian',
  'gluten_free',
  'dairy_free',
  'nut_free',
  'halal',
  'kosher',
  'organic',
  'low_carb',
  'keto',
];
