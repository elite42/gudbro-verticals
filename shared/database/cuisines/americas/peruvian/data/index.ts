// ============================================
// Peruvian Database - Data Index
// GUDBRO Database Standards v1.2
// ============================================

import { cevichesItems } from './ceviches';
import { causasItems } from './causas';
import { anticuchosItems } from './anticuchos';
import { mainDishesItems } from './main-dishes';
import { riceDishesItems } from './rice-dishes';
import { nikkeiItems } from './nikkei';
import { andeanAmazonianItems } from './andean-amazonian';
import { soupsSeafoodItems } from './soups-seafood';
import { dessertsDrinksItems } from './desserts-drinks';
import { PeruvianItem } from '../types';

// Export individual collections
export {
  cevichesItems,
  causasItems,
  anticuchosItems,
  mainDishesItems,
  riceDishesItems,
  nikkeiItems,
  andeanAmazonianItems,
  soupsSeafoodItems,
  dessertsDrinksItems
};

// Combined export of all Peruvian items
export const allPeruvianItems: PeruvianItem[] = [
  ...cevichesItems,      // 12 items (6 ceviches + 6 tiraditos)
  ...causasItems,        // 8 items
  ...anticuchosItems,    // 18 items (8 anticuchos + 10 street food)
  ...mainDishesItems,    // 14 items (4 saltados + 10 criollo)
  ...riceDishesItems,    // 18 items (4 rice + 14 chifa)
  ...nikkeiItems,        // 12 items
  ...andeanAmazonianItems, // 18 items (10 andean + 8 amazonian)
  ...soupsSeafoodItems,  // 18 items (10 soups + 8 seafood)
  ...dessertsDrinksItems // 18 items (8 desserts + 10 drinks)
];

// Category breakdown for documentation
export const peruvianStats = {
  ceviches: cevichesItems.filter(i => i.category === 'ceviches').length,
  tiraditos: cevichesItems.filter(i => i.category === 'tiraditos').length,
  causas: causasItems.length,
  anticuchos: anticuchosItems.filter(i => i.category === 'anticuchos').length,
  street_food: anticuchosItems.filter(i => i.category === 'street_food').length,
  main_dishes: mainDishesItems.filter(i => i.category === 'main_dishes').length,
  criollo: mainDishesItems.filter(i => i.category === 'criollo').length,
  chifa: riceDishesItems.filter(i => i.category === 'chifa').length,
  rice_dishes: riceDishesItems.filter(i => i.category === 'rice_dishes').length,
  nikkei: nikkeiItems.length,
  andean: andeanAmazonianItems.filter(i => i.category === 'andean').length,
  amazonian: andeanAmazonianItems.filter(i => i.category === 'amazonian').length,
  soups: soupsSeafoodItems.filter(i => i.category === 'soups').length,
  seafood: soupsSeafoodItems.filter(i => i.category === 'seafood').length,
  desserts: dessertsDrinksItems.filter(i => i.category === 'desserts').length,
  drinks: dessertsDrinksItems.filter(i => i.category === 'drinks').length,
  total: allPeruvianItems.length
};

export default allPeruvianItems;
