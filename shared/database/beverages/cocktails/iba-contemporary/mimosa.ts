/**
 * IBA Contemporary Classics: Mimosa
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mimosa: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'mimosa',
  stable_key: 'mimosa_iba_contemporary_classic',

  name: {
    en: 'Mimosa',
    it: 'Mimosa',
    vi: 'Mimosa',
    ko: '미모사',
    ja: 'ミモザ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'brunch', 'celebration', 'sparkling', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant and refreshing champagne cocktail combining sparkling wine with fresh orange juice. The quintessential brunch cocktail, beloved for its simplicity and bright, effervescent character.',
    it: "Un elegante e rinfrescante cocktail a base di champagne che combina vino spumante con succo d'arancia fresco. Il cocktail per brunch per eccellenza, amato per la sua semplicità e il suo carattere brillante ed effervescente.",
    vi: 'Một cocktail champagne thanh lịch và sảng khoái kết hợp rượu vang sủi với nước cam tươi. Cocktail brunch tinh túy, được yêu thích vì sự đơn giản và tính chất sáng, sủi bọt.',
  },

  history: {
    created_year: '1925',
    origin: {
      city: 'Paris',
      bar: 'Hôtel Ritz Paris',
      country: 'France',
    },
    creator: {
      name: 'Frank Meier',
      profession: 'bartender',
    },
    story: {
      en: 'Created at the Hôtel Ritz Paris in 1925, allegedly by bartender Frank Meier. The drink was named after the mimosa flower due to its similar yellow-orange color. It became the signature drink of the Parisian elite and gained international fame as the ultimate brunch cocktail.',
      it: "Creato all'Hôtel Ritz Paris nel 1925, presumibilmente dal barman Frank Meier. La bevanda prende il nome dal fiore di mimosa per il suo simile colore giallo-arancio. Divenne la bevanda distintiva dell'élite parigina e ottenne fama internazionale come il cocktail da brunch per eccellenza.",
      vi: 'Được tạo ra tại Hôtel Ritz Paris vào năm 1925, được cho là bởi bartender Frank Meier. Thức uống được đặt tên theo hoa mimosa do màu vàng cam tương tự. Nó trở thành thức uống đặc trưng của giới thượng lưu Paris và nổi tiếng quốc tế như cocktail brunch tối thượng.',
    },
    named_after: {
      en: 'Named after the mimosa flower, which has a similar yellow-orange color to the cocktail.',
      it: 'Prende il nome dal fiore di mimosa, che ha un colore giallo-arancio simile al cocktail.',
      vi: 'Được đặt theo tên hoa mimosa, có màu vàng cam tương tự như cocktail.',
    },
  },

  taste: {
    profile: ['citrus', 'sparkling', 'refreshing'],
    description: {
      en: 'Light, bright, and effervescent. Fresh orange juice provides natural sweetness and acidity, while champagne adds sophisticated bubbles and crisp dryness. Simple yet elegant.',
      it: "Leggero, brillante ed effervescente. Il succo d'arancia fresco fornisce dolcezza naturale e acidità, mentre lo champagne aggiunge bollicine sofisticate e secchezza croccante. Semplice ma elegante.",
      vi: 'Nhẹ nhàng, sáng và sủi bọt. Nước cam tươi cung cấp vị ngọt tự nhiên và độ acid, trong khi champagne thêm bong bóng tinh tế và độ khô giòn. Đơn giản nhưng thanh lịch.',
    },
    first_impression: {
      en: 'Bright citrus and lively bubbles',
      it: 'Agrumi brillanti e bollicine vivaci',
      vi: 'Cam quýt sáng và bong bóng sống động',
    },
    finish: {
      en: 'Clean, crisp finish with lingering orange notes',
      it: 'Finale pulito e croccante con note di arancia persistenti',
      vi: 'Kết thúc sạch, giòn với hương cam kéo dài',
    },
    balance: {
      en: 'Perfect balance between champagne dryness and orange sweetness',
      it: "Equilibrio perfetto tra la secchezza dello champagne e la dolcezza dell'arancia",
      vi: 'Cân bằng hoàn hảo giữa độ khô của champagne và vị ngọt của cam',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon'],
    occasions: ['brunch', 'celebration', 'wedding', 'holiday'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with brunch dishes like eggs Benedict, French toast, pastries, and fresh fruit. Also excellent with light appetizers and seafood.',
      it: 'Perfetto con piatti da brunch come uova Benedict, French toast, pasticcini e frutta fresca. Eccellente anche con antipasti leggeri e frutti di mare.',
      vi: 'Hoàn hảo với các món brunch như trứng Benedict, bánh mì nướng kiểu Pháp, bánh ngọt và trái cây tươi. Cũng tuyệt vời với món khai vị nhẹ và hải sản.',
    },
    ideal_for: {
      en: 'Ideal for anyone who enjoys light, refreshing cocktails. The perfect choice for brunch celebrations, morning gatherings, or any occasion calling for elegance.',
      it: 'Ideale per chi ama cocktail leggeri e rinfrescanti. La scelta perfetta per brunch celebrativi, riunioni mattutine o qualsiasi occasione che richieda eleganza.',
      vi: 'Lý tưởng cho bất kỳ ai thích cocktail nhẹ, sảng khoái. Lựa chọn hoàn hảo cho brunch ăn mừng, tụ tập buổi sáng hoặc bất kỳ dịp nào cần sự thanh lịch.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 75, unit: 'ml' },
      display_name: {
        en: 'Champagne (or sparkling wine)',
        it: 'Champagne (o spumante)',
        vi: 'Champagne (hoặc rượu vang sủi)',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 75, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour orange juice into a champagne flute. Gently top with chilled champagne. Stir gently and briefly. Optionally garnish with an orange twist.',
    it: "Versare il succo d'arancia in una coppa da champagne. Completare delicatamente con champagne freddo. Mescolare delicatamente e brevemente. Guarnire opzionalmente con una scorza d'arancia.",
    vi: 'Đổ nước cam vào ly champagne flute. Nhẹ nhàng rót champagne lạnh lên trên. Kấy nhẹ và ngắn gọn. Tùy chọn trang trí với vỏ cam xoắn.',
  },

  glass: 'Champagne flute',

  garnish: {
    en: 'Orange twist (optional)',
    it: "Scorza d'arancia (opzionale)",
    vi: 'Vỏ cam xoắn (tùy chọn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CHAMPAGNE'],

  flavor_profile: ['citrus', 'sparkling', 'refreshing'],

  abv_estimate: 6,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['brunch', 'celebration', 'wedding', 'holiday'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['grand-mimosa', 'poinsettia', 'bellini'],

  notes_for_staff:
    'Always use fresh-squeezed orange juice for best results. Champagne should be well-chilled. Pour orange juice first, then top with champagne. Traditional ratio is 1:1 but can be adjusted to taste.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/mimosa/',
    notes: 'IBA Official Recipe. Historical information from Ritz Paris archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
