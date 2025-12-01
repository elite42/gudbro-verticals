'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modern Menu Data Structure
const menuData = {
  categories: ['Phở & Noodles', 'Bánh Mì', 'Rice Dishes', 'Drinks', 'Desserts'],
  items: [
    {
      id: 1,
      name: 'Phở Bò',
      price: 65000,
      category: 'Phở & Noodles',
      allergens: ['gluten'],
      popular: true,
      description: 'Traditional beef noodle soup',
      image: '🍜'
    },
    {
      id: 2,
      name: 'Bánh Mì Thịt',
      price: 35000,
      category: 'Bánh Mì',
      allergens: ['gluten'],
      popular: true,
      description: 'Grilled pork sandwich',
      image: '🥖'
    },
    {
      id: 3,
      name: 'Cơm Tấm',
      price: 55000,
      category: 'Rice Dishes',
      allergens: [],
      popular: true,
      description: 'Broken rice with grilled pork',
      image: '🍚'
    },
    {
      id: 4,
      name: 'Cà Phê Sữa Đá',
      price: 25000,
      category: 'Drinks',
      allergens: ['dairy'],
      popular: true,
      description: 'Vietnamese iced coffee',
      image: '☕'
    },
    {
      id: 5,
      name: 'Phở Gà',
      price: 60000,
      category: 'Phở & Noodles',
      allergens: ['gluten'],
      description: 'Chicken noodle soup',
      image: '🍜'
    },
    {
      id: 6,
      name: 'Bánh Mì Chay',
      price: 30000,
      category: 'Bánh Mì',
      allergens: ['gluten'],
      vegan: true,
      description: 'Vegetarian sandwich',
      image: '🥖'
    },
    {
      id: 7,
      name: 'Chè Ba Màu',
      price: 30000,
      category: 'Desserts',
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

// Modern Message Bubble Component
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
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6`}
    >
      <div className={`max-w-[85%] ${isBot ? 'items-start' : 'items-end'} flex flex-col gap-2`}>
        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`px-5 py-3.5 rounded-3xl backdrop-blur-xl shadow-lg ${
            isBot
              ? 'bg-gradient-to-br from-white/95 to-gray-50/95 text-gray-800 border border-gray-200/50'
              : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
          }`}
        >
          <p className="text-[15px] leading-relaxed font-medium">{message.text}</p>
        </motion.div>

        {/* Quick Reply Buttons */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.quickReplies.map((reply, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onQuickReply(reply)}
                className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border-2 border-blue-200 text-blue-700 font-semibold text-sm shadow-sm hover:shadow-md hover:border-blue-400 hover:bg-white transition-all"
              >
                {reply}
              </motion.button>
            ))}
          </div>
        )}

        {/* Menu Items Carousel */}
        {message.items && message.items.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 mt-2 scrollbar-hide max-w-full">
            {message.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="min-w-[200px] bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200/50 flex flex-col"
              >
                <div className="text-5xl mb-3 text-center">{item.image}</div>
                <h4 className="font-bold text-gray-800 text-base mb-1">{item.name}</h4>
                <p className="text-xs text-gray-600 mb-2 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    {(item.price / 1000).toFixed(0)}k đ
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onAddToCart(item)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg"
                  >
                    Add
                  </motion.button>
                </div>
                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.allergens.map(allergen => (
                      <span key={allergen} className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
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
    <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl px-5 py-3 rounded-3xl shadow-lg border border-gray-200/50">
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
            className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Modern Cart Modal
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
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-gradient-to-br from-white via-gray-50 to-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Your Order</h3>
            <p className="text-sm text-gray-600 mt-0.5">{cart.length} items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="bg-white rounded-2xl p-4 mb-3 shadow-md border border-gray-100 flex items-center gap-4"
              >
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-blue-600 font-semibold">
                    {(item.price / 1000).toFixed(0)}k đ
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                  >
                    -
                  </motion.button>
                  <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {(total / 1000).toFixed(0)}k đ
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl"
          >
            Place Order
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Modern Chat Menu Component
export function ModernChatMenu() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize chat
  useEffect(() => {
    addBotMessage(
      "Chào mừng bạn đến GUDBRO! 🎉\n\nI'm here to help you discover delicious Vietnamese cuisine. How would you like to explore our menu?",
      ['Show Popular Dishes', 'Browse by Category', 'I have allergies', 'Show me everything']
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
    }, 800);
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

    if (lower.includes('popular') || lower.includes('best')) {
      const popular = menuData.items.filter(item => item.popular);
      addBotMessage(
        "Here are our most popular dishes! 🌟\n\nThese are customer favorites. What would you like to try?",
        ['Show More', 'Browse Categories', 'Check allergies'],
        popular
      );
    } else if (lower.includes('category') || lower.includes('categories') || lower.includes('browse')) {
      addBotMessage(
        "Choose a category to explore:",
        menuData.categories
      );
    } else if (menuData.categories.some(cat => lower.includes(cat.toLowerCase()))) {
      const category = menuData.categories.find(cat => lower.includes(cat.toLowerCase()));
      const items = menuData.items.filter(item => item.category === category);
      addBotMessage(
        `Great choice! Here's our ${category} selection:`,
        ['Back to Categories', 'Show Popular', 'View Cart'],
        items
      );
    } else if (lower.includes('allerg')) {
      addBotMessage(
        "I can help filter dishes based on allergies. What should I avoid?",
        ['Gluten', 'Dairy', 'Fish', 'Soy', 'No allergies']
      );
    } else if (lower.includes('gluten') || lower.includes('dairy') || lower.includes('fish') || lower.includes('soy')) {
      const allergen = lower.includes('gluten') ? 'gluten' :
                       lower.includes('dairy') ? 'dairy' :
                       lower.includes('fish') ? 'fish' : 'soy';
      const safe = menuData.items.filter(item => !item.allergens?.includes(allergen));
      addBotMessage(
        `Perfect! Here are dishes without ${allergen}:`,
        ['Show other allergies', 'Browse all', 'View Cart'],
        safe
      );
    } else if (lower.includes('everything') || lower.includes('all')) {
      addBotMessage(
        "Here's our complete menu! 🍽️",
        ['Filter by Category', 'Show Popular Only', 'Check Allergies'],
        menuData.items
      );
    } else {
      addBotMessage(
        "I can help you with:\n\n• Popular dishes\n• Browse by category\n• Allergy filtering\n• View full menu",
        ['Show Popular', 'Browse Categories', 'I have allergies']
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

    // Show feedback
    addBotMessage(`Added ${item.name} to your cart! 🎉`, ['View Cart', 'Keep browsing']);
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

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Modern Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 shadow-sm"
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GUDBRO Menu
            </h1>
            <p className="text-xs text-gray-600 mt-0.5">Powered by AI Assistant</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCart(true)}
            className="relative"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            {cart.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
              >
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'
        }}
      >
        <div className="max-w-3xl mx-auto">
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

      {/* Modern Input Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="sticky bottom-0 bg-white/80 backdrop-blur-2xl border-t border-gray-200/50 px-4 py-4 shadow-lg"
      >
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about our menu..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-[15px] font-medium transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </motion.button>
        </div>
      </motion.div>

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
