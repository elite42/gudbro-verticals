/**
 * IBA Unforgettables: Angel Face
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const angelFace: Cocktail = {
  id: '2246e1f9-5cb3-4613-9580-ffaeb53069ab',
  slug: 'angel-face',
  stable_key: 'd000a774765e8b94bb4687d77620ca8a6ea95d21',

  name: {
    en: 'Angel Face',
    it: 'Angel Face',
    vi: 'Angel Face',
    ko: '엔젤 페이스',
    ja: 'エンジェルフェイス',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'fruity', 'strong', 'prohibition-era'],

  description: {
    en: 'An elegant Prohibition-era cocktail combining gin with apple brandy and apricot liqueur. Deceptively smooth and dangerously potent, the Angel Face earned its name for its innocent appearance that masks a powerful punch.',
    it: "Un elegante cocktail dell'era del Proibizionismo che combina gin con brandy di mele e liquore all'albicocca. Ingannevolmente morbido e pericolosamente potente, l'Angel Face ha guadagnato il suo nome per il suo aspetto innocente che maschera una potenza notevole.",
    vi: 'Một cocktail thanh lịch thời Cấm rượu kết hợp gin với brandy táo và rượu mùi mơ. Mượt mà đánh lừa và nguy hiểm mạnh mẽ, Angel Face có được tên vì vẻ ngoài vô tội che giấu sức mạnh đáng kể.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Paris or London',
      country: 'France/UK',
    },
    story: {
      en: "The Angel Face emerged during the Prohibition era and first appeared in the 1930 Savoy Cocktail Book compiled by Harry Craddock at London's Savoy Hotel. Its name is a playful warning: despite its smooth, fruity taste and angelic appearance, this cocktail is deceptively strong with no non-alcoholic ingredients to dilute its potency. The equal-parts formula makes it easy to remember but dangerous to underestimate.",
      it: "L'Angel Face emerse durante l'era del Proibizionismo e apparve per la prima volta nel Savoy Cocktail Book del 1930 compilato da Harry Craddock al Savoy Hotel di Londra. Il suo nome è un avvertimento giocoso: nonostante il suo gusto morbido e fruttato e l'aspetto angelico, questo cocktail è ingannevolmente forte senza ingredienti analcolici a diluire la sua potenza. La formula in parti uguali lo rende facile da ricordare ma pericoloso da sottovalutare.",
      vi: 'Angel Face xuất hiện trong thời kỳ Cấm rượu và lần đầu tiên xuất hiện trong Savoy Cocktail Book năm 1930 được biên soạn bởi Harry Craddock tại Khách sạn Savoy London. Tên của nó là một lời cảnh báo vui vẻ: mặc dù có vị trái cây mượt mà và vẻ ngoài thiên thần, cocktail này mạnh đáng kinh ngạc không có thành phần không cồn để pha loãng độ mạnh của nó.',
    },
    named_after: {
      en: 'Named for its deceptively innocent, smooth taste that belies its high alcohol content - a true "wolf in sheep\'s clothing" cocktail.',
      it: 'Prende il nome dal suo gusto ingannevolmente innocente e morbido che smentisce il suo alto contenuto alcolico - un vero cocktail "lupo travestito da agnello".',
      vi: 'Được đặt tên theo vị ngọt ngào vô tội đánh lừa che giấu hàm lượng cồn cao - một cocktail "sói đội lốt cừu" thực sự.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'boozy', 'dry'],
    description: {
      en: 'Fruity and deceptively smooth. The apricot brandy provides stone fruit sweetness while the Calvados adds apple complexity and the gin brings botanical dryness. Together they create a harmonious but potent sipper.',
      it: "Fruttato e ingannevolmente morbido. Il brandy all'albicocca fornisce dolcezza di frutta a nocciolo mentre il Calvados aggiunge complessità di mela e il gin porta secchezza botanica. Insieme creano un sorso armonioso ma potente.",
      vi: 'Trái cây và mượt mà đánh lừa. Brandy mơ cung cấp vị ngọt trái cây hạt trong khi Calvados thêm sự phức tạp của táo và gin mang đến vị khô thực vật. Cùng nhau tạo ra một ngụm hài hòa nhưng mạnh mẽ.',
    },
    first_impression: {
      en: 'Sweet apricot and apple notes greet the palate',
      it: 'Note dolci di albicocca e mela accolgono il palato',
      vi: 'Hương mơ và táo ngọt chào đón vị giác',
    },
    finish: {
      en: 'Long, warming finish with lingering fruit and spirit',
      it: 'Finale lungo e caldo con frutta e spirito persistenti',
      vi: 'Kết thúc dài, ấm áp với trái cây và rượu kéo dài',
    },
    balance: {
      en: 'Three equal parts create perfect harmony between fruit sweetness and botanical dryness',
      it: 'Tre parti uguali creano perfetta armonia tra dolcezza fruttata e secchezza botanica',
      vi: 'Ba phần bằng nhau tạo ra sự hài hòa hoàn hảo giữa vị ngọt trái cây và vị khô thực vật',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'date_night', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with fruit-based desserts, apple tarts, or as a digestif after a rich meal. The apple and apricot notes complement cheese plates.',
      it: 'Si abbina bene con dessert a base di frutta, crostate di mele, o come digestivo dopo un pasto ricco. Le note di mela e albicocca completano i taglieri di formaggi.',
      vi: 'Kết hợp tốt với các món tráng miệng trái cây, bánh táo, hoặc như digestif sau bữa ăn thịnh soạn. Hương táo và mơ bổ sung cho đĩa phô mai.',
    },
    ideal_for: {
      en: 'Gin lovers seeking something different, fans of fruit-forward cocktails who enjoy a strong drink. Not for lightweights - this is a serious cocktail despite its innocent name.',
      it: 'Amanti del gin che cercano qualcosa di diverso, fan di cocktail fruttati che apprezzano un drink forte. Non per deboli - questo è un cocktail serio nonostante il suo nome innocente.',
      vi: 'Những người yêu gin tìm kiếm điều gì đó khác biệt, người hâm mộ cocktail trái cây thích đồ uống mạnh. Không dành cho người yếu - đây là cocktail nghiêm túc mặc dù tên vô tội.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_APRICOT_BRANDY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Apricot Brandy', it: "Brandy all'Albicocca", vi: 'Brandy Mơ' },
    },
    {
      ingredient_id: 'ING_CALVADOS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Calvados', it: 'Calvados', vi: 'Calvados' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice cubes. Shake well until properly chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY', 'ING_CALVADOS'],
  flavor_profile: ['fruity', 'sweet', 'boozy', 'dry'],
  abv_estimate: 30,
  calories_estimate: 220,
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
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  variants: [],

  notes_for_staff:
    'Warn guests this is a strong cocktail (100% alcohol, no mixers). The equal parts ratio makes it easy to scale. Use quality Calvados for best results.',

  price_tier: 'mid',
  popularity: 45,

  source: {
    primary: 'https://iba-world.com/angel-face/',
    notes: 'IBA Official Recipe. First published in Savoy Cocktail Book 1930.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
