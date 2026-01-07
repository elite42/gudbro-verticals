/**
 * Famous Cocktails: Last Rites
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lastRites: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  slug: 'last-rites',
  stable_key: 'f8e7d6c5b4a39281706958473625140fabcdef01',

  name: {
    en: 'Last Rites',
    it: 'Last Rites',
    vi: 'Last Rites',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'spirit-forward', 'herbal', 'bitter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A spirit-forward cocktail featuring mezcal, green Chartreuse, maraschino liqueur, and lime. The Last Rites is a smoky, herbal, and complex drink that balances agave spirits with French liqueurs.',
    it: 'Un cocktail spirit-forward con mezcal, Chartreuse verde, liquore di maraschino e lime. Il Last Rites è una bevanda affumicata, erbale e complessa che bilancia distillati di agave con liquori francesi.',
    vi: 'Một loại cocktail spirit-forward với mezcal, Chartreuse xanh, rượu mùi maraschino và chanh. Last Rites là thức uống khói, thảo mộc và phức tạp cân bằng rượu agave với rượu mùi Pháp.',
  },

  history: {
    created_year: '2004',
    origin: {
      city: 'New York City',
      bar: 'Death & Co',
      country: 'USA',
    },
    creator: {
      name: 'Phil Ward',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Phil Ward at Death & Co in New York City in 2004, the Last Rites is a bold variation on the classic Last Word. Ward substituted mezcal for gin, creating a smoky, agave-driven interpretation that became one of the signature cocktails of the modern craft cocktail movement.',
      it: "Creato da Phil Ward al Death & Co di New York City nel 2004, il Last Rites è una variazione audace del classico Last Word. Ward ha sostituito il gin con mezcal, creando un'interpretazione affumicata e basata sull'agave che è diventata uno dei cocktail emblematici del movimento moderno dei cocktail artigianali.",
      vi: 'Được tạo ra bởi Phil Ward tại Death & Co ở New York City năm 2004, Last Rites là biến thể táo bạo của Last Word cổ điển. Ward thay gin bằng mezcal, tạo ra phiên bản khói, hướng agave trở thành một trong những cocktail đặc trưng của phong trào cocktail thủ công hiện đại.',
    },
    named_after: {
      en: 'A play on "Last Word" - the name references both the final sacrament and the smoky, intense character of mezcal.',
      it: 'Un gioco di parole su "Last Word" - il nome fa riferimento sia all\'ultimo sacramento che al carattere affumicato e intenso del mezcal.',
      vi: 'Chơi chữ từ "Last Word" - tên gọi ám chỉ cả nghi lễ cuối cùng và đặc tính khói, mãnh liệt của mezcal.',
    },
  },

  taste: {
    profile: ['smoky', 'herbal', 'complex'],
    description: {
      en: 'Smoky and herbal with layers of complexity. The mezcal provides an earthy, smoky backbone, while green Chartreuse adds herbal intensity. Maraschino brings subtle sweetness and cherry notes, balanced by bright lime acidity.',
      it: "Affumicato ed erbale con strati di complessità. Il mezcal fornisce una struttura terrosa e affumicata, mentre la Chartreuse verde aggiunge intensità erbale. Il maraschino porta dolcezza sottile e note di ciliegia, bilanciato dall'acidità brillante del lime.",
      vi: 'Khói và thảo mộc với nhiều tầng phức tạp. Mezcal mang đến xương sống đất, khói, trong khi Chartreuse xanh thêm cường độ thảo mộc. Maraschino mang vị ngọt tinh tế và hương anh đào, cân bằng bởi độ chua sáng của chanh.',
    },
    first_impression: {
      en: 'Smoky mezcal and herbal Chartreuse hit immediately, followed by sweet-tart complexity',
      it: 'Mezcal affumicato e Chartreuse erbale colpiscono immediatamente, seguiti da complessità dolce-aspra',
      vi: 'Mezcal khói và Chartreuse thảo mộc đập vào ngay lập tức, tiếp theo là độ phức tạp ngọt-chua',
    },
    finish: {
      en: 'Long, herbal finish with lingering smoke and cherry notes',
      it: 'Finale lungo ed erbale con note persistenti di fumo e ciliegia',
      vi: 'Kết thúc dài, thảo mộc với khói và hương anh đào kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between smoky spirits and herbal liqueurs, with lime providing essential brightness',
      it: 'Perfettamente bilanciato tra distillati affumicati e liquori erbali, con il lime che fornisce luminosità essenziale',
      vi: 'Cân bằng hoàn hảo giữa rượu khói và rượu mùi thảo mộc, với chanh mang đến độ sáng thiết yếu',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['cocktail_hour', 'date_night', 'special_occasion'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs excellently with grilled meats, Mexican cuisine, barbecue, and strong cheeses. The smoky character complements charred and roasted flavors.',
      it: 'Si abbina eccellentemente con carni alla griglia, cucina messicana, barbecue e formaggi forti. Il carattere affumicato complementa i sapori carbonizzati e arrostiti.',
      vi: 'Kết hợp tuyệt vời với thịt nướng, ẩm thực Mexico, thịt hun khói và phô mai mạnh. Đặc tính khói bổ sung cho hương vị nướng than và rang.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate complex, spirit-forward cocktails. Ideal for mezcal lovers and those seeking something bold and herbal.',
      it: 'Perfetto per bevitori avventurosi che apprezzano cocktail complessi e spirit-forward. Ideale per gli amanti del mezcal e per chi cerca qualcosa di audace ed erbale.',
      vi: 'Hoàn hảo cho người uống mạo hiểm thích cocktail phức tạp, hướng rượu mạnh. Lý tưởng cho người yêu mezcal và những ai tìm kiếm thứ gì đó táo bạo và thảo mộc.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_GREEN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Green Chartreuse',
        it: 'Chartreuse verde',
        vi: 'Chartreuse xanh',
      },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Maraschino liqueur',
        it: 'Liquore di maraschino',
        vi: 'Rượu mùi maraschino',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. No garnish needed.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Non è necessaria guarnizione.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Không cần trang trí.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['smoky', 'herbal', 'complex'],

  abv_estimate: 28,

  calories_estimate: 195,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['all_year'],
  occasion_tags: ['cocktail_hour', 'date_night', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['last-word', 'final-ward'],

  notes_for_staff:
    'Use quality mezcal with good smoke character. Shake hard to properly chill and dilute the strong spirits. This is a variation on the Last Word - offer comparison for curious guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 72,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://deathandcompany.com',
    notes: 'Created by Phil Ward at Death & Co, 2004. Modern classic cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
