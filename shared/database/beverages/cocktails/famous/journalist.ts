/**
 * Famous Cocktails: Journalist
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const journalist: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4a0c5f9-1d8e-0b7f-5e2a-8d9e0f1a2b3c',
  slug: 'journalist',
  stable_key: 'e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',

  name: {
    en: 'Journalist',
    it: 'Giornalista',
    vi: 'Nhà Báo',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'complex', 'dry'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A complex, aromatic cocktail featuring gin, sweet and dry vermouth, orange curaçao, lemon juice, and Angostura bitters. The Journalist is a sophisticated blend of botanical, citrus, and herbal notes with perfect balance.',
    it: "Un cocktail complesso e aromatico con gin, vermut dolce e secco, curaçao all'arancia, succo di limone e bitter Angostura. Il Giornalista è una miscela sofisticata di note botaniche, agrumate ed erbacee con equilibrio perfetto.",
    vi: 'Một loại cocktail phức tạp, thơm với gin, vermouth ngọt và khô, curaçao cam, nước chanh và Angostura bitters. Journalist là sự pha trộn tinh tế của các nốt thực vật, cam quýt và thảo mộc với sự cân bằng hoàn hảo.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Journalist appeared in Harry Craddock\'s "The Savoy Cocktail Book" (1930), though its exact origins are unclear. Named presumably for the hard-drinking journalists of the era, this cocktail represents the sophisticated complexity favored in pre-Prohibition and post-Prohibition cocktail culture. It combines elements of a Martini with the aromatic complexity of vintage vermouthcentric drinks.',
      it: 'Il Giornalista apparve nel "The Savoy Cocktail Book" (1930) di Harry Craddock, anche se le sue origini esatte non sono chiare. Prende il nome presumibilmente dai giornalisti che bevevano molto dell\'epoca, questo cocktail rappresenta la complessità sofisticata favorita nella cultura dei cocktail pre e post-Proibizionismo. Combina elementi di un Martini con la complessità aromatica delle bevande vintage a base di vermut.',
      vi: 'Journalist xuất hiện trong "The Savoy Cocktail Book" (1930) của Harry Craddock, mặc dù nguồn gốc chính xác không rõ ràng. Được đặt tên có lẽ cho các nhà báo nghiện rượu của thời đại đó, cocktail này đại diện cho sự phức tạp tinh tế được ưa chuộng trong văn hóa cocktail trước và sau Cấm rượu. Nó kết hợp các yếu tố của Martini với độ phức tạp thơm của đồ uống cổ điển dựa trên vermouth.',
    },
    named_after: {
      en: 'Likely named after journalists of the 1920s-30s, who were known for their appreciation of sophisticated cocktails and late-night drinking culture.',
      it: "Probabilmente prende il nome dai giornalisti degli anni '20-'30, noti per il loro apprezzamento dei cocktail sofisticati e della cultura del bere notturno.",
      vi: 'Có thể được đặt theo tên các nhà báo những năm 1920-30, những người nổi tiếng với sự đánh giá cao các loại cocktail tinh tế và văn hóa uống rượu đêm khuya.',
    },
  },

  taste: {
    profile: ['complex', 'botanical', 'balanced'],
    description: {
      en: "Beautifully complex with gin's botanicals, dual vermouth balance, bright citrus from lemon and curaçao, and aromatic bitters tying everything together. Dry yet rounded with layered sophistication.",
      it: 'Magnificamente complesso con i botanici del gin, equilibrio doppio del vermut, agrumi brillanti dal limone e curaçao, e bitter aromatici che legano tutto insieme. Secco ma rotondo con sofisticazione stratificata.',
      vi: 'Phức tạp tuyệt đẹp với thực vật của gin, cân bằng vermouth kép, cam quýt tươi sáng từ chanh và curaçao, và bitters thơm gắn kết mọi thứ lại với nhau. Khô nhưng tròn trịa với sự tinh tế nhiều lớp.',
    },
    first_impression: {
      en: 'Botanical gin and citrus upfront with vermouth complexity emerging',
      it: 'Gin botanico e agrumi in primo piano con complessità di vermut emergente',
      vi: 'Gin thực vật và cam quýt trước với độ phức tạp vermouth nổi lên',
    },
    finish: {
      en: 'Long, dry finish with lingering botanicals, citrus, and subtle spice from bitters',
      it: 'Finale lungo e secco con botanici persistenti, agrumi e spezie sottili dai bitter',
      vi: 'Kết thúc dài, khô với thực vật kéo dài, cam quýt và gia vị tinh tế từ bitters',
    },
    balance: {
      en: 'Perfectly balanced complexity - dry yet aromatic, citrus-forward yet spirit-strong',
      it: 'Complessità perfettamente bilanciata - secco ma aromatico, orientato agli agrumi ma forte di spirito',
      vi: 'Độ phức tạp cân bằng hoàn hảo - khô nhưng thơm, hướng cam quýt nhưng rượu mạnh',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'after_work', 'late_night'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with charcuterie, aged cheeses, smoked fish, or as a sophisticated aperitif. Pairs well with olive-based appetizers and savory snacks.',
      it: 'Eccellente con salumi, formaggi stagionati, pesce affumicato, o come aperitivo sofisticato. Si abbina bene con antipasti a base di olive e snack salati.',
      vi: 'Tuyệt vời với charcuterie, phô mai già, cá hun khói hoặc làm khai vị tinh tế. Kết hợp tốt với món khai vị ô liu và đồ ăn nhẹ mặn.',
    },
    ideal_for: {
      en: 'Perfect for gin connoisseurs who appreciate complex, aromatic cocktails. Ideal for those seeking a sophisticated alternative to the Martini with more depth and character.',
      it: "Perfetto per intenditori di gin che apprezzano cocktail complessi e aromatici. Ideale per chi cerca un'alternativa sofisticata al Martini con più profondità e carattere.",
      vi: 'Hoàn hảo cho người sành gin đánh giá cao các loại cocktail phức tạp, thơm. Lý tưởng cho những ai tìm kiếm giải pháp thay thế tinh tế cho Martini với nhiều chiều sâu và tính cách hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermut dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermut secco', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_ORANGE_CURACAO',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Orange curaçao', it: "Curaçao all'arancia", vi: 'Curaçao cam' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Bitter Angostura', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lemon twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza di limone, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ chanh xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

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
  base_spirits: ['ING_GIN'],

  flavor_profile: ['complex', 'botanical', 'balanced'],

  abv_estimate: 24,

  calories_estimate: 160,

  difficulty: 'medium',

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'date_night', 'after_work', 'late_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['improved-journalist'],

  notes_for_staff:
    'Use quality vermouths - they make or break this drink. Fresh lemon juice essential. The dual vermouth creates unique balance. Express lemon oils generously. This is a sophisticated aperitif, not a party drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1338/journalist',
    notes:
      'Harry Craddock\'s "The Savoy Cocktail Book" (1930). Classic sophisticated gin cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
