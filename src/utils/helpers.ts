import { Meal, Cocktail } from '../types/api';

export const extractIngredients = (recipe: Meal | Cocktail): { ingredient: string; measure: string }[] => {
  const ingredients: { ingredient: string; measure: string }[] = [];

  // Loop from 1 to 20 (max ingredients)
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof (Meal | Cocktail);
    const measureKey = `strMeasure${i}` as keyof (Meal | Cocktail);
    
    const ingredient = recipe[ingredientKey] as string;
    const measure = recipe[measureKey] as string;
    
    // Only add if ingredient exists and is not empty
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure ? measure : ''
      });
    }
  }

  return ingredients;
};

export const getRandomItems = <T>(array: T[], count: number): T[] => {
  if (!array || array.length === 0) return [];
  if (array.length <= count) return array;
  
  const result: T[] = [];
  const copyArray = [...array];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    result.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  
  return result;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateLetterArray = (): string[] => {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
};

export const formatFilterName = (name: string): string => {
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(func(...args));
      }, waitFor);
    });
  };
};