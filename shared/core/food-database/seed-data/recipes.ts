/**
 * GUDBRO Master Recipes Seed Data
 *
 * Ready-to-use recipes for cafes, restaurants, and hospitality.
 * Each recipe includes ingredients, steps, nutrition, and pricing.
 */

import type { MasterRecipe, RecipeCategory } from '../types';

// ============================================================================
// COFFEE RECIPES
// ============================================================================

export const coffeeRecipes: Partial<MasterRecipe>[] = [
  {
    slug: 'vietnamese-egg-coffee',
    name: {
      en: 'Vietnamese Egg Coffee',
      vi: 'Cà Phê Trứng',
      ko: '베트남 에그 커피',
      zh: '越南雞蛋咖啡'
    },
    description: {
      en: 'Traditional Hanoi-style egg coffee with a rich, creamy foam made from whipped egg yolk and condensed milk. A decadent treat that tastes like liquid tiramisu.',
      vi: 'Cà phê trứng truyền thống Hà Nội với lớp bọt kem béo ngậy từ lòng đỏ trứng và sữa đặc. Một thức uống thượng hạng có vị như tiramisu.',
      ko: '휘핑한 달걀 노른자와 연유로 만든 풍부하고 크리미한 거품의 전통 하노이식 에그 커피. 액체 티라미수 같은 맛의 호화로운 음료.'
    },
    shortDescription: {
      en: 'Creamy egg foam over strong Vietnamese coffee',
      vi: 'Bọt trứng kem béo trên nền cà phê Việt đậm đà'
    },
    category: 'hot_coffee',
    tags: ['signature', 'vietnamese', 'traditional', 'creamy', 'bestseller'],
    cuisineTypes: ['vietnamese'],
    servings: 1,
    servingSize: '120ml',
    prepTime: 10,
    cookTime: 0,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: 'Brew a strong shot of Vietnamese robusta coffee using a phin filter',
          vi: 'Pha một shot cà phê robusta Việt Nam đậm đặc bằng phin'
        },
        duration: 5,
        tips: { en: 'Use freshly roasted beans for best flavor' }
      },
      {
        stepNumber: 2,
        instruction: {
          en: 'Separate egg yolk and add to condensed milk (2 tbsp)',
          vi: 'Tách lòng đỏ trứng và cho vào sữa đặc (2 muỗng canh)'
        },
        duration: 1
      },
      {
        stepNumber: 3,
        instruction: {
          en: 'Whisk vigorously for 3-4 minutes until light and fluffy',
          vi: 'Đánh đều trong 3-4 phút cho đến khi bông xốp'
        },
        duration: 4,
        tips: { en: 'Use an electric mixer for best results' }
      },
      {
        stepNumber: 4,
        instruction: {
          en: 'Pour coffee into cup, gently spoon egg cream on top',
          vi: 'Đổ cà phê vào cốc, nhẹ nhàng múc kem trứng lên trên'
        },
        duration: 1
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 55000, region: 'vietnam' },
      { currency: 'USD', amount: 4.50, region: 'americas' }
    ],
    foodCostPercentage: 25,
    images: {
      primary: '/images/recipes/egg-coffee.jpg'
    },
    presentationStyle: 'traditional',
    allergens: ['eggs', 'dairy'],
    dietaryTags: ['vegetarian', 'gluten_free']
  },
  {
    slug: 'coconut-cold-brew',
    name: {
      en: 'Coconut Cold Brew',
      vi: 'Cold Brew Dừa',
      ko: '코코넛 콜드브루'
    },
    description: {
      en: 'Smooth cold brew coffee infused with creamy coconut milk and a hint of vanilla. Refreshing and naturally sweet.',
      vi: 'Cà phê cold brew mượt mà pha với sữa dừa béo ngậy và chút vani. Thanh mát và ngọt tự nhiên.'
    },
    shortDescription: {
      en: 'Cold brew with creamy coconut milk',
      vi: 'Cold brew với sữa dừa béo ngậy'
    },
    category: 'iced_coffee',
    tags: ['refreshing', 'tropical', 'vegan-option', 'summer'],
    cuisineTypes: ['fusion', 'vietnamese'],
    servings: 1,
    servingSize: '350ml',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: {
          en: 'Add ice to a tall glass (3/4 full)',
          vi: 'Cho đá vào ly cao (3/4 ly)'
        }
      },
      {
        stepNumber: 2,
        instruction: {
          en: 'Pour cold brew coffee (150ml)',
          vi: 'Đổ cà phê cold brew (150ml)'
        }
      },
      {
        stepNumber: 3,
        instruction: {
          en: 'Add coconut milk and stir gently',
          vi: 'Thêm sữa dừa và khuấy nhẹ'
        }
      },
      {
        stepNumber: 4,
        instruction: {
          en: 'Optional: drizzle with coconut cream on top',
          vi: 'Tùy chọn: rưới kem dừa lên trên'
        }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 65000, region: 'vietnam' },
      { currency: 'USD', amount: 5.00, region: 'americas' }
    ],
    foodCostPercentage: 22,
    images: {
      primary: '/images/recipes/coconut-cold-brew.jpg'
    },
    presentationStyle: 'modern',
    allergens: [],
    dietaryTags: ['vegan', 'dairy_free', 'gluten_free']
  },
  {
    slug: 'salted-caramel-latte',
    name: {
      en: 'Salted Caramel Latte',
      vi: 'Latte Caramel Muối',
      ko: '솔티드 카라멜 라떼'
    },
    description: {
      en: 'Espresso combined with steamed milk and house-made salted caramel sauce. Sweet, salty, and utterly addictive.',
      vi: 'Espresso kết hợp với sữa nóng và sốt caramel muối tự làm. Ngọt, mặn và vô cùng hấp dẫn.'
    },
    category: 'espresso_based',
    tags: ['bestseller', 'sweet', 'indulgent'],
    servings: 1,
    servingSize: '300ml',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Pull a double espresso shot', vi: 'Pha một shot espresso đôi' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Add salted caramel sauce to cup (2 tbsp)', vi: 'Cho sốt caramel muối vào cốc (2 muỗng canh)' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Steam milk and pour over espresso', vi: 'Đánh sữa nóng và đổ lên espresso' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Drizzle caramel on top, sprinkle sea salt', vi: 'Rưới caramel lên trên, rắc muối biển' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 70000, region: 'vietnam' }
    ],
    foodCostPercentage: 28,
    images: { primary: '/images/recipes/salted-caramel-latte.jpg' },
    presentationStyle: 'modern',
    allergens: ['dairy'],
    dietaryTags: ['vegetarian', 'gluten_free']
  }
];

