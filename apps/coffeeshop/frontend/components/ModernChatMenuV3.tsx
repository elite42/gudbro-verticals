'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// Venue Configuration
const VENUE_CONFIG = {
  name: 'GUDBRO',
  tableNumber: '12', // This would come from QR scan params
  wifi: {
    ssid: 'GUDBRO_Guest',
    password: 'Welcome2024!',
  },
  location: {
    lat: 10.7769,
    lng: 106.7009,
    address: 'District 1, Ho Chi Minh City',
  },
  menuUrl: 'https://gudbro.app/menu/t12', // Dynamic based on table
};

// Menu Data
const menuData = {
  categories: ['🍜 Phở & Noodles', '🥖 Bánh Mì', '🍚 Rice Dishes', '☕ Drinks', '🍨 Desserts'],
  items: [
    {
      id: 1,
      name: 'Phở Bò',
      price: 65000,
      category: '🍜 Phở & Noodles',
      allergens: ['gluten'],
      popular: true,
      description: 'Traditional beef noodle soup',
      image: '🍜',
    },
    {
      id: 2,
      name: 'Bánh Mì Thịt',
      price: 35000,
      category: '🥖 Bánh Mì',
      allergens: ['gluten'],
      popular: true,
      description: 'Grilled pork sandwich',
      image: '🥖',
    },
    {
      id: 3,
      name: 'Cơm Tấm',
      price: 55000,
      category: '🍚 Rice Dishes',
      allergens: [],
      popular: true,
      description: 'Broken rice with grilled pork',
      image: '🍚',
    },
    {
      id: 4,
      name: 'Cà Phê Sữa Đá',
      price: 25000,
      category: '☕ Drinks',
      allergens: ['dairy'],
      popular: true,
      description: 'Vietnamese iced coffee',
      image: '☕',
    },
    {
      id: 5,
      name: 'Phở Gà',
      price: 60000,
      category: '🍜 Phở & Noodles',
      allergens: ['gluten'],
      description: 'Chicken noodle soup',
      image: '🍜',
    },
    {
      id: 6,
      name: 'Bánh Mì Chay',
      price: 30000,
      category: '🥖 Bánh Mì',
      allergens: ['gluten'],
      vegan: true,
      description: 'Vegetarian sandwich',
      image: '🥖',
    },
    {
      id: 7,
      name: 'Chè Ba Màu',
      price: 30000,
      category: '🍨 Desserts',
      allergens: [],
      description: 'Three color dessert',
      image: '🍨',
    },
  ],
};

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
  items?: typeof menuData.items;
  component?: 'wifi' | 'share' | 'language' | 'currency';
  timestamp: Date;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type BottomTab = 'chat' | 'menu' | 'cart' | 'orders' | 'profile';

// WiFi QR Code Component
const WiFiQRCode = ({ ssid, password }: { ssid: string; password: string }) => {
  const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};;`;
  const [copied, setCopied] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-gray-700/50 bg-gray-800/90 p-4 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl bg-white p-3">
          <QRCodeSVG value={wifiString} size={180} level="H" />
        </div>
        <div className="w-full text-center">
          <p className="mb-1 text-sm text-gray-400">Network</p>
          <p className="font-bold text-white">{ssid}</p>
          <p className="mb-1 mt-2 text-sm text-gray-400">Password</p>
          <div className="flex items-center justify-center gap-2">
            <code className="rounded-lg bg-gray-900/80 px-3 py-1 font-mono text-sm text-purple-300">
              {password}
            </code>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyPassword}
              className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white"
            >
              {copied ? '✓' : '📋'}
            </motion.button>
          </div>
          <p className="mt-2 text-xs text-gray-500">Scan with your camera app</p>
        </div>
      </div>
    </motion.div>
  );
};

// Share Invite Component
const ShareInvite = ({
  venueName,
  tableNumber,
  location,
  menuUrl,
}: {
  venueName: string;
  tableNumber: string;
  location: { lat: number; lng: number; address: string };
  menuUrl: string;
}) => {
  const [copied, setCopied] = useState(false);

  const mapsLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  const shareMessage = `I'm at ${venueName} (Table ${tableNumber})! Join me 🍜\n\n📍 Navigate: ${mapsLink}\n🍽️ Menu: ${menuUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join me at ${venueName}!`,
          text: shareMessage,
        });
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-gray-700/50 bg-gray-800/90 p-4 backdrop-blur-xl"
    >
      <div className="space-y-3">
        <div className="whitespace-pre-line rounded-xl bg-gray-900/80 p-3 font-mono text-sm text-gray-300">
          {shareMessage}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-semibold text-white"
          >
            {'share' in navigator ? '📤 Share' : '📋 Copy'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(mapsLink, '_blank')}
            className="rounded-xl bg-gray-700 px-4 py-3 font-semibold text-white"
          >
            📍
          </motion.button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-green-400"
          >
            ✓ Copied to clipboard!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

