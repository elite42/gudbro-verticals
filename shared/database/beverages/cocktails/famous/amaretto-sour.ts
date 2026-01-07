/**
 * Famous Cocktails: Amaretto Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const amarettoSour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  slug: 'amaretto-sour',
  stable_key: 'f8e7d6c5b4a3928170615948372819101112131415',

  name: {
    en: 'Amaretto Sour',
    it: 'Amaretto Sour',
    vi: 'Amaretto Sour',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'sour', 'almond', 'whiskey'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic that transformed the maligned 1970s Amaretto Sour into a sophisticated cocktail. This version adds bourbon and egg white to the traditional amaretto and lemon combination, creating a perfectly balanced, frothy drink with complex almond and whiskey notes.',
    it: "Un classico moderno che ha trasformato il disprezzato Amaretto Sour degli anni '70 in un cocktail sofisticato. Questa versione aggiunge bourbon e albume alla tradizionale combinazione di amaretto e limone, creando una bevanda perfettamente bilanciata e schiumosa con complesse note di mandorla e whiskey.",
    vi: 'Một cocktail cổ điển hiện đại đã biến đổi Amaretto Sour bị chê bai của thập niên 70 thành một cocktail tinh tế. Phiên bản này thêm bourbon và lòng trắng trứng vào sự kết hợp truyền thống của amaretto và chanh, tạo ra một thức uống cân bằng hoàn hảo, có bọt với hương vị hạnh nhân và whiskey phức tạp.',
  },

  history: {
    created_year: '2012',
    origin: {
      city: 'New York City',
      bar: 'Milk & Honey',
      country: 'USA',
    },
    creator: {
      name: 'Jeffrey Morgenthaler',
      profession: 'bartender',
    },
    story: {
      en: "Jeffrey Morgenthaler revolutionized the Amaretto Sour in 2012 by adding bourbon and egg white to the original recipe. The classic Amaretto Sour was a popular 1970s drink that fell out of favor due to its overly sweet, one-dimensional profile. Morgenthaler's version brought balance with bourbon's depth and egg white's silky texture, turning it into a respected modern classic that sparked a revival of the sour category.",
      it: "Jeffrey Morgenthaler ha rivoluzionato l'Amaretto Sour nel 2012 aggiungendo bourbon e albume alla ricetta originale. Il classico Amaretto Sour era una bevanda popolare degli anni '70 che cadde in disgrazia a causa del suo profilo eccessivamente dolce e unidimensionale. La versione di Morgenthaler ha portato equilibrio con la profondità del bourbon e la texture setosa dell'albume, trasformandola in un rispettato classico moderno che ha scatenato una rinascita della categoria sour.",
      vi: 'Jeffrey Morgenthaler đã cách mạng hóa Amaretto Sour vào năm 2012 bằng cách thêm bourbon và lòng trắng trứng vào công thức gốc. Amaretto Sour cổ điển là thức uống phổ biến thập niên 70 nhưng mất đi sự ưa chuộng do hương vị quá ngọt, một chiều. Phiên bản của Morgenthaler mang lại sự cân bằng với độ sâu của bourbon và kết cấu mượt mà của lòng trắng trứng, biến nó thành một tác phẩm cổ điển hiện đại được tôn trọng, châm ngòi cho sự hồi sinh của nhóm sour.',
    },
    named_after: {
      en: 'Named after its key ingredient, amaretto liqueur, which means "a little bitter" in Italian, referring to the almond flavor.',
      it: 'Prende il nome dal suo ingrediente chiave, il liquore amaretto, che significa "un po\' amaro" in italiano, riferendosi al sapore di mandorla.',
      vi: 'Được đặt tên theo nguyên liệu chính của nó, rượu mùi amaretto, có nghĩa là "một chút đắng" trong tiếng Ý, ám chỉ hương vị hạnh nhân.',
    },
  },

  taste: {
    profile: ['sour', 'sweet', 'almond', 'boozy'],
    description: {
      en: 'Perfectly balanced between sweet amaretto, tart lemon, and robust bourbon. The egg white creates a luxurious, silky texture with a beautiful foam cap. Almond notes from amaretto harmonize with vanilla and oak from bourbon.',
      it: "Perfettamente bilanciato tra amaretto dolce, limone aspro e bourbon robusto. L'albume crea una texture lussuosa e setosa con un bellissimo cappuccio di schiuma. Le note di mandorla dell'amaretto si armonizzano con vaniglia e rovere del bourbon.",
      vi: 'Cân bằng hoàn hảo giữa amaretto ngọt, chanh chua và bourbon mạnh mẽ. Lòng trắng trứng tạo kết cấu mượt mà sang trọng với lớp bọt đẹp mắt. Hương hạnh nhân từ amaretto hòa quyện với vani và gỗ sồi từ bourbon.',
    },
    first_impression: {
      en: 'Bright citrus and almond sweetness hit first, followed by whiskey warmth',
      it: 'Prima arrivano gli agrumi brillanti e la dolcezza della mandorla, seguiti dal calore del whiskey',
      vi: 'Citrus tươi sáng và vị ngọt hạnh nhân đập vào đầu tiên, tiếp theo là hơi ấm của whiskey',
    },
    finish: {
      en: 'Medium finish with lingering almond and oak notes, pleasant tartness',
      it: 'Finale medio con note persistenti di mandorla e rovere, piacevole acidità',
      vi: 'Kết thúc vừa phải với hương hạnh nhân và gỗ sồi kéo dài, vị chua dễ chịu',
    },
    balance: {
      en: 'Expertly balanced - bourbon prevents excessive sweetness, egg white adds body without heaviness',
      it: "Bilanciato in modo esperto - il bourbon previene l'eccessiva dolcezza, l'albume aggiunge corpo senza pesantezza",
      vi: 'Cân bằng điêu luyện - bourbon ngăn ngừa vị ngọt quá mức, lòng trắng trứng thêm độ đậm đà mà không nặng nề',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'cocktail_hour'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with charcuterie boards, roasted nuts, aged cheeses, or almond-based desserts like biscotti. Also pairs well with rich appetizers and savory tarts.',
      it: 'Eccellente con taglieri di salumi, frutta secca tostata, formaggi stagionati o dolci a base di mandorle come i biscotti. Si abbina bene anche con antipasti ricchi e crostate salate.',
      vi: 'Tuyệt vời với đĩa thịt nguội, hạt rang, phô mai già, hoặc các món tráng miệng hạnh nhân như biscotti. Cũng kết hợp tốt với các món khai vị đậm đà và bánh tart mặn.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy balanced sours with complexity. A great choice for amaretto lovers who want sophistication, or bourbon drinkers looking for something lighter. Ideal for anyone wanting a modern twist on a classic.',
      it: "Perfetto per chi ama i sour bilanciati con complessità. Un'ottima scelta per gli amanti dell'amaretto che vogliono sofisticazione, o per i bevitori di bourbon che cercano qualcosa di più leggero. Ideale per chi vuole una svolta moderna su un classico.",
      vi: 'Hoàn hảo cho những ai thích sour cân bằng với sự phức tạp. Lựa chọn tuyệt vời cho người yêu amaretto muốn sự tinh tế, hoặc người uống bourbon tìm kiếm thứ gì đó nhẹ hơn. Lý tưởng cho bất kỳ ai muốn một phiên bản hiện đại của tác phẩm cổ điển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon whiskey', it: 'Bourbon whiskey', vi: 'Rượu whiskey bourbon' },
    },
    {
      ingredient_id: 'ING_AMARETTO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Amaretto liqueur', it: 'Liquore amaretto', vi: 'Rượu mùi amaretto' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 1, unit: 'whole' },
      display_name: { en: 'Egg white', it: 'Albume', vi: 'Lòng trắng trứng' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a shaker without ice and dry shake vigorously for 15 seconds to emulsify the egg white. Add ice and shake again until well chilled. Strain into a rocks glass over fresh ice. Garnish with lemon peel and brandied cherries.',
    it: "Aggiungere tutti gli ingredienti in uno shaker senza ghiaccio e shakerare vigorosamente per 15 secondi per emulsionare l'albume. Aggiungere ghiaccio e shakerare di nuovo fino a raffreddare bene. Filtrare in un bicchiere rocks con ghiaccio fresco. Guarnire con scorza di limone e ciliegie al brandy.",
    vi: 'Thêm tất cả nguyên liệu vào bình lắc không có đá và lắc mạnh trong 15 giây để nhũ hóa lòng trắng trứng. Thêm đá và lắc lại cho đến khi lạnh kỹ. Lọc vào ly rocks với đá mới. Trang trí với vỏ chanh và cherry ngâm brandy.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lemon peel and brandied cherries',
    it: 'Scorza di limone e ciliegie al brandy',
    vi: 'Vỏ chanh và cherry ngâm brandy',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON', 'ING_AMARETTO'],

  flavor_profile: ['sour', 'sweet', 'almond', 'boozy'],

  abv_estimate: 20,

  calories_estimate: 220,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['eggs', 'sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'egg_intolerance', 'sulphites_intolerance'],
    suitable_for_diets: ['gluten_free', 'dairy_free', 'pescatarian'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'cocktail_hour'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['traditional-amaretto-sour', 'amaretto-sour-with-cognac'],

  notes_for_staff:
    'Dry shake is essential for proper foam. Use fresh lemon juice only. Can substitute aquafaba for egg white for vegan version. Adjust simple syrup to taste based on amaretto brand sweetness.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://jeffreymorgenthaler.com/amaretto-sour/',
    notes: "Jeffrey Morgenthaler's modern classic recipe from 2012.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
