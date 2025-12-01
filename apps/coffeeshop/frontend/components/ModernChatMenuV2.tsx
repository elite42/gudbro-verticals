'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Menu Data with More Items
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
      image: '🍜'
    },
    {
      id: 2,
      name: 'Bánh Mì Thịt',
      price: 35000,
      category: '🥖 Bánh Mì',
      allergens: ['gluten'],
      popular: true,
      description: 'Grilled pork sandwich',
      image: '🥖'
    },
    {
      id: 3,
      name: 'Cơm Tấm',
      price: 55000,
      category: '🍚 Rice Dishes',
      allergens: [],
      popular: true,
      description: 'Broken rice with grilled pork',
      image: '🍚'
    },
    {
      id: 4,
      name: 'Cà Phê Sữa Đá',
      price: 25000,
      category: '☕ Drinks',
      allergens: ['dairy'],
      popular: true,
      description: 'Vietnamese iced coffee',
      image: '☕'
    },
    {
      id: 5,
      name: 'Phở Gà',
      price: 60000,
      category: '🍜 Phở & Noodles',
      allergens: ['gluten'],
      description: 'Chicken noodle soup',
      image: '🍜'
    },
    {
      id: 6,
      name: 'Bánh Mì Chay',
      price: 30000,
      category: '🥖 Bánh Mì',
      allergens: ['gluten'],
      vegan: true,
      description: 'Vegetarian sandwich',
      image: '🥖'
    },
    {
      id: 7,
      name: 'Chè Ba Màu',
      price: 30000,
      category: '🍨 Desserts',
      allergens: [],
      description: 'Three color dessert',
      image: '🍨'
    },
  ]
};

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
  items?: typeof menuData.items;
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

