'use client';

import { useState, useEffect } from 'react';
import { ChefHat, Bell, Timer, Maximize2, Wifi } from 'lucide-react';

const DEMO_ORDERS = [
  {
    id: 1,
    code: '#A24',
    table: 'T5',
    status: 'queue',
    items: ['2x Signature Latte', '1x Croissant'],
    elapsed: 2,
    type: 'dine-in',
  },
  {
    id: 2,
    code: '#A25',
    table: null,
    status: 'preparing',
    items: ['1x Wagyu Burger', '1x Truffle Fries'],
    elapsed: 8,
    type: 'takeaway',
  },
  {
    id: 3,
    code: '#A23',
    table: 'T2',
    status: 'ready',
    items: ['3x Pasta Carbonara', '2x Caesar Salad'],
    elapsed: 12,
    type: 'dine-in',
  },
];

const FEATURES = [
  {
    icon: Wifi,
    title: 'Real-Time Updates',
    description: 'Orders appear instantly as customers place them. No refresh needed.',
  },
  {
    icon: Timer,
    title: 'Time Tracking',
    description: 'Color-coded timers show how long each order has been waiting.',
  },
  {
    icon: Maximize2,
    title: 'Fullscreen Mode',
    description: 'Designed for kitchen screens. One-click fullscreen toggle.',
  },
  {
    icon: Bell,
    title: 'Sound Alerts',
    description: 'Audio notifications for new orders and status changes.',
  },
];

export function KitchenDisplaySection() {
  const [activeOrders, setActiveOrders] = useState(DEMO_ORDERS);

  // Simulate order status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrders((prev) => {
        const updated = prev.map((order) => ({
          ...order,
          elapsed: order.elapsed + 1,
        }));
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queue':
        return 'bg-blue-900/30 border-blue-500';
      case 'preparing':
        return 'bg-orange-900/30 border-orange-500';
      case 'ready':
        return 'bg-green-900/30 border-green-500';
      default:
        return 'bg-slate-800 border-slate-600';
    }
  };

  const getTimerColor = (elapsed: number, status: string) => {
    if (status === 'ready') return 'text-green-400';
    if (elapsed > 15) return 'text-red-400';
    if (elapsed > 10) return 'text-orange-400';
    if (elapsed > 5) return 'text-yellow-400';
    return 'text-slate-400';
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
            <ChefHat className="h-5 w-5 text-orange-400" />
            <span className="font-medium text-orange-400">Kitchen Operations</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Kitchen Display System</h2>

          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Real-time order management for your kitchen. Track orders from queue to ready with
            color-coded timers and instant notifications.
          </p>
        </div>

        {/* KDS Preview */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          {/* KDS Header */}
          <div className="border-b border-slate-700 bg-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                  <ChefHat className="h-6 w-6" />
                  Kitchen Display
                </h3>
                <span className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-600">
                  Fullscreen
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 border-b border-slate-700 p-4">
            <div className="rounded-xl border border-blue-700 bg-blue-900/30 p-4 text-center">
              <p className="text-sm font-medium text-blue-400">Queue</p>
              <p className="text-3xl font-bold text-blue-300">
                {activeOrders.filter((o) => o.status === 'queue').length}
              </p>
            </div>
            <div className="rounded-xl border border-orange-700 bg-orange-900/30 p-4 text-center">
              <p className="text-sm font-medium text-orange-400">Preparing</p>
              <p className="text-3xl font-bold text-orange-300">
                {activeOrders.filter((o) => o.status === 'preparing').length}
              </p>
            </div>
            <div className="rounded-xl border border-green-700 bg-green-900/30 p-4 text-center">
              <p className="text-sm font-medium text-green-400">Ready</p>
              <p className="text-3xl font-bold text-green-300">
                {activeOrders.filter((o) => o.status === 'ready').length}
              </p>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid gap-4 p-4 md:grid-cols-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className={`rounded-xl border-2 p-4 transition-all ${getStatusColor(order.status)}`}
              >
                {/* Order Header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{order.code}</span>
                    {order.table && (
                      <span className="rounded bg-white/10 px-2 py-0.5 text-sm text-white">
                        {order.table}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono text-lg font-bold ${getTimerColor(order.elapsed, order.status)}`}
                  >
                    {order.elapsed}m
                  </span>
                </div>

                {/* Customer Type */}
                <p className="mb-3 text-sm text-slate-400">
                  {order.type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
                </p>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="rounded-lg bg-white/5 p-2">
                      <p className="text-sm text-white">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full rounded-lg py-2 font-bold text-white transition-colors ${
                    order.status === 'queue'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : order.status === 'preparing'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-slate-600 hover:bg-slate-700'
                  } `}
                >
                  {order.status === 'queue' && 'START'}
                  {order.status === 'preparing' && 'DONE'}
                  {order.status === 'ready' && 'PICKED UP'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                <feature.icon className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Row */}
        <div className="mt-16 grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-400">30%</div>
            <div className="text-slate-300">Faster Order Prep</div>
            <div className="text-sm text-slate-500">Average improvement</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-400">0</div>
            <div className="text-slate-300">Lost Tickets</div>
            <div className="text-sm text-slate-500">Digital tracking</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-400">100%</div>
            <div className="text-slate-300">Order Accuracy</div>
            <div className="text-sm text-slate-500">No more missed items</div>
          </div>
        </div>
      </div>
    </section>
  );
}
