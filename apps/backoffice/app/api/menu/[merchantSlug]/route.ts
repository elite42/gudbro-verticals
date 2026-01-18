import { NextRequest, NextResponse } from 'next/server';

// Types (in production, import from shared/database/types)
interface MultiLangText {
  en: string;
  it: string;
  vi: string;
  ko?: string;
  ja?: string;
}

interface AllergenFlags {
  [key: string]: boolean | undefined;
}

interface IntoleranceFlags {
  [key: string]: boolean | undefined;
}

interface DietaryFlags {
  [key: string]: boolean | undefined;
}

interface ProductCustomization {
  id: string;
  type: 'radio' | 'checkbox' | 'quantity';
  name: MultiLangText;
  required: boolean;
  max_selections?: number;
  options: {
    id: string;
    name: MultiLangText;
    price_modifier: number;
    is_default: boolean;
  }[];
  display_order: number;
}

interface MenuItemSummary {
  id: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  price: number;
  imageUrl?: string;
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;
  spiceLevel: number;
  customizations: ProductCustomization[];
  isFeatured: boolean;
  isNew: boolean;
  displayOrder: number;
}

interface MenuCategoryWithItems {
  id: string;
  slug: string;
  name: MultiLangText;
  icon?: string;
  displayOrder: number;
  items: MenuItemSummary[];
}

interface MerchantMenuView {
  merchantSlug: string;
  merchantName: string;
  logoUrl?: string;
  primaryColor: string;
  currency: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  wifiEnabled: boolean;
  wifiSsid?: string;
  categories: MenuCategoryWithItems[];
}

