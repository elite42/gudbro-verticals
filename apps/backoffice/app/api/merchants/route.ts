import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

interface CreateMerchantRequest {
  businessType: 'fnb' | 'hotel' | 'airbnb' | 'other';
  businessName: string;
  businessDescription?: string;
  address?: string;
  city?: string;
  countryCode: string;
  currencyCode: string;
  primaryLanguage: string;
  enabledLanguages: string[];
  phone?: string;
  email?: string;
  logo?: string;
  primaryColor?: string;
}

export async function POST(request: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateMerchantRequest = await request.json();

    // Validate required fields
    if (!body.businessName) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 });
    }

    if (!body.countryCode) {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 });
    }

    if (!body.primaryLanguage) {
      return NextResponse.json({ error: 'Primary language is required' }, { status: 400 });
    }

    // Create slug from business name
    const slug = body.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Insert merchant
    const { data, error } = await supabase
      .from('merchants')
      .insert({
        name: body.businessName,
        slug,
        description: body.businessDescription || null,
        business_type: body.businessType,
        address: body.address || null,
        city: body.city || null,
        country_code: body.countryCode,
        currency_code: body.currencyCode,
        primary_language: body.primaryLanguage,
        enabled_languages: body.enabledLanguages,
        phone: body.phone || null,
        email: body.email || null,
        logo_url: body.logo || null,
        primary_color: body.primaryColor || '#000000',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating merchant:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        merchant: data,
        message: 'Merchant created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/merchants:', error);
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
  const slug = searchParams.get('slug');

  let query = supabase.from('merchants').select('*').eq('is_active', true);

  if (slug) {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    merchants: data,
    total: data?.length || 0,
  });
}
