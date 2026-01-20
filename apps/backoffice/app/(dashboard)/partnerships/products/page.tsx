'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

interface TourismProductTemplate {
  id: string;
  venueType: string;
  productName: string;
  productSlug: string;
  target: 'tour_operator' | 'accommodation' | 'both' | null;
  durationMinutes: number | null;
  suggestedPriceMin: number | null;
  suggestedPriceMax: number | null;
  minGroupSize: number | null;
  maxGroupSize: number | null;
  descriptionTemplate: string | null;
  includes: string[];
  isActive: boolean;
  displayOrder: number | null;
}

interface MerchantTourismProduct {
  id: string;
  merchantId: string;
  templateId: string | null;
  customName: string | null;
  customPrice: number | null;
  customDuration: number | null;
  customMinGroup: number | null;
  customMaxGroup: number | null;
  customDescription: string | null;
  customIncludes: string[];
  availableDays: number[];
  availableSlots: ('morning' | 'afternoon' | 'evening')[];
  maxPerDay: number | null;
  isActive: boolean;
  createdAt: string;
  template?: TourismProductTemplate;
}

interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  byTarget: Record<string, number>;
  bySlot: Record<string, number>;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getProductName(product: MerchantTourismProduct): string {
  return product.customName || product.template?.productName || 'Unnamed Product';
}

function getProductPrice(product: MerchantTourismProduct): number | null {
  return product.customPrice ?? product.template?.suggestedPriceMin ?? null;
}

function getProductDuration(product: MerchantTourismProduct): number | null {
  return product.customDuration ?? product.template?.durationMinutes ?? null;
}

function getProductDescription(product: MerchantTourismProduct): string | null {
  return product.customDescription || product.template?.descriptionTemplate || null;
}

function getProductMinGroup(product: MerchantTourismProduct): number | null {
  return product.customMinGroup ?? product.template?.minGroupSize ?? null;
}

function getProductMaxGroup(product: MerchantTourismProduct): number | null {
  return product.customMaxGroup ?? product.template?.maxGroupSize ?? null;
}

function getTargetLabel(target: string | null): string {
  switch (target) {
    case 'tour_operator':
      return 'Tour Operators';
    case 'accommodation':
      return 'Accommodations';
    case 'both':
      return 'All Partners';
    default:
      return 'Unspecified';
  }
}

