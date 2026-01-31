import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type {
  ApiResponse,
  ServiceCategoryWithItems,
  ServiceCategoryResponseWithTimezone,
  ServiceItemResponse,
} from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * Extract and verify guest JWT from Authorization header
 * @returns Guest payload { bookingId, propertyId } or null
 */
async function authenticateGuest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  if (!token) return null;

  try {
    return await verifyGuestToken(token);
  } catch {
    return null;
  }
}

/**
 * GET /api/stay/[code]/services
 *
 * Protected endpoint returning property services organized by category.
 * Each category contains its active service items with pricing.
 *
 * Requires valid guest JWT token. propertyId is extracted from the token
 * payload, NOT from the URL code parameter (security: token is source of truth).
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch property timezone
    const { data: propertyData, error: propertyError } = await supabase
      .from('accom_properties')
      .select('timezone')
      .eq('id', guest.propertyId)
      .single();

    if (propertyError) {
      console.error('GET /api/stay/[code]/services property query error:', propertyError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const timezone = propertyData?.timezone || 'UTC';

    const { data, error } = await supabase
      .from('accom_service_categories')
      .select(
        `
        id, name, icon, description, sort_order, automation_level,
        accom_service_items(
          id, name, description, price, currency, price_type, image, in_stock, is_active, sort_order,
          is_always_available, available_from, available_until
        )
      `
      )
      .eq('property_id', guest.propertyId)
      .eq('is_active', true)
      .order('sort_order');

    if (error) {
      console.error('GET /api/stay/[code]/services query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Map DB rows to camelCase response types
    // Filter out inactive items and sort by sort_order
    const categories: ServiceCategoryWithItems[] = (data || []).map((cat) => {
      const rawItems = (cat.accom_service_items as unknown as Array<Record<string, unknown>>) || [];

      const items: ServiceItemResponse[] = rawItems
        .filter((item) => item.is_active !== false)
        .sort((a, b) => ((a.sort_order as number) || 0) - ((b.sort_order as number) || 0))
        .map((item) => ({
          id: item.id as string,
          name: item.name as string,
          description: (item.description as string) || null,
          price: item.price as number,
          currency: item.currency as string,
          priceType: item.price_type as string,
          image: (item.image as string) || null,
          inStock: item.in_stock as boolean,
          isAlwaysAvailable: item.is_always_available as boolean,
          availableFrom: (item.available_from as string) || null,
          availableUntil: (item.available_until as string) || null,
        }));

      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon || null,
        description: cat.description || null,
        sortOrder: cat.sort_order,
        automationLevel: (cat as unknown as Record<string, unknown>).automation_level as string,
        items,
      };
    });

    return NextResponse.json<ApiResponse<ServiceCategoryResponseWithTimezone>>({
      data: { categories, timezone },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/services error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
