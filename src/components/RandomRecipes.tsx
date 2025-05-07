import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Meal, Cocktail } from '../types/api';
import { getRandomMeal, getRandomCocktail } from '../services/api';
import RecipeCard from './RecipeCard';
import { Shuffle } from 'lucide-react';

interface RandomRecipesProps {
  type: 'meal' | 'cocktail' | 'both';
  count?: number;
}

const RandomRecipes: React.FC<RandomRecipesProps> = ({ type, count = 4 }) => {
  const [recipes, setRecipes] = useState<(Meal | Cocktail)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomRecipes = async () => {
    setIsLoading(true);
    try {
      const fetchedRecipes: (Meal | Cocktail)[] = [];
      
      if (type === 'meal' || type === 'both') {
        for (let i = 0; i < (type === 'both' ? count / 2 : count); i++) {
          const mealResponse = await getRandomMeal();
          if (mealResponse.meals && mealResponse.meals.length > 0) {
            fetchedRecipes.push(mealResponse.meals[0]);
          }
        }
      }
      
      if (type === 'cocktail' || type === 'both') {
        for (let i = 0; i < (type === 'both' ? count / 2 : count); i++) {
          const cocktailResponse = await getRandomCocktail();
          if (cocktailResponse.drinks && cocktailResponse.drinks.length > 0) {
            fetchedRecipes.push(cocktailResponse.drinks[0]);
          }
        }
      }
      
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, [type, count]);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {type === 'both' ? 'Feeling Lucky?' : type === 'meal' ? 'Random Meals' : 'Random Cocktails'}
        </h2>
        <motion.button
          onClick={fetchRandomRecipes}
          className="flex items-center gap-2 px-3 py-2 bg-red-900/50 hover:bg-red-800 text-white rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle size={16} />
          <span>Refresh</span>
        </motion.button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(count)].map((_, index) => (
            <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg animate-pulse">
              <div className="w-full h-48 bg-gray-800"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => {
            const recipeType = 'idMeal' in recipe ? 'meal' : 'cocktail';
            const id = recipeType === 'meal' ? (recipe as Meal).idMeal : (recipe as Cocktail).idDrink;
            
            return (
              <RecipeCard 
                key={`${id}-${index}`} 
                recipe={recipe} 
                type={recipeType} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RandomRecipes;