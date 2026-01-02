import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const paulanerHefeweizen: Beer = {
  id: uuidv4(),
  slug: 'paulaner-hefeweizen',
  stable_key: 'paulaner-hefe-weissbier',
  name: {
    en: 'Paulaner Hefe-Weißbier',
    it: 'Paulaner Hefe-Weißbier',
    vi: 'Paulaner Hefe-Weißbier',
  },

  status: 'international_classic',
  style_category: 'wheat',
  style: 'hefeweizen',
  tags: ['german', 'bavarian', 'wheat', 'unfiltered', 'banana', 'clove', 'munich', 'oktoberfest'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Bavaria',
    city: 'Munich',
    brewery: {
      en: 'Paulaner Brauerei',
      it: 'Birrificio Paulaner',
      vi: 'Nhà máy bia Paulaner',
    },
    brewery_founded: 1634,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1634',
    story: {
      en: 'Paulaner was founded in 1634 by Paulaner monks in Munich. The monks brewed "liquid bread" to sustain themselves during Lenten fasting. Their strong beer became famous throughout Bavaria. Today, Paulaner is one of Munich\'s "Big Six" breweries and a staple at Oktoberfest. Their Hefeweizen is considered one of the finest examples of the Bavarian wheat beer style.',
      it: 'Paulaner fu fondata nel 1634 dai monaci Paolini a Monaco. I monaci producevano "pane liquido" per sostenersi durante il digiuno quaresimale. La loro birra forte divenne famosa in tutta la Baviera. Oggi, Paulaner è uno dei "Big Six" birrifici di Monaco e un pilastro dell\'Oktoberfest. La loro Hefeweizen è considerata uno dei migliori esempi dello stile birra di frumento bavarese.',
      vi: 'Paulaner được thành lập năm 1634 bởi các tu sĩ Paulaner ở Munich. Các tu sĩ sản xuất "bánh mì lỏng" để duy trì trong thời gian nhịn ăn Mùa Chay. Bia mạnh của họ trở nên nổi tiếng khắp Bavaria. Ngày nay, Paulaner là một trong "Big Six" nhà máy bia của Munich và là trụ cột tại Oktoberfest. Hefeweizen của họ được coi là một trong những ví dụ tốt nhất về phong cách bia lúa mì Bavaria.',
    },
    named_after: {
      en: 'Named after the Paulaner monks (followers of St. Francis of Paula) who founded the brewery',
      it: 'Prende il nome dai monaci Paolini (seguaci di San Francesco di Paola) che fondarono il birrificio',
      vi: 'Được đặt theo tên các tu sĩ Paulaner (những người theo Thánh Francis xứ Paula) đã thành lập nhà máy bia',
    },
  },

  description: {
    en: 'A classic Bavarian Hefeweizen with distinctive banana and clove aromas from the traditional wheat beer yeast. Hazy golden-orange color, creamy texture, and refreshing character make it the quintessential German wheat beer.',
    it: 'Una classica Hefeweizen bavarese con distintivi aromi di banana e chiodi di garofano dal tradizionale lievito da birra di frumento. Colore dorato-arancio torbido, texture cremosa e carattere rinfrescante la rendono la quintessenza della birra di frumento tedesca.',
    vi: 'Hefeweizen Bavaria cổ điển với hương chuối và đinh hương đặc trưng từ men bia lúa mì truyền thống. Màu vàng cam đục, kết cấu kem và đặc tính sảng khoái làm cho nó trở thành tinh túy của bia lúa mì Đức.',
  },

  tagline: {
    en: 'The Original Munich Premium Wheat Beer',
    it: 'L\'Originale Birra di Frumento Premium di Monaco',
    vi: 'Bia Lúa Mì Cao Cấp Munich Nguyên Bản',
  },

  characteristics: {
    abv: 5.5,
    ibu: 12,
    srm: 6,
    color: 'gold',
    clarity: 'hazy',
    carbonation: 'high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['banana', 'clove', 'creamy', 'refreshing', 'wheaty', 'fruity', 'spicy'],
    description: {
      en: 'Classic banana and clove phenols from the yeast dominate, with soft wheat character, subtle citrus notes, and a creamy, refreshing finish. Very low bitterness allows the yeast character to shine.',
      it: 'Classici fenoli di banana e chiodi di garofano dal lievito dominano, con morbido carattere di frumento, sottili note agrumate e un finale cremoso e rinfrescante. Amarezza molto bassa permette al carattere del lievito di brillare.',
      vi: 'Phenol chuối và đinh hương cổ điển từ men chiếm ưu thế, với đặc tính lúa mì mềm, hương cam quýt tinh tế và kết thúc kem, sảng khoái. Độ đắng rất thấp cho phép đặc tính men tỏa sáng.',
    },
    aroma: {
      en: 'Banana, clove, subtle vanilla, with hints of bubblegum',
      it: 'Banana, chiodi di garofano, sottile vaniglia, con accenni di bubblegum',
      vi: 'Chuối, đinh hương, vanilla tinh tế, với gợi ý kẹo cao su',
    },
    first_impression: {
      en: 'Creamy wheat character with pronounced banana-clove yeast notes',
      it: 'Carattere cremoso di frumento con pronunciate note di lievito banana-chiodi di garofano',
      vi: 'Đặc tính lúa mì kem với hương men chuối-đinh hương rõ rệt',
    },
    finish: {
      en: 'Soft, refreshing finish with lingering wheat and yeast character',
      it: 'Finale morbido e rinfrescante con persistente carattere di frumento e lievito',
      vi: 'Kết thúc mềm, sảng khoái với đặc tính lúa mì và men kéo dài',
    },
    bitterness_level: 1,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Wheat malt (50%+)', 'Pilsner malt'],
    hops: ['Hallertauer Tradition'],
    yeast: 'Traditional Bavarian Hefeweizen yeast',
  },

  serving: {
    glass: 'weizen',
    temperature: 'cold',
    temperature_celsius: { min: 5, max: 8 },
    pouring_notes: {
      en: 'Rinse glass with cold water. Pour slowly at an angle, leaving some beer in bottle. Swirl bottle to resuspend yeast, then pour remaining beer into glass.',
      it: 'Sciacquare il bicchiere con acqua fredda. Versare lentamente in diagonale, lasciando un po\' di birra nella bottiglia. Far roteare la bottiglia per risospendere il lievito, poi versare la birra rimanente nel bicchiere.',
      vi: 'Tráng ly với nước lạnh. Rót chậm nghiêng, để lại một ít bia trong chai. Xoay chai để tái huyền phù men, sau đó rót phần bia còn lại vào ly.',
    },
    ideal_head: '3-4 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'seafood', 'salads', 'breakfast'],
    food_pairings: {
      en: 'Traditional with Weisswurst (white sausage) and soft pretzels. Also excellent with seafood, light salads, egg dishes, and mild cheeses.',
      it: 'Tradizionale con Weisswurst (salsiccia bianca) e pretzel morbidi. Eccellente anche con frutti di mare, insalate leggere, piatti a base di uova e formaggi delicati.',
      vi: 'Truyền thống với Weisswurst (xúc xích trắng) và pretzel mềm. Cũng tuyệt vời với hải sản, salad nhẹ, món trứng và phô mai nhẹ.',
    },
    cheese_pairings: ['Bavarian Obatzda', 'Camembert', 'Brie'],
    cuisine_pairings: ['German', 'Bavarian', 'Brunch'],
  },

  season_tags: ['all_year', 'summer', 'oktoberfest'],
  occasion_tags: ['brunch', 'casual', 'party', 'dinner'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-dunkel', 'paulaner-oktoberfest'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 88,

  source: {
    primary: 'https://www.paulaner.com',
    note: 'Official Paulaner website and Bavarian brewing heritage',
  },

  version: 1,
};
