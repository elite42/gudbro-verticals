/**
 * IBA New Era Drinks: Pisco Punch
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const piscoPunch: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b',
  slug: 'pisco-punch',
  stable_key: 'e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',

  name: {
    en: 'Pisco Punch',
    it: 'Pisco Punch',
    vi: 'Pisco Punch',
    ko: '피스코 펀치',
    ja: 'ピスコパンチ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'pisco', 'pineapple', 'historical', 'punch'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary San Francisco punch combining Pisco with pineapple, citrus, and aromatic bitters. This historic cocktail was the drink of choice during the California Gold Rush era.',
    it: 'Un leggendario punch di San Francisco che combina Pisco con ananas, agrumi e bitter aromatici. Questo cocktail storico fu la bevanda preferita durante l\'era della corsa all\'oro della California.',
    vi: 'Một loại punch huyền thoại San Francisco kết hợp Pisco với dứa, cam quýt và bitters thơm. Cocktail lịch sử này là thức uống được ưa chuộng trong thời kỳ Cơn sốt vàng California.',
  },

  history: {
    created_year: '1878',
    origin: {
      city: 'San Francisco',
      bar: 'Bank Exchange Saloon',
      country: 'USA',
    },
    creator: {
      name: 'Duncan Nicol',
      profession: 'bartender',
    },
    story: {
      en: 'Created around 1878 by Duncan Nicol at the Bank Exchange Saloon in San Francisco. The drink became legendary during the Gold Rush era and was considered one of San Francisco\'s most famous cocktails. Mark Twain and other literary figures were known to frequent the Bank Exchange specifically for this punch. The original recipe was a closely guarded secret, and when Nicol died in 1926, the exact formula was lost. Modern versions are reconstructions based on historical accounts and tasting notes.',
      it: 'Creato intorno al 1878 da Duncan Nicol al Bank Exchange Saloon di San Francisco. La bevanda divenne leggendaria durante l\'era della corsa all\'oro e fu considerata uno dei cocktail più famosi di San Francisco. Mark Twain e altri personaggi letterari erano noti per frequentare il Bank Exchange specificamente per questo punch. La ricetta originale era un segreto gelosamente custodito, e quando Nicol morì nel 1926, la formula esatta fu persa. Le versioni moderne sono ricostruzioni basate su resoconti storici e note di degustazione.',
      vi: 'Được tạo ra vào khoảng năm 1878 bởi Duncan Nicol tại Bank Exchange Saloon ở San Francisco. Thức uống trở nên huyền thoại trong thời kỳ Cơn sốt vàng và được coi là một trong những cocktail nổi tiếng nhất của San Francisco. Mark Twain và các nhân vật văn học khác được biết đến là thường xuyên lui tới Bank Exchange đặc biệt vì loại punch này. Công thức gốc là một bí mật được giữ kín, và khi Nicol qua đời năm 1926, công thức chính xác đã bị thất lạc. Các phiên bản hiện đại là tái tạo dựa trên các ghi chép lịch sử và ghi chú hương vị.',
    },
    named_after: {
      en: 'Named after Pisco, the Peruvian/Chilean grape brandy that forms its base.',
      it: 'Prende il nome dal Pisco, il brandy d\'uva peruviano/cileno che costituisce la sua base.',
      vi: 'Được đặt theo tên Pisco, rượu brandy nho Peru/Chile tạo nên cơ sở của nó.',
    },
  },

  taste: {
    profile: ['tropical', 'citrus', 'complex'],
    description: {
      en: 'Tropical pineapple sweetness with Pisco\'s grape brandy character, bright citrus notes, and aromatic complexity. Smooth, fruity, and deceptively strong.',
      it: 'Dolcezza tropicale di ananas con il carattere di brandy d\'uva del Pisco, note brillanti di agrumi e complessità aromatica. Liscio, fruttato e ingannevolmente forte.',
      vi: 'Vị ngọt dứa nhiệt đới với đặc tính brandy nho của Pisco, hương vị cam quýt tươi mát và độ phức tạp thơm. Mượt mà, trái cây và mạnh một cách lừa dối.',
    },
    first_impression: {
      en: 'Tropical pineapple with bright citrus and Pisco smoothness',
      it: 'Ananas tropicale con agrumi brillanti e morbidezza del Pisco',
      vi: 'Dứa nhiệt đới với cam quýt tươi mát và độ mượt Pisco',
    },
    finish: {
      en: 'Long, smooth finish with lingering tropical fruit and grape notes',
      it: 'Finale lungo e liscio con frutta tropicale e note d\'uva persistenti',
      vi: 'Kết thúc dài, mượt mà với trái cây nhiệt đới kéo dài và hương nho',
    },
    balance: {
      en: 'Well-balanced between tropical sweetness, citrus brightness, and Pisco strength',
      it: 'Ben bilanciato tra dolcezza tropicale, brillantezza degli agrumi e forza del Pisco',
      vi: 'Cân bằng tốt giữa vị ngọt nhiệt đới, độ tươi cam quýt và độ mạnh Pisco',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['party', 'celebration', 'historical_tasting', 'summer_gathering'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with Peruvian ceviche, tropical fruit platters, or light seafood dishes.',
      it: 'Eccellente con ceviche peruviano, piatti di frutta tropicale, o piatti di pesce leggeri.',
      vi: 'Tuyệt vời với ceviche Peru, đĩa trái cây nhiệt đới hoặc món hải sản nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for Pisco enthusiasts and cocktail history buffs. Ideal for those seeking a taste of San Francisco\'s legendary drinking culture.',
      it: 'Perfetto per gli appassionati di Pisco e gli appassionati di storia dei cocktail. Ideale per chi cerca un assaggio della leggendaria cultura del bere di San Francisco.',
      vi: 'Hoàn hảo cho người đam mê Pisco và những người yêu lịch sử cocktail. Lý tưởng cho những ai tìm kiếm hương vị văn hóa uống huyền thoại của San Francisco.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PISCO',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pisco', it: 'Pisco', vi: 'Pisco' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake all ingredients with ice. Strain into a rocks glass filled with ice.',
    it: 'Shakerare tutti gli ingredienti con ghiaccio. Filtrare in un bicchiere rocks pieno di ghiaccio.',
    vi: 'Lắc tất cả nguyên liệu với đá. Lọc vào ly rocks đầy đá.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Pineapple wedge',
    it: 'Spicchio di ananas',
    vi: 'Miếng dứa',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PISCO'],

  flavor_profile: ['tropical', 'citrus', 'complex'],

  abv_estimate: 18,

  calories_estimate: 180,

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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['party', 'celebration', 'historical_tasting'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['original-pisco-punch'],

  notes_for_staff: 'The original recipe was lost, this is a modern reconstruction. Use quality Pisco for best results. Deceptively strong - warn guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/pisco-punch/',
    note: 'IBA Official Recipe - Modern reconstruction of historic recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
