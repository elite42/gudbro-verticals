/**
 * IBA Unforgettables: Boulevardier
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const boulevardier: Cocktail = {
  id: '83348635-90bd-4080-af0f-835b682c0456',
  slug: 'boulevardier',
  stable_key: '3b9e4e191f4d57d46e0a225063c3b8818aa84c5d',

  name: {
    en: 'Boulevardier',
    it: 'Boulevardier',
    vi: 'Boulevardier',
    ko: '불르바르디에',
    ja: 'ブールヴァルディエ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'bitter', 'whiskey', 'negroni-variation', 'prohibition-era'],

  description: {
    en: "The whiskey-lover's Negroni - a rich, bittersweet cocktail that swaps gin for bourbon or rye. Created by an American expatriate in Paris, the Boulevardier offers deeper, warmer flavors while maintaining the perfect bitter-sweet balance.",
    it: 'Il Negroni per gli amanti del whiskey - un cocktail ricco e agrodolce che sostituisce il gin con bourbon o segale. Creato da un espatriato americano a Parigi, il Boulevardier offre sapori più profondi e caldi mantenendo il perfetto equilibrio amaro-dolce.',
    vi: 'Negroni dành cho người yêu whiskey - một cocktail đậm đà, đắng ngọt thay thế gin bằng bourbon hoặc rye. Được tạo ra bởi một người Mỹ tha hương ở Paris, Boulevardier mang đến hương vị sâu hơn, ấm hơn trong khi duy trì sự cân bằng đắng-ngọt hoàn hảo.',
  },

  history: {
    created_year: 1927,
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Erskine Gwynne',
      profession: 'writer and socialite',
    },
    story: {
      en: 'The Boulevardier was created by Erskine Gwynne, an American writer and nephew of railroad magnate Alfred Vanderbilt, who founded a monthly magazine called "Boulevardier" in Paris in the 1920s. The cocktail was first published in Harry MacElhone\'s 1927 book "Barflies and Cocktails." Gwynne was a fixture of the expatriate scene in Paris during Prohibition, when Americans fled to Europe to drink legally. The drink is essentially a Negroni with bourbon replacing the gin, reflecting American taste. The name "boulevardier" means "a man about town" in French.',
      it: 'Il Boulevardier fu creato da Erskine Gwynne, uno scrittore americano e nipote del magnate delle ferrovie Alfred Vanderbilt, che fondò una rivista mensile chiamata "Boulevardier" a Parigi negli anni \'20. Il cocktail fu pubblicato per la prima volta nel libro di Harry MacElhone del 1927 "Barflies and Cocktails." Gwynne era una figura fissa della scena degli espatriati a Parigi durante il Proibizionismo. La bevanda è essenzialmente un Negroni con bourbon al posto del gin, riflettendo il gusto americano. Il nome "boulevardier" significa "uomo di mondo" in francese.',
      vi: 'Boulevardier được tạo ra bởi Erskine Gwynne, một nhà văn Mỹ và cháu trai của trùm đường sắt Alfred Vanderbilt, người sáng lập tạp chí hàng tháng "Boulevardier" ở Paris vào những năm 1920. Cocktail lần đầu được xuất bản trong cuốn sách năm 1927 của Harry MacElhone "Barflies and Cocktails." Gwynne là nhân vật quen thuộc của giới tha hương ở Paris trong thời Cấm rượu. Thức uống về cơ bản là Negroni với bourbon thay thế gin, phản ánh khẩu vị Mỹ. Tên "boulevardier" có nghĩa là "người đàn ông phong lưu" trong tiếng Pháp.',
    },
    named_after: {
      en: 'Named after the magazine "Boulevardier" founded by its creator Erskine Gwynne. The French word means "a man about town" - someone who frequents fashionable places.',
      it: 'Prende il nome dalla rivista "Boulevardier" fondata dal suo creatore Erskine Gwynne. La parola francese significa "uomo di mondo" - qualcuno che frequenta luoghi alla moda.',
      vi: 'Được đặt tên theo tạp chí "Boulevardier" do người sáng tạo Erskine Gwynne thành lập. Từ tiếng Pháp có nghĩa là "người đàn ông phong lưu" - người thường xuyên lui tới những nơi thời thượng.',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'boozy', 'herbal'],
    description: {
      en: "Richer and more robust than a Negroni. The bourbon/rye provides caramel, vanilla, and oak notes that complement Campari's bitterness beautifully. The sweet vermouth adds herbal complexity. A warming, sophisticated sipper.",
      it: "Più ricco e robusto di un Negroni. Il bourbon/segale fornisce note di caramello, vaniglia e quercia che completano magnificamente l'amarezza del Campari. Il vermouth rosso aggiunge complessità erbacea. Un sorso caldo e sofisticato.",
      vi: 'Đậm đà và mạnh mẽ hơn Negroni. Bourbon/rye cung cấp hương caramel, vanilla và gỗ sồi bổ sung hoàn hảo cho vị đắng của Campari. Vermouth ngọt thêm sự phức tạp thảo mộc. Một ngụm ấm áp, tinh tế.',
    },
    first_impression: {
      en: 'Warm whiskey sweetness meeting bold Campari bitterness',
      it: 'Dolcezza calda del whiskey che incontra la decisa amarezza del Campari',
      vi: 'Vị ngọt ấm của whiskey gặp vị đắng mạnh mẽ của Campari',
    },
    finish: {
      en: 'Long, warming finish with lingering bitter-orange and oak',
      it: 'Finale lungo e caldo con arancia amara e quercia persistenti',
      vi: 'Kết thúc dài, ấm áp với cam đắng và gỗ sồi kéo dài',
    },
    balance: {
      en: "The whiskey's sweetness counterbalances Campari's bitterness, with vermouth as the bridge",
      it: "La dolcezza del whiskey controbilancia l'amarezza del Campari, con il vermouth come ponte",
      vi: 'Vị ngọt của whiskey cân bằng vị đắng của Campari, với vermouth là cầu nối',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'digestivo', 'date_night'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with rich meats, charcuterie, and aged cheeses. The bitter notes complement fatty foods beautifully. Also pairs well with dark chocolate.',
      it: 'Eccellente con carni ricche, salumi e formaggi stagionati. Le note amare completano magnificamente i cibi grassi. Si abbina bene anche con il cioccolato fondente.',
      vi: 'Tuyệt vời với thịt béo, thịt nguội và phô mai lâu năm. Hương vị đắng bổ sung hoàn hảo cho thức ăn béo. Cũng kết hợp tốt với chocolate đen.',
    },
    ideal_for: {
      en: 'Whiskey lovers who want to explore bitter cocktails. Perfect for those who find Negronis too gin-forward. A sophisticated choice for cooler weather.',
      it: 'Amanti del whiskey che vogliono esplorare i cocktail amari. Perfetto per chi trova i Negroni troppo incentrati sul gin. Una scelta sofisticata per il clima più freddo.',
      vi: 'Người yêu whiskey muốn khám phá cocktail đắng. Hoàn hảo cho những ai thấy Negroni quá nặng gin. Lựa chọn tinh tế cho thời tiết mát mẻ.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Bourbon or Rye Whiskey',
        it: 'Bourbon o Whiskey di Segale',
        vi: 'Bourbon hoặc Rye Whiskey',
      },
      substitutes: ['ING_RYE_WHISKEY'],
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet Vermouth', it: 'Vermouth Rosso', vi: 'Vermouth Ngọt' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass with ice cubes. Stir well until properly chilled and diluted. Strain into a chilled cocktail glass. Garnish with orange zest.',
    it: "Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene fino a raffreddare e diluire. Filtrare in una coppa da cocktail raffreddata. Guarnire con scorza d'arancia.",
    vi: 'Đổ tất cả nguyên liệu vào ly pha với đá viên. Khuấy kỹ cho đến khi lạnh và pha loãng đúng mức. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Orange zest, optionally with lemon zest',
    it: "Scorza d'arancia, opzionalmente con scorza di limone",
    vi: 'Vỏ cam, tùy chọn với vỏ chanh',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_BOURBON'],
  flavor_profile: ['bitter', 'sweet', 'boozy', 'herbal'],
  abv_estimate: 25,
  calories_estimate: 185,
  difficulty: 'easy',
  prep_time_seconds: 60,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['aperitivo', 'digestivo', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  variants: ['negroni', 'old-pal'],

  notes_for_staff:
    'Use good bourbon (Bulleit, Buffalo Trace) or rye (Rittenhouse). Some prefer equal parts (1:1:1) for a more bitter drink. Can serve on the rocks for a longer drink. The "whiskey Negroni" nickname helps explain it to guests.',

  price_tier: 'mid',
  popularity: 78,

  source: {
    primary: 'https://iba-world.com/boulevardier/',
    notes: 'IBA Official Recipe. First published in "Barflies and Cocktails" 1927.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
