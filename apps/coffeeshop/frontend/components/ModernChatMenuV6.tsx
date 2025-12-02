'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { DishItem, Extra } from '@/types/dish';
import { selectionsStore } from '@/lib/selections-store';
import { languagePreferencesStore, AVAILABLE_LANGUAGES } from '@/lib/language-preferences';
import { currencyPreferencesStore, AVAILABLE_CURRENCIES } from '@/lib/currency-preferences';
import { tableContextStore, TableContext } from '@/lib/table-context-store';
import { safetyFilters, SafetyFilter } from '@/../../shared/database/safety-filters';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type Language = 'en' | 'it' | 'vi';
type BottomTab = 'chat' | 'menu' | 'actions' | 'shop' | 'cart';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
  items?: DishItem[];
  component?: 'wifi' | 'share' | 'language' | 'currency';
  timestamp: Date;
}

interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

interface ConversationState {
  messages: Message[];
  lastInteraction: number;
}

// ============================================================================
// VENUE CONFIGURATION
// ============================================================================

const VENUE_CONFIG = {
  name: 'GUDBRO',
  tableNumber: '12',
  wifi: { ssid: 'GUDBRO_Guest', password: 'Welcome2024!' },
  location: { lat: 10.7769, lng: 106.7009, address: 'District 1, Ho Chi Minh City' },
  menuUrl: 'https://gudbro.app/menu/t12',
};

