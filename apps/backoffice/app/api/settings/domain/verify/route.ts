import { NextRequest, NextResponse } from 'next/server';
import { verifyDomainOwnership, checkVercelStatus } from '@/lib/domain-resolution-service';

/**
 * POST /api/settings/domain/verify
 * Verify domain ownership via DNS
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // Verify domain ownership
    const verified = await verifyDomainOwnership(domain);

    if (verified) {
      // Check Vercel status as well
      const vercelStatus = await checkVercelStatus(domain);

      return NextResponse.json({
        verified: true,
        sslReady: vercelStatus.sslReady,
        configured: vercelStatus.configured,
      });
    }

    return NextResponse.json({
      verified: false,
      error:
        'DNS records not found. Please ensure your CNAME or TXT record is properly configured.',
    });
  } catch (error) {
    console.error('[API Domain Verify] Error:', error);
    return NextResponse.json(
      { error: 'Verification failed. Please try again later.' },
      { status: 500 }
    );
  }
}
