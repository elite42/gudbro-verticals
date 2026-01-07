/**
 * Famous Cocktails: Vodka Tonic
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vodkaTonic: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4c5d6e7-8901-2345-b890-234567890123',
  slug: 'vodka-tonic',
  stable_key: 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',

  name: {
    en: 'Vodka Tonic',
    it: 'Vodka Tonic',
    vi: 'Vodka Tonic',
    ko: '보드카 토닉',
    ja: 'ウォッカトニック',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'vodka', 'tonic', 'refreshing', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A crisp, refreshing highball combining vodka with tonic water and lime. The Vodka Tonic is the vodka lover's answer to the Gin & Tonic, offering a cleaner, more neutral base that lets the tonic's botanicals shine.",
    it: "Un highball frizzante e rinfrescante che combina vodka con acqua tonica e lime. Il Vodka Tonic è la risposta dell'amante della vodka al Gin & Tonic, offrendo una base più pulita e neutra che lascia brillare le botaniche della tonica.",
    vi: 'Một highball sảng khoái, tươi mát kết hợp vodka với nước tonic và chanh. Vodka Tonic là câu trả lời của người yêu vodka cho Gin & Tonic, mang lại cơ sở sạch hơn, trung tính hơn để thảo mộc của tonic tỏa sáng.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: "The Vodka Tonic emerged in the 1950s as vodka gained popularity in America. While the Gin & Tonic had been popular since the 19th century for its quinine content (used to prevent malaria), the vodka version offered a less botanical, more neutral alternative. The drink became extremely popular in the 1960s and 1970s during the vodka boom, appealing to those who wanted the refreshing qualities of tonic without gin's distinctive juniper flavor. Today, with the craft tonic water renaissance, the Vodka Tonic has gained new appreciation.",
      it: "Il Vodka Tonic emerse negli anni '50 quando la vodka guadagnò popolarità in America. Mentre il Gin & Tonic era popolare dal XIX secolo per il suo contenuto di chinino (usato per prevenire la malaria), la versione con vodka offriva un'alternativa meno botanica e più neutra. Il drink divenne estremamente popolare negli anni '60 e '70 durante il boom della vodka, attraendo coloro che volevano le qualità rinfrescanti della tonica senza il caratteristico sapore di ginepro del gin. Oggi, con la rinascita dell'acqua tonica artigianale, il Vodka Tonic ha guadagnato nuovo apprezzamento.",
      vi: 'Vodka Tonic xuất hiện vào những năm 1950 khi vodka trở nên phổ biến ở Mỹ. Trong khi Gin & Tonic đã phổ biến từ thế kỷ 19 vì hàm lượng quinine (được sử dụng để ngăn ngừa sốt rét), phiên bản vodka mang lại sự thay thế ít thảo mộc hơn, trung tính hơn. Thức uống trở nên cực kỳ phổ biến vào những năm 1960 và 1970 trong thời kỳ bùng nổ vodka, thu hút những ai muốn chất lượng tươi mát của tonic mà không có hương vị cây tùng đặc trưng của gin. Ngày nay, với sự phục hưng nước tonic thủ công, Vodka Tonic đã nhận được sự đánh giá cao mới.',
    },
    named_after: {
      en: 'Simply named after its two main ingredients: vodka and tonic water.',
      it: 'Semplicemente prende il nome dai suoi due ingredienti principali: vodka e acqua tonica.',
      vi: 'Đơn giản được đặt theo hai nguyên liệu chính của nó: vodka và nước tonic.',
    },
  },

  taste: {
    profile: ['bitter', 'refreshing', 'crisp', 'citrus'],
    description: {
      en: "Clean and crisp with the tonic's characteristic bitterness from quinine. The vodka provides a neutral backbone that allows the tonic's botanicals to shine, while lime adds bright citrus notes. More straightforward and less complex than a Gin & Tonic.",
      it: 'Pulito e frizzante con la caratteristica amarezza della tonica dal chinino. La vodka fornisce una base neutra che permette alle botaniche della tonica di brillare, mentre il lime aggiunge note di agrumi brillanti. Più diretto e meno complesso di un Gin & Tonic.',
      vi: 'Trong sạch và sắc nét với vị đắng đặc trưng của tonic từ quinine. Vodka cung cấp xương sống trung tính cho phép thảo mộc của tonic tỏa sáng, trong khi chanh thêm hương cam quýt tươi sáng. Thẳng thắn hơn và ít phức tạp hơn Gin & Tonic.',
    },
    first_impression: {
      en: 'Crisp tonic bitterness with clean vodka and bright lime',
      it: 'Amarezza frizzante della tonica con vodka pulita e lime brillante',
      vi: 'Vị đắng tonic sắc nét với vodka trong sạch và chanh tươi sáng',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering quinine bitterness',
      it: 'Finale pulito e rinfrescante con amarezza persistente di chinino',
      vi: 'Kết thúc trong sạch, tươi mát với vị đắng quinine kéo dài',
    },
    balance: {
      en: 'Well-balanced between vodka neutrality and tonic bitterness, with lime brightening the whole drink',
      it: "Ben bilanciato tra la neutralità della vodka e l'amarezza della tonica, con il lime che illumina l'intero drink",
      vi: 'Cân bằng tốt giữa tính trung tính của vodka và vị đắng tonic, với chanh làm sáng toàn bộ thức uống',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'happy_hour'],
    occasions: ['casual', 'social', 'aperitivo', 'summer'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs well with light appetizers, seafood, sushi, salads, and Mediterranean dishes. Excellent with oysters, ceviche, and light cheese plates.',
      it: 'Si abbina bene con antipasti leggeri, frutti di mare, sushi, insalate e piatti mediterranei. Eccellente con ostriche, ceviche e taglieri di formaggi leggeri.',
      vi: 'Kết hợp tốt với món khai vị nhẹ, hải sản, sushi, salad và món Địa Trung Hải. Tuyệt vời với hàu, ceviche và đĩa phô mai nhẹ.',
    },
    ideal_for: {
      en: "Perfect for those who enjoy the refreshing bitterness of tonic but prefer vodka's neutrality over gin's botanical character. Great for warm weather, aperitivo hour, or anyone seeking a clean, crisp drink.",
      it: "Perfetto per chi apprezza l'amarezza rinfrescante della tonica ma preferisce la neutralità della vodka al carattere botanico del gin. Ottimo per il clima caldo, l'ora dell'aperitivo o per chiunque cerchi un drink pulito e frizzante.",
      vi: 'Hoàn hảo cho những ai thích vị đắng tươi mát của tonic nhưng thích tính trung tính của vodka hơn đặc tính thảo mộc của gin. Tuyệt vời cho thời tiết ấm, giờ aperitivo hoặc bất kỳ ai tìm kiếm thức uống trong sạch, sảng khoái.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_TONIC_WATER',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Tonic water', it: 'Acqua tonica', vi: 'Nước tonic' },
    },
    {
      ingredient_id: 'ING_LIME',
      quantity: { amount: 1, unit: 'wedge' },
      display_name: { en: 'Lime wedge', it: 'Spicchio di lime', vi: 'Lát chanh' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka over ice. Top with tonic water. Squeeze lime wedge over drink and drop it in. Stir gently once.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare la vodka sul ghiaccio. Completare con acqua tonica. Spremere uno spicchio di lime sul drink e lasciarlo cadere. Mescolare delicatamente una volta.',
    vi: 'Đổ đầy ly highball với đá. Rót vodka lên đá. Thêm nước tonic lên trên. Vắt lát chanh lên thức uống và thả vào. Khuấy nhẹ một lần.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['bitter', 'refreshing', 'crisp', 'citrus'],

  abv_estimate: 10,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 20,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'quinine_sensitivity'],
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
  occasion_tags: ['casual', 'social', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['gin-and-tonic', 'vodka-soda'],

  notes_for_staff:
    'Quality of tonic water is crucial - premium tonics like Fever-Tree make a huge difference. Use fresh lime, not bottled juice. Ratio is flexible - typically 1:2 vodka to tonic.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1247/vodka-tonic',
    notes: 'Popular variation of Gin & Tonic, emerged during 1950s vodka boom.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
