'use client';

import { useState } from 'react';
import {
  Bot,
  Brain,
  MessageSquare,
  TrendingUp,
  Calendar,
  Users,
  ShoppingCart,
  FileText,
  Zap,
  Target,
  Bell,
  Sparkles,
  ChefHat,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const AI_SERVICES = [
  {
    id: 'chat',
    name: 'AI Chat Assistant',
    description: 'Natural language interface to manage your entire business',
    icon: MessageSquare,
    examples: [
      '"Show me yesterday\'s best sellers"',
      '"Create a Valentine\'s Day event"',
      '"What\'s my food cost this week?"',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'briefings',
    name: 'Daily Briefings',
    description: 'Wake up to AI-generated insights about your business',
    icon: Bell,
    examples: ['Morning summary', 'Action items', 'Anomaly alerts'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'proactive',
    name: 'Proactive Alerts',
    description: 'AI monitors your business 24/7 and alerts you to issues',
    icon: Zap,
    examples: ['Low stock warnings', 'Unusual sales patterns', 'Review spikes'],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'social',
    name: 'Social Media Manager',
    description: 'Auto-generated posts, content calendars, and scheduling',
    icon: Calendar,
    examples: ['Weekly content plan', 'Event promotions', 'Menu highlights'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'financial',
    name: 'Financial Advisor',
    description: 'P&L analysis, budget planning, and revenue forecasts',
    icon: DollarSign,
    examples: ['Monthly P&L', 'Cost optimization', 'Revenue projections'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'market',
    name: 'Market Intelligence',
    description: 'Zone analysis, competitor tracking, and pricing insights',
    icon: Target,
    examples: ['Competitor prices', 'Local trends', 'Partnership opportunities'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'inventory',
    name: 'Inventory Negotiator',
    description: 'Supplier management, auto-orders, and cost negotiation',
    icon: ShoppingCart,
    examples: ['Auto reorder', 'Supplier comparison', 'Bulk discounts'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'tasks',
    name: 'Task Delegation',
    description: 'Assign tasks to staff with AI-optimized scheduling',
    icon: Users,
    examples: ['Staff assignments', 'Shift optimization', 'Performance tracking'],
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'workflows',
    name: 'Agentic Workflows',
    description: 'Multi-step automations that run on autopilot',
    icon: Sparkles,
    examples: ['End-of-day reports', 'Weekly ordering', 'Monthly reviews'],
    color: 'from-fuchsia-500 to-purple-500',
  },
];

const STATS = [
  { value: '13', label: 'AI Services', icon: Brain },
  { value: '24/7', label: 'Monitoring', icon: Clock },
  { value: '10+', label: 'Database Tables', icon: FileText },
  { value: '85%', label: 'Time Saved', icon: TrendingUp },
];

export function AICoManagerSection() {
  const [activeService, setActiveService] = useState(AI_SERVICES[0]);
  const [, setIsHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Bot className="h-5 w-5 text-blue-400" />
            <span className="font-medium text-blue-400">AI-Powered Management</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Your AI Co-Manager</h2>

          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            13 specialized AI services working together to manage your restaurant. From daily
            briefings to inventory negotiation, your AI never sleeps.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-blue-400" />
              <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content - Service Grid + Detail */}
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Service Grid */}
          <div className="grid grid-cols-3 gap-3">
            {AI_SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                onMouseEnter={() => setIsHovered(service.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`relative rounded-xl p-4 transition-all duration-300 ${
                  activeService.id === service.id
                    ? 'scale-105 border-2 border-blue-500 bg-white/10'
                    : 'hover:scale-102 border border-white/10 bg-white/5 hover:bg-white/10'
                } `}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${service.color} mx-auto mb-3 flex items-center justify-center`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <div className="line-clamp-2 text-center text-sm font-medium text-white">
                  {service.name}
                </div>

                {/* Active indicator */}
                {activeService.id === service.id && (
                  <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Service Detail */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-start gap-4">
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${activeService.color} flex flex-shrink-0 items-center justify-center`}
              >
                <activeService.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">{activeService.name}</h3>
                <p className="text-slate-300">{activeService.description}</p>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div className="text-sm uppercase tracking-wider text-slate-400">
                Example capabilities
              </div>
              {activeService.examples.map((example, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <span className="text-white">{example}</span>
                </div>
              ))}
            </div>

            {/* Chat Preview */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-sm text-slate-400">AI Co-Manager Online</span>
              </div>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-2 text-sm text-blue-200">
                  {activeService.examples[0]}
                </div>
                <div className="ml-auto max-w-[80%] rounded-lg bg-slate-700/50 px-3 py-2 text-sm text-slate-300">
                  Processing your request with {activeService.name}...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              <ChefHat className="h-5 w-5" />
              Get Your AI Co-Manager
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="text-slate-400">Included in Pro & Enterprise plans</span>
          </div>
        </div>
      </div>
    </section>
  );
}
