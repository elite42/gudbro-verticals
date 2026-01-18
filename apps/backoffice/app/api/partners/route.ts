import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface CreatePartnerRequest {
  name: string;
  territoryType: 'country' | 'region' | 'city';
  territoryCodes: string[];
  isExclusive?: boolean;
  royaltyPct?: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  billingEmail?: string;
  billingAddress?: string;
  taxId?: string;
}

export async function POST(request: Request) {
  try {
    const body: CreatePartnerRequest = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Partner name is required' }, { status: 400 });
    }

    if (!body.territoryType) {
      return NextResponse.json({ error: 'Territory type is required' }, { status: 400 });
    }

    if (!body.territoryCodes || body.territoryCodes.length === 0) {
      return NextResponse.json(
        { error: 'At least one territory code is required' },
        { status: 400 }
      );
    }

    // Create slug from name
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug exists
    const { data: existing } = await supabase
      .from('partners')
      .select('slug')
      .like('slug', `${baseSlug}%`);

    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }

    // Insert partner
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: body.name,
        slug,
        territory_type: body.territoryType,
        territory_codes: body.territoryCodes,
        is_exclusive: body.isExclusive ?? true,
        royalty_pct: body.royaltyPct ?? 20.0,
        contact_name: body.contactName || null,
        contact_email: body.contactEmail || null,
        contact_phone: body.contactPhone || null,
        billing_email: body.billingEmail || null,
        billing_address: body.billingAddress || null,
        tax_id: body.taxId || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        partner: data,
        message: 'Partner created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/partners:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const countryCode = searchParams.get('country_code');
    const territoryType = searchParams.get('territory_type');
    const status = searchParams.get('status');
    const withOrganizations = searchParams.get('with_organizations') === 'true';

    let selectQuery = '*';
    if (withOrganizations) {
      selectQuery = '*, organizations(*)';
    }

    let query = supabase.from('partners').select(selectQuery);

    if (id) {
      query = query.eq('id', id);
    }

    if (slug) {
      query = query.eq('slug', slug);
    }

    // Find partner for a specific country
    if (countryCode) {
      query = query.contains('territory_codes', [countryCode]);
    }

    if (territoryType) {
      query = query.eq('territory_type', territoryType);
    }

    if (status) {
      query = query.eq('status', status);
    } else {
      // Default to active partners
      query = query.eq('status', 'active');
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: { code: 'DATABASE_ERROR', message: error.message } },
        { status: 500 }
      );
    }

    // Single item request
    if (id || slug) {
      return NextResponse.json({
        partner: data?.[0] || null,
      });
    }

    return NextResponse.json({
      partners: data,
      total: data?.length || 0,
    });
  } catch (error) {
    console.error('Error in GET /api/partners:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Partner ID is required' }, { status: 400 });
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.territoryType !== undefined) dbUpdates.territory_type = updates.territoryType;
    if (updates.territoryCodes !== undefined) dbUpdates.territory_codes = updates.territoryCodes;
    if (updates.isExclusive !== undefined) dbUpdates.is_exclusive = updates.isExclusive;
    if (updates.royaltyPct !== undefined) dbUpdates.royalty_pct = updates.royaltyPct;
    if (updates.contactName !== undefined) dbUpdates.contact_name = updates.contactName;
    if (updates.contactEmail !== undefined) dbUpdates.contact_email = updates.contactEmail;
    if (updates.contactPhone !== undefined) dbUpdates.contact_phone = updates.contactPhone;
    if (updates.billingEmail !== undefined) dbUpdates.billing_email = updates.billingEmail;
    if (updates.billingAddress !== undefined) dbUpdates.billing_address = updates.billingAddress;
    if (updates.taxId !== undefined) dbUpdates.tax_id = updates.taxId;
    if (updates.status !== undefined) dbUpdates.status = updates.status;

    const { data, error } = await supabase
      .from('partners')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating partner:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      partner: data,
      message: 'Partner updated successfully',
    });
  } catch (error) {
    console.error('Error in PATCH /api/partners:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
