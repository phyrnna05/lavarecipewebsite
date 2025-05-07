import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import { searchMealsByName, searchCocktailsByName } from '../services/api';
import { Meal, Cocktail } from '../types/api';
import { Table as Tab } from 'lucide-react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'meals' | 'cocktails'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    meals: Meal[];
    cocktails: Cocktail[];
  }>({
    meals: [],
    cocktails: []
  });

  useEffect(() => {
    if (!searchTerm) {
      setResults({ meals: [], cocktails: [] });
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // Fetch based on active tab
        let mealsResponse = { meals: null };
        let cocktailsResponse = { drinks: null };

        if (activeTab === 'all' || activeTab === 'meals') {
          mealsResponse = await searchMealsByName(searchTerm);
        }

        if (activeTab === 'all' || activeTab === 'cocktails') {
          cocktailsResponse = await searchCocktailsByName(searchTerm);
        }

        setResults({
          meals: mealsResponse.meals || [],
          cocktails: cocktailsResponse.drinks || []
        });
      } catch (error) {
        console.error('Error searching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, activeTab]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const totalResults = results.meals.length + results.cocktails.length;

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Search for Recipes
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect meal or cocktail by searching our extensive collection of recipes from around the world.
          </p>
        </motion.div>

        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search for meals or cocktails..." 
        />

        {/* Search Tabs */}
        <div className="mb-8">
          <div className="flex justify-center border-b border-gray-800">
            <TabButton 
              label="All Recipes" 
              isActive={activeTab === 'all'} 
              onClick={() => setActiveTab('all')} 
            />
            <TabButton 
              label="Meals" 
              isActive={activeTab === 'meals'} 
              onClick={() => setActiveTab('meals')} 
            />
            <TabButton 
              label="Cocktails" 
              isActive={activeTab === 'cocktails'} 
              onClick={() => setActiveTab('cocktails')} 
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              {isLoading 
                ? 'Searching...' 
                : totalResults > 0 
                  ? `Found ${totalResults} results for "${searchTerm}"` 
                  : `No results found for "${searchTerm}"`
              }
            </h2>
          </motion.div>
        )}

        {/* Display Meals */}
        {(activeTab === 'all' || activeTab === 'meals') && results.meals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Meals</h3>
            <RecipeGrid 
              recipes={results.meals} 
              type="meal" 
              isLoading={isLoading && (activeTab === 'all' || activeTab === 'meals')}
            />
          </motion.div>
        )}

        {/* Display Cocktails */}
        {(activeTab === 'all' || activeTab === 'cocktails') && results.cocktails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Cocktails</h3>
            <RecipeGrid 
              recipes={results.cocktails} 
              type="cocktail" 
              isLoading={isLoading && (activeTab === 'all' || activeTab === 'cocktails')}
            />
          </motion.div>
        )}

        {/* No Results Message */}
        {searchTerm && !isLoading && totalResults === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Tab size={48} className="text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
            <p className="text-gray-400 max-w-md">
              Try adjusting your search terms or exploring our categories for more recipes.
            </p>
          </motion.div>
        )}

        {/* Search Suggestions */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Popular Search Suggestions</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <SearchChip label="Chicken" onClick={() => handleSearch('Chicken')} />
              <SearchChip label="Pasta" onClick={() => handleSearch('Pasta')} />
              <SearchChip label="Vegetarian" onClick={() => handleSearch('Vegetarian')} />
              <SearchChip label="Seafood" onClick={() => handleSearch('Seafood')} />
              <SearchChip label="Margarita" onClick={() => handleSearch('Margarita')} />
              <SearchChip label="Mojito" onClick={() => handleSearch('Mojito')} />
              <SearchChip label="Dessert" onClick={() => handleSearch('Dessert')} />
              <SearchChip label="Soup" onClick={() => handleSearch('Soup')} />
              <SearchChip label="Gin" onClick={() => handleSearch('Gin')} />
              <SearchChip label="Vodka" onClick={() => handleSearch('Vodka')} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 text-sm font-medium ${
        isActive ? 'text-red-500' : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeSearchTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
          initial={false}
        />
      )}
    </button>
  );
};

interface SearchChipProps {
  label: string;
  onClick: () => void;
}

const SearchChip: React.FC<SearchChipProps> = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2 bg-gray-900 hover:bg-red-900/50 text-white rounded-full transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
};

export default Search;