import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeInventory,
  updateStock,
  generatePurchaseOrder,
  generateNegotiationDraft,
  findSuppliers,
  getInventoryData,
  addInventoryItem,
  addSupplier,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/inventory - Get inventory data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const analyze = searchParams.get('analyze') === 'true';

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (analyze) {
      const analysis = await analyzeInventory(merchantId);
      return NextResponse.json({
        success: true,
        ...analysis,
      });
    }

    const data = await getInventoryData(merchantId);
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('AI Inventory GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/inventory - Various inventory actions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'add_item': {
        const item = await addInventoryItem(merchantId, params);
        return NextResponse.json({
          success: true,
          item,
        });
      }

      case 'update_stock': {
        const { itemId, adjustment, reason } = params;

        if (!itemId || adjustment === undefined) {
          return NextResponse.json(
            { error: 'Missing required fields: itemId, adjustment' },
            { status: 400 }
          );
        }

        await updateStock(itemId, adjustment, reason || 'Manual adjustment');

        return NextResponse.json({
          success: true,
          message: `Stock updated by ${adjustment}`,
        });
      }

      case 'add_supplier': {
        const supplier = await addSupplier(merchantId, params);
        return NextResponse.json({
          success: true,
          supplier,
        });
      }

      case 'find_suppliers': {
        const { category, location } = params;

        if (!category) {
          return NextResponse.json({ error: 'Missing required field: category' }, { status: 400 });
        }

        const result = await findSuppliers(merchantId, category, location);
        return NextResponse.json({
          success: true,
          ...result,
        });
      }

      case 'purchase_order': {
        const { supplierId, itemIds } = params;

        if (!supplierId || !itemIds || !Array.isArray(itemIds)) {
          return NextResponse.json(
            { error: 'Missing required fields: supplierId, itemIds[]' },
            { status: 400 }
          );
        }

        const order = await generatePurchaseOrder(merchantId, supplierId, itemIds);
        return NextResponse.json({
          success: true,
          order,
        });
      }

      case 'negotiate': {
        const { supplierId, type, context } = params;

        if (!supplierId || !type) {
          return NextResponse.json(
            { error: 'Missing required fields: supplierId, type' },
            { status: 400 }
          );
        }

        const draft = await generateNegotiationDraft(merchantId, supplierId, type, context || {});

        return NextResponse.json({
          success: true,
          draft,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: add_item, update_stock, add_supplier, find_suppliers, purchase_order, or negotiate',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Inventory POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
