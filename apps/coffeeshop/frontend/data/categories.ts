/**
 * GUDBRO Coffee House - Categories Configuration v2.0
 *
 * Hierarchical structure:
 * - LEVEL 0: Temperature (hot/cold) - macro-category
 * - LEVEL 1: Base category (coffee, tea, matcha, smoothie, milkshake)
 * - LEVEL 2: Subcategory (espresso-based, milk-based, signature, etc.)
 *
 * Supports:
 * - Chat-style interface (conversational ordering)
 * - Classic menu interface (grid/list view)
 * - Temperature-based filtering
 */

// =============================================================================
// TYPES
// =============================================================================

// Temperature is either 'hot' or 'iced'
// Products available in both temperatures should be created as separate items
export type Temperature = 'hot' | 'iced';

export interface Subcategory {
  id: string;
  name: {
    en: string;
    it: string;
    vi: string;
  };
  description?: {
    en: string;
    it: string;
    vi: string;
  };
}

export type MenuType = 'food' | 'drinks' | 'merchandise';

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

  // Menu type for tab filtering (Food/Drinks/Merch)
  menuType: MenuType;

  // Temperature info (optional - only for drinks)
  temperature?: Temperature;
  temperatureIcon?: string; // 🔥 for hot, ❄️ for iced

  // Subcategories
  subcategories?: Subcategory[];

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

// =============================================================================
// SUBCATEGORIES DEFINITIONS
// =============================================================================

export const coffeeSubcategories: Subcategory[] = [
  {
    id: 'espresso-based',
    name: { en: 'Espresso Based', it: 'A Base Espresso', vi: 'Nền Espresso' },
    description: {
      en: 'Pure espresso drinks - single, double, americano, macchiato',
      it: 'Bevande a base espresso puro - singolo, doppio, americano, macchiato',
      vi: 'Đồ uống espresso nguyên chất - đơn, đôi, americano, macchiato'
    }
  },
  {
    id: 'milk-based',
    name: { en: 'Milk Based', it: 'Con Latte', vi: 'Có Sữa' },
    description: {
      en: 'Espresso with steamed milk - latte, cappuccino, flat white',
      it: 'Espresso con latte - latte, cappuccino, flat white',
      vi: 'Espresso với sữa - latte, cappuccino, flat white'
    }
  },
  {
    id: 'signature',
    name: { en: 'Signature', it: 'Speciali', vi: 'Đặc Biệt' },
    description: {
      en: 'Creative house specialties with chocolate, caramel, and unique flavors',
      it: 'Specialità della casa con cioccolato, caramello e sapori unici',
      vi: 'Đặc sản của quán với socola, caramel và hương vị độc đáo'
    }
  },
  {
    id: 'cold-brew',
    name: { en: 'Cold Brew', it: 'Cold Brew', vi: 'Cold Brew' },
    description: {
      en: 'Slow-steeped cold coffee - smooth, naturally sweet, low acidity',
      it: 'Caffè estratto a freddo - morbido, dolce naturale, bassa acidità',
      vi: 'Cà phê ủ lạnh - mượt, ngọt tự nhiên, ít axit'
    }
  },
  {
    id: 'blended',
    name: { en: 'Blended / Frappé', it: 'Frappé', vi: 'Xay Đá' },
    description: {
      en: 'Ice-blended coffee drinks - frappuccino style',
      it: 'Bevande al caffè frullate con ghiaccio - stile frappuccino',
      vi: 'Đồ uống cà phê xay đá - kiểu frappuccino'
    }
  }
];

