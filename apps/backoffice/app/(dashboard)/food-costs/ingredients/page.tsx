'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MultiLangText {
  en?: string;
  vi?: string;
  ko?: string;
  ja?: string;
}

interface Ingredient {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  cost_per_unit: number | null;
  cost_unit: string;
  cost_currency: string;
  supplier_name: string | null;
  supplier_sku: string | null;
  cost_updated_at: string | null;
  is_global: boolean;
}

// Common units for costs
const COST_UNITS = [
  { value: 'kg', label: 'per kg', category: 'weight' },
  { value: 'g', label: 'per gram', category: 'weight' },
  { value: 'lb', label: 'per lb', category: 'weight' },
  { value: 'oz', label: 'per oz', category: 'weight' },
  { value: 'L', label: 'per liter', category: 'volume' },
  { value: 'ml', label: 'per ml', category: 'volume' },
  { value: 'piece', label: 'per piece', category: 'count' },
  { value: 'dozen', label: 'per dozen', category: 'count' },
  { value: 'pack', label: 'per pack', category: 'count' },
];

// Common currencies
const CURRENCIES = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
];

export default function IngredientCostsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterNoCost, setFilterNoCost] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    cost_per_unit: '',
    cost_unit: 'kg',
    cost_currency: 'VND',
    supplier_name: '',
    supplier_sku: '',
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ingredients')
        .select('id, slug, name_multilang, cost_per_unit, cost_unit, cost_currency, supplier_name, supplier_sku, cost_updated_at, is_global')
        .order('name_multilang->en');

      if (error) throw error;
      setIngredients(data || []);
    } catch (err) {
      console.error('Error fetching ingredients:', err);
    } finally {
      setLoading(false);
    }
  }

  const getName = (multilang: MultiLangText | null): string => {
    if (!multilang) return 'Unnamed';
    return multilang.en || multilang.vi || 'Unnamed';
  };

  const startEdit = (ingredient: Ingredient) => {
    setEditingId(ingredient.id);
    setEditForm({
      cost_per_unit: ingredient.cost_per_unit?.toString() || '',
      cost_unit: ingredient.cost_unit || 'kg',
      cost_currency: ingredient.cost_currency || 'VND',
      supplier_name: ingredient.supplier_name || '',
      supplier_sku: ingredient.supplier_sku || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      cost_per_unit: '',
      cost_unit: 'kg',
      cost_currency: 'VND',
      supplier_name: '',
      supplier_sku: '',
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('ingredients')
        .update({
          cost_per_unit: editForm.cost_per_unit ? parseFloat(editForm.cost_per_unit) : null,
          cost_unit: editForm.cost_unit,
          cost_currency: editForm.cost_currency,
          supplier_name: editForm.supplier_name || null,
          supplier_sku: editForm.supplier_sku || null,
          cost_updated_at: new Date().toISOString(),
        })
        .eq('id', editingId);

      if (error) throw error;

      // Update local state
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === editingId
            ? {
                ...ing,
                cost_per_unit: editForm.cost_per_unit ? parseFloat(editForm.cost_per_unit) : null,
                cost_unit: editForm.cost_unit,
                cost_currency: editForm.cost_currency,
                supplier_name: editForm.supplier_name || null,
                supplier_sku: editForm.supplier_sku || null,
                cost_updated_at: new Date().toISOString(),
              }
            : ing
        )
      );

      setEditingId(null);
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save cost');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number | null, currency: string): string => {
    if (amount === null) return '-';
    const curr = CURRENCIES.find((c) => c.code === currency);
    const symbol = curr?.symbol || currency;

    if (currency === 'VND') {
      return `${symbol}${amount.toLocaleString()}`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Filter ingredients
  const filteredIngredients = ingredients.filter((ing) => {
    const name = getName(ing.name_multilang).toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const matchesNoCost = filterNoCost ? ing.cost_per_unit === null : true;
    return matchesSearch && matchesNoCost;
  });

  // Stats
  const stats = {
    total: ingredients.length,
    withCost: ingredients.filter((i) => i.cost_per_unit !== null).length,
    noCost: ingredients.filter((i) => i.cost_per_unit === null).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ingredients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/food-costs" className="hover:text-blue-600">Food Costs</Link>
            <span>/</span>
            <span className="text-gray-900">Ingredient Costs</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ingredient Costs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set purchase costs for each ingredient to calculate food costs
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Ingredients</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-sm text-green-600">With Cost Data</p>
          <p className="text-2xl font-bold text-green-700">{stats.withCost}</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-600">Missing Cost</p>
          <p className="text-2xl font-bold text-amber-700">{stats.noCost}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setFilterNoCost(!filterNoCost)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterNoCost
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Show Missing Only
        </button>
      </div>

      {/* Ingredients Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ingredient</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredIngredients.map((ingredient) => {
              const isEditing = editingId === ingredient.id;

              return (
                <tr key={ingredient.id} className={`${isEditing ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {getName(ingredient.name_multilang)}
                    </div>
                    <div className="text-xs text-gray-500">{ingredient.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={editForm.cost_currency}
                          onChange={(e) => setEditForm({ ...editForm, cost_currency: e.target.value })}
                          className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        >
                          {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>{c.code}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={editForm.cost_per_unit}
                          onChange={(e) => setEditForm({ ...editForm, cost_per_unit: e.target.value })}
                          placeholder="0.00"
                          step="0.01"
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <select
                          value={editForm.cost_unit}
                          onChange={(e) => setEditForm({ ...editForm, cost_unit: e.target.value })}
                          className="w-28 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        >
                          {COST_UNITS.map((u) => (
                            <option key={u.value} value={u.value}>{u.label}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        {ingredient.cost_per_unit !== null ? (
                          <div>
                            <span className="font-medium text-gray-900">
                              {formatCurrency(ingredient.cost_per_unit, ingredient.cost_currency)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              / {ingredient.cost_unit}
                            </span>
                          </div>
                        ) : (
                          <span className="text-amber-600 text-sm font-medium">Not set</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={editForm.supplier_name}
                          onChange={(e) => setEditForm({ ...editForm, supplier_name: e.target.value })}
                          placeholder="Supplier name"
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          value={editForm.supplier_sku}
                          onChange={(e) => setEditForm({ ...editForm, supplier_sku: e.target.value })}
                          placeholder="SKU / Code"
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    ) : (
                      <div>
                        {ingredient.supplier_name ? (
                          <div>
                            <div className="text-sm text-gray-900">{ingredient.supplier_name}</div>
                            {ingredient.supplier_sku && (
                              <div className="text-xs text-gray-500">SKU: {ingredient.supplier_sku}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">
                      {formatDate(ingredient.cost_updated_at)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEdit}
                          disabled={saving}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(ingredient)}
                        className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium"
                      >
                        Edit Cost
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💰</div>
            <p className="text-gray-500">No ingredients found</p>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900">How Ingredient Costs Work</h3>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>Set the purchase cost per unit (e.g., cost per kg of coffee beans)</li>
          <li>When you add ingredients to product recipes, the system calculates total food cost</li>
          <li>Food cost is automatically updated when you change ingredient costs</li>
          <li>Track suppliers and SKUs for easy reordering</li>
        </ul>
      </div>
    </div>
  );
}
