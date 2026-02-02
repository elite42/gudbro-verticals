'use client';

/**
 * Demo Hub Client Component
 *
 * Landing page con Bento Grid per presentazioni B2B.
 * Design: Modern Bento Grid - ispirato a Linear/Apple
 */

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Coffee,
  Sparkle,
  Buildings,
  Car,
  Flower,
  ArrowUpRight,
  Globe,
  Devices,
  Lightning,
  Play,
} from '@phosphor-icons/react';

// Vertical configurations
interface Vertical {
  id: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  status: 'live' | 'coming-soon' | 'beta';
  color: string;
  bgColor: string;
  size: 'large' | 'medium' | 'small';
  links?: { label: string; href: string; version?: string }[];
}

const VERTICALS: Vertical[] = [
  {
    id: 'coffeeshop',
    name: 'Coffee & Restaurant',
    tagline: 'Digital menu, QR codes, multi-language, allergens',
    icon: Coffee,
    status: 'live',
    color: '#c2410c',
    bgColor: '#fff7ed',
    size: 'large',
    links: [
      { label: 'Classic', href: '/?legacy=true', version: 'v1' },
      { label: 'Modern', href: '/v2', version: 'v2' },
    ],
  },
  {
    id: 'spa',
    name: 'Wellness & Spa',
    tagline: 'Treatments, bookings, therapist profiles',
    icon: Flower,
    status: 'coming-soon',
    color: '#0d9488',
    bgColor: '#f0fdfa',
    size: 'medium',
  },
  {
    id: 'hotel',
    name: 'Hotel & Resort',
    tagline: 'Room service, concierge, amenities',
    icon: Buildings,
    status: 'coming-soon',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    size: 'medium',
  },
  {
    id: 'rental',
    name: 'Vehicle Rental',
    tagline: 'Fleet catalog, bookings, pricing',
    icon: Car,
    status: 'coming-soon',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    size: 'small',
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DemoHubClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#fafaf9' }}>
        <div className="h-8 w-8 animate-spin rounded-full" style={{ border: '2px solid #d6d3d1', borderTopColor: '#57534e' }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      data-theme="light"
      style={{ backgroundColor: '#fafaf9', color: '#1c1917' }}
    >
      {/* Header */}
      <header className="px-6 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25">
              <Sparkle weight="fill" size={22} />
            </div>
            <span className="text-xl font-semibold tracking-tight" style={{ color: '#1c1917' }}>
              GUDBRO
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-12 pt-4 md:px-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: '#1c1917' }}>
              Demo Hub
            </h1>
            <p className="mt-4 max-w-xl text-lg" style={{ color: '#78716c' }}>
              Explore our digital solutions for hospitality. Click on any product to see it in action.
            </p>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              { icon: Globe, label: '15+ Languages' },
              { icon: Devices, label: 'Mobile-First' },
              { icon: Lightning, label: 'AI-Powered' },
            ].map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm"
                style={{ backgroundColor: '#ffffff', color: '#57534e', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', border: '1px solid rgba(214, 211, 209, 0.5)' }}
              >
                <tag.icon size={16} weight="bold" />
                {tag.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 pb-20 md:px-12">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[200px]">
            {VERTICALS.map((vertical, index) => (
              <BentoCard key={vertical.id} vertical={vertical} index={index} />
            ))}

            {/* Extra decorative card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center rounded-3xl p-6"
              style={{ background: 'linear-gradient(to bottom right, #f5f5f4, #fafaf9)', border: '1px solid rgba(214, 211, 209, 0.5)' }}
            >
              <p className="text-center text-sm" style={{ color: '#a8a29e' }}>
                More verticals coming soon...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 md:px-12" style={{ borderTop: '1px solid #e7e5e4' }}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm" style={{ color: '#a8a29e' }}>
            © {new Date().getFullYear()} GUDBRO. Digital solutions for hospitality.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Bento Card Component
function BentoCard({ vertical, index }: { vertical: Vertical; index: number }) {
  const Icon = vertical.icon;
  const isLive = vertical.status === 'live';

  // Determine grid span based on size
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative overflow-hidden rounded-3xl ${sizeClasses[vertical.size]}`}
      style={{ backgroundColor: vertical.bgColor }}
    >
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${vertical.color} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${vertical.color}15`, color: vertical.color }}
          >
            <Icon size={26} weight="duotone" />
          </div>

          <StatusBadge status={vertical.status} color={vertical.color} />
        </div>

        {/* Body */}
        <div className="mt-auto">
          <h2
            className="text-xl font-semibold"
            style={{ color: vertical.color }}
          >
            {vertical.name}
          </h2>
          <p className="mt-1 text-sm" style={{ color: '#78716c' }}>
            {vertical.tagline}
          </p>

          {/* Links */}
          {vertical.links && vertical.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {vertical.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg active:scale-100"
                  style={{
                    backgroundColor: vertical.color,
                    boxShadow: `0 4px 14px ${vertical.color}40`,
                  }}
                >
                  <Play size={14} weight="fill" />
                  {link.label}
                  {link.version && (
                    <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs">
                      {link.version}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${vertical.color}08 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
}

// Status Badge Component
function StatusBadge({ status, color }: { status: string; color: string }) {
  if (status === 'live') {
    return (
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </span>
        Live
      </div>
    );
  }

  return (
    <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'rgba(214, 211, 209, 0.5)', color: '#78716c' }}>
      Coming Soon
    </div>
  );
}
