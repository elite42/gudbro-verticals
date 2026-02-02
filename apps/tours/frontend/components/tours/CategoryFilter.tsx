'use client'

import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY FILTER COMPONENT

   Horizontal scrolling category pills for filtering tours.
   Prominent icons and touch-friendly design.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CategoryFilterProps {
  selected: string | null
  onChange: (category: string | null) => void
  counts?: Record<string, number>
}

const CATEGORIES = [
  { id: null, label: 'All', icon: '✨' },
  { id: 'day_tour', label: 'Day Tours', icon: '🏍️' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'experience', label: 'Experiences', icon: '🎨' },
  { id: 'multi_day', label: 'Multi-Day', icon: '📅' },
]

export function CategoryFilter({
  selected,
  onChange,
  counts = {},
}: CategoryFilterProps) {
  return (
    <div className="py-2">
      <div className="flex gap-2 overflow-x-auto px-3 pb-1 -mx-3 scrollbar-hide">
        {CATEGORIES.map(category => {
          const isSelected = selected === category.id
          const count = category.id ? counts[category.id] : Object.values(counts).reduce((a, b) => a + b, 0)

          return (
            <button
              key={category.id ?? 'all'}
              onClick={() => onChange(category.id)}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full',
                'text-sm transition-all duration-200',
                isSelected
                  ? 'bg-primary text-white font-medium'
                  : 'bg-gray-100 text-foreground-muted hover:bg-gray-200'
              )}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              {count > 0 && (
                <span className={cn(
                  'min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-medium',
                  isSelected ? 'bg-white/20' : 'bg-gray-200'
                )}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   COMPACT FILTER CHIPS (Alternative)
   ───────────────────────────────────────────────────────────────────── */

export function CompactCategoryFilter({
  selected,
  onChange,
}: {
  selected: string | null
  onChange: (category: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(category => {
        const isSelected = selected === category.id

        return (
          <button
            key={category.id ?? 'all'}
            onClick={() => onChange(category.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium',
              'transition-all duration-200',
              isSelected
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-foreground-muted hover:bg-gray-200'
            )}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}
