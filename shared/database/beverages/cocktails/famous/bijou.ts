/**
 * Famous Cocktails: Bijou
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bijou: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9b5d0a4-6e3f-5c2a-0f7b-3e4f5a6b7c8d',
  slug: 'bijou',
  stable_key: 'f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',

  name: {
    en: 'Bijou',
    it: 'Bijou',
    vi: 'Bijou',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'complex', 'botanical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant cocktail combining gin, green Chartreuse, and sweet vermouth with a dash of orange bitters. Named after the French word for "jewel," the Bijou is a sophisticated blend of botanical, herbal, and sweet flavors.',
    it: 'Un cocktail elegante che combina gin, Chartreuse verde e vermut dolce con un goccio di bitter all\'arancia. Prende il nome dalla parola francese per "gioiello," il Bijou è una miscela sofisticata di sapori botanici, erbacei e dolci.',
    vi: 'Một loại cocktail thanh lịch kết hợp gin, Chartreuse xanh và vermouth ngọt với một chút bitter cam. Được đặt theo tên từ tiếng Pháp có nghĩa là "viên ngọc," Bijou là sự pha trộn tinh tế của hương vị thực vật, thảo mộc và ngọt ngào.',
  },

  history: {
    created_year: '1900',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Harry Johnson',
      profession: 'bartender',
    },
    story: {
      en: 'The Bijou first appeared in Harry Johnson\'s "Bartender\'s Manual" in 1900. The name references the three "jewel-colored" liqueurs: gin (diamond), green Chartreuse (emerald), and sweet vermouth (ruby). This cocktail represents the golden age of bartending when complex, spirit-forward drinks were highly prized.',
      it: 'Il Bijou apparve per la prima volta nel "Bartender\'s Manual" di Harry Johnson nel 1900. Il nome fa riferimento ai tre liquori "color gioiello": gin (diamante), Chartreuse verde (smeraldo) e vermut dolce (rubino). Questo cocktail rappresenta l\'età d\'oro del bartending quando i drink complessi e a base di spiriti erano molto apprezzati.',
      vi: 'Bijou lần đầu tiên xuất hiện trong "Bartender\'s Manual" của Harry Johnson năm 1900. Cái tên ám chỉ ba loại rượu "màu đá quý": gin (kim cương), Chartreuse xanh (ngọc lục bảo) và vermouth ngọt (hồng ngọc). Cocktail này đại diện cho thời kỳ hoàng kim của nghề pha chế khi các thức uống phức tạp, hướng đến rượu mạnh được đánh giá cao.',
    },
    named_after: {
      en: 'French for "jewel," referencing the three jewel-colored ingredients: diamond (gin), emerald (Chartreuse), and ruby (vermouth).',
      it: 'Francese per "gioiello," riferendosi ai tre ingredienti color gioiello: diamante (gin), smeraldo (Chartreuse) e rubino (vermut).',
      vi: 'Tiếng Pháp có nghĩa là "viên ngọc," ám chỉ ba nguyên liệu màu đá quý: kim cương (gin), ngọc lục bảo (Chartreuse) và hồng ngọc (vermouth).',
    },
  },

  taste: {
    profile: ['complex', 'herbal', 'botanical'],
    description: {
      en: 'Intensely complex with herbal green Chartreuse, botanical gin, and sweet vermouth creating layers of flavor. Bold, aromatic, and beautifully balanced with a long, sophisticated finish.',
      it: 'Intensamente complesso con Chartreuse verde erbaceo, gin botanico e vermut dolce che creano strati di sapore. Audace, aromatico e magnificamente bilanciato con un finale lungo e sofisticato.',
      vi: 'Cực kỳ phức tạp với Chartreuse xanh thảo mộc, gin thực vật và vermouth ngọt tạo ra các lớp hương vị. Đậm đà, thơm và cân bằng tuyệt đẹp với kết thúc dài, tinh tế.',
    },
    first_impression: {
      en: 'Powerful herbal Chartreuse and juniper hit immediately with sweet vermouth rounding',
      it: 'Potente Chartreuse erbaceo e ginepro colpiscono immediatamente con vermut dolce arrotondante',
      vi: 'Chartreuse thảo mộc mạnh mẽ và hương bách xù đập vào ngay lập tức với vermouth ngọt làm tròn',
    },
    finish: {
      en: 'Long, warming finish with complex herbal and botanical notes lingering',
      it: 'Finale lungo e caldo con note erbacee e botaniche complesse persistenti',
      vi: 'Kết thúc dài, ấm áp với các nốt thảo mộc và thực vật phức tạp kéo dài',
    },
    balance: {
      en: 'Perfectly balanced trinity of herbal, botanical, and sweet - bold yet harmonious',
      it: 'Trinità perfettamente bilanciata di erbaceo, botanico e dolce - audace ma armonioso',
      vi: 'Bộ ba cân bằng hoàn hảo của thảo mộc, thực vật và ngọt - đậm đà nhưng hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'digestivo', 'special_occasion'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with aged cheeses, charcuterie, roasted game, or dark chocolate. Perfect as a digestif after rich meals.',
      it: 'Eccellente con formaggi stagionati, salumi, selvaggina arrosto o cioccolato fondente. Perfetto come digestivo dopo pasti ricchi.',
      vi: 'Tuyệt vời với phô mai già, charcuterie, thịt săn nướng hoặc chocolate đen. Hoàn hảo như thức uống tiêu hóa sau bữa ăn giàu dinh dưỡng.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate complex, spirit-forward cocktails. An excellent choice for gin lovers seeking something more sophisticated than a martini.',
      it: 'Perfetto per bevitori avventurosi che apprezzano cocktail complessi a base di spiriti. Un\'ottima scelta per gli amanti del gin che cercano qualcosa di più sofisticato di un martini.',
      vi: 'Hoàn hảo cho người thích phiêu lưu đánh giá cao các loại cocktail phức tạp, hướng đến rượu mạnh. Lựa chọn tuyệt vời cho người yêu gin tìm kiếm thứ gì đó tinh tế hơn martini.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_GREEN_CHARTREUSE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Green Chartreuse', it: 'Chartreuse verde', vi: 'Chartreuse xanh' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermut dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Orange bitters', it: 'Bitter all\'arancia', vi: 'Bitter cam' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 30-40 seconds until well-chilled. Strain into a chilled coupe or Nick & Nora glass. Garnish with a lemon twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere Nick & Nora. Guarnire con una scorza di limone, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ nhàng trong 30-40 giây cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly Nick & Nora đã làm lạnh. Trang trí với vỏ chanh xoắn, ép tinh dầu lên thức uống.',
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
  base_spirits: ['ING_GIN', 'ING_GREEN_CHARTREUSE'],

  flavor_profile: ['complex', 'herbal', 'botanical'],

  abv_estimate: 28,

  calories_estimate: 190,

  difficulty: 'medium',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['aperitivo', 'date_night', 'digestivo', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bijou-moderne', 'reverse-bijou'],

  notes_for_staff: 'Equal parts recipe creates perfect balance. Stir gently to avoid over-dilution given the potency of ingredients. Green Chartreuse is essential - yellow Chartreuse is NOT a substitute. Express lemon oils generously for aromatic impact.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/353/bijou-cocktail',
    note: 'Harry Johnson\'s 1900 Bartender\'s Manual. Historical cocktail from the golden age of bartending.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
