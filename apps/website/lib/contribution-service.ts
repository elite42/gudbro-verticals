/**
 * Contribution Service
 *
 * Handles ingredient contributions from users (crowdsourcing)
 * Integrates with P5 loyalty system for gamification
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface ContributionSubmission {
  ingredientName: string;
  ingredientNameLocal?: string;
  category?: string;
  subcategory?: string;
  submittedData: {
    name?: string;
    allergens?: string[];
    nutritionalInfo?: Record<string, number>;
    dietary?: string[];
    origin?: string;
    description?: string;
  };
  sourcePhotos?: string[];
  sourceType?: 'manual' | 'photo_ai' | 'barcode' | 'import';
  locale?: string;
}

export interface Contribution {
  id: string;
  ingredientName: string;
  ingredientNameLocal?: string;
  category?: string;
  subcategory?: string;
  submittedJson: Record<string, unknown>;
  sourcePhotos: string[];
  sourceType: string;
  aiConfidenceScore?: number;
  status: 'pending' | 'in_review' | 'approved' | 'merged' | 'rejected' | 'duplicate';
  reviewerNotes?: string;
  rejectionReason?: string;
  mergedIntoId?: string;
  isNewIngredient: boolean;
  pointsAwarded: number;
  contributorLocale: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  mergedAt?: string;
}

export interface ContributorStats {
  accountId: string;
  email: string;
  displayName?: string;
  contributorPoints: number;
  totalSubmissions: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  totalPointsFromContributions: number;
}

export interface SubmitResult {
  success: boolean;
  contributionId?: string;
  error?: string;
}

/**
 * Submit a new ingredient contribution
 */
export async function submitContribution(
  accountId: string,
  data: ContributionSubmission
): Promise<SubmitResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: result, error } = await supabase.rpc('submit_ingredient_contribution', {
      p_account_id: accountId,
      p_ingredient_name: data.ingredientName,
      p_submitted_json: data.submittedData,
      p_category: data.category || null,
      p_source_photos: data.sourcePhotos || [],
      p_source_type: data.sourceType || 'manual',
      p_locale: data.locale || 'en',
    });

    if (error) {
      console.error('[ContributionService] Submit error:', error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      contributionId: result,
    };
  } catch (err) {
    console.error('[ContributionService] Submit error:', err);
    return { success: false, error: 'Failed to submit contribution' };
  }
}

/**
 * Get contributions for the current user
 */
export async function getMyContributions(accountId: string): Promise<Contribution[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('ingredient_contributions')
    .select('*')
    .eq('account_id', accountId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ContributionService] Get contributions error:', error);
    return [];
  }

  return (data || []).map(mapContribution);
}

/**
 * Get a single contribution by ID
 */
export async function getContribution(contributionId: string): Promise<Contribution | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('ingredient_contributions')
    .select('*')
    .eq('id', contributionId)
    .single();

  if (error) {
    console.error('[ContributionService] Get contribution error:', error);
    return null;
  }

  return mapContribution(data);
}

/**
 * Get contributor stats for the current user
 */
export async function getContributorStats(accountId: string): Promise<ContributorStats | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('v_contributor_stats')
    .select('*')
    .eq('account_id', accountId)
    .single();

  if (error) {
    // User might not have any contributions yet
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[ContributionService] Get stats error:', error);
    return null;
  }

  return {
    accountId: data.account_id,
    email: data.email,
    displayName: data.display_name,
    contributorPoints: data.contributor_points || 0,
    totalSubmissions: data.total_submissions || 0,
    approvedCount: data.approved_count || 0,
    rejectedCount: data.rejected_count || 0,
    pendingCount: data.pending_count || 0,
    totalPointsFromContributions: data.total_points_from_contributions || 0,
  };
}

/**
 * Get leaderboard of top contributors
 */
export async function getContributorLeaderboard(limit: number = 10): Promise<ContributorStats[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('v_contributor_stats')
    .select('*')
    .order('contributor_points', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[ContributionService] Get leaderboard error:', error);
    return [];
  }

  return (data || []).map((d: any) => ({
    accountId: d.account_id,
    email: d.email,
    displayName: d.display_name,
    contributorPoints: d.contributor_points || 0,
    totalSubmissions: d.total_submissions || 0,
    approvedCount: d.approved_count || 0,
    rejectedCount: d.rejected_count || 0,
    pendingCount: d.pending_count || 0,
    totalPointsFromContributions: d.total_points_from_contributions || 0,
  }));
}

/**
 * Upload contribution photo to Supabase Storage
 */
export async function uploadContributionPhoto(
  accountId: string,
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${accountId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('contributions')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('[ContributionService] Upload error:', error);
    return { success: false, error: error.message };
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('contributions')
    .getPublicUrl(data.path);

  return {
    success: true,
    url: urlData.publicUrl,
  };
}

/**
 * Get contribution status breakdown for user
 */
export async function getContributionStatusBreakdown(accountId: string): Promise<{
  pending: number;
  inReview: number;
  approved: number;
  rejected: number;
  total: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { pending: 0, inReview: 0, approved: 0, rejected: 0, total: 0 };
  }

  const { data, error } = await supabase
    .from('ingredient_contributions')
    .select('status')
    .eq('account_id', accountId);

  if (error) {
    console.error('[ContributionService] Get breakdown error:', error);
    return { pending: 0, inReview: 0, approved: 0, rejected: 0, total: 0 };
  }

  const breakdown = {
    pending: 0,
    inReview: 0,
    approved: 0,
    rejected: 0,
    total: data?.length || 0,
  };

  (data || []).forEach((c: { status: string }) => {
    switch (c.status) {
      case 'pending':
        breakdown.pending++;
        break;
      case 'in_review':
        breakdown.inReview++;
        break;
      case 'approved':
      case 'merged':
        breakdown.approved++;
        break;
      case 'rejected':
      case 'duplicate':
        breakdown.rejected++;
        break;
    }
  });

  return breakdown;
}

