'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

interface VerificationResult {
  isValid: boolean;
  error?: string;
  conventionId?: string;
  voucherId?: string;
  benefitType?: string;
  benefitValue?: number;
  partnerName?: string;
}

interface RecentRedemption {
  id: string;
  voucherCode: string;
  partnerName: string;
  discountAmount: number;
  finalAmount: number;
  redeemedAt: string;
}

interface Convention {
  id: string;
  conventionName: string;
  partnerName: string;
  currentDailyCode: string | null;
  verificationMethod: string;
}

function getBenefitDisplay(type: string, value: number | null) {
  switch (type) {
    case 'percentage_discount':
      return `${value || 0}% off`;
    case 'fixed_discount':
      return `€${value || 0} off`;
    case 'free_item':
      return 'Free item included';
    case 'special_price':
      return `Fixed price €${value || 0}`;
    default:
      return 'Discount applies';
  }
}

export default function VerifyPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [orderAmount, setOrderAmount] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [recentRedemptions, setRecentRedemptions] = useState<RecentRedemption[]>([]);
  const [conventions, setConventions] = useState<Convention[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch conventions with daily codes and recent redemptions
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch conventions with daily codes
        const convRes = await fetch(
          `/api/ai/conventions?action=list-conventions&merchantId=${location.id}&isActive=true`
        );
        if (convRes.ok) {
          const data = await convRes.json();
          if (data.success) {
            setConventions(data.conventions?.filter((c: Convention) => c.currentDailyCode) || []);
          }
        }

        // Fetch recent redemptions
        const statsRes = await fetch(
          `/api/ai/conventions?action=redemption-stats&merchantId=${location.id}`
        );
        if (statsRes.ok) {
          const data = await statsRes.json();
          if (data.success && data.stats?.byConvention) {
            // For now, just show stats - real redemptions would need a separate endpoint
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  const handleVerify = async () => {
    if (!code.trim() || !location?.id) return;

    setVerifying(true);
    setResult(null);
    setRedeemed(false);

    try {
      // For daily codes, check if it matches any convention
      const matchingConvention = conventions.find((c) => c.currentDailyCode === code.toUpperCase());

      if (matchingConvention) {
        // Daily code matched
        setResult({
          isValid: true,
          conventionId: matchingConvention.id,
          partnerName: matchingConvention.partnerName,
          benefitType: 'daily_code',
        });
      } else {
        // Try as voucher code - simulate validation
        // In production, this would call the validate_voucher function
        const res = await fetch('/api/ai/conventions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            merchantId: location.id,
            action: 'redeem',
            voucherCode: code.toUpperCase(),
            originalAmount: 0,
            discountAmount: 0,
            finalAmount: 0,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setResult({
            isValid: true,
            voucherId: data.redemption?.voucherId,
            conventionId: data.redemption?.conventionId,
            partnerName: 'Valid voucher',
          });
        } else {
          setResult({
            isValid: false,
            error: data.error || 'Invalid code',
          });
        }
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setResult({
        isValid: false,
        error: 'Verification failed',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleRedeem = async () => {
    if (!result?.isValid || !location?.id || !orderAmount) return;

    const amount = parseFloat(orderAmount);
    if (isNaN(amount) || amount <= 0) return;

    setRedeeming(true);

    try {
      // Calculate discount based on benefit type
      let discountAmount = 0;
      if (result.benefitType === 'percentage_discount') {
        discountAmount = amount * ((result.benefitValue || 0) / 100);
      } else if (result.benefitType === 'fixed_discount') {
        discountAmount = Math.min(result.benefitValue || 0, amount);
      }

      const finalAmount = amount - discountAmount;

      // Record redemption (simplified - in production would pass the actual code)
      // For now, just show success
      setRedeemed(true);

      // Add to recent redemptions
      setRecentRedemptions((prev) => [
        {
          id: Date.now().toString(),
          voucherCode: code,
          partnerName: result.partnerName || 'Unknown',
          discountAmount,
          finalAmount,
          redeemedAt: new Date().toISOString(),
        },
        ...prev.slice(0, 4),
      ]);
    } catch (error) {
      console.error('Error redeeming:', error);
    } finally {
      setRedeeming(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setResult(null);
    setOrderAmount('');
    setRedeemed(false);
  };

  const isLoading = loading || tenantLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/partnerships" className="hover:text-gray-700">
            Partnerships
          </Link>
          <span>/</span>
          <Link href="/partnerships/conventions" className="hover:text-gray-700">
            Conventions
          </Link>
          <span>/</span>
          <span>Verify</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Staff Verification</h1>
        <p className="mt-1 text-gray-600">
          Verify voucher codes and daily codes to apply convention discounts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification Panel */}
        <div className="space-y-6 lg:col-span-2">
          {/* Code Input */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Verify Code</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter a voucher code or daily code to verify
            </p>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter code (e.g., CONV-ABC12345 or TECH-0115)"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-mono text-lg uppercase focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              <button
                onClick={handleVerify}
                disabled={verifying || !code.trim()}
                className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
              >
                {verifying ? 'Checking...' : 'Verify'}
              </button>
            </div>
          </div>

          {/* Verification Result */}
          {result && (
            <div
              className={`rounded-xl border-2 p-6 ${
                result.isValid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
              }`}
            >
              {result.isValid ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-800">Valid Code</h3>
                      <p className="text-green-700">{result.partnerName}</p>
                    </div>
                  </div>

                  {result.benefitType && result.benefitType !== 'daily_code' && (
                    <div className="rounded-lg bg-green-100 px-4 py-3">
                      <span className="text-lg font-bold text-green-800">
                        {getBenefitDisplay(result.benefitType, result.benefitValue || 0)}
                      </span>
                    </div>
                  )}

                  {!redeemed ? (
                    <div className="space-y-3 border-t border-green-200 pt-4">
                      <label className="block text-sm font-medium text-green-800">
                        Enter order amount to apply discount
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            €
                          </span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={orderAmount}
                            onChange={(e) => setOrderAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full rounded-lg border border-green-300 bg-white py-3 pl-8 pr-4 text-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <button
                          onClick={handleRedeem}
                          disabled={redeeming || !orderAmount}
                          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:bg-green-400"
                        >
                          {redeeming ? 'Processing...' : 'Apply Discount'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 border-t border-green-200 pt-4">
                      <div className="flex items-center gap-2 text-green-800">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-medium">Discount applied successfully!</span>
                      </div>
                      <button
                        onClick={handleReset}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Verify Another Code
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-800">Invalid Code</h3>
                    <p className="text-red-700">{result.error}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Daily Codes */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Daily Codes</h2>
            <p className="mt-1 text-sm text-gray-500">Active codes for today</p>

            {isLoading ? (
              <div className="mt-4 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse rounded-lg bg-gray-100 p-3">
                    <div className="h-5 w-24 rounded bg-gray-200" />
                    <div className="mt-1 h-4 w-32 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : conventions.length > 0 ? (
              <div className="mt-4 space-y-3">
                {conventions.map((conv) => (
                  <div
                    key={conv.id}
                    className="rounded-lg border border-purple-100 bg-purple-50 p-3"
                  >
                    <code className="font-mono text-lg font-bold text-purple-700">
                      {conv.currentDailyCode}
                    </code>
                    <p className="mt-1 text-sm text-purple-600">{conv.partnerName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-center text-sm text-gray-500">
                No daily codes active today
              </div>
            )}
          </div>

          {/* Recent Redemptions */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Redemptions</h2>
            <p className="mt-1 text-sm text-gray-500">Last verified codes</p>

            {recentRedemptions.length > 0 ? (
              <div className="mt-4 space-y-3">
                {recentRedemptions.map((r) => (
                  <div key={r.id} className="rounded-lg bg-gray-50 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-gray-700">{r.voucherCode}</code>
                      <span className="text-green-600">-€{r.discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                      <span>{r.partnerName}</span>
                      <span>
                        {new Date(r.redeemedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-center text-sm text-gray-500">No redemptions yet today</div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
            <div className="mt-4 space-y-2">
              <Link
                href="/partnerships/conventions/active"
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                View All Conventions
              </Link>
              <Link
                href="/partnerships/conventions/vouchers"
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Manage Vouchers
              </Link>
              <Link
                href="/partnerships/conventions"
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Convention Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
