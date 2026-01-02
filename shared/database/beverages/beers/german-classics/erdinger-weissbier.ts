import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const erdingerWeissbier: Beer = {
  id: uuidv4(),
  slug: 'erdinger-weissbier',
  stable_key: 'erdinger-weissbier',
  name: {
    en: 'Erdinger Weissbier',
    it: 'Erdinger Weissbier',
    vi: 'Erdinger Weissbier',
  },

  status: 'international_classic',
  style_category: 'wheat',
  style: 'hefeweizen',
  tags: ['german', 'bavarian', 'wheat', 'unfiltered', 'banana', 'clove', 'world-leader', 'traditional'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Bavaria',
    city: 'Erding',
    brewery: {
      en: 'Erdinger Weißbräu',
      it: 'Birrificio Erdinger Weißbräu',
      vi: 'Nhà máy bia Erdinger Weißbräu',
    },
    brewery_founded: 1886,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1886',
    story: {
      en: 'Erdinger Weißbräu was founded in 1886 by Johann Kienle in the town of Erding, northeast of Munich. The name "Erdinger" comes from the town\'s name. Initially a small local brewery, Erdinger focused exclusively on wheat beer when most breweries were diversifying. This specialization proved brilliant - today Erdinger is the world\'s largest wheat beer brewery. The brewery remains family-owned and has become synonymous with premium Bavarian wheat beer globally. They pioneered modern wheat beer production techniques while maintaining traditional yeast strains and recipes. Erdinger is particularly proud of their yeast management, using the same proprietary strain for over a century.',
      it: 'Erdinger Weißbräu fu fondata nel 1886 da Johann Kienle nella città di Erding, a nord-est di Monaco. Il nome "Erdinger" deriva dal nome della città. Inizialmente un piccolo birrificio locale, Erdinger si concentrò esclusivamente sulla birra di frumento quando la maggior parte dei birrifici si stava diversificando. Questa specializzazione si rivelò brillante - oggi Erdinger è il più grande birrificio di birra di frumento al mondo. Il birrificio rimane di proprietà familiare ed è diventato sinonimo di birra di frumento bavarese premium a livello globale. Hanno aperto la strada alle moderne tecniche di produzione della birra di frumento mantenendo ceppi di lievito e ricette tradizionali. Erdinger è particolarmente orgogliosa della sua gestione del lievito, utilizzando lo stesso ceppo proprietario da oltre un secolo.',
      vi: 'Erdinger Weißbräu được thành lập năm 1886 bởi Johann Kienle ở thị trấn Erding, đông bắc Munich. Tên "Erdinger" xuất phát từ tên thị trấn. Ban đầu là một nhà máy bia địa phương nhỏ, Erdinger tập trung độc quyền vào bia lúa mì khi hầu hết các nhà máy bia đang đa dạng hóa. Chuyên môn hóa này đã chứng minh là xuất sắc - ngày nay Erdinger là nhà máy bia lúa mì lớn nhất thế giới. Nhà máy bia vẫn thuộc sở hữu gia đình và đã trở thành đồng nghĩa với bia lúa mì Bavaria cao cấp trên toàn cầu. Họ tiên phong trong kỹ thuật sản xuất bia lúa mì hiện đại trong khi duy trì các chủng men và công thức truyền thống. Erdinger đặc biệt tự hào về quản lý men của họ, sử dụng cùng một chủng độc quyền trong hơn một thế kỷ.',
    },
    named_after: {
      en: 'Named after the town of Erding in Bavaria where the brewery is located',
      it: 'Prende il nome dalla città di Erding in Baviera dove si trova il birrificio',
      vi: 'Được đặt theo tên thị trấn Erding ở Bavaria nơi đặt nhà máy bia',
    },
  },

  description: {
    en: 'The world\'s most popular wheat beer from Bavaria\'s largest wheat beer brewery. Classic Hefeweizen with pronounced banana and clove character, cloudy golden color, and refreshing drinkability. Erdinger represents the pinnacle of modern wheat beer production while honoring traditional Bavarian brewing.',
    it: 'La birra di frumento più popolare al mondo dal più grande birrificio di birra di frumento della Baviera. Classica Hefeweizen con pronunciato carattere di banana e chiodi di garofano, colore dorato torbido e rinfrescante bevibilità. Erdinger rappresenta l\'apice della produzione moderna di birra di frumento onorando la produzione tradizionale bavarese.',
    vi: 'Bia lúa mì phổ biến nhất thế giới từ nhà máy bia lúa mì lớn nhất Bavaria. Hefeweizen cổ điển với đặc tính chuối và đinh hương rõ rệt, màu vàng đục và khả năng uống sảng khoái. Erdinger đại diện cho đỉnh cao của sản xuất bia lúa mì hiện đại trong khi tôn vinh sản xuất bia Bavaria truyền thống.',
  },

  tagline: {
    en: 'World\'s Leading Wheat Beer',
    it: 'La Birra di Frumento Leader Mondiale',
    vi: 'Bia Lúa Mì Hàng Đầu Thế Giới',
  },

  characteristics: {
    abv: 5.3,
    ibu: 13,
    srm: 6,
    color: 'gold',
    clarity: 'hazy',
    carbonation: 'high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['banana', 'clove', 'creamy', 'refreshing', 'wheaty', 'fruity', 'spicy', 'smooth'],
    description: {
      en: 'Classic Bavarian wheat beer profile with prominent banana and clove phenols from their proprietary yeast. Smooth wheat malt character with hints of vanilla and citrus. High carbonation creates a lively mouthfeel. Clean, refreshing finish with minimal bitterness that makes it exceptionally drinkable.',
      it: 'Classico profilo di birra di frumento bavarese con prominenti fenoli di banana e chiodi di garofano dal loro lievito proprietario. Carattere morbido di malto di frumento con accenni di vaniglia e agrumi. L\'alta carbonazione crea una sensazione vivace in bocca. Finale pulito e rinfrescante con amarezza minima che la rende eccezionalmente bevibile.',
      vi: 'Hồ sơ bia lúa mì Bavaria cổ điển với phenol chuối và đinh hương nổi bật từ men độc quyền của họ. Đặc tính malt lúa mì mượt với gợi ý vani và cam quýt. Carbonation cao tạo cảm giác sống động trong miệng. Kết thúc sạch, sảng khoái với độ đắng tối thiểu làm cho nó cực kỳ dễ uống.',
    },
    aroma: {
      en: 'Banana, clove, subtle vanilla, hints of citrus and bubblegum',
      it: 'Banana, chiodi di garofano, sottile vaniglia, accenni di agrumi e bubblegum',
      vi: 'Chuối, đinh hương, vanilla tinh tế, gợi ý cam quýt và kẹo cao su',
    },
    first_impression: {
      en: 'Smooth, creamy wheat character with lively banana-clove yeast expression',
      it: 'Carattere di frumento liscio e cremoso con vivace espressione di lievito banana-chiodi di garofano',
      vi: 'Đặc tính lúa mì mượt, kem với biểu hiện men chuối-đinh hương sống động',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering fruity yeast character',
      it: 'Finale pulito e rinfrescante con persistente carattere fruttato di lievito',
      vi: 'Kết thúc sạch, sảng khoái với đặc tính men trái cây kéo dài',
    },
    bitterness_level: 1,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Wheat malt (55%)', 'Barley malt'],
    hops: ['Hallertauer Tradition', 'Perle'],
    yeast: 'Proprietary Erdinger wheat beer yeast (100+ year old strain)',
  },

  serving: {
    glass: 'weizen',
    temperature: 'cold',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'Use the classic Erdinger vase-shaped Weizen glass. Pour 2/3 of bottle at angle, leave remaining beer. Gently roll bottle to resuspend yeast, then pour remainder creating a thick, fluffy head.',
      it: 'Usa il classico bicchiere Weizen a forma di vaso Erdinger. Versare 2/3 della bottiglia in diagonale, lasciare la birra rimanente. Rotolare delicatamente la bottiglia per risospendere il lievito, quindi versare il resto creando una schiuma spessa e soffice.',
      vi: 'Sử dụng ly Weizen hình bình cổ điển Erdinger. Rót 2/3 chai nghiêng, để lại bia còn lại. Lăn nhẹ chai để tái huyền phù men, sau đó rót phần còn lại tạo lớp bọt dày, mịn.',
    },
    ideal_head: '3-4 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'seafood', 'salads', 'breakfast', 'light-dishes'],
    food_pairings: {
      en: 'Traditional with Weisswurst and pretzels for Bavarian breakfast. Also excellent with grilled fish, seafood platters, Caesar salad, omelets, mild cheeses, and fruit-based desserts.',
      it: 'Tradizionale con Weisswurst e pretzel per colazione bavarese. Eccellente anche con pesce alla griglia, piatti di frutti di mare, insalata Caesar, omelette, formaggi delicati e dessert a base di frutta.',
      vi: 'Truyền thống với Weisswurst và pretzel cho bữa sáng Bavaria. Cũng tuyệt vời với cá nướng, đĩa hải sản, salad Caesar, trứng ốp, phô mai nhẹ và món tráng miệng trái cây.',
    },
    cheese_pairings: ['Obatzda', 'Brie', 'Camembert', 'Fresh Goat Cheese'],
    cuisine_pairings: ['German', 'Bavarian', 'Seafood', 'Brunch'],
  },

  season_tags: ['all_year', 'summer', 'spring'],
  occasion_tags: ['brunch', 'casual', 'party', 'dinner', 'sports'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft', 'can'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-hefeweizen', 'weihenstephaner-hefeweissbier'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 91,

  source: {
    primary: 'https://www.erdinger.de',
    note: 'Official Erdinger brewery and world wheat beer leader',
  },

  version: 1,
};
