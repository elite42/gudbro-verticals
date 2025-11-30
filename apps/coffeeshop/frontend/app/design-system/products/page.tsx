'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { safetyFilters } from '../../../../../shared/database/safety-filters';
import sampleProducts from '@/data/sample-products.json';

interface Product {
  id: string;
  name: { en: string; it: string; vi: string };
  description: { en: string; it: string; vi: string };
  category: string;
  price: number;
  imageUrl: string;
  allergens: string[];
  dietary: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductLibraryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load products from localStorage
  useEffect(() => {
    const loadProducts = () => {
      const stored = localStorage.getItem('product-library');
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    };

    loadProducts();
    // Listen for storage changes (when products are added)
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.name.it.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.name.vi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    return products.filter(p => p.category === categoryId).length;
  };

  const categories = [
    { id: 'all', name: 'All', count: getCategoryCount('all') },
    { id: 'beverage', name: 'Beverages', count: getCategoryCount('beverage') },
    { id: 'food', name: 'Food', count: getCategoryCount('food') },
    { id: 'dessert', name: 'Desserts', count: getCategoryCount('dessert') },
    { id: 'snack', name: 'Snacks', count: getCategoryCount('snack') },
  ];

  const loadSampleData = () => {
    localStorage.setItem('product-library', JSON.stringify(sampleProducts));
    setProducts(sampleProducts as Product[]);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Library</h1>
            <p className="text-gray-600 mt-2">
              Centralized database of menu items with photos, descriptions, and safety filters
            </p>
          </div>
          <Link href="/design-system/products/create">
            <Button variant="primary" size="lg">
              + Add Product
            </Button>
          </Link>
        </div>

        {/* Stats - GUDBRO Brand Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="text-center bg-gradient-to-br from-[#cd0931] to-[#a00727]">
            <div className="text-2xl font-bold text-white">{products.length}</div>
            <div className="text-sm text-white/90">Total Products</div>
          </Card>
          <Card padding="md" className="text-center bg-gradient-to-br from-[#f8ad16] to-[#f88d16]">
            <div className="text-2xl font-bold text-black">{getCategoryCount('beverage')}</div>
            <div className="text-sm text-black/90">Beverages</div>
          </Card>
          <Card padding="md" className="text-center bg-gradient-to-br from-[#0931cd] to-[#072399]">
            <div className="text-2xl font-bold text-white">{getCategoryCount('food')}</div>
            <div className="text-sm text-white/90">Food Items</div>
          </Card>
          <Card padding="md" className="text-center bg-gradient-to-br from-[#333333] to-[#000000]">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-sm text-white/90">Languages</div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="md"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#cd0931] to-[#a00727] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat.name}
              {cat.count > 0 && (
                <span className="ml-2 text-xs opacity-75">({cat.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <Card padding="xl" className="text-center">
          <div className="py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start building your product library by adding your first menu item.
              You can add photos, descriptions in multiple languages, and safety filters.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/design-system/products/create">
                <Button variant="primary" size="lg">
                  + Add Your First Product
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={loadSampleData}>
                Load 10 Sample Products
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const categoryIcon = {
              beverage: '☕',
              food: '🍽️',
              dessert: '🍰',
              snack: '🍿'
            }[product.category] || '🍽️';

            return (
              <Card key={product.id} variant="interactive" padding="none" className="overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name.en}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {categoryIcon}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="bg-white/90 backdrop-blur-sm">
                      {categoryIcon} {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {product.name.en}
                    </h3>
                    {product.description.en && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description.en}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-xl font-bold text-[#cd0931] mb-3">
                    {product.price.toLocaleString()} VND
                  </div>

                  {/* Safety Filters */}
                  <div className="space-y-2 mb-4">
                    {/* Dietary Badges */}
                    {product.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.dietary.slice(0, 3).map((filterId) => {
                          const filter = safetyFilters.find(f => f.id === filterId);
                          if (!filter) return null;
                          return (
                            <Badge key={filterId} variant="success" className="text-xs">
                              {filter.icon} {filter.label.en}
                            </Badge>
                          );
                        })}
                        {product.dietary.length > 3 && (
                          <Badge variant="default" className="text-xs">
                            +{product.dietary.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Allergen Warnings */}
                    {product.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.allergens.slice(0, 3).map((filterId) => {
                          const filter = safetyFilters.find(f => f.id === filterId);
                          if (!filter) return null;
                          return (
                            <Badge key={filterId} variant="danger" className="text-xs">
                              {filter.icon} {filter.label.en}
                            </Badge>
                          );
                        })}
                        {product.allergens.length > 3 && (
                          <Badge variant="danger" className="text-xs">
                            +{product.allergens.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        // TODO: Implement edit functionality
                        alert('Edit feature coming soon!');
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          const updated = products.filter(p => p.id !== product.id);
                          localStorage.setItem('product-library', JSON.stringify(updated));
                          setProducts(updated);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {products.length > 0 && filteredProducts.length === 0 && (
        <Card padding="xl" className="text-center">
          <div className="py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
