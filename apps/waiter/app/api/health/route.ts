import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 *
 * Returns the status of the waiter app.
 * Used by monitoring services and load balancers.
 */

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'waiter',
    timestamp: new Date().toISOString(),
  });
}
