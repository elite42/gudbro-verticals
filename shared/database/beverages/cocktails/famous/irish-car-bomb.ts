/**
 * Famous Cocktails: Irish Car Bomb
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const irishCarBomb: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'h8i9j0k1-2345-6789-hi89-jk01lm234567',
  slug: 'irish-car-bomb',
  stable_key: 'irish_car_bomb_shot_famous_guinness_baileys_bomb',

  name: {
    en: 'Irish Car Bomb',
    it: 'Irish Car Bomb',
    vi: 'Irish Car Bomb',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'bomb', 'beer', 'irish', 'creamy', 'st-patricks'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bomb shot combining Irish whiskey and Baileys Irish Cream dropped into Guinness stout. This potent drink must be consumed quickly before the cream curdles. NOTE: The name is considered offensive in Ireland due to its reference to The Troubles; alternative names include "Irish Slammer" or "Dublin Drop."',
    it: 'Un bomb shot che combina whiskey irlandese e Baileys Irish Cream lasciato cadere nella stout Guinness. Questa potente bevanda deve essere consumata rapidamente prima che la panna caglia. NOTA: Il nome è considerato offensivo in Irlanda a causa del suo riferimento ai Troubles; nomi alternativi includono "Irish Slammer" o "Dublin Drop."',
    vi: 'Một loại bomb shot kết hợp whiskey Ireland và Baileys Irish Cream được thả vào bia đen Guinness. Thức uống mạnh này phải được tiêu thụ nhanh chóng trước khi kem đông lại. LƯU Ý: Cái tên được coi là xúc phạm ở Ireland do ám chỉ đến The Troubles; tên thay thế bao gồm "Irish Slammer" hoặc "Dublin Drop."',
  },

  history: {
    created_year: '1979',
    origin: {
      city: 'Norwich',
      bar: "Wilson's Saloon",
      country: 'USA',
    },
    creator: {
      name: 'Charles Burke Cronin Oat',
      profession: 'bartender',
    },
    story: {
      en: "Created in 1979 by bartender Charles Oat at Wilson's Saloon in Norwich, Connecticut. While popular in America, especially around St. Patrick's Day, the drink's name is highly controversial and considered deeply offensive in Ireland due to its reference to the car bombings during The Troubles (1960s-1990s). Many Irish pubs refuse to serve it, and bartenders recommend using alternative names like \"Irish Slammer\" or simply avoiding the drink in Irish establishments.",
      it: "Creato nel 1979 dal barman Charles Oat al Wilson's Saloon di Norwich, Connecticut. Sebbene popolare in America, specialmente intorno al giorno di San Patrizio, il nome della bevanda è altamente controverso e considerato profondamente offensivo in Irlanda a causa del suo riferimento agli attentati bomba durante i Troubles (anni '60-'90). Molti pub irlandesi si rifiutano di servirlo e i barman consigliano di usare nomi alternativi come \"Irish Slammer\" o semplicemente di evitare la bevanda negli stabilimenti irlandesi.",
      vi: 'Được tạo ra vào năm 1979 bởi bartender Charles Oat tại Wilson\'s Saloon ở Norwich, Connecticut. Mặc dù phổ biến ở Mỹ, đặc biệt là vào Ngày Thánh Patrick, tên của thức uống này rất gây tranh cãi và được coi là xúc phạm sâu sắc ở Ireland do ám chỉ đến các vụ đánh bom xe trong The Troubles (những năm 1960-1990). Nhiều quán rượu Ireland từ chối phục vụ nó, và các bartender khuyên dùng tên thay thế như "Irish Slammer" hoặc đơn giản là tránh thức uống này tại các cơ sở Ireland.',
    },
    named_after: {
      en: 'CONTROVERSIAL: Named after car bomb attacks during The Troubles in Northern Ireland. This name is considered highly offensive in Ireland and should be avoided or replaced with "Irish Slammer" or "Dublin Drop."',
      it: 'CONTROVERSO: Prende il nome dagli attacchi con autobombe durante i Troubles nell\'Irlanda del Nord. Questo nome è considerato altamente offensivo in Irlanda e dovrebbe essere evitato o sostituito con "Irish Slammer" o "Dublin Drop."',
      vi: 'GÂY TRANH CÃI: Được đặt theo tên các vụ tấn công bom xe trong The Troubles ở Bắc Ireland. Cái tên này được coi là cực kỳ xúc phạm ở Ireland và nên tránh hoặc thay thế bằng "Irish Slammer" hoặc "Dublin Drop."',
    },
  },

  taste: {
    profile: ['creamy', 'malty', 'sweet', 'boozy'],
    description: {
      en: 'Rich and creamy with chocolate and coffee notes from Baileys, whiskey warmth, and the roasted malt character of Guinness. Creates a surprisingly smooth combination when drunk quickly.',
      it: 'Ricco e cremoso con note di cioccolato e caffè dal Baileys, calore del whiskey e il carattere di malto tostato della Guinness. Crea una combinazione sorprendentemente morbida quando bevuto rapidamente.',
      vi: 'Đậm đà và béo ngậy với hương chocolate và cà phê từ Baileys, hơi ấm whiskey và đặc tính malt rang của Guinness. Tạo ra sự kết hợp mượt mà đáng ngạc nhiên khi uống nhanh.',
    },
    first_impression: {
      en: 'Creamy sweetness meets roasted stout bitterness',
      it: "Dolcezza cremosa incontra l'amarezza della stout tostata",
      vi: 'Vị ngọt béo ngậy gặp vị đắng bia đen rang',
    },
    finish: {
      en: 'Rich, creamy finish with lingering whiskey warmth',
      it: 'Finale ricco e cremoso con calore persistente di whiskey',
      vi: 'Kết thúc đậm đà, béo ngậy với hơi ấm whiskey kéo dài',
    },
    balance: {
      en: 'Sweet cream balances bitter stout - must drink quickly before curdling',
      it: 'La crema dolce bilancia la stout amara - deve bere rapidamente prima che caglia',
      vi: 'Kem ngọt cân bằng bia đen đắng - phải uống nhanh trước khi đông lại',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'st_patricks_day', 'celebration'],
    seasons: ['all_year'],
    food_pairings: {
      en: "Not typically paired with food. Best consumed as a standalone drink. If serving around St. Patrick's Day, pairs with Irish pub food like shepherd's pie or fish and chips.",
      it: "In genere non abbinato al cibo. Meglio consumato come bevanda standalone. Se servito intorno al giorno di San Patrizio, si abbina al cibo da pub irlandese come shepherd's pie o fish and chips.",
      vi: "Thường không kết hợp với thức ăn. Tốt nhất là tiêu thụ như một thức uống độc lập. Nếu phục vụ vào Ngày Thánh Patrick, kết hợp với món ăn pub Ireland như bánh shepherd's pie hoặc cá và khoai tây chiên.",
    },
    ideal_for: {
      en: 'Popular in American bars around St. Patrick\'s Day. WARNING: Highly offensive in Ireland - use alternative names "Irish Slammer" or "Dublin Drop" or avoid entirely in Irish establishments. Must be consumed immediately.',
      it: 'Popolare nei bar americani intorno al giorno di San Patrizio. ATTENZIONE: Altamente offensivo in Irlanda - usare nomi alternativi "Irish Slammer" o "Dublin Drop" o evitare del tutto negli stabilimenti irlandesi. Deve essere consumato immediatamente.',
      vi: 'Phổ biến tại các quầy bar Mỹ vào Ngày Thánh Patrick. CẢNH BÁO: Cực kỳ xúc phạm ở Ireland - sử dụng tên thay thế "Irish Slammer" hoặc "Dublin Drop" hoặc tránh hoàn toàn tại các cơ sở Ireland. Phải tiêu thụ ngay lập tức.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_IRISH_WHISKEY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Irish Whiskey', it: 'Whiskey Irlandese', vi: 'Whiskey Ireland' },
    },
    {
      ingredient_id: 'ING_BAILEYS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Baileys Irish Cream',
        it: 'Baileys Irish Cream',
        vi: 'Baileys Irish Cream',
      },
    },
    {
      ingredient_id: 'ING_GUINNESS',
      quantity: { amount: 250, unit: 'ml' },
      display_name: { en: 'Guinness Stout', it: 'Guinness Stout', vi: 'Guinness Stout' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a pint glass 3/4 full with Guinness. In a shot glass, add Irish whiskey and top with Baileys. Drop the shot glass into the pint glass and drink immediately before the Baileys curdles.',
    it: 'Riempire un bicchiere da pinta per 3/4 con Guinness. In un bicchierino da shot, aggiungere whiskey irlandese e completare con Baileys. Lasciar cadere il bicchierino nel bicchiere da pinta e bere immediatamente prima che il Baileys caglia.',
    vi: 'Đổ đầy 3/4 ly pint với Guinness. Trong ly shot, thêm whiskey Ireland và đổ đầy với Baileys. Thả ly shot vào ly pint và uống ngay trước khi Baileys đông lại.',
  },

  glass: 'Shot glass (dropped into pint glass)',

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
  base_spirits: ['ING_IRISH_WHISKEY', 'ING_BAILEYS'],

  flavor_profile: ['creamy', 'malty', 'sweet', 'boozy'],

  abv_estimate: 8,

  calories_estimate: 250,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites', 'gluten'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance', 'gluten_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian'],
  season_tags: ['all_year'],
  occasion_tags: ['party', 'celebration', 'st-patricks-day'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['irish-slammer', 'dublin-drop', 'irish-bomb'],

  notes_for_staff:
    'CULTURAL SENSITIVITY WARNING: This drink\'s name is highly offensive in Ireland. Recommend using "Irish Slammer" or "Dublin Drop" as alternative names. NEVER serve this in Irish pubs or to Irish customers. Must be consumed immediately as Baileys will curdle in Guinness. Use fresh Guinness and serve quickly.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/Irish_Car_Bomb',
    notes:
      'Controversial bomb shot created in 1979. Name is offensive in Ireland - use alternatives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
