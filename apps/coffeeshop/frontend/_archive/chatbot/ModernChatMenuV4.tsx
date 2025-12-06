'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// Venue Configuration
const VENUE_CONFIG = {
  name: 'GUDBRO',
  tableNumber: '12',
  wifi: { ssid: 'GUDBRO_Guest', password: 'Welcome2024!' },
  location: { lat: 10.7769, lng: 106.7009, address: 'District 1, Ho Chi Minh City' },
  menuUrl: 'https://gudbro.app/menu/t12',
};

// Menu Data
const menuData = {
  categories: ['🍜 Phở & Noodles', '🥖 Bánh Mì', '🍚 Rice Dishes', '☕ Drinks', '🍨 Desserts'],
  items: [
    { id: 1, name: 'Phở Bò', price: 65000, category: '🍜 Phở & Noodles', allergens: ['gluten'], popular: true, description: 'Traditional beef noodle soup', image: '🍜' },
    { id: 2, name: 'Bánh Mì Thịt', price: 35000, category: '🥖 Bánh Mì', allergens: ['gluten'], popular: true, description: 'Grilled pork sandwich', image: '🥖' },
    { id: 3, name: 'Cơm Tấm', price: 55000, category: '🍚 Rice Dishes', allergens: [], popular: true, description: 'Broken rice with grilled pork', image: '🍚' },
    { id: 4, name: 'Cà Phê Sữa Đá', price: 25000, category: '☕ Drinks', allergens: ['dairy'], popular: true, description: 'Vietnamese iced coffee', image: '☕' },
    { id: 5, name: 'Phở Gà', price: 60000, category: '🍜 Phở & Noodles', allergens: ['gluten'], description: 'Chicken noodle soup', image: '🍜' },
    { id: 6, name: 'Bánh Mì Chay', price: 30000, category: '🥖 Bánh Mì', allergens: ['gluten'], vegan: true, description: 'Vegetarian sandwich', image: '🥖' },
    { id: 7, name: 'Chè Ba Màu', price: 30000, category: '🍨 Desserts', allergens: [], description: 'Three color dessert', image: '🍨' },
  ]
};

// Merchandise Data
const merchandiseData = [
  { id: 101, name: 'GUDBRO T-Shirt', price: 250000, description: 'Premium cotton tee with logo', image: '👕', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 102, name: 'Coffee Mug', price: 120000, description: 'Ceramic mug - 350ml', image: '☕', bestseller: true },
  { id: 103, name: 'Baseball Cap', price: 180000, description: 'Embroidered logo cap', image: '🧢' },
  { id: 104, name: 'Tote Bag', price: 150000, description: 'Eco-friendly canvas bag', image: '👜', bestseller: true },
  { id: 105, name: 'Hoodie', price: 450000, description: 'Cozy fleece hoodie', image: '🧥', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 106, name: 'Sticker Pack', price: 50000, description: '10 vinyl stickers', image: '🎨' },
];

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

type BottomTab = 'chat' | 'menu' | 'shop' | 'cart' | 'account';

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
          <p className="text-gray-500 text-xs mt-2">Scan with your camera app</p>
        </div>
      </div>
    </motion.div>
  );
};

// Share Invite Component
const ShareInvite = ({ venueName, tableNumber, location, menuUrl }: {
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
        {copied && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm text-center">✓ Copied to clipboard!</motion.p>}
      </div>
    </motion.div>
  );
};

// Hamburger Menu Sidebar
const HamburgerMenu = ({ isOpen, onClose, onMenuAction }: {
  isOpen: boolean;
  onClose: () => void;
  onMenuAction: (action: string) => void;
}) => {
  const menuItems = [
    { id: 'wifi', icon: '📶', label: 'Get WiFi', color: 'from-blue-600 to-cyan-600' },
    { id: 'invite', icon: '📍', label: 'Invite Friends', color: 'from-green-600 to-emerald-600' },
    { id: 'call-waiter', icon: '📞', label: 'Call Waiter', color: 'from-orange-600 to-red-600' },
    { id: 'orders', icon: '📦', label: 'My Orders', color: 'from-purple-600 to-pink-600' },
    { id: 'popular', icon: '🌟', label: 'Popular Dishes', color: 'from-yellow-600 to-orange-600' },
    { id: 'allergies', icon: '⚠️', label: 'Allergies', color: 'from-red-600 to-pink-600' },
    { id: 'language', icon: '🌐', label: 'Language', color: 'from-indigo-600 to-purple-600' },
    { id: 'currency', icon: '💱', label: 'Currency', color: 'from-teal-600 to-cyan-600' },
    { id: 'settings', icon: '⚙️', label: 'Settings', color: 'from-gray-600 to-slate-600' },
  ];

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 z-[160] w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <p className="text-sm text-gray-400">Quick actions</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onMenuAction(item.id);
                onClose();
              }}
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