// Modern Message Bubble Component with Dark Mode
const MessageBubble = ({ message, onQuickReply, onAddToCart }: {
  message: Message;
  onQuickReply: (reply: string) => void;
  onAddToCart: (item: any) => void;
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
          className={`px-4 py-3 rounded-2xl shadow-md ${
            isBot
              ? 'bg-gray-800/90 backdrop-blur-lg text-gray-100 border border-gray-700/50'
              : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/30'
          }`}
        >
          <p className="text-[15px] leading-relaxed">{message.text}</p>
        </motion.div>

        {/* Quick Reply Buttons */}
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
                onClick={() => onQuickReply(reply)}
                className="px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-purple-500/50 text-purple-300 font-semibold text-sm shadow-lg hover:border-purple-400 hover:bg-gray-800 transition-all"
              >
                {reply}
              </motion.button>
            ))}
          </div>
        )}

        {/* Menu Items Carousel - Enhanced Design */}
        {message.items && message.items.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 mt-2 scrollbar-hide max-w-full">
            {message.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="min-w-[190px] bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 flex flex-col hover:border-purple-500/50 transition-all"
              >
                <div className="text-5xl mb-3 text-center drop-shadow-lg">{item.image}</div>
                <h4 className="font-bold text-gray-100 text-base mb-1">{item.name}</h4>
                <p className="text-xs text-gray-400 mb-2 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {(item.price / 1000).toFixed(0)}k đ
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onAddToCart(item)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-purple-500/50"
                  >
                    +
                  </motion.button>
                </div>
                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.allergens.map(allergen => (
                      <span key={allergen} className="text-[10px] px-2 py-0.5 bg-orange-900/50 text-orange-300 rounded-full border border-orange-500/30">
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Modern Typing Indicator
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex justify-start mb-4"
  >
    <div className="bg-gray-800/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-gray-700/50">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Cart Modal - Enhanced
const CartModal = ({ cart, onClose, onUpdateQuantity }: {
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
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-gradient-to-b from-gray-900 to-black rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden border-t-2 border-purple-500/30"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 px-6 py-5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Your Cart</h3>
            <p className="text-sm text-gray-400 mt-0.5">{cart.length} items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto max-h-[calc(85vh-200px)] px-6 py-4">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/80 rounded-2xl p-4 mb-3 shadow-md border border-gray-700/50 flex items-center gap-4"
              >
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                    {(item.price / 1000).toFixed(0)}k đ
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-bold text-white"
                  >
                    -
                  </motion.button>
                  <span className="font-bold text-lg w-8 text-center text-white">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-300">Total</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {(total / 1000).toFixed(0)}k đ
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/50"
          >
            Place Order
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Bottom Navigation Bar (Telegram-style)
const BottomNavigation = ({ activeTab, onTabChange, cartCount }: {
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
    <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-4 py-2">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className={`text-[10px] font-semibold ${
              activeTab === tab.id ? 'text-purple-300' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
            {tab.id === 'cart' && cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
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
export function ModernChatMenuV2() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeTab, setActiveTab] = useState<BottomTab>('chat');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    addBotMessage(
      "Hey! Welcome to GUDBRO 🎉\n\nI'm your personal menu assistant. Ready to discover amazing Vietnamese food?",
      ['🌟 Popular Dishes', '📂 Browse Categories', '⚠️ Allergy Filter', '🍽️ Full Menu']
    );
  }, []);

  const addBotMessage = (text: string, quickReplies?: string[], items?: typeof menuData.items) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text,
        quickReplies,
        items,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    handleIntent(reply);
  };

  const handleIntent = (input: string) => {
    const lower = input.toLowerCase();

    if (lower.includes('popular') || lower.includes('🌟')) {
      const popular = menuData.items.filter(item => item.popular);
      addBotMessage(
        "Here are our star dishes! ⭐\n\nCustomer favorites that you'll absolutely love:",
        ['📂 Categories', '⚠️ Allergies', '🛒 View Cart'],
        popular
      );
    } else if (lower.includes('categories') || lower.includes('📂') || lower.includes('browse')) {
      addBotMessage(
        "Choose a category:",
        menuData.categories
      );
    } else if (menuData.categories.some(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')))) {
      const category = menuData.categories.find(cat => lower.includes(cat.toLowerCase().replace(/[^\w\s]/gi, '')));
      const items = menuData.items.filter(item => item.category === category);
      addBotMessage(
        `Great choice! Here's our ${category} selection:`,
        ['⬅️ Back', '🌟 Popular', '🛒 Cart'],
        items
      );
    } else if (lower.includes('allerg') || lower.includes('⚠️')) {
      addBotMessage(
        "Let me help filter by allergies. Select what to avoid:",
        ['🌾 Gluten', '🥛 Dairy', '🐟 Fish', '🌰 Soy', '✅ None']
      );
    } else if (lower.includes('gluten') || lower.includes('dairy') || lower.includes('fish') || lower.includes('soy')) {
      const allergen = lower.includes('gluten') ? 'gluten' :
                       lower.includes('dairy') ? 'dairy' :
                       lower.includes('fish') ? 'fish' : 'soy';
      const safe = menuData.items.filter(item => !item.allergens?.includes(allergen));
      addBotMessage(
        `Perfect! Dishes without ${allergen}:`,
        ['🔄 Other Filters', '📂 All Categories'],
        safe
      );
    } else if (lower.includes('full menu') || lower.includes('🍽️') || lower.includes('everything')) {
      addBotMessage(
        "Here's everything we have! 🍽️",
        ['📂 Filter', '🌟 Popular Only'],
        menuData.items
      );
    } else {
      addBotMessage(
        "I can help you with:\n\n🌟 Popular dishes\n📂 Browse by category\n⚠️ Allergy filtering\n🍽️ Full menu",
        ['🌟 Popular', '📂 Categories', '⚠️ Allergies']
      );
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
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0);
      return updated;
    });
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    addUserMessage(userInput);
    handleIntent(userInput);
    setUserInput('');
  };

  const handleTabChange = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setShowCart(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Modern Header with Account Icon */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-2xl border-b border-gray-700/50 shadow-lg"
      >
        <div className="px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
              🍜
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">GUDBRO Menu</h1>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 flex items-center justify-center"
          >
            <span className="text-2xl">👤</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)'
        }}
      >
        <div className="max-w-2xl mx-auto">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={handleQuickReply}
              onAddToCart={handleAddToCart}
            />
          ))}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar with Menu Button (Telegram-style) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50 px-4 py-3 shadow-lg"
      >
        <div className="max-w-2xl mx-auto flex gap-2 items-center">
          {/* Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 flex items-center justify-center text-xl"
          >
            ☰
          </motion.button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 focus:border-purple-500 focus:bg-gray-800 focus:outline-none text-white text-[15px] transition-all placeholder-gray-500"
              inputMode="text"
            />
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Navigation Bar */}
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