export const teaSubcategories: Subcategory[] = [
  {
    id: 'black-tea',
    name: { en: 'Black Tea', it: 'Tè Nero', vi: 'Trà Đen' },
    description: {
      en: 'Fully oxidized teas - rich, malty, robust flavor',
      it: 'Tè completamente ossidati - ricchi, maltati, sapore robusto',
      vi: 'Trà oxy hóa hoàn toàn - đậm đà, hương lúa mạch'
    }
  },
  {
    id: 'green-tea',
    name: { en: 'Green Tea', it: 'Tè Verde', vi: 'Trà Xanh' },
    description: {
      en: 'Unoxidized teas - fresh, grassy, delicate flavor',
      it: 'Tè non ossidati - freschi, erbacei, sapore delicato',
      vi: 'Trà không oxy hóa - tươi, hương cỏ, tinh tế'
    }
  },
  {
    id: 'herbal-tisane',
    name: { en: 'Herbal & Tisane', it: 'Tisane', vi: 'Trà Thảo Mộc' },
    description: {
      en: 'Caffeine-free herbal infusions - chamomile, peppermint, hibiscus',
      it: 'Infusi alle erbe senza caffeina - camomilla, menta, ibisco',
      vi: 'Trà thảo mộc không caffeine - hoa cúc, bạc hà, dâm bụt'
    }
  },
  {
    id: 'chai',
    name: { en: 'Chai & Spiced', it: 'Chai e Speziati', vi: 'Trà Chai' },
    description: {
      en: 'Spiced tea blends - masala chai, dirty chai, chai latte',
      it: 'Miscele di tè speziato - masala chai, dirty chai, chai latte',
      vi: 'Trà gia vị - masala chai, dirty chai, chai latte'
    }
  }
];

export const matchaSubcategories: Subcategory[] = [
  {
    id: 'ceremonial',
    name: { en: 'Ceremonial Pure', it: 'Cerimoniale Puro', vi: 'Nguyên Chất' },
    description: {
      en: 'Highest grade matcha whisked with water only',
      it: 'Matcha di grado più alto solo con acqua',
      vi: 'Matcha cao cấp nhất chỉ với nước'
    }
  },
  {
    id: 'latte-grade',
    name: { en: 'Matcha Latte', it: 'Matcha Latte', vi: 'Matcha Latte' },
    description: {
      en: 'Premium matcha blended with milk - hot or iced',
      it: 'Matcha premium miscelato con latte - caldo o freddo',
      vi: 'Matcha cao cấp với sữa - nóng hoặc đá'
    }
  },
  {
    id: 'matcha-signature',
    name: { en: 'Matcha Creations', it: 'Creazioni Matcha', vi: 'Sáng Tạo Matcha' },
    description: {
      en: 'Creative matcha drinks with unique flavors',
      it: 'Bevande matcha creative con sapori unici',
      vi: 'Đồ uống matcha sáng tạo với hương vị độc đáo'
    }
  }
];

export const smoothieSubcategories: Subcategory[] = [
  {
    id: 'fruit',
    name: { en: 'Fruit Smoothie', it: 'Smoothie alla Frutta', vi: 'Sinh Tố Trái Cây' },
    description: {
      en: 'Fresh fruit blends - berry, tropical, citrus',
      it: 'Mix di frutta fresca - frutti di bosco, tropicale, agrumi',
      vi: 'Sinh tố trái cây tươi - berry, nhiệt đới, cam quýt'
    }
  },
  {
    id: 'green-detox',
    name: { en: 'Green & Detox', it: 'Verde e Detox', vi: 'Xanh & Detox' },
    description: {
      en: 'Healthy green smoothies with spinach, kale, and superfoods',
      it: 'Smoothie verdi salutari con spinaci, cavolo e superfood',
      vi: 'Sinh tố xanh lành mạnh với rau bina, cải xoăn và superfood'
    }
  },
  {
    id: 'protein',
    name: { en: 'Protein', it: 'Proteico', vi: 'Protein' },
    description: {
      en: 'High protein smoothies for fitness and energy',
      it: 'Smoothie ad alto contenuto proteico per fitness ed energia',
      vi: 'Sinh tố giàu protein cho thể lực và năng lượng'
    }
  }
];

export const milkshakeSubcategories: Subcategory[] = [
  {
    id: 'classic',
    name: { en: 'Classic', it: 'Classici', vi: 'Cổ Điển' },
    description: {
      en: 'Traditional milkshake flavors - vanilla, chocolate, strawberry',
      it: 'Gusti classici - vaniglia, cioccolato, fragola',
      vi: 'Hương vị cổ điển - vanilla, socola, dâu tây'
    }
  },
  {
    id: 'gourmet',
    name: { en: 'Gourmet & Premium', it: 'Gourmet e Premium', vi: 'Cao Cấp' },
    description: {
      en: 'Indulgent specialty shakes - Nutella, Oreo, Kinder, Snickers',
      it: 'Frappè speciali golosi - Nutella, Oreo, Kinder, Snickers',
      vi: 'Milkshake đặc biệt - Nutella, Oreo, Kinder, Snickers'
    }
  }
];

// =============================================================================
// FOOD SUBCATEGORIES
// =============================================================================

