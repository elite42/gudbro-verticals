import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

interface CreateOrganizationRequest {
  name: string;
  type: 'standard' | 'enterprise';
  partnerId?: string;
  subscriptionPlan?: 'free' | 'menu_only' | 'starter' | 'pro';
  billingEmail?: string;
  billingAddress?: string;
  taxId?: string;
}

export async function POST(request: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateOrganizationRequest = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 });
    }

    // Create slug from name
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug exists and make unique if needed
    const { data: existing } = await supabase
      .from('organizations')
      .select('slug')
      .like('slug', `${baseSlug}%`);

    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }

    // Insert organization
    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name: body.name,
        slug,
        type: body.type || 'standard',
        partner_id: body.partnerId || null,
        subscription_plan: body.subscriptionPlan || 'free',
        subscription_status: 'active',
        billing_email: body.billingEmail || null,
        billing_address: body.billingAddress || null,
        tax_id: body.taxId || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating organization:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        organization: data,
        message: 'Organization created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/organizations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Auth check
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');
  const partnerId = searchParams.get('partner_id');
  const status = searchParams.get('status');
  const withBrands = searchParams.get('with_brands') === 'true';

  let query = supabase.from('organizations').select(withBrands ? '*, brands(*)' : '*');

  if (id) {
    query = query.eq('id', id);
  }

  if (slug) {
    query = query.eq('slug', slug);
  }

  if (type) {
    query = query.eq('type', type);
  }

  if (partnerId) {
    query = query.eq('partner_id', partnerId);
  }

  if (status) {
    query = query.eq('status', status);
  } else {
    // Default to active organizations
    query = query.eq('status', 'active');
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Single item request
  if (id || slug) {
    return NextResponse.json({
      organization: data?.[0] || null,
    });
  }

  return NextResponse.json({
    organizations: data,
    total: data?.length || 0,
  });
}

export async function PATCH(request: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.partnerId !== undefined) dbUpdates.partner_id = updates.partnerId;
    if (updates.subscriptionPlan !== undefined)
      dbUpdates.subscription_plan = updates.subscriptionPlan;
    if (updates.subscriptionStatus !== undefined)
      dbUpdates.subscription_status = updates.subscriptionStatus;
    if (updates.billingEmail !== undefined) dbUpdates.billing_email = updates.billingEmail;
    if (updates.billingAddress !== undefined) dbUpdates.billing_address = updates.billingAddress;
    if (updates.taxId !== undefined) dbUpdates.tax_id = updates.taxId;
    if (updates.stripeCustomerId !== undefined)
      dbUpdates.stripe_customer_id = updates.stripeCustomerId;
    if (updates.status !== undefined) dbUpdates.status = updates.status;

    const { data, error } = await supabase
      .from('organizations')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating organization:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      organization: data,
      message: 'Organization updated successfully',
    });
  } catch (error) {
    console.error('Error in PATCH /api/organizations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