// Helper function to map DB row to Contribution type
function mapContribution(row: any): Contribution {
  return {
    id: row.id,
    ingredientName: row.ingredient_name,
    ingredientNameLocal: row.ingredient_name_local,
    category: row.category,
    subcategory: row.subcategory,
    submittedJson: row.submitted_json || {},
    sourcePhotos: row.source_photos || [],
    sourceType: row.source_type,
    aiConfidenceScore: row.ai_confidence_score,
    status: row.status,
    reviewerNotes: row.reviewer_notes,
    rejectionReason: row.rejection_reason,
    mergedIntoId: row.merged_into_id,
    isNewIngredient: row.is_new_ingredient,
    pointsAwarded: row.points_awarded || 0,
    contributorLocale: row.contributor_locale,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reviewedAt: row.reviewed_at,
    mergedAt: row.merged_at,
  };
}

// ============================================================================
// LOYALTY & GAMIFICATION
// ============================================================================

export interface LoyaltyTransaction {
  id: string;
  transactionType: string;
  pointsChange: number;
  pointsType: string;
  balanceAfter: number;
  description: string;
  referenceType?: string;
  referenceId?: string;
  createdAt: string;
}

export interface LoyaltySummary {
  totalPoints: number;
  consumerPoints: number;
  merchantPoints: number;
  contributorPoints: number;
  loyaltyTier: string;
  pointsToNextTier: number;
  nextTier: string | null;
  totalTransactions: number;
  lastTransactionAt: string | null;
  successfulReferrals: number;
}

/**
 * Get loyalty summary for the current user
 */
export async function getLoyaltySummary(accountId: string): Promise<LoyaltySummary | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('v_loyalty_summary')
    .select('*')
    .eq('account_id', accountId)
    .single();

  if (error) {
    console.error('[ContributionService] Get loyalty summary error:', error);
    return null;
  }

  return {
    totalPoints: data.total_points || 0,
    consumerPoints: data.consumer_points || 0,
    merchantPoints: data.merchant_points || 0,
    contributorPoints: data.contributor_points || 0,
    loyaltyTier: data.loyalty_tier || 'bronze',
    pointsToNextTier: data.points_to_next_tier || 0,
    nextTier: data.next_tier,
    totalTransactions: data.total_transactions || 0,
    lastTransactionAt: data.last_transaction_at,
    successfulReferrals: data.successful_referrals || 0,
  };
}

/**
 * Get recent loyalty transactions
 */
export async function getRecentTransactions(
  accountId: string,
  limit: number = 20
): Promise<LoyaltyTransaction[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('v_recent_loyalty_transactions')
    .select('*')
    .eq('account_id', accountId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[ContributionService] Get transactions error:', error);
    return [];
  }

  return (data || []).map((t: any) => ({
    id: t.id,
    transactionType: t.transaction_type,
    pointsChange: t.points_change,
    pointsType: t.points_type,
    balanceAfter: t.balance_after,
    description: t.description,
    referenceType: t.reference_type,
    referenceId: t.reference_id,
    createdAt: t.created_at,
  }));
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const CONTRIBUTION_POINTS = {
  INGREDIENT_APPROVED: 50,
  BUG_REPORT: 100,
  FEATURE_ADOPTED: 200,
};

export const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
};

export const TIER_BENEFITS: Record<string, string[]> = {
  bronze: ['Base loyalty rewards'],
  silver: ['5% extra points on orders', 'Early access to new features'],
  gold: ['10% extra points on orders', 'Priority support', 'Exclusive offers'],
  platinum: ['15% extra points on orders', 'VIP support', 'Free premium features', 'Beta access'],
};

export const CATEGORY_OPTIONS = [
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'meat', label: 'Meat & Poultry' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'grains', label: 'Grains & Cereals' },
  { value: 'legumes', label: 'Legumes' },
  { value: 'nuts', label: 'Nuts & Seeds' },
  { value: 'spices', label: 'Spices & Herbs' },
  { value: 'oils', label: 'Oils & Fats' },
  { value: 'sauces', label: 'Sauces & Condiments' },
  { value: 'sweeteners', label: 'Sweeteners' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'other', label: 'Other' },
];

export const ALLERGEN_OPTIONS = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'fish', label: 'Fish' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'tree_nuts', label: 'Tree Nuts' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'soy', label: 'Soy' },
  { value: 'sesame', label: 'Sesame' },
  { value: 'sulfites', label: 'Sulfites' },
  { value: 'mustard', label: 'Mustard' },
  { value: 'celery', label: 'Celery' },
  { value: 'lupin', label: 'Lupin' },
  { value: 'mollusks', label: 'Mollusks' },
];

export const DIETARY_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'gluten_free', label: 'Gluten Free' },
  { value: 'dairy_free', label: 'Dairy Free' },
  { value: 'low_carb', label: 'Low Carb' },
  { value: 'keto', label: 'Keto Friendly' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'raw', label: 'Raw' },
];