export const foodSubcategories: Subcategory[] = [
  {
    id: 'breakfast',
    name: { en: 'Breakfast', it: 'Colazione', vi: 'Bữa Sáng' },
    description: {
      en: 'Morning favorites - croissants, toast, eggs',
      it: 'Preferiti del mattino - cornetti, toast, uova',
      vi: 'Món sáng yêu thích - bánh sừng bò, bánh mì nướng, trứng'
    }
  },
  {
    id: 'sandwiches',
    name: { en: 'Sandwiches & Wraps', it: 'Panini e Wrap', vi: 'Bánh Mì Kẹp' },
    description: {
      en: 'Fresh sandwiches and wraps - banh mi, panini, wraps',
      it: 'Panini e wrap freschi - banh mi, panini, wrap',
      vi: 'Bánh mì kẹp tươi - bánh mì, panini, wrap'
    }
  },
  {
    id: 'bowls',
    name: { en: 'Bowls & Salads', it: 'Bowl e Insalate', vi: 'Tô & Salad' },
    description: {
      en: 'Healthy bowls and fresh salads',
      it: 'Bowl salutari e insalate fresche',
      vi: 'Tô lành mạnh và salad tươi'
    }
  },
  {
    id: 'mains',
    name: { en: 'Main Dishes', it: 'Piatti Principali', vi: 'Món Chính' },
    description: {
      en: 'Hearty main courses - pho, pasta, rice dishes',
      it: 'Piatti principali sostanziosi - pho, pasta, riso',
      vi: 'Món chính đầy đặn - phở, mì ý, cơm'
    }
  }
];

export const dessertSubcategories: Subcategory[] = [
  {
    id: 'cakes',
    name: { en: 'Cakes & Pastries', it: 'Torte e Pasticcini', vi: 'Bánh Ngọt' },
    description: {
      en: 'Cakes, brownies, and pastries',
      it: 'Torte, brownie e pasticcini',
      vi: 'Bánh, brownie và bánh ngọt'
    }
  },
  {
    id: 'asian-desserts',
    name: { en: 'Asian Desserts', it: 'Dolci Asiatici', vi: 'Tráng Miệng Á' },
    description: {
      en: 'Traditional Asian sweets - mango sticky rice, che, mochi',
      it: 'Dolci tradizionali asiatici - riso al mango, che, mochi',
      vi: 'Tráng miệng Á truyền thống - xôi xoài, chè, mochi'
    }
  },
  {
    id: 'italian-desserts',
    name: { en: 'Italian Desserts', it: 'Dolci Italiani', vi: 'Tráng Miệng Ý' },
    description: {
      en: 'Classic Italian sweets - tiramisu, panna cotta, cannoli',
      it: 'Dolci italiani classici - tiramisù, panna cotta, cannoli',
      vi: 'Tráng miệng Ý cổ điển - tiramisu, panna cotta, cannoli'
    }
  }
];

export const merchSubcategories: Subcategory[] = [
  {
    id: 'coffee-beans',
    name: { en: 'Coffee Beans', it: 'Caffè in Grani', vi: 'Hạt Cà Phê' },
    description: {
      en: 'Premium coffee beans to take home',
      it: 'Caffè in grani premium da portare a casa',
      vi: 'Hạt cà phê cao cấp mang về'
    }
  },
  {
    id: 'equipment',
    name: { en: 'Equipment', it: 'Attrezzature', vi: 'Dụng Cụ' },
    description: {
      en: 'Brewing equipment and accessories',
      it: 'Attrezzature e accessori per caffè',
      vi: 'Dụng cụ pha chế và phụ kiện'
    }
  },
  {
    id: 'branded',
    name: { en: 'Branded Items', it: 'Articoli Brandizzati', vi: 'Đồ Thương Hiệu' },
    description: {
      en: 'Mugs, tumblers, apparel with our logo',
      it: 'Tazze, thermos, abbigliamento con il nostro logo',
      vi: 'Cốc, bình, quần áo với logo của chúng tôi'
    }
  }
];

// =============================================================================
// MAIN CATEGORIES
// =============================================================================

