import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const guinnessDraught: Beer = {
  id: uuidv4(),
  slug: 'guinness-draught',
  stable_key: 'guinness-draught-irish-stout',
  name: {
    en: 'Guinness Draught',
    it: 'Guinness Draught',
    vi: 'Guinness Draught',
  },

  status: 'international_classic',
  style_category: 'stout_porter',
  style: 'irish_stout',
  tags: ['irish', 'iconic', 'dry-stout', 'nitrogen', 'creamy', 'dublin', 'st-patricks'],

  origin: {
    country: 'Ireland',
    country_code: 'IE',
    city: 'Dublin',
    brewery: {
      en: 'St. James\'s Gate Brewery',
      it: 'Birrificio St. James\'s Gate',
      vi: 'Nhà máy bia St. James\'s Gate',
    },
    brewery_founded: 1759,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1959',
    story: {
      en: 'Arthur Guinness signed a 9,000-year lease on St. James\'s Gate Brewery in 1759 for £45 per year. While Guinness has been brewing stout since the 1820s, the modern Draught version with nitrogen was developed in 1959 by mathematician Michael Ash. The nitrogen technology creates the signature creamy head and smooth mouthfeel. Today, over 10 million glasses are enjoyed daily worldwide.',
      it: 'Arthur Guinness firmò un contratto di affitto di 9.000 anni per il birrificio St. James\'s Gate nel 1759 per £45 all\'anno. Sebbene Guinness producesse stout dagli anni 1820, la moderna versione Draught con azoto fu sviluppata nel 1959 dal matematico Michael Ash. La tecnologia dell\'azoto crea la caratteristica schiuma cremosa e la morbidezza in bocca. Oggi, oltre 10 milioni di bicchieri vengono consumati quotidianamente in tutto il mondo.',
      vi: 'Arthur Guinness đã ký hợp đồng thuê 9.000 năm tại Nhà máy bia St. James\'s Gate năm 1759 với giá £45 mỗi năm. Trong khi Guinness đã sản xuất stout từ những năm 1820, phiên bản Draught hiện đại với nitrogen được phát triển năm 1959 bởi nhà toán học Michael Ash. Công nghệ nitrogen tạo ra lớp bọt kem đặc trưng và cảm giác mượt mà. Ngày nay, hơn 10 triệu ly được thưởng thức hàng ngày trên toàn thế giới.',
    },
    awards: ['Countless awards', 'Most famous stout worldwide'],
    named_after: {
      en: 'Named after founder Arthur Guinness, who established the brewery in Dublin',
      it: 'Prende il nome dal fondatore Arthur Guinness, che fondò il birrificio a Dublino',
      vi: 'Được đặt theo tên người sáng lập Arthur Guinness, người thành lập nhà máy bia ở Dublin',
    },
    significance: {
      en: 'The world\'s most iconic stout and one of the most recognizable beer brands globally',
      it: 'La stout più iconica al mondo e uno dei marchi di birra più riconoscibili a livello globale',
      vi: 'Stout biểu tượng nhất thế giới và một trong những thương hiệu bia được nhận diện nhất toàn cầu',
    },
  },

  description: {
    en: 'The world\'s most famous dry Irish stout. Deep black with a creamy tan head, it offers roasted barley bitterness balanced by smooth, almost velvety texture from the nitrogen pour. Surprisingly light-bodied for its appearance.',
    it: 'La stout irlandese secca più famosa al mondo. Nera intensa con una schiuma cremosa color nocciola, offre amarezza di orzo tostato bilanciata da una texture morbida, quasi vellutata, dalla spillatura ad azoto. Sorprendentemente leggera per il suo aspetto.',
    vi: 'Stout khô Ireland nổi tiếng nhất thế giới. Đen sâu với lớp bọt kem màu nâu nhạt, nó mang đến vị đắng lúa mạch rang cân bằng bởi kết cấu mượt mà, gần như nhung từ việc rót nitrogen. Thân nhẹ đáng ngạc nhiên so với vẻ ngoài.',
  },

  tagline: {
    en: 'Good things come to those who wait',
    it: 'Le cose buone arrivano a chi sa aspettare',
    vi: 'Điều tốt đẹp đến với những ai biết chờ đợi',
  },

  characteristics: {
    abv: 4.2,
    ibu: 45,
    srm: 40,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'low',
    body: 'medium_light',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['roasty', 'dry', 'creamy', 'coffee', 'smooth', 'balanced', 'bittersweet'],
    description: {
      en: 'Roasted barley dominates with coffee and chocolate notes, subtle malty sweetness, and a dry, slightly bitter finish. The nitrogen creates an exceptionally smooth, creamy mouthfeel that contrasts with the roasted bitterness.',
      it: 'L\'orzo tostato domina con note di caffè e cioccolato, sottile dolcezza maltata e un finale secco, leggermente amaro. L\'azoto crea una sensazione in bocca eccezionalmente morbida e cremosa che contrasta con l\'amarezza tostata.',
      vi: 'Lúa mạch rang chiếm ưu thế với hương cà phê và chocolate, ngọt mạch nha tinh tế và kết thúc khô, hơi đắng. Nitrogen tạo ra cảm giác miệng cực kỳ mượt mà, kem tương phản với vị đắng rang.',
    },
    aroma: {
      en: 'Roasted barley, coffee, subtle chocolate, and a hint of caramel',
      it: 'Orzo tostato, caffè, sottile cioccolato e un accenno di caramello',
      vi: 'Lúa mạch rang, cà phê, chocolate tinh tế và một chút caramel',
    },
    first_impression: {
      en: 'Creamy and smooth with immediate roasted character',
      it: 'Cremosa e morbida con immediato carattere tostato',
      vi: 'Kem và mượt với đặc tính rang ngay lập tức',
    },
    finish: {
      en: 'Dry and roasty with lingering coffee bitterness',
      it: 'Secco e tostato con amarezza di caffè persistente',
      vi: 'Khô và rang với vị đắng cà phê kéo dài',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Roasted barley', 'Flaked barley'],
    hops: ['East Kent Goldings', 'Target'],
    yeast: 'Guinness proprietary ale yeast',
    special_ingredients: ['Nitrogen gas for pour'],
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'The famous "two-part pour": Fill glass to 3/4, let settle until black and tan separate (119.5 seconds), then top off. The surge and settle creates the signature cascading effect.',
      it: 'La famosa "spillatura in due fasi": Riempire il bicchiere per 3/4, lasciare riposare finché il nero e il nocciola si separano (119,5 secondi), poi completare. L\'effetto surge and settle crea la caratteristica cascata.',
      vi: 'Cách rót "hai phần" nổi tiếng: Đổ đầy ly đến 3/4, để lắng cho đến khi màu đen và nâu tách ra (119,5 giây), sau đó đổ đầy. Hiệu ứng surge and settle tạo ra hiệu ứng xếp tầng đặc trưng.',
    },
    ideal_head: '1-1.5 inches',
    head_retention: true,
  },

  pairing: {
    food_categories: ['irish-food', 'oysters', 'stew', 'cheese', 'chocolate'],
    food_pairings: {
      en: 'Classic with oysters, Irish stew, shepherd\'s pie, blue cheese, and chocolate desserts. The roasted character complements grilled meats and sharp cheeses.',
      it: 'Classica con ostriche, stufato irlandese, shepherd\'s pie, gorgonzola e dessert al cioccolato. Il carattere tostato si abbina a carni alla griglia e formaggi stagionati.',
      vi: 'Cổ điển với hàu, stew Ireland, shepherd\'s pie, phô mai xanh và món tráng miệng chocolate. Đặc tính rang bổ sung cho thịt nướng và phô mai sắc.',
    },
    cheese_pairings: ['Stilton', 'Irish cheddar', 'Blue cheese'],
    cuisine_pairings: ['Irish', 'British', 'BBQ'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['pub_night', 'casual', 'holiday', 'celebration'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['draft', 'can', 'bottle'],
  available_sizes: [330, 440, 500],
  related_beers: ['guinness-extra-stout', 'guinness-foreign-extra'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 98,

  source: {
    primary: 'https://www.guinness.com',
    note: 'Official Guinness website and 250+ years of brewing heritage',
  },

  version: 1,
};
