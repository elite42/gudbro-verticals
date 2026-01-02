import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const leftHandMilkStout: Beer = {
  id: uuidv4(),
  slug: 'left-hand-milk-stout',
  stable_key: 'left-hand-milk-stout-nitro',
  name: {
    en: 'Left Hand Milk Stout Nitro',
    it: 'Left Hand Milk Stout Nitro',
    vi: 'Left Hand Milk Stout Nitro',
  },

  status: 'craft',
  style_category: 'stout_porter',
  style: 'milk_stout',
  tags: ['craft', 'american', 'milk-stout', 'sweet', 'creamy', 'nitrogen', 'lactose', 'colorado', 'smooth'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Longmont',
    region: 'Colorado',
    brewery: {
      en: 'Left Hand Brewing Company',
      it: 'Birrificio Left Hand',
      vi: 'Công ty Bia Left Hand',
    },
    brewery_founded: 1993,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '1999',
    story: {
      en: 'Left Hand Brewing Company was founded in 1993 in Longmont, Colorado. Their Milk Stout, introduced in 1999, became one of the first American craft stouts to embrace the traditional English milk stout style with lactose. In 2011, Left Hand pioneered the bottled nitro beer category with the Milk Stout Nitro, bringing the smooth, creamy nitrogen experience home. The widget-based technology allows for the same cascading effect and velvety texture as draft nitro beers. Today it remains one of the most popular American milk stouts.',
      it: "Left Hand Brewing Company fu fondata nel 1993 a Longmont, Colorado. La loro Milk Stout, introdotta nel 1999, divenne una delle prime stout artigianali americane ad abbracciare il tradizionale stile inglese milk stout con lattosio. Nel 2011, Left Hand ha pionerato la categoria delle birre nitro in bottiglia con la Milk Stout Nitro, portando a casa l'esperienza cremosa e morbida dell'azoto. La tecnologia basata su widget consente lo stesso effetto a cascata e la stessa texture vellutata delle birre nitro alla spina. Oggi rimane una delle milk stout americane più popolari.",
      vi: 'Left Hand Brewing Company được thành lập năm 1993 tại Longmont, Colorado. Milk Stout của họ, ra mắt năm 1999, trở thành một trong những stout craft Mỹ đầu tiên áp dụng phong cách milk stout truyền thống của Anh với lactose. Năm 2011, Left Hand tiên phong trong danh mục bia nitro đóng chai với Milk Stout Nitro, mang trải nghiệm nitrogen mượt mà, kem về nhà. Công nghệ dựa trên widget cho phép hiệu ứng xếp tầng và kết cấu nhung giống như bia nitro ống. Ngày nay nó vẫn là một trong những milk stout Mỹ phổ biến nhất.',
    },
    awards: ['Great American Beer Festival medals', 'World Beer Cup awards', 'Nitro innovation pioneer'],
    named_after: {
      en: 'Named after the founders\' preference for left-handedness and individuality',
      it: "Prende il nome dalla preferenza dei fondatori per il mancinismo e l'individualità",
      vi: 'Được đặt theo sở thích của người sáng lập về tay trái và cá tính',
    },
    significance: {
      en: 'Pioneered bottled nitro beer technology and popularized American craft milk stouts',
      it: 'Ha pionerato la tecnologia della birra nitro in bottiglia e reso popolari le milk stout artigianali americane',
      vi: 'Tiên phong công nghệ bia nitro đóng chai và phổ biến milk stout craft Mỹ',
    },
  },

  description: {
    en: 'A rich, sweet American milk stout with lactose, dispensed with nitrogen for ultimate smoothness. Deep black with a thick tan head, it offers creamy coffee, chocolate, and caramel flavors with a sweet, dessert-like character. The nitro version creates an exceptionally velvety mouthfeel.',
    it: 'Una ricca e dolce milk stout americana con lattosio, spillata ad azoto per la massima morbidezza. Nera profonda con una spessa schiuma color nocciola, offre sapori cremosi di caffè, cioccolato e caramello con un carattere dolce, simile a un dessert. La versione nitro crea una sensazione in bocca eccezionalmente vellutata.',
    vi: 'Một milk stout Mỹ giàu có, ngọt với lactose, được rót với nitrogen để có độ mượt tối đa. Đen sâu với lớp bọt dày màu nâu nhạt, nó mang đến hương vị cà phê, chocolate và caramel kem với đặc tính ngọt ngào giống món tráng miệng. Phiên bản nitro tạo ra cảm giác miệng cực kỳ nhung.',
  },

  tagline: {
    en: 'Milk Stout Nitro: Breakfast in a glass',
    it: 'Milk Stout Nitro: Colazione in un bicchiere',
    vi: 'Milk Stout Nitro: Bữa sáng trong ly',
  },

  characteristics: {
    abv: 6.0,
    ibu: 25,
    srm: 42,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'low',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['sweet', 'creamy', 'coffee', 'chocolate', 'caramel', 'smooth', 'velvety', 'dessert-like'],
    description: {
      en: 'Rich and sweet with prominent milk chocolate, coffee, and caramel notes. The lactose adds a creamy sweetness and full body. Nitrogen creates an ultra-smooth, velvety mouthfeel with minimal bitterness. Tastes like a liquid dessert with roasted malt complexity.',
      it: 'Ricca e dolce con pronunciate note di cioccolato al latte, caffè e caramello. Il lattosio aggiunge una dolcezza cremosa e corpo pieno. L\'azoto crea una sensazione in bocca ultra-morbida e vellutata con amarezza minima. Ha il sapore di un dessert liquido con complessità di malto tostato.',
      vi: 'Giàu có và ngọt với hương chocolate sữa, cà phê và caramel nổi bật. Lactose thêm vị ngọt kem và thân đầy đặn. Nitrogen tạo ra cảm giác miệng cực kỳ mượt, nhung với vị đắng tối thiểu. Có vị như món tráng miệng lỏng với độ phức tạp mạch nha rang.',
    },
    aroma: {
      en: 'Sweet milk chocolate, roasted coffee, caramel, vanilla, and cream',
      it: 'Dolce cioccolato al latte, caffè tostato, caramello, vaniglia e panna',
      vi: 'Chocolate sữa ngọt, cà phê rang, caramel, vani và kem',
    },
    first_impression: {
      en: 'Incredibly creamy and sweet with immediate chocolate character',
      it: 'Incredibilmente cremosa e dolce con immediato carattere di cioccolato',
      vi: 'Cực kỳ kem và ngọt với đặc tính chocolate ngay lập tức',
    },
    finish: {
      en: 'Sweet and smooth with lingering chocolate and coffee notes',
      it: 'Dolce e morbido con note persistenti di cioccolato e caffè',
      vi: 'Ngọt và mượt với hương chocolate và cà phê kéo dài',
    },
    bitterness_level: 1,
    sweetness_level: 4,
  },

  ingredients: {
    malts: ['Pale malt', 'Roasted barley', 'Chocolate malt', 'Crystal malt', 'Black malt'],
    hops: ['Magnum'],
    yeast: 'American ale yeast',
    special_ingredients: ['Lactose (milk sugar)', 'Nitrogen gas for dispense'],
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'For bottled nitro: Hard pour straight down into glass for maximum cascading effect and creamy head. Draft nitro: two-part pour like Irish stouts.',
      it: 'Per nitro in bottiglia: Versare con forza direttamente nel bicchiere per il massimo effetto a cascata e schiuma cremosa. Nitro alla spina: versamento in due parti come le stout irlandesi.',
      vi: 'Cho nitro chai: Rót mạnh thẳng xuống ly để có hiệu ứng xếp tầng tối đa và lớp bọt kem. Nitro ống: rót hai phần như stout Ireland.',
    },
    ideal_head: '1.5-2 inches',
    head_retention: true,
  },

  pairing: {
    food_categories: ['dessert', 'breakfast', 'cheese', 'chocolate', 'bbq'],
    food_pairings: {
      en: 'Perfect with chocolate desserts, tiramisu, crème brûlée, aged gouda, BBQ ribs, or as a dessert beer. Also excellent with breakfast foods like pancakes, waffles, and French toast.',
      it: 'Perfetta con dessert al cioccolato, tiramisù, crème brûlée, gouda stagionato, costine BBQ o come birra da dessert. Eccellente anche con cibi da colazione come pancake, waffle e French toast.',
      vi: 'Hoàn hảo với món tráng miệng chocolate, tiramisu, crème brûlée, gouda lâu năm, sườn BBQ, hoặc làm bia tráng miệng. Cũng tuyệt vời với đồ ăn sáng như bánh kếp, bánh waffle và bánh mì Pháp.',
    },
    cheese_pairings: ['Aged gouda', 'Gruyere', 'Mascarpone', 'Blue cheese'],
    cuisine_pairings: ['American', 'Dessert', 'Breakfast', 'BBQ'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['dessert', 'relaxation', 'casual', 'nightcap'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['draft', 'bottle'],
  available_sizes: [355, 473],
  related_beers: ['founders-breakfast-stout', 'guinness-draught'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 88,

  source: {
    primary: 'https://www.lefthandbrewing.com',
    note: 'Official Left Hand Brewing website and nitro innovation since 2011',
  },

  version: 1,
};