// Merchandise data (hardcoded since not in sample-products.json)
const MERCHANDISE_DATA: DishItem[] = [
  { id: 'merch-001', name: 'GUDBRO T-Shirt', description: 'Premium cotton tee with logo', price: 250000, category: 'merchandise', image: '' },
  { id: 'merch-002', name: 'Coffee Mug', description: 'Ceramic mug - 350ml', price: 120000, category: 'merchandise', image: '' },
  { id: 'merch-003', name: 'Baseball Cap', description: 'Embroidered logo cap', price: 180000, category: 'merchandise', image: '' },
  { id: 'merch-004', name: 'Tote Bag', description: 'Eco-friendly canvas bag', price: 150000, category: 'merchandise', image: '' },
  { id: 'merch-005', name: 'Hoodie', description: 'Cozy fleece hoodie', price: 450000, category: 'merchandise', image: '' },
  { id: 'merch-006', name: 'Sticker Pack', description: '10 vinyl stickers', price: 50000, category: 'merchandise', image: '' },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<Language, {
  welcome: Record<string, string>;
  quickStart: string[];
  categories: Record<string, string>;
  responses: Record<string, string>;
  input: Record<string, string>;
  cart: Record<string, string>;
  tabs: Record<string, string>;
  menu: Record<string, string>;
  account: Record<string, string>;
  hamburger: Record<string, string>;
}> = {
  en: {
    welcome: {
      morning: "Good morning! Ready for a fresh start?",
      afternoon: "Good afternoon! What can I get you today?",
      evening: "Good evening! Looking for something delicious?",
      night: "Late night cravings? We've got you covered!",
      returning: "Welcome back! What can I get you today?"
    },
    quickStart: ['Popular', 'Menu', 'Allergies', 'Shop'],
    categories: {
      food: 'Food',
      drinks: 'Drinks',
      merchandise: 'Shop',
      dessert: 'Desserts',
      all: 'All Items',
      pho: 'Phở & Noodles',
      banh: 'Bánh Mì',
      rice: 'Rice Dishes'
    },
    responses: {
      popular: "Here are our most popular items! ⭐",
      allergies: "I can help you find safe options. What should I avoid?",
      safeItems: "Here are items without {allergen}:",
      noResults: "Sorry, I couldn't find items matching your criteria.",
      addedToCart: "Added {item}! 🎉",
      viewCart: "View Cart",
      keepBrowsing: "Continue",
      merchandise: "Check out our branded merchandise!",
      help: "I can help you with:\n\n📶 WiFi access\n📍 Invite friends\n🍽️ Browse menu\n🛍️ Merchandise",
      whatToSee: "What would you like to see?",
      wifi: "Here's the WiFi! 📶\n\nScan the QR code with your camera app to connect instantly:",
      invite: "Send this to your friends! 📍",
      callWaiter: "Calling waiter to Table {table}! 📞\n\nSomeone will be with you shortly.",
      allCategories: "Choose a category:"
    },
    input: {
      placeholder: "Type a message...",
      voiceTooltip: "Voice input",
      send: "Send"
    },
    cart: {
      title: "Your Cart",
      items: "items",
      total: "Total",
      placeOrder: "Place Order",
      empty: "Your cart is empty"
    },
    tabs: {
      chat: 'Chat',
      menu: 'Menu',
      shop: 'Shop',
      cart: 'Cart',
      more: 'More'
    },
    menu: {
      title: 'Menu',
      subtitle: 'Browse our delicious dishes',
      viewItems: 'View items in this category'
    },
    account: {
      title: 'Account',
      subtitle: 'Manage your profile and preferences',
      guest: 'Guest User',
      signIn: 'Sign In / Register',
      orders: 'Order History',
      ordersDesc: 'View past orders',
      favorites: 'Favorites',
      favoritesDesc: 'Your saved dishes',
      rewards: 'Rewards',
      rewardsDesc: 'Points and offers',
      settings: 'Settings',
      settingsDesc: 'Preferences'
    },
    hamburger: {
      title: 'Menu',
      subtitle: 'Quick actions',
      wifi: 'Get WiFi',
      invite: 'Invite Friends',
      callWaiter: 'Call Waiter',
      orders: 'My Orders',
      popular: 'Popular Dishes',
      allergies: 'Allergies',
      language: 'Language',
      currency: 'Currency',
      settings: 'Settings'
    }
  },
  it: {
    welcome: {
      morning: "Buongiorno! Pronto per iniziare la giornata?",
      afternoon: "Buon pomeriggio! Cosa posso offrirti oggi?",
      evening: "Buonasera! Cerchi qualcosa di delizioso?",
      night: "Fame notturna? Ci pensiamo noi!",
      returning: "Bentornato! Cosa posso offrirti oggi?"
    },
    quickStart: ['Popolari', 'Menu', 'Allergie', 'Shop'],
    categories: {
      food: 'Cibo',
      drinks: 'Bevande',
      merchandise: 'Shop',
      dessert: 'Dolci',
      all: 'Tutti',
      pho: 'Phở & Noodles',
      banh: 'Bánh Mì',
      rice: 'Piatti di Riso'
    },
    responses: {
      popular: "Ecco i nostri piatti più popolari! ⭐",
      allergies: "Posso aiutarti a trovare opzioni sicure. Cosa devo evitare?",
      safeItems: "Ecco i piatti senza {allergen}:",
      noResults: "Mi dispiace, non ho trovato piatti con questi criteri.",
      addedToCart: "{item} aggiunto! 🎉",
      viewCart: "Vedi Carrello",
      keepBrowsing: "Continua",
      merchandise: "Scopri il nostro merchandise!",
      help: "Posso aiutarti con:\n\n📶 WiFi\n📍 Invita amici\n🍽️ Menu\n🛍️ Merchandise",
      whatToSee: "Cosa vorresti vedere?",
      wifi: "Ecco il WiFi! 📶\n\nScansiona il QR con la fotocamera per connetterti:",
      invite: "Invia questo ai tuoi amici! 📍",
      callWaiter: "Chiamo il cameriere al Tavolo {table}! 📞\n\nQualcuno arriverà presto.",
      allCategories: "Scegli una categoria:"
    },
    input: {
      placeholder: "Scrivi un messaggio...",
      voiceTooltip: "Input vocale",
      send: "Invia"
    },
    cart: {
      title: "Il Tuo Carrello",
      items: "articoli",
      total: "Totale",
      placeOrder: "Ordina",
      empty: "Il carrello è vuoto"
    },
    tabs: {
      chat: 'Chat',
      menu: 'Menu',
      shop: 'Shop',
      cart: 'Carrello',
      more: 'Altro'
    },
    menu: {
      title: 'Menu',
      subtitle: 'Scopri i nostri piatti',
      viewItems: 'Vedi piatti in questa categoria'
    },
    account: {
      title: 'Account',
      subtitle: 'Gestisci profilo e preferenze',
      guest: 'Utente Ospite',
      signIn: 'Accedi / Registrati',
      orders: 'Storico Ordini',
      ordersDesc: 'Vedi ordini passati',
      favorites: 'Preferiti',
      favoritesDesc: 'I tuoi piatti salvati',
      rewards: 'Premi',
      rewardsDesc: 'Punti e offerte',
      settings: 'Impostazioni',
      settingsDesc: 'Preferenze'
    },
    hamburger: {
      title: 'Menu',
      subtitle: 'Azioni rapide',
      wifi: 'WiFi',
      invite: 'Invita Amici',
      callWaiter: 'Chiama Cameriere',
      orders: 'I Miei Ordini',
      popular: 'Piatti Popolari',
      allergies: 'Allergie',
      language: 'Lingua',
      currency: 'Valuta',
      settings: 'Impostazioni'
    }
  },
  vi: {
    welcome: {
      morning: "Chào buổi sáng! Sẵn sàng cho một khởi đầu tươi mới?",
      afternoon: "Chào buổi chiều! Hôm nay bạn muốn gì?",
      evening: "Chào buổi tối! Đang tìm gì ngon không?",
      night: "Đói khuya? Chúng tôi sẽ lo!",
      returning: "Chào mừng trở lại! Hôm nay bạn muốn gì?"
    },
    quickStart: ['Phổ biến', 'Thực đơn', 'Dị ứng', 'Cửa hàng'],
    categories: {
      food: 'Đồ ăn',
      drinks: 'Đồ uống',
      merchandise: 'Cửa hàng',
      dessert: 'Tráng miệng',
      all: 'Tất cả',
      pho: 'Phở & Bún',
      banh: 'Bánh Mì',
      rice: 'Cơm'
    },
    responses: {
      popular: "Đây là những món phổ biến nhất! ⭐",
      allergies: "Tôi có thể giúp bạn tìm lựa chọn an toàn. Tôi nên tránh gì?",
      safeItems: "Đây là các món không có {allergen}:",
      noResults: "Xin lỗi, không tìm thấy món phù hợp.",
      addedToCart: "Đã thêm {item}! 🎉",
      viewCart: "Xem Giỏ",
      keepBrowsing: "Tiếp tục",
      merchandise: "Khám phá hàng hóa của chúng tôi!",
      help: "Tôi có thể giúp bạn:\n\n📶 WiFi\n📍 Mời bạn bè\n🍽️ Thực đơn\n🛍️ Cửa hàng",
      whatToSee: "Bạn muốn xem gì?",
      wifi: "Đây là WiFi! 📶\n\nQuét mã QR bằng camera để kết nối:",
      invite: "Gửi cho bạn bè! 📍",
      callWaiter: "Gọi phục vụ đến Bàn {table}! 📞\n\nSẽ có người đến ngay.",
      allCategories: "Chọn danh mục:"
    },
    input: {
      placeholder: "Nhập tin nhắn...",
      voiceTooltip: "Nhập giọng nói",
      send: "Gửi"
    },
    cart: {
      title: "Giỏ Hàng",
      items: "món",
      total: "Tổng",
      placeOrder: "Đặt Hàng",
      empty: "Giỏ hàng trống"
    },
    tabs: {
      chat: 'Chat',
      menu: 'Thực đơn',
      shop: 'Cửa hàng',
      cart: 'Giỏ',
      more: 'Thêm'
    },
    menu: {
      title: 'Thực Đơn',
      subtitle: 'Khám phá các món ngon',
      viewItems: 'Xem các món trong danh mục này'
    },
    account: {
      title: 'Tài Khoản',
      subtitle: 'Quản lý hồ sơ và cài đặt',
      guest: 'Khách',
      signIn: 'Đăng Nhập / Đăng Ký',
      orders: 'Lịch Sử Đơn',
      ordersDesc: 'Xem đơn hàng cũ',
      favorites: 'Yêu Thích',
      favoritesDesc: 'Món đã lưu',
      rewards: 'Phần Thưởng',
      rewardsDesc: 'Điểm và ưu đãi',
      settings: 'Cài Đặt',
      settingsDesc: 'Tùy chọn'
    },
    hamburger: {
      title: 'Menu',
      subtitle: 'Thao tác nhanh',
      wifi: 'WiFi',
      invite: 'Mời Bạn Bè',
      callWaiter: 'Gọi Phục Vụ',
      orders: 'Đơn Của Tôi',
      popular: 'Món Phổ Biến',
      allergies: 'Dị Ứng',
      language: 'Ngôn Ngữ',
      currency: 'Tiền Tệ',
      settings: 'Cài Đặt'
    }
  }
};

// Safety filters grouped by type
const allergenFilters = safetyFilters.filter(f => f.type === 'allergen');
const intoleranceFilters = safetyFilters.filter(f => f.type === 'intolerance');
const dietFilters = safetyFilters.filter(f => f.type === 'diet');

// Helper to get safety filter label by id and language
const getSafetyFilterLabel = (id: string, lang: Language): string => {
  const filter = safetyFilters.find(f => f.id === id);
  return filter?.label[lang] || id;
};

// Helper to get safety filter icon by id
const getSafetyFilterIcon = (id: string): string => {
  const filter = safetyFilters.find(f => f.id === id);
  return filter?.icon || '⚠️';
};

// Common allergens to show in quick selection (EU 14 + common ones)
const commonAllergens = ['gluten', 'milk', 'eggs', 'peanuts', 'nuts', 'soy', 'fish', 'crustaceans', 'sesame'];

// Backward compatibility - allergen translations (now dynamic from safetyFilters)
const allergenTranslations: Record<Language, Record<string, string>> = {
  en: Object.fromEntries([...safetyFilters.map(f => [f.id, f.label.en]), ['none', 'No allergies'], ['dairy', 'Dairy']]),
  it: Object.fromEntries([...safetyFilters.map(f => [f.id, f.label.it]), ['none', 'Nessuna allergia'], ['dairy', 'Latticini']]),
  vi: Object.fromEntries([...safetyFilters.map(f => [f.id, f.label.vi]), ['none', 'Không dị ứng'], ['dairy', 'Sữa']])
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const CONVERSATION_STORAGE_KEY = 'gudbro-chat-conversation-v6';
const CONVERSATION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function formatPrice(price: number, currency: string = 'VND'): string {
  const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === currency);
  if (currency === 'VND') {
    return `${(price / 1000).toFixed(0)}k ${currencyInfo?.symbol || '₫'}`;
  }
  const rates: Record<string, number> = { USD: 0.000041, EUR: 0.000038, GBP: 0.000033 };
  const converted = price * (rates[currency] || 1);
  return `${currencyInfo?.symbol || ''}${converted.toFixed(2)}`;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function saveConversation(messages: Message[]): void {
  if (typeof window === 'undefined') return;
  const state: ConversationState = { messages: messages.slice(-20), lastInteraction: Date.now() };
  try {
    localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save conversation:', e);
  }
}

function loadConversation(): Message[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (!stored) return null;
    const state: ConversationState = JSON.parse(stored);
    if (Date.now() - state.lastInteraction > CONVERSATION_EXPIRY_MS) {
      localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      return null;
    }
    return state.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return null;
  }
}

function getCategoryType(category: string): 'food' | 'drinks' | 'merchandise' | 'dessert' {
  const cat = category?.toLowerCase() || '';
  if (['merchandise', 'merch', 'gadget', 'gift', 'retail'].includes(cat)) return 'merchandise';
  if (['beverage', 'drinks', 'coffee', 'smoothie', 'tea', 'wellness'].includes(cat)) return 'drinks';
  if (['dessert', 'dolci'].includes(cat)) return 'dessert';
  return 'food';
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// WiFi QR Code Component
const WiFiQRCode = ({ ssid, password, language }: { ssid: string; password: string; language: Language }) => {
  const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};;`;
  const [copied, setCopied] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
      <div className="flex flex-col items-center gap-3">
        <div className="bg-white p-3 rounded-xl">
          <QRCodeSVG value={wifiString} size={180} level="H" />
        </div>
        <div className="text-center w-full">
          <p className="text-gray-400 text-sm mb-1">Network</p>
          <p className="text-white font-bold">{ssid}</p>
          <p className="text-gray-400 text-sm mt-2 mb-1">Password</p>
          <div className="flex items-center justify-center gap-2">
            <code className="bg-gray-900/80 px-3 py-1 rounded-lg text-purple-300 font-mono text-sm">{password}</code>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={copyPassword} className="px-3 py-1 bg-purple-600 rounded-lg text-white text-sm">
              {copied ? '✓' : '📋'}
            </motion.button>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {language === 'it' ? 'Scansiona con la fotocamera' : language === 'vi' ? 'Quét bằng camera' : 'Scan with your camera app'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Share Invite Component
const ShareInvite = ({ venueName, tableNumber, location, menuUrl, language }: {
  venueName: string;
  tableNumber: string;
  location: { lat: number; lng: number; address: string };
  menuUrl: string;
  language: Language;
}) => {
  const [copied, setCopied] = useState(false);
  const mapsLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  const shareMessage = `I'm at ${venueName} (Table ${tableNumber})! Join me 🍜\n\n📍 Navigate: ${mapsLink}\n🍽️ Menu: ${menuUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Join me at ${venueName}!`, text: shareMessage });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
      <div className="space-y-3">
        <div className="bg-gray-900/80 rounded-xl p-3 text-sm text-gray-300 font-mono whitespace-pre-line">{shareMessage}</div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleShare} className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl">
            {navigator.share ? '📤 Share' : '📋 Copy'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.open(mapsLink, '_blank')} className="px-4 py-3 bg-gray-700 text-white font-semibold rounded-xl">📍</motion.button>
        </div>
        {copied && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm text-center">✓ Copied!</motion.p>}
      </div>
    </motion.div>
  );
};

