import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Meal, Cocktail } from '../types/api';
import { truncateText } from '../utils/helpers';
import { useFavorites } from '../context/FavoritesContext';

interface RecipeCardProps {
  recipe: Meal | Cocktail;
  type: 'meal' | 'cocktail';
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, type }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const id = type === 'meal' ? (recipe as Meal).idMeal : (recipe as Cocktail).idDrink;
  const title = type === 'meal' ? (recipe as Meal).strMeal : (recipe as Cocktail).strDrink;
  const image = type === 'meal' 
    ? (recipe as Meal).strMealThumb 
    : (recipe as Cocktail).strDrinkThumb || '';
  
  const category = type === 'meal' 
    ? (recipe as Meal).strCategory 
    : (recipe as Cocktail).strCategory || '';
  
  const subInfo = type === 'meal' 
    ? (recipe as Meal).strArea 
    : (recipe as Cocktail).strAlcoholic || '';

  const isFav = isFavorite(id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite(recipe, type);
    }
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/${type}/${id}`} className="block h-full">
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl h-full transition-transform duration-300 hover:shadow-red-900/30 hover:shadow-lg relative group">
          <div className="relative overflow-hidden">
            {/* Lava effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Favorite button */}
            <button 
              onClick={toggleFavorite}
              className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-red-900/80"
            >
              <Heart 
                size={18} 
                className={`transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs font-medium bg-red-900/60 text-white px-2 py-1 rounded-md">
                {category}
              </span>
              {subInfo && (
                <span className="text-xs font-medium bg-gray-800 text-gray-200 px-2 py-1 rounded-md">
                  {subInfo}
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
              {truncateText(title, 60)}
            </h3>
            
            <motion.div 
              className="mt-4 flex justify-end"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm text-red-500 font-medium group-hover:text-red-400 transition-colors">
                View Recipe →
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;