/**
 * IBA New Era Drinks: Sherry Cobbler
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sherryCobbler: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'sherry-cobbler',
  stable_key: 'b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',

  name: {
    en: 'Sherry Cobbler',
    it: 'Sherry Cobbler',
    vi: 'Sherry Cobbler',
    ko: '셰리 코블러',
    ja: 'シェリー・コブラー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'classic', 'sherry', 'low-abv', 'refreshing', 'historical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A historic low-ABV cocktail featuring sherry wine, fresh citrus, and seasonal berries served over crushed ice. One of the first drinks to popularize the use of a drinking straw, the Sherry Cobbler was the height of sophistication in 19th century America.',
    it: "Un cocktail storico a bassa gradazione con vino sherry, agrumi freschi e bacche di stagione servito su ghiaccio tritato. Una delle prime bevande a rendere popolare l'uso della cannuccia, lo Sherry Cobbler era l'apice della raffinatezza nell'America del XIX secolo.",
    vi: 'Một cocktail lịch sử độ cồn thấp với rượu sherry, cam chanh tươi và quả mọng theo mùa phục vụ trên đá bào. Một trong những đồ uống đầu tiên phổ biến việc sử dụng ống hút, Sherry Cobbler là đỉnh cao của sự tinh tế ở Mỹ thế kỷ 19.',
  },

  history: {
    created_year: '1830',
    origin: {
      city: 'New York City',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Sherry Cobbler emerged in the 1830s-1840s and became phenomenally popular in America during the mid-19th century. It was one of the first cocktails to be served with crushed ice and a drinking straw - both innovations at the time. The drink was so fashionable that it helped create demand for imported sherry in the United States. Charles Dickens mentioned it in his writings, and it appeared in Jerry Thomas's seminal 1862 cocktail book. The cobbler style (spirit, sugar, fruit, crushed ice) spawned many variations.",
      it: "Lo Sherry Cobbler emerse negli anni 1830-1840 e divenne fenomenalmente popolare in America durante la metà del XIX secolo. Fu uno dei primi cocktail ad essere servito con ghiaccio tritato e cannuccia - entrambe innovazioni all'epoca. La bevanda era così alla moda che contribuì a creare domanda per lo sherry importato negli Stati Uniti. Charles Dickens lo menzionò nei suoi scritti, e apparve nel libro seminale sui cocktail di Jerry Thomas del 1862. Lo stile cobbler (spirito, zucchero, frutta, ghiaccio tritato) generò molte varianti.",
      vi: 'Sherry Cobbler xuất hiện vào những năm 1830-1840 và trở nên cực kỳ phổ biến ở Mỹ vào giữa thế kỷ 19. Đây là một trong những cocktail đầu tiên được phục vụ với đá bào và ống hút - cả hai đều là sáng kiến vào thời điểm đó. Thức uống quá thời thượng đến nỗi giúp tạo nhu cầu cho sherry nhập khẩu tại Hoa Kỳ. Charles Dickens đề cập đến nó trong các tác phẩm của mình, và nó xuất hiện trong cuốn sách cocktail quan trọng năm 1862 của Jerry Thomas. Phong cách cobbler (rượu mạnh, đường, trái cây, đá bào) tạo ra nhiều biến thể.',
    },
    named_after: {
      en: 'The term "cobbler" in cocktails likely refers to the drink\'s cobbled or rough appearance from the crushed ice and fruit garnishes piled on top.',
      it: 'Il termine "cobbler" nei cocktail probabilmente si riferisce all\'aspetto acciottolato o ruvido della bevanda dal ghiaccio tritato e le guarnizioni di frutta ammucchiate sopra.',
      vi: 'Thuật ngữ "cobbler" trong cocktail có lẽ đề cập đến vẻ ngoài lấp lánh hoặc gồ ghề của đồ uống từ đá bào và trang trí trái cây chất đống lên trên.',
    },
  },

  taste: {
    profile: ['fruity', 'wine-forward', 'refreshing', 'delicate'],
    description: {
      en: "Elegant and refreshing with nutty, oxidized sherry flavors complemented by bright citrus and sweet berries. The crushed ice dilution makes it incredibly easy to drink while preserving the wine's character.",
      it: 'Elegante e rinfrescante con sapori di sherry nocciolato e ossidato completati da agrumi luminosi e bacche dolci. La diluizione del ghiaccio tritato lo rende incredibilmente facile da bere preservando il carattere del vino.',
      vi: 'Thanh lịch và sảng khoái với hương vị sherry hạt dẻ, oxy hóa được bổ sung bởi cam chanh tươi sáng và quả mọng ngọt. Sự pha loãng của đá bào làm cho nó cực kỳ dễ uống trong khi bảo tồn tính cách của rượu vang.',
    },
    first_impression: {
      en: 'Sweet berry and citrus aromatics with delicate sherry undertones',
      it: 'Aromatici di bacche dolci e agrumi con sottotoni delicati di sherry',
      vi: 'Hương thơm quả mọng ngọt và cam chanh với âm hưởng sherry tinh tế',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering nutty sherry notes',
      it: 'Finale pulito e rinfrescante con note di sherry nocciolato persistenti',
      vi: 'Kết thúc trong sạch, sảng khoái với nốt sherry hạt dẻ kéo dài',
    },
    balance: {
      en: 'Beautifully balanced between wine character, fruit sweetness, and refreshing dilution',
      it: 'Magnificamente bilanciato tra carattere del vino, dolcezza della frutta e diluizione rinfrescante',
      vi: 'Cân bằng tuyệt đẹp giữa tính cách rượu vang, vị ngọt trái cây và sự pha loãng sảng khoái',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening', 'aperitif'],
    occasions: ['aperitivo', 'brunch', 'garden_party', 'afternoon_social'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Spanish tapas, jamón ibérico, manchego cheese, olives, almonds, and light seafood dishes.',
      it: 'Eccellente con tapas spagnole, jamón ibérico, formaggio manchego, olive, mandorle e piatti di pesce leggeri.',
      vi: 'Tuyệt vời với tapas Tây Ban Nha, jamón ibérico, phô mai manchego, ô liu, hạnh nhân và các món hải sản nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for sherry enthusiasts and those seeking elegant, low-ABV options. Ideal for afternoon sipping and as a sophisticated aperitif. Great for history buffs interested in 19th century cocktail culture.',
      it: 'Perfetto per gli appassionati di sherry e chi cerca opzioni eleganti a bassa gradazione. Ideale per sorseggiare nel pomeriggio e come aperitivo sofisticato. Ottimo per gli appassionati di storia interessati alla cultura dei cocktail del XIX secolo.',
      vi: 'Hoàn hảo cho người đam mê sherry và những ai tìm kiếm lựa chọn thanh lịch, độ cồn thấp. Lý tưởng cho việc nhâm nhi buổi chiều và làm aperitif tinh tế. Tuyệt vời cho người yêu lịch sử quan tâm đến văn hóa cocktail thế kỷ 19.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SHERRY_AMONTILLADO',
      quantity: { amount: 90, unit: 'ml' },
      display_name: {
        en: 'Amontillado sherry',
        it: 'Sherry Amontillado',
        vi: 'Sherry Amontillado',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_ORANGE_SLICE',
      quantity: { amount: 2, unit: 'slices' },
      display_name: { en: 'Orange slices', it: 'Fette di arancia', vi: 'Lát cam' },
    },
    {
      ingredient_id: 'ING_SEASONAL_BERRIES',
      quantity: { amount: 4, unit: 'pieces' },
      display_name: { en: 'Seasonal berries', it: 'Bacche di stagione', vi: 'Quả mọng theo mùa' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a wine glass or goblet with crushed ice. Add sherry and simple syrup. Stir briefly to combine. Add more crushed ice to fill the glass. Garnish generously with orange slices and seasonal berries (strawberries, raspberries, or blackberries). Serve with a straw and optionally a spoon.',
    it: 'Riempire un bicchiere da vino o calice con ghiaccio tritato. Aggiungere sherry e sciroppo semplice. Mescolare brevemente per combinare. Aggiungere altro ghiaccio tritato per riempire il bicchiere. Guarnire generosamente con fette di arancia e bacche di stagione (fragole, lamponi o more). Servire con cannuccia e opzionalmente un cucchiaino.',
    vi: 'Đổ đầy ly rượu vang hoặc goblet với đá bào. Thêm sherry và siro đường. Khuấy nhẹ để trộn đều. Thêm đá bào để đầy ly. Trang trí hào phóng với lát cam và quả mọng theo mùa (dâu tây, dâu rừng hoặc dâu đen). Phục vụ với ống hút và tùy chọn một thìa.',
  },

  glass: 'Wine glass or Goblet',

  garnish: {
    en: 'Orange slices and seasonal berries (strawberries, raspberries, blackberries)',
    it: 'Fette di arancia e bacche di stagione (fragole, lamponi, more)',
    vi: 'Lát cam và quả mọng theo mùa (dâu tây, dâu rừng, dâu đen)',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SHERRY_AMONTILLADO'],

  flavor_profile: ['fruity', 'wine-forward', 'refreshing', 'delicate'],

  abv_estimate: 10,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free', 'low-abv'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'brunch', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['port-cobbler', 'champagne-cobbler', 'whiskey-cobbler'],

  notes_for_staff:
    'Amontillado sherry is traditional but can use Fino or Oloroso. Crushed ice is essential for proper dilution. Generous fruit garnish is part of the experience. Historically served with a straw.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/sherry-cobbler/',
    notes:
      'IBA Official Recipe. Historical references from Jerry Thomas\'s 1862 "The Bon Vivant\'s Companion".',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
