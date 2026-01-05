import { NextRequest, NextResponse } from 'next/server';
import {
  createWorkflow,
  executeWorkflow,
  getWorkflows,
  getExecutions,
  toggleWorkflow,
  createDefaultWorkflows,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/workflows - Get workflows or executions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const type = searchParams.get('type') || 'definitions'; // definitions or executions
    const workflowId = searchParams.get('workflowId');
    const status = searchParams.get('status') as any;
    const isActive = searchParams.get('isActive');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (type === 'executions') {
      const executions = await getExecutions(merchantId, {
        workflowId: workflowId || undefined,
        status,
        limit,
      });

      return NextResponse.json({
        success: true,
        executions,
        count: executions.length,
      });
    }

    const workflows = await getWorkflows(merchantId, {
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    });

    return NextResponse.json({
      success: true,
      workflows,
      count: workflows.length,
    });
  } catch (error) {
    console.error('AI Workflows GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/workflows - Create or execute workflow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'create': {
        const { name, description, trigger, triggerConfig, steps, isActive } = params;

        if (!name || !trigger || !steps) {
          return NextResponse.json(
            { error: 'Missing required fields: name, trigger, steps' },
            { status: 400 }
          );
        }

        const workflow = await createWorkflow(merchantId, {
          merchantId,
          name,
          description,
          trigger,
          triggerConfig,
          steps,
          isActive: isActive || false,
        });

        return NextResponse.json({
          success: true,
          workflow,
        });
      }

      case 'execute': {
        const { workflowId, context } = params;

        if (!workflowId) {
          return NextResponse.json(
            { error: 'Missing required field: workflowId' },
            { status: 400 }
          );
        }

        const execution = await executeWorkflow(workflowId, merchantId, 'manual', context || {});

        return NextResponse.json({
          success: true,
          execution,
        });
      }

      case 'create_defaults': {
        const workflows = await createDefaultWorkflows(merchantId);

        return NextResponse.json({
          success: true,
          workflows,
          count: workflows.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create, execute, or create_defaults' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Workflows POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/workflows - Toggle workflow status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowId, isActive } = body;

    if (!workflowId || isActive === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: workflowId, isActive' },
        { status: 400 }
      );
    }

    await toggleWorkflow(workflowId, isActive);

    return NextResponse.json({
      success: true,
      message: `Workflow ${isActive ? 'activated' : 'deactivated'}`,
    });
  } catch (error) {
    console.error('AI Workflows PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
