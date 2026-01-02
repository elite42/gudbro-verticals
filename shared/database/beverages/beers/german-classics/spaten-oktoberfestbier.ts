import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const spatenOktoberfestbier: Beer = {
  id: uuidv4(),
  slug: 'spaten-oktoberfestbier',
  stable_key: 'spaten-oktoberfestbier',
  name: {
    en: 'Spaten Oktoberfestbier',
    it: 'Spaten Oktoberfestbier',
    vi: 'Spaten Oktoberfestbier',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'marzen',
  tags: ['german', 'bavarian', 'lager', 'oktoberfest', 'munich', 'amber', 'festbier', 'seasonal'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Bavaria',
    city: 'Munich',
    brewery: {
      en: 'Spaten-Franziskaner-Bräu',
      it: 'Birrificio Spaten-Franziskaner',
      vi: 'Nhà máy bia Spaten-Franziskaner',
    },
    brewery_founded: 1397,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1872',
    story: {
      en: 'Spaten is one of Munich\'s legendary breweries, founded in 1397. In 1872, Spaten brewer Josef Sedlmayr created the Oktoberfestbier style specifically for the Oktoberfest celebration, introducing the amber Märzen-style beer that became synonymous with the festival. Before this, darker beers dominated. Spaten\'s innovation revolutionized Oktoberfest and created a new beer category. The brewery was also a pioneer in lager brewing techniques and refrigeration technology in the 19th century. Today, Spaten remains one of the six official Oktoberfest breweries allowed to serve at the festival, and their Oktoberfestbier is considered the original and most authentic version of this celebrated style.',
      it: 'Spaten è uno dei birrifici leggendari di Monaco, fondato nel 1397. Nel 1872, il birraio Spaten Josef Sedlmayr creò lo stile Oktoberfestbier specificamente per la celebrazione dell\'Oktoberfest, introducendo la birra ambrata in stile Märzen che divenne sinonimo del festival. Prima di questo, dominavano le birre più scure. L\'innovazione di Spaten ha rivoluzionato l\'Oktoberfest e creato una nuova categoria di birra. Il birrificio fu anche pioniere nelle tecniche di produzione lager e nella tecnologia di refrigerazione nel XIX secolo. Oggi, Spaten rimane uno dei sei birrifici ufficiali dell\'Oktoberfest autorizzati a servire al festival, e la loro Oktoberfestbier è considerata la versione originale e più autentica di questo stile celebrato.',
      vi: 'Spaten là một trong những nhà máy bia huyền thoại của Munich, được thành lập năm 1397. Năm 1872, thợ pha chế bia Spaten Josef Sedlmayr đã tạo ra phong cách Oktoberfestbier đặc biệt cho lễ hội Oktoberfest, giới thiệu bia hổ phách kiểu Märzen trở thành đồng nghĩa với lễ hội. Trước đó, bia tối màu chiếm ưu thế. Sự đổi mới của Spaten đã cách mạng hóa Oktoberfest và tạo ra một loại bia mới. Nhà máy bia cũng là tiên phong trong kỹ thuật sản xuất lager và công nghệ làm lạnh vào thế kỷ 19. Ngày nay, Spaten vẫn là một trong sáu nhà máy bia Oktoberfest chính thức được phép phục vụ tại lễ hội, và Oktoberfestbier của họ được coi là phiên bản gốc và đích thực nhất của phong cách được tôn vinh này.',
    },
    named_after: {
      en: 'Spaten means "spade" in German, referencing the brewery\'s historic brewing tools',
      it: 'Spaten significa "vanga" in tedesco, in riferimento agli strumenti storici di produzione del birrificio',
      vi: 'Spaten có nghĩa là "cái xẻng" trong tiếng Đức, ám chỉ các công cụ sản xuất bia lịch sử của nhà máy bia',
    },
  },

  description: {
    en: 'The original Oktoberfest beer created in 1872. Rich amber lager with toasty malt character, subtle caramel sweetness, and clean finish. This is the beer that defined the Märzen/Oktoberfest style and remains the authentic taste of Munich\'s most famous celebration.',
    it: 'La birra Oktoberfest originale creata nel 1872. Lager ambrata ricca con carattere maltato tostato, sottile dolcezza di caramello e finale pulito. Questa è la birra che ha definito lo stile Märzen/Oktoberfest e rimane il gusto autentico della celebrazione più famosa di Monaco.',
    vi: 'Bia Oktoberfest gốc được tạo ra năm 1872. Lager hổ phách phong phú với đặc tính malt rang, vị ngọt caramel tinh tế và kết thúc sạch. Đây là loại bia định nghĩa phong cách Märzen/Oktoberfest và vẫn là hương vị đích thực của lễ kỷ niệm nổi tiếng nhất Munich.',
  },

  tagline: {
    en: 'The Original Oktoberfest Beer Since 1872',
    it: 'L\'Originale Birra Oktoberfest dal 1872',
    vi: 'Bia Oktoberfest Gốc Từ Năm 1872',
  },

  characteristics: {
    abv: 5.9,
    ibu: 22,
    srm: 14,
    color: 'amber',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['malty', 'toasty', 'caramel', 'bready', 'clean', 'balanced', 'smooth'],
    description: {
      en: 'Rich toasted malt with notes of fresh bread, caramel, and subtle toffee. Smooth malt sweetness balanced by moderate noble hop bitterness. Clean lager fermentation with no fruity esters. Full-bodied yet remarkably drinkable, with a dry finish that prevents cloying sweetness.',
      it: 'Ricco malto tostato con note di pane fresco, caramello e sottile toffee. Dolcezza maltata liscia bilanciata da moderata amarezza di luppolo nobile. Fermentazione lager pulita senza esteri fruttati. Corposo ma straordinariamente bevibile, con un finale secco che previene la dolcezza stucchevole.',
      vi: 'Malt rang phong phú với hương bánh mì tươi, caramel và kẹo bơ tinh tế. Vị ngọt malt mượt cân bằng bởi độ đắng hoa bia quý tộc vừa phải. Lên men lager sạch không có este trái cây. Đầy đặn nhưng dễ uống đáng kể, với kết thúc khô ngăn vị ngọt ngấy.',
    },
    aroma: {
      en: 'Toasted bread, caramel malt, subtle toffee, light noble hops',
      it: 'Pane tostato, malto caramellato, sottile toffee, luppolo nobile leggero',
      vi: 'Bánh mì rang, malt caramel, kẹo bơ tinh tế, hoa bia quý tộc nhẹ',
    },
    first_impression: {
      en: 'Rich malty sweetness with toasty character and smooth body',
      it: 'Ricca dolcezza maltata con carattere tostato e corpo liscio',
      vi: 'Vị ngọt malt phong phú với đặc tính rang và thân mượt',
    },
    finish: {
      en: 'Clean, dry finish with lingering malt character and subtle hop bitterness',
      it: 'Finale pulito e secco con persistente carattere maltato e sottile amarezza di luppolo',
      vi: 'Kết thúc sạch, khô với đặc tính malt kéo dài và độ đắng hoa bia tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 4,
  },

  ingredients: {
    malts: ['Munich malt', 'Vienna malt', 'Pilsner malt'],
    hops: ['Hallertauer Tradition', 'Tettnanger'],
    yeast: 'Traditional Munich lager yeast',
  },

  serving: {
    glass: 'mug',
    temperature: 'cold',
    temperature_celsius: { min: 7, max: 9 },
    pouring_notes: {
      en: 'Serve in a traditional 1-liter Maßkrug (Oktoberfest mug). Pour at steady angle to create a dense 2-finger head. Traditional at Oktoberfest tents.',
      it: 'Servire in un tradizionale Maßkrug da 1 litro (boccale Oktoberfest). Versare con angolo costante per creare una densa schiuma di 2 dita. Tradizionale nelle tende Oktoberfest.',
      vi: 'Phục vụ trong Maßkrug 1 lít truyền thống (cốc Oktoberfest). Rót nghiêng đều để tạo lớp bọt dày 2 ngón. Truyền thống tại lều Oktoberfest.',
    },
    ideal_head: '2-3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'grilled-meats', 'sausages', 'roasted-dishes'],
    food_pairings: {
      en: 'Classic pairing with Oktoberfest foods: Hendl (roast chicken), Schweinshaxe (roasted pork knuckle), bratwurst, pretzels with Obatzda, roasted meats, and hearty Bavarian fare.',
      it: 'Abbinamento classico con cibi Oktoberfest: Hendl (pollo arrosto), Schweinshaxe (stinco di maiale arrosto), bratwurst, pretzel con Obatzda, carni arrosto e sostanziosa cucina bavarese.',
      vi: 'Kết hợp cổ điển với món ăn Oktoberfest: Hendl (gà nướng), Schweinshaxe (giò heo nướng), bratwurst, pretzel với Obatzda, thịt nướng và món ăn Bavaria thịnh soạn.',
    },
    cheese_pairings: ['Obatzda', 'Emmental', 'Gruyère', 'Aged Cheddar'],
    cuisine_pairings: ['German', 'Bavarian', 'Grilled', 'Roasted Meats'],
  },

  season_tags: ['fall', 'oktoberfest', 'autumn'],
  occasion_tags: ['oktoberfest', 'celebration', 'party', 'festival', 'dinner'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft', 'can'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-oktoberfest', 'augustiner-helles'],
  availability: 'seasonal',

  price_tier: 'mid',
  popularity: 85,

  source: {
    primary: 'https://www.spaten.de',
    note: 'Official Spaten brewery and Oktoberfest history',
  },

  version: 1,
};
