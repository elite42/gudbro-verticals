/**
 * Famous Cocktails: Industry Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const industrySour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
  slug: 'industry-sour',
  stable_key: '322154647382908475638291048573629184756382',

  name: {
    en: 'Industry Sour',
    it: 'Industry Sour',
    vi: 'Industry Sour',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'whiskey', 'green-chartreuse', 'fernet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bartender\'s favorite and modern classic, the Industry Sour combines bourbon or rye with Green Chartreuse and Fernet-Branca, creating a complex, herbal, bitter-sweet whiskey sour. Named for the hospitality industry, this drink is beloved by bar professionals for its sophisticated balance of sweet, sour, herbal, and bitter elements.',
    it: 'Un favorito dei barman e classico moderno, l\'Industry Sour combina bourbon o rye con Green Chartreuse e Fernet-Branca, creando un whiskey sour complesso, erbaceo e agrodolce. Prende il nome dall\'industria dell\'ospitalità, questa bevanda è amata dai professionisti del bar per il suo sofisticato equilibrio di elementi dolci, aspri, erbacei e amari.',
    vi: 'Một tác phẩm yêu thích của bartender và cổ điển hiện đại, Industry Sour kết hợp bourbon hoặc rye với Green Chartreuse và Fernet-Branca, tạo ra whiskey sour phức tạp, thảo mộc, đắng-ngọt. Được đặt tên theo ngành khách sạn, thức uống này được các chuyên gia quầy bar yêu thích vì sự cân bằng tinh tế của các yếu tố ngọt, chua, thảo mộc và đắng.',
  },

  history: {
    created_year: '2011',
    origin: {
      city: 'New York City',
      bar: 'Booker and Dax',
      country: 'USA',
    },
    creator: {
      name: 'Dave Arnold',
      profession: 'bartender',
    },
    story: {
      en: 'The Industry Sour was created around 2011 by bartender Dave Arnold at Booker and Dax in New York City. Arnold wanted to create a drink specifically for industry professionals - bartenders, servers, and hospitality workers - who appreciate complex, bitter flavors. By combining whiskey with Green Chartreuse (a bartender favorite) and Fernet-Branca (the "bartender\'s handshake"), he created a sophisticated sour that became a cult favorite among industry insiders. The name directly references the hospitality industry, and the drink is often served as a shift drink or late-night favorite.',
      it: 'L\'Industry Sour fu creato intorno al 2011 dal barman Dave Arnold al Booker and Dax di New York City. Arnold voleva creare una bevanda specificamente per i professionisti del settore - barman, camerieri e lavoratori dell\'ospitalità - che apprezzano sapori complessi e amari. Combinando whiskey con Green Chartreuse (un favorito dei barman) e Fernet-Branca (la "stretta di mano del barman"), creò un sour sofisticato che divenne un favorito di culto tra gli addetti ai lavori. Il nome fa riferimento direttamente all\'industria dell\'ospitalità, e la bevanda è spesso servita come bevanda di fine turno o favorita della notte fonda.',
      vi: 'Industry Sour được tạo ra vào khoảng năm 2011 bởi bartender Dave Arnold tại Booker and Dax ở New York City. Arnold muốn tạo ra một thức uống đặc biệt cho các chuyên gia ngành - bartender, phục vụ và nhân viên khách sạn - những người đánh giá cao hương vị phức tạp, đắng. Bằng cách kết hợp whiskey với Green Chartreuse (yêu thích của bartender) và Fernet-Branca ("cái bắt tay của bartender"), ông đã tạo ra một sour tinh tế trở thành tác phẩm yêu thích trong giới nội bộ. Tên gọi trực tiếp ám chỉ ngành khách sạn, và thức uống thường được phục vụ như đồ uống sau ca hoặc yêu thích đêm khuya.',
    },
    named_after: {
      en: 'Named after "the industry" - a term for hospitality and bar professionals. It\'s made by the industry, for the industry.',
      it: 'Prende il nome da "l\'industria" - un termine per i professionisti dell\'ospitalità e del bar. È fatto dall\'industria, per l\'industria.',
      vi: 'Được đặt tên theo "ngành" - thuật ngữ cho các chuyên gia khách sạn và quầy bar. Nó được làm bởi ngành, cho ngành.',
    },
  },

  taste: {
    profile: ['herbal', 'bitter', 'complex', 'whiskey'],
    description: {
      en: 'Intensely complex and sophisticated. Bourbon or rye provides a rich whiskey base, while Green Chartreuse adds herbal sweetness and complexity. Fernet-Branca contributes menthol-eucalyptus bitterness that cuts through the sweetness. Fresh lemon adds brightness, and simple syrup balances the bitter elements. More complex and contemplative than a standard whiskey sour, with layers of herbal, bitter, sweet, and sour notes.',
      it: 'Intensamente complesso e sofisticato. Il bourbon o il rye fornisce una ricca base di whiskey, mentre il Green Chartreuse aggiunge dolcezza erbacea e complessità. Il Fernet-Branca contribuisce con amarezza di mentolo-eucalipto che taglia la dolcezza. Il limone fresco aggiunge brillantezza, e lo sciroppo semplice bilancia gli elementi amari. Più complesso e contemplativo di un whiskey sour standard, con strati di note erbacee, amare, dolci e aspre.',
      vi: 'Cực kỳ phức tạp và tinh tế. Bourbon hoặc rye cung cấp cơ sở whiskey phong phú, trong khi Green Chartreuse thêm vị ngọt thảo mộc và độ phức tạp. Fernet-Branca đóng góp vị đắng bạc hà-khuynh diệp cắt qua vị ngọt. Chanh tươi thêm độ tươi sáng, và siro đường cân bằng các yếu tố đắng. Phức tạp và đáng suy ngẫm hơn whiskey sour tiêu chuẩn, với nhiều tầng hương thảo mộc, đắng, ngọt và chua.',
    },
    first_impression: {
      en: 'Herbal Chartreuse and whiskey hit first, followed by Fernet\'s menthol bite',
      it: 'Chartreuse erbaceo e whiskey colpiscono per primi, seguiti dal morso mentolato del Fernet',
      vi: 'Chartreuse thảo mộc và whiskey đập vào đầu tiên, tiếp theo là vị bạc hà gắt của Fernet',
    },
    finish: {
      en: 'Long, bitter finish with lingering menthol, herbs, and whiskey warmth',
      it: 'Finale lungo e amaro con mentolo, erbe e calore del whiskey persistenti',
      vi: 'Kết thúc dài, đắng với bạc hà, thảo mộc và hơi ấm whiskey kéo dài',
    },
    balance: {
      en: 'Complex balance - sweet, sour, herbal, bitter in sophisticated harmony',
      it: 'Equilibrio complesso - dolce, aspro, erbaceo, amaro in armonia sofisticata',
      vi: 'Cân bằng phức tạp - ngọt, chua, thảo mộc, đắng trong sự hài hòa tinh tế',
    },
  },

  recommendations: {
    best_time: ['late_night', 'evening', 'after_shift'],
    occasions: ['industry_gathering', 'digestivo', 'contemplative_drinking', 'bartender_favorite'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent as a digestif or with rich, savory foods. Pairs well with aged cheeses, charcuterie, dark chocolate, or bitter greens. Traditional bartender pairing: pizza or late-night snacks.',
      it: 'Eccellente come digestivo o con cibi ricchi e saporiti. Si abbina bene con formaggi stagionati, salumi, cioccolato fondente o verdure amare. Abbinamento tradizionale del barman: pizza o snack notturni.',
      vi: 'Tuyệt vời như thức uống giúp tiêu hóa hoặc với đồ ăn đậm đà, mặn mà. Kết hợp tốt với phô mai già, thịt nguội, chocolate đen, hoặc rau xanh đắng. Kết hợp truyền thống của bartender: pizza hoặc đồ ăn nhẹ đêm khuya.',
    },
    ideal_for: {
      en: 'Perfect for bartenders and industry professionals. Ideal for those who appreciate complex, bitter cocktails with multiple layers. Great for adventurous drinkers who enjoy Fernet and Chartreuse. A rite of passage for serious cocktail enthusiasts.',
      it: 'Perfetto per barman e professionisti del settore. Ideale per chi apprezza i cocktail complessi e amari con più strati. Ottimo per i bevitori avventurosi che amano il Fernet e il Chartreuse. Un rito di passaggio per i seri appassionati di cocktail.',
      vi: 'Hoàn hảo cho bartender và các chuyên gia ngành. Lý tưởng cho những ai đánh giá cao cocktail phức tạp, đắng với nhiều tầng. Tuyệt vời cho những người uống phiêu lưu thích Fernet và Chartreuse. Một nghi thức trưởng thành cho những người đam mê cocktail nghiêm túc.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon or rye whiskey', it: 'Bourbon o rye whiskey', vi: 'Bourbon hoặc rye whiskey' },
    },
    {
      ingredient_id: 'ING_GREEN_CHARTREUSE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Green Chartreuse', it: 'Green Chartreuse', vi: 'Green Chartreuse' },
    },
    {
      ingredient_id: 'ING_FERNET_BRANCA',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Fernet-Branca', it: 'Fernet-Branca', vi: 'Fernet-Branca' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a rocks glass over fresh ice or serve up in a coupe. Garnish with a lemon twist and/or mint sprig.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks con ghiaccio fresco o servire liscio in una coppa. Guarnire con una scorza di limone e/o rametto di menta.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks với đá mới hoặc phục vụ thẳng trong ly coupe. Trang trí với vỏ chanh xoắn và/hoặc cành bạc hà.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lemon twist and/or mint sprig',
    it: 'Scorza di limone e/o rametto di menta',
    vi: 'Vỏ chanh xoắn và/hoặc cành bạc hà',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['herbal', 'bitter', 'complex', 'whiskey'],

  abv_estimate: 24,

  calories_estimate: 190,

  difficulty: 'intermediate',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['industry_gathering', 'digestivo', 'contemplative_drinking', 'bartender_favorite'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['toronto', 'greenpoint', 'chartreuse-swizzle'],

  notes_for_staff: 'Bartender favorite - often served as shift drink. Use fresh lemon juice only. Fernet amount is crucial - too much overwhelms. Can use bourbon or rye. Green Chartreuse essential. Popular late-night industry drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://punchdrink.com/recipes/industry-sour/',
    note: 'Created by Dave Arnold at Booker and Dax, New York City, circa 2011. A modern bartender favorite.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
