/**
 * IBA New Era Drinks: Gin Basil Smash
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const ginBasilSmash: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  slug: 'gin-basil-smash',
  stable_key: 'a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5',

  name: {
    en: 'Gin Basil Smash',
    it: 'Gin Basil Smash',
    vi: 'Gin Basil Smash',
    ko: '진 바질 스매시',
    ja: 'ジン・バジル・スマッシュ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'gin', 'herbal', 'refreshing', 'contemporary'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic that combines the aromatic complexity of gin with the fresh, peppery notes of muddled basil and tart lemon juice. This refreshing cocktail showcases how simple, quality ingredients can create something extraordinary when handled with care.',
    it: 'Un classico moderno che combina la complessità aromatica del gin con le note fresche e pepate del basilico pestato e succo di limone aspro. Questo cocktail rinfrescante dimostra come ingredienti semplici e di qualità possano creare qualcosa di straordinario quando trattati con cura.',
    vi: 'Một tác phẩm hiện đại kết hợp độ phức tạp thơm của gin với nốt hương tươi, cay của húng quế nghiền và nước chanh chua. Cocktail sảng khoái này cho thấy nguyên liệu đơn giản, chất lượng có thể tạo ra điều phi thường khi xử lý cẩn thận.',
  },

  history: {
    created_year: '2008',
    origin: {
      city: 'Hamburg',
      bar: 'Le Lion Bar de Paris',
      country: 'Germany',
    },
    creator: {
      name: 'Jörg Meyer',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Jörg Meyer at Le Lion Bar de Paris in Hamburg in 2008, the Gin Basil Smash quickly became a modern classic. Meyer was inspired by the Whiskey Smash and wanted to create something fresh and herbaceous with gin. The drink gained international recognition and helped spark the modern cocktail renaissance in Germany. Its simplicity and flavor made it an instant hit, spreading to bars worldwide.',
      it: 'Creato da Jörg Meyer al Le Lion Bar de Paris ad Amburgo nel 2008, il Gin Basil Smash divenne rapidamente un classico moderno. Meyer si ispirò al Whiskey Smash e voleva creare qualcosa di fresco e erbaceo con il gin. La bevanda ottenne riconoscimento internazionale e contribuì a innescare il rinascimento dei cocktail moderni in Germania. La sua semplicità e sapore ne fecero un successo immediato, diffondendosi nei bar di tutto il mondo.',
      vi: 'Được tạo ra bởi Jörg Meyer tại Le Lion Bar de Paris ở Hamburg năm 2008, Gin Basil Smash nhanh chóng trở thành tác phẩm hiện đại. Meyer lấy cảm hứng từ Whiskey Smash và muốn tạo thứ gì đó tươi mát và thảo mộc với gin. Đồ uống nhận được sự công nhận quốc tế và giúp châm ngòi cho sự phục hưng cocktail hiện đại ở Đức. Sự đơn giản và hương vị làm nó thành công ngay lập tức, lan rộng đến các quầy bar trên toàn thế giới.',
    },
    named_after: {
      en: 'Named for the technique of "smashing" (muddling) fresh basil leaves with the other ingredients, inspired by the classic Whiskey Smash.',
      it: 'Prende il nome dalla tecnica di "smashing" (pestare) foglie di basilico fresco con gli altri ingredienti, ispirato dal classico Whiskey Smash.',
      vi: 'Được đặt tên theo kỹ thuật "smashing" (nghiền) lá húng quế tươi với các nguyên liệu khác, lấy cảm hứng từ Whiskey Smash cổ điển.',
    },
  },

  taste: {
    profile: ['herbal', 'refreshing', 'citrus', 'aromatic'],
    description: {
      en: "Bright and herbaceous with a perfect balance of botanical gin, fresh basil's peppery sweetness, and zesty lemon tartness. The muddled basil releases essential oils that complement the gin's botanicals beautifully.",
      it: 'Luminoso ed erbaceo con un perfetto equilibrio di gin botanico, dolcezza pepata del basilico fresco e acidità vivace del limone. Il basilico pestato rilascia oli essenziali che completano meravigliosamente i botanici del gin.',
      vi: 'Tươi sáng và thảo mộc với sự cân bằng hoàn hảo của gin thực vật, vị ngọt cay của húng quế tươi và vị chua sảng khoái của chanh. Húng quế nghiền giải phóng tinh dầu bổ sung tuyệt vời cho thực vật của gin.',
    },
    first_impression: {
      en: 'Fresh basil and juniper hit immediately with bright lemon acidity',
      it: 'Basilico fresco e ginepro colpiscono immediatamente con vivace acidità di limone',
      vi: 'Húng quế tươi và hương thảo đập vào ngay lập tức với độ chua chanh tươi sáng',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering herbal and citrus notes',
      it: 'Finale pulito e rinfrescante con note erbacee e agrumate persistenti',
      vi: 'Kết thúc trong sạch, sảng khoái với nốt thảo mộc và cam chanh kéo dài',
    },
    balance: {
      en: 'Expertly balanced between herbal complexity, citrus brightness, and spirit strength',
      it: 'Bilanciato in modo esperto tra complessità erbacea, luminosità agrumata e forza alcolica',
      vi: 'Cân bằng chuyên nghiệp giữa độ phức tạp thảo mộc, độ tươi cam chanh và độ mạnh rượu',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'aperitif'],
    occasions: ['aperitivo', 'garden_party', 'casual_gathering', 'summer_evening'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Mediterranean cuisine, caprese salad, grilled vegetables, fresh seafood, Italian antipasti, and light pasta dishes.',
      it: 'Perfetto con cucina mediterranea, insalata caprese, verdure grigliate, pesce fresco, antipasti italiani e piatti di pasta leggeri.',
      vi: 'Hoàn hảo với ẩm thực Địa Trung Hải, salad caprese, rau nướng, hải sản tươi, antipasti Ý và món mì ống nhẹ nhàng.',
    },
    ideal_for: {
      en: 'Perfect for gin enthusiasts who appreciate fresh, herbaceous cocktails. Ideal for those seeking a sophisticated yet approachable modern classic. Great for summer gatherings and as a refreshing aperitif.',
      it: 'Perfetto per gli appassionati di gin che apprezzano cocktail freschi ed erbacei. Ideale per chi cerca un classico moderno sofisticato ma accessibile. Ottimo per incontri estivi e come aperitivo rinfrescante.',
      vi: 'Hoàn hảo cho người đam mê gin đánh giá cao cocktail tươi mát, thảo mộc. Lý tưởng cho những ai tìm kiếm tác phẩm hiện đại tinh tế nhưng dễ tiếp cận. Tuyệt vời cho các buổi họp mặt mùa hè và làm aperitif sảng khoái.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_BASIL_LEAVES',
      quantity: { amount: 8, unit: 'leaves' },
      display_name: {
        en: 'Fresh basil leaves',
        it: 'Foglie di basilico fresco',
        vi: 'Lá húng quế tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Place basil leaves in a cocktail shaker and gently muddle to release the oils (do not over-muddle or it will become bitter). Add gin, lemon juice, simple syrup, and ice. Shake vigorously until well-chilled. Double strain into a rocks glass filled with fresh ice. Garnish with a fresh basil sprig.',
    it: 'Mettere le foglie di basilico in uno shaker e pestare delicatamente per rilasciare gli oli (non pestare troppo o diventerà amaro). Aggiungere gin, succo di limone, sciroppo semplice e ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare due volte in un bicchiere rocks pieno di ghiaccio fresco. Guarnire con un rametto di basilico fresco.',
    vi: 'Đặt lá húng quế vào bình lắc và nghiền nhẹ nhàng để giải phóng tinh dầu (không nghiền quá sẽ bị đắng). Thêm gin, nước chanh, siro đường và đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc kép vào ly rocks đầy đá tươi. Trang trí với cành húng quế tươi.',
  },

  glass: 'Rocks glass (Old Fashioned)',

  garnish: {
    en: 'Fresh basil sprig',
    it: 'Rametto di basilico fresco',
    vi: 'Cành húng quế tươi',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['herbal', 'refreshing', 'citrus', 'aromatic'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  occasion_tags: ['aperitivo', 'casual', 'garden_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['strawberry-basil-smash', 'cucumber-basil-smash'],

  notes_for_staff:
    'Fresh basil is critical - do not use dried. Muddle gently to avoid bitterness. Double strain to remove basil pieces. Use a quality gin with good botanical profile. Can substitute lime for lemon for variation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/gin-basil-smash/',
    notes: 'IBA Official Recipe. Created by Jörg Meyer at Le Lion Bar de Paris, Hamburg.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
