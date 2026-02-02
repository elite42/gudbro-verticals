/**
 * Contribution Admin Service
 *
 * Admin functions for reviewing ingredient contributions
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Lazy accessor — throws if SERVICE_ROLE_KEY is missing (no ANON fallback)
function supabase() {
  return getSupabaseAdmin();
}

export interface PendingContribution {
  id: string;
  ingredientName: string;
  ingredientNameLocal?: string;
  category?: string;
  submittedJson: {
    name: string;
    allergens?: string[];
    dietary?: string[];
    description?: string;
    origin?: string;
  };
  sourcePhotos: string[];
  sourceType: 'manual' | 'photo_ai' | 'barcode' | 'import';
  aiConfidenceScore?: number;
  contributorLocale: string;
  createdAt: string;
  contributorEmail: string;
  contributorName?: string;
  contributorTotalPoints: number;
}

export interface ContributionAction {
  type: 'approve' | 'reject' | 'duplicate';
  contributionId: string;
  reviewerAccountId: string;
  notes?: string;
  rejectionReason?: string;
  mergedIntoId?: string;
  isNew?: boolean;
}

/**
 * Get pending contributions for review
 */
export async function getPendingContributions(): Promise<PendingContribution[]> {
  const { data, error } = await supabase()
    .from('v_pending_contributions')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[ContributionAdminService] Fetch error:', error);
    return [];
  }

  return (data || []).map((c: any) => ({
    id: c.id,
    ingredientName: c.ingredient_name,
    ingredientNameLocal: c.ingredient_name_local,
    category: c.category,
    submittedJson: c.submitted_json || {},
    sourcePhotos: c.source_photos || [],
    sourceType: c.source_type,
    aiConfidenceScore: c.ai_confidence_score,
    contributorLocale: c.contributor_locale,
    createdAt: c.created_at,
    contributorEmail: c.contributor_email,
    contributorName: c.contributor_name,
    contributorTotalPoints: c.contributor_total_points || 0,
  }));
}

/**
 * Get all contributions with filters
 */
export async function getContributions(filters?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: PendingContribution[]; total: number }> {
  let query = supabase()
    .from('ingredient_contributions')
    .select(
      `
      *,
      accounts!ingredient_contributions_account_id_fkey (
        email,
        display_name,
        contributor_points
      )
    `,
      { count: 'exact' }
    );

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('[ContributionAdminService] Fetch error:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data || []).map((c: any) => ({
      id: c.id,
      ingredientName: c.ingredient_name,
      ingredientNameLocal: c.ingredient_name_local,
      category: c.category,
      submittedJson: c.submitted_json || {},
      sourcePhotos: c.source_photos || [],
      sourceType: c.source_type,
      aiConfidenceScore: c.ai_confidence_score,
      contributorLocale: c.contributor_locale,
      createdAt: c.created_at,
      contributorEmail: c.accounts?.email || '',
      contributorName: c.accounts?.display_name,
      contributorTotalPoints: c.accounts?.contributor_points || 0,
    })),
    total: count || 0,
  };
}

/**
 * Approve a contribution
 */
export async function approveContribution(
  contributionId: string,
  reviewerAccountId: string,
  options?: {
    mergedIntoId?: string;
    isNew?: boolean;
    notes?: string;
  }
): Promise<{ success: boolean; pointsAwarded?: number; error?: string }> {
  // Get contribution details for email
  const { data: contribution } = await supabase()
    .from('ingredient_contributions')
    .select(
      `
      ingredient_name,
      accounts!ingredient_contributions_account_id_fkey (
        email,
        display_name,
        first_name,
        contributor_points
      )
    `
    )
    .eq('id', contributionId)
    .single();

  const { data, error } = await supabase().rpc('approve_ingredient_contribution', {
    p_contribution_id: contributionId,
    p_reviewer_account_id: reviewerAccountId,
    p_merged_into_id: options?.mergedIntoId || null,
    p_is_new: options?.isNew ?? true,
    p_notes: options?.notes || null,
  });

  if (error) {
    console.error('[ContributionAdminService] Approve error:', error);
    return { success: false, error: error.message };
  }

  // Send email notification (async, don't wait)
  if (contribution) {
    const account = contribution.accounts as any;
    sendContributionEmail({
      type: 'approved',
      email: account?.email || '',
      name: account?.display_name || account?.first_name || 'Contributor',
      ingredientName: contribution.ingredient_name,
      pointsEarned: data || 50,
      totalPoints: (account?.contributor_points || 0) + (data || 50),
    }).catch((err) => {
      console.error('[ContributionAdminService] Email failed:', err);
    });
  }

  return { success: true, pointsAwarded: data };
}

/**
 * Reject a contribution
 */
