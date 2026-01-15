import { NextRequest, NextResponse } from 'next/server';
import {
  registerDomain,
  removeDomain,
  getDomainConfig,
  verifyDomainOwnership,
} from '@/lib/domain-resolution-service';

/**
 * GET /api/settings/domain
 * Get current domain configuration
 */
export async function GET(request: NextRequest) {
  try {
    // In production, get entityType and entityId from session/context
    // For now, we'll use query params
    const { searchParams } = new URL(request.url);
    const entityType = (searchParams.get('entityType') as 'brand' | 'location') || 'brand';
    const entityId = searchParams.get('entityId') || '';
    const organizationId = searchParams.get('organizationId') || undefined;

    if (!entityId) {
      return NextResponse.json({ error: 'Entity ID required' }, { status: 400 });
    }

    const config = await getDomainConfig(entityType, entityId, organizationId);

    return NextResponse.json(config);
  } catch (error) {
    console.error('[API Domain] GET error:', error);
    return NextResponse.json({ error: 'Failed to get domain config' }, { status: 500 });
  }
}

/**
 * POST /api/settings/domain
 * Add a new custom domain
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, entityType = 'brand', entityId, organizationId } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // In production, entityId would come from authenticated session
    if (!entityId) {
      return NextResponse.json({ error: 'Entity ID is required' }, { status: 400 });
    }

    const result = await registerDomain(domain, entityType, entityId, organizationId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      domain: result.domain,
      verificationToken: result.verificationToken,
    });
  } catch (error) {
    console.error('[API Domain] POST error:', error);
    return NextResponse.json({ error: 'Failed to register domain' }, { status: 500 });
  }
}

/**
 * DELETE /api/settings/domain
 * Remove a custom domain
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const success = await removeDomain(domain);

    if (!success) {
      return NextResponse.json({ error: 'Failed to remove domain' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API Domain] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to remove domain' }, { status: 500 });
  }
}
