import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check if user is GudBro admin
 */
async function isGudBroAdmin(accountId: string): Promise<boolean> {
  const { data } = await supabase
    .from('account_roles')
    .select('role_type, permissions')
    .eq('account_id', accountId)
    .eq('role_type', 'admin')
    .eq('is_active', true)
    .single();

  return !!data;
}

/**
 * GET /api/admin/ingredients/contributions/[id]
 * Get single contribution details with similar ingredients
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get contribution with contributor info
    const { data: contribution, error } = await supabase
      .from('ingredient_contributions')
      .select(`
        *,
        accounts!inner(id, email, display_name, avatar_url, contributor_points)
      `)
      .eq('id', id)
      .single();

    if (error || !contribution) {
      return NextResponse.json({ error: 'Contribution not found' }, { status: 404 });
    }

    // Find similar existing ingredients
    const ingredientName = contribution.ingredient_name;
    const { data: similarIngredients } = await supabase
      .from('ingredients')
      .select('id, name, category, nutrition')
      .or(`name.ilike.%${ingredientName}%,name.ilike.${ingredientName.split(' ')[0]}%`)
      .limit(5);

    return NextResponse.json({
      contribution,
      similarIngredients: similarIngredients || [],
    });
  } catch (err) {
    console.error('[AdminContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/ingredients/contributions/[id]
 * Update contribution status (approve, reject, merge)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: adminAccount } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!adminAccount || !(await isGudBroAdmin(adminAccount.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { action, reviewerNotes, rejectionReason, mergeIntoId } = body;

    if (!action || !['approve', 'reject', 'merge', 'mark_duplicate', 'start_review'].includes(action)) {
      return NextResponse.json(
        { error: 'Valid action required: approve, reject, merge, mark_duplicate, start_review' },
        { status: 400 }
      );
    }

    // Get current contribution
    const { data: contribution } = await supabase
      .from('ingredient_contributions')
      .select('*, accounts!inner(id)')
      .eq('id', id)
      .single();

    if (!contribution) {
      return NextResponse.json({ error: 'Contribution not found' }, { status: 404 });
    }

    let newStatus: string;
    let pointsToAward = 0;
    let ingredientId: string | null = null;

    switch (action) {
      case 'start_review':
        newStatus = 'in_review';
        break;

      case 'approve':
        newStatus = 'approved';
        pointsToAward = 50;

        // Create the ingredient in the database
        const submittedJson = contribution.submitted_json;
        const ingredientData = {
          id: `ING_${contribution.ingredient_name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`,
          name: submittedJson.name || contribution.ingredient_name,
          category: submittedJson.category || contribution.category || 'other',
          nutrition: submittedJson.nutrition || {},
          allergens: submittedJson.allergens || [],
          is_vegan: submittedJson.is_vegan || false,
          is_vegetarian: submittedJson.is_vegetarian || false,
          is_gluten_free: submittedJson.is_gluten_free || false,
          origin: submittedJson.origin_country ? { country: submittedJson.origin_country } : null,
          contributed_by: contribution.account_id,
        };

        const { data: newIngredient, error: insertError } = await supabase
          .from('ingredients')
          .insert(ingredientData)
          .select('id')
          .single();

        if (insertError) {
          // If duplicate ID, add suffix
          if (insertError.code === '23505') {
            ingredientData.id = `${ingredientData.id}_${Date.now()}`;
            const { data: retryIngredient, error: retryError } = await supabase
              .from('ingredients')
              .insert(ingredientData)
              .select('id')
              .single();

            if (retryError) {
              console.error('[AdminContributionsAPI] Insert ingredient error:', retryError);
              return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
            }
            ingredientId = retryIngredient.id;
          } else {
            console.error('[AdminContributionsAPI] Insert ingredient error:', insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
          }
        } else {
          ingredientId = newIngredient.id;
        }
        break;

      case 'merge':
        if (!mergeIntoId) {
          return NextResponse.json({ error: 'mergeIntoId required for merge action' }, { status: 400 });
        }
        newStatus = 'merged';
        pointsToAward = 25; // Half points for merge
        ingredientId = mergeIntoId;
        break;

      case 'mark_duplicate':
        newStatus = 'duplicate';
        break;

      case 'reject':
        newStatus = 'rejected';
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update contribution
    const updateData: Record<string, unknown> = {
      status: newStatus,
      reviewed_by: adminAccount.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (reviewerNotes) updateData.reviewer_notes = reviewerNotes;
    if (rejectionReason) updateData.rejection_reason = rejectionReason;
    if (ingredientId) updateData.merged_into_id = ingredientId;
    if (pointsToAward > 0) updateData.points_awarded = pointsToAward;

    const { error: updateError } = await supabase
      .from('ingredient_contributions')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      console.error('[AdminContributionsAPI] Update error:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Award points to contributor if approved or merged
    if (pointsToAward > 0) {
      // Update contributor points
      await supabase.rpc('award_loyalty_points', {
        p_account_id: contribution.account_id,
        p_points: pointsToAward,
        p_points_type: 'contributor',
        p_transaction_type: 'ingredient_contributed',
        p_description: `Ingredient contribution: ${contribution.ingredient_name}`,
        p_reference_type: 'contribution',
        p_reference_id: id,
      });
    }

    return NextResponse.json({
      success: true,
      newStatus,
      pointsAwarded: pointsToAward,
      ingredientId,
    });
  } catch (err) {
    console.error('[AdminContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
