'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { TriggerAction } from '@/types/promotion';

// Mock data - in production would come from API based on saved promo
interface SavedPromo {
  code: string;
  title: string;
  reward: {
    discountPercent?: number;
    discountFixed?: number;
    freeItemName?: string;
  };
  triggerAction: TriggerAction;
  triggerDescription: string;
  merchantName: string;
}

const mockSavedPromo: SavedPromo = {
  code: 'gennaio20',
  title: 'Sconto 20% sul primo ordine!',
  reward: { discountPercent: 20 },
  triggerAction: 'signup',
  triggerDescription: 'Registrati per attivare lo sconto',
  merchantName: 'Caffè Rossi',
};

type CompletionStep = 'verify' | 'action' | 'success';

export default function PromoCompletePage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const [promo] = useState<SavedPromo>(mockSavedPromo);
  const [step, setStep] = useState<CompletionStep>('verify');
  const [isLoading, setIsLoading] = useState(false);

  // Social share state
  const [sharedOnSocial, setSharedOnSocial] = useState(false);

  // Signup form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleVerifyLocation = () => {
    setIsLoading(true);
    // TODO: In production - verify user is at location using geolocation
    setTimeout(() => {
      setIsLoading(false);
      setStep('action');
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: In production - API call to create account
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleSocialShare = async () => {
    const shareData = {
      title: `${promo.reward.discountPercent}% di sconto da ${promo.merchantName}!`,
      text: `Ho appena ottenuto uno sconto esclusivo da ${promo.merchantName}! Vieni anche tu!`,
      url: window.location.origin + '/promo/' + code,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setSharedOnSocial(true);
        setTimeout(() => setStep('success'), 1000);
      } catch {
        // Share cancelled
      }
    } else {
      // Fallback: open social media
      window.open(`https://www.instagram.com/`, '_blank');
      setSharedOnSocial(true);
      setTimeout(() => setStep('success'), 1000);
    }
  };

  const handleCheckin = () => {
    setIsLoading(true);
    // TODO: In production - API call to record check-in
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleSkipAction = () => {
    // For 'none' trigger action
    setStep('success');
  };

  const renderTriggerAction = () => {
    switch (promo.triggerAction) {
      case 'signup':
        return (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="Il tuo nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="email@esempio.com"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Registrazione...' : 'Registrati e Attiva Sconto'}
            </button>
          </form>
        );

      case 'social_share':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 text-center">
              Condividi su Instagram o Facebook per attivare lo sconto!
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSocialShare}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90"
              >
                <span>📷</span> Instagram
              </button>
              <button
                onClick={handleSocialShare}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:opacity-90"
              >
                <span>👍</span> Facebook
              </button>
            </div>
            {sharedOnSocial && (
              <p className="text-green-600 text-center font-medium">
                Condivisione completata!
              </p>
            )}
          </div>
        );

      case 'checkin':
        return (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Conferma il tuo check-in per attivare lo sconto!
            </p>
            <button
              onClick={handleCheckin}
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Check-in...' : '📍 Check-in'}
            </button>
          </div>
        );

      case 'follow':
        return (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Segui {promo.merchantName} per attivare lo sconto!
            </p>
            <button
              onClick={() => setStep('success')}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90"
            >
              ❤️ Segui
            </button>
          </div>
        );

      case 'review':
        return (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Lascia una recensione per attivare lo sconto!
            </p>
            <button
              onClick={() => window.open('https://g.page/r/review', '_blank')}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90"
            >
              ⭐ Lascia Recensione
            </button>
            <button
              onClick={() => setStep('success')}
              className="w-full py-2 text-purple-600 hover:underline"
            >
              Ho lasciato la recensione
            </button>
          </div>
        );

      case 'none':
      default:
        return (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Nessuna azione richiesta! Lo sconto è già tuo.
            </p>
            <button
              onClick={handleSkipAction}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90"
            >
              Attiva Sconto
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href={`/promo/${code}`} className="p-2 -ml-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="font-medium text-gray-900">Attiva Promozione</span>
          <div className="w-9" />
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between max-w-xs mx-auto">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === 'verify' ? 'bg-purple-600 text-white' : 'bg-green-500 text-white'
            }`}>
              {step === 'verify' ? '1' : '✓'}
            </div>
            <span className="text-xs mt-1 text-gray-500">Verifica</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2">
            <div className={`h-full bg-purple-600 transition-all ${
              step === 'verify' ? 'w-0' : step === 'action' ? 'w-1/2' : 'w-full'
            }`} />
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === 'action' ? 'bg-purple-600 text-white' : step === 'success' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'success' ? '✓' : '2'}
            </div>
            <span className="text-xs mt-1 text-gray-500">Azione</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2">
            <div className={`h-full bg-purple-600 transition-all ${
              step === 'success' ? 'w-full' : 'w-0'
            }`} />
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === 'success' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'success' ? '✓' : '3'}
            </div>
            <span className="text-xs mt-1 text-gray-500">Fatto!</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        {step === 'verify' && (
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-4xl">
              📍
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Sei al locale?</h1>
              <p className="text-gray-600">
                Per attivare lo sconto devi essere presso {promo.merchantName}
              </p>
            </div>
            <button
              onClick={handleVerifyLocation}
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifica in corso...
                </span>
              ) : (
                'Sì, sono qui!'
              )}
            </button>
          </div>
        )}

        {step === 'action' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
                🎯
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {promo.triggerDescription}
              </h1>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {renderTriggerAction()}
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Sconto Attivato!</h1>
              <p className="text-gray-600">
                Il tuo sconto del {promo.reward.discountPercent}% è stato attivato con successo.
              </p>
            </div>

            {/* Coupon Card */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <p className="text-sm opacity-90 mb-2">{promo.merchantName}</p>
              <div className="text-5xl font-black mb-2">
                -{promo.reward.discountPercent}%
              </div>
              <p className="text-sm opacity-90">{promo.title}</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs opacity-75">Codice: {code.toUpperCase()}</p>
                <p className="text-xs opacity-75">Mostra questo coupon alla cassa</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/menu')}
              className="w-full py-3 px-6 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800"
            >
              Vai al Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
