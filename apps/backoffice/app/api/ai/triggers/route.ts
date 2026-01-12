import { NextRequest, NextResponse } from 'next/server';
import {
  getMerchantTriggers,
  getTrigger,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  getTriggerPerformance,
  getTriggerExecutions,
  runMerchantTriggers,
  runTriggerForAllCustomers,
  suggestTriggers,
  type TriggerType,
  type ExecutionStatus,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/triggers - Get triggers or trigger data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const triggerId = searchParams.get('triggerId');
    const action = searchParams.get('action') || 'list';

    if (!merchantId && !triggerId) {
      return NextResponse.json(
        { error: 'Missing required field: merchantId or triggerId' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'get': {
        if (!triggerId) {
          return NextResponse.json({ error: 'Missing required field: triggerId' }, { status: 400 });
        }
        const trigger = await getTrigger(triggerId);
        if (!trigger) {
          return NextResponse.json({ error: 'Trigger not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, trigger });
      }

      case 'performance': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }
        const performance = await getTriggerPerformance(merchantId);
        return NextResponse.json({ success: true, performance });
      }

      case 'executions': {
        if (!triggerId) {
          return NextResponse.json({ error: 'Missing required field: triggerId' }, { status: 400 });
        }
        const status = searchParams.get('status') as ExecutionStatus | null;
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const result = await getTriggerExecutions(triggerId, {
          status: status || undefined,
          limit: limit ? parseInt(limit, 10) : undefined,
          offset: offset ? parseInt(offset, 10) : undefined,
        });

        return NextResponse.json({
          success: true,
          executions: result.executions,
          total: result.total,
        });
      }

      case 'suggestions': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }
        const suggestions = await suggestTriggers(merchantId);
        return NextResponse.json({ success: true, suggestions });
      }

      case 'list':
      default: {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }
        const isActive = searchParams.get('isActive');
        const triggerType = searchParams.get('triggerType') as TriggerType | null;
        const limit = searchParams.get('limit');

        const triggers = await getMerchantTriggers(merchantId, {
          isActive: isActive ? isActive === 'true' : undefined,
          triggerType: triggerType || undefined,
          limit: limit ? parseInt(limit, 10) : undefined,
        });

        return NextResponse.json({ success: true, triggers });
      }
    }
  } catch (error) {
    console.error('Triggers GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/triggers - Create trigger or run triggers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'create': {
        const {
          name,
          description,
          triggerType,
          conditions,
          actionType,
          actionConfig,
          cooldownDays,
          maxTriggersPerCustomer,
          targetSegments,
          excludeSegments,
          minClv,
          maxClv,
          isActive,
          priority,
          createdByAccountId,
        } = body;

        if (!name || !triggerType || !actionType) {
          return NextResponse.json(
            { error: 'Missing required fields: name, triggerType, actionType' },
            { status: 400 }
          );
        }

        const trigger = await createTrigger(merchantId, {
          name,
          description: description || null,
          triggerType,
          conditions: conditions || {},
          actionType,
          actionConfig: actionConfig || {},
          cooldownDays: cooldownDays || 30,
          maxTriggersPerCustomer: maxTriggersPerCustomer || null,
          targetSegments: targetSegments || [],
          excludeSegments: excludeSegments || [],
          minClv: minClv || null,
          maxClv: maxClv || null,
          isActive: isActive !== undefined ? isActive : true,
          priority: priority || 50,
          createdByAccountId: createdByAccountId || null,
        });

        if (!trigger) {
          return NextResponse.json({ error: 'Failed to create trigger' }, { status: 500 });
        }

        return NextResponse.json({ success: true, trigger });
      }

      case 'run-all': {
        // Run all active triggers for merchant
        const result = await runMerchantTriggers(merchantId);
        return NextResponse.json({
          success: true,
          message: `Processed ${result.processed} customers, triggered ${result.triggered}, ${result.errors} errors`,
          ...result,
        });
      }

      case 'run-one': {
        const { triggerId } = body;
        if (!triggerId) {
          return NextResponse.json({ error: 'Missing required field: triggerId' }, { status: 400 });
        }

        const trigger = await getTrigger(triggerId);
        if (!trigger) {
          return NextResponse.json({ error: 'Trigger not found' }, { status: 404 });
        }

        const result = await runTriggerForAllCustomers(trigger);
        return NextResponse.json({
          success: true,
          message: `Processed ${result.processed} customers, triggered ${result.triggered}, ${result.errors} errors`,
          ...result,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use 'create', 'run-all', or 'run-one'` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Triggers POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/triggers - Update a trigger
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { triggerId, ...updates } = body;

    if (!triggerId) {
      return NextResponse.json({ error: 'Missing required field: triggerId' }, { status: 400 });
    }

    const trigger = await updateTrigger(triggerId, updates);

    if (!trigger) {
      return NextResponse.json({ error: 'Failed to update trigger' }, { status: 500 });
    }

    return NextResponse.json({ success: true, trigger });
  } catch (error) {
    console.error('Triggers PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/ai/triggers - Delete a trigger
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const triggerId = searchParams.get('triggerId');

    if (!triggerId) {
      return NextResponse.json({ error: 'Missing required field: triggerId' }, { status: 400 });
    }

    const success = await deleteTrigger(triggerId);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete trigger' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Triggers DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
