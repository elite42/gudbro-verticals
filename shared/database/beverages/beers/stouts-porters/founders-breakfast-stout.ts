import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const foundersBreakfastStout: Beer = {
  id: uuidv4(),
  slug: 'founders-breakfast-stout',
  stable_key: 'founders-breakfast-stout-imperial',
  name: {
    en: 'Founders Breakfast Stout',
    it: 'Founders Breakfast Stout',
    vi: 'Founders Breakfast Stout',
  },

  status: 'craft',
  style_category: 'stout_porter',
  style: 'imperial_stout',
  tags: ['craft', 'american', 'imperial-stout', 'coffee', 'chocolate', 'oats', 'michigan', 'bold', 'breakfast'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Grand Rapids',
    region: 'Michigan',
    brewery: {
      en: 'Founders Brewing Company',
      it: 'Birrificio Founders',
      vi: 'Công ty Bia Founders',
    },
    brewery_founded: 1997,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '2001',
    story: {
      en: 'Founders Brewing Company launched Breakfast Stout in 2001 as one of the first American imperial stouts brewed with coffee and oats. The beer combines two of the most important things in life: breakfast and beer. Made with Sumatra and Kona coffee, flaked oats for silky texture, and chocolate malts, it became an instant cult classic. The beer helped establish Founders as a premier craft brewery and inspired countless coffee stouts. Originally a seasonal release, high demand made it year-round in 2017.',
      it: 'Founders Brewing Company ha lanciato Breakfast Stout nel 2001 come una delle prime imperial stout americane prodotte con caffè e avena. La birra combina due delle cose più importanti della vita: colazione e birra. Prodotta con caffè Sumatra e Kona, fiocchi d\'avena per una texture setosa e malti al cioccolato, è diventata un classico di culto istantaneo. La birra ha contribuito a stabilire Founders come un birrificio artigianale di premier e ha ispirato innumerevoli stout al caffè. Originariamente un rilascio stagionale, l\'alta domanda l\'ha resa disponibile tutto l\'anno nel 2017.',
      vi: 'Founders Brewing Company ra mắt Breakfast Stout năm 2001 như một trong những imperial stout Mỹ đầu tiên được sản xuất với cà phê và yến mạch. Bia kết hợp hai trong số những điều quan trọng nhất trong cuộc sống: bữa sáng và bia. Được làm từ cà phê Sumatra và Kona, bột yến mạch cho kết cấu mượt mà và mạch nha chocolate, nó trở thành một tác phẩm kinh điển ngay lập tức. Bia đã giúp thiết lập Founders như một nhà máy bia craft hàng đầu và truyền cảm hứng cho vô số stout cà phê. Ban đầu là sản phẩm theo mùa, nhu cầu cao đã khiến nó có sẵn quanh năm vào năm 2017.',
    },
    awards: ['Great American Beer Festival Gold', 'World Beer Cup Gold', 'Top-rated imperial stout'],
    named_after: {
      en: 'Named for the breakfast staples used: coffee, oats, and chocolate - the most important meal of the day',
      it: 'Prende il nome dagli ingredienti base della colazione utilizzati: caffè, avena e cioccolato - il pasto più importante della giornata',
      vi: 'Được đặt theo tên các thành phần bữa sáng được sử dụng: cà phê, yến mạch và chocolate - bữa ăn quan trọng nhất trong ngày',
    },
    significance: {
      en: 'One of the most influential American coffee stouts, pioneering the imperial breakfast stout category',
      it: 'Una delle stout al caffè americane più influenti, pioniera della categoria imperial breakfast stout',
      vi: 'Một trong những stout cà phê Mỹ có ảnh hưởng nhất, tiên phong trong danh mục imperial breakfast stout',
    },
  },

  description: {
    en: 'A bold imperial stout brewed with coffee and oats. Pitch black with a thick tan head, it delivers intense coffee and chocolate flavors with smooth oatmeal texture. The double dose of coffee (Sumatra and Kona) creates a rich espresso character balanced by chocolate malt sweetness.',
    it: 'Una coraggiosa imperial stout prodotta con caffè e avena. Nero intenso con una spessa schiuma color nocciola, offre intensi sapori di caffè e cioccolato con una texture morbida di farina d\'avena. La doppia dose di caffè (Sumatra e Kona) crea un ricco carattere di espresso bilanciato dalla dolcezza del malto al cioccolato.',
    vi: 'Một imperial stout táo bạo được sản xuất với cà phê và yến mạch. Đen tuyền với lớp bọt dày màu nâu nhạt, nó mang đến hương vị cà phê và chocolate mãnh liệt với kết cấu yến mạch mượt mà. Liều lượng cà phê kép (Sumatra và Kona) tạo ra đặc tính espresso phong phú được cân bằng bởi vị ngọt mạch nha chocolate.',
  },

  tagline: {
    en: 'The coffee lover\'s consummate beer',
    it: 'La birra perfetta per gli amanti del caffè',
    vi: 'Bia hoàn hảo cho người yêu cà phê',
  },

  characteristics: {
    abv: 8.3,
    ibu: 60,
    srm: 45,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'medium',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['coffee', 'chocolate', 'roasty', 'bold', 'smooth', 'espresso', 'oaty', 'rich'],
    description: {
      en: 'Intense coffee flavors dominate with rich espresso, dark chocolate, and roasted malt character. The oats provide a silky, smooth mouthfeel that balances the bold coffee bitterness. Notes of cocoa, caramel, and dark fruit complexity. Strong but remarkably drinkable with coffee that shines through without being harsh.',
      it: 'Intensi sapori di caffè dominano con ricco espresso, cioccolato fondente e carattere di malto tostato. L\'avena fornisce una sensazione in bocca setosa e morbida che bilancia l\'ardita amarezza del caffè. Note di cacao, caramello e complessità di frutta scura. Forte ma straordinariamente bevibile con caffè che risalta senza essere aspro.',
      vi: 'Hương vị cà phê mãnh liệt chiếm ưu thế với espresso phong phú, chocolate đen và đặc tính mạch nha rang. Yến mạch mang lại cảm giác miệng mượt mà, mịn màng cân bằng vị đắng cà phê táo bạo. Hương vị ca cao, caramel và phức tạp trái cây tối. Mạnh mẽ nhưng dễ uống đáng chú ý với cà phê tỏa sáng mà không khắc nghiệt.',
    },
    aroma: {
      en: 'Strong roasted coffee, dark chocolate, cocoa, caramel, and roasted malt',
      it: 'Forte caffè tostato, cioccolato fondente, cacao, caramello e malto tostato',
      vi: 'Cà phê rang mạnh, chocolate đen, ca cao, caramel và mạch nha rang',
    },
    first_impression: {
      en: 'Bold coffee punch with smooth, velvety oat texture',
      it: 'Potente colpo di caffè con texture di avena morbida e vellutata',
      vi: 'Hương cà phê mạnh mẽ với kết cấu yến mạch mượt, nhung',
    },
    finish: {
      en: 'Long, rich coffee finish with chocolate and roasted malt lingering',
      it: 'Lungo e ricco finale di caffè con cioccolato e malto tostato persistente',
      vi: 'Kết thúc cà phê dài, phong phú với chocolate và mạch nha rang kéo dài',
    },
    bitterness_level: 4,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Chocolate malt', 'Roasted barley', 'Caramel malt', 'Flaked oats'],
    hops: ['Magnum', 'Cascade'],
    yeast: 'American ale yeast',
    special_ingredients: ['Sumatra coffee', 'Kona coffee', 'Flaked oats'],
  },

  serving: {
    glass: 'snifter',
    temperature: 'cellar',
    temperature_celsius: { min: 10, max: 13 },
    pouring_notes: {
      en: 'Pour into a tulip or snifter glass to concentrate the coffee aromatics. Allow to warm slightly for full flavor development.',
      it: 'Versare in un bicchiere tulip o snifter per concentrare gli aromi del caffè. Lasciare riscaldare leggermente per lo sviluppo completo del sapore.',
      vi: 'Rót vào ly tulip hoặc snifter để tập trung hương thơm cà phê. Để ấm lên một chút để phát triển hương vị đầy đủ.',
    },
    ideal_head: '0.5-1 inch',
    head_retention: true,
  },

  pairing: {
    food_categories: ['breakfast', 'dessert', 'chocolate', 'cheese', 'brunch'],
    food_pairings: {
      en: 'Perfect with brunch dishes, chocolate cake, tiramisu, coffee ice cream, bacon, pancakes, or smoked meats. The coffee pairs excellently with chocolate and breakfast foods.',
      it: 'Perfetta con piatti da brunch, torta al cioccolato, tiramisù, gelato al caffè, bacon, pancake o carni affumicate. Il caffè si abbina eccellentemente con cioccolato e cibi da colazione.',
      vi: 'Hoàn hảo với món brunch, bánh chocolate, tiramisu, kem cà phê, thịt xông khói, bánh kếp hoặc thịt hun khói. Cà phê kết hợp tuyệt vời với chocolate và đồ ăn sáng.',
    },
    cheese_pairings: ['Aged cheddar', 'Smoked gouda', 'Mascarpone', 'Blue cheese'],
    cuisine_pairings: ['American', 'Breakfast', 'Dessert', 'BBQ'],
  },

  season_tags: ['all_year', 'winter', 'autumn'],
  occasion_tags: ['brunch', 'dessert', 'nightcap', 'special_occasion'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['draft', 'bottle', 'can'],
  available_sizes: [355, 473],
  related_beers: ['left-hand-milk-stout', 'old-rasputin'],
  availability: 'year_round',

  price_tier: 'mid_high',
  popularity: 92,

  source: {
    primary: 'https://foundersbrewing.com',
    note: 'Official Founders Brewing website and coffee stout innovation since 2001',
  },

  version: 1,
};
