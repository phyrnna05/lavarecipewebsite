import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Utensils, Wine, Heart, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg py-2' : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="text-red-500"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Utensils size={32} />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Lava<span className="text-red-500">Recipes</span>
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<Home size={18} />} label="Home" />
            <NavLink to="/meals" icon={<Utensils size={18} />} label="Meals" />
            <NavLink to="/cocktails" icon={<Wine size={18} />} label="Cocktails" />
            <NavLink to="/favorites" icon={<Heart size={18} />} label="Favorites" />
            <NavLink to="/search" icon={<Search size={18} />} label="Search" />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-black/95 mt-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" icon={<Home size={18} />} label="Home" />
              <MobileNavLink to="/meals" icon={<Utensils size={18} />} label="Meals" />
              <MobileNavLink to="/cocktails" icon={<Wine size={18} />} label="Cocktails" />
              <MobileNavLink to="/favorites" icon={<Heart size={18} />} label="Favorites" />
              <MobileNavLink to="/search" icon={<Search size={18} />} label="Search" />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="group">
      <motion.div 
        className={`flex items-center space-x-2 transition-colors ${
          isActive ? 'text-red-500' : 'text-white hover:text-red-400'
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <span>{icon}</span>
        <span className="font-medium">{label}</span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
            layoutId="activeIndicator"
          />
        )}
      </motion.div>
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div 
        className={`flex items-center space-x-3 p-2 rounded-lg ${
          isActive ? 'bg-red-900/30 text-red-500' : 'text-white hover:bg-gray-800/50'
        }`}
        whileHover={{ x: 5 }}
      >
        <span>{icon}</span>
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
};

export default Header;