/**
 * IBA Contemporary Classics: Garibaldi
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const garibaldi: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  slug: 'garibaldi',
  stable_key: 'garibaldi_iba_contemporary_2025',

  name: {
    en: 'Garibaldi',
    it: 'Garibaldi',
    vi: 'Garibaldi',
    ko: '가리발디',
    ja: 'ガリバルディ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'italian', 'simple', 'refreshing', 'brunch'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A stunningly simple Italian cocktail combining Campari with freshly squeezed orange juice. Named after Italian revolutionary Giuseppe Garibaldi, this bright orange drink is beloved for its bittersweet simplicity.',
    it: "Un cocktail italiano sorprendentemente semplice che combina Campari con succo d'arancia appena spremuto. Chiamato così in onore del rivoluzionario italiano Giuseppe Garibaldi, questo drink arancione brillante è amato per la sua semplicità agrodolce.",
    vi: 'Một cocktail Ý đơn giản đáng kinh ngạc kết hợp Campari với nước cam vắt tươi. Được đặt theo tên nhà cách mạng Ý Giuseppe Garibaldi, thức uống màu cam sáng này được yêu thích vì sự đơn giản đắng ngọt.',
  },

  history: {
    created_year: '1860',
    origin: {
      country: 'Italy',
    },
    story: {
      en: "The Garibaldi was created in honor of Giuseppe Garibaldi, the Italian revolutionary hero who unified Italy in the 1860s. The drink's bright orange color represents the color of Garibaldi's army uniforms. In Italy, it's sometimes called \"Campari Orange.\" The cocktail experienced a renaissance when bartender Gary Regan championed it in the early 2000s, noting that fluffy, freshly-squeezed orange juice (not carton juice) is essential.",
      it: "Il Garibaldi fu creato in onore di Giuseppe Garibaldi, l'eroe rivoluzionario italiano che unificò l'Italia negli anni 1860. Il colore arancione brillante del drink rappresenta il colore delle uniformi dell'esercito di Garibaldi. In Italia, è talvolta chiamato \"Campari Orange.\" Il cocktail ha vissuto un rinascimento quando il barman Gary Regan lo ha sostenuto nei primi anni 2000, notando che il succo d'arancia fresco e spumoso (non da cartone) è essenziale.",
      vi: 'Garibaldi được tạo ra để vinh danh Giuseppe Garibaldi, anh hùng cách mạng Ý người đã thống nhất nước Ý vào những năm 1860. Màu cam sáng của thức uống đại diện cho màu đồng phục quân đội của Garibaldi. Ở Ý, nó đôi khi được gọi là "Campari Orange." Cocktail trải qua thời kỳ phục hưng khi bartender Gary Regan ủng hộ nó vào đầu những năm 2000, lưu ý rằng nước cam vắt tươi mịn (không phải nước hộp) là cần thiết.',
    },
    named_after: {
      en: 'Named after Giuseppe Garibaldi (1807-1882), Italian general and nationalist who played a key role in Italian unification.',
      it: "Prende il nome da Giuseppe Garibaldi (1807-1882), generale e nazionalista italiano che ha svolto un ruolo chiave nell'unificazione italiana.",
      vi: 'Được đặt theo tên Giuseppe Garibaldi (1807-1882), tướng quân và người theo chủ nghĩa dân tộc Ý, người đóng vai trò quan trọng trong việc thống nhất nước Ý.',
    },
  },

  taste: {
    profile: ['bitter', 'citrus', 'sweet'],
    description: {
      en: 'Bright, refreshing, and bittersweet. Fresh orange juice brings natural sweetness and acidity, while Campari provides distinctive bitter, herbal complexity. The fluffy texture from fresh juice makes it incredibly drinkable.',
      it: "Brillante, rinfrescante e agrodolce. Il succo d'arancia fresco porta dolcezza naturale e acidità, mentre il Campari fornisce una caratteristica complessità amara ed erbacee. La consistenza spumosa del succo fresco lo rende incredibilmente bevibile.",
      vi: 'Tươi sáng, sảng khoái và đắng ngọt. Nước cam tươi mang lại vị ngọt tự nhiên và độ chua, trong khi Campari cung cấp độ phức tạp đắng, thảo mộc đặc trưng. Kết cấu mịn từ nước cam tươi khiến nó cực kỳ dễ uống.',
    },
    first_impression: {
      en: 'Fresh orange sweetness with immediate Campari bitterness',
      it: "Dolcezza d'arancia fresca con immediata amarezza del Campari",
      vi: 'Vị ngọt cam tươi với vị đắng Campari ngay lập tức',
    },
    finish: {
      en: 'Pleasant bitter finish balanced by orange sweetness',
      it: "Piacevole finale amaro bilanciato dalla dolcezza dell'arancia",
      vi: 'Kết thúc đắng dễ chịu cân bằng bởi vị ngọt cam',
    },
    balance: {
      en: 'Perfectly balanced between sweet orange and bitter Campari',
      it: 'Perfettamente bilanciato tra arancia dolce e Campari amaro',
      vi: 'Cân bằng hoàn hảo giữa cam ngọt và Campari đắng',
    },
  },

  recommendations: {
    best_time: ['brunch', 'aperitivo', 'afternoon'],
    occasions: ['brunch', 'aperitivo', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect for brunch with eggs, pastries, or Italian antipasti. Excellent aperitivo with olives, prosciutto, cheese, or bruschetta.',
      it: 'Perfetto per il brunch con uova, pasticcini o antipasti italiani. Eccellente aperitivo con olive, prosciutto, formaggio o bruschetta.',
      vi: 'Hoàn hảo cho bữa brunch với trứng, bánh ngọt hoặc antipasti Ý. Aperitivo tuyệt vời với ô liu, prosciutto, phô mai hoặc bruschetta.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy bitter flavors and Italian aperitivo culture. Great introduction to Campari for newcomers. Ideal for lazy brunches.',
      it: "Perfetto per chi ama i sapori amari e la cultura dell'aperitivo italiano. Ottima introduzione al Campari per i principianti. Ideale per brunch rilassanti.",
      vi: 'Hoàn hảo cho những ai thích hương vị đắng và văn hóa aperitivo Ý. Giới thiệu tuyệt vời về Campari cho người mới. Lý tưởng cho bữa brunch nhàn rỗi.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
      notes: { en: 'freshly squeezed', it: 'appena spremuto', vi: 'vắt tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build in a highball glass filled with ice. Pour Campari, then top with freshly squeezed orange juice. Stir gently. Garnish with an orange slice.',
    it: "Costruire in un bicchiere highball pieno di ghiaccio. Versare il Campari, poi completare con succo d'arancia appena spremuto. Mescolare delicatamente. Guarnire con una fetta d'arancia.",
    vi: 'Xây dựng trong ly highball đầy đá. Đổ Campari, sau đó đổ đầy nước cam vắt tươi. Khuấy nhẹ. Trang trí với một lát cam.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice',
    it: "Fetta d'arancia",
    vi: 'Lát cam',
  },

  ice: 'cubes',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CAMPARI'],

  flavor_profile: ['bitter', 'citrus', 'sweet'],

  abv_estimate: 8,

  calories_estimate: 160,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'aperitivo', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['garibaldi-spumante', 'negroni-sbagliato'],

  notes_for_staff:
    "CRITICAL: Must use freshly squeezed orange juice - never carton juice. The fluffy, pulpy texture is what makes this drink special. Some bartenders use a hand juicer for extra fluffy texture. Build in glass, don't shake.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/garibaldi/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
