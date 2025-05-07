import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Mail, Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Utensils size={24} className="text-red-500" />
              <h2 className="text-xl font-bold text-white">Lava<span className="text-red-500">Recipes</span></h2>
            </Link>
            <p className="mb-4">
              Discover delicious recipes and cocktails from around the world. Filter by ingredients, categories, 
              and more to find your next culinary adventure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/meals" className="hover:text-red-500 transition-colors">Meals</Link>
              </li>
              <li>
                <Link to="/cocktails" className="hover:text-red-500 transition-colors">Cocktails</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-red-500 transition-colors">Favorites</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-red-500 transition-colors">Search</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="mb-4">
              LavaRecipes uses TheMealDB and TheCocktailDB APIs to provide a comprehensive collection of recipes. 
              All recipes and images are sourced from these databases.
            </p>
            <p>
              <a 
                href="https://www.themealdb.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                TheMealDB
              </a>
              {' & '}
              <a 
                href="https://www.thecocktaildb.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                TheCocktailDB
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> by LavaRecipes &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;