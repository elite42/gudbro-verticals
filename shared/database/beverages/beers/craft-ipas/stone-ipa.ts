import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const stoneIpa: Beer = {
  id: uuidv4(),
  slug: 'stone-ipa',
  stable_key: 'stone-ipa-craft-ipa',
  name: {
    en: 'Stone IPA',
    it: 'Stone IPA',
    vi: 'Stone IPA',
  },

  status: 'craft_classic',
  style_category: 'ale',
  style: 'ipa',
  tags: ['craft', 'san-diego', 'west-coast', 'hoppy', 'bold'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Escondido, California',
    brewery: {
      en: 'Stone Brewing',
      it: 'Birrificio Stone',
      vi: 'Nhà máy bia Stone',
    },
    brewery_founded: 1996,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '1997',
    story: {
      en: 'Stone IPA was created by Greg Koch and Steve Wagner as part of their mission to bring bold, flavorful beers to the masses. Stone Brewing helped define the San Diego craft beer scene and became known for their aggressive hop-forward beers. The gargoyle logo and "Arrogant Bastard" attitude made Stone a craft beer icon.',
      it: 'Stone IPA è stata creata da Greg Koch e Steve Wagner come parte della loro missione di portare birre audaci e saporite alle masse. Stone Brewing ha contribuito a definire la scena della birra artigianale di San Diego ed è diventato noto per le sue birre aggressive a base di luppolo. Il logo della gargolla e l\'atteggiamento "Arrogant Bastard" hanno reso Stone un\'icona della birra artigianale.',
      vi: 'Stone IPA được tạo ra bởi Greg Koch và Steve Wagner như một phần sứ mệnh mang bia táo bạo, đậm hương vị đến quần chúng. Stone Brewing đã giúp định nghĩa bối cảnh bia thủ công San Diego và trở nên nổi tiếng với những loại bia hoa bia mạnh mẽ. Logo quỷ đá và thái độ "Arrogant Bastard" đã biến Stone thành biểu tượng bia thủ công.',
    },
    awards: ['World Beer Cup Gold', 'Great American Beer Festival Gold'],
    named_after: {
      en: 'Named for the solid, uncompromising nature of the brewery\'s philosophy',
      it: 'Prende il nome dalla natura solida e intransigente della filosofia del birrificio',
      vi: 'Được đặt tên theo bản chất vững chắc, không thỏa hiệp của triết lý nhà máy bia',
    },
  },

  description: {
    en: 'A bold West Coast IPA showcasing intense hop bitterness and flavor. Citrus, pine, and tropical fruit notes dominate, backed by a solid malt foundation. Unfiltered and dry-hopped for maximum hop impact.',
    it: 'Una IPA della West Coast audace che mette in mostra l\'intensa amarezza e il sapore del luppolo. Le note di agrumi, pino e frutta tropicale dominano, supportate da una solida base di malto. Non filtrata e dry-hopped per il massimo impatto del luppolo.',
    vi: 'Một IPA Bờ Tây táo bạo thể hiện vị đắng và hương vị hoa bia mãnh liệt. Hương cam quýt, thông và trái cây nhiệt đới chiếm ưu thế, được hỗ trợ bởi nền mạch nha vững chắc. Không lọc và dry-hopped để tác động hoa bia tối đa.',
  },

  tagline: {
    en: 'Unapologetically Bold',
    it: 'Audace Senza Scuse',
    vi: 'Táo Bạo Không Xin Lỗi',
  },

  characteristics: {
    abv: 6.9,
    ibu: 77,
    srm: 8,
    color: 'golden',
    clarity: 'slightly_hazy',
    carbonation: 'medium',
    body: 'medium_full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['hoppy', 'bitter', 'citrus', 'piney', 'resinous'],
    description: {
      en: 'Massive hop presence with grapefruit, pine resin, and tropical mango. Firm malt backbone provides structure while letting the hops shine. Aggressively bitter with a bone-dry finish.',
      it: 'Presenza massiccia di luppolo con pompelmo, resina di pino e mango tropicale. La solida base di malto fornisce struttura mentre lascia brillare il luppolo. Aggressivamente amaro con un finale molto secco.',
      vi: 'Sự hiện diện hoa bia khổng lồ với bưởi, nhựa thông và xoài nhiệt đới. Nền mạch nha vững chắc cung cấp cấu trúc trong khi để hoa bia tỏa sáng. Đắng mạnh mẽ với kết thúc rất khô.',
    },
    aroma: {
      en: 'Intense citrus, pine, and tropical hops with subtle caramel malt',
      it: 'Luppolo intenso di agrumi, pino e tropicale con malto caramello sottile',
      vi: 'Hoa bia cam quýt, thông và nhiệt đới mãnh liệt với mạch nha caramel tinh tế',
    },
    finish: {
      en: 'Bone-dry, intensely bitter finish with lingering hop resin',
      it: 'Finale molto secco e intensamente amaro con resina di luppolo persistente',
      vi: 'Kết thúc rất khô, đắng mãnh liệt với nhựa hoa bia kéo dài',
    },
    bitterness_level: 5,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Caramel malt'],
    hops: ['Magnum', 'Chinook', 'Centennial', 'Citra'],
    yeast: 'Ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'Pour with authority to release hop aromatics and create a creamy head',
      it: 'Versare con autorità per rilasciare gli aromi del luppolo e creare una schiuma cremosa',
      vi: 'Rót quyết đoán để giải phóng hương hoa bia và tạo lớp bọt mịn',
    },
  },

  pairing: {
    food_categories: ['spicy-foods', 'grilled-meats', 'mexican'],
    food_pairings: {
      en: 'Perfect with spicy carnitas tacos, grilled steak, jalapeño poppers, and aged sharp cheeses. The intense bitterness stands up to bold flavors.',
      it: 'Perfetto con tacos di carnitas piccanti, bistecca alla griglia, jalapeño poppers e formaggi stagionati piccanti. L\'intensa amarezza resiste a sapori audaci.',
      vi: 'Hoàn hảo với tacos carnitas cay, bít tết nướng, jalapeño poppers và phô mai già sắc. Vị đắng mãnh liệt chống lại hương vị táo bạo.',
    },
    cheese_pairings: ['Extra Sharp Cheddar', 'Aged Manchego', 'Gorgonzola'],
    cuisine_pairings: ['Mexican', 'American BBQ', 'Spicy Asian'],
  },

  season_tags: ['all_year'],
  occasion_tags: ['casual', 'bbq', 'celebration', 'dinner'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [355, 650],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 85,

  source: {
    primary: 'https://stonebrewing.com',
    note: 'Official Stone Brewing website and beer information',
  },

  version: 1,
};
