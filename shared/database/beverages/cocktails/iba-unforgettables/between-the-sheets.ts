/**
 * IBA Unforgettables: Between the Sheets
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const betweenTheSheets: Cocktail = {
  id: 'efac4178-caa9-4510-8d17-12086e06c8c4',
  slug: 'between-the-sheets',
  stable_key: 'between-the-sheets-iba-unforgettable',

  name: {
    en: 'Between the Sheets',
    it: 'Between the Sheets',
    vi: 'Between the Sheets',
    ko: '비트윈 더 시트',
    ja: 'ビトウィーン・ザ・シーツ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'strong', 'prohibition-era', 'citrus', 'sidecar-variation'],

  description: {
    en: "A potent Prohibition-era cocktail that's essentially a Sidecar with rum added. The suggestive name and smooth, citrusy taste made it a favorite during the roaring twenties. Three spirits unite with orange and lemon for a sophisticated, dangerously drinkable classic.",
    it: "Un potente cocktail dell'era del Proibizionismo che è essenzialmente un Sidecar con l'aggiunta di rum. Il nome suggestivo e il gusto morbido e agrumato lo resero un favorito durante i ruggenti anni '20. Tre distillati si uniscono con arancia e limone per un classico sofisticato e pericolosamente bevibile.",
    vi: 'Một cocktail mạnh mẽ thời Cấm rượu về cơ bản là Sidecar với rum thêm vào. Cái tên gợi cảm và hương vị cam quýt mượt mà khiến nó trở thành món yêu thích trong những năm 1920 cuồng nhiệt. Ba loại rượu kết hợp với cam và chanh tạo nên một tác phẩm kinh điển tinh tế, nguy hiểm dễ uống.',
  },

  history: {
    created_year: '1920s',
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: "Between the Sheets was created at Harry's New York Bar in Paris during the 1920s Prohibition era, when Americans flocked to Europe to drink legally. The cocktail is essentially a variation of the Sidecar (also born at Harry's Bar) with white rum added to the mix. The provocative name was typical of the era's playful attitude toward drinking. Some attribute it to a French bartender who created it as a \"nightcap\" - hence the bedroom reference.",
      it: "Between the Sheets fu creato all'Harry's New York Bar di Parigi durante l'era del Proibizionismo degli anni '20, quando gli americani affluivano in Europa per bere legalmente. Il cocktail è essenzialmente una variazione del Sidecar (anch'esso nato all'Harry's Bar) con l'aggiunta di rum bianco. Il nome provocante era tipico dell'atteggiamento giocoso dell'epoca verso il bere. Alcuni lo attribuiscono a un barman francese che lo creò come \"nightcap\" - da qui il riferimento alla camera da letto.",
      vi: 'Between the Sheets được tạo ra tại Harry\'s New York Bar ở Paris trong thời kỳ Cấm rượu những năm 1920, khi người Mỹ đổ xô đến châu Âu để uống hợp pháp. Cocktail về cơ bản là một biến thể của Sidecar (cũng sinh ra tại Harry\'s Bar) với rum trắng thêm vào. Cái tên khiêu khích là điển hình của thái độ vui vẻ của thời đại đối với việc uống rượu. Một số người cho rằng nó được tạo ra bởi một bartender Pháp như một "nightcap" - do đó có ám chỉ phòng ngủ.',
    },
    named_after: {
      en: 'The suggestive name references bedsheets, playing on the cocktail\'s reputation as a seductive nightcap. The smooth taste makes it dangerously easy to have "one more."',
      it: 'Il nome suggestivo fa riferimento alle lenzuola, giocando sulla reputazione del cocktail come seduttivo drink della buonanotte. Il gusto morbido lo rende pericolosamente facile averne "ancora uno."',
      vi: 'Cái tên gợi cảm ám chỉ ga trải giường, chơi đùa với danh tiếng của cocktail như một nightcap quyến rũ. Vị mượt mà khiến nó nguy hiểm dễ dàng để có "thêm một ly nữa."',
    },
  },

  taste: {
    profile: ['citrus', 'boozy', 'dry', 'fruity'],
    description: {
      en: 'Bright and citrus-forward with serious spirit backbone. The cognac brings depth and warmth, the rum adds smoothness and subtle sweetness, while the triple sec and lemon provide bright, zesty freshness. Deceptively smooth for its strength.',
      it: 'Luminoso e agrumato in primo piano con seria struttura alcolica. Il cognac porta profondità e calore, il rum aggiunge morbidezza e sottile dolcezza, mentre il triple sec e il limone forniscono freschezza brillante e vivace. Ingannevolmente morbido per la sua forza.',
      vi: 'Tươi sáng và cam quýt nổi bật với xương sống rượu mạnh. Cognac mang đến chiều sâu và sự ấm áp, rum thêm sự mượt mà và ngọt ngào tinh tế, trong khi triple sec và chanh cung cấp sự tươi mát rực rỡ. Mượt mà đánh lừa với sức mạnh của nó.',
    },
    first_impression: {
      en: 'Bright citrus burst with warming spirit notes',
      it: 'Esplosione di agrumi luminosi con note alcoliche calde',
      vi: 'Bùng nổ cam quýt tươi sáng với hương rượu ấm áp',
    },
    finish: {
      en: 'Long, warming finish with orange and brandy lingering',
      it: 'Finale lungo e caldo con arancia e brandy persistenti',
      vi: 'Kết thúc dài, ấm áp với cam và brandy kéo dài',
    },
    balance: {
      en: 'Equal parts spirits create complexity while citrus keeps it fresh and drinkable',
      it: 'Parti uguali di distillati creano complessità mentre gli agrumi lo mantengono fresco e bevibile',
      vi: 'Các phần rượu bằng nhau tạo ra sự phức tạp trong khi cam quýt giữ cho nó tươi mát và dễ uống',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'nightcap', 'party'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best enjoyed as an after-dinner drink or nightcap. If pairing with food, consider light desserts with citrus elements or dark chocolate.',
      it: 'Da gustare al meglio come drink dopo cena o nightcap. Se abbinato al cibo, considera dessert leggeri con elementi agrumati o cioccolato fondente.',
      vi: 'Thưởng thức tốt nhất như đồ uống sau bữa tối hoặc nightcap. Nếu kết hợp với thức ăn, hãy xem xét các món tráng miệng nhẹ với yếu tố cam quýt hoặc chocolate đen.',
    },
    ideal_for: {
      en: 'Those who enjoy Sidecars and want something with more complexity. Perfect for anyone seeking a sophisticated, strong cocktail with a romantic backstory. Not for the faint of heart.',
      it: 'Chi apprezza i Sidecar e vuole qualcosa con più complessità. Perfetto per chi cerca un cocktail sofisticato e forte con una storia romantica. Non per i deboli di cuore.',
      vi: 'Những ai thích Sidecar và muốn thứ gì đó phức tạp hơn. Hoàn hảo cho những ai tìm kiếm cocktail mạnh, tinh tế với câu chuyện lãng mạn. Không dành cho người yếu tim.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'White Rum', it: 'Rum Bianco', vi: 'Rum Trắng' },
    },
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Triple Sec', it: 'Triple Sec', vi: 'Triple Sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước Chanh Tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients into a cocktail shaker. Shake with ice until well chilled. Strain into a chilled cocktail glass.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker. Shakerare con ghiaccio fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail. Lắc với đá cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_RUM_WHITE', 'ING_COGNAC'],
  flavor_profile: ['citrus', 'boozy', 'dry', 'fruity'],
  abv_estimate: 28,
  calories_estimate: 210,
  difficulty: 'easy',
  prep_time_seconds: 45,

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

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['date_night', 'nightcap', 'party'],

  is_mocktail: false,
  is_signature: false,

  variants: ['sidecar'],

  notes_for_staff:
    'Very strong cocktail - warn guests. Think of it as a boozy Sidecar. Use quality cognac and fresh lemon juice. Some variations use Cointreau instead of triple sec for a richer orange flavor.',

  price_tier: 'mid',
  popularity: 55,

  source: {
    primary: 'https://iba-world.com/between-the-sheets/',
    notes: "IBA Official Recipe. Originated at Harry's New York Bar, Paris, 1920s.",
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
