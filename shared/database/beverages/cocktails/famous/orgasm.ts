/**
 * Famous Cocktails: Orgasm
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const orgasm: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
  slug: 'orgasm',
  stable_key: 'orgasm_amaretto_kahlua_baileys_cream',

  name: {
    en: 'Orgasm',
    it: 'Orgasm',
    vi: 'Orgasm',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'shooter', 'sweet', 'coffee', 'nutty'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A decadent shooter combining amaretto, coffee liqueur, Irish cream, and cream. This infamous shot delivers an explosion of sweet, creamy flavors with notes of almond, coffee, and chocolate in one indulgent gulp.',
    it: 'Uno shooter decadente che combina amaretto, liquore al caffè, crema irlandese e panna. Questo famigerato shot offre un\'esplosione di sapori dolci e cremosi con note di mandorla, caffè e cioccolato in un unico sorso indulgente.',
    vi: 'Một loại shooter xa hoa kết hợp amaretto, rượu mùi cà phê, kem Ireland và kem. Shot nổi tiếng này mang đến một vụ nổ hương vị ngọt, béo ngậy với hương vị hạnh nhân, cà phê và chocolate trong một ngụm nuông chiều.',
  },

  history: {
    created_year: '1980s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Orgasm shot emerged in the 1980s during the height of the shooter craze in American bars. Its provocative name and intensely sweet, creamy flavor made it an instant hit at parties and nightclubs. The drink became part of a family of similarly-named shots (Screaming Orgasm, Multiple Orgasm, etc.) that dominated bar culture in the late 1980s and 1990s. While some consider the name dated, the delicious combination of amaretto, coffee liqueur, and cream remains popular as both a shot and a cocktail.',
      it: 'Lo shot Orgasm emerse negli anni \'80 durante l\'apice della mania degli shooter nei bar americani. Il suo nome provocatorio e il sapore intensamente dolce e cremoso lo resero un successo immediato a feste e discoteche. La bevanda divenne parte di una famiglia di shot con nomi simili (Screaming Orgasm, Multiple Orgasm, ecc.) che dominarono la cultura dei bar alla fine degli anni \'80 e \'90. Sebbene alcuni considerino il nome datato, la deliziosa combinazione di amaretto, liquore al caffè e panna rimane popolare sia come shot che come cocktail.',
      vi: 'Shot Orgasm xuất hiện vào những năm 1980 trong thời kỳ đỉnh cao của cơn sốt shooter ở các quầy bar Mỹ. Cái tên kh挑 khích và hương vị cực kỳ ngọt, béo ngậy đã khiến nó trở thành hit ngay lập tức tại các bữa tiệc và hộp đêm. Thức uống đã trở thành một phần của họ các shot có tên tương tự (Screaming Orgasm, Multiple Orgasm, v.v.) thống trị văn hóa quầy bar vào cuối những năm 1980 và 1990. Mặc dù một số người coi tên này lỗi thời, sự kết hợp ngon của amaretto, rượu mùi cà phê và kem vẫn phổ biến như cả shot và cocktail.',
    },
    named_after: {
      en: 'The provocative name refers to the intensely pleasurable, indulgent experience of drinking this sweet, creamy shot.',
      it: 'Il nome provocatorio si riferisce all\'esperienza intensamente piacevole e indulgente di bere questo shot dolce e cremoso.',
      vi: 'Cái tên khiêu khích đề cập đến trải nghiệm cực kỳ dễ chịu, nuông chiều khi uống shot ngọt, béo ngậy này.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee', 'nutty'],
    description: {
      en: 'Intensely sweet and creamy with harmonious notes of almond, coffee, and chocolate. The amaretto provides nutty sweetness, the Kahlúa adds coffee depth, and the Baileys and cream create a silky, indulgent texture. Very dessert-forward and smooth.',
      it: 'Intensamente dolce e cremoso con armoniose note di mandorla, caffè e cioccolato. L\'amaretto fornisce dolcezza nocciolata, il Kahlúa aggiunge profondità di caffè, e il Baileys e la panna creano una consistenza setosa e indulgente. Molto orientato al dessert e liscio.',
      vi: 'Cực kỳ ngọt và béo ngậy với hương vị hòa quyện của hạnh nhân, cà phê và chocolate. Amaretto cung cấp vị ngọt hạt, Kahlúa thêm chiều sâu cà phê, và Baileys và kem tạo ra kết cấu mượt như lụa, nuông chiều. Rất hướng tráng miệng và mượt mà.',
    },
    first_impression: {
      en: 'Sweet cream explosion with immediate almond and coffee notes',
      it: 'Esplosione di crema dolce con immediate note di mandorla e caffè',
      vi: 'Vụ nổ kem ngọt với hương hạnh nhân và cà phê ngay lập tức',
    },
    finish: {
      en: 'Lingering sweetness with coffee, almond, and cream',
      it: 'Dolcezza persistente con caffè, mandorla e panna',
      vi: 'Vị ngọt kéo dài với cà phê, hạnh nhân và kem',
    },
    balance: {
      en: 'Very sweet and indulgent - designed for pleasure rather than balance',
      it: 'Molto dolce e indulgente - progettato per il piacere piuttosto che per l\'equilibrio',
      vi: 'Rất ngọt và nuông chiều - được thiết kế cho niềm vui hơn là sự cân bằng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'bachelor_party', 'casual'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Typically consumed as a standalone shot. Can accompany desserts or serve as a liquid dessert itself.',
      it: 'Tipicamente consumato come shot standalone. Può accompagnare dessert o servire come dessert liquido stesso.',
      vi: 'Thường được tiêu thụ như một shot độc lập. Có thể đi kèm với món tráng miệng hoặc tự phục vụ như một món tráng miệng lỏng.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy very sweet, creamy shots. Ideal for parties, celebrations, and social drinking occasions. Popular with guests seeking an indulgent, dessert-like shot experience.',
      it: 'Perfetto per chi ama gli shot molto dolci e cremosi. Ideale per feste, celebrazioni e occasioni di bevute sociali. Popolare con gli ospiti che cercano un\'esperienza di shot indulgente simile al dessert.',
      vi: 'Hoàn hảo cho những ai thích shot rất ngọt, béo ngậy. Lý tưởng cho các bữa tiệc, lễ kỷ niệm và dịp uống rượu xã hội. Phổ biến với khách tìm kiếm trải nghiệm shot nuông chiều giống món tráng miệng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_AMARETTO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Amaretto', it: 'Amaretto', vi: 'Amaretto' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake well for 10 seconds until chilled. Strain into a shot glass. Shoot in one gulp or sip slowly to enjoy the flavors. Can also be served on the rocks in a rocks glass for a longer drinking experience.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene per 10 secondi fino a raffreddare. Filtrare in un bicchierino. Bere in un colpo o sorseggiare lentamente per godere dei sapori. Può anche essere servito con ghiaccio in un bicchiere rocks per un\'esperienza di bevuta più lunga.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ trong 10 giây cho đến khi lạnh. Lọc vào ly shot. Uống một hơi hoặc nhấp từ từ để thưởng thức hương vị. Cũng có thể được phục vụ với đá trong ly rocks để có trải nghiệm uống lâu hơn.',
  },

  glass: 'Shot glass (or Rocks glass)',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_AMARETTO'],

  flavor_profile: ['creamy', 'sweet', 'coffee', 'nutty'],

  abv_estimate: 15,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'tree_nuts'],
    intolerances: ['lactose', 'alcohol', 'caffeine', 'nut_allergy'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['party', 'celebration', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['screaming-orgasm', 'multiple-orgasm', 'slow-comfortable-screw'],

  notes_for_staff: 'Contains nut liqueur - check for allergies. Name may require discretion with certain clientele. Can be made as a cocktail over ice for slower consumption. Very popular party shot. Some recipes add vodka (becomes Screaming Orgasm).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/orgasm/',
    note: 'Classic 1980s party shooter with provocative name.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
