/**
 * Suggestion Service
 *
 * Handles improvement suggestions submitted by users
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export type SuggestionType =
  | 'ingredient_correction'
  | 'ingredient_addition'
  | 'product_correction'
  | 'product_addition'
  | 'translation_correction'
  | 'translation_addition'
  | 'nutrition_correction'
  | 'allergen_correction'
  | 'general_feedback'
  | 'bug_report'
  | 'feature_request';

export type SuggestionStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'implemented'
  | 'rejected'
  | 'duplicate'
  | 'needs_info';

export type SuggestionPriority = 'low' | 'normal' | 'high' | 'critical';

export interface Suggestion {
  id: string;
  accountId: string;
  suggestionType: SuggestionType;
  status: SuggestionStatus;
  priority: SuggestionPriority;
  title: string;
  description: string;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  currentValue?: Record<string, unknown>;
  suggestedValue?: Record<string, unknown>;
  sources?: string[];
  pointsAwarded: number;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  createdAt: string;
  reviewedAt?: string;
}

export interface SuggestionStats {
  totalSuggestions: number;
  pending: number;
  underReview: number;
  approved: number;
  implemented: number;
  rejected: number;
  totalPointsEarned: number;
}

export interface SuggestionComment {
  id: string;
  suggestionId: string;
  accountId: string;
  accountName?: string;
  comment: string;
  isModeratorComment: boolean;
  createdAt: string;
}

export interface SubmitSuggestionParams {
  accountId: string;
  suggestionType: SuggestionType;
  title: string;
  description: string;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  currentValue?: Record<string, unknown>;
  suggestedValue?: Record<string, unknown>;
  sources?: string[];
}

// ============================================================================
// SUGGESTION FUNCTIONS
// ============================================================================

/**
 * Submit a new improvement suggestion
 */
export async function submitSuggestion(
  params: SubmitSuggestionParams
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('submit_suggestion', {
    p_account_id: params.accountId,
    p_suggestion_type: params.suggestionType,
    p_title: params.title,
    p_description: params.description,
    p_entity_type: params.entityType || null,
    p_entity_id: params.entityId || null,
    p_entity_name: params.entityName || null,
    p_current_value: params.currentValue || null,
    p_suggested_value: params.suggestedValue || null,
    p_sources: params.sources || null,
  });

  if (error) {
    console.error('[SuggestionService] Submit error:', error);
    return null;
  }

  return data;
}

/**
 * Get user's own suggestions
 */
export async function getMySuggestions(
  accountId: string,
  status?: SuggestionStatus,
  limit: number = 20,
  offset: number = 0
): Promise<Suggestion[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_my_suggestions', {
    p_account_id: accountId,
    p_status: status || null,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error('[SuggestionService] Get suggestions error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    suggestionType: row.suggestion_type as SuggestionType,
    status: row.status as SuggestionStatus,
    priority: row.priority as SuggestionPriority,
    title: row.title as string,
    description: row.description as string,
    entityType: row.entity_type as string | undefined,
    entityName: row.entity_name as string | undefined,
    pointsAwarded: row.points_awarded as number,
    upvotes: row.upvotes as number,
    downvotes: row.downvotes as number,
    commentsCount: row.comments_count as number,
    createdAt: row.created_at as string,
    reviewedAt: row.reviewed_at as string | undefined,
  }));
}

/**
 * Get suggestion statistics for a user
 */
export async function getSuggestionStats(
  accountId?: string
): Promise<SuggestionStats | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_suggestion_stats', {
    p_account_id: accountId || null,
  });

  if (error) {
    console.error('[SuggestionService] Get stats error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return {
      totalSuggestions: 0,
      pending: 0,
      underReview: 0,
      approved: 0,
      implemented: 0,
      rejected: 0,
      totalPointsEarned: 0,
    };
  }

  const row = data[0];
  return {
    totalSuggestions: row.total_suggestions,
    pending: row.pending,
    underReview: row.under_review,
    approved: row.approved,
    implemented: row.implemented,
    rejected: row.rejected,
    totalPointsEarned: row.total_points_earned,
  };
}

/**
 * Get a single suggestion by ID
 */