// ============================================================================
// TEA RECIPES
// ============================================================================

export const teaRecipes: Partial<MasterRecipe>[] = [
  {
    slug: 'matcha-latte',
    name: {
      en: 'Matcha Latte',
      vi: 'Matcha Latte',
      ko: '말차 라떼',
      ja: '抹茶ラテ'
    },
    description: {
      en: 'Premium ceremonial-grade Japanese matcha whisked with your choice of milk. Earthy, creamy, and energizing.',
      vi: 'Matcha Nhật Bản cao cấp đánh tan với sữa tùy chọn. Đậm đà, béo ngậy và tràn đầy năng lượng.'
    },
    category: 'hot_tea',
    tags: ['healthy', 'antioxidants', 'japanese', 'customizable'],
    cuisineTypes: ['japanese'],
    servings: 1,
    servingSize: '300ml',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Sift 2g matcha powder into bowl', vi: 'Rây 2g bột matcha vào bát' },
        tips: { en: 'Sifting prevents clumps' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Add 30ml hot water (70°C) and whisk in W motion', vi: 'Thêm 30ml nước nóng (70°C) và đánh theo hình chữ W' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Steam milk and pour into matcha', vi: 'Đánh sữa nóng và đổ vào matcha' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 70000, region: 'vietnam' }
    ],
    foodCostPercentage: 30,
    images: { primary: '/images/recipes/matcha-latte.jpg' },
    allergens: ['dairy'],
    dietaryTags: ['vegetarian', 'gluten_free']
  },
  {
    slug: 'thai-milk-tea',
    name: {
      en: 'Thai Milk Tea',
      vi: 'Trà Sữa Thái',
      ko: '타이 밀크티',
      th: 'ชาเย็น'
    },
    description: {
      en: 'Authentic Thai iced tea with signature orange color, made with Ceylon tea, condensed milk, and evaporated milk.',
      vi: 'Trà sữa Thái chính gốc với màu cam đặc trưng, làm từ trà Ceylon, sữa đặc và sữa bay hơi.'
    },
    category: 'iced_tea',
    tags: ['refreshing', 'sweet', 'thai', 'classic'],
    cuisineTypes: ['thai'],
    servings: 1,
    servingSize: '400ml',
    prepTime: 5,
    cookTime: 5,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Brew Thai tea mix in boiling water (5 min)', vi: 'Pha trà Thái trong nước sôi (5 phút)' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Strain and let cool slightly', vi: 'Lọc và để nguội bớt' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Add condensed milk and stir', vi: 'Thêm sữa đặc và khuấy đều' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Pour over ice, top with evaporated milk', vi: 'Đổ lên đá, rót sữa bay hơi lên trên' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 55000, region: 'vietnam' }
    ],
    foodCostPercentage: 20,
    images: { primary: '/images/recipes/thai-milk-tea.jpg' },
    allergens: ['dairy'],
    dietaryTags: ['vegetarian', 'gluten_free']
  },
  {
    slug: 'brown-sugar-boba-milk',
    name: {
      en: 'Brown Sugar Boba Milk',
      vi: 'Sữa Tươi Trân Châu Đường Đen',
      ko: '흑당 버블밀크',
      zh: '黑糖珍珠鮮奶'
    },
    description: {
      en: 'Fresh milk with chewy tapioca pearls coated in caramelized brown sugar. The tiger stripe effect makes it Instagram-worthy.',
      vi: 'Sữa tươi với trân châu dẻo dai phủ đường đen caramel. Hiệu ứng vằn hổ tạo nên ly đồ uống hoàn hảo cho Instagram.'
    },
    category: 'milkshakes',
    tags: ['boba', 'trending', 'instagram', 'taiwanese'],
    cuisineTypes: ['taiwanese'],
    servings: 1,
    servingSize: '500ml',
    prepTime: 10,
    cookTime: 20,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Cook tapioca pearls until chewy (20 min)', vi: 'Nấu trân châu cho đến khi dẻo (20 phút)' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Coat pearls in hot brown sugar syrup', vi: 'Phủ trân châu trong siro đường đen nóng' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Drizzle syrup inside glass to create tiger stripes', vi: 'Rưới siro bên trong ly tạo vằn hổ' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Add ice, pour fresh milk, add boba', vi: 'Cho đá, đổ sữa tươi, thêm trân châu' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 60000, region: 'vietnam' }
    ],
    foodCostPercentage: 25,
    images: { primary: '/images/recipes/brown-sugar-boba.jpg' },
    allergens: ['dairy'],
    dietaryTags: ['vegetarian', 'gluten_free']
  }
];

