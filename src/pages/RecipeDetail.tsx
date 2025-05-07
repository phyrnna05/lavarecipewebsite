import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Youtube } from 'lucide-react';
import { Meal, Cocktail } from '../types/api';
import { getMealById, getCocktailById } from '../services/api';
import { extractIngredients } from '../utils/helpers';
import { useFavorites } from '../context/FavoritesContext';
import RandomRecipes from '../components/RandomRecipes';

const RecipeDetail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [recipe, setRecipe] = useState<Meal | Cocktail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        if (type === 'meal' && id) {
          const response = await getMealById(id);
          if (response.meals && response.meals.length > 0) {
            setRecipe(response.meals[0]);
          }
        } else if (type === 'cocktail' && id) {
          const response = await getCocktailById(id);
          if (response.drinks && response.drinks.length > 0) {
            setRecipe(response.drinks[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipe();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [type, id]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!recipe) {
    return (
      <div className="bg-black min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Recipe Not Found</h2>
            <p className="text-gray-400 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isMeal = type === 'meal';
  const title = isMeal ? (recipe as Meal).strMeal : (recipe as Cocktail).strDrink;
  const image = isMeal ? (recipe as Meal).strMealThumb : (recipe as Cocktail).strDrinkThumb || '';
  const instructions = isMeal ? (recipe as Meal).strInstructions : (recipe as Cocktail).strInstructions || '';
  const category = isMeal ? (recipe as Meal).strCategory : (recipe as Cocktail).strCategory || '';
  const youtubeLink = isMeal ? (recipe as Meal).strYoutube : '';
  const area = isMeal ? (recipe as Meal).strArea : '';
  const alcoholic = !isMeal ? (recipe as Cocktail).strAlcoholic : '';
  const glass = !isMeal ? (recipe as Cocktail).strGlass : '';
  
  const ingredients = extractIngredients(recipe);
  const isFav = isFavorite(id || '');

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(id || '');
    } else {
      addFavorite(recipe, type as 'meal' | 'cocktail');
    }
  };

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Recipe Header */}
      <div 
        className="relative w-full h-[40vh] min-h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/${type === 'meal' ? 'meals' : 'cocktails'}`} className="inline-flex items-center text-gray-400 hover:text-white mb-2">
                    <ArrowLeft size={16} className="mr-1" />
                    Back to {type === 'meal' ? 'Meals' : 'Cocktails'}
                  </Link>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {category && (
                      <span className="text-xs font-medium bg-red-900/60 text-white px-2 py-1 rounded-md">
                        {category}
                      </span>
                    )}
                    {area && (
                      <span className="text-xs font-medium bg-gray-800 text-gray-200 px-2 py-1 rounded-md">
                        {area}
                      </span>
                    )}
                    {alcoholic && (
                      <span className="text-xs font-medium bg-gray-800 text-gray-200 px-2 py-1 rounded-md">
                        {alcoholic}
                      </span>
                    )}
                    {glass && (
                      <span className="text-xs font-medium bg-gray-800 text-gray-200 px-2 py-1 rounded-md">
                        {glass}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button 
                  onClick={toggleFavorite}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${isFav 
                    ? 'bg-red-800/70 text-white' 
                    : 'bg-gray-800/70 text-white hover:bg-red-900/70'}`}
                >
                  <Heart size={18} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                  <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
                </button>
                
                {youtubeLink && (
                  <a 
                    href={youtubeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Youtube size={18} />
                    <span>Watch Video</span>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="bg-red-900/50 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-medium text-white">{item.ingredient}</span>
                      {item.measure && (
                        <span className="text-gray-400 ml-2">{item.measure}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Right Column: Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Instructions</h2>
              <div className="prose prose-invert max-w-none">
                {instructions.split('\r\n').filter(Boolean).map((instruction, index) => (
                  <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                    {instruction}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img 
                  src={image} 
                  alt={title} 
                  className="rounded-xl w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
                {/* Show a different angle or related image if available */}
                <img 
                  src={image} 
                  alt={`${title} - prepared`} 
                  className="rounded-xl w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Related Recipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <RandomRecipes type={type as 'meal' | 'cocktail'} count={4} />
        </motion.div>
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Header Skeleton */}
      <div className="relative w-full h-[40vh] min-h-[300px] bg-gray-900 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="h-4 w-32 bg-gray-800 rounded mb-4"></div>
            <div className="flex gap-2 mb-2">
              <div className="h-6 w-16 bg-gray-800 rounded-md"></div>
              <div className="h-6 w-20 bg-gray-800 rounded-md"></div>
            </div>
            <div className="h-10 w-3/4 bg-gray-800 rounded-md"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="h-8 w-1/3 bg-gray-800 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-gray-800 w-6 h-6 rounded-full"></div>
                    <div className="h-6 w-full bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Instructions Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mb-8">
              <div className="h-8 w-1/3 bg-gray-800 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-4 w-full bg-gray-800 rounded mb-2"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;