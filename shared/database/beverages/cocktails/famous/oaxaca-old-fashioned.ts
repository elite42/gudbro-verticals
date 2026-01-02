/**
 * Famous Cocktails: Oaxaca Old Fashioned
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const oaxacaOldFashioned: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  slug: 'oaxaca-old-fashioned',
  stable_key: '726354849302847563829104857362918475638291',

  name: {
    en: 'Oaxaca Old Fashioned',
    it: 'Oaxaca Old Fashioned',
    vi: 'Oaxaca Old Fashioned',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'mezcal', 'tequila', 'smoky'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A revolutionary modern classic that reimagines the Old Fashioned with agave spirits. Created by Phil Ward, this cocktail combines reposado tequila and mezcal with agave nectar and bitters, creating a smoky, complex drink that respects the Old Fashioned format while being entirely its own.',
    it: 'Un rivoluzionario classico moderno che reinventa l\'Old Fashioned con spiriti di agave. Creato da Phil Ward, questo cocktail combina tequila reposado e mezcal con nettare di agave e bitters, creando una bevanda affumicata e complessa che rispetta il formato dell\'Old Fashioned pur essendo completamente sua.',
    vi: 'Một tác phẩm cổ điển hiện đại cách mạng tái tưởng tượng Old Fashioned với rượu mạnh agave. Được tạo ra bởi Phil Ward, cocktail này kết hợp tequila reposado và mezcal với mật agave và bitters, tạo ra thức uống khói, phức tạp tôn trọng định dạng Old Fashioned trong khi hoàn toàn là của chính nó.',
  },

  history: {
    created_year: '2007',
    origin: {
      city: 'New York City',
      bar: 'Death & Co',
      country: 'USA',
    },
    creator: {
      name: 'Phil Ward',
      profession: 'bartender',
    },
    story: {
      en: 'Phil Ward created the Oaxaca Old Fashioned in 2007 at Death & Co, one of New York\'s pioneering craft cocktail bars. Ward wanted to showcase mezcal but knew many guests were intimidated by its intense smoky flavor. By splitting the base between reposado tequila and mezcal, and using agave nectar instead of simple syrup, he created a more approachable introduction to mezcal while maintaining complexity. The drink became an instant sensation and is considered one of the most influential modern cocktails, helping launch the mezcal boom of the 2010s.',
      it: 'Phil Ward creò l\'Oaxaca Old Fashioned nel 2007 al Death & Co, uno dei bar di cocktail artigianali pionieristici di New York. Ward voleva mostrare il mezcal ma sapeva che molti ospiti erano intimiditi dal suo intenso sapore affumicato. Dividendo la base tra tequila reposado e mezcal, e usando nettare di agave invece di sciroppo semplice, creò un\'introduzione più accessibile al mezcal mantenendo la complessità. La bevanda divenne una sensazione istantanea ed è considerata uno dei cocktail moderni più influenti, contribuendo a lanciare il boom del mezcal degli anni 2010.',
      vi: 'Phil Ward đã tạo ra Oaxaca Old Fashioned vào năm 2007 tại Death & Co, một trong những quán bar cocktail thủ công tiên phong của New York. Ward muốn giới thiệu mezcal nhưng biết nhiều khách e ngại với hương vị khói mạnh mẽ của nó. Bằng cách chia cơ sở giữa tequila reposado và mezcal, và sử dụng mật agave thay vì siro đường, ông đã tạo ra lời giới thiệu dễ tiếp cận hơn về mezcal trong khi duy trì độ phức tạp. Thức uống ngay lập tức gây sốt và được coi là một trong những cocktail hiện đại có ảnh hưởng nhất, giúp khởi động cơn sốt mezcal của những năm 2010.',
    },
    named_after: {
      en: 'Named after Oaxaca, Mexico, the heartland of mezcal production and the source of the cocktail\'s smoky soul.',
      it: 'Prende il nome da Oaxaca, Messico, il cuore della produzione di mezcal e la fonte dell\'anima affumicata del cocktail.',
      vi: 'Được đặt tên theo Oaxaca, Mexico, trái tim của sản xuất mezcal và nguồn gốc của linh hồn khói của cocktail.',
    },
  },

  taste: {
    profile: ['smoky', 'agave', 'complex', 'stirred'],
    description: {
      en: 'Beautifully balanced and complex. Reposado tequila provides a smooth agave base with vanilla and oak notes, while mezcal adds smoky depth without overwhelming. Agave nectar enhances the agave character, and mole bitters add chocolate-spice complexity. Richer and earthier than a whiskey Old Fashioned, with a silky texture and long finish.',
      it: 'Magnificamente bilanciato e complesso. La tequila reposado fornisce una base di agave liscia con note di vaniglia e rovere, mentre il mezcal aggiunge profondità affumicata senza sopraffare. Il nettare di agave esalta il carattere dell\'agave, e i mole bitters aggiungono complessità di cioccolato e spezie. Più ricco e terroso di un Old Fashioned al whiskey, con una texture setosa e un finale lungo.',
      vi: 'Cân bằng và phức tạp tuyệt đẹp. Tequila reposado cung cấp cơ sở agave mượt mà với hương vani và gỗ sồi, trong khi mezcal thêm độ sâu khói mà không át vị. Mật agave tăng cường đặc tính agave, và mole bitters thêm độ phức tạp chocolate-gia vị. Phong phú và đất đai hơn Old Fashioned whiskey, với kết cấu mượt như lụa và kết thúc dài.',
    },
    first_impression: {
      en: 'Smooth agave and subtle smoke hit first, followed by chocolate-spice notes',
      it: 'Agave liscia e fumo sottile colpiscono per primi, seguiti da note di cioccolato e spezie',
      vi: 'Agave mượt mà và khói tinh tế đập vào đầu tiên, tiếp theo là hương chocolate-gia vị',
    },
    finish: {
      en: 'Long, warming finish with lingering smoke, agave, and mole spice',
      it: 'Finale lungo e caldo con fumo, agave e spezie mole persistenti',
      vi: 'Kết thúc dài, ấm áp với khói, agave và gia vị mole kéo dài',
    },
    balance: {
      en: 'Expertly balanced - tequila smooths mezcal\'s intensity, creating approachable complexity',
      it: 'Bilanciato in modo esperto - la tequila ammorbidisce l\'intensità del mezcal, creando complessità accessibile',
      vi: 'Cân bằng điêu luyện - tequila làm mềm cường độ mezcal, tạo độ phức tạp dễ tiếp cận',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night', 'contemplative'],
    occasions: ['date_night', 'contemplative_drinking', 'digestivo', 'special_occasion'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Mexican cuisine, especially mole dishes, grilled meats, or dark chocolate desserts. Also pairs well with aged cheeses, smoked foods, and rich, savory dishes.',
      it: 'Eccellente con la cucina messicana, specialmente piatti al mole, carni alla griglia o dolci al cioccolato fondente. Si abbina bene anche con formaggi stagionati, cibi affumicati e piatti ricchi e saporiti.',
      vi: 'Tuyệt vời với món Mexico, đặc biệt là món mole, thịt nướng, hoặc món tráng miệng chocolate đen. Cũng kết hợp tốt với phô mai già, đồ ăn hun khói và các món đậm đà, mặn mà.',
    },
    ideal_for: {
      en: 'Perfect for Old Fashioned lovers seeking new experiences. Ideal for those exploring agave spirits or wanting an introduction to mezcal. Great for contemplative sipping and conversation.',
      it: 'Perfetto per gli amanti dell\'Old Fashioned che cercano nuove esperienze. Ideale per chi esplora gli spiriti di agave o vuole un\'introduzione al mezcal. Ottimo per sorseggiare e conversare in modo contemplativo.',
      vi: 'Hoàn hảo cho những người yêu Old Fashioned tìm kiếm trải nghiệm mới. Lý tưởng cho những ai khám phá rượu mạnh agave hoặc muốn làm quen với mezcal. Tuyệt vời cho việc nhấm nháp và trò chuyện suy ngẫm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_REPOSADO',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Reposado tequila', it: 'Tequila reposado', vi: 'Tequila reposado' },
    },
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_AGAVE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Agave syrup', it: 'Sciroppo di agave', vi: 'Siro agave' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
    {
      ingredient_id: 'ING_MOLE_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Mole bitters', it: 'Mole bitters', vi: 'Mole bitters' },
      optional: true,
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 30-40 seconds until properly chilled and diluted. Strain into a rocks glass over a large ice cube. Garnish with a flamed orange peel, expressing oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare e diluire adeguatamente. Filtrare in un bicchiere rocks con un grande cubetto di ghiaccio. Guarnire con una scorza d\'arancia fiammeggiata, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ trong 30-40 giây cho đến khi lạnh và pha loãng đúng mức. Lọc vào ly rocks với một khối đá lớn. Trang trí với vỏ cam đốt lửa, vắt tinh dầu lên thức uống.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Flamed orange peel',
    it: 'Scorza d\'arancia fiammeggiata',
    vi: 'Vỏ cam đốt lửa',
  },

  ice: 'large_cube',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_REPOSADO', 'ING_MEZCAL'],

  flavor_profile: ['smoky', 'agave', 'complex', 'stirred'],

  abv_estimate: 32,

  calories_estimate: 180,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

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
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['date_night', 'contemplative_drinking', 'digestivo', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mezcal-old-fashioned', 'tequila-old-fashioned', 'sotol-old-fashioned'],

  notes_for_staff: 'Mole bitters essential for authentic version - adds chocolate-spice complexity. Flame orange peel for theatrical presentation and caramelization. Use quality reposado and artisanal mezcal. Large ice cube minimizes dilution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.deathandcompany.com/',
    note: 'Created by Phil Ward at Death & Co, New York City, 2007. One of the most influential modern cocktails.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
