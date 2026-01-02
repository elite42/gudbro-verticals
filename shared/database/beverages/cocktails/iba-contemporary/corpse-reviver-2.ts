/**
 * IBA Contemporary Classics: Corpse Reviver #2
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const corpseReviver2: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
  slug: 'corpse-reviver-2',
  stable_key: 'corpse_reviver_2_iba_contemporary_2025',

  name: {
    en: 'Corpse Reviver #2',
    it: 'Corpse Reviver #2',
    vi: 'Corpse Reviver #2',
    ko: '코프스 리바이버 #2',
    ja: 'コープス・リバイバー #2',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'classic', 'brunch', 'complex', 'citrus'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated "hair of the dog" cocktail combining gin, Cointreau, Lillet Blanc, lemon juice, and a hint of absinthe. Complex, citrus-forward, and refreshing, this drink was designed to cure hangovers and "revive corpses."',
    it: 'Un cocktail sofisticato "colpo della staffa" che combina gin, Cointreau, Lillet Blanc, succo di limone e un tocco di assenzio. Complesso, agrumato e rinfrescante, questo drink è stato progettato per curare i postumi della sbornia e "rianimare i cadaveri."',
    vi: 'Một loại cocktail "hair of the dog" tinh tế kết hợp gin, Cointreau, Lillet Blanc, nước chanh và một chút absinthe. Phức tạp, hương chanh nổi bật và sảng khoái, thức uống này được thiết kế để chữa say và "hồi sinh xác chết."',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'London',
      bar: 'Savoy Hotel',
      country: 'England',
    },
    creator: {
      name: 'Harry Craddock',
      profession: 'bartender',
    },
    story: {
      en: 'Featured in Harry Craddock\'s 1930 "The Savoy Cocktail Book," the Corpse Reviver #2 is part of a family of "corpse reviver" cocktails meant to cure hangovers. Craddock warned: "Four of these taken in swift succession will unrevive the corpse again." It fell into obscurity but was revived (ironically) during the 2000s cocktail renaissance and is now a modern classic.',
      it: 'Presente nel "The Savoy Cocktail Book" di Harry Craddock del 1930, il Corpse Reviver #2 fa parte di una famiglia di cocktail "corpse reviver" pensati per curare i postumi della sbornia. Craddock avvertì: "Quattro di questi presi in rapida successione riporteranno il cadavere alla morte." Cadde nell\'oscurità ma fu rianimato (ironicamente) durante il rinascimento dei cocktail degli anni 2000 ed è ora un classico moderno.',
      vi: 'Được giới thiệu trong "The Savoy Cocktail Book" của Harry Craddock năm 1930, Corpse Reviver #2 là một phần của gia đình cocktail "corpse reviver" nhằm chữa say. Craddock cảnh báo: "Bốn ly liên tiếp sẽ làm cho xác chết lại chết." Nó rơi vào quên lãng nhưng được hồi sinh (trớ trêu thay) trong thời kỳ phục hưng cocktail những năm 2000 và hiện là một tác phẩm kinh điển hiện đại.',
    },
    named_after: {
      en: 'Named for its supposed ability to "revive corpses" or cure hangovers. The "#2" distinguishes it from other Corpse Reviver variations.',
      it: 'Prende il nome dalla sua presunta capacità di "rianimare i cadaveri" o curare i postumi della sbornia. Il "#2" lo distingue da altre varianti di Corpse Reviver.',
      vi: 'Được đặt tên theo khả năng được cho là "hồi sinh xác chết" hoặc chữa say. "#2" phân biệt nó với các biến thể Corpse Reviver khác.',
    },
  },

  taste: {
    profile: ['citrus', 'herbal', 'complex', 'refreshing'],
    description: {
      en: 'Bright, complex, and thoroughly refreshing. Lemon provides tartness, Cointreau adds orange sweetness, Lillet brings floral notes, gin provides botanical complexity, and absinthe adds an enigmatic anise touch. Perfectly balanced.',
      it: 'Brillante, complesso e completamente rinfrescante. Il limone fornisce acidità, il Cointreau aggiunge dolcezza all\'arancia, il Lillet porta note floreali, il gin fornisce complessità botanica e l\'assenzio aggiunge un tocco enigmatico di anice. Perfettamente bilanciato.',
      vi: 'Tươi sáng, phức tạp và hoàn toàn sảng khoái. Chanh cung cấp vị chua, Cointreau thêm vị ngọt cam, Lillet mang đến hương hoa, gin cung cấp độ phức tạp thực vật và absinthe thêm một chút hồi bí ẩn. Cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Bright citrus with herbal, anise undertones',
      it: 'Agrumi brillanti con sottotoni erbacei e di anice',
      vi: 'Chanh tươi sáng với hương thảo mộc, hồi ở dưới',
    },
    finish: {
      en: 'Clean, crisp finish with lingering absinthe complexity',
      it: 'Finale pulito e fresco con complessità persistente dell\'assenzio',
      vi: 'Kết thúc sạch, sắc nét với độ phức tạp absinthe kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sweet, sour, and herbal elements',
      it: 'Perfettamente bilanciato tra elementi dolci, acidi ed erbacei',
      vi: 'Cân bằng hoàn hảo giữa các yếu tố ngọt, chua và thảo mộc',
    },
  },

  recommendations: {
    best_time: ['brunch', 'afternoon'],
    occasions: ['brunch', 'recovery', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect for brunch with eggs, smoked salmon, or light seafood. Excellent before lunch as an aperitif.',
      it: 'Perfetto per il brunch con uova, salmone affumicato o pesce leggero. Eccellente prima di pranzo come aperitivo.',
      vi: 'Hoàn hảo cho bữa brunch với trứng, cá hồi hun khói hoặc hải sản nhẹ. Tuyệt vời trước bữa trưa như một aperitif.',
    },
    ideal_for: {
      en: 'Perfect for brunch, morning-after recovery, or anyone who appreciates complex, citrus-forward cocktails. Great introduction to absinthe.',
      it: 'Perfetto per il brunch, il recupero del giorno dopo o chiunque apprezzi cocktail complessi e agrumati. Ottima introduzione all\'assenzio.',
      vi: 'Hoàn hảo cho bữa brunch, phục hồi buổi sáng sau hoặc bất kỳ ai đánh giá cao cocktail phức tạp, hương chanh nổi bật. Giới thiệu tuyệt vời về absinthe.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Cointreau', it: 'Cointreau', vi: 'Cointreau' },
    },
    {
      ingredient_id: 'ING_LILLET_BLANC',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Lillet Blanc', it: 'Lillet Blanc', vi: 'Lillet Blanc' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into shaker with ice. Shake well. Strain into chilled cocktail glass. Garnish with orange twist or cherry.',
    it: 'Versare tutti gli ingredienti nello shaker con ghiaccio. Shakerare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con scorza d\'arancia o ciliegia.',
    vi: 'Đổ tất cả nguyên liệu vào shaker với đá. Lắc kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn hoặc quả anh đào.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Orange twist or cherry',
    it: 'Scorza d\'arancia o ciliegia',
    vi: 'Vỏ cam xoắn hoặc quả anh đào',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'herbal', 'complex', 'refreshing'],

  abv_estimate: 24,

  calories_estimate: 160,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'wormwood'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'recovery', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['corpse-reviver-1', 'corpse-reviver-blue'],

  notes_for_staff: 'Use absinthe VERY sparingly - a single dash only, or rinse glass and discard excess. Too much will overpower. Originally used Kina Lillet (no longer available) - Lillet Blanc is modern substitute. Historically a morning-after drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 72,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/corpse-reviver-2/',
    note: 'IBA Official Recipe. From The Savoy Cocktail Book 1930.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
