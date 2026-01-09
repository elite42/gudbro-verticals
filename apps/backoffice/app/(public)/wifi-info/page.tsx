'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function WiFiInfoContent() {
  const searchParams = useSearchParams();
  const ssid = searchParams.get('ssid') || 'Unknown Network';
  const merchantName = searchParams.get('merchant');
  const menuUrl = searchParams.get('menu');

  const [copied, setCopied] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const copySSID = async () => {
    try {
      await navigator.clipboard.writeText(ssid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = ssid;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-4 text-6xl">📶</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">WiFi Connection</h1>
        <p className="mb-6 text-gray-600">
          {merchantName
            ? `Connect to ${merchantName}'s WiFi network`
            : 'Connect to the WiFi network'}
        </p>

        {/* Network name with copy */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-sm text-gray-500">Network Name (SSID)</p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-lg font-semibold text-gray-900">{ssid}</span>
            <button
              onClick={copySSID}
              className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Connection instructions */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="mb-2 font-medium">How to connect:</p>
          <ol className="list-inside list-decimal space-y-1 text-left">
            <li>Open your phone&apos;s Camera app</li>
            <li>Point it at the WiFi QR code</li>
            <li>Tap the notification to connect</li>
          </ol>
        </div>

        {/* Manual connection */}
        <button
          onClick={() => setShowTroubleshooting(!showTroubleshooting)}
          className="mb-4 text-sm font-medium text-blue-600 hover:underline"
        >
          {showTroubleshooting ? 'Hide' : 'Show'} manual connection steps
        </button>

        {showTroubleshooting && (
          <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left text-sm">
            <p className="mb-2 font-medium text-gray-700">Manual Connection:</p>
            <ol className="list-inside list-decimal space-y-2 text-gray-600">
              <li>
                Go to <strong>Settings</strong> → <strong>WiFi</strong>
              </li>
              <li>
                Find &quot;<span className="font-mono">{ssid}</span>&quot; in the list
              </li>
              <li>Tap to connect</li>
              <li>Enter the password (ask staff if needed)</li>
            </ol>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 font-medium text-gray-700">QR not working?</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Make sure camera has permission to scan QR codes</li>
                <li>• Try a QR scanner app from your app store</li>
                <li>• Some older phones don&apos;t support WiFi QR codes</li>
              </ul>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-3">
          {/* View menu while waiting */}
          {menuUrl && (
            <a
              href={menuUrl}
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Browse Menu While You Wait
            </a>
          )}

          {/* Go to home */}
          <a href="/" className="block text-sm text-gray-500 hover:text-gray-700">
            Go to Home
          </a>
        </div>

        {/* Merchant branding */}
        {merchantName && (
          <p className="mt-8 text-sm text-gray-400">WiFi provided by {merchantName}</p>
        )}
      </div>
    </div>
  );
}

function WiFiInfoLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">📶</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">WiFi Connection</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function WiFiInfoPage() {
  return (
    <Suspense fallback={<WiFiInfoLoading />}>
      <WiFiInfoContent />
    </Suspense>
  );
}