export async function rejectContribution(
  contributionId: string,
  reviewerAccountId: string,
  reason: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  // Get contribution details for email
  const { data: contribution } = await supabase()
    .from('ingredient_contributions')
    .select(
      `
      ingredient_name,
      accounts!ingredient_contributions_account_id_fkey (
        email,
        display_name,
        first_name
      )
    `
    )
    .eq('id', contributionId)
    .single();

  const { error } = await supabase().rpc('reject_ingredient_contribution', {
    p_contribution_id: contributionId,
    p_reviewer_account_id: reviewerAccountId,
    p_reason: reason,
    p_notes: notes || null,
  });

  if (error) {
    console.error('[ContributionAdminService] Reject error:', error);
    return { success: false, error: error.message };
  }

  // Send email notification (async, don't wait)
  if (contribution) {
    const account = contribution.accounts as any;
    sendContributionEmail({
      type: 'rejected',
      email: account?.email || '',
      name: account?.display_name || account?.first_name || 'Contributor',
      ingredientName: contribution.ingredient_name,
      reason: reason,
    }).catch((err) => {
      console.error('[ContributionAdminService] Email failed:', err);
    });
  }

  return { success: true };
}

/**
 * Mark as duplicate
 */
export async function markAsDuplicate(
  contributionId: string,
  reviewerAccountId: string,
  existingIngredientId: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase().rpc('mark_contribution_duplicate', {
    p_contribution_id: contributionId,
    p_reviewer_account_id: reviewerAccountId,
    p_existing_ingredient_id: existingIngredientId,
    p_notes: notes || null,
  });

  if (error) {
    console.error('[ContributionAdminService] Duplicate error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get contribution stats
 */
export async function getContributionStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}> {
  const { data, error } = await supabase().from('ingredient_contributions').select('status');

  if (error) {
    console.error('[ContributionAdminService] Stats error:', error);
    return { pending: 0, approved: 0, rejected: 0, total: 0 };
  }

  const stats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: data?.length || 0,
  };

  data?.forEach((c: any) => {
    if (c.status === 'pending' || c.status === 'in_review') {
      stats.pending++;
    } else if (c.status === 'approved' || c.status === 'merged') {
      stats.approved++;
    } else if (c.status === 'rejected' || c.status === 'duplicate') {
      stats.rejected++;
    }
  });

  return stats;
}

/**
 * Search existing ingredients
 */
export async function searchIngredients(query: string): Promise<{ id: string; name: string }[]> {
  const { data, error } = await supabase()
    .from('ingredients')
    .select('id, name')
    .ilike('name', `%${query}%`)
    .limit(10);

  if (error) {
    console.error('[ContributionAdminService] Search error:', error);
    return [];
  }

  return data || [];
}

// ============================================================================
// EMAIL HELPER
// ============================================================================

interface ContributionEmailParams {
  type: 'approved' | 'rejected';
  email: string;
  name: string;
  ingredientName: string;
  pointsEarned?: number;
  totalPoints?: number;
  reason?: string;
}

async function sendContributionEmail(params: ContributionEmailParams): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn('[ContributionAdminService] Resend API key not configured, skipping email');
    return;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app';

  let html: string;
  let subject: string;

  if (params.type === 'approved') {
    subject = `Il tuo contributo "${params.ingredientName}" è stato approvato! +${params.pointsEarned} punti`;
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GUDBRO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="font-size: 24px; font-weight: bold; color: #111827;">📱 GUDBRO</div>
      </div>

      <div style="padding: 30px 20px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 48px;">🎉</span>
        </div>

        <h1 style="font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px 0; text-align: center;">Contributo Approvato!</h1>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Ciao ${params.name},
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Il tuo contributo per l'ingrediente <strong>"${params.ingredientName}"</strong> è stato approvato e aggiunto al database GUDBRO!
        </p>

        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
          <p style="font-size: 14px; margin: 0; opacity: 0.9;">Punti guadagnati</p>
          <p style="font-size: 36px; font-weight: bold; margin: 8px 0;">+${params.pointsEarned}</p>
          <p style="font-size: 14px; margin: 0; opacity: 0.9;">Totale: ${params.totalPoints} punti</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Grazie per aiutarci a costruire il database alimentare più completo d'Italia!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${BASE_URL}/account/profile" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Vedi i Tuoi Punti</a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} GUDBRO. Tutti i diritti riservati.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  } else {
    subject = `Aggiornamento sul tuo contributo "${params.ingredientName}"`;
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GUDBRO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
        <div style="font-size: 24px; font-weight: bold; color: #111827;">📱 GUDBRO</div>
      </div>

      <div style="padding: 30px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">Contributo Non Approvato</h1>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Ciao ${params.name},
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Purtroppo il tuo contributo per l'ingrediente <strong>"${params.ingredientName}"</strong> non è stato approvato.
        </p>

        ${
          params.reason
            ? `
        <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Motivo:</p>
          <p style="margin: 8px 0 0 0; color: #111827;">${params.reason}</p>
        </div>
        `
            : ''
        }

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;">
          Non scoraggiarti! Puoi sempre provare a contribuire con altri ingredienti.
          Ogni contributo ci aiuta a migliorare.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${BASE_URL}/account/profile" style="display: inline-block; padding: 12px 24px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 14px;">Contribuisci di Nuovo</a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} GUDBRO. Tutti i diritti riservati.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'GUDBRO <noreply@gudbro.com>',
      to: [params.email],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  console.log('[ContributionAdminService] Email sent:', data.id);
}
