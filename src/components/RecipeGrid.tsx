import React from 'react';
import { Meal, Cocktail } from '../types/api';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

interface RecipeGridProps {
  recipes: (Meal | Cocktail)[];
  type: 'meal' | 'cocktail';
  isLoading?: boolean;
  emptyMessage?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  type, 
  isLoading = false,
  emptyMessage = 'No recipes found'
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filters
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => {
        const id = type === 'meal' 
          ? (recipe as Meal).idMeal 
          : (recipe as Cocktail).idDrink;
        
        return (
          <RecipeCard key={id} recipe={recipe} type={type} />
        );
      })}
    </div>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg animate-pulse">
          <div className="w-full h-48 bg-gray-800"></div>
          <div className="p-4">
            <div className="flex gap-2 mb-2">
              <div className="h-6 w-16 bg-gray-800 rounded-md"></div>
              <div className="h-6 w-20 bg-gray-800 rounded-md"></div>
            </div>
            <div className="h-6 w-full bg-gray-800 rounded-md mb-2"></div>
            <div className="h-6 w-2/3 bg-gray-800 rounded-md"></div>
            <div className="mt-4 flex justify-end">
              <div className="h-5 w-24 bg-gray-800 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;