export const categories: Category[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // HOT COFFEE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hot-coffee',
    slug: 'hot-coffee',
    name: {
      en: 'Hot Coffee',
      it: 'Caffè Caldo',
      vi: 'Cà Phê Nóng'
    },
    description: {
      en: 'Espresso-based hot drinks - from classic to creative',
      it: 'Bevande calde a base espresso - dal classico al creativo',
      vi: 'Đồ uống nóng từ espresso - từ cổ điển đến sáng tạo'
    },
    icon: '☕',
    temperatureIcon: '🔥',
    temperature: 'hot',
    menuType: 'drinks',
    image: '/categories/hot-coffee.jpg',
    sortOrder: 1,
    isVisible: true,
    subcategories: coffeeSubcategories.filter(s =>
      ['espresso-based', 'milk-based', 'signature'].includes(s.id)
    ),
    quickPrompts: {
      en: ['I need a coffee', 'Something hot', 'Classic espresso', 'Cappuccino please'],
      it: ['Vorrei un caffè', 'Qualcosa di caldo', 'Un espresso classico', 'Un cappuccino'],
      vi: ['Tôi cần cà phê', 'Gì đó nóng', 'Espresso cổ điển', 'Cappuccino']
    },
    tags: ['coffee', 'caffeine', 'hot', 'espresso', 'milk'],
    defaultTimeSlots: ['breakfast', 'morning', 'afternoon']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ICED COFFEE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'iced-coffee',
    slug: 'iced-coffee',
    name: {
      en: 'Iced Coffee',
      it: 'Caffè Freddo',
      vi: 'Cà Phê Đá'
    },
    description: {
      en: 'Cold coffee drinks - iced latte, cold brew, frappé',
      it: 'Bevande al caffè fredde - latte ghiacciato, cold brew, frappé',
      vi: 'Đồ uống cà phê lạnh - latte đá, cold brew, frappé'
    },
    icon: '🧊',
    temperatureIcon: '❄️',
    temperature: 'iced',
    menuType: 'drinks',
    image: '/categories/iced-coffee.jpg',
    sortOrder: 2,
    isVisible: true,
    subcategories: coffeeSubcategories.filter(s =>
      ['cold-brew', 'blended', 'signature'].includes(s.id)
    ),
    quickPrompts: {
      en: ['Iced coffee', 'Something cold', 'Cold brew', 'Frappuccino'],
      it: ['Caffè freddo', 'Qualcosa di freddo', 'Cold brew', 'Frappuccino'],
      vi: ['Cà phê đá', 'Gì đó lạnh', 'Cold brew', 'Frappuccino']
    },
    tags: ['coffee', 'caffeine', 'iced', 'cold', 'refreshing'],
    defaultTimeSlots: ['morning', 'afternoon', 'evening']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MATCHA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'matcha',
    slug: 'matcha',
    name: {
      en: 'Matcha',
      it: 'Matcha',
      vi: 'Matcha'
    },
    description: {
      en: 'Japanese green tea powder - ceremonial and latte styles',
      it: 'Tè verde giapponese in polvere - cerimoniale e latte',
      vi: 'Bột trà xanh Nhật Bản - nghi lễ và latte'
    },
    icon: '🍵',
    temperatureIcon: '🔥',
    temperature: 'hot',
    menuType: 'drinks',
    image: '/categories/matcha.jpg',
    sortOrder: 3,
    isVisible: true,
    subcategories: matchaSubcategories,
    quickPrompts: {
      en: ['Matcha please', 'Green tea latte', 'Something healthy', 'Iced matcha'],
      it: ['Un matcha', 'Latte al tè verde', 'Qualcosa di salutare', 'Matcha freddo'],
      vi: ['Matcha', 'Latte trà xanh', 'Gì đó lành mạnh', 'Matcha đá']
    },
    tags: ['tea', 'matcha', 'healthy', 'japanese', 'antioxidant', 'caffeine'],
    defaultTimeSlots: ['morning', 'afternoon']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TEA & INFUSIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'tea',
    slug: 'tea',
    name: {
      en: 'Tea & Infusions',
      it: 'Tè e Tisane',
      vi: 'Trà & Thảo Mộc'
    },
    description: {
      en: 'Black, green, herbal teas and spiced chai',
      it: 'Tè nero, verde, tisane e chai speziato',
      vi: 'Trà đen, xanh, thảo mộc và chai gia vị'
    },
    icon: '🫖',
    temperatureIcon: '🔥',
    temperature: 'hot',
    menuType: 'drinks',
    image: '/categories/tea.jpg',
    sortOrder: 4,
    isVisible: true,
    subcategories: teaSubcategories,
    quickPrompts: {
      en: ['Tea please', 'No coffee', 'Caffeine free', 'Chai latte'],
      it: ['Un tè', 'Niente caffè', 'Senza caffeina', 'Chai latte'],
      vi: ['Trà', 'Không cà phê', 'Không caffeine', 'Chai latte']
    },
    tags: ['tea', 'herbal', 'chai', 'caffeine-free-options', 'healthy'],
    defaultTimeSlots: ['all-day']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SMOOTHIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'smoothie',
    slug: 'smoothie',
    name: {
      en: 'Smoothies',
      it: 'Smoothie',
      vi: 'Sinh Tố'
    },
    description: {
      en: 'Fresh fruit smoothies - fruit, green, and protein',
      it: 'Smoothie di frutta fresca - frutta, verde e proteico',
      vi: 'Sinh tố trái cây tươi - trái cây, xanh và protein'
    },
    icon: '🥤',
    temperatureIcon: '❄️',
    temperature: 'iced',
    menuType: 'drinks',
    image: '/categories/smoothie.jpg',
    sortOrder: 5,
    isVisible: true,
    subcategories: smoothieSubcategories,
    quickPrompts: {
      en: ['Fresh smoothie', 'Fruit drink', 'Green detox', 'Protein shake'],
      it: ['Smoothie fresco', 'Bevanda alla frutta', 'Detox verde', 'Shake proteico'],
      vi: ['Sinh tố tươi', 'Đồ uống trái cây', 'Detox xanh', 'Shake protein']
    },
    tags: ['fruit', 'healthy', 'fresh', 'vitamins', 'caffeine-free'],
    defaultTimeSlots: ['morning', 'afternoon']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MILKSHAKES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'milkshake',
    slug: 'milkshake',
    name: {
      en: 'Milkshakes',
      it: 'Frappè',
      vi: 'Sữa Lắc'
    },
    description: {
      en: 'Creamy ice cream shakes - classic and gourmet',
      it: 'Frappè cremosi al gelato - classici e gourmet',
      vi: 'Sữa lắc kem béo - cổ điển và cao cấp'
    },
    icon: '🥛',
    temperatureIcon: '❄️',
    temperature: 'iced',
    menuType: 'drinks',
    image: '/categories/milkshake.jpg',
    sortOrder: 6,
    isVisible: true,
    subcategories: milkshakeSubcategories,
    quickPrompts: {
      en: ['Milkshake', 'Something sweet', 'Ice cream drink', 'Nutella shake'],
      it: ['Un frappè', 'Qualcosa di dolce', 'Bevanda al gelato', 'Frappè Nutella'],
      vi: ['Sữa lắc', 'Gì đó ngọt', 'Đồ uống kem', 'Shake Nutella']
    },
    tags: ['dessert', 'ice-cream', 'sweet', 'indulgent', 'creamy'],
    defaultTimeSlots: ['afternoon', 'evening']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FOOD
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'food',
    slug: 'food',
    name: {
      en: 'Food',
      it: 'Cibo',
      vi: 'Đồ Ăn'
    },
    description: {
      en: 'Fresh food - breakfast, sandwiches, bowls, and mains',
      it: 'Cibo fresco - colazione, panini, bowl e piatti principali',
      vi: 'Đồ ăn tươi - bữa sáng, bánh mì, tô và món chính'
    },
    icon: '🍽️',
    menuType: 'food',
    image: '/categories/food.jpg',
    sortOrder: 7,
    isVisible: true,
    subcategories: foodSubcategories,
    quickPrompts: {
      en: ['Something to eat', 'Breakfast', 'Lunch', 'Banh mi please'],
      it: ['Qualcosa da mangiare', 'Colazione', 'Pranzo', 'Un panino'],
      vi: ['Gì đó ăn', 'Bữa sáng', 'Bữa trưa', 'Bánh mì']
    },
    tags: ['food', 'breakfast', 'lunch', 'sandwich', 'bowl', 'savory'],
    defaultTimeSlots: ['breakfast', 'lunch', 'dinner']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DESSERTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'dessert',
    slug: 'dessert',
    name: {
      en: 'Desserts',
      it: 'Dolci',
      vi: 'Tráng Miệng'
    },
    description: {
      en: 'Sweet treats - cakes, pastries, and traditional desserts',
      it: 'Dolci - torte, pasticcini e dolci tradizionali',
      vi: 'Đồ ngọt - bánh, bánh ngọt và tráng miệng truyền thống'
    },
    icon: '🍰',
    menuType: 'food',
    image: '/categories/dessert.jpg',
    sortOrder: 8,
    isVisible: true,
    subcategories: dessertSubcategories,
    quickPrompts: {
      en: ['Something sweet', 'Dessert please', 'Tiramisu', 'Cake'],
      it: ['Qualcosa di dolce', 'Un dessert', 'Tiramisù', 'Una torta'],
      vi: ['Gì đó ngọt', 'Tráng miệng', 'Tiramisu', 'Bánh']
    },
    tags: ['dessert', 'sweet', 'cake', 'pastry', 'treat'],
    defaultTimeSlots: ['afternoon', 'evening']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MERCH
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'merch',
    slug: 'merch',
    name: {
      en: 'Merchandise',
      it: 'Merchandise',
      vi: 'Hàng Hóa'
    },
    description: {
      en: 'Coffee beans, equipment, and branded items',
      it: 'Caffè in grani, attrezzature e articoli brandizzati',
      vi: 'Hạt cà phê, dụng cụ và đồ thương hiệu'
    },
    icon: '🛍️',
    menuType: 'merchandise',
    image: '/categories/merch.jpg',
    sortOrder: 9,
    isVisible: true,
    subcategories: merchSubcategories,
    quickPrompts: {
      en: ['Coffee beans', 'Merchandise', 'Take home', 'Equipment'],
      it: ['Caffè in grani', 'Merchandise', 'Da portare via', 'Attrezzature'],
      vi: ['Hạt cà phê', 'Hàng hóa', 'Mang về', 'Dụng cụ']
    },
    tags: ['beans', 'equipment', 'merch', 'retail', 'take-home'],
    defaultTimeSlots: ['all-day']
  }
];

