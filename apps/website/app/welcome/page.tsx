'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock user data - in production this would come from auth context
const getMockUser = (type: 'personal' | 'business') => {
  if (type === 'business') {
    return {
      name: 'Mario Rossi',
      email: 'mario@cafferossi.it',
      type: 'business' as const,
      businessName: 'Caffè Rossi',
      businessType: 'cafe',
      signupBonus: 100,
    };
  }
  return {
    name: 'Giovanni',
    email: 'giovanni@example.com',
    type: 'personal' as const,
    signupBonus: 50,
  };
};

interface SetupTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  points?: number;
  completed: boolean;
}

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const isOnboardingComplete = searchParams.get('onboarding') === 'complete';
  const accountType = isOnboardingComplete ? 'business' : ((searchParams.get('type') as 'personal' | 'business') || 'personal');
  const user = getMockUser(accountType);

  const [showConfetti, setShowConfetti] = useState(true);
  const [tasks, setTasks] = useState<SetupTask[]>([]);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set tasks based on account type
    if (accountType === 'business') {
      setTasks([
        {
          id: 'profile',
          title: 'Completa il profilo locale',
          description: 'Aggiungi logo, orari e descrizione',
          icon: '🏪',
          href: '/account/settings',
          points: 50,
          completed: false,
        },
        {
          id: 'menu',
          title: 'Carica il tuo menu',
          description: 'Importa o crea il menu digitale',
          icon: '📋',
          href: 'https://gudbro-backoffice.vercel.app',
          points: 100,
          completed: false,
        },
        {
          id: 'qr',
          title: 'Genera il QR Code',
          description: 'Stampa e posiziona sui tavoli',
          icon: '📱',
          href: 'https://gudbro-backoffice.vercel.app',
          points: 25,
          completed: false,
        },
        {
          id: 'loyalty',
          title: 'Attiva il programma fedeltà',
          description: 'Configura punti e rewards per i clienti',
          icon: '🏆',
          href: '/admin/loyalty',
          completed: false,
        },
      ]);
    } else {
      setTasks([
        {
          id: 'preferences',
          title: 'Imposta le tue preferenze',
          description: 'Allergie, diete e gusti personali',
          icon: '🍽️',
          href: '/account/settings?tab=preferences',
          points: 25,
          completed: false,
        },
        {
          id: 'social',
          title: 'Connetti un social',
          description: 'Login più veloce la prossima volta',
          icon: '🔗',
          href: '/account/settings?tab=connections',
          points: 10,
          completed: false,
        },
        {
          id: 'app',
          title: 'Installa la PWA',
          description: 'Accesso rapido dalla home del telefono',
          icon: '📲',
          href: '#install-pwa',
          points: 15,
          completed: false,
        },
        {
          id: 'referral',
          title: 'Invita un amico',
          description: 'Guadagna 100 punti per ogni amico',
          icon: '👥',
          href: '/account/settings?tab=loyalty',
          points: 100,
          completed: false,
        },
      ]);
    }
  }, [accountType]);

  const totalPotentialPoints = tasks.reduce((sum, t) => sum + (t.points || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#10B981', '#6366F1', '#F59E0B', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 5)],
                width: '10px',
                height: '10px',
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="font-bold text-gray-900 dark:text-white">GUDBRO</span>
          </Link>
          <Link
            href={accountType === 'business' ? 'https://gudbro-backoffice.vercel.app' : '/'}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Salta per ora →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Welcome Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 shadow-lg shadow-green-500/30">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Benvenuto{accountType === 'business' ? ' su GUDBRO' : ''}, {user.name}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {accountType === 'business'
              ? 'Il tuo account business è pronto. Configura il tuo locale in pochi minuti.'
              : 'Il tuo account è stato creato con successo. Ecco come ottenere il massimo da GUDBRO.'}
          </p>
        </div>

        {/* Signup Bonus Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-xl shadow-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm mb-1">Bonus di Benvenuto</p>
              <p className="text-3xl font-bold">+{user.signupBonus} punti</p>
              <p className="text-purple-200 text-sm mt-1">Già accreditati sul tuo account!</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl">⭐</span>
            </div>
          </div>
          {totalPotentialPoints > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-purple-200">
                Completa le attività qui sotto per guadagnare altri <span className="font-bold text-white">+{totalPotentialPoints} punti</span>
              </p>
            </div>
          )}
        </div>

        {/* Setup Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {accountType === 'business' ? 'Configura il tuo locale' : 'Primi passi consigliati'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {accountType === 'business'
                ? 'Completa questi step per attivare tutte le funzionalità'
                : 'Opzionale, ma ti aiuterà a ottenere il massimo'}
            </p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {tasks.map((task, index) => (
              <Link
                key={task.id}
                href={task.href}
                target={task.href.startsWith('http') ? '_blank' : undefined}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {task.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    {task.points && (
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                        +{task.points} pts
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                </div>
                <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Business-specific: QR Preview */}
        {accountType === 'business' && 'businessName' in user && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Il tuo QR Code</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Anteprima del menu digitale</p>
              </div>
              <Link
                href="https://gudbro-backoffice.vercel.app"
                target="_blank"
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Personalizza
              </Link>
            </div>
            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <span className="text-4xl">📱</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user.businessName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Menu Digitale Interattivo</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  gudbro.menu/{user.businessName?.toLowerCase().replace(/\s+/g, '-')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Personal: Explore Section */}
        {accountType === 'personal' && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/recipes"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🍳
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Esplora Ricette</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Migliaia di ricette filtrate per te</p>
                </div>
              </div>
            </Link>
            <Link
              href="/shop"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🛒
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">GUDBRO Shop</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Prodotti selezionati per te</p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href={accountType === 'business' ? 'https://gudbro-backoffice.vercel.app' : '/'}
            target={accountType === 'business' ? '_blank' : undefined}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
          >
            {accountType === 'business' ? (
              <>
                <span>Vai al Backoffice</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </>
            ) : (
              <>
                <span>Inizia a Esplorare</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Puoi sempre tornare qui da{' '}
            <Link href="/account/settings" className="text-purple-600 dark:text-purple-400 hover:underline">
              Impostazioni Account
            </Link>
          </p>
        </div>
      </main>

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
