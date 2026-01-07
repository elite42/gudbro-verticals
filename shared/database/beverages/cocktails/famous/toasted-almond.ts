/**
 * Famous Cocktails: Toasted Almond
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const toastedAlmond: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  slug: 'toasted-almond',
  stable_key: 'toasted_almond_amaretto_kahlua_cream',

  name: {
    en: 'Toasted Almond',
    it: 'Toasted Almond',
    vi: 'Toasted Almond',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'coffee', 'nutty', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A smooth, nutty dessert cocktail combining amaretto, coffee liqueur, and cream. The Toasted Almond offers a perfect balance of almond and coffee flavors wrapped in silky cream, creating an irresistible after-dinner treat.',
    it: 'Un cocktail da dessert liscio e nocciolato che combina amaretto, liquore al caffè e panna. Il Toasted Almond offre un perfetto equilibrio di sapori di mandorla e caffè avvolti in panna setosa, creando un irresistibile dolcetto dopo cena.',
    vi: 'Một loại cocktail tráng miệng mượt mà, có vị hạt kết hợp amaretto, rượu mùi cà phê và kem. Toasted Almond cung cấp sự cân bằng hoàn hảo của hương vị hạnh nhân và cà phê được bao bọc trong kem mượt, tạo ra món ăn sau bữa tối không thể cưỡng lại.',
  },

  history: {
    created_year: '1970s',
    origin: {
      country: 'USA',
    },
    story: {
      en: "The Toasted Almond emerged in the 1970s during the golden age of creamy cocktails in America. It's often considered a variation of the Sombrero (Kahlúa and cream) or a cousin to the Orgasm family of shooters. The drink became popular in bars and restaurants as an accessible, crowd-pleasing dessert cocktail that showcased the then-trendy amaretto liqueur. Its simple recipe and delicious flavor profile have kept it popular in casual dining establishments.",
      it: "Il Toasted Almond emerse negli anni '70 durante l'età d'oro dei cocktail cremosi in America. È spesso considerato una variazione del Sombrero (Kahlúa e panna) o un cugino della famiglia di shooter Orgasm. La bevanda divenne popolare nei bar e ristoranti come un cocktail da dessert accessibile e apprezzato che metteva in mostra il liquore amaretto allora di tendenza. La sua ricetta semplice e il delizioso profilo aromatico l'hanno mantenuto popolare negli stabilimenti di ristorazione casual.",
      vi: 'Toasted Almond xuất hiện vào những năm 1970 trong thời kỳ hoàng kim của cocktail béo ngậy ở Mỹ. Nó thường được coi là một biến thể của Sombrero (Kahlúa và kem) hoặc anh em họ với họ shooter Orgasm. Thức uống trở nên phổ biến ở các quầy bar và nhà hàng như một cocktail tráng miệng dễ tiếp cận, được đông đảo ưa chuộng, thể hiện rượu mùi amaretto thời thượng lúc bấy giờ. Công thức đơn giản và hồ sơ hương vị ngon đã giữ cho nó phổ biến trong các cơ sở ăn uống bình thường.',
    },
    named_after: {
      en: 'Named for the "toasted" almond flavor achieved by combining amaretto with coffee liqueur, evoking the taste of roasted almonds.',
      it: 'Prende il nome dal sapore di mandorla "tostata" ottenuto combinando amaretto con liquore al caffè, evocando il gusto delle mandorle tostate.',
      vi: 'Được đặt tên cho hương vị hạnh nhân "rang" đạt được bằng cách kết hợp amaretto với rượu mùi cà phê, gợi lên hương vị của hạnh nhân rang.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'nutty', 'coffee'],
    description: {
      en: 'Rich and creamy with pronounced almond and coffee notes. The amaretto provides sweet nuttiness while the coffee liqueur adds depth and a subtle roasted quality, all softened by cream into a smooth, dessert-like drink.',
      it: "Ricco e cremoso con pronunciate note di mandorla e caffè. L'amaretto fornisce dolcezza nocciolata mentre il liquore al caffè aggiunge profondità e una sottile qualità tostata, tutto ammorbidito dalla panna in una bevanda liscia simile a un dessert.",
      vi: 'Đậm đà và béo ngậy với hương vị hạnh nhân và cà phê rõ rệt. Amaretto cung cấp vị hạt ngọt trong khi rượu mùi cà phê thêm chiều sâu và chất lượng rang nhẹ, tất cả được làm mềm bởi kem thành thức uống mượt mà giống món tráng miệng.',
    },
    first_impression: {
      en: 'Sweet almond cream with immediate coffee undertones',
      it: 'Crema di mandorla dolce con immediate note di caffè',
      vi: 'Kem hạnh nhân ngọt với âm hưởng cà phê ngay lập tức',
    },
    finish: {
      en: 'Smooth, lingering almond and coffee sweetness',
      it: 'Dolcezza liscia e persistente di mandorla e caffè',
      vi: 'Vị ngọt hạnh nhân và cà phê mượt mà, kéo dài',
    },
    balance: {
      en: 'Well-balanced between nutty and coffee flavors, though decidedly sweet and dessert-focused',
      it: 'Ben bilanciato tra sapori nocciolati e di caffè, anche se decisamente dolce e focalizzato sul dessert',
      vi: 'Cân bằng tốt giữa hương vị hạt và cà phê, mặc dù rõ ràng ngọt và tập trung vào tráng miệng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'casual', 'dessert', 'nightcap'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect with almond-based desserts, biscotti, tiramisu, or chocolate cake. Also pairs well with vanilla ice cream and amaretti cookies.',
      it: 'Perfetto con dessert a base di mandorle, biscotti, tiramisù o torta al cioccolato. Si abbina bene anche con gelato alla vaniglia e amaretti.',
      vi: 'Hoàn hảo với các món tráng miệng làm từ hạnh nhân, biscotti, tiramisu hoặc bánh chocolate. Cũng kết hợp tốt với kem vani và bánh amaretti.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy nutty, coffee-flavored dessert drinks. Ideal for casual dining settings and anyone seeking a simple but delicious after-dinner cocktail. Great alternative to Irish Coffee or White Russian.',
      it: "Perfetto per chi ama le bevande da dessert al sapore di nocciole e caffè. Ideale per ambienti di ristorazione casual e chiunque cerchi un cocktail semplice ma delizioso dopo cena. Ottima alternativa all'Irish Coffee o al White Russian.",
      vi: 'Hoàn hảo cho những ai thích đồ uống tráng miệng có vị hạt, cà phê. Lý tưởng cho môi trường ăn uống bình thường và bất kỳ ai tìm kiếm một cocktail đơn giản nhưng ngon miệng sau bữa tối. Sự thay thế tuyệt vời cho Irish Coffee hoặc White Russian.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_AMARETTO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Amaretto', it: 'Amaretto', vi: 'Amaretto' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
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
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake well for 10-15 seconds until chilled and frothy. Strain into an ice-filled rocks glass or serve up in a coupe glass. Can also be built directly in glass over ice and stirred.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene per 10-15 secondi fino a quando è freddo e schiumoso. Filtrare in un bicchiere rocks pieno di ghiaccio o servire up in un bicchiere coppa. Può anche essere costruito direttamente nel bicchiere sul ghiaccio e mescolato.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ trong 10-15 giây cho đến khi lạnh và có bọt. Lọc vào ly rocks đầy đá hoặc phục vụ up trong ly coupe. Cũng có thể được xây dựng trực tiếp trong ly trên đá và khuấy.',
  },

  glass: 'Rocks glass (or Coupe)',

  garnish: {
    en: 'Toasted sliced almonds (optional)',
    it: 'Mandorle affettate tostate (opzionale)',
    vi: 'Hạnh nhân lát rang (tùy chọn)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_AMARETTO'],

  flavor_profile: ['creamy', 'sweet', 'nutty', 'coffee'],

  abv_estimate: 14,

  calories_estimate: 280,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'tree_nuts'],
    intolerances: ['lactose', 'alcohol', 'caffeine', 'nut_allergy'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all_year'],
  occasion_tags: ['digestivo', 'casual', 'dessert', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['toasted-almond-shooter', 'frozen-toasted-almond', 'italian-toasted-almond'],

  notes_for_staff:
    'Simple three-ingredient recipe. Can be served on rocks or up depending on preference. Some recipes add vodka for extra strength. Contains nut liqueur - always check for allergies. Popular as both a cocktail and a shooter.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/toasted-almond/',
    notes: 'Popular creamy cocktail from the 1970s American bar scene.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
