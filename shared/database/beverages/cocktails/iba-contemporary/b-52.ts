/**
 * IBA Contemporary Classics: B-52
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const b52: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '9e8d7c6b-5a4f-3e2d-1c0b-9a8f7e6d5c4b',
  slug: 'b-52',
  stable_key: 'b_52_iba_contemporary_classic',

  name: {
    en: 'B-52',
    it: 'B-52',
    vi: 'B-52',
    ko: 'B-52',
    ja: 'B-52',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'layered', 'shot', 'coffee', 'sweet', 'party', 'flaming'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A visually stunning layered shot combining coffee liqueur, Irish cream, and orange liqueur. Famous for its three distinct layers and often served flaming, the B-52 is a party favorite and a bartender's showcase of layering technique.",
    it: "Uno shot stratificato visivamente stupefacente che combina liquore al caffè, crema irlandese e liquore all'arancia. Famoso per i suoi tre strati distinti e spesso servito fiammeggiante, il B-52 è il favorito delle feste e una vetrina della tecnica di stratificazione del barman.",
    vi: 'Một shot phân lớp tuyệt đẹp về mặt thị giác kết hợp rượu mùi cà phê, kem Ireland và rượu mùi cam. Nổi tiếng với ba lớp riêng biệt và thường được phục vụ cháy, B-52 là món yêu thích trong tiệc tùng và là màn trình diễn kỹ thuật phân lớp của bartender.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'Calgary',
      bar: 'Keg Steakhouse',
      country: 'Canada',
    },
    creator: {
      name: 'Peter Fich',
      profession: 'bartender',
    },
    story: {
      en: 'Created by bartender Peter Fich at the Keg Steakhouse in Calgary, Alberta, Canada in the late 1970s. The drink is named after the B-52 Stratofortress long-range bomber aircraft used by the United States Air Force. Fich created a series of layered shots named after military aircraft. The B-52 became the most famous of this family, which also includes the B-51, B-53, and B-54. The drink gained international popularity in the 1980s and became a staple of the shooter/layered shot category.',
      it: "Creato dal barman Peter Fich al Keg Steakhouse di Calgary, Alberta, Canada alla fine degli anni '70. Il drink prende il nome dal bombardiere strategico B-52 Stratofortress a lungo raggio usato dall'Aeronautica degli Stati Uniti. Fich creò una serie di shot stratificati che prendevano il nome da aerei militari. Il B-52 divenne il più famoso di questa famiglia, che include anche il B-51, B-53 e B-54. Il drink ottenne popolarità internazionale negli anni '80 e divenne un punto fermo della categoria shooter/shot stratificati.",
      vi: 'Được tạo ra bởi bartender Peter Fich tại Keg Steakhouse ở Calgary, Alberta, Canada vào cuối những năm 1970. Thức uống được đặt tên theo máy bay ném bom tầm xa B-52 Stratofortress được Không quân Hoa Kỳ sử dụng. Fich tạo ra một loạt shot phân lớp được đặt tên theo máy bay quân sự. B-52 trở thành nổi tiếng nhất trong gia đình này, cũng bao gồm B-51, B-53 và B-54. Thức uống trở nên phổ biến quốc tế vào những năm 1980 và trở thành món chính của thể loại shooter/shot phân lớp.',
    },
    named_after: {
      en: "Named after the Boeing B-52 Stratofortress, a long-range strategic bomber aircraft. The layered presentation supposedly resembles the layers of the bomber's structure.",
      it: 'Prende il nome dal Boeing B-52 Stratofortress, un aereo bombardiere strategico a lungo raggio. La presentazione stratificata presumibilmente ricorda gli strati della struttura del bombardiere.',
      vi: 'Được đặt tên theo Boeing B-52 Stratofortress, một máy bay ném bom chiến lược tầm xa. Cách trình bày phân lớp được cho là giống với các lớp của cấu trúc máy bay ném bom.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'citrus', 'smooth'],
    description: {
      en: 'A harmonious blend of coffee, cream, and orange flavors. Kahlúa provides rich coffee base, Baileys adds creamy sweetness, and Grand Marnier brings bright orange citrus notes. Sweet, smooth, and dangerously easy to drink.',
      it: "Un'armoniosa miscela di sapori di caffè, panna e arancia. Il Kahlúa fornisce una ricca base di caffè, il Baileys aggiunge dolcezza cremosa e il Grand Marnier porta note di agrumi arancioni brillanti. Dolce, morbido e pericolosamente facile da bere.",
      vi: 'Sự pha trộn hài hòa của hương vị cà phê, kem và cam. Kahlúa cung cấp nền cà phê đậm đà, Baileys thêm vị ngọt béo ngậy và Grand Marnier mang đến hương cam quýt tươi sáng. Ngọt, mượt mà và nguy hiểm dễ uống.',
    },
    first_impression: {
      en: 'Orange citrus brightness followed by creamy coffee sweetness',
      it: 'Luminosità di agrumi arancioni seguita da dolcezza cremosa al caffè',
      vi: 'Vị cam quýt tươi sáng tiếp theo là vị ngọt cà phê béo ngậy',
    },
    finish: {
      en: 'Smooth, warming finish with coffee and cream lingering',
      it: 'Finale morbido e caldo con caffè e panna persistenti',
      vi: 'Kết thúc mượt mà, ấm áp với cà phê và kem kéo dài',
    },
    balance: {
      en: 'Well-balanced layers of distinct flavors - coffee, cream, and orange working in harmony',
      it: 'Strati ben bilanciati di sapori distinti - caffè, panna e arancia che lavorano in armonia',
      vi: 'Các lớp cân bằng tốt của hương vị riêng biệt - cà phê, kem và cam hoạt động hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'casual', 'nightcap'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Typically served as a standalone shot or after-dinner drink. Not usually paired with food, but works well after dessert or as a digestif.',
      it: 'Tipicamente servito come shot autonomo o drink dopo cena. Di solito non abbinato al cibo, ma funziona bene dopo il dessert o come digestivo.',
      vi: 'Thường được phục vụ như một shot độc lập hoặc đồ uống sau bữa tối. Thường không kết hợp với đồ ăn, nhưng hoạt động tốt sau món tráng miệng hoặc như một digestif.',
    },
    ideal_for: {
      en: 'Perfect for party settings and groups. Ideal for those who enjoy sweet, layered shots and want to see impressive bartending technique. Popular with younger crowds and celebration occasions.',
      it: 'Perfetto per feste e gruppi. Ideale per chi ama shot dolci e stratificati e vuole vedere tecniche di barman impressionanti. Popolare tra le folle più giovani e occasioni di celebrazione.',
      vi: 'Hoàn hảo cho bối cảnh tiệc tùng và nhóm. Lý tưởng cho những ai thích shot ngọt, phân lớp và muốn xem kỹ thuật pha chế ấn tượng. Phổ biến với đám đông trẻ tuổi và dịp kỷ niệm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
      },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Triple sec (Grand Marnier)',
        it: 'Triple sec (Grand Marnier)',
        vi: 'Triple sec (Grand Marnier)',
      },
    },
  ],

  method: 'layer',

  instructions: {
    en: 'Layer ingredients one by one into a shot glass in the order listed. Start with coffee liqueur at the bottom, carefully layer Baileys on top using the back of a bar spoon, then layer Grand Marnier on top. The key is to pour slowly and gently to maintain distinct layers. Can be served flaming (ignite the Grand Marnier layer) but must be extinguished before drinking.',
    it: "Stratificare gli ingredienti uno per uno in un bicchierino da shot nell'ordine elencato. Iniziare con il liquore al caffè sul fondo, stratificare con cura il Baileys sopra usando il retro di un cucchiaio da bar, poi stratificare il Grand Marnier sopra. La chiave è versare lentamente e delicatamente per mantenere strati distinti. Può essere servito fiammeggiante (accendere lo strato di Grand Marnier) ma deve essere spento prima di bere.",
    vi: 'Phân lớp nguyên liệu từng cái một vào ly shot theo thứ tự được liệt kê. Bắt đầu với rượu mùi cà phê ở dưới cùng, cẩn thận phân lớp Baileys lên trên bằng mặt sau của thìa bar, sau đó phân lớp Grand Marnier lên trên. Chìa khóa là đổ chậm và nhẹ nhàng để duy trì các lớp riêng biệt. Có thể được phục vụ cháy (đốt lớp Grand Marnier) nhưng phải dập tắt trước khi uống.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'None (optional: flame the top layer)',
    it: 'Nessuna (opzionale: fiammeggiare lo strato superiore)',
    vi: 'Không (tùy chọn: đốt lớp trên cùng)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COFFEE_LIQUEUR', 'ING_IRISH_CREAM', 'ING_TRIPLE_SEC'],

  flavor_profile: ['creamy', 'sweet', 'citrus', 'smooth'],

  abv_estimate: 25,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['party', 'celebration', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['b-51', 'b-53', 'b-54', 'flaming-b-52', 'b-52-bomber'],

  notes_for_staff:
    'Layering requires patience and steady hand. Pour slowly over the back of a bar spoon to maintain layers. Kahlúa (heaviest) goes first, then Baileys, then Grand Marnier (lightest). If flaming: light only the top layer, ensure guest knows to blow out flame before drinking. Never serve a flaming shot without safety instructions. Practice layering technique before service. Equal parts = perfect visual layers.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/b-52/',
    notes:
      'IBA Official Recipe. Historical information from cocktail history sources and Peter Fich interviews.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
