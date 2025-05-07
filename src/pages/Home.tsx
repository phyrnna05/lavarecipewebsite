import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import RandomRecipes from '../components/RandomRecipes';
import RecipeGrid from '../components/RecipeGrid';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Meal, Cocktail } from '../types/api';
import { getMealsByCategory, getCocktailsByCategory } from '../services/api';

const Home: React.FC = () => {
  const [popularMeals, setPopularMeals] = useState<Meal[]>([]);
  const [popularCocktails, setPopularCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      setIsLoading(true);
      try {
        // Fetch some popular categories
        const mealsResponse = await getMealsByCategory('Seafood');
        const cocktailsResponse = await getCocktailsByCategory('Cocktail');
        
        if (mealsResponse.meals) {
          // Get up to 4 random meals
          const randomMeals = mealsResponse.meals
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setPopularMeals(randomMeals);
        }
        
        if (cocktailsResponse.drinks) {
          // Get up to 4 random cocktails
          const randomCocktails = cocktailsResponse.drinks
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setPopularCocktails(randomCocktails);
        }
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPopularRecipes();
  }, []);
  
  return (
    <div>
      <HeroSection />
      
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Random Recipe Suggestions */}
          <RandomRecipes type="both" count={4} />
          
          {/* Featured Meals Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Meals</h2>
              <Link 
                to="/meals" 
                className="flex items-center text-red-500 hover:text-red-400 transition-colors"
              >
                <span className="mr-1">View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <RecipeGrid 
              recipes={popularMeals} 
              type="meal" 
              isLoading={isLoading} 
            />
          </motion.div>
          
          {/* Featured Cocktails Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Cocktails</h2>
              <Link 
                to="/cocktails" 
                className="flex items-center text-red-500 hover:text-red-400 transition-colors"
              >
                <span className="mr-1">View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <RecipeGrid 
              recipes={popularCocktails} 
              type="cocktail" 
              isLoading={isLoading} 
            />
          </motion.div>
          
          {/* Category Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Explore Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryCard 
                title="Meal Categories" 
                description="Browse meals by cuisine, ingredients, or dish type" 
                image="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg"
                link="/meals"
              />
              <CategoryCard 
                title="Cocktail Collection" 
                description="Discover cocktails by type, ingredients, or glass" 
                image="https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg"
                link="/cocktails"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, link }) => {
  return (
    <Link to={link}>
      <motion.div 
        className="relative h-64 rounded-xl overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative h-full flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <motion.div 
            className="inline-flex items-center text-red-500 font-medium group-hover:text-white transition-colors"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            Explore <ArrowRight size={16} className="ml-1" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Home;