'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface InvitationDetails {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleTitle: string;
  permissions: Record<string, boolean>;
  organizationName: string;
  inviterEmail: string;
  inviterName?: string;
  message?: string;
  expiresAt: string;
}

const PERMISSION_LABELS: Record<string, string> = {
  menu_view: 'Visualizza Menu',
  menu_edit: 'Modifica Menu',
  orders_view: 'Visualizza Ordini',
  orders_manage: 'Gestisci Ordini',
  analytics_view: 'Visualizza Analytics',
  staff_manage: 'Gestisci Staff',
  billing_manage: 'Gestisci Fatturazione',
  settings_manage: 'Gestisci Impostazioni',
};

const ROLE_ICONS: Record<string, string> = {
  owner: '👑',
  manager: '💼',
  chef: '👨‍🍳',
  waiter: '🍽️',
  viewer: '👁️',
  staff: '👤',
};

export default function InvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [declined, setDeclined] = useState(false);

  // Check if user is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Token di invito mancante');
      setLoading(false);
      return;
    }

    fetchInvitation();
    checkAuthStatus();
  }, [token]);

  const checkAuthStatus = async () => {
    // In production, check Supabase auth session
    // For now, mock check
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setIsLoggedIn(true);
          setCurrentUserEmail(data.user.email);
        }
      }
    } catch {
      // Not logged in
    }
  };

  const fetchInvitation = async () => {
    try {
      const response = await fetch(`/api/invitations/${token}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Invito non trovato o scaduto');
        } else if (response.status === 410) {
          setError('Questo invito è già stato utilizzato');
        } else {
          setError('Errore nel caricamento dell\'invito');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setInvitation(data);
    } catch (err) {
      setError('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!token) return;

    setAccepting(true);
    setError(null);

    try {
      const response = await fetch('/api/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nell\'accettazione');
      }

      setSuccess(true);

      // Redirect to backoffice after 2 seconds
      setTimeout(() => {
        window.location.href = 'https://gudbro-backoffice.vercel.app';
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nell\'accettazione');
    } finally {
      setAccepting(false);
    }
  };

  const handleDecline = async () => {
    if (!token) return;

    setDeclining(true);
    setError(null);

    try {
      const response = await fetch('/api/invitations/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore nel rifiuto');
      }

      setDeclined(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel rifiuto');
    } finally {
      setDeclining(false);
    }
  };

  const getEnabledPermissions = () => {
    if (!invitation) return [];
    return Object.entries(invitation.permissions)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key);
  };

  const formatExpiryDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Caricamento invito...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Invito Non Valido
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Benvenuto nel Team!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Hai accettato l'invito per <strong>{invitation?.organizationName}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Stai per essere reindirizzato al backoffice...
          </p>
          <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Declined state
  if (declined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👋</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Invito Rifiutato
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hai rifiutato l'invito. L'amministratore è stato notificato.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            Vai alla Home
          </Link>
        </div>
      </div>
    );
  }

  // Main invitation view
  const enabledPermissions = getEnabledPermissions();
  const roleIcon = ROLE_ICONS[invitation?.roleTitle || 'staff'] || '👤';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="font-bold text-gray-900 dark:text-white">GUDBRO</span>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 md:py-12">
        {/* Invitation Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">{roleIcon}</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Sei stato invitato!</h1>
            <p className="text-purple-200">
              {invitation?.inviterName || invitation?.inviterEmail} ti ha invitato a unirti al team
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Organization Info */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {invitation?.organizationName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Ruolo: <span className="font-medium text-gray-900 dark:text-white capitalize">{invitation?.roleTitle}</span>
              </p>
            </div>

            {/* Personal Message */}
            {invitation?.message && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Messaggio personale:</p>
                <p className="text-gray-700 dark:text-gray-300 italic">"{invitation.message}"</p>
              </div>
            )}

            {/* Permissions */}
            {enabledPermissions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Permessi inclusi:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {enabledPermissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                    >
                      {PERMISSION_LABELS[perm] || perm}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Expiry Notice */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Scade il {invitation && formatExpiryDate(invitation.expiresAt)}
              </span>
            </div>

            {/* Email mismatch warning */}
            {isLoggedIn && currentUserEmail && invitation && invitation.email !== currentUserEmail && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      Email diversa
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Questo invito è stato inviato a <strong>{invitation.email}</strong>,
                      ma sei loggato come <strong>{currentUserEmail}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                disabled={accepting || declining}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Accettando...</span>
                  </>
                ) : (
                  <>
                    <span>Accetta Invito</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>

              <button
                onClick={handleDecline}
                disabled={accepting || declining}
                className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {declining ? 'Rifiutando...' : 'Rifiuta Invito'}
              </button>
            </div>

            {/* Login prompt for non-logged users */}
            {!isLoggedIn && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Accettando l'invito verrà creato un account con l'email{' '}
                <strong>{invitation?.email}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Hai problemi?{' '}
          <a href="mailto:support@gudbro.com" className="text-purple-600 dark:text-purple-400 hover:underline">
            Contatta il supporto
          </a>
        </p>
      </main>
    </div>
  );
}