// Message Bubble (same as V3)
const MessageBubble = ({ message, onQuickReply, onAddToCart, venueName, tableNumber, location, menuUrl, wifi }: {
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
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[85%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-2`}>
        <motion.div whileHover={{ scale: 1.01 }} className={`px-4 py-3 rounded-2xl shadow-md ${isBot ? 'bg-gray-800/90 backdrop-blur-lg text-gray-100 border border-gray-700/50' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/30'}`}>
          <p className="text-[15px] leading-relaxed whitespace-pre-line">{message.text}</p>
        </motion.div>

        {message.component === 'wifi' && <WiFiQRCode ssid={wifi.ssid} password={wifi.password} />}
        {message.component === 'share' && <ShareInvite venueName={venueName} tableNumber={tableNumber} location={location} menuUrl={menuUrl} />}

        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.quickReplies.map((reply, index) => (
              <motion.button key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08, duration: 0.25 }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => onQuickReply(reply)} className="px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-purple-500/50 text-purple-300 font-semibold text-sm shadow-lg hover:border-purple-400 hover:bg-gray-800 transition-all">
                {reply}
              </motion.button>
            ))}
          </div>
        )}

        {message.items && message.items.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 mt-2 scrollbar-hide max-w-full">
            {message.items.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08, duration: 0.3 }} whileHover={{ y: -6, scale: 1.03 }} className="min-w-[190px] bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 flex flex-col hover:border-purple-500/50 transition-all">
                <div className="text-5xl mb-3 text-center drop-shadow-lg">{item.image}</div>
                <h4 className="font-bold text-gray-100 text-base mb-1">{item.name}</h4>
                <p className="text-xs text-gray-400 mb-2 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{(item.price / 1000).toFixed(0)}k đ</span>
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => onAddToCart(item)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-purple-500/50">+</motion.button>
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
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start mb-4">
    <div className="bg-gray-800/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-gray-700/50">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        ))}
      </div>
    </div>
  </motion.div>
);