// Mock data - in production this comes from the repository
const mockMenuData: MerchantMenuView = {
  merchantSlug: 'demo-cafe',
  merchantName: 'Demo Café',
  logoUrl: '/images/merchants/demo-cafe-logo.png',
  primaryColor: '#2d5016',
  currency: 'VND',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'vi', 'ko'],
  wifiEnabled: true,
  wifiSsid: 'Demo_Guest_WiFi',
  categories: [
    {
      id: 'cat-uuid-001',
      slug: 'hot-coffee',
      name: { en: 'Hot Coffee', it: 'Caffè Caldo', vi: 'Cà phê nóng' },
      icon: '☕',
      displayOrder: 1,
      items: [
        {
          id: 'item-uuid-001',
          slug: 'espresso',
          name: { en: 'Espresso', it: 'Espresso', vi: 'Espresso' },
          description: {
            en: 'Rich and bold single shot of espresso',
            it: 'Espresso singolo ricco e intenso',
            vi: 'Một shot espresso đậm đà',
          },
          price: 35000,
          imageUrl: '/images/menu/espresso.jpg',
          allergens: {},
          intolerances: { caffeine: true },
          dietaryFlags: { vegan: true, vegetarian: true, gluten_free: true, dairy_free: true },
          spiceLevel: 0,
          customizations: [
            {
              id: 'shot-type',
              type: 'radio',
              name: { en: 'Shot Type', it: 'Tipo Shot', vi: 'Loại Shot' },
              required: true,
              options: [
                {
                  id: 'single',
                  name: { en: 'Single', it: 'Singolo', vi: 'Đơn' },
                  price_modifier: 0,
                  is_default: true,
                },
                {
                  id: 'double',
                  name: { en: 'Double', it: 'Doppio', vi: 'Đôi' },
                  price_modifier: 15000,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
          ],
          isFeatured: false,
          isNew: false,
          displayOrder: 1,
        },
        {
          id: 'item-uuid-002',
          slug: 'cappuccino',
          name: { en: 'Cappuccino', it: 'Cappuccino', vi: 'Cappuccino' },
          description: {
            en: 'Espresso with steamed milk and foam',
            it: 'Espresso con latte caldo e schiuma',
            vi: 'Espresso với sữa nóng và bọt sữa',
          },
          price: 55000,
          imageUrl: '/images/menu/cappuccino.jpg',
          allergens: { milk: true },
          intolerances: { caffeine: true, lactose: true },
          dietaryFlags: { vegetarian: true, gluten_free: true },
          spiceLevel: 0,
          customizations: [
            {
              id: 'size',
              type: 'radio',
              name: { en: 'Size', it: 'Dimensione', vi: 'Kích cỡ' },
              required: true,
              options: [
                {
                  id: 'small',
                  name: { en: 'Small (8oz)', it: 'Piccolo', vi: 'Nhỏ' },
                  price_modifier: 0,
                  is_default: true,
                },
                {
                  id: 'medium',
                  name: { en: 'Medium (12oz)', it: 'Medio', vi: 'Vừa' },
                  price_modifier: 10000,
                  is_default: false,
                },
                {
                  id: 'large',
                  name: { en: 'Large (16oz)', it: 'Grande', vi: 'Lớn' },
                  price_modifier: 20000,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
            {
              id: 'milk-type',
              type: 'radio',
              name: { en: 'Milk Type', it: 'Tipo di Latte', vi: 'Loại Sữa' },
              required: true,
              options: [
                {
                  id: 'regular',
                  name: { en: 'Regular Milk', it: 'Latte Normale', vi: 'Sữa thường' },
                  price_modifier: 0,
                  is_default: true,
                },
                {
                  id: 'oat',
                  name: { en: 'Oat Milk', it: 'Latte di Avena', vi: 'Sữa yến mạch' },
                  price_modifier: 15000,
                  is_default: false,
                },
                {
                  id: 'almond',
                  name: { en: 'Almond Milk', it: 'Latte di Mandorla', vi: 'Sữa hạnh nhân' },
                  price_modifier: 15000,
                  is_default: false,
                },
                {
                  id: 'soy',
                  name: { en: 'Soy Milk', it: 'Latte di Soia', vi: 'Sữa đậu nành' },
                  price_modifier: 10000,
                  is_default: false,
                },
              ],
              display_order: 2,
            },
          ],
          isFeatured: true,
          isNew: false,
          displayOrder: 2,
        },
      ],
    },
    {
      id: 'cat-uuid-002',
      slug: 'iced-coffee',
      name: { en: 'Iced Coffee', it: 'Caffè Freddo', vi: 'Cà phê đá' },
      icon: '🧊',
      displayOrder: 2,
      items: [
        {
          id: 'item-uuid-004',
          slug: 'vietnamese-iced-coffee',
          name: {
            en: 'Vietnamese Iced Coffee',
            it: 'Caffè Vietnamita Ghiacciato',
            vi: 'Cà phê sữa đá',
          },
          description: {
            en: 'Traditional Vietnamese coffee with condensed milk over ice',
            it: 'Caffè vietnamita tradizionale con latte condensato su ghiaccio',
            vi: 'Cà phê Việt Nam truyền thống với sữa đặc và đá',
          },
          price: 45000,
          imageUrl: '/images/menu/vietnamese-iced-coffee.jpg',
          allergens: { milk: true },
          intolerances: { caffeine: true, lactose: true },
          dietaryFlags: { vegetarian: true, gluten_free: true },
          spiceLevel: 0,
          customizations: [
            {
              id: 'sweetness',
              type: 'radio',
              name: { en: 'Sweetness', it: 'Dolcezza', vi: 'Độ ngọt' },
              required: true,
              options: [
                {
                  id: 'normal',
                  name: { en: 'Normal', it: 'Normale', vi: 'Bình thường' },
                  price_modifier: 0,
                  is_default: true,
                },
                {
                  id: 'less',
                  name: { en: 'Less Sweet', it: 'Meno Dolce', vi: 'Ít ngọt' },
                  price_modifier: 0,
                  is_default: false,
                },
                {
                  id: 'extra',
                  name: { en: 'Extra Sweet', it: 'Extra Dolce', vi: 'Ngọt hơn' },
                  price_modifier: 0,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
          ],
          isFeatured: true,
          isNew: false,
          displayOrder: 1,
        },
        {
          id: 'item-uuid-005',
          slug: 'coconut-cold-brew',
          name: {
            en: 'Coconut Cold Brew',
            it: 'Cold Brew al Cocco',
            vi: 'Cold Brew Dừa',
          },
          description: {
            en: 'Smooth cold brew coffee with creamy coconut milk',
            it: 'Cold brew delicato con latte di cocco cremoso',
            vi: 'Cold brew mịn màng với sữa dừa béo ngậy',
          },
          price: 65000,
          imageUrl: '/images/menu/coconut-cold-brew.jpg',
          allergens: {},
          intolerances: { caffeine: true },
          dietaryFlags: { vegan: true, vegetarian: true, gluten_free: true, dairy_free: true },
          spiceLevel: 0,
          customizations: [],
          isFeatured: false,
          isNew: true,
          displayOrder: 2,
        },
      ],
    },
    {
      id: 'cat-uuid-003',
      slug: 'food',
      name: { en: 'Food', it: 'Cibo', vi: 'Đồ ăn' },
      icon: '🍽️',
      displayOrder: 3,
      items: [
        {
          id: 'item-uuid-007',
          slug: 'avocado-toast',
          name: {
            en: 'Avocado Toast',
            it: 'Toast con Avocado',
            vi: 'Bánh mì Bơ',
          },
          description: {
            en: 'Sourdough toast with smashed avocado, cherry tomatoes, and poached egg',
            it: 'Toast con lievito madre, avocado schiacciato, pomodorini e uovo in camicia',
            vi: 'Bánh mì nướng với bơ nghiền, cà chua bi và trứng chần',
          },
          price: 95000,
          imageUrl: '/images/menu/avocado-toast.jpg',
          allergens: { gluten: true, eggs: true, tomato: true },
          intolerances: {},
          dietaryFlags: { vegetarian: true },
          spiceLevel: 0,
          customizations: [
            {
              id: 'extras',
              type: 'checkbox',
              name: { en: 'Add Extras', it: 'Aggiungi Extra', vi: 'Thêm Topping' },
              required: false,
              max_selections: 3,
              options: [
                {
                  id: 'bacon',
                  name: { en: 'Bacon', it: 'Pancetta', vi: 'Thịt xông khói' },
                  price_modifier: 30000,
                  is_default: false,
                },
                {
                  id: 'smoked-salmon',
                  name: { en: 'Smoked Salmon', it: 'Salmone Affumicato', vi: 'Cá hồi xông khói' },
                  price_modifier: 45000,
                  is_default: false,
                },
                {
                  id: 'feta',
                  name: { en: 'Feta Cheese', it: 'Formaggio Feta', vi: 'Phô mai Feta' },
                  price_modifier: 20000,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
          ],
          isFeatured: true,
          isNew: false,
          displayOrder: 1,
        },
        {
          id: 'item-uuid-009',
          slug: 'spicy-kimchi-toast',
          name: {
            en: 'Spicy Kimchi Toast',
            it: 'Toast al Kimchi Piccante',
            vi: 'Bánh mì Kim chi Cay',
          },
          description: {
            en: 'Crispy toast topped with homemade kimchi, fried egg, and gochujang mayo',
            it: 'Toast croccante con kimchi fatto in casa, uovo fritto e maionese gochujang',
            vi: 'Bánh mì giòn với kimchi tự làm, trứng chiên và sốt gochujang',
          },
          price: 85000,
          imageUrl: '/images/menu/kimchi-toast.jpg',
          allergens: { gluten: true, eggs: true, soybeans: true, sesame: true, chili_pepper: true },
          intolerances: { fodmap: true, histamine: true },
          dietaryFlags: { vegetarian: true },
          spiceLevel: 3,
          customizations: [
            {
              id: 'spice-level',
              type: 'radio',
              name: { en: 'Spice Level', it: 'Livello Piccantezza', vi: 'Độ cay' },
              required: true,
              options: [
                {
                  id: 'mild',
                  name: { en: 'Mild 🌶️', it: 'Leggero 🌶️', vi: 'Ít cay 🌶️' },
                  price_modifier: 0,
                  is_default: false,
                },
                {
                  id: 'medium',
                  name: { en: 'Medium 🌶️🌶️', it: 'Medio 🌶️🌶️', vi: 'Cay vừa 🌶️🌶️' },
                  price_modifier: 0,
                  is_default: true,
                },
                {
                  id: 'hot',
                  name: { en: 'Hot 🌶️🌶️🌶️', it: 'Piccante 🌶️🌶️🌶️', vi: 'Cay 🌶️🌶️🌶️' },
                  price_modifier: 0,
                  is_default: false,
                },
                {
                  id: 'extra-hot',
                  name: { en: 'Extra Hot 🔥', it: 'Extra Piccante 🔥', vi: 'Siêu cay 🔥' },
                  price_modifier: 0,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
          ],
          isFeatured: false,
          isNew: true,
          displayOrder: 2,
        },
      ],
    },
    {
      id: 'cat-uuid-005',
      slug: 'smoothies',
      name: { en: 'Smoothies & Wellness', it: 'Frullati & Benessere', vi: 'Sinh tố & Sức khỏe' },
      icon: '🥤',
      displayOrder: 5,
      items: [
        {
          id: 'item-uuid-006',
          slug: 'green-power-smoothie',
          name: {
            en: 'Green Power Smoothie',
            it: 'Frullato Green Power',
            vi: 'Sinh tố Năng lượng Xanh',
          },
          description: {
            en: 'Spinach, banana, mango, and chia seeds blended with coconut water',
            it: 'Spinaci, banana, mango e semi di chia con acqua di cocco',
            vi: 'Rau bina, chuối, xoài và hạt chia xay với nước dừa',
          },
          price: 75000,
          imageUrl: '/images/menu/green-smoothie.jpg',
          allergens: { banana: true, mango: true },
          intolerances: {},
          dietaryFlags: { vegan: true, vegetarian: true, gluten_free: true, dairy_free: true },
          spiceLevel: 0,
          customizations: [
            {
              id: 'boost',
              type: 'checkbox',
              name: { en: 'Add Boost', it: 'Aggiungi Boost', vi: 'Thêm Boost' },
              required: false,
              max_selections: 3,
              options: [
                {
                  id: 'protein',
                  name: { en: 'Protein (+20g)', it: 'Proteine (+20g)', vi: 'Protein (+20g)' },
                  price_modifier: 20000,
                  is_default: false,
                },
                {
                  id: 'spirulina',
                  name: { en: 'Spirulina', it: 'Spirulina', vi: 'Tảo xoắn' },
                  price_modifier: 15000,
                  is_default: false,
                },
                {
                  id: 'collagen',
                  name: { en: 'Collagen', it: 'Collagene', vi: 'Collagen' },
                  price_modifier: 25000,
                  is_default: false,
                },
              ],
              display_order: 1,
            },
          ],
          isFeatured: true,
          isNew: false,
          displayOrder: 1,
        },
      ],
    },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ merchantSlug: string }> }
) {
  try {
    const resolvedParams = await params;
    const merchantSlug = resolvedParams.merchantSlug;

    // In production, fetch from repository:
    // const menu = await menuRepository.getFullMenu(merchantSlug);

    // For now, return mock data if slug matches
    if (merchantSlug !== 'demo-cafe') {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Merchant not found' } },
        { status: 404 }
      );
    }

    // Support query params for filtering
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const language = searchParams.get('lang') || 'en';

    const response = { ...mockMenuData };

    // Filter by category if specified
    if (categorySlug) {
      response.categories = response.categories.filter((cat) => cat.slug === categorySlug);
    }

    // Add CORS headers for PWA access
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('Error in GET /api/menu/[merchantSlug]:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