// Message Bubble Component
const MessageBubble = ({
  message,
  onQuickReply,
  onAddToCart,
  venueName,
  tableNumber,
  location,
  menuUrl,
  wifi,
}: {
  message: Message;
  onQuickReply: (reply: string) => void;
  onAddToCart: (item: any) => void;
  venueName: string;
  tableNumber: string;
  location: any;
  menuUrl: string;
  wifi: any;
}) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[85%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-2`}>
        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isBot
              ? 'border border-gray-700/50 bg-gray-800/90 text-gray-100 backdrop-blur-lg'
              : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/30'
          }`}
        >
          <p className="whitespace-pre-line text-[15px] leading-relaxed">{message.text}</p>
        </motion.div>

        {/* Special Components */}
        {message.component === 'wifi' && <WiFiQRCode ssid={wifi.ssid} password={wifi.password} />}

        {message.component === 'share' && (
          <ShareInvite
            venueName={venueName}
            tableNumber={tableNumber}
            location={location}
            menuUrl={menuUrl}
          />
        )}

        {/* Quick Reply Buttons */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {message.quickReplies.map((reply, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onQuickReply(reply)}
                className="rounded-full border border-purple-500/50 bg-gray-800/80 px-4 py-2 text-sm font-semibold text-purple-300 shadow-lg backdrop-blur-sm transition-all hover:border-purple-400 hover:bg-gray-800"
              >
                {reply}
              </motion.button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        {message.items && message.items.length > 0 && (
          <div className="scrollbar-hide mt-2 flex max-w-full gap-3 overflow-x-auto pb-2">
            {message.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex min-w-[190px] flex-col rounded-2xl border border-gray-700/50 bg-gray-800/90 p-4 shadow-xl backdrop-blur-xl transition-all hover:border-purple-500/50"
              >
                <div className="mb-3 text-center text-5xl drop-shadow-lg">{item.image}</div>
                <h4 className="mb-1 text-base font-bold text-gray-100">{item.name}</h4>
                <p className="mb-2 flex-1 text-xs text-gray-400">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-bold text-transparent">
                    {(item.price / 1000).toFixed(0)}k đ
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onAddToCart(item)}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:shadow-purple-500/50"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Typing Indicator
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="mb-4 flex justify-start"
  >
    <div className="rounded-2xl border border-gray-700/50 bg-gray-800/90 px-5 py-3 shadow-lg backdrop-blur-xl">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Cart Modal (simplified version)
const CartModal = ({
  cart,
  onClose,
  onUpdateQuantity,
}: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, change: number) => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full overflow-hidden rounded-t-3xl border-t-2 border-purple-500/30 bg-gradient-to-b from-gray-900 to-black shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-700 bg-gray-900/95 px-6 py-5 backdrop-blur-xl">
          <div>
            <h3 className="text-2xl font-bold text-white">Your Cart</h3>
            <p className="mt-0.5 text-sm text-gray-400">{cart.length} items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800"
          >
            <svg
              className="h-6 w-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>
        <div className="max-h-[calc(85vh-200px)] overflow-y-auto px-6 py-4">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="mb-3 flex items-center gap-4 rounded-2xl border border-gray-700/50 bg-gray-800/80 p-4 shadow-md"
              >
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-semibold text-transparent">
                    {(item.price / 1000).toFixed(0)}k đ
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 font-bold text-white hover:bg-gray-600"
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center text-lg font-bold text-white">
                    {item.quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-white"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="sticky bottom-0 border-t border-gray-700 bg-gray-900/95 px-6 py-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-300">Total</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
              {(total / 1000).toFixed(0)}k đ
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-lg font-bold text-white shadow-lg hover:shadow-purple-500/50"
          >
            Place Order
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Bottom Navigation
const BottomNavigation = ({
  activeTab,
  onTabChange,
  cartCount,
}: {
  activeTab: BottomTab;
  onTabChange: (tab: BottomTab) => void;
  cartCount: number;
}) => {
  const tabs: { id: BottomTab; icon: string; label: string }[] = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'menu', icon: '📋', label: 'Menu' },
    { id: 'cart', icon: '🛒', label: 'Cart' },
    { id: 'orders', icon: '📦', label: 'Orders' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="border-t border-gray-700 bg-gray-900/95 px-4 py-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab.id ? 'border border-purple-500/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span
              className={`text-[10px] font-semibold ${activeTab === tab.id ? 'text-purple-300' : 'text-gray-500'}`}
            >
              {tab.label}
            </span>
            {tab.id === 'cart' && cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-[10px] font-bold text-white shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Main Component
export function ModernChatMenuV3() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeTab, setActiveTab] = useState<BottomTab>('chat');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Check if returning user
    const isReturning = localStorage.getItem('gudbro_onboarding_completed') === 'true';

    if (isReturning) {
      addBotMessage(`Welcome back! 👋\n\nYou're at Table ${VENUE_CONFIG.tableNumber}`, [
        '🍽️ Browse Menu',
        '📶 WiFi',
        '📍 Invite Friends',
      ]);
    } else {
      // First-time onboarding
      addBotMessage(
        `Hey! Welcome to ${VENUE_CONFIG.name}! 🎉\n\nYou're seated at Table ${VENUE_CONFIG.tableNumber}`,
        ['📶 Get WiFi', '📍 Invite Friends', '🍽️ Skip to Menu']
      );
    }
  }, []);

  const addBotMessage = (
    text: string,
    quickReplies?: string[],
    items?: typeof menuData.items,
    component?: Message['component']
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'bot',
          text,
          quickReplies,
          items,
          component,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        text,
        timestamp: new Date(),
      },
    ]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    handleIntent(reply);
  };

  const handleIntent = (input: string) => {
    const lower = input.toLowerCase();

    // WiFi Flow
    if (lower.includes('wifi') || lower.includes('📶')) {
      addBotMessage(
        "Here's the WiFi! 📶\n\nScan the QR code with your camera app to connect instantly:",
        ['📤 Share WiFi', '📍 Invite Friends', '🍽️ Browse Menu'],
        undefined,
        'wifi'
      );
    }
    // Share/Invite Flow
    else if (lower.includes('invite') || lower.includes('share') || lower.includes('📍')) {
      addBotMessage(
        'Send this to your friends! 📍',
        ['📶 WiFi', '🍽️ Browse Menu'],
        undefined,
        'share'
      );
    }
    // Menu browsing
    else if (
      lower.includes('menu') ||
      lower.includes('browse') ||
      lower.includes('🍽️') ||
      lower.includes('skip')
    ) {
      if (!onboardingComplete) {
        setOnboardingComplete(true);
        localStorage.setItem('gudbro_onboarding_completed', 'true');
      }
      const popular = menuData.items.filter((item) => item.popular);
      addBotMessage(
        'Here are our star dishes! ⭐',
        ['📂 All Categories', '⚠️ Allergies', '🛒 Cart'],
        popular
      );
    }
    // Categories
    else if (lower.includes('categories') || lower.includes('📂')) {
      addBotMessage('Choose a category:', menuData.categories);
    }
    // Category selection
    else if (
      menuData.categories.some((cat) => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')))
    ) {
      const category = menuData.categories.find((cat) =>
        lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, ''))
      );
      const items = menuData.items.filter((item) => item.category === category);
      addBotMessage(`${category} selection:`, ['⬅️ Back', '🌟 Popular', '🛒 Cart'], items);
    }
    // Allergies
    else if (lower.includes('allerg') || lower.includes('⚠️')) {
      addBotMessage('Select what to avoid:', [
        '🌾 Gluten',
        '🥛 Dairy',
        '🐟 Fish',
        '🌰 Soy',
        '✅ None',
      ]);
    } else if (
      lower.includes('gluten') ||
      lower.includes('dairy') ||
      lower.includes('fish') ||
      lower.includes('soy')
    ) {
      const allergen = lower.includes('gluten')
        ? 'gluten'
        : lower.includes('dairy')
          ? 'dairy'
          : lower.includes('fish')
            ? 'fish'
            : 'soy';
      const safe = menuData.items.filter((item) => !item.allergens?.includes(allergen));
      addBotMessage(`Dishes without ${allergen}:`, ['🔄 Other Filters', '📂 Categories'], safe);
    } else {
      addBotMessage('I can help you with:\n\n📶 WiFi access\n📍 Invite friends\n🍽️ Browse menu', [
        '📶 WiFi',
        '📍 Invite',
        '🍽️ Menu',
      ]);
    }
  };

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image },
      ];
    });
    addBotMessage(`Added ${item.name}! 🎉`, ['🛒 View Cart', '➡️ Continue']);
  };

  const handleUpdateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    addUserMessage(userInput);
    handleIntent(userInput);
    setUserInput('');
  };

  const handleTabChange = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'cart') setShowCart(true);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-gray-700/50 bg-gray-900/90 shadow-lg backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-2xl">
              🍜
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{VENUE_CONFIG.name}</h1>
              <p className="text-[10px] text-purple-400">Table {VENUE_CONFIG.tableNumber}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
          >
            <span className="text-2xl">👤</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
        }}
      >
        <div className="mx-auto max-w-2xl">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={handleQuickReply}
              onAddToCart={handleAddToCart}
              venueName={VENUE_CONFIG.name}
              tableNumber={VENUE_CONFIG.tableNumber}
              location={VENUE_CONFIG.location}
              menuUrl={VENUE_CONFIG.menuUrl}
              wifi={VENUE_CONFIG.wifi}
            />
          ))}
          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="border-t border-gray-700/50 bg-gray-900/95 px-4 py-3 shadow-lg backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-xl"
          >
            ☰
          </motion.button>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/80 px-4 py-3 text-[15px] text-white placeholder-gray-500 transition-all focus:border-purple-500 focus:bg-gray-800 focus:outline-none"
              inputMode="text"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-white shadow-lg disabled:opacity-50"
          >
            ➤
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <CartModal
            cart={cart}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
