/**
 * IBA New Era Drinks: Spritz Veneziano
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const spritz: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4123-e5f6-a7b8c9d01234',
  slug: 'spritz',
  stable_key: 'd6c5b4a3e2f10987564382910047563829174638',

  name: {
    en: 'Spritz Veneziano',
    it: 'Spritz Veneziano',
    vi: 'Spritz Veneziano',
    ko: '스프리츠 베네치아노',
    ja: 'スプリッツ・ヴェネツィアーノ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'aperitivo', 'bitter', 'italian', 'sparkling'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Italy's iconic aperitivo cocktail combining prosecco, bitter liqueur (Aperol or Campari), and soda water. Born in Venice, the Spritz is the quintessential Italian happy hour drink with its brilliant orange color and refreshingly bitter-sweet taste.",
    it: "L'iconico cocktail aperitivo italiano che combina prosecco, liquore amaro (Aperol o Campari) e acqua di seltz. Nato a Venezia, lo Spritz è la quintessenza della bevanda italiana dell'happy hour con il suo brillante colore arancione e il gusto rinfrescante amaro-dolce.",
    vi: 'Cocktail aperitivo biểu tượng của Ý kết hợp prosecco, rượu mùi đắng (Aperol hoặc Campari) và nước soda. Sinh ra ở Venice, Spritz là thức uống giờ vui chơi tinh túy của Ý với màu cam rực rỡ và hương vị đắng ngọt sảng khoái.',
  },

  history: {
    created_year: '1800',
    origin: {
      city: 'Venice',
      bar: 'Various cafés',
      country: 'Italy',
    },
    creator: {
      name: 'Austrian soldiers',
      profession: 'military',
    },
    story: {
      en: 'The Spritz originated in Venice during the 19th century Habsburg occupation. Austrian soldiers found Italian wines too strong and requested them to be "spritzed" (spritzen in German means "to spray") with water. This evolved into adding soda water to wine. In the 1920s, the Aperol company popularized the modern version by promoting their bitter liqueur as the perfect addition. The classic Venetian formula is 3-2-1: three parts prosecco, two parts Aperol (or Campari for a more bitter version), and one part soda water. It became globally popular in the 2010s, particularly the Aperol Spritz variant.',
      it: "Lo Spritz ha avuto origine a Venezia durante l'occupazione asburgica del XIX secolo. I soldati austriaci trovavano i vini italiani troppo forti e chiedevano che fossero \"spruzzati\" (spritzen in tedesco significa \"spruzzare\") con acqua. Questo si è evoluto nell'aggiungere acqua di seltz al vino. Negli anni '20, l'azienda Aperol ha reso popolare la versione moderna promuovendo il loro liquore amaro come l'aggiunta perfetta. La formula veneziana classica è 3-2-1: tre parti di prosecco, due parti di Aperol (o Campari per una versione più amara) e una parte di acqua di seltz. È diventato popolare a livello globale negli anni 2010, in particolare la variante Aperol Spritz.",
      vi: 'Spritz có nguồn gốc từ Venice trong thời kỳ chiếm đóng Habsburg thế kỷ 19. Những người lính Áo thấy rượu vang Ý quá mạnh và yêu cầu "xịt" (spritzen trong tiếng Đức có nghĩa là "phun") với nước. Điều này phát triển thành việc thêm nước soda vào rượu vang. Vào những năm 1920, công ty Aperol đã phổ biến phiên bản hiện đại bằng cách quảng bá rượu mùi đắng của họ là sự bổ sung hoàn hảo. Công thức Venice cổ điển là 3-2-1: ba phần prosecco, hai phần Aperol (hoặc Campari cho phiên bản đắng hơn), và một phần nước soda. Nó trở nên phổ biến toàn cầu vào những năm 2010, đặc biệt là biến thể Aperol Spritz.',
    },
    named_after: {
      en: 'Named after the German word "spritzen" (to spray/spritz), referring to the addition of soda water.',
      it: 'Prende il nome dalla parola tedesca "spritzen" (spruzzare), riferendosi all\'aggiunta di acqua di seltz.',
      vi: 'Được đặt tên theo từ tiếng Đức "spritzen" (phun/xịt), ám chỉ việc thêm nước soda.',
    },
  },

  taste: {
    profile: ['bitter', 'refreshing', 'sparkling'],
    description: {
      en: 'Light, refreshing, and effervescent with a perfect balance of bitter orange, herbal complexity, and prosecco bubbles. The Aperol version is sweeter and more approachable; Campari makes it more intensely bitter.',
      it: 'Leggero, rinfrescante ed effervescente con un perfetto equilibrio di arancia amara, complessità erbacea e bollicine di prosecco. La versione Aperol è più dolce e accessibile; il Campari lo rende più intensamente amaro.',
      vi: 'Nhẹ nhàng, sảng khoái và sủi bọt với sự cân bằng hoàn hảo của cam đắng, độ phức tạp thảo mộc và bong bóng prosecco. Phiên bản Aperol ngọt hơn và dễ tiếp cận hơn; Campari làm cho nó đắng mãnh liệt hơn.',
    },
    first_impression: {
      en: 'Bright, fizzy prosecco bubbles followed by bittersweet orange and herbs',
      it: 'Bollicine luminose e frizzanti di prosecco seguite da arancia amaro-dolce ed erbe',
      vi: 'Bong bóng prosecco sáng, sủi bọt theo sau là cam đắng ngọt và thảo mộc',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering pleasant bitterness',
      it: 'Finale pulito e rinfrescante con amarezza piacevole persistente',
      vi: 'Kết thúc sạch, sảng khoái với vị đắng dễ chịu kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between bitter, sweet, and sparkling - the ultimate aperitivo',
      it: "Perfettamente bilanciato tra amaro, dolce e frizzante - l'aperitivo per eccellenza",
      vi: 'Cân bằng hoàn hảo giữa đắng, ngọt và sủi bọt - aperitivo tối thượng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['aperitivo', 'casual', 'brunch', 'social_gathering'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Perfect with Italian aperitivo snacks: olives, chips, focaccia, prosciutto, cheese, bruschetta. The bitterness stimulates appetite and cuts through rich foods.',
      it: "Perfetto con stuzzichini da aperitivo italiano: olive, patatine, focaccia, prosciutto, formaggio, bruschetta. L'amarezza stimola l'appetito e taglia i cibi ricchi.",
      vi: 'Hoàn hảo với đồ ăn nhẹ aperitivo Ý: ô liu, khoai tây chiên, focaccia, giăm bông, phô mai, bruschetta. Vị đắng kích thích cảm giác thèm ăn và cắt qua thức ăn béo.',
    },
    ideal_for: {
      en: 'Perfect for aperitivo hour (5-7pm) and anyone who enjoys light, refreshing, low-ABV drinks. Great for those new to bitter cocktails - start with Aperol before trying Campari.',
      it: "Perfetto per l'ora dell'aperitivo (17-19) e per chiunque ami le bevande leggere, rinfrescanti e a bassa gradazione alcolica. Ottimo per chi è nuovo ai cocktail amari - inizia con Aperol prima di provare il Campari.",
      vi: 'Hoàn hảo cho giờ aperitivo (5-7pm) và bất kỳ ai thích đồ uống nhẹ, sảng khoái, ABV thấp. Tuyệt vời cho những người mới với cocktail đắng - bắt đầu với Aperol trước khi thử Campari.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PROSECCO',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 60, unit: 'ml' },
      display_name: {
        en: 'Aperol (or Campari)',
        it: 'Aperol (o Campari)',
        vi: 'Aperol (hoặc Campari)',
      },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Soda water', it: 'Acqua di seltz', vi: 'Nước soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a large wine glass or rocks glass with ice. Pour prosecco, then Aperol (or Campari), then soda water. Stir gently to combine. Garnish with an orange slice.',
    it: "Riempire un bicchiere da vino grande o un rocks glass con ghiaccio. Versare il prosecco, poi l'Aperol (o Campari), poi l'acqua di seltz. Mescolare delicatamente per amalgamare. Guarnire con una fetta d'arancia.",
    vi: 'Đổ đầy ly rượu vang lớn hoặc ly rocks với đá. Đổ prosecco, sau đó Aperol (hoặc Campari), sau đó nước soda. Khuấy nhẹ để kết hợp. Trang trí bằng lát cam.',
  },

  glass: 'Wine glass or Rocks glass',

  garnish: {
    en: 'Orange slice',
    it: "Fetta d'arancia",
    vi: 'Lát cam',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PROSECCO'],

  flavor_profile: ['bitter', 'refreshing', 'sparkling'],

  abv_estimate: 8,

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'casual', 'brunch', 'social_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['aperol-spritz', 'campari-spritz', 'select-spritz', 'hugo-spritz'],

  notes_for_staff:
    "Classic ratio is 3-2-1 (prosecco-Aperol-soda). Aperol = sweeter and more approachable. Campari = more bitter and traditional. Always serve in a large glass filled with ice. Don't overstir - keep it bubbly.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 98,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/spritz/',
    notes:
      'IBA Official Recipe. Historical information from Venetian aperitivo culture and Aperol company archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
