import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const murphysIrishStout: Beer = {
  id: uuidv4(),
  slug: 'murphys-irish-stout',
  stable_key: 'murphys-irish-stout-cork',
  name: {
    en: "Murphy's Irish Stout",
    it: "Murphy's Irish Stout",
    vi: "Murphy's Irish Stout",
  },

  status: 'international_classic',
  style_category: 'stout_porter',
  style: 'irish_stout',
  tags: ['irish', 'stout', 'creamy', 'smooth', 'nitrogen', 'cork', 'roasty', 'malty'],

  origin: {
    country: 'Ireland',
    country_code: 'IE',
    city: 'Cork',
    brewery: {
      en: "Murphy's Brewery",
      it: "Birrificio Murphy's",
      vi: "Nhà máy bia Murphy's",
    },
    brewery_founded: 1856,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1856',
    story: {
      en: "Founded by James J. Murphy in Cork in 1856, Murphy's Irish Stout has been a proud alternative to Dublin stouts for over 160 years. The brewery was acquired by Heineken in 1983 but maintains its traditional Cork brewing heritage. Murphy's is known for being smoother and less bitter than its Dublin rival, with a sweeter malt character and creamier texture. The nitrogen-dispensed version became widely available in the 1980s, making it a favorite in Cork pubs and beyond.",
      it: "Fondato da James J. Murphy a Cork nel 1856, Murphy's Irish Stout è stata un'orgogliosa alternativa alle stout di Dublino per oltre 160 anni. Il birrificio fu acquisito da Heineken nel 1983 ma mantiene la sua tradizionale eredità di Cork. Murphy's è conosciuta per essere più morbida e meno amara della sua rivale di Dublino, con un carattere maltato più dolce e una texture più cremosa. La versione spillata ad azoto divenne ampiamente disponibile negli anni '80, rendendola una favorita nei pub di Cork e oltre.",
      vi: "Được thành lập bởi James J. Murphy ở Cork năm 1856, Murphy's Irish Stout là một lựa chọn thay thế đáng tự hào cho các stout Dublin trong hơn 160 năm. Nhà máy bia được Heineken mua lại năm 1983 nhưng vẫn duy trì di sản sản xuất bia truyền thống Cork. Murphy's nổi tiếng mượt hơn và ít đắng hơn đối thủ Dublin, với đặc tính mạch nha ngọt hơn và kết cấu kem hơn. Phiên bản rót nitrogen trở nên phổ biến rộng rãi vào những năm 1980, khiến nó trở thành yêu thích tại các quán rượu Cork và xa hơn.",
    },
    awards: ['World Beer Cup awards', 'Cork brewing heritage'],
    named_after: {
      en: 'Named after founder James J. Murphy, who established the brewery in Cork',
      it: 'Prende il nome dal fondatore James J. Murphy, che fondò il birrificio a Cork',
      vi: 'Được đặt theo tên người sáng lập James J. Murphy, người thành lập nhà máy bia ở Cork',
    },
    significance: {
      en: "Ireland's second most popular stout, representing Cork's brewing tradition as an alternative to Dublin stouts",
      it: "La seconda stout più popolare d'Irlanda, che rappresenta la tradizione birraria di Cork come alternativa alle stout di Dublino",
      vi: "Stout phổ biến thứ hai của Ireland, đại diện cho truyền thống sản xuất bia Cork như một lựa chọn thay thế cho stout Dublin",
    },
  },

  description: {
    en: "A smooth, creamy Irish stout from Cork with a sweeter, maltier profile than typical Dublin stouts. Deep black with a dense tan head, it offers chocolate and coffee notes with less roasted bitterness and a notably smooth, velvety mouthfeel from nitrogen dispense.",
    it: "Una stout irlandese morbida e cremosa da Cork con un profilo più dolce e maltato rispetto alle tipiche stout di Dublino. Nera intensa con una densa schiuma color nocciola, offre note di cioccolato e caffè con meno amarezza tostata e una sensazione in bocca notevolmente morbida e vellutata dalla spillatura ad azoto.",
    vi: "Một stout Ireland mượt mà, kem từ Cork với hương vị ngọt hơn, nhiều mạch nha hơn so với stout Dublin điển hình. Đen sâu với lớp bọt dày màu nâu nhạt, nó mang đến hương chocolate và cà phê với ít vị đắng rang hơn và cảm giác miệng mượt mà, nhung đáng chú ý từ việc rót nitrogen.",
  },

  tagline: {
    en: "Like the smoothest velvet",
    it: "Come il velluto più morbido",
    vi: "Như nhung mượt mà nhất",
  },

  characteristics: {
    abv: 4.0,
    ibu: 35,
    srm: 40,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'low',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['smooth', 'creamy', 'malty', 'chocolate', 'coffee', 'sweet', 'velvety'],
    description: {
      en: "Sweeter and maltier than Guinness, with pronounced chocolate and toffee notes. Less roasted bitterness, more coffee sweetness, and an exceptionally creamy, smooth mouthfeel from nitrogen. The finish is gentle and slightly sweet rather than dry and bitter.",
      it: "Più dolce e maltata di Guinness, con pronunciate note di cioccolato e caramello. Meno amarezza tostata, più dolcezza di caffè e una sensazione in bocca eccezionalmente cremosa e morbida dall'azoto. Il finale è delicato e leggermente dolce piuttosto che secco e amaro.",
      vi: "Ngọt hơn và nhiều mạch nha hơn Guinness, với hương chocolate và toffee rõ rệt. Ít vị đắng rang hơn, nhiều vị ngọt cà phê hơn và cảm giác miệng cực kỳ kem, mượt từ nitrogen. Kết thúc nhẹ nhàng và hơi ngọt thay vì khô và đắng.",
    },
    aroma: {
      en: 'Chocolate, coffee, caramel, toasted malt, and subtle roasted notes',
      it: 'Cioccolato, caffè, caramello, malto tostato e sottili note tostate',
      vi: 'Chocolate, cà phê, caramel, mạch nha rang và hương rang tinh tế',
    },
    first_impression: {
      en: 'Exceptionally creamy and smooth with sweet malty character',
      it: 'Eccezionalmente cremosa e morbida con carattere maltato dolce',
      vi: 'Cực kỳ kem và mượt với đặc tính mạch nha ngọt',
    },
    finish: {
      en: 'Smooth and slightly sweet with gentle coffee notes',
      it: 'Morbido e leggermente dolce con delicate note di caffè',
      vi: 'Mượt và hơi ngọt với hương cà phê nhẹ nhàng',
    },
    bitterness_level: 2,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Roasted barley', 'Chocolate malt', 'Caramel malt'],
    hops: ['Irish hops', 'English hops'],
    yeast: "Murphy's proprietary ale yeast",
    special_ingredients: ['Nitrogen gas for dispense'],
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'Pour in two stages with nitrogen tap. Fill to 3/4, let settle until cascading stops, then top off for a perfect creamy head.',
      it: 'Versare in due fasi con spillatore ad azoto. Riempire a 3/4, lasciare riposare fino a quando la cascata si ferma, poi completare per una perfetta schiuma cremosa.',
      vi: 'Rót hai giai đoạn với vòi nitrogen. Đổ đến 3/4, để lắng cho đến khi hiệu ứng xếp tầng dừng, sau đó đổ đầy để có lớp bọt kem hoàn hảo.',
    },
    ideal_head: '1-1.5 inches',
    head_retention: true,
  },

  pairing: {
    food_categories: ['irish-food', 'seafood', 'stew', 'cheese', 'dessert'],
    food_pairings: {
      en: 'Excellent with seafood chowder, Irish stew, corned beef, aged cheddar, and chocolate desserts. The sweeter profile pairs well with shellfish and creamy dishes.',
      it: 'Eccellente con zuppa di pesce, stufato irlandese, corned beef, cheddar stagionato e dessert al cioccolato. Il profilo più dolce si abbina bene con i frutti di mare e i piatti cremosi.',
      vi: 'Tuyệt vời với súp hải sản, stew Ireland, thịt bò muối, cheddar lâu năm và món tráng miệng chocolate. Hương vị ngọt hơn kết hợp tốt với hải sản và món kem.',
    },
    cheese_pairings: ['Irish cheddar', 'Gruyere', 'Blue cheese'],
    cuisine_pairings: ['Irish', 'Seafood', 'British'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['pub_night', 'casual', 'dinner', 'relaxation'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['draft', 'can', 'bottle'],
  available_sizes: [330, 440, 500],
  related_beers: ['guinness-draught', 'beamish-stout'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 75,

  source: {
    primary: 'https://www.murphysirishstout.com',
    note: "Official Murphy's website and Cork brewing heritage since 1856",
  },

  version: 1,
};