// Typing Indicator
const TypingIndicator = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start mb-4">
    <div className={`backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800/90 border-gray-700/50'}`}>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        ))}
      </div>
    </div>
  </motion.div>
);

// Product Card (for chat items)
interface ProductCardProps {
  item: DishItem;
  onAdd: (item: DishItem) => void;
  currency: string;
  index: number;
}

const ProductCard = ({ item, onAdd, currency, index }: ProductCardProps) => {
  const imageUrl = item.image || (item as any).imageUrl;
  const categoryType = getCategoryType(item.category);
  const emoji = categoryType === 'drinks' ? '☕' : categoryType === 'dessert' ? '🍰' : categoryType === 'merchandise' ? '🎁' : '🍽️';
  const calories = (item as any).calories;
  const prepTime = (item as any).preparationTime;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="min-w-[190px] bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 flex flex-col hover:border-purple-500/50 transition-all"
    >
      {imageUrl ? (
        <div className="relative h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-3 overflow-hidden">
          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="text-5xl mb-3 text-center drop-shadow-lg">{emoji}</div>
      )}
      <h4 className="font-bold text-gray-100 text-base mb-1">{item.name}</h4>
      <p className="text-xs text-gray-400 mb-2 flex-1 line-clamp-2">{item.description}</p>
      {/* Calories & Prep Time */}
      {(calories || prepTime) && (
        <div className="flex items-center gap-2 mb-2 text-[10px] text-gray-500">
          {calories && <span className="flex items-center gap-0.5">🔥 {calories} kcal</span>}
          {prepTime && <span className="flex items-center gap-0.5">⏱️ {prepTime} min</span>}
        </div>
      )}
      {item.allergens && item.allergens.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {item.allergens.slice(0, 2).map(allergen => (
            <span key={allergen} className="text-[8px] px-1.5 py-0.5 bg-orange-900/50 text-orange-300 rounded-full">{getSafetyFilterIcon(allergen)} {allergen}</span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{formatPrice(item.price, currency)}</span>
        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => onAdd(item)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-purple-500/50">+</motion.button>
      </div>
    </motion.div>
  );
};

// Message Bubble
interface MessageBubbleProps {
  message: Message;
  onQuickReply: (value: string, label: string) => void;
  onAddToCart: (item: DishItem) => void;
  currency: string;
  language: Language;
  theme?: 'dark' | 'light';
}

const MessageBubble = ({ message, onQuickReply, onAddToCart, currency, language, theme = 'dark' }: MessageBubbleProps) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[85%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-2`}>
        <motion.div whileHover={{ scale: 1.01 }} className={`px-4 py-3 rounded-2xl shadow-md ${isBot
          ? theme === 'light'
            ? 'bg-white border border-gray-200 text-gray-800'
            : 'bg-gray-800/90 backdrop-blur-lg text-gray-100 border border-gray-700/50'
          : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/30'
        }`}>
          <p className="text-[15px] leading-relaxed whitespace-pre-line">{message.text}</p>
        </motion.div>

        {message.component === 'wifi' && <WiFiQRCode ssid={VENUE_CONFIG.wifi.ssid} password={VENUE_CONFIG.wifi.password} language={language} />}
        {message.component === 'share' && <ShareInvite venueName={VENUE_CONFIG.name} tableNumber={VENUE_CONFIG.tableNumber} location={VENUE_CONFIG.location} menuUrl={VENUE_CONFIG.menuUrl} language={language} />}

        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.quickReplies.map((reply, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onQuickReply(reply.value, reply.label)}
                className={`px-4 py-2 rounded-full backdrop-blur-sm border font-semibold text-sm shadow-lg transition-all flex items-center gap-1.5 ${theme === 'light'
                  ? 'bg-white border-purple-300 text-purple-600 hover:border-purple-400 hover:bg-purple-50'
                  : 'bg-gray-800/80 border-purple-500/50 text-purple-300 hover:border-purple-400 hover:bg-gray-800'
                }`}
              >
                {reply.icon && <span>{reply.icon}</span>}
                <span>{reply.label}</span>
              </motion.button>
            ))}
          </div>
        )}

        {message.items && message.items.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 mt-2 scrollbar-hide max-w-full">
            {message.items.map((item, index) => (
              <ProductCard key={item.id} item={item} onAdd={onAddToCart} currency={currency} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Voice Input Button
interface VoiceInputProps {
  onResult: (text: string) => void;
  isListening: boolean;
  setIsListening: (v: boolean) => void;
  tooltip: string;
  language: Language;
}

const VoiceInput = ({ onResult, isListening, setIsListening, tooltip, language }: VoiceInputProps) => {
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'vi' ? 'vi-VN' : language === 'it' ? 'it-IT' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [onResult, setIsListening, language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  }, [setIsListening]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={isListening ? stopListening : startListening}
      title={tooltip}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
      </svg>
    </motion.button>
  );
};

// Hamburger Menu Sidebar
const HamburgerMenu = ({ isOpen, onClose, onMenuAction, t }: {
  isOpen: boolean;
  onClose: () => void;
  onMenuAction: (action: string) => void;
  t: typeof translations['en'];
}) => {
  const menuItems = [
    { id: 'wifi', icon: '📶', label: t.hamburger.wifi, color: 'from-blue-600 to-cyan-600' },
    { id: 'invite', icon: '📍', label: t.hamburger.invite, color: 'from-green-600 to-emerald-600' },
    { id: 'call-waiter', icon: '📞', label: t.hamburger.callWaiter, color: 'from-orange-600 to-red-600' },
    { id: 'orders', icon: '📦', label: t.hamburger.orders, color: 'from-purple-600 to-pink-600' },
    { id: 'popular', icon: '🌟', label: t.hamburger.popular, color: 'from-yellow-600 to-orange-600' },
    { id: 'allergies', icon: '⚠️', label: t.hamburger.allergies, color: 'from-red-600 to-pink-600' },
    { id: 'language', icon: '🌐', label: t.hamburger.language, color: 'from-indigo-600 to-purple-600' },
    { id: 'currency', icon: '💱', label: t.hamburger.currency, color: 'from-teal-600 to-cyan-600' },
    { id: 'settings', icon: '⚙️', label: t.hamburger.settings, color: 'from-gray-600 to-slate-600' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 z-[160] w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{t.hamburger.title}</h2>
              <p className="text-sm text-gray-400">{t.hamburger.subtitle}</p>
            </div>
            <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { onMenuAction(item.id); onClose(); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all`}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-lg font-semibold">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

// Cart Modal
const CartModal = ({ isOpen, onClose, currency, t }: {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  t: typeof translations['en'];
}) => {
  const [items, setItems] = useState(selectionsStore.getItems());

  useEffect(() => {
    const handleUpdate = () => setItems(selectionsStore.getItems());
    window.addEventListener('selections-updated', handleUpdate);
    return () => window.removeEventListener('selections-updated', handleUpdate);
  }, []);

  const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="w-full bg-gradient-to-b from-gray-900 to-black rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden border-t-2 border-purple-500/30">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 px-6 py-5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">{t.cart.title}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{items.length} {t.cart.items}</p>
          </div>
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </motion.button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-200px)] px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-gray-500">{t.cart.empty}</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.05 }} className="bg-gray-800/80 rounded-2xl p-4 mb-3 shadow-md border border-gray-700/50 flex items-center gap-4">
                  <div className="text-4xl">🍽️</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.dish.name}</h4>
                    <p className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">{formatPrice(item.dish.price, currency)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => selectionsStore.decrement(item.id)} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-bold text-white">-</motion.button>
                    <span className="font-bold text-lg w-8 text-center text-white">{item.quantity}</span>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => selectionsStore.increment(item.dish, item.extras)} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">+</motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-6 py-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-300">{t.cart.total}</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{formatPrice(total, currency)}</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/50">{t.cart.placeOrder}</motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Welcome Modal - Clean and simple: just optional name
