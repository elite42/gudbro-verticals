'use client';

import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

interface DashboardCardProps {
  /** Phosphor icon component to render */
  icon: PhosphorIcon;
  /** Card label text */
  label: string;
  /** Accent color (hex) for top border and icon tint */
  color: string;
  /** Tap handler */
  onClick: () => void;
  /** Optional badge text (e.g., "New") displayed as pill in top-right */
  badge?: string;
  /** Optional count displayed as a small number badge on the icon */
  count?: number;
  /** Optional description line below the label */
  description?: string;
}

/**
 * Reusable colored card for the guest dashboard grid.
 * Renders a tappable card with icon, label, optional badge/count, and color accent.
 */
export default function DashboardCard({
  icon: Icon,
  label,
  color,
  onClick,
  badge,
  count,
  description,
}: DashboardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-h-[88px] w-full flex-col items-center justify-center rounded-2xl border border-[#E8E2D9] bg-white px-2 py-3 text-center shadow-sm transition-transform active:scale-[0.97]"
      style={{ borderTopWidth: '3px', borderTopColor: color }}
    >
      {/* Badge pill in top-right */}
      {badge && (
        <span
          className="absolute right-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {badge}
        </span>
      )}

      {/* Icon with optional count */}
      <div className="relative mb-1.5">
        <Icon size={32} weight="duotone" style={{ color }} />
        {count !== undefined && count > 0 && (
          <span
            className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-0.5 text-[9px] font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {count}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="text-sm font-semibold text-[#2D2016]">{label}</span>

      {/* Description */}
      {description && (
        <span className="mt-0.5 line-clamp-1 text-[11px] text-[#8B7355]">{description}</span>
      )}
    </button>
  );
}
