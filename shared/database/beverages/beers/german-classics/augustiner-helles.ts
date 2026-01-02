import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const augustinerHelles: Beer = {
  id: uuidv4(),
  slug: 'augustiner-helles',
  stable_key: 'augustiner-helles',
  name: {
    en: 'Augustiner Helles',
    it: 'Augustiner Helles',
    vi: 'Augustiner Helles',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'helles',
  tags: ['german', 'bavarian', 'lager', 'munich', 'crisp', 'traditional', 'cult-favorite'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Bavaria',
    city: 'Munich',
    brewery: {
      en: 'Augustiner-Bräu München',
      it: 'Birrificio Augustiner Monaco',
      vi: 'Nhà máy bia Augustiner München',
    },
    brewery_founded: 1328,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1328',
    story: {
      en: 'Augustiner-Bräu is Munich\'s oldest independent brewery, founded in 1328 by Augustinian monks. Unlike other Munich breweries, Augustiner has remained fiercely independent and traditional, refusing to export widely or pasteurize their beer. Their Helles, introduced in the early 1900s following the Munich Helles style innovation, is considered by many locals to be the finest beer in Munich. The brewery still uses wooden barrels for some of their draft beer, a rarity in modern brewing. Augustiner maintains a cult following among beer enthusiasts for its uncompromising quality and traditional methods.',
      it: 'Augustiner-Bräu è il birrificio indipendente più antico di Monaco, fondato nel 1328 dai monaci agostiniani. A differenza di altri birrifici di Monaco, Augustiner è rimasto ferocemente indipendente e tradizionale, rifiutandosi di esportare ampiamente o pastorizzare la propria birra. La loro Helles, introdotta all\'inizio del 1900 seguendo l\'innovazione dello stile Munich Helles, è considerata da molti locali la migliore birra di Monaco. Il birrificio utilizza ancora botti di legno per parte della loro birra alla spina, una rarità nella produzione moderna. Augustiner mantiene un culto tra gli appassionati di birra per la sua qualità senza compromessi e i metodi tradizionali.',
      vi: 'Augustiner-Bräu là nhà máy bia độc lập lâu đời nhất của Munich, được thành lập năm 1328 bởi các tu sĩ Augustinian. Không giống các nhà máy bia khác ở Munich, Augustiner vẫn giữ tính độc lập và truyền thống mạnh mẽ, từ chối xuất khẩu rộng rãi hoặc thanh trùng bia. Helles của họ, được giới thiệu vào đầu những năm 1900 theo sự đổi mới phong cách Munich Helles, được nhiều người dân địa phương coi là bia tốt nhất ở Munich. Nhà máy bia vẫn sử dụng thùng gỗ cho một số bia hơi, điều hiếm thấy trong sản xuất bia hiện đại. Augustiner duy trì lượng người theo dõi cuồng nhiệt trong số những người đam mê bia vì chất lượng không thỏa hiệp và phương pháp truyền thống.',
    },
    named_after: {
      en: 'Named after the Augustinian monks who founded the brewery',
      it: 'Prende il nome dai monaci agostiniani che fondarono il birrificio',
      vi: 'Được đặt theo tên các tu sĩ Augustinian đã thành lập nhà máy bia',
    },
  },

  description: {
    en: 'The quintessential Munich Helles from the city\'s most traditional brewery. Crystal-clear pale golden lager with delicate malt sweetness, noble hop character, and pristine drinkability. Considered by many to be the finest example of the Helles style.',
    it: 'La quintessenza della Munich Helles dal birrificio più tradizionale della città. Lager dorata pallida cristallina con delicata dolcezza maltata, carattere di luppolo nobile e bevibilità immacolata. Considerata da molti il miglior esempio dello stile Helles.',
    vi: 'Tinh túy Munich Helles từ nhà máy bia truyền thống nhất của thành phố. Lager vàng nhạt trong suốt với vị ngọt malt tinh tế, đặc tính hoa bia quý tộc và khả năng uống hoàn hảo. Được nhiều người coi là ví dụ tốt nhất về phong cách Helles.',
  },

  tagline: {
    en: 'Munich\'s Finest - The Cult Classic Helles',
    it: 'La Migliore di Monaco - La Classica Helles di Culto',
    vi: 'Tốt Nhất Munich - Helles Kinh Điển Cult',
  },

  characteristics: {
    abv: 5.2,
    ibu: 20,
    srm: 4,
    color: 'pale_gold',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['malty', 'crisp', 'clean', 'balanced', 'bready', 'subtle-hop', 'refreshing'],
    description: {
      en: 'Delicate malt sweetness with notes of fresh bread and honey, balanced by subtle noble hop bitterness. Clean lager fermentation character with no fruity esters. Extremely drinkable with a crisp, dry finish that invites another sip.',
      it: 'Delicata dolcezza maltata con note di pane fresco e miele, bilanciata da sottile amarezza di luppolo nobile. Carattere pulito di fermentazione lager senza esteri fruttati. Estremamente bevibile con un finale croccante e secco che invita un altro sorso.',
      vi: 'Vị ngọt malt tinh tế với hương bánh mì tươi và mật ong, cân bằng bởi độ đắng hoa bia quý tộc tinh tế. Đặc tính lên men lager sạch không có este trái cây. Cực kỳ dễ uống với kết thúc sắc, khô mời uống thêm.',
    },
    aroma: {
      en: 'Delicate malt bread, light honey, subtle floral and herbal hops',
      it: 'Delicato pane maltato, miele leggero, luppolo floreale ed erbaceo sottile',
      vi: 'Bánh mì malt tinh tế, mật ong nhẹ, hoa bia hoa và thảo mộc tinh tế',
    },
    first_impression: {
      en: 'Soft malt sweetness with perfect balance and clean lager character',
      it: 'Morbida dolcezza maltata con equilibrio perfetto e carattere lager pulito',
      vi: 'Vị ngọt malt mềm với sự cân bằng hoàn hảo và đặc tính lager sạch',
    },
    finish: {
      en: 'Crisp, dry finish with lingering subtle hop bitterness and malt sweetness',
      it: 'Finale croccante e secco con persistente sottile amarezza di luppolo e dolcezza maltata',
      vi: 'Kết thúc sắc, khô với độ đắng hoa bia tinh tế và vị ngọt malt kéo dài',
    },
    bitterness_level: 2,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Munich malt', 'Pilsner malt'],
    hops: ['Hallertauer Mittelfrüh', 'Tettnanger'],
    yeast: 'Traditional Munich lager yeast',
  },

  serving: {
    glass: 'mug',
    temperature: 'cold',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'Pour into a traditional Maßkrug (beer mug) or Willibecher glass at a steady angle to create a 1-2 finger white head. Best enjoyed fresh and cold.',
      it: 'Versare in un tradizionale Maßkrug (boccale da birra) o bicchiere Willibecher con un angolo costante per creare una schiuma bianca di 1-2 dita. Meglio gustata fresca e fredda.',
      vi: 'Rót vào Maßkrug truyền thống (cốc bia) hoặc ly Willibecher nghiêng đều để tạo lớp bọt trắng 1-2 ngón. Tốt nhất được thưởng thức tươi và lạnh.',
    },
    ideal_head: '1-2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'grilled-meats', 'salads', 'light-dishes'],
    food_pairings: {
      en: 'Perfect beer garden companion with Hendl (roast chicken), Schweinshaxe (pork knuckle), pretzels, Obatzda cheese spread, and grilled sausages. Also excellent with lighter fare and salads.',
      it: 'Perfetto compagno di birreria con Hendl (pollo arrosto), Schweinshaxe (stinco di maiale), pretzel, crema di formaggio Obatzda e salsicce grigliate. Eccellente anche con piatti più leggeri e insalate.',
      vi: 'Đồng hành hoàn hảo trong vườn bia với Hendl (gà nướng), Schweinshaxe (giò heo), pretzel, phết phô mai Obatzda và xúc xích nướng. Cũng tuyệt vời với món ăn nhẹ và salad.',
    },
    cheese_pairings: ['Obatzda', 'Emmental', 'Butterkäse', 'Limburger'],
    cuisine_pairings: ['German', 'Bavarian', 'Grilled', 'Beer Garden Food'],
  },

  season_tags: ['all_year', 'summer', 'beer-garden'],
  occasion_tags: ['casual', 'beer-garden', 'dinner', 'party'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-hefeweizen', 'spaten-oktoberfestbier'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 90,

  source: {
    primary: 'https://www.augustiner-braeu.de',
    note: 'Official Augustiner brewery and Munich beer culture',
  },

  version: 1,
};
