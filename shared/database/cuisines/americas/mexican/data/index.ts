// ============================================
// MEXICAN Data Index - GUDBRO Database Standards v1.1
// ============================================

import { tacosItems } from './tacos';
import { burritosItems } from './burritos';
import { enchiladasItems } from './enchiladas';
import { antojitosItems } from './antojitos';
import { mainDishesItems } from './main-dishes';
import { sidesSalsasItems } from './sides-salsas';

// Export individual collections
export {
  tacosItems,
  burritosItems,
  enchiladasItems,
  antojitosItems,
  mainDishesItems,
  sidesSalsasItems
};

// Export combined collection
export const allMexican = [
  ...tacosItems,
  ...burritosItems,
  ...enchiladasItems,
  ...antojitosItems,
  ...mainDishesItems,
  ...sidesSalsasItems,
];

// Statistics
export const mexicanStats = {
  total: allMexican.length,
  byCategory: {
    tacos: tacosItems.length,
    burritos: burritosItems.length,
    enchiladas: enchiladasItems.length,
    antojitos: antojitosItems.length,
    main_dishes: mainDishesItems.length,
    sides_salsas: sidesSalsasItems.length,
  },
  byRegion: {
    central: allMexican.filter(i => i.region === 'central').length,
    northern: allMexican.filter(i => i.region === 'northern').length,
    yucatan: allMexican.filter(i => i.region === 'yucatan').length,
    oaxaca: allMexican.filter(i => i.region === 'oaxaca').length,
    western: allMexican.filter(i => i.region === 'western').length,
    coastal: allMexican.filter(i => i.region === 'coastal').length,
    tex_mex: allMexican.filter(i => i.region === 'tex_mex').length,
    international: allMexican.filter(i => i.region === 'international').length,
  },
  byProtein: {
    pork: allMexican.filter(i => i.protein_type === 'pork').length,
    beef: allMexican.filter(i => i.protein_type === 'beef').length,
    chicken: allMexican.filter(i => i.protein_type === 'chicken').length,
    vegetarian: allMexican.filter(i => i.protein_type === 'vegetarian').length,
    cheese: allMexican.filter(i => i.protein_type === 'cheese').length,
    beans: allMexican.filter(i => i.protein_type === 'beans').length,
    fish: allMexican.filter(i => i.protein_type === 'fish').length,
    shrimp: allMexican.filter(i => i.protein_type === 'shrimp').length,
    mixed: allMexican.filter(i => i.protein_type === 'mixed').length,
    chorizo: allMexican.filter(i => i.protein_type === 'chorizo').length,
    goat: allMexican.filter(i => i.protein_type === 'goat').length,
  },
  vegetarian: allMexican.filter(i => i.is_vegetarian).length,
  vegan: allMexican.filter(i => i.is_vegan).length,
  street_food: allMexican.filter(i => i.is_street_food).length,
};

console.log(`Mexican Database: ${allMexican.length} items loaded`);
console.log('By category:', mexicanStats.byCategory);
