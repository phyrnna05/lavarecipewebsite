import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  
  if (favorites.length === 0) {
    return (
      <div className="bg-black min-h-screen pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="flex flex-col items-center justify-center text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart size={48} className="text-gray-700 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">No Favorites Yet</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              You haven't added any recipes to your favorites. Explore meals and cocktails and save your favorites here.
            </p>
            <div className="flex gap-4">
              <Link to="/meals">
                <motion.button
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Meals
                </motion.button>
              </Link>
              <Link to="/cocktails">
                <motion.button
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Cocktails
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Group favorites by type
  const mealFavorites = favorites.filter(item => item.type === 'meal');
  const cocktailFavorites = favorites.filter(item => item.type === 'cocktail');

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Favorites
        </motion.h1>
        
        {mealFavorites.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Favorite Meals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mealFavorites.map(item => (
                <FavoriteCard 
                  key={item.id} 
                  item={item} 
                  onRemove={() => removeFavorite(item.id)} 
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {cocktailFavorites.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Favorite Cocktails</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cocktailFavorites.map(item => (
                <FavoriteCard 
                  key={item.id} 
                  item={item} 
                  onRemove={() => removeFavorite(item.id)} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface FavoriteCardProps {
  item: {
    id: string;
    type: 'meal' | 'cocktail';
    name: string;
    image: string;
  };
  onRemove: () => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ item, onRemove }) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl h-full transition-transform duration-300 hover:shadow-red-900/30 hover:shadow-lg group">
        <div className="relative overflow-hidden">
          {/* Lava effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Favorite button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-red-900/80"
          >
            <Heart size={18} className="fill-red-500 text-red-500" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium bg-red-900/60 text-white px-2 py-1 rounded-md capitalize">
              {item.type}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4 line-clamp-2 group-hover:text-red-400 transition-colors">
            {item.name}
          </h3>
          
          <Link to={`/${item.type}/${item.id}`}>
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm text-red-500 font-medium group-hover:text-red-400 transition-colors flex items-center">
                View Recipe <ArrowRight size={16} className="ml-1" />
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Favorites;