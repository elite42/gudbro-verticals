import { NextRequest, NextResponse } from 'next/server';
import {
  generateDelegatedTasks,
  createTask,
  updateTaskStatus,
  provideTaskFeedback,
  getTasks,
  analyzeTaskPerformance,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/tasks - Get tasks or analysis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const type = searchParams.get('type') || 'list'; // list or analysis
    const status = searchParams.get('status') as any;
    const category = searchParams.get('category') as any;
    const priority = searchParams.get('priority') as any;
    const includeCompleted = searchParams.get('includeCompleted') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (type === 'analysis') {
      const analysis = await analyzeTaskPerformance(merchantId);
      return NextResponse.json({
        success: true,
        analysis,
      });
    }

    const tasks = await getTasks(merchantId, {
      status,
      category,
      priority,
      includeCompleted,
      limit,
    });

    return NextResponse.json({
      success: true,
      tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error('AI Tasks GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/tasks - Generate or create tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'generate': {
        // AI generates tasks based on current state
        const tasks = await generateDelegatedTasks(merchantId);

        return NextResponse.json({
          success: true,
          tasks,
          count: tasks.length,
        });
      }

      case 'create': {
        // Manually create a task
        const {
          title,
          description,
          category,
          priority,
          dueDate,
          assignedTo,
          assignedRole,
          estimatedMinutes,
        } = params;

        if (!title) {
          return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 });
        }

        const task = await createTask(merchantId, {
          title,
          description,
          category,
          priority,
          dueDate,
          assignedTo,
          assignedRole,
          estimatedMinutes,
          createdBy: 'manual',
        });

        return NextResponse.json({
          success: true,
          task,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: generate or create' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Tasks POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/tasks - Update task status or feedback
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, action, ...params } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Missing required field: taskId' }, { status: 400 });
    }

    switch (action) {
      case 'status': {
        const { status, completionNotes } = params;

        if (!status) {
          return NextResponse.json({ error: 'Missing required field: status' }, { status: 400 });
        }

        await updateTaskStatus(taskId, status, completionNotes);

        return NextResponse.json({
          success: true,
          message: `Task status updated to ${status}`,
        });
      }

      case 'feedback': {
        const { wasHelpful } = params;

        if (wasHelpful === undefined) {
          return NextResponse.json(
            { error: 'Missing required field: wasHelpful' },
            { status: 400 }
          );
        }

        await provideTaskFeedback(taskId, wasHelpful);

        return NextResponse.json({
          success: true,
          message: 'Feedback recorded',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: status or feedback' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Tasks PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
