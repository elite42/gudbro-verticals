import { NextResponse } from 'next/server';
import {
  checkOnboardingStatus,
  updateOrganization,
  updateBrand,
  updateLocation,
  createOrganization,
  createBrand,
  createLocation,
} from '@/lib/ai/onboarding-service';

export const dynamic = 'force-dynamic';

/**
 * GET - Check onboarding status
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const locationId = searchParams.get('locationId');

    if (!merchantId && !locationId) {
      return NextResponse.json({ error: 'merchantId or locationId is required' }, { status: 400 });
    }

    const status = await checkOnboardingStatus(merchantId || '', locationId || undefined);

    return NextResponse.json({
      status,
      message: status.isComplete
        ? 'Onboarding complete!'
        : `Onboarding ${status.completionPercentage}% complete`,
    });
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return NextResponse.json({ error: 'Failed to check onboarding status' }, { status: 500 });
  }
}

/**
 * POST - Execute onboarding action
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'update_organization_info': {
        const { organizationId, ...updates } = params;
        if (!organizationId) {
          return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
        }
        result = await updateOrganization(organizationId, updates);
        break;
      }

      case 'update_brand_info': {
        const { brandId, ...updates } = params;
        if (!brandId) {
          return NextResponse.json({ error: 'brandId is required' }, { status: 400 });
        }
        result = await updateBrand(brandId, updates);
        break;
      }

      case 'update_location_info': {
        const { locationId, ...updates } = params;
        if (!locationId) {
          return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
        }
        result = await updateLocation(locationId, updates);
        break;
      }

      case 'create_organization': {
        const { name, type } = params;
        if (!name) {
          return NextResponse.json({ error: 'Organization name is required' }, { status: 400 });
        }
        result = await createOrganization({ name, type });
        break;
      }

      case 'create_brand': {
        const { organizationId, name, business_type, description, primary_color } = params;
        if (!organizationId || !name || !business_type) {
          return NextResponse.json(
            { error: 'organizationId, name, and business_type are required' },
            { status: 400 }
          );
        }
        result = await createBrand(organizationId, {
          name,
          business_type,
          description,
          primary_color,
        });
        break;
      }

      case 'create_location': {
        const { brandId, name, country_code, city, address, primary_language } = params;
        if (!brandId || !name || !country_code) {
          return NextResponse.json(
            { error: 'brandId, name, and country_code are required' },
            { status: 400 }
          );
        }
        result = await createLocation(brandId, {
          name,
          country_code,
          city,
          address,
          primary_language,
        });
        break;
      }

      case 'check_onboarding_progress': {
        const { merchantId, locationId } = params;
        const status = await checkOnboardingStatus(merchantId || '', locationId);
        result = {
          success: true,
          message: `Onboarding is ${status.completionPercentage}% complete`,
          data: status,
        };
        break;
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in onboarding action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
