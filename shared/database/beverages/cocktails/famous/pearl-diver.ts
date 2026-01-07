/**
 * Famous Cocktails: Pearl Diver
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pearlDiver: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
  slug: 'pearl-diver',
  stable_key: 'pearl_diver_famous_tiki_tropical_cocktail',

  name: {
    en: 'Pearl Diver',
    it: 'Pearl Diver',
    vi: 'Pearl Diver',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'creamy', 'unique'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Pearl Diver is an exotic tiki cocktail created by Don the Beachcomber, famous for its unusual use of a butter-based mix that creates a rich, velvety texture. This complex drink combines rum with citrus and exotic spices in a uniquely luxurious presentation.',
    it: 'Il Pearl Diver è un esotico cocktail tiki creato da Don the Beachcomber, famoso per il suo uso insolito di una miscela a base di burro che crea una consistenza ricca e vellutata. Questa bevanda complessa combina rum con agrumi e spezie esotiche in una presentazione unicamente lussuosa.',
    vi: 'Pearl Diver là một loại cocktail tiki kỳ lạ được tạo ra bởi Don the Beachcomber, nổi tiếng với việc sử dụng bất thường hỗn hợp dựa trên bơ tạo ra kết cấu giàu có, mượt mà như nhung. Thức uống phức tạp này kết hợp rum với cam quýt và gia vị kỳ lạ trong một bài thuyết trình độc đáo sang trọng.',
  },

  history: {
    created_year: '1937',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Pearl Diver was created in 1937 by Don the Beachcomber and became famous for its revolutionary ingredient: "Gardenia Mix," a butter-based emulsion that Don created specifically for this drink. In an era before cream liqueurs were common, the idea of adding butter to a cocktail was shocking and innovative. The Gardenia Mix (made from butter, honey, and spices) creates an impossibly smooth, rich texture that was unlike anything else in cocktail culture. The name "Pearl Diver" evokes the exotic romance of South Pacific pearl diving, fitting perfectly into Don\'s escapist tiki narrative. The recipe remained one of Don\'s most closely guarded secrets for decades. When finally decoded, it revealed an incredibly complex formula that pushed the boundaries of what a cocktail could be.',
      it: 'Il Pearl Diver fu creato nel 1937 da Don the Beachcomber e divenne famoso per il suo ingrediente rivoluzionario: "Gardenia Mix," un\'emulsione a base di burro che Don creò specificamente per questa bevanda. In un\'era prima che i liquori alla panna fossero comuni, l\'idea di aggiungere burro a un cocktail era scioccante e innovativa. Il Gardenia Mix (fatto con burro, miele e spezie) crea una consistenza incredibilmente liscia e ricca che era diversa da qualsiasi altra cosa nella cultura dei cocktail. Il nome "Pearl Diver" evoca il romanticismo esotico dell\'immersione per le perle nel Pacifico meridionale, adattandosi perfettamente alla narrativa tiki escapista di Don. La ricetta rimase uno dei segreti più custoditi di Don per decenni. Quando fu finalmente decifrata, rivelò una formula incredibilmente complessa che spinse i confini di ciò che un cocktail poteva essere.',
      vi: 'Pearl Diver được tạo ra năm 1937 bởi Don the Beachcomber và trở nên nổi tiếng với thành phần cách mạng của nó: "Gardenia Mix," một nhũ tương dựa trên bơ mà Don đã tạo ra đặc biệt cho thức uống này. Trong thời đại trước khi rượu mùi kem phổ biến, ý tưởng thêm bơ vào cocktail là gây sốc và đổi mới. Gardenia Mix (làm từ bơ, mật ong và gia vị) tạo ra kết cấu mịn màng, giàu có không thể tin được mà không giống bất cứ thứ gì khác trong văn hóa cocktail. Cái tên "Pearl Diver" gợi lên sự lãng mạn kỳ lạ của lặn ngọc trai Nam Thái Bình Dương, phù hợp hoàn hảo với câu chuyện tiki thoát ly của Don. Công thức vẫn là một trong những bí mật được giữ kín nhất của Don trong nhiều thập kỷ. Khi cuối cùng được giải mã, nó đã tiết lộ một công thức cực kỳ phức tạp đẩy ranh giới của những gì một loại cocktail có thể là.',
    },
    named_after: {
      en: 'Named after pearl divers of the South Pacific, evoking exotic romance and adventure in tropical waters.',
      it: 'Prende il nome dai cercatori di perle del Pacifico meridionale, evocando romanticismo esotico e avventura nelle acque tropicali.',
      vi: 'Được đặt theo tên những người lặn ngọc trai của Nam Thái Bình Dương, gợi lên sự lãng mạn kỳ lạ và phiêu lưu trong vùng biển nhiệt đới.',
    },
  },

  taste: {
    profile: ['rich', 'creamy', 'complex'],
    description: {
      en: 'Extraordinarily rich and velvety with unprecedented texture from the butter-honey emulsion. The Pearl Diver balances complex rum depth with bright citrus, warming spices, and the signature Gardenia Mix that creates a luxurious, almost dessert-like smoothness. Unique among tiki drinks.',
      it: "Straordinariamente ricco e vellutato con una consistenza senza precedenti dall'emulsione burro-miele. Il Pearl Diver bilancia la profondità complessa del rum con agrumi brillanti, spezie calde e il caratteristico Gardenia Mix che crea una morbidezza lussuosa, quasi simile a un dessert. Unico tra le bevande tiki.",
      vi: 'Giàu có và mượt mà như nhung phi thường với kết cấu chưa từng có từ nhũ tương bơ-mật ong. Pearl Diver cân bằng chiều sâu rum phức tạp với cam quýt sáng, gia vị ấm áp và Gardenia Mix đặc trưng tạo ra độ mịn màng sang trọng, gần như món tráng miệng. Độc đáo trong số các thức uống tiki.',
    },
    first_impression: {
      en: 'Rich, creamy texture hits immediately, followed by tropical rum and citrus complexity',
      it: 'La consistenza ricca e cremosa colpisce immediatamente, seguita dalla complessità del rum tropicale e degli agrumi',
      vi: 'Kết cấu giàu có, béo ngậy xuất hiện ngay lập tức, theo sau là độ phức tạp của rum và cam quýt nhiệt đới',
    },
    finish: {
      en: 'Long, luxurious finish with lingering butter-honey richness and warm spice notes',
      it: 'Finale lungo e lussuoso con ricchezza persistente di burro-miele e note calde di spezie',
      vi: 'Kết thúc dài, sang trọng với sự giàu có bơ-mật ong kéo dài và hương vị gia vị ấm áp',
    },
    balance: {
      en: 'Uniquely balanced between rich butter-honey luxury and bright tropical freshness',
      it: 'Unicamente bilanciato tra il lusso ricco di burro-miele e la freschezza tropicale brillante',
      vi: 'Cân bằng độc đáo giữa sự sang trọng bơ-mật ong giàu có và sự tươi mát nhiệt đới sáng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'special_occasion', 'dessert_replacement'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with rich desserts, coconut cake, tropical fruit tarts, or as a standalone dessert drink. Also pairs with spiced dishes and holiday treats.',
      it: 'Perfetto con dessert ricchi, torta al cocco, crostate alla frutta tropicale o come bevanda dessert autonoma. Si abbina anche con piatti speziati e dolcetti natalizi.',
      vi: 'Hoàn hảo với món tráng miệng giàu có, bánh dừa, bánh tart trái cây nhiệt đới hoặc như một thức uống tráng miệng độc lập. Cũng kết hợp với món gia vị và đồ ăn ngày lễ.',
    },
    ideal_for: {
      en: 'Perfect for tiki collectors and adventurous drinkers seeking the most unique Don the Beachcomber experience. Ideal for those who appreciate innovative, boundary-pushing cocktails. A must-try for serious tiki enthusiasts.',
      it: "Perfetto per i collezionisti di tiki e bevitori avventurosi che cercano l'esperienza Don the Beachcomber più unica. Ideale per chi apprezza cocktail innovativi che spingono i confini. Un must per i seri appassionati di tiki.",
      vi: 'Hoàn hảo cho những người sưu tầm tiki và những người uống mạo hiểm tìm kiếm trải nghiệm Don the Beachcomber độc đáo nhất. Lý tưởng cho những ai đánh giá cao cocktail đổi mới, đẩy ranh giới. Phải thử cho những người đam mê tiki nghiêm túc.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Demerara rum', it: 'Rum Demerara', vi: 'Rum Demerara' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh xanh tươi',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_GARDENIA_MIX',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Gardenia Mix (butter-honey blend)',
        it: 'Gardenia Mix (miscela burro-miele)',
        vi: 'Gardenia Mix (hỗn hợp bơ-mật ong)',
      },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with 1 cup of crushed ice. Blend at high speed until smooth and frothy. Pour into a tiki mug or hurricane glass. Garnish with orchid and orange slice. Note: Gardenia Mix must be prepared in advance (butter, honey, vanilla, cinnamon).',
    it: "Aggiungere tutti gli ingredienti in un frullatore con 1 tazza di ghiaccio tritato. Frullare ad alta velocità fino a quando liscio e schiumoso. Versare in un tiki mug o bicchiere hurricane. Guarnire con orchidea e fetta d'arancia. Nota: Gardenia Mix deve essere preparato in anticipo (burro, miele, vaniglia, cannella).",
    vi: 'Thêm tất cả nguyên liệu vào máy xay sinh tố với 1 cốc đá nghiền. Xay ở tốc độ cao cho đến khi mịn và sủi bọt. Đổ vào cốc tiki hoặc ly hurricane. Trang trí với hoa lan và lát cam. Lưu ý: Gardenia Mix phải được chuẩn bị trước (bơ, mật ong, vani, quế).',
  },

  glass: 'Tiki mug / Hurricane glass',

  garnish: {
    en: 'Orchid flower, orange slice, cinnamon stick',
    it: "Fiore di orchidea, fetta d'arancia, stecca di cannella",
    vi: 'Hoa lan, lát cam, que quế',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_DEMERARA'],

  flavor_profile: ['rich', 'creamy', 'complex'],

  abv_estimate: 15,

  calories_estimate: 340,

  difficulty: 'advanced',

  prep_time_seconds: 180,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['tiki_bar', 'special_occasion', 'dessert_replacement'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-pearl-diver'],

  notes_for_staff:
    'ADVANCED RECIPE - requires pre-made Gardenia Mix (butter, honey, vanilla, cinnamon blend). Created by Don the Beachcomber 1937. Must be blended to properly emulsify butter. Contains dairy. Unique texture unlike any other cocktail. Spectacular presentation piece.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/pearl-diver.html',
    notes:
      'Original Don the Beachcomber recipe from 1937, decoded by Jeff "Beachbum" Berry. Gardenia Mix formula revealed in Sippin\' Safari.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
