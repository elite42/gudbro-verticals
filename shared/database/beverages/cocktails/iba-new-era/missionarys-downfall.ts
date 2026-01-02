/**
 * IBA New Era Drinks: Missionary's Downfall
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const missionarysDownfall: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'missionarys-downfall',
  stable_key: 'f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',

  name: {
    en: "Missionary's Downfall",
    it: "Missionary's Downfall",
    vi: "Missionary's Downfall",
    ko: '미셔너리스 다운폴',
    ja: 'ミッショナリーズ・ダウンフォール',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'tiki', 'tropical', 'rum', 'frozen', 'fruity'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant frozen tiki cocktail featuring fresh mint, pineapple, and white rum. This refreshing drink combines the coolness of mint with tropical pineapple and peach flavors, creating an irresistible frozen treat that lives up to its provocative name.',
    it: 'Un vibrante cocktail tiki frozen con menta fresca, ananas e rum bianco. Questa bevanda rinfrescante combina la freschezza della menta con sapori tropicali di ananas e pesca, creando un irresistibile piacere ghiacciato che fa onore al suo nome provocatorio.',
    vi: 'Một cocktail tiki đông lạnh sống động với bạc hà tươi, dứa và rum trắng. Thức uống sảng khoái này kết hợp độ mát của bạc hà với hương vị dứa và đào nhiệt đới, tạo nên món đá xay không thể cưỡng lại xứng với cái tên khêu gợi.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'Hollywood',
      bar: "Don the Beachcomber's",
      country: 'USA',
    },
    creator: {
      name: 'Donn Beach (Ernest Raymond Beaumont Gantt)',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Donn Beach (Don the Beachcomber) around 1950, this playfully named cocktail became a tiki bar favorite. The name humorously suggests that even the most virtuous missionary could be tempted by this delicious frozen concoction. The drink\'s combination of fresh mint and tropical fruit was innovative for its time and remains a beloved frozen tiki classic.',
      it: 'Creato da Donn Beach (Don the Beachcomber) intorno al 1950, questo cocktail dal nome giocoso divenne un favorito dei bar tiki. Il nome suggerisce umoristicamente che anche il missionario più virtuoso potrebbe essere tentato da questa deliziosa miscela ghiacciata. La combinazione di menta fresca e frutta tropicale era innovativa per il suo tempo e rimane un amato classico tiki frozen.',
      vi: 'Được tạo ra bởi Donn Beach (Don the Beachcomber) khoảng năm 1950, cocktail có tên vui nhộn này trở thành món yêu thích của quầy bar tiki. Cái tên hài hước gợi ý rằng ngay cả nhà truyền giáo đức hạnh nhất cũng có thể bị cám dỗ bởi hỗn hợp đông lạnh ngon này. Sự kết hợp bạc hà tươi và trái cây nhiệt đới rất sáng tạo cho thời đó và vẫn là tiki đông lạnh cổ điển được yêu thích.',
    },
    named_after: {
      en: 'The humorous name suggests the drink is so tempting it could lead a missionary astray from their virtuous path.',
      it: 'Il nome umoristico suggerisce che la bevanda è così tentante da poter far deviare un missionario dal suo percorso virtuoso.',
      vi: 'Cái tên hài hước gợi ý đồ uống quyến rũ đến mức có thể khiến nhà truyền giáo lạc khỏi con đường đức hạnh.',
    },
  },

  taste: {
    profile: ['tropical', 'refreshing', 'minty', 'fruity'],
    description: {
      en: 'Brilliantly refreshing with a perfect balance of cooling mint, sweet tropical pineapple, subtle peach notes, and clean rum character. The frozen texture makes it incredibly smooth and easy to drink.',
      it: 'Brillantemente rinfrescante con un perfetto equilibrio di menta rinfrescante, ananas tropicale dolce, note sottili di pesca e carattere pulito di rum. La consistenza ghiacciata lo rende incredibilmente morbido e facile da bere.',
      vi: 'Sảng khoái tuyệt vời với sự cân bằng hoàn hảo của bạc hà mát lạnh, dứa nhiệt đới ngọt, nốt đào tinh tế và đặc tính rum trong sạch. Kết cấu đông lạnh làm cho nó cực kỳ mượt và dễ uống.',
    },
    first_impression: {
      en: 'Fresh mint and tropical pineapple hit first with icy coolness',
      it: 'Menta fresca e ananas tropicale colpiscono prima con freschezza ghiacciata',
      vi: 'Bạc hà tươi và dứa nhiệt đới đập vào đầu tiên với độ lạnh băng giá',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering mint and fruit sweetness',
      it: 'Finale pulito e rinfrescante con menta e dolcezza di frutta persistenti',
      vi: 'Kết thúc trong sạch, sảng khoái với bạc hà và vị ngọt trái cây kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between mint freshness, tropical fruit sweetness, and rum backbone',
      it: 'Perfettamente bilanciato tra freschezza di menta, dolcezza di frutta tropicale e struttura di rum',
      vi: 'Cân bằng hoàn hảo giữa độ tươi bạc hà, vị ngọt trái cây nhiệt đới và nền rum',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'summer_gathering', 'tiki_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with grilled fish, tropical fruit salads, coconut shrimp, fish tacos, and light Asian cuisine.',
      it: 'Perfetto con pesce alla griglia, insalate di frutta tropicale, gamberi al cocco, tacos di pesce e cucina asiatica leggera.',
      vi: 'Hoàn hảo với cá nướng, salad trái cây nhiệt đới, tôm dừa, taco cá và ẩm thực Á nhẹ nhàng.',
    },
    ideal_for: {
      en: 'Perfect for hot summer days and beach settings. Ideal for those who love frozen tropical drinks with a refreshing mint twist. Great for tiki enthusiasts and anyone seeking a cooling, fruity rum cocktail.',
      it: 'Perfetto per calde giornate estive e ambientazioni da spiaggia. Ideale per chi ama le bevande tropicali frozen con un tocco rinfrescante di menta. Ottimo per gli appassionati di tiki e chiunque cerchi un cocktail di rum fruttato e rinfrescante.',
      vi: 'Hoàn hảo cho những ngày hè nóng nực và bối cảnh bãi biển. Lý tưởng cho những ai yêu thích đồ uống nhiệt đới đông lạnh với chút bạc hà sảng khoái. Tuyệt vời cho người đam mê tiki và ai đang tìm cocktail rum mát lạnh, trái cây.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_PEACH_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Peach liqueur', it: 'Liquore di pesca', vi: 'Rượu mùi đào' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_FRESH',
      quantity: { amount: 60, unit: 'g' },
      display_name: { en: 'Fresh pineapple chunks', it: 'Pezzi di ananas fresco', vi: 'Miếng dứa tươi' },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 10, unit: 'leaves' },
      display_name: { en: 'Fresh mint leaves', it: 'Foglie di menta fresca', vi: 'Lá bạc hà tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with one cup of crushed ice. Blend until smooth and slushy. Pour into a chilled tiki mug or hurricane glass. Garnish with a pineapple wedge, mint sprig, and optionally a cherry.',
    it: 'Aggiungere tutti gli ingredienti in un frullatore con una tazza di ghiaccio tritato. Frullare fino a ottenere una consistenza liscia e granita. Versare in un tiki mug o bicchiere hurricane raffreddato. Guarnire con una fetta di ananas, rametto di menta e opzionalmente una ciliegia.',
    vi: 'Thêm tất cả nguyên liệu vào máy xay với một cốc đá bào. Xay cho đến khi mịn và sệt. Đổ vào cốc tiki hoặc ly hurricane đã làm lạnh. Trang trí với múi dứa, cành bạc hà và tùy chọn một quả cherry.',
  },

  glass: 'Tiki mug or Hurricane glass',

  garnish: {
    en: 'Pineapple wedge, fresh mint sprig, maraschino cherry',
    it: 'Fetta di ananas, rametto di menta fresca, ciliegia maraschino',
    vi: 'Múi dứa, cành bạc hà tươi, cherry maraschino',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['tropical', 'refreshing', 'minty', 'fruity'],

  abv_estimate: 12,

  calories_estimate: 220,

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'party', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-missionarys-downfall'],

  notes_for_staff: 'Fresh pineapple is essential - do not use canned. Blend thoroughly for smooth texture. Can adjust ice quantity for desired consistency. Mint should be fresh and aromatic.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/missionarys-downfall/',
    note: 'IBA Official Recipe. Historical information from Don the Beachcomber archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
