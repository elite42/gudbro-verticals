import React from 'react';
import { DishItem } from '../../types/dish';
import { AllergenIcon, getIconNameFromFilterId } from './ui/allergen-icon';
import { safetyFilters } from '@/database/safety-filters';

interface ProductIndicatorsProps {
    dish: DishItem;
}

export function ProductIndicators({ dish }: ProductIndicatorsProps) {
    const { allergens = [], dietary = [], intolerances = [], spiciness = 0, calories = 0 } = dish;

    // Helper to render a section
    const renderSection = (title: string, items: string[], colorScheme: 'allergen' | 'diet' | 'intolerance') => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-theme-text-secondary mb-2">{title}</h4>
                <div className="flex flex-wrap gap-3">
                    {items.map((filterId) => {
                        const filter = safetyFilters.find(f => f.id === filterId);
                        const iconName = getIconNameFromFilterId(filterId);

                        if (!filter || !iconName) return null;

                        return (
                            <div key={filterId} className="flex flex-col items-center gap-1">
                                <AllergenIcon
                                    name={iconName}
                                    size={40}
                                    colorScheme={colorScheme}
                                />
                                <span className="text-[10px] text-theme-text-secondary text-center max-w-[60px] leading-tight">
                                    {filter.label.en}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* 1. Calories & Spiciness Row */}
            <div className="flex gap-4">
                {calories > 0 && (
                    <div className="flex-1 bg-theme-bg-secondary rounded-xl p-3 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-theme-text-secondary">Calorie</p>
                            <p className="text-xl font-bold text-theme-text-primary">{calories} <span className="text-sm font-normal">kcal</span></p>
                        </div>
                        <span className="text-2xl">⚡️</span>
                    </div>
                )}

                {spiciness > 0 && (
                    <div className="flex-1 bg-red-50 rounded-xl p-3 flex items-center justify-between border border-red-100">
                        <div>
                            <p className="text-xs text-red-600 font-medium">Piccantezza</p>
                            <div className="flex gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-sm ${i < spiciness ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                                        🌶️
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Allergens (Warning) */}
            {renderSection('Allergeni ⚠️', allergens, 'allergen')}

            {/* 3. Intolerances */}
            {renderSection('Intolleranze', intolerances, 'intolerance')}

            {/* 4. Diets (Positive) */}
            {renderSection('Diete Compatibili ✅', dietary, 'diet')}
        </div>
    );
}
