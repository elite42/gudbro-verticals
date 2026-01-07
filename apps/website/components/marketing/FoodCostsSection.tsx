'use client';

import { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  PieChart,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Package,
  Receipt,
} from 'lucide-react';

const FEATURES = [
  {
    id: 'margin-tracker',
    title: 'Real-Time Margin Tracking',
    description:
      'See profit margins for every menu item instantly. Color-coded alerts when margins drop below targets.',
    icon: PieChart,
    color: 'bg-blue-500',
    stats: [
      { label: 'Excellent', value: '>70%', color: 'text-green-500' },
      { label: 'Good', value: '60-70%', color: 'text-emerald-500' },
      { label: 'Warning', value: '50-60%', color: 'text-amber-500' },
      { label: 'Critical', value: '<50%', color: 'text-red-500' },
    ],
  },
  {
    id: 'recipe-costing',
    title: 'Recipe Costing Engine',
    description:
      'Automatic food cost calculation based on your recipes and ingredient prices. Updates when prices change.',
    icon: Calculator,
    color: 'bg-purple-500',
    benefits: [
      'Auto-calculate from recipes',
      'Price change propagation',
      'Portion cost breakdown',
      'Waste factor included',
    ],
  },
  {
    id: 'ingredient-pricing',
    title: 'Ingredient Price Management',
    description:
      'Track supplier prices for all 2,548 ingredients. Compare vendors and optimize purchasing.',
    icon: Package,
    color: 'bg-emerald-500',
    benefits: [
      '2,548 ingredients tracked',
      'Multi-supplier pricing',
      'Price history graphs',
      'Best price alerts',
    ],
  },
  {
    id: 'profitability',
    title: 'Profitability Analysis',
    description:
      'Identify your most and least profitable items. AI suggests price adjustments and menu engineering.',
    icon: TrendingUp,
    color: 'bg-amber-500',
    benefits: [
      'Menu item ranking',
      'Category analysis',
      'AI price suggestions',
      'Menu engineering tips',
    ],
  },
];

const DEMO_ITEMS = [
  { name: 'Margherita Pizza', price: 180000, cost: 45000, margin: 75, status: 'excellent' },
  { name: 'Grilled Salmon', price: 280000, cost: 112000, margin: 60, status: 'good' },
  { name: 'Wagyu Steak', price: 650000, cost: 325000, margin: 50, status: 'warning' },
  { name: 'Truffle Risotto', price: 220000, cost: 132000, margin: 40, status: 'critical' },
];

export function FoodCostsSection() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0]);

  const getMarginColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'good':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatVND = (amount: number) => {
    return `${amount.toLocaleString()}₫`;
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
            <Calculator className="h-5 w-5" />
            <span className="font-medium">Food Cost Intelligence</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Know Your Margins,
            <br />
            <span className="text-emerald-600">Protect Your Profits</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Real-time food cost tracking, recipe costing, and profitability analysis. Never sell a
            dish without knowing your margin.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Feature Cards */}
          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`w-full rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                  activeFeature.id === feature.id
                    ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                } `}
              >
                <div className="flex items-start gap-4">
                  <div className={`${feature.color} rounded-xl p-3`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                  <ArrowRight
                    className={`h-5 w-5 transition-transform ${activeFeature.id === feature.id ? 'translate-x-1 text-emerald-500' : 'text-slate-300'} `}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* Demo Header */}
            <div className="bg-slate-900 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-slate-400">Food Cost Dashboard</span>
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-6">
              {/* Stats Row */}
              <div className="mb-6 grid grid-cols-4 gap-3">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <div className="text-2xl font-bold text-slate-900">156</div>
                  <div className="text-xs text-slate-500">Items</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">62%</div>
                  <div className="text-xs text-blue-500">Avg Margin</div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 text-center">
                  <div className="text-2xl font-bold text-amber-600">8</div>
                  <div className="text-xs text-amber-500">Need Review</div>
                </div>
                <div className="rounded-lg bg-red-50 p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-xs text-red-500">Critical</div>
                </div>
              </div>

              {/* Demo Table */}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                        Item
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                        Cost
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-500">
                        Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEMO_ITEMS.map((item, idx) => (
                      <tr key={idx} className="transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className="font-medium text-slate-900">{item.name}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600">
                          {formatVND(item.price)}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600">
                          {formatVND(item.cost)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getMarginColor(item.status)} `}
                          >
                            {item.margin}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Active Feature Benefits */}
              {activeFeature.benefits && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-emerald-900">
                    <activeFeature.icon className="h-5 w-5" />
                    {activeFeature.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeFeature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Margin Thresholds for first feature */}
              {activeFeature.stats && (
                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <h4 className="mb-3 font-semibold text-slate-900">Margin Thresholds</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {activeFeature.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Benefits */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Increase Profits</h3>
            <p className="text-sm text-slate-600">
              Restaurants using our food cost tools see an average 8% increase in gross profit
              margin.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Early Warnings</h3>
            <p className="text-sm text-slate-600">
              Get alerted before margins become critical. Proactive management prevents profit
              leaks.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Receipt className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">Price Confidence</h3>
            <p className="text-sm text-slate-600">
              Set prices with confidence knowing exactly what each dish costs to make.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
