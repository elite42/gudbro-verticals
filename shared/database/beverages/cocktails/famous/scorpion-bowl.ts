/**
 * Famous Cocktails: Scorpion Bowl
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const scorpionBowl: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  slug: 'scorpion-bowl',
  stable_key: 'scorpion_bowl_famous_tiki_tropical_cocktail',

  name: {
    en: 'Scorpion Bowl',
    it: 'Scorpion Bowl',
    vi: 'Scorpion Bowl',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'communal', 'strong'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Scorpion Bowl is a legendary communal tiki drink created by Trader Vic, combining rum, brandy, gin, and fruit juices in a large decorative bowl meant for sharing. Often served flaming with straws for multiple drinkers, this potent punch embodies the social spirit of tiki culture.',
    it: 'Lo Scorpion Bowl è una leggendaria bevanda tiki comunitaria creata da Trader Vic, che combina rum, brandy, gin e succhi di frutta in una grande ciotola decorativa destinata alla condivisione. Spesso servito fiammeggiante con cannucce per più bevitori, questo potente punch incarna lo spirito sociale della cultura tiki.',
    vi: 'Scorpion Bowl là một loại đồ uống tiki cộng đồng huyền thoại được tạo ra bởi Trader Vic, kết hợp rum, brandy, gin và nước ép trái cây trong một bát trang trí lớn dành cho chia sẻ. Thường được phục vụ bốc cháy với ống hút cho nhiều người uống, loại punch mạnh mẽ này thể hiện tinh thần xã hội của văn hóa tiki.',
  },

  history: {
    created_year: '1945',
    origin: {
      city: 'Oakland',
      bar: 'Trader Vic\'s',
      country: 'USA',
    },
    creator: {
      name: 'Victor "Trader Vic" Bergeron',
      profession: 'bartender',
    },
    story: {
      en: 'The Scorpion Bowl was created in 1945 by Victor "Trader Vic" Bergeron at his Oakland restaurant. Trader Vic designed this drink to be shared among groups, served in a large communal bowl with long straws - a presentation that became iconic in tiki culture. The drink\'s potent mix of multiple spirits was deliberately designed to "sting like a scorpion" after consumption. The theatrical presentation often includes floating a flaming lime half filled with overproof rum on top of the drink, creating a spectacular visual effect. The Scorpion Bowl became a staple of tiki restaurants and Polynesian-themed establishments, symbolizing the communal, escapist nature of mid-century tiki culture. It remains popular for group celebrations.',
      it: 'Lo Scorpion Bowl fu creato nel 1945 da Victor "Trader Vic" Bergeron nel suo ristorante di Oakland. Trader Vic progettò questa bevanda per essere condivisa tra gruppi, servita in una grande ciotola comunitaria con lunghe cannucce - una presentazione che divenne iconica nella cultura tiki. La potente miscela di più distillati della bevanda fu deliberatamente progettata per "pungere come uno scorpione" dopo il consumo. La presentazione teatrale include spesso una metà di lime galleggiante fiammeggiante riempita con rum overproof sopra la bevanda, creando un effetto visivo spettacolare. Lo Scorpion Bowl divenne un pilastro dei ristoranti tiki e degli stabilimenti a tema polinesiano, simboleggiando la natura comunitaria ed escapista della cultura tiki della metà del secolo. Rimane popolare per le celebrazioni di gruppo.',
      vi: 'Scorpion Bowl được tạo ra năm 1945 bởi Victor "Trader Vic" Bergeron tại nhà hàng Oakland của ông. Trader Vic đã thiết kế thức uống này để chia sẻ giữa các nhóm, được phục vụ trong một bát cộng đồng lớn với ống hút dài - một cách trình bày trở thành biểu tượng trong văn hóa tiki. Hỗn hợp mạnh mẽ của nhiều loại rượu mạnh được cố ý thiết kế để "đốt như bọ cạp" sau khi tiêu thụ. Cách trình bày sân khấu thường bao gồm một nửa chanh nổi bốc cháy chứa đầy rum overproof trên đỉnh thức uống, tạo ra hiệu ứng thị giác ngoạn mục. Scorpion Bowl trở thành món chủ lực của các nhà hàng tiki và các cơ sở theo chủ đề Polynesia, tượng trưng cho bản chất cộng đồng, thoát ly của văn hóa tiki giữa thế kỷ. Nó vẫn phổ biến cho các lễ kỷ niệm nhóm.',
    },
    named_after: {
      en: 'Named for its powerful "sting" from the potent mix of spirits, which supposedly sneaks up on you like a scorpion.',
      it: 'Prende il nome dal suo potente "pungiglione" dalla potente miscela di distillati, che presumibilmente ti sorprende come uno scorpione.',
      vi: 'Được đặt theo "cái chích" mạnh mẽ từ hỗn hợp rượu mạnh mẽ, được cho là lẻn lên bạn như một con bọ cạp.',
    },
  },

  taste: {
    profile: ['fruity', 'citrus', 'strong'],
    description: {
      en: 'Deceptively smooth and fruity with a powerful alcoholic kick. The Scorpion Bowl combines multiple spirits with bright citrus and tropical fruit flavors, creating a dangerously drinkable punch that lives up to its stinging reputation.',
      it: 'Ingannevolmente liscio e fruttato con un potente calcio alcolico. Lo Scorpion Bowl combina più distillati con agrumi brillanti e sapori di frutta tropicale, creando un punch pericolosamente bevibile che è all\'altezza della sua reputazione pungente.',
      vi: 'Mịn màng và trái cây một cách lừa dối với cú đá rượu mạnh mẽ. Scorpion Bowl kết hợp nhiều loại rượu mạnh với hương vị cam quýt sáng và trái cây nhiệt đới, tạo ra một loại punch dễ uống nguy hiểm sống đúng với danh tiếng chích của nó.',
    },
    first_impression: {
      en: 'Sweet tropical and citrus flavors dominate, masking the serious alcohol content beneath',
      it: 'I sapori tropicali e agrumi dolci dominano, mascherando il serio contenuto alcolico sottostante',
      vi: 'Hương vị nhiệt đới và cam quýt ngọt chiếm ưu thế, che giấu hàm lượng cồn nghiêm trọng bên dưới',
    },
    finish: {
      en: 'Long, warming finish with the "scorpion sting" of multiple spirits emerging',
      it: 'Finale lungo e caldo con il "pungiglione di scorpione" di più distillati che emerge',
      vi: 'Kết thúc dài, ấm áp với "cái chích bọ cạp" của nhiều loại rượu mạnh xuất hiện',
    },
    balance: {
      en: 'Dangerously balanced - fruit flavors mask substantial alcohol, making it easy to overindulge',
      it: 'Pericolosamente bilanciato - i sapori di frutta mascherano l\'alcol sostanziale, rendendo facile esagerare',
      vi: 'Cân bằng nguy hiểm - hương vị trái cây che giấu rượu đáng kể, làm cho dễ uống quá nhiều',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'group_gathering', 'tiki_bar'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect for sharing with Polynesian appetizers, crab rangoon, pu pu platters, egg rolls, or teriyaki wings. Also pairs well with Chinese and Thai cuisine served family-style.',
      it: 'Perfetto da condividere con antipasti polinesiani, crab rangoon, vassoi pu pu, involtini primavera o ali teriyaki. Si abbina bene anche con cucina cinese e tailandese servita in stile familiare.',
      vi: 'Hoàn hảo để chia sẻ với món khai vị Polynesia, cua rangoon, đĩa pu pu, chả giò hoặc cánh teriyaki. Cũng kết hợp tốt với ẩm thực Trung Quốc và Thái được phục vụ theo kiểu gia đình.',
    },
    ideal_for: {
      en: 'Perfect for group celebrations and party atmospheres. Ideal for 2-4 people sharing a communal drinking experience. Great for birthdays, bachelor/bachelorette parties, or any festive occasion. Warning: deceptively strong - pace yourselves.',
      it: 'Perfetto per celebrazioni di gruppo e atmosfere di festa. Ideale per 2-4 persone che condividono un\'esperienza di bevuta comunitaria. Ottimo per compleanni, addii al celibato/nubilato o qualsiasi occasione festiva. Avvertimento: ingannevolmente forte - fate le cose con calma.',
      vi: 'Hoàn hảo cho các lễ kỷ niệm nhóm và không khí tiệc tụng. Lý tưởng cho 2-4 người chia sẻ trải nghiệm uống cộng đồng. Tuyệt vời cho sinh nhật, tiệc độc thân hoặc bất kỳ dịp lễ hội nào. Cảnh báo: mạnh một cách lừa dối - hãy uống từ từ.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (serves 2-4 people)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Brandy', it: 'Brandy', vi: 'Brandy' },
    },
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Xi-rô orgeat' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Xi-rô đơn giản' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Add all ingredients to a large scorpion bowl filled with crushed ice. Stir well to combine and chill. Add more crushed ice to fill. Optionally, float a halved lime shell filled with overproof rum on top and ignite carefully. Serve with long straws for sharing.',
    it: 'Aggiungere tutti gli ingredienti in una grande ciotola scorpion piena di ghiaccio tritato. Mescolare bene per combinare e raffreddare. Aggiungere altro ghiaccio tritato per riempire. Facoltativamente, far galleggiare una mezza scorza di lime riempita con rum overproof sopra e accendere con attenzione. Servire con lunghe cannucce per condividere.',
    vi: 'Thêm tất cả nguyên liệu vào một bát scorpion lớn đầy đá nghiền. Khuấy đều để kết hợp và làm lạnh. Thêm đá nghiền để đầy. Tùy chọn, làm nổi một nửa vỏ chanh chứa đầy rum overproof lên trên và đốt cẩn thận. Phục vụ với ống hút dài để chia sẻ.',
  },

  glass: 'Scorpion bowl (communal)',

  garnish: {
    en: 'Orchid flowers, pineapple wedges, maraschino cherries, flaming lime half (optional)',
    it: 'Fiori di orchidea, spicchi di ananas, ciliegie maraschino, mezza lime fiammeggiante (facoltativo)',
    vi: 'Hoa lan, nhánh ananás, cherry maraschino, nửa chanh bốc cháy (tùy chọn)',
  },

  ice: 'crushed',

  serving_style: 'communal',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_BRANDY', 'ING_GIN'],

  flavor_profile: ['fruity', 'citrus', 'strong'],

  abv_estimate: 15,

  calories_estimate: 1200, // Total for full bowl

  difficulty: 'intermediate',

  prep_time_seconds: 180,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['party', 'celebration', 'group_gathering', 'tiki_bar'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['trader-vics-scorpion', 'scorpion-single-serve'],

  notes_for_staff: 'Created by Trader Vic in 1945. Serves 2-4 people. Orgeat contains almonds. Use scorpion bowl if available, otherwise large tiki bowl. If flaming, use extreme caution - extinguish before drinking. Provide long straws. Very potent - warn guests and monitor consumption.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 82,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://tradervics.com/cocktails/',
    note: 'Original Trader Vic recipe from 1945. Trader Vic\'s Bartender\'s Guide. Tiki cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
