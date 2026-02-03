'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';
import Link from 'next/link';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Sparkle,
  Sun,
  CheckCircle,
  Warning,
  TrendUp,
  CalendarBlank,
  Package,
  CurrencyDollar,
  Users,
  ChatTeardrop,
  ArrowsClockwise,
  CaretRight,
  Clock,
  Lightbulb,
  Lightning,
  UserMinus,
} from '@phosphor-icons/react';
import { LearningProgressWidget } from '@/components/ai/LearningProgressWidget';

// Types
interface DailyBriefing {
  id: string;
  date: string;
  summary: string;
  highlights: string[];
  alerts: { type: string; message: string; priority: string }[];
  suggestions: { title: string; description: string; impact: string }[];
}

interface DelegatedTask {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  due_date: string;
  status: string;
  priority: string;
}

interface InventoryAlert {
  id: string;
  name: string;
  current_quantity: number;
  min_quantity: number;
  unit: string;
}

interface FinancialSummary {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  profit_margin: number;
}

interface CustomerIntelSummary {
  totalCustomers: number;
  highRiskCount: number;
  totalClv: number;
  avgClv: number;
}

interface TriggersSummary {
  activeTriggers: number;
  totalTriggered: number;
  totalConverted: number;
  conversionRate: number;
  estimatedRevenue: number;
}