function getTargetColor(target: string | null): string {
  switch (target) {
    case 'tour_operator':
      return 'bg-blue-100 text-blue-700';
    case 'accommodation':
      return 'bg-green-100 text-green-700';
    case 'both':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function getSlotLabel(slot: string): string {
  switch (slot) {
    case 'morning':
      return 'Morning';
    case 'afternoon':
      return 'Afternoon';
    case 'evening':
      return 'Evening';
    default:
      return slot;
  }
}

export default function ProductsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [activeTab, setActiveTab] = useState<'my-products' | 'templates'>('my-products');
  const [products, setProducts] = useState<MerchantTourismProduct[]>([]);
  const [templates, setTemplates] = useState<TourismProductTemplate[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TourismProductTemplate | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<MerchantTourismProduct | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch products, templates, and stats in parallel
        const [productsRes, templatesRes, statsRes] = await Promise.all([
          fetch(`/api/ai/tourism-products?merchantId=${location.id}&action=merchant-products`),
          fetch('/api/ai/tourism-products?action=templates'),
          fetch(`/api/ai/tourism-products?merchantId=${location.id}&action=stats`),
        ]);

        if (productsRes.ok) {
          const data = await productsRes.json();
          if (data.success) {
            setProducts(data.products || []);
          }
        }

        if (templatesRes.ok) {
          const data = await templatesRes.json();
          if (data.success) {
            setTemplates(data.templates || []);
          }
        }

        if (statsRes.ok) {
          const data = await statsRes.json();
          if (data.success) {
            setStats(data.stats || null);
          }
        }
      } catch (error) {
        console.error('Error fetching products data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  // Create product from template
  const handleCreateFromTemplate = async (template: TourismProductTemplate) => {
    if (!location?.id) return;

    setCreating(template.id);
    try {
      const res = await fetch('/api/ai/tourism-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create',
          templateId: template.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) => [data.product, ...prev]);
          setActiveTab('my-products');
          setSelectedTemplate(null);
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setCreating(null);
    }
  };

  // Toggle product active status
  const handleToggleActive = async (productId: string, isActive: boolean) => {
    setToggling(productId);
    try {
      const res = await fetch('/api/ai/tourism-products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          action: 'toggle',
          isActive: !isActive,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, isActive: !isActive } : p))
          );
        }
      }
    } catch (error) {
      console.error('Error toggling product:', error);
    } finally {
      setToggling(null);
    }
  };

  // Delete product
  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeleting(productId);
    try {
      const res = await fetch(`/api/ai/tourism-products?productId=${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProducts((prev) => prev.filter((p) => p.id !== productId));
          setSelectedProduct(null);
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleting(null);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (filter === 'active') return p.isActive;
    if (filter === 'inactive') return !p.isActive;
    return true;
  });

  // Get templates not yet used
  const usedTemplateIds = new Set(products.map((p) => p.templateId).filter(Boolean));
  const availableTemplates = templates.filter((t) => !usedTemplateIds.has(t.id));

  const isLoading = loading || tenantLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 rounded bg-gray-200" />
          <div className="mt-4 h-12 rounded-xl bg-gray-200" />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="h-48 rounded-xl bg-gray-200" />
            <div className="h-48 rounded-xl bg-gray-200" />
            <div className="h-48 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/partnerships" className="hover:text-gray-700">
              Partnerships
            </Link>
            <span>/</span>
            <span>Tourism Products</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Tourism Products</h1>
            <InfoTooltip contentKey="pages.tourismProducts" kbPageId="partnerships-products" />
          </div>
          <p className="mt-1 text-gray-600">
            Create special products and experiences for tour groups.
          </p>
        </div>
        {stats && stats.totalProducts > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
              <div className="text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.activeProducts}</div>
              <div className="text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">{stats.inactiveProducts}</div>
              <div className="text-gray-500">Inactive</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('my-products')}
            className={`border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'my-products'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            My Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'templates'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Templates ({templates.length})
            {availableTemplates.length > 0 && (
              <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600">
                {availableTemplates.length} available
              </span>
            )}
          </button>
        </nav>
      </div>

      {activeTab === 'my-products' ? (
        products.length === 0 ? (
          /* Empty State - My Products */
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No tourism products yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create special products for tour groups or customize from templates.
            </p>
            <button
              onClick={() => setActiveTab('templates')}
              className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              Browse Templates
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              {(['all', 'active', 'inactive'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    filter === f
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Inactive'}
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-xl border bg-white p-5 transition-colors ${
                    product.isActive
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 bg-gray-50 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTargetColor(product.template?.target || null)}`}
                        >
                          {getTargetLabel(product.template?.target || null)}
                        </span>
                        {!product.isActive && (
                          <span className="inline-flex rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                            Inactive
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-900">
                        {getProductName(product)}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {getProductDescription(product) || 'No description'}
                      </p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    {getProductPrice(product) !== null && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{getProductPrice(product)}€/person</span>
                      </div>
                    )}
                    {getProductDuration(product) !== null && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{getProductDuration(product)} min</span>
                      </div>
                    )}
                    {(getProductMinGroup(product) !== null ||
                      getProductMaxGroup(product) !== null) && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>
                          {getProductMinGroup(product) || 1}-{getProductMaxGroup(product) || '∞'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.availableSlots.map((slot) => (
                      <span
                        key={slot}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                      >
                        {getSlotLabel(slot)}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.availableDays.map((day) => (
                      <span
                        key={day}
                        className="rounded bg-purple-50 px-2 py-0.5 text-xs text-purple-600"
                      >
                        {DAY_NAMES[day]}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleActive(product.id, product.isActive)}
                      disabled={toggling === product.id}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                        product.isActive
                          ? 'border border-orange-300 text-orange-700 hover:bg-orange-50'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      } disabled:opacity-50`}
                    >
                      {toggling === product.id
                        ? '...'
                        : product.isActive
                          ? 'Deactivate'
                          : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Templates Grid */
        <div className="space-y-4">
          {availableTemplates.length > 0 && (
            <div className="rounded-lg bg-purple-50 p-3 text-sm text-purple-700">
              <strong>{availableTemplates.length}</strong> templates available to add to your
              products
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const isUsed = usedTemplateIds.has(template.id);
              return (
                <div
                  key={template.id}
                  className={`rounded-xl border bg-white p-5 transition-colors ${
                    isUsed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTargetColor(template.target)}`}
                        >
                          {getTargetLabel(template.target)}
                        </span>
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {template.venueType}
                        </span>
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-900">{template.productName}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {template.descriptionTemplate || 'No description'}
                      </p>
                    </div>
                    {isUsed && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Added
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    {template.suggestedPriceMin !== null && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {template.suggestedPriceMin}
                          {template.suggestedPriceMax &&
                            template.suggestedPriceMax !== template.suggestedPriceMin &&
                            `-${template.suggestedPriceMax}`}
                          €
                        </span>
                      </div>
                    )}
                    {template.durationMinutes !== null && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{template.durationMinutes} min</span>
                      </div>
                    )}
                    {(template.minGroupSize !== null || template.maxGroupSize !== null) && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>
                          {template.minGroupSize || 1}-{template.maxGroupSize || '∞'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Includes */}
                  {template.includes && template.includes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {template.includes.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                      {template.includes.length > 3 && (
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                          +{template.includes.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedTemplate(template)}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Preview
                    </button>
                    {isUsed ? (
                      <button
                        disabled
                        className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400"
                      >
                        Already Added
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCreateFromTemplate(template)}
                        disabled={creating === template.id}
                        className="flex-1 rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
                      >
                        {creating === template.id ? 'Adding...' : 'Use Template'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {templates.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900">No templates available</h3>
              <p className="mt-2 text-sm text-gray-500">
                Templates will be available based on your venue type.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTargetColor(selectedTemplate.target)}`}
                  >
                    {getTargetLabel(selectedTemplate.target)}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {selectedTemplate.venueType}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {selectedTemplate.productName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-gray-600">{selectedTemplate.descriptionTemplate}</p>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Suggested Price</span>
                <span className="font-medium">
                  {selectedTemplate.suggestedPriceMin}
                  {selectedTemplate.suggestedPriceMax &&
                    selectedTemplate.suggestedPriceMax !== selectedTemplate.suggestedPriceMin &&
                    `-${selectedTemplate.suggestedPriceMax}`}
                  € per person
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">{selectedTemplate.durationMinutes} minutes</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Group Size</span>
                <span className="font-medium">
                  {selectedTemplate.minGroupSize || 1} -{' '}
                  {selectedTemplate.maxGroupSize || 'No limit'} people
                </span>
              </div>
            </div>

            {selectedTemplate.includes && selectedTemplate.includes.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900">Includes</h3>
                <ul className="mt-2 space-y-1">
                  {selectedTemplate.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {!usedTemplateIds.has(selectedTemplate.id) && (
                <button
                  onClick={() => handleCreateFromTemplate(selectedTemplate)}
                  disabled={creating === selectedTemplate.id}
                  className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
                >
                  {creating === selectedTemplate.id ? 'Adding...' : 'Add to My Products'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTargetColor(selectedProduct.template?.target || null)}`}
                  >
                    {getTargetLabel(selectedProduct.template?.target || null)}
                  </span>
                  {!selectedProduct.isActive && (
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                      Inactive
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {getProductName(selectedProduct)}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-gray-600">
              {getProductDescription(selectedProduct) || 'No description'}
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Price</span>
                <span className="font-medium">
                  {getProductPrice(selectedProduct) ?? 'Not set'}
                  {getProductPrice(selectedProduct) !== null && '€ per person'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">
                  {getProductDuration(selectedProduct) ?? 'Not set'}
                  {getProductDuration(selectedProduct) !== null && ' minutes'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Group Size</span>
                <span className="font-medium">
                  {getProductMinGroup(selectedProduct) || 1} -{' '}
                  {getProductMaxGroup(selectedProduct) || 'No limit'} people
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Max Per Day</span>
                <span className="font-medium">{selectedProduct.maxPerDay ?? 'No limit'}</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Available Slots</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProduct.availableSlots.map((slot) => (
                  <span
                    key={slot}
                    className="rounded bg-purple-100 px-3 py-1 text-sm text-purple-700"
                  >
                    {getSlotLabel(slot)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Available Days</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProduct.availableDays.map((day) => (
                  <span key={day} className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
                    {DAY_NAMES[day]}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(selectedProduct.id)}
                disabled={deleting === selectedProduct.id}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                {deleting === selectedProduct.id ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => {
                  handleToggleActive(selectedProduct.id, selectedProduct.isActive);
                  setSelectedProduct(null);
                }}
                disabled={toggling === selectedProduct.id}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
                  selectedProduct.isActive
                    ? 'border border-orange-300 text-orange-700 hover:bg-orange-50'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } disabled:opacity-50`}
              >
                {selectedProduct.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Tourism Product Tips</h4>
            <p className="mt-1 text-sm text-blue-700">
              Create products specifically for tour groups with group pricing, minimum headcount,
              and pre-set menus to streamline bookings and maximize margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
