'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { X, MagnifyingGlass, ShoppingBag, SpinnerGap, CheckCircle } from '@phosphor-icons/react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FnbProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  category: string | null;
}

interface TargetCategory {
  id: string;
  name: string;
}

interface ImportFromMenuDialogProps {
  open: boolean;
  onClose: () => void;
  categories: TargetCategory[];
  merchantId: string;
  onImported: () => void;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ImportFromMenuDialog({
  open,
  onClose,
  categories,
  merchantId,
  onImported,
}: ImportFromMenuDialogProps) {
  const [products, setProducts] = useState<FnbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [targetCategoryId, setTargetCategoryId] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  // Set default target category
  useEffect(() => {
    if (categories.length > 0 && !targetCategoryId) {
      setTargetCategoryId(categories[0].id);
    }
  }, [categories, targetCategoryId]);

  // Fetch F&B products when dialog opens
  useEffect(() => {
    if (!open || !merchantId) return;

    setIsLoading(true);
    setError(null);
    setSelected(new Set());
    setSuccessCount(null);

    fetch(`/api/settings/services/import-from-menu?merchantId=${merchantId}`, {
      headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        console.error('[ImportFromMenuDialog] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [open, merchantId]);

  // Group products by category
  const grouped = useMemo(() => {
    const q = search.toLowerCase().trim();
    const filtered = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q))
        )
      : products;

    const groups = new Map<string, FnbProduct[]>();
    for (const p of filtered) {
      const cat = p.category || 'Uncategorized';
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat)!.push(p);
    }
    return groups;
  }, [products, search]);

  // Toggle selection
  const toggleSelect = useCallback((productId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  // Import selected items
  const handleImport = async () => {
    if (selected.size === 0 || !targetCategoryId) return;

    setIsImporting(true);
    setError(null);

    try {
      const items = Array.from(selected).map((productId) => ({
        productId,
        categoryId: targetCategoryId,
      }));

      const res = await fetch('/api/settings/services/import-from-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ merchantId, items }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Import failed');
      }

      const data = await res.json();
      setSuccessCount(data.count || 0);
      onImported();

      // Auto-close after brief success display
      setTimeout(() => {
        onClose();
        setSuccessCount(null);
        setSelected(new Set());
      }, 1500);
    } catch (err) {
      console.error('[ImportFromMenuDialog] import error:', err);
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} weight="duotone" className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Import from Menu</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {successCount !== null && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
            <CheckCircle size={48} weight="fill" className="text-green-500" />
            <p className="text-base font-medium text-gray-900">
              {successCount} {successCount === 1 ? 'item' : 'items'} imported successfully
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && successCount === null && (
          <div className="flex flex-1 items-center justify-center p-12">
            <SpinnerGap size={24} className="animate-spin text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Loading menu items...</span>
          </div>
        )}

        {/* Error */}
        {error && successCount === null && (
          <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && products.length === 0 && successCount === null && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-12 text-center">
            <ShoppingBag size={40} className="text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No F&B products found</p>
            <p className="text-xs text-gray-400">
              Set up your digital menu first to import items here.
            </p>
          </div>
        )}

        {/* Product list */}
        {!isLoading && products.length > 0 && successCount === null && (
          <>
            {/* Search */}
            <div className="border-b border-gray-100 px-5 py-3">
              <div className="relative">
                <MagnifyingGlass
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Scrollable product list */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {Array.from(grouped.entries()).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {items.map((product) => (
                      <label
                        key={product.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-9 w-9 rounded-lg object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                          {product.description && (
                            <p className="truncate text-xs text-gray-500">{product.description}</p>
                          )}
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                          {(product.price / 100).toFixed(2)} {product.currency}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer: category picker + import button */}
            <div className="border-t border-gray-200 px-5 py-4">
              <div className="mb-3 flex items-center gap-2">
                <label htmlFor="target-category" className="text-xs font-medium text-gray-600">
                  Import into:
                </label>
                <select
                  id="target-category"
                  value={targetCategoryId}
                  onChange={(e) => setTargetCategoryId(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleImport}
                disabled={selected.size === 0 || isImporting || !targetCategoryId}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isImporting
                  ? 'Importing...'
                  : `Import ${selected.size} ${selected.size === 1 ? 'item' : 'items'}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
