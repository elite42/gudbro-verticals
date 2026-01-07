/**
 * Famous Cocktails: Wildest Redhead
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const wildestRedhead: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  slug: 'wildest-redhead',
  stable_key: '6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a10',

  name: {
    en: 'Wildest Redhead',
    it: 'Wildest Redhead',
    vi: 'Wildest Redhead',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'bourbon', 'fruity', 'spicy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A bold bourbon cocktail featuring ginger liqueur, strawberry, lemon juice, and Peychaud's bitters. The Wildest Redhead is a spicy, fruity drink with a beautiful pink hue and complex flavor profile.",
    it: 'Un cocktail audace a base di bourbon con liquore allo zenzero, fragola, succo di limone e bitter Peychaud. Il Wildest Redhead è una bevanda piccante e fruttata con una bellissima tonalità rosa e un profilo aromatico complesso.',
    vi: "Một loại cocktail bourbon táo bạo với rượu mùi gừng, dâu tây, nước chanh và Peychaud's bitters. Wildest Redhead là thức uống cay, trái cây với sắc hồng đẹp mắt và hương vị phức tạp.",
  },

  history: {
    created_year: '2008',
    origin: {
      city: 'New York City',
      bar: 'Pegu Club',
      country: 'USA',
    },
    creator: {
      name: 'Toby Maloney',
      profession: 'bartender',
    },
    story: {
      en: "Created by Toby Maloney at the legendary Pegu Club in New York City in 2008, the Wildest Redhead was designed as a bold, feminine cocktail that plays with strawberry and ginger flavors. Maloney combined bourbon with muddled strawberries and ginger liqueur, creating a drink that balances fruit, spice, and spirit strength. The cocktail's vibrant color and bold flavor profile made it an instant hit and it quickly became a modern classic.",
      it: 'Creato da Toby Maloney al leggendario Pegu Club di New York City nel 2008, il Wildest Redhead è stato progettato come un cocktail audace e femminile che gioca con i sapori di fragola e zenzero. Maloney ha combinato bourbon con fragole pestate e liquore allo zenzero, creando una bevanda che bilancia frutta, spezie e forza alcolica. Il colore vibrante e il profilo aromatico audace del cocktail lo hanno reso un successo immediato ed è rapidamente diventato un classico moderno.',
      vi: 'Được tạo ra bởi Toby Maloney tại Pegu Club huyền thoại ở New York City năm 2008, Wildest Redhead được thiết kế như một cocktail táo bạo, nữ tính chơi với hương vị dâu tây và gừng. Maloney kết hợp bourbon với dâu tây giã và rượu mùi gừng, tạo ra đồ uống cân bằng trái cây, gia vị và độ mạnh rượu. Màu sắc rực rỡ và hương vị táo bạo của cocktail làm nó thành công ngay lập tức và nhanh chóng trở thành cocktail cổ điển hiện đại.',
    },
    named_after: {
      en: 'Named for its fiery red color (from strawberries) and bold, spicy character (from ginger), evoking the passionate spirit of a "wild redhead."',
      it: 'Chiamato così per il suo colore rosso fuoco (dalle fragole) e il carattere audace e piccante (dallo zenzero), evocando lo spirito passionale di una "rossa selvaggia."',
      vi: 'Được đặt tên cho màu đỏ rực (từ dâu tây) và đặc tính táo bạo, cay (từ gừng), gợi lên tinh thần đam mê của "cô gái tóc đỏ hoang dã."',
    },
  },

  taste: {
    profile: ['fruity', 'spicy', 'sweet'],
    description: {
      en: "Bold and fruity with warming spice. Bourbon provides a rich, oaky backbone, fresh strawberries add sweet-tart fruit notes, ginger liqueur contributes spicy warmth, and lemon juice brings bright acidity. Peychaud's bitters add aromatic complexity.",
      it: 'Audace e fruttato con spezie calde. Il bourbon fornisce una struttura ricca e legnosa, le fragole fresche aggiungono note fruttate dolci-aspre, il liquore allo zenzero contribuisce con calore speziato e il succo di limone porta acidità brillante. I bitter Peychaud aggiungono complessità aromatica.',
      vi: "Táo bạo và trái cây với gia vị ấm áp. Bourbon mang đến xương sống giàu, gỗ sồi, dâu tây tươi thêm hương trái cây ngọt-chua, rượu mùi gừng đóng góp hơi ấm cay, và nước chanh mang độ chua sáng. Peychaud's bitters thêm độ phức tạp thơm.",
    },
    first_impression: {
      en: 'Sweet strawberry and spicy ginger hit first, followed by bourbon warmth and citrus',
      it: 'Fragola dolce e zenzero piccante colpiscono per primi, seguiti da calore del bourbon e agrumi',
      vi: 'Dâu tây ngọt và gừng cay đập vào đầu tiên, tiếp theo là hơi ấm bourbon và cam chanh',
    },
    finish: {
      en: 'Warming finish with lingering spice and fruit notes',
      it: 'Finale caldo con note persistenti di spezie e frutta',
      vi: 'Kết thúc ấm áp với gia vị và trái cây kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet fruit and spicy heat, with bourbon providing structure',
      it: 'Ben bilanciato tra frutta dolce e calore piccante, con il bourbon che fornisce struttura',
      vi: 'Cân bằng tốt giữa trái cây ngọt và cay nóng, với bourbon mang đến cấu trúc',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['date_night', 'cocktail_hour', 'summer_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with spicy dishes, grilled meats, berry desserts, and dark chocolate. The fruit and spice complement bold, flavorful foods.',
      it: 'Eccellente con piatti piccanti, carni alla griglia, dessert ai frutti di bosco e cioccolato fondente. La frutta e le spezie complementano cibi audaci e saporiti.',
      vi: 'Tuyệt vời với món cay, thịt nướng, tráng miệng quả mọng và chocolate đen. Trái cây và gia vị bổ sung cho món ăn đậm đà, nhiều hương vị.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers who enjoy fruity, spicy cocktails. Ideal for those seeking something bold and distinctive.',
      it: 'Perfetto per gli amanti del bourbon che apprezzano cocktail fruttati e piccanti. Ideale per chi cerca qualcosa di audace e distintivo.',
      vi: 'Hoàn hảo cho người yêu bourbon thích cocktail trái cây, cay. Lý tưởng cho những ai tìm kiếm thứ gì đó táo bạo và đặc biệt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Bourbon', it: 'Bourbon', vi: 'Bourbon' },
    },
    {
      ingredient_id: 'ING_GINGER_LIQUEUR',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Ginger liqueur',
        it: 'Liquore allo zenzero',
        vi: 'Rượu mùi gừng',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_STRAWBERRIES',
      quantity: { amount: 3, unit: 'pieces' },
      display_name: {
        en: 'Fresh strawberries',
        it: 'Fragole fresche',
        vi: 'Dâu tây tươi',
      },
    },
    {
      ingredient_id: 'ING_PEYCHAUDS_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: {
        en: "Peychaud's bitters",
        it: 'Bitter Peychaud',
        vi: "Peychaud's bitters",
      },
    },
  ],

  method: 'muddle_shake',

  instructions: {
    en: 'Muddle strawberries in a shaker. Add bourbon, ginger liqueur, lemon juice, bitters, and ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a strawberry slice.',
    it: 'Pestare le fragole in uno shaker. Aggiungere bourbon, liquore allo zenzero, succo di limone, bitter e ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare due volte in una coppa raffreddata. Guarnire con una fetta di fragola.',
    vi: 'Giã dâu tây trong bình lắc. Thêm bourbon, rượu mùi gừng, nước chanh, bitters và đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc kép vào ly coupe đã làm lạnh. Trang trí với lát dâu tây.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Fresh strawberry slice',
    it: 'Fetta di fragola fresca',
    vi: 'Lát dâu tây tươi',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['fruity', 'spicy', 'sweet'],

  abv_estimate: 18,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 120,

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
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['date_night', 'cocktail_hour', 'summer_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['whiskey-smash', 'strawberry-basil-smash'],

  notes_for_staff:
    'Use fresh, ripe strawberries for best flavor. Muddle gently to avoid bitterness. Double strain to remove strawberry seeds and pulp. Can rim glass with sugar for extra sweetness.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 74,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Created by Toby Maloney at Pegu Club, 2008',
    notes: 'Modern classic cocktail. Featured in craft cocktail publications.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
