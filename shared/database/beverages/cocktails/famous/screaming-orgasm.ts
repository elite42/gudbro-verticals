/**
 * Famous Cocktails: Screaming Orgasm
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const screamingOrgasm: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e',
  slug: 'screaming-orgasm',
  stable_key: 'screaming_orgasm_vodka_amaretto_kahlua_baileys_cream',

  name: {
    en: 'Screaming Orgasm',
    it: 'Screaming Orgasm',
    vi: 'Screaming Orgasm',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'shooter', 'sweet', 'coffee', 'nutty', 'vodka-based'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The boozy big brother of the Orgasm, adding vodka to the mix of amaretto, coffee liqueur, Irish cream, and cream. This infamous shooter delivers an even more intense explosion of sweet, creamy flavors with an extra alcoholic kick.',
    it: 'Il fratello maggiore alcolico dell\'Orgasm, che aggiunge vodka al mix di amaretto, liquore al caffè, crema irlandese e panna. Questo famigerato shooter offre un\'esplosione ancora più intensa di sapori dolci e cremosi con un calcio alcolico extra.',
    vi: 'Anh trai có nhiều cồn hơn của Orgasm, thêm vodka vào hỗn hợp amaretto, rượu mùi cà phê, kem Ireland và kem. Shooter nổi tiếng này mang đến một vụ nổ thậm chí còn mãnh liệt hơn của hương vị ngọt, béo ngậy với cú đá cồn bổ sung.',
  },

  history: {
    created_year: '1980s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Screaming Orgasm emerged shortly after the original Orgasm shot in the 1980s. Bartenders created this variation by adding vodka to increase the alcohol content while maintaining the same sweet, creamy flavor profile. The name escalation from "Orgasm" to "Screaming Orgasm" suggested a more intense experience. This shot became part of the notorious family of provocatively-named drinks that dominated American bar culture in the late 1980s and early 1990s, particularly popular at bachelor/bachelorette parties and nightclubs.',
      it: 'Lo Screaming Orgasm emerse poco dopo lo shot Orgasm originale negli anni \'80. I barman crearono questa variazione aggiungendo vodka per aumentare il contenuto alcolico mantenendo lo stesso profilo aromatico dolce e cremoso. L\'escalation del nome da "Orgasm" a "Screaming Orgasm" suggeriva un\'esperienza più intensa. Questo shot divenne parte della famigerata famiglia di bevande dal nome provocatorio che dominarono la cultura dei bar americana alla fine degli anni \'80 e all\'inizio degli anni \'90, particolarmente popolare agli addii al celibato/nubilato e nelle discoteche.',
      vi: 'Screaming Orgasm xuất hiện ngay sau shot Orgasm gốc vào những năm 1980. Bartender đã tạo ra biến thể này bằng cách thêm vodka để tăng hàm lượng cồn trong khi vẫn duy trì cùng hồ sơ hương vị ngọt, béo ngậy. Sự leo thang tên từ "Orgasm" sang "Screaming Orgasm" gợi ý một trải nghiệm mãnh liệt hơn. Shot này đã trở thành một phần của họ đồ uống có tên khiêu khích khét tiếng thống trị văn hóa quầy bar Mỹ vào cuối những năm 1980 và đầu những năm 1990, đặc biệt phổ biến tại các bữa tiệc độc thân và hộp đêm.',
    },
    named_after: {
      en: 'The provocative name suggests an even more intense, pleasurable experience than the original Orgasm shot, thanks to the added vodka.',
      it: 'Il nome provocatorio suggerisce un\'esperienza ancora più intensa e piacevole rispetto allo shot Orgasm originale, grazie alla vodka aggiunta.',
      vi: 'Cái tên khiêu khích gợi ý một trải nghiệm thậm chí còn mãnh liệt, dễ chịu hơn shot Orgasm gốc, nhờ vodka được thêm vào.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee', 'nutty', 'boozy'],
    description: {
      en: 'Intensely sweet and creamy with harmonious notes of almond, coffee, and chocolate, plus a noticeable vodka kick. The vodka adds strength without altering the dessert-like flavor profile, creating a more potent version of the original Orgasm.',
      it: 'Intensamente dolce e cremoso con armoniose note di mandorla, caffè e cioccolato, più un notevole calcio di vodka. La vodka aggiunge forza senza alterare il profilo aromatico simile al dessert, creando una versione più potente dell\'Orgasm originale.',
      vi: 'Cực kỳ ngọt và béo ngậy với hương vị hòa quyện của hạnh nhân, cà phê và chocolate, cộng với cú đá vodka đáng chú ý. Vodka thêm sức mạnh mà không thay đổi hồ sơ hương vị giống món tráng miệng, tạo ra phiên bản mạnh hơn của Orgasm gốc.',
    },
    first_impression: {
      en: 'Sweet cream explosion with immediate almond, coffee, and vodka punch',
      it: 'Esplosione di crema dolce con immediato pugno di mandorla, caffè e vodka',
      vi: 'Vụ nổ kem ngọt với cú đấm hạnh nhân, cà phê và vodka ngay lập tức',
    },
    finish: {
      en: 'Lingering sweetness with stronger alcohol warmth than the original',
      it: 'Dolcezza persistente con calore alcolico più forte dell\'originale',
      vi: 'Vị ngọt kéo dài với sự ấm áp cồn mạnh hơn bản gốc',
    },
    balance: {
      en: 'Very sweet and indulgent with more alcoholic strength - designed for party intensity',
      it: 'Molto dolce e indulgente con più forza alcolica - progettato per l\'intensità della festa',
      vi: 'Rất ngọt và nuông chiều với sức mạnh cồn hơn - được thiết kế cho cường độ tiệc tùng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'bachelor_party', 'nightclub'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Typically consumed as a standalone party shot. Best enjoyed between other drinks or as a liquid dessert.',
      it: 'Tipicamente consumato come shot da festa standalone. Si gusta meglio tra altre bevande o come dessert liquido.',
      vi: 'Thường được tiêu thụ như một shot tiệc độc lập. Tốt nhất khi thưởng thức giữa các đồ uống khác hoặc như một món tráng miệng lỏng.',
    },
    ideal_for: {
      en: 'Perfect for those who want a stronger version of the Orgasm shot. Ideal for high-energy parties, celebrations, and guests seeking an indulgent but potent shot. Popular at bachelor/bachelorette parties.',
      it: 'Perfetto per chi vuole una versione più forte dello shot Orgasm. Ideale per feste ad alta energia, celebrazioni e ospiti che cercano uno shot indulgente ma potente. Popolare agli addii al celibato/nubilato.',
      vi: 'Hoàn hảo cho những ai muốn phiên bản mạnh hơn của shot Orgasm. Lý tưởng cho các bữa tiệc năng lượng cao, lễ kỷ niệm và khách tìm kiếm shot nuông chiều nhưng mạnh mẽ. Phổ biến tại các bữa tiệc độc thân.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
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
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 10 seconds until well-chilled. Strain into a shot glass or double shot glass. Shoot in one gulp for full impact. Can also be served on the rocks in a rocks glass for a cocktail version.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 10 secondi fino a quando è ben freddo. Filtrare in un bicchierino o bicchierino doppio. Bere in un colpo per l\'impatto completo. Può anche essere servito con ghiaccio in un bicchiere rocks per una versione cocktail.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 10 giây cho đến khi lạnh kỹ. Lọc vào ly shot hoặc ly shot đôi. Uống một hơi để có tác động đầy đủ. Cũng có thể được phục vụ với đá trong ly rocks để có phiên bản cocktail.',
  },

  glass: 'Shot glass (or Double shot glass)',

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
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'coffee', 'nutty', 'boozy'],

  abv_estimate: 20,

  calories_estimate: 210,

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
  occasion_tags: ['party', 'celebration', 'nightclub'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['orgasm', 'multiple-orgasm', 'screaming-multiple-orgasm'],

  notes_for_staff: 'Contains nut liqueur - check for allergies. Stronger than regular Orgasm due to vodka. Name may require discretion. Very popular at bachelor/bachelorette parties. Can be made as a cocktail over ice. Some recipes use equal parts of all five ingredients.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffords guide.com/cocktails/recipe/2152/screaming-orgasm',
    note: 'Stronger variation of the Orgasm shot, popular in 1980s-90s bar culture.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
