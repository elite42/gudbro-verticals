'use client';

import React from 'react';
import { safetyFilters } from '@/lib/shared/safety-filters';

interface ProductDetailModalProps {
    product: any;
    onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const computed = product.computed || {};
    const allergens = computed.allergens?.present || [];
    const intolerances = computed.intolerances?.present || [];
    const diets = computed.diets?.compatible || [];
    const calories = computed.nutrition?.calories || 0;
    const spiciness = computed.spice?.max_level || 0;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    // ESC key listener
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKey as any);
        return () => document.removeEventListener('keydown', handleEscKey as any);
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Product Info */}
                    <div className="flex gap-6">
                        <img
                            src={product.image}
                            alt={product.name.en}
                            className="w-48 h-48 object-cover rounded-xl shadow-md flex-shrink-0"
                        />
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name.en}</h3>
                            <p className="text-gray-600 mb-4">{product.description?.en}</p>
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Base Price</p>
                                    <p className="text-2xl font-bold text-gray-900">{product.price} {product.currency}</p>
                                </div>
                                {product.priceOverride && (
                                    <div>
                                        <p className="text-sm text-gray-500">Override Price</p>
                                        <p className="text-2xl font-bold text-yellow-600">{product.priceOverride} {product.currency}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {product.categoryMain}
                                </span>
                                {product.categorySub && (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                        {product.categorySub}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Safety Indicators */}
                    <div className="border-t pt-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">🛡️ Safety & Nutrition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Calories */}
                            {calories > 0 && (
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-orange-700 font-medium">Calories</p>
                                            <p className="text-3xl font-bold text-orange-800">{calories} <span className="text-lg">kcal</span></p>
                                        </div>
                                        <span className="text-4xl">⚡️</span>
                                    </div>
                                </div>
                            )}

                            {/* Spiciness */}
                            {spiciness > 0 && (
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-red-700 font-medium">Spiciness Level</p>
                                            <div className="flex gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-2xl ${i < spiciness ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                                                        🌶️
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Allergens */}
                        {allergens.length > 0 && (
                            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                                <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                    <span>⚠️</span> Allergens ({allergens.length})
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {allergens.map((filterId: string) => {
                                        const filter = safetyFilters.find(f => f.id === filterId);
                                        if (!filter) return null;
                                        return (
                                            <div key={filterId} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-red-200">
                                                <span className="text-lg">{filter.icon || '⚠️'}</span>
                                                <span className="text-sm font-medium text-gray-700">{filter.label.en}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Intolerances */}
                        {intolerances.length > 0 && (
                            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                                    <span>🚫</span> Intolerances ({intolerances.length})
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {intolerances.map((filterId: string) => {
                                        const filter = safetyFilters.find(f => f.id === filterId);
                                        if (!filter) return null;
                                        return (
                                            <div key={filterId} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-yellow-200">
                                                <span className="text-lg">{filter.icon || '🚫'}</span>
                                                <span className="text-sm font-medium text-gray-700">{filter.label.en}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Diets */}
                        {diets.length > 0 && (
                            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                                <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                    <span>✅</span> Compatible Diets ({diets.length})
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {diets.map((filterId: string) => {
                                        const filter = safetyFilters.find(f => f.id === filterId);
                                        if (!filter) return null;
                                        return (
                                            <div key={filterId} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-green-200">
                                                <span className="text-lg">{filter.icon || '✅'}</span>
                                                <span className="text-sm font-medium text-gray-700">{filter.label.en}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="border-t pt-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Metadata</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Product ID</p>
                                <p className="font-mono text-gray-900">{product.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Slug</p>
                                <p className="font-mono text-gray-900">{product.slug}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Created At</p>
                                <p className="text-gray-900">{new Date(product.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Updated At</p>
                                <p className="text-gray-900">{new Date(product.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
