'use client';

import React from 'react';
import { getFilterById, SafetyFilter } from '@/lib/safety/safety-filters';

interface SafetyFilterIconsProps {
    allergens?: string[];
    intolerances?: string[];
    dietary?: string[];
    variant?: 'compact' | 'full';
    showLabels?: boolean;
    maxVisible?: number;
    className?: string;
    language?: 'en' | 'it' | 'vi';
}

/**
 * SafetyFilterIcons - Displays allergen, intolerance and dietary icons
 *
 * Uses the Sistema 5 Dimensioni from safety-filters.ts
 * Shows emoji icons with optional labels
 */
export function SafetyFilterIcons({
    allergens = [],
    intolerances = [],
    dietary = [],
    variant = 'compact',
    showLabels = false,
    maxVisible = 6,
    className = '',
    language = 'en'
}: SafetyFilterIconsProps) {
    // Collect all filter IDs
    const allFilterIds = [...allergens, ...intolerances, ...dietary];
    if (allFilterIds.length === 0) return null;

    // Map IDs to SafetyFilter objects
    const filters = allFilterIds
        .map(id => getFilterById(id))
        .filter((f): f is SafetyFilter => f !== undefined);

    if (filters.length === 0) return null;

    const visibleFilters = filters.slice(0, maxVisible);
    const hiddenCount = filters.length - maxVisible;

    // Color coding by type
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'allergen':
                return 'bg-red-50 border-red-200 text-red-700';
            case 'intolerance':
                return 'bg-amber-50 border-amber-200 text-amber-700';
            case 'diet':
                return 'bg-green-50 border-green-200 text-green-700';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    const getLabel = (filter: SafetyFilter) => {
        return filter.label[language] || filter.label.en;
    };

    if (variant === 'compact') {
        return (
            <div className={`flex flex-wrap gap-1 ${className}`}>
                {visibleFilters.map((filter) => (
                    <span
                        key={filter.id}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs ${getTypeColor(filter.type)}`}
                        title={getLabel(filter)}
                    >
                        <span className="text-sm">{filter.icon}</span>
                        {showLabels && (
                            <span className="font-medium">{getLabel(filter)}</span>
                        )}
                    </span>
                ))}
                {hiddenCount > 0 && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded border bg-gray-100 border-gray-300 text-gray-600 text-xs font-medium">
                        +{hiddenCount}
                    </span>
                )}
            </div>
        );
    }

    // Full variant - grouped by type
    const allergenFilters = filters.filter(f => f.type === 'allergen');
    const intoleranceFilters = filters.filter(f => f.type === 'intolerance');
    const dietaryFilters = filters.filter(f => f.type === 'diet');

    return (
        <div className={`space-y-3 ${className}`}>
            {allergenFilters.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-red-600 mb-1 flex items-center gap-1">
                        <span>⚠️</span> Allergens
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {allergenFilters.map((filter) => (
                            <span
                                key={filter.id}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border bg-red-50 border-red-200"
                            >
                                <span className="text-lg">{filter.icon}</span>
                                <span className="text-sm font-medium text-red-700">{getLabel(filter)}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {intoleranceFilters.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-amber-600 mb-1 flex items-center gap-1">
                        <span>⚡</span> Intolerances
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {intoleranceFilters.map((filter) => (
                            <span
                                key={filter.id}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border bg-amber-50 border-amber-200"
                            >
                                <span className="text-lg">{filter.icon}</span>
                                <span className="text-sm font-medium text-amber-700">{getLabel(filter)}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {dietaryFilters.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-green-600 mb-1 flex items-center gap-1">
                        <span>✓</span> Dietary
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {dietaryFilters.map((filter) => (
                            <span
                                key={filter.id}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border bg-green-50 border-green-200"
                            >
                                <span className="text-lg">{filter.icon}</span>
                                <span className="text-sm font-medium text-green-700">{getLabel(filter)}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * SafetyFilterBadge - Single badge for quick indication
 * Shows a warning icon if allergens present, checkmark if dietary-friendly
 */
export function SafetyFilterBadge({
    allergens = [],
    intolerances = [],
    dietary = [],
    className = ''
}: {
    allergens?: string[];
    intolerances?: string[];
    dietary?: string[];
    className?: string;
}) {
    const hasAllergens = allergens.length > 0;
    const hasIntolerances = intolerances.length > 0;
    const hasDietary = dietary.length > 0;

    if (!hasAllergens && !hasIntolerances && !hasDietary) return null;

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {hasAllergens && (
                <span className="text-red-500 text-sm" title={`Contains ${allergens.length} allergen(s)`}>
                    ⚠️
                </span>
            )}
            {hasIntolerances && (
                <span className="text-amber-500 text-sm" title={`Contains ${intolerances.length} intolerance(s)`}>
                    ⚡
                </span>
            )}
            {hasDietary && (
                <span className="text-green-500 text-sm" title={`${dietary.length} dietary option(s)`}>
                    ✓
                </span>
            )}
        </div>
    );
}
