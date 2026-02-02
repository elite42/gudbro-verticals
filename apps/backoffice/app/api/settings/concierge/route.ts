import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// Default sections when column is null
const DEFAULT_SECTIONS = {
  discover: true,
  emergency: true,
  safety: true,
  culture: true,
  transport: true,
};

const VALID_KEYS = ['discover', 'emergency', 'safety', 'culture', 'transport'] as const;

// ============================================================================
// GET - Fetch concierge section toggles for a property
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Find the property for this merchant
    const { data: property, error } = await supabase
      .from('accom_properties')
      .select('id, concierge_sections')
      .eq('merchant_id', merchantId)
      .limit(1)
      .single();

    if (error || !property) {
      console.error('Error fetching concierge settings:', error);
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      sections: property.concierge_sections ?? DEFAULT_SECTIONS,
    });
  } catch (error) {
    console.error('Error in GET /api/settings/concierge:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update concierge section toggles
// ============================================================================

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { merchantId, sections } = body;

    if (!merchantId || !sections) {
      return NextResponse.json({ error: 'merchantId and sections are required' }, { status: 400 });
    }

    // Validate sections object has exactly the 5 expected boolean keys
    for (const key of VALID_KEYS) {
      if (typeof sections[key] !== 'boolean') {
        return NextResponse.json({ error: `sections.${key} must be a boolean` }, { status: 400 });
      }
    }

    // Only keep valid keys (strip any extra)
    const cleanSections: Record<string, boolean> = {};
    for (const key of VALID_KEYS) {
      cleanSections[key] = sections[key];
    }

    // Find property for merchant and update
    const { data: property, error: findError } = await supabase
      .from('accom_properties')
      .select('id, merchant_id')
      .eq('merchant_id', merchantId)
      .limit(1)
      .single();

    if (findError || !property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (property.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { error: updateError } = await supabase
      .from('accom_properties')
      .update({ concierge_sections: cleanSections })
      .eq('id', property.id);

    if (updateError) {
      console.error('Error updating concierge settings:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ sections: cleanSections });
  } catch (error) {
    console.error('Error in PUT /api/settings/concierge:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
