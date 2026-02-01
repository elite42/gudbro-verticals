'use client';

import { useState } from 'react';
import { Plus, X } from '@phosphor-icons/react';

// ============================================================================
// Types
// ============================================================================

interface StructuredPoliciesProps {
  houseRules: string[];
  cancellationPolicy: string | null;
  onChange: (data: { houseRules: string[]; cancellationPolicy: string }) => void;
}

// ============================================================================
// Constants
// ============================================================================

const COMMON_HOUSE_RULES = [
  'No smoking indoors',
  'No pets allowed',
  'Quiet hours: 22:00-08:00',
  'No parties or events',
  'Remove shoes indoors',
  'No outside guests overnight',
  'Keep common areas clean',
  'Separate trash and recycling',
] as const;

const CANCELLATION_OPTIONS = [
  { value: 'flexible', label: 'Flexible', description: 'Free cancellation up to 24h before' },
  { value: 'moderate', label: 'Moderate', description: 'Free cancellation up to 7 days before' },
  { value: 'strict', label: 'Strict', description: '50% refund up to 14 days before' },
  { value: 'non_refundable', label: 'Non-refundable', description: 'No refunds after booking' },
] as const;

// ============================================================================
// Component
// ============================================================================

export default function StructuredPolicies({
  houseRules,
  cancellationPolicy,
  onChange,
}: StructuredPoliciesProps) {
  const [customRuleInput, setCustomRuleInput] = useState('');

  // Separate common rules (checked) from custom rules (user-added)
  const commonRuleValues = COMMON_HOUSE_RULES.map((r) => r as string);
  const customRules = houseRules.filter((r) => !commonRuleValues.includes(r));

  const toggleCommonRule = (rule: string) => {
    const updated = houseRules.includes(rule)
      ? houseRules.filter((r) => r !== rule)
      : [...houseRules, rule];
    onChange({ houseRules: updated, cancellationPolicy: cancellationPolicy || '' });
  };

  const addCustomRule = () => {
    const trimmed = customRuleInput.trim();
    if (!trimmed || houseRules.includes(trimmed)) return;
    onChange({
      houseRules: [...houseRules, trimmed],
      cancellationPolicy: cancellationPolicy || '',
    });
    setCustomRuleInput('');
  };

  const removeCustomRule = (rule: string) => {
    onChange({
      houseRules: houseRules.filter((r) => r !== rule),
      cancellationPolicy: cancellationPolicy || '',
    });
  };

  const handleCancellationChange = (value: string) => {
    onChange({ houseRules, cancellationPolicy: value });
  };

  return (
    <div className="space-y-6">
      {/* House Rules - Checkboxes */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">House Rules</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {COMMON_HOUSE_RULES.map((rule) => (
            <label
              key={rule}
              className="has-[:checked]:border-blue-300 has-[:checked]:bg-blue-50 flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={houseRules.includes(rule)}
                onChange={() => toggleCommonRule(rule)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{rule}</span>
            </label>
          ))}
        </div>

        {/* Custom rules */}
        {customRules.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {customRules.map((rule) => (
              <span
                key={rule}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {rule}
                <button
                  type="button"
                  onClick={() => removeCustomRule(rule)}
                  className="rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" weight="bold" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add custom rule */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={customRuleInput}
            onChange={(e) => setCustomRuleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomRule();
              }
            }}
            placeholder="Add a custom rule..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addCustomRule}
            disabled={!customRuleInput.trim()}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Cancellation Policy - Dropdown */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Cancellation Policy</label>
        <select
          value={cancellationPolicy || ''}
          onChange={(e) => handleCancellationChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a policy...</option>
          {CANCELLATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} - {opt.description}
            </option>
          ))}
        </select>
        {cancellationPolicy && (
          <p className="mt-1 text-xs text-gray-500">
            {CANCELLATION_OPTIONS.find((o) => o.value === cancellationPolicy)?.description}
          </p>
        )}
      </div>
    </div>
  );
}
