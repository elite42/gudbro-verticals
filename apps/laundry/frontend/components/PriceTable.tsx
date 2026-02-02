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

function formatPrice(price: number, currency: string = 'VND'): string {
  if (currency === 'VND') {
    const inThousands = Math.round(price / 1000);
    return `${inThousands.toLocaleString()}k`;
  }

  const rates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 0.00004, symbol: '$' },
    EUR: { rate: 0.000037, symbol: '\u20AC' },
  };

  const info = rates[currency];
  if (!info) {
    const inThousands = Math.round(price / 1000);
    return `${inThousands.toLocaleString()}k`;
  }

  const converted = (price * info.rate).toFixed(2);
  return `${info.symbol}${converted}`;
}

export default function PriceTable({ currency = 'VND' }: PriceTableProps) {
  return (
    <div className="space-y-4">
      {priceData.map((group) => (
        <div
          key={group.category}
          className="bg-white rounded-xl shadow-soft overflow-hidden"
        >
          {/* Category Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderLeft: `4px solid ${group.color}` }}
          >
            <h3
              className="font-bold font-display text-sm"
              style={{ color: 'var(--charcoal)' }}
            >
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
                  <th className="text-left px-4 py-2 font-semibold">
                    Service
                  </th>
                  <th className="text-right px-4 py-2 font-semibold">Price</th>
                  <th className="text-right px-4 py-2 font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item, idx) => (
                  <tr
                    key={item.name}
                    style={{
                      backgroundColor:
                        idx % 2 === 1 ? 'var(--cloud)' : 'transparent',
                    }}
                  >
                    <td
                      className="px-4 py-2.5 text-sm"
                      style={{ color: 'var(--charcoal-light)' }}
                    >
                      {item.name}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-right font-bold"
                      style={{ color: 'var(--blue-hex)' }}
                    >
                      {formatPrice(item.price, currency)}
                    </td>
                    <td
                      className="px-4 py-2.5 text-xs text-right"
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
          <div className="sm:hidden divide-y" style={{ borderColor: 'var(--cloud-dark)' }}>
            {group.items.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-3"
                style={{
                  backgroundColor:
                    idx % 2 === 1 ? 'var(--cloud)' : 'transparent',
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {item.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--blue-hex)' }}
                  >
                    {formatPrice(item.price, currency)}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--charcoal-muted)' }}
                  >
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
