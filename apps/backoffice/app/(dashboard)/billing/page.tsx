'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Plan {
  id: string;
  name: string;
  price: number;
  priceYearly: number;
  currency: string;
  features: string[];
  limits: {
    qrCodes: number | 'unlimited';
    scans: number | 'unlimited';
    teamMembers: number | 'unlimited';
    languages: number | 'unlimited';
  };
  isCurrent?: boolean;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceYearly: 0,
    currency: 'USD',
    features: [
      'Up to 3 QR codes',
      '1,000 scans/month',
      'Basic analytics',
      '2 languages',
      'GUDBRO branding',
    ],
    limits: {
      qrCodes: 3,
      scans: 1000,
      teamMembers: 1,
      languages: 2,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    priceYearly: 290,
    currency: 'USD',
    features: [
      'Up to 20 QR codes',
      '10,000 scans/month',
      'Full analytics',
      '6 languages',
      'Remove GUDBRO branding',
      'Email support',
    ],
    limits: {
      qrCodes: 20,
      scans: 10000,
      teamMembers: 3,
      languages: 6,
    },
    isCurrent: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    priceYearly: 790,
    currency: 'USD',
    features: [
      'Unlimited QR codes',
      'Unlimited scans',
      'Advanced analytics',
      'All 16 languages',
      'AI translations included',
      'Priority support',
      'API access',
    ],
    limits: {
      qrCodes: 'unlimited',
      scans: 'unlimited',
      teamMembers: 10,
      languages: 'unlimited',
    },
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: -1,
    priceYearly: -1,
    currency: 'USD',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
    limits: {
      qrCodes: 'unlimited',
      scans: 'unlimited',
      teamMembers: 'unlimited',
      languages: 'unlimited',
    },
  },
];

const invoices = [
  { id: 'INV-001', date: '2024-01-01', amount: 29, status: 'paid' },
  { id: 'INV-002', date: '2024-02-01', amount: 29, status: 'paid' },
  { id: 'INV-003', date: '2024-03-01', amount: 29, status: 'pending' },
];

export default function BillingPage() {
  const t = useTranslations('billingPage');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const currentPlan = plans.find((p) => p.isCurrent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200">Current Plan</p>
            <h2 className="text-2xl font-bold">{currentPlan?.name || 'Free'}</h2>
            <p className="mt-1 text-blue-100">
              ${currentPlan?.price || 0}/month • Renews on March 1, 2024
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-200">Usage this month</p>
            <div className="mt-1">
              <span className="text-2xl font-bold">847</span>
              <span className="text-blue-200">
                {' '}
                / {currentPlan?.limits.scans?.toLocaleString() || '1,000'} scans
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-blue-500">
            <div className="h-full rounded-full bg-white" style={{ width: '84.7%' }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-blue-200">84.7% used</span>
            <span className="text-blue-200">153 scans remaining</span>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">QR Codes</p>
          <p className="text-2xl font-bold text-gray-900">
            4 <span className="text-sm font-normal text-gray-500">/ 20</span>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Monthly Scans</p>
          <p className="text-2xl font-bold text-gray-900">
            847 <span className="text-sm font-normal text-gray-500">/ 10K</span>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="text-2xl font-bold text-gray-900">
            2 <span className="text-sm font-normal text-gray-500">/ 3</span>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Languages</p>
          <p className="text-2xl font-bold text-gray-900">
            3 <span className="text-sm font-normal text-gray-500">/ 6</span>
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Change Plan</h3>
            <p className="text-sm text-gray-500">Choose the plan that works best for you</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                billingPeriod === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Yearly <span className="text-green-600">-17%</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-4 ${
                plan.isCurrent
                  ? 'border-blue-600 bg-blue-50'
                  : plan.isPopular
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <span className="mb-2 inline-block rounded bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}
              {plan.isCurrent && (
                <span className="mb-2 inline-block rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                  Current Plan
                </span>
              )}

              <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
              <div className="mt-2">
                {plan.price === -1 ? (
                  <span className="text-2xl font-bold text-gray-900">Custom</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-gray-900">
                      ${billingPeriod === 'yearly' ? Math.round(plan.priceYearly / 12) : plan.price}
                    </span>
                    <span className="text-gray-500">/mo</span>
                  </>
                )}
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-4 w-full rounded-lg py-2 text-sm font-medium ${
                  plan.isCurrent
                    ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                    : plan.isPopular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={plan.isCurrent}
              >
                {plan.isCurrent ? 'Current Plan' : plan.price === -1 ? 'Contact Sales' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Payment Method</h3>
        <p className="text-sm text-gray-500">Manage your payment information</p>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-12 items-center justify-center rounded bg-gradient-to-r from-blue-600 to-blue-800 text-xs font-bold text-white">
              VISA
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/25</p>
            </div>
          </div>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Update
          </button>
        </div>

        <button className="mt-4 text-sm text-blue-600 hover:text-blue-700">
          + Add backup payment method
        </button>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Invoices</h3>
            <p className="text-sm text-gray-500">Download your past invoices</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-3 font-mono text-sm">{invoice.id}</td>
                  <td className="py-3 text-sm text-gray-600">{invoice.date}</td>
                  <td className="py-3 text-sm font-medium">${invoice.amount}.00</td>
                  <td className="py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-700">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Billing Information</h3>
        <p className="text-sm text-gray-500">This will appear on your invoices</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              defaultValue="ROOTS Plant-Based Cafe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax ID</label>
            <input
              type="text"
              placeholder="Optional"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input
              type="text"
              defaultValue="123 Nguyen Van Linh, Da Nang, Vietnam"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
