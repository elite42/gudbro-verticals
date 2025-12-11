import React from 'react';
import { DishItem } from '@/types/dish';
import { AllergenIcon, getIconNameFromFilterId } from './ui/allergen-icon';
import { safetyFilters } from '@/database/safety-filters';

interface ProductIndicatorsProps {
    dish: DishItem;
}

export function ProductIndicators({ dish }: ProductIndicatorsProps) {
    const {
        allergens = [],
        dietary = [],
        intolerances = [],
        spiciness = 0,
        calories = 0,
        protein_g = 0,
        carbs_g = 0,
        fat_g = 0
    } = dish;

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

    // Check if we have nutritional data
    const hasNutritionalData = calories > 0 || protein_g > 0 || carbs_g > 0 || fat_g > 0;

    return (
        <div className="space-y-4">
            {/* 1. Nutritional Macros Grid (like Roots menu) */}
            {hasNutritionalData && (
                <div className="grid grid-cols-2 gap-3">
                    {/* Calories */}
                    {calories > 0 && (
                        <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                            <p className="text-xs text-orange-600 font-medium mb-1">Calorie</p>
                            <p className="text-2xl font-bold text-orange-700">{calories}</p>
                            <p className="text-xs text-orange-500">kcal</p>
                        </div>
                    )}

                    {/* Protein */}
                    {protein_g > 0 && (
                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                            <p className="text-xs text-blue-600 font-medium mb-1">Proteine</p>
                            <p className="text-2xl font-bold text-blue-700">{protein_g}g</p>
                            <p className="text-xs text-blue-500">protein</p>
                        </div>
                    )}

                    {/* Carbs */}
                    {carbs_g > 0 && (
                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                            <p className="text-xs text-amber-600 font-medium mb-1">Carboidrati</p>
                            <p className="text-2xl font-bold text-amber-700">{carbs_g}g</p>
                            <p className="text-xs text-amber-500">carbs</p>
                        </div>
                    )}

                    {/* Fat */}
                    {fat_g > 0 && (
                        <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                            <p className="text-xs text-purple-600 font-medium mb-1">Grassi</p>
                            <p className="text-2xl font-bold text-purple-700">{fat_g}g</p>
                            <p className="text-xs text-purple-500">fat</p>
                        </div>
                    )}
                </div>
            )}

            {/* 2. Spiciness (if present) */}
            {spiciness > 0 && (
                <div className="bg-red-50 rounded-xl p-3 flex items-center justify-between border border-red-100">
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

            {/* 3. Allergens (Warning) */}
            {renderSection('Allergeni ⚠️', allergens, 'allergen')}

            {/* 4. Intolerances */}
            {renderSection('Intolleranze', intolerances, 'intolerance')}

            {/* 5. Diets (Positive) */}
            {renderSection('Diete Compatibili ✅', dietary, 'diet')}
        </div>
    );
}
