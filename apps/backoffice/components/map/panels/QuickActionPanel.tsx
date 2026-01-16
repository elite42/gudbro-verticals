'use client';

/**
 * QuickActionPanel Component
 *
 * Slide-over panel with quick actions for map entities.
 * Supports: wallet top-up, loyalty points, promo assignment, contact.
 */

import { useState } from 'react';
import {
  X,
  User,
  Star,
  Wallet,
  Gift,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Check,
  Loader2,
} from 'lucide-react';
import type { MapEntity, CustomerEntity } from '../hooks/useMapData';

interface QuickActionPanelProps {
  entity: MapEntity;
  merchantId: string;
  onClose: () => void;
}

const WALLET_AMOUNTS = [10, 20, 50, 100];
const POINTS_AMOUNTS = [50, 100, 200, 500];

export function QuickActionPanel({ entity, merchantId, onClose }: QuickActionPanelProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [addBonus, setAddBonus] = useState(true);
  const [notes, setNotes] = useState('');

  // Only show for customers
  if (entity.type !== 'customer') {
    return null;
  }

  const customer = entity as CustomerEntity;

  const handleWalletTopUp = async (amountEuros: number) => {
    setIsLoading(true);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/quick-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'wallet_topup',
          target_account_id: customer.id,
          merchant_id: merchantId,
          amount_cents: amountEuros * 100,
          add_bonus: addBonus,
          notes: notes || `Quick top-up from map`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to top up wallet');
      }

      setSuccessMessage(`Added €${amountEuros} to wallet!`);
      setActiveAction(null);
    } catch (error) {
      console.error('Wallet top-up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePointsAward = async (points: number) => {
    setIsLoading(true);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/quick-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'loyalty_award',
          target_account_id: customer.id,
          merchant_id: merchantId,
          points,
          reason: notes || 'Quick bonus from map',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to award points');
      }

      setSuccessMessage(`Awarded ${points} points!`);
      setActiveAction(null);
    } catch (error) {
      console.error('Points award failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    at_risk: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    churned: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 transition-opacity" onClick={onClose} />

      {/* Panel */}
      <div className="absolute bottom-0 right-0 top-0 w-96 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{customer.name}</h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[customer.status]}`}
                  >
                    {customer.status === 'at_risk' ? 'At Risk' : customer.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {customer.tier}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Customer stats */}
          <div className="grid grid-cols-3 gap-4 border-b border-gray-200 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {customer.points_balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                €{(customer.wallet_balance_cents / 100).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">Wallet</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{customer.order_count}</p>
              <p className="text-xs text-gray-500">Orders</p>
            </div>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700">
              <Check className="h-5 w-5" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          )}

          {/* Quick actions */}
          <div className="flex-1 overflow-auto p-4">
            {/* Wallet Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Wallet className="h-4 w-4 text-blue-500" />
                Wallet Top-up
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {WALLET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleWalletTopUp(amount)}
                    disabled={isLoading}
                    className="rounded-lg border border-gray-200 py-2 text-sm font-medium hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                  >
                    +€{amount}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={addBonus}
                    onChange={(e) => setAddBonus(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Add 10% bonus
                </label>
              </div>
            </div>

            {/* Points Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Star className="h-4 w-4 text-yellow-500" />
                Award Points
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {POINTS_AMOUNTS.map((points) => (
                  <button
                    key={points}
                    onClick={() => handlePointsAward(points)}
                    disabled={isLoading}
                    className="rounded-lg border border-gray-200 py-2 text-sm font-medium hover:border-yellow-500 hover:bg-yellow-50 disabled:opacity-50"
                  >
                    +{points}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Gift className="h-4 w-4 text-purple-500" />
                Assign Promo
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-purple-500 hover:bg-purple-50">
                  <span className="font-medium">10% Off</span>
                  <span className="block text-xs text-gray-500">Next order</span>
                </button>
                <button className="rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-purple-500 hover:bg-purple-50">
                  <span className="font-medium">Free Drink</span>
                  <span className="block text-xs text-gray-500">Any drink</span>
                </button>
                <button className="rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-purple-500 hover:bg-purple-50">
                  <span className="font-medium">Free Dessert</span>
                  <span className="block text-xs text-gray-500">Selected</span>
                </button>
                <button className="rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-purple-500 hover:bg-purple-50">
                  <span className="font-medium">Custom...</span>
                  <span className="block text-xs text-gray-500">Create new</span>
                </button>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MessageCircle className="h-4 w-4 text-green-500" />
                Contact
              </h3>
              <div className="space-y-2">
                {customer.phone && (
                  <a
                    href={`https://wa.me/${customer.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-green-500 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>WhatsApp</span>
                    <span className="ml-auto text-gray-500">{customer.phone}</span>
                  </a>
                )}
                {customer.email && (
                  <a
                    href={`mailto:${customer.email}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Email</span>
                    <span className="ml-auto truncate text-gray-500">{customer.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note for this action..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none"
                rows={2}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <a
              href={`/customers/${customer.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Profile
            </a>
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