// ============================================================================
// SMOOTHIE RECIPES
// ============================================================================

export const smoothieRecipes: Partial<MasterRecipe>[] = [
  {
    slug: 'tropical-smoothie-bowl',
    name: {
      en: 'Tropical Smoothie Bowl',
      vi: 'Bowl Sinh Tố Nhiệt Đới',
      ko: '트로피컬 스무디 볼'
    },
    description: {
      en: 'Thick frozen blend of mango, pineapple, and banana topped with fresh fruits, granola, coconut flakes, and honey.',
      vi: 'Hỗn hợp đông lạnh đặc sệt từ xoài, dứa và chuối, phủ trái cây tươi, granola, dừa nạo và mật ong.'
    },
    category: 'smoothies',
    tags: ['healthy', 'breakfast', 'instagram', 'vegan-option'],
    servings: 1,
    servingSize: '400ml',
    prepTime: 10,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Blend frozen mango, pineapple, banana with coconut milk until thick', vi: 'Xay xoài đông lạnh, dứa, chuối với sữa dừa cho đến khi đặc' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Pour into bowl', vi: 'Đổ ra bát' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Arrange toppings in rows: fresh fruit, granola, coconut, chia seeds', vi: 'Xếp topping thành hàng: trái cây tươi, granola, dừa, hạt chia' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Drizzle with honey', vi: 'Rưới mật ong' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 85000, region: 'vietnam' }
    ],
    foodCostPercentage: 30,
    images: { primary: '/images/recipes/tropical-bowl.jpg' },
    allergens: [],
    dietaryTags: ['vegetarian', 'gluten_free', 'dairy_free']
  },
  {
    slug: 'avocado-smoothie',
    name: {
      en: 'Vietnamese Avocado Smoothie',
      vi: 'Sinh Tố Bơ',
      ko: '베트남 아보카도 스무디'
    },
    description: {
      en: 'Creamy avocado blended with condensed milk - a beloved Vietnamese street drink. Rich, sweet, and satisfying.',
      vi: 'Bơ béo mịn xay với sữa đặc - thức uống đường phố được yêu thích ở Việt Nam. Đậm đà, ngọt ngào và thỏa mãn.'
    },
    category: 'smoothies',
    tags: ['vietnamese', 'classic', 'creamy', 'healthy-fats'],
    cuisineTypes: ['vietnamese'],
    servings: 1,
    servingSize: '350ml',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Scoop ripe avocado flesh into blender', vi: 'Múc thịt bơ chín vào máy xay' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Add condensed milk and ice', vi: 'Thêm sữa đặc và đá' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Blend until smooth and creamy', vi: 'Xay cho đến khi mịn và béo' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 50000, region: 'vietnam' }
    ],
    foodCostPercentage: 28,
    images: { primary: '/images/recipes/avocado-smoothie.jpg' },
    allergens: ['dairy'],
    dietaryTags: ['vegetarian', 'gluten_free', 'keto']
  },
  {
    slug: 'green-detox-smoothie',
    name: {
      en: 'Green Detox Smoothie',
      vi: 'Sinh Tố Detox Xanh',
      ko: '그린 디톡스 스무디'
    },
    description: {
      en: 'Energizing blend of spinach, kale, banana, and pineapple. Packed with vitamins and tastes surprisingly sweet.',
      vi: 'Hỗn hợp năng lượng từ rau bina, cải xoăn, chuối và dứa. Giàu vitamin và có vị ngọt bất ngờ.'
    },
    category: 'smoothies',
    tags: ['healthy', 'detox', 'vegan', 'green'],
    servings: 1,
    servingSize: '400ml',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Add spinach and kale to blender', vi: 'Cho rau bina và cải xoăn vào máy xay' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Add frozen banana, pineapple, and coconut water', vi: 'Thêm chuối đông lạnh, dứa và nước dừa' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Blend until smooth', vi: 'Xay cho đến khi mịn' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 65000, region: 'vietnam' }
    ],
    foodCostPercentage: 32,
    images: { primary: '/images/recipes/green-smoothie.jpg' },
    allergens: [],
    dietaryTags: ['vegan', 'gluten_free', 'dairy_free', 'raw']
  }
];

