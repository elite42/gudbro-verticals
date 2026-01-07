/**
 * IBA Contemporary Classics: Moscow Mule
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const moscowMule: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  slug: 'moscow-mule',
  stable_key: 'moscow_mule_iba_contemporary_classic',

  name: {
    en: 'Moscow Mule',
    it: 'Moscow Mule',
    vi: 'Moscow Mule',
    ko: '모스크바 뮬',
    ja: 'モスコミュール',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'refreshing', 'spicy', 'vodka', 'iconic', 'copper-mug'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "An iconic vodka cocktail served in a distinctive copper mug. Vodka, spicy ginger beer, and fresh lime create a refreshing, zingy drink that launched vodka's popularity in America.",
    it: 'Un iconico cocktail a base di vodka servito in una caratteristica tazza di rame. Vodka, ginger beer piccante e lime fresco creano una bevanda rinfrescante e vivace che lanciò la popolarità della vodka in America.',
    vi: 'Một cocktail vodka biểu tượng được phục vụ trong cốc đồng đặc trưng. Vodka, bia gừng cay và chanh tươi tạo ra thức uống sảng khoái, sôi động đã khởi động sự phổ biến của vodka ở Mỹ.',
  },

  history: {
    created_year: '1941',
    origin: {
      city: 'Los Angeles',
      bar: "Cock 'n' Bull",
      country: 'USA',
    },
    creator: {
      name: 'John Martin & Jack Morgan',
      profession: 'bartenders/businessmen',
    },
    story: {
      en: "Created around 1941 at the Cock 'n' Bull pub in Los Angeles by John Martin (Smirnoff vodka distributor) and Jack Morgan (bar owner with excess ginger beer). They added lime and served it in copper mugs to create a marketing sensation. The drink single-handedly launched vodka's popularity in America and created the copper mug tradition.",
      it: "Creato intorno al 1941 al pub Cock 'n' Bull di Los Angeles da John Martin (distributore di vodka Smirnoff) e Jack Morgan (proprietario del bar con eccesso di ginger beer). Aggiunsero lime e lo servirono in tazze di rame per creare una sensazione di marketing. La bevanda lanciò da sola la popolarità della vodka in America e creò la tradizione della tazza di rame.",
      vi: "Được tạo ra vào khoảng năm 1941 tại quán rượu Cock 'n' Bull ở Los Angeles bởi John Martin (nhà phân phối vodka Smirnoff) và Jack Morgan (chủ quán bar có dư thừa bia gừng). Họ thêm chanh và phục vụ nó trong cốc đồng để tạo ra một cảm giác tiếp thị. Thức uống này tự mình khởi động sự phổ biến của vodka ở Mỹ và tạo ra truyền thống cốc đồng.",
    },
    named_after: {
      en: 'Named "Moscow Mule" - "Moscow" for vodka\'s Russian origins and "Mule" for ginger beer\'s kick.',
      it: 'Chiamato "Moscow Mule" - "Moscow" per le origini russe della vodka e "Mule" per il calcio del ginger beer.',
      vi: 'Được đặt tên "Moscow Mule" - "Moscow" cho nguồn gốc Nga của vodka và "Mule" cho cú đá của bia gừng.',
    },
  },

  taste: {
    profile: ['spicy', 'citrus', 'refreshing'],
    description: {
      en: 'Crisp, refreshing, and spicy. Ginger beer provides warming spice and effervescence, lime adds bright citrus, and vodka keeps it clean. The copper mug keeps it ice-cold. Invigorating and thirst-quenching.',
      it: 'Croccante, rinfrescante e piccante. Il ginger beer fornisce spezie calde ed effervescenza, il lime aggiunge agrumi brillanti e la vodka lo mantiene pulito. La tazza di rame lo mantiene ghiacciato. Rinvigorente e dissetante.',
      vi: 'Giòn, sảng khoái và cay. Bia gừng cung cấp gia vị ấm và sủi bọt, chanh thêm cam quýt sáng, và vodka giữ nó sạch. Cốc đồng giữ nó lạnh như băng. Tiếp thêm sinh lực và giải khát.',
    },
    first_impression: {
      en: 'Bright lime and spicy ginger with clean vodka',
      it: 'Lime brillante e zenzero piccante con vodka pulita',
      vi: 'Chanh sáng và gừng cay với vodka sạch',
    },
    finish: {
      en: 'Clean, spicy finish with lingering ginger warmth',
      it: 'Finale pulito e piccante con calore di zenzero persistente',
      vi: 'Kết thúc sạch, cay với hơi ấm gừng kéo dài',
    },
    balance: {
      en: 'Well-balanced between ginger spice, lime tartness, and vodka smoothness',
      it: 'Ben bilanciato tra spezie di zenzero, acidità del lime e morbidezza della vodka',
      vi: 'Cân bằng tốt giữa gia vị gừng, vị chua chanh và độ mượt vodka',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'outdoor', 'summer_gathering', 'brunch'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with spicy foods, Asian cuisine, burgers, barbecue, and appetizers. The ginger complements bold flavors.',
      it: 'Si abbina bene con cibi piccanti, cucina asiatica, hamburger, barbecue e antipasti. Lo zenzero complementa sapori decisi.',
      vi: 'Kết hợp tốt với đồ ăn cay, ẩm thực châu Á, burger, thịt nướng và món khai vị. Gừng bổ sung hương vị đậm đà.',
    },
    ideal_for: {
      en: "Perfect for anyone seeking a refreshing, easy-drinking cocktail. Great for vodka lovers and those who enjoy ginger's spicy kick.",
      it: 'Perfetto per chi cerca un cocktail rinfrescante e facile da bere. Ottimo per gli amanti della vodka e per chi ama il calcio piccante dello zenzero.',
      vi: 'Hoàn hảo cho bất kỳ ai tìm kiếm cocktail sảng khoái, dễ uống. Tuyệt vời cho người yêu vodka và những ai thích cú đá cay của gừng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_GINGER_BEER',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Ginger beer', it: 'Ginger beer', vi: 'Bia gừng' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Combine vodka and lime juice in a copper mug filled with ice. Top with ginger beer. Stir gently. Garnish with a lime wedge and fresh mint sprig.',
    it: 'Combinare vodka e succo di lime in una tazza di rame piena di ghiaccio. Completare con ginger beer. Mescolare delicatamente. Guarnire con uno spicchio di lime e un rametto di menta fresca.',
    vi: 'Kết hợp vodka và nước cốt chanh trong cốc đồng đầy đá. Rót bia gừng lên trên. Khuấy nhẹ. Trang trí bằng miếng chanh và cành bạc hà tươi.',
  },

  glass: 'Copper mug (or highball glass)',

  garnish: {
    en: 'Lime wedge and fresh mint sprig',
    it: 'Spicchio di lime e rametto di menta fresca',
    vi: 'Miếng chanh và cành bạc hà tươi',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['spicy', 'citrus', 'refreshing'],

  abv_estimate: 10,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['casual', 'outdoor', 'summer_gathering', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['kentucky-mule', 'mexican-mule', 'london-mule'],

  notes_for_staff:
    'Traditionally served in a copper mug which keeps the drink ice-cold and adds to the experience. Use quality ginger beer (not ginger ale). Fresh lime juice is essential. The Kentucky Mule uses bourbon, Mexican Mule uses tequila.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/moscow-mule/',
    notes: 'IBA Official Recipe. The drink that made vodka popular in America.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
