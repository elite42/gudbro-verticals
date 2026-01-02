import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const oldRasputin: Beer = {
  id: uuidv4(),
  slug: 'old-rasputin',
  stable_key: 'old-rasputin-russian-imperial-stout',
  name: {
    en: 'Old Rasputin Russian Imperial Stout',
    it: 'Old Rasputin Russian Imperial Stout',
    vi: 'Old Rasputin Russian Imperial Stout',
  },

  status: 'craft',
  style_category: 'stout_porter',
  style: 'russian_imperial_stout',
  tags: ['craft', 'american', 'russian-imperial-stout', 'bold', 'intense', 'california', 'iconic', 'high-abv'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Fort Bragg',
    region: 'California',
    brewery: {
      en: 'North Coast Brewing Company',
      it: 'Birrificio North Coast',
      vi: 'Công ty Bia North Coast',
    },
    brewery_founded: 1988,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '1995',
    story: {
      en: 'Old Rasputin was first brewed by North Coast Brewing in 1995, named after the famous Russian mystic Grigori Rasputin. It was one of the first American craft interpretations of the Russian Imperial Stout style, which originated in 18th-century England for export to the Russian Imperial Court. The beer features Rasputin\'s iconic image on the label. Known for its intense, warming character and complex flavors, Old Rasputin has become one of the most respected and influential imperial stouts in American craft brewing, earning numerous awards and inspiring countless brewers.',
      it: 'Old Rasputin fu prodotta per la prima volta da North Coast Brewing nel 1995, prendendo il nome dal famoso mistico russo Grigori Rasputin. È stata una delle prime interpretazioni artigianali americane dello stile Russian Imperial Stout, originato nell\'Inghilterra del XVIII secolo per l\'esportazione alla Corte Imperiale Russa. La birra presenta l\'iconica immagine di Rasputin sull\'etichetta. Conosciuta per il suo carattere intenso e riscaldante e sapori complessi, Old Rasputin è diventata una delle imperial stout più rispettate e influenti nella produzione artigianale americana, guadagnando numerosi premi e ispirando innumerevoli birrai.',
      vi: 'Old Rasputin được sản xuất lần đầu bởi North Coast Brewing năm 1995, được đặt theo tên nhà thần bí Nga nổi tiếng Grigori Rasputin. Đây là một trong những diễn giải craft Mỹ đầu tiên về phong cách Russian Imperial Stout, có nguồn gốc từ Anh thế kỷ 18 để xuất khẩu sang Triều đình Hoàng gia Nga. Bia có hình ảnh biểu tượng của Rasputin trên nhãn. Được biết đến với đặc tính mãnh liệt, ấm áp và hương vị phức tạp, Old Rasputin đã trở thành một trong những imperial stout được tôn trọng và có ảnh hưởng nhất trong sản xuất bia craft Mỹ, giành được nhiều giải thưởng và truyền cảm hứng cho vô số nhà sản xuất bia.',
    },
    awards: ['Great American Beer Festival medals', 'World Beer Cup Gold', 'Top-rated RIS globally'],
    named_after: {
      en: 'Named after Grigori Rasputin, the Russian mystic and advisor to the Romanov family',
      it: 'Prende il nome da Grigori Rasputin, il mistico russo e consigliere della famiglia Romanov',
      vi: 'Được đặt theo tên Grigori Rasputin, nhà thần bí Nga và cố vấn cho gia đình Romanov',
    },
    significance: {
      en: 'One of the most iconic American Russian Imperial Stouts, setting the standard for the style in craft brewing',
      it: 'Una delle Russian Imperial Stout americane più iconiche, stabilendo lo standard per lo stile nella produzione artigianale',
      vi: 'Một trong những Russian Imperial Stout Mỹ mang tính biểu tượng nhất, thiết lập tiêu chuẩn cho phong cách trong sản xuất bia craft',
    },
  },

  description: {
    en: 'A powerful, intensely flavored Russian Imperial Stout. Pitch black with a thick tan head, it delivers massive roasted malt character with rich chocolate, coffee, and dark fruit complexity. Bold, warming alcohol presence balanced by deep malt sweetness and hop bitterness.',
    it: 'Una potente Russian Imperial Stout dal sapore intenso. Nero intenso con una spessa schiuma color nocciola, offre un massiccio carattere di malto tostato con ricca complessità di cioccolato, caffè e frutta scura. Presenza alcolica audace e riscaldante bilanciata da profonda dolcezza maltata e amarezza di luppolo.',
    vi: 'Một Russian Imperial Stout mạnh mẽ, hương vị mãnh liệt. Đen tuyền với lớp bọt dày màu nâu nhạt, nó mang đến đặc tính mạch nha rang lớn với chocolate phong phú, cà phê và độ phức tạp trái cây tối. Sự hiện diện rượu táo bạo, ấm áp được cân bằng bởi vị ngọt mạch nha sâu và vị đắng hoa bia.',
  },

  tagline: {
    en: 'A masterpiece of intensity and balance',
    it: 'Un capolavoro di intensità ed equilibrio',
    vi: 'Kiệt tác của cường độ và cân bằng',
  },

  characteristics: {
    abv: 9.0,
    ibu: 75,
    srm: 50,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'medium',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['intense', 'roasty', 'chocolate', 'coffee', 'dark-fruit', 'warming', 'complex', 'bold'],
    description: {
      en: 'Intensely roasted with powerful dark chocolate, espresso, and roasted malt flavors. Rich dark fruit notes (plum, raisin, fig) add complexity. Warming alcohol presence is well-integrated with sweet malt backbone. Hoppy bitterness balances the sweetness. Finishes dry with lingering roasted character and subtle alcohol warmth.',
      it: 'Intensamente tostato con potenti sapori di cioccolato fondente, espresso e malto tostato. Ricche note di frutta scura (prugna, uvetta, fico) aggiungono complessità. La presenza alcolica riscaldante è ben integrata con la base maltata dolce. L\'amarezza luppolata bilancia la dolcezza. Finisce secco con carattere tostato persistente e sottile calore alcolico.',
      vi: 'Rang mãnh liệt với hương vị chocolate đen mạnh mẽ, espresso và mạch nha rang. Hương trái cây tối phong phú (mận, nho khô, sung) thêm độ phức tạp. Sự hiện diện rượu ấm áp được tích hợp tốt với nền mạch nha ngọt. Vị đắng hoa bia cân bằng vị ngọt. Kết thúc khô với đặc tính rang kéo dài và ấm rượu tinh tế.',
    },
    aroma: {
      en: 'Rich roasted malt, dark chocolate, coffee, dark fruit, caramel, and subtle hop spice',
      it: 'Ricco malto tostato, cioccolato fondente, caffè, frutta scura, caramello e sottile spezia di luppolo',
      vi: 'Mạch nha rang phong phú, chocolate đen, cà phê, trái cây tối, caramel và gia vị hoa bia tinh tế',
    },
    first_impression: {
      en: 'Bold and intense with immediate roasted malt and chocolate power',
      it: 'Audace e intenso con immediata potenza di malto tostato e cioccolato',
      vi: 'Táo bạo và mãnh liệt với sức mạnh mạch nha rang và chocolate ngay lập tức',
    },
    finish: {
      en: 'Long, dry, roasty finish with warming alcohol and dark chocolate lingering',
      it: 'Lungo finale secco e tostato con alcol riscaldante e cioccolato fondente persistente',
      vi: 'Kết thúc dài, khô, rang với rượu ấm và chocolate đen kéo dài',
    },
    bitterness_level: 5,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Roasted barley', 'Chocolate malt', 'Black malt', 'Crystal malt'],
    hops: ['Magnum', 'Cascade', 'Chinook'],
    yeast: 'American ale yeast',
    special_ingredients: [],
  },

  serving: {
    glass: 'snifter',
    temperature: 'cellar',
    temperature_celsius: { min: 12, max: 15 },
    pouring_notes: {
      en: 'Pour into a snifter or tulip glass to concentrate intense aromatics. Let warm to 55-60°F to allow full flavor complexity to develop. Can be aged for several years.',
      it: 'Versare in un bicchiere snifter o tulip per concentrare gli aromi intensi. Lasciare riscaldare a 12-15°C per consentire lo sviluppo della piena complessità del sapore. Può essere invecchiata per diversi anni.',
      vi: 'Rót vào ly snifter hoặc tulip để tập trung hương thơm mãnh liệt. Để ấm đến 12-15°C để cho phép độ phức tạp hương vị đầy đủ phát triển. Có thể ủ trong nhiều năm.',
    },
    ideal_head: '0.5-1 inch',
    head_retention: true,
  },

  pairing: {
    food_categories: ['dessert', 'cheese', 'chocolate', 'game', 'hearty-food'],
    food_pairings: {
      en: 'Excellent with dark chocolate desserts, strong blue cheese, grilled steak, game meats, or rich stews. The intensity matches bold, flavorful foods. Also pairs with cigars.',
      it: 'Eccellente con dessert al cioccolato fondente, formaggio erborinato forte, bistecca alla griglia, selvaggina o stufati ricchi. L\'intensità si abbina a cibi audaci e saporiti. Si abbina anche ai sigari.',
      vi: 'Tuyệt vời với món tráng miệng chocolate đen, phô mai xanh mạnh, bít tết nướng, thịt rừng hoặc món hầm giàu có. Cường độ phù hợp với đồ ăn táo bạo, đậm vị. Cũng kết hợp với xì gà.',
    },
    cheese_pairings: ['Stilton', 'Roquefort', 'Aged cheddar', 'Smoked gouda'],
    cuisine_pairings: ['American', 'BBQ', 'Dessert', 'Hearty'],
  },

  season_tags: ['all_year', 'winter', 'autumn'],
  occasion_tags: ['special_occasion', 'nightcap', 'celebration', 'contemplation'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['draft', 'bottle', 'can'],
  available_sizes: [355, 650],
  related_beers: ['founders-breakfast-stout', 'guinness-extra-stout'],
  availability: 'year_round',

  price_tier: 'mid_high',
  popularity: 90,

  source: {
    primary: 'https://www.northcoastbrewing.com',
    note: 'Official North Coast Brewing website and RIS tradition since 1995',
  },

  version: 1,
};
