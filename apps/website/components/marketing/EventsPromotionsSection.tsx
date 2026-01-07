'use client';

import { useState } from 'react';

// Event Types Configuration
const EVENT_CATEGORIES = [
  {
    id: 'entertainment',
    name: 'Entertainment',
    nameIt: 'Intrattenimento',
    color: 'from-purple-500 to-pink-500',
    events: [
      { icon: '🎵', name: 'Live Music', nameIt: 'Musica Live' },
      { icon: '🎧', name: 'DJ Set', nameIt: 'DJ Set' },
      { icon: '🎤', name: 'Karaoke', nameIt: 'Karaoke' },
      { icon: '🧠', name: 'Trivia Night', nameIt: 'Quiz Night' },
      { icon: '🎲', name: 'Game Night', nameIt: 'Serata Giochi' },
      { icon: '😂', name: 'Comedy Night', nameIt: 'Stand-up Comedy' },
      { icon: '🎙️', name: 'Open Mic', nameIt: 'Open Mic' },
      { icon: '🎭', name: 'Theme Night', nameIt: 'Serata a Tema' },
    ],
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    nameIt: 'Food & Beverage',
    color: 'from-amber-500 to-orange-500',
    events: [
      { icon: '🍷', name: 'Wine Tasting', nameIt: 'Degustazione Vini' },
      { icon: '🧀', name: 'Food Pairing', nameIt: 'Abbinamento' },
      { icon: '👨‍🍳', name: "Chef's Table", nameIt: 'Tavola dello Chef' },
      { icon: '📚', name: 'Cooking Class', nameIt: 'Corso di Cucina' },
      { icon: '🆕', name: 'Menu Launch', nameIt: 'Lancio Menu' },
      { icon: '🚶', name: 'Food Tour', nameIt: 'Tour Gastronomico' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports Viewing',
    nameIt: 'Sport',
    color: 'from-green-500 to-emerald-500',
    events: [
      { icon: '⚽', name: 'Football', nameIt: 'Calcio' },
      { icon: '🏀', name: 'Basketball', nameIt: 'Basket' },
      { icon: '🎾', name: 'Tennis', nameIt: 'Tennis' },
      { icon: '🏎️', name: 'Formula 1', nameIt: 'Formula 1' },
      { icon: '🏍️', name: 'MotoGP', nameIt: 'MotoGP' },
      { icon: '🥊', name: 'Boxing/UFC', nameIt: 'Boxe/UFC' },
      { icon: '🏉', name: 'Rugby', nameIt: 'Rugby' },
    ],
  },
  {
    id: 'promo',
    name: 'Time-Based Promos',
    nameIt: 'Promo Orarie',
    color: 'from-blue-500 to-cyan-500',
    events: [
      { icon: '🍹', name: 'Happy Hour', nameIt: 'Happy Hour' },
      { icon: '🥐', name: 'Brunch', nameIt: 'Brunch' },
      { icon: '🥗', name: 'Lunch Special', nameIt: 'Menu Pranzo' },
      { icon: '🌙', name: 'Late Night', nameIt: 'Late Night' },
    ],
  },
  {
    id: 'community',
    name: 'Community',
    nameIt: 'Community',
    color: 'from-rose-500 to-red-500',
    events: [
      { icon: '🤝', name: 'Networking', nameIt: 'Networking' },
      { icon: '💝', name: 'Charity Event', nameIt: 'Beneficenza' },
      { icon: '📖', name: 'Book Club', nameIt: 'Club del Libro' },
      { icon: '🍷', name: 'Wine Club', nameIt: 'Wine Club' },
      { icon: '💕', name: 'Singles Night', nameIt: 'Serata Single' },
    ],
  },
  {
    id: 'private',
    name: 'Private Events',
    nameIt: 'Eventi Privati',
    color: 'from-gray-600 to-gray-800',
    events: [
      { icon: '🎉', name: 'Private Party', nameIt: 'Festa Privata' },
      { icon: '🏢', name: 'Corporate', nameIt: 'Aziendale' },
      { icon: '🎂', name: 'Birthday', nameIt: 'Compleanno' },
      { icon: '💍', name: 'Anniversary', nameIt: 'Anniversario' },
    ],
  },
];

// Promotion Mechanics
const PROMO_MECHANICS = [
  { icon: '🏷️', name: 'Sconto %', example: '-20% su tutto' },
  { icon: '💵', name: 'Sconto Fisso', example: '-€5 sul conto' },
  { icon: '🎯', name: 'Prezzo Fisso', example: 'Spritz a €5' },
  { icon: '🎁', name: '2x1 (BOGO)', example: 'Paghi 1, prendi 2' },
  { icon: '🎊', name: 'BOGO -50%', example: 'Il 2° a metà prezzo' },
  { icon: '🛒', name: '3x2', example: 'Prendi 3, paghi 2' },
  { icon: '📦', name: 'Bundle/Combo', example: 'Menu completo €15' },
  { icon: '🎁', name: 'Omaggio', example: 'Caffè gratis' },
  { icon: '♾️', name: 'Bottomless', example: 'Prosecco illimitato' },
  { icon: '⭐', name: 'Punti x2', example: 'Double points' },
  { icon: '🌟', name: 'Punti Bonus', example: '+100 punti' },
  { icon: '⬆️', name: 'Upgrade Gratis', example: 'Size L gratis' },
  { icon: '👶', name: 'Bambini Gratis', example: 'Under 12 free' },
  { icon: '👥', name: 'Sconto Gruppo', example: '-10% 4+ persone' },
  { icon: '🐦', name: 'Early Bird', example: '-15% primi 20' },
  { icon: '⏰', name: 'Last Minute', example: '-20% ultima ora' },
];

// Loyalty Rewards
const LOYALTY_TIERS = [
  { name: 'Bronze', points: '0+', color: 'from-amber-600 to-amber-700', perks: ['Base rewards'] },
  {
    name: 'Silver',
    points: '1,000+',
    color: 'from-gray-400 to-gray-500',
    perks: ['5% discount', '1.25x points'],
  },
  {
    name: 'Gold',
    points: '5,000+',
    color: 'from-yellow-400 to-yellow-500',
    perks: ['10% discount', '1.5x points', 'Early access'],
  },
  {
    name: 'Platinum',
    points: '10,000+',
    color: 'from-gray-300 to-gray-400',
    perks: ['15% discount', '2x points', 'VIP events'],
  },
];

export function EventsPromotionsSection() {
  const [activeCategory, setActiveCategory] = useState('entertainment');
  const [activeTab, setActiveTab] = useState<'events' | 'promos' | 'loyalty'>('events');

  const activeEvents = EVENT_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section
      id="events-promotions"
      className="bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-800 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Events & Promotions
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            29 Event Types, 16 Promo Mechanics, 4 Loyalty Tiers
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Everything you need to engage customers: from sports viewing to wine tastings, from
            happy hours to exclusive loyalty rewards.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mt-12 flex justify-center gap-4">
          {[
            { id: 'events', label: '29 Event Types', icon: '📅' },
            { id: 'promos', label: '16 Promo Mechanics', icon: '🏷️' },
            { id: 'loyalty', label: 'Loyalty System', icon: '⭐' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-xl px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="mt-12">
            {/* Category Pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {EVENT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {category.nameIt}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {activeEvents?.events.map((event, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl bg-white p-4 text-center transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <span className="mb-2 block text-4xl transition-transform group-hover:scale-110">
                    {event.icon}
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.nameIt}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.name}</p>
                </div>
              ))}
            </div>

            {/* Sports Viewing Highlight */}
            {activeCategory === 'sports' && (
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">📺</span>
                  <div>
                    <h4 className="text-xl font-bold">Sports Viewing Events</h4>
                    <p className="mt-1 text-green-100">
                      Create match-day events with team info, competition details, special promos
                      during the game, and loyalty point bonuses for attendees.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Promos Tab */}
        {activeTab === 'promos' && (
          <div className="mt-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {PROMO_MECHANICS.map((promo, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl bg-white p-4 transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl transition-transform group-hover:scale-110">
                      {promo.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {promo.name}
                    </span>
                  </div>
                  <p className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {promo.example}
                  </p>
                </div>
              ))}
            </div>

            {/* QR Marketing 2-Step */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <h4 className="mb-4 text-xl font-bold">QR Marketing a 2 Step</h4>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">QR Esterno</p>
                    <p className="text-sm text-blue-100">
                      Piazza QR in strada, da partner, o online
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Visita al Locale</p>
                    <p className="text-sm text-blue-100">
                      L&apos;utente arriva guidato da promo e maps
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Conversione</p>
                    <p className="text-sm text-blue-100">
                      Scansiona QR tavolo, attiva promo, ordina
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loyalty Tab */}
        {activeTab === 'loyalty' && (
          <div className="mt-12">
            {/* Tiers */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LOYALTY_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl bg-white p-6 text-center transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div
                    className={`mx-auto h-16 w-16 rounded-full bg-gradient-to-br ${tier.color} mb-4 flex items-center justify-center text-2xl font-bold text-white`}
                  >
                    {tier.name[0]}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{tier.name}</h4>
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    {tier.points} punti
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx}>✓ {perk}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Earning Actions */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
              <h4 className="mb-4 text-xl font-bold">18 Modi per Guadagnare Punti</h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {[
                  { icon: '📝', action: 'Registrazione', points: '+25' },
                  { icon: '🛒', action: 'Primo Ordine', points: '+50' },
                  { icon: '💳', action: 'Ogni €10 spesi', points: '+10' },
                  { icon: '⭐', action: 'Recensione', points: '+25' },
                  { icon: '📱', action: 'Social Share', points: '+15' },
                  { icon: '📍', action: 'Check-in', points: '+5' },
                  { icon: '👥', action: 'Referral', points: '+100' },
                  { icon: '🐛', action: 'Bug Report', points: '+100' },
                  { icon: '💡', action: 'Feature Idea', points: '+200' },
                  { icon: '📋', action: 'Case Study', points: '+1000' },
                  { icon: '🎂', action: 'Anniversario', points: '+300' },
                  { icon: '👤', action: 'Profilo 100%', points: '+150' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-lg bg-white/10 p-3 text-center">
                    <span className="block text-xl">{item.icon}</span>
                    <p className="mt-1 text-xs text-amber-100">{item.action}</p>
                    <p className="text-sm font-bold">{item.points}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reward Types */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: '🏆', name: 'Badge', desc: 'Distintivi esclusivi' },
                { icon: '🏷️', name: 'Sconti', desc: 'Fissi o percentuali' },
                { icon: '🎁', name: 'Omaggi', desc: 'Prodotti o esperienze' },
                { icon: '⭐', name: 'VIP Access', desc: 'Eventi esclusivi' },
              ].map((reward, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 dark:bg-gray-800"
                >
                  <span className="text-3xl">{reward.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{reward.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{reward.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { number: '29', label: 'Event Types' },
            { number: '16', label: 'Promo Mechanics' },
            { number: '4', label: 'Loyalty Tiers' },
            { number: '18', label: 'Ways to Earn Points' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.number}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
