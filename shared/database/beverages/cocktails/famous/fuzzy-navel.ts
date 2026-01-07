/**
 * Famous Cocktails: Fuzzy Navel
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const fuzzyNavel: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-2345-6789-b234-678901234567',
  slug: 'fuzzy-navel',
  stable_key: 'f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',

  name: {
    en: 'Fuzzy Navel',
    it: 'Fuzzy Navel',
    vi: 'Fuzzy Navel',
    ko: '퍼지 네이블',
    ja: 'ファジーネーブル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'peach', 'orange', 'sweet', '1980s', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sweet and simple cocktail combining peach schnapps with fresh orange juice. The Fuzzy Navel became a sensation in the 1980s with its approachable flavor and playful name, making it a staple at parties and bars worldwide.',
    it: "Un cocktail dolce e semplice che combina schnapps alla pesca con succo d'arancia fresco. Il Fuzzy Navel divenne una sensazione negli anni '80 con il suo sapore accessibile e il nome giocoso, diventando un punto fermo alle feste e nei bar di tutto il mondo.",
    vi: 'Một cocktail ngọt ngào và đơn giản kết hợp schnapps đào với nước cam tươi. Fuzzy Navel trở thành hiện tượng vào những năm 1980 với hương vị dễ tiếp cận và cái tên vui nhộn, trở thành thức uống chính tại các bữa tiệc và quán bar trên toàn thế giới.',
  },

  history: {
    created_year: '1984',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Fuzzy Navel was created in 1984 by National Distillers as a marketing vehicle for DeKuyper Peachtree Schnapps. The name is a playful reference to the "fuzzy" peach skin and "navel" orange. It became an instant hit, particularly among young adults and college students, during the 1980s schnapps craze. The drink\'s simplicity (just two ingredients) and sweet, non-threatening flavor made it extremely popular. It spawned numerous variations and helped establish peach schnapps as a bar staple.',
      it: 'Il Fuzzy Navel fu creato nel 1984 da National Distillers come veicolo di marketing per DeKuyper Peachtree Schnapps. Il nome è un riferimento giocoso alla buccia "pelosa" della pesca e all\'arancia "navel". Divenne un successo immediato, in particolare tra i giovani adulti e gli studenti universitari, durante la mania degli schnapps degli anni \'80. La semplicità del drink (solo due ingredienti) e il sapore dolce e non minaccioso lo resero estremamente popolare. Generò numerose variazioni e aiutò a stabilire lo schnapps alla pesca come un punto fermo del bar.',
      vi: 'Fuzzy Navel được tạo ra vào năm 1984 bởi National Distillers như một phương tiện tiếp thị cho DeKuyper Peachtree Schnapps. Cái tên là một ám chỉ vui nhộn đến vỏ đào "lông tơ" và cam "rốn". Nó trở thành hit ngay lập tức, đặc biệt trong giới trẻ và sinh viên đại học, trong thời kỳ schnapps bùng nổ của những năm 1980. Sự đơn giản của thức uống (chỉ hai nguyên liệu) và hương vị ngọt ngào, không đe dọa khiến nó cực kỳ phổ biến. Nó tạo ra nhiều biến thể và giúp thiết lập schnapps đào như một thức uống chính của quán bar.',
    },
    named_after: {
      en: 'Named for the "fuzzy" skin of a peach and "navel" orange, creating a playful, memorable name that contributed to its popularity.',
      it: 'Prende il nome dalla buccia "pelosa" della pesca e dall\'arancia "navel", creando un nome giocoso e memorabile che contribuì alla sua popolarità.',
      vi: 'Được đặt theo vỏ "lông tơ" của đào và cam "rốn", tạo ra một cái tên vui nhộn, đáng nhớ góp phần vào sự phổ biến của nó.',
    },
  },

  taste: {
    profile: ['sweet', 'fruity', 'peach', 'orange'],
    description: {
      en: 'Sweet and intensely fruity with dominant peach and orange flavors. Very smooth and easy-drinking with minimal alcohol burn, making it almost dangerously drinkable. The peach schnapps provides sweetness and peach flavor while the orange juice adds fresh citrus notes.',
      it: "Dolce e intensamente fruttato con sapori dominanti di pesca e arancia. Molto morbido e facile da bere con minima sensazione alcolica, rendendolo quasi pericolosamente bevibile. Lo schnapps alla pesca fornisce dolcezza e sapore di pesca mentre il succo d'arancia aggiunge note fresche di agrumi.",
      vi: 'Ngọt ngào và cực kỳ trái cây với hương đào và cam nổi bật. Rất mượt mà và dễ uống với cảm giác cồn tối thiểu, khiến nó gần như nguy hiểm vì quá dễ uống. Schnapps đào mang lại vị ngọt và hương đào trong khi nước cam thêm hương cam quýt tươi mát.',
    },
    first_impression: {
      en: 'Sweet peach and orange burst, very fruity and smooth',
      it: 'Esplosione di pesca dolce e arancia, molto fruttato e morbido',
      vi: 'Vị đào và cam ngọt bùng nổ, rất trái cây và mượt mà',
    },
    finish: {
      en: 'Sweet, smooth finish with lingering peach and orange notes',
      it: 'Finale dolce e morbido con note persistenti di pesca e arancia',
      vi: 'Kết thúc ngọt ngào, mượt mà với hương đào và cam kéo dài',
    },
    balance: {
      en: 'Heavily sweet-leaning with no tartness to balance - pure fruit sweetness throughout',
      it: "Fortemente inclinato verso la dolcezza senza acidità per bilanciare - pura dolcezza di frutta dall'inizio alla fine",
      vi: 'Nghiêng mạnh về vị ngọt không có vị chua để cân bằng - vị ngọt trái cây thuần khiết xuyên suốt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'brunch'],
    occasions: ['party', 'casual', 'poolside', 'celebration'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Best as a standalone party drink. Can pair with light brunch items, fruit plates, and sweet breakfast pastries. Works with salty snacks that contrast the sweetness.',
      it: 'Meglio come drink da festa autonomo. Può abbinarsi con piatti leggeri da brunch, piatti di frutta e pasticceria dolce per la colazione. Funziona con snack salati che contrastano la dolcezza.',
      vi: 'Tốt nhất như thức uống tiệc độc lập. Có thể kết hợp với các món brunch nhẹ, đĩa trái cây và bánh ngọt bữa sáng. Phù hợp với đồ ăn nhẹ mặn tương phản với vị ngọt.',
    },
    ideal_for: {
      en: 'Perfect for those who prefer sweet, non-alcoholic-tasting drinks. Great for people new to cocktails or anyone who wants a fun, easy-drinking party beverage. Popular with younger crowds.',
      it: 'Perfetto per chi preferisce drink dolci dal sapore non alcolico. Ottimo per le persone nuove ai cocktail o per chiunque voglia una bevanda da festa divertente e facile da bere. Popolare tra il pubblico giovane.',
      vi: 'Hoàn hảo cho những ai thích đồ uống ngọt không có vị rượu. Tuyệt vời cho người mới với cocktail hoặc bất kỳ ai muốn thức uống tiệc vui vẻ, dễ uống. Phổ biến với giới trẻ.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PEACH_SCHNAPPS',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Peach schnapps', it: 'Schnapps alla pesca', vi: 'Schnapps đào' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour peach schnapps over ice, then top with fresh orange juice. Stir gently to combine. Garnish with an orange slice and peach slice if available.',
    it: "Riempire un bicchiere highball con ghiaccio. Versare lo schnapps alla pesca sul ghiaccio, quindi completare con succo d'arancia fresco. Mescolare delicatamente per combinare. Guarnire con una fetta d'arancia e una fetta di pesca se disponibile.",
    vi: 'Đổ đầy ly highball với đá. Rót schnapps đào lên đá, sau đó thêm nước cam tươi. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát cam và lát đào nếu có.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice, optional peach slice',
    it: "Fetta d'arancia, fetta di pesca opzionale",
    vi: 'Lát cam, lát đào tùy chọn',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PEACH_SCHNAPPS'],

  flavor_profile: ['sweet', 'fruity', 'peach', 'orange'],

  abv_estimate: 8,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 25,

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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['party', 'casual', 'poolside'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['hairy-navel', 'woo-woo', 'sex-on-the-beach'],

  notes_for_staff:
    'Add vodka to make it a "Hairy Navel". Use fresh orange juice for best flavor. Very popular with college-age crowds. Quality peach schnapps recommended - avoid artificial flavors.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1241/fuzzy-navel',
    notes: 'Created in 1984 by National Distillers for DeKuyper Peachtree Schnapps marketing.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
