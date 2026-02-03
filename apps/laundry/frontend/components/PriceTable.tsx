'use client';

interface PriceTableProps {
  currency?: string;
}

const priceData = [
  {
    category: 'Wash & Fold',
    color: 'var(--blue)',
    items: [
      { name: 'Standard', price: 25000, unit: 'kg' },
      { name: 'Bedsheet Set', price: 30000, unit: 'set' },
      { name: 'Towel', price: 15000, unit: 'item' },
      { name: 'Delicate Hand Wash', price: 45000, unit: 'item' },
    ],
  },
  {
    category: 'Wash & Iron',
    color: 'var(--teal)',
    items: [
      { name: 'By Weight', price: 35000, unit: 'kg' },
      { name: 'Shirt', price: 20000, unit: 'item' },
      { name: 'Pants', price: 25000, unit: 'item' },
      { name: 'Dress', price: 35000, unit: 'item' },
    ],
  },
  {
    category: 'Dry Clean',
    color: '#7C3AED',
    items: [
      { name: 'Suit (2-piece)', price: 80000, unit: 'item' },
      { name: 'Jacket', price: 60000, unit: 'item' },
      { name: 'Dress', price: 50000, unit: 'item' },
    ],
  },
  {
    category: 'Iron Only',
    color: '#C2410C',
    items: [{ name: 'Per Item', price: 10000, unit: 'item' }],
  },
  {
    category: 'Shoes',
    color: '#DC2626',
    items: [
      { name: 'Standard Clean', price: 60000, unit: 'pair' },
      { name: 'Sneaker Deep Clean', price: 80000, unit: 'pair' },
    ],
  },
  {
    category: 'Express (+50%)',
    color: 'var(--gold)',
    items: [{ name: 'Wash & Fold', price: 37500, unit: 'kg' }],
  },
];

import { formatPriceCompact } from '@gudbro/utils';

function formatPrice(price: number, currency: string = 'VND'): string {
  return formatPriceCompact(price, currency);
}

export default function PriceTable({ currency = 'VND' }: PriceTableProps) {
  return (
    <div className="space-y-4">
      {priceData.map((group) => (
        <div key={group.category} className="shadow-soft overflow-hidden rounded-xl bg-white">
          {/* Category Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderLeft: `4px solid ${group.color}` }}
          >
            <h3 className="font-display text-sm font-bold" style={{ color: 'var(--charcoal)' }}>
              {group.category}
            </h3>
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block">
            <table className="w-full">
              <thead>
                <tr
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: 'var(--charcoal-muted)',
                    backgroundColor: 'var(--cloud)',
                  }}
                >
                  <th className="px-4 py-2 text-left font-semibold">Service</th>
                  <th className="px-4 py-2 text-right font-semibold">Price</th>
                  <th className="px-4 py-2 text-right font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item, idx) => (
                  <tr
                    key={item.name}
                    style={{
                      backgroundColor: idx % 2 === 1 ? 'var(--cloud)' : 'transparent',
                    }}
                  >
                    <td className="px-4 py-2.5 text-sm" style={{ color: 'var(--charcoal-light)' }}>
                      {item.name}
                    </td>
                    <td
                      className="px-4 py-2.5 text-right text-sm font-bold"
                      style={{ color: 'var(--blue-hex)' }}
                    >
                      {formatPrice(item.price, currency)}
                    </td>
                    <td
                      className="px-4 py-2.5 text-right text-xs"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      /{item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Card list */}
          <div className="divide-y sm:hidden" style={{ borderColor: 'var(--cloud-dark)' }}>
            {group.items.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-3"
                style={{
                  backgroundColor: idx % 2 === 1 ? 'var(--cloud)' : 'transparent',
                }}
              >
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>
                  {item.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold" style={{ color: 'var(--blue-hex)' }}>
                    {formatPrice(item.price, currency)}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    /{item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
