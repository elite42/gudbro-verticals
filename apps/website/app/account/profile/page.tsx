'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UnifiedProfile,
  DIETARY_OPTIONS,
  ALLERGEN_OPTIONS,
  LOCALE_OPTIONS,
  TIMEZONE_OPTIONS,
} from '@/lib/profile-service';

// Mock profile for development
const getMockProfile = (): UnifiedProfile => ({
  accountId: 'acc-123',
  email: 'mario.rossi@example.com',
  displayName: 'Mario Rossi',
  firstName: 'Mario',
  lastName: 'Rossi',
  avatarUrl: undefined,
  phone: '+39 333 1234567',
  locale: 'it',
  timezone: 'Europe/Rome',
  accountCreatedAt: '2024-01-15T10:00:00Z',
  lastLoginAt: '2025-01-02T08:30:00Z',
  totalPoints: 1250,
  loyaltyTier: 'silver',
  isConsumer: true,
  isMerchant: true,
  isAdmin: false,
  isContributor: true,
  tenants: [
    {
      roleId: 'role-1',
      tenantId: 'tenant-1',
      tenantType: 'merchant',
      permissions: {
        menu_edit: true,
        orders_manage: true,
        staff_manage: true,
        billing_manage: true,
      },
      isPrimary: true,
      isActive: true,
      joinedAt: '2024-01-15T10:00:00Z',
    },
    {
      roleId: 'role-2',
      tenantId: 'tenant-2',
      tenantType: 'merchant',
      permissions: { menu_edit: true, orders_manage: true, analytics_view: true },
      isPrimary: false,
      isActive: true,
      joinedAt: '2024-06-01T14:00:00Z',
    },
  ],
});

