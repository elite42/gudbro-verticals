/**
 * IBA New Era Drinks: Russian Spring Punch
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const russianSpringPunch: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
  slug: 'russian-spring-punch',
  stable_key: 'e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',

  name: {
    en: 'Russian Spring Punch',
    it: 'Russian Spring Punch',
    vi: 'Russian Spring Punch',
    ko: '러시안 스프링 펀치',
    ja: 'ロシアンスプリングパンチ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'vodka', 'champagne', 'berry', 'sparkling'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated vodka-based punch combining fresh lemon, crème de cassis, and Champagne. This elegant sparkling cocktail features beautiful berry flavors and a refreshing effervescence.',
    it: "Un punch sofisticato a base di vodka che combina limone fresco, crème de cassis e Champagne. Questo elegante cocktail frizzante presenta bellissimi sapori di bacche e un'effervescenza rinfrescante.",
    vi: 'Một loại punch tinh tế dựa trên vodka kết hợp chanh tươi, crème de cassis và Champagne. Cocktail có ga thanh lịch này có hương vị quả mọng đẹp mắt và độ sủi bọt sảng khoái.',
  },

  history: {
    created_year: '1984',
    origin: {
      city: 'London',
      bar: "Trader Vic's",
      country: 'UK',
    },
    creator: {
      name: 'Dick Bradsell',
      profession: 'bartender',
    },
    story: {
      en: "Created by legendary bartender Dick Bradsell in 1984 at Trader Vic's in London. Bradsell wanted to create a sophisticated vodka cocktail with Champagne that would appeal to elegant drinkers. The drink combines the strength of vodka with the elegance of Champagne and the fruity depth of cassis. It became one of Bradsell's signature creations and helped establish his reputation as one of the most influential bartenders of the modern cocktail era.",
      it: "Creato dal leggendario barman Dick Bradsell nel 1984 al Trader Vic's di Londra. Bradsell voleva creare un cocktail vodka sofisticato con Champagne che avrebbe attratto bevitori eleganti. La bevanda combina la forza della vodka con l'eleganza dello Champagne e la profondità fruttata del cassis. Divenne una delle creazioni firma di Bradsell e contribuì a stabilire la sua reputazione come uno dei barman più influenti dell'era dei cocktail moderni.",
      vi: "Được tạo ra bởi bartender huyền thoại Dick Bradsell năm 1984 tại Trader Vic's ở London. Bradsell muốn tạo ra một cocktail vodka tinh tế với Champagne sẽ thu hút những người uống thanh lịch. Thức uống kết hợp sức mạnh của vodka với sự thanh lịch của Champagne và độ sâu trái cây của cassis. Nó trở thành một trong những sáng tạo đặc trưng của Bradsell và giúp thiết lập danh tiếng của ông như một trong những bartender có ảnh hưởng nhất của thời đại cocktail hiện đại.",
    },
    named_after: {
      en: 'Named "Russian" for vodka, "Spring" for its fresh, seasonal character, and "Punch" for its complex, multi-ingredient nature.',
      it: 'Chiamato "Russian" per la vodka, "Spring" per il suo carattere fresco e stagionale, e "Punch" per la sua natura complessa e multi-ingrediente.',
      vi: 'Được đặt tên "Russian" cho vodka, "Spring" cho tính cách tươi mát theo mùa, và "Punch" cho bản chất phức tạp, nhiều nguyên liệu.',
    },
  },

  taste: {
    profile: ['sparkling', 'fruity', 'elegant'],
    description: {
      en: 'Bright lemon tartness balanced with sweet-tart cassis, vodka smoothness, and Champagne elegance. Complex berry flavors with refreshing bubbles.',
      it: 'Acidità brillante del limone bilanciata con cassis dolce-aspro, morbidezza della vodka ed eleganza dello Champagne. Sapori complessi di bacche con bollicine rinfrescanti.',
      vi: 'Vị chua chanh tươi mát cân bằng với cassis ngọt-chua, độ mượt vodka và sự thanh lịch Champagne. Hương vị quả mọng phức tạp với bong bóng sảng khoái.',
    },
    first_impression: {
      en: 'Bright citrus and berry with sparkling effervescence',
      it: 'Agrumi e bacche brillanti con effervescenza frizzante',
      vi: 'Cam quýt và quả mọng tươi sáng với độ sủi bọt',
    },
    finish: {
      en: 'Long, elegant finish with lingering berry and citrus notes',
      it: 'Finale lungo ed elegante con note persistenti di bacche e agrumi',
      vi: 'Kết thúc dài, thanh lịch với hương quả mọng và cam quýt kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between citrus tartness, berry sweetness, and Champagne elegance',
      it: 'Perfettamente bilanciato tra acidità degli agrumi, dolcezza delle bacche ed eleganza dello Champagne',
      vi: 'Cân bằng hoàn hảo giữa vị chua cam quýt, vị ngọt quả mọng và sự thanh lịch Champagne',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['celebration', 'brunch', 'garden_party', 'date_night'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with berry desserts, light seafood, smoked salmon canapés, or as a celebratory aperitif.',
      it: 'Eccellente con dessert ai frutti di bosco, pesce leggero, canapè al salmone affumicato, o come aperitivo celebrativo.',
      vi: 'Tuyệt vời với món tráng miệng quả mọng, hải sản nhẹ, canapé cá hồi hun khói, hoặc làm aperitif lễ hội.',
    },
    ideal_for: {
      en: 'Perfect for vodka and Champagne lovers seeking an elegant, fruity cocktail. Ideal for celebrations or sophisticated brunches.',
      it: 'Perfetto per gli amanti della vodka e dello Champagne che cercano un cocktail elegante e fruttato. Ideale per celebrazioni o brunch sofisticati.',
      vi: 'Hoàn hảo cho người yêu vodka và Champagne tìm kiếm cocktail thanh lịch, trái cây. Lý tưởng cho lễ kỷ niệm hoặc bữa brunch tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_CREME_DE_CASSIS',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Crème de cassis', it: 'Crème de cassis', vi: 'Crème de cassis' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Champagne', it: 'Champagne', vi: 'Champagne' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake vodka, lemon juice, crème de cassis, and simple syrup with ice. Strain into a highball glass filled with ice. Top with Champagne.',
    it: 'Shakerare vodka, succo di limone, crème de cassis e sciroppo semplice con ghiaccio. Filtrare in un bicchiere highball pieno di ghiaccio. Completare con Champagne.',
    vi: 'Lắc vodka, nước chanh, crème de cassis và siro đường với đá. Lọc vào ly highball đầy đá. Phủ Champagne lên trên.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Fresh berries and lemon slice',
    it: 'Bacche fresche e fetta di limone',
    vi: 'Quả mọng tươi và lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sparkling', 'fruity', 'elegant'],

  abv_estimate: 12,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['celebration', 'brunch', 'garden_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Add Champagne last to preserve carbonation. Fresh berries enhance presentation. Can substitute Prosecco for Champagne.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/russian-spring-punch/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
