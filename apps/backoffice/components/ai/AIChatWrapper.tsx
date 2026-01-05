'use client';

import { useTenant } from '@/lib/contexts/TenantContext';
import { AIChatButton } from './AIChatButton';

/**
 * Wrapper component that provides tenant context to the AI Chat.
 * Place this in the dashboard layout to enable AI Co-Manager globally.
 */
export function AIChatWrapper() {
  const { location, brand, isLoading } = useTenant();

  // Show loading state briefly, but don't block forever
  if (isLoading) {
    return null;
  }

  // Use location.id as the merchantId, or fallback to demo for testing
  // In production, this should always have a real location
  const merchantId = location?.id || 'demo-merchant-id';
  const merchantName = brand?.name || location?.name || 'Demo Business';

  // TODO: Get actual accountId from AuthContext when implemented
  const accountId = 'demo-account-id';

  return <AIChatButton merchantId={merchantId} accountId={accountId} merchantName={merchantName} />;
}
