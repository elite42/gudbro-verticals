/**
 * GUDBRO Coffee House - Categories Configuration
 *
 * Defines menu categories for both:
 * - Chat-style interface (conversational ordering)
 * - Classic menu interface (grid/list view)
 */

export interface Category {
  id: string;
  slug: string;
  name: {
    en: string;
    it: string;
    vi: string;
  };
  description: {
    en: string;
    it: string;
    vi: string;
  };
  icon: string;
  image?: string;
  sortOrder: number;
  isVisible: boolean;

  // Chat-style quick prompts
  quickPrompts: {
    en: string[];
    it: string[];
    vi: string[];
  };

  // Filtering
  tags: string[];
  defaultTimeSlots: string[];

  // Stats (populated at runtime)
  productCount?: number;
}

export const categories: Category[] = [
  {
    id: 'espresso',
    slug: 'espresso',
    name: {
      en: 'Espresso',
      it: 'Espresso',
      vi: 'Espresso'
    },
    description: {
      en: 'Classic Italian coffee drinks - the foundation of great coffee',
      it: 'Classici italiani - la base del grande caffè',
      vi: 'Cà phê Ý cổ điển - nền tảng của cà phê tuyệt vời'
    },
    icon: '☕',
    image: '/categories/espresso.jpg',
    sortOrder: 1,
    isVisible: true,
    quickPrompts: {
      en: ['I need a coffee', 'Something strong', 'Classic espresso'],
      it: ['Vorrei un caffè', 'Qualcosa di forte', 'Un espresso classico'],
      vi: ['Tôi cần cà phê', 'Gì đó đậm', 'Espresso cổ điển']
    },
    tags: ['coffee', 'caffeine', 'classic', 'italian'],
    defaultTimeSlots: ['breakfast', 'morning', 'afternoon']
  },
  {
    id: 'signature-coffee',
    slug: 'signature-coffee',
    name: {
      en: 'Signature Coffee',
      it: 'Caffè Speciali',
      vi: 'Cà Phê Đặc Biệt'
    },
    description: {
      en: 'Creative coffee creations with chocolate, caramel, and more',
      it: 'Creazioni creative con cioccolato, caramello e altro',
      vi: 'Sáng tạo cà phê với socola, caramel và nhiều hơn'
    },
    icon: '✨',
    image: '/categories/signature.jpg',
    sortOrder: 2,
    isVisible: true,
    quickPrompts: {
      en: ['Something special', 'With chocolate', 'Surprise me'],
      it: ['Qualcosa di speciale', 'Con cioccolato', 'Sorprendimi'],
      vi: ['Gì đó đặc biệt', 'Có socola', 'Gây ngạc nhiên cho tôi']
    },
    tags: ['coffee', 'dessert', 'chocolate', 'creative', 'indulgent'],
    defaultTimeSlots: ['afternoon', 'evening']
  },
  {
    id: 'matcha',
    slug: 'matcha',
    name: {
      en: 'Matcha',
      it: 'Matcha',
      vi: 'Matcha'
    },
    description: {
      en: 'Japanese green tea powder drinks - healthy and energizing',
      it: 'Bevande al tè verde giapponese - salutari ed energizzanti',
      vi: 'Đồ uống bột trà xanh Nhật Bản - lành mạnh và tràn đầy năng lượng'
    },
    icon: '🍵',
    image: '/categories/matcha.jpg',
    sortOrder: 3,
    isVisible: true,
    quickPrompts: {
      en: ['Matcha please', 'Something healthy', 'Green tea latte'],
      it: ['Un matcha', 'Qualcosa di salutare', 'Latte al tè verde'],
      vi: ['Matcha', 'Gì đó lành mạnh', 'Latte trà xanh']
    },
    tags: ['tea', 'healthy', 'japanese', 'antioxidant', 'caffeine'],
    defaultTimeSlots: ['morning', 'afternoon']
  },
  {
    id: 'tea',
    slug: 'tea',
    name: {
      en: 'Tea & Infusions',
      it: 'Tè e Infusi',
      vi: 'Trà & Trà Thảo Mộc'
    },
    description: {
      en: 'Hot and iced teas, herbal infusions, and fruit blends',
      it: 'Tè caldi e freddi, infusi alle erbe e mix di frutta',
      vi: 'Trà nóng và lạnh, trà thảo mộc và trà trái cây'
    },
    icon: '🫖',
    image: '/categories/tea.jpg',
    sortOrder: 4,
    isVisible: true,
    quickPrompts: {
      en: ['Tea please', 'No coffee', 'Something light', 'Caffeine free'],
      it: ['Un tè', 'Niente caffè', 'Qualcosa di leggero', 'Senza caffeina'],
      vi: ['Trà', 'Không cà phê', 'Gì đó nhẹ', 'Không caffeine']
    },
    tags: ['tea', 'herbal', 'fruit', 'caffeine-free-options', 'light'],
    defaultTimeSlots: ['all-day']
  },
  {
    id: 'smoothie',
    slug: 'smoothie',
    name: {
      en: 'Smoothies',
      it: 'Smoothie',
      vi: 'Sinh Tố'
    },
    description: {
      en: 'Fresh fruit smoothies - refreshing and nutritious',
      it: 'Smoothie di frutta fresca - rinfrescanti e nutrienti',
      vi: 'Sinh tố trái cây tươi - sảng khoái và bổ dưỡng'
    },
    icon: '🥤',
    image: '/categories/smoothie.jpg',
    sortOrder: 5,
    isVisible: true,
    quickPrompts: {
      en: ['Something fresh', 'Fruit drink', 'Healthy option', 'No dairy'],
      it: ['Qualcosa di fresco', 'Bevanda alla frutta', 'Opzione salutare', 'Senza latticini'],
      vi: ['Gì đó tươi mát', 'Đồ uống trái cây', 'Lựa chọn lành mạnh', 'Không sữa']
    },
    tags: ['fruit', 'healthy', 'fresh', 'vitamins', 'caffeine-free'],
    defaultTimeSlots: ['morning', 'afternoon']
  },
  {
    id: 'milkshake',
    slug: 'milkshake',
    name: {
      en: 'Milkshakes',
      it: 'Frappè',
      vi: 'Sữa Lắc'
    },
    description: {
      en: 'Creamy ice cream shakes - indulgent dessert drinks',
      it: 'Frappè cremosi al gelato - bevande dessert golose',
      vi: 'Sữa lắc kem béo - đồ uống tráng miệng thưởng thức'
    },
    icon: '🥛',
    image: '/categories/milkshake.jpg',
    sortOrder: 6,
    isVisible: true,
    quickPrompts: {
      en: ['Milkshake', 'Something sweet', 'Ice cream drink', 'Dessert'],
      it: ['Un frappè', 'Qualcosa di dolce', 'Bevanda al gelato', 'Dessert'],
      vi: ['Sữa lắc', 'Gì đó ngọt', 'Đồ uống kem', 'Tráng miệng']
    },
    tags: ['dessert', 'ice-cream', 'sweet', 'indulgent', 'creamy'],
    defaultTimeSlots: ['afternoon', 'evening']
  }
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined =>
  categories.find(c => c.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find(c => c.slug === slug);

export const getVisibleCategories = (): Category[] =>
  categories.filter(c => c.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);

export const getCategoryIcon = (categoryId: string): string =>
  getCategoryById(categoryId)?.icon || '📦';

export const getCategoryName = (categoryId: string, lang: 'en' | 'it' | 'vi' = 'en'): string =>
  getCategoryById(categoryId)?.name[lang] || categoryId;

// Category stats
export const CATEGORY_COUNTS = {
  espresso: 16,
  'signature-coffee': 18,
  matcha: 10,
  tea: 15,
  smoothie: 10,
  milkshake: 12,
  total: 81
};
