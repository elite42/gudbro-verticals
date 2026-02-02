'use client';

/**
 * Dashboard Home Page
 *
 * Shows:
 * - Welcome message
 * - Quick stats (requests, orders, tables)
 * - Recent activity
 * - Quick actions
 */

import { useAuth } from '@/components/providers/AuthProvider';
import {
  Bell,
  ClipboardText,
  Chair,
  Lightning,
  ArrowRight,
  Clock,
  CheckCircle,
  Warning
} from '@phosphor-icons/react';
import Link from 'next/link';

// Mock data - will be replaced with real data from API
const mockStats = {
  pendingRequests: 3,
  activeOrders: 8,
  myTables: 5,
};

const mockRecentActivity = [
  { id: 1, type: 'request', message: 'Tavolo 7 - Richiesta conto', time: '2 min fa', urgent: true },
  { id: 2, type: 'order', message: 'Tavolo 3 - Nuovo ordine (#1234)', time: '5 min fa', urgent: false },
  { id: 3, type: 'complete', message: 'Tavolo 12 - Ordine completato', time: '8 min fa', urgent: false },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buongiorno';
    if (hour < 18) return 'Buon pomeriggio';
    return 'Buonasera';
  };

  return (
    <div className="p-4 space-y-6">
      {/* Welcome section */}
      <section className="bg-gradient-to-br from-theme-brand-primary to-blue-600 rounded-2xl p-6 text-white">
        <p className="text-blue-100">{getGreeting()}</p>
        <h2 className="text-2xl font-bold mt-1">{user?.name || 'Cameriere'}</h2>
        <p className="text-blue-100 mt-2 text-sm">
          Hai {mockStats.pendingRequests} richieste in attesa
        </p>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-3 gap-3">
        <Link href="/requests" className="card-interactive p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
            <Bell size={24} weight="duotone" className="text-red-600 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold text-theme-text-primary">{mockStats.pendingRequests}</p>
          <p className="text-xs text-theme-text-secondary">Richieste</p>
        </Link>

        <Link href="/orders" className="card-interactive p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <ClipboardText size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-theme-text-primary">{mockStats.activeOrders}</p>
          <p className="text-xs text-theme-text-secondary">Ordini</p>
        </Link>

        <Link href="/tables" className="card-interactive p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <Chair size={24} weight="duotone" className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-theme-text-primary">{mockStats.myTables}</p>
          <p className="text-xs text-theme-text-secondary">Tavoli</p>
        </Link>
      </section>

      {/* Quick actions */}
      <section>
        <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide mb-3">
          Azioni rapide
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/scan"
            className="card-interactive p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-theme-brand-secondary rounded-xl flex items-center justify-center">
              <Lightning size={20} weight="bold" className="text-theme-brand-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-theme-text-primary">Scan Tavolo</p>
              <p className="text-xs text-theme-text-tertiary">Assegna rapidamente</p>
            </div>
          </Link>

          <Link
            href="/requests"
            className="card-interactive p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
              <Bell size={20} weight="bold" className="text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-theme-text-primary">Richieste</p>
              <p className="text-xs text-theme-text-tertiary">{mockStats.pendingRequests} in attesa</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
            Attivita recente
          </h3>
          <Link href="/orders" className="text-sm text-theme-brand-primary font-medium flex items-center gap-1">
            Vedi tutto
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="space-y-2">
          {mockRecentActivity.map((activity) => (
            <div
              key={activity.id}
              className={`card p-4 flex items-start gap-3 ${activity.urgent ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.urgent
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : activity.type === 'complete'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {activity.urgent ? (
                  <Warning size={16} weight="bold" className="text-red-600 dark:text-red-400" />
                ) : activity.type === 'complete' ? (
                  <CheckCircle size={16} weight="bold" className="text-green-600 dark:text-green-400" />
                ) : (
                  <Clock size={16} weight="bold" className="text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${activity.urgent ? 'text-red-700 dark:text-red-300' : 'text-theme-text-primary'}`}>
                  {activity.message}
                </p>
                <p className="text-xs text-theme-text-tertiary mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
