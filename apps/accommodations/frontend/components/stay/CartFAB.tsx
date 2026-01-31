'use client';

import { ShoppingCart } from '@phosphor-icons/react';

interface CartFABProps {
  itemCount: number;
  onClick: () => void;
}

/**
 * Floating action button showing cart item count.
 * Fixed above BottomNav, hidden when cart is empty.
 */
export default function CartFAB({ itemCount, onClick }: CartFABProps) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#3D8B87] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{
        animation: 'cartFabIn 0.2s ease-out',
      }}
      aria-label={`Open cart with ${itemCount} items`}
    >
      <ShoppingCart size={24} weight="fill" />

      {/* Badge */}
      <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E07A5F] px-1 text-[11px] font-bold text-white">
        {itemCount}
      </span>

      <style jsx>{`
        @keyframes cartFabIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
}
