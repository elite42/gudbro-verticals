'use client';

import { useState } from 'react';
import { Bank, Copy, Check, Info } from '@phosphor-icons/react';
import { formatPrice } from '@/lib/price-utils';
import type { BankTransferInfo } from '@/types/property';

interface BankTransferInstructionsProps {
  bankInfo: BankTransferInfo;
  amount: number;
  currency: string;
  bookingCode: string;
}

export default function BankTransferInstructions({
  bankInfo,
  amount,
  currency,
  bookingCode,
}: BankTransferInstructionsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const rows: { label: string; value: string; copyable?: boolean; copyKey?: string }[] = [
    { label: 'Bank', value: bankInfo.bank_name },
    { label: 'Account Holder', value: bankInfo.account_holder },
    {
      label: 'Account Number',
      value: bankInfo.account_number,
      copyable: true,
      copyKey: 'account',
    },
  ];

  if (bankInfo.swift_code) {
    rows.push({ label: 'SWIFT Code', value: bankInfo.swift_code });
  }

  rows.push({
    label: 'Amount',
    value: formatPrice(amount, currency),
    copyable: true,
    copyKey: 'amount',
  });

  rows.push({
    label: 'Reference',
    value: bookingCode,
    copyable: true,
    copyKey: 'reference',
  });

  return (
    <div className="border-border bg-background mx-auto max-w-sm rounded-xl border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Bank size={20} weight="duotone" className="text-blue-600" />
        <h3 className="text-foreground text-sm font-semibold">Bank Transfer Details</h3>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2">
            <span className="text-foreground-muted text-xs">{row.label}</span>
            <div className="flex items-center gap-1">
              <span className="text-foreground text-right text-sm font-medium">{row.value}</span>
              {row.copyable && row.copyKey != null && (
                <button
                  onClick={() =>
                    copyToClipboard(
                      row.copyKey === 'amount' ? String(amount) : row.value,
                      row.copyKey!
                    )
                  }
                  className="text-foreground-muted hover:text-primary rounded p-0.5 transition-colors"
                  aria-label={`Copy ${row.label.toLowerCase()}`}
                >
                  {copiedField === row.copyKey ? (
                    <Check size={14} weight="bold" className="text-success" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {bankInfo.notes && (
        <p className="text-foreground-muted mt-3 border-t border-[hsl(var(--border))] pt-2 text-xs">
          {bankInfo.notes}
        </p>
      )}

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
        <Info size={14} weight="fill" className="mt-0.5 flex-shrink-0" />
        <span>Your booking is confirmed once the host verifies the transfer</span>
      </div>
    </div>
  );
}
