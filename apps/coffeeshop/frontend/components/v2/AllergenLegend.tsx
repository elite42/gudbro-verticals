'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Warning } from '@phosphor-icons/react';

// Complete list of allergen codes with full names
const ALLERGEN_DATA: Record<string, { name: string; description: string; region?: string }> = {
  // Common / Universal
  GF: { name: 'Gluten-Free', description: 'Contains no gluten' },
  GFO: { name: 'Gluten-Free Option', description: 'Can be made gluten-free' },
  VG: { name: 'Vegan', description: 'No animal products' },
  VGO: { name: 'Vegan Option', description: 'Can be made vegan' },
  V: { name: 'Vegetarian', description: 'No meat' },
  DF: { name: 'Dairy-Free', description: 'No dairy products' },
  NF: { name: 'Nut-Free', description: 'No nuts' },
  SF: { name: 'Soy-Free', description: 'No soy products' },
  EF: { name: 'Egg-Free', description: 'No eggs' },

  // EU14 Allergens
  GLUTEN: { name: 'Gluten', description: 'Wheat, rye, barley, oats', region: 'EU14' },
  DAIRY: { name: 'Dairy', description: 'Milk and milk products', region: 'EU14' },
  EGGS: { name: 'Eggs', description: 'Eggs and derivatives', region: 'EU14' },
  NUTS: { name: 'Tree Nuts', description: 'Almonds, hazelnuts, walnuts, etc.', region: 'EU14' },
  PEANUTS: { name: 'Peanuts', description: 'Peanuts and derivatives', region: 'EU14' },
  SOY: { name: 'Soy', description: 'Soybeans and products', region: 'EU14' },
  FISH: { name: 'Fish', description: 'Fish and derivatives', region: 'EU14' },
  SHELLFISH: { name: 'Shellfish', description: 'Crustaceans and molluscs', region: 'EU14' },
  CELERY: { name: 'Celery', description: 'Including celeriac', region: 'EU14' },
  MUSTARD: { name: 'Mustard', description: 'Mustard seeds and products', region: 'EU14' },
  SESAME: { name: 'Sesame', description: 'Sesame seeds and oil', region: 'EU14' },
  SULPHITES: { name: 'Sulphites', description: 'SO2 over 10mg/kg', region: 'EU14' },
  LUPIN: { name: 'Lupin', description: 'Lupin beans and flour', region: 'EU14' },
  MOLLUSCS: { name: 'Molluscs', description: 'Squid, oysters, mussels', region: 'EU14' },

  // Korean allergens
  BUCKWHEAT: { name: 'Buckwheat', description: '메밀 (Memil)', region: 'Korea' },
  PORK: { name: 'Pork', description: '돼지고기 (Dwaejigogi)', region: 'Korea' },
  PEACH: { name: 'Peach', description: '복숭아 (Boksunga)', region: 'Korea' },
  TOMATO: { name: 'Tomato', description: '토마토', region: 'Korea' },
  CHICKEN: { name: 'Chicken', description: '닭고기 (Dalkgogi)', region: 'Korea' },
  BEEF: { name: 'Beef', description: '쇠고기 (Soegogi)', region: 'Korea' },
  SQUID: { name: 'Squid', description: '오징어 (Ojingeo)', region: 'Korea' },

  // Japanese allergens
  ABALONE: { name: 'Abalone', description: 'あわび (Awabi)', region: 'Japan' },
  SALMON_ROE: { name: 'Salmon Roe', description: 'いくら (Ikura)', region: 'Japan' },
  ORANGE: { name: 'Orange', description: 'オレンジ', region: 'Japan' },
  KIWI: { name: 'Kiwi', description: 'キウイ', region: 'Japan' },
  BANANA: { name: 'Banana', description: 'バナナ', region: 'Japan' },
  MATSUTAKE: { name: 'Matsutake', description: 'まつたけ (Mushroom)', region: 'Japan' },
  YAM: { name: 'Yam', description: 'やまいも (Yamaimo)', region: 'Japan' },

  // GUDBRO additions
  MSG: { name: 'MSG', description: 'Monosodium glutamate', region: 'GUDBRO' },
  PALM_OIL: { name: 'Palm Oil', description: 'Contains palm oil', region: 'GUDBRO' },
  SPICY: { name: 'Spicy', description: 'Contains chili/hot spices' },
};

interface AllergenLegendProps {
  /** Which allergen codes to show. If empty, shows all */
  codes?: string[];
  /** Variant: inline shows pills, modal shows full legend */
  variant?: 'inline' | 'modal' | 'button';
}

export function AllergenLegend({ codes = [], variant = 'button' }: AllergenLegendProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter allergens to show
  const allergensToShow =
    codes.length > 0
      ? codes.filter((c) => ALLERGEN_DATA[c.toUpperCase()])
      : Object.keys(ALLERGEN_DATA);

  // Group by region for modal view
  const groupedAllergens = allergensToShow.reduce(
    (acc, code) => {
      const data = ALLERGEN_DATA[code.toUpperCase()];
      if (!data) return acc;
      const region = data.region || 'Common';
      if (!acc[region]) acc[region] = [];
      acc[region].push({ code: code.toUpperCase(), ...data });
      return acc;
    },
    {} as Record<string, Array<{ code: string; name: string; description: string }>>
  );

  // Inline variant - just show pills
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-1.5">
        {allergensToShow.slice(0, 6).map((code) => {
          const data = ALLERGEN_DATA[code.toUpperCase()];
          if (!data) return null;
          return (
            <span
              key={code}
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
              title={`${data.name}: ${data.description}`}
            >
              {code}
            </span>
          );
        })}
        {allergensToShow.length > 6 && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-tertiary)',
            }}
          >
            +{allergensToShow.length - 6}
          </span>
        )}
      </div>
    );
  }

  // Button variant - shows button that opens modal
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
        style={{
          background: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
        }}
      >
        <Info size={16} />
        Allergen Guide
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: 'var(--surface-overlay)' }}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 z-50 max-h-[80vh] -translate-y-1/2 overflow-hidden rounded-2xl md:inset-x-auto md:left-1/2 md:w-[480px] md:-translate-x-1/2"
              style={{ background: 'var(--surface-card)' }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between border-b p-4"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <div className="flex items-center gap-2">
                  <Warning size={24} style={{ color: 'var(--status-warning)' }} />
                  <h2
                    className="font-display text-xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Allergen Guide
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="scrollbar-styled max-h-[60vh] overflow-y-auto p-4">
                {Object.entries(groupedAllergens).map(([region, allergens]) => (
                  <div key={region} className="mb-6 last:mb-0">
                    <h3
                      className="mb-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {region}
                    </h3>
                    <div className="space-y-2">
                      {allergens.map((allergen) => (
                        <div
                          key={allergen.code}
                          className="flex items-start gap-3 rounded-lg p-2"
                          style={{ background: 'var(--bg-secondary)' }}
                        >
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
                            style={{
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {allergen.code}
                          </span>
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {allergen.name}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                              {allergen.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t p-4" style={{ borderColor: 'var(--border-light)' }}>
                <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  If you have food allergies, please inform our staff.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
