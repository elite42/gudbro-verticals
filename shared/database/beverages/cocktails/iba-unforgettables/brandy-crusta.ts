/**
 * IBA Unforgettables: Brandy Crusta
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const brandyCrusta: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  slug: 'brandy-crusta',
  stable_key: 'c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2',

  name: {
    en: 'Brandy Crusta',
    it: 'Brandy Crusta',
    vi: 'Brandy Crusta',
    ko: '브랜디 크러스타',
    ja: 'ブランデー・クラスタ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'ornate', 'historical', 'new-orleans'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A historically significant cocktail from 1850s New Orleans, featuring brandy with citrus and maraschino, served in a sugar-crusted glass with an ornate lemon peel spiral. Regarded as the forerunner to the Sidecar and, by extension, the Margarita.',
    it: 'Un cocktail storicamente significativo degli anni 1850 di New Orleans, con brandy, agrumi e maraschino, servito in un bicchiere con bordo di zucchero e una spirale ornamentale di scorza di limone. Considerato il precursore del Sidecar e, per estensione, del Margarita.',
    vi: 'Một cocktail có ý nghĩa lịch sử từ những năm 1850 ở New Orleans, có brandy với cam quýt và maraschino, được phục vụ trong ly có viền đường với xoắn vỏ chanh trang trí. Được coi là tiền thân của Sidecar và mở rộng ra, Margarita.',
  },

  history: {
    created_year: '1850s',
    origin: {
      city: 'New Orleans',
      bar: "Jewel of the South (Santini's bar)",
      country: 'USA',
    },
    creator: {
      name: 'Joseph Santini',
      profession: 'bartender',
    },
    story: {
      en: 'The Brandy Crusta was created in the 1850s by Joseph Santini, an Italian from Trieste, in New Orleans. The name refers to the "crust" of sugar around the rim. It was one of the first cocktails to use a sugared rim, an innovation that would later become standard in drinks like the Margarita. The Brandy Crusta was added to the IBA official list in the 2020 update as one of 6 drinks added to "The Unforgettables" category. The elaborate presentation with a full lemon peel spiral was revolutionary for its time.',
      it: 'Il Brandy Crusta fu creato negli anni 1850 da Joseph Santini, un italiano di Trieste, a New Orleans. Il nome si riferisce alla "crosta" di zucchero intorno al bordo. Fu uno dei primi cocktail ad utilizzare un bordo zuccherato, un\'innovazione che sarebbe poi diventata standard in drink come il Margarita. Il Brandy Crusta fu aggiunto alla lista ufficiale IBA nell\'aggiornamento del 2020 come uno dei 6 drink aggiunti alla categoria "The Unforgettables". La presentazione elaborata con una spirale completa di scorza di limone era rivoluzionaria per i suoi tempi.',
      vi: 'Brandy Crusta được tạo ra vào những năm 1850 bởi Joseph Santini, một người Ý từ Trieste, ở New Orleans. Cái tên đề cập đến "lớp vỏ" đường xung quanh viền. Đây là một trong những cocktail đầu tiên sử dụng viền đường, một sáng tạo sau này trở thành tiêu chuẩn trong các đồ uống như Margarita. Brandy Crusta được thêm vào danh sách chính thức IBA trong bản cập nhật 2020 là một trong 6 đồ uống được thêm vào danh mục "The Unforgettables". Cách trình bày công phu với xoắn vỏ chanh đầy đủ là cách mạng cho thời đại của nó.',
    },
    named_after: {
      en: 'Named after the sugar "crust" that rims the glass.',
      it: 'Prende il nome dalla "crosta" di zucchero che riveste il bordo del bicchiere.',
      vi: 'Được đặt tên theo "lớp vỏ" đường viền ly.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'complex'],
    description: {
      en: 'Bright and citrus-forward with brandy warmth, balanced by maraschino sweetness and orange complexity. The sugar rim adds textural sweetness while bitters provide aromatic depth.',
      it: 'Brillante e ricco di agrumi con calore di brandy, bilanciato dalla dolcezza del maraschino e dalla complessità dell\'arancia. Il bordo di zucchero aggiunge dolcezza strutturale mentre i bitters forniscono profondità aromatica.',
      vi: 'Tươi sáng và hướng cam quýt với sự ấm áp của brandy, cân bằng bởi vị ngọt maraschino và độ phức tạp của cam. Viền đường thêm vị ngọt kết cấu trong khi bitters cung cấp chiều sâu thơm.',
    },
    first_impression: {
      en: 'Sweet sugar rim followed by bright citrus and brandy',
      it: 'Bordo di zucchero dolce seguito da agrumi brillanti e brandy',
      vi: 'Viền đường ngọt tiếp theo là cam quýt tươi sáng và brandy',
    },
    finish: {
      en: 'Long, warming finish with lingering brandy and citrus notes',
      it: 'Finale lungo e caldo con note persistenti di brandy e agrumi',
      vi: 'Kết thúc dài, ấm áp với hương brandy và cam quýt kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet, sour, and spirit strength',
      it: 'Ben bilanciato tra dolce, aspro e forza alcolica',
      vi: 'Cân bằng tốt giữa ngọt, chua và độ mạnh rượu',
    },
  },

  recommendations: {
    best_time: ['evening', 'after_dinner', 'special_occasion'],
    occasions: ['celebration', 'special_occasion', 'impressive', 'digestivo'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent as a digestif with desserts, particularly citrus-based desserts, crème brûlée, or fruit tarts. Also pairs with aged cheeses and dark chocolate.',
      it: 'Eccellente come digestivo con dessert, in particolare dessert a base di agrumi, crème brûlée o crostate di frutta. Si abbina anche con formaggi stagionati e cioccolato fondente.',
      vi: 'Tuyệt vời như một digestif với món tráng miệng, đặc biệt là món tráng miệng dựa trên cam quýt, crème brûlée hoặc bánh tart trái cây. Cũng kết hợp với phô mai già và chocolate đen.',
    },
    ideal_for: {
      en: 'Perfect for brandy enthusiasts and cocktail historians. Ideal for special occasions when you want to impress with both flavor and presentation.',
      it: 'Perfetto per gli appassionati di brandy e storici dei cocktail. Ideale per occasioni speciali quando si desidera impressionare con sapore e presentazione.',
      vi: 'Hoàn hảo cho những người đam mê brandy và nhà sử học cocktail. Lý tưởng cho những dịp đặc biệt khi bạn muốn gây ấn tượng với cả hương vị và cách trình bày.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 52.5, unit: 'ml' },
      display_name: { en: 'Brandy', it: 'Brandy', vi: 'Brandy' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Maraschino Luxardo', it: 'Maraschino Luxardo', vi: 'Maraschino Luxardo' },
    },
    {
      ingredient_id: 'ING_CURACAO',
      quantity: { amount: 5, unit: 'ml' },
      display_name: { en: 'Curaçao', it: 'Curaçao', vi: 'Curaçao' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đơn giản' },
    },
    {
      ingredient_id: 'ING_AROMATIC_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Aromatic bitters', it: 'Aromatic bitters', vi: 'Aromatic bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rub a slice of orange (or lemon) around the rim of the glass and dip it in pulverized white sugar, so that the sugar will adhere to the edge of the glass. Mix together all ingredients with ice cubes in a mixing glass and strain into a prepared slim cocktail glass.',
    it: 'Strofinare una fetta d\'arancia (o limone) intorno al bordo del bicchiere e immergerlo in zucchero bianco polverizzato, in modo che lo zucchero aderisca al bordo del bicchiere. Mescolare insieme tutti gli ingredienti con cubetti di ghiaccio in un mixing glass e filtrare in un bicchiere da cocktail sottile preparato.',
    vi: 'Chà một lát cam (hoặc chanh) quanh viền ly và nhúng vào đường trắng xay, để đường dính vào viền ly. Trộn tất cả nguyên liệu với đá viên trong ly trộn và lọc vào ly cocktail mỏng đã chuẩn bị.',
  },

  glass: 'Cocktail glass (narrow)',

  garnish: {
    en: 'Long lemon peel spiral',
    it: 'Lunga spirale di scorza di limone',
    vi: 'Xoắn vỏ chanh dài',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BRANDY'],

  flavor_profile: ['citrus', 'sweet', 'complex'],

  abv_estimate: 25, // ~25% ABV after dilution

  calories_estimate: 190,

  difficulty: 'advanced',

  prep_time_seconds: 180, // Sugar rim and lemon spiral take time

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['celebration', 'special_occasion', 'digestivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['sidecar', 'margarita', 'whiskey-crusta'],

  notes_for_staff: 'The presentation is crucial - take time with the sugar rim and lemon spiral. The lemon peel should be cut in one continuous spiral to line the inside of the glass. This is a showpiece cocktail. Use quality brandy or cognac.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 40,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/brandy-crusta/',
    note: 'IBA Official Recipe. Historical information from New Orleans cocktail history and Joseph Santini documentation.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
