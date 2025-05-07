import React, { useState, useEffect } from 'react';
import { 
  getCocktailCategories,
  getCocktailGlasses,
  getCocktailIngredients,
  getCocktailAlcoholic,
  getCocktailsByCategory,
  getCocktailsByGlass,
  getCocktailsByIngredient,
  getCocktailsByAlcoholic,
  searchCocktailsByName
} from '../services/api';
import { Cocktail, FilterOption } from '../types/api';
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import HeroSection from '../components/HeroSection';
import { formatFilterName } from '../utils/helpers';

const Cocktails: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<{
    categories: FilterOption[];
    glasses: FilterOption[];
    ingredients: FilterOption[];
    alcoholic: FilterOption[];
  }>({
    categories: [],
    glasses: [],
    ingredients: [],
    alcoholic: []
  });
  
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    glass: '',
    ingredient: '',
    alcoholic: ''
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await getCocktailCategories();
        const categories = categoriesResponse.drinks.map(category => ({
          id: category.strCategory.replace(/ /g, '_'),
          name: category.strCategory,
          type: 'category'
        }));
        
        // Fetch glasses
        const glassesResponse = await getCocktailGlasses();
        const glasses = glassesResponse.drinks.map(glass => ({
          id: glass.strGlass.replace(/ /g, '_'),
          name: glass.strGlass,
          type: 'glass'
        }));
        
        // Fetch ingredients (limit to 20 for performance)
        const ingredientsResponse = await getCocktailIngredients();
        const ingredients = ingredientsResponse.drinks
          .slice(0, 20)
          .map(ingredient => ({
            id: ingredient.strIngredient1,
            name: ingredient.strIngredient1,
            type: 'ingredient'
          }));
        
        // Fetch alcoholic options
        const alcoholicResponse = await getCocktailAlcoholic();
        const alcoholic = alcoholicResponse.drinks.map(option => ({
          id: option.strAlcoholic.replace(/ /g, '_'),
          name: option.strAlcoholic,
          type: 'alcoholic'
        }));
        
        setFilters({
          categories,
          glasses,
          ingredients,
          alcoholic
        });
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch cocktails based on filters and search
  useEffect(() => {
    const fetchCocktails = async () => {
      setIsLoading(true);
      try {
        let response;
        
        // Priority: Search > Category > Glass > Ingredient > Alcoholic
        if (searchQuery) {
          response = await searchCocktailsByName(searchQuery);
        } else if (activeFilters.category) {
          response = await getCocktailsByCategory(activeFilters.category);
        } else if (activeFilters.glass) {
          response = await getCocktailsByGlass(activeFilters.glass);
        } else if (activeFilters.ingredient) {
          response = await getCocktailsByIngredient(activeFilters.ingredient);
        } else if (activeFilters.alcoholic) {
          response = await getCocktailsByAlcoholic(activeFilters.alcoholic);
        } else {
          // Default: fetch a popular category
          response = await getCocktailsByCategory('Cocktail');
        }
        
        setCocktails(response.drinks || []);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
        setCocktails([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCocktails();
  }, [searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Clear filters when searching
    if (query) {
      setActiveFilters({
        category: '',
        glass: '',
        ingredient: '',
        alcoholic: ''
      });
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    // Clear other filters when one is selected
    if (value) {
      setActiveFilters({
        category: filterType === 'category' ? value : '',
        glass: filterType === 'glass' ? value : '',
        ingredient: filterType === 'ingredient' ? value : '',
        alcoholic: filterType === 'alcoholic' ? value : ''
      });
      // Clear search when filtering
      setSearchQuery('');
    } else {
      setActiveFilters({
        ...activeFilters,
        [filterType]: value
      });
    }
  };

  // Create a title based on active filters or search
  const generateTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    
    if (activeFilters.category) {
      return `${formatFilterName(activeFilters.category)} Cocktails`;
    }
    
    if (activeFilters.glass) {
      return `Cocktails in ${formatFilterName(activeFilters.glass)}`;
    }
    
    if (activeFilters.ingredient) {
      return `Cocktails with ${formatFilterName(activeFilters.ingredient)}`;
    }
    
    if (activeFilters.alcoholic) {
      return `${formatFilterName(activeFilters.alcoholic)} Drinks`;
    }
    
    return 'Browse Cocktails';
  };

  return (
    <div>
      <HeroSection 
        title="Discover Amazing Cocktails" 
        subtitle="Find the perfect drink for any occasion - from classic cocktails to creative concoctions"
        backgroundImage="https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg"
      />
      
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <SearchBar onSearch={handleSearch} placeholder="Search for cocktails..." />
          
          <FilterBar 
            title={generateTitle()}
            filters={{
              category: filters.categories,
              glass: filters.glasses,
              ingredient: filters.ingredients,
              alcoholic: filters.alcoholic
            }}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
          
          <RecipeGrid 
            recipes={cocktails} 
            type="cocktail" 
            isLoading={isLoading}
            emptyMessage={searchQuery ? `No cocktails found for "${searchQuery}"` : "No cocktails found with selected filters"}
          />
        </div>
      </div>
    </div>
  );
};

export default Cocktails;