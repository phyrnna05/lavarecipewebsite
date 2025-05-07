import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title = "Discover Delicious Recipes", 
  subtitle = "Find and filter thousands of meals and cocktails for your next culinary adventure",
  backgroundImage = "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg" 
}) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay with red gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
        
        {/* Animated lava gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-transparent opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/search">
            <motion.button
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2 shadow-lg shadow-red-900/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={18} />
              <span className="font-medium">Search Recipes</span>
            </motion.button>
          </Link>
          <Link to="/meals">
            <motion.button
              className="px-6 py-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full shadow-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default HeroSection;