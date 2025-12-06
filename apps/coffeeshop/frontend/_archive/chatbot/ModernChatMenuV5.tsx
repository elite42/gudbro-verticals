'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DishItem, Extra } from '@/types/dish';
import { selectionsStore } from '@/lib/selections-store';
import { languagePreferencesStore, AVAILABLE_LANGUAGES } from '@/lib/language-preferences';
import { currencyPreferencesStore, AVAILABLE_CURRENCIES } from '@/lib/currency-preferences';
import { preferencesStore } from '@/lib/user-preferences';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
  items?: DishItem[];
  timestamp: Date;
  category?: string;
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

type Language = 'en' | 'it' | 'vi';

// ============================================================================
// TRANSLATIONS FOR CHATBOT
// ============================================================================

const chatTranslations: Record<Language, {
  welcome: Record<string, string>;
  quickStart: string[];
  categories: Record<string, string>;
  responses: Record<string, string>;
  input: Record<string, string>;
  cart: Record<string, string>;
  time: Record<string, string>;
}> = {
  en: {
    welcome: {
      morning: "Good morning! Ready for a fresh start?",
      afternoon: "Good afternoon! What can I get you today?",
      evening: "Good evening! Looking for something delicious?",
      night: "Late night cravings? We've got you covered!"
    },
    quickStart: ['Show Popular', 'Browse Menu', 'I have allergies', 'Merchandise'],
    categories: {
      food: 'Food',
      drinks: 'Drinks',
      merchandise: 'Shop',
      dessert: 'Desserts',
      all: 'All Items'
    },
    responses: {
      popular: "Here are our most popular items!",
      allergies: "I can help you find safe options. What should I avoid?",
      safeItems: "Here are items without {allergen}:",
      noResults: "Sorry, I couldn't find items matching your criteria.",
      addedToCart: "Added {item} to your order!",
      viewCart: "View order",
      keepBrowsing: "Keep browsing",
      merchandise: "Check out our branded merchandise!",
      merchandiseEmpty: "Merchandise coming soon! Stay tuned.",
      help: "I can help you with:\n\n• Finding popular dishes\n• Browsing by category\n• Allergy filtering\n• Our merchandise shop",
      whatToSee: "What would you like to see?",
      foodSelection: "Here's our food selection:",
      drinksSelection: "Here's our drinks:",
      dessertsSelection: "Here's our desserts:",
      noAllergies: "Great! Here's our full selection:",
      returning: "Welcome back! What can I get you today?"
    },
    input: {
      placeholder: "Ask me anything about our menu...",
      voiceTooltip: "Voice input",
      send: "Send"
    },
    cart: {
      title: "Your Order",
      items: "items",
      total: "Total",
      placeOrder: "Place Order",
      empty: "Your cart is empty"
    },
    time: {
      breakfast: "Perfect time for breakfast!",
      lunch: "Ready for lunch?",
      dinner: "Dinner time! What sounds good?",
      snack: "How about a quick snack?"
    }
  },
  it: {
    welcome: {
      morning: "Buongiorno! Pronto per iniziare la giornata?",
      afternoon: "Buon pomeriggio! Cosa posso offrirti oggi?",
      evening: "Buonasera! Cerchi qualcosa di delizioso?",
      night: "Fame notturna? Ci pensiamo noi!"
    },
    quickStart: ['Popolari', 'Menu', 'Ho allergie', 'Merchandise'],
    categories: {
      food: 'Cibo',
      drinks: 'Bevande',
      merchandise: 'Shop',
      dessert: 'Dolci',
      all: 'Tutti'
    },
    responses: {
      popular: "Ecco i nostri piatti più popolari!",
      allergies: "Posso aiutarti a trovare opzioni sicure. Cosa devo evitare?",
      safeItems: "Ecco i piatti senza {allergen}:",
      noResults: "Mi dispiace, non ho trovato piatti con questi criteri.",
      addedToCart: "{item} aggiunto al tuo ordine!",
      viewCart: "Vedi ordine",
      keepBrowsing: "Continua",
      merchandise: "Scopri il nostro merchandise!",
      merchandiseEmpty: "Merchandise in arrivo! Resta sintonizzato.",
      help: "Posso aiutarti con:\n\n• Piatti popolari\n• Navigare per categoria\n• Filtrare per allergie\n• Il nostro shop",
      whatToSee: "Cosa vorresti vedere?",
      foodSelection: "Ecco la nostra selezione di cibo:",
      drinksSelection: "Ecco le nostre bevande:",
      dessertsSelection: "Ecco i nostri dolci:",
      noAllergies: "Perfetto! Ecco la nostra selezione:",
      returning: "Bentornato! Cosa posso offrirti oggi?"
    },
    input: {
      placeholder: "Chiedimi qualcosa sul menu...",
      voiceTooltip: "Input vocale",
      send: "Invia"
    },
    cart: {
      title: "Il Tuo Ordine",
      items: "articoli",
      total: "Totale",
      placeOrder: "Ordina",
      empty: "Il carrello è vuoto"
    },
    time: {
      breakfast: "Perfetto per una colazione!",
      lunch: "Pronto per pranzo?",
      dinner: "Ora di cena! Cosa ti va?",
      snack: "Che ne dici di uno spuntino?"
    }
  },
  vi: {
    welcome: {
      morning: "Chào buổi sáng! Sẵn sàng cho một khởi đầu tươi mới?",
      afternoon: "Chào buổi chiều! Hôm nay bạn muốn gì?",
      evening: "Chào buổi tối! Đang tìm gì ngon không?",
      night: "Đói khuya? Chúng tôi sẽ lo!"
    },
    quickStart: ['Phổ biến', 'Thực đơn', 'Tôi bị dị ứng', 'Hàng hóa'],
    categories: {
      food: 'Đồ ăn',
      drinks: 'Đồ uống',
      merchandise: 'Cửa hàng',
      dessert: 'Tráng miệng',
      all: 'Tất cả'
    },
    responses: {
      popular: "Đây là những món phổ biến nhất!",
      allergies: "Tôi có thể giúp bạn tìm lựa chọn an toàn. Tôi nên tránh gì?",
      safeItems: "Đây là các món không có {allergen}:",
      noResults: "Xin lỗi, không tìm thấy món phù hợp.",
      addedToCart: "Đã thêm {item} vào đơn hàng!",
      viewCart: "Xem đơn hàng",
      keepBrowsing: "Tiếp tục",
      merchandise: "Khám phá hàng hóa của chúng tôi!",
      merchandiseEmpty: "Hàng hóa sắp có! Hãy chờ đón.",
      help: "Tôi có thể giúp bạn:\n\n• Tìm món phổ biến\n• Duyệt theo danh mục\n• Lọc dị ứng\n• Cửa hàng",
      whatToSee: "Bạn muốn xem gì?",
      foodSelection: "Đây là đồ ăn của chúng tôi:",
      drinksSelection: "Đây là đồ uống của chúng tôi:",
      dessertsSelection: "Đây là tráng miệng:",
      noAllergies: "Tuyệt! Đây là menu của chúng tôi:",
      returning: "Chào mừng trở lại! Hôm nay bạn muốn gì?"
    },
    input: {
      placeholder: "Hỏi tôi bất cứ điều gì về menu...",
      voiceTooltip: "Nhập giọng nói",
      send: "Gửi"
    },
    cart: {
      title: "Đơn Hàng Của Bạn",
      items: "món",
      total: "Tổng",
      placeOrder: "Đặt Hàng",
      empty: "Giỏ hàng trống"
    },
    time: {
      breakfast: "Thời điểm hoàn hảo cho bữa sáng!",
      lunch: "Sẵn sàng ăn trưa?",
      dinner: "Giờ ăn tối! Bạn thích gì?",
      snack: "Ăn nhẹ chút nhé?"
    }
  }
};

