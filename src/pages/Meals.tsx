import React, { useState, useEffect } from 'react';
import { 
  getMealCategories, 
  getMealAreas,
  getMealIngredients,
  getMealsByCategory,
  getMealsByArea,
  getMealsByIngredient,
  searchMealsByName
} from '../services/api';
import { Meal, FilterOption } from '../types/api';
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import HeroSection from '../components/HeroSection';
import { formatFilterName } from '../utils/helpers';

const Meals: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<{
    categories: FilterOption[];
    areas: FilterOption[];
    ingredients: FilterOption[];
  }>({
    categories: [],
    areas: [],
    ingredients: []
  });
  
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    area: '',
    ingredient: ''
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await getMealCategories();
        const categories = (categoriesResponse?.meals || []).map(category => ({
          id: category.strCategory,
          name: category.strCategory,
          type: 'category'
        }));
        
        // Fetch areas
        const areasResponse = await getMealAreas();
        const areas = (areasResponse?.meals || []).map(area => ({
          id: area.strArea,
          name: area.strArea,
          type: 'area'
        }));
        
        // Fetch ingredients (limit to 20 for performance)
        const ingredientsResponse = await getMealIngredients();
        const ingredients = (ingredientsResponse?.meals || [])
          .slice(0, 20)
          .map(ingredient => ({
            id: ingredient.strIngredient,
            name: ingredient.strIngredient,
            type: 'ingredient'
          }));
        
        setFilters({
          categories,
          areas,
          ingredients
        });
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch meals based on filters and search
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        let response;
        
        // Priority: Search > Category > Area > Ingredient
        if (searchQuery) {
          response = await searchMealsByName(searchQuery);
        } else if (activeFilters.category) {
          response = await getMealsByCategory(activeFilters.category);
        } else if (activeFilters.area) {
          response = await getMealsByArea(activeFilters.area);
        } else if (activeFilters.ingredient) {
          response = await getMealsByIngredient(activeFilters.ingredient);
        } else {
          // Default: fetch a popular category
          response = await getMealsByCategory('Seafood');
        }
        
        setMeals(response?.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeals();
  }, [searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Clear filters when searching
    if (query) {
      setActiveFilters({
        category: '',
        area: '',
        ingredient: ''
      });
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    // Clear other filters when one is selected
    if (value) {
      setActiveFilters({
        category: filterType === 'category' ? value : '',
        area: filterType === 'area' ? value : '',
        ingredient: filterType === 'ingredient' ? value : ''
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
      return `${formatFilterName(activeFilters.category)} Meals`;
    }
    
    if (activeFilters.area) {
      return `${formatFilterName(activeFilters.area)} Cuisine`;
    }
    
    if (activeFilters.ingredient) {
      return `Meals with ${formatFilterName(activeFilters.ingredient)}`;
    }
    
    return 'Browse Meals';
  };

  return (
    <div>
      <HeroSection 
        title="Explore Delicious Meals" 
        subtitle="Discover recipes from around the world, filter by ingredients, cuisines, and more"
        backgroundImage="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
      />
      
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <SearchBar onSearch={handleSearch} placeholder="Search for meals..." />
          
          <FilterBar 
            title={generateTitle()}
            filters={{
              category: filters.categories,
              area: filters.areas,
              ingredient: filters.ingredients
            }}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
          
          <RecipeGrid 
            recipes={meals} 
            type="meal" 
            isLoading={isLoading}
            emptyMessage={searchQuery ? `No meals found for "${searchQuery}"` : "No meals found with selected filters"}
          />
        </div>
      </div>
    </div>
  );
};

export default Meals;