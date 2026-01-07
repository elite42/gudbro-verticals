/**
 * IBA New Era Drinks: Naked and Famous
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const nakedAndFamous: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a8f3c5d1-4b2e-4d9a-9c7f-1e8a6b3d5f2c',
  slug: 'naked-and-famous',
  stable_key: 'e4f6a8c2d1b9e7f5a3c8d6b4e2f1a9c7',

  name: {
    en: 'Naked and Famous',
    it: 'Naked and Famous',
    vi: 'Naked and Famous',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'smoky', 'bitter', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic featuring mezcal, Aperol, yellow Chartreuse, and lime. The Naked and Famous is a perfectly balanced, smoky, bitter, and herbal cocktail that showcases the complexity of equal-part mixing.',
    it: 'Un classico moderno con mezcal, Aperol, Chartreuse gialla e lime. Il Naked and Famous è un cocktail perfettamente bilanciato, affumicato, amaro ed erbaceo che mette in mostra la complessità della miscelazione a parti uguali.',
    vi: 'Một cocktail cổ điển hiện đại với mezcal, Aperol, Chartreuse vàng và chanh. Naked and Famous là một cocktail cân bằng hoàn hảo, khói, đắng và thảo mộc thể hiện sự phức tạp của việc pha trộn phần bằng nhau.',
  },

  history: {
    created_year: '2011',
    origin: {
      city: 'New York City',
      bar: 'Death & Co',
      country: 'USA',
    },
    creator: {
      name: 'Joaquín Simó',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 2011 by Joaquín Simó at Death & Co in New York City, the Naked and Famous is a variation on the classic Last Word cocktail. Simó replaced the gin with mezcal, the green Chartreuse with yellow Chartreuse, and the maraschino with Aperol, creating a completely new flavor profile while maintaining the equal-parts structure. The drink quickly became a modern classic and helped popularize mezcal in craft cocktails.',
      it: 'Creato nel 2011 da Joaquín Simó al Death & Co di New York City, il Naked and Famous è una variazione del classico cocktail Last Word. Simó ha sostituito il gin con mezcal, la Chartreuse verde con Chartreuse gialla e il maraschino con Aperol, creando un profilo di sapore completamente nuovo mantenendo la struttura a parti uguali. Il drink è rapidamente diventato un classico moderno e ha contribuito a popolarizzare il mezcal nei cocktail artigianali.',
      vi: 'Được tạo ra vào năm 2011 bởi Joaquín Simó tại Death & Co ở New York City, Naked and Famous là một biến thể của cocktail Last Word cổ điển. Simó đã thay thế gin bằng mezcal, Chartreuse xanh lá bằng Chartreuse vàng, và maraschino bằng Aperol, tạo ra một hương vị hoàn toàn mới trong khi vẫn duy trì cấu trúc phần bằng nhau. Thức uống nhanh chóng trở thành một cocktail cổ điển hiện đại và giúp phổ biến mezcal trong các cocktail thủ công.',
    },
    named_after: {
      en: 'Named after the song "Naked and Famous" by The Presidents of the United States of America, a band that Joaquín Simó enjoyed.',
      it: 'Prende il nome dalla canzone "Naked and Famous" dei The Presidents of the United States of America, una band che Joaquín Simó apprezzava.',
      vi: 'Được đặt theo tên bài hát "Naked and Famous" của The Presidents of the United States of America, một ban nhạc mà Joaquín Simó yêu thích.',
    },
  },

  taste: {
    profile: ['smoky', 'bitter', 'herbal', 'citrus'],
    description: {
      en: 'Complex and sophisticated. The smoky mezcal provides an earthy backbone, while Aperol adds bittersweet orange notes. Yellow Chartreuse contributes honey and herbal complexity, and fresh lime juice brings brightness and acidity to tie everything together.',
      it: "Complesso e sofisticato. Il mezcal affumicato fornisce una base terrosa, mentre l'Aperol aggiunge note amare e dolci di arancia. La Chartreuse gialla contribuisce con miele e complessità erbacee, e il succo di lime fresco porta luminosità e acidità per legare tutto insieme.",
      vi: 'Phức tạp và tinh tế. Mezcal khói cung cấp xương sống đất, trong khi Aperol thêm hương cam đắng ngọt. Chartreuse vàng đóng góp mật ong và độ phức tạp thảo mộc, và nước cốt chanh tươi mang lại sự tươi sáng và độ acid để kết hợp mọi thứ lại với nhau.',
    },
    first_impression: {
      en: 'Smoky mezcal and bright citrus hit first, followed by the herbal complexity of Chartreuse',
      it: 'Il mezcal affumicato e gli agrumi brillanti colpiscono per primi, seguiti dalla complessità erbaccea della Chartreuse',
      vi: 'Mezcal khói và cam quýt tươi sáng đập vào đầu tiên, tiếp theo là độ phức tạp thảo mộc của Chartreuse',
    },
    finish: {
      en: 'Long, smoky finish with lingering herbal and bitter orange notes',
      it: 'Finale lungo e affumicato con note erbacee e di arancia amara persistenti',
      vi: 'Kết thúc dài, khói với hương thảo mộc và cam đắng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced equal-parts cocktail - each ingredient shines while contributing to a harmonious whole',
      it: 'Cocktail perfettamente bilanciato a parti uguali - ogni ingrediente brilla contribuendo a un insieme armonioso',
      vi: 'Cocktail phần bằng nhau cân bằng hoàn hảo - mỗi thành phần tỏa sáng trong khi đóng góp cho một tổng thể hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'date_night', 'sophisticated_gathering', 'craft_cocktail_experience'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with grilled meats, Mexican cuisine, tapas, aged cheeses, and smoked fish. The smoky mezcal pairs beautifully with charred or smoky foods.',
      it: 'Eccellente con carni alla griglia, cucina messicana, tapas, formaggi stagionati e pesce affumicato. Il mezcal affumicato si abbina magnificamente con cibi carbonizzati o affumicati.',
      vi: 'Tuyệt vời với thịt nướng, ẩm thực Mexico, tapas, phô mai lâu năm và cá hun khói. Mezcal khói kết hợp tuyệt vời với thực phẩm cháy hoặc hun khói.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate complex, spirit-forward cocktails. A must-try for mezcal lovers and those exploring modern classics. Ideal for sophisticated palates seeking something beyond the ordinary.',
      it: "Perfetto per bevitori avventurosi che apprezzano cocktail complessi e incentrati sugli spirit. Un must per gli amanti del mezcal e per chi esplora i classici moderni. Ideale per palati sofisticati che cercano qualcosa oltre l'ordinario.",
      vi: 'Hoàn hảo cho những người uống mạo hiểm đánh giá cao cocktail phức tạp, hướng đến rượu mạnh. Phải thử cho người yêu mezcal và những người khám phá cocktail cổ điển hiện đại. Lý tưởng cho vị giác tinh tế tìm kiếm điều gì đó vượt ra ngoài bình thường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Aperol', it: 'Aperol', vi: 'Aperol' },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_YELLOW',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Yellow Chartreuse',
        it: 'Chartreuse Gialla',
        vi: 'Chartreuse Vàng',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled coupe glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly coupe đã được làm lạnh.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'None (or lime wheel)',
    it: 'Nessuno (o rondella di lime)',
    vi: 'Không (hoặc lát chanh)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['smoky', 'bitter', 'herbal', 'citrus'],

  abv_estimate: 25,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'sophisticated_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['last-word', 'final-ward', 'paper-plane'],

  notes_for_staff:
    'Use high-quality mezcal with good smoke character. Fresh lime juice is essential. Equal parts (22.5ml each) is critical to balance. Shake hard to properly integrate the Chartreuse. This is a variation of the Last Word - educate guests on the connection.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/naked-and-famous/',
    notes: 'IBA Official Recipe. Created by Joaquín Simó at Death & Co, New York City, 2011.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
