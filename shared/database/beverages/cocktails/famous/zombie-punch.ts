/**
 * Famous Cocktails: Zombie Punch
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const zombiePunch: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'zombie-punch',
  stable_key: 'zombie-punch-tiki-tropical-famous-2025',

  name: {
    en: 'Zombie Punch',
    it: 'Punch Zombie',
    vi: 'Zombie Punch',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'potent', 'classic-tiki', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A large-format party version of the legendary Zombie cocktail, featuring multiple rums with tropical fruit juices and exotic spices. The Zombie Punch is notoriously potent yet deceptively smooth, designed to serve a crowd while maintaining the complex character of the original.',
    it: 'Una versione da festa in formato grande del leggendario cocktail Zombie, con più rum, succhi di frutta tropicale e spezie esotiche. Il Punch Zombie è notoriamente potente ma ingannevolmente morbido, progettato per servire una folla mantenendo il carattere complesso dell\'originale.',
    vi: 'Phiên bản tiệc định dạng lớn của cocktail Zombie huyền thoại, có nhiều loại rum với nước ép trái cây nhiệt đới và gia vị kỳ lạ. Zombie Punch nổi tiếng mạnh mẽ nhưng mượt mà lừa dối, được thiết kế để phục vụ đám đông trong khi duy trì tính cách phức tạp của bản gốc.',
  },

  history: {
    created_year: '1930s',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Zombie Punch is derived from the legendary Zombie cocktail created by Donn Beach (Ernest Raymond Beaumont Gantt) at his Don the Beachcomber restaurant in Hollywood in the 1930s. The original Zombie was famously created to help a hungover customer get through a business meeting - supposedly with such success that the customer later claimed it turned him into a zombie. The drink became so notorious for its potency that Donn Beach limited customers to two per visit. The punch version was developed for tiki parties and large gatherings, scaling up the recipe while maintaining its complex, multi-rum character. The exact original recipe was kept secret for decades, with Donn Beach using coded recipe cards. Modern versions attempt to recreate the legendary flavor profile.',
      it: 'Il Punch Zombie deriva dal leggendario cocktail Zombie creato da Donn Beach (Ernest Raymond Beaumont Gantt) nel suo ristorante Don the Beachcomber a Hollywood negli anni \'30. L\'originale Zombie fu famosamente creato per aiutare un cliente con i postumi di una sbornia ad affrontare una riunione di lavoro - presumibilmente con tale successo che il cliente affermò successivamente che lo aveva trasformato in uno zombie. La bevanda divenne così notoriamente potente che Donn Beach limitò i clienti a due per visita. La versione punch fu sviluppata per feste tiki e grandi raduni, aumentando la ricetta mantenendo il suo carattere complesso multi-rum. La ricetta originale esatta fu tenuta segreta per decenni, con Donn Beach che usava schede di ricette codificate. Le versioni moderne tentano di ricreare il leggendario profilo di sapore.',
      vi: 'Zombie Punch bắt nguồn từ cocktail Zombie huyền thoại được tạo ra bởi Donn Beach (Ernest Raymond Beaumont Gantt) tại nhà hàng Don the Beachcomber của ông ở Hollywood vào những năm 1930. Zombie gốc được tạo ra nổi tiếng để giúp một khách hàng say rượu vượt qua cuộc họp kinh doanh - được cho là thành công đến mức khách hàng sau đó tuyên bố nó biến anh ta thành zombie. Thức uống trở nên khét tiếng về độ mạnh của nó đến mức Donn Beach giới hạn khách hàng hai ly mỗi lần đến. Phiên bản punch được phát triển cho các bữa tiệc tiki và các buổi họp mặt lớn, mở rộng công thức trong khi duy trì tính cách đa rum phức tạp. Công thức gốc chính xác được giữ bí mật trong nhiều thập kỷ, với Donn Beach sử dụng thẻ công thức được mã hóa. Các phiên bản hiện đại cố gắng tái tạo hồ sơ hương vị huyền thoại.',
    },
    named_after: {
      en: 'Named "Zombie" because the drink is so potent it supposedly turns you into a walking zombie - famously limited to two per customer by its creator.',
      it: 'Chiamato "Zombie" perché la bevanda è così potente che presumibilmente ti trasforma in uno zombie ambulante - famosamente limitato a due per cliente dal suo creatore.',
      vi: 'Được đặt tên "Zombie" bởi vì thức uống mạnh đến mức được cho là biến bạn thành một zombie đi bộ - nổi tiếng được giới hạn hai ly cho mỗi khách hàng bởi người tạo ra nó.',
    },
  },

  taste: {
    profile: ['fruity', 'complex', 'potent'],
    description: {
      en: 'Intensely complex with layers of rum, tropical fruit, citrus, and exotic spices. Multiple rum varieties create incredible depth while tropical juices provide sweetness and balance. Deceptively smooth despite its high alcohol content - dangerously drinkable.',
      it: 'Intensamente complesso con strati di rum, frutta tropicale, agrumi e spezie esotiche. Molteplici varietà di rum creano una profondità incredibile mentre i succhi tropicali forniscono dolcezza ed equilibrio. Ingannevolmente morbido nonostante il suo alto contenuto alcolico - pericolosamente bevibile.',
      vi: 'Phức tạp mãnh liệt với các lớp rum, trái cây nhiệt đới, cam quýt và gia vị kỳ lạ. Nhiều loại rum tạo ra chiều sâu đáng kinh ngạc trong khi nước ép nhiệt đới cung cấp vị ngọt và cân bằng. Mượt mà lừa dối bất chấp hàm lượng cồn cao - dễ uống nguy hiểm.',
    },
    first_impression: {
      en: 'Tropical fruit sweetness with complex rum depth and exotic spice notes',
      it: 'Dolcezza di frutta tropicale con profondità complessa di rum e note esotiche di spezie',
      vi: 'Vị ngọt trái cây nhiệt đới với chiều sâu rum phức tạp và hương gia vị kỳ lạ',
    },
    finish: {
      en: 'Very long, warming finish with multiple rum layers, tropical fruit, and lingering spice',
      it: 'Finale molto lungo e caldo con molteplici strati di rum, frutta tropicale e spezie persistenti',
      vi: 'Kết thúc rất dài, ấm áp với nhiều lớp rum, trái cây nhiệt đới và gia vị kéo dài',
    },
    balance: {
      en: 'Remarkably well-balanced for its strength - tropical sweetness and citrus acidity mask the high alcohol content',
      it: 'Notevolmente ben bilanciato per la sua forza - dolcezza tropicale e acidità agrumata mascherano l\'alto contenuto alcolico',
      vi: 'Cân bằng đáng kể cho độ mạnh của nó - vị ngọt nhiệt đới và độ axit cam quýt che giấu hàm lượng cồn cao',
    },
  },

  recommendations: {
    best_time: ['evening', 'party'],
    occasions: ['party', 'tiki_bar', 'celebration', 'halloween', 'large_gathering'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect for tiki party buffets with jerk chicken, kalua pork, coconut shrimp, tropical fruit platters, or Polynesian-style cuisine. Also pairs well with spicy Caribbean and Asian dishes.',
      it: 'Perfetto per buffet di feste tiki con pollo jerk, kalua pork, gamberi al cocco, piatti di frutta tropicale o cucina in stile polinesiano. Si abbina bene anche con piatti caraibici e asiatici piccanti.',
      vi: 'Hoàn hảo cho tiệc buffet tiki với gà jerk, thịt lợn kalua, tôm dừa, đĩa trái cây nhiệt đới hoặc ẩm thực kiểu Polynesia. Cũng kết hợp tốt với các món Caribbean và Châu Á cay.',
    },
    ideal_for: {
      en: 'Perfect for large tiki parties, Halloween gatherings, and tropical celebrations. WARNING: Extremely potent - limit consumption and warn guests. Ideal for serious tiki enthusiasts and punch bowl parties. Not for casual drinking.',
      it: 'Perfetto per grandi feste tiki, raduni di Halloween e celebrazioni tropicali. ATTENZIONE: Estremamente potente - limitare il consumo e avvertire gli ospiti. Ideale per seri appassionati di tiki e feste con ciotola di punch. Non per bere casualmente.',
      vi: 'Hoàn hảo cho các bữa tiệc tiki lớn, các buổi họp mặt Halloween và lễ kỷ niệm nhiệt đới. CẢNH BÁO: Cực kỳ mạnh - hạn chế tiêu thụ và cảnh báo khách. Lý tưởng cho những người đam mê tiki nghiêm túc và tiệc bát punch. Không dành cho uống thông thường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (Batch for 8-10 servings)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 240, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_RUM_GOLD',
      quantity: { amount: 240, unit: 'ml' },
      display_name: { en: 'Gold rum', it: 'Rum oro', vi: 'Rum vàng' },
    },
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Dark rum (151 proof)', it: 'Rum scuro (151 proof)', vi: 'Rum đen (151 proof)' },
    },
    {
      ingredient_id: 'ING_APRICOT_BRANDY',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Apricot brandy', it: 'Brandy all\'albicocca', vi: 'Rượu mơ' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 360, unit: 'ml' },
      display_name: { en: 'Fresh pineapple juice', it: 'Succo di ananas fresco', vi: 'Nước ép dứa tươi' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 180, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'In a large punch bowl, combine white rum, gold rum, apricot brandy, pineapple juice, lime juice, and grenadine. Add large ice block or ring. Stir gently. Float dark rum on top just before serving. Garnish punch bowl with tropical fruit slices, mint sprigs, and edible flowers. Serve in individual tiki mugs over crushed ice.',
    it: 'In una grande ciotola da punch, combinare rum bianco, rum oro, brandy all\'albicocca, succo di ananas, succo di lime e granatina. Aggiungere un grande blocco di ghiaccio o anello. Mescolare delicatamente. Far galleggiare rum scuro sopra appena prima di servire. Guarnire la ciotola da punch con fette di frutta tropicale, rametti di menta e fiori commestibili. Servire in tazze tiki individuali su ghiaccio tritato.',
    vi: 'Trong một bát punch lớn, kết hợp rum trắng, rum vàng, rượu mơ, nước ép dứa, nước cốt chanh và grenadine. Thêm khối đá lớn hoặc vòng đá. Khuấy nhẹ. Nổi rum đen lên trên ngay trước khi phục vụ. Trang trí bát punch với lát trái cây nhiệt đới, cành bạc hà và hoa ăn được. Phục vụ trong cốc tiki riêng lẻ trên đá nghiền.',
  },

  glass: 'Punch bowl / Tiki mugs',

  garnish: {
    en: 'Tropical fruit slices, mint sprigs, edible flowers, pineapple leaves',
    it: 'Fette di frutta tropicale, rametti di menta, fiori commestibili, foglie di ananas',
    vi: 'Lát trái cây nhiệt đới, cành bạc hà, hoa ăn được, lá dứa',
  },

  ice: 'block',

  serving_style: 'punch',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_GOLD', 'ING_RUM_DARK'],

  flavor_profile: ['fruity', 'complex', 'potent'],

  abv_estimate: 20,

  calories_estimate: 280,

  difficulty: 'intermediate',

  prep_time_seconds: 180,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['party', 'tiki_bar', 'celebration', 'halloween'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['zombie-cocktail', 'virgin-zombie-punch'],

  notes_for_staff: 'EXTREMELY POTENT - warn all guests and monitor consumption. Original Donn Beach recipe limited customers to 2 drinks. This batch serves 8-10 people. Use 151-proof dark rum floater for authentic presentation. Recipe scaled from original Zombie cocktail. Consider limiting refills. Fresh juices essential.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.smugglerscovesf.com/store/smugglers-cove-exotic-cocktails-rum-and-the-cult-of-tiki',
    note: 'Punch version of legendary Donn Beach Zombie. Original recipe was kept secret for decades.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
