'use client';

import { useTenant } from '@/lib/contexts/TenantContext';
import { useAI } from '@/lib/contexts/AIContext';
import { AIChatPanel } from './AIChatPanel';

/**
 * Wrapper component that provides tenant context to the AI Chat.
 * Place this in the dashboard layout to enable AI Co-Manager globally.
 *
 * The AI chat opens as a sidebar from the right side of the screen,
 * triggered by the button in the Header.
 */
export function AIChatWrapper() {
  const { location, brand, isLoading } = useTenant();
  const { isOpen, closeAI } = useAI();

  // Show loading state briefly, but don't block forever
  if (isLoading) {
    return null;
  }

  // Use location.id as the merchantId, or fallback to demo for testing
  const merchantId = location?.id || 'demo-merchant-id';
  const merchantName = brand?.name || location?.name || 'Demo Business';

  // TODO: Get actual accountId from AuthContext when implemented
  const accountId = 'demo-account-id';

  return (
    <AIChatPanel
      merchantId={merchantId}
      accountId={accountId}
      merchantName={merchantName}
      isOpen={isOpen}
      onClose={closeAI}
      position="sidebar"
    />
  );
}
