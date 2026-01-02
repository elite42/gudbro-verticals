/**
 * IBA New Era Drinks: Dark 'n' Stormy
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const darkNStormy: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
  slug: 'dark-n-stormy',
  stable_key: 'c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',

  name: {
    en: 'Dark \'n\' Stormy',
    it: 'Dark \'n\' Stormy',
    vi: 'Dark \'n\' Stormy',
    ko: '다크 앤 스토미',
    ja: 'ダークアンドストーミー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'rum', 'ginger', 'bermudian', 'trademarked'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Bermuda\'s national drink combining dark rum with spicy ginger beer and lime. Simple yet sophisticated, this trademarked cocktail showcases the island\'s famous Gosling\'s Black Seal Rum.',
    it: 'La bevanda nazionale delle Bermuda che combina rum scuro con ginger beer speziato e lime. Semplice ma sofisticato, questo cocktail con marchio registrato mette in mostra il famoso rum Gosling\'s Black Seal dell\'isola.',
    vi: 'Thức uống quốc gia của Bermuda kết hợp rum đen với bia gừng cay và chanh. Đơn giản nhưng tinh tế, cocktail có nhãn hiệu này thể hiện Gosling\'s Black Seal Rum nổi tiếng của hòn đảo.',
  },

  history: {
    created_year: '1918',
    origin: {
      city: 'Hamilton',
      bar: 'Unknown',
      country: 'Bermuda',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Dark \'n\' Stormy emerged in Bermuda shortly after World War I, when the British Royal Naval Officer\'s Club began mixing Gosling\'s Black Seal Rum with ginger beer. The drink\'s name allegedly comes from an old sailor who remarked it was "the color of a cloud only a fool or a dead man would sail under." Gosling\'s Brothers trademarked the name in the 1980s, making it one of the few cocktails with legal trademark protection. By law, an authentic Dark \'n\' Stormy must be made with Gosling\'s Black Seal Rum.',
      it: 'Il Dark \'n\' Stormy emerse alle Bermuda poco dopo la Prima Guerra Mondiale, quando il British Royal Naval Officer\'s Club iniziò a mescolare il rum Gosling\'s Black Seal con ginger beer. Il nome della bevanda presumibilmente deriva da un vecchio marinaio che osservò che era "il colore di una nuvola sotto la quale solo uno sciocco o un morto navigherebbe." Gosling\'s Brothers registrò il nome negli anni \'80, rendendolo uno dei pochi cocktail con protezione legale del marchio. Per legge, un autentico Dark \'n\' Stormy deve essere fatto con rum Gosling\'s Black Seal.',
      vi: 'Dark \'n\' Stormy xuất hiện ở Bermuda ngay sau Thế chiến I, khi Câu lạc bộ Sĩ quan Hải quân Hoàng gia Anh bắt đầu trộn Gosling\'s Black Seal Rum với bia gừng. Cái tên của thức uống được cho là đến từ một thủy thủ già nhận xét rằng nó "có màu của đám mây mà chỉ kẻ ngốc hoặc người chết mới chèo thuyền dưới đó." Gosling\'s Brothers đã đăng ký nhãn hiệu tên này vào những năm 1980, làm cho nó trở thành một trong số ít cocktail có bảo vệ nhãn hiệu pháp lý. Theo luật, một Dark \'n\' Stormy chính thống phải được pha với Gosling\'s Black Seal Rum.',
    },
    named_after: {
      en: 'Named after its dark, stormy appearance reminiscent of threatening clouds at sea.',
      it: 'Prende il nome dal suo aspetto scuro e tempestoso che ricorda nuvole minacciose in mare.',
      vi: 'Được đặt theo vẻ ngoài tối và giông bão gợi nhớ đến những đám mây đe dọa trên biển.',
    },
  },

  taste: {
    profile: ['spicy', 'refreshing', 'bold'],
    description: {
      en: 'Bold dark rum with spicy ginger beer kick and fresh lime tartness. The rum\'s molasses richness balances the ginger\'s heat perfectly. Refreshing yet complex.',
      it: 'Rum scuro audace con calcio speziato di ginger beer e acidità fresca del lime. La ricchezza di melassa del rum bilancia perfettamente il calore dello zenzero. Rinfrescante ma complesso.',
      vi: 'Rum đen táo bạo với độ cay của bia gừng và vị chua chanh tươi. Độ đậm đà mật mía của rum cân bằng hoàn hảo với độ nóng của gừng. Sảng khoái nhưng phức tạp.',
    },
    first_impression: {
      en: 'Spicy ginger and dark rum with lime brightness',
      it: 'Zenzero speziato e rum scuro con brillantezza del lime',
      vi: 'Gừng cay và rum đen với độ tươi mát của chanh',
    },
    finish: {
      en: 'Long, warming finish with lingering ginger spice and molasses notes',
      it: 'Finale lungo e caldo con spezie di zenzero e note di melassa persistenti',
      vi: 'Kết thúc dài, ấm áp với gia vị gừng kéo dài và hương mật mía',
    },
    balance: {
      en: 'Well-balanced between rum richness, ginger spice, and lime tartness',
      it: 'Ben bilanciato tra ricchezza del rum, spezie dello zenzero e acidità del lime',
      vi: 'Cân bằng tốt giữa độ đậm đà rum, gia vị gừng và vị chua chanh',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'beach', 'sailing', 'summer_party'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with Caribbean cuisine, jerk chicken, spicy foods, or fish and chips.',
      it: 'Eccellente con cucina caraibica, pollo jerk, cibi piccanti, o fish and chips.',
      vi: 'Tuyệt vời với ẩm thực Caribbean, gà jerk, món ăn cay hoặc cá và khoai tây chiên.',
    },
    ideal_for: {
      en: 'Perfect for rum lovers who enjoy bold, spicy flavors. Ideal for beach days, sailing, or anyone seeking Bermuda\'s authentic national drink.',
      it: 'Perfetto per gli amanti del rum che apprezzano sapori audaci e speziati. Ideale per giornate in spiaggia, vela, o per chiunque cerchi l\'autentica bevanda nazionale delle Bermuda.',
      vi: 'Hoàn hảo cho người yêu rum thích hương vị táo bạo, cay. Lý tưởng cho những ngày đi biển, chèo thuyền hoặc bất kỳ ai tìm kiếm thức uống quốc gia chính thống của Bermuda.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_GINGER_BEER',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Ginger beer', it: 'Ginger beer', vi: 'Bia gừng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Add lime juice and ginger beer. Float dark rum on top.',
    it: 'Riempire un bicchiere highball con ghiaccio. Aggiungere succo di lime e ginger beer. Far galleggiare il rum scuro sopra.',
    vi: 'Đổ đầy ly highball với đá. Thêm nước chanh và bia gừng. Để rum đen nổi trên cùng.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Miếng chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK'],

  flavor_profile: ['spicy', 'refreshing', 'bold'],

  abv_estimate: 12,

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'spring'],
  occasion_tags: ['casual', 'beach', 'party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: 'Traditionally made with Gosling\'s Black Seal Rum (trademarked). Float the rum on top for classic presentation. Use quality ginger beer for best results.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/dark-n-stormy/',
    note: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
