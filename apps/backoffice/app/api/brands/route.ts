import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface CreateBrandRequest {
  organizationId: string;
  name: string;
  description?: string;
  businessType: 'fnb' | 'hotel' | 'rental' | 'wellness' | 'other';
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export async function POST(request: Request) {
  try {
    const body: CreateBrandRequest = await request.json();

    // Validate required fields
    if (!body.organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      );
    }

    // Create slug from name
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug exists globally and make unique
    const { data: existing } = await supabase
      .from('brands')
      .select('slug')
      .like('slug', `${baseSlug}%`);

    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }

    // Insert brand
    const { data, error } = await supabase
      .from('brands')
      .insert({
        organization_id: body.organizationId,
        name: body.name,
        slug,
        description: body.description || null,
        business_type: body.businessType || 'fnb',
        logo_url: body.logoUrl || null,
        primary_color: body.primaryColor || '#000000',
        secondary_color: body.secondaryColor || null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating brand:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      brand: data,
      message: 'Brand created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/brands:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const organizationId = searchParams.get('organization_id');
  const businessType = searchParams.get('business_type');
  const isActive = searchParams.get('is_active');
  const withLocations = searchParams.get('with_locations') === 'true';
  const withOrganization = searchParams.get('with_organization') === 'true';

  let selectQuery = '*';
  if (withLocations && withOrganization) {
    selectQuery = '*, locations(*), organization:organizations(*)';
  } else if (withLocations) {
    selectQuery = '*, locations(*)';
  } else if (withOrganization) {
    selectQuery = '*, organization:organizations(*)';
  }

  let query = supabase
    .from('brands')
    .select(selectQuery);

  if (id) {
    query = query.eq('id', id);
  }

  if (slug) {
    query = query.eq('slug', slug);
  }

  if (organizationId) {
    query = query.eq('organization_id', organizationId);
  }

  if (businessType) {
    query = query.eq('business_type', businessType);
  }

  if (isActive !== null) {
    query = query.eq('is_active', isActive === 'true');
  } else {
    // Default to active brands
    query = query.eq('is_active', true);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Single item request
  if (id || slug) {
    return NextResponse.json({
      brand: data?.[0] || null
    });
  }

  return NextResponse.json({
    brands: data,
    total: data?.length || 0
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.businessType !== undefined) dbUpdates.business_type = updates.businessType;
    if (updates.logoUrl !== undefined) dbUpdates.logo_url = updates.logoUrl;
    if (updates.primaryColor !== undefined) dbUpdates.primary_color = updates.primaryColor;
    if (updates.secondaryColor !== undefined) dbUpdates.secondary_color = updates.secondaryColor;
    if (updates.defaultMenuId !== undefined) dbUpdates.default_menu_id = updates.defaultMenuId;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('brands')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating brand:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      brand: data,
      message: 'Brand updated successfully'
    });

  } catch (error) {
    console.error('Error in PATCH /api/brands:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    // Soft delete - set is_active to false
    const { data, error } = await supabase
      .from('brands')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting brand:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      brand: data,
      message: 'Brand deactivated successfully'
    });

  } catch (error) {
    console.error('Error in DELETE /api/brands:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
