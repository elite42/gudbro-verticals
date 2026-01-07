/**
 * IBA Unforgettables: Gin Fizz
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const ginFizz: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'df456f07-33a6-439b-bd73-4a7a7ee5efe7',
  slug: 'gin-fizz',
  stable_key: '07545457d85ab8218eb1134e55a665e36183885b',

  name: {
    en: 'Gin Fizz',
    it: 'Gin Fizz',
    vi: 'Gin Fizz',
    ko: '진 피즈',
    ja: 'ジンフィズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing classic from the golden age of cocktails. The Gin Fizz combines gin, fresh lemon juice, and sugar, topped with sparkling soda water for an effervescent, citrusy delight.',
    it: "Un classico rinfrescante dell'età d'oro dei cocktail. Il Gin Fizz combina gin, succo di limone fresco e zucchero, coronato con acqua frizzante per una delizia effervescente e agrumata.",
    vi: 'Một cocktail cổ điển sảng khoái từ thời hoàng kim. Gin Fizz kết hợp gin, nước cốt chanh tươi và đường, phủ lên soda lấp lánh cho một niềm vui sủi bọt, vị chanh.',
  },

  history: {
    created_year: '1870',
    origin: {
      city: 'New Orleans',
      bar: 'Various establishments',
      country: 'United States',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Gin Fizz became widely popular in America between 1900 and the 1940s, known as a hometown specialty of New Orleans. The fizz is a variation on the older sours family of cocktails, distinguished by the addition of carbonated water. Bars would employ teams of bartenders that would take turns shaking the drinks to keep up with demand. The most famous variant, the Ramos Gin Fizz, was created in 1888 by Henry C. Ramos at the Imperial Cabinet Saloon on Gravier Street. Before Prohibition, the Ramos version's 12-minute mixing time required over 20 bartenders working simultaneously during busy periods.",
      it: "Il Gin Fizz divenne molto popolare in America tra il 1900 e il 1940, noto come specialità di New Orleans. Il fizz è una variazione dell'antica famiglia di cocktail sours, distinto dall'aggiunta di acqua gassata. I bar impiegavano squadre di barman che si alternavano a shakerare le bevande per soddisfare la domanda. La variante più famosa, il Ramos Gin Fizz, fu creata nel 1888 da Henry C. Ramos all'Imperial Cabinet Saloon su Gravier Street. Prima del Proibizionismo, il tempo di miscelazione di 12 minuti della versione Ramos richiedeva oltre 20 barman che lavoravano contemporaneamente durante i periodi di punta.",
      vi: 'Gin Fizz trở nên rất phổ biến ở Mỹ từ năm 1900 đến những năm 1940, được biết đến như một đặc sản của New Orleans. Fizz là một biến thể của họ cocktail sours cổ xưa, phân biệt bằng việc thêm nước có ga. Các quầy bar sẽ thuê nhóm bartender thay phiên nhau lắc đồ uống để đáp ứng nhu cầu. Biến thể nổi tiếng nhất, Ramos Gin Fizz, được tạo ra vào năm 1888 bởi Henry C. Ramos tại Imperial Cabinet Saloon trên phố Gravier. Trước thời kỳ Cấm rượu, thời gian pha chế 12 phút của phiên bản Ramos đòi hỏi hơn 20 bartender làm việc đồng thời trong giờ cao điểm.',
    },
    named_after: {
      en: 'Named for the "fizz" created by the soda water, which distinguishes it from the traditional sour.',
      it: 'Prende il nome dalla "frizzantezza" creata dall\'acqua gassata, che lo distingue dal tradizionale sour.',
      vi: 'Được đặt tên theo tiếng "fizz" tạo ra bởi nước soda, điều phân biệt nó với sour truyền thống.',
    },
  },

  taste: {
    profile: ['citrus', 'refreshing', 'effervescent'],
    description: {
      en: 'A bright, refreshing cocktail that balances the botanical complexity of gin with tart lemon and subtle sweetness. The soda water adds a light, effervescent quality that makes it exceptionally refreshing and easy to drink.',
      it: "Un cocktail brillante e rinfrescante che bilancia la complessità botanica del gin con il limone aspro e una dolcezza sottile. L'acqua frizzante aggiunge una qualità leggera ed effervescente che lo rende eccezionalmente rinfrescante e facile da bere.",
      vi: 'Một cocktail tươi sáng, sảng khoái cân bằng độ phức tạp thảo mộc của gin với chanh chua và vị ngọt tinh tế. Nước soda thêm chất lượng nhẹ, sủi bọt làm cho nó đặc biệt sảng khoái và dễ uống.',
    },
    first_impression: {
      en: 'Bright citrus bursts forward with the lively fizz of soda, followed by the crisp botanical notes of gin. The drink is light and refreshing from the first sip.',
      it: 'Gli agrumi brillanti esplodono in avanti con la vivace frizzantezza della soda, seguiti dalle note botaniche croccanti del gin. La bevanda è leggera e rinfrescante dal primo sorso.',
      vi: 'Chanh tươi sáng bùng nổ với bọt khí sống động của soda, theo sau là các nốt thảo mộc giòn tan của gin. Đồ uống nhẹ và sảng khoái ngay từ ngụm đầu tiên.',
    },
    finish: {
      en: 'Clean and crisp with lingering citrus and a dry, botanical finish. The bubbles provide a refreshing lift that cleanses the palate.',
      it: 'Pulito e croccante con agrumi persistenti e un finale secco e botanico. Le bollicine forniscono un sollevamento rinfrescante che pulisce il palato.',
      vi: 'Sạch và giòn với chanh kéo dài và hậu vị khô, thảo mộc. Bọt khí mang lại cảm giác sảng khoái làm sạch vị giác.',
    },
    balance: {
      en: "Well-balanced between tart lemon acidity, gentle sweetness, and gin's botanical character. The soda water lightens the drink without diluting its flavor.",
      it: "Ben bilanciato tra l'acidità aspra del limone, la dolcezza delicata e il carattere botanico del gin. L'acqua frizzante alleggerisce la bevanda senza diluirne il sapore.",
      vi: 'Cân bằng tốt giữa độ chua của chanh, vị ngọt nhẹ nhàng và tính chất thảo mộc của gin. Nước soda làm nhẹ đồ uống mà không làm loãng hương vị.',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'garden_party', 'summer', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Light seafood, fresh salads, grilled vegetables, lemon tarts, citrus-based desserts. Perfect with brunch dishes like eggs Benedict or smoked salmon.',
      it: 'Frutti di mare leggeri, insalate fresche, verdure grigliate, crostate al limone, dessert a base di agrumi. Perfetto con piatti da brunch come uova Benedict o salmone affumicato.',
      vi: 'Hải sản nhẹ, salad tươi, rau nướng, bánh tart chanh, món tráng miệng có cam quýt. Hoàn hảo với các món brunch như trứng Benedict hoặc cá hồi hun khói.',
    },
    ideal_for: {
      en: 'Those seeking a refreshing, effervescent cocktail with balanced citrus flavors. Perfect for warm weather or as a revitalizing afternoon drink.',
      it: 'Per chi cerca un cocktail rinfrescante ed effervescente con sapori agrumati equilibrati. Perfetto per il clima caldo o come bevanda rivitalizzante del pomeriggio.',
      vi: 'Dành cho những ai tìm kiếm cocktail sảng khoái, sủi bọt với hương vị chanh cân bằng. Hoàn hảo cho thời tiết ấm áp hoặc như một đồ uống tiếp sức buổi chiều.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple Syrup', it: 'Sciroppo Semplice', vi: 'Siro đơn giản' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 80, unit: 'ml' },
      display_name: { en: 'Soda Water', it: 'Acqua Frizzante', vi: 'Nước soda' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake all ingredients with ice except soda water. Pour into thin tall tumbler glass, top with a splash of soda water. Serve without ice.',
    it: "Shakerare tutti gli ingredienti con ghiaccio tranne l'acqua frizzante. Versare nel bicchiere tumbler alto e sottile, completare con un goccio di acqua frizzante. Servire senza ghiaccio.",
    vi: 'Lắc tất cả nguyên liệu với đá trừ nước soda. Đổ vào ly tumbler cao mỏng, thêm một ít nước soda lên trên. Phục vụ không có đá.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon slice with optional lemon zest.',
    it: 'Fetta di limone con scorza di limone opzionale.',
    vi: 'Lát chanh với vỏ chanh tùy chọn.',
  },

  ice: 'none',
  serving_style: 'straight',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['citrus', 'refreshing', 'effervescent', 'light'],
  abv_estimate: 10,
  calories_estimate: 150,
  difficulty: 'easy',
  prep_time_seconds: 180,

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
  occasion_tags: ['brunch', 'garden_party', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      name: 'Ramos Gin Fizz',
      description:
        'Add cream, egg white, orange flower water, and vanilla for a rich, frothy version',
    },
    {
      name: 'Silver Fizz',
      description: 'Add egg white for a silky texture',
    },
    {
      name: 'Golden Fizz',
      description: 'Add egg yolk for richness',
    },
  ],

  notes_for_staff:
    'Always use fresh-squeezed lemon juice. Shake vigorously to properly chill and dilute. Add soda water gently after pouring to maintain carbonation. The drink should be served immediately while still fizzy.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/gin-fizz/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
