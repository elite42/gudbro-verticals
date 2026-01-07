/**
 * IBA Contemporary Classics: Golden Dream
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const goldenDream: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  slug: 'golden-dream',
  stable_key: 'golden_dream_iba_contemporary_2025',

  name: {
    en: 'Golden Dream',
    it: 'Golden Dream',
    vi: 'Golden Dream',
    ko: '골든 드림',
    ja: 'ゴールデン・ドリーム',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'creamy', 'sweet', 'dessert', 'orange'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luxurious creamy cocktail combining Galliano, Cointreau, orange juice, and cream. This golden-hued drink is like a liquid dessert, with vanilla, orange, and cream creating a sweet, indulgent experience.',
    it: "Un cocktail cremoso lussuoso che combina Galliano, Cointreau, succo d'arancia e panna. Questo drink dorato è come un dessert liquido, con vaniglia, arancia e panna che creano un'esperienza dolce e indulgente.",
    vi: 'Một loại cocktail béo ngậy sang trọng kết hợp Galliano, Cointreau, nước cam và kem. Thức uống màu vàng này giống như món tráng miệng lỏng, với vani, cam và kem tạo ra trải nghiệm ngọt ngào, nuông chiều.',
  },

  history: {
    created_year: '1960',
    origin: {
      country: 'USA',
    },
    creator: {
      name: 'Raimonds Yansons',
      profession: 'bartender',
    },
    story: {
      en: "Created by bartender Raimonds Yansons in the 1960s, the Golden Dream was part of the era's trend toward creamy, dessert-style cocktails. It showcases Galliano, the tall Italian herbal liqueur with distinctive vanilla notes. The drink enjoyed popularity in the 1960s-70s and experienced a revival when added to the IBA Contemporary Classics list.",
      it: "Creato dal barman Raimonds Yansons negli anni '60, il Golden Dream faceva parte della tendenza dell'epoca verso cocktail cremosi in stile dessert. Mette in mostra il Galliano, il liquore alle erbe italiano alto con note distintive di vaniglia. Il drink ha goduto di popolarità negli anni '60-'70 e ha vissuto una rinascita quando è stato aggiunto alla lista IBA Contemporary Classics.",
      vi: 'Được tạo ra bởi bartender Raimonds Yansons vào những năm 1960, Golden Dream là một phần của xu hướng thời đó hướng tới các cocktail béo ngậy kiểu tráng miệng. Nó thể hiện Galliano, rượu mùi thảo mộc Ý cao với hương vani đặc trưng. Thức uống được ưa chuộng vào những năm 1960-70 và trải qua sự hồi sinh khi được thêm vào danh sách IBA Contemporary Classics.',
    },
    named_after: {
      en: 'Named for its golden color and dreamy, dessert-like quality.',
      it: 'Prende il nome dal suo colore dorato e dalla qualità da sogno, simile a un dessert.',
      vi: 'Được đặt tên theo màu vàng của nó và chất lượng mơ mộng giống tráng miệng.',
    },
  },

  taste: {
    profile: ['sweet', 'creamy', 'vanilla', 'orange'],
    description: {
      en: 'Smooth, sweet, and creamy. Galliano provides herbal vanilla notes, Cointreau adds orange sweetness, fresh orange juice brings acidity, and cream creates silky texture. A dessert in a glass.',
      it: "Morbido, dolce e cremoso. Il Galliano fornisce note di vaniglia erbacee, il Cointreau aggiunge dolcezza all'arancia, il succo d'arancia fresco porta acidità e la panna crea una consistenza setosa. Un dessert in un bicchiere.",
      vi: 'Mượt mà, ngọt và béo ngậy. Galliano cung cấp hương vani thảo mộc, Cointreau thêm vị ngọt cam, nước cam tươi mang lại độ chua và kem tạo kết cấu mượt như lụa. Một món tráng miệng trong ly.',
    },
    first_impression: {
      en: 'Creamy vanilla and orange sweetness',
      it: "Vaniglia cremosa e dolcezza d'arancia",
      vi: 'Vani béo ngậy và vị ngọt cam',
    },
    finish: {
      en: 'Smooth, sweet finish with lingering vanilla and orange',
      it: 'Finale morbido e dolce con vaniglia e arancia persistenti',
      vi: 'Kết thúc mượt mà, ngọt với vani và cam kéo dài',
    },
    balance: {
      en: 'Sweet and creamy, balanced by orange acidity',
      it: "Dolce e cremoso, bilanciato dall'acidità dell'arancia",
      vi: 'Ngọt và béo ngậy, cân bằng bởi độ chua của cam',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['dessert', 'after_dinner', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect as a dessert replacement or with light sweets like biscotti, fruit tarts, or vanilla cake. Best enjoyed on its own as an indulgent treat.',
      it: 'Perfetto come sostituto del dessert o con dolci leggeri come biscotti, crostate di frutta o torta alla vaniglia. Meglio gustato da solo come regalo indulgente.',
      vi: 'Hoàn hảo như một thay thế món tráng miệng hoặc với đồ ngọt nhẹ như biscotti, bánh tart trái cây hoặc bánh vani. Tốt nhất thưởng thức riêng như một món nuông chiều.',
    },
    ideal_for: {
      en: 'Perfect for those who love creamy, dessert-style cocktails. Great for after-dinner drinks and special occasions. Not for those who prefer dry cocktails.',
      it: 'Perfetto per chi ama cocktail cremosi in stile dessert. Ottimo per drink dopo cena e occasioni speciali. Non per chi preferisce cocktail secchi.',
      vi: 'Hoàn hảo cho những ai yêu thích cocktail béo ngậy kiểu tráng miệng. Tuyệt vời cho đồ uống sau bữa tối và các dịp đặc biệt. Không dành cho những người thích cocktail khô.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GALLIANO',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Galliano', it: 'Galliano', vi: 'Galliano' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Triple sec (Cointreau)',
        it: 'Triple sec (Cointreau)',
        vi: 'Triple sec (Cointreau)',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into shaker filled with ice. Shake vigorously. Strain into a chilled cocktail glass. No garnish needed.',
    it: 'Versare tutti gli ingredienti nello shaker pieno di ghiaccio. Shakerare vigorosamente. Filtrare in una coppa da cocktail raffreddata. Nessuna guarnizione necessaria.',
    vi: 'Đổ tất cả nguyên liệu vào shaker đầy đá. Lắc mạnh. Lọc vào ly cocktail đã làm lạnh. Không cần trang trí.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không có',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GALLIANO', 'ING_TRIPLE_SEC'],

  flavor_profile: ['sweet', 'creamy', 'vanilla', 'orange'],

  abv_estimate: 15,

  calories_estimate: 220,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['dessert', 'after_dinner', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['golden-cadillac'],

  notes_for_staff:
    'Shake hard to properly emulsify the cream. Use fresh cream for best texture. Galliano is essential - its vanilla-anise flavor is what makes this drink special. Serve very cold.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/golden-dream/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
