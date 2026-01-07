/**
 * IBA Contemporary Classics: Black Russian
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const blackRussian: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
  slug: 'black-russian',
  stable_key: 'black_russian_iba_contemporary_classic',

  name: {
    en: 'Black Russian',
    it: 'Black Russian',
    vi: 'Black Russian',
    ko: '블랙 러시안',
    ja: 'ブラックルシアン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'simple', 'coffee', 'after-dinner', 'spirit-forward'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A simple yet sophisticated cocktail combining vodka with coffee liqueur. Strong, smooth, and dangerously easy-drinking - the Black Russian is the perfect after-dinner indulgence.',
    it: 'Un cocktail semplice ma sofisticato che combina vodka con liquore al caffè. Forte, morbido e pericolosamente facile da bere - il Black Russian è la perfetta indulgenza dopo cena.',
    vi: 'Một cocktail đơn giản nhưng tinh tế kết hợp vodka với rượu mùi cà phê. Mạnh, mượt mà và nguy hiểm dễ uống - Black Russian là sự nuông chiều hoàn hảo sau bữa tối.',
  },

  history: {
    created_year: '1949',
    origin: {
      city: 'Brussels',
      bar: 'Hotel Metropole',
      country: 'Belgium',
    },
    creator: {
      name: 'Gustave Tops',
      profession: 'bartender',
    },
    story: {
      en: 'Created by bartender Gustave Tops at the Hotel Metropole in Brussels, Belgium in 1949. It was created for Perle Mesta, the U.S. Ambassador to Luxembourg. The drink gained popularity during the Cold War era, and its name reflects the Russian origins of vodka. The White Russian variation (adding cream) came later.',
      it: "Creato dal barman Gustave Tops all'Hotel Metropole di Bruxelles, Belgio nel 1949. Fu creato per Perle Mesta, l'ambasciatore statunitense in Lussemburgo. La bevanda ottenne popolarità durante l'era della Guerra Fredda, e il suo nome riflette le origini russe della vodka. La variante White Russian (aggiungendo panna) venne dopo.",
      vi: 'Được tạo ra bởi bartender Gustave Tops tại khách sạn Metropole ở Brussels, Bỉ vào năm 1949. Nó được tạo ra cho Perle Mesta, Đại sứ Mỹ tại Luxembourg. Thức uống trở nên phổ biến trong thời kỳ Chiến tranh Lạnh, và tên của nó phản ánh nguồn gốc Nga của vodka. Biến thể White Russian (thêm kem) ra đời sau đó.',
    },
    named_after: {
      en: 'Named "Black Russian" for the Russian origins of vodka and the dark color from coffee liqueur.',
      it: 'Chiamato "Black Russian" per le origini russe della vodka e il colore scuro del liquore al caffè.',
      vi: 'Được đặt tên "Black Russian" cho nguồn gốc Nga của vodka và màu đen từ rượu mùi cà phê.',
    },
  },

  taste: {
    profile: ['coffee', 'sweet', 'boozy'],
    description: {
      en: 'Rich coffee flavor with smooth vodka backbone. Kahlúa provides sweet coffee notes while vodka adds clean strength. Smooth, slightly sweet, and deceptively strong.',
      it: 'Ricco sapore di caffè con morbida base di vodka. Il Kahlúa fornisce note dolci di caffè mentre la vodka aggiunge forza pulita. Morbido, leggermente dolce e inganevolmente forte.',
      vi: 'Hương vị cà phê đậm đà với xương sống vodka mượt mà. Kahlúa cung cấp hương cà phê ngọt trong khi vodka thêm sức mạnh sạch. Mượt mà, hơi ngọt và mạnh đáng lừa.',
    },
    first_impression: {
      en: 'Sweet coffee with smooth vodka strength',
      it: 'Caffè dolce con forza morbida di vodka',
      vi: 'Cà phê ngọt với sức mạnh vodka mượt',
    },
    finish: {
      en: 'Long, warming finish with lingering coffee notes',
      it: 'Finale lungo e caldo con note di caffè persistenti',
      vi: 'Kết thúc dài, ấm áp với hương cà phê kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet coffee liqueur and clean vodka',
      it: 'Ben bilanciato tra liquore al caffè dolce e vodka pulita',
      vi: 'Cân bằng tốt giữa rượu mùi cà phê ngọt và vodka sạch',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['after-dinner', 'nightcap', 'digestivo', 'casual'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Perfect after dinner or with desserts, especially chocolate, tiramisu, or coffee-flavored sweets.',
      it: 'Perfetto dopo cena o con dessert, specialmente cioccolato, tiramisù o dolci al caffè.',
      vi: 'Hoàn hảo sau bữa tối hoặc với món tráng miệng, đặc biệt là chocolate, tiramisu hoặc đồ ngọt vị cà phê.',
    },
    ideal_for: {
      en: 'Perfect for coffee and vodka lovers seeking a simple, strong cocktail. Ideal for those who prefer spirit-forward drinks.',
      it: 'Perfetto per gli amanti del caffè e della vodka che cercano un cocktail semplice e forte. Ideale per chi preferisce drink spirit-forward.',
      vi: 'Hoàn hảo cho người yêu cà phê và vodka tìm kiếm cocktail đơn giản, mạnh. Lý tưởng cho những ai thích đồ uống hướng về rượu.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour ingredients into an old fashioned glass filled with ice cubes. Stir gently. No garnish required.',
    it: 'Versare gli ingredienti in un bicchiere old fashioned pieno di cubetti di ghiaccio. Mescolare delicatamente. Nessuna guarnizione richiesta.',
    vi: 'Đổ nguyên liệu vào ly old fashioned đầy đá viên. Khuấy nhẹ. Không cần trang trí.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['coffee', 'sweet', 'boozy'],

  abv_estimate: 28,

  calories_estimate: 220,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'caffeine'],
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
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['after-dinner', 'nightcap', 'digestivo', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['white-russian', 'dirty-russian', 'blind-russian'],

  notes_for_staff:
    'Simple two-ingredient build. The White Russian adds cream on top. Kahlúa is the traditional coffee liqueur, but any good coffee liqueur works. Can be served neat or on the rocks. Deceptively strong - warn guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/black-russian/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