export async function getSuggestionById(
  suggestionId: string
): Promise<Suggestion | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('improvement_suggestions')
    .select('*')
    .eq('id', suggestionId)
    .single();

  if (error) {
    console.error('[SuggestionService] Get by ID error:', error);
    return null;
  }

  // Get vote counts
  const { data: votes } = await supabase
    .from('suggestion_votes')
    .select('vote_type')
    .eq('suggestion_id', suggestionId);

  const upvotes = (votes || []).filter((v: { vote_type: string }) => v.vote_type === 'upvote').length;
  const downvotes = (votes || []).filter((v: { vote_type: string }) => v.vote_type === 'downvote').length;

  // Get comments count
  const { count: commentsCount } = await supabase
    .from('suggestion_comments')
    .select('*', { count: 'exact', head: true })
    .eq('suggestion_id', suggestionId);

  return {
    id: data.id,
    accountId: data.account_id,
    suggestionType: data.suggestion_type,
    status: data.status,
    priority: data.priority,
    title: data.title,
    description: data.description,
    entityType: data.entity_type,
    entityId: data.entity_id,
    entityName: data.entity_name,
    currentValue: data.current_value,
    suggestedValue: data.suggested_value,
    sources: data.sources,
    pointsAwarded: data.points_awarded,
    upvotes,
    downvotes,
    commentsCount: commentsCount || 0,
    createdAt: data.created_at,
    reviewedAt: data.reviewed_at,
  };
}

/**
 * Vote on a suggestion
 */
export async function voteOnSuggestion(
  suggestionId: string,
  accountId: string,
  voteType: 'upvote' | 'downvote'
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc('vote_on_suggestion', {
    p_suggestion_id: suggestionId,
    p_account_id: accountId,
    p_vote_type: voteType,
  });

  if (error) {
    console.error('[SuggestionService] Vote error:', error);
    return false;
  }

  return data === true;
}

/**
 * Remove vote from a suggestion
 */
export async function removeVote(
  suggestionId: string,
  accountId: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase
    .from('suggestion_votes')
    .delete()
    .eq('suggestion_id', suggestionId)
    .eq('account_id', accountId);

  if (error) {
    console.error('[SuggestionService] Remove vote error:', error);
    return false;
  }

  return true;
}

/**
 * Get user's vote on a suggestion
 */
export async function getUserVote(
  suggestionId: string,
  accountId: string
): Promise<'upvote' | 'downvote' | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('suggestion_votes')
    .select('vote_type')
    .eq('suggestion_id', suggestionId)
    .eq('account_id', accountId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.vote_type as 'upvote' | 'downvote';
}

// ============================================================================
// COMMENTS
// ============================================================================

/**
 * Get comments for a suggestion
 */
export async function getSuggestionComments(
  suggestionId: string
): Promise<SuggestionComment[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('suggestion_comments')
    .select(`
      *,
      accounts:account_id (display_name)
    `)
    .eq('suggestion_id', suggestionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[SuggestionService] Get comments error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    suggestionId: row.suggestion_id as string,
    accountId: row.account_id as string,
    accountName: (row.accounts as Record<string, unknown>)?.display_name as string | undefined,
    comment: row.comment as string,
    isModeratorComment: row.is_moderator_comment as boolean,
    createdAt: row.created_at as string,
  }));
}

/**
 * Add a comment to a suggestion
 */
export async function addComment(
  suggestionId: string,
  accountId: string,
  comment: string
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('suggestion_comments')
    .insert({
      suggestion_id: suggestionId,
      account_id: accountId,
      comment,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[SuggestionService] Add comment error:', error);
    return null;
  }

  return data.id;
}

// ============================================================================
// LEADERBOARD
// ============================================================================

/**
 * Get suggestion leaderboard
 */
export async function getSuggestionLeaderboard(
  limit: number = 10
): Promise<Array<{
  accountId: string;
  displayName: string;
  avatarUrl?: string;
  totalSuggestions: number;
  implementedCount: number;
  totalPoints: number;
  acceptanceRate: number;
}>> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('v_suggestion_leaderboard')
    .select('*')
    .limit(limit);

  if (error) {
    console.error('[SuggestionService] Get leaderboard error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    accountId: row.account_id as string,
    displayName: row.display_name as string,
    avatarUrl: row.avatar_url as string | undefined,
    totalSuggestions: row.total_suggestions as number,
    implementedCount: row.implemented_count as number,
    totalPoints: row.total_points as number,
    acceptanceRate: row.acceptance_rate as number,
  }));
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const SUGGESTION_TYPES: Record<SuggestionType, string> = {
  ingredient_correction: 'Ingredient Correction',
  ingredient_addition: 'New Ingredient',
  product_correction: 'Product Correction',
  product_addition: 'New Product',
  translation_correction: 'Translation Correction',
  translation_addition: 'New Translation',
  nutrition_correction: 'Nutrition Correction',
  allergen_correction: 'Allergen Correction',
  general_feedback: 'General Feedback',
  bug_report: 'Bug Report',
  feature_request: 'Feature Request',
};

export const SUGGESTION_POINTS: Record<SuggestionType, number> = {
  ingredient_correction: 25,
  ingredient_addition: 50,
  product_correction: 30,
  product_addition: 75,
  translation_correction: 15,
  translation_addition: 20,
  nutrition_correction: 35,
  allergen_correction: 40,
  general_feedback: 10,
  bug_report: 50,
  feature_request: 100,
};
