/**
 * Famous Cocktails: Voodoo Doctor
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const voodooDoctor: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  slug: 'voodoo-doctor',
  stable_key: 'voodoo-doctor-tiki-tropical-famous-2025',

  name: {
    en: 'Voodoo Doctor',
    it: 'Dottore Voodoo',
    vi: 'Voodoo Doctor',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'spiced', 'mysterious', 'theatrical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A mysterious and potent tiki cocktail blending spiced rum with tropical juices and exotic liqueurs. The Voodoo Doctor offers a complex, mystical flavor profile with Caribbean spices and tropical sweetness that casts a delicious spell on your palate.',
    it: 'Un cocktail tiki misterioso e potente che mescola rum speziato con succhi tropicali e liquori esotici. Il Dottore Voodoo offre un profilo di sapore complesso e mistico con spezie caraibiche e dolcezza tropicale che getta un delizioso incantesimo sul palato.',
    vi: 'Một loại cocktail tiki bí ẩn và mạnh mẽ pha trộn rum gia vị với nước ép nhiệt đới và rượu mùi kỳ lạ. Voodoo Doctor mang đến hồ sơ hương vị phức tạp, huyền bí với gia vị Caribbean và vị ngọt nhiệt đới tạo ra một phép thuật ngon lành trên vòm miệng của bạn.',
  },

  history: {
    created_year: '1980s',
    origin: {
      city: 'New Orleans',
      bar: 'Tiki Bars',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Voodoo Doctor emerged in the 1980s from the tiki bar renaissance, particularly popular in New Orleans where voodoo culture and tiki aesthetics merged. The cocktail draws inspiration from New Orleans\' rich voodoo history and mystical traditions, combining them with classic tiki flavors. The name references the spiritual healers and practitioners of voodoo, suggesting this drink has "magical" restorative powers. While the exact origin is disputed, the cocktail became a staple at themed tiki bars that embraced the mysterious, supernatural elements of Polynesian and Caribbean cultures.',
      it: 'Il Dottore Voodoo emerse negli anni \'80 dalla rinascita dei bar tiki, particolarmente popolare a New Orleans dove la cultura voodoo e l\'estetica tiki si fusero. Il cocktail trae ispirazione dalla ricca storia voodoo di New Orleans e dalle tradizioni mistiche, combinandole con i classici sapori tiki. Il nome fa riferimento ai guaritori spirituali e praticanti del voodoo, suggerendo che questa bevanda ha poteri "magici" di restaurazione. Sebbene l\'origine esatta sia controversa, il cocktail divenne un punto fermo nei bar tiki a tema che abbracciarono gli elementi misteriosi e soprannaturali delle culture polinesiana e caraibica.',
      vi: 'Voodoo Doctor xuất hiện vào những năm 1980 từ thời kỳ phục hưng quán bar tiki, đặc biệt phổ biến ở New Orleans nơi văn hóa voodoo và thẩm mỹ tiki hợp nhất. Cocktail lấy cảm hứng từ lịch sử voodoo phong phú và truyền thống huyền bí của New Orleans, kết hợp chúng với hương vị tiki cổ điển. Cái tên tham chiếu đến các nhà chữa bệnh tâm linh và người hành nghề voodoo, gợi ý thức uống này có sức mạnh phục hồi "ma thuật". Mặc dù nguồn gốc chính xác còn tranh cãi, cocktail trở thành món chính tại các quán bar tiki theo chủ đề ôm lấy các yếu tố bí ẩn, siêu nhiên của văn hóa Polynesia và Caribbean.',
    },
    named_after: {
      en: 'Named after voodoo spiritual healers and practitioners, suggesting the drink has mystical, restorative "magical" powers to cure what ails you.',
      it: 'Prende il nome dai guaritori spirituali e praticanti del voodoo, suggerendo che la bevanda ha poteri "magici" mistici e rigenerativi per curare ciò che ti affligge.',
      vi: 'Được đặt theo tên các nhà chữa bệnh tâm linh và người hành nghề voodoo, gợi ý thức uống có sức mạnh "ma thuật" huyền bí, phục hồi để chữa lành những gì làm phiền bạn.',
    },
  },

  taste: {
    profile: ['spiced', 'tropical', 'complex'],
    description: {
      en: 'Complex and mysterious with warm spiced rum, tropical fruit sweetness, and exotic spice notes. Layers of cinnamon, vanilla, and Caribbean spices blend with tropical pineapple and citrus. Rich, warming, and enchantingly delicious.',
      it: 'Complesso e misterioso con rum speziato caldo, dolcezza di frutta tropicale e note esotiche di spezie. Strati di cannella, vaniglia e spezie caraibiche si fondono con ananas tropicale e agrumi. Ricco, caldo e deliziosamente incantevole.',
      vi: 'Phức tạp và bí ẩn với rum gia vị ấm, vị ngọt trái cây nhiệt đới và hương gia vị kỳ lạ. Các lớp quế, vani và gia vị Caribbean hòa quyện với dứa nhiệt đới và cam quýt. Đậm đà, ấm áp và mê hoặc ngon lành.',
    },
    first_impression: {
      en: 'Warm spices and tropical fruit with mysterious aromatic complexity',
      it: 'Spezie calde e frutta tropicale con misteriosa complessità aromatica',
      vi: 'Gia vị ấm và trái cây nhiệt đới với độ phức tạp thơm bí ẩn',
    },
    finish: {
      en: 'Long, warming finish with lingering spice, vanilla, and tropical fruit notes',
      it: 'Finale lungo e caldo con spezie persistenti, vaniglia e note di frutta tropicale',
      vi: 'Kết thúc dài, ấm áp với gia vị kéo dài, vani và hương trái cây nhiệt đới',
    },
    balance: {
      en: 'Well-balanced between spiced warmth and tropical sweetness - complex and layered without being overwhelming',
      it: 'Ben bilanciato tra calore speziato e dolcezza tropicale - complesso e stratificato senza essere opprimente',
      vi: 'Cân bằng tốt giữa sự ấm áp gia vị và vị ngọt nhiệt đới - phức tạp và nhiều lớp mà không áp đảo',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'halloween', 'mysterious_theme', 'date_night', 'celebration'],
    seasons: ['autumn', 'winter', 'year_round'],
    food_pairings: {
      en: 'Pairs excellently with Cajun cuisine, jerk chicken, blackened fish, Caribbean stews, or spiced tropical dishes. Also complements dark chocolate desserts and bananas foster.',
      it: 'Si abbina eccellentemente con cucina cajun, pollo jerk, pesce annerito, stufati caraibici o piatti tropicali speziati. Complementa anche dessert al cioccolato fondente e banane foster.',
      vi: 'Kết hợp tuyệt vời với ẩm thực Cajun, gà jerk, cá đen, món hầm Caribbean hoặc các món nhiệt đới gia vị. Cũng bổ sung cho món tráng miệng chocolate đen và chuối foster.',
    },
    ideal_for: {
      en: 'Perfect for Halloween parties, mysterious themed events, and tiki bars with a darker aesthetic. Ideal for those who love spiced rum and complex, warming cocktails. Great for cool evenings and autumn nights.',
      it: 'Perfetto per feste di Halloween, eventi a tema misterioso e bar tiki con un\'estetica più oscura. Ideale per chi ama il rum speziato e cocktail complessi e caldi. Ottimo per serate fresche e notti autunnali.',
      vi: 'Hoàn hảo cho tiệc Halloween, sự kiện chủ đề bí ẩn và quán bar tiki với thẩm mỹ tối hơn. Lý tưởng cho những ai yêu thích rum gia vị và cocktail phức tạp, ấm áp. Tuyệt vời cho những buổi tối mát mẻ và đêm mùa thu.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_SPICED',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Spiced rum', it: 'Rum speziato', vi: 'Rum gia vị' },
    },
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitter', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a tiki mug filled with crushed ice. Garnish with pineapple fronds, lime wheel, and a dusting of cinnamon.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una tazza tiki piena di ghiaccio tritato. Guarnire con foglie di ananas, rotella di lime e una spolverata di cannella.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào cốc tiki đầy đá nghiền. Trang trí với lá dứa, lát chanh tròn và rắc quế.',
  },

  glass: 'Tiki mug',

  garnish: {
    en: 'Pineapple fronds, lime wheel, and cinnamon dust',
    it: 'Foglie di ananas, rotella di lime e polvere di cannella',
    vi: 'Lá dứa, lát chanh tròn và bột quế',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_SPICED', 'ING_RUM_DARK'],

  flavor_profile: ['spiced', 'tropical', 'complex'],

  abv_estimate: 16,

  calories_estimate: 220,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'year_round'],
  occasion_tags: ['tiki_bar', 'halloween', 'mysterious_theme', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-voodoo-doctor', 'voodoo-priestess'],

  notes_for_staff: 'Falernum is a spiced Caribbean liqueur - essential for authentic flavor. Spiced rum and dark rum combination creates complexity. Cinnamon garnish adds aroma and visual appeal. Popular for Halloween and mysterious themed events. Can flame dark rum floater for theatrical presentation if desired.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/5241/voodoo-doctor',
    note: 'Modern tiki cocktail. Multiple recipe variations exist.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