const WelcomeModal = ({ isOpen, onClose, onSave, tableNumber, language }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string | null) => void;
  tableNumber: string;
  language: Language;
}) => {
  const [name, setName] = useState('');

  const labels = {
    en: {
      title: 'Welcome!',
      table: 'Table',
      nameLabel: 'Your name (optional)',
      namePlaceholder: 'Enter your name',
      start: 'Start Ordering',
      skip: 'Skip',
      hasAccount: 'Already have an account?',
      login: 'Sign In'
    },
    it: {
      title: 'Benvenuto!',
      table: 'Tavolo',
      nameLabel: 'Il tuo nome (opzionale)',
      namePlaceholder: 'Inserisci il tuo nome',
      start: 'Inizia a Ordinare',
      skip: 'Salta',
      hasAccount: 'Hai già un account?',
      login: 'Accedi'
    },
    vi: {
      title: 'Chào mừng!',
      table: 'Bàn',
      nameLabel: 'Tên của bạn (tùy chọn)',
      namePlaceholder: 'Nhập tên của bạn',
      start: 'Bắt đầu Gọi món',
      skip: 'Bỏ qua',
      hasAccount: 'Đã có tài khoản?',
      login: 'Đăng nhập'
    }
  };
  const t = labels[language];

  const handleStart = () => {
    onSave(name.trim() || null);
  };

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-900 rounded-3xl p-6 w-full max-w-sm border border-gray-700 shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl">🍜</div>
          <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30">
            <span className="text-purple-400 font-medium">{t.table} {tableNumber}</span>
          </div>
        </div>

        {/* Name Input - Optional */}
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block">{t.nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
            autoFocus
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(null)}
            className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
          >
            {t.skip}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg"
          >
            {t.start}
          </motion.button>
        </div>

        {/* Login option */}
        <div className="mt-5 pt-4 border-t border-gray-800 text-center">
          <span className="text-gray-500 text-sm">{t.hasAccount} </span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="text-purple-400 font-semibold text-sm hover:text-purple-300"
          >
            {t.login}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Quick Actions Popup (for + button)
