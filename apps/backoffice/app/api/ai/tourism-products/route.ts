import { NextRequest, NextResponse } from 'next/server';
import {
  getProductTemplates,
  getProductTemplate,
  getTemplateVenueTypes,
  getMerchantProducts,
  getMerchantProduct,
  createMerchantProduct,
  updateMerchantProduct,
  toggleProductAvailability,
  deleteMerchantProduct,
  getResolvedProducts,
  suggestProducts,
  getProductStats,
  bulkCreateProducts,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/tourism-products - Get templates, merchant products, or stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'merchant-products';
    const merchantId = searchParams.get('merchantId');

    switch (action) {
      case 'templates': {
        const venueType = searchParams.get('venueType') || undefined;
        const templates = await getProductTemplates(venueType);

        return NextResponse.json({
          success: true,
          templates,
          count: templates.length,
        });
      }

      case 'template': {
        const templateId = searchParams.get('templateId');

        if (!templateId) {
          return NextResponse.json(
            { error: 'Missing required field: templateId' },
            { status: 400 }
          );
        }

        const template = await getProductTemplate(templateId);

        return NextResponse.json({
          success: true,
          template,
        });
      }

      case 'venue-types': {
        const venueTypes = await getTemplateVenueTypes();

        return NextResponse.json({
          success: true,
          venueTypes,
        });
      }

      case 'merchant-products': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const activeOnly = searchParams.get('activeOnly') === 'true';
        const products = await getMerchantProducts(merchantId, { activeOnly });

        return NextResponse.json({
          success: true,
          products,
          count: products.length,
        });
      }

      case 'merchant-product': {
        const productId = searchParams.get('productId');

        if (!productId) {
          return NextResponse.json({ error: 'Missing required field: productId' }, { status: 400 });
        }

        const product = await getMerchantProduct(productId);

        return NextResponse.json({
          success: true,
          product,
        });
      }

      case 'resolved-products': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const activeOnly = searchParams.get('activeOnly') === 'true';
        const products = await getResolvedProducts(merchantId, { activeOnly });

        return NextResponse.json({
          success: true,
          products,
          count: products.length,
        });
      }

      case 'suggestions': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const venueType = searchParams.get('venueType');

        if (!venueType) {
          return NextResponse.json({ error: 'Missing required field: venueType' }, { status: 400 });
        }

        const suggestions = await suggestProducts(merchantId, venueType);

        return NextResponse.json({
          success: true,
          suggestions,
          count: suggestions.length,
        });
      }

      case 'stats': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const stats = await getProductStats(merchantId);

        return NextResponse.json({
          success: true,
          stats,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: templates, template, venue-types, merchant-products, merchant-product, resolved-products, suggestions, or stats',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Products GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/tourism-products - Create product or bulk create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'create': {
        const {
          templateId,
          customName,
          customPrice,
          customDuration,
          customMinGroup,
          customMaxGroup,
          customDescription,
          customIncludes,
          availableDays,
          availableSlots,
          maxPerDay,
        } = params;

        if (!templateId) {
          return NextResponse.json(
            { error: 'Missing required field: templateId' },
            { status: 400 }
          );
        }

        const product = await createMerchantProduct(merchantId, templateId, {
          customName,
          customPrice,
          customDuration,
          customMinGroup,
          customMaxGroup,
          customDescription,
          customIncludes,
          availableDays,
          availableSlots,
          maxPerDay,
        });

        if (!product) {
          return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          product,
        });
      }

      case 'bulk-create': {
        const { templateIds, defaults } = params;

        if (!templateIds || !Array.isArray(templateIds) || templateIds.length === 0) {
          return NextResponse.json(
            { error: 'Missing required field: templateIds (array)' },
            { status: 400 }
          );
        }

        const result = await bulkCreateProducts(merchantId, templateIds, defaults);

        return NextResponse.json({
          success: true,
          created: result.created,
          errors: result.errors,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create or bulk-create' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Products POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/tourism-products - Update product or toggle availability
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, action, ...params } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Missing required field: productId' }, { status: 400 });
    }

    switch (action) {
      case 'update': {
        const {
          customName,
          customPrice,
          customDuration,
          customMinGroup,
          customMaxGroup,
          customDescription,
          customIncludes,
          availableDays,
          availableSlots,
          maxPerDay,
          isActive,
        } = params;

        const success = await updateMerchantProduct(productId, {
          customName,
          customPrice,
          customDuration,
          customMinGroup,
          customMaxGroup,
          customDescription,
          customIncludes,
          availableDays,
          availableSlots,
          maxPerDay,
          isActive,
        });

        return NextResponse.json({
          success,
          message: success ? 'Product updated' : 'Failed to update product',
        });
      }

      case 'toggle': {
        const { isActive } = params;

        if (isActive === undefined) {
          return NextResponse.json({ error: 'Missing required field: isActive' }, { status: 400 });
        }

        const success = await toggleProductAvailability(productId, isActive);

        return NextResponse.json({
          success,
          message: success ? 'Product availability toggled' : 'Failed to toggle availability',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: update or toggle' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Products PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/ai/tourism-products - Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Missing required field: productId' }, { status: 400 });
    }

    const success = await deleteMerchantProduct(productId);

    return NextResponse.json({
      success,
      message: success ? 'Product deleted' : 'Failed to delete product',
    });
  } catch (error) {
    console.error('Tourism Products DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
