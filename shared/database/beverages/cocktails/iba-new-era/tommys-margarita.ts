/**
 * IBA New Era Drinks: Tommy's Margarita
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tommysMargarita: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  slug: 'tommys-margarita',
  stable_key: 'f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',

  name: {
    en: 'Tommy\'s Margarita',
    it: 'Tommy\'s Margarita',
    vi: 'Tommy\'s Margarita',
    ko: '토미스 마가리타',
    ja: 'トミーズマルガリータ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'tequila', 'agave', 'citrus', 'modern-classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refined variation of the classic Margarita that replaces triple sec with agave nectar. This simpler, purer version showcases the tequila\'s flavor and has become a modern classic.',
    it: 'Una variazione raffinata della classica Margarita che sostituisce il triple sec con nettare di agave. Questa versione più semplice e pura mette in mostra il sapore della tequila ed è diventata un classico moderno.',
    vi: 'Một biến thể tinh tế của Margarita cổ điển thay thế triple sec bằng mật agave. Phiên bản đơn giản hơn, thuần khiết hơn này làm nổi bật hương vị tequila và đã trở thành cocktail hiện đại cổ điển.',
  },

  history: {
    created_year: '1990',
    origin: {
      city: 'San Francisco',
      bar: 'Tommy\'s Mexican Restaurant',
      country: 'USA',
    },
    creator: {
      name: 'Julio Bermejo',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1990 by Julio Bermejo at his family\'s Tommy\'s Mexican Restaurant in San Francisco. Bermejo, a tequila advocate, wanted to create a Margarita that better showcased 100% agave tequila. By replacing orange liqueur with agave nectar, he created a cleaner, more tequila-forward version that gained worldwide recognition. The drink helped launch the premium tequila movement and established Tommy\'s as a tequila destination.',
      it: 'Creato nel 1990 da Julio Bermejo al ristorante messicano Tommy\'s della sua famiglia a San Francisco. Bermejo, un sostenitore della tequila, voleva creare una Margarita che mettesse meglio in mostra la tequila 100% agave. Sostituendo il liquore all\'arancia con nettare di agave, creò una versione più pulita e più incentrata sulla tequila che ottenne riconoscimento mondiale. La bevanda ha contribuito a lanciare il movimento della tequila premium e ha stabilito Tommy\'s come destinazione per la tequila.',
      vi: 'Được tạo ra năm 1990 bởi Julio Bermejo tại nhà hàng Mexico của gia đình ông Tommy\'s ở San Francisco. Bermejo, một người ủng hộ tequila, muốn tạo ra một Margarita thể hiện tốt hơn tequila 100% agave. Bằng cách thay thế rượu mùi cam bằng mật agave, ông đã tạo ra một phiên bản sạch hơn, tập trung vào tequila hơn và đạt được sự công nhận trên toàn thế giới. Thức uống đã giúp khởi động phong trào tequila cao cấp và thiết lập Tommy\'s như một điểm đến tequila.',
    },
    named_after: {
      en: 'Named after Tommy\'s Mexican Restaurant in San Francisco where it was created.',
      it: 'Prende il nome dal ristorante messicano Tommy\'s a San Francisco dove fu creato.',
      vi: 'Được đặt theo tên nhà hàng Mexico Tommy\'s ở San Francisco nơi nó được tạo ra.',
    },
  },

  taste: {
    profile: ['agave', 'citrus', 'clean'],
    description: {
      en: 'Pure agave sweetness from tequila and nectar, bright lime tartness, and clean finish. More tequila-forward than traditional Margarita with no orange notes.',
      it: 'Dolcezza pura dell\'agave dalla tequila e dal nettare, acidità brillante del lime e finale pulito. Più incentrato sulla tequila rispetto alla Margarita tradizionale senza note di arancia.',
      vi: 'Vị ngọt agave thuần khiết từ tequila và mật, vị chua chanh tươi mát và kết thúc trong trẻo. Tập trung vào tequila hơn Margarita truyền thống không có hương vị cam.',
    },
    first_impression: {
      en: 'Clean agave and bright lime with tequila character',
      it: 'Agave pulito e lime brillante con carattere di tequila',
      vi: 'Agave trong trẻo và chanh tươi mát với đặc tính tequila',
    },
    finish: {
      en: 'Long, clean finish with lingering agave sweetness',
      it: 'Finale lungo e pulito con dolcezza persistente dell\'agave',
      vi: 'Kết thúc dài, trong trẻo với vị ngọt agave kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tequila strength, agave sweetness, and lime tartness',
      it: 'Perfettamente bilanciato tra la forza della tequila, la dolcezza dell\'agave e l\'acidità del lime',
      vi: 'Cân bằng hoàn hảo giữa độ mạnh tequila, vị ngọt agave và vị chua chanh',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['casual', 'party', 'mexican_dinner', 'taco_night'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Excellent with Mexican cuisine, tacos, ceviche, guacamole, or grilled meats.',
      it: 'Eccellente con cucina messicana, tacos, ceviche, guacamole, o carni alla griglia.',
      vi: 'Tuyệt vời với ẩm thực Mexico, tacos, ceviche, guacamole hoặc thịt nướng.',
    },
    ideal_for: {
      en: 'Perfect for tequila purists and those who want to taste quality agave spirits. Ideal for anyone seeking a cleaner, more authentic Margarita.',
      it: 'Perfetto per i puristi della tequila e per chi vuole assaggiare distillati di agave di qualità. Ideale per chiunque cerchi una Margarita più pulita e autentica.',
      vi: 'Hoàn hảo cho người theo chủ nghĩa thuần túy tequila và những ai muốn nếm rượu agave chất lượng. Lý tưởng cho bất kỳ ai tìm kiếm Margarita sạch hơn, chân thực hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_BLANCO',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Blanco tequila', it: 'Tequila blanco', vi: 'Tequila blanco' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_AGAVE_NECTAR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Agave nectar', it: 'Nettare di agave', vi: 'Mật agave' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake all ingredients with ice. Strain into a rocks glass filled with ice. Optionally rim with salt.',
    it: 'Shakerare tutti gli ingredienti con ghiaccio. Filtrare in un bicchiere rocks pieno di ghiaccio. Opzionalmente bordare con sale.',
    vi: 'Lắc tất cả nguyên liệu với đá. Lọc vào ly rocks đầy đá. Tùy chọn viền muối.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lime wheel (optional salt rim)',
    it: 'Rondella di lime (bordo di sale opzionale)',
    vi: 'Lát chanh (viền muối tùy chọn)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_BLANCO'],

  flavor_profile: ['agave', 'citrus', 'clean'],

  abv_estimate: 20,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all-season'],
  occasion_tags: ['casual', 'party', 'mexican_dinner'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: 'Use 100% agave tequila for best results. Agave nectar is essential - don\'t substitute with simple syrup. Salt rim is optional but traditional.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/tommys-margarita/',
    note: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