const QuickActionsPopup = ({ isOpen, onClose, onAction, t }: {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  t: typeof translations['en'];
}) => {
  const actions = [
    { id: 'wifi', icon: '📶', label: t.hamburger.wifi, color: 'from-blue-500 to-cyan-500' },
    { id: 'invite', icon: '📍', label: t.hamburger.invite, color: 'from-green-500 to-emerald-500' },
    { id: 'call-waiter', icon: '📞', label: t.hamburger.callWaiter, color: 'from-orange-500 to-red-500' },
    { id: 'allergies', icon: '⚠️', label: t.hamburger.allergies, color: 'from-yellow-500 to-orange-500' },
    { id: 'language', icon: '🌐', label: t.hamburger.language, color: 'from-indigo-500 to-purple-500' },
    { id: 'reset', icon: '🔄', label: 'Reset', color: 'from-red-600 to-red-800' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-4 right-4 z-[110] bg-gray-900/95 backdrop-blur-xl rounded-3xl p-4 border border-gray-700 shadow-2xl"
          >
            <div className="grid grid-cols-3 gap-3">
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onAction(action.id); onClose(); }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg`}
                >
                  <span className="text-3xl">{action.icon}</span>
                  <span className="text-xs font-semibold text-white text-center leading-tight">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// SVG Icons for Bottom Navigation
const NavIcons = {
  chat: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  menu: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  shop: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  cart: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

// Bottom Navigation with central + button - Clean circular design, no labels
const BottomNavigation = ({ activeTab, onTabChange, cartCount, onPlusClick, isPlusActive, theme = 'dark' }: {
  activeTab: BottomTab;
  onTabChange: (tab: BottomTab) => void;
  cartCount: number;
  onPlusClick: () => void;
  isPlusActive: boolean;
  theme?: 'dark' | 'light';
}) => {
  // Uniform circular button style with theme support
  const getButtonClasses = (isActive: boolean) => `
    w-12 h-12 rounded-full flex items-center justify-center transition-all
    ${isActive
      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
      : theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/80 hover:bg-gray-700'
    }
  `;

  const getIconColor = (isActive: boolean) => isActive ? 'text-white' : theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className={`backdrop-blur-xl border-t px-4 py-2 ${theme === 'light' ? 'bg-white/95 border-gray-200' : 'bg-gray-900/95 border-gray-700'}`}>
      <div className="flex justify-between items-center">
        {/* Chat */}
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onTabChange('chat')} className={getButtonClasses(activeTab === 'chat')}>
          <svg className={`w-6 h-6 ${getIconColor(activeTab === 'chat')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>

        {/* Menu */}
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onTabChange('menu')} className={getButtonClasses(activeTab === 'menu')}>
          <svg className={`w-6 h-6 ${getIconColor(activeTab === 'menu')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </motion.button>

        {/* Central + Button - same style as others */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPlusClick}
          className={getButtonClasses(isPlusActive)}
        >
          <svg className={`w-6 h-6 ${getIconColor(isPlusActive)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>

        {/* Shop */}
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onTabChange('shop')} className={getButtonClasses(activeTab === 'shop')}>
          <svg className={`w-6 h-6 ${getIconColor(activeTab === 'shop')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </motion.button>

        {/* Cart */}
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onTabChange('cart')} className={`${getButtonClasses(activeTab === 'cart')} relative`}>
          <svg className={`w-6 h-6 ${getIconColor(activeTab === 'cart')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">{cartCount}</motion.span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

// ============================================================================
// DESKTOP SIDEBAR - Only visible on md+ screens
// ============================================================================

const DesktopSidebar = ({
  activeTab,
  onTabChange,
  cartCount,
  theme,
  onNewChat,
  venueName,
  t
}: {
  activeTab: BottomTab;
  onTabChange: (tab: BottomTab) => void;
  cartCount: number;
  theme: 'dark' | 'light';
  onNewChat: () => void;
  venueName: string;
  t: typeof translations['en'];
}) => {
  const menuItems = [
    { id: 'chat' as BottomTab, icon: '💬', label: 'Chat AI' },
    { id: 'menu' as BottomTab, icon: '📖', label: t.tabs.menu },
    { id: 'shop' as BottomTab, icon: '🛍️', label: t.tabs.shop },
    { id: 'cart' as BottomTab, icon: '🛒', label: t.tabs.cart, badge: cartCount },
  ];

  return (
    <div className={`hidden md:flex flex-col w-64 border-r h-full ${
      theme === 'light'
        ? 'bg-gray-50 border-gray-200'
        : 'bg-gray-900/50 border-gray-800'
    }`}>
      {/* Logo/Brand */}
      <div className={`p-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl">
            🍜
          </div>
          <div>
            <h1 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{venueName}</h1>
            <p className="text-xs text-purple-500">AI Menu Assistant</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            theme === 'light'
              ? 'bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md'
              : 'bg-gray-800 border border-gray-700 hover:border-purple-500/50 hover:shadow-lg'
          }`}
        >
          <span className="text-lg">✨</span>
          <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Nuova Chat</span>
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                : theme === 'light'
                  ? 'hover:bg-gray-100'
                  : 'hover:bg-gray-800/50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`font-medium ${
              activeTab === item.id
                ? 'text-purple-400'
                : theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {item.label}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="absolute right-3 px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom section - Settings hint */}
      <div className={`p-3 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className={`text-xs text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
          🌐 Lingua • 💱 Valuta • 🎨 Tema
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface ModernChatMenuV6Props {
  menuItems: DishItem[];
}

export function ModernChatMenuV6({ menuItems }: ModernChatMenuV6Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeTab, setActiveTab] = useState<BottomTab>('chat');
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showSeatSetup, setShowSeatSetup] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState('VND');
  const [isClient, setIsClient] = useState(false);

  // Menu view state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Theme & UI preferences
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuStyle, setMenuStyle] = useState<'new' | 'classic'>('new');

  // Table context state
  const [tableContext, setTableContextState] = useState<TableContext>({
    table_number: null,
    seat_number: null,
    customer_name: null,
    consumption_type: 'dine-in',
    scanned_at: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const allergenT = allergenTranslations[language];

  // Merchandise data (from V4)
  const merchandiseItems = menuItems.filter(item => getCategoryType(item.category) === 'merchandise');

  // Dynamic category configuration from database
  // Maps DB category to display info (icon + translated name)
  const categoryDisplayConfig: Record<string, { icon: string; name: Record<Language, string> }> = {
    'beverage': {
      icon: '☕',
      name: { en: 'Drinks', it: 'Bevande', vi: 'Đồ Uống' }
    },
    'food': {
      icon: '🍽️',
      name: { en: 'Food', it: 'Cibo', vi: 'Món Ăn' }
    },
    'dessert': {
      icon: '🍰',
      name: { en: 'Desserts', it: 'Dolci', vi: 'Tráng Miệng' }
    }
  };

  // Extract unique categories from menu items dynamically
  const uniqueCategories = [...new Set(menuItems.map(item => item.category).filter(Boolean))];

  // Build category display list with icons and translated names
  const foodCategories = uniqueCategories
    .filter(cat => categoryDisplayConfig[cat]) // Only show categories we have config for
    .map(cat => {
      const config = categoryDisplayConfig[cat];
      return `${config.icon} ${config.name[language]}`;
    });

  // Filter products by category (using actual category field from DB)
  const getProductsByCategory = (categoryDisplayName: string): DishItem[] => {
    // Extract the icon to find the category key
    const icon = categoryDisplayName.split(' ')[0];
    const categoryKey = Object.entries(categoryDisplayConfig)
      .find(([_, config]) => config.icon === icon)?.[0];

    if (!categoryKey) return [];

    return menuItems.filter(item => item.category === categoryKey);
  };

  // Initialize
  useEffect(() => {
    setIsClient(true);
    const langPrefs = languagePreferencesStore.get();
    const currPrefs = currencyPreferencesStore.get();
    const validLang = (['en', 'it', 'vi'] as Language[]).includes(langPrefs.selectedLanguage as Language)
      ? (langPrefs.selectedLanguage as Language) : 'en';
    setLanguage(validLang);
    setCurrency(currPrefs.selectedCurrency || 'VND');

    // Load table context
    const ctx = tableContextStore.get();
    setTableContextState(ctx);

    // For demo: Set table 12 if not set, and show seat setup if no name/seat
    if (!ctx.table_number) {
      tableContextStore.setFromQR('12');
      setTableContextState(tableContextStore.get());
    }

    // Show seat setup if at table but no name/seat yet
    if (ctx.table_number && (!ctx.customer_name || !ctx.seat_number)) {
      setShowSeatSetup(true);
    }

    const savedMessages = loadConversation();
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      setTimeout(() => sendWelcomeMessage(validLang), 100);
    }

    setCartCount(selectionsStore.getCount());
  }, []);

  // Listen for store updates
  useEffect(() => {
    if (!isClient) return;

    const handleSelectionsUpdate = () => setCartCount(selectionsStore.getCount());
    const handleLangUpdate = () => {
      const prefs = languagePreferencesStore.get();
      const validLang = (['en', 'it', 'vi'] as Language[]).includes(prefs.selectedLanguage as Language)
        ? (prefs.selectedLanguage as Language) : 'en';
      setLanguage(validLang);
    };
    const handleCurrencyUpdate = () => {
      const prefs = currencyPreferencesStore.get();
      setCurrency(prefs.selectedCurrency || 'VND');
    };

    window.addEventListener('selections-updated', handleSelectionsUpdate);
    window.addEventListener('language-preferences-updated', handleLangUpdate);
    window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);

    return () => {
      window.removeEventListener('selections-updated', handleSelectionsUpdate);
      window.removeEventListener('language-preferences-updated', handleLangUpdate);
      window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    };
  }, [isClient]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Save conversation
  useEffect(() => {
    if (messages.length > 0) saveConversation(messages);
  }, [messages]);

  const sendWelcomeMessage = (lang: Language = language) => {
    const timeOfDay = getTimeOfDay();
    const currentT = translations[lang];
    const isReturning = typeof window !== 'undefined' && localStorage.getItem('gudbro_visitor') === 'true';

    if (isReturning) {
      addBotMessage(currentT.welcome.returning, currentT.quickStart.map((label, i) => ({
        label, value: ['popular', 'menu', 'allergies', 'merchandise'][i], icon: ['🌟', '🍽️', '⚠️', '🛍️'][i]
      })));
    } else {
      if (typeof window !== 'undefined') localStorage.setItem('gudbro_visitor', 'true');
      addBotMessage(`${currentT.welcome[timeOfDay]}\n\nTable ${VENUE_CONFIG.tableNumber}`, currentT.quickStart.map((label, i) => ({
        label, value: ['popular', 'menu', 'allergies', 'merchandise'][i], icon: ['🌟', '🍽️', '⚠️', '🛍️'][i]
      })));
    }
  };

  const addBotMessage = (text: string, quickReplies?: QuickReply[], items?: DishItem[], component?: Message['component']) => {
    setIsTyping(true);
    const delay = Math.min(400 + text.length * 8, 1200);

    setTimeout(() => {
      const newMessage: Message = { id: generateId(), type: 'bot', text, quickReplies, items, component, timestamp: new Date() };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = { id: generateId(), type: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
  };

  // Intent handling
  const handleIntent = (input: string) => {
    const lower = input.toLowerCase();

    // WiFi
    if (lower.includes('wifi') || lower.includes('📶')) {
      addBotMessage(t.responses.wifi, [
        { label: '📤 Share', value: 'invite', icon: '📤' },
        { label: t.tabs.menu, value: 'menu', icon: '🍽️' }
      ], undefined, 'wifi');
    }
    // Invite/Share
    else if (lower.includes('invite') || lower.includes('share') || lower.includes('📍') || lower.includes('amici') || lower.includes('bạn bè')) {
      addBotMessage(t.responses.invite, [
        { label: '📶 WiFi', value: 'wifi', icon: '📶' },
        { label: t.tabs.menu, value: 'menu', icon: '🍽️' }
      ], undefined, 'share');
    }
    // Call waiter
    else if (lower.includes('call') || lower.includes('waiter') || lower.includes('cameriere') || lower.includes('phục vụ') || lower.includes('📞')) {
      addBotMessage(t.responses.callWaiter.replace('{table}', VENUE_CONFIG.tableNumber), [
        { label: t.tabs.menu, value: 'menu', icon: '🍽️' }
      ]);
    }
    // Popular
    else if (lower.includes('popular') || lower.includes('popolari') || lower.includes('phổ biến') || lower.includes('🌟')) {
      const popular = menuItems.filter(item => getCategoryType(item.category) !== 'merchandise').slice(0, 8);
      addBotMessage(t.responses.popular, [
        { label: t.categories.food, value: 'food', icon: '🍽️' },
        { label: t.categories.drinks, value: 'drinks', icon: '☕' },
        { label: t.categories.merchandise, value: 'merchandise', icon: '🛍️' }
      ], popular);
    }
    // Menu/Browse
    else if (lower.includes('menu') || lower.includes('browse') || lower.includes('🍽️') || lower.includes('thực đơn')) {
      addBotMessage(t.responses.allCategories, foodCategories.map(cat => ({
        label: cat.replace(/^[^\w\s]+\s*/, ''), value: cat, icon: cat.split(' ')[0]
      })));
    }
    // Food
    else if (lower === 'food' || lower.includes('cibo') || lower.includes('đồ ăn')) {
      const foodItems = menuItems.filter(item => getCategoryType(item.category) === 'food').slice(0, 8);
      addBotMessage(t.categories.food + ':', [
        { label: t.categories.drinks, value: 'drinks', icon: '☕' },
        { label: t.responses.viewCart, value: 'cart', icon: '🛒' }
      ], foodItems);
    }
    // Drinks
    else if (lower === 'drinks' || lower.includes('bevande') || lower.includes('đồ uống') || lower.includes('coffee') || lower.includes('caffè') || lower.includes('☕')) {
      const drinkItems = menuItems.filter(item => getCategoryType(item.category) === 'drinks').slice(0, 8);
      addBotMessage(t.categories.drinks + ':', [
        { label: t.categories.food, value: 'food', icon: '🍽️' },
        { label: t.responses.viewCart, value: 'cart', icon: '🛒' }
      ], drinkItems);
    }
    // Merchandise/Shop
    else if (lower.includes('merchandise') || lower.includes('merch') || lower.includes('shop') || lower.includes('🛍️') || lower.includes('hàng hóa')) {
      if (merchandiseItems.length > 0) {
        addBotMessage(t.responses.merchandise, [{ label: t.responses.keepBrowsing, value: 'menu', icon: '📖' }], merchandiseItems);
      } else {
        addBotMessage(t.responses.merchandise, [{ label: t.responses.keepBrowsing, value: 'menu', icon: '📖' }]);
      }
    }
    // Allergies - show common allergens from safety-filters
    else if (lower.includes('allerg') || lower.includes('dị ứng') || lower.includes('⚠️')) {
      const allergenOptions = [...commonAllergens, 'none'].map((a, i) => ({
        label: allergenT[a] || getSafetyFilterLabel(a, language),
        value: a,
        icon: a === 'none' ? '✅' : getSafetyFilterIcon(a)
      }));
      addBotMessage(t.responses.allergies, allergenOptions);
    }
    // Intolerances - show common intolerances
    else if (lower.includes('intoleran') || lower.includes('sensib') || lower.includes('không dung nạp')) {
      const intoleranceOptions = intoleranceFilters.slice(0, 8).map(f => ({
        label: f.label[language],
        value: f.id,
        icon: f.icon || '⚠️'
      }));
      addBotMessage(t.responses.allergies.replace('allergies', 'intolerances'), intoleranceOptions);
    }
    // Specific allergens/intolerances - check against all safety filters
    else if (safetyFilters.some(f =>
      lower.includes(f.id) ||
      lower.includes(f.label.en.toLowerCase()) ||
      lower.includes(f.label.it.toLowerCase()) ||
      lower.includes(f.label.vi.toLowerCase())
    )) {
      const matchedFilter = safetyFilters.find(f =>
        lower.includes(f.id) ||
        lower.includes(f.label.en.toLowerCase()) ||
        lower.includes(f.label.it.toLowerCase()) ||
        lower.includes(f.label.vi.toLowerCase())
      );
      if (matchedFilter) {
        // Filter items based on type (allergen, intolerance, or diet)
        const safeItems = menuItems.filter(item => {
          if (matchedFilter.type === 'allergen') {
            return !item.allergens?.some(a => a.toLowerCase() === matchedFilter.id);
          } else if (matchedFilter.type === 'intolerance') {
            return !item.intolerances?.some(i => i.toLowerCase() === matchedFilter.id);
          } else if (matchedFilter.type === 'diet') {
            return item.dietary?.some(d => d.toLowerCase() === matchedFilter.id);
          }
          return true;
        }).slice(0, 8);

        addBotMessage(t.responses.safeItems.replace('{allergen}', matchedFilter.label[language]), [
          { label: t.responses.keepBrowsing, value: 'menu', icon: '📖' },
          { label: t.responses.viewCart, value: 'cart', icon: '🛒' }
        ], safeItems);
      }
    }
    // No allergies
    else if (lower === 'none' || lower.includes('no allerg') || lower.includes('nessuna') || lower.includes('không dị ứng') || lower.includes('✅')) {
      addBotMessage(t.responses.popular, [
        { label: t.categories.food, value: 'food', icon: '🍽️' },
        { label: t.categories.drinks, value: 'drinks', icon: '☕' }
      ], menuItems.slice(0, 8));
    }
    // Category selection - matches dynamic categories from DB
    else if (foodCategories.some(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')))) {
      const category = foodCategories.find(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')));
      // Use getProductsByCategory which now filters by actual DB category
      const items = category ? getProductsByCategory(category) : [];
      addBotMessage(`${category}:`, [
        { label: '⬅️ Back', value: 'menu', icon: '⬅️' },
        { label: t.responses.viewCart, value: 'cart', icon: '🛒' }
      ], items.slice(0, 8));
    }
    // Cart
    else if (lower.includes('cart') || lower.includes('carrello') || lower.includes('giỏ') || lower.includes('🛒')) {
      setShowCart(true);
    }
    // Fallback
    else {
      addBotMessage(t.responses.help, t.quickStart.map((label, i) => ({
        label, value: ['popular', 'menu', 'allergies', 'merchandise'][i], icon: ['🌟', '🍽️', '⚠️', '🛍️'][i]
      })));
    }
  };

  const handleMenuAction = (action: string) => {
    // Handle reset separately - don't switch to chat
    if (action === 'reset') {
      handleReset();
      return;
    }

    // Switch to chat tab to show the response
    setActiveTab('chat');

    switch (action) {
      case 'wifi': handleIntent('wifi'); break;
      case 'invite': handleIntent('invite'); break;
      case 'call-waiter': handleIntent('call waiter'); break;
      case 'orders': addBotMessage("Your orders:\n\n(Coming soon)", [{ label: t.tabs.menu, value: 'menu', icon: '🍽️' }]); break;
      case 'popular': handleIntent('popular'); break;
      case 'allergies': handleIntent('allergies'); break;
      case 'language': addBotMessage("Language: Coming soon", [{ label: t.tabs.menu, value: 'menu', icon: '🍽️' }]); break;
      case 'currency': addBotMessage("Currency: Coming soon", [{ label: t.tabs.menu, value: 'menu', icon: '🍽️' }]); break;
      case 'settings': addBotMessage("Settings: Coming soon", [{ label: t.tabs.menu, value: 'menu', icon: '🍽️' }]); break;
    }
  };

  const handleReset = () => {
    // Clear all localStorage data
    localStorage.removeItem(CONVERSATION_STORAGE_KEY);
    localStorage.removeItem('table_context');
    localStorage.removeItem('gudbro_visitor');
    localStorage.removeItem('gudbro_selections');

    // Clear state
    setMessages([]);
    tableContextStore.clear();
    selectionsStore.clear();
    setCartCount(0);

    // Reset table context state
    setTableContextState({
      table_number: null,
      seat_number: null,
      customer_name: null,
      consumption_type: 'dine-in',
      scanned_at: null
    });

    // Set table and show welcome modal
    tableContextStore.setFromQR('12');
    setTableContextState(tableContextStore.get());
    setShowSeatSetup(true);
    setActiveTab('chat');
  };

  const handleQuickReply = (value: string, label: string) => {
    addUserMessage(label);
    if (value === 'cart') {
      setShowCart(true);
    } else {
      handleIntent(value);
    }
  };

  const handleAddToCart = (item: DishItem) => {
    selectionsStore.add(item, 1, []);
    addBotMessage(t.responses.addedToCart.replace('{item}', item.name), [
      { label: t.responses.viewCart, value: 'cart', icon: '🛒' },
      { label: t.responses.keepBrowsing, value: 'menu', icon: '📖' }
    ]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    addUserMessage(userInput);
    handleIntent(userInput);
    setUserInput('');
    inputRef.current?.focus();
  };

  const handleVoiceResult = (text: string) => {
    setUserInput(text);
    setTimeout(() => {
      addUserMessage(text);
      handleIntent(text);
      setUserInput('');
    }, 300);
  };

  const handleTabChange = (tab: BottomTab) => {
    if (tab === 'cart') {
      setShowCart(true);
      return; // Don't change tab, just open modal
    }
    if (tab === 'actions') {
      setShowQuickActions(true);
      return;
    }
    setActiveTab(tab);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="animate-pulse text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  // Handle new chat - reset messages
  const handleNewChat = () => {
    setMessages([]);
    setActiveTab('chat');
    // Re-trigger welcome message
    setTimeout(() => {
      sendWelcomeMessage(language);
    }, 300);
  };

  return (
    <div className={`h-screen flex ${theme === 'light' ? 'bg-gray-100' : 'bg-gradient-to-br from-gray-950 via-black to-gray-950'}`}>
      {/* Desktop Sidebar - Hidden on mobile */}
      <DesktopSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        theme={theme}
        onNewChat={handleNewChat}
        venueName={VENUE_CONFIG.name}
        t={t}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${
        theme === 'light' ? 'bg-white' : 'bg-gray-900'
      }`}>
        {/* Mobile Header - Hidden on desktop */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`md:hidden sticky top-0 z-50 backdrop-blur-2xl border-b shadow-lg ${
            theme === 'light' ? 'bg-white/90 border-gray-200' : 'bg-gray-900/90 border-gray-700/50'
          }`}
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">🍜</div>
            <div className="flex-1">
              <h1 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{VENUE_CONFIG.name}</h1>
              {tableContext.table_number && (
                <p className="text-[11px] text-purple-500">Table {tableContext.table_number}</p>
              )}
            </div>

            {/* Theme Toggle - SVG icons instead of emoji */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>

            {/* Menu Style Toggle - Just "AI" text, circular */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/menu')}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                theme === 'light'
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
              title="Switch to Classic menu"
            >
              AI
            </motion.button>

            {/* Account Avatar - Rounded full */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSeatSetup(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all overflow-hidden ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              {tableContext.customer_name ? (
                <span className="font-bold text-sm">{tableContext.customer_name.charAt(0).toUpperCase()}</span>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Desktop Header - Minimal, shown only on desktop */}
        <div className={`hidden md:flex items-center justify-between px-6 py-3 border-b ${
          theme === 'light' ? 'border-gray-200' : 'border-gray-800'
        }`}>
          <div className="flex items-center gap-2">
            {tableContext.table_number && (
              <span className={`px-3 py-1 rounded-full text-sm ${
                theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/30 text-purple-400'
              }`}>
                📍 Table {tableContext.table_number}
              </span>
            )}
            {tableContext.customer_name && (
              <span className={`px-3 py-1 rounded-full text-sm ${
                theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
              }`}>
                👤 {tableContext.customer_name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
                theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>
            {/* Classic Menu Link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/menu')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Menu Classico →
            </motion.button>
          </div>
        </div>

        {/* Hamburger Menu */}
        <HamburgerMenu isOpen={showHamburgerMenu} onClose={() => setShowHamburgerMenu(false)} onMenuAction={handleMenuAction} t={t} />

      {/* Shop View - Using MERCHANDISE_DATA */}
      {activeTab === 'shop' && (
        <div className={`flex-1 overflow-y-auto px-4 py-6 ${theme === 'light' ? 'bg-gray-50' : ''}`}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h2 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>{t.tabs.shop}</h2>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Take home a piece of {VENUE_CONFIG.name}</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {MERCHANDISE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`rounded-2xl p-4 shadow-xl border transition-all ${theme === 'light'
                  ? 'bg-white border-gray-200 hover:border-purple-400'
                  : 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50'
                }`}
              >
                <div className="text-6xl mb-3 text-center">
                  {item.name.includes('T-Shirt') ? '👕' :
                   item.name.includes('Mug') ? '☕' :
                   item.name.includes('Cap') ? '🧢' :
                   item.name.includes('Tote') ? '👜' :
                   item.name.includes('Hoodie') ? '🧥' :
                   item.name.includes('Sticker') ? '🎨' : '🎁'}
                </div>
                <h3 className={`font-bold text-base mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.name}</h3>
                <p className={`text-xs mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{formatPrice(item.price, currency)}</span>
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => handleAddToCart(item)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">+</motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Menu View */}
      {activeTab === 'menu' && (
        <div className={`flex-1 overflow-y-auto px-4 py-6 ${theme === 'light' ? 'bg-gray-50' : ''}`}>
          {/* Category Products View */}
          {selectedCategory ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Back button + Category title */}
              <div className="flex items-center gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCategory(null)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                  <svg className={`w-5 h-5 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>
                  {selectedCategory}
                </h2>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 gap-4">
                {getProductsByCategory(selectedCategory).length > 0 ? (
                  getProductsByCategory(selectedCategory).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`rounded-2xl p-4 shadow-lg border ${theme === 'light'
                        ? 'bg-white border-gray-200'
                        : 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50'
                      }`}
                    >
                      <div className="flex gap-4">
                        {item.image && (
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.name}</h3>
                          <p className={`text-sm mt-1 line-clamp-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{item.description}</p>
                          {/* Calories, Prep Time, Allergens */}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {(item as any).calories && (
                              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>🔥 {(item as any).calories} kcal</span>
                            )}
                            {(item as any).preparationTime && (
                              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>⏱️ {(item as any).preparationTime} min</span>
                            )}
                            {item.allergens && item.allergens.length > 0 && (
                              <span className="text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-full">
                                {item.allergens.slice(0, 2).map(a => getSafetyFilterIcon(a)).join('')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                              {formatPrice(item.price, currency)}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleAddToCart(item)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <p className="text-lg">No items in this category yet</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(null)}
                      className="mt-4 text-purple-400 hover:text-purple-300"
                    >
                      ← Back to categories
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Categories List */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h2 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>
                  {t.menu.title}
                </h2>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>{t.menu.subtitle}</p>
              </motion.div>
              <div className="grid grid-cols-1 gap-4">
                {foodCategories.map((category, index) => {
                  const productCount = getProductsByCategory(category).length;
                  return (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-2xl p-6 shadow-xl border transition-all text-left ${theme === 'light'
                        ? 'bg-white border-gray-200 hover:border-purple-400'
                        : 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{category}</h3>
                          <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {productCount > 0 ? `${productCount} items` : t.menu.viewItems}
                          </p>
                        </div>
                        <svg className={`w-6 h-6 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Chat View */}
      {activeTab === 'chat' && (
        <div
          className={`flex-1 overflow-y-auto px-4 py-6 ${theme === 'light' ? 'bg-gray-50' : ''}`}
          style={theme === 'dark' ? { backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)' } : {}}
        >
          <div className="max-w-2xl mx-auto">
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} onQuickReply={handleQuickReply} onAddToCart={handleAddToCart} currency={currency} language={language} theme={theme} />
            ))}
            <AnimatePresence>{isTyping && <TypingIndicator theme={theme} />}</AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Bar - Consistent px-4 padding */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className={`backdrop-blur-2xl border-t px-4 py-2 shadow-lg ${theme === 'light' ? 'bg-white/95 border-gray-200' : 'bg-gray-900/95 border-gray-700/50'}`}>
        <div className="flex gap-2 items-center">
          <VoiceInput onResult={handleVoiceResult} isListening={isListening} setIsListening={setIsListening} tooltip={t.input.voiceTooltip} language={language} />

          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t.input.placeholder}
              className={`w-full px-4 py-2.5 rounded-2xl border text-[15px] transition-all ${theme === 'light'
                ? 'bg-gray-100 border-gray-200 focus:border-purple-400 focus:bg-white text-gray-900 placeholder-gray-400'
                : 'bg-gray-800/80 border-gray-700 focus:border-purple-500 focus:bg-gray-800 text-white placeholder-gray-500'
              } focus:outline-none`}
            />
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleSendMessage} disabled={!userInput.trim()} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg disabled:opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Navigation - Mobile only */}
      <div className="md:hidden">
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} cartCount={cartCount} onPlusClick={() => setShowQuickActions(true)} isPlusActive={showQuickActions} theme={theme} />
      </div>

      {/* Quick Actions Popup */}
      <QuickActionsPopup isOpen={showQuickActions} onClose={() => setShowQuickActions(false)} onAction={handleMenuAction} t={t} />

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && <CartModal isOpen={showCart} onClose={() => setShowCart(false)} currency={currency} t={t} />}
      </AnimatePresence>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showSeatSetup && (
          <WelcomeModal
            isOpen={showSeatSetup}
            onClose={() => setShowSeatSetup(false)}
            tableNumber={tableContext.table_number || '12'}
            language={language}
            onSave={(name) => {
              // Auto-assign seat in background
              const nextSeat = tableContextStore.getNextSeat();
              tableContextStore.setSeat(nextSeat);
              // Save name if provided
              if (name) {
                tableContextStore.setName(name);
              }
              setTableContextState(tableContextStore.get());
              setShowSeatSetup(false);
            }}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

export default ModernChatMenuV6;
