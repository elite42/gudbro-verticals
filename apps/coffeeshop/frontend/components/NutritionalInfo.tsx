'use client';

import React from 'react';

interface NutritionalInfoProps {
    calories?: number;
    protein_g?: number;
    carbs_g?: number;
    fat_g?: number;
    fiber_g?: number;
    variant?: 'compact' | 'full';
    className?: string;
}

/**
 * NutritionalInfo - Displays nutritional values similar to Roots menu
 *
 * Compact variant: Single row with icons (for DishCard)
 * Full variant: Grid layout with labels (for ProductDetail)
 */
export function NutritionalInfo({
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fiber_g,
    variant = 'compact',
    className = ''
}: NutritionalInfoProps) {
    // Don't render if no nutritional data
    const hasData = calories || protein_g || carbs_g || fat_g || fiber_g;
    if (!hasData) return null;

    if (variant === 'compact') {
        return (
            <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
                {calories !== undefined && (
                    <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                        <span className="font-medium">{calories}</span>
                        <span className="text-orange-500">cal</span>
                    </span>
                )}
                {protein_g !== undefined && (
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        <span className="font-medium">{protein_g}g</span>
                        <span className="text-blue-500">P</span>
                    </span>
                )}
                {carbs_g !== undefined && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        <span className="font-medium">{carbs_g}g</span>
                        <span className="text-amber-500">C</span>
                    </span>
                )}
                {fat_g !== undefined && (
                    <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        <span className="font-medium">{fat_g}g</span>
                        <span className="text-purple-500">F</span>
                    </span>
                )}
            </div>
        );
    }

    // Full variant - grid layout for product detail pages
    return (
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
            {calories !== undefined && (
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-700">{calories}</div>
                    <div className="text-xs text-orange-600 font-medium">Calories</div>
                </div>
            )}
            {protein_g !== undefined && (
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-700">{protein_g}g</div>
                    <div className="text-xs text-blue-600 font-medium">Protein</div>
                </div>
            )}
            {carbs_g !== undefined && (
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-700">{carbs_g}g</div>
                    <div className="text-xs text-amber-600 font-medium">Carbs</div>
                </div>
            )}
            {fat_g !== undefined && (
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-700">{fat_g}g</div>
                    <div className="text-xs text-purple-600 font-medium">Fat</div>
                </div>
            )}
            {fiber_g !== undefined && (
                <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-700">{fiber_g}g</div>
                    <div className="text-xs text-green-600 font-medium">Fiber</div>
                </div>
            )}
        </div>
    );
}
