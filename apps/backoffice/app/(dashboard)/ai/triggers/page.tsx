'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';
import { TriggerModal } from '@/components/ai/TriggerModal';
import Link from 'next/link';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  Lightning,
  Plus,
  Play,
  Pause,
  Trash,
  GearSix,
  TrendUp,
  Users,
  CurrencyDollar,
  Sparkle,
  ArrowsClockwise,
  CaretRight,
  Bell,
  Gift,
  Star,
  WarningCircle,
  CalendarBlank,
  UserMinus,
  Crosshair,
  DotsThreeVertical,
} from '@phosphor-icons/react';

// Types
interface Trigger {
  id: string;
  name: string;
  description: string | null;
  triggerType: string;
  actionType: string;
  isActive: boolean;
  priority: number;
  cooldownDays: number;
  targetSegments: string[];
  createdAt: string;
}

interface TriggerPerformance {
  triggerId: string;
  name: string;
  totalTriggered: number;
  totalConverted: number;
  conversionRate: number;
  estimatedRevenue: number;
}

interface TriggerSuggestion {
  triggerType: string;
  name: string;
  description: string;
  expectedImpact: string;
  actionType: string;
}

import { formatPrice as _fp } from '@gudbro/utils';

function formatCurrency(value: number, currencyCode: string = 'EUR'): string {
  return _fp(value, currencyCode, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Trigger type config
const TRIGGER_TYPE_CONFIG: Record<
  string,
  { icon: React.ElementType; label: string; color: string; bgColor: string }
> = {
  churn_risk: {
    icon: WarningCircle,
    label: 'Churn Risk',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  inactivity: {
    icon: UserMinus,
    label: 'Inactivity',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  birthday: {
    icon: CalendarBlank,
    label: 'Birthday',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  milestone: { icon: Star, label: 'Milestone', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  segment_entry: {
    icon: Crosshair,
    label: 'Segment Entry',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  custom: { icon: GearSix, label: 'Custom', color: 'text-gray-600', bgColor: 'bg-gray-100' },
};

// Action type config
const ACTION_TYPE_CONFIG: Record<string, { icon: React.ElementType; label: string }> = {
  notification: { icon: Bell, label: 'Notification' },
  promo: { icon: Gift, label: 'Promo Code' },
  loyalty_points: { icon: Star, label: 'Loyalty Points' },
  alert_staff: { icon: Users, label: 'Alert Staff' },
};

export default function TriggersPage() {
  const { brand, location } = useTenant();
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [performance, setPerformance] = useState<TriggerPerformance[]>([]);
  const [suggestions, setSuggestions] = useState<TriggerSuggestion[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<Trigger | null>(null);

  const merchantId = brand?.id;
  const currencyCode = location?.currency_code || 'EUR';

  // Fetch data
  const fetchData = async () => {
    if (!merchantId) return;

    try {
      const [triggersRes, perfRes, suggestRes] = await Promise.all([
        fetch(`/api/ai/triggers?merchantId=${merchantId}&action=list`),
        fetch(`/api/ai/triggers?merchantId=${merchantId}&action=performance`),
        fetch(`/api/ai/triggers?merchantId=${merchantId}&action=suggestions`),
      ]);

      const triggersData = await triggersRes.json();
      const perfData = await perfRes.json();
      const suggestData = await suggestRes.json();

      if (triggersData.success) {
        setTriggers(triggersData.triggers || []);
      }

      if (perfData.success) {
        setPerformance(perfData.performance || []);
      }

      if (suggestData.success) {
        setSuggestions(suggestData.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching triggers data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [merchantId]);

  // Run all triggers
  const handleRunAll = async () => {
    if (!merchantId) return;
    setIsRunning(true);

    try {
      const res = await fetch('/api/ai/triggers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, action: 'run-all' }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error running triggers:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // Toggle trigger active state
  const handleToggle = async (triggerId: string, currentState: boolean) => {
    try {
      const res = await fetch('/api/ai/triggers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggerId, isActive: !currentState }),
      });

      const data = await res.json();
      if (data.success) {
        setTriggers((prev) =>
          prev.map((t) => (t.id === triggerId ? { ...t, isActive: !currentState } : t))
        );
      }
    } catch (error) {
      console.error('Error toggling trigger:', error);
    }
    setOpenMenu(null);
  };

  // Delete trigger
  const handleDelete = async (triggerId: string) => {
    if (!confirm('Are you sure you want to delete this trigger?')) return;

    try {
      const res = await fetch(`/api/ai/triggers?triggerId=${triggerId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        setTriggers((prev) => prev.filter((t) => t.id !== triggerId));
      }
    } catch (error) {
      console.error('Error deleting trigger:', error);
    }
    setOpenMenu(null);
  };

  // Save trigger (create or update)
  const handleSaveTrigger = async (input: any) => {
    if (!merchantId) return;

    const isEdit = !!editingTrigger;

    try {
      const res = await fetch('/api/ai/triggers', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          triggerId: editingTrigger?.id,
          ...input,
          action: isEdit ? 'update' : 'create',
        }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchData();
        setIsModalOpen(false);
        setEditingTrigger(null);
      }
    } catch (error) {
      console.error('Error saving trigger:', error);
      throw error;
    }
  };

  // Open modal for create
  const handleCreateTrigger = () => {
    setEditingTrigger(null);
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleEditTrigger = (trigger: Trigger) => {
    setEditingTrigger(trigger);
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  // Calculate stats
  const activeTriggers = triggers.filter((t) => t.isActive).length;
  const totalTriggered = performance.reduce((sum, p) => sum + p.totalTriggered, 0);
  const totalConverted = performance.reduce((sum, p) => sum + p.totalConverted, 0);
  const totalRevenue = performance.reduce((sum, p) => sum + p.estimatedRevenue, 0);
  const avgConversion = totalTriggered > 0 ? (totalConverted / totalTriggered) * 100 : 0;

  // Get performance for a trigger
  const getPerfForTrigger = (triggerId: string) => {
    return performance.find((p) => p.triggerId === triggerId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-2 h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-100" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/ai" className="hover:text-blue-600">
              AI Co-Manager
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Automated Triggers</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automated Triggers</h1>
            <InfoTooltip contentKey="pages.aiTriggers" kbPageId="ai-triggers" />
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Set it and forget it - AI handles customer retention
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRunAll}
            disabled={isRunning || activeTriggers === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <ArrowsClockwise className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            Run All
          </button>
          <button
            onClick={handleCreateTrigger}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Trigger
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Lightning}
          label="Active Triggers"
          value={activeTriggers}
          subtitle={`of ${triggers.length} total`}
          color="blue"
        />
        <StatCard icon={Users} label="Triggered This Month" value={totalTriggered} color="purple" />
        <StatCard
          icon={TrendUp}
          label="Conversion Rate"
          value={`${avgConversion.toFixed(1)}%`}
          subtitle={`${totalConverted} converted`}
          color="green"
        />
        <StatCard
          icon={CurrencyDollar}
          label="Est. Revenue"
          value={formatCurrency(totalRevenue, currencyCode)}
          subtitle="from triggers"
          color="yellow"
        />
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4 dark:border-purple-800 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/50">
              <Sparkle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">AI Suggestion</h3>
              <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
                {suggestions[0].description}
              </p>
              <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                Expected: {suggestions[0].expectedImpact}
              </p>
            </div>
            <button
              onClick={handleCreateTrigger}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              Create This Trigger
            </button>
          </div>
        </div>
      )}

      {/* Triggers List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Triggers</h2>
            <Link
              href="/customers/intelligence"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View Customer Intelligence
            </Link>
          </div>
        </div>

        {triggers.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {triggers.map((trigger) => {
              const typeConfig =
                TRIGGER_TYPE_CONFIG[trigger.triggerType] || TRIGGER_TYPE_CONFIG.custom;
              const actionConfig =
                ACTION_TYPE_CONFIG[trigger.actionType] || ACTION_TYPE_CONFIG.notification;
              const perf = getPerfForTrigger(trigger.id);
              const TypeIcon = typeConfig.icon;
              const ActionIcon = actionConfig.icon;

              return (
                <div
                  key={trigger.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-2 ${typeConfig.bgColor} dark:bg-opacity-20`}>
                      <TypeIcon className={`h-5 w-5 ${typeConfig.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {trigger.name}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            trigger.isActive
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                        >
                          {trigger.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        {trigger.description || `${typeConfig.label} trigger`}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <ActionIcon className="h-3 w-3" />
                          {actionConfig.label}
                        </span>
                        <span>Cooldown: {trigger.cooldownDays}d</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Performance stats */}
                    {perf && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-right">
                          <p className="text-gray-500">Triggered</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {perf.totalTriggered}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Converted</p>
                          <p className="font-medium text-green-600">
                            {perf.totalConverted} ({perf.conversionRate.toFixed(1)}%)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Revenue</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(perf.estimatedRevenue, currencyCode)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === trigger.id ? null : trigger.id)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                      >
                        <DotsThreeVertical className="h-5 w-5" />
                      </button>

                      {openMenu === trigger.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          <button
                            onClick={() => handleToggle(trigger.id, trigger.isActive)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            {trigger.isActive ? (
                              <>
                                <Pause className="h-4 w-4" />
                                Pause Trigger
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4" />
                                Activate Trigger
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleEditTrigger(trigger)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <GearSix className="h-4 w-4" />
                            Edit Trigger
                          </button>
                          <button
                            onClick={() => handleDelete(trigger.id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash className="h-4 w-4" />
                            Delete Trigger
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Lightning className="h-12 w-12" />}
            title="No triggers yet"
            description="Create automated triggers to engage customers and prevent churn."
            action={{
              label: 'Create First Trigger',
              onClick: handleCreateTrigger,
            }}
            variant="minimal"
            size="default"
          />
        )}
      </div>

      {/* How it Works */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="font-medium text-blue-900 dark:text-blue-100">
          How Automated Triggers Work
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>
            <strong>1. Define conditions:</strong> Set up when a trigger should fire (e.g., customer
            inactive for 30 days)
          </li>
          <li>
            <strong>2. Choose action:</strong> Select what happens (notification, promo code,
            loyalty points)
          </li>
          <li>
            <strong>3. AI runs automatically:</strong> The system checks customers and executes
            triggers
          </li>
          <li>
            <strong>4. Track results:</strong> Monitor conversion rates and revenue impact
          </li>
        </ul>
      </div>

      {/* Trigger Modal */}
      <TriggerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTrigger(null);
        }}
        trigger={
          editingTrigger
            ? {
                id: editingTrigger.id,
                name: editingTrigger.name,
                description: editingTrigger.description,
                triggerType: editingTrigger.triggerType as any,
                conditions: {},
                actionType: editingTrigger.actionType as any,
                actionConfig: {},
                cooldownDays: editingTrigger.cooldownDays,
                targetSegments: editingTrigger.targetSegments,
                excludeSegments: [],
                minClv: null,
                maxClv: null,
                isActive: editingTrigger.isActive,
              }
            : undefined
        }
        onSave={handleSaveTrigger}
        merchantId={merchantId || ''}
        currencyCode={currencyCode}
      />
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  color: 'green' | 'blue' | 'purple' | 'yellow';
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
