import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface CreateLocationRequest {
  brandId: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  currencyCode: string;
  primaryLanguage: string;
  enabledLanguages: string[];
  timezone?: string;
  phone?: string;
  email?: string;
  menuId?: string;
  operatingHours?: Record<string, { open: string; close: string }>;
}

export async function POST(request: Request) {
  try {
    const body: CreateLocationRequest = await request.json();

    // Validate required fields
    if (!body.brandId) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        { error: 'Location name is required' },
        { status: 400 }
      );
    }

    if (!body.countryCode) {
      return NextResponse.json(
        { error: 'Country code is required' },
        { status: 400 }
      );
    }

    if (!body.primaryLanguage) {
      return NextResponse.json(
        { error: 'Primary language is required' },
        { status: 400 }
      );
    }

    // Create slug from name (unique within brand)
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug exists within this brand
    const { data: existing } = await supabase
      .from('locations')
      .select('slug')
      .eq('brand_id', body.brandId)
      .like('slug', `${baseSlug}%`);

    let slug = baseSlug;
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`;
    }

    // Insert location
    const { data, error } = await supabase
      .from('locations')
      .insert({
        brand_id: body.brandId,
        name: body.name,
        slug,
        description: body.description || null,
        address: body.address || null,
        city: body.city || null,
        postal_code: body.postalCode || null,
        country_code: body.countryCode,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        currency_code: body.currencyCode || 'USD',
        primary_language: body.primaryLanguage,
        enabled_languages: body.enabledLanguages || [body.primaryLanguage],
        timezone: body.timezone || null,
        phone: body.phone || null,
        email: body.email || null,
        menu_id: body.menuId || null,
        operating_hours: body.operatingHours || null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating location:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      location: data,
      message: 'Location created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/locations:', error);
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
  const brandId = searchParams.get('brand_id');
  const countryCode = searchParams.get('country_code');
  const city = searchParams.get('city');
  const isActive = searchParams.get('is_active');
  const withBrand = searchParams.get('with_brand') === 'true';

  let selectQuery = '*';
  if (withBrand) {
    selectQuery = '*, brand:brands(*, organization:organizations(*))';
  }

  let query = supabase
    .from('locations')
    .select(selectQuery);

  if (id) {
    query = query.eq('id', id);
  }

  if (slug && brandId) {
    // Slug is unique within brand, so need both
    query = query.eq('slug', slug).eq('brand_id', brandId);
  }

  if (brandId) {
    query = query.eq('brand_id', brandId);
  }

  if (countryCode) {
    query = query.eq('country_code', countryCode);
  }

  if (city) {
    query = query.ilike('city', `%${city}%`);
  }

  if (isActive !== null) {
    query = query.eq('is_active', isActive === 'true');
  } else {
    // Default to active locations
    query = query.eq('is_active', true);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Single item request
  if (id) {
    return NextResponse.json({
      location: data?.[0] || null
    });
  }

  return NextResponse.json({
    locations: data,
    total: data?.length || 0
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 400 }
      );
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.address !== undefined) dbUpdates.address = updates.address;
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.postalCode !== undefined) dbUpdates.postal_code = updates.postalCode;
    if (updates.countryCode !== undefined) dbUpdates.country_code = updates.countryCode;
    if (updates.latitude !== undefined) dbUpdates.latitude = updates.latitude;
    if (updates.longitude !== undefined) dbUpdates.longitude = updates.longitude;
    if (updates.currencyCode !== undefined) dbUpdates.currency_code = updates.currencyCode;
    if (updates.primaryLanguage !== undefined) dbUpdates.primary_language = updates.primaryLanguage;
    if (updates.enabledLanguages !== undefined) dbUpdates.enabled_languages = updates.enabledLanguages;
    if (updates.timezone !== undefined) dbUpdates.timezone = updates.timezone;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.email !== undefined) dbUpdates.email = updates.email;
    if (updates.menuId !== undefined) dbUpdates.menu_id = updates.menuId;
    if (updates.operatingHours !== undefined) dbUpdates.operating_hours = updates.operatingHours;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('locations')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating location:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      location: data,
      message: 'Location updated successfully'
    });

  } catch (error) {
    console.error('Error in PATCH /api/locations:', error);
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
        { error: 'Location ID is required' },
        { status: 400 }
      );
    }

    // Soft delete - set is_active to false
    const { data, error } = await supabase
      .from('locations')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting location:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      location: data,
      message: 'Location deactivated successfully'
    });

  } catch (error) {
    console.error('Error in DELETE /api/locations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
