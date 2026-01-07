/**
 * IBA Contemporary Classics: French 75
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const french75: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e',
  slug: 'french-75',
  stable_key: 'french_75_iba_contemporary_2025',

  name: {
    en: 'French 75',
    it: 'French 75',
    vi: 'French 75',
    ko: '프렌치 75',
    ja: 'フレンチ75',
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
    en: 'A potent, elegant cocktail combining gin, lemon juice, sugar, and champagne. Named after the French 75mm field gun for its powerful kick, this drink is both sophisticated and dangerously smooth.',
    it: 'Un cocktail potente ed elegante che combina gin, succo di limone, zucchero e champagne. Chiamato così in onore del cannone da campo francese da 75mm per il suo potente calcio, questo drink è sia sofisticato che pericolosamente morbido.',
    vi: 'Một loại cocktail mạnh mẽ, thanh lịch kết hợp gin, nước chanh, đường và champagne. Được đặt tên theo khẩu pháo dã chiến 75mm của Pháp vì cú đá mạnh mẽ, thức uống này vừa tinh tế vừa mượt mà nguy hiểm.',
  },

  history: {
    created_year: '1915',
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: 'Created around 1915 at Harry\'s New York Bar in Paris, though some credit the Buck\'s Club in London. The drink was named after the French 75mm field gun used in WWI, suggesting its powerful alcoholic "kick." It gained popularity among WWI soldiers and became a symbol of Parisian café culture. The drink has remained a classic celebration cocktail for over a century.',
      it: "Creato intorno al 1915 all'Harry's New York Bar di Parigi, anche se alcuni attribuiscono il merito al Buck's Club di Londra. Il drink fu chiamato così in onore del cannone da campo francese da 75mm usato nella Prima Guerra Mondiale, suggerendo il suo potente \"calcio\" alcolico. Ha guadagnato popolarità tra i soldati della Prima Guerra Mondiale ed è diventato un simbolo della cultura dei caffè parigini. Il drink è rimasto un classico cocktail di celebrazione per oltre un secolo.",
      vi: 'Được tạo ra vào khoảng năm 1915 tại Harry\'s New York Bar ở Paris, mặc dù một số người ghi công cho Buck\'s Club ở London. Thức uống được đặt tên theo khẩu pháo dã chiến 75mm của Pháp được sử dụng trong Thế chiến I, gợi ý "cú đá" rượu mạnh mẽ của nó. Nó trở nên phổ biến trong số binh lính Thế chiến I và trở thành biểu tượng của văn hóa quán cà phê Paris. Thức uống vẫn là một cocktail lễ kỷ niệm kinh điển trong hơn một thế kỷ.',
    },
    named_after: {
      en: 'Named after the French 75mm field gun, one of the most famous artillery pieces of WWI, for its powerful alcoholic kick.',
      it: "Prende il nome dal cannone da campo francese da 75mm, uno dei pezzi d'artiglieria più famosi della Prima Guerra Mondiale, per il suo potente calcio alcolico.",
      vi: 'Được đặt tên theo khẩu pháo dã chiến 75mm của Pháp, một trong những khẩu pháo nổi tiếng nhất của Thế chiến I, vì cú đá rượu mạnh mẽ của nó.',
    },
  },

  taste: {
    profile: ['citrus', 'bubbly', 'elegant', 'strong'],
    description: {
      en: 'Bright, effervescent, and deceptively strong. Fresh lemon provides tartness, sugar balances acidity, gin adds botanical complexity, and champagne brings elegant bubbles. A perfect marriage of sour and sparkle.',
      it: "Brillante, effervescente e ingannevolmente forte. Il limone fresco fornisce acidità, lo zucchero bilancia l'acidità, il gin aggiunge complessità botanica e lo champagne porta eleganti bollicine. Un perfetto matrimonio di acido e scintillante.",
      vi: 'Tươi sáng, sủi bọt và mạnh đánh lừa. Chanh tươi cung cấp vị chua, đường cân bằng độ chua, gin thêm độ phức tạp thực vật và champagne mang đến bong bóng thanh lịch. Một kết hợp hoàn hảo của chua và lấp lánh.',
    },
    first_impression: {
      en: 'Bright lemon acidity with champagne bubbles',
      it: 'Acidità brillante di limone con bollicine di champagne',
      vi: 'Độ chua chanh tươi sáng với bong bóng champagne',
    },
    finish: {
      en: 'Clean, crisp finish with lingering botanical gin notes',
      it: 'Finale pulito e fresco con note persistenti di gin botanico',
      vi: 'Kết thúc sạch, sắc nét với hương gin thực vật kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tart lemon and sweet champagne',
      it: 'Perfettamente bilanciato tra limone aspro e champagne dolce',
      vi: 'Cân bằng hoàn hảo giữa chanh chua và champagne ngọt',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening'],
    occasions: ['celebration', 'wedding', 'formal_event', 'brunch'],
    seasons: ['spring', 'summer', 'all_year'],
    food_pairings: {
      en: 'Excellent with oysters, caviar, seafood, light appetizers, or French cuisine. Perfect for toasting celebrations.',
      it: 'Eccellente con ostriche, caviale, frutti di mare, antipasti leggeri o cucina francese. Perfetto per brindare alle celebrazioni.',
      vi: 'Tuyệt vời với hàu, trứng cá muối, hải sản, món khai vị nhẹ hoặc ẩm thực Pháp. Hoàn hảo để nâng ly trong lễ kỷ niệm.',
    },
    ideal_for: {
      en: "Perfect for celebrations, weddings, and formal events. Great for those who love champagne cocktails with a citrus twist. Beware - it's stronger than it tastes!",
      it: 'Perfetto per celebrazioni, matrimoni ed eventi formali. Ottimo per chi ama i cocktail di champagne con una svolta agli agrumi. Attenzione - è più forte di quanto sembri!',
      vi: 'Hoàn hảo cho lễ kỷ niệm, đám cưới và sự kiện chính thức. Tuyệt vời cho những ai yêu cocktail champagne với hương chanh. Cẩn thận - nó mạnh hơn hương vị!',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Champagne', it: 'Champagne', vi: 'Champagne' },
      notes: { en: 'chilled', it: 'freddo', vi: 'đã làm lạnh' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour gin, lemon juice, and simple syrup into shaker with ice. Shake well. Strain into champagne flute. Top with chilled champagne. Garnish with lemon twist.',
    it: 'Versare gin, succo di limone e sciroppo semplice nello shaker con ghiaccio. Shakerare bene. Filtrare in una flûte di champagne. Completare con champagne freddo. Guarnire con scorza di limone.',
    vi: 'Đổ gin, nước chanh và siro đường vào shaker với đá. Lắc kỹ. Lọc vào ly champagne flute. Đổ đầy champagne lạnh. Trang trí với vỏ chanh xoắn.',
  },

  glass: 'Champagne flute or Coupe',

  garnish: {
    en: 'Lemon twist',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN', 'ING_CHAMPAGNE'],

  flavor_profile: ['citrus', 'bubbly', 'elegant', 'strong'],

  abv_estimate: 18,

  calories_estimate: 140,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['celebration', 'wedding', 'formal_event', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['french-76', 'french-95'],

  notes_for_staff:
    'Shake gin/lemon/syrup first, then strain and top with champagne - don\'t shake champagne. Use quality champagne or good sparkling wine. Can use cognac instead of gin for a "French 125". Strong drink - warn customers.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 82,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/french-75/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
