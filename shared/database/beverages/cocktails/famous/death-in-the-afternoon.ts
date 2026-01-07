/**
 * Famous Cocktails: Death in the Afternoon
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const deathInTheAfternoon: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  slug: 'death-in-the-afternoon',
  stable_key: 'd6e5f4c3b2a1908172635445362718192021222324',

  name: {
    en: 'Death in the Afternoon',
    it: 'Morte nel Pomeriggio',
    vi: 'Cái Chết Vào Buổi Chiều',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'champagne', 'literary', 'absinthe'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Created by Ernest Hemingway, this deceptively simple cocktail combines absinthe with champagne. Named after Hemingway's 1932 book about bullfighting, it's a dangerous, elegant drink that goes down easily but packs a powerful punch. The opalescent louche effect creates a mesmerizing visual.",
    it: "Creato da Ernest Hemingway, questo cocktail ingannevolmente semplice combina assenzio con champagne. Prende il nome dal libro di Hemingway del 1932 sulla corrida, è una bevanda pericolosa ed elegante che si beve facilmente ma ha un effetto potente. L'effetto opalescente del louche crea un'immagine ipnotica.",
    vi: 'Được tạo ra bởi Ernest Hemingway, cocktail đơn giản đầy lừa dối này kết hợp absinthe với champagne. Được đặt tên theo cuốn sách năm 1932 của Hemingway về đấu bò, đó là một thức uống nguy hiểm, thanh lịch dễ uống nhưng mạnh mẽ. Hiệu ứng louche óng ánh tạo ra hình ảnh mê hoặc.',
  },

  history: {
    created_year: '1935',
    origin: {
      city: 'Paris',
      country: 'France',
    },
    creator: {
      name: 'Ernest Hemingway',
      profession: 'author',
    },
    story: {
      en: 'Ernest Hemingway published this recipe in 1935 in a celebrity cocktail book called "So Red the Nose, or Breath in the Afternoon." His instructions were characteristically terse: "Pour one jigger absinthe into a Champagne glass. Add iced Champagne until it attains the proper opalescent milkiness. Drink three to five of these slowly." The drink shares its name with his 1932 novel about Spanish bullfighting, reflecting the author\'s fascination with death, danger, and the Spanish culture.',
      it: 'Ernest Hemingway pubblicò questa ricetta nel 1935 in un libro di cocktail delle celebrità chiamato "So Red the Nose, or Breath in the Afternoon." Le sue istruzioni erano caratteristicamente concise: "Versare un jigger di assenzio in un bicchiere da champagne. Aggiungere champagne ghiacciato fino a raggiungere la giusta lattescenza opalescente. Bere da tre a cinque di questi lentamente." La bevanda condivide il nome con il suo romanzo del 1932 sulla corrida spagnola, riflettendo il fascino dell\'autore per la morte, il pericolo e la cultura spagnola.',
      vi: 'Ernest Hemingway đã công bố công thức này vào năm 1935 trong một cuốn sách cocktail của người nổi tiếng có tên "So Red the Nose, or Breath in the Afternoon." Hướng dẫn của ông đặc trưng ngắn gọn: "Đổ một jigger absinthe vào ly Champagne. Thêm Champagne đá cho đến khi đạt được độ sữa óng ánh phù hợp. Uống từ ba đến năm ly này từ từ." Thức uống có tên giống tiểu thuyết năm 1932 của ông về đấu bò Tây Ban Nha, phản ánh sự mê hoặc của tác giả với cái chết, nguy hiểm và văn hóa Tây Ban Nha.',
    },
    named_after: {
      en: 'Named after Ernest Hemingway\'s 1932 novel "Death in the Afternoon" about Spanish bullfighting and the culture surrounding it.',
      it: 'Prende il nome dal romanzo di Ernest Hemingway del 1932 "Morte nel Pomeriggio" sulla corrida spagnola e la cultura che la circonda.',
      vi: 'Được đặt tên theo tiểu thuyết "Death in the Afternoon" năm 1932 của Ernest Hemingway về đấu bò Tây Ban Nha và văn hóa xung quanh nó.',
    },
  },

  taste: {
    profile: ['herbal', 'anise', 'champagne', 'complex'],
    description: {
      en: "Complex and dangerous. The absinthe provides intense anise, wormwood, and herbal notes that are softened and lifted by champagne's effervescence. Sweet and dry simultaneously, with botanical complexity from the absinthe balanced by champagne's acidity. Deceptively smooth and easy to drink.",
      it: "Complesso e pericoloso. L'assenzio fornisce intense note di anice, assenzio ed erbe che vengono ammorbidite e sollevate dall'effervescenza dello champagne. Dolce e secco contemporaneamente, con complessità botanica dall'assenzio bilanciata dall'acidità dello champagne. Ingannevolmente liscio e facile da bere.",
      vi: 'Phức tạp và nguy hiểm. Absinthe mang đến hương hồi, ngải cứu và thảo mộc mạnh mẽ được làm mềm và nâng lên bởi sự sủi bọt của champagne. Ngọt và khô đồng thời, với độ phức tạp thực vật từ absinthe được cân bằng bởi độ chua của champagne. Mượt mà và dễ uống đầy lừa dối.',
    },
    first_impression: {
      en: 'Champagne bubbles and anise hit first, elegant and bright',
      it: "Le bollicine dello champagne e l'anice colpiscono per prime, eleganti e brillanti",
      vi: 'Bọt champagne và hồi đập vào đầu tiên, thanh lịch và tươi sáng',
    },
    finish: {
      en: 'Long, herbal finish with lingering anise and wormwood notes',
      it: 'Finale lungo ed erbaceo con note persistenti di anice e assenzio',
      vi: 'Kết thúc dài, thảo mộc với hương hồi và ngải cứu kéo dài',
    },
    balance: {
      en: "Champagne balances absinthe's intensity, creating dangerous drinkability",
      it: "Lo champagne bilancia l'intensità dell'assenzio, creando una pericolosa bevibilità",
      vi: 'Champagne cân bằng cường độ của absinthe, tạo ra khả năng uống nguy hiểm',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'brunch'],
    occasions: ['celebration', 'literary_event', 'special_occasion', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Best enjoyed on its own or with light appetizers like oysters, caviar, or delicate canapés. The strong flavors can overwhelm most foods, so keep pairings simple and elegant.',
      it: 'Da gustare al meglio da solo o con antipasti leggeri come ostriche, caviale o delicati canapè. I sapori forti possono sopraffare la maggior parte dei cibi, quindi mantenere gli abbinamenti semplici ed eleganti.',
      vi: 'Tốt nhất là thưởng thức riêng hoặc với các món khai vị nhẹ như hàu, trứng cá muối, hoặc canapé tinh tế. Hương vị mạnh có thể át hầu hết các món ăn, vì vậy hãy giữ sự kết hợp đơn giản và thanh lịch.',
    },
    ideal_for: {
      en: 'Perfect for literary enthusiasts and Hemingway fans. Ideal for adventurous drinkers who appreciate absinthe and champagne. Warning: extremely potent despite smooth taste. Hemingway\'s suggestion of "three to five" should be approached with caution.',
      it: 'Perfetto per gli appassionati di letteratura e i fan di Hemingway. Ideale per bevitori avventurosi che apprezzano l\'assenzio e lo champagne. Attenzione: estremamente potente nonostante il gusto liscio. Il suggerimento di Hemingway di "da tre a cinque" dovrebbe essere affrontato con cautela.',
      vi: 'Hoàn hảo cho những người đam mê văn học và người hâm mộ Hemingway. Lý tưởng cho những người uống phiêu lưu yêu thích absinthe và champagne. Cảnh báo: cực kỳ mạnh mẽ mặc dù có vị mượt mà. Gợi ý "ba đến năm ly" của Hemingway nên được thực hiện thận trọng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Iced Champagne', it: 'Champagne ghiacciato', vi: 'Champagne lạnh' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour absinthe into a chilled champagne flute. Top slowly with very cold champagne until the drink achieves a proper opalescent, milky appearance (the louche effect). No garnish needed. As Hemingway suggested: "Drink three to five of these slowly."',
    it: "Versare l'assenzio in un flûte da champagne raffreddato. Completare lentamente con champagne molto freddo fino a quando la bevanda raggiunge un'adeguata apparenza opalescente e lattiginosa (l'effetto louche). Nessuna guarnizione necessaria. Come suggerito da Hemingway: \"Bere da tre a cinque di questi lentamente.\"",
    vi: 'Đổ absinthe vào ly champagne flute đã được làm lạnh. Thêm từ từ champagne rất lạnh cho đến khi thức uống đạt được vẻ ngoài óng ánh, sữa phù hợp (hiệu ứng louche). Không cần trang trí. Như Hemingway đề xuất: "Uống từ ba đến năm ly này từ từ."',
  },

  glass: 'Champagne flute',

  garnish: {
    en: 'None (traditional)',
    it: 'Nessuna (tradizionale)',
    vi: 'Không (truyền thống)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_ABSINTHE'],

  flavor_profile: ['herbal', 'anise', 'champagne', 'complex'],

  abv_estimate: 25,

  calories_estimate: 200,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['celebration', 'literary_event', 'special_occasion', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['death-in-the-gulf-stream', 'hemingway-champagne'],

  notes_for_staff:
    'CAUTION: Extremely high ABV. Champagne must be very cold. Pour slowly to achieve proper louche effect. Original Hemingway ratio was 1:5 absinthe to champagne. Monitor guest consumption carefully. Can substitute Pernod or Pastis if absinthe unavailable, but flavor will differ.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary:
      'https://euvs-vintage-cocktail-books.cld.bz/1935-So-Red-the-Nose-or-Breath-in-the-Afternoon/23',
    notes:
      'Original recipe from "So Red the Nose, or Breath in the Afternoon" (1935) by Ernest Hemingway.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
