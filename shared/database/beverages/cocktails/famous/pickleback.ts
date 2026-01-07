/**
 * Famous Cocktails: Pickleback
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pickleback: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'j0k1l2m3-4567-8901-jk01-lm23no456789',
  slug: 'pickleback',
  stable_key: 'pickleback_shot_famous_whiskey_pickle_brine_chaser',

  name: {
    en: 'Pickleback',
    it: 'Pickleback',
    vi: 'Pickleback',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'whiskey', 'savory', 'pickle', 'chaser', 'brooklyn'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A shot of whiskey followed immediately by a shot of pickle brine as a chaser. This unconventional combination became a Brooklyn bar phenomenon, with the pickle juice cutting through the whiskey burn and leaving a surprisingly clean finish.',
    it: 'Uno shot di whiskey seguito immediatamente da uno shot di salamoia di cetrioli come chaser. Questa combinazione non convenzionale è diventata un fenomeno dei bar di Brooklyn, con il succo di cetrioli che taglia il bruciore del whiskey e lascia un finale sorprendentemente pulito.',
    vi: 'Một shot whiskey theo sau ngay lập tức bằng một shot nước muối dưa chuột làm chaser. Sự kết hợp độc đáo này đã trở thành hiện tượng quầy bar Brooklyn, với nước dưa chuột cắt qua cảm giác bỏng whiskey và để lại kết thúc sạch sẽ đáng ngạc nhiên.',
  },

  history: {
    created_year: '2006',
    origin: {
      city: 'Brooklyn',
      bar: 'Bushwick Country Club',
      country: 'USA',
    },
    creator: {
      name: 'Reggie Cunningham',
      profession: 'bartender',
    },
    story: {
      en: "The Pickleback was invented in 2006 by bartender Reggie Cunningham at the Bushwick Country Club in Brooklyn, New York. The story goes that a regular customer requested pickle juice to chase his whiskey shot, and the combination was so surprisingly effective that it caught on. The drink spread rapidly through Brooklyn's bar scene and eventually became a nationwide phenomenon, spawning variations with different pickle brines and spirits.",
      it: 'Il Pickleback è stato inventato nel 2006 dal barman Reggie Cunningham al Bushwick Country Club di Brooklyn, New York. La storia racconta che un cliente abituale ha chiesto succo di cetrioli per accompagnare il suo shot di whiskey, e la combinazione è stata così sorprendentemente efficace che ha preso piede. La bevanda si è diffusa rapidamente nella scena dei bar di Brooklyn ed è infine diventata un fenomeno nazionale, generando variazioni con diverse salamoie di cetrioli e distillati.',
      vi: 'Pickleback được phát minh vào năm 2006 bởi bartender Reggie Cunningham tại Bushwick Country Club ở Brooklyn, New York. Câu chuyện kể rằng một khách hàng thường xuyên yêu cầu nước dưa chuột để chaser shot whiskey của mình, và sự kết hợp này hiệu quả đến mức đáng ngạc nhiên đến nỗi nó bắt đầu lan truyền. Thức uống lan nhanh qua làng bar Brooklyn và cuối cùng trở thành hiện tượng toàn quốc, tạo ra các biến thể với nước muối dưa chuột và rượu khác nhau.',
    },
    named_after: {
      en: 'Named "Pickleback" because the pickle brine acts as a "back" (chaser) for the whiskey shot.',
      it: 'Chiamato "Pickleback" perché la salamoia di cetrioli agisce come un "back" (chaser) per lo shot di whiskey.',
      vi: 'Được đặt tên "Pickleback" vì nước muối dưa chuột hoạt động như một "back" (chaser) cho shot whiskey.',
    },
  },

  taste: {
    profile: ['savory', 'salty', 'sour', 'briny'],
    description: {
      en: 'The whiskey hits first with its characteristic burn and warmth. The pickle brine chaser immediately follows, cutting through the alcohol with tangy, salty, vinegar-forward flavor. The combination neutralizes the whiskey burn surprisingly well, leaving a clean, refreshing finish.',
      it: "Il whiskey colpisce per primo con il suo caratteristico bruciore e calore. Il chaser di salamoia di cetrioli segue immediatamente, tagliando l'alcol con un sapore piccante, salato, orientato all'aceto. La combinazione neutralizza sorprendentemente bene il bruciore del whiskey, lasciando un finale pulito e rinfrescante.",
      vi: 'Whiskey đập vào đầu tiên với cảm giác bỏng rát và hơi ấm đặc trưng. Chaser nước muối dưa chuột ngay lập tức theo sau, cắt qua rượu với hương vị chua, mặn, hướng giấm. Sự kết hợp trung hòa cảm giác bỏng whiskey một cách đáng ngạc nhiên, để lại kết thúc sạch sẽ, sảng khoái.',
    },
    first_impression: {
      en: 'Whiskey burn followed by tangy, salty pickle brine',
      it: 'Bruciore di whiskey seguito da salamoia di cetrioli piccante e salata',
      vi: 'Cảm giác bỏng whiskey theo sau là nước muối dưa chuột chua mặn',
    },
    finish: {
      en: 'Surprisingly clean and refreshing with lingering pickle flavor',
      it: 'Sorprendentemente pulito e rinfrescante con sapore persistente di cetrioli',
      vi: 'Sạch sẽ và sảng khoái đáng ngạc nhiên với hương vị dưa chuột kéo dài',
    },
    balance: {
      en: 'The pickle brine perfectly neutralizes whiskey burn - oddly satisfying',
      it: 'La salamoia di cetrioli neutralizza perfettamente il bruciore del whiskey - stranamente soddisfacente',
      vi: 'Nước muối dưa chuột trung hòa hoàn hảo cảm giác bỏng whiskey - kỳ lạ thỏa mãn',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'casual', 'bar_hopping', 'dive_bar'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Excellent with bar snacks, fried foods, burgers, and deli sandwiches. The savory nature complements salty, fatty foods perfectly.',
      it: 'Eccellente con snack da bar, cibi fritti, hamburger e panini della gastronomia. La natura salata completa perfettamente i cibi salati e grassi.',
      vi: 'Tuyệt vời với đồ ăn vặt quầy bar, đồ chiên, burger và bánh mì deli. Bản chất mặn mà bổ sung hoàn hảo cho thức ăn mặn, béo.',
    },
    ideal_for: {
      en: 'Perfect for whiskey drinkers who want an easier chaser than beer or water. Great for those who love pickles and savory drinks. A fun novelty that actually works remarkably well.',
      it: "Perfetto per i bevitori di whiskey che vogliono un chaser più facile della birra o dell'acqua. Ottimo per chi ama i cetrioli e le bevande salate. Una novità divertente che in realtà funziona notevolmente bene.",
      vi: 'Hoàn hảo cho người uống whiskey muốn chaser dễ dàng hơn bia hoặc nước. Tuyệt vời cho những ai yêu dưa chuột và đồ uống mặn mà. Một món mới lạ vui vẻ thực sự hoạt động tuyệt vời.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHISKEY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Whiskey (bourbon or rye)',
        it: 'Whiskey (bourbon o rye)',
        vi: 'Whiskey (bourbon hoặc rye)',
      },
    },
    {
      ingredient_id: 'ING_PICKLE_BRINE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Pickle Brine (dill pickle juice)',
        it: "Salamoia di Cetrioli (succo di cetrioli all'aneto)",
        vi: 'Nước Muối Dưa Chuột (nước dưa chuột thì là)',
      },
    },
  ],

  method: 'pour',

  instructions: {
    en: 'Pour whiskey into one shot glass and pickle brine into another. Drink the whiskey shot first, immediately followed by the pickle brine chaser. Do not pause between shots.',
    it: 'Versare il whiskey in un bicchierino e la salamoia di cetrioli in un altro. Bere prima lo shot di whiskey, seguito immediatamente dal chaser di salamoia di cetrioli. Non fare pause tra gli shot.',
    vi: 'Rót whiskey vào một ly shot và nước muối dưa chuột vào ly khác. Uống shot whiskey trước, ngay lập tức theo sau bằng chaser nước muối dưa chuột. Không tạm dừng giữa các shot.',
  },

  glass: 'Shot glass (two required)',

  garnish: {
    en: 'Pickle spear (optional, on the side)',
    it: 'Cetriolo sottaceto (opzionale, a parte)',
    vi: 'Que dưa chuột (tùy chọn, ở bên cạnh)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHISKEY'],

  flavor_profile: ['savory', 'salty', 'sour', 'briny'],

  abv_estimate: 20,

  calories_estimate: 100,

  difficulty: 'easy',

  prep_time_seconds: 20,

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
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['party', 'casual', 'bar-hopping'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tequila-pickleback', 'mezcal-pickleback', 'vodka-pickleback', 'kimchi-back'],

  notes_for_staff:
    'Use dill pickle brine from good quality pickles - avoid sweet pickle juice. Some customers prefer spicy pickle brine. Serve both shots at the same time. Can substitute with other whiskeys or even tequila/mezcal. Very polarizing - some love it, others hate the idea.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/Pickleback',
    notes: 'Brooklyn bar invention from 2006. Whiskey shot with pickle brine chaser.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
