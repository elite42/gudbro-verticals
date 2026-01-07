/**
 * Famous Cocktails: Jet Pilot
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const jetPilot: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
  slug: 'jet-pilot',
  stable_key: 'jet_pilot_famous_tiki_tropical_cocktail',

  name: {
    en: 'Jet Pilot',
    it: 'Jet Pilot',
    vi: 'Jet Pilot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'potent', 'spiced'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Jet Pilot is an intensely potent tiki cocktail, a turbocharged variation of the Test Pilot with even more overproof rum and aggressive spicing. This drink lives up to its jet-powered name with serious strength and complex layers of flavor.',
    it: "Il Jet Pilot è un cocktail tiki intensamente potente, una variazione turbocompressa del Test Pilot con ancora più rum overproof e spezie aggressive. Questa bevanda è all'altezza del suo nome a propulsione a reazione con forza seria e strati complessi di sapore.",
    vi: 'Jet Pilot là một loại cocktail tiki cực kỳ mạnh mẽ, một biến thể tăng áp của Test Pilot với nhiều rum overproof hơn và gia vị mạnh mẽ. Thức uống này sống đúng với tên phản lực của nó với sức mạnh nghiêm trọng và các lớp hương vị phức tạp.',
  },

  history: {
    created_year: '1958',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Jet Pilot was created around 1958 by Don the Beachcomber as an evolution of his earlier Test Pilot cocktail. As jet aviation was revolutionizing air travel in the late 1950s, Don updated his aviation-themed drink for the jet age. The Jet Pilot takes the already complex Test Pilot formula and amplifies it with more overproof rum and additional falernum, creating an even more potent and spice-forward drink. The cocktail reflects the optimism and power of the jet age while maintaining the complexity that defines Don the Beachcomber\'s style. Like many of Don\'s recipes, it remained a closely guarded secret until tiki historian Jeff "Beachbum" Berry decoded it decades later.',
      it: "Il Jet Pilot fu creato intorno al 1958 da Don the Beachcomber come evoluzione del suo precedente cocktail Test Pilot. Poiché l'aviazione a reazione stava rivoluzionando i viaggi aerei alla fine degli anni '50, Don aggiornò la sua bevanda a tema aviazione per l'era dei jet. Il Jet Pilot prende la già complessa formula del Test Pilot e la amplifica con più rum overproof e falernum aggiuntivo, creando una bevanda ancora più potente e orientata alle spezie. Il cocktail riflette l'ottimismo e la potenza dell'era dei jet mantenendo la complessità che definisce lo stile di Don the Beachcomber. Come molte ricette di Don, rimase un segreto custodito gelosamente fino a quando lo storico del tiki Jeff \"Beachbum\" Berry la decifrò decenni dopo.",
      vi: 'Jet Pilot được tạo ra vào khoảng năm 1958 bởi Don the Beachcomber như một sự tiến hóa của cocktail Test Pilot trước đó của ông. Khi hàng không phản lực đang cách mạng hóa du lịch hàng không vào cuối những năm 1950, Don đã cập nhật thức uống theo chủ đề hàng không của mình cho kỷ nguyên phản lực. Jet Pilot lấy công thức Test Pilot đã phức tạp và khuếch đại nó với nhiều rum overproof hơn và falernum bổ sung, tạo ra thức uống mạnh hơn và hướng về gia vị hơn. Cocktail phản ánh sự lạc quan và sức mạnh của kỷ nguyên phản lực trong khi duy trì sự phức tạp xác định phong cách của Don the Beachcomber. Giống như nhiều công thức của Don, nó vẫn là một bí mật được giữ kín cho đến khi nhà sử học tiki Jeff "Beachbum" Berry giải mã nó nhiều thập kỷ sau.',
    },
    named_after: {
      en: 'Named after jet pilots and the jet age of the late 1950s, symbolizing power, speed, and modern sophistication.',
      it: "Prende il nome dai piloti di jet e dall'era dei jet della fine degli anni '50, simboleggiando potenza, velocità e sofisticazione moderna.",
      vi: 'Được đặt theo tên các phi công phản lực và kỷ nguyên phản lực của cuối những năm 1950, tượng trưng cho sức mạnh, tốc độ và sự tinh tế hiện đại.',
    },
  },

  taste: {
    profile: ['potent', 'spiced', 'complex'],
    description: {
      en: 'Explosively complex and dangerously potent with aggressive rum and spice character. The Jet Pilot delivers intense layers of overproof rum heat, warming spices from falernum, subtle anise, citrus brightness, and almond notes. This is tiki drinking at its most extreme.',
      it: 'Esplosivamente complesso e pericolosamente potente con carattere aggressivo di rum e spezie. Il Jet Pilot offre intensi strati di calore del rum overproof, spezie calde dal falernum, anice sottile, brillantezza di agrumi e note di mandorla. Questo è bere tiki al suo estremo.',
      vi: 'Phức tạp bùng nổ và mạnh mẽ nguy hiểm với đặc tính rum và gia vị mạnh mẽ. Jet Pilot mang đến các lớp nhiệt rum overproof mãnh liệt, gia vị ấm áp từ falernum, hồi tinh tế, độ sáng cam quýt và hương hạnh nhân. Đây là uống tiki ở mức cực đoan nhất.',
    },
    first_impression: {
      en: 'Powerful rum and spice hit immediately, with citrus trying to tame the beast',
      it: 'Rum e spezie potenti colpiscono immediatamente, con gli agrumi che cercano di domare la bestia',
      vi: 'Rum và gia vị mạnh mẽ xuất hiện ngay lập tức, với cam quýt cố gắng thuần hóa con thú',
    },
    finish: {
      en: 'Very long, intensely warming finish with persistent spice and rum heat',
      it: 'Finale molto lungo e intensamente caldo con spezie persistenti e calore del rum',
      vi: 'Kết thúc rất dài, ấm áp mãnh liệt với gia vị dai dẳng và nhiệt độ rum',
    },
    balance: {
      en: 'Boldly unbalanced in the best way - this is about power and intensity, not subtlety',
      it: 'Audacemente sbilanciato nel modo migliore - si tratta di potenza e intensità, non di sottigliezza',
      vi: 'Mất cân bằng táo bạo theo cách tốt nhất - đây là về sức mạnh và cường độ, không phải tinh tế',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'adventurous_drinking', 'special_occasion'],
    seasons: ['year_round'],
    food_pairings: {
      en: 'Perfect with rich, spicy foods that can stand up to the intensity - jerk chicken, spicy ribs, blackened fish, or bold curries. The strong flavors complement equally strong food.',
      it: "Perfetto con cibi ricchi e piccanti che possono reggere l'intensità - pollo jerk, costine piccanti, pesce annerito o curry audaci. I sapori forti completano cibo ugualmente forte.",
      vi: 'Hoàn hảo với thức ăn giàu gia vị có thể chịu được cường độ - gà jerk, sườn cay, cá đen hoặc cà ri đậm. Hương vị mạnh bổ sung cho thức ăn mạnh tương tự.',
    },
    ideal_for: {
      en: 'Perfect for hardcore tiki enthusiasts and thrill-seekers. NOT for casual drinkers or beginners. This is an extreme cocktail for those who want maximum intensity. Limit to one - seriously potent. Advanced drinkers only.',
      it: 'Perfetto per appassionati di tiki hardcore e cercatori di brividi. NON per bevitori casuali o principianti. Questo è un cocktail estremo per coloro che vogliono la massima intensità. Limitare a uno - seriamente potente. Solo bevitori esperti.',
      vi: 'Hoàn hảo cho những người đam mê tiki hardcore và những người tìm kiếm cảm giác mạnh. KHÔNG dành cho người uống bình thường hoặc người mới bắt đầu. Đây là một loại cocktail cực đoan cho những ai muốn cường độ tối đa. Giới hạn một ly - nghiêm túc mạnh. Chỉ dành cho người uống nâng cao.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Dark rum (Jamaican)',
        it: 'Rum scuro (giamaicano)',
        vi: 'Rum đen (Jamaica)',
      },
    },
    {
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Demerara rum (151 proof)',
        it: 'Rum Demerara (151 proof)',
        vi: 'Rum Demerara (151 proof)',
      },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh xanh tươi',
      },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh grapefruit juice',
        it: 'Succo di pompelmo fresco',
        vi: 'Nước bưởi tươi',
      },
    },
    {
      ingredient_id: 'ING_CINNAMON_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Cinnamon syrup', it: 'Sciroppo di cannella', vi: 'Xi-rô quế' },
    },
    {
      ingredient_id: 'ING_PERNOD',
      quantity: { amount: 6, unit: 'ml' },
      display_name: { en: 'Pernod (absinthe)', it: 'Pernod (assenzio)', vi: 'Pernod (absinthe)' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake very vigorously until extremely well-chilled. Strain into a double old-fashioned glass or tiki mug filled with crushed ice. Garnish with mint sprig and lime wheel.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare molto vigorosamente fino a raffreddare estremamente bene. Filtrare in un bicchiere double old-fashioned o tiki mug pieno di ghiaccio tritato. Guarnire con rametto di menta e rotella di lime.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc rất mạnh cho đến khi cực kỳ lạnh. Lọc vào ly double old-fashioned hoặc cốc tiki đầy đá nghiền. Trang trí với nhành bạc hà và vòng chanh xanh.',
  },

  glass: 'Double old-fashioned / Tiki mug',

  garnish: {
    en: 'Fresh mint sprig, lime wheel, cinnamon stick',
    it: 'Rametto di menta fresca, rotella di lime, stecca di cannella',
    vi: 'Nhành bạc hà tươi, vòng chanh xanh, que quế',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_DEMERARA'],

  flavor_profile: ['potent', 'spiced', 'complex'],

  abv_estimate: 26,

  calories_estimate: 250,

  difficulty: 'advanced',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'wormwood'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['year_round'],
  occasion_tags: ['tiki_bar', 'adventurous_drinking', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-jet-pilot'],

  notes_for_staff:
    'EXTREMELY POTENT - warn guests and limit to 1 per person. Created by Don the Beachcomber circa 1958. More aggressive than Test Pilot with double the Pernod and additional falernum. 151-proof Demerara is essential. This is an extreme cocktail - handle with care.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 58,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/jet-pilot.html',
    notes:
      'Original Don the Beachcomber recipe circa 1958, decoded by Jeff "Beachbum" Berry in Sippin\' Safari.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