// ============================================================================
// FOOD RECIPES
// ============================================================================

export const foodRecipes: Partial<MasterRecipe>[] = [
  {
    slug: 'avocado-toast',
    name: {
      en: 'Avocado Toast',
      vi: 'Bánh Mì Nướng Bơ',
      ko: '아보카도 토스트'
    },
    description: {
      en: 'Sourdough toast topped with smashed avocado, cherry tomatoes, microgreens, and a poached egg. Finished with everything bagel seasoning.',
      vi: 'Bánh mì chua nướng phủ bơ nghiền, cà chua bi, rau mầm và trứng chần. Rắc gia vị bánh bagel.'
    },
    category: 'breakfast',
    tags: ['healthy', 'instagram', 'brunch', 'protein'],
    servings: 1,
    prepTime: 10,
    cookTime: 5,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Toast sourdough bread until golden', vi: 'Nướng bánh mì chua đến vàng' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Smash avocado with lemon juice, salt, pepper', vi: 'Nghiền bơ với nước chanh, muối, tiêu' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Poach egg for 3 minutes', vi: 'Chần trứng trong 3 phút' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Assemble: toast, avocado, egg, tomatoes, microgreens', vi: 'Lắp ráp: bánh mì, bơ, trứng, cà chua, rau mầm' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 95000, region: 'vietnam' }
    ],
    foodCostPercentage: 30,
    images: { primary: '/images/recipes/avocado-toast.jpg' },
    allergens: ['gluten', 'eggs'],
    dietaryTags: ['vegetarian']
  },
  {
    slug: 'acai-bowl',
    name: {
      en: 'Açaí Bowl',
      vi: 'Bowl Açaí',
      ko: '아사이 볼'
    },
    description: {
      en: 'Thick açaí base topped with banana, strawberries, blueberries, granola, coconut, and honey. A Brazilian superfood breakfast.',
      vi: 'Lớp açaí đặc phủ chuối, dâu tây, việt quất, granola, dừa và mật ong. Bữa sáng siêu thực phẩm Brazil.'
    },
    category: 'breakfast',
    tags: ['superfood', 'healthy', 'brazilian', 'instagram'],
    cuisineTypes: ['brazilian'],
    servings: 1,
    prepTime: 10,
    cookTime: 0,
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Blend frozen açaí pack with banana and splash of oat milk', vi: 'Xay gói açaí đông lạnh với chuối và chút sữa yến mạch' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Pour thick blend into bowl', vi: 'Đổ hỗn hợp đặc vào bát' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Arrange toppings beautifully', vi: 'Xếp topping đẹp mắt' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 95000, region: 'vietnam' }
    ],
    foodCostPercentage: 35,
    images: { primary: '/images/recipes/acai-bowl.jpg' },
    allergens: [],
    dietaryTags: ['vegan', 'gluten_free', 'dairy_free']
  },
  {
    slug: 'banh-mi-sandwich',
    name: {
      en: 'Bánh Mì Sandwich',
      vi: 'Bánh Mì Thịt',
      ko: '반미 샌드위치'
    },
    description: {
      en: 'Crispy Vietnamese baguette filled with savory grilled pork, pâté, pickled vegetables, fresh herbs, and chili. The world\'s best sandwich.',
      vi: 'Bánh mì giòn nhân thịt nướng, pate, đồ chua, rau thơm và ớt. Món bánh mì ngon nhất thế giới.'
    },
    category: 'sandwiches',
    tags: ['vietnamese', 'classic', 'street-food', 'bestseller'],
    cuisineTypes: ['vietnamese'],
    servings: 1,
    prepTime: 10,
    cookTime: 10,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Toast baguette until crispy outside, soft inside', vi: 'Nướng bánh mì giòn ngoài, mềm trong' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Spread pâté and mayonnaise', vi: 'Phết pate và mayonnaise' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Layer grilled pork, pickled carrots/daikon', vi: 'Xếp thịt nướng, đồ chua' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Add cilantro, cucumber, chili, drizzle with soy sauce', vi: 'Thêm ngò, dưa chuột, ớt, rưới xì dầu' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 45000, region: 'vietnam' }
    ],
    foodCostPercentage: 28,
    images: { primary: '/images/recipes/banh-mi.jpg' },
    allergens: ['gluten', 'eggs', 'soybeans'],
    dietaryTags: []
  }
];

