'use client';

import { useState, useMemo } from 'react';
import { toggleProductActivation, updateProductOverride, bulkToggleActivation } from '../actions';
import { ProductDetailModal } from './ProductDetailModal';

interface CatalogClientProps {
    products: any[];
}

export function CatalogClient({ products }: CatalogClientProps) {
    const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

    // Extract unique categories
    const categories = useMemo(() => {
        return [...new Set(products.map(p => p.categoryMain))].sort();
    }, [products]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchName = p.name.en.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = !selectedCategory || p.categoryMain === selectedCategory;
            return matchName && matchCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const handleToggle = async (productId: string, currentStatus: boolean) => {
        await toggleProductActivation(productId, !currentStatus);
    };

    const handlePriceSave = async (productId: string, newPrice: string) => {
        const price = newPrice ? parseFloat(newPrice) : null;
        await updateProductOverride(productId, price);
        setEditingPriceId(null);
    };

    // Bulk selection handlers
    const handleSelectProduct = (productId: string) => {
        const newSelected = new Set(selectedProducts);
        if (newSelected.has(productId)) {
            newSelected.delete(productId);
        } else {
            newSelected.add(productId);
        }
        setSelectedProducts(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedProducts.size === filteredProducts.length && filteredProducts.length > 0) {
            setSelectedProducts(new Set());
        } else {
            setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
        }
    };

    const handleBulkActivate = async (isActive: boolean) => {
        if (selectedProducts.size === 0) return;
        await bulkToggleActivation(Array.from(selectedProducts), isActive);
        setSelectedProducts(new Set());
    };

    // Export to CSV
    const handleExportCSV = () => {
        const selectedData = products.filter(p => selectedProducts.has(p.id));
        const csvData = selectedData.map(p => ({
            id: p.id,
            slug: p.slug,
            name_en: p.name.en,
            name_it: p.name.it || '',
            name_vi: p.name.vi || '',
            category: p.categoryMain,
            price: p.price,
            currency: p.currency,
            isActive: p.isActive ? 'Yes' : 'No',
            priceOverride: p.priceOverride || '',
            allergens: p.computed?.allergens?.present?.join('; ') || '',
            diets: p.computed?.diets?.compatible?.join('; ') || '',
            calories: p.computed?.nutrition?.calories || 0,
        }));

        const headers = Object.keys(csvData[0]).join(',');
        const rows = csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','));
        const csv = [headers, ...rows].join('\n');

        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {/* Search & Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                </select>
            </div>

            {/* Bulk Actions Bar */}
            <div className="mb-4 flex flex-wrap items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Select All ({filteredProducts.length})
                    </span>
                </label>

                {selectedProducts.size > 0 && (
                    <>
                        <div className="h-6 w-px bg-gray-300" />
                        <span className="text-sm text-gray-600">
                            {selectedProducts.size} selected
                        </span>
                        <button
                            onClick={() => handleBulkActivate(true)}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            ✓ Activate Selected
                        </button>
                        <button
                            onClick={() => handleBulkActivate(false)}
                            className="px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            ✗ Deactivate Selected
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            📥 Export CSV
                        </button>
                    </>
                )}
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No products found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => {
                        const isActive = product.isActive;
                        const currentPrice = product.priceOverride ?? product.price;
                        const hasOverride = product.priceOverride !== null;
                        const isSelected = selectedProducts.has(product.id);

                        // Safety Flags
                        const allergens = product.computed?.allergens?.present || [];
                        const diets = product.computed?.diets?.compatible || [];
                        const calories = product.computed?.nutrition?.calories || 0;
                        const spiciness = product.computed?.spice?.max_level || 0;

                        return (
                            <div
                                key={product.id}
                                className={`flex flex-col bg-white border-2 rounded-lg shadow-sm overflow-hidden transition-all ${isSelected
                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                        : !isActive
                                            ? 'opacity-60 grayscale-[0.5] border-gray-300'
                                            : 'border-gray-300 hover:shadow-md'
                                    }`}
                            >
                                <div className="h-48 bg-gray-200 relative">
                                    {product.image && (
                                        <img src={product.image} alt={product.name.en} className="h-full w-full object-cover" />
                                    )}

                                    {/* Checkbox Selection */}
                                    <div className="absolute top-2 left-2">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleSelectProduct(product.id)}
                                            className="w-5 h-5 text-blue-600 bg-white rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                    </div>

                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                            GLOBAL
                                        </span>
                                        {hasOverride && (
                                            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                OVERRIDE
                                            </span>
                                        )}
                                    </div>

                                    {/* Status Toggle Overlay */}
                                    <div className="absolute bottom-2 right-2">
                                        <button
                                            onClick={() => handleToggle(product.id, isActive)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold shadow-md transition-colors ${isActive
                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                                                }`}
                                        >
                                            {isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{product.name.en}</h3>
                                        <div className="text-right">
                                            {editingPriceId === product.id ? (
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    defaultValue={currentPrice}
                                                    onBlur={(e) => handlePriceSave(product.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handlePriceSave(product.id, (e.target as HTMLInputElement).value);
                                                    }}
                                                    autoFocus
                                                    className="w-20 border rounded px-1 text-right text-sm"
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => setEditingPriceId(product.id)}
                                                    className={`text-sm font-medium cursor-pointer hover:underline ${hasOverride ? 'text-yellow-600 font-bold' : 'text-gray-500'}`}
                                                    title="Click to override price"
                                                >
                                                    {currentPrice} {product.currency}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description?.en}</p>

                                    {/* 5-Pillar Indicators Preview */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {calories > 0 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                                ⚡️ {calories}
                                            </span>
                                        )}
                                        {spiciness > 0 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                🌶️ {spiciness}
                                            </span>
                                        )}
                                        {allergens.length > 0 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" title={allergens.join(', ')}>
                                                ⚠️ {allergens.length}
                                            </span>
                                        )}
                                        {diets.length > 0 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800" title={diets.join(', ')}>
                                                ✅ {diets.length}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 border-t flex justify-between items-center">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">{product.categoryMain}</span>
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:underline"
                                        >
                                            📋 Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}
