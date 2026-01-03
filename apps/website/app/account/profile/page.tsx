'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UnifiedProfile,
  Tenant,
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
      permissions: { menu_edit: true, orders_manage: true, staff_manage: true, billing_manage: true },
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
    setDietaryPrefs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAllergen = (id: string) => {
    setAllergens((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const getRoleIcon = (role: string) => {
    const icons: Record<string, string> = {
      owner: '👑',
      manager: '💼',
      chef: '👨‍🍳',
      waiter: '🍽️',
      viewer: '👁️',
      staff: '👤',
    };
    return icons[role] || '👤';
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Profilo non trovato</p>
          <Link href="/" className="text-purple-600 hover:underline mt-2 block">
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="font-bold text-gray-900 dark:text-white">GUDBRO</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Torna alla Home
          </Link>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span>✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
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
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.isConsumer && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                    Consumer
                  </span>
                )}
                {profile.isMerchant && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                    Merchant
                  </span>
                )}
                {profile.isAdmin && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">
                    Admin
                  </span>
                )}
                {profile.isContributor && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                    Contributor
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Punti Fedeltà</p>
              <p className="text-2xl font-bold text-purple-600">{profile.totalPoints.toLocaleString()}</p>
              <p className="text-xs text-gray-400 capitalize">{profile.loyaltyTier}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome visualizzato
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Come vuoi essere chiamato"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cognome
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+39 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lingua
                    </label>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {LOCALE_OPTIONS.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.flag} {l.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fuso orario
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Salvataggio...</span>
                      </>
                    ) : (
                      <span>Salva Modifiche</span>
                    )}
                  </button>
                </div>

                {/* Account Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Informazioni Account
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Preferenze Alimentari
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Seleziona le tue preferenze per ricevere suggerimenti personalizzati
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DIETARY_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleDietaryPref(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          dietaryPrefs.includes(option.id)
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <p className="font-medium text-gray-900 dark:text-white mt-1">
                          {option.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergen Alerts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Allergeni da Evitare
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Ti avviseremo quando un piatto contiene questi ingredienti
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ALLERGEN_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleAllergen(option.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          allergens.includes(option.id)
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
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
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                  <div className="text-center py-12">
                    <span className="text-4xl">🏢</span>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      Non fai parte di nessuna organizzazione
                    </p>
                    <Link
                      href="/get-started"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
                    >
                      Registra il tuo locale
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Gestisci i ruoli di cui fai parte
                    </p>
                    {profile.tenants.map((tenant) => (
                      <div
                        key={tenant.roleId}
                        className={`p-4 rounded-xl border-2 ${
                          tenant.isPrimary
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                              <span className="text-2xl">🏪</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Tenant {tenant.tenantId?.slice(0, 8) || 'N/A'}
                                </h3>
                                {tenant.isPrimary && (
                                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                                    Primario
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {tenant.tenantType || 'merchant'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!tenant.isPrimary && (
                              <button
                                onClick={() => handleSetPrimary(tenant.roleId)}
                                className="px-3 py-1.5 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg"
                              >
                                Imposta primario
                              </button>
                            )}
                            <a
                              href="https://gudbro-backoffice.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100"
                            >
                              Apri Backoffice
                            </a>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
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
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ultima modifica: mai
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                      Cambia Password
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Autenticazione a Due Fattori
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Non attiva
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      Attiva 2FA
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Sessioni Attive
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        1 dispositivo connesso
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      Disconnetti Tutti
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                    Zona Pericolosa
                  </h3>
                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Elimina Account
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Questa azione è irreversibile
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm text-red-600 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
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
