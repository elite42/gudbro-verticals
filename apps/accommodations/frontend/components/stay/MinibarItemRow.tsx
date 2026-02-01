'use client';

import Image from 'next/image';
import { Minus, Plus } from '@phosphor-icons/react';

interface MinibarItemRowProps {
  item: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string | null;
    includedInRate: boolean;
  };
  consumed: number;
  onConsume: (quantity: number) => void;
}

/**
 * Single minibar item row with mark-consumed UI and quantity controls.
 *
 * When consumed === 0: shows "Mark used" button
 * When consumed > 0: shows quantity stepper with green left border
 */
export default function MinibarItemRow({ item, consumed, onConsume }: MinibarItemRowProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: item.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 transition-all ${
        consumed > 0 ? 'border-l-[3px] border-emerald-500' : ''
      }`}
    >
      {/* Item image or placeholder */}
      {item.image ? (
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
        </div>
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
          <span className="text-lg">🍫</span>
        </div>
      )}

      {/* Name and price */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-stone-800">{item.name}</span>
        {item.includedInRate ? (
          <span className="inline-flex w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            Included
          </span>
        ) : (
          <span className="text-xs text-stone-500">{formattedPrice}</span>
        )}
      </div>

      {/* Action: Mark used or quantity stepper */}
      {consumed === 0 ? (
        <button
          onClick={() => onConsume(1)}
          className="flex-shrink-0 rounded-lg border border-[#3D8B87] px-3 py-1.5 text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/5 active:bg-[#3D8B87]/10"
        >
          Mark used
        </button>
      ) : (
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={() => onConsume(consumed - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200 active:bg-stone-300"
          >
            <Minus size={14} weight="bold" />
          </button>
          <span className="min-w-[20px] text-center text-sm font-semibold text-stone-800">
            {consumed}
          </span>
          <button
            onClick={() => onConsume(consumed + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3D8B87]/10 text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/20 active:bg-[#3D8B87]/30"
          >
            <Plus size={14} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
