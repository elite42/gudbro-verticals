/**
 * Famous Cocktails: Pink Squirrel
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pinkSquirrel: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  slug: 'pink-squirrel',
  stable_key: 'pink_squirrel_creme_almond_cacao_cream',

  name: {
    en: 'Pink Squirrel',
    it: 'Pink Squirrel',
    vi: 'Pink Squirrel',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'vintage', 'sweet', 'nutty'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A whimsical pink dessert cocktail combining crème de noyaux (almond liqueur), white crème de cacao, and cream. This vintage favorite from the 1940s is sweet, nutty, and visually striking with its distinctive pink color.',
    it: 'Un fantasioso cocktail da dessert rosa che combina crème de noyaux (liquore alle mandorle), crème de cacao bianca e panna. Questo favorito vintage degli anni \'40 è dolce, nocciolato e visivamente sorprendente con il suo distintivo colore rosa.',
    vi: 'Một loại cocktail tráng miệng màu hồng kỳ lạ kết hợp crème de noyaux (rượu mùi hạnh nhân), crème de cacao trắng và kem. Tác phẩm yêu thích vintage từ những năm 1940 này ngọt, có vị hạt và nổi bật về mặt thị giác với màu hồng đặc trưng.',
  },

  history: {
    created_year: '1940s',
    origin: {
      city: 'Milwaukee',
      bar: 'Bryant\'s Cocktail Lounge',
      country: 'USA',
    },
    story: {
      en: 'The Pink Squirrel was created in the 1940s at Bryant\'s Cocktail Lounge in Milwaukee, Wisconsin. The drink became a staple of American supper clubs and ice cream parlors in the 1950s-60s, often served as a frozen dessert cocktail. Its playful name and pretty pink color made it especially popular with women during the mid-century cocktail boom. The drink experienced a resurgence in recent years as part of the vintage cocktail revival.',
      it: 'Il Pink Squirrel fu creato negli anni \'40 al Bryant\'s Cocktail Lounge a Milwaukee, Wisconsin. La bevanda divenne un punto fermo dei supper club americani e delle gelaterie negli anni \'50-\'60, spesso servita come cocktail da dessert frozen. Il suo nome giocoso e il bel colore rosa lo resero particolarmente popolare tra le donne durante il boom dei cocktail di metà secolo. La bevanda ha vissuto una rinascita negli ultimi anni come parte del revival dei cocktail vintage.',
      vi: 'Pink Squirrel được tạo ra vào những năm 1940 tại Bryant\'s Cocktail Lounge ở Milwaukee, Wisconsin. Thức uống đã trở thành món chính của các câu lạc bộ ăn tối và tiệm kem Mỹ vào những năm 1950-60, thường được phục vụ như một cocktail tráng miệng đông lạnh. Cái tên vui tươi và màu hồng đẹp mắt đã làm cho nó đặc biệt phổ biến với phụ nữ trong thời kỳ bùng nổ cocktail giữa thế kỷ. Thức uống đã trải qua sự hồi sinh trong những năm gần đây như một phần của sự phục hưng cocktail vintage.',
    },
    named_after: {
      en: 'The playful name "Pink Squirrel" refers to the drink\'s distinctive pink color and perhaps the "nutty" flavor from the almond liqueur.',
      it: 'Il nome giocoso "Pink Squirrel" si riferisce al distintivo colore rosa della bevanda e forse al sapore "nocciolato" dal liquore alle mandorle.',
      vi: 'Cái tên vui tươi "Pink Squirrel" đề cập đến màu hồng đặc trưng của thức uống và có lẽ hương vị "hạt" từ rượu mùi hạnh nhân.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'nutty', 'almond'],
    description: {
      en: 'Sweet and creamy with prominent almond and white chocolate flavors. The crème de noyaux provides a distinctive nutty-cherry note that makes this drink unique among creamy cocktails. Very dessert-forward and indulgent.',
      it: 'Dolce e cremoso con prominenti sapori di mandorla e cioccolato bianco. La crème de noyaux fornisce una nota distintiva nocciolata-ciliegia che rende questa bevanda unica tra i cocktail cremosi. Molto orientata al dessert e indulgente.',
      vi: 'Ngọt và béo ngậy với hương vị hạnh nhân và chocolate trắng nổi bật. Crème de noyaux cung cấp hương vị hạt-anh đào đặc trưng làm cho thức uống này độc đáo trong số các cocktail béo ngậy. Rất hướng tráng miệng và nuông chiều.',
    },
    first_impression: {
      en: 'Sweet cream with immediate almond and marzipan notes',
      it: 'Crema dolce con immediate note di mandorla e marzapane',
      vi: 'Kem ngọt với hương hạnh nhân và marzipan ngay lập tức',
    },
    finish: {
      en: 'Lingering almond sweetness with creamy vanilla undertones',
      it: 'Dolcezza persistente di mandorla con sottotoni cremosi di vaniglia',
      vi: 'Vị ngọt hạnh nhân kéo dài với âm hưởng vani béo ngậy',
    },
    balance: {
      en: 'Very sweet and dessert-focused - not for those seeking dry or balanced cocktails',
      it: 'Molto dolce e focalizzato sul dessert - non per chi cerca cocktail secchi o bilanciati',
      vi: 'Rất ngọt và tập trung vào tráng miệng - không dành cho những ai tìm kiếm cocktail khô hoặc cân bằng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['dessert', 'retro_party', 'celebration', 'brunch'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Perfect with almond-based desserts, marzipan, cherry pie, or as a dessert replacement. Also pairs well with vanilla ice cream and amaretti cookies.',
      it: 'Perfetto con dessert a base di mandorle, marzapane, torta di ciliegie, o come sostituto del dessert. Si abbina bene anche con gelato alla vaniglia e amaretti.',
      vi: 'Hoàn hảo với các món tráng miệng làm từ hạnh nhân, marzipan, bánh anh đào, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với kem vani và bánh amaretti.',
    },
    ideal_for: {
      en: 'Perfect for vintage cocktail enthusiasts and those who enjoy very sweet, creamy drinks. Ideal for retro-themed parties and anyone seeking a fun, Instagram-worthy pink cocktail. Great for dessert lovers.',
      it: 'Perfetto per gli appassionati di cocktail vintage e chi ama le bevande molto dolci e cremose. Ideale per feste a tema retrò e chiunque cerchi un cocktail rosa divertente e degno di Instagram. Ottimo per gli amanti dei dessert.',
      vi: 'Hoàn hảo cho những người đam mê cocktail vintage và những ai thích đồ uống rất ngọt, béo ngậy. Lý tưởng cho các bữa tiệc theo chủ đề retro và bất kỳ ai tìm kiếm một cocktail màu hồng vui nhộn, xứng đáng với Instagram. Tuyệt vời cho người yêu tráng miệng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CREME_DE_NOYAUX',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Crème de noyaux',
        it: 'Crème de noyaux',
        vi: 'Crème de noyaux',
      },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'White crème de cacao',
        it: 'Crème de cacao bianca',
        vi: 'Crème de cacao trắng',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 10-15 seconds until well-chilled and frothy. Strain into a chilled coupe or cocktail glass. Alternatively, blend with vanilla ice cream for a frozen dessert version.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 10-15 secondi fino a quando è ben freddo e schiumoso. Filtrare in una coppa o bicchiere da cocktail raffreddato. In alternativa, frullare con gelato alla vaniglia per una versione dessert frozen.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 10-15 giây cho đến khi lạnh và có bọt. Lọc vào ly coupe hoặc cocktail đã làm lạnh. Hoặc xay với kem vani để có phiên bản tráng miệng đông lạnh.',
  },

  glass: 'Coupe (or Cocktail glass)',

  garnish: {
    en: 'Maraschino cherry (optional)',
    it: 'Ciliegia maraschino (opzionale)',
    vi: 'Quả anh đào maraschino (tùy chọn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CREME_DE_NOYAUX'],

  flavor_profile: ['creamy', 'sweet', 'nutty', 'almond'],

  abv_estimate: 13,

  calories_estimate: 270,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'tree_nuts'],
    intolerances: ['lactose', 'alcohol', 'nut_allergy'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['dessert', 'celebration', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-pink-squirrel', 'pink-panther', 'nutty-squirrel'],

  notes_for_staff: 'Crème de noyaux can be hard to find - substitute with amaretto + grenadine if unavailable (15ml each + 15ml cream extra). Often served frozen with ice cream in supper clubs. The pink color should be vibrant. Contains nut liqueur - ask about allergies.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 40,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1862/pink-squirrel',
    note: 'Classic 1940s dessert cocktail from Milwaukee supper club culture.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
