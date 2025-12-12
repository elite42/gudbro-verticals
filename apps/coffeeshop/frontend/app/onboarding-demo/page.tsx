'use client';

import { useState } from 'react';
import { WelcomeModal } from '@/components/WelcomeModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Onboarding Demo Page
 *
 * Test page for the WelcomeModal component.
 * Allows testing different configurations and states.
 *
 * Access: http://localhost:3004/onboarding-demo
 */
export default function OnboardingDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('12');

  const openModal = () => {
    // Clear localStorage to simulate first visit
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gudbro_onboarding_completed');
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Onboarding Demo
          </h1>
          <p className="text-gray-600">
            Test the WelcomeModal with all features
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ✨ New Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Single Screen</strong> - No multi-step friction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Language + Currency</strong> - Dropdowns side-by-side</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>WiFi Credentials</strong> - With QR code generator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Quick Actions</strong> - Share location, Call staff</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Auth CTA</strong> - Login/Signup for loyalty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Backoffice Config</strong> - 100% customizable</span>
              </li>
            </ul>
          </Card>

          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎯 Customer Journey
            </h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li><strong>Scan QR Code</strong> - Customer arrives at table</li>
              <li><strong>See Welcome</strong> - Venue name + table number</li>
              <li><strong>Quick Settings</strong> - Language + Currency</li>
              <li><strong>Get WiFi</strong> - Connect immediately</li>
              <li><strong>Quick Actions</strong> - Share with friends, Call staff</li>
              <li><strong>Optional Login</strong> - For loyalty & preferences</li>
              <li><strong>Go to Menu</strong> - Start ordering</li>
            </ol>
          </Card>
        </div>

        {/* Controls */}
        <Card variant="default" padding="lg" className="mb-8 bg-white">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Test Controls
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table Number
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="12"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              className="w-full sm:w-auto"
            >
              Open Welcome Modal
            </Button>
          </div>
        </Card>

        {/* Config Info */}
        <Card variant="ghost" padding="lg" className="bg-blue-50 border border-blue-200">
          <h3 className="text-sm font-bold text-blue-900 mb-2">
            ℹ️ Configuration
          </h3>
          <p className="text-xs text-blue-800 mb-2">
            Default config is loaded from <code className="bg-blue-100 px-1 py-0.5 rounded">lib/venue-config.ts</code>
          </p>
          <p className="text-xs text-blue-800">
            In production, this will be fetched from API per venue ID.
            Backoffice will allow customizing all settings.
          </p>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to App
          </a>
          <span className="mx-3 text-gray-400">|</span>
          <a href="/design-system" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Design System →
          </a>
        </div>
      </div>

      {/* Modal */}
      <WelcomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginClick={() => alert('Login clicked - implement auth modal')}
        onSignupClick={() => alert('Signup clicked - implement auth modal')}
        tableNumber={tableNumber}
      />
    </div>
  );
}