type TabId = 'profile' | 'preferences' | 'organizations' | 'security';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UnifiedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [locale, setLocale] = useState('it');
  const [timezone, setTimezone] = useState('Europe/Rome');
  const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);

  useEffect(() => {
    // In production, fetch from API
    const mockProfile = getMockProfile();
    setProfile(mockProfile);
    setDisplayName(mockProfile.displayName || '');
    setFirstName(mockProfile.firstName || '');
    setLastName(mockProfile.lastName || '');
    setPhone(mockProfile.phone || '');
    setLocale(mockProfile.locale);
    setTimezone(mockProfile.timezone);
    // Dietary prefs would come from a separate consumer preferences table
    setDietaryPrefs([]);
    setAllergens([]);
    setLoading(false);
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    // In production, call API
    await new Promise((r) => setTimeout(r, 1000));
    setSuccessMessage('Profilo aggiornato con successo');
    setTimeout(() => setSuccessMessage(null), 3000);
    setSaving(false);
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSuccessMessage('Preferenze salvate con successo');
    setTimeout(() => setSuccessMessage(null), 3000);
    setSaving(false);
  };

  const handleSetPrimary = async (roleId: string) => {
    // In production, call API
    if (profile) {
      const updatedTenants = profile.tenants.map((t) => ({
        ...t,
        isPrimary: t.roleId === roleId,
      }));
      setProfile({ ...profile, tenants: updatedTenants });
      setSuccessMessage('Ruolo primario aggiornato');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const toggleDietaryPref = (id: string) => {
    setDietaryPrefs((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const toggleAllergen = (id: string) => {
    setAllergens((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { id: 'preferences', label: 'Preferenze', icon: '⚙️' },
    { id: 'organizations', label: 'Organizzazioni', icon: '🏢' },
    { id: 'security', label: 'Sicurezza', icon: '🔒' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Profilo non trovato</p>
          <Link href="/" className="mt-2 block text-purple-600 hover:underline">
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="font-bold text-gray-900 dark:text-white">GUDBRO</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Torna alla Home
          </Link>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          <span>✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Profile Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-3xl font-bold text-white">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                (profile.firstName?.[0] || profile.email[0]).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.displayName || profile.email}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.isConsumer && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Consumer
                  </span>
                )}
                {profile.isMerchant && (
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    Merchant
                  </span>
                )}
                {profile.isAdmin && (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    Admin
                  </span>
                )}
                {profile.isContributor && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Contributor
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Punti Fedeltà</p>
              <p className="text-2xl font-bold text-purple-600">
                {profile.totalPoints.toLocaleString()}
              </p>
              <p className="text-xs capitalize text-gray-400">{profile.loyaltyTier}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-purple-600 bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome visualizzato
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                      placeholder="Come vuoi essere chiamato"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cognome
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                      placeholder="+39 ..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lingua
                    </label>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                    >
                      {LOCALE_OPTIONS.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.flag} {l.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fuso orario
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                    >
                      {TIMEZONE_OPTIONS.map((tz) => (
                        <option key={tz.id} value={tz.id}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Salvataggio...</span>
                      </>
                    ) : (
                      <span>Salva Modifiche</span>
                    )}
                  </button>
                </div>

                {/* Account Info */}
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Informazioni Account
                  </h3>
                  <div className="grid gap-4 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Membro dal:</span>{' '}
                      <span className="text-gray-900 dark:text-white">
                        {formatDate(profile.accountCreatedAt)}
                      </span>
                    </div>
                    {profile.lastLoginAt && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Ultimo accesso:</span>{' '}
                        <span className="text-gray-900 dark:text-white">
                          {formatDate(profile.lastLoginAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && profile.isConsumer && (
              <div className="space-y-8">
                {/* Dietary Preferences */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Preferenze Alimentari
                  </h3>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Seleziona le tue preferenze per ricevere suggerimenti personalizzati
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {DIETARY_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleDietaryPref(option.id)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          dietaryPrefs.includes(option.id)
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergen Alerts */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Allergeni da Evitare
                  </h3>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Ti avviseremo quando un piatto contiene questi ingredienti
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {ALLERGEN_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleAllergen(option.id)}
                        className={`rounded-lg border-2 p-3 transition-all ${
                          allergens.includes(option.id)
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Salvataggio...</span>
                      </>
                    ) : (
                      <span>Salva Preferenze</span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Organizations Tab */}
            {activeTab === 'organizations' && (
              <div className="space-y-4">
                {profile.tenants.length === 0 ? (
                  <div className="py-12 text-center">
                    <span className="text-4xl">🏢</span>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Non fai parte di nessuna organizzazione
                    </p>
                    <Link
                      href="/get-started"
                      className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700"
                    >
                      Registra il tuo locale
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Gestisci i ruoli di cui fai parte
                    </p>
                    {profile.tenants.map((tenant) => (
                      <div
                        key={tenant.roleId}
                        className={`rounded-xl border-2 p-4 ${
                          tenant.isPrimary
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
                              <span className="text-2xl">🏪</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Tenant {tenant.tenantId?.slice(0, 8) || 'N/A'}
                                </h3>
                                {tenant.isPrimary && (
                                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                    Primario
                                  </span>
                                )}
                              </div>
                              <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                                {tenant.tenantType || 'merchant'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!tenant.isPrimary && (
                              <button
                                onClick={() => handleSetPrimary(tenant.roleId)}
                                className="rounded-lg px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                              >
                                Imposta primario
                              </button>
                            )}
                            <a
                              href="https://gudbro-backoffice.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                              Apri Backoffice
                            </a>
                          </div>
                        </div>
                        <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Membro dal {formatDate(tenant.joinedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ultima modifica: mai
                      </p>
                    </div>
                    <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Cambia Password
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Autenticazione a Due Fattori
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Non attiva</p>
                    </div>
                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700">
                      Attiva 2FA
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Sessioni Attive</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        1 dispositivo connesso
                      </p>
                    </div>
                    <button className="rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                      Disconnetti Tutti
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-semibold text-red-600 dark:text-red-400">
                    Zona Pericolosa
                  </h3>
                  <div className="rounded-xl border border-red-200 p-4 dark:border-red-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Elimina Account
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Questa azione è irreversibile
                        </p>
                      </div>
                      <button className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20">
                        Elimina Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
