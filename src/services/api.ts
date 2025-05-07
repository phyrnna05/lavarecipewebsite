import axios from 'axios';
import { 
  MealsResponse, 
  CocktailsResponse, 
  MealCategoriesResponse, 
  CocktailCategoriesResponse 
} from '../types/api';

const MEAL_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const COCKTAIL_API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Meal API calls
export const searchMealsByName = async (name: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/search.php?s=${name}`);
  return response.data;
};

export const getMealsByFirstLetter = async (letter: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/search.php?f=${letter}`);
  return response.data;
};

export const getMealById = async (id: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/lookup.php?i=${id}`);
  return response.data;
};

export const getRandomMeal = async (): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/random.php`);
  return response.data;
};

export const getMealCategories = async (): Promise<MealCategoriesResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/categories.php`);
  return response.data;
};

export const getMealsByCategory = async (category: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/filter.php?c=${category}`);
  return response.data;
};

export const getMealsByArea = async (area: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/filter.php?a=${area}`);
  return response.data;
};

export const getMealsByIngredient = async (ingredient: string): Promise<MealsResponse> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/filter.php?i=${ingredient}`);
  return response.data;
};

export const getMealCategories2 = async (): Promise<{ meals: { strCategory: string }[] }> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/list.php?c=list`);
  return response.data;
};

export const getMealAreas = async (): Promise<{ meals: { strArea: string }[] }> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/list.php?a=list`);
  return response.data;
};

export const getMealIngredients = async (): Promise<{ meals: { strIngredient: string }[] }> => {
  const response = await axios.get(`${MEAL_API_BASE_URL}/list.php?i=list`);
  return response.data;
};

// Cocktail API calls
export const searchCocktailsByName = async (name: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/search.php?s=${name}`);
  return response.data;
};

export const getCocktailsByFirstLetter = async (letter: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/search.php?f=${letter}`);
  return response.data;
};

export const getCocktailById = async (id: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/lookup.php?i=${id}`);
  return response.data;
};

export const getRandomCocktail = async (): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/random.php`);
  return response.data;
};

export const getCocktailsByIngredient = async (ingredient: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/filter.php?i=${ingredient}`);
  return response.data;
};

export const getCocktailsByAlcoholic = async (alcoholic: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/filter.php?a=${alcoholic}`);
  return response.data;
};

export const getCocktailsByCategory = async (category: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/filter.php?c=${category}`);
  return response.data;
};

export const getCocktailsByGlass = async (glass: string): Promise<CocktailsResponse> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/filter.php?g=${glass}`);
  return response.data;
};

export const getCocktailCategories = async (): Promise<{ drinks: { strCategory: string }[] }> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/list.php?c=list`);
  return response.data;
};

export const getCocktailGlasses = async (): Promise<{ drinks: { strGlass: string }[] }> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/list.php?g=list`);
  return response.data;
};

export const getCocktailIngredients = async (): Promise<{ drinks: { strIngredient1: string }[] }> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/list.php?i=list`);
  return response.data;
};

export const getCocktailAlcoholic = async (): Promise<{ drinks: { strAlcoholic: string }[] }> => {
  const response = await axios.get(`${COCKTAIL_API_BASE_URL}/list.php?a=list`);
  return response.data;
};