// ============================================================================
// DESSERT RECIPES
// ============================================================================

export const dessertRecipes: Partial<MasterRecipe>[] = [
  {
    slug: 'tiramisu',
    name: {
      en: 'Tiramisu',
      vi: 'Tiramisu',
      ko: '티라미수',
      it: 'Tiramisù'
    },
    description: {
      en: 'Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa.',
      vi: 'Món tráng miệng Ý cổ điển với các lớp bánh quy ngâm espresso và kem mascarpone, phủ cacao.'
    },
    category: 'desserts',
    tags: ['italian', 'classic', 'coffee', 'indulgent'],
    cuisineTypes: ['italian'],
    servings: 6,
    prepTime: 30,
    cookTime: 0,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Beat egg yolks with sugar until pale', vi: 'Đánh lòng đỏ trứng với đường cho đến khi nhạt màu' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Fold in mascarpone cheese', vi: 'Trộn nhẹ phô mai mascarpone' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Dip ladyfingers in espresso, layer in dish', vi: 'Nhúng bánh quy vào espresso, xếp lớp trong đĩa' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Alternate layers, refrigerate 4+ hours', vi: 'Xếp xen kẽ các lớp, để tủ lạnh 4+ giờ' }
      },
      {
        stepNumber: 5,
        instruction: { en: 'Dust with cocoa powder before serving', vi: 'Rắc bột cacao trước khi dọn' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 75000, region: 'vietnam' }
    ],
    foodCostPercentage: 28,
    images: { primary: '/images/recipes/tiramisu.jpg' },
    allergens: ['eggs', 'dairy', 'gluten'],
    dietaryTags: ['vegetarian']
  },
  {
    slug: 'mango-sticky-rice',
    name: {
      en: 'Mango Sticky Rice',
      vi: 'Xôi Xoài',
      ko: '망고 찹쌀밥',
      th: 'ข้าวเหนียวมะม่วง'
    },
    description: {
      en: 'Sweet coconut sticky rice served with fresh ripe mango and drizzled with coconut cream. A beloved Thai dessert.',
      vi: 'Xôi nếp dừa ngọt dọn với xoài chín tươi và rưới kem dừa. Món tráng miệng Thái được yêu thích.'
    },
    category: 'desserts',
    tags: ['thai', 'tropical', 'coconut', 'seasonal'],
    cuisineTypes: ['thai'],
    servings: 2,
    prepTime: 20,
    cookTime: 30,
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        instruction: { en: 'Soak sticky rice 4+ hours, steam until tender', vi: 'Ngâm nếp 4+ giờ, hấp cho mềm' }
      },
      {
        stepNumber: 2,
        instruction: { en: 'Mix hot rice with coconut milk, sugar, salt', vi: 'Trộn nếp nóng với nước cốt dừa, đường, muối' }
      },
      {
        stepNumber: 3,
        instruction: { en: 'Let rice absorb coconut mixture (15 min)', vi: 'Để nếp hấp thụ hỗn hợp dừa (15 phút)' }
      },
      {
        stepNumber: 4,
        instruction: { en: 'Serve with sliced mango, drizzle with coconut cream', vi: 'Dọn với xoài lát, rưới kem dừa' }
      }
    ],
    suggestedPrice: [
      { currency: 'VND', amount: 65000, region: 'vietnam' }
    ],
    foodCostPercentage: 25,
    images: { primary: '/images/recipes/mango-sticky-rice.jpg' },
    allergens: [],
    dietaryTags: ['vegan', 'gluten_free', 'dairy_free']
  }
];

// ============================================================================
// EXPORT ALL RECIPES
// ============================================================================

export const allRecipes: Partial<MasterRecipe>[] = [
  ...coffeeRecipes,
  ...teaRecipes,
  ...smoothieRecipes,
  ...foodRecipes,
  ...dessertRecipes
];

export default allRecipes;
