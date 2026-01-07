/**
 * IBA Contemporary Classics: Champagne Cocktail
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const champagneCocktail: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  slug: 'champagne-cocktail',
  stable_key: 'champagne_cocktail_iba_contemporary_2025',

  name: {
    en: 'Champagne Cocktail',
    it: 'Champagne Cocktail',
    vi: 'Champagne Cocktail',
    ko: '샴페인 칵테일',
    ja: 'シャンパン・カクテル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'champagne', 'elegant', 'celebratory', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant classic combining champagne with a sugar cube, Angostura bitters, and cognac. Simple yet sophisticated, this drink elevates champagne with subtle sweetness and aromatic complexity. Perfect for celebrations.',
    it: 'Un classico elegante che combina champagne con una zolletta di zucchero, Angostura bitters e cognac. Semplice ma sofisticato, questo drink eleva lo champagne con dolcezza sottile e complessità aromatica. Perfetto per le celebrazioni.',
    vi: 'Một tác phẩm kinh điển thanh lịch kết hợp champagne với một viên đường, Angostura bitters và cognac. Đơn giản nhưng tinh tế, thức uống này nâng tầm champagne với vị ngọt tinh tế và độ phức tạp thơm ngát. Hoàn hảo cho lễ kỷ niệm.',
  },

  history: {
    created_year: '1862',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Champagne Cocktail first appeared in Jerry Thomas\'s 1862 "How to Mix Drinks" bartending guide, making it one of the oldest recorded cocktails. It gained popularity in high society and became synonymous with elegance and celebration. The drink was famously enjoyed in the film "Casablanca" (1942) and has remained a symbol of sophistication ever since.',
      it: 'Il Champagne Cocktail apparve per la prima volta nella guida di bartending "How to Mix Drinks" di Jerry Thomas del 1862, rendendolo uno dei cocktail più antichi registrati. Ha guadagnato popolarità nell\'alta società ed è diventato sinonimo di eleganza e celebrazione. Il drink è stato famosamente gustato nel film "Casablanca" (1942) ed è rimasto un simbolo di sofisticazione da allora.',
      vi: 'Champagne Cocktail lần đầu tiên xuất hiện trong hướng dẫn bartending "How to Mix Drinks" của Jerry Thomas năm 1862, khiến nó trở thành một trong những cocktail được ghi nhận lâu đời nhất. Nó trở nên phổ biến trong xã hội thượng lưu và trở thành từ đồng nghĩa với sự thanh lịch và lễ kỷ niệm. Thức uống được thưởng thức nổi tiếng trong bộ phim "Casablanca" (1942) và vẫn là biểu tượng của sự tinh tế kể từ đó.',
    },
    named_after: {
      en: 'Named for its primary ingredient, champagne.',
      it: 'Prende il nome dal suo ingrediente principale, lo champagne.',
      vi: 'Được đặt tên theo nguyên liệu chính của nó, champagne.',
    },
  },

  taste: {
    profile: ['bubbly', 'sweet', 'aromatic', 'elegant'],
    description: {
      en: 'Elegant and effervescent. The sugar cube slowly dissolves, creating a gradient of sweetness. Angostura bitters add aromatic spice, cognac provides depth, and champagne delivers crisp bubbles. A refined drinking experience.',
      it: "Elegante ed effervescente. La zolletta di zucchero si scioglie lentamente, creando un gradiente di dolcezza. Gli Angostura bitters aggiungono spezie aromatiche, il cognac fornisce profondità e lo champagne offre bollicine croccanti. Un'esperienza di bevuta raffinata.",
      vi: 'Thanh lịch và sủi bọt. Viên đường tan chậm, tạo ra độ dốc của vị ngọt. Angostura bitters thêm gia vị thơm, cognac cung cấp chiều sâu và champagne mang đến bong bóng sắc nét. Một trải nghiệm uống tinh tế.',
    },
    first_impression: {
      en: 'Aromatic bitters and champagne bubbles',
      it: 'Bitters aromatici e bollicine di champagne',
      vi: 'Bitters thơm và bong bóng champagne',
    },
    finish: {
      en: 'Clean, crisp finish with lingering aromatic notes',
      it: 'Finale pulito e fresco con note aromatiche persistenti',
      vi: 'Kết thúc sạch, sắc nét với hương thơm kéo dài',
    },
    balance: {
      en: 'Well-balanced between champagne dryness and subtle sweetness',
      it: 'Ben bilanciato tra secchezza dello champagne e dolcezza sottile',
      vi: 'Cân bằng tốt giữa độ khô của champagne và vị ngọt tinh tế',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening'],
    occasions: ['celebration', 'wedding', 'new_years', 'formal_event'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect with oysters, caviar, canapés, smoked salmon, or light appetizers. Excellent for toasting special occasions.',
      it: 'Perfetto con ostriche, caviale, canapé, salmone affumicato o antipasti leggeri. Eccellente per brindare in occasioni speciali.',
      vi: 'Hoàn hảo với hàu, trứng cá muối, canapés, cá hồi hun khói hoặc món khai vị nhẹ. Tuyệt vời để nâng ly trong các dịp đặc biệt.',
    },
    ideal_for: {
      en: "Perfect for celebrations, weddings, New Year's Eve, and formal events. Ideal for those who appreciate elegant, classic cocktails.",
      it: 'Perfetto per celebrazioni, matrimoni, Capodanno ed eventi formali. Ideale per chi apprezza cocktail eleganti e classici.',
      vi: 'Hoàn hảo cho lễ kỷ niệm, đám cưới, đêm giao thừa và sự kiện chính thức. Lý tưởng cho những ai đánh giá cao cocktail thanh lịch, cổ điển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Champagne', it: 'Champagne', vi: 'Champagne' },
      notes: { en: 'chilled', it: 'freddo', vi: 'đã làm lạnh' },
    },
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
    {
      ingredient_id: 'ING_SUGAR_CUBE',
      quantity: { amount: 1, unit: 'cube' },
      display_name: { en: 'Sugar cube', it: 'Zolletta di zucchero', vi: 'Viên đường' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Place sugar cube in a chilled champagne flute. Saturate the sugar cube with Angostura bitters. Add cognac. Top with chilled champagne. Garnish with orange twist or lemon twist.',
    it: "Mettere la zolletta di zucchero in una flûte di champagne raffreddata. Saturare la zolletta con Angostura bitters. Aggiungere il cognac. Completare con champagne freddo. Guarnire con scorza d'arancia o limone.",
    vi: 'Đặt viên đường vào ly champagne flute đã làm lạnh. Thấm viên đường với Angostura bitters. Thêm cognac. Đổ đầy champagne lạnh. Trang trí với vỏ cam hoặc chanh xoắn.',
  },

  glass: 'Champagne flute',

  garnish: {
    en: 'Orange twist or lemon twist',
    it: "Scorza d'arancia o limone",
    vi: 'Vỏ cam hoặc chanh xoắn',
  },

  ice: 'none',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CHAMPAGNE', 'ING_COGNAC'],

  flavor_profile: ['bubbly', 'sweet', 'aromatic', 'elegant'],

  abv_estimate: 13,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'histamine'],
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
  season_tags: ['all_year'],
  occasion_tags: ['celebration', 'wedding', 'new_years', 'formal_event'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['seelbach-cocktail', 'champagne-royale'],

  notes_for_staff:
    'Use quality champagne or good sparkling wine. Saturate sugar cube fully with bitters for best flavor. Build directly in flute to preserve bubbles. Can substitute brandy for cognac if needed.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/champagne-cocktail/',
    notes: 'IBA Official Recipe. First recorded in Jerry Thomas 1862.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
