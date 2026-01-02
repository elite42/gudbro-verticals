import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const spatenOktoberfest: Beer = {
  id: uuidv4(),
  slug: 'spaten-oktoberfest',
  stable_key: 'spaten-oktoberfestbier-german',
  name: {
    en: 'Spaten Oktoberfestbier',
    it: 'Spaten Oktoberfestbier',
    vi: 'Spaten Oktoberfestbier',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'oktoberfest',
  tags: ['german', 'bavarian', 'lager', 'munich', 'oktoberfest', 'seasonal', 'märzen', 'traditional', 'amber'],

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
      en: 'Spaten is credited with creating the original Oktoberfestbier in 1872. The brewery, founded in 1397, revolutionized brewing with the introduction of refrigeration and lager techniques. Spaten\'s brewmaster Josef Sedlmayr developed the amber-colored Märzen-style beer specifically for the Oktoberfest celebration. This rich, malty lager was traditionally brewed in March (März), lagered through the summer, and served at the fall festival. Spaten remains one of only six breweries authorized to serve beer at Munich\'s Oktoberfest.',
      it: 'Spaten è accreditata per aver creato l\'Oktoberfestbier originale nel 1872. Il birrificio, fondato nel 1397, ha rivoluzionato la produzione di birra con l\'introduzione della refrigerazione e delle tecniche lager. Il maestro birraio di Spaten Josef Sedlmayr sviluppò la birra in stile Märzen color ambra specificamente per la celebrazione dell\'Oktoberfest. Questa lager ricca e maltata veniva tradizionalmente prodotta a marzo (März), maturata durante l\'estate e servita al festival autunnale. Spaten rimane uno dei soli sei birrifici autorizzati a servire birra all\'Oktoberfest di Monaco.',
      vi: 'Spaten được ghi nhận đã tạo ra Oktoberfestbier nguyên bản vào năm 1872. Nhà máy bia, được thành lập năm 1397, đã cách mạng hóa sản xuất bia với việc giới thiệu làm lạnh và kỹ thuật lager. Thợ pha chế bia Spaten Josef Sedlmayr đã phát triển bia kiểu Märzen màu hổ phách đặc biệt cho lễ kỷ niệm Oktoberfest. Loại lager giàu malt này theo truyền thống được sản xuất vào tháng 3 (März), ủ qua mùa hè và phục vụ tại lễ hội mùa thu. Spaten vẫn là một trong sáu nhà máy bia duy nhất được phép phục vụ bia tại Oktoberfest Munich.',
    },
    named_after: {
      en: 'Spaten means "spade" in German, named after the brewery\'s symbol. Oktoberfestbier refers to the beer served at Munich\'s famous Oktoberfest celebration',
      it: 'Spaten significa "vanga" in tedesco, prende il nome dal simbolo del birrificio. Oktoberfestbier si riferisce alla birra servita alla famosa celebrazione dell\'Oktoberfest di Monaco',
      vi: 'Spaten có nghĩa là "cái xuổng" trong tiếng Đức, được đặt theo biểu tượng của nhà máy bia. Oktoberfestbier đề cập đến bia được phục vụ tại lễ kỷ niệm Oktoberfest nổi tiếng của Munich',
    },
  },

  description: {
    en: 'The original Oktoberfestbier. A rich, malty amber lager with perfect balance of toasted bread, caramel sweetness, and subtle noble hop character. Full-bodied yet incredibly smooth, this is the beer that defined a festival and a style.',
    it: 'L\'Oktoberfestbier originale. Una lager ambrata ricca e maltata con perfetto equilibrio di pane tostato, dolcezza di caramello e sottile carattere di luppolo nobile. Corposa ma incredibilmente liscia, questa è la birra che ha definito un festival e uno stile.',
    vi: 'Oktoberfestbier nguyên bản. Một loại lager hổ phách giàu malt với sự cân bằng hoàn hảo của bánh mì nướng, vị ngọt caramel và đặc tính hoa bia cao quý tinh tế. Đầy đặn nhưng mượt mà đến khó tin, đây là loại bia đã định nghĩa một lễ hội và một phong cách.',
  },

  tagline: {
    en: 'The Original Oktoberfest Beer Since 1872',
    it: 'La Birra Oktoberfest Originale dal 1872',
    vi: 'Bia Oktoberfest Nguyên Bản Từ 1872',
  },

  characteristics: {
    abv: 5.9,
    ibu: 20,
    srm: 14,
    color: 'amber',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'full',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['malty', 'toasty', 'caramel', 'smooth', 'rich', 'balanced', 'bready', 'nutty'],
    description: {
      en: 'Rich malt-forward character with layers of toasted bread, caramel, and light toffee sweetness. Subtle notes of nuts, biscuit, and honey. Clean noble hop bitterness provides excellent balance without overpowering the malt. Full-bodied yet remarkably smooth and drinkable. Warm, satisfying finish with lingering toasted malt character.',
      it: 'Ricco carattere dominato dal malto con strati di pane tostato, caramello e dolcezza di toffee leggero. Note sottili di noci, biscotto e miele. Amarezza pulita di luppolo nobile fornisce un eccellente equilibrio senza sopraffare il malto. Corposa ma straordinariamente liscia e bevibile. Finale caldo e soddisfacente con carattere di malto tostato persistente.',
      vi: 'Đặc tính malt nổi bật giàu có với các lớp bánh mì nướng, caramel và vị ngọt kẹo bơ cứng nhẹ. Hương hạt, bánh quy và mật ong tinh tế. Độ đắng hoa bia cao quý sạch cung cấp sự cân bằng tuyệt vời mà không áp đảo malt. Đầy đặn nhưng mượt mà và dễ uống đáng kinh ngạc. Kết thúc ấm áp, thỏa mãn với đặc tính malt nướng kéo dài.',
    },
    aroma: {
      en: 'Toasted bread, caramel, light toffee, biscuit, subtle noble hops',
      it: 'Pane tostato, caramello, toffee leggero, biscotto, luppolo nobile sottile',
      vi: 'Bánh mì nướng, caramel, kẹo bơ cứng nhẹ, bánh quy, hoa bia cao quý tinh tế',
    },
    first_impression: {
      en: 'Rich toasted malt sweetness with balanced hop bitterness',
      it: 'Ricca dolcezza di malto tostato con amarezza di luppolo bilanciata',
      vi: 'Vị ngọt malt nướng giàu có với độ đắng hoa bia cân bằng',
    },
    finish: {
      en: 'Smooth, warm finish with lingering toasted malt and subtle hop dryness',
      it: 'Finale liscio e caldo con malto tostato persistente e sottile secchezza di luppolo',
      vi: 'Kết thúc mượt mà, ấm áp với malt nướng kéo dài và vị khô hoa bia tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 4,
  },

  ingredients: {
    malts: ['Munich malt', 'Vienna malt', 'Pilsner malt'],
    hops: ['Hallertauer Tradition', 'Spalter'],
    yeast: 'Traditional Bavarian lager yeast',
  },

  serving: {
    glass: 'stein',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'Pour into traditional 1-liter Maßkrug or stein at slight angle. Create a 2-3 finger head. Serve at cellar temperature (slightly warmer than typical lagers) to appreciate the complex malt character.',
      it: 'Versare in tradizionale Maßkrug o boccale da 1 litro con leggera inclinazione. Creare una schiuma di 2-3 dita. Servire a temperatura di cantina (leggermente più calda delle tipiche lager) per apprezzare il complesso carattere di malto.',
      vi: 'Rót vào Maßkrug truyền thống 1 lít hoặc cốc nghiêng nhẹ. Tạo bọt 2-3 ngón tay. Phục vụ ở nhiệt độ hầm (hơi ấm hơn lager thông thường) để đánh giá cao đặc tính malt phức tạp.',
    },
    ideal_head: '2-3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'meat', 'cheese', 'festival-food'],
    food_pairings: {
      en: 'The perfect companion to Oktoberfest fare: roasted chicken, bratwurst, pork knuckle (Schweinshaxe), soft pretzels, and roasted nuts. Excellent with grilled meats, sausages, hearty stews, and strong cheeses.',
      it: 'Il compagno perfetto per i piatti dell\'Oktoberfest: pollo arrosto, bratwurst, stinco di maiale (Schweinshaxe), pretzel morbidi e noci tostate. Eccellente con carni alla griglia, salsicce, stufati sostanziosi e formaggi forti.',
      vi: 'Bạn đồng hành hoàn hảo cho đồ ăn Oktoberfest: gà quay, bratwurst, đốt lợn (Schweinshaxe), pretzel mềm và hạt rang. Tuyệt vời với thịt nướng, xúc xích, món hầm thịnh soạn và phô mai mạnh.',
    },
    cheese_pairings: ['Emmental', 'Gruyère', 'Aged Gouda', 'Limburger'],
    cuisine_pairings: ['German', 'Bavarian', 'Austrian', 'Hearty'],
  },

  season_tags: ['fall', 'oktoberfest', 'autumn'],
  occasion_tags: ['oktoberfest', 'celebration', 'party', 'festival'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft', 'can'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-oktoberfest', 'hofbrau-oktoberfest'],
  availability: 'seasonal',

  price_tier: 'mid',
  popularity: 86,

  source: {
    primary: 'https://www.spaten.de',
    note: 'Official Spaten Brewery website and Oktoberfest historical records',
  },

  version: 1,
};