export default function AIPage() {
  const { brand, location } = useTenant();
  const [isLoading, setIsLoading] = useState(true);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [tasks, setTasks] = useState<DelegatedTask[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [customerIntel, setCustomerIntel] = useState<CustomerIntelSummary | null>(null);
  const [triggersSummary, setTriggersSummary] = useState<TriggersSummary | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Get currency from location settings
  const currencyCode = location?.currency_code || 'EUR';

  // Use brand.id as merchantId (brand represents the merchant/business)
  const merchantId = brand?.id || 'demo-merchant';

  // Fetch all AI data
  const fetchAIData = async () => {
    setRefreshing(true);
    try {
      // Fetch in parallel
      const [briefingRes, tasksRes, inventoryRes, financeRes, customerIntelRes, triggersRes] =
        await Promise.all([
          fetch(`/api/ai/proactivity?merchantId=${merchantId}&type=briefing`).then((r) => r.json()),
          fetch(`/api/ai/tasks?merchantId=${merchantId}`).then((r) => r.json()),
          fetch(`/api/ai/inventory?merchantId=${merchantId}&type=alerts`).then((r) => r.json()),
          fetch(`/api/ai/finance?merchantId=${merchantId}&type=summary`).then((r) => r.json()),
          fetch(`/api/ai/customer-intelligence?merchantId=${merchantId}&action=summary`).then((r) =>
            r.json()
          ),
          fetch(`/api/ai/triggers?merchantId=${merchantId}&action=performance`).then((r) =>
            r.json()
          ),
        ]);

      if (briefingRes.briefing) setBriefing(briefingRes.briefing);
      if (tasksRes.tasks) setTasks(tasksRes.tasks);
      if (inventoryRes.lowStockItems) setInventoryAlerts(inventoryRes.lowStockItems);
      if (financeRes.summary) setFinancialSummary(financeRes.summary);
      if (customerIntelRes.success && customerIntelRes.summary) {
        setCustomerIntel(customerIntelRes.summary);
      }
      if (triggersRes.success && triggersRes.performance) {
        // Calculate summary from performance array
        const perf = triggersRes.performance as Array<{
          totalTriggered: number;
          totalConverted: number;
          estimatedRevenue: number;
        }>;
        const totalTriggered = perf.reduce((sum, p) => sum + p.totalTriggered, 0);
        const totalConverted = perf.reduce((sum, p) => sum + p.totalConverted, 0);
        const estimatedRevenue = perf.reduce((sum, p) => sum + p.estimatedRevenue, 0);
        setTriggersSummary({
          activeTriggers: perf.length,
          totalTriggered,
          totalConverted,
          conversionRate: totalTriggered > 0 ? (totalConverted / totalTriggered) * 100 : 0,
          estimatedRevenue,
        });
      }
    } catch (error) {
      console.error('Error fetching AI data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAIData();
  }, [merchantId]);

  // Generate new briefing
  const generateBriefing = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/ai/proactivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          locationId: location?.id,
          type: 'generate_briefing',
        }),
      });
      const data = await res.json();
      if (data.briefing) setBriefing(data.briefing);
    } catch (error) {
      console.error('Error generating briefing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <Sparkle className="mx-auto h-12 w-12 animate-pulse text-blue-500" />
          <p className="mt-4 text-gray-500">Caricamento AI Co-Manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <Sparkle className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Co-Manager</h1>
              <InfoTooltip contentKey="pages.aiChat" kbPageId="ai-co-manager" />
            </div>
            <p className="text-sm text-gray-500">Il tuo assistente intelligente per la gestione</p>
          </div>
        </div>
        <button
          onClick={fetchAIData}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ArrowsClockwise className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Aggiorna
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CheckCircle}
          label="Task Completati"
          value={tasks.filter((t) => t.status === 'completed').length}
          total={tasks.length}
          color="green"
        />
        <StatCard
          icon={Warning}
          label="Alert Attivi"
          value={inventoryAlerts.length}
          color="yellow"
        />
        <StatCard
          icon={TrendUp}
          label="Margine Profitto"
          value={financialSummary ? `${financialSummary.profit_margin.toFixed(1)}%` : '-'}
          color="blue"
        />
        <StatCard
          icon={ChatTeardrop}
          label="Conversazioni AI"
          value="12"
          subtitle="questa settimana"
          color="purple"
        />
      </div>

      {/* AI Learning Progress */}
      <LearningProgressWidget />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Briefing */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Briefing Giornaliero
              </h2>
            </div>
            <button
              onClick={generateBriefing}
              disabled={refreshing}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Genera nuovo
            </button>
          </div>

          {briefing ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">{briefing.summary}</p>

              {briefing.highlights && briefing.highlights.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Highlights
                  </h4>
                  <ul className="space-y-1">
                    {briefing.highlights.slice(0, 3).map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {briefing.alerts && briefing.alerts.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attenzione
                  </h4>
                  {briefing.alerts.slice(0, 2).map((alert, i) => (
                    <div
                      key={i}
                      className={`mb-2 rounded-lg p-3 text-sm ${
                        alert.priority === 'high'
                          ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Sun className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">Nessun briefing disponibile</p>
              <button
                onClick={generateBriefing}
                className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Genera il tuo primo briefing
              </button>
            </div>
          )}
        </div>

        {/* Delegated Tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Task Delegati</h2>
            </div>
            <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Vedi tutti <CaretRight className="h-4 w-4" />
            </button>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${
                      task.status === 'completed'
                        ? 'bg-green-500'
                        : task.status === 'in_progress'
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {task.assigned_to}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(task.due_date).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">Nessun task delegato</p>
              <p className="mt-1 text-sm text-gray-400">
                Chiedi all&apos;AI di creare task per il tuo team
              </p>
            </div>
          )}
        </div>

        {/* Inventory Alerts */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Alert Inventario
              </h2>
            </div>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
              {inventoryAlerts.length} low stock
            </span>
          </div>

          {inventoryAlerts.length > 0 ? (
            <div className="space-y-3">
              {inventoryAlerts.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-orange-50 p-3 dark:bg-orange-900/10"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Min: {item.min_quantity} {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      {item.current_quantity}
                    </p>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Package className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">Inventario OK</p>
              <p className="mt-1 text-sm text-gray-400">Nessun prodotto sotto scorta</p>
            </div>
          )}
        </div>

        {/* Financial Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CurrencyDollar className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Riepilogo Finanziario
              </h2>
            </div>
            <span className="text-sm text-gray-500">Questo mese</span>
          </div>

          {financialSummary ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Ricavi</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {financialSummary.revenue.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Spese</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {financialSummary.expenses.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">Profitto Netto</p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      {financialSummary.profit.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">Margine</p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      {financialSummary.profit_margin.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CurrencyDollar className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">Dati finanziari non disponibili</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Intelligence & Triggers Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Intelligence Widget */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserMinus className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Customer Intelligence
              </h2>
            </div>
            <Link
              href="/customers/intelligence"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All <CaretRight className="h-4 w-4" />
            </Link>
          </div>

          {customerIntel ? (
            <div className="space-y-4">
              {customerIntel.highRiskCount > 0 && (
                <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                  <div className="flex items-center gap-2">
                    <Warning className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="font-medium text-red-700 dark:text-red-300">
                      {customerIntel.highRiskCount} customers at risk
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    Potential revenue loss - take action now
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Total CLV</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: currencyCode,
                      minimumFractionDigits: 0,
                    }).format(customerIntel.totalClv)}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <p className="text-sm text-gray-500">Customers</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {customerIntel.totalCustomers}
                  </p>
                </div>
              </div>

              <Link
                href="/customers/intelligence"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
              >
                View At-Risk Customers
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UserMinus className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">No intelligence data yet</p>
              <Link
                href="/customers/intelligence"
                className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Set up Customer Intelligence
              </Link>
            </div>
          )}
        </div>

        {/* Automated Triggers Widget */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightning className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Automated Triggers
              </h2>
            </div>
            <Link
              href="/ai/triggers"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Manage <CaretRight className="h-4 w-4" />
            </Link>
          </div>

          {triggersSummary ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/20">
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {triggersSummary.activeTriggers}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Active</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/20">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {triggersSummary.conversionRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Conversion</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/20">
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: currencyCode,
                      minimumFractionDigits: 0,
                      notation: 'compact',
                    }).format(triggersSummary.estimatedRevenue)}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">Revenue</p>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-3 dark:from-purple-900/10 dark:to-blue-900/10">
                <div className="flex items-center gap-2">
                  <Sparkle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    AI Suggestion
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Create a &quot;Win-back&quot; trigger for inactive customers
                </p>
              </div>

              <Link
                href="/ai/triggers"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                <Lightning className="h-4 w-4" />
                Create New Trigger
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Lightning className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">No triggers configured</p>
              <Link
                href="/ai/triggers"
                className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Set up Automated Triggers
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-gray-700 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Suggerimenti AI</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Ottimizza il menu',
              description: 'Analizza le vendite e suggerisci modifiche per aumentare i profitti',
              action: 'Analizza',
            },
            {
              title: 'Pianifica social',
              description: 'Genera un calendario di contenuti per la prossima settimana',
              action: 'Pianifica',
            },
            {
              title: 'Riordina scorte',
              description: 'Crea ordini automatici per gli articoli in esaurimento',
              action: 'Riordina',
            },
          ].map((suggestion, i) => (
            <div key={i} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-white">{suggestion.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{suggestion.description}</p>
              <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {suggestion.action} &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  total,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  total?: number;
  subtitle?: string;
  color: 'green' | 'yellow' | 'blue' | 'purple';
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {value}
            {total !== undefined && (
              <span className="text-sm font-normal text-gray-400">/{total}</span>
            )}
          </p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