// Allergen translations
const allergenTranslations: Record<Language, Record<string, string>> = {
  en: {
    gluten: 'Gluten', dairy: 'Dairy', milk: 'Milk', nuts: 'Nuts',
    eggs: 'Eggs', soy: 'Soy', fish: 'Fish', shellfish: 'Shellfish', none: 'No allergies'
  },
  it: {
    gluten: 'Glutine', dairy: 'Latticini', milk: 'Latte', nuts: 'Frutta secca',
    eggs: 'Uova', soy: 'Soia', fish: 'Pesce', shellfish: 'Crostacei', none: 'Nessuna allergia'
  },
  vi: {
    gluten: 'Gluten', dairy: 'Sữa', milk: 'Sữa', nuts: 'Hạt',
    eggs: 'Trứng', soy: 'Đậu nành', fish: 'Cá', shellfish: 'Hải sản có vỏ', none: 'Không dị ứng'
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const CONVERSATION_STORAGE_KEY = 'gudbro-chat-conversation-v5';
const CONVERSATION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function formatPrice(price: number, currency: string = 'EUR'): string {
  const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === currency);
  // Coffee House uses EUR prices - no conversion needed for EUR
  if (currency === 'EUR') {
    return `€${price.toFixed(2)}`;
  }
  // Convert from EUR to other currencies
  const rates: Record<string, number> = { USD: 1.08, GBP: 0.86, VND: 26500 };
  const converted = price * (rates[currency] || 1);
  if (currency === 'VND') {
    return `${(converted / 1000).toFixed(0)}k ${currencyInfo?.symbol || '₫'}`;
  }
  return `${currencyInfo?.symbol || ''}${converted.toFixed(2)}`;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function saveConversation(messages: Message[]): void {
  if (typeof window === 'undefined') return;
  const state: ConversationState = {
    messages: messages.slice(-20),
    lastInteraction: Date.now()
  };
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

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex justify-start mb-4"
  >
    <div className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-amber-100">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Product Card
interface ProductCardProps {
  item: DishItem;
  onAdd: (item: DishItem) => void;
  currency: string;
  index: number;
}

const ProductCard = ({ item, onAdd, currency, index }: ProductCardProps) => {
  const imageUrl = item.image || (item as any).imageUrl;
  const categoryType = getCategoryType(item.category);
  const emoji = categoryType === 'drinks' ? '☕' :
                categoryType === 'dessert' ? '🍰' :
                categoryType === 'merchandise' ? '🎁' : '🍽️';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="min-w-[170px] max-w-[170px] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
    >
      {/* Image */}
      {imageUrl ? (
        <div className="relative h-24 bg-gradient-to-br from-amber-50 to-orange-50">
          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
          {item.dietary?.includes('vegan') && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
              Vegan
            </span>
          )}
        </div>
      ) : (
        <div className="h-20 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
          <span className="text-4xl">{emoji}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{item.name}</h4>
        <p className="text-[11px] text-gray-500 line-clamp-2 flex-1">{item.description}</p>

        {/* Allergens */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.allergens.slice(0, 2).map(allergen => (
              <span key={allergen} className="text-[8px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded-full">
                {allergen}
              </span>
            ))}
          </div>
        )}

        {/* Price & Add */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <span className="text-sm font-bold text-amber-600">{formatPrice(item.price, currency)}</span>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAdd(item)}
            className="w-7 h-7 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>
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
}

const MessageBubble = ({ message, onQuickReply, onAddToCart, currency }: MessageBubbleProps) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[90%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-2`}>
        {/* Bot Avatar */}
        {isBot && (
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">GUDBRO</span>
          </div>
        )}

        {/* Bubble */}
        <motion.div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-white text-gray-800 shadow-md border border-gray-100 rounded-tl-sm'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg rounded-tr-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </motion.div>

        {/* Quick Replies */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1.5">
            {message.quickReplies.map((reply, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onQuickReply(reply.value, reply.label)}
                className="px-3 py-2 rounded-full bg-white border-2 border-amber-200 text-amber-700 font-medium text-sm shadow-sm hover:shadow-md hover:border-amber-400 hover:bg-amber-50 transition-all flex items-center gap-1.5"
              >
                {reply.icon && <span className="text-base">{reply.icon}</span>}
                <span>{reply.label}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Product Cards */}
        {message.items && message.items.length > 0 && (
          <div className="w-full overflow-x-auto scrollbar-hide mt-2 -mx-2 px-2">
            <div className="flex gap-3 pb-2">
              {message.items.map((item, index) => (
                <ProductCard key={item.id} item={item} onAdd={onAddToCart} currency={currency} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Cart Sidebar
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  t: typeof chatTranslations['en'];
}

const CartSidebar = ({ isOpen, onClose, currency, t }: CartSidebarProps) => {
  const [items, setItems] = useState(selectionsStore.getItems());

  useEffect(() => {
    const handleUpdate = () => setItems(selectionsStore.getItems());
    window.addEventListener('selections-updated', handleUpdate);
    return () => window.removeEventListener('selections-updated', handleUpdate);
  }, []);

  const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{t.cart.title}</h2>
                <p className="text-sm text-gray-500">{items.length} {t.cart.items}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-gray-500">{t.cart.empty}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{item.dish.name}</h4>
                        <p className="text-sm text-amber-600 font-semibold">
                          {formatPrice(item.dish.price, currency)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => selectionsStore.decrement(item.id)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 text-sm"
                        >
                          -
                        </button>
                        <span className="font-bold w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => selectionsStore.increment(item.dish, item.extras)}
                          className="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-700">{t.cart.total}</span>
                  <span className="text-2xl font-bold text-amber-600">{formatPrice(total, currency)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg"
                >
                  {t.cart.placeOrder}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
      </svg>
    </motion.button>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface ModernChatMenuV5Props {
  menuItems: DishItem[];
}

export function ModernChatMenuV5({ menuItems }: ModernChatMenuV5Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState('EUR');
  const [isClient, setIsClient] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = chatTranslations[language];
  const allergenT = allergenTranslations[language];

  // Initialize
  useEffect(() => {
    setIsClient(true);
    const langPrefs = languagePreferencesStore.get();
    const currPrefs = currencyPreferencesStore.get();
    const validLang = (['en', 'it', 'vi'] as Language[]).includes(langPrefs.selectedLanguage as Language)
      ? (langPrefs.selectedLanguage as Language)
      : 'en';
    setLanguage(validLang);
    setCurrency(currPrefs.selectedCurrency || 'VND');

    const savedMessages = loadConversation();
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Small delay to ensure language is set
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
        ? (prefs.selectedLanguage as Language)
        : 'en';
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
    const currentT = chatTranslations[lang];
    const isReturning = typeof window !== 'undefined' && localStorage.getItem('gudbro_visitor') === 'true';

    if (isReturning) {
      addBotMessage(
        currentT.responses.returning,
        currentT.quickStart.map((label, i) => ({
          label,
          value: ['popular', 'menu', 'allergies', 'merchandise'][i],
          icon: ['🌟', '📖', '⚠️', '🛍️'][i]
        }))
      );
    } else {
      if (typeof window !== 'undefined') localStorage.setItem('gudbro_visitor', 'true');
      addBotMessage(
        currentT.welcome[timeOfDay],
        currentT.quickStart.map((label, i) => ({
          label,
          value: ['popular', 'menu', 'allergies', 'merchandise'][i],
          icon: ['🌟', '📖', '⚠️', '🛍️'][i]
        }))
      );
    }
  };

  const addBotMessage = (text: string, quickReplies?: QuickReply[], items?: DishItem[]) => {
    setIsTyping(true);
    const delay = Math.min(400 + text.length * 8, 1200);

    setTimeout(() => {
      const newMessage: Message = {
        id: generateId(),
        type: 'bot',
        text,
        quickReplies,
        items,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: generateId(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Intent handling
  const handleIntent = (input: string) => {
    const lower = input.toLowerCase();
    const currentT = chatTranslations[language];

    // Popular
    if (lower.includes('popular') || lower.includes('popolari') || lower.includes('phổ biến') || lower.includes('best') || lower.includes('🌟')) {
      const popular = menuItems
        .filter(item => getCategoryType(item.category) !== 'merchandise')
        .slice(0, 8);
      addBotMessage(
        currentT.responses.popular,
        [
          { label: currentT.categories.food, value: 'food', icon: '🍽️' },
          { label: currentT.categories.drinks, value: 'drinks', icon: '🥤' },
          { label: currentT.categories.merchandise, value: 'merchandise', icon: '🛍️' }
        ],
        popular
      );
    }
    // Menu
    else if (lower.includes('menu') || lower.includes('browse') || lower.includes('sfoglia') || lower.includes('thực đơn') || lower.includes('📖')) {
      addBotMessage(
        currentT.responses.whatToSee,
        [
          { label: currentT.categories.food, value: 'food', icon: '🍽️' },
          { label: currentT.categories.drinks, value: 'drinks', icon: '🥤' },
          { label: currentT.categories.dessert, value: 'dessert', icon: '🍰' },
          { label: currentT.categories.merchandise, value: 'merchandise', icon: '🛍️' }
        ]
      );
    }
    // Food
    else if (lower === 'food' || lower.includes('cibo') || lower.includes('đồ ăn') || lower.includes('🍽️')) {
      const foodItems = menuItems.filter(item => getCategoryType(item.category) === 'food').slice(0, 8);
      addBotMessage(
        currentT.responses.foodSelection,
        [
          { label: currentT.categories.drinks, value: 'drinks', icon: '🥤' },
          { label: currentT.responses.viewCart, value: 'cart', icon: '🛒' }
        ],
        foodItems
      );
    }
    // Drinks
    else if (lower === 'drinks' || lower.includes('bevande') || lower.includes('đồ uống') || lower.includes('coffee') || lower.includes('caffè') || lower.includes('🥤')) {
      const drinkItems = menuItems.filter(item => getCategoryType(item.category) === 'drinks').slice(0, 8);
      addBotMessage(
        currentT.responses.drinksSelection,
        [
          { label: currentT.categories.food, value: 'food', icon: '🍽️' },
          { label: currentT.responses.viewCart, value: 'cart', icon: '🛒' }
        ],
        drinkItems
      );
    }
    // Desserts
    else if (lower === 'dessert' || lower.includes('dolci') || lower.includes('tráng miệng') || lower.includes('🍰')) {
      const dessertItems = menuItems.filter(item => getCategoryType(item.category) === 'dessert').slice(0, 8);
      addBotMessage(
        currentT.responses.dessertsSelection,
        [
          { label: currentT.categories.drinks, value: 'drinks', icon: '🥤' },
          { label: currentT.responses.viewCart, value: 'cart', icon: '🛒' }
        ],
        dessertItems
      );
    }
    // Merchandise
    else if (lower.includes('merchandise') || lower.includes('merch') || lower.includes('shop') || lower.includes('hàng hóa') || lower.includes('🛍️')) {
      const merchItems = menuItems.filter(item => getCategoryType(item.category) === 'merchandise');
      if (merchItems.length > 0) {
        addBotMessage(
          currentT.responses.merchandise,
          [{ label: currentT.responses.keepBrowsing, value: 'menu', icon: '📖' }],
          merchItems
        );
      } else {
        addBotMessage(
          currentT.responses.merchandiseEmpty,
          [{ label: currentT.responses.keepBrowsing, value: 'menu', icon: '📖' }]
        );
      }
    }
    // Allergies
    else if (lower.includes('allerg') || lower.includes('dị ứng') || lower.includes('⚠️')) {
      const allergens = ['gluten', 'dairy', 'nuts', 'eggs', 'soy', 'none'];
      addBotMessage(
        currentT.responses.allergies,
        allergens.map((a, i) => ({
          label: allergenT[a] || a,
          value: a,
          icon: i === allergens.length - 1 ? '✅' : '⚠️'
        }))
      );
    }
    // Specific allergens
    else if (['gluten', 'dairy', 'nuts', 'eggs', 'soy', 'milk', 'glutine', 'latticini', 'frutta secca', 'uova', 'soia'].some(a => lower.includes(a))) {
      const allergen = lower.includes('gluten') || lower.includes('glutine') ? 'gluten' :
                       lower.includes('dairy') || lower.includes('milk') || lower.includes('latticini') ? 'milk' :
                       lower.includes('nuts') || lower.includes('frutta secca') ? 'nuts' :
                       lower.includes('eggs') || lower.includes('uova') ? 'eggs' : 'soy';
      const safeItems = menuItems.filter(item =>
        !item.allergens?.some(a => a.toLowerCase().includes(allergen))
      ).slice(0, 8);
      addBotMessage(
        currentT.responses.safeItems.replace('{allergen}', allergenT[allergen] || allergen),
        [
          { label: currentT.responses.keepBrowsing, value: 'menu', icon: '📖' },
          { label: currentT.responses.viewCart, value: 'cart', icon: '🛒' }
        ],
        safeItems
      );
    }
    // No allergies
    else if (lower === 'none' || lower.includes('no allerg') || lower.includes('nessuna') || lower.includes('không dị ứng') || lower.includes('✅')) {
      addBotMessage(
        currentT.responses.noAllergies,
        [
          { label: currentT.categories.food, value: 'food', icon: '🍽️' },
          { label: currentT.categories.drinks, value: 'drinks', icon: '🥤' }
        ],
        menuItems.slice(0, 8)
      );
    }
    // Cart
    else if (lower.includes('cart') || lower.includes('order') || lower.includes('ordine') || lower.includes('đơn hàng') || lower.includes('🛒')) {
      setShowCart(true);
    }
    // Fallback
    else {
      addBotMessage(
        currentT.responses.help,
        currentT.quickStart.map((label, i) => ({
          label,
          value: ['popular', 'menu', 'allergies', 'merchandise'][i],
          icon: ['🌟', '📖', '⚠️', '🛍️'][i]
        }))
      );
    }
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
    const currentT = chatTranslations[language];
    addBotMessage(
      currentT.responses.addedToCart.replace('{item}', item.name),
      [
        { label: currentT.responses.viewCart, value: 'cart', icon: '🛒' },
        { label: currentT.responses.keepBrowsing, value: 'menu', icon: '📖' }
      ]
    );
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

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="animate-pulse text-amber-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-amber-100 shadow-sm"
      >
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                GUDBRO
              </h1>
              <p className="text-[10px] text-gray-500 font-medium">AI Menu Assistant</p>
            </div>
          </div>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(true)}
            className="relative"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-xl mx-auto">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={handleQuickReply}
              onAddToCart={handleAddToCart}
              currency={currency}
            />
          ))}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Bar */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-amber-100 px-4 py-3 shadow-lg"
      >
        <div className="max-w-xl mx-auto flex gap-2 items-center">
          <VoiceInput
            onResult={handleVoiceResult}
            isListening={isListening}
            setIsListening={setIsListening}
            tooltip={t.input.voiceTooltip}
            language={language}
          />

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.input.placeholder}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border-2 border-transparent focus:border-amber-400 focus:bg-white focus:outline-none text-[15px] transition-all"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.input.send}
          </motion.button>
        </div>
      </motion.footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        currency={currency}
        t={t}
      />
    </div>
  );
}

export default ModernChatMenuV5;