// =============================================================================
// TEMPERATURE HELPERS
// =============================================================================

export const TEMPERATURE_ICONS = {
  hot: '🔥',
  iced: '❄️'
} as const;

export const getTemperatureIcon = (temp: Temperature | undefined): string => {
  if (!temp) return '';
  return TEMPERATURE_ICONS[temp] || '';
};

export const getHotCategories = (): Category[] =>
  categories.filter(c => c.temperature === 'hot');

export const getIcedCategories = (): Category[] =>
  categories.filter(c => c.temperature === 'iced');

export const getDrinkCategories = (): Category[] =>
  categories.filter(c => c.menuType === 'drinks');

// =============================================================================
// CATEGORY HELPERS
// =============================================================================

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

export const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subcategories?.find(s => s.id === subcategoryId);
};

// =============================================================================
// MENU TYPE HELPERS
// =============================================================================

export const getCategoriesByMenuType = (menuType: MenuType): Category[] =>
  categories.filter(c => c.menuType === menuType && c.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);

export const getCategoryMenuType = (categoryId: string): MenuType | undefined =>
  getCategoryById(categoryId)?.menuType;

export const getDrinksCategories = (): Category[] => getCategoriesByMenuType('drinks');
export const getFoodCategories = (): Category[] => getCategoriesByMenuType('food');
export const getMerchCategories = (): Category[] => getCategoriesByMenuType('merchandise');

// =============================================================================
// LEGACY MAPPING (for backward compatibility)
// =============================================================================

// Maps old category IDs to new ones
export const LEGACY_CATEGORY_MAP: Record<string, string> = {
  'espresso': 'hot-coffee',
  'signature-coffee': 'hot-coffee', // or 'iced-coffee' depending on product
};

export const mapLegacyCategory = (oldId: string): string =>
  LEGACY_CATEGORY_MAP[oldId] || oldId;

// =============================================================================
// CATEGORY STATS
// =============================================================================

export const CATEGORY_COUNTS = {
  'hot-coffee': 26,      // espresso-based + milk-based + some signature
  'iced-coffee': 22,     // cold versions + cold brew + blended
  'matcha': 10,
  'tea': 15,
  'smoothie': 10,
  'milkshake': 12,
  'food': 10,            // breakfast, sandwiches, bowls, mains
  'dessert': 6,          // cakes, asian desserts, italian desserts
  'merch': 5,            // coffee beans, equipment, branded items
  total: 102             // Updated with food, dessert, and merch
};
