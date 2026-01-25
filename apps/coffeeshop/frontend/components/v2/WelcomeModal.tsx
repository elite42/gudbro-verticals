'use client';

/**
 * WelcomeModal v2
 *
 * First touchpoint for new users. Warm, inviting, not transactional.
 * Designed to create emotional connection before asking for anything.
 *
 * Features:
 * - Hero image with merchant branding
 * - Table context (if from QR scan)
 * - Language auto-detection
 * - Loyalty incentive preview
 * - Guest-first approach (low friction)
 *
 * Aesthetic: "Warm Welcome" - organic minimal with personality
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  Star,
  MapPin,
  Globe,
  Gift,
  CaretDown,
  CheckCircle,
} from '@phosphor-icons/react';

// Language configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
  { code: 'ms', name: 'Melayu', flag: '🇲🇾' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]['code'];

interface Venue {
  name: string;
  logo?: string;
  heroImage?: string;
  primaryColor?: string;
  tagline?: string;
}

interface LoyaltyPreview {
  signupBonus: number;
  firstOrderDiscount: number;
}

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
  onSignIn: () => void;
  onCreateAccount: () => void;
  venue: Venue;
  tableNumber?: string | null;
  detectedLanguage?: LanguageCode;
  loyaltyPreview?: LoyaltyPreview;
  onLanguageChange?: (lang: LanguageCode) => void;
}

// Animation variants with proper typing
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;

const modalVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 300,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

const heroVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' as const },
  },
};

export function WelcomeModal({
  isOpen,
  onClose,
  onContinueAsGuest,
  onSignIn,
  onCreateAccount,
  venue,
  tableNumber,
  detectedLanguage = 'en',
  loyaltyPreview,
  onLanguageChange,
}: WelcomeModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(detectedLanguage);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-detect language from browser
  useEffect(() => {
    if (!hasInteracted && typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      const supported = LANGUAGES.find((l) => l.code === browserLang);
      if (supported) {
        setSelectedLanguage(browserLang);
        onLanguageChange?.(browserLang);
      }
    }
  }, [hasInteracted, onLanguageChange]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLanguageSelect = useCallback(
    (lang: LanguageCode) => {
      setSelectedLanguage(lang);
      setHasInteracted(true);
      setShowLanguageSelector(false);
      onLanguageChange?.(lang);
    },
    [onLanguageChange]
  );

  const currentLanguage = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  // Greeting based on language
  const getGreeting = (lang: LanguageCode): string => {
    const greetings: Record<string, string> = {
      en: 'Welcome to',
      vi: 'Chào mừng đến',
      ko: '환영합니다',
      ja: 'ようこそ',
      zh: '欢迎光临',
      th: 'ยินดีต้อนรับ',
      it: 'Benvenuto a',
      es: 'Bienvenido a',
      fr: 'Bienvenue à',
      de: 'Willkommen bei',
      ru: 'Добро пожаловать',
      ar: 'مرحبا بكم في',
      pt: 'Bem-vindo ao',
      hi: 'स्वागत है',
      tr: 'Hoş geldiniz',
      id: 'Selamat datang di',
      ms: 'Selamat datang ke',
      nl: 'Welkom bij',
    };
    return greetings[lang] || greetings.en;
  };

  const getCTAText = (lang: LanguageCode): string => {
    const ctas: Record<string, string> = {
      en: 'Explore Menu',
      vi: 'Xem Thực Đơn',
      ko: '메뉴 보기',
      ja: 'メニューを見る',
      zh: '浏览菜单',
      th: 'ดูเมนู',
      it: 'Esplora Menu',
      es: 'Ver Menú',
      fr: 'Voir le Menu',
      de: 'Menü ansehen',
      ru: 'Посмотреть меню',
      ar: 'استكشف القائمة',
      pt: 'Ver Cardápio',
      hi: 'मेनू देखें',
      tr: 'Menüyü Gör',
      id: 'Lihat Menu',
      ms: 'Lihat Menu',
      nl: 'Bekijk Menu',
    };
    return ctas[lang] || ctas.en;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'var(--surface-overlay)' }}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md overflow-hidden sm:rounded-2xl"
            style={{
              background: 'var(--surface-card)',
              maxHeight: '95vh',
              borderTopLeftRadius: 'var(--radius-2xl)',
              borderTopRightRadius: 'var(--radius-2xl)',
            }}
          >
            {/* Close button - absolute positioned */}
            <motion.button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </motion.button>

            {/* Hero Section */}
            <motion.div
              variants={heroVariants}
              className="relative h-48 w-full overflow-hidden sm:h-56"
            >
              {venue.heroImage ? (
                <img
                  src={venue.heroImage}
                  alt={venue.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background: venue.primaryColor
                      ? `linear-gradient(135deg, ${venue.primaryColor} 0%, var(--bg-tertiary) 100%)`
                      : 'linear-gradient(135deg, var(--brand-warm) 0%, var(--bg-tertiary) 100%)',
                  }}
                />
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, var(--surface-card) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                }}
              />

              {/* Logo centered on hero */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 20 }}
              >
                {venue.logo ? (
                  <img
                    src={venue.logo}
                    alt={venue.name}
                    className="h-20 w-20 rounded-2xl border-4 object-cover shadow-lg"
                    style={{
                      borderColor: 'var(--surface-card)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  />
                ) : (
                  <div
                    className="font-display flex h-20 w-20 items-center justify-center rounded-2xl border-4 text-3xl font-bold shadow-lg"
                    style={{
                      background: venue.primaryColor || 'var(--brand-warm)',
                      borderColor: 'var(--surface-card)',
                      color: 'white',
                    }}
                  >
                    {venue.name.charAt(0)}
                  </div>
                )}
              </motion.div>

              {/* Table badge - top left */}
              {tableNumber && (
                <motion.div
                  className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    background: 'var(--interactive-primary)',
                    color: 'white',
                  }}
                  variants={pulseVariants}
                  animate="pulse"
                >
                  <MapPin size={14} weight="fill" />
                  <span className="text-sm font-semibold">Table {tableNumber}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Content Section */}
            <div className="px-6 pb-6 pt-14">
              {/* Greeting & Venue Name */}
              <motion.div variants={contentItemVariants} className="mb-6 text-center">
                <p
                  className="font-display mb-1 text-base"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {getGreeting(selectedLanguage)}
                </p>
                <h1
                  className="font-display text-2xl font-semibold sm:text-3xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {venue.name}
                </h1>
                {venue.tagline && (
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {venue.tagline}
                  </p>
                )}
              </motion.div>

              {/* Language Selector - Compact */}
              <motion.div variants={contentItemVariants} className="mb-6">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="mx-auto flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium">
                    {currentLanguage.flag} {currentLanguage.name}
                  </span>
                  <CaretDown
                    size={14}
                    className={`transition-transform ${showLanguageSelector ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Language dropdown */}
                <AnimatePresence>
                  {showLanguageSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div
                        className="grid grid-cols-3 gap-2 rounded-xl p-3"
                        style={{ background: 'var(--bg-secondary)' }}
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code)}
                            className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${
                              selectedLanguage === lang.code ? 'ring-2 ring-green-500' : ''
                            }`}
                            style={{
                              background:
                                selectedLanguage === lang.code
                                  ? 'var(--surface-card)'
                                  : 'transparent',
                            }}
                          >
                            <span className="text-xl">{lang.flag}</span>
                            <span
                              className="text-[10px] font-medium"
                              style={{
                                color:
                                  selectedLanguage === lang.code
                                    ? 'var(--text-primary)'
                                    : 'var(--text-tertiary)',
                              }}
                            >
                              {lang.name.length > 8 ? lang.name.slice(0, 7) + '…' : lang.name}
                            </span>
                            {selectedLanguage === lang.code && (
                              <CheckCircle
                                size={12}
                                weight="fill"
                                style={{ color: 'var(--interactive-primary)' }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Primary CTA - Guest (Hero action) */}
              <motion.div variants={contentItemVariants}>
                <motion.button
                  onClick={onContinueAsGuest}
                  className="btn-primary w-full gap-2 py-4 text-base"
                  style={{
                    background: 'var(--interactive-primary)',
                    boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {getCTAText(selectedLanguage)}
                  <ArrowRight size={18} weight="bold" />
                </motion.button>
              </motion.div>

              {/* Loyalty Incentive */}
              {loyaltyPreview && (
                <motion.div
                  variants={contentItemVariants}
                  className="mt-4 flex items-center gap-3 rounded-xl p-3"
                  style={{ background: 'var(--status-warning-bg)' }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'var(--status-warning)', color: 'white' }}
                  >
                    <Gift size={20} weight="fill" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Sign in to earn{' '}
                      <span style={{ color: 'var(--status-warning)' }}>
                        {loyaltyPreview.signupBonus} points
                      </span>
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      + {loyaltyPreview.firstOrderDiscount}% off your first order
                    </p>
                  </div>
                  <button
                    onClick={onSignIn}
                    className="shrink-0 text-sm font-semibold"
                    style={{ color: 'var(--status-warning)' }}
                  >
                    Sign in
                  </button>
                </motion.div>
              )}

              {/* Secondary Actions */}
              <motion.div
                variants={contentItemVariants}
                className="mt-6 flex items-center justify-center gap-1 text-sm"
              >
                <span style={{ color: 'var(--text-tertiary)' }}>Have an account?</span>
                <button
                  onClick={onSignIn}
                  className="font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  Sign in
                </button>
                <span style={{ color: 'var(--text-tertiary)' }}>or</span>
                <button
                  onClick={onCreateAccount}
                  className="font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  Create account
                </button>
              </motion.div>

              {/* Table confirmation - bottom */}
              {tableNumber && (
                <motion.div
                  variants={contentItemVariants}
                  className="mt-6 flex items-center justify-center gap-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <CheckCircle size={16} weight="fill" style={{ color: 'var(--status-success)' }} />
                  <span>
                    Your order will be delivered to{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>Table {tableNumber}</strong>
                  </span>
                </motion.div>
              )}
            </div>

            {/* Handle bar (mobile sheet indicator) */}
            <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/30 sm:hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default WelcomeModal;