// Cart Modal
const CartModal = ({ cart, onClose, onUpdateQuantity }: { cart: CartItem[]; onClose: () => void; onUpdateQuantity: (id: number, change: number) => void }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="w-full bg-gradient-to-b from-gray-900 to-black rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden border-t-2 border-purple-500/30">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 px-6 py-5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Your Cart</h3>
            <p className="text-sm text-gray-400 mt-0.5">{cart.length} items</p>
          </div>
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </motion.button>
        </div>
        <div className="overflow-y-auto max-h-[calc(85vh-200px)] px-6 py-4">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.05 }} className="bg-gray-800/80 rounded-2xl p-4 mb-3 shadow-md border border-gray-700/50 flex items-center gap-4">
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">{(item.price / 1000).toFixed(0)}k đ</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-bold text-white">-</motion.button>
                  <span className="font-bold text-lg w-8 text-center text-white">{item.quantity}</span>
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">+</motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-300">Total</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{(total / 1000).toFixed(0)}k đ</span>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/50">Place Order</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Bottom Navigation - 5 tabs with Shop
const BottomNavigation = ({ activeTab, onTabChange, cartCount }: { activeTab: BottomTab; onTabChange: (tab: BottomTab) => void; cartCount: number }) => {
  const tabs: { id: BottomTab; icon: string; label: string }[] = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'menu', icon: '🍽️', label: 'Menu' },
    { id: 'shop', icon: '🛍️', label: 'Shop' },
    { id: 'cart', icon: '🛒', label: 'Cart' },
    { id: 'account', icon: '👤', label: 'Account' },
  ];

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-4 py-2">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {tabs.map((tab) => (
          <motion.button key={tab.id} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative ${activeTab === tab.id ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50' : 'text-gray-400 hover:text-gray-200'}`}>
            <span className="text-2xl">{tab.icon}</span>
            <span className={`text-[10px] font-semibold ${activeTab === tab.id ? 'text-purple-300' : 'text-gray-500'}`}>{tab.label}</span>
            {tab.id === 'cart' && cartCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">{cartCount}</motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Main Component
export function ModernChatMenuV4() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeTab, setActiveTab] = useState<BottomTab>('chat');
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
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
    const isReturning = localStorage.getItem('gudbro_onboarding_completed') === 'true';
    if (isReturning) {
      addBotMessage(`Welcome back! 👋\n\nYou're at Table ${VENUE_CONFIG.tableNumber}`, ['🍽️ Browse Menu', '📶 WiFi', '📍 Invite Friends']);
    } else {
      addBotMessage(`Hey! Welcome to ${VENUE_CONFIG.name}! 🎉\n\nYou're seated at Table ${VENUE_CONFIG.tableNumber}`, ['📶 Get WiFi', '📍 Invite Friends', '🍽️ Skip to Menu']);
    }
  }, []);

  const addBotMessage = (text: string, quickReplies?: string[], items?: typeof menuData.items, component?: Message['component']) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, quickReplies, items, component, timestamp: new Date() }]);
      setIsTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text, timestamp: new Date() }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    handleIntent(reply);
  };

  const handleIntent = (input: string) => {
    const lower = input.toLowerCase();

    if (lower.includes('wifi') || lower.includes('📶')) {
      addBotMessage("Here's the WiFi! 📶\n\nScan the QR code with your camera app to connect instantly:", ['📤 Share WiFi', '📍 Invite Friends', '🍽️ Browse Menu'], undefined, 'wifi');
    } else if (lower.includes('invite') || lower.includes('share') || lower.includes('📍')) {
      addBotMessage("Send this to your friends! 📍", ['📶 WiFi', '🍽️ Browse Menu'], undefined, 'share');
    } else if (lower.includes('call') || lower.includes('waiter') || lower.includes('📞')) {
      addBotMessage("Calling waiter to Table " + VENUE_CONFIG.tableNumber + "! 📞\n\nSomeone will be with you shortly.", ['🍽️ Browse Menu', '📶 WiFi']);
    } else if (lower.includes('menu') || lower.includes('browse') || lower.includes('🍽️') || lower.includes('skip')) {
      if (!onboardingComplete) {
        setOnboardingComplete(true);
        localStorage.setItem('gudbro_onboarding_completed', 'true');
      }
      const popular = menuData.items.filter(item => item.popular);
      addBotMessage("Here are our star dishes! ⭐", ['📂 All Categories', '⚠️ Allergies', '🛒 Cart'], popular);
    } else if (lower.includes('categories') || lower.includes('📂')) {
      addBotMessage("Choose a category:", menuData.categories);
    } else if (menuData.categories.some(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')))) {
      const category = menuData.categories.find(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')));
      const items = menuData.items.filter(item => item.category === category);
      addBotMessage(`${category} selection:`, ['⬅️ Back', '🌟 Popular', '🛒 Cart'], items);
    } else if (lower.includes('allerg') || lower.includes('⚠️')) {
      addBotMessage("Select what to avoid:", ['🌾 Gluten', '🥛 Dairy', '🐟 Fish', '🌰 Soy', '✅ None']);
    } else if (lower.includes('gluten') || lower.includes('dairy') || lower.includes('fish') || lower.includes('soy')) {
      const allergen = lower.includes('gluten') ? 'gluten' : lower.includes('dairy') ? 'dairy' : lower.includes('fish') ? 'fish' : 'soy';
      const safe = menuData.items.filter(item => !item.allergens?.includes(allergen));
      addBotMessage(`Dishes without ${allergen}:`, ['🔄 Other Filters', '📂 Categories'], safe);
    } else if (lower.includes('popular') || lower.includes('🌟')) {
      const popular = menuData.items.filter(item => item.popular);
      addBotMessage("Our most popular dishes! 🌟", ['📂 Categories', '🛒 Cart'], popular);
    } else {
      addBotMessage("I can help you with:\n\n📶 WiFi access\n📍 Invite friends\n🍽️ Browse menu", ['📶 WiFi', '📍 Invite', '🍽️ Menu']);
    }
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'wifi':
        handleIntent('wifi');
        break;
      case 'invite':
        handleIntent('invite');
        break;
      case 'call-waiter':
        handleIntent('call waiter');
        break;
      case 'orders':
        addBotMessage("Your recent orders:\n\n(Coming soon)", ['🍽️ Browse Menu']);
        break;
      case 'popular':
        handleIntent('popular');
        break;
      case 'allergies':
        handleIntent('allergies');
        break;
      case 'language':
        addBotMessage("Language settings:\n\n(Coming soon)", ['🍽️ Browse Menu']);
        break;
      case 'currency':
        addBotMessage("Currency settings:\n\n(Coming soon)", ['🍽️ Browse Menu']);
        break;
      case 'settings':
        addBotMessage("Settings:\n\n(Coming soon)", ['🍽️ Browse Menu']);
        break;
    }
  };

  const handleAddToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
    addBotMessage(`Added ${item.name}! 🎉`, ['🛒 View Cart', '➡️ Continue']);
  };

  const handleUpdateQuantity = (id: number, change: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item).filter(item => item.quantity > 0));
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header - NO profile icon */}
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-2xl border-b border-gray-700/50 shadow-lg">
        <div className="px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">🍜</div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{VENUE_CONFIG.name}</h1>
            <p className="text-[10px] text-purple-400">Table {VENUE_CONFIG.tableNumber}</p>
          </div>
        </div>
      </motion.div>

      {/* Hamburger Menu Sidebar */}
      <HamburgerMenu isOpen={showHamburgerMenu} onClose={() => setShowHamburgerMenu(false)} onMenuAction={handleMenuAction} />

      {/* Shop View */}
      {activeTab === 'shop' && (
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Merchandise</h2>
              <p className="text-gray-400">Take home a piece of {VENUE_CONFIG.name}</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {merchandiseData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
                >
                  <div className="text-6xl mb-3 text-center">{item.image}</div>
                  {item.bestseller && (
                    <div className="inline-block px-2 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold rounded-full mb-2">
                      ⭐ Best Seller
                    </div>
                  )}
                  <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{item.description}</p>
                  {item.sizes && (
                    <div className="flex gap-1 mb-3">
                      {item.sizes.map(size => (
                        <span key={size} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-[10px] rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {(item.price / 1000).toFixed(0)}k đ
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-purple-500/50"
                    >
                      +
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu View */}
      {activeTab === 'menu' && (
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Menu</h2>
              <p className="text-gray-400">Browse our delicious dishes</p>
            </motion.div>
            <div className="grid grid-cols-1 gap-4">
              {menuData.categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-purple-500/50 transition-all text-left"
                >
                  <h3 className="text-2xl font-bold text-white">{category}</h3>
                  <p className="text-gray-400 text-sm mt-1">View items in this category</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account View */}
      {activeTab === 'account' && (
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Account</h2>
              <p className="text-gray-400">Manage your profile and preferences</p>
            </motion.div>
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Guest User</h3>
                    <p className="text-gray-400 text-sm">Table {VENUE_CONFIG.tableNumber}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl"
                >
                  Sign In / Register
                </motion.button>
              </motion.div>

              <div className="space-y-2">
                {[
                  { icon: '📦', label: 'Order History', desc: 'View past orders' },
                  { icon: '❤️', label: 'Favorites', desc: 'Your saved dishes' },
                  { icon: '🎁', label: 'Rewards', desc: 'Points and offers' },
                  { icon: '⚙️', label: 'Settings', desc: 'Preferences' },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-gray-700/50 hover:border-purple-500/50 transition-all text-left flex items-center gap-4"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{item.label}</h4>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {activeTab === 'chat' && (
        <div className="flex-1 overflow-y-auto px-4 py-6" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)' }}>
          <div className="max-w-2xl mx-auto">
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} onQuickReply={handleQuickReply} onAddToCart={handleAddToCart} venueName={VENUE_CONFIG.name} tableNumber={VENUE_CONFIG.tableNumber} location={VENUE_CONFIG.location} menuUrl={VENUE_CONFIG.menuUrl} wifi={VENUE_CONFIG.wifi} />
            ))}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Bar with Hamburger Button */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50 px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-2 items-center">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowHamburgerMenu(true)} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 flex items-center justify-center text-xl text-purple-300">☰</motion.button>
          <div className="flex-1 relative">
            <input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." className="w-full px-4 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 focus:border-purple-500 focus:bg-gray-800 focus:outline-none text-white text-[15px] transition-all placeholder-gray-500" inputMode="text" />
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleSendMessage} disabled={!userInput.trim()} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg disabled:opacity-50">➤</motion.button>
        </div>
      </motion.div>

      {/* Bottom Navigation - SIMPLIFIED */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      {/* Cart Modal */}
      <AnimatePresence>{showCart && <CartModal cart={cart} onClose={() => setShowCart(false)} onUpdateQuantity={handleUpdateQuantity} />}</AnimatePresence>
    </div>
  );
}
