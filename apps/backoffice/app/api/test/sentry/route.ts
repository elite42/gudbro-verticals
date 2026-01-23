/**
 * Sentry Test Endpoint
 *
 * Generates a controlled error to verify Sentry integration.
 * Protected: requires CRON_SECRET or only works in development.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Protection: only allow with secret or in development
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.CRON_SECRET;

  const isAuthorized =
    process.env.NODE_ENV === 'development' ||
    (expectedSecret && authHeader === `Bearer ${expectedSecret}`);

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const testType = request.nextUrl.searchParams.get('type') || 'error';
  const timestamp = new Date().toISOString();

  try {
    if (testType === 'error') {
      // This will be caught and logged, then sent to Sentry via captureConsoleIntegration
      throw new Error(`[Sentry Test] Controlled error at ${timestamp}`);
    }

    if (testType === 'unhandled') {
      // Simulate an unhandled scenario
      const obj: Record<string, unknown> = {};
      // @ts-expect-error - Intentional error for testing
      return obj.nonExistent.property;
    }

    return NextResponse.json({
      success: true,
      message: 'No error generated',
      type: testType,
      timestamp,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // This console.error will be captured by Sentry's captureConsoleIntegration
    console.error('[Sentry Test] Test error generated:', error);

    return NextResponse.json(
      {
        success: true,
        message: 'Test error generated and sent to Sentry',
        error: errorMessage,
        timestamp,
        note: 'Check Sentry dashboard for this error',
      },
      { status: 200 } // Return 200 because the test succeeded
    );
  }
}

export async function POST(request: NextRequest) {
  // Same protection
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.CRON_SECRET;

  const isAuthorized =
    process.env.NODE_ENV === 'development' ||
    (expectedSecret && authHeader === `Bearer ${expectedSecret}`);

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const customMessage = body.message || 'Custom test error';

    throw new Error(`[Sentry Test] ${customMessage} at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('[Sentry Test] Custom error:', error);

    return NextResponse.json({
      success: true,
      message: 'Custom test error sent to Sentry',
      timestamp: new Date().toISOString(),
    });
  }
}
