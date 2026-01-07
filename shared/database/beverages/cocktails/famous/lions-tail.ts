/**
 * Famous Cocktails: Lion's Tail
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lionsTail: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5b1d6a0-2e9f-1c8a-6f3b-9e0f1a2b3c4d',
  slug: 'lions-tail',
  stable_key: 'f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',

  name: {
    en: "Lion's Tail",
    it: 'Coda di Leone',
    vi: 'Đuôi Sư Tử',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'bourbon', 'spicy', 'citrus'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A bold cocktail combining bourbon, allspice dram, lime, and Angostura bitters. The Lion's Tail delivers complex spice notes with citrus brightness and whiskey warmth, creating a sophisticated and memorable drink.",
    it: 'Un cocktail audace che combina bourbon, allspice dram, lime e bitter Angostura. La Coda di Leone offre note speziate complesse con brillantezza agrumata e calore del whisky, creando un drink sofisticato e memorabile.',
    vi: "Một loại cocktail đậm đà kết hợp bourbon, allspice dram, chanh và Angostura bitters. Lion's Tail mang đến các nốt gia vị phức tạp với độ tươi sáng cam quýt và hơi ấm whiskey, tạo ra thức uống tinh tế và đáng nhớ.",
  },

  history: {
    created_year: '1937',
    origin: {
      city: 'London',
      bar: 'Café Royal',
      country: 'UK',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Lion\'s Tail first appeared in the "Café Royal Cocktail Book" published in 1937 in London. Despite its British publication, the drink features American bourbon and Caribbean allspice dram, representing the international cocktail culture of the era. The cocktail fell into obscurity until being revived by New York bartender Dale DeGroff in the 2000s, becoming a modern classic.',
      it: 'La Coda di Leone apparve per la prima volta nel "Café Royal Cocktail Book" pubblicato nel 1937 a Londra. Nonostante la sua pubblicazione britannica, il drink presenta bourbon americano e allspice dram caraibico, rappresentando la cultura internazionale dei cocktail dell\'epoca. Il cocktail cadde nell\'oscurità fino a essere riportato in vita dal barman newyorkese Dale DeGroff negli anni 2000, diventando un classico moderno.',
      vi: 'Lion\'s Tail lần đầu tiên xuất hiện trong "Café Royal Cocktail Book" xuất bản năm 1937 ở London. Mặc dù được xuất bản ở Anh, thức uống có bourbon Mỹ và allspice dram Caribbean, đại diện cho văn hóa cocktail quốc tế của thời đại. Cocktail này bị lãng quên cho đến khi được hồi sinh bởi bartender New York Dale DeGroff những năm 2000, trở thành món cổ điển hiện đại.',
    },
    named_after: {
      en: 'The name "Lion\'s Tail" likely refers to the bold, spicy character of the drink, evoking the powerful image of a lion.',
      it: 'Il nome "Coda di Leone" probabilmente si riferisce al carattere audace e speziato del drink, evocando l\'immagine potente di un leone.',
      vi: 'Cái tên "Lion\'s Tail" có thể ám chỉ tính chất đậm đà, cay nồng của thức uống, gợi lên hình ảnh mạnh mẽ của sư tử.',
    },
  },

  taste: {
    profile: ['spicy', 'citrus', 'complex'],
    description: {
      en: 'Bold and complex with warming bourbon, exotic allspice notes, bright lime acidity, and aromatic bitters. The allspice dram provides distinctive Caribbean spice that sets this cocktail apart from typical whiskey sours.',
      it: "Audace e complesso con bourbon caldo, note esotiche di allspice, acidità brillante di lime e bitter aromatici. L'allspice dram fornisce una spezia caraibica distintiva che distingue questo cocktail dai tipici whisky sour.",
      vi: 'Đậm đà và phức tạp với bourbon ấm, nốt allspice kỳ lạ, độ chua chanh tươi sáng và bitters thơm. Allspice dram cung cấp gia vị Caribbean đặc trưng làm nổi bật cocktail này so với whiskey sour thông thường.',
    },
    first_impression: {
      en: 'Bright lime and exotic allspice hit first with bourbon warmth following',
      it: 'Lime brillante e allspice esotico colpiscono per primi con calore del bourbon che segue',
      vi: 'Chanh tươi sáng và allspice kỳ lạ đập vào đầu tiên với hơi ấm bourbon theo sau',
    },
    finish: {
      en: 'Long, warming finish with lingering spice, citrus, and vanilla-oak bourbon notes',
      it: 'Finale lungo e caldo con spezie persistenti, agrumi e note di bourbon vaniglia-quercia',
      vi: 'Kết thúc dài, ấm áp với gia vị kéo dài, cam quýt và nốt bourbon vani-sồi',
    },
    balance: {
      en: 'Perfectly balanced between spice, citrus, and spirit - complex yet accessible',
      it: 'Perfettamente bilanciato tra spezie, agrumi e spirito - complesso ma accessibile',
      vi: 'Cân bằng hoàn hảo giữa gia vị, cam quýt và rượu mạnh - phức tạp nhưng dễ tiếp cận',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'aperitivo', 'digestivo', 'special_occasion'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with spicy foods, BBQ, jerk chicken, or aged cheeses. The allspice complements Caribbean and Latin American cuisines perfectly.',
      it: "Eccellente con cibi piccanti, BBQ, pollo jerk o formaggi stagionati. L'allspice si abbina perfettamente alle cucine caraibiche e latinoamericane.",
      vi: 'Tuyệt vời với đồ ăn cay, BBQ, gà jerk hoặc phô mai già. Allspice kết hợp hoàn hảo với ẩm thực Caribbean và Mỹ Latin.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers seeking adventurous, spice-forward cocktails. Ideal for those who enjoy complex drinks with exotic Caribbean influences.',
      it: 'Perfetto per gli amanti del bourbon che cercano cocktail avventurosi e speziati. Ideale per chi apprezza drink complessi con influenze caraibiche esotiche.',
      vi: 'Hoàn hảo cho người yêu bourbon tìm kiếm các loại cocktail phiêu lưu, hướng gia vị. Lý tưởng cho những ai thích đồ uống phức tạp với ảnh hưởng Caribbean kỳ lạ.',
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
      ingredient_id: 'ING_ALLSPICE_DRAM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Allspice dram (Pimento dram)',
        it: 'Allspice dram (Pimento dram)',
        vi: 'Allspice dram (Pimento dram)',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Xi-rô đơn giản' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Bitter Angostura', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lime wheel or twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una rotella o scorza di lime.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với lát chanh hoặc vỏ chanh xoắn.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lime wheel or twist',
    it: 'Rotella o scorza di lime',
    vi: 'Lát chanh hoặc vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['spicy', 'citrus', 'complex'],

  abv_estimate: 22,

  calories_estimate: 180,

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
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['date_night', 'aperitivo', 'digestivo', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['lions-tail-moderne'],

  notes_for_staff:
    'Allspice dram (pimento dram) is essential - St. Elizabeth brand recommended. The spice can be intense; adjust for guest preference. Fresh lime juice only. Great for guests who like spiced rum cocktails but want bourbon.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1413/lions-tail',
    notes: 'Café Royal Cocktail Book (1937). Revived by Dale DeGroff in the 2000s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
