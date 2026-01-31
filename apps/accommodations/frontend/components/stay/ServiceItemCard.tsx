'use client';

import { Plus, Minus, Clock, Package } from '@phosphor-icons/react';

/** Currencies with 0 decimal places (minor unit = major unit). */
const ZERO_DECIMAL_CURRENCIES = new Set(['VND', 'JPY', 'KRW', 'CLP', 'ISK', 'UGX', 'RWF']);

function formatPrice(minorUnits: number, currency: string): string {
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  const amount = isZeroDecimal ? minorUnits : minorUnits / 100;

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

interface ServiceItemCardProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    currency: string;
    priceType: string;
    image: string | null;
    inStock: boolean;
    isAlwaysAvailable: boolean;
    availableFrom: string | null;
    availableUntil: string | null;
  };
  isAvailable: boolean;
  cartQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
  currency: string;
  timezone: string;
}

export default function ServiceItemCard({
  item,
  isAvailable,
  cartQuantity,
  onAdd,
  onRemove,
}: ServiceItemCardProps) {
  const disabled = !isAvailable || !item.inStock;

  return (
    <div
      className={`relative flex gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-3 shadow-sm transition-opacity ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {/* Image or fallback */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#FAF8F5]">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={28} weight="duotone" className="text-[#C4B9A8]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-medium text-[#2D2016]">{item.name}</p>
        {item.description && (
          <p className="mb-1 line-clamp-2 text-[11px] leading-tight text-[#8B7355]">
            {item.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto flex items-center gap-1">
          <span className="text-sm font-semibold text-[#3D8B87]">
            {formatPrice(item.price, item.currency)}
          </span>
          {item.priceType !== 'fixed' && (
            <span className="text-[10px] text-[#8B7355]">/{item.priceType}</span>
          )}
        </div>

        {/* Unavailability badges */}
        {!item.inStock && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-[#E07A5F]">
            Out of stock
          </span>
        )}
        {item.inStock && !isAvailable && item.availableFrom && item.availableUntil && (
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
            <Clock size={10} weight="bold" />
            {item.availableFrom} - {item.availableUntil}
          </span>
        )}
      </div>

      {/* Add / Quantity stepper */}
      <div className="flex flex-shrink-0 items-end">
        {disabled ? null : cartQuantity > 0 ? (
          <div className="flex items-center gap-1.5 rounded-full border border-[#3D8B87] bg-[#3D8B87]/5 px-1.5 py-0.5">
            <button
              onClick={onRemove}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/10"
              aria-label={`Remove one ${item.name}`}
            >
              <Minus size={14} weight="bold" />
            </button>
            <span className="min-w-[18px] text-center text-sm font-semibold text-[#3D8B87]">
              {cartQuantity}
            </span>
            <button
              onClick={onAdd}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/10"
              aria-label={`Add one more ${item.name}`}
            >
              <Plus size={14} weight="bold" />
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3D8B87] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus size={16} weight="bold" />
          </button>
        )}
      </div>
    </div>
  );
}
